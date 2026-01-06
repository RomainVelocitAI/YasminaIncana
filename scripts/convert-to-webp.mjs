/**
 * Script de conversion des images en WebP
 */

import sharp from 'sharp'
import { readdir, stat, unlink } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const IMAGES_DIR = join(__dirname, '..', 'public', 'images')

async function convertToWebP() {
  console.log('🔄 Conversion des images en WebP...\n')

  const files = await readdir(IMAGES_DIR)
  let totalOriginal = 0
  let totalWebP = 0

  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue

    const filePath = join(IMAGES_DIR, file)
    const webpPath = join(IMAGES_DIR, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'))

    const originalStats = await stat(filePath)
    totalOriginal += originalStats.size

    await sharp(filePath)
      .webp({ quality: 85 })
      .toFile(webpPath)

    const webpStats = await stat(webpPath)
    totalWebP += webpStats.size

    const reduction = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1)
    console.log(`✅ ${file} → ${file.replace(/\.(png|jpg|jpeg)$/i, '.webp')}: ${(originalStats.size / 1024 / 1024).toFixed(2)} MB → ${(webpStats.size / 1024 / 1024).toFixed(2)} MB (-${reduction}%)`)

    // Supprimer l'ancien fichier
    await unlink(filePath)
  }

  console.log('')
  console.log('📊 TOTAL:')
  console.log(`   Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`)
  console.log(`   WebP: ${(totalWebP / 1024 / 1024).toFixed(2)} MB`)
  console.log(`   Économie: ${((1 - totalWebP / totalOriginal) * 100).toFixed(1)}%`)
}

convertToWebP().catch(console.error)
