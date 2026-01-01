'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { cn } from '@/lib/utils'

export default function FraisNotaireVisualization() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredSegment, setHoveredSegment] = useState<typeof data[0] | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const segmentsRef = useRef<THREE.Mesh[]>([])
  const hoveredRef = useRef<typeof data[0] | null>(null)

  const data = [
    {
      id: 'taxes',
      label: 'Impôts & Taxes',
      sublabel: 'Reversés au Trésor Public',
      percentage: 80,
      color: 0x0D5C63, // primary - bleu canard
      hoverColor: 0x127A83
    },
    {
      id: 'debours',
      label: 'Débours',
      sublabel: 'Documents & intervenants',
      percentage: 10,
      color: 0xC9A962, // gold
      hoverColor: 0xD4BC7D
    },
    {
      id: 'remuneration',
      label: 'Rémunération',
      sublabel: 'Service notarial',
      percentage: 10,
      color: 0x8B2942, // accent bordeaux
      hoverColor: 0xA63D56
    }
  ]

  // Keep hoveredRef in sync
  useEffect(() => {
    hoveredRef.current = hoveredSegment
  }, [hoveredSegment])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = 400

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.set(4, 4, 4)
    camera.lookAt(0, 0, 0)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 10, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3)
    fillLight.position.set(-5, 5, -5)
    scene.add(fillLight)

    // Create pie segments using Shape + ExtrudeGeometry
    const innerRadius = 1
    const outerRadius = 2
    const pieHeight = 0.6
    const arcSegments = 64

    let currentAngle = Math.PI / 2 // Start from top
    const segments: THREE.Mesh[] = []

    data.forEach((item) => {
      const segmentAngle = (item.percentage / 100) * Math.PI * 2

      // Create the ring shape manually using Shape + ExtrudeGeometry
      const shape = new THREE.Shape()

      // Draw outer arc
      const outerPoints: THREE.Vector2[] = []
      const innerPoints: THREE.Vector2[] = []

      for (let i = 0; i <= arcSegments; i++) {
        const angle = currentAngle + (i / arcSegments) * segmentAngle
        outerPoints.push(new THREE.Vector2(
          Math.cos(angle) * outerRadius,
          Math.sin(angle) * outerRadius
        ))
        innerPoints.push(new THREE.Vector2(
          Math.cos(angle) * innerRadius,
          Math.sin(angle) * innerRadius
        ))
      }

      // Create shape path
      shape.moveTo(outerPoints[0].x, outerPoints[0].y)

      // Outer arc
      for (let i = 1; i < outerPoints.length; i++) {
        shape.lineTo(outerPoints[i].x, outerPoints[i].y)
      }

      // Connect to inner arc
      const lastInner = innerPoints[innerPoints.length - 1]
      shape.lineTo(lastInner.x, lastInner.y)

      // Inner arc (reverse)
      for (let i = innerPoints.length - 2; i >= 0; i--) {
        shape.lineTo(innerPoints[i].x, innerPoints[i].y)
      }

      shape.closePath()

      const extrudeSettings = {
        depth: pieHeight,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.03,
        bevelSegments: 2
      }

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      geometry.rotateX(-Math.PI / 2)

      const material = new THREE.MeshStandardMaterial({
        color: item.color,
        metalness: 0.1,
        roughness: 0.4,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.userData = { ...item }
      mesh.position.y = 0

      scene.add(mesh)
      segments.push(mesh)

      currentAngle += segmentAngle
    })

    segmentsRef.current = segments

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(segments)

      if (intersects.length > 0) {
        const segment = intersects[0].object as THREE.Mesh
        setHoveredSegment(segment.userData as typeof data[0])
        container.style.cursor = 'pointer'
      } else {
        setHoveredSegment(null)
        container.style.cursor = 'default'
      }
    }

    container.addEventListener('mousemove', onMouseMove)

    // Animation loop
    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Slow rotation
      scene.rotation.y += 0.003

      // Hover animation using ref to avoid stale closure
      segments.forEach((segment) => {
        const isHovered = hoveredRef.current?.id === segment.userData.id
        const targetY = isHovered ? 0.25 : 0
        segment.position.y += (targetY - segment.position.y) * 0.12

        const targetColor = new THREE.Color(isHovered ? segment.userData.hoverColor : segment.userData.color)
        ;(segment.material as THREE.MeshStandardMaterial).color.lerp(targetColor, 0.1)
      })

      renderer.render(scene, camera)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth
      camera.aspect = newWidth / height
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animationId)
      segments.forEach(s => {
        s.geometry.dispose()
        ;(s.material as THREE.Material).dispose()
      })
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="rounded-lg p-6 md:p-8">
      {/* Header - AVANT le graphique */}
      <h3 className="font-serif text-2xl md:text-3xl text-text-primary mb-2 text-center">
        Répartition des Frais d'Acte
      </h3>
      <p className="text-sm text-text-muted italic text-center mb-6">
        Improprement appelés « frais de notaire »
      </p>

      {/* 3D Container */}
      <div
        ref={containerRef}
        className="w-full rounded-lg overflow-hidden relative"
        style={{ height: '400px' }}
      />

      {/* Legend */}
      <div className="flex justify-center gap-4 md:gap-6 mt-8 flex-wrap">
        {[
          { id: 'taxes', label: 'Impôts & Taxes', sublabel: 'Reversés au Trésor Public', percentage: 80, color: '#0D5C63' },
          { id: 'debours', label: 'Débours', sublabel: 'Documents & intervenants', percentage: 10, color: '#C9A962' },
          { id: 'remuneration', label: 'Rémunération', sublabel: 'Service notarial', percentage: 10, color: '#8B2942' }
        ].map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredSegment(item as any)}
            onMouseLeave={() => setHoveredSegment(null)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200",
              hoveredSegment?.id === item.id
                ? "bg-white shadow-lg scale-105"
                : "bg-secondary/50 hover:bg-white/80"
            )}
          >
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: item.color }}
            />
            <div>
              <div className="text-sm font-medium text-text-primary">
                {item.label}
              </div>
              <div className="text-xs text-text-muted">
                {item.sublabel}
              </div>
            </div>
            <div
              className="text-xl font-serif font-bold ml-2"
              style={{ color: item.color }}
            >
              {item.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
