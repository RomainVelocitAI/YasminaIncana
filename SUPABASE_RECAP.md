# Récapitulatif Structure Supabase - Site Notaire Immobilier

## Tables

### 1. property_types
Types de biens immobiliers.

| Colonne | Type | Description |
|---------|------|-------------|
| id | UUID | Clé primaire |
| name | TEXT | Nom du type (Maison, Appartement...) |
| slug | TEXT | Slug URL unique |
| icon | TEXT | Nom de l'icône |
| display_order | INTEGER | Ordre d'affichage |
| created_at | TIMESTAMPTZ | Date de création |

**Données initiales :** Maison, Appartement, Terrain, Local commercial, Immeuble, Parking/Garage

---

### 2. properties
Biens immobiliers en vente.

| Colonne | Type | Description |
|---------|------|-------------|
| id | UUID | Clé primaire |
| title | TEXT | Titre du bien |
| slug | TEXT | Slug URL unique |
| reference | TEXT | Référence interne notaire |
| description | TEXT | Description détaillée |
| price | NUMERIC(12,2) | Prix en euros |
| property_type_id | UUID | FK → property_types |
| surface | NUMERIC(10,2) | Surface habitable m² |
| land_surface | NUMERIC(10,2) | Surface terrain m² |
| rooms | INTEGER | Nombre de pièces |
| bedrooms | INTEGER | Nombre de chambres |
| bathrooms | INTEGER | Nombre de SDB |
| address | TEXT | Adresse |
| city | TEXT | Ville |
| postal_code | TEXT | Code postal |
| energy_rating | TEXT | DPE (A à G) |
| ges_rating | TEXT | GES (A à G) |
| year_built | INTEGER | Année de construction |
| features | JSONB | Extras (parking, piscine, cave...) |
| status | ENUM | available, under_offer, sold |
| is_featured | BOOLEAN | Mis en avant sur la home |
| is_published | BOOLEAN | Publié ou brouillon |
| created_at | TIMESTAMPTZ | Date de création |
| updated_at | TIMESTAMPTZ | Date de modification |

**Index :** status, city, is_published

---

### 3. property_images
Images des biens.

| Colonne | Type | Description |
|---------|------|-------------|
| id | UUID | Clé primaire |
| property_id | UUID | FK → properties (CASCADE) |
| url | TEXT | URL Supabase Storage |
| alt_text | TEXT | Texte alternatif |
| is_cover | BOOLEAN | Image principale |
| display_order | INTEGER | Ordre d'affichage |
| created_at | TIMESTAMPTZ | Date de création |

---

## Enum Types

```sql
property_status: 'available' | 'under_offer' | 'sold'
```

---

## Storage

**Bucket :** `properties` (public)

**Policies :**
- SELECT public (tout le monde peut voir les images)
- INSERT/UPDATE/DELETE authenticated (admin uniquement)

---

## Row Level Security (RLS)

### property_types
- SELECT : public (tout le monde)
- ALL : authenticated (admin)

### properties
- SELECT : public **si is_published = true**
- ALL : authenticated (admin)

### property_images
- SELECT : public (tout le monde)
- ALL : authenticated (admin)

---

## Authentification

Un compte admin créé dans Supabase Auth.
Toute personne authentifiée a accès complet (pour ce projet = 1 seul admin).

---

## Exemples de requêtes

### Récupérer tous les biens publiés
```typescript
const { data } = await supabase
  .from('properties')
  .select(`
    *,
    property_type:property_types(*),
    images:property_images(*)
  `)
  .eq('is_published', true)
  .order('created_at', { ascending: false })
```

### Récupérer un bien par slug
```typescript
const { data } = await supabase
  .from('properties')
  .select(`
    *,
    property_type:property_types(*),
    images:property_images(*)
  `)
  .eq('slug', slug)
  .eq('is_published', true)
  .single()
```

### Upload image
```typescript
const { data } = await supabase.storage
  .from('properties')
  .upload(`${propertyId}/${filename}`, file)
```

### URL publique image
```typescript
const { data } = supabase.storage
  .from('properties')
  .getPublicUrl(path)
```
