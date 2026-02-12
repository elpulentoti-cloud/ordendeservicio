
import React from 'react';
import { Download, Shield, User, Lock, Database, LogOut, Rocket, Github, ExternalLink } from 'lucide-react';

interface SettingsPanelProps {
  onExport: () => void;
  onLogout: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onExport, onLogout }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Guía de Hosting para el Usuario */}
      <div className="bg-gradient-to-br from-fen-navy to-blue-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Rocket className="text-fen-blue" />
          <h3 className="font-bold text-lg masonic-font">Guía de Despliegue Gratis</h3>
        </div>
        <div className="space-y-3 text-sm opacity-90">
          <p className="flex items-center gap-2"><span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">1</span> Sube tus archivos a un repo de <b>GitHub</b>.</p>
          <p className="flex items-center gap-2"><span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">2</span> Conecta tu GitHub a <b>Vercel.com</b> o <b>Netlify</b>.</p>
          <p className="flex items-center gap-2"><span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">3</span> Agrega la Variable de Entorno: <code className="bg-black/30 px-1 rounded">API_KEY</code>.</p>
          <p className="flex items-center gap-2"><span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">4</span> ¡Delta33 estará vivo en tu propio subdominio!</p>
        </div>
        <div className="mt-4 flex gap-2">
           <a href="https://vercel.com" target="_blank" className="flex-1 bg-white text-fen-navy py-2 rounded-lg font-bold text-center text-xs flex items-center justify-center gap-1">
             Ir a Vercel <ExternalLink size={12} />
           </a>
           <a href="https://github.com" target="_blank" className="flex-1 bg-white/10 text-white py-2 rounded-lg font-bold text-center text-xs flex items-center justify-center gap-1 border border-white/20">
             GitHub <Github size={12} />
           </a>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-fen-navy flex items-center gap-2">
            <User size={20} /> Perfil Admin Delta33
          </h3>
          <button onClick={onLogout} className="text-red-500 hover:text-red-600 flex items-center gap-2 text-sm font-bold">
            <LogOut size={16} /> Salir
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Usuario</label>
              <input readOnly value="admin_delta33" className="w-full bg-gray-50 border rounded-xl p-3 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email</label>
              <input readOnly value="contacto@delta33.cl" className="w-full bg-gray-50 border rounded-xl p-3 outline-none text-sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b bg-gray-50">
          <h3 className="font-bold text-fen-navy flex items-center gap-2">
            <Database size={20} /> Base de Datos Local
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Copia de Seguridad</h4>
              <p className="text-xs text-gray-500">Descarga tus acuerdos y trazabilidad en JSON.</p>
            </div>
            <button 
              onClick={onExport}
              className="bg-fen-blue text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-fen-blue/90 shadow-md text-sm font-bold shrink-0"
            >
              <Download size={16} /> Backup
            </button>
          </div>

          <div className="pt-6 border-t">
            <div className="flex items-center gap-3 text-green-600 mb-4">
              <Shield size={20} />
              <span className="font-bold uppercase tracking-widest text-[10px]">Protección del Taller Activa</span>
            </div>
            <p className="text-[10px] text-gray-400 italic leading-relaxed">
              Delta33 ha sido diseñada para ser una Progressive Web App (PWA). Para usarla como App, abre el link en tu teléfono y selecciona "Añadir a pantalla de inicio".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
