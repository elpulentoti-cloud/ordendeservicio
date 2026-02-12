
import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Appointment, Budget, SurveyResponse } from '../types';
import { COLORS } from '../constants';
import { Clock, TrendingUp, Users, Star } from 'lucide-react';

interface DashboardProps {
  appointments: Appointment[];
  budgets: Budget[];
  surveys: SurveyResponse[];
  doomsday: { hours: number; mins: number; secs: number };
}

const Dashboard: React.FC<DashboardProps> = ({ appointments, budgets, surveys, doomsday }) => {
  const stats = useMemo(() => {
    const totalRevenue = budgets.reduce((sum, b) => sum + b.total, 0);
    const avgRating = surveys.length > 0 ? (surveys.reduce((sum, s) => sum + s.rating, 0) / surveys.length).toFixed(1) : 'N/A';
    
    const byStatus = [
      { name: 'Pendientes', value: appointments.filter(a => a.status === 'pending').length },
      { name: 'Confirmadas', value: appointments.filter(a => a.status === 'confirmed').length },
      { name: 'Completadas', value: appointments.filter(a => a.status === 'completed').length },
    ];

    return { totalRevenue, avgRating, byStatus };
  }, [appointments, budgets, surveys]);

  const PIE_COLORS = [COLORS.NAVY, COLORS.BLUE, COLORS.GOLD];

  return (
    <div className="space-y-4 pb-10">
      {/* Top Indicators - Grid adaptado a móvil */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <TrendingUp size={16} className="text-fen-blue mb-2" />
          <p className="text-gray-400 text-[9px] uppercase tracking-wider font-bold">Ingresos</p>
          <h3 className="text-lg font-bold text-fen-navy">${(stats.totalRevenue / 1000).toFixed(1)}k</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <Users size={16} className="text-fen-blue mb-2" />
          <p className="text-gray-400 text-[9px] uppercase tracking-wider font-bold">Citas</p>
          <h3 className="text-lg font-bold text-fen-navy">{appointments.length}</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <Star size={16} className="text-fen-blue mb-2" />
          <p className="text-gray-400 text-[9px] uppercase tracking-wider font-bold">Calidad</p>
          <h3 className="text-lg font-bold text-fen-navy">{stats.avgRating}</h3>
        </div>
        <div className="bg-fen-navy p-4 rounded-2xl shadow-lg border border-red-900/30 relative overflow-hidden">
          <p className="text-red-400 text-[9px] uppercase tracking-wider font-bold mb-1">Juicio Final</p>
          <h3 className="text-lg font-mono text-red-500 font-bold doomsday-text leading-none">
            {String(doomsday.hours).padStart(2, '0')}:{String(doomsday.mins).padStart(2, '0')}:{String(doomsday.secs).padStart(2, '0')}
          </h3>
        </div>
      </div>

      {/* Charts - Columna única en móvil */}
      <div className="space-y-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h4 className="text-sm font-bold text-fen-navy mb-4 masonic-font tracking-widest uppercase">Estado de Servicios</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.byStatus}
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.byStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {stats.byStatus.map((s, i) => (
              <div key={s.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }}></div>
                <span className="text-[10px] text-gray-500 font-bold uppercase">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h4 className="text-sm font-bold text-fen-navy mb-4 masonic-font tracking-widest uppercase">Actividad Semanal</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ name: 'Lun', v: 2 }, { name: 'Mar', v: 5 }, { name: 'Mie', v: 3 }, { name: 'Jue', v: 4 }, { name: 'Vie', v: appointments.length }]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af'}} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="v" fill={COLORS.BLUE} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
