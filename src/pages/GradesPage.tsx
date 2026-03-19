import React from 'react';
import { BookOpen } from 'lucide-react';

const subjects = [
  { name: 'Тактика', grades: [5, 4, 5, 5, 4], exam: 5, avg: 4.6 },
  { name: 'Огневая подготовка', grades: [4, 4, 5, 3, 4], exam: 4, avg: 4.0 },
  { name: 'Строевая подготовка', grades: [5, 5, 5, 5], exam: 5, avg: 5.0 },
  { name: 'Военная топография', grades: [4, 5, 4, 5], exam: null, avg: 4.5 },
  { name: 'РХБЗ', grades: [3, 4, 4, 5], exam: null, avg: 4.0 },
  { name: 'Общевоинские уставы', grades: [5, 4, 5, 4, 5], exam: 5, avg: 4.7 },
  { name: 'Военная история', grades: [4, 4, 5], exam: null, avg: 4.3 },
];

const GradesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">Оценки</h1>
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
              {subjects.map((s, i) => (
                <tr key={i} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{s.name}</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      {s.grades.map((g, j) => (
                        <span
                          key={j}
                          className={`inline-flex items-center justify-center h-8 w-8 rounded-lg text-sm font-semibold ${
                            g >= 5 ? 'bg-success/10 text-success' :
                            g >= 4 ? 'bg-primary/10 text-primary' :
                            'bg-warning/10 text-warning'
                          }`}
                        >
                          {g}
                        </span>
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
                    <span className="text-sm font-semibold text-foreground">{s.avg.toFixed(1)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GradesPage;
