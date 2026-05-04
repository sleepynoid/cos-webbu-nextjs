"use client";

import { Costume } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface CostumeCardProps {
  costume: Costume;
  index?: number;
}

export function CostumeCard({ costume, index = 0 }: CostumeCardProps) {
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer bg-white rounded-xl flex flex-col">
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={costume.image}
          alt={costume.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
          priority={index < 5}
        />
      </div>

      {/* Content Section */}
      <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 leading-tight min-h-[2.5rem] mb-2">
            {costume.name}
          </h3>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-brand border-brand/30 bg-brand/5 text-[10px] px-1.5 py-0 rounded">
              {costume.type === "rental" ? "Sewa" : "Jual"}
            </Badge>
            <Badge variant="outline" className="text-gray-500 border-gray-200 text-[10px] px-1.5 py-0 rounded">
              {costume.size}
            </Badge>
          </div>
        </div>

        <div className="text-brand font-bold text-sm pt-2 border-t border-gray-50">
          Rp{costume.price.toLocaleString("id-ID")}
          {costume.type === "rental" && (
            <span className="text-gray-500 font-normal text-[11px] ml-1">/ {costume.rentalDurationDays} hari</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
