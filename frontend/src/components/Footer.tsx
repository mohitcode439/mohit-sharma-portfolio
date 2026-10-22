const currentYear = new Date().getFullYear()

export function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-line/60">
      <p className="mx-auto max-w-5xl px-5 py-8 text-sm text-muted sm:px-8">
        © {currentYear} {name}
      </p>
    </footer>
  )
}
