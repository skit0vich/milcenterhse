import React, { useState } from 'react';
import { FileText, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialHomework = [
  { id: 1, subject: 'ТСП', desc: 'Реферат: Действия взвода в обороне', deadline: '25.03.2026', status: 'not_started' },
  { id: 2, subject: 'ОВУ', desc: 'Конспект: Устав внутренней службы, глава 3', deadline: '22.03.2026', status: 'progress' },
  { id: 3, subject: 'ОП', desc: 'Подготовить таблицы стрельбы АК-74', deadline: '20.03.2026', status: 'done' },
  { id: 4, subject: 'ТСП', desc: 'Схема организации обороны мотострелкового взвода', deadline: '28.03.2026', status: 'not_started' },
  { id: 5, subject: 'ОП', desc: 'Нормативы по неполной разборке/сборке АК-74', deadline: '24.03.2026', status: 'progress' },
];

const statusMap = {
  not_started: { label: 'Не начато', class: 'bg-muted text-muted-foreground' },
  progress: { label: 'В процессе', class: 'bg-warning/10 text-warning' },
  done: { label: 'Выполнено', class: 'bg-success/10 text-success' },
};

const HomeworkPage = () => {
  const [homework, setHomework] = useState(initialHomework);
  const [showAdd, setShowAdd] = useState(false);
  const [newSubject, setNewSubject] = useState('ТСП');
  const [newDesc, setNewDesc] = useState('');
  const [newDeadline, setNewDeadline] = useState('');

  const cycleStatus = (id: number) => {
    setHomework(prev => prev.map(h => {
      if (h.id !== id) return h;
      const next = h.status === 'not_started' ? 'progress' : h.status === 'progress' ? 'done' : 'not_started';
      return { ...h, status: next };
    }));
  };

  const addHomework = () => {
    if (!newDesc.trim()) return;
    setHomework(prev => [...prev, {
      id: Date.now(),
      subject: newSubject,
      desc: newDesc,
      deadline: newDeadline || new Date().toLocaleDateString('ru-RU'),
      status: 'not_started',
    }]);
    setNewDesc('');
    setNewDeadline('');
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">Домашние задания</h1>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Добавить ДЗ
        </button>
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

      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAdd(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-card rounded-2xl border border-border p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-foreground">Новое домашнее задание</h3>
                <button onClick={() => setShowAdd(false)} className="p-1.5 rounded-lg hover:bg-surface transition-colors text-muted-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Предмет</label>
                  <select
                    value={newSubject}
                    onChange={e => setNewSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    {['ТСП', 'ОП', 'ОТ', 'ОВУ', 'Тех П', 'РХБЗ', 'ВПП', 'УПМВ'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Описание</label>
                  <textarea
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    placeholder="Что задали?"
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Срок сдачи</label>
                  <input
                    type="date"
                    value={newDeadline}
                    onChange={e => setNewDeadline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                </div>
                <button
                  onClick={addHomework}
                  disabled={!newDesc.trim()}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-40"
                >
                  Добавить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeworkPage;
