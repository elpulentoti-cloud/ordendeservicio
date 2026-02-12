
import React, { useState } from 'react';
import { Star, MessageCircle, Send } from 'lucide-react';
import { SurveyResponse, Appointment } from '../types';

interface SurveyManagerProps {
  surveys: SurveyResponse[];
  appointments: Appointment[];
  onAdd: (survey: SurveyResponse) => void;
}

const SurveyManager: React.FC<SurveyManagerProps> = ({ surveys, appointments, onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const [appointmentId, setAppointmentId] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const completedApps = appointments.filter(a => !surveys.some(s => s.appointmentId === a.id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const survey: SurveyResponse = {
      id: Math.random().toString(36).substr(2, 9),
      appointmentId,
      rating,
      comment,
      date: new Date().toLocaleDateString('es-CL')
    };
    onAdd(survey);
    setShowForm(false);
    setComment('');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-fen-navy">Control de Calidad</h3>
        <button onClick={() => setShowForm(true)} className="bg-fen-navy text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Send size={18} /> Registrar Encuesta
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h4 className="font-bold text-fen-navy">Feedback del Cliente</h4>
            <select required value={appointmentId} onChange={e => setAppointmentId(e.target.value)} className="w-full border rounded-lg p-2">
              <option value="">Seleccionar cita finalizada...</option>
              {completedApps.map(a => <option key={a.id} value={a.id}>{a.clientName} - {a.date}</option>)}
            </select>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} type="button" onClick={() => setRating(star)} className={`p-1 ${rating >= star ? 'text-yellow-400' : 'text-gray-200'}`}>
                  <Star fill={rating >= star ? "currentColor" : "none"} size={32} />
                </button>
              ))}
            </div>
            <textarea 
              placeholder="Comentarios del cliente..." 
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
              rows={3}
            />
            <div className="flex gap-2">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 border rounded-lg">Cerrar</button>
              <button type="submit" className="flex-1 py-2 bg-fen-navy text-white rounded-lg font-bold">Enviar</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {surveys.map(s => {
          const app = appointments.find(a => a.id === s.appointmentId);
          return (
            <div key={s.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center font-bold text-xl">
                  {s.rating}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h5 className="font-bold text-gray-900">{app?.clientName || 'Cliente'}</h5>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{s.date}</span>
                </div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < s.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'} />)}
                </div>
                <p className="text-sm text-gray-600 italic">"{s.comment}"</p>
              </div>
            </div>
          );
        })}
        {surveys.length === 0 && <div className="col-span-full py-12 text-center text-gray-400">Sin encuestas registradas aún.</div>}
      </div>
    </div>
  );
};

export default SurveyManager;
