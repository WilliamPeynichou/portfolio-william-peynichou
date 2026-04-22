import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows } from '@react-three/drei'
import { useLoading } from '../../context/LoadingContext'

function Model() {
  const { scene } = useGLTF('/models/bonhomme.glb')
  const { setLoaded } = useLoading()
  const ref = useRef()
  const notified = useRef(false)

  useEffect(() => {
    if (!notified.current) {
      notified.current = true
      setLoaded(true)
    }
  }, [setLoaded])

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.4
  })

  return <primitive ref={ref} object={scene} scale={1.2} position={[0, 0, 0]} />
}

function Background() {
  return (
    <Canvas
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 2, -3]} intensity={0.4} color="#aabbff" />
      <Suspense fallback={null}>
        <Model />
        <Environment preset="city" />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={6} blur={2} far={4} />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/models/bonhomme.glb')

export default Background
