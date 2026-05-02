# 📄 System Requirements Document (SRD)
**Proyek:** Platform Agregator Event Jejepangan & Katalog Sewa Kostum Cosplay

## 1. Deskripsi Proyek
Sistem ini adalah sebuah platform web aplikasi berbasis *client-server* yang dirancang sebagai etalase penyewaan kostum cosplay (B2C) yang terintegrasi dengan jadwal event jejepangan. 

Platform ini berfokus pada performa pencarian tinggi (SEO), filter spesifik kultur *cosplay* lokal, dan resolusi konflik jadwal (Date Picker ketersediaan). Untuk meminimalisir kompleksitas *payment gateway*, eksekusi transaksi akhir (pembayaran & logistik) dialihkan secara aman ke **WhatsApp Admin** menggunakan sistem *Handoff* berbasis *intent*.

## 2. Arsitektur & Tech Stack
Sistem ini menggunakan arsitektur *decoupled* yang memisahkan presentasi antarmuka dan logika bisnis:
*   **Frontend (Aplikasi Klien):** Next.js 14+ (App Router) + TanStack Query. Dioptimalkan untuk performa (LCP < 2 detik) dan *Server-Side Rendering* (SSR).
*   **Autentikasi Frontend:** NextAuth.js (Auth.js) untuk menangani sesi OAuth 2.0 (Google Login).
*   **UI/UX:** Tailwind CSS dipadukan dengan komponen Shadcn UI (Date Picker, Accordion, Dialog).
*   **Backend (REST API):** Laravel (PHP) dengan Laravel Sanctum untuk manajemen autentikasi API. Menangani logika bisnis, *Date Conflict Resolution*, dan validasi akses.
*   **Database:** PostgreSQL / MySQL untuk relasi data transaksional yang solid.
*   **Deployment Target:** Cloudflare Pages / Vercel (Frontend) dan VPS menggunakan Docker Containerization (Backend).

---

## 3. Spesifikasi Fitur Utama

### A. Frontend (Antarmuka Pengguna)
1. **Modul Eksplorasi & Filter Cerdas**
   - **Katalog Event:** Pencarian jadwal acara dengan *URL-based state*.
   - **Katalog Kostum:** Filter spesifik *cosplay* lokal (Kategori, Series, Hijab-friendly, Crossplay-friendly, Gender, dan Ukuran).
   - **Integrasi Event-Kostum:** Widget otomatis yang memfilter kostum yang kosong tepat pada tanggal sebuah event berlangsung.
2. **Modul Transaksi & Reservasi**
   - **Kalender Ketersediaan:** Komponen *Date Picker* yang mendisable (*greyed-out*) tanggal di mana kostum tersebut sedang di-*booking*.
   - **WhatsApp Handoff CTA:** Tombol "Sewa via WhatsApp" yang *generate* pesan otomatis berisi detail pesanan. Tombol ini diproteksi (wajib login & verifikasi KTP).
3. **Modul Pengguna**
   - **Social Login:** Pendaftaran dan proses masuk secepat kilat menggunakan Google Login.
   - **Verifikasi KTP:** Formulir unggah identitas untuk meminimalisir penipuan dan *spam chat* ke WhatsApp Admin.

### B. Backend (Logika Bisnis & API)
1. **Layanan Keamanan & Gatekeeper (Hybrid Auth)**
   - Integrasi autentikasi *stateless*. Backend menerima *payload* profil dari NextAuth, melakukan pencocokan data (Upsert), dan menerbitkan Token Sanctum yang akan disimpan ke dalam sesi enkripsi Next.js.
2. **State Machine Ketersediaan (Rental Engine)**
   - **Soft-Lock Mechanism:** Saat *user* menekan tombol WhatsApp, backend menciptakan *record* berstatus `Pending_WA` yang otomatis mengunci kalender di *frontend* untuk mencegah *Race Condition* (*double-booking*).
   - **Auto-Release Cron Job:** *Background task* (Laravel Scheduler) yang otomatis membuka kembali tanggal sewa jika status `Pending_WA` tidak di- *follow up* menjadi `Paid` oleh admin dalam batas waktu 2 jam.
3. **Layanan Sinkronisasi Data**
   - Eksekusi penarikan data event secara berkala dari sumber eksternal (Google Sheets) ke database lokal untuk disajikan ke halaman agregator.

---

