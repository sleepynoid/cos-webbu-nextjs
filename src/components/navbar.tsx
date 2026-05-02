"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 py-3 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <div className="text-2xl font-black text-brand tracking-tighter">Cosulagi<span className="text-xs font-normal align-top">.id</span></div>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl relative items-center">
          <Input 
            placeholder="Cari kostum..." 
            className="w-full bg-white border-gray-200 rounded-lg pr-24 h-10 shadow-sm focus-visible:ring-brand"
          />
          <Button className="absolute right-1 rounded-md h-8 bg-brand hover:bg-brand/90 px-4">
            <Search className="w-4 h-4 mr-2" />
            Cari
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-md border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-6 font-semibold">
            Masuk
          </Button>
          <Button className="rounded-md bg-brand hover:bg-brand/90 h-9 px-6 font-semibold">
            Daftar
          </Button>
        </div>
      </div>
    </nav>
  );
}
