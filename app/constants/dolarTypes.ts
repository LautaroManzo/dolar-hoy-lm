export interface DolarEntry {
  api: string;
  title: string;
  desc: string;
  extra: string;
  hora: string;
}

export type DolarEntries = Record<string, [string, string, string, string, string]>;

export const DOLAR_ENTRIES: DolarEntries = {
  blue: [
    "blue", 
    "Dólar Blue", 
    "Cotización del mercado paralelo e informal.", 
    "Se opera habitualmente en efectivo y sin límites.", 
    "De 11:00hs a 16:00hs."
  ],
  oficial: [
    "oficial", 
    "Dólar Oficial", 
    "Valor de referencia determinado por el Banco Central.", 
    "Base para el cálculo de impuestos y contratos legales.", 
    "De 10:00hs a 15:00hs."
  ],
  mep: [
    "bolsa", 
    "Dólar MEP", 
    "Compra legal de dólares mediante bonos nacionales.", 
    "Se acredita de forma segura en tu cuenta bancaria.", 
    "De 11:30hs a 18:00hs."
  ],
  ccl: [
    "contadoconliqui", 
    "Dólar CCL", 
    "Cambio de pesos por dólares en el exterior vía bonos.", 
    "Utilizado mayormente por empresas para girar fondos.", 
    "De 11:30hs a 18:00hs."
  ],
  tarjeta: [
    "tarjeta", 
    "Dólar Tarjeta", 
    "Precio para consumos y servicios en moneda extranjera.", 
    "Incluye el valor oficial más impuestos y percepciones. Aplica para servicios digitales y gastos en el exterior.",
    "24 horas, los 7 días de la semana."
  ],
  cripto: [
    "cripto", 
    "Dólar Cripto", 
    "Cotización de monedas digitales como el USDT o USDC.", 
    "Permite operar libremente sin restricciones ni cepos.", 
    "24 horas, los 7 días de la semana."
  ],
};
