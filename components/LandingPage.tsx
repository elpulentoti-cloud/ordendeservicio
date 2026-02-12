
import React, { useState } from 'react';
import { MasonicIcons, COLORS } from '../constants';
import { LogIn, UserPlus, Calendar, TrendingUp, Info, ChevronRight, Mail, X } from 'lucide-react';
import DailyWisdom from './DailyWisdom';
import { Appointment } from '../types';

interface LandingPageProps {
  onLogin: (u: string, p: string) => void;
  onGuestAppointment: (app: Appointment) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onGuestAppointment }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', email: '', date: '', time: '' });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const app: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      clientName: bookingData.name,
      clientEmail: bookingData.email,
      serviceType: 'Solicitud Externa',
      date: bookingData.date,
      time: bookingData.time,
      status: 'pending',
      notes: 'Solicitado desde Landing Page',
      createdAt: Date.now()
    };
    onGuestAppointment(app);
    alert("Su solicitud ha sido recibida en el Taller. Pronto recibirá un correo de confirmación.");
    setShowBooking(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      {/* Subtle Checkerboard Hero Background */}
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-fen-navy opacity-5 z-0" style={{ 
        backgroundImage: `linear-gradient(45deg, #00205B 25%, transparent 25%), linear-gradient(-45deg, #00205B 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #00205B 75%), linear-gradient(-45deg, transparent 75%, #00205B 75%)`,
        backgroundSize: '40px 40px'
      }}></div>

      {/* Header */}
      <nav className="relative z-10 px-8 h-20 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <MasonicIcons.Owl className="text-fen-navy" size={32} />
          <div className="flex flex-col">
            <span className="masonic-font text-2xl font-bold tracking-widest text-fen-navy">MASON</span>
            <span className="text-[9px] uppercase font-bold text-fen-blue tracking-[0.3em]">Servicio & Discreción</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setShowBooking(true)} className="hidden md:flex items-center gap-2 text-fen-navy font-bold hover:text-fen-blue transition-colors text-sm uppercase tracking-wider">
            <Calendar size={18} /> Agendar Cita
          </button>
          <div className="h-6 w-px bg-gray-200"></div>
          <button className="flex items-center gap-2 bg-fen-navy text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-fen-blue transition-all shadow-lg hover:shadow-fen-blue/20">
            <UserPlus size={16} /> Registrarse
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center">
        
        {/* Hero Section */}
        <section className="w-full max-w-7xl px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-fen-blue/10 text-fen-blue rounded-full text-[10px] font-bold uppercase tracking-widest">
              <MasonicIcons.ThreeDots /> Al Servicio de la Verdad
            </div>
            <h1 className="text-6xl font-bold text-fen-navy masonic-font leading-tight">
              Construyendo Puentes <br /> 
              <span className="text-fen-blue">Hacia la Excelencia</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              Gestión profesional con la discreción y el rigor de una tradición milenaria. Seguimiento absoluto de cada acuerdo para su tranquilidad.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setShowBooking(true)} className="bg-fen-navy text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-fen-navy/90 transition-all shadow-xl">
                Tocar la Puerta <ChevronRight size={20} />
              </button>
              <button className="bg-white border-2 border-fen-navy text-fen-navy px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
                Saber Más
              </button>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <MasonicIcons.Pillars size={120} />
            </div>
            <h3 className="text-2xl font-bold text-fen-navy mb-8 flex items-center gap-3 masonic-font">
              <LogIn className="text-fen-blue" /> Acceso Restringido
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Hermano / Usuario</label>
                <input 
                  type="text" 
                  value={user}
                  onChange={e => setUser(e.target.value)}
                  className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 focus:border-fen-blue focus:ring-0 px-0 py-3 text-lg outline-none transition-all"
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Palabra de Pase / Contraseña</label>
                <input 
                  type="password" 
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 focus:border-fen-blue focus:ring-0 px-0 py-3 text-lg outline-none transition-all"
                  placeholder="••••"
                />
              </div>
              <button 
                onClick={() => onLogin(user, pass)}
                className="w-full bg-fen-navy text-white py-4 rounded-xl font-bold text-lg hover:bg-fen-blue transition-all flex items-center justify-center gap-2 group shadow-lg hover:shadow-fen-blue/40"
              >
                Iniciarse <MasonicIcons.ThreeDots />
              </button>
              <p className="text-center text-xs text-gray-400">¿Olvidó su contraseña? Contacte al Gran Secretario.</p>
            </div>
          </div>
        </section>

        {/* Info Grid: Indicators & Daily Info */}
        <section className="w-full bg-gray-50/80 border-y border-gray-100 py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold text-fen-navy masonic-font uppercase tracking-widest flex items-center gap-3">
                  <TrendingUp className="text-fen-blue" /> Signos del Tiempo
                </h2>
                <p className="text-gray-500">Indicadores económicos y sabiduría diaria para el mundo profano.</p>
              </div>
            </div>
            <DailyWisdom />
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-fen-navy/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <MasonicIcons.SquareAndCompass size={80} />
            </div>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h4 className="text-3xl font-bold text-fen-navy masonic-font">Solicitar Servicio</h4>
                <p className="text-gray-500 text-sm">Pruebe nuestra trazabilidad absoluta.</p>
              </div>
              {/* Fixed: X is now imported from lucide-react */}
              <button onClick={() => setShowBooking(false)} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
            </div>
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Su Nombre" className="w-full border rounded-xl p-3" value={bookingData.name} onChange={e => setBookingData({...bookingData, name: e.target.value})} />
                <input required type="email" placeholder="Su Correo" className="w-full border rounded-xl p-3" value={bookingData.email} onChange={e => setBookingData({...bookingData, email: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required type="date" className="w-full border rounded-xl p-3 text-sm" value={bookingData.date} onChange={e => setBookingData({...bookingData, date: e.target.value})} />
                <input required type="time" className="w-full border rounded-xl p-3 text-sm" value={bookingData.time} onChange={e => setBookingData({...bookingData, time: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-fen-navy text-white py-4 rounded-xl font-bold hover:bg-fen-blue transition-all shadow-lg flex items-center justify-center gap-2">
                <Mail size={18} /> Enviar Solicitud
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-fen-navy text-white/60 py-12 px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <MasonicIcons.Eye size={40} className="text-fen-blue" />
            <div className="text-sm">
              <p className="font-bold text-white uppercase tracking-widest">Mason Dashboard 2025</p>
              <p>Inspirado en los valores de la FEN, U. de Chile.</p>
            </div>
          </div>
          <div className="flex gap-8 text-xs uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Constitución</a>
            <a href="#" className="hover:text-white">Contacto</a>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] uppercase font-bold tracking-widest">Taller Operativo</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
