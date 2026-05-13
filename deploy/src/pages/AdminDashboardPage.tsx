import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
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
    { title: "المستخدمين", value: "1,234", icon: Users, change: "+12%" },
    { title: "الزيارات", value: "45.2K", icon: BarChart3, change: "+8%" },
    { title: "الطلبات", value: "892", icon: LayoutDashboard, change: "+23%" },
    { title: "الإيرادات", value: "$12.4K", icon: BarChart3, change: "+15%" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white" dir="rtl">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-gold" />
            </div>
            <h1 className="font-cairo font-bold text-xl">لوحة الإدارة</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-400 hover:bg-red-400/10"
            >
              <LogOut className="w-4 h-4 ml-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-cairo font-bold text-2xl mb-6">نظرة عامة</h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-gold/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-slate-400 font-ibm text-sm">{stat.title}</p>
                        <p className="text-2xl font-cairo font-bold text-white mt-2">{stat.value}</p>
                        <p className="text-green-400 text-xs font-ibm mt-1">{stat.change} من الشهر الماضي</p>
                      </div>
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-gold" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="font-cairo text-lg">النشاط الأخير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "تسجيل دخول جديد", user: "أحمد محمد", time: "منذ 5 دقائق", type: "login" },
                  { action: "طلب جديد", user: "سارة علي", time: "منذ 12 دقيقة", type: "order" },
                  { action: "تحديث محتوى", user: "خالد عمر", time: "منذ 30 دقيقة", type: "update" },
                  { action: "تعليق جديد", user: "نورا سامي", time: "منذ ساعة", type: "comment" },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'login' ? 'bg-blue-400' :
                        activity.type === 'order' ? 'bg-green-400' :
                        activity.type === 'update' ? 'bg-yellow-400' : 'bg-purple-400'
                      }`} />
                      <div>
                        <p className="font-ibm text-white text-sm">{activity.action}</p>
                        <p className="font-ibm text-slate-400 text-xs">{activity.user}</p>
                      </div>
                    </div>
                    <span className="text-slate-500 text-xs font-ibm">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
