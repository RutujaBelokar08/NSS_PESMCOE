type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left'
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`mb-10 max-w-3xl ${alignment}`}>
      <p className="editorial-kicker">{eyebrow}</p>
      <h2 className="editorial-subheading">{title}</h2>
      {description ? (
        <p className="mt-4 max-w-2xl editorial-copy sm:text-lg">{description}</p>
      ) : null}
    </div>
  )
}
