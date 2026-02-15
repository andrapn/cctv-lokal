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
    url: 'http://localhost:3001/stream?cat=lalin&name=jrakah',
    category: 'kota'
  },
  {
    id: 'cam-04',
    label: 'Jalan Krapyak',
    location: 'Persimpangan',
    url: 'http://localhost:3001/stream?cat=lalin&name=Counting%20Krapyak',
    category: 'kota'
  },
  {
    id: 'cam-05',
    label: 'Jalan Kalibanteng',
    location: 'Columbia Asia',
    url: 'http://localhost:3001/stream?cat=lalin&name=kalibanteng',
    category: 'kota'
  },
  {
    id: 'cam-06',
    label: 'Flyover Kalibanteng',
    location: 'Flyover',
    url: 'http://localhost:3001/stream?cat=lalin&name=kalibanteng%202',
    category: 'kota'
  },
  {
    id: 'cam-07',
    label: 'Stasiun Pompa Drainase',
    location: 'Semarang Utara',
    url: 'http://localhost:3001/stream?cat=pompa&name=ks-kolam',
    category: 'kota'
  },
  {
    id: 'cam-08',
    label: 'Balaikota Semarang',
    location: 'Pemuda',
    url: 'http://localhost:3001/stream?cat=pemerintah&name=pintu%20keluar%20balaikota%2002',
    category: 'kota'
  },
  {
    id: 'cam-09',
    label: 'Tugu Muda',
    location: 'Pemuda',
    url: 'http://localhost:3001/stream?cat=lalin&name=tugumuda%203',
    category: 'kota'
  },
  {
    id: 'cam-10',
    label: 'Jalan Pandanaran',
    location: 'Pusat Oleh-oleh',
    url: 'http://localhost:3001/stream?cat=lalin&name=pusat%20oleh%20oleh',
    category: 'kota'
  },
  {
    id: 'cam-11',
    label: 'Simpang Lima',
    location: 'Jalan Utama Depan Masjid',
    url: 'http://localhost:3001/stream?cat=lalin&name=simpang%20lima%201%20360',
    category: 'kota'
  },
  {
    id: 'cam-12',
    label: 'Jalan Pahlawan',
    location: '180 derajat Pahlawan',
    url: 'http://localhost:3001/stream?cat=lalin&name=pahlawan%20180',
    category: 'kota'
  },
  {
    id: 'cam-13',
    label: 'Kota Lama',
    location: 'Wisata',
    url: 'http://localhost:3001/stream?cat=wisata&name=sri%20gunting%02',
    category: 'kota'
  }
];