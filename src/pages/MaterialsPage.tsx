import React, { useState, useRef, useMemo } from 'react';
import { FileText, Download, Upload, Search, FolderOpen, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { scheduleData, SUBJECT_FULL_NAMES, SQUADS } from '@/data/schedule';

interface MaterialFile {
  id: string;
  name: string;
  subject: string;
  size: string;
  date: string;
  author: string;
  url?: string; // blob URL for uploaded files
}

const MaterialsPage = () => {
  const { profile } = useAuth();
  const squad = profile?.squad || SQUADS[0];

  const squadSubjects = useMemo(() => {
    const weeks = scheduleData[squad] || [];
    const subjs = new Set<string>();
    weeks.forEach(w => Object.values(w.days).flat().forEach(e => subjs.add(e.subject)));
    const nonAcademic = ['Зачёт', 'Экзамен', 'Подготовка', 'Обслуживание', 'Пересдача', 'Подведение итогов'];
    return Array.from(subjs).filter(s => !nonAcademic.includes(s)).sort();
  }, [squad]);

  const subjects = ['Все предметы', ...squadSubjects];

  const [files, setFiles] = useState<MaterialFile[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('Все предметы');
  const [search, setSearch] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadSubject, setUploadSubject] = useState(squadSubjects[0] || '');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = files.filter(f => {
    const matchSubject = selectedSubject === 'Все предметы' || f.subject === selectedSubject;
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.author.toLowerCase().includes(search.toLowerCase());
    return matchSubject && matchSearch;
  });

  const grouped = filtered.reduce<Record<string, MaterialFile[]>>((acc, f) => {
    if (!acc[f.subject]) acc[f.subject] = [];
    acc[f.subject].push(f);
    return acc;
  }, {});

  const handleFileUpload = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: MaterialFile[] = Array.from(fileList).map((file, i) => ({
      id: `upload-${Date.now()}-${i}`,
      name: file.name,
      subject: uploadSubject,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} МБ`,
      date: new Date().toLocaleDateString('ru-RU'),
      author: profile ? `${profile.first_name} ${profile.last_name}` : 'Вы',
      url: URL.createObjectURL(file),
    }));
    setFiles(prev => [...newFiles, ...prev]);
    setUploadModalOpen(false);
  };

  const handleDownload = (file: MaterialFile) => {
    if (!file.url) return;
    const a = document.createElement('a');
    a.href = file.url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Материалы</h1>
          <p className="text-muted-foreground text-sm mt-1">Презентации и учебные материалы · Взвод {squad}</p>
        </div>
        <button
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Upload className="h-4 w-4" />
          Загрузить
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по названию или автору..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {subjects.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedSubject === s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            {files.length === 0 ? 'Пока нет загруженных материалов. Нажмите «Загрузить» для добавления.' : 'Ничего не найдено'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([subject, subjectFiles]) => (
            <div key={subject} className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-foreground">
                  {SUBJECT_FULL_NAMES[subject] || subject}
                </h2>
                <span className="text-xs text-muted-foreground ml-1">({subjectFiles.length})</span>
              </div>
              <div className="divide-y divide-border">
                {subjectFiles.map(file => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-surface transition-colors group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {file.author} · {file.date} · {file.size}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDownload(file)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Скачать
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {uploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setUploadModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-card rounded-2xl border border-border p-6 w-full max-w-lg"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-foreground">Загрузить материал</h3>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-surface transition-colors text-muted-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-foreground mb-1.5 block">Предмет</label>
                <select
                  value={uploadSubject}
                  onChange={e => setUploadSubject(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
                >
                  {squadSubjects.map(s => (
                    <option key={s} value={s}>{SUBJECT_FULL_NAMES[s] || s}</option>
                  ))}
                </select>
              </div>

              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  dragOver
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/40 hover:bg-surface'
                }`}
              >
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">
                  Перетащите файлы сюда или нажмите для выбора
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PPTX, PDF, DOCX — до 50 МБ
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pptx,.pdf,.docx,.ppt,.doc"
                  className="hidden"
                  onChange={e => handleFileUpload(e.target.files)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MaterialsPage;
