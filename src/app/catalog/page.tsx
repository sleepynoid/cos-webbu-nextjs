"use client";

import { CostumeCard } from "@/components/costume-card";
import { MOCK_COSTUMES } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, ChevronDown, Calendar as CalendarIcon, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useCallback, Suspense } from "react";

function CatalogContent() {
  const [activeType, setActiveType] = useState("Semua");
  const [activeGender, setActiveGender] = useState("Semua");
  const [activeSeries, setActiveSeries] = useState("Semua");
  const [isCrossplay, setIsCrossplay] = useState(false);
  const [isHijab, setIsHijab] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [appliedPrice, setAppliedPrice] = useState({ min: "", max: "" });
  const [date, setDate] = useState<Date | undefined>();
  const [activeSort, setActiveSort] = useState("Paling Relevan");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initial Sync from URL
  useEffect(() => {
    const seriesParam = searchParams.get("series");
    const sortParam = searchParams.get("sort_by");
    const qParam = searchParams.get("q");
    const genderParam = searchParams.get("gender");

    if (seriesParam) setActiveSeries(seriesParam);
    if (qParam) setSearchQuery(qParam);
    if (genderParam) setActiveGender(genderParam === "male" ? "Pria" : "Wanita");
    if (sortParam) {
      if (sortParam === "newest") setActiveSort("Terbaru");
      if (sortParam === "best_match") setActiveSort("Paling Relevan");
    }
  }, []); // Run once on mount

  // Sync State to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeSeries !== "Semua") params.set("series", activeSeries);
    if (searchQuery) params.set("q", searchQuery);
    if (activeGender !== "Semua") params.set("gender", activeGender === "Pria" ? "male" : "female");
    if (activeSort === "Terbaru") params.set("sort_by", "newest");
    
    const query = params.toString();
    router.push(query ? `?${query}` : "/catalog", { scroll: false });
  }, [activeSeries, searchQuery, activeGender, activeSort, router]);

  const seriesList = useMemo(() => {
    const series = Array.from(new Set(MOCK_COSTUMES.map((c) => c.series))).sort();
    return ["Semua", ...series];
  }, []);

  const filteredCostumes = useMemo(() => {
    return MOCK_COSTUMES.filter((c) => {
      // Search Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matches = 
          c.name.toLowerCase().includes(query) || 
          c.character.toLowerCase().includes(query) || 
          c.series.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Type Filter
      if (activeType === "Sewa" && c.type !== "rental") return false;
      if (activeType === "Jual" && c.type !== "sale") return false;

      // Gender Filter
      if (activeGender === "Pria" && c.gender !== "Pria") return false;
      if (activeGender === "Wanita" && c.gender !== "Wanita") return false;

      // Series Filter
      if (activeSeries !== "Semua" && c.series !== activeSeries) return false;

      // Preferensi
      if (isCrossplay && !c.isCrossplayFriendly) return false;
      if (isHijab && !c.isHijabFriendly) return false;

      // Price Filter
      const min = parseInt(appliedPrice.min) || 0;
      const max = parseInt(appliedPrice.max) || Infinity;
      if (c.price < min || c.price > max) return false;

      return true;
    });
  }, [activeType, activeGender, activeSeries, isCrossplay, isHijab, appliedPrice, searchQuery]);

  const activeFilters = useMemo(() => {
    const chips = [];
    if (searchQuery) chips.push({ id: "search", label: `Cari: ${searchQuery}` });
    if (activeType !== "Semua") chips.push({ id: "type", label: `Tipe: ${activeType}` });
    if (activeGender !== "Semua") chips.push({ id: "gender", label: `Gender: ${activeGender}` });
    if (activeSeries !== "Semua") chips.push({ id: "series", label: `Series: ${activeSeries}` });
    if (isCrossplay) chips.push({ id: "crossplay", label: "Bisa Crossplay" });
    if (isHijab) chips.push({ id: "hijab", label: "Ramah Hijab" });
    if (date) chips.push({ id: "date", label: `Tanggal: ${format(date, "dd MMM yyyy", { locale: id })}` });
    if (appliedPrice.min || appliedPrice.max) {
      const minStr = appliedPrice.min ? `Rp${parseInt(appliedPrice.min).toLocaleString()}` : "0";
      const maxStr = appliedPrice.max ? `Rp${parseInt(appliedPrice.max).toLocaleString()}` : "∞";
      chips.push({ id: "price", label: `${minStr} - ${maxStr}` });
    }
    return chips;
  }, [activeType, activeGender, activeSeries, isCrossplay, isHijab, appliedPrice, date]);

  const removeFilter = (id: string) => {
    if (id === "search") setSearchQuery("");
    if (id === "type") setActiveType("Semua");
    if (id === "gender") setActiveGender("Semua");
    if (id === "series") setActiveSeries("Semua");
    if (id === "crossplay") setIsCrossplay(false);
    if (id === "hijab") setIsHijab(false);
    if (id === "date") setDate(undefined);
    if (id === "price") {
      setPriceRange({ min: "", max: "" });
      setAppliedPrice({ min: "", max: "" });
    }
  };

  return (
    <>
      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 space-y-6">
        {/* Top Search Bar - Matching cosulagi.id full-width placement */}
        <div className="w-full">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Cari produk, karakter, atau series..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-100 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all" 
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips row - Positioned between search and main content */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map((f) => (
              <div key={f.id} className="flex items-center gap-2 bg-brand/10 text-brand px-3 py-1 rounded-full text-sm font-medium">
                {f.label}
                <button onClick={() => removeFilter(f.id)} className="hover:bg-brand/20 rounded-full p-0.5 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button 
              onClick={() => {
                setActiveType("Semua");
                setActiveGender("Semua");
                setActiveSeries("Semua");
                setIsCrossplay(false);
                setIsHijab(false);
                setDate(undefined);
                setPriceRange({ min: "", max: "" });
                setAppliedPrice({ min: "", max: "" });
                setSearchQuery("");
              }}
              className="text-sm font-bold text-gray-500 hover:text-brand ml-1"
            >
              Hapus Semua
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block w-[280px] flex-shrink-0 sticky top-28 h-[calc(100vh-140px)] overflow-y-auto pr-2">
            <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6 space-y-8 mb-4">
              
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg text-gray-900">Filter</h2>
              </div>
              
              {/* Tipe Produk */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-sm">Tipe Produk</h3>
                <div className="flex flex-wrap gap-2">
                  {["Semua", "Sewa", "Jual"].map((t) => (
                    <Button 
                      key={t} 
                      variant={t === activeType ? "default" : "outline"} 
                      onClick={() => setActiveType(t)}
                      className={cn(
                        "h-9 px-5 rounded-lg text-sm font-semibold transition-all", 
                        t === activeType ? "bg-brand hover:bg-brand/90" : "border-gray-200 text-gray-700 hover:border-brand/30 hover:bg-brand/5"
                      )}
                    >
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
                    <Button 
                      key={t} 
                      variant={t === activeGender ? "default" : "outline"} 
                      onClick={() => setActiveGender(t)}
                      className={cn(
                        "h-9 px-5 rounded-lg text-sm font-semibold transition-all", 
                        t === activeGender ? "bg-brand hover:bg-brand/90" : "border-gray-200 text-gray-700 hover:border-brand/30 hover:bg-brand/5"
                      )}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full" />

              {/* Rentang Harga */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-sm">Rentang Harga</h3>
                <div className="space-y-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
                    <input 
                      type="number" 
                      placeholder="Minimum" 
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-brand transition-all" 
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
                    <input 
                      type="number" 
                      placeholder="Maksimum" 
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-brand transition-all" 
                    />
                  </div>
                  <Button 
                    variant="default" 
                    onClick={() => setAppliedPrice(priceRange)}
                    className="w-full mt-2 h-11 rounded-xl bg-brand hover:bg-brand/90 text-white font-bold flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    Cari Produk
                  </Button>
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full" />

              {/* Lokasi */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-sm">Lokasi</h3>
                {["Jabodetabek", "DKI Jakarta", "Pulau Jawa", "Bandung", "Surabaya"].map((loc) => (
                  <div key={loc} className="flex items-center space-x-3">
                    <Checkbox id={loc} className="w-4 h-4 rounded border-gray-300 data-[state=checked]:bg-brand" />
                    <label htmlFor={loc} className="text-sm font-medium text-gray-700 cursor-pointer">{loc}</label>
                  </div>
                ))}
                <button className="text-brand text-xs font-bold hover:underline">Lihat Selengkapnya &gt;</button>
              </div>

              <div className="h-px bg-gray-100 w-full" />

              {/* Series */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-sm">Series</h3>
                <div className="space-y-2">
                  {seriesList.map((s) => (
                    <button 
                      key={s} 
                      onClick={() => setActiveSeries(s)}
                      className={cn(
                        "w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all border",
                        activeSeries === s 
                          ? "bg-brand text-white border-brand shadow-md" 
                          : "bg-white text-gray-600 border-gray-200 hover:border-brand/30 hover:bg-brand/5"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full" />

              {/* Preferensi Kostum */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-sm">Preferensi Kostum</h3>
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="crossplay" 
                    checked={isCrossplay}
                    onCheckedChange={(val) => setIsCrossplay(!!val)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 data-[state=checked]:bg-brand data-[state=checked]:border-brand" 
                  />
                  <label htmlFor="crossplay" className="text-sm leading-tight cursor-pointer">
                    <span className="font-medium text-gray-900 block mb-0.5">Bisa Crossplay</span>
                    <span className="text-gray-500 text-xs">Kostum yang bisa dipakai lintas gender</span>
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="hijab" 
                    checked={isHijab}
                    onCheckedChange={(val) => setIsHijab(!!val)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 data-[state=checked]:bg-brand data-[state=checked]:border-brand" 
                  />
                  <label htmlFor="hijab" className="text-sm leading-tight cursor-pointer">
                    <span className="font-medium text-gray-900 block mb-0.5">Ramah Hijabcos</span>
                    <span className="text-gray-500 text-xs">Kostum yang nyaman dipakai dengan hijab</span>
                  </label>
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full" />

              {/* Tanggal Sewa */}
              <div className="space-y-3 pb-4">
                <h3 className="font-bold text-gray-900 text-sm">Tanggal Sewa</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className={cn(
                      "w-full h-11 px-4 rounded-xl border border-gray-200 text-sm flex items-center gap-3 transition-all outline-none",
                      "hover:border-brand/30 hover:bg-brand/5 focus:border-brand focus:ring-1 focus:ring-brand/20",
                      !date && "text-gray-400"
                    )}>
                      <CalendarIcon className={cn("w-4 h-4", date ? "text-brand" : "text-gray-400")} />
                      {date ? format(date, "dd MMM yyyy", { locale: id }) : "Pilih tanggal"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-2xl border-none shadow-2xl" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="bg-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {/* Header Control */}
            <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-sm text-gray-600">
                Menampilkan <span className="font-bold text-gray-900">{filteredCostumes.length}</span> kostum
              </h1>
              
              <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0">
                <span className="text-sm text-gray-500 font-medium whitespace-nowrap">Urutkan:</span>
                <div className="flex gap-1">
                  {["Paling Relevan", "Terbaru", "Terlaris", "Sedang Tren"].map((s) => (
                    <Button 
                      key={s}
                      variant={s === activeSort ? "default" : "ghost"} 
                      onClick={() => setActiveSort(s)}
                      className={cn(
                        "rounded-lg h-9 px-4 text-sm font-semibold transition-all",
                        s === activeSort ? "bg-brand hover:bg-brand/90 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      )}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid */}
            {filteredCostumes.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {filteredCostumes.map((costume, idx) => (
                  <CostumeCard key={costume.id} costume={costume} index={idx} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-20 text-center border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium italic">Tidak ada kostum yang cocok dengan filter kamu.</p>
                <Button 
                  variant="link" 
                  className="text-brand font-bold mt-2"
                  onClick={() => {
                    setActiveType("Semua");
                    setActiveGender("Semua");
                    setActiveSeries("Semua");
                    setIsCrossplay(false);
                    setIsHijab(false);
                    setPriceRange({ min: "", max: "" });
                  }}
                >
                  Hapus semua filter
                </Button>
              </div>
            )}
            
            {/* Load More */}
            {filteredCostumes.length > 30 && (
              <div className="pt-8 flex justify-center">
                <Button variant="outline" className="rounded-full px-12 font-bold text-brand border-brand/20 hover:bg-brand/5">
                  Lihat Lebih Banyak
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Memuat katalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
