export default function SectionHeader({ eyebrow, title, description, color = "#5EEAD4" }) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] mb-3" style={{ color }}>
        {eyebrow}
      </p>
      <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink tracking-tight">{title}</h2>
      {description && <p className="mt-4 text-muted leading-relaxed">{description}</p>}
    </div>
  );
}
