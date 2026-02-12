
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
import { Clock } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Top Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-gray-500 text-[10px] mb-1 uppercase tracking-wider font-bold">Ingresos Totales</p>
          <h3 className="text-2xl font-bold text-fen-navy">${stats.totalRevenue.toLocaleString('es-CL')}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-gray-500 text-[10px] mb-1 uppercase tracking-wider font-bold">Citas Activas</p>
          <h3 className="text-2xl font-bold text-fen-navy">{appointments.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-gray-500 text-[10px] mb-1 uppercase tracking-wider font-bold">Calidad Servicio</p>
          <h3 className="text-2xl font-bold text-fen-navy">{stats.avgRating} / 5.0</h3>
        </div>
        <div className="bg-fen-navy p-6 rounded-xl shadow-lg border border-red-900/30 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
             <Clock size={40} className="text-red-500" />
          </div>
          <p className="text-red-400 text-[10px] mb-1 uppercase tracking-wider font-bold">Reloj del Juicio Final</p>
          <h3 className="text-2xl font-mono text-red-500 font-bold doomsday-text">
            {String(doomsday.hours).padStart(2, '0')}:
            {String(doomsday.mins).padStart(2, '0')}:
            {String(doomsday.secs).padStart(2, '0')}
          </h3>
          <p className="text-[8px] text-red-400/60 uppercase tracking-[0.2em] mt-1">Para el fin del ciclo</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-lg font-bold text-fen-navy mb-6">Estado de Servicios</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.byStatus}
                  innerRadius={60}
                  outerRadius={80}
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
          <div className="flex justify-center gap-6 mt-4">
            {stats.byStatus.map((s, i) => (
              <div key={s.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }}></div>
                <span className="text-xs text-gray-600">{s.name}: {s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-lg font-bold text-fen-navy mb-6">Actividad Mensual</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ name: 'Ene', value: 4 }, { name: 'Feb', value: 7 }, { name: 'Mar', value: appointments.length }]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={COLORS.BLUE} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
