import React, { useState, useRef } from 'react';
import { ClipboardList, Plus, X, Shuffle, Sparkles, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Task {
  id: number;
  title: string;
  assignee: string;
  deadline: string;
  status: 'unassigned' | 'planned' | 'progress' | 'done';
  teacher?: string;
}

const squadMembers = [
  'Петров С.М.', 'Семенов Д.Б.', 'Шайдамов А.А.', 'Назарчук Т.С.',
  'Попов А.И.', 'Рыбин П.В.', 'Сахненко А.С.', 'Сергиенко Г.Г.',
  'Пудов И.В.', 'Змановский Н.С.', 'Искендеров Н.В.', 'Костенко В.О.',
  'Петров Ф.С.', 'Пучков С.Д.', 'Чинков А.С.', 'Медведков Г.С.',
  'Абаджян Г.Г.', 'Букинич Г.Д.', 'Гельдымурадов Е.Д.', 'Косолапов Л.В.',
  'Нефедов И.А.', 'Эм О.Ю.',
];

const initialTasks: Task[] = [
  { id: 1, title: 'Подготовить доклад по тактике', assignee: 'Назарчук Т.С.', deadline: '22.03.2026', status: 'planned' },
  { id: 2, title: 'Дежурство по взводу', assignee: 'Петров С.М.', deadline: '20.03.2026', status: 'progress' },
  { id: 3, title: 'Чистка оружия', assignee: 'Рыбин П.В.', deadline: '19.03.2026', status: 'done' },
  { id: 4, title: 'Инвентаризация формы', assignee: 'Костенко В.О.', deadline: '23.03.2026', status: 'planned' },
  { id: 5, title: 'Подготовка плаца', assignee: 'Пудов И.В.', deadline: '21.03.2026', status: 'progress' },
  { id: 6, title: 'Сдача нормативов', assignee: 'Чинков А.С.', deadline: '18.03.2026', status: 'done' },
  { id: 7, title: 'Реферат по военной истории', assignee: '', deadline: '25.03.2026', status: 'unassigned', teacher: 'Долгих А.А.' },
  { id: 8, title: 'Подготовка к зачёту по ОВУ', assignee: '', deadline: '27.03.2026', status: 'unassigned', teacher: 'Ковальчук И.Я.' },
];

const columns = [
  { key: 'unassigned' as const, label: 'Нераспределённые', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
  { key: 'planned' as const, label: 'Запланировано', color: 'bg-primary/10 text-primary' },
  { key: 'progress' as const, label: 'В процессе', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  { key: 'done' as const, label: 'Выполнено', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
];

const TasksPage = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAssignee, setNewAssignee] = useState(squadMembers[0]);
  const [newDeadline, setNewDeadline] = useState('');

  // Random picker state
  const [randomTask, setRandomTask] = useState('');
  const [randomResult, setRandomResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // Drag & drop state
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    // Make the drag image semi-transparent
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
    setDraggedTask(null);
    setDragOverCol(null);
  };

  const handleDragOver = (e: React.DragEvent, colKey: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCol(colKey);
  };

  const handleDragLeave = () => {
    setDragOverCol(null);
  };

  const handleDrop = (e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault();
    setDragOverCol(null);
    if (draggedTask && draggedTask.status !== newStatus) {
      setTasks(prev => prev.map(t => t.id === draggedTask.id ? { ...t, status: newStatus } : t));
    }
    setDraggedTask(null);
  };

  const moveTask = (id: number, newStatus: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const addTask = () => {
    if (!newTitle.trim()) return;
    const task: Task = {
      id: Date.now(),
      title: newTitle,
      assignee: newAssignee,
      deadline: newDeadline || new Date().toLocaleDateString('ru-RU'),
      status: 'planned',
    };
    setTasks(prev => [...prev, task]);
    setNewTitle('');
    setNewDeadline('');
    setShowAddModal(false);
  };

  const pickRandom = () => {
    setIsSpinning(true);
    setRandomResult(null);
    let count = 0;
    const interval = setInterval(() => {
      setRandomResult(squadMembers[Math.floor(Math.random() * squadMembers.length)]);
      count++;
      if (count > 15) {
        clearInterval(interval);
        setIsSpinning(false);
        const chosen = squadMembers[Math.floor(Math.random() * squadMembers.length)];
        setRandomResult(chosen);
      }
    }, 100);
  };

  const assignRandom = () => {
    if (!randomTask.trim() || !randomResult || isSpinning) return;
    const task: Task = {
      id: Date.now(),
      title: randomTask,
      assignee: randomResult,
      deadline: new Date().toLocaleDateString('ru-RU'),
      status: 'planned',
    };
    setTasks(prev => [...prev, task]);
    setRandomTask('');
    setRandomResult(null);
    setShowRandomModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">Задачи и обязанности</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowRandomModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl text-sm font-medium hover:bg-amber-500/20 transition-colors"
          >
            <Shuffle className="h-4 w-4" />
            Случайный
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Добавить
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map(col => (
          <div
            key={col.key}
            onDragOver={e => handleDragOver(e, col.key)}
            onDragLeave={handleDragLeave}
            onDrop={e => handleDrop(e, col.key)}
            className={`rounded-2xl p-3 transition-all duration-200 min-h-[200px] ${
              dragOverCol === col.key
                ? 'bg-primary/5 ring-2 ring-primary/30 ring-dashed'
                : 'bg-transparent'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${col.color}`}>{col.label}</span>
              <span className="text-xs text-muted-foreground">{tasks.filter(t => t.status === col.key).length}</span>
            </div>
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {tasks.filter(t => t.status === col.key).map(task => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    draggable
                    onDragStart={(e: any) => handleDragStart(e, task)}
                    onDragEnd={(e: any) => handleDragEnd(e)}
                    className="bg-card rounded-2xl border border-border p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground/40 mt-0.5 flex-shrink-0 group-hover:text-muted-foreground transition-colors" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground mb-2">{task.title}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{task.assignee}</span>
                          <span>{task.deadline}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-card rounded-2xl border border-border p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-foreground">Новая задача</h3>
                <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg hover:bg-surface transition-colors text-muted-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Описание задачи</label>
                  <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Например: Дежурство по взводу"
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Ответственный</label>
                  <select value={newAssignee} onChange={e => setNewAssignee(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                    {squadMembers.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Срок</label>
                  <input type="date" value={newDeadline} onChange={e => setNewDeadline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                </div>
                <button onClick={addTask} disabled={!newTitle.trim()}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-40">
                  Добавить задачу
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Random Picker Modal */}
      <AnimatePresence>
        {showRandomModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setShowRandomModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-card rounded-2xl border border-border p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-foreground">Случайный выбор</h3>
                <button onClick={() => setShowRandomModal(false)} className="p-1.5 rounded-lg hover:bg-surface transition-colors text-muted-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Задача</label>
                  <input value={randomTask} onChange={e => setRandomTask(e.target.value)} placeholder="Что нужно сделать?"
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                </div>
                <div className="bg-surface rounded-2xl p-6 text-center">
                  <Sparkles className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                  {randomResult ? (
                    <motion.p key={randomResult} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      className={`text-xl font-bold ${isSpinning ? 'text-muted-foreground' : 'text-primary'}`}>
                      {randomResult}
                    </motion.p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Нажмите кнопку для выбора</p>
                  )}
                </div>
                <button onClick={pickRandom} disabled={isSpinning}
                  className="w-full py-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium text-sm hover:bg-amber-500/20 transition-all disabled:opacity-40">
                  <span className="flex items-center justify-center gap-2">
                    <Shuffle className={`h-4 w-4 ${isSpinning ? 'animate-spin' : ''}`} />
                    {isSpinning ? 'Выбираем...' : 'Крутить рулетку'}
                  </span>
                </button>
                {randomResult && !isSpinning && randomTask.trim() && (
                  <button onClick={assignRandom}
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all">
                    Назначить {randomResult.split(' ')[0]}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TasksPage;
