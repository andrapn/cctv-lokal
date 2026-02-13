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
    location: 'Columbia Asia',
    url: 'https://cctv.manalagi.cloud/cctv_kalibanteng/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-06',
    label: 'Flyover Kalibanteng',
    location: 'Flyover',
    url: 'https://cctv.manalagi.cloud/cctv_flyover_kalibanteng/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-07',
    label: 'Stasiun Pompa Drainase',
    location: 'Semarang Utara',
    url: 'https://cctv.manalagi.cloud/cctv_drainase_semut/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-08',
    label: 'Balaikota Semarang',
    location: 'Pemuda',
    url: 'https://cctv.manalagi.cloud/cctv_balaikota/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-09',
    label: 'Tugu Muda',
    location: 'Bundaran Utama',
    url: 'https://cctv.manalagi.cloud/cctv_tugumuda/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-10',
    label: 'Jalan Pandanaran',
    location: 'Pusat Oleh-oleh',
    url: 'https://cctv.manalagi.cloud/cctv_pandanaran/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-11',
    label: 'Simpang Lima',
    location: 'Jalan Utama Depan Masjid',
    url: 'https://cctv.manalagi.cloud/cctv_simpanglima/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-12',
    label: 'Jalan Pahlawan',
    location: '180 derajat Pahlawan',
    url: 'https://cctv.manalagi.cloud/cctv_pahlawan/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-13',
    label: 'Kota Lama',
    location: 'Wisata',
    url: 'https://cctv.manalagi.cloud/cctv_kotalama1/index.m3u8',
    category: 'kota'
  },
  {
    id: 'cam-14',
    label: 'Kota Lama',
    location: 'Wisata',
    url: 'https://cctv.manalagi.cloud/cctv_kotalama2/index.m3u8',
    category: 'kota'
  }
];