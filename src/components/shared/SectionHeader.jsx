function SectionHeader({ eyebrow, title, description, align = 'left', children }) {
  return (
    <div className={`flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : ''}`}>
      {eyebrow ? (
        <span className="inline-flex w-fit rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-orange-300">
          {eyebrow}
        </span>
      ) : null}
      <div className="space-y-3">
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
        {description ? <p className="max-w-2xl text-sm leading-7 text-white/60 sm:text-base">{description}</p> : null}
      </div>
      {children}
    </div>
  )
}

export default SectionHeader
