import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Eye, Pencil, Trash2, ExternalLink } from 'lucide-react'
import { formatPrice, PropertyWithRelations } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DeletePropertyButton } from '@/components/admin/DeletePropertyButton'
import { PublishToggle } from '@/components/admin/PublishToggle'

async function getProperties(): Promise<PropertyWithRelations[]> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_type:property_types(*),
        images:property_images(*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data as PropertyWithRelations[]
  } catch {
    return []
  }
}

const statusConfig = {
  available: { label: 'Disponible', className: 'bg-status-available text-white' },
  under_offer: { label: 'Sous offre', className: 'bg-status-offer text-white' },
  sold: { label: 'Vendu', className: 'bg-status-sold text-white' },
}

export default async function AdminBiensPage() {
  const properties = await getProperties()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-text-primary">
            Gestion des biens
          </h1>
          <p className="text-text-muted mt-1">
            {properties.length} bien{properties.length > 1 ? 's' : ''} au total
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary-dark text-white">
          <Link href="/admin/biens/new">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau bien
          </Link>
        </Button>
      </div>

      {/* Properties list */}
      <div className="bg-surface border border-border overflow-hidden">
        {properties.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left p-4 text-sm font-medium text-text-muted">
                    Bien
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-text-muted">
                    Prix
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-text-muted">
                    Type
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-text-muted">
                    Statut
                  </th>
                  <th className="text-center p-4 text-sm font-medium text-text-muted">
                    Publié
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-text-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {properties.map((property) => {
                  const coverImage = property.images?.find((img) => img.is_cover) || property.images?.[0]
                  const status = statusConfig[property.status]

                  return (
                    <tr key={property.id} className="hover:bg-secondary/20">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 bg-secondary relative shrink-0">
                            {coverImage ? (
                              <Image
                                src={coverImage.url}
                                alt={property.title}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">
                                Pas d'image
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-text-primary font-medium line-clamp-1">
                              {property.title}
                            </p>
                            <p className="text-text-muted text-sm">
                              {property.city} • Réf. {property.reference}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-text-primary font-medium">
                          {formatPrice(property.price)}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-text-secondary">
                          {property.property_type?.name || '-'}
                        </p>
                      </td>
                      <td className="p-4">
                        <Badge className={status.className}>
                          {status.label}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <PublishToggle
                            propertyId={property.id}
                            isPublished={property.is_published}
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/biens/${property.slug}`}
                            target="_blank"
                            className="p-2 text-text-muted hover:text-primary transition-colors"
                            title="Voir sur le site"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/biens/${property.id}/edit`}
                            className="p-2 text-text-muted hover:text-primary transition-colors"
                            title="Modifier"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <DeletePropertyButton
                            propertyId={property.id}
                            propertyTitle={property.title}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-text-muted mb-4">Aucun bien pour le moment</p>
            <Button asChild>
              <Link href="/admin/biens/new">Ajouter votre premier bien</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
