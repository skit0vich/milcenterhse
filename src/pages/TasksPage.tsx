import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  assignee: string;
  deadline: string;
  status: 'planned' | 'progress' | 'done';
}

const initialTasks: Task[] = [
  { id: 1, title: 'Подготовить доклад по тактике', assignee: 'Иванов И.', deadline: '22.03.2026', status: 'planned' },
  { id: 2, title: 'Дежурство по взводу', assignee: 'Петров С.', deadline: '20.03.2026', status: 'progress' },
  { id: 3, title: 'Чистка оружия', assignee: 'Сидоров А.', deadline: '19.03.2026', status: 'done' },
  { id: 4, title: 'Инвентаризация формы', assignee: 'Козлов Д.', deadline: '23.03.2026', status: 'planned' },
  { id: 5, title: 'Подготовка плаца', assignee: 'Морозова А.', deadline: '21.03.2026', status: 'progress' },
  { id: 6, title: 'Сдача нормативов', assignee: 'Волков А.', deadline: '18.03.2026', status: 'done' },
];

const columns = [
  { key: 'planned' as const, label: 'Запланировано', color: 'bg-primary/10 text-primary' },
  { key: 'progress' as const, label: 'В процессе', color: 'bg-warning/10 text-warning' },
  { key: 'done' as const, label: 'Выполнено', color: 'bg-success/10 text-success' },
];

const TasksPage = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (id: number, newStatus: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ClipboardList className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">Задачи и обязанности</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map(col => (
          <div key={col.key}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${col.color}`}>{col.label}</span>
              <span className="text-xs text-muted-foreground">{tasks.filter(t => t.status === col.key).length}</span>
            </div>
            <div className="space-y-3">
              {tasks.filter(t => t.status === col.key).map(task => (
                <div key={task.id} className="bg-card rounded-2xl border border-border p-4 hover-lift cursor-pointer">
                  <p className="text-sm font-medium text-foreground mb-2">{task.title}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{task.assignee}</span>
                    <span>{task.deadline}</span>
                  </div>
                  <div className="flex gap-1 mt-3">
                    {col.key !== 'planned' && (
                      <button onClick={() => moveTask(task.id, 'planned')} className="text-xs px-2 py-1 rounded-lg bg-surface text-muted-foreground hover:text-foreground transition-colors">← Назад</button>
                    )}
                    {col.key !== 'done' && (
                      <button onClick={() => moveTask(task.id, col.key === 'planned' ? 'progress' : 'done')} className="text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Далее →</button>
                    )}
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

export default TasksPage;
