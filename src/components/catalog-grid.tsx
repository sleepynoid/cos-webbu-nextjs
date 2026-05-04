"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCostumes } from "@/lib/api";
import { CostumeCard } from "@/components/costume-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

interface CatalogGridProps {
  title: string;
  subtitle?: string;
  href?: string;
}

export function CatalogGrid({ title, subtitle, href }: CatalogGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: costumes, isLoading } = useQuery({
    queryKey: ["costumes-featured", title],
    queryFn: () => fetchCostumes(),
  });

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-4 group/carousel relative">
      {/* Section Header */}
      <div className="flex items-end justify-between border-b border-gray-100 pb-2">
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h2>
        </div>
        <Link href={href || "/catalog"} className="text-brand text-sm font-medium flex items-center hover:underline">
          Lihat Semua
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </Link>
      </div>

      {/* Carousel Container with Arrows */}
      <div className="relative">
        {/* Left Arrow */}
        <button 
          onClick={() => scroll("left")}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:flex hover:bg-gray-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:flex hover:bg-gray-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Horizontal Scrollable Grid */}
        {isLoading ? (
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-xl bg-gray-100 flex-shrink-0 w-[200px] md:w-[240px]" />
            ))}
          </div>
        ) : (
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          >
            {costumes?.map((c, idx) => (
              <div key={c.id} className="flex-shrink-0 w-[200px] md:w-[240px] snap-start">
                <CostumeCard costume={c} index={idx} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
