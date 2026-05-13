import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  Users, Building2, DollarSign,
  Eye, Edit, Trash2, Search,
  Phone, MessageCircle, LogOut, LayoutDashboard,
  Megaphone, CreditCard
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

// Mock data
const stats = [
  { label: 'إجمالي العملاء', value: '156', change: '+12%', icon: <Users className="w-6 h-6" />, color: 'bg-blue-500' },
  { label: 'إجمالي الشركات', value: '89', change: '+8%', icon: <Building2 className="w-6 h-6" />, color: 'bg-green-500' },
  { label: 'الحملات النشطة', value: '234', change: '+23%', icon: <Megaphone className="w-6 h-6" />, color: 'bg-gold' },
  { label: 'إجمالي الإيرادات', value: '1.2M ر.س', change: '+18%', icon: <DollarSign className="w-6 h-6" />, color: 'bg-purple-500' },
];

const customers = [
  { id: 1, name: 'أحمد الخالدي', email: 'ahmed@noor.com', phone: '0501234567', budget: 15000, status: 'active', date: '2025-04-15' },
  { id: 2, name: 'سارة المنصوري', email: 'sara@hayati.com', phone: '0559876543', budget: 8000, status: 'active', date: '2025-04-20' },
  { id: 3, name: 'محمد العتيبي', email: 'mohammed@raqm.com', phone: '0561112233', budget: 25000, status: 'pending', date: '2025-05-01' },
  { id: 4, name: 'فاطمة الزهراني', email: 'fatima@design.com', phone: '0504445566', budget: 12000, status: 'active', date: '2025-05-05' },
  { id: 5, name: 'خالد السبيعي', email: 'khalid@tech.com', phone: '0537788990', budget: 5000, status: 'inactive', date: '2025-05-08' },
  { id: 6, name: 'نورة القحطاني', email: 'noura@fashion.com', phone: '0542233445', budget: 18000, status: 'active', date: '2025-05-10' },
  { id: 7, name: 'عبدالله الشمري', email: 'abdullah@food.com', phone: '0505566778', budget: 7000, status: 'pending', date: '2025-05-11' },
  { id: 8, name: 'ريم الحربي', email: 'reem@beauty.com', phone: '0553344556', budget: 22000, status: 'active', date: '2025-05-12' },
];

const companies = [
  { id: 1, name: 'مدونة حياتي', type: 'مدونة', owner: 'سارة المنصوري', ads: 45, revenue: 45000, status: 'active' },
  { id: 2, name: 'موقع نور التقني', type: 'موقع', owner: 'أحمد الناصر', ads: 78, revenue: 89000, status: 'active' },
  { id: 3, name: 'قناة التسويق', type: 'سوشيال', owner: 'خالد العمري', ads: 32, revenue: 23000, status: 'active' },
  { id: 4, name: 'مدونة الرحلات', type: 'مدونة', owner: 'نورة السالم', ads: 12, revenue: 8000, status: 'pending' },
  { id: 5, name: 'تطبيق صحتي', type: 'تطبيق', owner: 'فهد المطيري', ads: 56, revenue: 67000, status: 'active' },
  { id: 6, name: 'موقع الطبخ', type: 'موقع', owner: 'مها الدوسري', ads: 89, revenue: 120000, status: 'active' },
];

const transactions = [
  { id: 'TRX-001', customer: 'أحمد الخالدي', amount: 5000, type: 'إيداع', status: 'completed', date: '2025-05-12' },
  { id: 'TRX-002', customer: 'سارة المنصوري', amount: 3000, type: 'سحب', status: 'completed', date: '2025-05-11' },
  { id: 'TRX-003', customer: 'محمد العتيبي', amount: 10000, type: 'إيداع', status: 'pending', date: '2025-05-10' },
  { id: 'TRX-004', customer: 'فاطمة الزهراني', amount: 2500, type: 'إيداع', status: 'completed', date: '2025-05-09' },
  { id: 'TRX-005', customer: 'نورة القحطاني', amount: 6000, type: 'إيداع', status: 'completed', date: '2025-05-08' },
  { id: 'TRX-006', customer: 'خالد السبيعي', amount: 1500, type: 'سحب', status: 'cancelled', date: '2025-05-07' },
  { id: 'TRX-007', customer: 'عبدالله الشمري', amount: 3500, type: 'إيداع', status: 'pending', date: '2025-05-06' },
  { id: 'TRX-008', customer: 'ريم الحربي', amount: 8000, type: 'إيداع', status: 'completed', date: '2025-05-05' },
];

