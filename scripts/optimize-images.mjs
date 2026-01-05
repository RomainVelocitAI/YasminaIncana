/**
 * Script d'optimisation des images
 * Compresse les PNG/JPG en conservant une bonne qualité
 *
 * Usage: node scripts/optimize-images.mjs
 */

import { readdir, stat, mkdir, copyFile } from 'fs/promises'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const IMAGES_DIR = join(__dirname, '..', 'public', 'images')
const BACKUP_DIR = join(__dirname, '..', 'public', 'images-original')

// Essayer d'importer sharp
let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.log('⚠️  Sharp n\'est pas installé. Installez-le avec: npm install sharp')
  console.log('')
  console.log('Alternatives manuelles pour compresser les images:')
  console.log('1. TinyPNG (https://tinypng.com) - Glissez-déposez vos images')
  console.log('2. Squoosh (https://squoosh.app) - Outil Google en ligne')
  console.log('3. ImageOptim (Mac) ou FileOptimizer (Windows)')
  console.log('')
  console.log('Images à compresser:')

  const files = await readdir(IMAGES_DIR)
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const filePath = join(IMAGES_DIR, file)
      const stats = await stat(filePath)
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2)
      if (stats.size > 500000) { // > 500KB
        console.log(`  - ${file}: ${sizeMB} MB → objectif ~${(parseFloat(sizeMB) * 0.1).toFixed(2)} MB`)
      }
    }
  }
  process.exit(0)
}

async function optimizeImages() {
  console.log('🖼️  Optimisation des images...\n')

  // Créer le dossier de backup
  try {
    await mkdir(BACKUP_DIR, { recursive: true })
    console.log(`📁 Dossier de backup créé: ${BACKUP_DIR}\n`)
  } catch {}

  const files = await readdir(IMAGES_DIR)
  let totalOriginal = 0
  let totalOptimized = 0

  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue

    const filePath = join(IMAGES_DIR, file)
    const backupPath = join(BACKUP_DIR, file)
    const stats = await stat(filePath)

    // Skip petits fichiers
    if (stats.size < 100000) { // < 100KB
      console.log(`⏭️  ${file} - Déjà petit (${(stats.size / 1024).toFixed(0)} KB)`)
      continue
    }

    totalOriginal += stats.size

    // Backup
    await copyFile(filePath, backupPath)

    try {
      const image = sharp(filePath)
      const metadata = await image.metadata()

      // Redimensionner si trop grand (max 2000px de large)
      let resized = image
      if (metadata.width && metadata.width > 2000) {
        resized = image.resize(2000, null, { withoutEnlargement: true })
      }

      // Écrire dans un fichier temporaire d'abord
      const tempPath = filePath + '.tmp'

      if (ext === '.png') {
        await resized
          .png({ quality: 80, compressionLevel: 9 })
          .toFile(tempPath)
      } else {
        await resized
          .jpeg({ quality: 85, progressive: true })
          .toFile(tempPath)
      }

      // Renommer le fichier temp
      const { rename, unlink } = await import('fs/promises')
      try {
        await unlink(filePath)
      } catch {}
      await rename(tempPath, filePath)

      const newStats = await stat(filePath)
      totalOptimized += newStats.size

      const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1)
      console.log(`✅ ${file}: ${(stats.size / 1024 / 1024).toFixed(2)} MB → ${(newStats.size / 1024 / 1024).toFixed(2)} MB (-${reduction}%)`)

    } catch (err) {
      console.log(`❌ ${file}: Erreur - ${err.message}`)
      // Restaurer depuis backup
      await copyFile(backupPath, filePath)
    }
  }

  console.log('\n📊 Résumé:')
  console.log(`   Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`)
  console.log(`   Optimisé: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`)
  console.log(`   Économie: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`)
  console.log(`\n💾 Originaux sauvegardés dans: ${BACKUP_DIR}`)
}

optimizeImages().catch(console.error)
