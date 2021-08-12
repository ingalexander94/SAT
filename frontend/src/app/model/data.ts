import { Risk } from './risk';
import {
  ActivitiesList,
  desCourse,
  ItemRisk,
  MenuOptions,
  ServicesWellness,
  StudentInDanger,
} from './ui';

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
// Servicios Bienestar en uso
export const servicesWellness: ServicesWellness[] = [
  {
    num: 1,
    name: 'Beca trabajo',
    isActive: true,
  },
  {
    num: 2,
    name: 'Subsidio alcaldia',
    isActive: true,
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
      role !== 'estudiante' && role !== 'psicologo' ? true : false,
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

// Estudiantes que han postulado

export const postulates: StudentInDanger[] = [
  {
    student: {
      id: 1,
      code: '1151163',
      names: 'Luis Alexander',
      surnames: 'Peñaloza Romero',
      risk: 'leve',
    },
    date: new Date(),
    postulatorRole: 'Docente - Matías Herrera',
  },
  {
    student: {
      id: 2,
      code: '1151157',
      names: 'Niver Daniel',
      surnames: 'Romero Manrique',
      risk: 'moderado',
    },
    date: new Date(),
    postulatorRole: 'Estudiante - Niver Romero',
  },
  {
    student: {
      id: 3,
      code: '1151173',
      names: 'Fabian',
      surnames: 'Suarez Ruiz',
      risk: 'critico',
    },
    date: new Date(),
    postulatorRole: 'Docente - Miltón Vera',
  },
];

// Estudiantes que estan en riesgo critico

export const inRisk: StudentInDanger[] = [
  {
    student: {
      id: 1,
      code: '1151190',
      names: 'Juan Guillermo',
      surnames: 'Cuadrado',
      risk: 'Acádemico',
    },
    date: new Date(),
    postulatorRole: null,
  },
  {
    student: {
      id: 2,
      code: '1151191',
      names: 'James David',
      surnames: 'Rodriguez Rubio',
      risk: 'Individual',
    },
    date: new Date(),
    postulatorRole: null,
  },
];
export const risks: Risk[] = [
  {
    name: 'Académico',
    description: 'No presenta riesgos para está categoría',
    icon: 'id-badge',
    path: 'academico',
  },
  {
    name: 'Económico',
    description: 'No presenta riesgos para está categoría',
    icon: 'hand-holding-usd',
    path: 'economico',
  },
  {
    name: 'Individual',
    description: 'No presenta riesgos para está categoría',
    icon: 'male',
    path: 'individual',
  },
  {
    name: 'Institucional',
    description: 'No presenta riesgos para está categoría',
    icon: 'university',
    path: 'institucional',
  },
];
//cursos con Asistencias
export const courses: desCourse[] = [
  {
    name: 'Administracion de Proyecto informaticos',
    group: 'B',
    assistance: 10,
  },
  {
    name: 'base de datos',
    group: 'A',
    assistance: 10,
  },
  {
    name: 'Arquitectura de software',
    group: 'A',
    assistance: 10,
  },
  {
    name: 'Ingenieria de software',
    group: '',
    assistance: 10,
  },
];
