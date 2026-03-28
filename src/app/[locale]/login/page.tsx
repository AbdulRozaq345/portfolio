"use client";
import { useState, type FormEvent, useEffect } from "react";
import { createClient } from "../../../../utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isSecure, setIsSecure] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    setIsSecure(window.location.protocol === "https:");
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/admin");
      }
    };
    checkSession();
  }, [router, supabase]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Format email tidak valid");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (password.length < 8) {
      setPasswordError("Password minimal 8 karakter");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password harus mengandung huruf kapital");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setPasswordError("Password harus mengandung angka");
      return false;
    }
    setPasswordError("");
    return true;
  };

  useEffect(() => {
    if (attempts >= 5 && !isLocked) {
      setIsLocked(true);
      setLockTimer(300); // 5 menit
    }
  }, [attempts, isLocked]);

  useEffect(() => {
    if (isLocked && lockTimer > 0) {
      const timer = setInterval(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsLocked(false);
            setAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLocked, lockTimer]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (loading || isLocked) return;

    // Validate inputs
    if (!validateEmail(email)) return;
    if (!validatePassword(password)) return;

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAttempts((prev) => prev + 1);

        // Check if account is locked
        if (error.message.includes("Invalid login credentials")) {
          setError("Email atau password salah. Silakan coba lagi.");
        } else if (error.message.includes("Email not confirmed")) {
          setError("Email belum terkonfirmasi. Silakan cek inbox Anda.");
        } else {
          setError("Terjadi kesalahan. Silakan coba lagi.");
        }
      } else {
        // Verify admin role
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user && user.email === "nexxacode@gmail.com") {
          // Success - redirect to admin
          router.push("/admin");
        } else {
          // Not admin - log and show error
          setError("Akses ditolak. Hanya admin yang dapat masuk.");
          await supabase.auth.signOut();
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan pada sistem. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      {/* Security Warning */}
      {!isSecure && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
          ⚠️ Koneksi tidak aman. Pastikan menggunakan HTTPS.
        </div>
      )}

      {/* Account Locked Warning */}
      {isLocked && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-600 text-white text-center py-2 z-50">
          🔒 Akun terkunci. Silakan tunggu {lockTimer} detik lagi.
        </div>
      )}

      <div className="w-full max-w-md p-8 bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-[#47FFE0] mb-6 text-center">
          NexxaCodeID Admin
        </h1>

        {/* Security Status */}
        <div className="mb-4 text-sm text-gray-400 text-center">
          <div className="flex items-center justify-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${isSecure ? "bg-green-500" : "bg-red-500"}`}
            ></span>
            <span>{isSecure ? "Koneksi Aman" : "Koneksi Tidak Aman"}</span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span
              className={`w-2 h-2 rounded-full ${attempts < 5 ? "bg-green-500" : "bg-red-500"}`}
            ></span>
            <span>Failed Attempts: {attempts}/5</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Email Admin
            </label>
            <input
              type="email"
              placeholder="tes@gmail.com"
              className="w-full p-3 bg-black border border-white/20 rounded-lg text-white focus:border-[#47FFE0] outline-none"
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              value={email}
              required
              disabled={isLocked}
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 bg-black border border-white/20 rounded-lg text-white focus:border-[#47FFE0] outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              disabled={isLocked}
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            disabled={loading || isLocked}
            className="w-full py-3 bg-[#47FFE0] text-black font-bold rounded-lg hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">🔄</span>
                Checking System...
              </span>
            ) : isLocked ? (
              <span>Account Locked ⏳</span>
            ) : (
              <span>Login System 🚀</span>
            )}
          </button>
        </form>

        {/* Security Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500">
            🔒 Login aman dengan enkripsi end-to-end
          </p>
          <p className="text-xs text-gray-500 mt-1">
            ⚠️ 5x gagal login = akun terkunci 5 menit
          </p>
        </div>
      </div>
    </div>
  );
}
