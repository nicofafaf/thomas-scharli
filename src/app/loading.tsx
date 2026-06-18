import { Logo } from "@/components/Logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-void">
      <div className="relative flex items-center justify-center">
        <span className="absolute h-24 w-24 animate-ping border border-gold/20" />
        <span
          className="absolute h-16 w-16 animate-ping border border-gold/10"
          style={{ animationDelay: "0.35s" }}
        />
        <span className="border border-gold/40 p-3">
          <Logo size={40} showText={false} />
        </span>
      </div>

      <div className="relative h-px w-32 overflow-hidden bg-mist">
        <span
          className="absolute inset-y-0 left-0 bg-gold"
          style={{ animation: "tsLoad 1.4s ease-in-out infinite" }}
        />
      </div>

      <style>{`
        @keyframes tsLoad {
          0%   { left: -100%; width: 40%; }
          50%  { left: 30%;   width: 60%; }
          100% { left: 110%;  width: 40%; }
        }
      `}</style>
    </div>
  );
}
