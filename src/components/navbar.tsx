"use client";

import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoginModal } from "./auth/login-modal";
import { RegisterModal } from "./auth/register-modal";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const isCatalog = pathname === "/catalog";

  const openLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <>
      <nav className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 bg-white border-b border-gray-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)]"
      )}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="text-3xl font-black text-brand italic tracking-tighter">Cosulagi<span className="text-base font-normal align-top">.id</span></div>
          </Link>

          {/* Search Bar - Hidden on Catalog as requested to match live site search focus */}
          {!isCatalog && (
            <div className="flex-1 max-w-2xl relative group hidden md:block">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Cari kostum..." 
                  className="w-full h-10 pl-4 pr-4 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all text-sm"
                />
                <button className="h-10 px-5 rounded-lg bg-brand text-white text-sm font-bold hover:bg-brand/90 transition-colors flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Cari
                </button>
              </div>
            </div>
          )}

          {/* Empty spacer for catalog to align center search if needed, but live site catalog header is cleaner */}
          {isCatalog && <div className="flex-1 md:block hidden" />}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-brand transition-colors relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
            </button>
            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="text-gray-900 font-bold border-gray-200 hover:bg-gray-50 hidden sm:flex h-10 px-6 rounded-lg"
                onClick={openLogin}
              >
                Masuk
              </Button>
              <Button 
                className="bg-brand hover:bg-brand/90 text-white font-bold rounded-lg px-6 h-10"
                onClick={openRegister}
              >
                Daftar
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSwitchToRegister={openRegister}
      />
      <RegisterModal 
        isOpen={showRegister} 
        onClose={() => setShowRegister(false)} 
        onSwitchToLogin={openLogin}
      />
    </>
  );
}
