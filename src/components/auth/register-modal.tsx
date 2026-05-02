"use client";

import * as React from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px] p-8 rounded-3xl border-none shadow-2xl">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center">
            <span className="text-brand font-black text-2xl italic">C</span>
          </div>

          <div className="text-center space-y-1">
            <DialogTitle className="text-2xl font-bold text-gray-900">Buat Akun Baru</DialogTitle>
            <p className="text-sm text-gray-500">Bergabung dengan komunitas cosplay terbesar</p>
          </div>

          <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand transition-colors" />
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
              />
            </div>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand transition-colors" />
              <input
                type="email"
                placeholder="Email"
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Kata Sandi"
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
              {/* Strength Bars */}
              <div className="flex gap-1 px-1">
                <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
              </div>
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand transition-colors" />
              <input
                type="password"
                placeholder="Konfirmasi Kata Sandi"
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
              />
            </div>

            <div className="flex items-start gap-2 pt-2 px-1">
               <input type="checkbox" className="mt-1 accent-brand" />
               <p className="text-xs text-gray-500 leading-tight">
                 Saya setuju dengan <span className="text-brand font-semibold">Syarat & Ketentuan</span> dan <span className="text-brand font-semibold">Kebijakan Privasi</span> Cosulagi
               </p>
            </div>

            <Button className="w-full h-12 bg-brand hover:bg-brand/90 text-white font-bold rounded-xl text-base shadow-lg shadow-brand/20">
              Daftar
            </Button>
          </form>

          <div className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <button 
              onClick={onSwitchToLogin}
              className="text-brand font-bold hover:underline"
            >
              Masuk di sini
            </button>
          </div>

          <div className="pt-4 border-t border-gray-100 w-full text-center">
             <button type="button" className="text-xs text-gray-400 hover:text-brand">
               Mau login sebagai rentalan? <span className="font-bold">Kesini</span>
             </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
