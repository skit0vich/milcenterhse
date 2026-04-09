import React, { useState, useMemo } from 'react';
import { Calendar, ChevronLeft, ChevronRight, MapPin, GraduationCap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { scheduleData, getSubjectColor, getSubjectDot, getSquadDay, SUBJECT_FULL_NAMES, SQUADS } from '@/data/schedule';
import { motion, AnimatePresence } from 'framer-motion';

const SchedulePage = () => {
  const { profile } = useAuth();
  const squad = profile?.squad || SQUADS[0];
  const weeks = scheduleData[squad] || [];
  const dayName = getSquadDay(squad);
  
  const now = new Date();
  const currentWeekIdx = useMemo(() => {
    const idx = weeks.findIndex(w => {
      const start = new Date(w.startDate);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return now >= start && now <= end;
    });
    return idx >= 0 ? idx : 0;
  }, [weeks]);

  const [selectedWeek, setSelectedWeek] = useState(currentWeekIdx);
  const [filterSubject, setFilterSubject] = useState<string>('all');

  const squadSubjects = useMemo(() => {
    const subjs = new Set<string>();
    weeks.forEach(w => {
      Object.values(w.days).flat().forEach(e => subjs.add(e.subject));
    });
    return Array.from(subjs).sort();
  }, [weeks]);

  const week = weeks[selectedWeek] || null;

  if (!week) {
    return (
      <div className="p-12 text-center text-muted-foreground">
        Нет данных расписания для взвода {squad}
      </div>
    );
  }

  const allEntries = Object.entries(week.days).flatMap(([day, entries]) =>
    entries.map(e => ({ ...e, day }))
  );

  const filtered = filterSubject === 'all'
    ? allEntries
    : allEntries.filter(e => e.subject === filterSubject);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold text-foreground">Расписание</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Взвод {squad} · {dayName} · 2-й семестр 2025–2026
          </p>
        </div>
      </div>

      {/* Week navigation */}
      <div className="bg-card rounded-2xl border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
            disabled={selectedWeek === 0}
            className="p-2 rounded-xl hover:bg-surface transition-colors text-muted-foreground disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              {week.weekNumber}-я неделя
            </p>
            <p className="text-sm text-muted-foreground">{week.dateRange}</p>
          </div>
          <button
            onClick={() => setSelectedWeek(Math.min(weeks.length - 1, selectedWeek + 1))}
            disabled={selectedWeek === weeks.length - 1}
            className="p-2 rounded-xl hover:bg-surface transition-colors text-muted-foreground disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Week pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {weeks.map((w, i) => (
            <button
              key={w.weekNumber}
              onClick={() => setSelectedWeek(i)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                i === selectedWeek
                  ? 'bg-primary text-primary-foreground'
                  : i === currentWeekIdx
                  ? 'bg-primary/15 text-primary border border-primary/30'
                  : 'bg-surface text-muted-foreground hover:text-foreground'
              }`}
            >
              {w.weekNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Subject filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterSubject('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            filterSubject === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          Все предметы
        </button>
        {squadSubjects.map(s => (
          <button
            key={s}
            onClick={() => setFilterSubject(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterSubject === s
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Schedule entries */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedWeek + filterSubject}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          {filtered.length === 0 ? (
            <div className="bg-card rounded-2xl border border-border p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Нет занятий на этой неделе</p>
            </div>
          ) : (
            filtered.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl border border-border p-5 hover-lift"
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1 min-w-[80px]">
                    <div className={`h-2.5 w-2.5 rounded-full ${getSubjectDot(entry.subject)}`} />
                    <span className="text-sm font-mono font-semibold text-primary whitespace-nowrap">
                      {entry.time.split(' – ')[0]}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {entry.time.split(' – ')[1]}
                    </span>
                  </div>
                  
                  <div className="h-14 w-0.5 rounded-full bg-border flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">
                          {SUBJECT_FULL_NAMES[entry.subject] || entry.subject}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium border ${getSubjectColor(entry.subject)}`}>
                            {entry.subject}
                          </span>
                          {entry.type && (
                            <span className="text-xs text-muted-foreground">{entry.type}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2.5 text-xs text-muted-foreground flex-wrap">
                      {entry.teacher && (
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-3.5 w-3.5" />
                          {entry.teacher}
                        </span>
                      )}
                      {entry.room && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {entry.room}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="bg-card rounded-2xl border border-border p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Обозначения</p>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span>ГЗ — групповое занятие</span>
          <span>ПЗ — практическое занятие</span>
          <span>ГУ — групповое упражнение</span>
          <span>С — семинар</span>
          <span>РК — рубежный контроль</span>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
