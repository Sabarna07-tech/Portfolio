import Logo from '@/components/Logo';

export const metadata = {
  title: 'Signal Lost · 404',
};

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-24">
      {/* atmospheric glow */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 mb-8 animate-[spin_18s_linear_infinite]">
          <Logo className="w-full h-full" />
        </div>

        <p className="eyebrow text-[#79628c] mb-4">Error · Coordinate 404</p>

        <h1 className="font-headline text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-gradient leading-none mb-6">
          404
        </h1>

        <h2 className="font-headline text-xl sm:text-2xl font-bold text-white mb-4">
          Signal <span className="chip-lime">Lost</span>
        </h2>

        <p className="text-[#bdb8c0] max-w-md mb-10 leading-relaxed text-sm sm:text-base">
          This coordinate does not exist in the system. The page may have moved,
          been retired, or never deployed to this orbit.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/" className="btn-sentri-inverted text-center">
            RETURN TO BASE
          </a>
          <a href="/#portfolio" className="btn-sentri-ghost text-center">
            VIEW WORK
          </a>
        </div>

        <p className="mt-10 font-code text-xs text-[#79628c]">
          tip: press <span className="text-[#c2ef4e]">Ctrl/⌘ + K</span> to navigate
        </p>
      </div>
    </section>
  );
}
