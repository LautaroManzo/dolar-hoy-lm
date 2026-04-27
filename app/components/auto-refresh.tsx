"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const REFRESH_INTERVAL_MS = 60_000;

export function AutoRefresh() {
  const router = useRouter();
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
      setUpdated(true);
      setTimeout(() => setUpdated(false), 3000);
    }, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {updated && "Cotizaciones actualizadas"}
    </div>
  );
}
