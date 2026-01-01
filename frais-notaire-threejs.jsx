import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function FraisNotaireVisualization() {
  const containerRef = useRef(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const rendererRef = useRef(null);
  const segmentsRef = useRef([]);
  const hoveredRef = useRef(null);

  const data = [
    {
      id: 'taxes',
      label: 'Impôts & Taxes',
      sublabel: 'Reversés au Trésor Public',
      percentage: 80,
      color: 0x1e3a5f,
      hoverColor: 0x2d5a8a
    },
    {
      id: 'debours',
      label: 'Débours',
      sublabel: 'Documents & intervenants',
      percentage: 10,
      color: 0x8b6914,
      hoverColor: 0xb8860b
    },
    {
      id: 'remuneration',
      label: 'Rémunération',
      sublabel: 'Service notarial',
      percentage: 10,
      color: 0x2d5a3d,
      hoverColor: 0x3d7a52
    }
  ];

  // Keep hoveredRef in sync
  useEffect(() => {
    hoveredRef.current = hoveredSegment;
  }, [hoveredSegment]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 450;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Create pie segments using CylinderGeometry with thetaStart/thetaLength
    const innerRadius = 1;
    const outerRadius = 2;
    const pieHeight = 0.6;
    const radialSegments = 64;
    
    let currentAngle = Math.PI / 2; // Start from top
    const segments = [];

    data.forEach((item) => {
      const segmentAngle = (item.percentage / 100) * Math.PI * 2;
      
      // Create outer cylinder segment
      const outerGeometry = new THREE.CylinderGeometry(
        outerRadius, outerRadius, pieHeight, radialSegments, 1, false,
        currentAngle, segmentAngle
      );
      
      // Create inner cylinder segment (to subtract)
      const innerGeometry = new THREE.CylinderGeometry(
        innerRadius, innerRadius, pieHeight + 0.01, radialSegments, 1, false,
        currentAngle, segmentAngle
      );

      // Create the ring shape manually using Shape + ExtrudeGeometry
      const shape = new THREE.Shape();
      
      // Draw outer arc
      const outerPoints = [];
      const innerPoints = [];
      const arcSegments = 64;
      
      for (let i = 0; i <= arcSegments; i++) {
        const angle = currentAngle + (i / arcSegments) * segmentAngle;
        outerPoints.push(new THREE.Vector2(
          Math.cos(angle) * outerRadius,
          Math.sin(angle) * outerRadius
        ));
        innerPoints.push(new THREE.Vector2(
          Math.cos(angle) * innerRadius,
          Math.sin(angle) * innerRadius
        ));
      }
      
      // Create shape path
      shape.moveTo(outerPoints[0].x, outerPoints[0].y);
      
      // Outer arc
      for (let i = 1; i < outerPoints.length; i++) {
        shape.lineTo(outerPoints[i].x, outerPoints[i].y);
      }
      
      // Connect to inner arc
      const lastInner = innerPoints[innerPoints.length - 1];
      shape.lineTo(lastInner.x, lastInner.y);
      
      // Inner arc (reverse)
      for (let i = innerPoints.length - 2; i >= 0; i--) {
        shape.lineTo(innerPoints[i].x, innerPoints[i].y);
      }
      
      shape.closePath();

      const extrudeSettings = {
        depth: pieHeight,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.03,
        bevelSegments: 2
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geometry.rotateX(-Math.PI / 2);

      const material = new THREE.MeshStandardMaterial({
        color: item.color,
        metalness: 0.1,
        roughness: 0.4,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { ...item };
      mesh.position.y = 0;

      scene.add(mesh);
      segments.push(mesh);

      currentAngle += segmentAngle;
    });

    segmentsRef.current = segments;

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(segments);

      if (intersects.length > 0) {
        const segment = intersects[0].object;
        setHoveredSegment(segment.userData);
        container.style.cursor = 'pointer';
      } else {
        setHoveredSegment(null);
        container.style.cursor = 'default';
      }
    };

    container.addEventListener('mousemove', onMouseMove);

    // Animation loop
    let animationId;
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Slow rotation
      scene.rotation.y += 0.003;

      // Hover animation using ref to avoid stale closure
      segments.forEach((segment) => {
        const isHovered = hoveredRef.current?.id === segment.userData.id;
        const targetY = isHovered ? 0.25 : 0;
        segment.position.y += (targetY - segment.position.y) * 0.12;

        const targetColor = new THREE.Color(isHovered ? segment.userData.hoverColor : segment.userData.color);
        segment.material.color.lerp(targetColor, 0.1);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
      segments.forEach(s => {
        s.geometry.dispose();
        s.material.dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
      borderRadius: '16px',
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '600',
          color: '#1a202c',
          margin: '0 0 8px 0'
        }}>
          Répartition des Frais de Notaire
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6c757d',
          margin: 0,
          fontStyle: 'italic'
        }}>
          Improprement appelés « frais de notaire »
        </p>
      </div>

      {/* 3D Container */}
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', 
          height: '450px',
          borderRadius: '12px',
          overflow: 'hidden'
        }} 
      />

      {/* Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        marginTop: '32px',
        flexWrap: 'wrap'
      }}>
        {data.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredSegment(item)}
            onMouseLeave={() => setHoveredSegment(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              background: hoveredSegment?.id === item.id ? '#fff' : 'rgba(255,255,255,0.7)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: hoveredSegment?.id === item.id ? 'scale(1.05)' : 'scale(1)',
              boxShadow: hoveredSegment?.id === item.id 
                ? '0 8px 24px rgba(0,0,0,0.15)' 
                : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '4px',
              background: `#${item.color.toString(16).padStart(6, '0')}`
            }} />
            <div>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#2d3748'
              }}>
                {item.label}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#718096'
              }}>
                {item.sublabel}
              </div>
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: `#${item.color.toString(16).padStart(6, '0')}`,
              marginLeft: '8px'
            }}>
              {item.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
