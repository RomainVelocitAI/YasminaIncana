'use client'

import { cn } from "@/lib/utils"
import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "Quelle est la différence entre l'estimation des frais et le prélèvement initial ?",
    answer: "Lors de la signature de l'acte de vente, le notaire vous demande une provision sur frais. Cette somme est une estimation volontairement légèrement majorée pour anticiper d'éventuels imprévus (frais supplémentaires, taxes variables, formalités complexes). Une fois la transaction finalisée et toutes les formalités accomplies (généralement quelques semaines à quelques mois après la vente), le notaire procède au décompte définitif. Si la provision excède les frais réels, le reliquat vous est restitué par chèque de la Caisse des Dépôts et Consignations. Si elle est inférieure (rare), vous devrez régler le solde."
  },
  {
    question: "Quels documents dois-je apporter pour un achat immobilier ?",
    answer: "Pour un achat immobilier, vous devez fournir : une pièce d'identité en cours de validité, un justificatif de domicile de moins de 3 mois, un justificatif de situation familiale (livret de famille, acte de mariage, PACS), un RIB, et si vous êtes financé par un prêt, l'offre de prêt signée. Téléchargez la fiche de renseignement acquéreur sur cette page pour préparer au mieux votre dossier."
  },
  {
    question: "Combien de temps dure une transaction immobilière ?",
    answer: "En moyenne, comptez 2 à 3 mois entre la signature du compromis de vente et l'acte authentique. Ce délai permet d'effectuer toutes les vérifications (urbanisme, hypothèques, servitudes), d'obtenir les documents administratifs nécessaires, et de laisser le temps à l'acquéreur de finaliser son financement. Ce délai peut être raccourci en cas de vente comptant."
  },
  {
    question: "Peut-on prendre rendez-vous le samedi ?",
    answer: "Oui, l'étude est ouverte le samedi sur rendez-vous uniquement. Pour les rendez-vous du samedi, merci de nous contacter à l'avance par téléphone ou via notre formulaire de contact afin de convenir d'un créneau."
  },
  {
    question: "Comment se déroule une succession ?",
    answer: "Une succession se déroule en plusieurs étapes : d'abord, le notaire établit l'acte de notoriété qui détermine les héritiers. Ensuite, il procède à l'inventaire des biens et des dettes du défunt. Il calcule les droits de succession éventuels et prépare la déclaration fiscale. Enfin, il établit l'acte de partage si nécessaire. Le délai varie selon la complexité de la succession, mais comptez généralement 6 mois à 1 an pour une succession simple."
  },
  {
    question: "Les consultations sont-elles payantes ?",
    answer: "Les premiers rendez-vous de conseil sont généralement offerts lorsqu'ils débouchent sur la réalisation d'un acte notarié. Pour une consultation juridique sans acte à suivre, des honoraires peuvent être facturés. N'hésitez pas à nous contacter pour plus de précisions selon votre situation."
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-20 bg-secondary/20">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12">
          {/* Image et titre côté gauche */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative rounded-2xl overflow-hidden mb-6">
                <img
                  className="w-full h-64 lg:h-80 object-cover"
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop"
                  alt="Questions fréquentes"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-gold mb-2">
                    <HelpCircle className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase tracking-wider">FAQ</span>
                  </div>
                  <h2 className="font-serif text-2xl lg:text-3xl text-white">
                    Questions fréquentes
                  </h2>
                </div>
              </div>
              <p className="text-text-secondary">
                Retrouvez ici les réponses aux questions les plus fréquemment posées concernant
                vos démarches notariales. N'hésitez pas à nous contacter pour toute autre question.
              </p>
            </motion.div>
          </div>

          {/* Liste des FAQ côté droit */}
          <div className="w-full lg:w-3/5">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  "border-b border-border py-5 cursor-pointer group",
                  openIndex === index && "border-gold/50"
                )}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className={cn(
                    "text-base font-medium transition-colors",
                    openIndex === index ? "text-primary" : "text-text-primary group-hover:text-primary"
                  )}>
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 shrink-0 transition-all duration-300 ease-in-out mt-0.5",
                      openIndex === index ? "rotate-180 text-gold" : "text-text-muted"
                    )}
                  />
                </div>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out",
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="text-text-secondary leading-relaxed pt-4 pr-8">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
