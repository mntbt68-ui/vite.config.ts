import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const ADMIN_PASSWORD = "Sunset88@";
const LONG_PRESS_DURATION = 8000; // 8 seconds

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number>(0);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  const startLongPress = useCallback(() => {
    setIsLongPressing(true);
    setProgress(0);
    startTime.current = Date.now();

    // Update progress every 50ms
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime.current;
      const newProgress = Math.min((elapsed / LONG_PRESS_DURATION) * 100, 100);
      setProgress(newProgress);
    }, 50);

    // Set timer for 8 seconds
    longPressTimer.current = setTimeout(() => {
      setShowLoginForm(true);
      setIsLongPressing(false);
      setProgress(100);
      if (progressInterval.current) clearInterval(progressInterval.current);

      toast.success("تم فتح نموذج تسجيل الدخول", {
        description: "يمكنك الآن إدخال كلمة المرور",
        duration: 3000,
      });
    }, LONG_PRESS_DURATION);
  }, []);

  const cancelLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    setIsLongPressing(false);
    setProgress(0);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast.success("تم تسجيل الدخول بنجاح!", {
        description: "جاري التوجيه إلى لوحة التحكم...",
        duration: 2000,
      });

      // Store auth state
      sessionStorage.setItem("admin_auth", "true");

      // Redirect after short delay
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    } else {
      setError("كلمة المرور غير صحيحة");
      toast.error("كلمة المرور غير صحيحة", {
        description: "يرجى المحاولة مرة أخرى",
        duration: 3000,
      });
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-700/50 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-gold" />
            </div>
            <CardTitle className="text-2xl font-cairo font-bold text-white">
              لوحة الإدارة
            </CardTitle>
            <CardDescription className="text-slate-400 font-ibm">
              منطقة آمنة للمشرفين فقط
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Hidden Area - Long Press Zone */}
            <AnimatePresence mode="wait">
              {!showLoginForm && !isAuthenticated && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`
                      relative w-full h-48 rounded-xl border-2 border-dashed 
                      transition-all duration-300 cursor-pointer select-none
                      flex flex-col items-center justify-center gap-3
                      ${isLongPressing 
                        ? 'border-gold bg-gold/10 scale-[0.98]' 
                        : 'border-slate-600 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'
                      }
                    `}
                    onMouseDown={startLongPress}
                    onMouseUp={cancelLongPress}
                    onMouseLeave={cancelLongPress}
                    onTouchStart={startLongPress}
                    onTouchEnd={cancelLongPress}
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    {/* Progress Ring */}
                    {isLongPressing && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-32 h-32 -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="60"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="text-slate-700"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="60"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            className="text-gold transition-all duration-100"
                            strokeDasharray={`${2 * Math.PI * 60}`}
                            strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
                          />
                        </svg>
                      </div>
                    )}

                    <Lock className={`w-8 h-8 ${isLongPressing ? 'text-gold' : 'text-slate-500'} transition-colors`} />
                    <p className={`text-sm font-ibm text-center px-4 ${isLongPressing ? 'text-gold' : 'text-slate-400'}`}>
                      {isLongPressing 
                        ? `استمر في الضغط... ${Math.ceil((LONG_PRESS_DURATION - (progress / 100) * LONG_PRESS_DURATION) / 1000)} ث` 
                        : "اضغط مطولاً على هذه المنطقة لفتح لوحة الإدارة"
                      }
                    </p>

                    {/* Linear Progress Bar */}
                    {isLongPressing && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700 rounded-b-xl overflow-hidden">
                        <motion.div 
                          className="h-full bg-gold"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form */}
            <AnimatePresence>
              {showLoginForm && !isAuthenticated && (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onSubmit={handlePasswordSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-ibm text-slate-300 block text-right">
                      كلمة المرور
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError("");
                        }}
                        placeholder="أدخل كلمة المرور..."
                        className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 pr-10 pl-10 text-right font-ibm"
                        dir="rtl"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-400 text-sm font-ibm bg-red-400/10 p-3 rounded-lg"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-dark text-slate-900 font-cairo font-bold py-5 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                  >
                    <Lock className="w-4 h-4 ml-2" />
                    تسجيل الدخول
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowLoginForm(false);
                      setPassword("");
                      setError("");
                    }}
                    className="w-full text-slate-400 hover:text-slate-300 font-ibm"
                  >
                    إلغاء
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Success State */}
            <AnimatePresence>
              {isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-8"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-white font-cairo font-bold text-lg">تم التحقق بنجاح</p>
                  <p className="text-slate-400 font-ibm text-sm">جاري التوجيه...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Footer hint */}
        <p className="text-center text-slate-500 text-xs font-ibm mt-6">
          منطقة آمنة - الوصول مقتصر على المشرفين المعتمدين
        </p>
      </div>
    </div>
  );
}
