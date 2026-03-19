import React from 'react';
import { Calendar } from 'lucide-react';

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];

const schedule: Record<string, { time: string; subject: string; teacher: string }[]> = {
  'Понедельник': [
    { time: '08:00 – 09:30', subject: 'Строевая подготовка', teacher: 'Полковник Смирнов А.В.' },
    { time: '09:45 – 11:15', subject: 'Тактика', teacher: 'Майор Козлов Д.С.' },
    { time: '11:30 – 13:00', subject: 'Огневая подготовка', teacher: 'Капитан Волков И.П.' },
  ],
  'Вторник': [
    { time: '08:00 – 09:30', subject: 'Военная топография', teacher: 'Подполковник Морозов Е.А.' },
    { time: '09:45 – 11:15', subject: 'РХБЗ', teacher: 'Майор Лебедев К.Н.' },
  ],
  'Среда': [
    { time: '08:00 – 09:30', subject: 'Общевоинские уставы', teacher: 'Полковник Смирнов А.В.' },
    { time: '09:45 – 11:15', subject: 'Тактика', teacher: 'Майор Козлов Д.С.' },
    { time: '14:00 – 15:30', subject: 'Физическая подготовка', teacher: 'Капитан Орлов М.В.' },
  ],
  'Четверг': [
    { time: '08:00 – 09:30', subject: 'Огневая подготовка', teacher: 'Капитан Волков И.П.' },
    { time: '09:45 – 11:15', subject: 'Военная история', teacher: 'Доцент Кузнецов П.Р.' },
  ],
  'Пятница': [
    { time: '08:00 – 09:30', subject: 'Строевая подготовка', teacher: 'Полковник Смирнов А.В.' },
    { time: '09:45 – 11:15', subject: 'Тактика (практика)', teacher: 'Майор Козлов Д.С.' },
    { time: '11:30 – 13:00', subject: 'Военная топография (практика)', teacher: 'Подполковник Морозов Е.А.' },
  ],
};

const SchedulePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">Расписание</h1>
      </div>

      <div className="space-y-4">
        {days.map(day => (
          <div key={day} className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-6 py-3 bg-surface border-b border-border">
              <h2 className="font-semibold text-foreground">{day}</h2>
            </div>
            <div className="divide-y divide-border">
              {schedule[day]?.map((item, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-surface/50 transition-colors">
                  <div className="text-sm font-mono text-primary font-semibold w-32 flex-shrink-0">{item.time}</div>
                  <div className="h-8 w-1 rounded-full bg-primary/20 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.subject}</p>
                    <p className="text-xs text-muted-foreground">{item.teacher}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;
