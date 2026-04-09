import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Plus, X, Trash2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SQUADS, getCourse } from '@/data/schedule';
import { toast } from 'sonner';

const TeacherHomeworkPage = () => {
  const { profile } = useAuth();
  const [homework, setHomework] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [targetCourse, setTargetCourse] = useState(1);
  const [targetSquad, setTargetSquad] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const subject = profile?.subject || '';

  useEffect(() => { loadHomework(); }, []);

  const loadHomework = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('homework')
      .select('*')
      .eq('teacher_id', profile?.id)
      .order('created_at', { ascending: false });
    setHomework((data as any[]) || []);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!title.trim() || !profile) return;
    setSubmitting(true);
    const { error } = await supabase.from('homework').insert({
      teacher_id: profile.id,
      title,
      description: description || null,
      subject,
      course: targetCourse,
      squad: targetSquad || null,
      deadline: deadline ? new Date(deadline).toISOString() : null,
    } as any);
    if (error) {
      toast.error('Ошибка при создании задания');
    } else {
      toast.success('Задание создано');
      setShowAdd(false);
      setTitle('');
      setDescription('');
      setDeadline('');
      loadHomework();
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить задание?')) return;
    await supabase.from('homework').delete().eq('id', id);
    toast.success('Задание удалено');
    loadHomework();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">Домашние задания</h1>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />Создать задание
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : homework.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Вы ещё не создавали заданий</p>
        </div>
      ) : (
        <div className="space-y-3">
          {homework.map(h => (
            <div key={h.id} className="bg-card rounded-2xl border border-border p-5 hover-lift">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary">{h.subject}</span>
                    {h.squad && <span className="text-xs text-muted-foreground">Взвод {h.squad}</span>}
                    {h.course && <span className="text-xs text-muted-foreground">{h.course} курс</span>}
                  </div>
                  <p className="text-sm font-medium text-foreground">{h.title}</p>
                  {h.description && <p className="text-xs text-muted-foreground mt-1">{h.description}</p>}
                  {h.deadline && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Дедлайн: {new Date(h.deadline).toLocaleDateString('ru-RU')}
                    </p>
                  )}
                </div>
                <button onClick={() => handleDelete(h.id)}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()} className="bg-card rounded-2xl border border-border p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-foreground">Новое задание</h3>
                <button onClick={() => setShowAdd(false)} className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Название</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Название задания"
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Описание</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Подробности задания..." rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Курс</label>
                    <select value={targetCourse} onChange={e => setTargetCourse(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                      {[1, 2, 3].map(c => <option key={c} value={c}>{c} курс</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Взвод (необязательно)</label>
                    <select value={targetSquad} onChange={e => setTargetSquad(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                      <option value="">Все взводы</option>
                      {SQUADS.filter(s => getCourse(s) === targetCourse).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Дедлайн</label>
                  <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                </div>
                <button onClick={handleAdd} disabled={!title.trim() || submitting}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-40 flex items-center justify-center gap-2">
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}Создать
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherHomeworkPage;