const campaigns = [
  { id: 1, name: 'حملة نور الصيف', customer: 'أحمد الخالدي', type: 'مواقع', budget: 5000, spent: 3200, clicks: 4500, impressions: 45000, status: 'active' },
  { id: 2, name: 'حملة حياتي', customer: 'سارة المنصوري', type: 'مدونة', budget: 3000, spent: 2100, clicks: 2800, impressions: 28000, status: 'active' },
  { id: 3, name: 'حملة رقم', customer: 'محمد العتيبي', type: 'سوشيال', budget: 10000, spent: 4500, clicks: 8900, impressions: 89000, status: 'active' },
  { id: 4, name: 'حملة صحتي', customer: 'فاطمة الزهراني', type: 'تطبيق', budget: 2500, spent: 1800, clicks: 2100, impressions: 21000, status: 'paused' },
  { id: 5, name: 'حملة الموضة', customer: 'نورة القحطاني', type: 'مواقع', budget: 6000, spent: 1200, clicks: 1500, impressions: 15000, status: 'active' },
];

type TabType = 'dashboard' | 'customers' | 'companies' | 'transactions' | 'campaigns';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogout, setShowLogout] = useState(false);

  const sidebarItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'customers', label: 'العملاء', icon: <Users className="w-5 h-5" /> },
    { id: 'companies', label: 'الشركات', icon: <Building2 className="w-5 h-5" /> },
    { id: 'campaigns', label: 'الحملات', icon: <Megaphone className="w-5 h-5" /> },
    { id: 'transactions', label: 'التعاملات', icon: <CreditCard className="w-5 h-5" /> },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      inactive: 'bg-gray-100 text-gray-600',
      paused: 'bg-orange-100 text-orange-700',
      cancelled: 'bg-red-100 text-red-700',
      completed: 'bg-green-100 text-green-700',
    };
    const labels: Record<string, string> = {
      active: 'نشط',
      pending: 'معلق',
      inactive: 'غير نشط',
      paused: 'متوقف',
      cancelled: 'ملغي',
      completed: 'مكتمل',
    };
    return <span className={`px-3 py-1 text-xs font-semibold ${styles[status] || 'bg-gray-100'}`}>{labels[status] || status}</span>;
  };

  const filteredCustomers = customers.filter(c =>
    c.name.includes(searchQuery) || c.email.includes(searchQuery) || c.phone.includes(searchQuery)
  );

  const filteredCompanies = companies.filter(c =>
    c.name.includes(searchQuery) || c.owner.includes(searchQuery)
  );

  const filteredTransactions = transactions.filter(t =>
    t.customer.includes(searchQuery) || t.id.includes(searchQuery)
  );

  const filteredCampaigns = campaigns.filter(c =>
    c.name.includes(searchQuery) || c.customer.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50 font-ibm" dir="rtl">
      {/* Sidebar */}
      <aside className="fixed top-0 right-0 h-full w-64 bg-dark text-white z-40 overflow-y-auto">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="font-cairo text-2xl font-bold text-gold">رابط</Link>
          <p className="text-gray-400 text-xs mt-1">لوحة التحكم</p>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-ibm transition-colors duration-300 ${
                activeTab === item.id ? 'bg-gold text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 right-0 left-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center font-cairo font-bold">
              أ
            </div>
            <div>
              <p className="text-sm font-semibold">المدير</p>
              <p className="text-xs text-gray-400">admin@rabiq.com</p>
            </div>
          </div>
          <button
            onClick={() => setShowLogout(!showLogout)}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            تسجيل خروج
          </button>
          {showLogout && (
            <div className="mt-2 bg-white/10 p-3">
              <p className="text-xs text-gray-400 mb-2">هل أنت متأكد؟</p>
              <Link to="/" className="block text-center text-xs bg-red-500 text-white py-2 hover:bg-red-600 transition-colors">
                نعم، خروج
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="mr-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-cairo text-xl font-bold text-dark">
              {sidebarItems.find(i => i.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/966501591481" target="_blank" rel="noopener noreferrer"
              className="p-2 bg-green-500 text-white hover:bg-green-600 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="tel:+966501591481" className="p-2 bg-gold text-white hover:bg-gold-dark transition-colors">
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </header>

        <div className="p-8">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              {/* Stats */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                  <motion.div key={stat.label} variants={fadeUp} className="bg-white border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.color} text-white p-3`}>{stat.icon}</div>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1">{stat.change}</span>
                    </div>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                    <p className="font-cairo text-2xl font-bold text-dark">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <motion.div variants={fadeUp} className="bg-white border border-gray-200 p-6">
                  <h3 className="font-cairo text-lg font-semibold mb-6">الإيرادات الشهرية</h3>
                  <div className="space-y-3">
                    {['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'].map((month, idx) => {
                      const values = [150000, 180000, 220000, 280000, 350000];
                      const max = Math.max(...values);
                      return (
                        <div key={month} className="flex items-center gap-4">
                          <span className="text-sm text-gray-500 w-16">{month}</span>
                          <div className="flex-1 bg-gray-100 h-8 relative">
                            <div
                              className="absolute top-0 right-0 h-full bg-gold transition-all duration-500"
                              style={{ width: `${(values[idx] / max) * 100}%` }}
                            />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-semibold">
                              {(values[idx] / 1000).toFixed(0)}K
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="bg-white border border-gray-200 p-6">
                  <h3 className="font-cairo text-lg font-semibold mb-6">توزيع الحملات</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'مواقع', value: 45, color: 'bg-blue-500' },
                      { label: 'مدونات', value: 25, color: 'bg-green-500' },
                      { label: 'سوشيال', value: 20, color: 'bg-gold' },
                      { label: 'تطبيقات', value: 10, color: 'bg-purple-500' },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.label}</span>
                          <span>{item.value}%</span>
                        </div>
                        <div className="bg-gray-100 h-6">
                          <div className={`${item.color} h-full transition-all duration-500`} style={{ width: `${item.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Recent */}
              <div className="grid lg:grid-cols-2 gap-6">
                <motion.div variants={fadeUp} className="bg-white border border-gray-200">
                  <div className="p-6 border-b">
                    <h3 className="font-cairo text-lg font-semibold">أحدث العملاء</h3>
                  </div>
                  <div className="divide-y">
                    {customers.slice(0, 5).map((c) => (
                      <div key={c.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gold/10 text-gold flex items-center justify-center font-cairo font-bold">
                            {c.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{c.name}</p>
                            <p className="text-xs text-gray-400">{c.email}</p>
                          </div>
                        </div>
                        {getStatusBadge(c.status)}
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="bg-white border border-gray-200">
                  <div className="p-6 border-b">
                    <h3 className="font-cairo text-lg font-semibold">أحدث التعاملات</h3>
                  </div>
                  <div className="divide-y">
                    {transactions.slice(0, 5).map((t) => (
                      <div key={t.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                        <div>
                          <p className="font-semibold text-sm">{t.customer}</p>
                          <p className="text-xs text-gray-400">{t.id} — {t.date}</p>
                        </div>
                        <div className="text-left">
                          <p className="font-cairo font-semibold text-gold">{t.amount.toLocaleString('ar-SA')} ر.س</p>
                          {getStatusBadge(t.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Customers */}
          {activeTab === 'customers' && (
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="bg-white border border-gray-200">
                <div className="p-6 border-b flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <h3 className="font-cairo text-lg font-semibold">قائمة العملاء</h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="بحث..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold w-64"
                      />
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-right font-semibold">العميل</th>
                        <th className="px-6 py-4 text-right font-semibold">التواصل</th>
                        <th className="px-6 py-4 text-right font-semibold">الميزانية</th>
                        <th className="px-6 py-4 text-right font-semibold">الحالة</th>
                        <th className="px-6 py-4 text-right font-semibold">تاريخ التسجيل</th>
                        <th className="px-6 py-4 text-right font-semibold">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredCustomers.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gold/10 text-gold flex items-center justify-center font-cairo font-bold text-sm">
                                {c.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold">{c.name}</p>
                                <p className="text-xs text-gray-400">{c.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">{c.phone}</td>
                          <td className="px-6 py-4 font-cairo font-semibold">{c.budget.toLocaleString('ar-SA')} ر.س</td>
                          <td className="px-6 py-4">{getStatusBadge(c.status)}</td>
                          <td className="px-6 py-4 text-gray-500">{c.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button className="p-2 text-blue-500 hover:bg-blue-50 transition-colors"><Eye className="w-4 h-4" /></button>
                              <button className="p-2 text-gray-500 hover:bg-gray-100 transition-colors"><Edit className="w-4 h-4" /></button>
                              <button className="p-2 text-red-500 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Companies */}
          {activeTab === 'companies' && (
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="bg-white border border-gray-200">
                <div className="p-6 border-b flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <h3 className="font-cairo text-lg font-semibold">قائمة الشركات</h3>
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="بحث..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold w-64"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-right font-semibold">الشركة</th>
                        <th className="px-6 py-4 text-right font-semibold">النوع</th>
                        <th className="px-6 py-4 text-right font-semibold">المالك</th>
                        <th className="px-6 py-4 text-right font-semibold">الإعلانات</th>
                        <th className="px-6 py-4 text-right font-semibold">الإيرادات</th>
                        <th className="px-6 py-4 text-right font-semibold">الحالة</th>
                        <th className="px-6 py-4 text-right font-semibold">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredCompanies.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold">{c.name}</td>
                          <td className="px-6 py-4">{c.type}</td>
                          <td className="px-6 py-4">{c.owner}</td>
                          <td className="px-6 py-4">{c.ads}</td>
                          <td className="px-6 py-4 font-cairo font-semibold text-gold">{c.revenue.toLocaleString('ar-SA')} ر.س</td>
                          <td className="px-6 py-4">{getStatusBadge(c.status)}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button className="p-2 text-blue-500 hover:bg-blue-50 transition-colors"><Eye className="w-4 h-4" /></button>
                              <button className="p-2 text-gray-500 hover:bg-gray-100 transition-colors"><Edit className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Campaigns */}
          {activeTab === 'campaigns' && (
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="bg-white border border-gray-200">
                <div className="p-6 border-b flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <h3 className="font-cairo text-lg font-semibold">الحملات الإعلانية</h3>
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="بحث..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold w-64"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-right font-semibold">الحملة</th>
                        <th className="px-6 py-4 text-right font-semibold">العميل</th>
                        <th className="px-6 py-4 text-right font-semibold">النوع</th>
                        <th className="px-6 py-4 text-right font-semibold">الميزانية</th>
                        <th className="px-6 py-4 text-right font-semibold">المصروف</th>
                        <th className="px-6 py-4 text-right font-semibold">النقرات</th>
                        <th className="px-6 py-4 text-right font-semibold">الحالة</th>
                        <th className="px-6 py-4 text-right font-semibold">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredCampaigns.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold">{c.name}</td>
                          <td className="px-6 py-4">{c.customer}</td>
                          <td className="px-6 py-4">{c.type}</td>
                          <td className="px-6 py-4 font-cairo font-semibold">{c.budget.toLocaleString('ar-SA')} ر.س</td>
                          <td className="px-6 py-4 font-cairo">{c.spent.toLocaleString('ar-SA')} ر.س</td>
                          <td className="px-6 py-4">{c.clicks.toLocaleString('ar-SA')}</td>
                          <td className="px-6 py-4">{getStatusBadge(c.status)}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button className="p-2 text-blue-500 hover:bg-blue-50 transition-colors"><Eye className="w-4 h-4" /></button>
                              <button className="p-2 text-gray-500 hover:bg-gray-100 transition-colors"><Edit className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Transactions */}
          {activeTab === 'transactions' && (
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="bg-white border border-gray-200">
                <div className="p-6 border-b flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <h3 className="font-cairo text-lg font-semibold">سجل التعاملات</h3>
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="بحث..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold w-64"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-right font-semibold">الرقم</th>
                        <th className="px-6 py-4 text-right font-semibold">العميل</th>
                        <th className="px-6 py-4 text-right font-semibold">المبلغ</th>
                        <th className="px-6 py-4 text-right font-semibold">النوع</th>
                        <th className="px-6 py-4 text-right font-semibold">التاريخ</th>
                        <th className="px-6 py-4 text-right font-semibold">الحالة</th>
                        <th className="px-6 py-4 text-right font-semibold">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredTransactions.map((t) => (
                        <tr key={t.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-mono text-xs">{t.id}</td>
                          <td className="px-6 py-4">{t.customer}</td>
                          <td className="px-6 py-4 font-cairo font-semibold text-gold">{t.amount.toLocaleString('ar-SA')} ر.س</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-semibold ${t.type === 'إيداع' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                              {t.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{t.date}</td>
                          <td className="px-6 py-4">{getStatusBadge(t.status)}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button className="p-2 text-blue-500 hover:bg-blue-50 transition-colors"><Eye className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
