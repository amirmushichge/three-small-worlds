import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { CameraControls, MeshPortalMaterial, Preload, Text, useAnimations, useCursor, useGLTF, useProgress } from '@react-three/drei'
import { easing, geometry } from 'maath'
import * as THREE from 'three'
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { SCENES } from './scenes.js'
import './styles.css'

extend(geometry)

const FONT_MEDIUM = '/fonts/inter_medium.woff'
const GOLDEN_RATIO = 1.61803398875

// Scene content is configured in scenes.js.

useGLTF.setDecoderPath('/draco/')
SCENES.forEach((scene) => useGLTF.preload(scene.src))

function AnimatedScene({ scene }) {
  const animationRoot = useRef(null)
  const gltf = useGLTF(scene.src)
  const object = useMemo(() => cloneSkeleton(gltf.scene), [gltf.scene])
  const { actions } = useAnimations(gltf.animations, animationRoot)

  useEffect(() => {
    const playing = Object.values(actions)
    playing.forEach((action) => action?.reset().play())
    return () => playing.forEach((action) => action?.stop())
  }, [actions])

  return (
    <group ref={animationRoot} scale={scene.model.scale} position={scene.model.position} rotation={scene.model.rotation}>
      <primitive object={object} />
    </group>
  )
}

function Frame({ scene, activeId, setActiveId }) {
  const portal = useRef(null)
  const [hovered, setHovered] = useState(false)
  const active = activeId === scene.id
  useCursor(!activeId && hovered)

  useFrame((_, delta) => {
    if (portal.current) easing.damp(portal.current, 'blend', active ? 1 : 0, 0.2, delta)
  })

  return (
    <group position={scene.position} rotation={scene.rotation}>
      <Text color="#ffffff" font={FONT_MEDIUM} fontSize={0.11} anchorY="top" anchorX="left" lineHeight={0.84} position={[-0.405, 0.71, 0.012]} material-toneMapped={false}>
        {scene.name}
      </Text>

      <mesh
        name={`portal-${scene.id}`}
        onClick={(event) => {
          if (activeId) return
          event.stopPropagation()
          setActiveId(scene.id)
        }}
        onPointerOver={(event) => {
          event.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
      >
        <roundedPlaneGeometry args={[1, GOLDEN_RATIO, 0.1]} />
        <MeshPortalMaterial ref={portal} events={active} side={THREE.DoubleSide} blur={0} resolution={1024}>
          <color attach="background" args={[scene.bg]} />
          <ambientLight intensity={1.15} />
          <directionalLight position={[-3, 5, 5]} intensity={2.2} />
          <AnimatedScene scene={scene} />
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}

function Rig({ activeId }) {
  const controls = useRef(null)
  const { camera, scene } = useThree()

  useEffect(() => {
    const api = controls.current
    if (!api) return
    if (!activeId) {
      api.setLookAt(0, 0, 2, 0, 0, 0, true)
      return
    }

    const portal = scene.getObjectByName(`portal-${activeId}`)
    if (!portal?.parent) return
    const position = portal.parent.localToWorld(new THREE.Vector3(0, 0.5, 0.25))
    const focus = portal.parent.localToWorld(new THREE.Vector3(0, 0, -2))
    api.setLookAt(...position.toArray(), ...focus.toArray(), true)
  }, [activeId, scene])

  useEffect(() => {
    camera.near = 0.025
    camera.far = 2500
    camera.updateProjectionMatrix()
  }, [camera])

  return <CameraControls ref={controls} makeDefault smoothTime={0.32} draggingSmoothTime={0.12} minPolarAngle={0} maxPolarAngle={Math.PI / 2} minDistance={activeId ? 0.4 : 1.55} maxDistance={activeId ? 8 : 3.25} dollySpeed={0.7} />
}

function LoadingState() {
  const { active, progress } = useProgress()
  return active ? <div className="loading-state">Loading worlds&nbsp; {Math.round(progress)}%</div> : null
}

function App() {
  const [activeId, setActiveId] = useState(null)
  const activeScene = SCENES.find((scene) => scene.id === activeId)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveId(null)
      const scene = SCENES.find((item) => item.id === `0${event.key}`)
      if (scene) setActiveId(scene.id)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <main className={activeId ? 'experience is-inside' : 'experience'}>
      <Canvas camera={{ fov: 75, position: [0, 0, 20], near: 0.025, far: 2500 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }} eventSource={document.getElementById('root')} eventPrefix="client">
        <color attach="background" args={['#f0f0f0']} />
        <Suspense fallback={null}>
          {SCENES.map((scene) => <Frame key={scene.id} scene={scene} activeId={activeId} setActiveId={setActiveId} />)}
          <Rig activeId={activeId} />
          <Preload all />
        </Suspense>
      </Canvas>

      <div className="interface-layer">
        {activeId ? <button className="back-link" type="button" onClick={() => setActiveId(null)}>&lt; back</button> : <span className="enter-hint">click to enter portal</span>}
        <div className="signature">three small worlds<br />live 3D portals · <a href="https://github.com/amirmushichge/three-small-worlds#credits" target="_blank" rel="noopener noreferrer">source &amp; credits</a></div>
        <a className="author-link" href="https://x.com/amirmushich" target="_blank" rel="noopener noreferrer" aria-label="Amir Mushich on X">@AmirMushich</a>
        {activeScene && <div className="active-title">{activeScene.name.replace('\n', ' ')}</div>}
      </div>
      <LoadingState />
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
