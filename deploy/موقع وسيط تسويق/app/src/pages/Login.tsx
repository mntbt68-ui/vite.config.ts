import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, UserPlus, ArrowRight } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'advertiser',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will show alert for now
    alert(isLogin ? 'جاري تسجيل الدخول...' : 'جاري إنشاء الحساب...');
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="absolute inset-0">
        <img src="./assets/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-dark/80" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="font-cairo text-4xl font-bold text-gold inline-block">
            رابط
          </Link>
          <p className="text-gray-400 mt-2 text-sm font-ibm">
            {isLogin ? 'سجّل دخولك للوصول لمنصتك' : 'أنشئ حسابك الجديد'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex mb-6 border-b border-gray-200">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-3 text-center font-ibm font-semibold text-sm transition-colors duration-300 ${
                isLogin ? 'text-gold border-b-2 border-gold' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-3 text-center font-ibm font-semibold text-sm transition-colors duration-300 ${
                !isLogin ? 'text-gold border-b-2 border-gold' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              حساب جديد
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-ibm text-gray-700 mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-dark placeholder:text-gray-400 focus:outline-none focus:border-gold transition-colors"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-ibm text-gray-700 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-dark placeholder:text-gray-400 focus:outline-none focus:border-gold transition-colors"
                placeholder="example@email.com"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-ibm text-gray-700 mb-1">رقم الجوال</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-dark placeholder:text-gray-400 focus:outline-none focus:border-gold transition-colors"
                  placeholder="05XXXXXXXX"
                  dir="ltr"
                />
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-ibm text-gray-700 mb-1">نوع الحساب</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-dark focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="advertiser">معلن (أبحث عن مساحات إعلانية)</option>
                  <option value="publisher">ناشر (أعرض مساحاتي الإعلانية)</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-ibm text-gray-700 mb-1">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-dark placeholder:text-gray-400 focus:outline-none focus:border-gold transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gold text-white font-semibold flex items-center justify-center gap-2 hover:bg-gold-light transition-colors duration-300"
            >
              {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
              {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
            </button>
          </form>

          {isLogin && (
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-gold hover:underline font-ibm">
                نسيت كلمة المرور؟
              </a>
            </div>
          )}
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-ibm">
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
