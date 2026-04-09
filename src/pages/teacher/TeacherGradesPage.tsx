import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen, Plus, X, Trash2, Edit2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SQUADS, getCourse, SUBJECT_FULL_NAMES } from '@/data/schedule';
import { toast } from 'sonner';

const TeacherGradesPage = () => {
  const { profile } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(1);
  const [selectedSquad, setSelectedSquad] = useState('2501');
  const [students, setStudents] = useState<any[]>([]);
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [gradeValue, setGradeValue] = useState(5);
  const [gradeComment, setGradeComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const courseSquads = SQUADS.filter(s => getCourse(s) === selectedCourse);
  const subject = profile?.subject || '';

  useEffect(() => {
    loadStudents();
  }, [selectedSquad]);

  useEffect(() => {
    if (students.length) loadGrades();
  }, [students]);

  const loadStudents = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'student')
      .eq('squad', selectedSquad);
    setStudents((data as any[]) || []);
    setLoading(false);
  };

  const loadGrades = async () => {
    const studentIds = students.map(s => s.id);
    if (!studentIds.length) return;
    const { data } = await supabase
      .from('grades')
      .select('*')
      .eq('subject', subject)
      .in('student_id', studentIds)
      .order('grade_date', { ascending: true });
    setGrades((data as any[]) || []);
  };

  const handleAddGrade = async () => {
    if (!selectedStudent || !profile) return;
    setSubmitting(true);
    const { error } = await supabase.from('grades').insert({
      student_id: selectedStudent,
      teacher_id: profile.id,
      subject,
      value: gradeValue,
      comment: gradeComment || null,
    } as any);
    if (error) {
      toast.error('Ошибка при добавлении оценки');
    } else {
      toast.success('Оценка выставлена');
      // Create notification for student
      await supabase.from('notifications').insert({
        user_id: selectedStudent,
        title: 'Новая оценка',
        message: `Вам выставлена оценка ${gradeValue} по предмету ${subject}`,
        type: 'grade',
      } as any);
      setShowAdd(false);
      setGradeComment('');
      loadGrades();
    }
    setSubmitting(false);
  };

  const handleDeleteGrade = async (gradeId: string) => {
    if (!confirm('Удалить оценку?')) return;
    await supabase.from('grades').delete().eq('id', gradeId);
    toast.success('Оценка удалена');
    loadGrades();
  };

  const getStudentGrades = (studentId: string) => grades.filter(g => g.student_id === studentId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">Оценки</h1>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />Выставить оценку
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {[1, 2, 3].map(c => (
          <button key={c} onClick={() => { setSelectedCourse(c); const sq = SQUADS.find(s => getCourse(s) === c); if (sq) setSelectedSquad(sq); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCourse === c ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground'}`}>
            {c} курс
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {courseSquads.map(s => (
          <button key={s} onClick={() => setSelectedSquad(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedSquad === s ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : students.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">Нет студентов в этом взводе</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Студент</th>
                <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Оценки по {subject}</th>
                <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Средний</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {students.map(s => {
                const sg = getStudentGrades(s.id);
                const avg = sg.length > 0 ? (sg.reduce((a: number, g: any) => a + g.value, 0) / sg.length).toFixed(1) : '—';
                return (
                  <tr key={s.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{s.last_name} {s.first_name}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        {sg.map((g: any) => (
                          <div key={g.id} className="group relative">
                            <span className={`inline-flex items-center justify-center h-8 w-8 rounded-lg text-sm font-semibold cursor-default ${
                              g.value >= 5 ? 'bg-success/10 text-success' : g.value >= 4 ? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'
                            }`}>{g.value}</span>
                            <button onClick={() => handleDeleteGrade(g.id)}
                              className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground rounded-full items-center justify-center text-xs hidden group-hover:flex">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        {sg.length === 0 && <span className="text-xs text-muted-foreground">—</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-sm font-semibold text-foreground">{avg}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()} className="bg-card rounded-2xl border border-border p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-foreground">Выставить оценку</h3>
                <button onClick={() => setShowAdd(false)} className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Студент</label>
                  <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                    <option value="">Выберите студента</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.last_name} {s.first_name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Оценка</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(v => (
                      <button key={v} type="button" onClick={() => setGradeValue(v)}
                        className={`h-10 w-10 rounded-xl text-sm font-bold transition-all ${
                          gradeValue === v ? 'bg-primary text-primary-foreground' : 'bg-surface text-foreground border border-border'
                        }`}>{v}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Комментарий</label>
                  <input type="text" value={gradeComment} onChange={e => setGradeComment(e.target.value)} placeholder="За что оценка..."
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                </div>
                <button onClick={handleAddGrade} disabled={!selectedStudent || submitting}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-40 flex items-center justify-center gap-2">
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}Выставить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherGradesPage;
