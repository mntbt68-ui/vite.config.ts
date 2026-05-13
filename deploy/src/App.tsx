import { useState, useRef, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, EyeOff, Lock, Shield, AlertCircle, CheckCircle2, 
  LayoutDashboard, Users, BarChart3, LogOut, Settings,
  ChevronLeft, Home, TrendingUp, DollarSign, ShoppingCart,
  MessageSquare, Bell, Search, Menu, X
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// ─────────────────────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "Sunset88@";
const LONG_PRESS_DURATION = 8000; // 8 seconds

// ─────────────────────────────────────────────────────────────
// HOOK: useLongPress
// ─────────────────────────────────────────────────────────────
function useLongPress({
  onLongPress,
  onCancel,
  duration = LONG_PRESS_DURATION,
  onProgress,
}: {
  onLongPress: () => void;
  onCancel?: () => void;
  duration?: number;
  onProgress?: (progress: number) => void;
}) {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPressing(false);
    setProgress(0);
  }, []);

  const start = useCallback(() => {
    setIsPressing(true);
    setProgress(0);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      onProgress?.(newProgress);
    }, 50);

    timerRef.current = setTimeout(() => {
      onLongPress();
      cleanup();
    }, duration);
  }, [duration, onLongPress, onProgress, cleanup]);

  const cancel = useCallback(() => {
    cleanup();
    onCancel?.();
  }, [cleanup, onCancel]);

  const handlers = {
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: cancel,
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  };

  return { isPressing, progress, handlers, start, cancel };
}

