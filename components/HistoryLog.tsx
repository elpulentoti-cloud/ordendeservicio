
import React, { useState } from 'react';
import { History, MessageSquare, Plus, Loader2, Link2 } from 'lucide-react';
import { AgreementTrace, Appointment } from '../types';
import { analyzeAgreement } from '../services/geminiService';

interface HistoryLogProps {
  traces: AgreementTrace[];
  appointments: Appointment[];
  onAddTrace: (trace: AgreementTrace) => void;
}

const HistoryLog: React.FC<HistoryLogProps> = ({ traces, appointments, onAddTrace }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [note, setNote] = useState('');
  const [clientId, setClientId] = useState('');

  const handleAddAgreement = async () => {
    if (!note || !clientId) return alert("Por favor selecciona un cliente e ingresa una nota.");
    
    setIsAnalyzing(true);
    const analysis = await analyzeAgreement(note);
    
    const newTrace: AgreementTrace = {
      id: Math.random().toString(36).substr(2, 9),
      clientId,
      date: new Date().toLocaleDateString('es-CL'),
      content: note,
      source: 'meeting',
      summary: analysis.summary
    };
    
    onAddTrace(newTrace);
    setNote('');
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-fen-navy mb-4 flex items-center gap-2">
          <MessageSquare className="text-fen-blue" /> Registrar Nuevo Acuerdo
        </h3>
        <p className="text-sm text-gray-500 mb-6 italic">Ingresa lo que el cliente te dijo. Delta33 usará IA para resumir el acuerdo y asegurar trazabilidad absoluta.</p>
        
        <div className="space-y-4">
          <select 
            value={clientId} 
            onChange={e => setClientId(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-fen-blue outline-none"
          >
            <option value="">Seleccionar Cliente/Cita...</option>
            {appointments.map(a => (
              <option key={a.id} value={a.id}>{a.clientName} - {a.date}</option>
            ))}
          </select>
          <textarea 
            rows={4}
            value={note}
            onChange={e => setNote(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-fen-blue outline-none"
            placeholder="Ej: El cliente solicitó explícitamente que el reporte se entregue los viernes antes de las 14:00..."
          ></textarea>
          <button 
            onClick={handleAddAgreement}
            disabled={isAnalyzing}
            className="w-full bg-fen-navy text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-fen-navy/90 disabled:opacity-50"
          >
            {isAnalyzing ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
            Analizar y Guardar Acuerdo
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-bold text-fen-navy flex items-center gap-2">
          <History size={20} /> Historial de Trazabilidad
        </h4>
        {traces.map((trace) => {
          const client = appointments.find(a => a.id === trace.clientId);
          return (
            <div key={trace.id} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-fen-blue flex gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-gray-900">{client?.clientName || 'Cliente Desconocido'}</h5>
                  <span className="text-xs text-gray-400">{trace.date}</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <p className="text-sm font-semibold text-fen-navy italic">"Resumen Delta33: {trace.summary}"</p>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{trace.content}</p>
              </div>
            </div>
          );
        })}
        {traces.length === 0 && (
          <div className="text-center py-12 text-gray-400">Sin registros de acuerdos todavía.</div>
        )}
      </div>
    </div>
  );
};

export default HistoryLog;
