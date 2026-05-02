"use client";

import * as React from "react";
import { User, Lock, Eye, EyeOff, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[440px] p-8 rounded-3xl border-none shadow-2xl">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo Placeholder */}
          <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center">
            <span className="text-brand font-black text-2xl italic">C</span>
          </div>

          <div className="text-center space-y-1">
            <DialogTitle className="text-2xl font-bold text-gray-900">Masuk ke Akun</DialogTitle>
            <p className="text-sm text-gray-500">Gunakan email terdaftar kamu</p>
          </div>

          <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand transition-colors" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button type="button" className="text-xs text-gray-400 hover:text-brand">Lupa Password?</button>
            </div>

            <Button className="w-full h-12 bg-brand hover:bg-brand/90 text-white font-bold rounded-xl text-base shadow-lg shadow-brand/20">
              Masuk Sekarang
            </Button>
          </form>

          <div className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <button 
              onClick={onSwitchToRegister}
              className="text-brand font-bold hover:underline"
            >
              Daftar
            </button>
          </div>

          <div className="pt-4 border-t border-gray-100 w-full text-center">
             <button type="button" className="text-xs text-gray-400 hover:text-brand">
               Login sebagai rentalan, <span className="font-bold">klik disini</span>
             </button>
          </div>

          <div className="flex gap-4 text-[10px] text-gray-400">
            <span>Kebijakan Privasi</span>
            <span>•</span>
            <span>Syarat & Ketentuan</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
