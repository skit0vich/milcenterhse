import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { FolderOpen, Plus, X, Trash2, Upload, Download, Loader2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SQUADS, getCourse, SUBJECT_FULL_NAMES } from '@/data/schedule';
import { toast } from 'sonner';

const TeacherMaterialsPage = () => {
  const { profile } = useAuth();
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetCourse, setTargetCourse] = useState(1);
  const [targetSquad, setTargetSquad] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const subject = profile?.subject || '';

  useEffect(() => { loadMaterials(); }, []);

  const loadMaterials = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('materials')
      .select('*')
      .eq('teacher_id', profile?.id)
      .order('created_at', { ascending: false });
    setMaterials((data as any[]) || []);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!title.trim() || !profile) return;
    setSubmitting(true);

    let fileUrl = null;
    let fileName = null;

    if (selectedFile) {
      const filePath = `${profile.id}/${Date.now()}_${selectedFile.name}`;
      const { error: uploadError } = await supabase.storage.from('materials').upload(filePath, selectedFile);
      if (uploadError) {
        toast.error('Ошибка загрузки файла');
        setSubmitting(false);
        return;
      }
      const { data: urlData } = supabase.storage.from('materials').getPublicUrl(filePath);
      fileUrl = urlData.publicUrl;
      fileName = selectedFile.name;
    }

    const { error } = await supabase.from('materials').insert({
      teacher_id: profile.id,
      title,
      description: description || null,
      subject,
      course: targetCourse,
      squad: targetSquad || null,
      file_url: fileUrl,
      file_name: fileName,
    } as any);

    if (error) {
      toast.error('Ошибка при создании материала');
    } else {
      toast.success('Материал загружен');
      setShowAdd(false);
      setTitle('');
      setDescription('');
      setSelectedFile(null);
      loadMaterials();
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить материал?')) return;
    await supabase.from('materials').delete().eq('id', id);
    toast.success('Материал удалён');
    loadMaterials();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">Учебные материалы</h1>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />Загрузить материал
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : materials.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Вы ещё не загружали материалов</p>
        </div>
      ) : (
        <div className="space-y-3">
          {materials.map(m => (
            <div key={m.id} className="bg-card rounded-2xl border border-border p-5 hover-lift">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{m.title}</p>
                    {m.description && <p className="text-xs text-muted-foreground mt-1">{m.description}</p>}
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-lg bg-primary/10 text-primary">{m.subject}</span>
                      {m.squad && <span className="text-xs text-muted-foreground">Взвод {m.squad}</span>}
                      {m.file_name && <span className="text-xs text-muted-foreground">{m.file_name}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {m.file_url && (
                    <a href={m.file_url} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                      <Download className="h-4 w-4" />
                    </a>
                  )}
                  <button onClick={() => handleDelete(m.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
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
                <h3 className="text-lg font-semibold text-foreground">Загрузить материал</h3>
                <button onClick={() => setShowAdd(false)} className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Название</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Название материала"
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Описание</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Описание материала..." rows={2}
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
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Взвод</label>
                    <select value={targetSquad} onChange={e => setTargetSquad(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                      <option value="">Все взводы</option>
                      {SQUADS.filter(s => getCourse(s) === targetCourse).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Файл</label>
                  <div onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-primary/40 transition-all">
                    {selectedFile ? (
                      <p className="text-sm text-foreground">{selectedFile.name}</p>
                    ) : (
                      <>
                        <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Нажмите для выбора файла</p>
                      </>
                    )}
                    <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.pptx,.docx,.ppt,.doc"
                      onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                  </div>
                </div>
                <button onClick={handleAdd} disabled={!title.trim() || submitting}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-40 flex items-center justify-center gap-2">
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}Загрузить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherMaterialsPage;
