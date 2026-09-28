"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Leaf } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const ok = login(username.trim(), password.trim());
    setLoading(false);
    if (ok) {
      router.replace("/");
    } else {
      setError("Username atau password salah.");
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      {/* Top green section */}
      <div className="bg-[#3CC63C] pt-16 pb-20 px-6 rounded-b-[48px] flex flex-col items-center">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-md">
          <Leaf className="w-8 h-8 text-[#3CC63C]" />
        </div>
        <h1 className="text-3xl font-bold text-white">Savebite</h1>
        <p className="text-white/70 text-sm mt-1">Kelola dapur, kurangi pemborosan</p>
      </div>

      {/* Login form card */}
      <div className="px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Masuk ke Akun</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4" autoComplete="off">
            {/* Username */}
            <div>
              <label htmlFor="sb-username" className="block text-xs font-semibold text-gray-500 mb-1.5">
                Username
              </label>
              <input
                id="sb-username"
                name="sb-username"
                type="text"
                inputMode="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#3CC63C] bg-white transition-colors"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="sb-password" className="block text-xs font-semibold text-gray-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="sb-password"
                  name="sb-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  autoComplete="new-password"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#3CC63C] bg-white transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="login-btn"
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-[#3CC63C] text-white font-bold text-base shadow-md hover:bg-[#2DB82D] active:scale-95 transition-all disabled:opacity-70 mt-2"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>

      {/* Hint */}
      <p className="text-center text-xs text-gray-400 mt-6 px-6">
        Gunakan <span className="font-semibold text-gray-600">username: user</span> dan{" "}
        <span className="font-semibold text-gray-600">password: user</span>
      </p>
    </div>
  );
}
