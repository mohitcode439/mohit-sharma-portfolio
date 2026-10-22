import {
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  DefaultLoadingManager,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  SRGBColorSpace,
  Scene,
  SphereGeometry,
  TextureLoader,
  WebGLRenderer,
} from 'three'
import moonTextureUrl from '../assets/textures/moon.jpg'
import venusTextureUrl from '../assets/textures/venus.jpg'

/** Builds the moon + Venus + starfield scene and returns a function that tears it down. */
export function startScene(canvas: HTMLCanvasElement, reducedMotion: boolean): () => void {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const scene = new Scene()
  const camera = new PerspectiveCamera(45, 1, 0.1, 200)
  camera.position.set(0, 0, 16)

  const loader = new TextureLoader()
  const venusTexture = loader.load(venusTextureUrl)
  const moonTexture = loader.load(moonTextureUrl)
  venusTexture.colorSpace = SRGBColorSpace
  moonTexture.colorSpace = SRGBColorSpace

  const venus = new Mesh(
    new SphereGeometry(3.2, 64, 64),
    new MeshStandardMaterial({ map: venusTexture, roughness: 1 }),
  )
  const moon = new Mesh(
    new SphereGeometry(1.1, 48, 48),
    new MeshStandardMaterial({ map: moonTexture, roughness: 1 }),
  )

  // Stars: random points on a wide shell around the planets
  const starCount = 900
  const positions = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount; i++) {
    const radius = 40 + Math.random() * 60
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions.set(
      [radius * Math.sin(phi) * Math.cos(theta), radius * Math.sin(phi) * Math.sin(theta), -Math.abs(radius * Math.cos(phi))],
      i * 3,
    )
  }
  const starGeometry = new BufferGeometry()
  starGeometry.setAttribute('position', new BufferAttribute(positions, 3))
  const starMaterial = new PointsMaterial({ color: 0xc9c3ff, size: 0.18, transparent: true, opacity: 0.8 })
  const stars = new Points(starGeometry, starMaterial)

  const sun = new DirectionalLight(0xffffff, 2.6)
  sun.position.set(-6, 4, 8)
  const rim = new DirectionalLight(0x8b7cff, 1.4)
  rim.position.set(8, -2, -4)
  scene.add(venus, moon, stars, sun, rim, new AmbientLight(0x404a80, 0.6))

  // Planets sit to the right on wide screens and behind the text on narrow ones
  const layout = () => {
    const { clientWidth: width, clientHeight: height } = canvas
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    const wide = width > 768
    // On phones: Venus peeks in from the top-right corner and the moon sits below the links
    venus.position.set(wide ? 5.2 : 3.4, wide ? 0.4 : 5.6, 0)
    moon.position.set(wide ? 1.6 : -2.4, wide ? -2.6 : -6.6, 2)
  }
  layout()
  const resizeObserver = new ResizeObserver(layout)
  resizeObserver.observe(canvas)

  // Gentle parallax towards the pointer
  const pointer = { x: 0, y: 0 }
  const onPointerMove = (event: PointerEvent) => {
    pointer.x = event.clientX / window.innerWidth - 0.5
    pointer.y = event.clientY / window.innerHeight - 0.5
  }

  let frame = 0
  let visible = true
  const render = () => {
    venus.rotation.y += 0.0012
    moon.rotation.y += 0.003
    stars.rotation.y += 0.00015
    camera.position.x += (pointer.x * 1.6 - camera.position.x) * 0.04
    camera.position.y += (-pointer.y * 1.0 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
    renderer.render(scene, camera)
  }
  const loop = () => {
    render()
    frame = requestAnimationFrame(loop)
  }
  const start = () => {
    if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop)
  }
  const stop = () => {
    cancelAnimationFrame(frame)
    frame = 0
  }

  // Only animate while the hero is on screen and the tab is visible
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) start()
    else stop()
  })
  const onVisibilityChange = () => (document.hidden ? stop() : start())

  if (reducedMotion) {
    // One still frame once the textures arrive
    DefaultLoadingManager.onLoad = render
    render()
  } else {
    window.addEventListener('pointermove', onPointerMove)
    document.addEventListener('visibilitychange', onVisibilityChange)
    visibility.observe(canvas)
    start()
  }

  return () => {
    stop()
    visibility.disconnect()
    resizeObserver.disconnect()
    window.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('visibilitychange', onVisibilityChange)
    for (const mesh of [venus, moon]) {
      mesh.geometry.dispose()
      mesh.material.dispose()
    }
    venusTexture.dispose()
    moonTexture.dispose()
    starGeometry.dispose()
    starMaterial.dispose()
    renderer.dispose()
  }
}
