
import React, { useState, useEffect } from 'react';
import { Book, Globe, Star, TrendingUp, RefreshCw } from 'lucide-react';
import { fetchDailyWisdom } from '../services/geminiService';
import { MasonicIcons } from '../constants';

const DailyWisdom: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [indicators, setIndicators] = useState({ uf: '37.892', dolar: '945', euro: '1.020', ipc: '0.3%' });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const wisdom = await fetchDailyWisdom();
    setData(wisdom);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Indicators Card - Often first for business users */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all border-t-4 border-fen-blue">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-fen-navy">
              <TrendingUp size={24} className="text-fen-blue" />
              <h4 className="font-bold uppercase tracking-widest text-sm">Mercados & Moneda</h4>
            </div>
            <button onClick={loadData} className={`text-gray-300 hover:text-fen-blue ${loading ? 'animate-spin' : ''}`}>
              <RefreshCw size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center border border-transparent hover:border-fen-blue/20 transition-all">
              <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1">UF</span>
              <p className="text-lg font-bold text-fen-navy">${indicators.uf}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center border border-transparent hover:border-fen-blue/20 transition-all">
              <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1">Dólar</span>
              <p className="text-lg font-bold text-fen-navy">${indicators.dolar}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center border border-transparent hover:border-fen-blue/20 transition-all">
              <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1">Euro</span>
              <p className="text-lg font-bold text-fen-navy">${indicators.euro}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center border border-transparent hover:border-fen-blue/20 transition-all">
              <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1">IPC</span>
              <p className="text-lg font-bold text-fen-navy">{indicators.ipc}</p>
            </div>
          </div>
        </div>

        {/* Evangelio & Wisdom */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group border-t-4 border-fen-navy">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <MasonicIcons.Eye size={60} />
          </div>
          <div className="flex items-center gap-3 mb-6 text-fen-navy">
            <Book size={24} className="text-fen-blue" />
            <h4 className="font-bold uppercase tracking-widest text-sm">El Evangelio del Día</h4>
          </div>
          {loading ? (
            <div className="space-y-3">
              <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-100 rounded w-4/6 animate-pulse"></div>
            </div>
          ) : (
            <p className="text-gray-700 italic leading-relaxed flex-1 text-sm border-l-2 border-fen-blue/20 pl-4 py-2">
              "{data?.evangelio}"
            </p>
          )}
          <div className="mt-6 pt-4 border-t border-gray-100">
             <div className="flex items-center gap-2 text-fen-navy">
                <Star size={16} className="text-fen-blue" />
                <span className="text-xs font-bold uppercase tracking-widest">Santoral:</span>
                <span className="text-xs text-gray-600">{data?.santoral || 'Cargando...'}</span>
             </div>
          </div>
        </div>

        {/* Efemerides */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col lg:col-span-1 border-t-4 border-fen-navy">
          <div className="flex items-center gap-3 mb-6 text-fen-navy">
            <Globe size={24} className="text-fen-blue" />
            <h4 className="font-bold uppercase tracking-widest text-sm">Crónicas del Mundo</h4>
          </div>
          <div className="space-y-5">
            {loading ? [1, 2, 3].map(i => <div key={i} className="h-10 bg-gray-50 rounded-xl animate-pulse"></div>) : (
              data?.efemerides.map((ef: string, idx: number) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="mt-1 w-6 h-6 rounded-full bg-fen-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-fen-blue group-hover:text-white transition-all text-fen-blue text-[10px] font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">{ef}</p>
                </div>
              ))
            )}
          </div>
          <div className="mt-auto pt-6 flex justify-center opacity-10">
            <MasonicIcons.ThreeDots className="text-fen-navy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyWisdom;
