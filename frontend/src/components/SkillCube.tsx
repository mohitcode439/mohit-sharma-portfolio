// Spinning CSS 3D cubes, one per skill area (no library needed)

export interface CubeTheme {
  /** Face background, border and glow (full Tailwind class strings, so they are kept in the build) */
  face: string
  /** Colour of the label under the cube and of its shadow */
  label: string
  shadow: string
}

interface SkillCubeProps {
  title: string
  /** Exactly six labels, one per face */
  faces: string[]
  theme: CubeTheme
  /** Seconds per full turn */
  seconds: number
  reverse?: boolean
}

// Face positions for a cube whose half-size is --half (set responsively below)
const faceTransforms = [
  'rotateY(0deg)',
  'rotateY(90deg)',
  'rotateY(180deg)',
  'rotateY(-90deg)',
  'rotateX(90deg)',
  'rotateX(-90deg)',
].map((rotation) => `${rotation} translateZ(var(--half))`)

export function SkillCube({ title, faces, theme, seconds, reverse = false }: SkillCubeProps) {
  return (
    <figure className="flex flex-col items-center [--half:2.2rem] [perspective:700px] min-[400px]:[--half:2.5rem] sm:[--half:4rem]">
      <div
        aria-hidden="true"
        style={{ animationDuration: `${seconds}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
        className="relative my-8 h-[calc(var(--half)*2)] w-[calc(var(--half)*2)] animate-cube [transform-style:preserve-3d]"
      >
        {faces.map((label, index) => (
          <div
            key={label}
            style={{ transform: faceTransforms[index] }}
            className={`absolute inset-0 flex items-center justify-center rounded-xl border bg-gradient-to-br p-1 text-center font-mono text-[0.6rem] leading-tight font-semibold min-[400px]:text-xs sm:p-2 text-white [backface-visibility:hidden] sm:text-sm ${theme.face}`}
          >
            {label}
          </div>
        ))}
      </div>
      <div aria-hidden="true" className={`h-3 w-[calc(var(--half)*2)] rounded-[50%] blur-md ${theme.shadow}`} />
      <figcaption className={`mt-5 font-mono text-xs tracking-widest uppercase sm:text-sm ${theme.label}`}>
        {title}
        {/* The faces are decorative; list them for screen readers */}
        <span className="sr-only">: {faces.join(', ')}</span>
      </figcaption>
    </figure>
  )
}
