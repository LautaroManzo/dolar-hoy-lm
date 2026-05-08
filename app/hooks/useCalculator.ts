"use client";

import { useState, useEffect, useCallback } from "react";
import { parseNum } from "../utils/format";
import { toApiCasa } from "../constants/dolarTypes";

const LS_KEY = "calculator_selected_dolar";

export interface DolarType {
  id: string;
  name: string;
  compra: number;
  venta: number;
}

interface InitialRates {
  [key: string]: { buy: number; sell: number };
}

const DOLAR_DEFS = [
  { id: "blue", name: "Dólar Blue" },
  { id: "oficial", name: "Dólar Oficial" },
  { id: "mep", name: "Dólar MEP" },
  { id: "ccl", name: "Dólar CCL" },
  { id: "tarjeta", name: "Dólar Tarjeta" },
  { id: "cripto", name: "Dólar Cripto" },
] as const;

function buildTypes(rates: InitialRates): DolarType[] {
  return DOLAR_DEFS.map(({ id, name }) => ({
    id,
    name,
    compra: rates[id]?.buy ?? 0,
    venta: rates[id]?.sell ?? 0,
  }));
}

function getSavedId(): string {
  try {
    return localStorage.getItem(LS_KEY) ?? "blue";
  } catch {
    return "blue";
  }
}

export function useCalculator(isOpen: boolean, initialRates?: InitialRates) {
  const hasInitialData = initialRates && Object.keys(initialRates).length > 0;
  const initialTypes = hasInitialData ? buildTypes(initialRates) : [];

  const [amount, setAmount] = useState<string>("");
  const [dolarTypes, setDolarTypes] = useState<DolarType[]>(initialTypes);
  const [selectedDolar, setSelectedDolar] = useState<DolarType | null>(() => {
    const savedId = getSavedId();
    return initialTypes.find((t) => t.id === savedId) ?? initialTypes[0] ?? null;
  });
  const [isInverse, setIsInverse] = useState(false);
  const [rateMode, setRateMode] = useState<'venta' | 'compra'>('venta');
  const [isLoading, setIsLoading] = useState(!hasInitialData);

  useEffect(() => {
    if (!isOpen || hasInitialData) return;

    const controller = new AbortController();

    const loadDolarTypes = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/dolares", { signal: controller.signal });
        const { data: allDolars }: { data: { casa: string; compra: number; venta: number }[] } = await res.json();
        const find = (id: string, field: "compra" | "venta") =>
          allDolars.find((d) => d.casa === toApiCasa(id))?.[field] ?? 0;
        const types: DolarType[] = DOLAR_DEFS.map(({ id, name }) => ({
          id,
          name,
          compra: find(id, "compra"),
          venta: find(id, "venta"),
        }));
        setDolarTypes(types);
        setSelectedDolar((prev) =>
          prev ? types.find((t) => t.id === prev.id) ?? types[0] : types[0]
        );
        setIsLoading(false);
      } catch (error) {
        if (!controller.signal.aborted) console.error("Error loading dolar types:", error);
      }
    };

    loadDolarTypes();
    return () => controller.abort();
  }, [isOpen, hasInitialData]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSelectDolar = (dolar: DolarType) => {
    setSelectedDolar(dolar);
    try {
      localStorage.setItem(LS_KEY, dolar.id);
    } catch {}
  };

  const activeRate = selectedDolar ? selectedDolar[rateMode] : 0;

  const result =
    selectedDolar && amount
      ? isInverse
        ? parseNum(amount) * activeRate
        : parseNum(amount) / activeRate
      : 0;

  const clearAmount = useCallback(() => setAmount(""), []);

  const toggleInverse = useCallback(() => {
    setIsInverse((prev) => !prev);
    setAmount("");
  }, []);

  return {
    amount,
    setAmount,
    dolarTypes,
    selectedDolar,
    setSelectedDolar: handleSelectDolar,
    isInverse,
    toggleInverse,
    rateMode,
    setRateMode,
    result,
    clearAmount,
    isLoading,
  };
}
