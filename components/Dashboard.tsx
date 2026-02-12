
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

interface DashboardProps {
  appointments: Appointment[];
  budgets: Budget[];
  surveys: SurveyResponse[];
}

const Dashboard: React.FC<DashboardProps> = ({ appointments, budgets, surveys }) => {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">Ingresos Totales</p>
          <h3 className="text-3xl font-bold text-fen-navy">${stats.totalRevenue.toLocaleString('es-CL')}</h3>
          <div className="mt-2 text-green-500 text-xs font-medium">+12.5% vs mes anterior</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">Citas este Mes</p>
          <h3 className="text-3xl font-bold text-fen-navy">{appointments.length}</h3>
          <div className="mt-2 text-blue-500 text-xs font-medium">8 pendientes de confirmación</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">Calidad del Servicio</p>
          <h3 className="text-3xl font-bold text-fen-navy">{stats.avgRating} / 5.0</h3>
          <div className="mt-2 text-yellow-500 text-xs font-medium">Basado en {surveys.length} encuestas</div>
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
