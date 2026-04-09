import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw, Plus, X, Trash2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SQUADS, getCourse } from '@/data/schedule';
import { toast } from 'sonner';

const statusLabels: Record<string, { label: string; class: string }> = {
  'назначена': { label: 'Назначена', class: 'bg-warning/10 text-warning' },
  'сдана': { label: 'Сдана', class: 'bg-success/10 text-success' },
  'не сдана': { label: 'Не сдана', class: 'bg-destructive/10 text-destructive' },
  'отменена': { label: 'Отменена', class: 'bg-muted text-muted-foreground' },
};

const TeacherRetakesPage = () => {
  const { profile } = useAuth();
  const [retakes, setRetakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedSquad, setSelectedSquad] = useState('2501');
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [retakeDate, setRetakeDate] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const subject = profile?.subject || '';

  useEffect(() => { loadRetakes(); }, []);

  useEffect(() => { loadStudents(); }, [selectedSquad]);

  const loadRetakes = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('retakes')
      .select('*, student:student_id(first_name, last_name, squad)')
      .eq('teacher_id', profile?.id)
      .order('created_at', { ascending: false });
    setRetakes((data as any[]) || []);
    setLoading(false);
  };

  const loadStudents = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'student')
      .eq('squad', selectedSquad);
    setStudents((data as any[]) || []);
  };

  const handleAdd = async () => {
    if (!selectedStudent || !profile) return;
    setSubmitting(true);
    const { error } = await supabase.from('retakes').insert({
      teacher_id: profile.id,
      student_id: selectedStudent,
      subject,
      retake_date: retakeDate || null,
      comment: comment || null,
    } as any);
    if (error) {
      toast.error('Ошибка при назначении пересдачи');
    } else {
      toast.success('Пересдача назначена');
      await supabase.from('notifications').insert({
        user_id: selectedStudent,
        title: 'Назначена пересдача',
        message: `Вам назначена пересдача по предмету ${subject}${retakeDate ? ` на ${new Date(retakeDate).toLocaleDateString('ru-RU')}` : ''}`,
        type: 'retake',
      } as any);
      setShowAdd(false);
      setComment('');
      setRetakeDate('');
      loadRetakes();
    }
    setSubmitting(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    await supabase.from('retakes').update({ status: newStatus } as any).eq('id', id);
    toast.success('Статус обновлён');
    loadRetakes();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить пересдачу?')) return;
    await supabase.from('retakes').delete().eq('id', id);
    toast.success('Пересдача удалена');
    loadRetakes();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">Пересдачи</h1>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />Назначить пересдачу
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : retakes.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <RefreshCw className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Нет назначенных пересдач</p>
        </div>
      ) : (
        <div className="space-y-3">
          {retakes.map(r => {
            const st = statusLabels[r.status] || statusLabels['назначена'];
            return (
              <div key={r.id} className="bg-card rounded-2xl border border-border p-5 hover-lift">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {r.student?.last_name} {r.student?.first_name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary">{r.subject}</span>
                      {r.student?.squad && <span className="text-xs text-muted-foreground">Взвод {r.student.squad}</span>}
                      {r.retake_date && <span className="text-xs text-muted-foreground">{new Date(r.retake_date).toLocaleDateString('ru-RU')}</span>}
                    </div>
                    {r.comment && <p className="text-xs text-muted-foreground mt-1">{r.comment}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <select value={r.status} onChange={e => handleStatusChange(r.id, e.target.value)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg border-0 ${st.class} cursor-pointer`}>
                      <option value="назначена">Назначена</option>
                      <option value="сдана">Сдана</option>
                      <option value="не сдана">Не сдана</option>
                      <option value="отменена">Отменена</option>
                    </select>
                    <button onClick={() => handleDelete(r.id)}
                      className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()} className="bg-card rounded-2xl border border-border p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-foreground">Назначить пересдачу</h3>
                <button onClick={() => setShowAdd(false)} className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Взвод</label>
                  <select value={selectedSquad} onChange={e => setSelectedSquad(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                    {SQUADS.filter(s => getCourse(s) === 1).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Студент</label>
                  <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                    <option value="">Выберите студента</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.last_name} {s.first_name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Дата пересдачи</label>
                  <input type="date" value={retakeDate} onChange={e => setRetakeDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Комментарий</label>
                  <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Причина пересдачи..."
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                </div>
                <button onClick={handleAdd} disabled={!selectedStudent || submitting}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-40 flex items-center justify-center gap-2">
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}Назначить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherRetakesPage;
