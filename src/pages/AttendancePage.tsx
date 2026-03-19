import React from 'react';
import { CheckSquare } from 'lucide-react';

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const firstDay = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;

// Mock: random attendance
const attendanceData: Record<number, 'present' | 'absent'> = {};
for (let d = 1; d <= daysInMonth; d++) {
  const dow = (new Date(currentYear, currentMonth, d).getDay() + 6) % 7;
  if (dow < 5 && d <= new Date().getDate()) {
    attendanceData[d] = Math.random() > 0.12 ? 'present' : 'absent';
  }
}

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const AttendancePage = () => {
  const present = Object.values(attendanceData).filter(v => v === 'present').length;
  const total = Object.values(attendanceData).length;
  const pct = total > 0 ? Math.round((present / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <CheckSquare className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">Посещаемость</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl border border-border p-5 hover-lift">
          <p className="text-sm text-muted-foreground">Общий процент</p>
          <p className="text-3xl font-bold text-foreground mt-1">{pct}%</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-5 hover-lift">
          <p className="text-sm text-muted-foreground">Присутствовал</p>
          <p className="text-3xl font-bold text-success mt-1">{present}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-5 hover-lift">
          <p className="text-sm text-muted-foreground">Отсутствовал</p>
          <p className="text-3xl font-bold text-destructive mt-1">{total - present}</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6">
        <h2 className="font-semibold text-foreground mb-4">
          {new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="grid grid-cols-7 gap-2">
          {weekdays.map(d => (
            <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const status = attendanceData[day];
            return (
              <div
                key={day}
                className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all cursor-default ${
                  status === 'present' ? 'bg-success/15 text-success' :
                  status === 'absent' ? 'bg-destructive/15 text-destructive' :
                  'bg-surface text-muted-foreground'
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
