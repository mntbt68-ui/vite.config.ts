import { Link } from 'react-router';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white" id="contact">
      {/* Commercial License Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-right">
              <h3 className="font-cairo text-lg font-bold text-gold mb-1">
                السجل التجاري
              </h3>
              <p className="text-sm text-gray-400 font-ibm">
                شركة صحة وقيمة — مسؤولية محدودة
              </p>
              <p className="text-sm text-gray-400 font-ibm">
                الرقم الموحد: 7050624357
              </p>
            </div>
            <div className="w-48 h-auto bg-white rounded overflow-hidden">
              <img
                src="./assets/commercial-license.jpg"
                alt="السجل التجاري"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h2 className="font-cairo text-2xl font-bold text-gold mb-4">رابط</h2>
            <p className="text-sm text-gray-400 font-ibm leading-relaxed mb-6">
              المنصة الأولى في العالم العربي التي تربط بين المعلنين وأصحاب المنصات الرقمية. نسهل عليك التسويق الرقمي بكفاءة واحترافية.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/966501591481"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors font-ibm"
              >
                <Phone className="w-4 h-4" />
                <span dir="ltr">+966 50 159 1481</span>
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-400 font-ibm">
                <Mail className="w-4 h-4" />
                <span>info@rabiq.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 font-ibm">
                <MapPin className="w-4 h-4" />
                <span>المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-ibm text-base font-semibold text-gold mb-4">المنصة</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors font-ibm">الرئيسية</Link></li>
              <li><a href="/#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors font-ibm">كيف تعمل</a></li>
              <li><a href="/#solutions" className="text-sm text-gray-400 hover:text-white transition-colors font-ibm">الحلول</a></li>
              <li><Link to="/publishers" className="text-sm text-gray-400 hover:text-white transition-colors font-ibm">الشركات التسويقية</Link></li>
              <li><Link to="/advertisers" className="text-sm text-gray-400 hover:text-white transition-colors font-ibm">العملاء</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-ibm text-base font-semibold text-gold mb-4">الشركة</h3>
            <ul className="space-y-3">
              <li><Link to="/bank-info" className="text-sm text-gray-400 hover:text-white transition-colors font-ibm">معلومات الحساب</Link></li>
              <li><a href="/#testimonials" className="text-sm text-gray-400 hover:text-white transition-colors font-ibm">الشهادات</a></li>
              <li><Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors font-ibm">تسجيل الدخول</Link></li>
              <li><a href="/#contact" className="text-sm text-gray-400 hover:text-white transition-colors font-ibm">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-ibm text-base font-semibold text-gold mb-4">الدعم</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-ibm">مركز المساعدة</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-ibm">الشروط والأحكام</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-ibm">سياسة الخصوصية</a></li>
              <li>
                <a
                  href="https://wa.me/966501591481"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gold hover:text-gold-light transition-colors font-ibm font-semibold"
                >
                  تواصل عبر واتساب
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <p className="text-center text-sm text-gray-500 font-ibm">
            &copy; {new Date().getFullYear()} رابط. جميع الحقوق محفوظة. شركة صحة وقيمة — سجل تجاري رقم 7050624357
          </p>
        </div>
      </div>
    </footer>
  );
}
