"use client";

import { Navbar } from "@/components/navbar";
import { CostumeCard } from "@/components/costume-card";
import { MOCK_COSTUMES } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CatalogPage() {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block w-[280px] flex-shrink-0 sticky top-28 h-fit">
            <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6 space-y-8">
              <h2 className="font-bold text-lg text-gray-900">
                Filter
              </h2>
              
              {/* Tipe Produk */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-sm">Tipe Produk</h3>
                <div className="flex flex-wrap gap-2">
                  {["Semua", "Sewa", "Jual"].map((t) => (
                    <Button key={t} variant={t === "Semua" ? "default" : "outline"} className={cn("h-9 px-5 rounded-lg text-sm font-semibold", t === "Semua" ? "bg-brand hover:bg-brand/90" : "border-gray-200 text-gray-700")}>
                      {t}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full" />

              {/* Gender Kostum */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-sm">Gender Kostum</h3>
                <div className="flex flex-wrap gap-2">
                  {["Semua", "Pria", "Wanita"].map((t) => (
                    <Button key={t} variant={t === "Semua" ? "default" : "outline"} className={cn("h-9 px-5 rounded-lg text-sm font-semibold", t === "Semua" ? "bg-brand hover:bg-brand/90" : "border-gray-200 text-gray-700")}>
                      {t}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full" />

              {/* Preferensi Kostum */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-sm">Preferensi Kostum</h3>
                <div className="flex items-start space-x-3">
                  <Checkbox id="crossplay" className="mt-1 w-4 h-4 rounded border-gray-300" />
                  <label htmlFor="crossplay" className="text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                    <span className="font-medium text-gray-900 block mb-0.5">Bisa Crossplay</span>
                    <span className="text-gray-500 text-xs">Kostum yang bisa dipakai lintas gender</span>
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox id="hijab" className="mt-1 w-4 h-4 rounded border-gray-300" />
                  <label htmlFor="hijab" className="text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                    <span className="font-medium text-gray-900 block mb-0.5">Ramah Hijabcos</span>
                    <span className="text-gray-500 text-xs">Kostum yang nyaman dipakai dengan hijab</span>
                  </label>
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full" />

              {/* Tanggal Sewa */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-sm">Tanggal Sewa</h3>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Pilih tanggal" className="w-full h-10 pl-9 pr-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-brand transition-colors text-gray-600 cursor-pointer" readOnly />
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full" />

              {/* Rentang Harga */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-sm">Rentang Harga</h3>
                <div className="space-y-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
                    <input type="number" placeholder="Minimum" className="w-full h-10 pl-9 pr-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-brand transition-colors" />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
                    <input type="number" placeholder="Maksimum" className="w-full h-10 pl-9 pr-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-brand transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Header Control */}
            <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-sm text-gray-600">
                Menampilkan <span className="font-bold text-gray-900">20</span> kostum
              </h1>
              
              <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0">
                <span className="text-sm text-gray-500 font-medium whitespace-nowrap">Urutkan:</span>
                <div className="flex gap-1">
                  <Button variant="default" size="sm" className="bg-brand hover:bg-brand/90 text-white rounded-lg h-9 px-4 text-sm font-semibold">
                    Paling Relevan
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 rounded-lg h-9 px-4 text-sm font-medium">
                    Terbaru
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 rounded-lg h-9 px-4 text-sm font-medium">
                    Terlaris
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 rounded-lg h-9 px-4 text-sm font-medium">
                    Sedang Tren
                  </Button>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {[...MOCK_COST_LONG].map((costume, i) => (
                <CostumeCard key={`${costume.id}-${i}`} costume={costume} />
              ))}
            </div>
            
            {/* Load More */}
            <div className="pt-8 flex justify-center">
              <Button variant="outline" className="rounded-full px-12 font-bold text-brand border-brand/20 hover:bg-brand/5">
                Lihat Lebih Banyak
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// Simulated longer list for grid preview
const MOCK_COST_LONG = [
  ...MOCK_COSTUMES,
  ...MOCK_COSTUMES,
  ...MOCK_COSTUMES,
  ...MOCK_COSTUMES
].slice(0, 15);
