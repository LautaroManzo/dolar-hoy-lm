"use client";

import { createContext, useContext, useState } from "react";

interface InfoContextType {
  showInfo: boolean;
  setShowInfo: (v: boolean) => void;
}

const InfoContext = createContext<InfoContextType>({
  showInfo: false,
  setShowInfo: () => {},
});

export function InfoProvider({ children }: { children: React.ReactNode }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <InfoContext.Provider value={{ showInfo, setShowInfo }}>
      {children}
    </InfoContext.Provider>
  );
}

export function useInfo() {
  return useContext(InfoContext);
}