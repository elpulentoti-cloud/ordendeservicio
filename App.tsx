
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
  Clock
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
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [traces, setTraces] = useState<AgreementTrace[]>([]);
  const [surveys, setSurveys] = useState<SurveyResponse[]>([]);
  
  // Real-time Clock and Doomsday state
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate doomsday (using 90 seconds to midnight as current Doomsday Clock metaphor)
  const getDoomsdayTime = () => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    // In our esoteric version, "Midnight" is the end of the current Aeon
    const diff = midnight.getTime() - currentTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    return { hours, mins, secs };
  };

  // Load initial data
  useEffect(() => {
    setAppointments(JSON.parse(localStorage.getItem('delta33_appointments') || '[]'));
    setBudgets(JSON.parse(localStorage.getItem('delta33_budgets') || '[]'));
    setTraces(JSON.parse(localStorage.getItem('delta33_traces') || '[]'));
    setSurveys(JSON.parse(localStorage.getItem('delta33_surveys') || '[]'));
    
    const session = sessionStorage.getItem('delta33_session');
    if (session) setIsAuthenticated(true);
  }, []);

  // Sync with LocalStorage
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
      alert("Credenciales incorrectas. Toque la puerta de nuevo.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('delta33_session');
  };

  const exportData = () => {
    const data = { appointments, budgets, traces, surveys };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `delta33_secret_archive_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const addAppointment = (app: Appointment) => setAppointments(prev => [...prev, app]);
  const addBudget = (budget: Budget) => setBudgets(prev => [...prev, budget]);
  const addTrace = (trace: AgreementTrace) => setTraces(prev => [...prev, trace]);
  const addSurvey = (survey: SurveyResponse) => setSurveys(prev => [...prev, survey]);

  if (!isAuthenticated) {
    return <LandingPage onLogin={handleLogin} onGuestAppointment={addAppointment} currentTime={currentTime} doomsday={getDoomsdayTime()} />;
  }

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard appointments={appointments} budgets={budgets} surveys={surveys} doomsday={getDoomsdayTime()} />;
      case 'scheduler': return <Scheduler appointments={appointments} onAdd={addAppointment} onSendEmail={(email) => console.log(`Email trace to ${email}`)} />;
      case 'budget': return <BudgetManager budgets={budgets} appointments={appointments} onAdd={addBudget} />;
      case 'history': return <HistoryLog traces={traces} appointments={appointments} onAddTrace={addTrace} />;
      case 'daily': return <DailyWisdom />;
      case 'survey': return <SurveyManager surveys={surveys} appointments={appointments} onAdd={addSurvey} />;
      case 'settings': return <SettingsPanel onExport={exportData} onLogout={handleLogout} />;
      default: return <Dashboard appointments={appointments} budgets={budgets} surveys={surveys} doomsday={getDoomsdayTime()} />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Cámara Secreta', icon: LayoutDashboard },
    { id: 'scheduler', label: 'Libro de Actas', icon: Calendar },
    { id: 'budget', label: 'Tesorería', icon: FileText },
    { id: 'history', label: 'Trazabilidad', icon: History },
    { id: 'survey', label: 'Perfeccionamiento', icon: Star },
    { id: 'daily', label: 'Luz Iniciática', icon: BookOpen },
    { id: 'settings', label: 'Taller', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <aside className={`bg-fen-navy text-white transition-all duration-500 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col relative`}>
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="p-4 flex items-center gap-3 border-b border-white/10 z-10">
          <MasonicIcons.Owl className="text-fen-blue" />
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="masonic-font text-xl font-bold tracking-[0.2em]">DELTA33</span>
              <span className="text-[10px] uppercase text-fen-blue font-bold tracking-widest">Ordo Ab Chao</span>
            </div>
          )}
        </div>
        
        <nav className="flex-1 mt-6 px-2 space-y-1 z-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${currentView === item.id ? 'bg-fen-blue/20 text-fen-blue border-r-4 border-fen-blue' : 'hover:bg-white/5 text-gray-400'}`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 flex items-center justify-center z-10">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-full text-fen-blue">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <MasonicIcons.SquareAndCompass className="text-fen-navy" />
            <h2 className="text-lg font-semibold text-fen-navy masonic-font uppercase tracking-widest">
              {navItems.find(i => i.id === currentView)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end mr-4">
              <span className="text-[10px] uppercase font-bold text-gray-400">Hora del Taller</span>
              <span className="text-sm font-mono text-fen-navy font-bold">{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-fen-navy flex items-center justify-center text-white text-xs border border-fen-blue">Δ33</div>
              <span className="text-xs font-bold text-fen-navy hidden md:block">Venerable Maestro</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/geometry.png')]"></div>
          <div className="relative z-10">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
