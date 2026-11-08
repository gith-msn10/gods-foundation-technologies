export default function SectionHeading({ id, title, children, light = false, align = 'left' }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <h2 id={id} className={`text-2xl font-bold tracking-tight sm:text-3xl ${light ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      {children && <p className={`mt-3 leading-relaxed ${light ? 'text-slate-300' : 'text-muted'}`}>{children}</p>}
    </div>
  );
}
