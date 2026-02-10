export interface CameraConfig {
  id: string;
  label: string;
  url: string;
  location?: string;
  category: 'warga' | 'kota'; // Tambahkan ini, dengan tipe yang sesuai
}

export enum StreamStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  ERROR = 'ERROR',
  OFFLINE = 'OFFLINE'
}