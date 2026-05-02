import { Navbar } from "@/components/navbar";
import { CatalogGrid } from "@/components/catalog-grid";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-12">
        {/* Hero Section */}
        <section className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          <Image 
            src="/Hero.avif" 
            alt="Cosulagi Hero"
            fill
            className="object-cover"
            priority
          />
          {/* Optional overlay if text is hard to read on real image, 
              but typically Hero.avif has its own branding */}
        </section>

        {/* Sections */}
        <CatalogGrid title="Produk Terbaru" subtitle="Koleksi kostum terbaru yang baru saja tiba" />
        <CatalogGrid title="Bocchi The Rock!" />
        <CatalogGrid title="Love and Deepspace" />
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-[#3b4b9b] text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="text-3xl font-black italic tracking-tighter">Cosulagi<span className="text-base font-normal align-top">.id</span></div>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Wujudin cosplan kamu tanpa ribet! Dari cari kostum karakter inceran sampai sistem sewa yang dijamin aman, Cosulagi.id hadir biar kamu bisa fokus tampil maksimal di event.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Ikuti Kami</h4>
            <div className="text-white/80 text-sm flex items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">IG</div>
               <span>Instagram</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Kontak</h4>
            <div className="text-white/80 text-sm space-y-3">
              <p>+6289677717105</p>
              <p>contact@cosulagi.id</p>
              <p>085692085873</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Jasa Kirim</h4>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(8)].map((_, i) => (
                  <div key={`jasa-${i}`} className="h-6 bg-white/20 rounded" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Metode Pembayaran</h4>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(8)].map((_, i) => (
                  <div key={`bayar-${i}`} className="h-6 bg-white/20 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
