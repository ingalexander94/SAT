const normalizeText = (text: String) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const resetDate = (date: string) => {
  const newDate = new Date(date);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  newDate.setDate(newDate.getDate() + 1);
  return newDate.toISOString();
};

const getColor = (value: number) =>
  value > 0 && value < 2
    ? { color: 'red', risk: 'en Riesgo Crítico' }
    : value >= 2 && value < 3
    ? { color: 'orange', risk: 'en Riesgo Moderado' }
    : value >= 3 && value < 4
    ? { color: 'yellow', risk: 'en Riesgo Leve' }
    : value >= 4 && value <= 5
    ? { color: 'green', risk: 'Sin riesgo' }
    : { color: 'gray', risk: 'Cargando...' };

const capitalizeText = (risk: String) =>
  risk === 'critico' ? 'Crítico' : risk.charAt(0).toUpperCase() + risk.slice(1);

export { normalizeText, resetDate, getColor, capitalizeText };
