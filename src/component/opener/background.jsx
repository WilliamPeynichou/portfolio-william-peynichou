import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

function Background({ zoom = 1 }) {
  // Calculer le cameraZoom en fonction du zoom (zoom initial * facteur de zoom)
  // Utilisons 4.5 comme base, ou ajustez selon le niveau de zoom initial souhaité
  const baseCameraZoom = 4.5;
  const currentCameraZoom = baseCameraZoom * zoom;

  return (
    <ShaderGradientCanvas
      className="fixed top-0 left-0 w-full h-full z-[1] pointer-events-none"
      pixelDensity={1}
      fov={45}
    >
      <ShaderGradient 
  animate="on"
  axesHelper="off"
  brightness={1.5}
  cAzimuthAngle={250}
  cDistance={1.5}
  cPolarAngle={140}
  cameraZoom={currentCameraZoom}
  color1="#809bd6"
  color2="#910aff"
  color3="#af38ff"
  destination="onCanvas"
  embedMode="off"
  envPreset="city"
  format="gif"
  fov={45}
  frameRate={10}
  gizmoHelper="hide"
  grain="on"
  lightType="3d"
  pixelDensity={1}
  positionX={0}
  positionY={0}
  positionZ={0}
  range="disabled"
  rangeEnd={40}
  rangeStart={0}
  reflection={0.5}
  rotationX={0}
  rotationY={0}
  rotationZ={140}
  shader="defaults"
  type="sphere"
  uAmplitude={7}
  uDensity={0.8}
  uFrequency={5.5}
  uSpeed={0.3}
  uStrength={0.4}
  uTime={0}
  wireframe={false}
      />
    </ShaderGradientCanvas>
  )
}

export default Background


