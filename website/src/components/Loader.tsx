import Logo from './Logo';

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-5">
      <div className="floaty">
        <Logo />
      </div>
      <p className="font-script text-3xl text-berry" aria-hidden="true">
        whipping things up…
      </p>
      <div className="flex gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-berry"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
      <span className="sr-only">Loading Fluff Cakes content…</span>
    </div>
  );
}

export function PageError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5 py-16 text-center">
      <p className="font-script text-4xl text-berry">oh crumbs.</p>
      <p className="font-display text-3xl text-cocoa-deep">Something didn't rise quite right.</p>
      <p className="max-w-md text-sm leading-relaxed text-cocoa/75">{message}</p>
      <button
        onClick={onRetry}
        className="mt-2 rounded-full bg-berry px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-berry-deep"
      >
        Try again
      </button>
    </div>
  );
}
