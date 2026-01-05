import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Schema de validation Zod
const contactSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis').max(100),
  prenom: z.string().min(1, 'Le prénom est requis').max(100),
  email: z.string().email('Email invalide').max(255),
  telephone: z.string().max(20).nullable().optional(),
  objet: z.enum(['immobilier', 'succession', 'famille', 'entreprise', 'autre']),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(5000),
})

// Rate limiting simple en mémoire (pour production, utiliser Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 5 // 5 requêtes par minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }

  record.count++
  return true
}

// Nettoyer les anciennes entrées toutes les 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip)
    }
  }
}, 5 * 60 * 1000)

export async function POST(request: NextRequest) {
  try {
    // Obtenir l'IP du client pour le rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown'

    // Vérifier le rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer dans une minute.' },
        { status: 429 }
      )
    }

    // Parser le body
    const body = await request.json()

    // Valider avec Zod
    const validationResult = contactSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Préparer les données pour le webhook
    const webhookData = {
      ...data,
      date: new Date().toISOString(),
    }

    // Envoyer au webhook N8n
    const webhookUrl = process.env.N8N_WEBHOOK_URL

    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL non configuré')
      return NextResponse.json(
        { error: 'Configuration serveur incorrecte' },
        { status: 500 }
      )
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    })

    if (!webhookResponse.ok) {
      console.error('Erreur webhook:', webhookResponse.status)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi du message' },
        { status: 502 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erreur API contact:', error)
    return NextResponse.json(
      { error: 'Une erreur interne est survenue' },
      { status: 500 }
    )
  }
}
