"use client";

import { useState, useEffect } from "react";
import { fetchAllDolars } from "../services/dolar";

export interface DolarType {
  id: string;
  name: string;
  price: number;
}

const DEFAULT_TYPES: DolarType[] = [
  { id: "blue", name: "Dólar Blue", price: 0 },
  { id: "oficial", name: "Dólar Oficial", price: 0 },
  { id: "bolsa", name: "Dólar MEP", price: 0 },
  { id: "contadoconliqui", name: "Dólar CCL", price: 0 },
  { id: "tarjeta", name: "Dólar Tarjeta", price: 0 },
  { id: "cripto", name: "Dólar Cripto", price: 0 },
];

export function useCalculator(isOpen: boolean) {
  const [amount, setAmount] = useState<string>("");
  const [dolarTypes, setDolarTypes] = useState<DolarType[]>(DEFAULT_TYPES);
  const [selectedDolar, setSelectedDolar] = useState<DolarType | null>(DEFAULT_TYPES[0]);
  const [isInverse, setIsInverse] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const loadDolarTypes = async () => {
      try {
        const allDolars = await fetchAllDolars();
        const find = (casa: string) =>
          allDolars.find((d) => d.casa === casa)?.compra ?? 0;
        const types: DolarType[] = [
          { id: "blue", name: "Dólar Blue", price: find("blue") },
          { id: "oficial", name: "Dólar Oficial", price: find("oficial") },
          { id: "bolsa", name: "Dólar MEP", price: find("bolsa") },
          { id: "contadoconliqui", name: "Dólar CCL", price: find("contadoconliqui") },
          { id: "tarjeta", name: "Dólar Tarjeta", price: find("tarjeta") },
          { id: "cripto", name: "Dólar Cripto", price: find("cripto") },
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

  const result =
    selectedDolar && amount
      ? isInverse
        ? Number(amount) * selectedDolar.price
        : Number(amount) / selectedDolar.price
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
    setSelectedDolar,
    isInverse,
    toggleInverse,
    result,
    clearAmount,
  };
}
