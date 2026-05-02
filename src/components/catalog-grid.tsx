"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchCostumes } from "@/lib/api";
import { CostumeCard } from "@/components/costume-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function CatalogGrid() {
  const { data: costumes, isLoading } = useQuery({
    queryKey: ["costumes-featured"],
    queryFn: () => fetchCostumes(),
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">Terbaru</h2>
        <Link href="/katalog" className="text-brand text-sm font-semibold flex items-center hover:underline">
          Lihat Semua
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </Link>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {costumes?.map((c) => (
            <CostumeCard key={c.id} costume={c} />
          ))}
        </div>
      )}
    </div>
  );
}
