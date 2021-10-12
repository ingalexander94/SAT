import { Role } from '../model/role';

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

const normalizeRoles = (role) =>
  role
    .split('')
    .map((letra) => (/^[A-Z]*$/.test(letra) ? [' ', letra].join('') : letra))
    .join('')
    .toUpperCase();

const isAdministrative = (roles: Role[], roleAuth: String) =>
  roles.find(({ role }) => role === roleAuth);

const isTeacher = (role: String) => role === 'docente' || role === 'jefe';

const parseDate = (date: Date = new Date()) => {
  const formatDate = date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return formatDate;
};

const getColorByRisk = (value: String) => {
  if (value === 'global') return 'gray';
  return value === 'critico'
    ? 'red'
    : value === 'moderado'
    ? 'orange'
    : value === 'leve'
    ? 'yellow'
    : 'green';
};

export {
  normalizeText,
  resetDate,
  getColor,
  capitalizeText,
  normalizeRoles,
  isAdministrative,
  isTeacher,
  parseDate,
  getColorByRisk,
};
