"use client";

import { useState, useEffect } from "react";
import { parseNum } from "../utils/format";
import { fetchAllDolars } from "../services/dolar";

const LS_KEY = "calculator_selected_dolar";

export interface DolarType {
  id: string;
  name: string;
  compra: number;
  venta: number;
}

const DEFAULT_TYPES: DolarType[] = [
  { id: "blue", name: "Dólar Blue", compra: 0, venta: 0 },
  { id: "oficial", name: "Dólar Oficial", compra: 0, venta: 0 },
  { id: "bolsa", name: "Dólar MEP", compra: 0, venta: 0 },
  { id: "contadoconliqui", name: "Dólar CCL", compra: 0, venta: 0 },
  { id: "tarjeta", name: "Dólar Tarjeta", compra: 0, venta: 0 },
  { id: "cripto", name: "Dólar Cripto", compra: 0, venta: 0 },
];

function getSavedId(): string {
  try {
    return localStorage.getItem(LS_KEY) ?? "blue";
  } catch {
    return "blue";
  }
}

export function useCalculator(isOpen: boolean) {
  const [amount, setAmount] = useState<string>("");
  const [dolarTypes, setDolarTypes] = useState<DolarType[]>(DEFAULT_TYPES);
  const [selectedDolar, setSelectedDolar] = useState<DolarType | null>(null);
  const [isInverse, setIsInverse] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const savedId = getSavedId();
    setSelectedDolar(DEFAULT_TYPES.find((t) => t.id === savedId) ?? DEFAULT_TYPES[0]);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!isOpen) return;

    const loadDolarTypes = async () => {
      try {
        const allDolars = await fetchAllDolars();
        const find = (casa: string, field: "compra" | "venta") =>
          allDolars.find((d) => d.casa === casa)?.[field] ?? 0;
        const types: DolarType[] = [
          { id: "blue", name: "Dólar Blue", compra: find("blue", "compra"), venta: find("blue", "venta") },
          { id: "oficial", name: "Dólar Oficial", compra: find("oficial", "compra"), venta: find("oficial", "venta") },
          { id: "bolsa", name: "Dólar MEP", compra: find("bolsa", "compra"), venta: find("bolsa", "venta") },
          { id: "contadoconliqui", name: "Dólar CCL", compra: find("contadoconliqui", "compra"), venta: find("contadoconliqui", "venta") },
          { id: "tarjeta", name: "Dólar Tarjeta", compra: find("tarjeta", "compra"), venta: find("tarjeta", "venta") },
          { id: "cripto", name: "Dólar Cripto", compra: find("cripto", "compra"), venta: find("cripto", "venta") },
        ];
        setDolarTypes(types);
        setSelectedDolar((prev) =>
          prev ? types.find((t) => t.id === prev.id) ?? types[0] : types[0]
        );
      } catch (error) {
        console.error("Error loading dolar types:", error);
      }
    };

    loadDolarTypes();
  }, [isOpen]);

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

  // ARS → USD: el usuario compra dólares, paga el precio de venta
  // USD → ARS: el usuario vende dólares, recibe el precio de compra
  const result =
    selectedDolar && amount
      ? isInverse
        ? parseNum(amount) * selectedDolar.compra
        : parseNum(amount) / selectedDolar.venta
      : 0;

  const clearAmount = () => setAmount("");

  const toggleInverse = () => {
    setIsInverse((prev) => !prev);
    setAmount("");
  };

  return {
    amount,
    setAmount,
    dolarTypes,
    selectedDolar,
    setSelectedDolar: handleSelectDolar,
    isInverse,
    toggleInverse,
    result,
    clearAmount,
  };
}
