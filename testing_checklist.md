# ✅ Testing Checklist — MZM Tour Website

> **URL Admin:** `/mzm-panel`  
> **Setelah setiap perubahan admin:** refresh halaman user (Ctrl+Shift+R) untuk melihat efeknya

---

## 🌐 Halaman User (Pengunjung)

| # | Yang Ditest | Cara Test | Expected |
|---|-------------|-----------|----------|
| 1 | Halaman utama load | Buka URL utama | Muncul hero, paket, testimoni |
| 2 | Halaman Paket Umroh | Klik menu Umroh | Kartu paket muncul dengan info lengkap |
| 3 | Halaman Paket Haji | Klik menu Haji | Kartu paket muncul |
| 4 | Halaman Wisata Islam | Klik menu Wisata | Kartu paket muncul |
| 5 | Halaman Jadwal | Klik menu Jadwal | Tabel jadwal keberangkatan muncul |
| 6 | Status "Full Booked" | Lihat kartu yang sudah Full Booked | Tombol merah "Full Booked", tidak bisa hubungi WA |
| 7 | Tombol WA | Klik "Hubungi via WhatsApp" | Buka WhatsApp dengan pesan otomatis |
| 8 | Form Testimoni | Scroll ke bawah homepage | Form testimoni muncul (jika diaktifkan admin) |
| 9 | Isi form testimoni | Isi nama, kota, pesan, bintang → kirim | Toast sukses, review muncul di carousel |
| 10 | Responsive HP | Buka dari HP / mode mobile browser | Layout tidak berantakan, semua bisa diklik |

---

## 🔐 Panel Admin (`/mzm-panel`)

### Login & Session
| # | Yang Ditest | Cara Test | Expected |
|---|-------------|-----------|----------|
| 11 | Login salah | Masukkan password salah 3x+ | Muncul pesan error + lockout otomatis |
| 12 | Login benar | Masukkan username & password benar | Masuk ke dashboard |
| 13 | Session persistent | Tekan F5 / refresh setelah login | **Tidak logout**, tetap masuk |
| 14 | Logout bersih | Klik "Keluar" | Keluar, field username & password kosong |
| 15 | URL lama tidak bisa | Buka `/admin` di browser | Dapat **404 Not Found** |

### Manajemen Paket
| # | Yang Ditest | Cara Test | Expected |
|---|-------------|-----------|----------|
| 16 | Tambah paket | Klik "Tambah Paket" → isi form → simpan | Paket baru muncul di daftar |
| 17 | Edit paket | Klik ✏️ pada paket → ubah data → simpan | Data berubah sesuai |
| 18 | Hapus paket | Klik 🗑️ → konfirmasi | Paket hilang dari daftar |
| 19 | Ubah status → Full Booked | Dropdown status → pilih "Full Booked" | Toast sukses, kartu user ikut berubah merah |
| 20 | Ubah status → Tersedia | Dropdown status → pilih "Tersedia" | Kartu user kembali normal |

### Manajemen Jadwal
| # | Yang Ditest | Cara Test | Expected |
|---|-------------|-----------|----------|
| 21 | Tambah jadwal | Tab Jadwal → pilih paket + tanggal → Tambah | Jadwal muncul di daftar |
| 22 | Ubah seat | Klik + / − pada kolom Kursi | Angka berubah dan tersimpan |
| 23 | Ubah status jadwal → Full | Dropdown status jadwal → Full Booked | Kursi di user page ikut berubah |
| 24 | Hapus jadwal | Klik 🗑️ pada jadwal → konfirmasi | Jadwal hilang |

### Manajemen Testimoni
| # | Yang Ditest | Cara Test | Expected |
|---|-------------|-----------|----------|
| 25 | Nonaktifkan testimoni | Tab Testimoni → toggle OFF | Form testimoni di homepage hilang |
| 26 | Aktifkan testimoni | Toggle ON | Form testimoni di homepage muncul kembali |
| 27 | Edit testimoni | Klik ✏️ → ubah → simpan | Data testimoni berubah |
| 28 | Hapus testimoni | Klik 🗑️ → konfirmasi | Testimoni hilang |

---

## 📱 Responsive Test (Wajib di HP)

| # | Halaman | Yang Dicek |
|---|---------|------------|
| 29 | Homepage | Hero, paket, testimoni tidak berantakan |
| 30 | Paket Umroh/Haji/Wisata | Kartu paket tersusun rapi |
| 31 | Jadwal Keberangkatan | Tabel/list terbaca jelas |
| 32 | Admin Panel | Form tambah paket, list jadwal tidak saling nimpa |

---

> **Catatan untuk tester:**
> - Setiap perubahan di admin baru keliatan di halaman user setelah di-**refresh**
> - Kalau ada yang tidak berubah, coba **Ctrl+Shift+R** (hard refresh)
> - Screenshot kalau ada yang error, kirim ke developer
