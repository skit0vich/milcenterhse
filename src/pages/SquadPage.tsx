import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';

const students = [
  { id: 1, name: 'Иванов Иван', attendance: 96, warnings: 0, duty: 'Дежурный' },
  { id: 2, name: 'Петров Сергей', attendance: 88, warnings: 1, duty: '—' },
  { id: 3, name: 'Сидоров Алексей', attendance: 92, warnings: 0, duty: 'Ответственный за оружие' },
  { id: 4, name: 'Козлов Дмитрий', attendance: 78, warnings: 2, duty: '—' },
  { id: 5, name: 'Морозова Анна', attendance: 98, warnings: 0, duty: 'Старшина' },
  { id: 6, name: 'Волков Артём', attendance: 85, warnings: 1, duty: '—' },
];

const SquadPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Взвод</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{students.length} студентов</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map(s => (
          <div
            key={s.id}
            onClick={() => navigate('/profile')}
            className="bg-card rounded-2xl border border-border p-5 hover-lift cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                {s.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.duty}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 rounded-lg bg-surface text-center">
                <p className="text-lg font-semibold text-foreground">{s.attendance}%</p>
                <p className="text-xs text-muted-foreground">Посещаемость</p>
              </div>
              <div className="p-2 rounded-lg bg-surface text-center">
                <p className={`text-lg font-semibold ${s.warnings > 0 ? 'text-destructive' : 'text-foreground'}`}>{s.warnings}</p>
                <p className="text-xs text-muted-foreground">Выговоры</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SquadPage;
