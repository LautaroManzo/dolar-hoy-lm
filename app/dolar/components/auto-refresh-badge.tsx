"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const getFormattedTime = () =>
  new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date());

export function AutoRefreshBadge() {
  const router = useRouter();
  const [message, setMessage] = useState(
    `Última actualización hoy a las ${getFormattedTime()} hs`
  );

  useEffect(() => {
    const doRefresh = () => {
      router.refresh();
      setMessage(`Última actualización hoy a las ${getFormattedTime()} hs`);
    };

    doRefresh();

    const interval = setInterval(doRefresh, 300000);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <p className="bg-white/95 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-blue-100 shadow-sm text-sm text-[#1e3a5f] font-bold">
      {message}
    </p>
  );
}
