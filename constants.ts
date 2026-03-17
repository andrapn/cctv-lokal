// constants.ts

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
    // ,isMaintenance: true
  },
  {
    id: 'cam-03',
    label: 'Jalan Jerakah',
    location: 'Persimpangan Polsek',
    url: 'https://cctv.manalagi.cloud/cctv_jrakah/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-04',
    label: 'Jalan Krapyak',
    location: 'Persimpangan Tol',
    url: 'https://cctv.manalagi.cloud/cctv_krapyak/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-04',
    label: 'Hanoman',
    location: 'Samsat Jateng',
    url: 'https://cctv.manalagi.cloud/cctv_hanoman/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-05',
    label: 'Jalan Kalibanteng',
    location: 'Flyover Kalibanteng',
    url: 'https://cctv.manalagi.cloud/cctv_kalibanteng/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-06',
    label: 'Jalan Kalibanteng',
    location: 'Columbia Asia',
    url: 'https://cctv.manalagi.cloud/cctv_kalibantengasia/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-07',
    label: 'Tugu Muda',
    location: 'Pemuda',
    url: 'https://cctv.manalagi.cloud/cctv_tugumuda/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-08',
    label: 'balaikota',
    location: 'Pemuda',
    url: 'https://cctv.manalagi.cloud/cctv_balaikota/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-09',
    label: 'Simpang Lima',
    location: 'Jalan Utama Depan Masjid',
    url: 'https://cctv.manalagi.cloud/cctv_simpanglima/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-10',
    label: 'Jalan Pahlawan',
    location: '180 derajat Pahlawan',
    url: 'https://cctv.manalagi.cloud/cctv_pahlawan/index.m3u8',
    category: 'kota'
  }
];