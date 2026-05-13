import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'كيف تعمل', href: '/#how-it-works' },
  { label: 'الحلول', href: '/#solutions' },
  { label: 'الشركات', href: '/publishers' },
  { label: 'العملاء', href: '/advertisers' },
  { label: 'معلومات الحساب', href: '/bank-info' },
  { label: 'تواصل معنا', href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">
        <Link to="/" className="font-cairo text-2xl font-bold text-gold tracking-wide">
          رابط
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-ibm text-gray-700 hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://wa.me/966501591481"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-ibm text-gray-700 hover:text-gold transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span dir="ltr">+966 50 159 1481</span>
          </a>
          <Link
            to="/login"
            className="px-6 py-2 border border-black text-black text-sm font-ibm hover:bg-black hover:text-white transition-all duration-300"
          >
            تسجيل الدخول
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-ibm text-gray-700 hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/966501591481"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-ibm text-gray-700"
            >
              <Phone className="w-4 h-4" />
              <span dir="ltr">+966 50 159 1481</span>
            </a>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-center px-6 py-2 border border-black text-black text-sm font-ibm hover:bg-black hover:text-white transition-all duration-300"
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
