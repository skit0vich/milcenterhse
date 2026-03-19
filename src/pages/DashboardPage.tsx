import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, CheckSquare, Bell, Plus, ClipboardList, UserCheck, TrendingUp, TrendingDown, Clock } from 'lucide-react';

const todaySchedule = [
  { time: '08:00', subject: 'Строевая подготовка', teacher: 'Полковник Смирнов А.В.' },
  { time: '09:30', subject: 'Тактика', teacher: 'Майор Козлов Д.С.' },
  { time: '11:00', subject: 'Огневая подготовка', teacher: 'Капитан Волков И.П.' },
  { time: '14:00', subject: 'Военная топография', teacher: 'Подполковник Морозов Е.А.' },
];

const todayTasks = [
  { text: 'Подготовить форму', done: true },
  { text: 'Сдать реферат по тактике', done: false },
  { text: 'Проверка личного оружия', done: false },
];

const notifications = [
  { text: 'Обновлено расписание на пятницу', time: '10 мин' },
  { text: 'Новое задание: Реферат по ОМП', time: '2 часа' },
  { text: 'Дедлайн: Отчёт по стрельбам — завтра', time: '5 часов' },
];

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Добро пожаловать, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Обзор на сегодня — {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Посещаемость', value: '94%', icon: UserCheck, color: 'text-success' },
          { label: 'Поощрения', value: '3', icon: TrendingUp, color: 'text-primary' },
          { label: 'Выговоры', value: '0', icon: TrendingDown, color: 'text-muted-foreground' },
          { label: 'Средний балл', value: '4.5', icon: TrendingUp, color: 'text-primary' },
        ].map((stat, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5 hover-lift cursor-default">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Расписание на сегодня</h2>
          </div>
          <div className="space-y-3">
            {todaySchedule.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface transition-colors">
                <div className="text-sm font-mono text-primary font-semibold w-14">{item.time}</div>
                <div className="h-8 w-1 rounded-full bg-primary/20" />
                <div>
                  <p className="text-sm font-medium text-foreground">{item.subject}</p>
                  <p className="text-xs text-muted-foreground">{item.teacher}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckSquare className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Задачи на сегодня</h2>
          </div>
          <div className="space-y-2">
            {todayTasks.map((task, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface transition-colors cursor-pointer">
                <div className={`h-5 w-5 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  task.done ? 'bg-primary border-primary' : 'border-border'
                }`}>
                  {task.done && <span className="text-primary-foreground text-xs">✓</span>}
                </div>
                <span className={`text-sm ${task.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Уведомления</h2>
          </div>
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface transition-colors cursor-pointer">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {n.time} назад
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Plus className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Быстрые действия</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: 'Добавить задание', icon: Plus },
              { label: 'Назначить обязанность', icon: ClipboardList },
              { label: 'Отметить посещаемость', icon: UserCheck },
            ].map((action, i) => (
              <button
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-surface hover:border-primary/30 transition-all text-left"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <action.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
