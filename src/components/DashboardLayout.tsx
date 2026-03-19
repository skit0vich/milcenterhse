import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import milLogo from '@/assets/mil-logo.png';
import hseLogo from '@/assets/hse-logo.png';
import {
  Home, User, Users, Calendar, BookOpen, CheckSquare,
  BarChart3, ClipboardList, FileText, Bell, LogOut, Menu, X,
  Sun, Moon, FolderOpen, MoreHorizontal
} from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Главная' },
  { to: '/profile', icon: User, label: 'Профиль' },
  { to: '/squad', icon: Users, label: 'Взвод' },
  { to: '/schedule', icon: Calendar, label: 'Расписание' },
  { to: '/grades', icon: BookOpen, label: 'Оценки' },
  { to: '/attendance', icon: CheckSquare, label: 'Посещаемость' },
  { to: '/tasks', icon: ClipboardList, label: 'Задачи' },
  { to: '/homework', icon: FileText, label: 'ДЗ' },
  { to: '/materials', icon: FolderOpen, label: 'Материалы' },
  { to: '/analytics', icon: BarChart3, label: 'Аналитика' },
];

// Bottom bar shows 4 main items + "More" menu
const bottomBarItems = navItems.slice(0, 4);
const moreItems = navItems.slice(4);

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isMoreActive = moreItems.some(item =>
    item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)
  );

  const notifications = [
    { id: 1, text: 'Новое задание по тактике', time: '5 мин назад' },
    { id: 2, text: 'Обновлено расписание на завтра', time: '1 час назад' },
    { id: 3, text: 'Дедлайн: Реферат по военной истории', time: '3 часа назад' },
  ];

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Desktop Sidebar — hidden on mobile */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-[72px]'
        } bg-card border-r border-border flex-col transition-all duration-300 fixed h-full z-30 hidden md:flex`}
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

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r border-border z-50 flex flex-col md:hidden"
            >
              <div className="p-4 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-3">
                  <img src={milLogo} alt="ВУЦ" className="h-9 w-9 rounded-lg object-contain" />
                  <span className="font-semibold text-sm text-foreground">ВУЦ НИУ ВШЭ</span>
                </div>
                <button onClick={() => setMobileSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* User info */}
              <div className="p-4 border-b border-border flex items-center gap-3">
                <img src={hseLogo} alt="ВШЭ" className="h-10 w-10 rounded-full object-contain" />
                <div>
                  <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user?.role === 'student' ? `Взвод ${user.squad} · ${user.course} курс` : 'Преподаватель'}
                  </p>
                </div>
              </div>

              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-surface hover:text-foreground'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="p-3 border-t border-border space-y-1">
                <button onClick={toggle} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-muted-foreground hover:bg-surface w-full transition-all">
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <span>{theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}</span>
                </button>
                <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive w-full transition-all">
                  <LogOut className="h-5 w-5" />
                  <span>Выход</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 md:${sidebarOpen ? 'ml-64' : 'ml-[72px]'} pb-16 md:pb-0`}>
        {/* Header */}
        <header className="h-14 md:h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile: hamburger menu */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-xl hover:bg-surface transition-colors text-muted-foreground md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            {/* Desktop: toggle sidebar */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl hover:bg-surface transition-colors text-muted-foreground hidden md:block"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            {/* Mobile: logo */}
            <img src={milLogo} alt="ВУЦ" className="h-7 w-7 rounded-lg object-contain md:hidden" />
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggle}
              className="p-2 rounded-xl hover:bg-surface transition-colors text-muted-foreground hidden md:block"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2 rounded-xl hover:bg-surface transition-colors text-muted-foreground relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-12 w-72 md:w-80 bg-card rounded-2xl border border-border shadow-lg p-4 z-50"
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

            <div className="items-center gap-3 pl-3 border-l border-border hidden md:flex">
              <img src={hseLogo} alt="ВШЭ" className="h-8 w-8 rounded-full object-contain" />
              <div>
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user?.role === 'student' ? `Студент, ${user.course} курс` : 'Преподаватель'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-30 md:hidden safe-area-bottom">
        <div className="flex items-center justify-around h-14">
          {bottomBarItems.map(item => {
            const isActive = item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className="flex flex-col items-center justify-center flex-1 h-full"
              >
                <item.icon className={`h-5 w-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-[10px] mt-0.5 transition-colors ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
          {/* More button */}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="flex flex-col items-center justify-center flex-1 h-full relative"
          >
            <MoreHorizontal className={`h-5 w-5 transition-colors ${isMoreActive ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`text-[10px] mt-0.5 transition-colors ${isMoreActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              Ещё
            </span>
          </button>
        </div>

        {/* More menu popover */}
        <AnimatePresence>
          {moreOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                onClick={() => setMoreOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="absolute bottom-full right-2 mb-2 w-48 bg-card rounded-2xl border border-border shadow-lg p-2 z-50"
              >
                {moreItems.map(item => {
                  const isActive = item.to === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.to);
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      onClick={() => setMoreOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-surface hover:text-foreground'
                      }`}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default DashboardLayout;
