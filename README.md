# Ciko.dev — Personal Portfolio

Website portfolio pribadi untuk siswa SMK jurusan Rekayasa Perangkat Lunak (RPL).
Dibangun murni dengan **HTML, CSS, dan Vanilla JavaScript** — tanpa framework,
tanpa backend, tanpa database.

## Struktur Folder

```
portfolio/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   ├── images/          → simpan foto profil & gambar project di sini
│   └── certificates/    → simpan gambar sertifikat di sini
│
└── README.md
```

## Cara Menjalankan

**Opsi 1 — Buka langsung**
Klik dua kali file `index.html`, website akan terbuka di browser.

**Opsi 2 — Live Server (disarankan)**
1. Buka folder `portfolio` di VS Code.
2. Install extension **Live Server**.
3. Klik kanan pada `index.html` → **Open with Live Server**.

Tidak ada proses build, install dependency, atau server backend yang dibutuhkan.

## Penjelasan Fungsi Setiap File

- **index.html** — Struktur seluruh halaman: Navbar, Hero, About, Skills,
  Experience, Projects, Certificates, Contact, Footer, dan modal sertifikat.
- **style.css** — Seluruh styling: warna, tipografi, layout, responsive
  design, hover effect, dan animasi. Warna diatur lewat CSS variables di
  bagian `:root` agar mudah diubah.
- **script.js** — Semua interaksi: navbar yang berubah saat scroll, menu
  hamburger di mobile, highlight menu aktif, animasi scroll reveal, efek
  mengetik di Hero, dan modal sertifikat (buka/tutup lewat tombol, klik
  di luar, atau tombol ESC).

## Yang Perlu Kamu Ganti

Beberapa bagian masih menggunakan data placeholder dan perlu kamu sesuaikan:

1. **Foto profil** — ganti kotak `[YOUR PHOTO]` di Hero dan About dengan
   tag `<img>` yang menunjuk ke `assets/images/`.
2. **Nama lengkap** (jika berbeda dari "Ciko") — di bagian `.hero__name`
   dan `.dev-card__name`.
3. **Kontak** — email, nomor WhatsApp, username GitHub & Instagram di
   section Contact (`index.html`, cari section `id="contact"`).
4. **Gambar project** — ganti kotak `[PROJECT IMAGE]` pada setiap
   `.project-card__image` dengan `<img>`, dan ganti link `href="#"` pada
   tombol "View Project" / "Source Code" dengan link asli.
5. **Sertifikat** — tambahkan gambar ke `assets/certificates/`, lalu isi
   atribut `data-cert-img="assets/certificates/nama-file.jpg"` pada setiap
   `.cert-card` di `index.html` supaya modal menampilkan gambar aslinya.

## Warna Utama (CSS Variables)

```css
:root {
    --bg: #0A0A0A;
    --surface: #111111;
    --red: #E50914;
    --red-light: #FF2A2A;
    --white: #FFFFFF;
    --muted: #A1A1AA;
}
```

Semua warna merah pada tombol, border, hover, dan aksen lainnya diambil
dari variable ini, jadi kalau ingin mengganti tone merah, cukup ubah dua
baris `--red` dan `--red-light`.

## Fitur yang Sudah Berfungsi

- Navbar sticky dengan efek blur saat scroll & highlight menu aktif
- Hamburger menu mobile (murni JavaScript)
- Smooth scrolling antar section
- Scroll reveal animation
- Efek mengetik (typing effect) di Hero
- Hover animation pada project card & tech card
- Modal sertifikat (tombol X, klik di luar, atau ESC untuk menutup)
- Fully responsive: Desktop, Tablet, Mobile
