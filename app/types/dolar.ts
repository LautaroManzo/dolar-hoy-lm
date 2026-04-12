export interface VariationData {
  percent: number;
  percentAbs: number;
  sign: "up" | "down" | "neutral";
  dailyDiff: number;
  dailyDiffSign: "up" | "down" | "neutral";
}

export interface DolarResponse {
  buy: number;
  sell: number;
  buyVariation: VariationData;
  sellVariation: VariationData;
  spread: number;
  spreadSign: "up" | "down" | "neutral";
  fechaActualizacion: string;
  horaActualizacion: string;
}

export interface DolarCardData extends DolarResponse {
  title: string;
  descripcion: string;
  extra: string;
  horaOperacion: string;
}
