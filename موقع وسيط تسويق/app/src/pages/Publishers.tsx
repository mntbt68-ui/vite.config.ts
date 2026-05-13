import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  Globe, Megaphone, TrendingUp, DollarSign, Shield, Users,
  BarChart3, ChevronLeft, Check, Phone
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const benefits = [
  { icon: <DollarSign className="w-7 h-7" />, title: 'دخل إضافي', desc: 'استثمر مساحاتك الإعلانية وحقق دخلًا إضافيًا شهريًا متسقًا من محتواك الرقمي.' },
  { icon: <Shield className="w-7 h-7" />, title: 'حماية كاملة', desc: 'نضمن لك الحماية الكاملة لحقوقك ونتأكد من جودة الإعلانات المعروضة على منصتك.' },
  { icon: <BarChart3 className="w-7 h-7" />, title: 'تحليلات متقدمة', desc: 'احصل على تقارير مفصلة عن أداء إعلاناتك وأرباحك مع رسوم بيانية تفاعلية.' },
  { icon: <Users className="w-7 h-7" />, title: 'شبكة معلنين', desc: 'تواصل مع مئات المعلنين النشطين الذين يبحثون عن مساحات إعلانية مثل منصتك.' },
];

const pricingPlans = [
  {
    name: 'أساسي',
    price: 'مجاناً',
    period: '',
    features: ['3 مساحات إعلانية', 'تقارير شهرية', 'دعم عبر البريد', 'عمولة 15%'],
    recommended: false,
  },
  {
    name: 'احترافي',
    price: '199',
    period: 'ر.س/شهر',
    features: ['مساحات غير محدودة', 'تقارير يومية', 'دعم م priority', 'عمولة 10%', 'تحليلات متقدمة'],
    recommended: true,
  },
  {
    name: 'مؤسسي',
    price: '499',
    period: 'ر.س/شهر',
    features: ['كل مميزات الاحترافي', 'مدير حساب مخصص', 'API Access', 'عمولة 7%', 'تكامل مخصص'],
    recommended: false,
  },
];

const publisherTypes = [
  { icon: <Globe className="w-8 h-8" />, title: 'أصحاب المواقع', desc: 'استثمر مساحات الإعلانات على موقعك وحقق دخلاً من زياراتك.' },
  { icon: <Megaphone className="w-8 h-8" />, title: 'أصحاب المدونات', desc: 'حوّل محتواك إلى مصدر دخل من خلال الإعلانات المدمجة.' },
  { icon: <TrendingUp className="w-8 h-8" />, title: 'أصحاب قنوات التواصل', desc: 'استثمر قصصك ومنشوراتك في مساحات إعلانية.' },
  { icon: <Users className="w-8 h-8" />, title: 'أصحاب التطبيقات', desc: 'أدرج إعلانات داخل تطبيقك مع تحكم كامل.' },
];

export default function Publishers() {
  const [selectedPlan, setSelectedPlan] = useState(1);

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
              <span className="text-sm">الشركات التسويقية</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-cairo text-4xl md:text-5xl font-bold text-white mb-6">
              أعرض مساحتك الإعلانية
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-gray-300 max-w-2xl mb-8">
              هل تمتلك موقعاً، مدونة، أو قناة تواصل اجتماعي؟ انضم لشبكة رابط وابدأ بتحقيق دخل من مساحاتك الإعلانية مع مئات المعلنين النشطين.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link to="/login" className="px-8 py-4 bg-gold text-white font-semibold hover:bg-gold-light transition-colors duration-300">
                سجّل كناشر
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

      {/* Publisher Types */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-cairo text-3xl md:text-4xl font-bold text-dark mb-4">من يمكنه النشر؟</motion.h2>
            <motion.div variants={fadeUp} className="w-24 h-1 bg-gold mx-auto" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {publisherTypes.map((type) => (
              <motion.div key={type.title} variants={fadeUp} className="border border-gray-200 p-8 text-center hover:border-gold hover:shadow-lg transition-all duration-300 group">
                <div className="text-gold mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">{type.icon}</div>
                <h3 className="font-cairo text-lg font-semibold mb-3">{type.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{type.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-cairo text-3xl md:text-4xl font-bold text-dark mb-4">لماذا رابط للناشرين؟</motion.h2>
            <motion.div variants={fadeUp} className="w-24 h-1 bg-gold mx-auto" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <motion.div key={b.title} variants={fadeUp} className="bg-white border border-gray-200 p-8 flex gap-6 hover:border-t-gold hover:shadow-md transition-all duration-300">
                <div className="text-gold flex-shrink-0">{b.icon}</div>
                <div>
                  <h3 className="font-cairo text-lg font-semibold mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-cairo text-3xl md:text-4xl font-bold text-dark mb-4">خطط الأسعار</motion.h2>
            <motion.div variants={fadeUp} className="w-24 h-1 bg-gold mx-auto" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                onClick={() => setSelectedPlan(idx)}
                className={`border p-8 cursor-pointer transition-all duration-300 ${
                  plan.recommended
                    ? 'border-gold bg-dark text-white scale-105 shadow-xl'
                    : selectedPlan === idx
                    ? 'border-gold shadow-lg'
                    : 'border-gray-200 hover:border-gold'
                }`}
              >
                {plan.recommended && (
                  <div className="bg-gold text-white text-xs font-bold px-3 py-1 inline-block mb-4">
                    موصى به
                  </div>
                )}
                <h3 className={`font-cairo text-xl font-semibold mb-2 ${plan.recommended ? 'text-white' : 'text-dark'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`font-cairo text-4xl font-bold ${plan.recommended ? 'text-gold' : 'text-dark'}`}>{plan.price}</span>
                  {plan.period && <span className={`text-sm ${plan.recommended ? 'text-gray-400' : 'text-gray-500'}`}>{plan.period}</span>}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.recommended ? 'text-gold' : 'text-gold'}`} />
                      <span className={plan.recommended ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/login"
                  className={`block text-center mt-6 py-3 font-semibold transition-colors duration-300 ${
                    plan.recommended
                      ? 'bg-gold text-white hover:bg-gold-light'
                      : 'border border-current hover:bg-dark hover:text-white'
                  }`}
                >
                  ابدأ الآن
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gold">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-cairo text-3xl font-bold text-white mb-4">
              جاهز لتحقيق دخلك؟
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/80 mb-8">
              انضم لشبكة رابط كناشر اليوم وابدأ بتحقيق دخل من مساحاتك الإعلانية.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link to="/login" className="px-10 py-4 bg-dark text-white font-semibold hover:bg-dark-light transition-colors duration-300">
                سجّل مجاناً
              </Link>
              <a href="https://wa.me/966501591481" target="_blank" rel="noopener noreferrer"
                className="px-10 py-4 border border-white text-white font-semibold hover:bg-white hover:text-gold transition-colors duration-300 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                راسلنا
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
