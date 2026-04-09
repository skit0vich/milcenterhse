import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { SQUADS, SUBJECTS } from '@/data/schedule';
import milLogo from '@/assets/mil-logo.png';
import hseLogo from '@/assets/hse-logo.png';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Loader2 } from 'lucide-react';

type Step = 'welcome' | 'credentials' | 'details';

const AVAILABLE_SUBJECTS = [
  'ТСП', 'Тех П', 'ОП', 'ОТ', 'ВПП', 'УПМВ', 'ОВУ', 'РХБЗ',
  'Мас-ка', 'СВ', 'ВИП', 'Стр П', 'Мед.О', 'ТП', 'РП', 'ВСП', 'ОВП', 'ВТ', 'Мет.П', 'ВПР'
];

const AuthPage = () => {
  const { login, register, updateProfile } = useAuth();
  const [step, setStep] = useState<Step>('welcome');
  const [mode, setMode] = useState<'login' | 'register'>('register');

  // credentials
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');

  // details
  const [selectedCourse, setSelectedCourse] = useState(1);
  const [selectedSquad, setSelectedSquad] = useState('2501');
  const [selectedSubject, setSelectedSubject] = useState(AVAILABLE_SUBJECTS[0]);

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const availableCourses = [
    { num: 1, available: true },
    { num: 2, available: false },
    { num: 3, available: false },
  ];

  const availableSquads = [
    { code: '2501', available: true },
    { code: '2502', available: true },
    { code: '2503', available: true },
    { code: '2504', available: false },
    { code: '2505', available: false },
    { code: '2506', available: false },
    { code: '2507', available: false },
    { code: '2508', available: false },
    { code: '2509', available: false },
    { code: '2510', available: false },
    { code: '2511', available: false },
    { code: '2512', available: false },
  ];

  const handleHSELogin = () => {
    setStep('credentials');
    setMode('register');
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      setSubmitting(true);
      const { error: err } = await login(email, password);
      setSubmitting(false);
      if (err) setError(err);
      return;
    }

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      setError('Заполните все поля');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    setStep('details');
  };

  const handleDetailsSubmit = async () => {
    setSubmitting(true);
    setError('');

    const { error: err } = await register(email, password, {
      first_name: firstName,
      last_name: lastName,
      role,
    });

    if (err) {
      setError(err);
      setSubmitting(false);
      return;
    }

    // Wait a bit for profile to be created by trigger
    await new Promise(r => setTimeout(r, 1000));

    // Update profile with details
    if (role === 'student') {
      await updateProfile({
        course: selectedCourse,
        squad: selectedSquad,
      });
    } else {
      await updateProfile({
        subject: selectedSubject,
      });
    }

    setSubmitting(false);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex items-center justify-center bg-surface p-4">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-6 mb-8">
            <img src={milLogo} alt="Военный учебный центр" className="h-16 w-16 rounded-xl object-contain" />
            <div className="h-10 w-px bg-border" />
            <img src={hseLogo} alt="ВШЭ" className="h-14 w-14 rounded-full object-contain" />
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: Welcome */}
            {step === 'welcome' && (
              <motion.div key="welcome" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="bg-card rounded-2xl card-shadow p-8 border border-border">
                <h1 className="text-2xl font-semibold text-foreground text-center mb-1">
                  Военный учебный центр
                </h1>
                <p className="text-sm text-muted-foreground text-center mb-8">
                  НИУ ВШЭ · Личный кабинет
                </p>

                <button
                  onClick={handleHSELogin}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#0060A9] text-white font-semibold text-base hover:bg-[#004d87] transition-all mb-4"
                >
                  <img src={hseLogo} alt="HSE" className="h-7 w-7 rounded-full object-contain bg-white p-0.5" />
                  Войти с HSE
                </button>

                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground">или</span></div>
                </div>

                <button
                  onClick={() => { setStep('credentials'); setMode('login'); }}
                  className="w-full py-3 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-surface transition-all"
                >
                  Войти по email
                </button>
              </motion.div>
            )}

            {/* STEP 2: Credentials */}
            {step === 'credentials' && (
              <motion.div key="credentials" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="bg-card rounded-2xl card-shadow p-8 border border-border">
                <h1 className="text-xl font-semibold text-foreground text-center mb-1">
                  {mode === 'login' ? 'Вход в систему' : 'Регистрация'}
                </h1>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  {mode === 'login' ? 'Введите данные для входа' : 'Заполните информацию о себе'}
                </p>

                <div className="flex rounded-xl bg-surface p-1 mb-6">
                  <button
                    onClick={() => setMode('login')}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mode === 'login' ? 'bg-card text-foreground card-shadow' : 'text-muted-foreground'}`}
                  >Вход</button>
                  <button
                    onClick={() => setMode('register')}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mode === 'register' ? 'bg-card text-foreground card-shadow' : 'text-muted-foreground'}`}
                  >Регистрация</button>
                </div>

                <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                  {mode === 'register' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Имя</label>
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Иван"
                          className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Фамилия</label>
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Иванов"
                          className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ivanov@edu.hse.ru"
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Пароль</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                  </div>

                  {mode === 'register' && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Роль</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['student', 'teacher'] as const).map(r => (
                          <button key={r} type="button" onClick={() => setRole(r)}
                            className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                              role === r ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-input hover:border-primary/40'
                            }`}
                          >
                            {r === 'student' ? 'Студент' : 'Преподаватель'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {error && <p className="text-sm text-destructive text-center">{error}</p>}

                  <button type="submit" disabled={submitting}
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {mode === 'login' ? 'Войти' : 'Далее'}
                  </button>
                </form>

                <button onClick={() => setStep('welcome')} className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ← Назад
                </button>
              </motion.div>
            )}

            {/* STEP 3: Details */}
            {step === 'details' && (
              <motion.div key="details" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="bg-card rounded-2xl card-shadow p-8 border border-border">
                <h1 className="text-xl font-semibold text-foreground text-center mb-1">
                  Здравия желаю, {firstName}!
                </h1>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  {role === 'student' ? 'Укажи свой курс и взвод' : 'Укажите предмет, который вы преподаете'}
                </p>

                {role === 'student' ? (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Курс</label>
                      <div className="grid grid-cols-3 gap-2">
                        {availableCourses.map(c => (
                          <Tooltip key={c.num}>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                disabled={!c.available}
                                onClick={() => c.available && setSelectedCourse(c.num)}
                                className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                                  !c.available
                                    ? 'bg-muted/50 text-muted-foreground border-border opacity-50 cursor-not-allowed'
                                    : selectedCourse === c.num
                                      ? 'bg-primary text-primary-foreground border-primary'
                                      : 'bg-background text-foreground border-input hover:border-primary/40'
                                }`}
                              >
                                {c.num} курс
                              </button>
                            </TooltipTrigger>
                            {!c.available && (
                              <TooltipContent><p>Скоро добавим!</p></TooltipContent>
                            )}
                          </Tooltip>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Взвод</label>
                      <div className="grid grid-cols-4 gap-2">
                        {availableSquads.map(s => (
                          <Tooltip key={s.code}>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                disabled={!s.available}
                                onClick={() => s.available && setSelectedSquad(s.code)}
                                className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                                  !s.available
                                    ? 'bg-muted/50 text-muted-foreground border-border opacity-50 cursor-not-allowed'
                                    : selectedSquad === s.code
                                      ? 'bg-primary text-primary-foreground border-primary'
                                      : 'bg-background text-foreground border-input hover:border-primary/40'
                                }`}
                              >
                                {s.code}
                              </button>
                            </TooltipTrigger>
                            {!s.available && (
                              <TooltipContent><p>Скоро добавим!</p></TooltipContent>
                            )}
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Предмет</label>
                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                      {AVAILABLE_SUBJECTS.map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSubject(s)}
                          className={`py-2.5 rounded-xl text-sm font-medium border transition-all text-left px-3 ${
                            selectedSubject === s
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background text-foreground border-input hover:border-primary/40'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {error && <p className="text-sm text-destructive text-center mt-4">{error}</p>}

                <button
                  onClick={handleDetailsSubmit}
                  disabled={submitting}
                  className="w-full mt-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  Завершить регистрацию
                </button>

                <button onClick={() => setStep('credentials')} className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ← Назад
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AuthPage;
