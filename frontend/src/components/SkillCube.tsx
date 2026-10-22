// A slowly spinning CSS 3D cube with the core stack on its faces (no library needed)
const faces = ['Java', 'Spring Boot', 'Microservices', 'React', 'TypeScript', 'PostgreSQL']

const HALF = 80 // half the cube size in px

const faceTransforms = [
  `rotateY(0deg) translateZ(${HALF}px)`,
  `rotateY(90deg) translateZ(${HALF}px)`,
  `rotateY(180deg) translateZ(${HALF}px)`,
  `rotateY(-90deg) translateZ(${HALF}px)`,
  `rotateX(90deg) translateZ(${HALF}px)`,
  `rotateX(-90deg) translateZ(${HALF}px)`,
]

export function SkillCube() {
  return (
    <div aria-hidden="true" className="flex flex-col items-center py-6 [perspective:800px]">
      <div className="relative h-40 w-40 animate-cube [transform-style:preserve-3d]">
        {faces.map((label, index) => (
          <div
            key={label}
            style={{ transform: faceTransforms[index] }}
            className="absolute inset-0 flex items-center justify-center rounded-xl border border-accent/50 bg-gradient-to-br from-accent/30 via-panel/90 to-ink/90 p-3 text-center font-mono text-lg font-semibold text-white shadow-[inset_0_0_30px_rgb(139_124_255/0.25)] [backface-visibility:hidden]"
          >
            {label}
          </div>
        ))}
      </div>
      {/* Soft shadow under the cube */}
      <div className="mt-16 h-4 w-40 rounded-[50%] bg-accent/25 blur-md" />
    </div>
  )
}
