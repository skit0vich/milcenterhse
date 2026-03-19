import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import milLogo from '@/assets/mil-logo.png';
import hseLogo from '@/assets/hse-logo.png';
import {
  Home, User, Users, Calendar, BookOpen, CheckSquare,
  BarChart3, ClipboardList, FileText, Bell, LogOut, Menu, X,
  Sun, Moon, FolderOpen
} from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Главная' },
  { to: '/profile', icon: User, label: 'Профиль' },
  { to: '/squad', icon: Users, label: 'Взвод' },
  { to: '/schedule', icon: Calendar, label: 'Расписание' },
  { to: '/grades', icon: BookOpen, label: 'Оценки' },
  { to: '/attendance', icon: CheckSquare, label: 'Посещаемость' },
  { to: '/tasks', icon: ClipboardList, label: 'Задачи' },
  { to: '/homework', icon: FileText, label: 'Домашние задания' },
  { to: '/materials', icon: FolderOpen, label: 'Материалы' },
  { to: '/analytics', icon: BarChart3, label: 'Аналитика' },
];

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const notifications = [
    { id: 1, text: 'Новое задание по тактике', time: '5 мин назад' },
    { id: 2, text: 'Обновлено расписание на завтра', time: '1 час назад' },
    { id: 3, text: 'Дедлайн: Реферат по военной истории', time: '3 часа назад' },
  ];

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-[72px]'
        } bg-card border-r border-border flex flex-col transition-all duration-300 fixed h-full z-30`}
      >
        <div className="p-4 flex items-center gap-3 border-b border-border">
          <img src={milLogo} alt="ВУЦ" className="h-10 w-10 rounded-lg object-contain flex-shrink-0" />
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-semibold text-sm text-foreground truncate"
            >
              Военный учебный центр
            </motion.span>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-surface hover:text-foreground'
                }`
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all w-full"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span>Выход</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-[72px]'}`}>
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl hover:bg-surface transition-colors text-muted-foreground"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="p-2 rounded-xl hover:bg-surface transition-colors text-muted-foreground"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2 rounded-xl hover:bg-surface transition-colors text-muted-foreground relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-destructive" />
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-12 w-80 bg-card rounded-2xl border border-border card-shadow p-4 z-50"
                  >
                    <h3 className="font-semibold text-sm text-foreground mb-3">Уведомления</h3>
                    <div className="space-y-3">
                      {notifications.map(n => (
                        <div key={n.id} className="flex gap-3 p-2 rounded-xl hover:bg-surface transition-colors cursor-pointer">
                          <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-foreground">{n.text}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 pl-3 border-l border-border">
              <img src={hseLogo} alt="ВШЭ" className="h-8 w-8 rounded-full object-contain" />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user?.role === 'student' ? `Студент, ${user.course} курс` : 'Преподаватель'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
