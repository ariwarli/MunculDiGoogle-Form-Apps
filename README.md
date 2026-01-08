
# Google Business Profile AI-Native Form

Aplikasi pengumpul data profil bisnis dengan fitur penyempurnaan teks menggunakan AI Gemini dan integrasi otomatis ke Google Sheets.

## Fitur Utama
- **AI Description Enhancer**: Menggunakan Gemini 3 Flash untuk menulis deskripsi bisnis yang SEO-friendly.
- **Material 3 Design**: Antarmuka bersih, modern, dan responsif.
- **Google Sheets Integration**: Data langsung masuk ke spreadsheet melalui Google Apps Script.
- **Real-time Validation**: Validasi sisi klien yang instan.

## Cara Setup

### 1. Backend (Google Sheets)
1. Buat Google Sheet baru.
2. Klik **Extensions** > **Apps Script**.
3. Salin isi file `google-apps-script.js` ke editor Apps Script.
4. Klik tombol **Deploy** > **New Deployment**.
5. Pilih **Web App**, setel akses ke **Anyone**, lalu deploy.
6. Salin **Web App URL** yang dihasilkan.

### 2. Frontend (Next.js / React)
1. Buka file `components/BusinessForm.tsx`.
2. Cari variabel `APPS_SCRIPT_URL` (sekitar baris 111) dan ganti dengan URL Web App dari langkah sebelumnya.
3. Pastikan API Key Gemini tersedia di environment variabel `API_KEY`.

### 3. Deploy ke Vercel
Aplikasi ini siap di-deploy ke Vercel. Pastikan Anda menyertakan `API_KEY` di Dashboard Vercel (Project Settings > Environment Variables).

## Teknologi
- **Frontend**: React 18, Tailwind CSS, Material Design principles.
- **AI**: Google Gemini API (@google/genai).
- **Backend**: Google Apps Script (JavaScript).
