import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, FileText, RefreshCw, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboardPage = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const actions = [
    { label: 'Оценки', desc: 'Выставить и редактировать оценки', icon: BookOpen, to: '/teacher/grades' },
    { label: 'Задания', desc: 'Создать домашнее задание', icon: FileText, to: '/teacher/homework' },
    { label: 'Материалы', desc: 'Загрузить учебные материалы', icon: Users, to: '/teacher/materials' },
    { label: 'Пересдачи', desc: 'Назначить пересдачу', icon: RefreshCw, to: '/teacher/retakes' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Добро пожаловать, {profile?.first_name}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Преподаватель · {profile?.subject || 'Предмет не указан'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((a, i) => (
          <button key={i} onClick={() => navigate(a.to)}
            className="bg-card rounded-2xl border border-border p-6 hover-lift text-left transition-all hover:border-primary/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <a.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{a.label}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{a.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
