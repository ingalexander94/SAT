import { getColor } from '../helpers/ui';
import { Risk } from './risk';
import { ActivitiesList, ItemRisk, MenuOptions, StudentInDanger } from './ui';

// Item Riesgos
export const itemsaEconomicRisks: ItemRisk = {
  icon: 'fa-hand-holding-usd',
  urlImg: 'economico.svg',
  items: [
    'Estrato',
    'Situación Laboral',
    'Situación Laboral e ingreso de los padres',
    'Dependencia económica',
    'Nivel educativo de los padres',
    'Entorno macroeconómico del país',
  ],
};

export const itemAcademicRisks: ItemRisk = {
  icon: 'fa-address-book',
  urlImg: 'academico.svg',
  items: [
    'Orientación socio-ocupacional',
    'Tipo de Colegio',
    'Rendiminento académico',
    'Calidad del programa',
    'Métodos de estudio y aprendizaje',
    'Pruebas saber',
    'Resultados de examen de ingreso',
    'Cualificación docente',
    'Grado de satisfacción con el programa',
  ],
};

export const itemsaIndividualRisks: ItemRisk = {
  icon: 'fa-male',
  urlImg: 'individual.svg',
  items: [
    'Edad, sexo, estado civil',
    'Posición dentro de los hermanos',
    'Entorno familiar',
    'Calamidad, problemas de salud',
    'Integración social',
    'Incompatibilidad horaria con actividades extra-académicas',
    'Espectativas satisfechas',
    ' Embarazo',
  ],
};

export const itemsaInstitucionalRisks: ItemRisk = {
  icon: 'fa-university',
  urlImg: 'institucional.svg',
  items: [
    'Normalidad acadèmica',
    'Servicios de financiamiento',
    'Recursos universitarios',
    'Orden pùblico',
    'Entorno politico',
    'Nivel de interaciòn entre estudiantes y docentes',
    'Apoyo acadèmico',
    'Apoyo psicològico',
  ],
};

// Actividades
export const activities: ActivitiesList[] = [
  {
    date: '12/05/2020',
    name: 'Amigos Academicos',
    icon: 'fa-check-circle',
  },
  {
    date: '12/05/2020',
    name: 'Apoyo Psicologico',
    icon: 'fa-times-circle',
  },
  {
    date: '12/05/2020',
    name: 'Amigos Academicos',
    icon: 'fa-spinner',
  },
];

// Rutas

export const menuRoutes: MenuOptions[] = [
  {
    path: '/estudiante/actividades',
    name: 'Ver actividades',
    icon: 'list',
    isAllowed: (role: String) =>
      role === 'estudiante' || role === 'vicerrector' ? true : false,
  },
  {
    path: '/estudiante/chat',
    name: 'Ver chat',
    icon: 'list',
    isAllowed: (role: String) =>
      role !== 'estudiante' && role !== 'psicologo' && role !== 'vicerrector'
        ? true
        : false,
  },
  {
    path: '/estudiante/reunion',
    name: 'Mis reuniones',
    icon: 'calendar-check',
    isAllowed: (role: String) => (role === 'estudiante' ? true : false),
  },
  {
    path: '/estudiante/ver-historial',
    name: 'Ver beneficios',
    icon: 'clock',
    isAllowed: () => true,
  },
  {
    path: '/estudiante',
    name: 'Ver riesgos',
    icon: 'hand-holding-medical',
    isAllowed: () => true,
  },
  {
    path: '/estudiante/perfil-academico',
    name: 'Perfil académico',
    icon: 'book-open',
    isAllowed: () => true,
  },
  {
    path: '/estudiante/bitacora',
    name: 'Bitácora',
    icon: 'file-signature',
    isAllowed: (role: String) =>
      role === 'psicologo' || role === 'estudiante' ? true : false,
  },
];

export const risks: Risk[] = [
  {
    name: 'Académico',
    riskGlobal: 0,
    icon: 'id-badge',
    path: 'academico',
    color: function () {
      return getColor(this.riskGlobal);
    },
  },
  {
    name: 'Económico',
    riskGlobal: 0,
    icon: 'hand-holding-usd',
    path: 'economico',
    color: function () {
      return getColor(this.riskGlobal);
    },
  },
  {
    name: 'Individual',
    riskGlobal: 0,
    icon: 'male',
    path: 'individual',
    color: function () {
      return getColor(this.riskGlobal);
    },
  },
  {
    name: 'Institucional',
    riskGlobal: 0,
    icon: 'university',
    path: 'institucional',
    color: function () {
      return getColor(this.riskGlobal);
    },
  },
];
