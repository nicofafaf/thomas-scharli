export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-void">
      <div className="relative h-16 w-16">
        <span className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
        <span className="absolute inset-0 flex items-center justify-center font-display text-2xl text-gold">
          TS
        </span>
      </div>
      <p className="text-xs uppercase tracking-widest2 text-ash">Lädt…</p>
    </div>
  );
}
