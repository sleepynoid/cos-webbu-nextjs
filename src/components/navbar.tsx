"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoginModal } from "./auth/login-modal";
import { RegisterModal } from "./auth/register-modal";

export function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
      <nav className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-3xl font-black text-brand italic tracking-tighter">Cosulagi<span className="text-base font-normal align-top">.id</span></div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative group hidden md:block">
            <input 
              type="text" 
              placeholder="Cari kostum..." 
              className="w-full h-11 pl-4 pr-16 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
            />
            <button className="absolute right-1 top-1 bottom-1 px-5 rounded-full bg-brand text-white text-sm font-bold hover:bg-brand/90 transition-colors">
              Cari
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-brand transition-colors relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
            </button>
            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                className="text-brand font-bold hover:bg-brand/5 hidden sm:flex"
                onClick={openLogin}
              >
                Masuk
              </Button>
              <Button 
                className="bg-brand hover:bg-brand/90 text-white font-bold rounded-full px-6"
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
