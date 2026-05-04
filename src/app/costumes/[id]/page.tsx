import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { Calendar as CalendarIcon, ChevronRight, MapPin, MessageCircle, Store } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";

export default function CostumeDetail() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 text-sm text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-brand">Beranda</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/katalog" className="hover:text-brand">Cari Kostum</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Bocchi The Rock!</span>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-white">
              <Image 
                src="/products_product-image_1774696640658-NGRK58JW.webp" 
                alt="Hitori Gotoh Bocchi the Rock! - Kostum & Wig"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 opacity-50 hover:opacity-100 cursor-pointer">
                  <Image 
                    src="/products_product-image_1774696640658-NGRK58JW.webp" 
                    alt="Thumbnail"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Badge variant="outline" className="text-brand border-brand/30 bg-brand/5">Sewa</Badge>
                <span>15 dilihat</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Hitori Gotoh Bocchi the Rock! - Kostum & Wig
              </h1>
              <div className="text-3xl font-black text-brand pt-2">
                Rp 50.000 <span className="text-base font-normal text-gray-500">/ 3 hari</span>
              </div>
            </div>



            {/* Specs */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-lg border-b border-gray-100 pb-2">Spesifikasi Produk</h3>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div><span className="text-gray-500 block">Berat</span> <span className="font-medium">1000g</span></div>
                <div><span className="text-gray-500 block">Ukuran</span> <span className="font-medium">Custom</span></div>
                <div><span className="text-gray-500 block">Kelengkapan</span> <span className="font-medium">Wig</span></div>
                <div><span className="text-gray-500 block">Series</span> <span className="font-medium">Bocchi The Rock!</span></div>
                <div><span className="text-gray-500 block">Gender</span> <span className="font-medium">Wanita</span></div>
                <div><span className="text-gray-500 block">Hijabcos</span> <span className="font-medium">Tidak</span></div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-lg border-b border-gray-100 pb-2">Deskripsi Produk</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Kostum Hitori Gotoh (Bocchi) lengkap dengan wig. 
                Bahan nyaman dipakai untuk event seharian. Wig sudah di-styling tipis.
                Pastikan mencantumkan tanggal sewa saat checkout.
              </p>
            </div>

            {/* Calendar Section */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand text-white font-bold text-sm">
                  1
                </div>
                <h3 className="font-bold text-lg text-gray-900">Lihat Ketersediaan</h3>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-between h-14 bg-white hover:bg-gray-50 text-gray-900 border-gray-200">
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-3 text-gray-500" />
                      <span className="font-semibold text-base">Lihat Kalender Ketersediaan</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] w-[95vw] p-0 overflow-hidden bg-white rounded-2xl">
                  <DialogHeader className="p-4 border-b border-gray-100 flex flex-row items-center gap-3 space-y-0">
                    <CalendarIcon className="w-5 h-5 text-gray-500" />
                    <DialogTitle className="text-lg">Ketersediaan Kostum</DialogTitle>
                  </DialogHeader>
                  <div className="p-4 flex justify-center">
                    <Calendar
                      mode="single"
                      className="w-full"
                    />
                  </div>
                </DialogContent>
              </Dialog>

              <p className="text-xs text-gray-500 text-center px-4">
                Kamu bisa cek kalender lebih dulu. Login diperlukan saat akan mengajukan sewa.
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <div className="text-sm text-gray-500">Total Sewa</div>
            <div className="text-xl font-bold text-brand">Rp 50.000</div>
          </div>
          <Button className="w-full sm:w-auto bg-brand hover:bg-brand/90 h-12 px-8 font-bold text-lg">
            Sewa via WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