## 4. Skema Database (Entity Relationship)

Struktur tabel relasional di bawah ini dirancang menggunakan konvensi penamaan standar Laravel (jamak, *snake_case*) yang dioptimalkan untuk model *Single-Vendor*.

### A. Pengguna & Keamanan
**Tabel: `users`**
*   `id` (BigInt/UUID, PK)
*   `google_id` (String, Unique, Nullable) - *ID dari Google OAuth*
*   `name` (String)
*   `email` (String, Unique)
*   `avatar_url` (String, Nullable) - *Foto profil dari akun Google*
*   `password` (String, Nullable) - *Nullable untuk mengakomodasi Social Login*
*   `phone_number` (String, Nullable)
*   `role` (Enum: 'admin', 'user') - *Default: 'user'*
*   `ktp_verified` (Boolean) - *Default: false*
*   `created_at`, `updated_at` (Timestamp)

### B. Agregator Event
**Tabel: `events`**
*   `id` (BigInt/UUID, PK)
*   `title` (String) - *Contoh: "Comifuro 17"*
*   `event_date` (Date) - *Tanggal acara berlangsung*
*   `location` (String) - *Nama gedung/tempat*
*   `city` (String) - *Kota penyelenggaraan*
*   `description` (Text, Nullable)
*   `poster_url` (String, Nullable)
*   `source_hash` (String, Nullable) - *Digunakan untuk mengecek perubahan data saat sinkronisasi Google Sheets*
*   `created_at`, `updated_at` (Timestamp)

### C. Taksonomi Katalog
**Tabel: `categories`**
*   `id` (BigInt/UUID, PK)
*   `name` (String)
*   `slug` (String, Unique)

**Tabel: `series`**
*   `id` (BigInt/UUID, PK)
*   `name` (String)
*   `slug` (String, Unique)
*   `cover_image` (String, Nullable)

### D. Inventaris Produk
**Tabel: `costumes`**
*   `id` (BigInt/UUID, PK)
*   `category_id` (FK -> categories.id)
*   `series_id` (FK -> series.id)
*   `title` (String)
*   `character_name` (String)
*   `description` (Text)
*   `inclusions` (Text) - *Contoh: "Wig, Costume Set, Acc Kepala"*
*   `size` (String) - *'S', 'M', 'L', 'XL', 'All Size'*
*   `gender` (String) - *'Pria', 'Wanita', 'Unisex'*
*   `is_hijab_friendly` (Boolean) - *Default: false*
*   `is_crossplay_friendly` (Boolean) - *Default: false*
*   `weight_grams` (Integer) - *Untuk estimasi ongkos kirim*
*   `price` (Integer) - *Harga sewa dasar*
*   `rental_duration_days` (Integer) - *Default: 3*
*   `deposit_amount` (Integer) - *Nominal uang jaminan*
*   `created_at`, `updated_at` (Timestamp)

**Tabel: `costume_images`**
*   `id` (BigInt/UUID, PK)
*   `costume_id` (FK -> costumes.id, OnDelete: Cascade)
*   `image_url` (String)
*   `is_primary` (Boolean) - *Default: false (Penanda thumbnail utama)*

### E. Transaksi & Reservasi
**Tabel: `bookings`**
*   `id` (BigInt/UUID, PK)
*   `costume_id` (FK -> costumes.id, OnDelete: Restrict)
*   `user_id` (FK -> users.id, OnDelete: Restrict)
*   `event_id` (FK -> events.id, Nullable) - *Pencatatan opsional jika disewa khusus melalui widget halaman event (untuk analitik)*
*   `start_date` (Date)
*   `end_date` (Date)
*   `status` (Enum: 'Pending_WA', 'Paid', 'Shipped', 'Completed', 'Cancelled')
*   `created_at`, `updated_at` (Timestamp)

---

## 5. Struktur Routing & API Endpoints

Pemetaan URL dirancang mengikuti standar RESTful untuk Backend dan pola hierarki yang ramah SEO untuk Frontend.

### A. Frontend Routes (Next.js App Router)