// ─────────────────────────────────────────────────────────────
// COMPONENT: AdminLoginPage
// ─────────────────────────────────────────────────────────────
function AdminLoginPage() {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTime = useRef<number>(0);

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

    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime.current;
      const newProgress = Math.min((elapsed / LONG_PRESS_DURATION) * 100, 100);
      setProgress(newProgress);
    }, 50);

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

      sessionStorage.setItem("admin_auth", "true");

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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-700/50 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <motion.div 
              className="mx-auto w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4"
              animate={isLongPressing ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              <Shield className="w-8 h-8 text-gold" />
            </motion.div>
            <CardTitle className="text-2xl font-cairo font-bold text-white">
              لوحة الإدارة
            </CardTitle>
            <CardDescription className="text-slate-400 font-ibm">
              منطقة آمنة للمشرفين فقط
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
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
                      flex flex-col items-center justify-center gap-3 overflow-hidden
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
                    {isLongPressing && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-32 h-32 -rotate-90">
                          <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="4" className="text-slate-700" />
                          <circle 
                            cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="4" 
                            strokeLinecap="round" className="text-gold transition-all duration-100"
                            strokeDasharray={`${2 * Math.PI * 60}`}
                            strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
                          />
                        </svg>
                      </div>
                    )}

                    <Lock className={`w-8 h-8 ${isLongPressing ? 'text-gold' : 'text-slate-500'} transition-colors relative z-10`} />
                    <p className={`text-sm font-ibm text-center px-4 relative z-10 ${isLongPressing ? 'text-gold' : 'text-slate-400'}`}>
                      {isLongPressing 
                        ? `استمر في الضغط... ${Math.ceil((LONG_PRESS_DURATION - (progress / 100) * LONG_PRESS_DURATION) / 1000)} ث` 
                        : "اضغط مطولاً على هذه المنطقة لفتح لوحة الإدارة"
                      }
                    </p>

                    {isLongPressing && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700 rounded-b-xl overflow-hidden">
                        <motion.div className="h-full bg-gold" style={{ width: `${progress}%` }} />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
                        onChange={(e) => { setPassword(e.target.value); setError(""); }}
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
                    onClick={() => { setShowLoginForm(false); setPassword(""); setError(""); }}
                    className="w-full text-slate-400 hover:text-slate-300 font-ibm"
                  >
                    إلغاء
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

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

        <p className="text-center text-slate-500 text-xs font-ibm mt-6">
          منطقة آمنة - الوصول مقتصر على المشرفين المعتمدين
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENT: AdminDashboardPage
// ─────────────────────────────────────────────────────────────
function AdminDashboardPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_auth") === "true";
    if (!isAuth) {
      toast.error("غير مصرح", { description: "يرجى تسجيل الدخول أولاً" });
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    toast.success("تم تسجيل الخروج");
    navigate("/admin");
  };

  const stats = [
    { title: "المستخدمين", value: "1,234", icon: Users, change: "+12%", color: "bg-blue-500/10 text-blue-400" },
    { title: "الزيارات", value: "45.2K", icon: TrendingUp, change: "+8%", color: "bg-green-500/10 text-green-400" },
    { title: "الطلبات", value: "892", icon: ShoppingCart, change: "+23%", color: "bg-gold/10 text-gold" },
    { title: "الإيرادات", value: "$12.4K", icon: DollarSign, change: "+15%", color: "bg-purple-500/10 text-purple-400" },
  ];

  const activities = [
    { action: "تسجيل دخول جديد", user: "أحمد محمد", time: "منذ 5 دقائق", type: "login", icon: LogOut },
    { action: "طلب جديد", user: "سارة علي", time: "منذ 12 دقيقة", type: "order", icon: ShoppingCart },
    { action: "تحديث محتوى", user: "خالد عمر", time: "منذ 30 دقيقة", type: "update", icon: Settings },
    { action: "تعليق جديد", user: "نورا سامي", time: "منذ ساعة", type: "comment", icon: MessageSquare },
  ];

  const menuItems = [
    { label: "الرئيسية", icon: Home, active: true },
    { label: "المستخدمين", icon: Users, active: false },
    { label: "التحليلات", icon: BarChart3, active: false },
    { label: "الطلبات", icon: ShoppingCart, active: false },
    { label: "الإعدادات", icon: Settings, active: false },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white" dir="rtl">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden text-slate-400" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-gold" />
            </div>
            <h1 className="font-cairo font-bold text-xl hidden sm:block">لوحة الإدارة</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-slate-400 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-400 hover:text-red-400 hover:bg-red-400/10 font-ibm">
              <LogOut className="w-4 h-4 ml-2" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="fixed inset-y-0 right-0 z-50 w-64 bg-slate-800 border-l border-slate-700 lg:hidden"
            >
              <div className="p-4 flex justify-between items-center border-b border-slate-700">
                <h2 className="font-cairo font-bold">القائمة</h2>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-ibm text-sm transition-colors ${
                      item.active ? 'bg-gold/10 text-gold' : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-slate-800/30 border-l border-slate-700 min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2 sticky top-20">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-ibm text-sm transition-colors ${
                  item.active ? 'bg-gold/10 text-gold' : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
                {item.active && <ChevronLeft className="w-4 h-4 mr-auto" />}
              </button>
            ))}
            <Separator className="my-4 bg-slate-700" />
            <div className="px-4 py-2">
              <p className="text-xs text-slate-500 font-ibm">الإصدار 1.0.0</p>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-cairo font-bold text-2xl">نظرة عامة</h2>
              <div className="flex items-center gap-2 text-sm text-slate-400 font-ibm">
                <span>آخر تحديث: الآن</span>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-slate-400 font-ibm text-sm">{stat.title}</p>
                          <p className="text-2xl font-cairo font-bold text-white mt-2">{stat.value}</p>
                          <Badge variant="outline" className="mt-2 bg-green-500/10 text-green-400 border-green-500/20 font-ibm text-xs">
                            {stat.change}
                          </Badge>
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-cairo text-lg">النشاط الأخير</CardTitle>
                  <Button variant="ghost" size="sm" className="text-gold font-ibm text-xs">
                    عرض الكل
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {activities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              activity.type === 'login' ? 'bg-blue-500/10 text-blue-400' :
                              activity.type === 'order' ? 'bg-green-500/10 text-green-400' :
                              activity.type === 'update' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-purple-500/10 text-purple-400'
                            }`}>
                              <activity.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-ibm text-white text-sm">{activity.action}</p>
                              <p className="font-ibm text-slate-400 text-xs">{activity.user}</p>
                            </div>
                          </div>
                          <span className="text-slate-500 text-xs font-ibm">{activity.time}</span>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="font-cairo text-lg">إحصائيات سريعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-ibm">
                      <span className="text-slate-400">معدل التحويل</span>
                      <span className="text-white">3.2%</span>
                    </div>
                    <Progress value={32} className="h-2 bg-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-ibm">
                      <span className="text-slate-400">الرضا</span>
                      <span className="text-white">94%</span>
                    </div>
                    <Progress value={94} className="h-2 bg-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-ibm">
                      <span className="text-slate-400">الأداء</span>
                      <span className="text-white">87%</span>
                    </div>
                    <Progress value={87} className="h-2 bg-slate-700" />
                  </div>
                  <Separator className="bg-slate-700" />
                  <div className="text-center">
                    <p className="text-3xl font-cairo font-bold text-gold">98.5%</p>
                    <p className="text-sm text-slate-400 font-ibm">نسبة التشغيل</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENT: HomePage
// ─────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <div className="w-24 h-24 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Shield className="w-12 h-12 text-gold" />
        </div>
        <h1 className="text-5xl font-cairo font-bold text-white mb-4">
          رابط
        </h1>
        <p className="text-xl text-slate-400 font-ibm mb-2">منصة التسويق الذكي</p>
        <p className="text-sm text-slate-500 font-ibm mb-8">الصفحة الرئيسية</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#/admin" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold hover:bg-gold-dark text-slate-900 font-cairo font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
          >
            <Lock className="w-4 h-4" />
            لوحة الإدارة
          </a>
          <button 
            onClick={() => toast.info("قريباً", { description: "الميزة قيد التطوير" })}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-cairo font-bold rounded-xl transition-all duration-300 border border-slate-700"
          >
            <Home className="w-4 h-4" />
            الموقع
          </button>
        </div>

        <div className="mt-12 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 max-w-md mx-auto">
          <p className="text-xs text-slate-500 font-ibm leading-relaxed">
            💡 <span className="text-gold">تلميح:</span> للوصول إلى لوحة الإدارة، اضغط مطولاً (8 ثوانٍ) على المنطقة الفارغة في صفحة تسجيل الدخول
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENT: App (Router)
// ─────────────────────────────────────────────────────────────
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </HashRouter>
  );
}

export default App;
