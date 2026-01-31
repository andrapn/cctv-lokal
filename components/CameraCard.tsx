import React, { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';
import { CameraConfig, StreamStatus } from '../types';
import { AlertCircle, RefreshCw, Video, Signal, Maximize2 } from 'lucide-react';

interface CameraCardProps {
  camera: CameraConfig;
}

const CameraCard = ({ camera }: CameraCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<StreamStatus>(StreamStatus.LOADING);
  const hlsRef = useRef<Hls | null>(null);

  const initPlayer = useCallback(() => {
    setStatus(StreamStatus.LOADING);
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90
      });

      hlsRef.current = hls;
      hls.loadSource(camera.url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
            // Autoplay might be blocked
            setStatus(StreamStatus.IDLE);
        });
        setStatus(StreamStatus.PLAYING);
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              // Try to recover network error
              console.warn(`Network error on ${camera.label}, trying to recover...`);
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn(`Media error on ${camera.label}, trying to recover...`);
              hls.recoverMediaError();
              break;
            default:
              // Cannot recover
              hls.destroy();
              setStatus(StreamStatus.ERROR);
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = camera.url;
      video.addEventListener('loadedmetadata', () => {
        video.play();
        setStatus(StreamStatus.PLAYING);
      });
      video.addEventListener('error', () => {
        setStatus(StreamStatus.ERROR);
      });
    } else {
      setStatus(StreamStatus.ERROR);
    }
  }, [camera.url, camera.label]);

  useEffect(() => {
    initPlayer();
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [initPlayer]);

  const handleRetry = () => {
    initPlayer();
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-slate-600">
      {/* Card Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-3 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start pointer-events-none">
        <div>
          <h3 className="text-white font-semibold text-sm flex items-center gap-2 drop-shadow-md">
            <Video size={14} className="text-emerald-400" />
            {camera.label}
          </h3>
          {camera.location && (
            <p className="text-xs text-slate-300 ml-5 drop-shadow-md">{camera.location}</p>
          )}
        </div>
        
        {/* Status Badge */}
        <div className="flex items-center gap-2">
            {status === StreamStatus.PLAYING && (
                <div className="flex items-center gap-1.5 bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse-fast">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    LIVE
                </div>
            )}
             <button 
                onClick={handleFullScreen}
                className="pointer-events-auto p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-md backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100"
                title="Fullscreen"
            >
                <Maximize2 size={14} />
            </button>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative aspect-video bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          className={`w-full h-full object-fill transition-opacity duration-500 ${status === StreamStatus.PLAYING ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          playsInline
          controls={false} // Custom controls or just hidden for aesthetic
        />

        {/* Loading Overlay */}
        {status === StreamStatus.LOADING && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-0">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <span className="text-xs text-slate-400 animate-pulse">Menghubungkan...</span>
          </div>
        )}

        {/* Error Overlay */}
        {status === StreamStatus.ERROR && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 z-20 p-4 text-center">
            <AlertCircle className="text-red-500 mb-2" size={32} />
            <p className="text-sm text-slate-300 font-medium mb-3">Koneksi Terputus</p>
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors"
            >
              <RefreshCw size={12} />
              Coba Lagi
            </button>
          </div>
        )}
      </div>

      {/* Footer / Tech Info */}
      <div className="px-3 py-2 bg-slate-800 border-t border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${status === StreamStatus.PLAYING ? 'bg-emerald-500' : 'bg-slate-500'}`}></div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                {status === StreamStatus.PLAYING ? 'Online' : status}
            </span>
        </div>
        <div className="text-[10px] text-slate-500 flex items-center gap-1">
            <Signal size={10} /> HLS Stream
        </div>
      </div>
    </div>
  );
};

export default CameraCard;