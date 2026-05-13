import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  Copy, CheckCircle, CreditCard, Building2,
  Phone, MessageCircle, ChevronLeft
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const bankDetails = [
  { label: 'اسم الشركة', value: 'شركة صحة وقيمة' },
  { label: 'رقم الحساب', value: '221-618507-001' },
  { label: 'العملة', value: 'SAR - ريال سعودي' },
  { label: 'رقم الآيبان', value: 'SA2345000000221618507001' },
];

const steps = [
  'حدد ميزانيتك وفكرة حملتك ونشاطك التجاري',
  'احول المبلغ على الحساب البنكي أدناه',
  'صوّر إيصال التحويل',
  'راسلنا على واتساب مع الإيصال:',
  'سنتواصل معك خلال 24 ساعة لتأكيد الحملة',
];

export default function BankInfo() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="font-ibm">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-dark overflow-hidden">
        <div className="absolute inset-0">
          <img src="./assets/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-dark/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-gold mb-4">
              <Link to="/" className="hover:underline text-sm">الرئيسية</Link>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">معلومات الحساب</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-cairo text-4xl md:text-5xl font-bold text-white mb-6">
              معلومات حساب التحويل
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-gray-300 max-w-2xl">
              بعد ما تحدد ميزانيتك وفكرتك ونشاطك، حوّل المبلغ على الحساب التالي وراسلنا على الواتساب
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-4">
            {steps.map((step, idx) => (
              <motion.div key={idx} variants={fadeUp} className="flex items-start gap-4 bg-gray-50 p-5 border-r-4 border-gold">
                <div className="flex-shrink-0 w-8 h-8 bg-gold text-white font-cairo font-bold flex items-center justify-center">
                  {idx + 1}
                </div>
                <p className="text-dark font-ibm">{step}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-8 text-center">
            <a
              href="https://wa.me/966501591481"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-300 text-lg"
            >
              <MessageCircle className="w-6 h-6" />
              <span dir="ltr">+966 50 159 1481</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Bank Details */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
              <Building2 className="w-8 h-8 text-gold" />
              <h2 className="font-cairo text-3xl font-bold text-dark">تفاصيل الحساب البنكي</h2>
            </motion.div>
            <motion.p variants={fadeUp} className="text-gray-500">
              انسخ البيانات التالية واستخدمها في التحويل البنكي
            </motion.p>
          </motion.div>

          {/* Bank Card */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="bg-white shadow-lg overflow-hidden">
            {/* Bank Header */}
            <div className="bg-dark p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">اسم البنك</p>
                  <h3 className="font-cairo text-xl font-bold">البنك الأهلي السعودي</h3>
                </div>
                <CreditCard className="w-12 h-12 text-gold" />
              </div>
            </div>

            {/* Bank Info */}
            <div className="p-8">
              {bankDetails.map((item) => (
                <motion.div key={item.label} variants={fadeUp} className="flex items-center justify-between py-5 border-b border-gray-100 last:border-0 group">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{item.label}</p>
                    <p className="font-cairo text-lg font-semibold text-dark dir-ltr">{item.value}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.value, item.label)}
                    className="p-3 bg-gray-50 hover:bg-gold hover:text-white text-gray-400 transition-all duration-300 flex items-center gap-2"
                  >
                    {copiedField === item.label ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm">تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span className="text-sm">نسخ</span>
                      </>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Bank Image */}
            <div className="p-8 bg-gray-50 border-t">
              <p className="text-sm text-gray-500 mb-4">صورة من البيانات البنكية:</p>
              <img
                src="./assets/bank-account.jpg"
                alt="معلومات الحساب البنكي"
                className="w-full max-w-md mx-auto border"
              />
            </div>
          </motion.div>

          {/* Commercial License */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-12 bg-white shadow-lg overflow-hidden">
            <div className="bg-dark p-6 text-white">
              <h3 className="font-cairo text-xl font-bold flex items-center gap-3">
                <Building2 className="w-6 h-6 text-gold" />
                السجل التجاري
              </h3>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">الشركة</p>
                    <p className="font-cairo text-lg font-semibold text-dark">شركة صحة وقيمة</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">الرقم الموحد</p>
                    <p className="font-cairo text-lg font-semibold text-dark">7050624357</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">نوع الكيان</p>
                    <p className="text-dark">شركة ذات مسؤولية محدودة</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">حالة السجل</p>
                    <p className="text-green-600 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      نشط
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src="./assets/commercial-license.jpg"
                    alt="السجل التجاري"
                    className="w-full border"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-12 bg-gold p-8 text-center text-white">
            <motion.h3 variants={fadeUp} className="font-cairo text-2xl font-bold mb-4">
              هل تحتاج مساعدة؟
            </motion.h3>
            <motion.p variants={fadeUp} className="text-white/80 mb-6">
              إذا عندك أي استفسار أو تحتاج مساعدة في التحويل، تواصل معنا مباشرة
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/966501591481"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3 bg-white text-gold font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span>واتساب</span>
              </a>
              <a
                href="tel:+966501591481"
                className="inline-flex items-center gap-3 px-8 py-3 bg-dark text-white font-semibold hover:bg-dark-light transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                <span dir="ltr">+966 50 159 1481</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
