interface StaleBannerProps {
  staleAt?: string;
}

export default function StaleBanner({ staleAt }: StaleBannerProps) {
  return (
    <div
      className="w-full bg-amber-50 border border-amber-200 text-amber-800 text-sm px-4 py-2.5 rounded-xl text-center"
      role="alert"
    >
      Mostrando última cotización disponible
      {staleAt && <span className="opacity-70"> — {staleAt} hs</span>}
      . La API no responde en este momento.
    </div>
  );
}
