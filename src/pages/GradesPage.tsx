import React, { useState } from 'react';
import { BookOpen, Info } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface GradeEntry {
  value: number | null; // null = absent
  date: string;
  topic: string;
}

interface SubjectGrades {
  name: string;
  grades: GradeEntry[];
  exam: number | null;
}

const subjectsData: SubjectGrades[] = [
  {
    name: 'ТСП',
    grades: [
      { value: 4, date: '22.01', topic: 'ГЗ 8-1: Действия взвода' },
      { value: 5, date: '05.02', topic: 'ПЗ 8-2: Практическое занятие' },
      { value: null, date: '19.02', topic: 'ГЗ 9-2: Наступление взвода' },
      { value: 4, date: '12.03', topic: 'ПЗ 10-2: Оборона' },
      { value: 5, date: '26.03', topic: 'ПЗ 11-1: Полевой выход' },
    ],
    exam: 4,
  },
  {
    name: 'ОП',
    grades: [
      { value: 5, date: '05.02', topic: 'ПЗ 2-7: Стрельба из АК-74' },
      { value: 4, date: '26.02', topic: 'ПЗ 6-3: Практическая стрельба' },
      { value: 5, date: '12.03', topic: 'ГЗ 3-1: Материальная часть' },
      { value: 4, date: '26.03', topic: 'ПЗ 3-3: Нормативы' },
      { value: null, date: '09.04', topic: 'ГЗ 4-2: Ручные гранаты' },
    ],
    exam: 5,
  },
  {
    name: 'Тех П',
    grades: [
      { value: 4, date: '15.01', topic: 'ГЗ 2-10: Устройство БМП' },
      { value: 4, date: '29.01', topic: 'ГЗ 2-11: Ходовая часть' },
      { value: 5, date: '19.02', topic: 'ГЗ 2-12: Вооружение БМП' },
      { value: 3, date: '19.03', topic: 'ГЗ 4-1: Эксплуатация' },
    ],
    exam: null,
  },
  {
    name: 'ВПП',
    grades: [
      { value: 5, date: '05.03', topic: 'С 3-2: Семинар' },
      { value: 5, date: '12.03', topic: 'С 4-2: Семинар' },
      { value: 4, date: '19.03', topic: 'С 5-2: Семинар' },
    ],
    exam: null,
  },
  {
    name: 'УПМВ',
    grades: [
      { value: 4, date: '12.03', topic: 'ПЗ 2-2: Управление подразделениями' },
    ],
    exam: null,
  },
];

const GradesPage = () => {
  const { profile } = useAuth();
  const [hoveredGrade, setHoveredGrade] = useState<{ subj: number; grade: number } | null>(null);

  const getAvg = (grades: GradeEntry[]) => {
    const valid = grades.filter(g => g.value !== null).map(g => g.value!);
    return valid.length > 0 ? (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1) : '—';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">Оценки</h1>
        </div>
        <span className="text-sm text-muted-foreground">Взвод {profile?.squad}</span>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Предмет</th>
                <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Оценки</th>
                <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Экзамен</th>
                <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Средний балл</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subjectsData.map((s, si) => (
                <tr key={si} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{s.name}</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      {s.grades.map((g, gi) => (
                        <div
                          key={gi}
                          className="relative"
                          onMouseEnter={() => setHoveredGrade({ subj: si, grade: gi })}
                          onMouseLeave={() => setHoveredGrade(null)}
                        >
                          {g.value !== null ? (
                            <span
                              className={`inline-flex items-center justify-center h-8 w-8 rounded-lg text-sm font-semibold cursor-default ${
                                g.value >= 5 ? 'bg-success/10 text-success' :
                                g.value >= 4 ? 'bg-primary/10 text-primary' :
                                'bg-warning/10 text-warning'
                              }`}
                            >
                              {g.value}
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-semibold bg-destructive/10 text-destructive cursor-default">
                              Н
                            </span>
                          )}

                          {/* Tooltip */}
                          {hoveredGrade?.subj === si && hoveredGrade?.grade === gi && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 pointer-events-none">
                              <div className="bg-popover text-popover-foreground border border-border rounded-lg px-3 py-2 text-xs shadow-lg whitespace-nowrap">
                                <p className="font-semibold">{g.date}</p>
                                <p className="text-muted-foreground mt-0.5">{g.topic}</p>
                                {g.value === null && (
                                  <p className="text-destructive font-medium mt-0.5">Не был на занятии</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {s.exam ? (
                      <span className={`inline-flex items-center justify-center h-8 w-8 rounded-lg text-sm font-bold ${
                        s.exam >= 5 ? 'bg-success/10 text-success' :
                        s.exam >= 4 ? 'bg-primary/10 text-primary' :
                        'bg-warning/10 text-warning'
                      }`}>{s.exam}</span>
                    ) : <span className="text-sm text-muted-foreground">—</span>}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-sm font-semibold text-foreground">{getAvg(s.grades)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="h-4 w-4 text-muted-foreground" />
          <p className="text-xs font-medium text-muted-foreground">Обозначения</p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center h-5 w-5 rounded bg-success/10 text-success text-xs font-bold">5</span>
            Отлично
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center h-5 w-5 rounded bg-primary/10 text-primary text-xs font-bold">4</span>
            Хорошо
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center h-5 w-5 rounded bg-warning/10 text-warning text-xs font-bold">3</span>
            Удовл.
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center h-5 w-5 rounded bg-destructive/10 text-destructive text-xs font-bold">Н</span>
            Не был
          </span>
        </div>
      </div>
    </div>
  );
};

export default GradesPage;
