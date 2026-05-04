"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Calendar as CalendarIcon, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { MOCK_COSTUMES } from "@/lib/types";
import { useParams, notFound } from "next/navigation";

export default function CostumeDetail() {
  const params = useParams();
  const id = params?.id as string;
  
  const costume = MOCK_COSTUMES.find(c => c.id === id);

  if (!costume) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-4 text-sm text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-brand">Beranda</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/catalog" className="hover:text-brand">Cari Kostum</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{costume.series}</span>
      </div>

      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-white">
              <Image 
                src={costume.image} 
                alt={costume.name}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
                priority
              />
            </div>
            {/* Thumbnails Placeholder */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 opacity-50 hover:opacity-100 cursor-pointer">
                  <Image 
                    src={costume.image} 
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
                <Badge variant="outline" className="text-brand border-brand/30 bg-brand/5">
                  {costume.type === "rental" ? "Sewa" : "Jual"}
                </Badge>
                <span>15 dilihat</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {costume.name}
              </h1>
              <div className="text-3xl font-black text-brand pt-2">
                Rp {costume.price.toLocaleString("id-ID")} 
                {costume.type === "rental" && (
                  <span className="text-base font-normal text-gray-500"> / {costume.rentalDurationDays} hari</span>
                )}
              </div>
            </div>

            {/* Specs */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-lg border-b border-gray-100 pb-2">Spesifikasi Produk</h3>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div><span className="text-gray-500 block">Berat</span> <span className="font-medium">{costume.weightGrams}g</span></div>
                <div><span className="text-gray-500 block">Ukuran</span> <span className="font-medium">{costume.size}</span></div>
                <div><span className="text-gray-500 block">Kelengkapan</span> <span className="font-medium text-brand">{costume.inclusions}</span></div>
                <div><span className="text-gray-500 block">Series</span> <span className="font-medium">{costume.series}</span></div>
                <div><span className="text-gray-500 block">Gender</span> <span className="font-medium">{costume.gender}</span></div>
                <div><span className="text-gray-500 block">Hijabcos</span> <span className="font-medium">{costume.isHijabFriendly ? "Ya" : "Tidak"}</span></div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-lg border-b border-gray-100 pb-2">Deskripsi Produk</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Kostum {costume.character} dari series {costume.series}. 
                Kelengkapan meliputi {costume.inclusions}. 
                Bahan berkualitas tinggi, nyaman dipakai untuk event. 
                {costume.isCrossplayFriendly && " Support untuk crossplay!"}
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
                Cek kalender ketersediaan sebelum menyewa. Klik tombol di bawah untuk lanjut ke WhatsApp.
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <div className="text-sm text-gray-500">Total Biaya</div>
            <div className="text-xl font-bold text-brand">Rp {costume.price.toLocaleString("id-ID")}</div>
          </div>
          <Button className="w-full sm:w-auto bg-brand hover:bg-brand/90 h-12 px-8 font-bold text-lg flex items-center gap-2">
             Sewa via WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
