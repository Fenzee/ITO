# Proyek Website ITO (Information Technology Olympiad)

Selamat datang di dokumentasi resmi untuk proyek website Information Technology Olympiad (ITO) yang diselenggarakan oleh SMK Telekomunikasi Darul Ulum. Dokumentasi ini merangkum informasi penting mengenai proyek, termasuk fitur utama, arsitektur, catatan pembaruan, dan panduan penggunaan.

## 📂 Ringkasan Proyek

Website ini pada awalnya dirancang sebagai *Single Page Application (SPA)* dengan tata letak satu tampilan tanpa *scroll*, menggunakan navigasi vertikal dan konten modal. Seiring perkembangan, proyek ini diperluas untuk mencakup beberapa halaman HTML statis untuk fitur-fitur spesifik seperti blog, halaman konferensi, dan lainnya, sambil tetap mempertahankan elemen desain dan animasi yang modern.

## ✨ Fitur Utama

Berikut adalah fitur-fitur yang ada di dalam proyek website ini:

### Fitur Inti & Navigasi:
- **Tata Letak Halaman Tunggal (di `index.html`)**: Antarmuka utama tanpa *scroll* untuk pengalaman yang imersif.
- **Navigasi *Floating Dock***: Navigasi vertikal di sisi kiri (desktop) dan bar mengambang di bawah (mobile).
- **Sistem Konten Modal**: Konten ditampilkan dalam kartu modal dengan animasi transisi ala PowerPoint.
- **Animasi Global**: Latar belakang dengan partikel dan bentuk geometris yang bergerak secara halus di semua halaman.
- **Desain Responsif**: Dioptimalkan untuk berbagai ukuran layar, dari desktop hingga perangkat mobile.
- **Pintasan Keyboard**: Navigasi cepat menggunakan tombol angka (`1`-`5`) dan `ESC` untuk menutup modal.

### Halaman & Konten:
- **Halaman Utama (`index.html`)**: Tampilan utama dengan robot yang memiliki animasi *floating*.
- **Halaman Blog (`blog.html` & `single-blog.html`)**: Halaman untuk menampilkan daftar artikel dan tampilan detail untuk satu artikel.
- **Halaman Konferensi (`conference-page.html` & `conference-team.html`)**: Informasi mengenai acara konferensi dan halaman khusus untuk menampilkan tim atau pembicara.
- **Halaman Tari (`dance-page.html` & `dance-team.html`)**: Halaman yang didedikasikan untuk acara atau sub-event bertema tari.
- **Halaman Registrasi (`registrasi.html`)**: Formulir pendaftaran untuk peserta.
- **Galeri Foto**: Galeri dengan efek *lightbox* untuk menampilkan gambar.
- **Jadwal Acara (Timeline)**: Tampilan jadwal acara dengan animasi.
- **Halaman Error (`page-error.html`)**: Halaman kustom untuk menangani kesalahan 404.

## 📝 Catatan Pembaruan Terakhir (Versi 2.0)

Pembaruan signifikan terakhir adalah penyederhanaan bagian *Hero Section* pada halaman utama (`index.html`).

- **✅ Yang Dihapus**:
  - Efek Parallax yang berat.
  - *Slider* dengan beberapa slide.
  - *Footer* untuk tampilan yang lebih bersih.

- **✨ Yang Ditambahkan**:
  - *Hero Section* sederhana dengan satu gambar robot.
  - Animasi *floating* (naik-turun) pada robot untuk memberikan kesan dinamis.
  - Efek partikel dan gradien modern pada latar belakang.
  - Pengurangan ukuran file JavaScript sekitar **40KB** untuk performa lebih cepat.

## 🚀 Panduan Memulai Cepat

Tidak ada proses *build* yang diperlukan. Website ini dapat dijalankan langsung di browser.

1.  **Buka File**: Cukup buka file `index.html` atau file `.html` lainnya langsung di browser Anda.
2.  **Rekomendasi (Live Server)**: Untuk pengalaman terbaik, gunakan ekstensi **Live Server** di Visual Studio Code. Klik kanan pada file `.html` dan pilih `Open with Live Server`.

## 📂 Struktur File Penting

```
├── index.html                  # Halaman utama (Single Page Layout)
├── blog.html                   # Halaman daftar blog
├── conference-page.html        # Halaman utama konferensi
├── dance-page.html             # Halaman utama tari
├── registrasi.html             # Halaman pendaftaran
├── assets/
│   ├── css/
│   │   ├── style.css             # Stylesheet utama
│   │   ├── global-background.css # CSS untuk animasi latar belakang global
│   │   ├── single-page-layout.css# Tata letak khusus halaman tunggal
│   │   └── hero-simple.css       # CSS untuk hero section baru
│   ├── js/
│   │   ├── main.js               # File JavaScript utama
│   │   ├── floating-dock.js      # Logika untuk navigasi dock
│   │   └── animated-background.js# Logika untuk animasi latar belakang
│   └── img/                      # Aset gambar
└── ... (file HTML dan aset lainnya)
```

## 🌐 Dukungan Browser

Website ini dirancang untuk berfungsi dengan baik di browser modern:
- ✅ Chrome (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Edge (90+)
- ✅ Browser Mobile (iOS Safari, Chrome for Android)

---
*Dibuat untuk Information Technology Olympiad (ITO) © 2024*
*SMK Telekomunikasi Darul Ulum*
