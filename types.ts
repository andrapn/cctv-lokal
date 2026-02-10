export interface CameraConfig {
  id: string;
  label: string;
  url: string;
  location?: string;
  category: 'warga' | 'kota'; 
}

export enum StreamStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  ERROR = 'ERROR',
  OFFLINE = 'OFFLINE'
}