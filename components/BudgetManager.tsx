
import React, { useState } from 'react';
import { Plus, Trash2, Printer, FileText } from 'lucide-react';
import { Budget, BudgetItem, Appointment } from '../types';

interface BudgetManagerProps {
  budgets: Budget[];
  appointments: Appointment[];
  onAdd: (budget: Budget) => void;
}

const BudgetManager: React.FC<BudgetManagerProps> = ({ budgets, appointments, onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const [appointmentId, setAppointmentId] = useState('');
  const [items, setItems] = useState<BudgetItem[]>([{ id: '1', description: '', quantity: 1, unitPrice: 0 }]);

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), description: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof BudgetItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const total = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const app = appointments.find(a => a.id === appointmentId);
    if (!app) return alert("Selecciona una cita válida.");

    const budget: Budget = {
      id: `PRE-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      appointmentId,
      clientName: app.clientName,
      items,
      total,
      date: new Date().toLocaleDateString('es-CL'),
      terms: "Pago 50% anticipado, 50% contra entrega."
    };
    onAdd(budget);
    setShowForm(false);
    setItems([{ id: '1', description: '', quantity: 1, unitPrice: 0 }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-fen-navy">Presupuestos Generados</h3>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-fen-navy text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-fen-navy/90"
        >
          <Plus size={18} /> Crear Presupuesto
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
          <h4 className="text-xl font-bold text-fen-navy mb-6">Nuevo Presupuesto</h4>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-1">Vincular a Cita</label>
              <select required value={appointmentId} onChange={e => setAppointmentId(e.target.value)} className="w-full border rounded-lg p-2">
                <option value="">Seleccionar...</option>
                {appointments.map(a => <option key={a.id} value={a.id}>{a.clientName} - {a.date}</option>)}
              </select>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-semibold">Ítems</label>
              {items.map((item, index) => (
                <div key={item.id} className="flex gap-2">
                  <input 
                    required 
                    placeholder="Descripción" 
                    value={item.description}
                    onChange={e => updateItem(item.id, 'description', e.target.value)}
                    className="flex-1 border rounded-lg p-2 text-sm"
                  />
                  <input 
                    required 
                    type="number" 
                    placeholder="Cant." 
                    value={item.quantity}
                    onChange={e => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                    className="w-16 border rounded-lg p-2 text-sm"
                  />
                  <input 
                    required 
                    type="number" 
                    placeholder="Precio" 
                    value={item.unitPrice}
                    onChange={e => updateItem(item.id, 'unitPrice', parseInt(e.target.value))}
                    className="w-24 border rounded-lg p-2 text-sm"
                  />
                  <button type="button" onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addItem} className="text-fen-blue text-sm font-bold flex items-center gap-1">
                <Plus size={14} /> Añadir Línea
              </button>
            </div>

            <div className="text-right pt-4 border-t">
              <p className="text-xl font-bold text-fen-navy">Total: ${total.toLocaleString('es-CL')}</p>
            </div>

            <div className="flex gap-4">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 border rounded-lg">Cancelar</button>
              <button type="submit" className="flex-1 py-2 bg-fen-navy text-white rounded-lg font-bold">Guardar Presupuesto</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((b) => (
          <div key={b.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-fen-blue transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{b.id}</span>
                <h5 className="font-bold text-gray-900">{b.clientName}</h5>
              </div>
              <FileText className="text-gray-300 group-hover:text-fen-blue" />
            </div>
            <p className="text-2xl font-bold text-fen-navy mb-4">${b.total.toLocaleString('es-CL')}</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Emitido: {b.date}</span>
              <button className="flex items-center gap-1 text-fen-blue font-bold hover:underline">
                <Printer size={12} /> Imprimir PDF
              </button>
            </div>
          </div>
        ))}
        {budgets.length === 0 && <div className="col-span-full py-12 text-center text-gray-400">No hay presupuestos emitidos.</div>}
      </div>
    </div>
  );
};

export default BudgetManager;
