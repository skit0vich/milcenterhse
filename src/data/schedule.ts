// Schedule data based on the official ВУЦ НИУ ВШЭ timetable for 2nd semester 2025-2026

export const SUBJECTS = ['Огневая подготовка', 'Общевоинские уставы', 'Общая тактика'] as const;
export type Subject = typeof SUBJECTS[number];

export const SQUADS = ['Взвод 1', 'Взвод 2', 'Взвод 3'] as const;
export type Squad = typeof SQUADS[number];

export interface ScheduleEntry {
  time: string;
  subject: Subject;
  type: string; // ГЗ, ПЗ, Лекция, Зачёт, etc.
  room: string;
  teacher: string;
}

export interface WeekSchedule {
  weekNumber: number;
  dateRange: string;
  startDate: string;
  days: Record<string, ScheduleEntry[]>;
}

const teachers: Record<Subject, string> = {
  'Огневая подготовка': 'Капитан Волков И.П.',
  'Общевоинские уставы': 'Полковник Смирнов А.В.',
  'Общая тактика': 'Майор Козлов Д.С.',
};

// Full 17-week schedule per squad
export const scheduleData: Record<Squad, WeekSchedule[]> = {
  'Взвод 1': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ГЗ 8-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'ПЗ 2-7', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общевоинские уставы', type: 'ГЗ 3-1', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'ПЗ 8-2', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '12:00 – 13:30', subject: 'Огневая подготовка', type: 'ГЗ 2-8', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ГЗ 8-2', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Общевоинские уставы', type: 'ПЗ 3-1', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Огневая подготовка', type: 'ПЗ 2-9', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'ГЗ 9-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общевоинские уставы', type: 'ГЗ 3-2', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'ГЗ 2-10', room: 'Ауд. 401', teacher: teachers['Огневая подготовка'] },
          { time: '12:00 – 13:30', subject: 'Общая тактика', type: 'ПЗ 9-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ГЗ 9-2', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Общевоинские уставы', type: 'ПЗ 3-2', room: 'Ауд. 115', teacher: teachers['Общевоинские уставы'] },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Огневая подготовка', type: 'ПЗ 2-11', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'ГЗ 10-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '14:00 – 15:30', subject: 'Общевоинские уставы', type: 'ГЗ 4-1', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ГЗ 10-2', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'ГЗ 3-1', room: 'Ауд. 401', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общевоинские уставы', type: 'ГЗ 4-2', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'ПЗ 10-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '12:00 – 13:30', subject: 'Огневая подготовка', type: 'ПЗ 3-2', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ГЗ 11-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Общевоинские уставы', type: 'ПЗ 4-1', room: 'Ауд. 115', teacher: teachers['Общевоинские уставы'] },
        ],
      },
    },
    {
      weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Огневая подготовка', type: 'ПЗ 3-3', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'ПЗ 11-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ПЗ 12-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Общевоинские уставы', type: 'ПЗ 4-2', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '12:00 – 13:30', subject: 'Огневая подготовка', type: 'ГЗ 3-4', room: 'Ауд. 401', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'Зачёт', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'ПЗ 3-5', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общевоинские уставы', type: 'Зачёт', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'Зачёт', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'Итоги', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Общевоинские уставы', type: 'Итоги', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '12:00 – 13:30', subject: 'Огневая подготовка', type: 'Итоги', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ГЗ 8-1 (повтор)', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'Обслуживание', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'Итоги за год', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Общевоинские уставы', type: 'Итоги за год', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '12:00 – 13:30', subject: 'Огневая подготовка', type: 'Итоги за год', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
  ],
  'Взвод 2': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Огневая подготовка', type: 'ГЗ 2-7', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'ГЗ 8-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ПЗ 8-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Общевоинские уставы', type: 'ГЗ 3-1', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общевоинские уставы', type: 'ПЗ 3-1', room: 'Ауд. 115', teacher: teachers['Общевоинские уставы'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'ПЗ 2-8', room: 'Ауд. 401', teacher: teachers['Огневая подготовка'] },
          { time: '12:00 – 13:30', subject: 'Общая тактика', type: 'ГЗ 8-2', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ГЗ 9-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'ГЗ 2-9', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Огневая подготовка', type: 'ПЗ 2-10', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '10:15 – 11:45', subject: 'Общевоинские уставы', type: 'ГЗ 3-2', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общевоинские уставы', type: 'ПЗ 3-2', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'ГЗ 9-2', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '12:00 – 13:30', subject: 'Огневая подготовка', type: 'ГЗ 2-11', room: 'Ауд. 401', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ГЗ 10-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'ПЗ 3-1', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Огневая подготовка', type: 'ПЗ 3-2', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '10:15 – 11:45', subject: 'Общевоинские уставы', type: 'ГЗ 4-1', room: 'Ауд. 115', teacher: teachers['Общевоинские уставы'] },
          { time: '12:00 – 13:30', subject: 'Общая тактика', type: 'ГЗ 10-2', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ПЗ 10-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'ГЗ 3-3', room: 'Ауд. 401', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общевоинские уставы', type: 'ПЗ 4-1', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'ГЗ 11-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ПЗ 11-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'ПЗ 3-4', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '12:00 – 13:30', subject: 'Общевоинские уставы', type: 'ГЗ 4-2', room: 'Ауд. 115', teacher: teachers['Общевоинские уставы'] },
        ],
      },
    },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Огневая подготовка', type: 'ГЗ 3-5', room: 'Ауд. 401', teacher: teachers['Огневая подготовка'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'ПЗ 12-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Огневая подготовка', type: 'Зачёт', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'Зачёт', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общевоинские уставы', type: 'Зачёт', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'Обслуживание', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'Итоги', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'Итоги', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '12:00 – 13:30', subject: 'Общевоинские уставы', type: 'Итоги', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Огневая подготовка', type: 'Обслуживание', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'ГЗ 8-1 (повтор)', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Огневая подготовка', type: 'Итоги за год', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '10:15 – 11:45', subject: 'Общевоинские уставы', type: 'Итоги за год', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '12:00 – 13:30', subject: 'Общая тактика', type: 'Итоги за год', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
  ],
  'Взвод 3': [
    {
      weekNumber: 1, dateRange: '14 – 18 января', startDate: '2026-01-14',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общевоинские уставы', type: 'ГЗ 3-1', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'ПЗ 8-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '12:00 – 13:30', subject: 'Огневая подготовка', type: 'ГЗ 2-7', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 2, dateRange: '21 – 25 января', startDate: '2026-01-21',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Огневая подготовка', type: 'ПЗ 2-8', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'ГЗ 8-2', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 3, dateRange: '28 января – 1 февраля', startDate: '2026-01-28',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ПЗ 8-2', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Общевоинские уставы', type: 'ГЗ 3-2', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
        ],
      },
    },
    {
      weekNumber: 4, dateRange: '4 – 8 февраля', startDate: '2026-02-04',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общевоинские уставы', type: 'ПЗ 3-2', room: 'Ауд. 115', teacher: teachers['Общевоинские уставы'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'ГЗ 2-9', room: 'Ауд. 401', teacher: teachers['Огневая подготовка'] },
          { time: '12:00 – 13:30', subject: 'Общая тактика', type: 'ГЗ 9-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 5, dateRange: '11 – 15 февраля', startDate: '2026-02-11',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ГЗ 9-2', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'ПЗ 2-10', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 6, dateRange: '18 – 22 февраля', startDate: '2026-02-18',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Огневая подготовка', type: 'ГЗ 2-11', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '10:15 – 11:45', subject: 'Общевоинские уставы', type: 'ГЗ 4-1', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
        ],
      },
    },
    {
      weekNumber: 7, dateRange: '25 февраля – 1 марта', startDate: '2026-02-25',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общевоинские уставы', type: 'ПЗ 4-1', room: 'Ауд. 115', teacher: teachers['Общевоинские уставы'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'ГЗ 10-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '12:00 – 13:30', subject: 'Огневая подготовка', type: 'ПЗ 3-1', room: 'Ауд. 401', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 8, dateRange: '4 – 8 марта', startDate: '2026-03-04',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ГЗ 10-2', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'ПЗ 3-2', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 9, dateRange: '11 – 15 марта', startDate: '2026-03-11',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Огневая подготовка', type: 'ГЗ 3-3', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '10:15 – 11:45', subject: 'Общевоинские уставы', type: 'ГЗ 4-2', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '12:00 – 13:30', subject: 'Общая тактика', type: 'ПЗ 10-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 10, dateRange: '18 – 22 марта', startDate: '2026-03-18',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ГЗ 11-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'ПЗ 3-4', room: 'Ауд. 401', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 11, dateRange: '25 – 29 марта', startDate: '2026-03-25',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общевоинские уставы', type: 'ПЗ 4-2', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '10:15 – 11:45', subject: 'Общая тактика', type: 'ПЗ 11-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 12, dateRange: '1 – 5 апреля', startDate: '2026-04-01',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ПЗ 12-1', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'ГЗ 3-5', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '12:00 – 13:30', subject: 'Общевоинские уставы', type: 'Итоги', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
        ],
      },
    },
    {
      weekNumber: 13, dateRange: '8 – 12 апреля', startDate: '2026-04-08',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общевоинские уставы', type: 'Зачёт', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'Зачёт', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 14, dateRange: '15 – 19 апреля', startDate: '2026-04-15',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'Зачёт', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'Обслуживание', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
        ],
      },
    },
    {
      weekNumber: 15, dateRange: '22 – 26 апреля', startDate: '2026-04-22',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Огневая подготовка', type: 'Итоги', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '10:15 – 11:45', subject: 'Общевоинские уставы', type: 'Итоги', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '12:00 – 13:30', subject: 'Общая тактика', type: 'Итоги', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
    {
      weekNumber: 16, dateRange: '29 апреля – 3 мая', startDate: '2026-04-29',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общая тактика', type: 'ГЗ 8-1 (повтор)', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
          { time: '10:15 – 11:45', subject: 'Общевоинские уставы', type: 'Обслуживание', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
        ],
      },
    },
    {
      weekNumber: 17, dateRange: '6 – 10 мая', startDate: '2026-05-06',
      days: {
        'Среда': [
          { time: '08:30 – 10:00', subject: 'Общевоинские уставы', type: 'Итоги за год', room: 'Ауд. 316', teacher: teachers['Общевоинские уставы'] },
          { time: '10:15 – 11:45', subject: 'Огневая подготовка', type: 'Итоги за год', room: 'Ауд. 113', teacher: teachers['Огневая подготовка'] },
          { time: '12:00 – 13:30', subject: 'Общая тактика', type: 'Итоги за год', room: 'Ауд. 420', teacher: teachers['Общая тактика'] },
        ],
      },
    },
  ],
};

export const getSubjectColor = (subject: Subject): string => {
  switch (subject) {
    case 'Огневая подготовка': return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'Общевоинские уставы': return 'bg-primary/10 text-primary border-primary/20';
    case 'Общая тактика': return 'bg-warning/10 text-warning border-warning/20';
  }
};

export const getSubjectDot = (subject: Subject): string => {
  switch (subject) {
    case 'Огневая подготовка': return 'bg-destructive';
    case 'Общевоинские уставы': return 'bg-primary';
    case 'Общая тактика': return 'bg-warning';
  }
};
