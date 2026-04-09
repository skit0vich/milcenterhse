import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Shield, Star, Heart, Newspaper, Pen, UserCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SquadMember {
  name: string;
  role?: string;
  roleIcon?: React.ElementType;
  roleColor?: string;
}

interface Otdelenie {
  number: number;
  members: SquadMember[];
}

const squadData = {
  commander: { name: 'Петров Сергей Максимович', role: 'Командир взвода' },
  otdeleniya: [
    {
      number: 1,
      members: [
        { name: 'Семенов Данил Борисович', role: 'Зам. командира взвода', roleIcon: Shield, roleColor: 'text-amber-500' },
        { name: 'Шайдамов Алибек Абдусатторович', role: 'Командир отделения', roleIcon: Star, roleColor: 'text-blue-500' },
        { name: 'Назарчук Тихон Сергеевич' },
        { name: 'Попов Андрей Игоревич' },
        { name: 'Рыбин Павел Валерьевич' },
        { name: 'Сахненко Алексей Сергеевич' },
        { name: 'Сергиенко Григорий Григорьевич' },
      ],
    },
    {
      number: 2,
      members: [
        { name: 'Пудов Иван Владимирович', role: 'Командир отделения', roleIcon: Star, roleColor: 'text-blue-500' },
        { name: 'Змановский Никита Станиславович' },
        { name: 'Искендеров Николай Валерьевич' },
        { name: 'Костенко Владимир Олегович' },
        { name: 'Петров Фёдор Сергеевич' },
        { name: 'Пучков Степан Денисович' },
        { name: 'Чинков Артём Сергеевич' },
      ],
    },
    {
      number: 3,
      members: [
        { name: 'Медведков Георгий Сергеевич', role: 'Командир отделения', roleIcon: Star, roleColor: 'text-blue-500' },
        { name: 'Абаджян Геворк Грачьяевич' },
        { name: 'Букинич Георгий Дмитриевич' },
        { name: 'Гельдымурадов Егор Довлетович' },
        { name: 'Косолапов Лев Валерьевич' },
        { name: 'Нефедов Иван Алексеевич' },
        { name: 'Эм Олег Юрьевич' },
      ],
    },
  ] as Otdelenie[],
  specialRoles: [
    { name: 'Медик', assignee: 'Назарчук Тихон Сергеевич', icon: Heart, color: 'text-red-500 bg-red-500/10' },
    { name: 'Редактор боевого листа', assignee: 'Букинич Георгий Дмитриевич', icon: Pen, color: 'text-violet-500 bg-violet-500/10' },
    { name: 'Журналист', assignee: 'Сергиенко Григорий Григорьевич', icon: Newspaper, color: 'text-emerald-500 bg-emerald-500/10' },
  ],
};

const totalMembers = squadData.otdeleniya.reduce((acc, o) => acc + o.members.length, 0) + 1;

const SquadPage = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Взвод {profile?.squad}</h1>
          <p className="text-sm text-muted-foreground mt-1">Состав и структура подразделения</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{totalMembers} человек</span>
        </div>
      </div>

      {/* Commander */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Shield className="h-7 w-7 text-amber-500" />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">{squadData.commander.name}</p>
            <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">{squadData.commander.role}</p>
          </div>
        </div>
      </div>

      {/* Special roles */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Специальные роли</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {squadData.specialRoles.map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${r.color}`}>
                <r.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">{r.name}</p>
                <p className="text-sm font-medium text-foreground truncate">{r.assignee.split(' ').slice(0, 2).join(' ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Otdeleniya */}
      <div className="space-y-4">
        {squadData.otdeleniya.map(otd => (
          <div key={otd.number} className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-surface flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {otd.number}
                </div>
                <h2 className="font-semibold text-foreground">{otd.number}-е отделение</h2>
              </div>
              <span className="text-xs text-muted-foreground">{otd.members.length} чел.</span>
            </div>
            <div className="divide-y divide-border">
              {otd.members.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-surface/50 transition-colors cursor-pointer"
                  onClick={() => navigate('/profile')}
                >
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                    {m.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{m.name}</p>
                    {m.role && (
                      <p className={`text-xs font-medium ${m.roleColor || 'text-muted-foreground'}`}>{m.role}</p>
                    )}
                  </div>
                  {m.roleIcon && (
                    <m.roleIcon className={`h-4 w-4 flex-shrink-0 ${m.roleColor || 'text-muted-foreground'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SquadPage;
