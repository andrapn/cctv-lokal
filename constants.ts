import { CameraConfig } from './types';

export const APP_TITLE = "CCTV Warga";
export const APP_SUBTITLE = "Lingkungan RW 02 Manalagi";

export const CAMERAS: CameraConfig[] = [
  {
    id: 'cam-01',
    label: 'Jalan RT 03',
    location: 'Jalan Utama',
    url: 'https://cctv.manalagi.cloud/cam01/index.m3u8',
    category: 'warga'
  },
  {
    id: 'cam-02',
    label: 'Jalan RT 04',
    location: 'Persimpangan',
    url: 'https://cctv.manalagi.cloud/cam03/index.m3u8',
    category: 'warga'
  },
  {
    id: 'cam-03',
    label: 'Jalan Jerakah',
    location: 'Persimpangan',
    url: 'https://cctv.manalagi.cloud/cctv_jrakah/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-04',
    label: 'Jalan Krapyak',
    location: 'Persimpangan',
    url: 'https://cctv.manalagi.cloud/cctv_krapyak/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-05',
    label: 'Jalan Kalibanteng',
    location: 'Persimpangan',
    url: 'https://cctv.manalagi.cloud/cctv_kalibanteng/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-06',
    label: 'Balaikota',
    location: 'Persimpangan',
    url: 'https://cctv.manalagi.cloud/cctv_balaikota/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-07',
    label: 'Jalan Pahlawan',
    location: 'Persimpangan',
    url: 'https://cctv.manalagi.cloud/cctv_pahlawan/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-08',
    label: 'Kota Lama',
    location: 'Persimpangan',
    url: 'https://cctv.manalagi.cloud/cctv_kotalama1/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-09',
    label: 'Kota Lama 2',
    location: 'Persimpangan',
    url: 'https://cctv.manalagi.cloud/cctv_kotalama2/index.m3u8',
    category: 'kota'
  }
];