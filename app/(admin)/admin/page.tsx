import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Building, Eye, Clock, CheckCircle, Plus, ArrowRight } from 'lucide-react'
import { formatPrice } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface Stats {
  total: number
  published: number
  underOffer: number
  sold: number
}

interface RecentProperty {
  id: string
  title: string
  price: number
  status: string
  created_at: string
}

async function getStats(): Promise<Stats> {
  try {
    const supabase = await createClient()

    const [total, published, underOffer, sold] = await Promise.all([
      supabase.from('properties').select('id', { count: 'exact', head: true }),
      supabase.from('properties').select('id', { count: 'exact', head: true }).eq('is_published', true),
      supabase.from('properties').select('id', { count: 'exact', head: true }).eq('status', 'under_offer'),
      supabase.from('properties').select('id', { count: 'exact', head: true }).eq('status', 'sold'),
    ])

    return {
      total: total.count || 0,
      published: published.count || 0,
      underOffer: underOffer.count || 0,
      sold: sold.count || 0,
    }
  } catch {
    return { total: 4, published: 3, underOffer: 1, sold: 0 }
  }
}

async function getRecentProperties(): Promise<RecentProperty[]> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('properties')
      .select('id, title, price, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) throw error

    return data as RecentProperty[]
  } catch {
    return [
      { id: '1', title: 'Villa contemporaine', price: 850000, status: 'available', created_at: new Date().toISOString() },
      { id: '2', title: 'Appartement T3', price: 245000, status: 'under_offer', created_at: new Date().toISOString() },
    ]
  }
}

const statusLabels: Record<string, string> = {
  available: 'Disponible',
  under_offer: 'Sous offre',
  sold: 'Vendu',
}

const statusColors: Record<string, string> = {
  available: 'text-status-available',
  under_offer: 'text-status-offer',
  sold: 'text-status-sold',
}

export default async function AdminDashboardPage() {
  const [stats, recentProperties] = await Promise.all([
    getStats(),
    getRecentProperties(),
  ])

  const statsCards = [
    { label: 'Total des biens', value: stats.total, icon: Building, color: 'bg-primary/10 text-primary' },
    { label: 'Biens publiés', value: stats.published, icon: Eye, color: 'bg-status-available/10 text-status-available' },
    { label: 'Sous offre', value: stats.underOffer, icon: Clock, color: 'bg-status-offer/10 text-status-offer' },
    { label: 'Vendus', value: stats.sold, icon: CheckCircle, color: 'bg-status-sold/10 text-status-sold' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-text-primary">Tableau de bord</h1>
          <p className="text-text-muted mt-1">
            Bienvenue dans l'administration de votre étude
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary-dark text-white">
          <Link href="/admin/biens/new">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un bien
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-surface border border-border p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="font-serif text-3xl text-text-primary">{stat.value}</p>
              <p className="text-sm text-text-muted mt-1">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent properties */}
      <div className="bg-surface border border-border">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-serif text-xl text-text-primary">
            Derniers biens ajoutés
          </h2>
          <Link
            href="/admin/biens"
            className="text-primary hover:text-primary-dark text-sm flex items-center gap-1"
          >
            Voir tout
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentProperties.length > 0 ? (
          <div className="divide-y divide-border">
            {recentProperties.map((property) => (
              <Link
                key={property.id}
                href={`/admin/biens/${property.id}/edit`}
                className="flex items-center justify-between p-6 hover:bg-secondary/30 transition-colors"
              >
                <div>
                  <p className="text-text-primary font-medium">{property.title}</p>
                  <p className="text-text-muted text-sm mt-1">
                    {formatPrice(property.price)}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-sm ${statusColors[property.status]}`}>
                    {statusLabels[property.status]}
                  </span>
                  <p className="text-text-muted text-xs mt-1">
                    {new Date(property.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Building className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">Aucun bien pour le moment</p>
            <Button asChild className="mt-4">
              <Link href="/admin/biens/new">Ajouter votre premier bien</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
