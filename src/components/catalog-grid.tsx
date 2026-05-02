"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCostumes } from "@/lib/api";
import { CostumeCard } from "@/components/costume-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface CatalogGridProps {
  title: string;
  subtitle?: string;
}

export function CatalogGrid({ title, subtitle }: CatalogGridProps) {
  const { data: costumes, isLoading } = useQuery({
    queryKey: ["costumes-featured", title],
    queryFn: () => fetchCostumes(),
  });

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-end justify-between border-b border-gray-100 pb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <Link href="/katalog" className="text-brand text-sm font-medium flex items-center hover:underline">
          Lihat Semua
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </Link>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {costumes?.map((c) => (
            <CostumeCard key={c.id} costume={c} />
          ))}
        </div>
      )}
    </div>
  );
}
