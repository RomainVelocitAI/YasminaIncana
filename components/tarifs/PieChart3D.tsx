'use client'

import { motion } from 'framer-motion'

// Données du camembert
const pieData = [
  { label: 'Impôts et Taxes', value: 80, color: '#E07B39', darkColor: '#B8612D' },
  { label: 'Débours', value: 10, color: '#0D5C63', darkColor: '#094449' },
  { label: 'Rémunération du notaire', value: 10, color: '#7EBDC3', darkColor: '#5A9BA1' },
]

// Paramètres du camembert 3D
const centerX = 200
const centerY = 140
const radiusX = 140 // Rayon horizontal (ellipse)
const radiusY = 80  // Rayon vertical (effet perspective)
const depth = 40    // Épaisseur 3D

// Fonction pour calculer un point sur l'ellipse
function getEllipsePoint(angle: number, rx: number, ry: number, cx: number, cy: number) {
  return {
    x: cx + rx * Math.cos(angle),
    y: cy + ry * Math.sin(angle),
  }
}

// Fonction pour créer un arc d'ellipse en SVG path
function describeEllipticalArc(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  startAngle: number,
  endAngle: number,
  moveTo: boolean = true
): string {
  const start = getEllipsePoint(startAngle, rx, ry, cx, cy)
  const end = getEllipsePoint(endAngle, rx, ry, cx, cy)
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0

  return `${moveTo ? `M ${start.x} ${start.y}` : ''} A ${rx} ${ry} 0 ${largeArc} 1 ${end.x} ${end.y}`
}

// Composant pour une tranche du camembert
function PieSlice({
  startAngle,
  endAngle,
  color,
  darkColor,
  index,
}: {
  startAngle: number
  endAngle: number
  color: string
  darkColor: string
  index: number
}) {
  const startTop = getEllipsePoint(startAngle, radiusX, radiusY, centerX, centerY)
  const endTop = getEllipsePoint(endAngle, radiusX, radiusY, centerX, centerY)

  // Surface supérieure (ellipse)
  const topPath = `
    M ${centerX} ${centerY}
    L ${startTop.x} ${startTop.y}
    ${describeEllipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, false)}
    Z
  `

  // Côté 3D (visible seulement pour la partie basse de l'ellipse)
  // On dessine le côté entre startAngle et endAngle si c'est dans la partie visible (bas)
  const sidePath = `
    M ${startTop.x} ${startTop.y}
    L ${startTop.x} ${startTop.y + depth}
    ${describeEllipticalArc(centerX, centerY + depth, radiusX, radiusY, startAngle, endAngle, false)}
    L ${endTop.x} ${endTop.y}
    ${describeEllipticalArc(centerX, centerY, radiusX, radiusY, endAngle, startAngle, false)}
    Z
  `

  // Bord extérieur visible (effet 3D)
  const outerEdgePath = `
    M ${startTop.x} ${startTop.y}
    L ${startTop.x} ${startTop.y + depth}
  `

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Côté 3D (profondeur) */}
      <path d={sidePath} fill={darkColor} />

      {/* Surface supérieure */}
      <path d={topPath} fill={color} />

      {/* Ligne de séparation */}
      <path d={outerEdgePath} stroke={darkColor} strokeWidth="1" fill="none" />
    </motion.g>
  )
}

// Composant pour les labels
function PieLabel({
  angle,
  label,
  value,
  index,
}: {
  angle: number
  label: string
  value: number
  index: number
}) {
  const point = getEllipsePoint(angle, radiusX + 20, radiusY + 15, centerX, centerY - 10)
  const labelPoint = getEllipsePoint(angle, radiusX + 60, radiusY + 40, centerX, centerY - 10)

  const isRight = angle < Math.PI / 2 || angle > (3 * Math.PI) / 2
  const textAnchor = isRight ? 'start' : 'end'
  const labelX = isRight ? labelPoint.x + 10 : labelPoint.x - 10

  return (
    <motion.g
      initial={{ opacity: 0, x: isRight ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
    >
      {/* Ligne de rappel */}
      <line
        x1={point.x}
        y1={point.y}
        x2={labelPoint.x}
        y2={labelPoint.y}
        stroke="#666"
        strokeWidth="1"
      />

      {/* Pourcentage */}
      <text
        x={labelX}
        y={labelPoint.y - 8}
        textAnchor={textAnchor}
        className="fill-text-primary font-serif text-lg font-semibold"
        style={{ fontSize: '16px' }}
      >
        {value} %
      </text>

      {/* Label */}
      <text
        x={labelX}
        y={labelPoint.y + 12}
        textAnchor={textAnchor}
        className="fill-text-secondary text-sm"
        style={{ fontSize: '12px' }}
      >
        {label}
      </text>
    </motion.g>
  )
}

export function PieChart3D() {
  // Calculer les angles pour chaque tranche
  let currentAngle = -Math.PI / 2 // Commencer en haut

  const slices = pieData.map((item) => {
    const startAngle = currentAngle
    const sweepAngle = (item.value / 100) * 2 * Math.PI
    const endAngle = startAngle + sweepAngle
    const midAngle = startAngle + sweepAngle / 2
    currentAngle = endAngle

    return {
      ...item,
      startAngle,
      endAngle,
      midAngle,
    }
  })

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg viewBox="0 0 400 280" className="w-full h-auto">
        {/* Ombre sous le camembert */}
        <ellipse
          cx={centerX}
          cy={centerY + depth + 20}
          rx={radiusX * 0.9}
          ry={radiusY * 0.5}
          fill="rgba(0,0,0,0.1)"
        />

        {/* Tranches du camembert (dans l'ordre inverse pour le z-index) */}
        {slices.map((slice, index) => (
          <PieSlice
            key={slice.label}
            startAngle={slice.startAngle}
            endAngle={slice.endAngle}
            color={slice.color}
            darkColor={slice.darkColor}
            index={index}
          />
        ))}

        {/* Labels */}
        {slices.map((slice, index) => (
          <PieLabel
            key={`label-${slice.label}`}
            angle={slice.midAngle}
            label={slice.label}
            value={slice.value}
            index={index}
          />
        ))}
      </svg>
    </div>
  )
}
