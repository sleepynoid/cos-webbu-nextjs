import { Navbar } from "@/components/navbar";
import { CatalogGrid } from "@/components/catalog-grid";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-12">
        {/* Hero Banner Placeholder */}
        <section className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-gradient-to-br from-brand/20 to-brand/5 rounded-3xl overflow-hidden flex items-center justify-center border border-brand/10">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-black text-brand italic">Cosulagi</h1>
            <p className="text-gray-500 text-sm md:text-base font-medium">Cosplay Marketplace Terpercaya</p>
          </div>
        </section>

        {/* Featured Section */}
        <CatalogGrid />
        
        {/* Secondary Section (Mock) */}
        <div className="pt-8">
           <CatalogGrid />
        </div>
      </main>

      {/* Footer Placeholder matching Cosulagi style */}
      <footer className="mt-20 bg-gradient-to-b from-brand to-indigo-950 text-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="text-2xl font-black italic">Cosulagi</div>
            <p className="text-white/70 text-sm leading-relaxed">
              Platform sewa dan jual beli kostum cosplay terpercaya. Kami mempermudah cosplayer menemukan kostum impian.
            </p>
          </div>
          {/* Mock columns */}
          <div className="space-y-4">
            <h4 className="font-bold">Ikuti Kami</h4>
            <div className="text-white/70 text-sm space-y-2">
              <p>Instagram</p>
              <p>TikTok</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Kontak</h4>
            <div className="text-white/70 text-sm space-y-2">
              <p>WhatsApp: +62 812-XXXX</p>
              <p>Email: hello@cosulagi.id</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Metode Pembayaran</h4>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-8 bg-white/10 rounded" />
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-white/50 text-xs">
          &copy; 2024 Cosulagi. Semua hak dilindungi.
        </div>
      </footer>
    </div>
  );
}