| Path | Akses | Deskripsi Halaman (Komponen) |
| :--- | :--- | :--- |
| `/` | Publik | **Beranda:** Hero banner, slider event terdekat, dan grid kostum populer. |
| `/events` | Publik | **Katalog Event:** Pencarian event jejepangan dengan filter kota/bulan. |
| `/events/[eventId]` | Publik | **Detail Event:** Info acara & *Widget Rekomendasi Kostum Tepat Waktu*. |
| `/catalog` | Publik | **Katalog Pencarian:** Halaman filter kompleks (Shadcn UI Sidebar) untuk mencari kostum. |
| `/costumes/[id]` | Publik | **Detail Kostum:** Halaman spesifik produk. Memuat Galeri Foto, Spesifikasi (Berat, Kelengkapan), Kalender Ketersediaan (Date Picker), dan tombol CTA WhatsApp. |
| `/login` | Publik | **Autentikasi:** Halaman masuk (Tombol "Login with Google"). |
| `/profile` | User | **Dashboard User:** Pengaturan biodata akun dan form unggah KTP/Selfie. |
| `/admin/*` | Admin | **Dashboard Admin:** Manajemen master data katalog, verifikasi KTP, dan konfirmasi status pesanan WhatsApp. |

### B. Backend Routes (Laravel REST API)

**Authentication & Users**
*   `POST /api/auth/google-sync` - Menerima profil dari NextAuth, melakukan *Upsert* ke tabel `users`, dan mengembalikan Token Sanctum.
*   `POST /api/users/verify-ktp` (User: Endpoint unggah bukti identitas)
*   `PUT /api/admin/users/{id}/verify` (Admin: Endpoint persetujuan KTP)

**Events & Catalog**
*   `GET /api/events` & `GET /api/events/{id}`
*   `GET /api/costumes` (Pencarian & filter kompleks, mendukung query `?available_date=YYYY-MM-DD`)
*   `GET /api/costumes/{id}` (Mendapatkan detail satu produk kostum beserta relasi gambarnya)
*   `GET /api/costumes/{id}/availability` (Mendapatkan *array* tanggal yang sudah di-*booking* untuk di- *disable* pada kalender UI)
*   `POST/PUT/DELETE /api/admin/costumes` (Admin CRUD Inventaris)

**Booking & Handoff Intent**
*   `POST /api/bookings/intent` (User: Memicu *Soft-Lock* dan men-*generate* URL WhatsApp *pre-filled*)
*   `GET /api/admin/bookings` (Admin: Melihat daftar antrean pesanan)
*   `PUT /api/admin/bookings/{id}/status` (Admin: Mengubah status dari `Pending_WA` -> `Paid` -> `Completed`)

---

## 6. Alur Operasional Sistem (User Flow)

1. **Onboarding Cepat (Google Login):** Pengguna menekan tombol "Login with Google". NextAuth mengumpulkan profil Google pengguna, meneruskannya ke Laravel untuk disinkronkan, lalu Laravel membalas dengan Token Sanctum. Sesi aman terbentuk.
2. **Keamanan Ekstra:** Walaupun sudah *login*, pengguna wajib melengkapi form di `/profile` dengan mengunggah foto KTP agar tombol pemesanan WhatsApp terbuka. Admin melakukan persetujuan di sistem *backend*.
3. **Eksplorasi Berbasis Event:** Pengguna mencari acara terdekat di rute `/events`. Di halaman detail acara, sistem (*Widget Rekomendasi*) hanya menampilkan kostum yang ketersediaannya kosong pada tanggal acara tersebut.
4. **Intent & Soft-Lock:** Pengguna memilih tanggal kosong di Kalender Ketersediaan dan menekan tombol **Hubungi via WhatsApp**. *Frontend* memanggil API Laravel. Laravel menciptakan *record* `Pending_WA` (mengunci tanggal secara instan), dan mengembalikan URL WhatsApp (*pre-filled message*).
5. **WhatsApp Handoff:** *Tab browser* baru terbuka mengarah ke aplikasi WhatsApp. Negosiasi dan transfer uang terjadi di ranah WhatsApp bersama Admin.
6. **Konfirmasi Admin:** Setelah transfer diterima, Admin membuka dashboard web (`/admin/bookings`), mencari transaksi *Pending* tersebut, dan mengubah statusnya menjadi `Paid` (Hard-Lock kalender).
7. **Penyelesaian:** Jika percakapan WhatsApp tidak berujung transaksi, Admin mengubah status menjadi `Cancelled`, atau sistem (*Cron Job* Laravel) akan otomatis membuka kunci tanggal tersebut dalam 2 jam (Auto-Release).