import React, { useMemo, useState } from 'react';
import { CheckSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { scheduleData, getSquadDay, SQUADS } from '@/data/schedule';

type Status = 'present' | 'absent' | 'future';

const AttendancePage = () => {
  const { user } = useAuth();
  const squad = user?.squad || SQUADS[0];
  const trainingDay = getSquadDay(squad);
  const weeks = scheduleData[squad] || [];

  // Compute all training dates from schedule weeks
  const trainingDates = useMemo(() => {
    const dayMap: Record<string, number> = {
      'Понедельник': 0, 'Вторник': 1, 'Среда': 2,
      'Четверг': 3, 'Пятница': 4, 'Суббота': 5, 'Воскресенье': 6,
    };
    const dayOffset = dayMap[trainingDay] ?? 3;

    return weeks.map(w => {
      const weekStart = new Date(w.startDate); // YYYY-MM-DD format
      const date = new Date(weekStart);
      // startDate is Monday (day 0 of week), add offset
      date.setDate(date.getDate() + dayOffset);
      return { weekNumber: w.weekNumber, date, dateRange: w.dateRange };
    });
  }, [weeks, trainingDay]);

  // Group training dates by month
  const months = useMemo(() => {
    const map = new Map<string, typeof trainingDates>();
    trainingDates.forEach(td => {
      const key = `${td.date.getFullYear()}-${td.date.getMonth()}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(td);
    });
    return Array.from(map.entries()).map(([key, dates]) => ({
      key,
      label: dates[0].date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }),
      dates,
    }));
  }, [trainingDates]);

  const [monthIdx, setMonthIdx] = useState(() => {
    const now = new Date();
    const idx = months.findIndex(m => {
      const d = m.dates[0].date;
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    return idx >= 0 ? idx : 0;
  });

  // Mock attendance: deterministic based on date seed
  const attendanceMap = useMemo(() => {
    const map: Record<string, Status> = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    trainingDates.forEach(td => {
      const key = td.date.toISOString().split('T')[0];
      if (td.date > today) {
        map[key] = 'future';
      } else {
        // Deterministic pseudo-random from date
        const seed = td.date.getDate() * 13 + td.date.getMonth() * 7 + td.weekNumber;
        map[key] = seed % 8 === 0 ? 'absent' : 'present';
      }
    });
    return map;
  }, [trainingDates]);

  const currentMonth = months[monthIdx];
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

      {/* Calendar by month */}
      {currentMonth && (
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setMonthIdx(i => Math.max(0, i - 1))}
              disabled={monthIdx === 0}
              className="p-1.5 rounded-lg hover:bg-surface transition-colors text-muted-foreground disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h2 className="font-semibold text-foreground capitalize text-sm">
              {currentMonth.label}
            </h2>
            <button
              onClick={() => setMonthIdx(i => Math.min(months.length - 1, i + 1))}
              disabled={monthIdx === months.length - 1}
              className="p-1.5 rounded-lg hover:bg-surface transition-colors text-muted-foreground disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {currentMonth.dates.map(td => {
              const status = getStatus(td.date);
              const dayNum = td.date.getDate();
              const monthShort = td.date.toLocaleDateString('ru-RU', { month: 'short' });
              return (
                <div
                  key={td.weekNumber}
                  className={`relative rounded-xl p-3 text-center transition-all ${
                    status === 'present'
                      ? 'bg-emerald-500/10 border border-emerald-500/20'
                      : status === 'absent'
                      ? 'bg-destructive/10 border border-destructive/20'
                      : 'bg-surface border border-border'
                  }`}
                >
                  <p className={`text-lg font-semibold ${
                    status === 'present' ? 'text-emerald-600 dark:text-emerald-400' :
                    status === 'absent' ? 'text-destructive' :
                    'text-muted-foreground'
                  }`}>
                    {dayNum}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{monthShort}</p>
                  <p className="text-[10px] text-muted-foreground">Нед. {td.weekNumber}</p>
                  {status === 'present' && (
                    <div className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  )}
                  {status === 'absent' && (
                    <div className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full timeline */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h2 className="font-semibold text-foreground text-sm mb-4">Все занятия</h2>
        <div className="flex flex-wrap gap-1.5">
          {trainingDates.map(td => {
            const status = getStatus(td.date);
            return (
              <div
                key={td.weekNumber}
                title={`${td.date.toLocaleDateString('ru-RU')} — Неделя ${td.weekNumber}\n${status === 'present' ? 'Присутствовал' : status === 'absent' ? 'Отсутствовал' : 'Предстоит'}`}
                className={`h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-medium cursor-default transition-all ${
                  status === 'present'
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    : status === 'absent'
                    ? 'bg-destructive/15 text-destructive'
                    : 'bg-surface text-muted-foreground/50'
                }`}
              >
                {td.weekNumber}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-emerald-500/15 inline-block" /> Был</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-destructive/15 inline-block" /> Не был</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-surface inline-block border border-border" /> Предстоит</span>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
