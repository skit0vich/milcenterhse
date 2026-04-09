import React, { useMemo } from 'react';
import { CheckSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { scheduleData, getSquadDay, SQUADS } from '@/data/schedule';

type Status = 'present' | 'absent' | 'future';

const AttendancePage = () => {
  const { profile } = useAuth();
  const squad = profile?.squad || SQUADS[0];
  const trainingDay = getSquadDay(squad);
  const weeks = scheduleData[squad] || [];

  const trainingDates = useMemo(() => {
    const dayMap: Record<string, number> = {
      'Понедельник': 0, 'Вторник': 1, 'Среда': 2,
      'Четверг': 3, 'Пятница': 4, 'Суббота': 5, 'Воскресенье': 6,
    };
    const dayOffset = dayMap[trainingDay] ?? 3;
    return weeks.map(w => {
      const weekStart = new Date(w.startDate);
      const date = new Date(weekStart);
      date.setDate(date.getDate() + dayOffset);
      return { weekNumber: w.weekNumber, date, dateRange: w.dateRange };
    });
  }, [weeks, trainingDay]);

  const months = useMemo(() => {
    const map = new Map<string, typeof trainingDates>();
    trainingDates.forEach(td => {
      const key = `${td.date.getFullYear()}-${String(td.date.getMonth()).padStart(2, '0')}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(td);
    });
    return Array.from(map.entries()).map(([key, dates]) => ({
      key,
      label: dates[0].date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }),
      dates,
    }));
  }, [trainingDates]);

  const attendanceMap = useMemo(() => {
    const map: Record<string, Status> = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    trainingDates.forEach(td => {
      const key = td.date.toISOString().split('T')[0];
      if (td.date > today) {
        map[key] = 'future';
      } else {
        const seed = td.date.getDate() * 13 + td.date.getMonth() * 7 + td.weekNumber;
        map[key] = seed % 8 === 0 ? 'absent' : 'present';
      }
    });
    return map;
  }, [trainingDates]);

  const allPast = trainingDates.filter(td => attendanceMap[td.date.toISOString().split('T')[0]] !== 'future');
  const presentCount = allPast.filter(td => attendanceMap[td.date.toISOString().split('T')[0]] === 'present').length;
  const absentCount = allPast.length - presentCount;
  const pct = allPast.length > 0 ? Math.round((presentCount / allPast.length) * 100) : 0;

  const getStatus = (date: Date): Status => {
    return attendanceMap[date.toISOString().split('T')[0]] || 'future';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <CheckSquare className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">Посещаемость</h1>
        <span className="text-sm text-muted-foreground ml-2">· {trainingDay} · Взвод {squad}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">Процент</p>
          <p className="text-2xl font-bold text-foreground mt-0.5">{pct}%</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">Присутствовал</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{presentCount}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">Отсутствовал</p>
          <p className="text-2xl font-bold text-destructive mt-0.5">{absentCount}</p>
        </div>
      </div>

      {/* All months */}
      <div className="space-y-4">
        {months.map(month => (
          <div key={month.key} className="bg-card rounded-2xl border border-border p-5">
            <h2 className="font-semibold text-foreground capitalize text-sm mb-3">{month.label}</h2>
            <div className="flex flex-wrap gap-2">
              {month.dates.map(td => {
                const status = getStatus(td.date);
                const dayNum = td.date.getDate();
                const weekDay = td.date.toLocaleDateString('ru-RU', { weekday: 'short' });
                return (
                  <div
                    key={td.weekNumber}
                    title={`${td.date.toLocaleDateString('ru-RU')} · Неделя ${td.weekNumber}\n${status === 'present' ? 'Присутствовал' : status === 'absent' ? 'Отсутствовал' : 'Предстоит'}`}
                    className={`relative rounded-xl px-3 py-2 text-center transition-all min-w-[56px] ${
                      status === 'present'
                        ? 'bg-emerald-500/10 border border-emerald-500/20'
                        : status === 'absent'
                        ? 'bg-destructive/10 border border-destructive/20'
                        : 'bg-surface border border-border'
                    }`}
                  >
                    <p className={`text-base font-semibold leading-tight ${
                      status === 'present' ? 'text-emerald-600 dark:text-emerald-400' :
                      status === 'absent' ? 'text-destructive' :
                      'text-muted-foreground'
                    }`}>
                      {dayNum}
                    </p>
                    <p className="text-[10px] text-muted-foreground capitalize">{weekDay}</p>
                    <p className="text-[9px] text-muted-foreground/60">#{td.weekNumber}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-emerald-500/15 border border-emerald-500/20 inline-block" /> Присутствовал</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-destructive/15 border border-destructive/20 inline-block" /> Отсутствовал</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-surface border border-border inline-block" /> Предстоит</span>
      </div>
    </div>
  );
};

export default AttendancePage;
