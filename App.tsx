import { useState, useEffect } from 'react';
import CameraCard from './components/CameraCard';
import { CAMERAS, APP_TITLE, APP_SUBTITLE } from './constants';
import { ShieldCheck, Clock } from 'lucide-react';

const App = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30">
      
      {/* Navbar / Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                <ShieldCheck className="text-emerald-500" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">{APP_TITLE}</h1>
              <p className="text-xs text-slate-400 font-medium">{APP_SUBTITLE}</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 bg-slate-900/50 px-4 py-1.5 rounded-full border border-slate-800">
             <Clock size={14} className="text-slate-400" />
             <span className="text-sm font-mono text-slate-300 font-medium">{currentTime}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dashboard Stats / Info (Optional but adds polish) */}
        <div className="mb-8 flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-semibold text-white mb-1">Live Monitoring</h2>
                <p className="text-slate-400 text-sm">Menampilkan {CAMERAS.length} kamera aktif di area lingkungan.</p>
            </div>
            <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-emerald-400">Sistem Normal</span>
            </div>
        </div>

        {/* Camera Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAMERAS.map((camera) => (
            <CameraCard key={camera.id} camera={camera} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 mt-12 py-8 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Manalagi Cloud. Restricted Access.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;