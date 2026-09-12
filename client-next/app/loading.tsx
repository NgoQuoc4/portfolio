export default function Loading() {
  return (
    <div className="h-dvh w-full bg-canvas flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo mark */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-pink-500/20 animate-ping" />
          <div className="absolute inset-1 rounded-full border-2 border-pink-500/40 animate-pulse" />
          <div className="absolute inset-2 rounded-full bg-pink-500/20" />
        </div>
        <p className="text-xs font-mono text-ink-muted tracking-widest uppercase animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
