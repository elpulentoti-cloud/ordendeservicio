
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  History, 
  Settings, 
  Menu, 
  X, 
  Bell, 
  Star, 
  BookOpen,
  LogIn,
  UserPlus,
  Clock,
  MoreVertical,
  Smartphone
} from 'lucide-react';
import { 
  Appointment, 
  Budget, 
  AgreementTrace, 
  View, 
  SurveyResponse 
} from './types';
import { MasonicIcons, COLORS } from './constants';
import Dashboard from './components/Dashboard';
import Scheduler from './components/Scheduler';
import BudgetManager from './components/BudgetManager';
import HistoryLog from './components/HistoryLog';
import DailyWisdom from './components/DailyWisdom';
import SettingsPanel from './components/SettingsPanel';
import SurveyManager from './components/SurveyManager';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [traces, setTraces] = useState<AgreementTrace[]>([]);
  const [surveys, setSurveys] = useState<SurveyResponse[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showPWAHint, setShowPWAHint] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    // Check if running as standalone app
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    if (!isStandalone) {
      const hintShown = localStorage.getItem('delta33_pwa_hint');
      if (!hintShown) setShowPWAHint(true);
    }
    return () => clearInterval(timer);
  }, []);

  const getDoomsdayTime = () => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - currentTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    return { hours, mins, secs };
  };

  useEffect(() => {
    setAppointments(JSON.parse(localStorage.getItem('delta33_appointments') || '[]'));
    setBudgets(JSON.parse(localStorage.getItem('delta33_budgets') || '[]'));
    setTraces(JSON.parse(localStorage.getItem('delta33_traces') || '[]'));
    setSurveys(JSON.parse(localStorage.getItem('delta33_surveys') || '[]'));
    const session = sessionStorage.getItem('delta33_session');
    if (session) setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('delta33_appointments', JSON.stringify(appointments));
    localStorage.setItem('delta33_budgets', JSON.stringify(budgets));
    localStorage.setItem('delta33_traces', JSON.stringify(traces));
    localStorage.setItem('delta33_surveys', JSON.stringify(surveys));
  }, [appointments, budgets, traces, surveys]);

  const handleLogin = (user: string, pass: string) => {
    if (user === 'admin' && pass === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('delta33_session', 'true');
    } else {
      alert("Credenciales incorrectas.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('delta33_session');
  };

  const dismissHint = () => {
    setShowPWAHint(false);
    localStorage.setItem('delta33_pwa_hint', 'true');
  };

  const exportData = () => {
    const data = { appointments, budgets, traces, surveys };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `delta33_archive_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const addAppointment = (app: Appointment) => setAppointments(prev => [...prev, app]);
  const addBudget = (budget: Budget) => setBudgets(prev => [...prev, budget]);
  const addTrace = (trace: AgreementTrace) => setTraces(prev => [...prev, trace]);
  const addSurvey = (survey: SurveyResponse) => setSurveys(prev => [...prev, survey]);

  if (!isAuthenticated) {
    return <LandingPage onLogin={handleLogin} onGuestAppointment={addAppointment} currentTime={currentTime} doomsday={getDoomsdayTime()} />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Cámara', icon: LayoutDashboard },
    { id: 'scheduler', label: 'Agenda', icon: Calendar },
    { id: 'budget', label: 'Dinero', icon: FileText },
    { id: 'history', label: 'Trazas', icon: History },
    { id: 'survey', label: 'Calidad', icon: Star },
    { id: 'daily', label: 'Sabiduría', icon: BookOpen },
    { id: 'settings', label: 'Taller', icon: Settings },
  ];

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard appointments={appointments} budgets={budgets} surveys={surveys} doomsday={getDoomsdayTime()} />;
      case 'scheduler': return <Scheduler appointments={appointments} onAdd={addAppointment} onSendEmail={(email) => console.log(`Mail to ${email}`)} />;
      case 'budget': return <BudgetManager budgets={budgets} appointments={appointments} onAdd={addBudget} />;
      case 'history': return <HistoryLog traces={traces} appointments={appointments} onAddTrace={addTrace} />;
      case 'daily': return <DailyWisdom />;
      case 'survey': return <SurveyManager surveys={surveys} appointments={appointments} onAdd={addSurvey} />;
      case 'settings': return <SettingsPanel onExport={exportData} onLogout={handleLogout} />;
      default: return <Dashboard appointments={appointments} budgets={budgets} surveys={surveys} doomsday={getDoomsdayTime()} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Hint for PWA installation on mobile */}
      {showPWAHint && (
        <div className="bg-fen-blue text-white p-3 text-xs flex items-center justify-between animate-bounce z-50">
          <div className="flex items-center gap-2">
            <Smartphone size={16} />
            <span>¡Instala Delta33! Pulsa "Añadir a pantalla de inicio"</span>
          </div>
          <button onClick={dismissHint}><X size={16} /></button>
        </div>
      )}

      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-30 shrink-0">
        <div className="flex items-center gap-2">
          <MasonicIcons.Owl className="text-fen-navy" size={24} />
          <h1 className="masonic-font text-lg font-bold tracking-widest text-fen-navy uppercase">Delta33</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-fen-navy bg-gray-100 px-2 py-1 rounded">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          <div className="w-8 h-8 rounded-full bg-fen-navy flex items-center justify-center text-white text-[10px] border border-fen-blue">Δ33</div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside className="hidden md:flex flex-col w-64 bg-fen-navy text-white p-4 space-y-2 border-r border-white/10 shrink-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${currentView === item.id ? 'bg-fen-blue text-white' : 'hover:bg-white/10 text-gray-400'}`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-y-auto pb-20 md:pb-0 px-4 pt-6 no-scrollbar">
          {renderView()}
        </main>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-40 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id as View)}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${currentView === item.id ? 'text-fen-blue' : 'text-gray-400'}`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
        <button 
           onClick={() => setCurrentView('settings')}
           className={`flex flex-col items-center justify-center gap-1 w-full h-full ${currentView === 'settings' ? 'text-fen-blue' : 'text-gray-400'}`}
        >
          <MoreVertical size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Más</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
