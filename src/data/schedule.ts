// Schedule data extracted from official ВУЦ НИУ ВШЭ timetable for 2nd semester 2025-2026

export const SUBJECTS = ["ВИП", "ВПП", "ВПР", "ВСП", "ВТ", "Вождение", "Зачёт", "Мас-ка", "Мед.О", "Мет.П", "ОВП", "ОВУ", "ОП", "ОТ", "Обслуживание", "Пересдача", "Подведение итогов", "Подготовка", "РП", "РХБЗ", "СВ", "Стр П", "ТП", "ТСП", "Тех П", "УПМВ", "Экзамен"] as const;
export type Subject = string;

export const SQUADS = ["2301", "2302", "2303", "2306", "2307", "2308", "2309", "2310", "2311", "2312", "2313", "2401", "2402", "2403", "2404", "2405", "2406", "2407", "2408", "2409", "2410", "2411", "2412", "2501", "2502", "2503", "2504", "2505", "2506", "2507", "2508", "2509", "2510", "2511", "2512"] as const;
export type Squad = typeof SQUADS[number];

export function getCourse(squad: string): number {
  const prefix = squad.substring(0, 2);
  if (prefix === '25') return 1;
  if (prefix === '24') return 2;
  if (prefix === '23') return 3;
  return 1;
}

export function getSquadDay(squad: string): string {
  const prefix = squad.substring(0, 2);
  if (prefix === '24') return 'Среда';
  if (prefix === '25') return 'Четверг';
  if (prefix === '23') return 'Пятница';
  return 'Среда';
}

export interface ScheduleEntry {
  time: string;
  subject: string;
  type: string;
  room: string;
  teacher: string;
}

export interface WeekSchedule {
  weekNumber: number;
  dateRange: string;
  startDate: string;
  days: Record<string, ScheduleEntry[]>;
}

const subjectColors: Record<string, string> = {
  'ТСП': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
  'Тех П': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
  'ОП': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
  'ОТ': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
  'ВПП': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  'УПМВ': 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800',
  'ОВУ': 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800',
  'РХБЗ': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800',
  'Мас-ка': 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
  'СВ': 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800',
  'ВИП': 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800',
  'Стр П': 'bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-950 dark:text-lime-300 dark:border-lime-800',
  'Мед.О': 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800',
  'ТП': 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800',
  'РП': 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
  'ВСП': 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950 dark:text-fuchsia-300 dark:border-fuchsia-800',
  'ОВП': 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800',
};

const subjectDots: Record<string, string> = {
  'ТСП': 'bg-blue-500',
  'Тех П': 'bg-purple-500',
  'ОП': 'bg-red-500',
  'ОТ': 'bg-green-500',
  'ВПП': 'bg-amber-500',
  'УПМВ': 'bg-cyan-500',
  'ОВУ': 'bg-indigo-500',
  'РХБЗ': 'bg-orange-500',
  'Мас-ка': 'bg-emerald-500',
  'СВ': 'bg-teal-500',
  'ВИП': 'bg-violet-500',
  'Стр П': 'bg-lime-500',
  'Мед.О': 'bg-pink-500',
  'ТП': 'bg-sky-500',
  'РП': 'bg-rose-500',
  'ВСП': 'bg-fuchsia-500',
  'ОВП': 'bg-slate-500',
};

export function getSubjectColor(subject: string): string {
  return subjectColors[subject] || 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800';
}

export function getSubjectDot(subject: string): string {
  return subjectDots[subject] || 'bg-gray-500';
}

export const SUBJECT_FULL_NAMES: Record<string, string> = {
  'ТСП': 'Тактико-специальная подготовка',
  'Тех П': 'Техническая подготовка',
  'ОП': 'Огневая подготовка',
  'ОТ': 'Общая тактика',
  'ВПП': 'Военно-политическая подготовка',
  'УПМВ': 'Управление подразделениями в мирное время',
  'ОВУ': 'Общевоинские уставы ВС РФ',
  'РХБЗ': 'Радиационная, химическая и биологическая защита',
  'Мас-ка': 'Маскировка',
  'СВ': 'Средства связи',
  'ВИП': 'Военно-инженерная подготовка',
  'Стр П': 'Строевая подготовка',
  'Мед.О': 'Медицинское обеспечение',
  'ТП': 'Тактическая подготовка',
  'РП': 'Разведывательная подготовка',
  'ВСП': 'Военно-специальная подготовка',
  'ОВП': 'Общевойсковая подготовка',
  'ВТ': 'Военная топография',
  'Мет.П': 'Методическая подготовка',
  'ВПР': 'Военно-политическая работа',
  'ИП': 'Инженерная подготовка',
  'Вождение': 'Вождение боевых машин',
  'Зачёт': 'Зачёт',
  'Экзамен': 'Экзамен',
  'Подготовка': 'Подготовка к аттестации',
  'Обслуживание': 'Обслуживание техники и вооружения',
  'Пересдача': 'Пересдача задолженностей',
  'Подведение итогов': 'Подведение итогов',
};

