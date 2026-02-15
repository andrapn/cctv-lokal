// types.ts

export interface CameraConfig {
  id: string;
  label: string;
  location: string;
  url: string;
  category: 'warga' | 'kota';
  isMaintenance?: boolean;
}

export enum StreamStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  ERROR = 'ERROR'
}