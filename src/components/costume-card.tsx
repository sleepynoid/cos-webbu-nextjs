"use client";

import { Costume } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

interface CostumeCardProps {
  costume: Costume;
}

export function CostumeCard({ costume }: CostumeCardProps) {
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer bg-white rounded-xl">
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image 
          src={costume.image} 
          alt={costume.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 leading-tight min-h-[2.5rem]">
          {costume.name}
        </h3>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-brand border-brand/30 bg-brand/5 text-[10px] px-1.5 py-0 rounded">
            Sewa
          </Badge>
          <div className="flex gap-1">
            {costume.size.map(s => (
              <Badge key={s} variant="outline" className="text-gray-500 border-gray-200 text-[10px] px-1.5 py-0 rounded">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-brand font-bold text-sm">
          Rp{costume.price.toLocaleString("id-ID")}
          <span className="text-gray-500 font-normal text-[11px] ml-1">/ 3 hari</span>
        </div>


      </CardContent>
    </Card>
  );
}
