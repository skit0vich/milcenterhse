import React, { useState } from 'react';
import { FileText } from 'lucide-react';

const initialHomework = [
  { id: 1, subject: 'Общая тактика', desc: 'Реферат: Действия взвода в обороне', deadline: '25.03.2026', status: 'not_started' },
  { id: 2, subject: 'Общевоинские уставы', desc: 'Конспект: Устав внутренней службы, глава 3', deadline: '22.03.2026', status: 'progress' },
  { id: 3, subject: 'Огневая подготовка', desc: 'Подготовить таблицы стрельбы АК-74', deadline: '20.03.2026', status: 'done' },
  { id: 4, subject: 'Общая тактика', desc: 'Схема организации обороны мотострелкового взвода', deadline: '28.03.2026', status: 'not_started' },
  { id: 5, subject: 'Огневая подготовка', desc: 'Нормативы по неполной разборке/сборке АК-74', deadline: '24.03.2026', status: 'progress' },
];

const statusMap = {
  not_started: { label: 'Не начато', class: 'bg-muted text-muted-foreground' },
  progress: { label: 'В процессе', class: 'bg-warning/10 text-warning' },
  done: { label: 'Выполнено', class: 'bg-success/10 text-success' },
};

const HomeworkPage = () => {
  const [homework, setHomework] = useState(initialHomework);

  const cycleStatus = (id: number) => {
    setHomework(prev => prev.map(h => {
      if (h.id !== id) return h;
      const next = h.status === 'not_started' ? 'progress' : h.status === 'progress' ? 'done' : 'not_started';
      return { ...h, status: next };
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">Домашние задания</h1>
      </div>

      <div className="space-y-3">
        {homework.map(h => {
          const st = statusMap[h.status as keyof typeof statusMap];
          return (
            <div key={h.id} className="bg-card rounded-2xl border border-border p-5 hover-lift">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary">{h.subject}</span>
                    <span className="text-xs text-muted-foreground">до {h.deadline}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{h.desc}</p>
                </div>
                <button
                  onClick={() => cycleStatus(h.id)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${st.class} hover:opacity-80`}
                >
                  {st.label}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeworkPage;
