
import React from 'react';
import { Download, Shield, User, Lock, Database, LogOut } from 'lucide-react';

interface SettingsPanelProps {
  onExport: () => void;
  onLogout: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onExport, onLogout }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-fen-navy flex items-center gap-2">
            <User size={20} /> Perfil del Administrador
          </h3>
          <button onClick={onLogout} className="text-red-500 hover:text-red-600 flex items-center gap-2 text-sm font-bold">
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Usuario</label>
              <input readOnly value="admin_mason" className="w-full bg-gray-50 border rounded-lg p-2 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email de Notificaciones</label>
              <input readOnly value="contacto@mason.cl" className="w-full bg-gray-50 border rounded-lg p-2 outline-none" />
            </div>
          </div>
          <button className="text-fen-blue text-sm font-bold flex items-center gap-1 hover:underline">
            <Lock size={14} /> Cambiar Contraseña
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b bg-gray-50">
          <h3 className="font-bold text-fen-navy flex items-center gap-2">
            <Database size={20} /> Gestión de Archivos Secretos
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">Exportar Antecedentes Locales</h4>
              <p className="text-sm text-gray-500">Descarga un archivo JSON con toda la trazabilidad y presupuestos.</p>
            </div>
            <button 
              onClick={onExport}
              className="bg-fen-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-fen-blue/90 shadow-md"
            >
              <Download size={18} /> Exportar Backup
            </button>
          </div>

          <div className="pt-6 border-t">
            <div className="flex items-center gap-3 text-green-600 mb-4">
              <Shield size={20} />
              <span className="font-bold uppercase tracking-widest text-xs">Vigilancia del Taller: Activa</span>
            </div>
            <p className="text-xs text-gray-400 italic">Mason Dashboard utiliza protocolos de encriptación y trazabilidad asistida por IA para asegurar que ningún acuerdo sea olvidado. Ordo Ab Chao.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
