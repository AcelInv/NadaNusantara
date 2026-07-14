# 🎵 Nusantara Sound
### Website Multimedia Interaktif Pengenalan Alat Musik Tradisional Indonesia

![Nusantara Sound](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-cyan?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-pink?logo=framer)

---

## 🌟 Fitur Utama

- 🎨 **Desain Premium** — Tema budaya Indonesia (maroon, gold, cream, wood) + motif batik SVG
- 🌙 **Dark Mode** — Toggle light/dark, tersimpan di localStorage
- 🔍 **Pencarian & Filter** — Cari alat musik, filter berdasarkan daerah dan jenis
- 🔖 **Bookmark Favorit** — Simpan alat musik favorit (tersimpan di localStorage)
- 🎵 **Audio Player** — Dengarkan suara alat musik
- 🎬 **Video YouTube** — Embed video cara memainkan alat musik
- 🖼️ **Lightbox Galeri** — Perbesar gambar dengan klik
- ❓ **Kuis Interaktif** — 10 soal dengan penilaian otomatis & penjelasan
- 📜 **Timeline Sejarah** — Perjalanan alat musik dari abad ke-4 hingga era digital
- ❓ **FAQ Accordion** — Pertanyaan umum dengan animasi smooth
- 📱 **Responsif** — Mobile-first design, berfungsi di semua ukuran layar
- ⚡ **Animasi Smooth** — Framer Motion page transitions, parallax, hover effects
- 🏗️ **Skeleton Loading** — Placeholder animasi saat konten dimuat
- 🔔 **Toast Notifications** — Notifikasi bookmark dengan react-hot-toast
- 🔝 **Scroll to Top** — Tombol kembali ke atas yang muncul otomatis

---

## 📦 Instalasi

```bash
# Clone atau masuk ke direktori proyek
cd "Website Multimedia"

# Install dependensi
npm install

# Jalankan dev server
npm run dev
```

Buka browser di `http://localhost:5173`

---

## 🗂️ Struktur Proyek

```
src/
├── components/
│   ├── common/
│   │   ├── InstrumentCard.jsx   # Kartu alat musik dengan bookmark
│   │   ├── PageWrapper.jsx      # Wrapper animasi halaman
│   │   ├── Skeleton.jsx         # Komponen skeleton loading
│   │   └── ScrollToTop.jsx      # Tombol scroll ke atas
│   └── layout/
│       ├── Navbar.jsx           # Navigasi dengan search & dark mode
│       └── Footer.jsx           # Footer dengan links & sosmed
├── context/
│   └── AppContext.jsx           # State global (darkMode, bookmarks, filter)
├── data/
│   ├── instruments.json         # Database 15 alat musik tradisional
│   └── quiz.json               # Database 10 soal kuis
├── pages/
│   ├── LandingPage.jsx          # Beranda dengan hero parallax
│   ├── AboutPage.jsx            # Tentang website
│   ├── GalleryPage.jsx          # Galeri dengan filter & search
│   ├── DetailPage.jsx           # Detail alat musik lengkap
│   ├── QuizPage.jsx             # Kuis interaktif
│   ├── TimelinePage.jsx         # Timeline sejarah
│   ├── FaqPage.jsx              # FAQ accordion
│   └── NotFoundPage.jsx         # Halaman 404
├── App.jsx                      # Router utama
├── main.jsx                     # Entry point
└── index.css                    # Global styles & design tokens
```

---

## 🎸 Menambahkan Alat Musik Baru

Buka `src/data/instruments.json` dan tambahkan objek baru dengan struktur berikut:

```json
{
  "id": 16,
  "slug": "nama-alat-musik",
  "name": "Nama Alat Musik",
  "region": "Provinsi Asal",
  "type": "Pukul | Petik | Tiup | Gesek | Guncang",
  "image": "https://url-gambar-utama.jpg",
  "images": ["https://url-gambar-1.jpg", "https://url-gambar-2.jpg"],
  "description": "Deskripsi singkat alat musik.",
  "history": "Sejarah panjang alat musik ini...",
  "function": "Fungsi dalam budaya setempat...",
  "howToPlay": "Cara memainkan alat musik ini...",
  "materials": "Bahan-bahan pembuat alat musik.",
  "audioUrl": "https://url-audio.mp3",
  "videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "mapCoords": { "lat": -7.0, "lng": 110.0 },
  "facts": ["Fakta 1", "Fakta 2", "Fakta 3"],
  "featured": false
}
```

---

## 📚 Dependensi

| Package | Versi | Kegunaan |
|---------|-------|----------|
| react | ^19 | UI Framework |
| react-dom | ^19 | DOM rendering |
| react-router-dom | ^7 | Client-side routing |
| framer-motion | ^12 | Animasi & page transitions |
| react-hot-toast | ^2 | Toast notifications |
| react-icons | ^5 | Ikon (Feather Icons) |
| tailwindcss | ^4 | Utility CSS framework |
| @tailwindcss/vite | ^4 | Tailwind Vite plugin |
| vite | ^8 | Build tool |

---

## 🎨 Palet Warna

| Variabel | Warna | Hex |
|----------|-------|-----|
| Maroon | Merah marun utama | `#7B1E1E` |
| Gold | Emas aksen | `#C9A84C` |
| Wood | Cokelat kayu | `#8B5E3C` |
| Cream | Krem latar | `#F5ECD7` |
| Dark | Gelap (dark mode) | `#1A0A0A` |

---

## 🚀 Build Produksi

```bash
npm run build
npm run preview
```

---

## 📝 Lisensi

MIT License — Bebas digunakan untuk keperluan edukasi dan non-komersial.

---

*Dibuat dengan ❤️ untuk melestarikan budaya musik tradisional Indonesia*
