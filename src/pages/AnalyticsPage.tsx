import React from 'react';
import { BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const attendanceData = [
  { month: 'Сен', value: 98 },
  { month: 'Окт', value: 95 },
  { month: 'Ноя', value: 92 },
  { month: 'Дек', value: 88 },
  { month: 'Янв', value: 94 },
  { month: 'Фев', value: 96 },
  { month: 'Мар', value: 94 },
];

const gradesData = [
  { month: 'Сен', value: 4.2 },
  { month: 'Окт', value: 4.4 },
  { month: 'Ноя', value: 4.1 },
  { month: 'Дек', value: 4.5 },
  { month: 'Янв', value: 4.3 },
  { month: 'Фев', value: 4.6 },
  { month: 'Мар', value: 4.5 },
];

const topStudents = [
  { name: 'Морозова Анна', score: 98 },
  { name: 'Иванов Иван', score: 96 },
  { name: 'Сидоров Алексей', score: 92 },
  { name: 'Петров Сергей', score: 88 },
  { name: 'Волков Артём', score: 85 },
];

const squadData = [
  { name: 'Взвод 1', attendance: 94, avg: 4.5 },
  { name: 'Взвод 2', attendance: 89, avg: 4.2 },
  { name: 'Взвод 3', attendance: 91, avg: 4.3 },
];

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">Аналитика</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="font-semibold text-foreground mb-4">Динамика посещаемости</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(120 8% 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(150 10% 40%)" />
              <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} stroke="hsl(150 10% 40%)" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="hsl(134 25% 27%)" strokeWidth={2} dot={{ r: 4, fill: 'hsl(134 25% 27%)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="font-semibold text-foreground mb-4">Динамика оценок</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={gradesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(120 8% 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(150 10% 40%)" />
              <YAxis domain={[3, 5]} tick={{ fontSize: 12 }} stroke="hsl(150 10% 40%)" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="hsl(108 13% 39%)" strokeWidth={2} dot={{ r: 4, fill: 'hsl(108 13% 39%)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="font-semibold text-foreground mb-4">Статистика взводов</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={squadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(120 8% 88%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(150 10% 40%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(150 10% 40%)" />
              <Tooltip />
              <Bar dataKey="attendance" fill="hsl(134 25% 27%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="font-semibold text-foreground mb-4">Лучшие студенты</h2>
          <div className="space-y-3">
            {topStudents.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  i === 0 ? 'bg-warning/15 text-warning' :
                  i === 1 ? 'bg-muted text-muted-foreground' :
                  i === 2 ? 'bg-warning/10 text-warning' :
                  'bg-surface text-muted-foreground'
                }`}>{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full bg-surface overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${s.score}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-foreground w-10 text-right">{s.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
