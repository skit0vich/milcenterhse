import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Award, AlertTriangle, ClipboardList, TrendingUp } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();

  const duties = [
    { title: 'Дежурный по взводу', date: '25.03.2026', status: 'Запланировано' },
    { title: 'Ответственный за чистоту', date: '20.03.2026', status: 'Выполнено' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Профиль</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-4">
              {user?.name?.charAt(0) || 'П'}
            </div>
            <h2 className="text-lg font-semibold text-foreground">{user?.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {user?.role === 'student' ? 'Студент' : 'Преподаватель'}
            </p>
            <div className="flex gap-4 mt-4 text-sm">
              <div className="text-center">
                <p className="font-semibold text-foreground">{user?.course} курс</p>
                <p className="text-xs text-muted-foreground">Курс</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">{user?.squad || 'Взвод 1'}</p>
                <p className="text-xs text-muted-foreground">Взвод</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-2xl border border-border p-5 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Поощрения</span>
              </div>
              <p className="text-3xl font-bold text-foreground">3</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-5 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span className="text-sm text-muted-foreground">Выговоры</span>
              </div>
              <p className="text-3xl font-bold text-foreground">0</p>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Назначенные обязанности</h3>
            </div>
            <div className="space-y-3">
              {duties.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface">
                  <div>
                    <p className="text-sm font-medium text-foreground">{d.title}</p>
                    <p className="text-xs text-muted-foreground">{d.date}</p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-lg ${
                    d.status === 'Выполнено' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
                  }`}>
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Прогресс</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Посещаемость', value: 94 },
                { label: 'Выполнение заданий', value: 78 },
                { label: 'Средний балл', value: 90 },
              ].map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{p.label}</span>
                    <span className="text-muted-foreground">{p.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${p.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
