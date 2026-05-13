import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  Target, BarChart3, Globe, Smartphone, Megaphone, MessageCircle,
  TrendingUp, Shield, Phone, ChevronLeft, Star, DollarSign
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const adTypes = [
  { icon: <Globe className="w-8 h-8" />, title: 'إعلانات المواقع', desc: 'أعلن على آلاف المواقع والمدونات العربية باستهداف دقيق حسب الجمهور والمحتوى.', price: 'من 50 ر.س' },
  { icon: <Smartphone className="w-8 h-8" />, title: 'إعلانات التطبيقات', desc: 'وصل لمستخدمي التطبيقات من خلال إعلانات مدمجة داخل التطبيقات المشهورة.', price: 'من 200 ر.س' },
  { icon: <Megaphone className="w-8 h-8" />, title: 'إعلانات السوشيال ميديا', desc: 'استثمر قصص ومنشورات أصحاب التأثير والصفحات الكبيرة للوصول لجمهور أوسع.', price: 'من 100 ر.س' },
  { icon: <MessageCircle className="w-8 h-8" />, title: 'إعلانات المحتوى المدفوع', desc: 'انشر محتوى مدفوع على المدونات والمواقع المتخصصة في مجالك.', price: 'من 150 ر.س' },
];

const benefits = [
  { icon: <Target className="w-7 h-7" />, title: 'استهداف دقيق', desc: 'استهدف جمهورك بناءً على الاهتمامات، العمر، الموقع الجغرافي، والسلوك الرقمي.' },
  { icon: <BarChart3 className="w-7 h-7" />, title: 'تحليلات فورية', desc: 'تتبع أداء حملاتك في الوقت الفعلي مع تقارير مفصلة ورسوم بيانية.' },
  { icon: <Shield className="w-7 h-7" />, title: 'حماية وحماية', desc: 'نضمن لك جودة المساحات الإعلانية وحماية حقوقك كمعلن.' },
  { icon: <TrendingUp className="w-7 h-7" />, title: 'عائد استثمار مضمون', desc: 'تابع تحويلاتك وقياساتك بدقة لتحقيق أقصى عائد من ميزانيتك.' },
  { icon: <DollarSign className="w-7 h-7" />, title: 'ميزانية مرنة', desc: 'حدد ميزانيتك بنفسك واضبطها حسب أداء الحملة في أي وقت.' },
  { icon: <Star className="w-7 h-7" />, title: 'مساحات مؤهلة', desc: 'جميع المساحات مؤهلة ومراجعة من فريقنا لضمان أعلى جودة.' },
];

const steps = [
  { num: '01', title: 'حدد هدفك', desc: 'اختر هدفك الإعلاني: زيارات، مبيعات، تسجيلات، أو وعي.' },
  { num: '02', title: 'استعرض المساحات', desc: 'تصفح آلاف المساحات الإعلانية وقارن بينها حسب السعر والجمهور.' },
  { num: '03', title: 'أنشئ حملتك', desc: 'صمم إعلانك وحدد ميزانيتك ومدة الحملة بخطوات بسيطة.' },
  { num: '04', title: 'تابع الأداء', desc: 'راقب أداء حملتك في الوقت الفعلي وقم بالتحسين المستمر.' },
];

