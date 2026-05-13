import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  BarChart3, Target, Headphones,
  Quote, ChevronRight, Phone
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function AnimatedCounter({ end, duration = 2000 }: { end: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const numericEnd = parseInt(end.replace(/\D/g, ''));
  const suffix = end.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = numericEnd / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericEnd) { setCount(numericEnd); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, numericEnd, duration]);

  return <div ref={ref} className="font-cairo text-4xl md:text-5xl font-bold text-gold">{count.toLocaleString('ar-SA')}{suffix}</div>;
}

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

const partnerLogos = [
  { name: 'نور ديجيتال', color: '#c8a45c' },
  { name: 'رقم وكالة', color: '#666' },
  { name: 'ميديا بلس', color: '#888' },
  { name: 'تسويق بلس', color: '#aaa' },
  { name: 'أفينيو', color: '#c8a45c' },
  { name: 'ديجيتال هب', color: '#777' },
];

export default function Home() {
  return (
    <div className="font-ibm">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-dark overflow-hidden">
        <div className="absolute inset-0">
          <img src="./assets/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-dark/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
              <motion.h1 variants={fadeUp} className="font-cairo text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                سوق رقمي يجمع <span className="text-gold">المعلنين</span> بأصحاب المنصات
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-gray-300 leading-relaxed max-w-xl">
                رابط هي المنصة الأولى في العالم العربي التي تربط بين المعلنين الباحثين عن مساحات إعلانية وأصحاب المواقع والمدونات والمنصات الرقمية. ابدأ حملتك الإعلانية أو استأجر مساحتك في دقائق.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link to="/advertisers" className="px-8 py-4 bg-gold text-white font-semibold hover:bg-gold-light transition-colors duration-300">
                  ابدأ كمعلن
                </Link>
                <Link to="/publishers" className="px-8 py-4 border border-white text-white font-semibold hover:bg-white hover:text-dark transition-colors duration-300">
                  أعرض مساحتك
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <a href="https://wa.me/966501591481" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gold transition-colors" dir="ltr">
                  +966 50 159 1481
                </a>
              </motion.div>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="grid grid-cols-1 gap-6">
              {[
                { num: '10000+', label: 'منصة مسجلة' },
                { num: '500+', label: 'معلن نشط' },
                { num: '50M+', label: 'ظهور شهري' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 backdrop-blur border border-white/10 p-6 text-center">
                  <AnimatedCounter end={stat.num} />
                  <p className="text-white/70 text-sm mt-2 font-ibm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-cairo text-3xl md:text-4xl font-bold text-dark mb-4">كيف تعمل رابط</motion.h2>
            <motion.div variants={fadeUp} className="w-24 h-1 bg-gold mx-auto" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'سجّل حسابك', desc: 'أنشئ حسابك كمعلن أو ناشر في أقل من دقيقتين. لا يوجد رسوم اشتراك.' },
              { num: '02', title: 'اختر مساحتك', desc: 'تصفح آلاف المساحات الإعلانية المتاحة واختر ما يناسب جمهورك وهدفك.' },
              { num: '03', title: 'انطلق', desc: 'أطلق حملتك الإعلانية أو استأجر مساحتك وتابع أداءك في الوقت الفعلي.' },
            ].map((step) => (
              <motion.div key={step.num} variants={fadeUp} className="border border-gray-200 p-10 text-center hover:border-gold transition-colors duration-300 group">
                <div className="font-cairo text-6xl md:text-7xl font-bold text-gold/30 group-hover:text-gold transition-colors duration-300 mb-4">
                  {step.num}
                </div>
                <h3 className="font-cairo text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="solutions" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="font-cairo text-3xl md:text-4xl font-bold text-dark mb-6">حلول رابط للتسويق الرقمي</motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-6">
                نوفر لك كل ما تحتاجه لإدارة حملاتك الإعلانية أو استئجار مساحاتك بكفاءة واحترافية. منصتنا تدعمك بأدوات ذكية وتحليلات دقيقة.
              </motion.p>
              <motion.a variants={fadeUp} href="https://wa.me/966501591481" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-4 transition-all duration-300">
                تواصل معنا <ChevronRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img src="./assets/services.jpg" alt="لوحة التحكم" className="w-full border border-gray-200 shadow-lg" />
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <BarChart3 className="w-8 h-8" />, title: 'تحليلات ذكية', desc: 'تتبع أداء حملاتك في الوقت الفعلي مع تقارير مفصلة ورسوم بيانية تفاعلية.' },
              { icon: <Target className="w-8 h-8" />, title: 'استهداف دقيق', desc: 'وصل لجمهورك المستهدف بناءً على الاهتمامات، الموقع الجغرافي، والسلوك الرقمي.' },
              { icon: <Headphones className="w-8 h-8" />, title: 'دعم مخصص', desc: 'فريق دعم متخصص جاهز لمساعدتك على مدار الساعة في إدارة حملاتك.' },
            ].map((card) => (
              <motion.div key={card.title} variants={fadeUp} className="bg-white border border-gray-200 p-8 hover:border-t-gold hover:shadow-lg transition-all duration-300 group">
                <div className="text-gold mb-4 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                <h3 className="font-cairo text-lg font-semibold mb-3">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-dark overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 animate-drift" style={{
            background: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(255,255,255,0.03) 60px, rgba(255,255,255,0.03) 61px)'
          }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/10 animate-pulse-glow blur-3xl" />
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.h2 variants={fadeUp} className="font-cairo text-3xl md:text-5xl font-bold text-white mb-6">
            ابدأ رحلتك التسويقية اليوم
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-lg mb-8">
            انضم إلى آلاف المعلنين وأصحاب المنصات الذين يثقون برابط. التسجيل مجاني ويستغرق دقيقتين فقط.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <Link to="/advertisers" className="px-10 py-4 bg-gold text-white font-semibold hover:bg-gold-light transition-colors duration-300">
              سجّل كمعلن
            </Link>
            <Link to="/publishers" className="px-10 py-4 border border-white text-white font-semibold hover:bg-white hover:text-dark transition-colors duration-300">
              سجّل كناشر
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-cairo text-3xl md:text-4xl font-bold text-dark mb-4">ماذا يقول عملاؤنا</motion.h2>
            <motion.div variants={fadeUp} className="w-24 h-1 bg-gold mx-auto" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            {[
              { text: 'رابط غيّرت طريقة تفكيرنا في التسويق الرقمي. استطعنا الوصول لجمهورنا المستهدف بكفاءة عالية وتكلفة أقل بـ 40%.', name: 'أحمد الخالدي', role: 'مدير تسويق، شركة نور' },
              { text: 'كنت أبحث عن طريقة لاستثمار مساحات إعلانية على مدونتي. رابط وفرت لي منصة سهلة وموثوقة لتحقيق دخل إضافي.', name: 'سارة المنصوري', role: 'صاحبة مدونة "حياتي"' },
              { text: 'التحليلات المفصلة والدعم الممتاز جعلوا إدارة حملاتنا أسهل بكثير. أنصح كل مسوّق بتجربة رابط.', name: 'محمد العتيبي', role: 'مؤسس وكالة "رقم"' },
            ].map((t) => (
              <motion.div key={t.name} variants={fadeUp} className="bg-white border border-gray-200 p-8">
                <Quote className="w-10 h-10 text-gold mb-4" />
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-dark">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partners Marquee */}
      <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
        <h3 className="text-center font-cairo text-xl font-semibold text-dark mb-8">شركاؤنا</h3>
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee flex gap-16 items-center whitespace-nowrap">
            {[...partnerLogos, ...partnerLogos].map((logo, i) => (
              <div key={i} className="flex items-center justify-center px-8 py-4 border border-gray-200 min-w-[140px]">
                <span className="font-cairo text-lg font-semibold" style={{ color: logo.color }}>{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gold">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-cairo text-2xl md:text-3xl font-bold text-white mb-4">
              ابقَ على اطلاع
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/80 mb-8">
              اشترك في نشرتنا الإخبارية لتصلك أحدث Tips والأخبار من عالم التسويق الرقمي.
            </motion.p>
            <motion.form variants={fadeUp} onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-5 py-3 bg-white text-dark placeholder:text-gray-400 focus:outline-none"
              />
              <button type="submit" className="px-8 py-3 bg-dark text-white font-semibold hover:bg-dark-light transition-colors duration-300">
                اشترك
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
