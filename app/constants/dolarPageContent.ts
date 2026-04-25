export interface DolarFaq {
  pregunta: string;
  respuesta: string;
}

export interface DolarEditorialSection {
  titulo: string;
  cuerpo: string;
}

export interface DolarPageContent {
  slug: string;
  tipoKey: string;
  apiCasa: string;
  tipoHistorico: string;
  h1: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  editorial: DolarEditorialSection[];
  faq: DolarFaq[];
}

export const DOLAR_PAGE_CONTENT: Record<string, DolarPageContent> = {
  blue: {
    slug: 'dolar/blue',
    tipoKey: 'blue',
    apiCasa: 'blue',
    tipoHistorico: 'blue',
    h1: 'Dólar Blue hoy en Argentina',
    subtitle: 'Mercado paralelo · Precio informal actualizado',
    metaTitle: 'Dólar Blue Hoy | Cotización en tiempo real — DolarInfoHoy',
    metaDescription: 'Consultá el precio del dólar blue hoy: compra, venta y variación en tiempo real. Histórico, brecha cambiaria y todo lo que necesitás saber sobre el mercado informal.',
    editorial: [
      { titulo: '¿Qué es el dólar blue?', cuerpo: 'El <strong>dólar blue</strong> es el tipo de cambio <strong>paralelo</strong> más seguido de Argentina. Su cotización surge de la <strong>oferta y la demanda</strong> en el <strong>mercado informal</strong>, fuera del sistema bancario y de las regulaciones del <strong>Banco Central (BCRA)</strong>. A diferencia del dólar oficial, su precio no lo fija ningún organismo: lo determina la negociación directa entre compradores y vendedores.' },
      { titulo: '¿Cómo funciona?', cuerpo: 'Las operaciones se realizan principalmente <strong>en efectivo</strong>, en casas de cambio informales conocidas como <strong>"cuevas"</strong> o a través de intermediarios llamados <strong>"arbolitos"</strong>. Los horarios de mayor actividad van de las <strong>11:00 a las 16:00 horas</strong> en días hábiles. No existe un mercado centralizado: el precio que ves en esta página surge del promedio de las operaciones reportadas en el mercado.' },
      { titulo: 'Marco legal', cuerpo: 'La compra y venta de dólares blue <strong>no está autorizada por el BCRA</strong>. Sin embargo, la simple <strong>tenencia de dólares en efectivo no constituye un delito</strong> en Argentina. La actividad opera en una <strong>zona gris</strong>: no está explícitamente penalizada para particulares, pero tampoco está regulada ni garantizada por ningún organismo.' },
      { titulo: '¿Por qué existe?', cuerpo: 'Su origen está ligado al <strong>cepo cambiario</strong>, el conjunto de restricciones que limitan el acceso al mercado oficial de divisas. Cuando el Estado restringe la compra de dólares, parte de la demanda migra al mercado informal, haciendo que el blue cotice <strong>por encima del oficial</strong>. Esta diferencia se conoce como <strong>brecha cambiaria</strong>.' },
      { titulo: 'Usos cotidianos', cuerpo: 'Muchas <strong>transacciones inmobiliarias</strong> se pactan en blue, especialmente cuando los propietarios desconfían del tipo de cambio oficial. También es referencia para quienes buscan <strong>dolarizar ahorros</strong> sin cupo disponible en el mercado formal. Su <strong>alta volatilidad</strong> hace fundamental consultarlo en tiempo real antes de operar.' },
    ],
    faq: [
      { pregunta: '¿Es legal comprar dólar blue?', respuesta: 'La compraventa de dólares blue no está autorizada por el BCRA y se considera una operación en el mercado informal. Sin embargo, la tenencia de dólares en efectivo no está penalizada para particulares en Argentina.' },
      { pregunta: '¿Dónde se compra dólar blue?', respuesta: 'Se opera en casas de cambio informales ("cuevas") y a través de particulares. No existe un mercado centralizado ni una institución oficial que lo respalde.' },
      { pregunta: '¿Por qué el dólar blue es más caro que el oficial?', respuesta: 'Porque el acceso al dólar oficial está limitado por el cepo cambiario. Esa restricción genera exceso de demanda en el mercado informal, elevando el precio por encima del tipo de cambio regulado.' },
      { pregunta: '¿Qué es la brecha cambiaria?', respuesta: 'Es la diferencia porcentual entre el dólar blue y el dólar oficial. Una brecha alta indica mayor desconfianza en la política cambiaria y mayor presión inflacionaria.' },
      { pregunta: '¿Cómo afecta el dólar blue a los precios en Argentina?', respuesta: 'Sirve de referencia para transacciones inmobiliarias, bienes durables y contratos entre privados. Su suba suele anticipar aumentos de precios al consumidor, ya que muchos formadores de precios lo toman como referencia.' },
    ],
  },

  oficial: {
    slug: 'dolar/oficial',
    tipoKey: 'oficial',
    apiCasa: 'oficial',
    tipoHistorico: 'oficial',
    h1: 'Dólar Oficial hoy en Argentina',
    subtitle: 'Tipo de cambio minorista regulado por el BCRA',
    metaTitle: 'Dólar Oficial Hoy | Cotización en tiempo real — DolarInfoHoy',
    metaDescription: 'Precio del dólar oficial hoy en Argentina: compra, venta y variación diaria. Tipo de cambio minorista del BCRA actualizado en tiempo real.',
    editorial: [
      { titulo: '¿Qué es el dólar oficial?', cuerpo: 'El <strong>dólar oficial</strong> es el tipo de cambio de referencia <strong>establecido y regulado por el BCRA</strong>. Representa el valor al que los <strong>bancos y casas de cambio habilitadas</strong> pueden vender divisas al público general, dentro del marco legal vigente.' },
      { titulo: '¿Cómo acceder?', cuerpo: 'Para acceder al dólar oficial minorista, es necesario operar a través de <strong>entidades bancarias autorizadas</strong> o <strong>casas de cambio reguladas</strong>. El horario de atención suele ser de <strong>10:00 a 15:00 horas</strong> en días hábiles bancarios. Las transacciones quedan <strong>registradas ante la AFIP y el BCRA</strong>.' },
      { titulo: 'El cepo cambiario', cuerpo: 'El Gobierno ha aplicado restricciones mediante el <strong>"cepo cambiario"</strong>. Estas medidas <strong>limitan la cantidad de dólares</strong> que una persona puede adquirir mensualmente para atesoramiento, encarecen las compras con tarjeta en el exterior y condicionan las importaciones.' },
      { titulo: 'Su rol en la economía', cuerpo: 'El dólar oficial es la base de cálculo para <strong>aranceles de importación y exportación</strong>, <strong>deudas en moneda extranjera</strong>, contratos de alquiler indexados y <strong>retenciones impositivas</strong>. Su evolución tiene consecuencias directas en el conjunto de la economía.' },
      { titulo: 'Para el ahorrista', cuerpo: 'El tipo de cambio oficial sirve como referencia para calcular el <strong>dólar tarjeta</strong> (oficial más impuestos) y para entender la distancia que separa al <strong>mercado regulado del mercado libre</strong>. Su seguimiento diario permite anticipar posibles ajustes en la <strong>política cambiaria del BCRA</strong>.' },
    ],
    faq: [
      { pregunta: '¿Qué diferencia hay entre dólar oficial y dólar blue?', respuesta: 'El dólar oficial es el tipo de cambio regulado por el BCRA, al que se puede acceder legalmente a través de bancos. El blue es el precio del mercado informal y suele ser significativamente más alto debido a las restricciones de acceso al mercado oficial.' },
      { pregunta: '¿Cuántos dólares oficiales puedo comprar por mes?', respuesta: 'Los límites varían según la normativa vigente del BCRA. Históricamente se permitían hasta USD 200 mensuales para atesoramiento, pero este cupo ha sido modificado o suspendido en distintos momentos según la política cambiaria.' },
      { pregunta: '¿Qué impuestos se aplican al dólar oficial?', respuesta: 'Dependiendo del destino, pueden aplicarse el impuesto PAIS, la percepción a cuenta de Bienes Personales y Ganancias, y otras retenciones. Estas cargas elevan el costo efectivo por encima del tipo de cambio oficial publicado.' },
      { pregunta: '¿Qué es el dólar ahorro?', respuesta: 'Es el dólar oficial con las cargas impositivas correspondientes a la compra para atesoramiento. Su precio resulta sensiblemente más alto que el tipo de cambio oficial de referencia.' },
      { pregunta: '¿El dólar oficial puede devaluarse de golpe?', respuesta: 'Sí. Argentina tiene antecedentes de devaluaciones abruptas ("saltos cambiarios") cuando el BCRA decide corregir el tipo de cambio. Por eso, muchos agentes económicos siguen también los tipos de cambio alternativos como señales de presión sobre el oficial.' },
    ],
  },

  mep: {
    slug: 'dolar/mep',
    tipoKey: 'mep',
    apiCasa: 'bolsa',
    tipoHistorico: 'bolsa',
    h1: 'Dólar MEP hoy en Argentina',
    subtitle: 'Compra legal de dólares mediante bonos en el mercado de capitales',
    metaTitle: 'Dólar MEP Hoy | Cotización en tiempo real — DolarInfoHoy',
    metaDescription: 'Precio del dólar MEP hoy: compra legal de dólares a través del mercado de bonos. Cotización actualizada, cómo operarlo y diferencias con el CCL.',
    editorial: [
      { titulo: '¿Qué es el dólar MEP?', cuerpo: 'El <strong>dólar MEP</strong> (Mercado Electrónico de Pagos), también llamado <strong>dólar bolsa</strong>, es una forma <strong>completamente legal</strong> de adquirir dólares en Argentina a través del <strong>mercado de capitales</strong>. Los fondos se acreditan en cuentas bancarias locales en moneda extranjera.' },
      { titulo: '¿Cómo operar?', cuerpo: 'Se compra un bono en pesos (como el <strong>AL30</strong> o el <strong>GD30</strong>) y se vende el equivalente en dólares. La diferencia de precios define el <strong>tipo de cambio implícito</strong>. Para operar, se necesita una <strong>cuenta comitente en un broker habilitado por la CNV</strong>.' },
      { titulo: 'El parking', cuerpo: 'Entre la compra en pesos y la venta en dólares debe transcurrir <strong>al menos un día hábil</strong>. Este requisito se denomina <strong>"parking"</strong> y fue establecido por el BCRA para evitar operaciones especulativas de corto plazo.' },
      { titulo: 'Precio y contexto', cuerpo: 'El MEP suele cotizar <strong>por encima del oficial pero cerca del blue</strong>. Al operar dentro del <strong>mercado regulado</strong>, las transacciones quedan registradas ante los organismos de control, a diferencia del mercado informal.' },
      { titulo: 'Costos operativos', cuerpo: 'Los costos incluyen <strong>comisiones del broker</strong> (entre <strong>0,1% y 0,5%</strong>) y el spread del bono. A diferencia de los bancos, los brokers operan dentro del <strong>horario bursátil</strong> sin los cupos restrictivos del mercado oficial.' },
    ],
    faq: [
      { pregunta: '¿Es legal comprar dólar MEP?', respuesta: 'Sí, es completamente legal. La operación se realiza dentro del mercado de capitales regulado por la CNV y el BCRA. Los fondos provienen de cuentas declaradas y el proceso queda registrado ante la AFIP.' },
      { pregunta: '¿Qué necesito para comprar dólar MEP?', respuesta: 'Necesitás tener una cuenta comitente activa en un broker habilitado por la CNV. Muchos permiten abrir la cuenta en forma 100% online. También es necesario tener fondos en pesos declarados en esa cuenta.' },
      { pregunta: '¿Qué es el "parking" en el dólar MEP?', respuesta: 'Es el período mínimo que debés mantener el bono en cartera antes de poder venderlo en dólares. Actualmente es de 1 día hábil, aunque puede variar según normativas del BCRA.' },
      { pregunta: '¿Cuánto cuesta operar dólar MEP?', respuesta: 'El costo principal son las comisiones del broker (entre 0,1% y 0,5% por operación) y el spread entre el precio de compra y venta del bono. No hay impuestos adicionales sobre la operación en sí.' },
      { pregunta: '¿El MEP es lo mismo que el CCL?', respuesta: 'No. Ambos usan bonos para dolarizarse, pero el MEP acredita los dólares en una cuenta bancaria local, mientras que el CCL liquida los fondos en el exterior. Por eso el CCL suele cotizar más alto.' },
    ],
  },

  ccl: {
    slug: 'dolar/ccl',
    tipoKey: 'ccl',
    apiCasa: 'contadoconliqui',
    tipoHistorico: 'contadoconliqui',
    h1: 'Dólar CCL hoy en Argentina',
    subtitle: 'Tipo de cambio financiero para girar divisas al exterior',
    metaTitle: 'Dólar CCL (Contado con Liquidación) Hoy | Cotización — DolarInfoHoy',
    metaDescription: 'Precio del dólar CCL hoy en Argentina. Contado con liquidación actualizado en tiempo real: compra, venta, variación y cómo operarlo legalmente.',
    editorial: [
      { titulo: '¿Qué es el dólar CCL?', cuerpo: 'El <strong>dólar CCL</strong> (Contado con Liquidación) es un mecanismo <strong>completamente legal</strong> para convertir pesos en dólares que se acreditan <strong>en una cuenta bancaria en el exterior</strong>. Es el tipo de cambio financiero <strong>más alto del mercado regulado</strong>, utilizado principalmente por empresas e inversores institucionales.' },
      { titulo: '¿Cómo funciona?', cuerpo: 'Se compra un <strong>bono o acción</strong> que cotiza tanto en Argentina como en el exterior en pesos, y se vende ese mismo activo en dólares en un mercado externo, generalmente <strong>Nueva York</strong>. La diferencia de precios entre ambas operaciones define el <strong>tipo de cambio implícito del CCL</strong>.' },
      { titulo: '¿Para qué se usa?', cuerpo: 'El CCL permite <strong>girar fondos al exterior de forma legal</strong>. Es la herramienta preferida de empresas que necesitan <strong>pagar proveedores del exterior</strong>, remitir dividendos o mantener activos fuera del alcance de posibles restricciones cambiarias.' },
      { titulo: 'Precio y condiciones', cuerpo: 'El CCL suele ser <strong>el más alto entre los tipos financieros</strong>, ya que implica la acreditación en el exterior. También está sujeto al <strong>"parking" del BCRA</strong>, aunque sus plazos pueden diferir de los del MEP según la normativa vigente.' },
      { titulo: 'Requisitos', cuerpo: 'Se requiere una <strong>cuenta comitente en un broker local</strong> y una <strong>cuenta bancaria en el exterior</strong> (Uruguay, Estados Unidos, España, etc.). Los fondos deben estar <strong>declarados ante la AFIP</strong>. Es una herramienta de planificación financiera de mediano y largo plazo.' },
    ],
    faq: [
      { pregunta: '¿Qué diferencia hay entre el CCL y el MEP?', respuesta: 'La diferencia principal es el destino de los fondos. El MEP acredita dólares en una cuenta bancaria local en Argentina, mientras que el CCL los gira a una cuenta en el exterior. Por eso el CCL suele cotizar más caro.' },
      { pregunta: '¿Es legal el dólar CCL?', respuesta: 'Sí, es completamente legal. La operación se realiza a través del mercado de capitales regulado por la CNV y el BCRA, con fondos declarados ante la AFIP.' },
      { pregunta: '¿Quiénes usan el dólar CCL?', respuesta: 'Principalmente empresas con operaciones internacionales, inversores que desean mantener activos fuera del sistema financiero argentino y personas con obligaciones de pago en el exterior.' },
      { pregunta: '¿Necesito cuenta en el exterior para operar CCL?', respuesta: 'Sí. A diferencia del MEP, el CCL requiere una cuenta bancaria habilitada en el extranjero (por ejemplo, en Uruguay o Estados Unidos) donde se acrediten los dólares.' },
      { pregunta: '¿Cuánto cuesta operar dólar CCL?', respuesta: 'Los costos incluyen comisiones del broker local, posibles comisiones del banco del exterior y el spread del bono o activo utilizado. En total, suelen estar entre 0,2% y 1% del monto operado.' },
    ],
  },

  tarjeta: {
    slug: 'dolar/tarjeta',
    tipoKey: 'tarjeta',
    apiCasa: 'tarjeta',
    tipoHistorico: 'tarjeta',
    h1: 'Dólar Tarjeta hoy en Argentina',
    subtitle: 'Tipo de cambio para compras en el exterior y servicios digitales',
    metaTitle: 'Dólar Tarjeta Hoy | Cotización actualizada — DolarInfoHoy',
    metaDescription: 'Precio del dólar tarjeta hoy: tipo de cambio para consumos con tarjeta en el exterior, servicios digitales y plataformas internacionales. Actualizado en tiempo real.',
    editorial: [
      { titulo: '¿Qué es el dólar tarjeta?', cuerpo: 'El <strong>dólar tarjeta</strong> es el tipo de cambio que se aplica automáticamente a los <strong>gastos con tarjeta de crédito o débito en moneda extranjera</strong>: compras en el exterior, reservas de viajes, suscripciones a servicios como <strong>Netflix, Spotify, Amazon o Adobe</strong>.' },
      { titulo: '¿Cómo se calcula?', cuerpo: 'Su precio resulta de sumar al <strong>dólar oficial minorista</strong> las cargas impositivas vigentes. Históricamente incluyó el <strong>impuesto PAIS (30%)</strong> y la <strong>percepción a cuenta de Ganancias y Bienes Personales (45%)</strong>. El cobro es automático en el resumen de tarjeta.' },
      { titulo: 'Para viajeros', cuerpo: 'El dólar tarjeta representa el <strong>costo real de cada gasto en el exterior</strong>. Comparar si conviene pagar con tarjeta o llevar <strong>efectivo comprado a precio blue o MEP</strong> puede implicar una diferencia significativa en el presupuesto del viaje.' },
      { titulo: 'Servicios digitales', cuerpo: 'El dólar tarjeta impacta directamente en el costo de <strong>suscripciones internacionales</strong>. Cuando la <strong>brecha cambiaria</strong> es alta, muchas plataformas ajustan sus precios para el mercado argentino o cobran directamente en pesos.' },
      { titulo: 'Impuestos recuperables', cuerpo: 'La <strong>percepción del 45%</strong> es recuperable: se acredita como saldo a favor en <strong>Ganancias o Bienes Personales</strong> en la declaración anual. Para contribuyentes inscriptos, el <strong>costo neto es menor</strong> que el bruto que figura en el resumen.' },
    ],
    faq: [
      { pregunta: '¿A qué tipo de cambio se convierten las compras con tarjeta?', respuesta: 'Se aplica el dólar oficial más las cargas impositivas vigentes (impuesto PAIS y percepciones a cuenta de Ganancias/Bienes Personales). El resultado es lo que se conoce como dólar tarjeta.' },
      { pregunta: '¿El dólar tarjeta aplica a las suscripciones digitales?', respuesta: 'Sí. Netflix, Spotify, YouTube Premium, Adobe y otros servicios digitales internacionales facturan en dólares, por lo que se les aplica el tipo de cambio tarjeta al momento del cobro.' },
      { pregunta: '¿Puedo recuperar los impuestos del dólar tarjeta?', respuesta: 'La percepción del 45% se acredita como pago a cuenta de Ganancias o Bienes Personales, por lo que es recuperable en la declaración anual. Si no sos contribuyente inscripto, podés solicitar la devolución ante la AFIP.' },
      { pregunta: '¿Conviene pagar en efectivo o con tarjeta en el exterior?', respuesta: 'Depende de la brecha cambiaria. Si el blue o MEP cotizan muy por encima del tarjeta, llevar efectivo puede ser más conveniente. En épocas de brecha baja, la diferencia es menor.' },
      { pregunta: '¿El dólar tarjeta aplica si pago en pesos en el exterior?', respuesta: 'Si elegís pagar en pesos en el exterior (DCC - Dynamic Currency Conversion), la conversión la hace el comercio a un tipo de cambio que suele ser desfavorable. Siempre conviene pagar en la moneda local del país donde estás.' },
    ],
  },

  cripto: {
    slug: 'dolar/cripto',
    tipoKey: 'cripto',
    apiCasa: 'cripto',
    tipoHistorico: 'cripto',
    h1: 'Dólar Cripto hoy en Argentina',
    subtitle: 'Stablecoins y criptomonedas · Operá 24/7',
    metaTitle: 'Dólar Cripto Hoy | Cotización actualizada — DolarInfoHoy',
    metaDescription: 'Precio del dólar cripto hoy en Argentina: tipo de cambio a través de USDT y USDC. Actualizado en tiempo real, sin límites ni cepo.',
    editorial: [
      { titulo: '¿Qué es el dólar cripto?', cuerpo: 'El <strong>dólar cripto</strong> surge de comprar y vender <strong>stablecoins</strong> —criptomonedas estables vinculadas al dólar, principalmente <strong>USDT (Tether)</strong> y <strong>USDC (USD Coin)</strong>— a través de exchanges. Opera <strong>24/7, sin cupos ni horarios</strong>, a diferencia del mercado financiero tradicional.' },
      { titulo: '¿Cómo operar?', cuerpo: 'Se depositan pesos en un <strong>exchange local</strong> (Binance, Ripio, Lemon Cash, Belo), se compra <strong>USDT al precio de mercado</strong> y se guarda en la billetera digital. Para convertir de vuelta a pesos, se hace el proceso inverso. La diferencia de precios define el <strong>tipo de cambio implícito</strong>.' },
      { titulo: 'Marco legal', cuerpo: 'Operar con criptomonedas <strong>no está prohibido en Argentina</strong>. Las exchanges están <strong>registradas ante la UIF</strong> y aplican <strong>KYC (Know Your Customer)</strong>, por lo que las operaciones quedan registradas. El marco regulatorio está en evolución.' },
      { titulo: 'Precio y acceso', cuerpo: 'El dólar cripto suele cotizar <strong>cerca del blue</strong>, con variaciones según el exchange y el spread. Cualquier persona con <strong>DNI y celular</strong> puede abrir una cuenta en minutos, sin necesidad de broker ni cuenta bancaria especial.' },
      { titulo: 'Uso internacional', cuerpo: 'Las <strong>stablecoins</strong> permiten enviar y recibir dólares internacionalmente <strong>con comisiones muy bajas y liquidación casi instantánea</strong>. Para <strong>freelancers y trabajadores remotos</strong> que cobran del exterior, el ecosistema cripto se ha convertido en una herramienta cotidiana.' },
    ],
    faq: [
      { pregunta: '¿Es legal comprar dólares con criptomonedas en Argentina?', respuesta: 'Sí. Operar con criptomonedas no está prohibido en Argentina. Las plataformas de exchange están registradas ante la UIF y aplican controles de identidad, por lo que las operaciones quedan registradas.' },
      { pregunta: '¿Qué es una stablecoin?', respuesta: 'Es una criptomoneda cuyo valor está anclado al dólar estadounidense en una relación 1:1. Las más usadas en Argentina son USDT (Tether) y USDC (USD Coin). A diferencia de Bitcoin o Ether, su precio no varía.' },
      { pregunta: '¿Qué exchanges puedo usar para comprar dólar cripto?', respuesta: 'Los más populares en Argentina son Binance, Ripio, Lemon Cash, Belo y Buenbit. Todos permiten abrir cuenta de forma online con DNI. Cada uno tiene spreads y comisiones distintas.' },
      { pregunta: '¿Cuál es la diferencia entre el dólar cripto y el blue?', respuesta: 'Ambos suelen cotizar cerca. La principal diferencia es operativa: el cripto opera 24/7 de forma digital, mientras que el blue se opera en efectivo en el mercado informal. El cripto también deja registro digital de las operaciones.' },
      { pregunta: '¿Puedo enviar dólares al exterior con stablecoins?', respuesta: 'Sí. Las stablecoins permiten transferencias internacionales con comisiones muy bajas y liquidación casi inmediata. Es muy usado por freelancers y exportadores de servicios para recibir pagos del exterior.' },
    ],
  },
};

export const DOLAR_PAGE_LIST = Object.values(DOLAR_PAGE_CONTENT);