export default function Advertisers() {
  const [budget, setBudget] = useState(1000);

  return (
    <div className="font-ibm">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-dark overflow-hidden">
        <div className="absolute inset-0">
          <img src="./assets/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-dark/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-gold mb-4">
              <Link to="/" className="hover:underline text-sm">الرئيسية</Link>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">العملاء</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-cairo text-4xl md:text-5xl font-bold text-white mb-6">
              أطلق حملتك الإعلانية
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-gray-300 max-w-2xl mb-8">
              وصل لجمهورك المستهدف من خلال آلاف المساحات الإعلانية على المواقع والمدونات وقنوات التواصل. حدد ميزانيتك وابدأ في دقائق.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link to="/login" className="px-8 py-4 bg-gold text-white font-semibold hover:bg-gold-light transition-colors duration-300">
                ابدأ حملتك
              </Link>
              <a href="https://wa.me/966501591481" target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 border border-white text-white font-semibold hover:bg-white hover:text-dark transition-colors duration-300 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                تواصل معنا
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Budget Calculator */}
      <section className="py-16 bg-gold">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-8">
            <motion.h2 variants={fadeUp} className="font-cairo text-2xl font-bold text-white mb-2">حاسبة الميزانية</motion.h2>
            <motion.p variants={fadeUp} className="text-white/80">حدد ميزانيتك واحصل على تقدير للنتائج المتوقعة</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white p-8 shadow-lg">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-ibm text-gray-700">الميزانية الشهرية</label>
                <span className="font-cairo text-2xl font-bold text-gold">{budget.toLocaleString('ar-SA')} ر.س</span>
              </div>
              <input
                type="range"
                min={100}
                max={50000}
                step={100}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>100 ر.س</span>
                <span>50,000 ر.س</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">الظهور المتوقع</p>
                <p className="font-cairo text-xl font-bold text-dark">{(budget * 15).toLocaleString('ar-SA')}+</p>
              </div>
              <div className="bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">النقرات المتوقعة</p>
                <p className="font-cairo text-xl font-bold text-dark">{(budget * 0.8).toLocaleString('ar-SA')}+</p>
              </div>
              <div className="bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">التحويلات المتوقعة</p>
                <p className="font-cairo text-xl font-bold text-dark">{(budget * 0.05).toFixed(0)}+</p>
              </div>
            </div>
            <Link to="/bank-info" className="block text-center mt-6 py-3 bg-gold text-white font-semibold hover:bg-gold-light transition-colors duration-300">
              انتقل لصفحة التحويل البنكي
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Ad Types */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-cairo text-3xl md:text-4xl font-bold text-dark mb-4">أنواع الإعلانات</motion.h2>
            <motion.div variants={fadeUp} className="w-24 h-1 bg-gold mx-auto" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-6">
            {adTypes.map((ad) => (
              <motion.div key={ad.title} variants={fadeUp} className="border border-gray-200 p-8 hover:border-gold hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-gold group-hover:scale-110 transition-transform duration-300">{ad.icon}</div>
                  <span className="bg-gold/10 text-gold text-sm font-bold px-3 py-1">{ad.price}</span>
                </div>
                <h3 className="font-cairo text-xl font-semibold mb-3">{ad.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{ad.desc}</p>
                <Link to="/login" className="inline-flex items-center gap-2 text-gold font-semibold mt-4 hover:gap-4 transition-all duration-300 text-sm">
                  ابدأ الآن <ChevronLeft className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-cairo text-3xl md:text-4xl font-bold text-dark mb-4">لماذا تعلن مع رابط؟</motion.h2>
            <motion.div variants={fadeUp} className="w-24 h-1 bg-gold mx-auto" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <motion.div key={b.title} variants={fadeUp} className="bg-white border border-gray-200 p-8 text-center hover:border-gold hover:shadow-md transition-all duration-300 group">
                <div className="text-gold mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">{b.icon}</div>
                <h3 className="font-cairo text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How to Advertise */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-cairo text-3xl md:text-4xl font-bold text-dark mb-4">كيف تبدأ إعلانك</motion.h2>
            <motion.div variants={fadeUp} className="w-24 h-1 bg-gold mx-auto" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <motion.div key={step.num} variants={fadeUp} className="border border-gray-200 p-8 text-center hover:border-gold transition-colors duration-300 group">
                <div className="font-cairo text-5xl font-bold text-gold/30 group-hover:text-gold transition-colors mb-4">
                  {step.num}
                </div>
                <h3 className="font-cairo text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-cairo text-3xl font-bold text-white mb-4">
              جاهز لتنطلق؟
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 mb-8">
              حدد ميزانيتك وفكرتك ونشاطك وسنتواصل معك لتنفيذ حملتك الإعلانية.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link to="/login" className="px-10 py-4 bg-gold text-white font-semibold hover:bg-gold-light transition-colors duration-300">
                ابدأ حملتك
              </Link>
              <a href="https://wa.me/966501591481" target="_blank" rel="noopener noreferrer"
                className="px-10 py-4 border border-white text-white font-semibold hover:bg-white hover:text-dark transition-colors duration-300 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                راسلنا عبر واتساب
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
