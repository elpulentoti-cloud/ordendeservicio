
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, Mail, Plus, Check, X } from 'lucide-react';
import { Appointment } from '../types';

interface SchedulerProps {
  appointments: Appointment[];
  onAdd: (app: Appointment) => void;
  onSendEmail: (email: string) => void;
}

const Scheduler: React.FC<SchedulerProps> = ({ appointments, onAdd, onSendEmail }) => {
  const [showModal, setShowModal] = useState(false);
  const [newApp, setNewApp] = useState({
    clientName: '',
    clientEmail: '',
    serviceType: 'Consultoría',
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const app: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      ...newApp,
      status: 'pending',
      createdAt: Date.now()
    };
    onAdd(app);
    onSendEmail(app.clientEmail);
    setShowModal(false);
    setNewApp({ clientName: '', clientEmail: '', serviceType: 'Consultoría', date: '', time: '', notes: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-fen-navy">Próximos Servicios</h3>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-fen-navy text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-fen-navy/90 transition-all shadow-md"
        >
          <Plus size={18} /> Agendar Cita
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Servicio</th>
              <th className="px-6 py-4">Fecha & Hora</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {appointments.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      {app.clientName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{app.clientName}</p>
                      <p className="text-xs text-gray-500">{app.clientEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{app.serviceType}</td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{app.date}</p>
                    <p className="text-gray-500">{app.time}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    app.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {app.status === 'pending' ? 'Por Confirmar' : 'Confirmada'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => onSendEmail(app.clientEmail)} className="text-fen-blue hover:underline text-sm font-medium">Reenviar Correo</button>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">No hay citas agendadas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl">
            <h4 className="text-2xl font-bold text-fen-navy mb-6 flex items-center gap-2">
              <CalendarIcon className="text-fen-blue" /> Agendar Servicio
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del Cliente</label>
                <input required value={newApp.clientName} onChange={e => setNewApp({...newApp, clientName: e.target.value})} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-fen-blue outline-none" placeholder="Ej: Juan Pérez" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input required type="email" value={newApp.clientEmail} onChange={e => setNewApp({...newApp, clientEmail: e.target.value})} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-fen-blue outline-none" placeholder="juan@gmail.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
                  <input required type="date" value={newApp.date} onChange={e => setNewApp({...newApp, date: e.target.value})} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-fen-blue outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Hora</label>
                  <input required type="time" value={newApp.time} onChange={e => setNewApp({...newApp, time: e.target.value})} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-fen-blue outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Servicio</label>
                <select value={newApp.serviceType} onChange={e => setNewApp({...newApp, serviceType: e.target.value})} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-fen-blue outline-none">
                  <option>Consultoría</option>
                  <option>Asesoría Legal</option>
                  <option>Auditoría</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-fen-navy text-white rounded-lg hover:bg-fen-navy/90">Confirmar Cita</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduler;