export const scheduleData: Record<string, WeekSchedule[]> = {
  '2301': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Пятница': [
          { time: '13:00 – 14:20', subject: 'ОП', type: 'ГЗ 4-1', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Долгих А.А., Алексеев А.Н.' },
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ГЗ 19-3', room: 'Ауд. 420,422', teacher: 'Нижаловский А., Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ГЗ 29-1', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 422,301,302,420', teacher: 'Долгих А.А., Кашин А.В.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 420,303', teacher: 'Долгих А.А., Алексеев А.Н.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ГЗ 4-2', room: 'Ауд. 113, 401', teacher: 'Ковальчук И.Я., Долгих А.А.' },
          { time: '13:00 – 14:20', subject: 'ОП', type: 'ГЗ 4-3 РК', room: 'Ауд. 113,401', teacher: 'Ковальчук И.Я., Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ОП', type: 'ГЗ 7-1', room: 'Ауд. 423', teacher: 'Долгих А.А.' },
          { time: '13:00 – 14:20', subject: 'ОП', type: 'ГЗ 8-1', room: 'Ауд. 423,303', teacher: 'Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 420,422,304', teacher: 'Долгих А.А., Алексеев А.Н., Коргутов В.А.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 401', teacher: 'Долгих А.А.' },
          { time: '11:00 – 12:30', subject: 'ОП', type: 'ГЗ 8-1', room: 'Ауд. 401', teacher: 'Долгих А.А.' },
          { time: '13:00 – 14:20', subject: 'ОП', type: 'ПЗ 8-2', room: 'Ауд. 401', teacher: 'Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ПЗ 6-4', room: 'Ауд. 113,401,312', teacher: 'Долгих А.А., Ковальчук И.Я.' },
          { time: '13:00 – 14:20', subject: 'ОП', type: 'ПЗ 8-3', room: 'Ауд. 423,303,115', teacher: 'Долгих А.А., Ковальчук И.Я.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 420,422', teacher: 'Долгих А.А., Еремеенко С.Н., Алексеев А.Н.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'УПМВ', type: 'С 4-2', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '11:00 – 12:30', subject: 'УПМВ', type: 'С 5-2', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: '', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'Экзамен', room: 'Ауд. 420,113', teacher: 'Коргутов В.А., Долгих А.А., Ковальчук И.Я.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'УПМВ', type: 'ГЗ 6-1 РК', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '11:00 – 12:30', subject: 'Стр П', type: 'С', room: 'Ауд. 420', teacher: 'Долгих А.А., Мязитов Э.Р.' },
        ],
      },
    },
    { weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29', days: {} },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2302': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Пятница': [
          { time: '13:00 – 14:20', subject: 'ОП', type: 'ГЗ 4-1', room: 'Ауд. 401', teacher: 'Еремеенко С.Н.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 401', teacher: 'Прилюдько В.А.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 401', teacher: 'Прилюдько В.А.' },
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ГЗ 19-3', room: 'Ауд. 401,304', teacher: 'Еремеенко С.Н., Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 401', teacher: 'Прилюдько В.А.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 401', teacher: 'Прилюдько В.А.' },
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ГЗ 29-1', room: 'Ауд. 401', teacher: 'Еремеенко С.Н.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ГЗ 4-2', room: 'Ауд. 113, 401', teacher: 'Ковальчук И.Я., Прилюдько В.А.' },
          { time: '13:00 – 14:20', subject: 'ОП', type: 'ГЗ 4-3 РК', room: 'Ауд. 113,401', teacher: 'Ковальчук И.Я., Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 422,301,302,401', teacher: 'Кашин А.В., Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Прилюдько В.А.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 420,422', teacher: 'Прилюдько В.А., Еремеенко С.Н.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ОП', type: 'ГЗ 7-1', room: 'Ауд. 401', teacher: 'Еремеенко С.Н.' },
          { time: '13:00 – 14:20', subject: 'ОП', type: 'ПЗ 7-2', room: 'Ауд. 401,316', teacher: 'Еремеенко С.Н.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ПЗ 6-4', room: 'Ауд. 113, 401,312', teacher: 'Еремеенко С.Н., Ковальчук И.Я.' },
          { time: '13:00 – 14:20', subject: 'ОП', type: 'ГЗ 8-1', room: 'Ауд. 401', teacher: 'Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 420,422,304', teacher: 'Прилюдько В.А., Алексеев А.Н.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ПЗ 8-2', room: 'Ауд. 423', teacher: 'Еремеенко С.Н.' },
          { time: '11:00 – 12:30', subject: 'ОП', type: 'ПЗ 8-3', room: 'Ауд. 423,303,115', teacher: 'Еремеенко С.Н., Прилюдько В.А.' },
          { time: '13:00 – 14:20', subject: 'УПМВ', type: 'С 4-2', room: 'Ауд. 401', teacher: 'Мязитов Э.Р.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'Экзамен', room: 'Ауд. 401,113', teacher: 'Коргутов В.А., Ковальчук И.Я., Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 401', teacher: 'Еремеенко С.Н.' },
          { time: '11:00 – 12:30', subject: 'УПМВ', type: 'С 5-2', room: 'Ауд. 401', teacher: 'Мязитов Э.Р.' },
          { time: '13:00 – 14:20', subject: 'УПМВ', type: 'ГЗ 6-1РК', room: 'Ауд. 401', teacher: 'Мязитов Э.Р.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'Стр П', type: 'С', room: 'Ауд. 401', teacher: 'Прилюдько В.А., Еремеенко С.Н.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 401,423', teacher: 'Прилюдько В.А., Алексеев А.Н., Еремеенко С.Н.' },
        ],
      },
    },
    { weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29', days: {} },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2303': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Пятница': [
          { time: '13:00 – 14:20', subject: 'ОП', type: 'ГЗ 7-1', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ГЗ 19-', room: 'Ауд. 423,303', teacher: 'Ковальчук И.Я., Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 422,301,302,423', teacher: 'Мальцев И.Г., Кашин А.В.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ГЗ 29-1', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ГЗ 4-2', room: 'Ауд. 113, 423', teacher: 'Ковальчук И.Я., Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'ОП', type: 'ГЗ 4-3 РК', room: 'Ауд. 113,423', teacher: 'Ковальчук И.Я., Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '11:00 – 12:30', subject: 'ОП', type: 'ГЗ 7-1', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'ОП', type: 'ПЗ 7-2', room: 'Ауд. 423,303', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 420,422', teacher: 'Мальцев И.Г., Алексеев А.Н.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'УПМВ', type: 'С 4-2', room: 'Ауд. 423', teacher: 'Мязитов Э.Р.' },
          { time: '11:00 – 12:30', subject: 'ОП', type: 'ГЗ 8-1', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'УПМВ', type: 'С 5-2', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ПЗ 6-4', room: 'Ауд. 113, 423,312', teacher: 'Мальцев И.Г., Ковальчук И.Я.' },
          { time: '13:00 – 14:20', subject: 'ОП', type: 'ПЗ 8-2', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 420,422,316', teacher: 'Мальцев И.Г., Прилюдько В.А.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '11:00 – 12:30', subject: 'УПМВ', type: 'ГЗ 6-1 РК', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'ОП', type: 'ПЗ 8-3', room: 'Ауд. 423,303,115', teacher: 'Мальцев И.Г., Мязитов Э.Р.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 423,422', teacher: 'Мальцев И.Г., Прилюдько В.А., Алексеев А.Н.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'Подготовка', type: '', room: '', teacher: '' },
          { time: '11:00 – 12:30', subject: 'Стр П', type: 'С', room: 'Ауд. 423', teacher: 'Мальцев И.Г., Мязитов Э.Р.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'Экзамен', room: 'Ауд. 423,113', teacher: 'Коргутов В.А., Мальцев И.Г., Ковальчук И.Я.' },
        ],
      },
    },
    { weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29', days: {} },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2306': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Никандров И.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Любимов А.Н.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Семенов П.Ю.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Любимов А.Н.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Никандров И.В.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Никандров И.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Любимов А.Н.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Никандров И.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Репалов Д.Н.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Семенов П.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Семенов П.Ю.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: '', teacher: 'Пеляк В.С., Максимов И.В.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Пеляк В.С.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Пеляк В.С.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
          { time: '11:00 – 12:30', subject: 'Подготовка', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 510, 502', teacher: 'Ретюнских И.В., Репалов Д.Н., Никандров И.В.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 407', teacher: 'Семенов П.Ю.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 407', teacher: 'Семенов П.Ю.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 407', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'Подготовка', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15', days: {} },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 510, 502', teacher: 'Репалов Д.Н., Семенов П.Ю.' },
        ],
      },
    },
    { weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29', days: {} },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2307': [
    { weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14', days: {} },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Пеляк В.С.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Любимов А.Н.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Пеляк В.С.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Никандров И.В.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Семенов П.Ю.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: '' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Пеляк В.С.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Любимов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Любимов А.Н.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Любимов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: '', teacher: 'Репалов Д.Н., Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Семенов П.Ю.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'Подготовка', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 510,505', teacher: 'Пеляк В.С., Максимов И.В., Семенов П.Ю.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Любимов А.Н.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Любимов А.Н.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Любимов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'Подготовка', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15', days: {} },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 510,505', teacher: 'Ретюнских И.В., Пеляк В.С.' },
        ],
      },
    },
    { weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29', days: {} },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2308': [
    { weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14', days: {} },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Любимов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Пеляк В.С.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Любимов А.Н.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Пеляк В.С.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Любимов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Пеляк В.С.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Семенов П.Ю.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: '', teacher: 'Никандров И.В., Любимов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Любимов А.Н.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Любимов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 407', teacher: 'Любимов А.Н.' },
          { time: '11:00 – 12:30', subject: 'Подготовка', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 510, 502', teacher: 'Репалов Д.Н., Пеляк В.С., Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'Подготовка', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15', days: {} },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 510, 407', teacher: 'Никандров И.В., Любимов А.Н.' },
        ],
      },
    },
    { weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29', days: {} },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2309': [
    { weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14', days: {} },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В., Егоров Ю.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 110', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 304', teacher: 'Усиков Ю.В.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 304', teacher: 'Колесников С.В., Егоров Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 304', teacher: 'Колесников С.В., Егоров Ю.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 304', teacher: 'Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 304', teacher: 'Колесников С.В.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 304', teacher: 'Колесников С.В.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 316,303', teacher: 'Максимов И.В., Масленкин Е.В., Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Пятница': [
          { time: '13:00 – 14:20', subject: 'Подготовка', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В.' },
          { time: '11:00 – 12:30', subject: 'Подготовка', type: 'С', room: '', teacher: '' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В., Егоров Ю.В.' },
        ],
      },
    },
    { weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15', days: {} },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 510, 110', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    { weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29', days: {} },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2310': [
    { weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14', days: {} },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 304', teacher: 'Усиков Ю.В.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 316', teacher: 'Максимов И.В., Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 110', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 304', teacher: 'Колесников С.В., Егоров Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 304', teacher: 'Колесников С.В., Егоров Ю.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 304', teacher: 'Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Усиков Ю.В.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 110', teacher: 'Колесников С.В.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 110', teacher: 'Колесников С.В.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 316,303', teacher: 'Максимов И.В., Усиков Ю.В., Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Пятница': [
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'Подготовка', type: 'С', room: '', teacher: '' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 304', teacher: 'Максимов И.В., Усиков Ю.В.' },
        ],
      },
    },
    { weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15', days: {} },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 510, 304', teacher: 'Максимов И.В.' },
        ],
      },
    },
    { weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29', days: {} },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2311': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВПП', type: 'С', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '11:00 – 12:30', subject: 'ВПП', type: 'ГЗ 9-3', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВПП', type: 'С 9-4', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '11:00 – 12:30', subject: 'ВПП', type: 'С', room: 'Ауд. 518 ,515', teacher: 'Гнидо А., Черкесов А.Н., Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'Экзамен', type: 'С', room: 'Ауд. 516 (515)', teacher: 'Гнидо А.В., Поляков А.П., Ковальчук С.В.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'Экзамен', type: 'С', room: 'Ауд. 516', teacher: 'Гнидо А.В., Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29', days: {} },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2312': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Пятница': [
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 514', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Пятница': [
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 514', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Пятница': [
          { time: '13:00 – 14:20', subject: 'ВПП', type: 'С', room: 'Ауд. 518', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (515)', teacher: 'Сальников В.О.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Сальников В.О., Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 313 (518)', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ВПП', type: 'ГЗ 9-3', room: 'Ауд. 518', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Сальников В.О.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ВПП', type: 'С 9-4', room: 'Ауд. 518', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВПП', type: 'С', room: 'Ауд. 518 ,515', teacher: 'Гнидо А., Черкесов А.Н., Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Сальников В.О., Черкесов А.Н.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (515)', teacher: 'Сальников В.О.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Кривенцев О.Е.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'Экзамен', type: 'С', room: 'Ауд. 518 (515,514)', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Кривенцев О.Е.' },
          { time: '11:00 – 12:30', subject: 'Зачёт', type: 'С', room: 'Ауд. 518 514,313', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29', days: {} },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2313': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Пятница': [
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 518', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Пятница': [
          { time: '13:00 – 14:20', subject: 'ВПП', type: 'С', room: 'Ауд. 518', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Пятница': [
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 313 (514)', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 313 (518)', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ВПП', type: 'ГЗ 9-3', room: 'Ауд. 518', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (515)', teacher: 'Сальников В.О., Черкесов А.Н.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Сальников В.О., Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Пятница': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Сальников В.О.' },
          { time: '13:00 – 14:20', subject: 'ВПП', type: 'С 9-4', room: 'Ауд. 518', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВПП', type: 'С', room: 'Ауд. 518 ,(514)', teacher: 'Гнидо А., Черкесов А.Н., Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Сальников В.О., Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (515)', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 518', teacher: 'Кривенцев О.Е.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 518', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 518', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 313 (514)', teacher: 'Сальников В.О.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 313 (514)', teacher: 'Сальников В.О.' },
        ],
      },
    },
    { weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08', days: {} },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 313 (514)', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Пятница': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29', days: {} },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2401': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '13:00 – 14:20', subject: 'Тех П', type: 'ГЗ 2-10', room: 'Ауд. 316,115', teacher: 'Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Среда': [
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 112, 420', teacher: 'Долгих А.А.' },
          { time: '13:00 – 14:20', subject: 'Тех П', type: 'ГЗ 2-11', room: 'Ауд. 316,115 (', teacher: 'Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ПЗ 2-7, 2-8', room: 'Ауд. 113,401,312', teacher: 'Ковальчук И.Я., Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Долгих А.А., Еремеенко С.Н.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Тех П', type: 'ГЗ 2-12', room: 'Ауд. 115,423,316 (', teacher: 'Мальцев И.Г.' },
          { time: '11:00 – 12:30', subject: 'Тех П', type: 'ГЗ 3-1', room: 'Ауд. 115,423,316 (', teacher: 'Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'Тех П', type: 'ПЗ 3-2', room: 'Ауд. 115,423 (', teacher: 'Мязитов Э.Р.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ПЗ 6-3', room: 'Ауд. 113,401,312', teacher: 'Долгих А., Ковальчук И., Еремеенко С.Н.' },
          { time: '13:00 – 14:20', subject: 'Тех П', type: 'ГЗ 3-3', room: 'Ауд. 316,115 (', teacher: 'Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Среда': [
          { time: '13:00 – 14:20', subject: 'ВПП', type: 'С 3-2', room: 'Ауд. 420', teacher: 'Мязитов Э.Р.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВПП', type: 'С 4-2', room: 'Ауд. 420', teacher: 'Мязитов Э.Р.' },
          { time: '11:00 – 12:30', subject: 'УПМВ', type: 'ПЗ 2-2', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: 'С', room: 'Ауд. 420', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Тех П', type: 'ГЗ 4-1', room: 'Ауд. 114, 420,(115)', teacher: 'Синицын В.Н.' },
          { time: '11:00 – 12:30', subject: 'ВПП', type: 'С 5-2', room: 'Ауд. 420', teacher: 'Ретюнских И.В.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: 'С', room: 'Ауд. 420', teacher: '' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'п. Медвежьи озёра', teacher: 'Долгих А.А., Ковальчук И.Я.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Спортзал', teacher: 'Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'Тех П', type: 'ГЗ 4-2', room: '', teacher: 'Синицын В.Н., Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВПП', type: 'С 5-3', room: 'Ауд. 420', teacher: 'Ретюнских И.В.' },
          { time: '11:00 – 12:30', subject: 'Подготовка', type: 'С', room: 'Ауд. 420', teacher: '' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: 'С', room: 'Ауд. 420', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Зачёт', type: 'С', room: 'Ауд. 420,422', teacher: 'Еремеенко С.Н., Долгих А.А.' },
          { time: '13:00 – 14:20', subject: 'Обслуживание', type: '', room: 'Ауд. 401,113,115', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2402': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'Тех П', type: 'ГЗ 2-10', room: 'Ауд. 316,115', teacher: 'Еремеенко С.Н.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 401', teacher: 'Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Среда': [
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 422', teacher: 'Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'Тех П', type: 'ГЗ 2-11', room: 'Ауд. 316,115 (', teacher: 'Еремеенко С.Н.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 112, 422', teacher: 'Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Долгих А.А., Еремеенко С.Н.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Тех П', type: 'ПЗ 2-12', room: 'Ауд. 115,401,316 (', teacher: 'Прилюдько В.А.' },
          { time: '11:00 – 12:30', subject: 'Тех П', type: 'ГЗ 3-1', room: 'Ауд. 115,401,316 (', teacher: 'Прилюдько В.А.' },
          { time: '13:00 – 14:20', subject: 'Тех П', type: 'ПЗ 3-2', room: 'Ауд. 115,401,316 (', teacher: 'Мязитов Э.Р.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ПЗ 2-7, 2-8', room: 'Ауд. 113, 401,312', teacher: 'Ковальчук И.Я., Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Тех П', type: 'ГЗ 3-3', room: 'Ауд. 316,115 (', teacher: 'Прилюдько В.А.' },
          { time: '11:00 – 12:30', subject: 'ВПП', type: 'С 3-2', room: 'Ауд. 422', teacher: 'Мязитов Э.Р.' },
          { time: '13:00 – 14:20', subject: 'УПМВ', type: 'ПЗ 2-2', room: 'Ауд. 401', teacher: 'Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Среда': [
          { time: '13:00 – 14:20', subject: 'Тех П', type: 'ГЗ 4-1', room: 'Ауд. 114,(115),401', teacher: 'Синицын В.Н.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ПЗ 6-3', room: 'Ауд. 113,401 ,312', teacher: 'Ковальчук И.Я., Еремеенко С.Н.' },
          { time: '13:00 – 14:20', subject: 'ВПП', type: 'С 4-2', room: 'Ауд. 401', teacher: 'Мязитов Э.Р.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВПП', type: 'С 5-2', room: 'Ауд. 423', teacher: 'Ретюнских И.В.' },
          { time: '11:00 – 12:30', subject: 'Тех П', type: 'ГЗ 4-2', room: '', teacher: 'Синицын В.Н., Прилюдько В.А.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'п. Медвежьи озёра', teacher: 'Прилюдько В.А., Еремеенко С.Н.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Спортзал', teacher: 'Прилюдько В.А., Еремеенко С.Н.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'Подготовка', type: 'С', room: 'Ауд. 401', teacher: '' },
          { time: '13:00 – 14:20', subject: 'ВПП', type: 'С 5-3', room: 'Ауд. 401', teacher: 'Ретюнских И.В.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Подготовка', type: 'С', room: 'Ауд. 401', teacher: '' },
          { time: '11:00 – 12:30', subject: 'Подготовка', type: 'С', room: 'Ауд. 401', teacher: '' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: 'С', room: 'Ауд. 401', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Зачёт', type: 'С', room: 'Ауд. 420,401', teacher: 'Ковальчук И.Я., Прилюдько В.А., Алексеев А.Н.' },
          { time: '13:00 – 14:20', subject: 'Обслуживание', type: '', room: 'Ауд. 401,113,115', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2403': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'Тех П', type: 'ГЗ 2-10', room: 'Ауд. 423,115', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Среда': [
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 112, 423', teacher: 'Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'Тех П', type: 'ГЗ 2-11', room: 'Ауд. 316,115 (', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Тех П', type: 'ГЗ 2-12', room: 'Ауд. 316,115 (', teacher: 'Мальцев И.Г.' },
          { time: '11:00 – 12:30', subject: 'Тех П', type: 'ГЗ 3-1', room: 'Ауд. 316,115 (', teacher: 'Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'Тех П', type: 'ПЗ 3-2', room: 'Ауд. 316,115 (', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ПЗ 2-7, 2-8', room: 'Ауд. 113,423,312', teacher: 'Ковальчук И.Я., Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Долгих А.А., Еремеенко С.Н.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВПП', type: 'С 3-2', room: 'Ауд. 423', teacher: 'Мязитов Э.Р.' },
          { time: '11:00 – 12:30', subject: 'Тех П', type: 'ГЗ 3-3', room: 'Ауд. 316,115 (', teacher: 'Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: 'С', room: 'Ауд. 423', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Среда': [
          { time: '13:00 – 14:20', subject: 'Подготовка', type: 'С', room: 'Ауд. 423', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Тех П', type: 'ГЗ 4-1', room: 'Ауд. 114,(115),423', teacher: 'Синицын В.Н., Мальцев И.Г.' },
          { time: '11:00 – 12:30', subject: 'Тех П', type: 'ГЗ 4-2', room: '', teacher: 'Синицын В.Н., Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ПЗ 6-3', room: 'Ауд. 113,401,312', teacher: 'Ковальчук И.Я., Еремеенко С.Н., Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'ВПП', type: 'С 4-2', room: 'Ауд. 401', teacher: 'Мязитов Э.Р.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'п. Медвежьи озёра', teacher: 'Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Спортзал', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ВПП', type: 'С 5-2', room: 'Ауд. 423', teacher: 'Ретюнских И.В.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: 'С', room: 'Ауд. 423', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'УПМВ', type: 'ПЗ 2-2', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '11:00 – 12:30', subject: 'ВПП', type: 'С 5-3', room: 'Ауд. 423', teacher: 'Ретюнских И.В.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: 'С', room: 'Ауд. 423', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Зачёт', type: 'С', room: 'Ауд. 420,423', teacher: 'Коргутов В.А., Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'Обслуживание', type: '', room: 'Ауд. 401,113,115', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2404': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ПЗ 8-2', room: 'Ауд. 113, 304, 312,314,303', teacher: 'Габрусенас Г.С., Кунакин А.М., Сарапулов А.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ПЗ 8-3', room: 'Ауд. 113, 304, 312,314,303', teacher: 'Габрусенас Г.С., Кунакин А.М., Сарапулов А.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ПЗ 8-4', room: 'Ауд. 113, 304, 312,314,303', teacher: 'Габрусенас Г.С., Кунакин А.М., Сарапулов А.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТП', type: '', room: 'Ауд. 304', teacher: 'Кунакин А.М.' },
          { time: '11:00 – 12:30', subject: 'СВ', type: 'С', room: 'Ауд. 301', teacher: 'Кашин А.В., Митюков Е.А.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТП', type: 'ГЗ 12-2', room: 'Ауд. 304', teacher: 'Сарапулов А.' },
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ПЗ 12-3', room: 'Ауд. 304', teacher: 'Сарапулов А.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Вождение', type: 'ГЗ 1-1', room: 'Ауд. 114', teacher: 'Синицын В.Н.' },
          { time: '11:00 – 12:30', subject: 'Вождение', type: 'ПЗ 1-2', room: 'Ауд. 114 ,316', teacher: 'Синицын В.Н., Габрусенас Г.С.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'РП', type: '', room: 'Ауд. 304', teacher: 'Митюков Е.А.' },
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ГЗ 13-1', room: 'Ауд. 304', teacher: 'Кунакин А.М.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ПЗ 8-5', room: 'Ауд. 113, 304, 312,314,303', teacher: 'Габрусенас Г.С., Кунакин А.М., Сарапулов А.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'СВ', type: 'С', room: 'Ауд. 301', teacher: 'Кашин А.В., Митюков Е.А.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'РП', type: 'ГЗ 5-1', room: 'Ауд. 304', teacher: 'Митюков Е.А.' },
          { time: '11:00 – 12:30', subject: 'РП', type: 'ГЗ 6-2', room: 'Ауд. 304', teacher: 'Митюков Е.А.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТП', type: 'ГЗ 14-1', room: 'Ауд. 304', teacher: 'Кунакин А.М.' },
          { time: '11:00 – 12:30', subject: 'Мет.П', type: 'С', room: 'Ауд. 304', teacher: 'Габрусенас Г.С.' },
          { time: '13:00 – 14:20', subject: 'ТП', type: '', room: 'Ауд. 304', teacher: 'Кунакин А.М.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Зачёт', type: 'С', room: 'Ауд. 113,304', teacher: 'Габрусенас Г.С., Кунакин А.М.' },
          { time: '13:00 – 14:20', subject: 'Мет.П', type: 'ГЗ 5-1', room: 'Ауд. 304', teacher: 'Кунакин А.М.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТП', type: 'ГЗ 15-1', room: 'Ауд. 304', teacher: 'Габрусенас Г.С.' },
          { time: '11:00 – 12:30', subject: 'ТП', type: 'С 16-2', room: 'Ауд. 304', teacher: 'Кунакин А.М.' },
          { time: '13:00 – 14:20', subject: 'Мет.П', type: 'ГЗ 6-1', room: 'Ауд. 304', teacher: 'Кунакин А.М.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Экзамен', type: 'С', room: 'Ауд. 303,304,316', teacher: 'Габрусенас Г.С., Нижаловский А.В., Кунакин А.М., Кротов В.Н.' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Вождение', type: 'ГЗ 1-3', room: 'Ауд. 114,113', teacher: 'Синицын В.Н., Габрусенас Г.С.' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2405': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Репалов Д.Н.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Пеляк В.С.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Пеляк В.С.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Любимов А.Н.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Репалов Д.Н.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Любимов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Никандров И.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Репалов Д.Н.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Репалов Д.Н.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Репалов Д.Н.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Репалов Д.Н.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Репалов Д.Н.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Семенов П.Ю.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Никандрров И.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Репалов Д.Н.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Семенов П.Ю.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Никандров И.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Репалов Д.Н.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Любимов А.Н.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 502', teacher: 'Любимов А.Н.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Зачёт', type: 'С', room: 'Ауд. 502,510', teacher: 'Репалов Д.Н., Семенов П.Ю., Любимов А.Н.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Репалов Д.Н.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Семенов П.Ю.' },
          { time: '11:00 – 12:30', subject: 'Зачёт', type: 'С', room: 'Ауд. 505,510', teacher: 'Пеляк В.С., Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВПП', type: 'С 7-2', room: 'Ауд. 505', teacher: 'Егоров Ю.В.' },
          { time: '11:00 – 12:30', subject: 'ВПП', type: 'С 8-2', room: 'Ауд. 505', teacher: 'Ретюнских И.В.' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2406': [
    { weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14', days: {} },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Репалов Д.Н.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Репалов Д.Н.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Репалов Д.Н.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Пеляк В.С.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Любимов А.Н.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Пеляк В.С.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Среда': [
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Любимов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Семенов П.Ю.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Любимов А.Н.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Любимов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Любимов А.Н.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Пеляк В.С.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Пеляк В.С.' },
        ],
      },
    },
    { weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11', days: {} },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Любимов А.Н.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Никандров И.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 505', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Пеляк В.С.' },
          { time: '11:00 – 12:30', subject: 'ВПП', type: 'С 7-2', room: 'Ауд. 303', teacher: 'Ретюнских И.В.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'Зачёт', type: 'С', room: 'Ауд. 505,510', teacher: 'Семенов П.Ю., Любимов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Пеляк В.С.' },
          { time: '11:00 – 12:30', subject: 'ВПП', type: 'С 8-2', room: 'Ауд. 502', teacher: 'Егоров Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 502', teacher: 'Никандров И.В.' },
          { time: '11:00 – 12:30', subject: 'Зачёт', type: 'С', room: 'Ауд. 502,510', teacher: 'Пеляк В.С., Семенов П.Ю., Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2407': [
    { weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14', days: {} },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Семенов П.Ю.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Пеляк В.С.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Среда': [
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Семенов П.Ю.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Семенов П.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    { weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11', days: {} },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Семенов П.Ю.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Пеляк В.С.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 510', teacher: 'Репалов Д.Н.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 316', teacher: 'Никандров И.В.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 505', teacher: 'Пеляк В.С.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'Зачёт', type: 'С', room: 'Ауд. 510,505', teacher: 'Репалов Д.Н., Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
          { time: '11:00 – 12:30', subject: 'Зачёт', type: 'С', room: 'Ауд. 510,505', teacher: 'Репалов Д.Н., Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВПП', type: 'С 7-2', room: 'Ауд. 314', teacher: 'Максимов И.В.' },
          { time: '11:00 – 12:30', subject: 'ВПП', type: 'С 8-2', room: 'Ауд. 314', teacher: 'Егоров Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2408': [
    { weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14', days: {} },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 316', teacher: 'Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 316', teacher: 'Колесников С.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 110', teacher: 'Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 110', teacher: 'Колесников С.В.' },
          { time: '11:00 – 12:30', subject: 'ВПП', type: 'С 7-2', room: 'Ауд. 422', teacher: 'Егоров Ю.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 110', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Среда': [
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Колесников С.В.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Усиков Ю.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Усиков Ю.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 316', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Подготовка', type: 'С', room: 'Ауд. 314', teacher: '' },
          { time: '11:00 – 12:30', subject: 'Зачёт', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В., Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 316', teacher: 'Колесников С.В.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 316', teacher: 'Колесников С.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 316', teacher: 'Колесников С.В.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ВПП', type: 'С 8-2', room: 'Ауд. 316', teacher: 'Егоров Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 110', teacher: 'Колесников С.В.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 110', teacher: 'Усиков Ю.В.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: 'С', room: 'Ауд. 110', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Подготовка', type: 'С', room: 'Ауд. 110', teacher: '' },
          { time: '11:00 – 12:30', subject: 'Зачёт', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В., Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2409': [
    { weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14', days: {} },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 316', teacher: 'Колесников С.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Максимов И.В.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 423', teacher: 'Масленкин Е.В.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВПП', type: 'С 7-2', room: 'Ауд. 422', teacher: 'Егоров Ю.В.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 110', teacher: 'Колесников С.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 422', teacher: 'Максимов И.В.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Среда': [
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 304', teacher: 'Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Усиков Ю.В.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 420', teacher: 'Масленкин Е.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 316', teacher: 'Колесников С.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 110', teacher: 'Масленкин Е.В.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВПП', type: 'С 8-2', room: 'Ауд. 316', teacher: 'Егоров Ю.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 316', teacher: 'Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Подготовка', type: 'С', room: 'Ауд. 110', teacher: '' },
          { time: '11:00 – 12:30', subject: 'Зачёт', type: 'С', room: 'Ауд. 110', teacher: 'Максимов И.В., Масленкин Е.В., Усиков Ю.В.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 110', teacher: 'Колесников С.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 110', teacher: 'Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 316', teacher: 'Усиков Ю.В.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 316', teacher: 'Колесников С.В.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: 'С', room: 'Ауд. 316', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Подготовка', type: 'С', room: 'Ауд. 316', teacher: '' },
          { time: '11:00 – 12:30', subject: 'Зачёт', type: 'С', room: 'Ауд. 316', teacher: 'Максимов И.В., Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2410': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '13:00 – 14:20', subject: 'ВПП', type: 'С', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Экзамен', type: 'С', room: 'Ауд. 514,516', teacher: 'Гнидо А.В., Поляков А.П.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ТСП', type: 'С', room: 'Ауд. 515 (516)', teacher: 'Гнидо А.В., Поляков А.П., Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ВПП', type: 'С 7-3', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2411': [
    { weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14', days: {} },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 313(514)', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ОВП', type: 'ГЗ 16-2', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 313(514)', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 313(514)', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ОВП', type: 'ПЗ 16-3', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 518', teacher: 'Черкесов А.Н.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ОВП', type: 'ГЗ 19-2', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 313 (514)', teacher: 'Кривенцев О.Е.' },
          { time: '11:00 – 12:30', subject: 'ОВП', type: 'ПЗ 19-3', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
          { time: '13:00 – 14:20', subject: 'ВПП', type: 'С', room: 'Ауд. 514', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Кривенцев О.Е.' },
          { time: '11:00 – 12:30', subject: 'ОВП', type: 'С', room: 'Ауд. 518 (515)', teacher: 'Гнидо А.В., Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВПП', type: 'С 7-3', room: 'Ауд. 518', teacher: 'Ковальчук С.В.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 518', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Экзамен', type: 'С', room: 'Ауд. 514,518,(313)', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2412': [
    { weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14', days: {} },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ОВП', type: 'ГЗ 16-2', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 313(514)', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 313(514)', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 313(514)', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ОВП', type: 'ПЗ 16-3', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 518', teacher: 'Черкесов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ТСП', type: 'С', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ОВП', type: 'ГЗ 19-2', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Среда': [
          { time: '11:00 – 12:30', subject: 'ТСП', type: 'С', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВПП', type: 'С', room: 'Ауд. 518', teacher: 'Черкесов А.Н.' },
          { time: '11:00 – 12:30', subject: 'ВСП', type: 'С', room: 'Ауд. 313 (514)', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ОВП', type: 'ПЗ 19-3', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ОВП', type: 'Зачёт', room: 'Ауд. 518 (515)', teacher: 'Гнидо А.В., Черкесов А.Н.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'ВСП', type: 'С', room: 'Ауд. 514 (313)', teacher: 'Кривенцев О.Е.' },
          { time: '11:00 – 12:30', subject: 'ВПП', type: 'С 7-3', room: 'Ауд. 518', teacher: 'Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ВСП', type: 'С', room: 'Ауд. 514', teacher: 'Сальников В.О.' },
        ],
      },
    },
    { weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15', days: {} },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Среда': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2501': [
    { weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14', days: {} },
    { weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21', days: {} },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'С 7-2', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 8-2', room: '', teacher: 'Долгих А.А.' },
        ],
      },
    },
    { weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04', days: {} },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Мас-ка', type: 'ГЗ 30-2', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'С 11-2', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '13:00 – 14:20', subject: 'РХБЗ', type: 'ГЗ 26-1', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'СВ', type: 'С', room: 'Ауд. 301,302', teacher: 'Кашин А.В., Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ВИП', type: 'ГЗ 18-2', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 12-2', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'РХБЗ', type: 'ГЗ 27-1', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '13:00 – 14:20', subject: 'РХБЗ', type: 'ПЗ 28-1', room: 'Ауд. 420', teacher: 'Долгих А.А., Еремеенко С.Н.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'ГЗ 12-3', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ВИП', type: 'ГЗ 19-2РК', room: 'Ауд. 420', teacher: 'Нижаловский А.В., Долгих А.А.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'СВ', type: 'С', room: 'Ауд. 301,302', teacher: 'Кашин А.В., Долгих А.А.' },
          { time: '13:00 – 14:20', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Мед.О', type: 'ГЗ 34-1', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
          { time: '13:00 – 14:20', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ВИП', type: 'ГЗ 22-2', room: 'Ауд. 401,420', teacher: 'Нижаловский А., Долгих А.А.' },
          { time: '11:00 – 12:30', subject: 'Подготовка', type: '', room: '', teacher: '' },
          { time: '13:00 – 14:20', subject: 'Мед.О', type: 'ПЗ 34-2', room: 'Ауд. 420', teacher: 'Долгих А.А.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Экзамен', type: 'Экзамен', room: 'Ауд. 420,422', teacher: 'Ковальчук И.Я., Долгих А.А., Алексеев А.Н.' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2502': [
    { weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14', days: {} },
    { weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21', days: {} },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'С 7-2', room: 'Ауд. 401', teacher: 'Прилюдько В.А.' },
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 8-2', room: '', teacher: 'Прилюдько В.А.' },
        ],
      },
    },
    { weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04', days: {} },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'С 11-2', room: 'Ауд. 401', teacher: 'Еремеенко С.Н.' },
          { time: '11:00 – 12:30', subject: 'РХБЗ', type: 'ГЗ 26-1', room: 'Ауд. 401', teacher: 'Прилюдько В.А.' },
          { time: '13:00 – 14:20', subject: 'Мас-ка', type: 'ГЗ 30-2', room: 'Ауд. 401', teacher: 'Еремеенко С.Н.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 12-2', room: 'Ауд. 401', teacher: 'Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'СВ', type: 'С', room: 'Ауд. 301,302', teacher: 'Кашин А.В., Еремеенко С.Н.' },
          { time: '13:00 – 14:20', subject: 'ВИП', type: 'ГЗ 18-2', room: 'Ауд. 401', teacher: 'Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'РХБЗ', type: 'ГЗ 27-1', room: 'Ауд. 401', teacher: 'Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'ГЗ 12-3', room: 'Ауд. 401', teacher: 'Еремеенко С.Н.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ВИП', type: 'ГЗ 19-2 РК', room: 'Ауд. 401, 422', teacher: 'Прилюдько В.А., Еремеенко С.Н.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'Мед.О', type: 'ГЗ 34-1', room: 'Ауд. 401', teacher: 'Прилюдько В.А.' },
          { time: '13:00 – 14:20', subject: 'РХБЗ', type: 'ПЗ 28-1', room: 'Ауд. 401', teacher: 'Прилюдько В.А., Еремеенко С.Н.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Прилюдько В.А.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: '', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ВИП', type: 'ГЗ 22-2', room: 'Ауд. 401,422', teacher: 'Прилюдько В.А.' },
          { time: '11:00 – 12:30', subject: 'Мед.О', type: 'ПЗ 34-2', room: 'Ауд. 401', teacher: 'Прилюдько В.А.' },
          { time: '13:00 – 14:20', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Экзамен', type: 'С', room: 'Ауд. 420 ,401', teacher: 'Еремеенко С.Н., Прилюдько В.А., Нижаловский А.В.' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2503': [
    { weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14', days: {} },
    { weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21', days: {} },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'С 7-2', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 8-2', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    { weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04', days: {} },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'РХБЗ', type: 'ГЗ 26-1', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '11:00 – 12:30', subject: 'Мас-ка', type: 'ГЗ 30-2', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 11-2', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ВИП', type: 'ГЗ 18-2', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'С 12-2', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'СВ', type: 'С', room: 'Ауд. 301,302', teacher: 'Кашин А.В., Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'РХБЗ', type: 'ГЗ 27-1', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
          { time: '13:00 – 14:20', subject: 'СВ', type: 'С', room: 'Ауд. 423', teacher: 'Кашин А.В., Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'ГЗ 12-3', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ВИП', type: 'ГЗ 19-2 РК', room: 'Ауд. 423, 113', teacher: 'Мальцев И.Г., Мязитов Э.Р.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Мальцев И.Г., Прилюдько В.А.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'РХБЗ', type: 'ПЗ 28-1', room: 'Ауд. 423', teacher: 'Мальцев И.Г., Еремеенко С.Н.' },
          { time: '13:00 – 14:20', subject: 'Мед.О', type: 'ПЗ 34-2', room: 'Ауд. 423', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ВИП', type: 'ГЗ 22-2', room: 'Ауд. 401,423', teacher: 'Мальцев И.Г.' },
          { time: '11:00 – 12:30', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Мальцев И.Г.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Экзамен', type: 'Экзамен', room: 'Ауд. 420,423', teacher: 'Коргутов В.А., Мальцев И.Г., Кашин А.В.' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2504': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ОТ', type: '', room: 'Ауд. 304', teacher: 'Кунакин А.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ОП', type: 'С', room: 'Ауд. 304', teacher: 'Габрусенас Г.С.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'С 5-2', room: 'Ауд. 304', teacher: 'Сарапулов А.А.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'РХБЗ', type: '', room: 'Ауд. 304', teacher: 'Кунакин А.М.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Тех П', type: 'С', room: 'Ауд. 304', teacher: 'Габрусенас Г.С.' },
          { time: '11:00 – 12:30', subject: 'ВТ', type: 'ПЗ 3-2', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Тех П', type: 'ГЗ 4-1', room: 'Ауд. 304,115', teacher: 'Габрусенас Г.С., Кунакин А.М.' },
          { time: '11:00 – 12:30', subject: 'СВ', type: 'С', room: 'Ауд. 510', teacher: 'Кашин А.В.' },
          { time: '13:00 – 14:20', subject: 'ВПР', type: '', room: 'Ауд. 304', teacher: 'Нижаловский А.В.' },
        ],
      },
    },
    { weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25', days: {} },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'ГЗ 4-2', room: 'Ауд. 304', teacher: 'Кунакин А.М.' },
          { time: '11:00 – 12:30', subject: 'ВИП', type: '', room: 'Ауд. 304', teacher: 'Нижаловский А.В.' },
          { time: '13:00 – 14:20', subject: 'РХБЗ', type: 'ГЗ 3-1', room: 'Ауд. 304 ,303', teacher: 'Кунакин А.М., Митюков Е.А.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОП', type: 'С', room: 'Ауд. 303,304,316', teacher: 'Габрусенас Г.С., Кунакин А., Митюков Е., Синицын В.Н.' },
          { time: '13:00 – 14:20', subject: 'РП', type: 'С', room: 'Ауд. 304', teacher: 'Габрусенас Г.С.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'СВ', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'РХБЗ', type: 'ПЗ 3-2', room: 'Ауд. 304 ,303', teacher: 'Кунакин А.М., Митюков Е.А.' },
          { time: '13:00 – 14:20', subject: 'ВИП', type: 'ГЗ 1-2', room: 'Ауд. 316, 304', teacher: 'Кунакин А.М., Нижаловский А.В.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ВИП', type: '', room: 'Ауд. 304', teacher: 'Нижаловский А.В.' },
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'С 7-2', room: 'Ауд. 304', teacher: 'Кунакин А.М.' },
          { time: '13:00 – 14:20', subject: 'ВПР', type: 'С', room: 'Ауд. 304', teacher: 'Габрусенас Г.С.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ВПР', type: 'С 8-2', room: 'Ауд. 304', teacher: 'Габрусенас Г.С.' },
          { time: '13:00 – 14:20', subject: 'СВ', type: 'С', room: 'Ауд. 301', teacher: 'Кашин А.В., Кунакин А.М.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ВПР', type: 'С', room: 'Ауд. 304', teacher: 'Габрусенас Г.С.' },
          { time: '11:00 – 12:30', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Кунакин А.М., Митюков Е.А.' },
          { time: '13:00 – 14:20', subject: 'РП', type: 'С', room: 'Ауд. 304', teacher: 'Габрусенас Г.С.' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ВИП', type: 'ГЗ 2-2', room: 'Ауд. 316, 304', teacher: 'Кунакин А.М., Нижаловский А.В.' },
          { time: '13:00 – 14:20', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Митюков Е.А., Кунакин А.М.' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2505': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ОВУ', type: 'ГЗ 3-1', room: 'Ауд. 502', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОВУ', type: 'ГЗ 4-1', room: 'Ауд. 502', teacher: 'Егоров Ю.В.' },
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 6-2', room: 'Ауд. 502', teacher: 'Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'ГЗ 6-3', room: 'Ауд. 502', teacher: 'Никандров И.В.' },
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 7-2', room: 'Ауд. 502', teacher: 'Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ОВУ', type: 'ГЗ 5-1', room: 'Ауд. 502', teacher: 'Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'С 9-2', room: 'Ауд. 502', teacher: 'Семенов П.Ю.' },
          { time: '13:00 – 14:20', subject: 'ОВУ', type: 'ГЗ 5-2', room: 'Ауд. 502', teacher: 'Косарев О.В.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'ГЗ 9-3', room: 'Ауд. 502', teacher: 'Никандров И.В.' },
          { time: '13:00 – 14:20', subject: 'ВПР', type: 'С 3-2', room: 'Ауд. 502', teacher: 'Егоров И.В.' },
        ],
      },
    },
    { weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25', days: {} },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Усиков Ю.В.' },
          { time: '13:00 – 14:20', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Кротов В.Н.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'ГЗ 11-2', room: 'Ауд. 502,301', teacher: 'Семенов П.Ю., Кашин А.В.' },
        ],
      },
    },
    { weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18', days: {} },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'С 13-2', room: 'Ауд. 502', teacher: 'Никандров И.В.' },
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'С 14-2', room: 'Ауд. 502', teacher: 'Никандров П.Ю.' },
          { time: '13:00 – 14:20', subject: 'ВПР', type: 'С 4-2', room: 'Ауд. 502', teacher: 'Егоров Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Подготовка', type: '', room: 'Ауд. 502', teacher: '' },
          { time: '11:00 – 12:30', subject: 'ОВП', type: 'С', room: 'Ауд. 407', teacher: 'Семенов П., Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'Подготовка', type: '', room: 'Ауд. 502', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ТП', type: 'С', room: 'Ауд. 502,505', teacher: 'Пеляк В.С., Кашин А.В.' },
          { time: '13:00 – 14:20', subject: 'Подведение итогов', type: '', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ВПР', type: 'С 6-2', room: 'Ауд. 502', teacher: 'Егоров Ю.В.' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2506': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ОВУ', type: 'ГЗ 3-1', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'С 6-2', room: 'Ауд. 505', teacher: 'Семенов П.Ю.' },
          { time: '13:00 – 14:20', subject: 'ОВУ', type: 'ГЗ 4-1', room: 'Ауд. 505', teacher: 'Косарев О.В.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'ГЗ 6-3', room: '', teacher: '' },
          { time: '13:00 – 14:20', subject: 'ОВУ', type: 'ГЗ 5-1', room: 'Ауд. 505', teacher: 'Егоров Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'ГЗ 7-2', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ВПР', type: 'С 3-2', room: 'Ауд. 303', teacher: 'Егоров И.В.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'С 9-2', room: 'Ауд. 505', teacher: 'Семенов П.Ю.' },
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'ГЗ 9-3', room: 'Ауд. 505', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    { weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25', days: {} },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'ГЗ 11-2', room: 'Ауд. 502,301', teacher: 'Семенов П.Ю., Кашин А.В.' },
          { time: '13:00 – 14:20', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    { weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18', days: {} },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'С 13-2', room: 'Ауд. 505', teacher: 'Кротов В.Н.' },
          { time: '11:00 – 12:30', subject: 'ВПР', type: 'С 4-2', room: 'Ауд. 505', teacher: 'Егоров Ю.В.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: '', room: 'Ауд. 505', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'С 14-2', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
          { time: '11:00 – 12:30', subject: 'ОВП', type: 'С', room: 'Ауд. 407 ', teacher: 'Ретюнских И.В., Репалов Д.Н.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'Подготовка', type: '', room: 'Ауд. 505', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ТП', type: 'С', room: 'Ауд. 505,510', teacher: 'Никандров И.В., Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ВПР', type: 'С 6-2', room: 'Ауд. 505', teacher: 'Никандров И.В.' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2507': [
    { weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14', days: {} },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОВУ', type: 'ГЗ 4-1', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 6-2', room: 'Ауд. 510', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 7-2', room: 'Ауд. 510', teacher: 'Кротов В.Н.' },
        ],
      },
    },
    { weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04', days: {} },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ОВУ', type: 'ГЗ 5-2', room: 'Ауд. 505', teacher: 'Ретюнских И.В.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ВПР', type: 'С 3-2', room: 'Ауд. 316', teacher: 'Егоров Ю.В.' },
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'ГЗ 9-3', room: 'Ауд. 420', teacher: 'Репалов Д.Н.' },
        ],
      },
    },
    { weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25', days: {} },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Никандров И.В.' },
          { time: '13:00 – 14:20', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'С 13-2', room: 'Ауд. 505', teacher: 'Никандров П.Ю.' },
        ],
      },
    },
    { weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18', days: {} },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'ГЗ 11-2', room: 'Ауд. 316,301', teacher: 'Семенов П.Ю., Кашин А.В.' },
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 14-2', room: 'Ауд. 510', teacher: 'Никандров И.В.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОВП', type: 'С', room: 'Ауд. 407 ', teacher: 'Пеляк В.С., Усиков Ю.В.' },
          { time: '13:00 – 14:20', subject: 'ВПР', type: 'С 4-2', room: 'Ауд. 510', teacher: 'Егоров Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'Подготовка', type: '', room: 'Ауд. 510', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ТП', type: 'Зачёт', room: 'Ауд. 510,505', teacher: 'Репалов Д.Н., Кротов В.Н.' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ВПР', type: 'С 6-2', room: 'Ауд. 510', teacher: 'Ретюнских И.В.' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2508': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОВУ', type: 'ГЗ 3-1', room: 'Ауд. 110', teacher: 'Егоров Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'С 6-2', room: 'Ауд. 110', teacher: 'Максимов И.В.' },
          { time: '13:00 – 14:20', subject: 'ОВУ', type: 'ГЗ 4-1', room: 'Ауд. 110', teacher: 'Егоров Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'ГЗ 6-3', room: 'Ауд. 110', teacher: 'Колесников С.В.' },
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 7-2', room: 'Ауд. 110', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОВУ', type: 'ГЗ 5-1', room: 'Ауд. 110', teacher: 'Егоров Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОВУ', type: 'ГЗ 5-2', room: 'Ауд. 110', teacher: 'Егоров Ю.В.' },
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 9-2', room: 'Ауд. 110', teacher: 'Семенов П.Ю.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Усиков Ю.В.' },
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'ГЗ 9-3', room: 'Ауд. 110', teacher: 'Колесников С.В.' },
        ],
      },
    },
    { weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25', days: {} },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'ГЗ 11-2', room: 'Ауд. 110,301', teacher: 'Колесников С.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ВПР', type: 'С 4-2', room: 'Ауд. 314', teacher: 'Егоров Ю.В.' },
        ],
      },
    },
    { weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18', days: {} },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'Подготовка', type: '', room: 'Ауд. 110', teacher: '' },
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 13-2', room: 'Ауд. 110', teacher: 'Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'С 14-2', room: 'Ауд. 110', teacher: 'Семенов П.Ю.' },
          { time: '11:00 – 12:30', subject: 'ВПР', type: 'С 6-2', room: 'Ауд. 316', teacher: 'Егоров Ю.В.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: '', room: 'Ауд. 316', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Усиков Ю.В.' },
          { time: '11:00 – 12:30', subject: 'ОВП', type: 'С', room: 'Ауд. 316,407', teacher: 'Максимов И.В., Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ТП', type: 'С', room: 'Ауд. 110,303', teacher: 'Усиков Ю.В., Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2509': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОВУ', type: 'ГЗ 3-1', room: 'Ауд. 316', teacher: 'Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОВУ', type: 'ГЗ 4-1', room: 'Ауд. 316', teacher: 'Усиков Ю.В.' },
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 6-2', room: 'Ауд. 316', teacher: 'Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'ГЗ 6-3', room: 'Ауд. 316', teacher: 'Максимов И.В.' },
          { time: '13:00 – 14:20', subject: 'ОВУ', type: 'ГЗ 5-1', room: 'Ауд. 316', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОТ', type: 'С 7-2', room: 'Ауд. 316', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОВУ', type: 'ГЗ 5-2', room: 'Ауд. 316', teacher: 'Усиков Ю.В.' },
          { time: '13:00 – 14:20', subject: 'ОТ', type: 'С 9-2', room: 'Ауд. 316', teacher: 'Колесников С.В.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Колесников С.В.' },
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'ГЗ 9-3', room: 'Ауд. 316', teacher: 'Усиков Ю.В.' },
        ],
      },
    },
    { weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25', days: {} },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ВПР', type: 'С 3-2', room: 'Ауд. 316', teacher: 'Егоров Ю.' },
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'ГЗ 11-2', room: 'Ауд. 110,301', teacher: 'Колесников С., Семенов П.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ВПР', type: 'С 4-2', room: 'Ауд. 110', teacher: 'Колесников С.В.' },
        ],
      },
    },
    { weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18', days: {} },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'С 13-2', room: 'Ауд. 316', teacher: 'Колесников С.В.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: '', room: 'Ауд. 316', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ВПР', type: 'С 6-2', room: 'Ауд. 316', teacher: 'Ретюнских И.В.' },
          { time: '11:00 – 12:30', subject: 'ОТ', type: 'С 14-2', room: 'Ауд. 110', teacher: 'Усиков П.' },
          { time: '13:00 – 14:20', subject: 'Подготовка', type: '', room: 'Ауд. 110', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Стр П', type: 'С', room: 'Плац', teacher: 'Колесников С.В.' },
          { time: '11:00 – 12:30', subject: 'ОВП', type: 'С', room: 'Ауд. 110,407', teacher: 'Колесников С.В., Егоров Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ТП', type: 'Зачёт', room: 'Ауд. 316,303', teacher: 'Ретюнских И.В., Егоров Ю.В.' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: 'С', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2510': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОВП', type: 'ГЗ 7-1', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ГЗ 12-2', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ГЗ 12-3', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ТП', type: 'ПЗ 13-2', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ПЗ 13-3', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: '', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '13:00 – 14:20', subject: 'ОВП', type: 'ГЗ 8-1', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: '', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ГЗ 19-3', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОВП', type: 'ГЗ 9-1', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ГЗ 20-1', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОВП', type: 'С', room: 'Ауд. 515,514', teacher: 'Ковальчук С.В.' },
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ПЗ 15-2', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ПЗ 20-2', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ГЗ 16-1', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: '', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ГЗ 17-2', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ТП', type: '', room: 'Ауд. 516', teacher: 'Поляков А.П.' },
          { time: '11:00 – 12:30', subject: 'ОВП', type: 'ПЗ 12-1', room: 'Плац', teacher: 'Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ГЗ 18-2', room: 'Ауд. 516', teacher: 'Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Экзамен', type: 'С', room: 'Ауд. 518, 516', teacher: 'Гнидо А.В., Поляков А.П., Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОВП', type: 'ПЗ 13-1', room: 'Плац', teacher: 'Ковальчук С.В.' },
          { time: '13:00 – 14:20', subject: 'ОВП', type: 'С', room: 'Ауд. 515', teacher: 'Сальников В.О., Ковальчук С.В.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2511': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОВП', type: 'ГЗ 7-1', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ГЗ 12-2', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ГЗ 12-3', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ТП', type: 'ПЗ 13-2', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ПЗ 13-3', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ГЗ 16-1', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ОВП', type: 'ГЗ 8-1', room: 'Ауд. 313', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ГЗ 17-2', room: 'Ауд. 518', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОВП', type: 'ГЗ 9-1', room: 'Ауд. 313', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ОВП', type: 'С', room: 'Ауд. 515,514', teacher: 'Сальников В.О.' },
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ГЗ 18-2', room: 'Ауд. 518', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ГЗ 15-2', room: 'Ауд. 518', teacher: 'Черкесов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ГЗ 19-3', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ТП', type: 'ГЗ 20-2', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ОВП', type: 'ПЗ 12-1', room: 'Плац', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Экзамен', type: 'Экзамен', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОВП', type: 'ПЗ 13-1', room: 'Плац', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ОВП', type: 'С', room: 'Ауд. 515', teacher: 'Сальников В.О., Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
  '2512': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ГЗ 12-2', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ОВП', type: 'ГЗ 7-1', room: 'Ауд. 518', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ГЗ 12-3', room: 'Ауд. 518', teacher: 'Черкесов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ТП', type: 'ПЗ 13-2', room: 'Ауд. 518', teacher: 'Черкесов А.Н.' },
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ПЗ 13-3', room: 'Ауд. 518', teacher: 'Черкесов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ГЗ 16-1', room: 'Ауд. 518', teacher: 'Черкесов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ТП', type: 'ГЗ 17-2', room: 'Ауд. 518', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Четверг': [
          { time: '13:00 – 14:20', subject: 'ОВП', type: 'ГЗ 8-1', room: 'Ауд. 313', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ГЗ 18-2', room: 'Ауд. 518', teacher: 'Кривенцев О.Е.' },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ГЗ 19-3', room: 'Ауд. 518', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ОВП', type: 'ГЗ 9-1', room: 'Ауд. 313', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ГЗ 20-1', room: 'Ауд. 313', teacher: 'Кривенцев О.Е.' },
          { time: '13:00 – 14:20', subject: 'ОВП', type: 'С', room: 'Ауд. 515,514', teacher: 'Сальников В.О.' },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Четверг': [
          { time: '11:00 – 12:30', subject: 'ТП', type: 'ГЗ 20-2', room: 'Ауд. 518', teacher: 'Черкесов А.Н.' },
        ],
      },
    },
    { weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25', days: {} },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ТП', type: 'ГЗ 15-2', room: 'Ауд. 518', teacher: 'Черкесов А.Н.' },
          { time: '13:00 – 14:20', subject: 'ОВП', type: 'ПЗ 12-1', room: 'Плац', teacher: 'Черкесов А.Н.' },
        ],
      },
    },
    { weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08', days: {} },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'ОВП', type: 'ПЗ 13-1', room: 'Плац', teacher: 'Черкесов А.Н.' },
          { time: '13:00 – 14:20', subject: 'ОВП', type: 'С', room: 'Ауд. 515', teacher: 'Сальников В.О., Черкесов А.Н.' },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Четверг': [
          { time: '9:15 – 10:45', subject: 'Пересдача', type: '', room: '', teacher: '' },
        ],
      },
    },
    { weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06', days: {} },
  ],
};