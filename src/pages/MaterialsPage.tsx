import React, { useState, useRef } from 'react';
import { FileText, Download, Upload, Search, FolderOpen, File, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PresentationFile {
  id: string;
  name: string;
  subject: string;
  size: string;
  date: string;
  author: string;
}

const subjects = [
  'Все предметы',
  'Тактика',
  'Огневая подготовка',
  'Строевая подготовка',
  'Военная топография',
  'Общевоинские уставы',
  'Военная история',
  'Защита от ОМП',
];

const initialFiles: PresentationFile[] = [
  { id: '1', name: 'Основы тактики. Лекция 1.pptx', subject: 'Тактика', size: '4.2 МБ', date: '15.03.2026', author: 'Майор Козлов Д.С.' },
  { id: '2', name: 'Виды боевых порядков.pptx', subject: 'Тактика', size: '6.1 МБ', date: '12.03.2026', author: 'Майор Козлов Д.С.' },
  { id: '3', name: 'Стрелковое оружие РФ.pptx', subject: 'Огневая подготовка', size: '8.5 МБ', date: '10.03.2026', author: 'Капитан Волков И.П.' },
  { id: '4', name: 'Правила стрельбы из АК-74.pptx', subject: 'Огневая подготовка', size: '3.8 МБ', date: '08.03.2026', author: 'Капитан Волков И.П.' },
  { id: '5', name: 'Элементы строевой подготовки.pptx', subject: 'Строевая подготовка', size: '2.4 МБ', date: '05.03.2026', author: 'Полковник Смирнов А.В.' },
  { id: '6', name: 'Топографические карты.pptx', subject: 'Военная топография', size: '12.3 МБ', date: '01.03.2026', author: 'Подполковник Морозов Е.А.' },
  { id: '7', name: 'Ориентирование на местности.pptx', subject: 'Военная топография', size: '5.7 МБ', date: '28.02.2026', author: 'Подполковник Морозов Е.А.' },
  { id: '8', name: 'Устав внутренней службы.pptx', subject: 'Общевоинские уставы', size: '3.1 МБ', date: '25.02.2026', author: 'Полковник Смирнов А.В.' },
  { id: '9', name: 'ВОВ: Основные сражения.pptx', subject: 'Военная история', size: '15.2 МБ', date: '20.02.2026', author: 'Доцент Петров В.Н.' },
  { id: '10', name: 'Средства индивидуальной защиты.pptx', subject: 'Защита от ОМП', size: '4.9 МБ', date: '18.02.2026', author: 'Капитан Сидоров А.Г.' },
];

const MaterialsPage = () => {
  const [files, setFiles] = useState<PresentationFile[]>(initialFiles);
  const [selectedSubject, setSelectedSubject] = useState('Все предметы');
  const [search, setSearch] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadSubject, setUploadSubject] = useState(subjects[1]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = files.filter(f => {
    const matchSubject = selectedSubject === 'Все предметы' || f.subject === selectedSubject;
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.author.toLowerCase().includes(search.toLowerCase());
    return matchSubject && matchSearch;
  });

  const grouped = filtered.reduce<Record<string, PresentationFile[]>>((acc, f) => {
    if (!acc[f.subject]) acc[f.subject] = [];
    acc[f.subject].push(f);
    return acc;
  }, {});

  const handleFileUpload = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: PresentationFile[] = Array.from(fileList).map((file, i) => ({
      id: `upload-${Date.now()}-${i}`,
      name: file.name,
      subject: uploadSubject,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} МБ`,
      date: new Date().toLocaleDateString('ru-RU'),
      author: 'Вы',
    }));
    setFiles(prev => [...newFiles, ...prev]);
    setUploadModalOpen(false);
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
          <p className="text-muted-foreground text-sm mt-1">Презентации и учебные материалы по предметам</p>
        </div>
        <button
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Upload className="h-4 w-4" />
          Загрузить
        </button>
      </div>

      {/* Filters */}
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

      {/* Files grouped by subject */}
      {Object.keys(grouped).length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Ничего не найдено</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([subject, subjectFiles]) => (
            <div key={subject} className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-foreground">{subject}</h2>
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
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors opacity-0 group-hover:opacity-100"
                      onClick={() => {
                        // Mock download
                        const a = document.createElement('a');
                        a.href = '#';
                        a.download = file.name;
                        a.click();
                      }}
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

      {/* Upload Modal */}
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
                  {subjects.filter(s => s !== 'Все предметы').map(s => (
                    <option key={s} value={s}>{s}</option>
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
