export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-void">
      <div className="relative flex items-center justify-center">
        <span className="absolute h-20 w-20 animate-ping border border-gold/20" />
        <span
          className="absolute h-14 w-14 animate-ping border border-gold/10"
          style={{ animationDelay: "0.3s" }}
        />
        <span className="flex h-16 w-16 items-center justify-center border border-gold/40">
          <span className="font-display text-2xl font-semibold text-bone">
            TS
          </span>
        </span>
      </div>

      <div className="relative h-px w-32 overflow-hidden bg-mist">
        <span
          className="absolute inset-y-0 left-0 bg-gold"
          style={{ animation: "loadBar 1.4s ease-in-out infinite" }}
        />
      </div>

      <style>{`
        @keyframes loadBar {
          0%   { left: -100%; width: 40%; }
          50%  { left: 30%; width: 60%; }
          100% { left: 100%; width: 40%; }
        }
      `}</style>
    </div>
  );
}
