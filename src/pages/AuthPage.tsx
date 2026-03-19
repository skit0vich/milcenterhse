import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { SQUADS, Squad } from '@/data/schedule';
import milLogo from '@/assets/mil-logo.png';
import hseLogo from '@/assets/hse-logo.png';

const AuthPage = () => {
  const { login } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [course, setCourse] = useState(1);
  const [squad, setSquad] = useState<Squad>(SQUADS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register' && !name.trim()) return;
    login({
      name: name || 'Пользователь',
      role,
      course,
      squad,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center justify-center gap-6 mb-8">
          <img src={milLogo} alt="Военный учебный центр" className="h-16 w-16 rounded-xl object-contain" />
          <div className="h-10 w-px bg-border" />
          <img src={hseLogo} alt="ВШЭ" className="h-14 w-14 rounded-full object-contain" />
        </div>

        <div className="bg-card rounded-2xl card-shadow p-8 border border-border">
          <h1 className="text-2xl font-semibold text-foreground text-center mb-1">
            {mode === 'login' ? 'Вход в систему' : 'Регистрация'}
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Военный учебный центр НИУ ВШЭ
          </p>

          <div className="flex rounded-xl bg-surface p-1 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                mode === 'login' ? 'bg-card text-foreground card-shadow' : 'text-muted-foreground'
              }`}
            >
              Вход
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                mode === 'register' ? 'bg-card text-foreground card-shadow' : 'text-muted-foreground'
              }`}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Имя</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={mode === 'register' ? 'Иванов Иван Иванович' : 'Введите имя'}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
              />
            </div>

            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Роль</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['student', 'teacher'] as const).map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                          role === r
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background text-foreground border-input hover:border-primary/40'
                        }`}
                      >
                        {r === 'student' ? 'Студент' : 'Преподаватель'}
                      </button>
                    ))}
                  </div>
                </div>

                {role === 'student' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Курс</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map(c => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setCourse(c)}
                            className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                              course === c
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background text-foreground border-input hover:border-primary/40'
                            }`}
                          >
                            {c} курс
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Взвод</label>
                      <div className="grid grid-cols-3 gap-2">
                        {SQUADS.map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSquad(s)}
                            className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                              squad === s
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background text-foreground border-input hover:border-primary/40'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all"
            >
              {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
