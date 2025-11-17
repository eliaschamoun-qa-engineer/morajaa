
"use client";
import { StarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { carDealers, realEstate, brokers } from '../data/businesses';
import Link from 'next/link';

// Helper function to generate slug from business name
function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export default function Home() {
  const [search, setSearch] = useState('');
  // Combine all businesses
  const allBusinesses = [
    ...realEstate.map(b => ({ ...b, type: 'realEstate', rating: 4.8 })),
    ...carDealers.map(b => ({ ...b, type: 'carDealer', rating: 4.5 })),
    ...brokers.map(b => ({ ...b, type: 'broker', rating: 4.6 })),
  ];

  // Filter by type
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'realEstate', 'carDealer', 'broker'

  let filtered = allBusinesses;
  if (typeFilter !== 'all') {
    filtered = filtered.filter(b => b.type === typeFilter);
  }
  if (search.trim()) {
    filtered = filtered.filter(b =>
      b.ar.includes(search) || b.en.toLowerCase().includes(search.toLowerCase())
    );
  }

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="/" title="الصفحة الرئيسية">
              <span className="inline-flex items-center justify-center bg-gray-50 border border-gray-200 rounded-full p-1 shadow">
                <img src="/morajaa.jfif" alt="Morajaa Logo" className="h-12 w-auto rounded-full hover:scale-105 transition-transform duration-200" />
              </span>
            </a>
            <h1 className="text-3xl font-bold text-blue-600">مراجعة</h1>
          </div>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition duration-300 px-4">الميزات</a>
            <span className="hidden md:inline-block w-2"></span>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition duration-300 px-4">كيف يعمل</a>
            <span className="hidden md:inline-block w-2"></span>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition duration-300 px-4">تواصل معنا</a>
          </nav>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="فتح القائمة"
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            </button>
            {/* Mobile Menu Dropdown */}
            {menuOpen && (
              <div className="absolute top-16 right-6 bg-white border border-gray-200 rounded-lg shadow-lg py-4 px-8 z-50 flex flex-col items-end min-w-[180px]">
                <a href="#features" className="block py-3 px-4 text-gray-700 hover:text-blue-600 font-bold w-full text-right" onClick={() => setMenuOpen(false)}>الميزات</a>
                <div className="w-full h-px bg-gray-100 my-1" />
                <a href="#how-it-works" className="block py-3 px-4 text-gray-700 hover:text-blue-600 font-bold w-full text-right" onClick={() => setMenuOpen(false)}>كيف يعمل</a>
                <div className="w-full h-px bg-gray-100 my-1" />
                <a href="#contact" className="block py-3 px-4 text-gray-700 hover:text-blue-600 font-bold w-full text-right" onClick={() => setMenuOpen(false)}>تواصل معنا</a>
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <Link href="/add-review">
              <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300">
                أضف تقييمك
              </button>
            </Link>
          </div>
          {/* Mobile Add Review Button */}
          <div className="md:hidden ms-2">
            <Link href="/add-review">
              <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 text-sm">
                أضف تقييمك
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 text-center">
        {/* Hero Section */}
        <section className="flex flex-col items-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
            منصتك الأولى للتقييمات الموثوقة والصادقة
          </h2>
          <p className="text-gray-600 text-xl mb-8 max-w-3xl">
            منصة "مراجعة" هي دليلك الأول لاتخاذ قرارات أفضل. ابحث، قارن، وشارك تجربتك مع جميع أنواع الشركات والخدمات في لبنان، بما في ذلك المطورين العقاريين، تجار السيارات، الوسطاء العقاريين، والمزيد قريباً.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl relative">
            <input
              type="text"
              style={{ color: 'black', fontSize: '16px', paddingLeft: '48px', paddingRight: '16px', height: '48px', borderWidth: '2px', borderColor: '#E5E7EB', borderRadius: '9999px', outline: 'none', transition: 'border-color 0.3s ease-in-out' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث عن شركة أو مطور عقاري أو وسيط عقاري..."
              className="w-full py-4 px-6 pe-16 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 transition duration-300"
            />
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <StarIcon className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </section>

        {/* Businesses Section */}
        <section id="features" className="py-20">
          <h3 className="text-3xl font-bold text-gray-800 mb-12">
            جميع الشركات
          </h3>
          <div className="flex justify-center gap-4 mb-8">
            <button
              className={`px-6 py-2 rounded-full font-bold border transition duration-200 ${typeFilter === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600'}`}
              onClick={() => setTypeFilter('all')}
            >
              الكل
            </button>
            <button
              className={`px-6 py-2 rounded-full font-bold border transition duration-200 ${typeFilter === 'realEstate' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-green-600 border-green-600'}`}
              onClick={() => setTypeFilter('realEstate')}
            >
              مطور عقاري
            </button>
            <button
              className={`px-6 py-2 rounded-full font-bold border transition duration-200 ${typeFilter === 'carDealer' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-indigo-600 border-indigo-600'}`}
              onClick={() => setTypeFilter('carDealer')}
            >
              تاجر سيارات
            </button>
            <button
              className={`px-6 py-2 rounded-full font-bold border transition duration-200 ${typeFilter === 'broker' ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-yellow-600 border-yellow-600'}`}
              onClick={() => setTypeFilter('broker')}
            >
              وسيط عقاري
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.length === 0 ? (
              <div className="col-span-3 text-gray-500 text-xl">لا توجد شركات مطابقة للبحث.</div>
            ) : (
              filtered.map((b, idx) => (
                <Link
                  key={b.en + idx}
                  href={`/businesses/${generateSlug(b.en)}`}
                  className="bg-white rounded-lg shadow-lg p-6 text-right transform hover:-translate-y-2 hover:shadow-xl transition duration-300 block cursor-pointer"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className={
                        b.type === 'realEstate'
                          ? 'bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full'
                          : b.type === 'carDealer'
                          ? 'bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full'
                          : 'bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full'
                      }
                    >
                      {b.type === 'realEstate'
                        ? 'مطور عقاري'
                        : b.type === 'carDealer'
                        ? 'تاجر سيارات'
                        : 'وسيط عقاري'}
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-500 font-bold text-lg ms-1">{b.rating}</span>
                      <StarIcon className="h-6 w-6 text-yellow-400" />
                    </div>
                  </div>
                  {/* Profile picture for brokers, left under stars */}
                  {b.type === 'broker' && (
                    <div className="flex justify-start mb-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-yellow-400 ms-2">
                        {/* Replace src with actual image path if available */}
                        <img
                          src="/profile-placeholder.png"
                          alt={b.ar}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <h4 className="text-xl font-bold mb-2">{b.ar}</h4>
                  <p className="text-gray-600">{b.en}</p>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white rounded-lg shadow-md">
          <h3 className="text-3xl font-bold text-gray-800 mb-12">
            كيف تعمل منصة "مراجعة"؟
          </h3>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-6 mb-4">
                <StarIcon className="h-10 w-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">ابحث وقارن</h4>
              <p className="text-gray-600">استخدم محرك البحث الذكي للعثور على الشركات وقراءة تقييمات العملاء السابقين.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-6 mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">أضف تقييمك</h4>
              <p className="text-gray-600">شارك تجربتك بكل شفافية لمساعدة الآخرين على اتخاذ قرارات صائبة.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 rounded-full p-6 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">اتخذ القرار الصحيح</h4>
              <p className="text-gray-600">اعتمد على مجتمع "مراجعة" لاختيار الشركة الأنسب لاحتياجاتك.</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-start">
            <div>
              <h3 className="text-2xl font-bold mb-4">مراجعة</h3>
              <p>منصتك الأولى للتقييمات الموثوقة في لبنان.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">روابط سريعة</h4>
              <ul>
                <li className="mb-2"><Link href="/about" className="hover:text-blue-400">عن المنصة</Link></li>
                <li className="mb-2"><Link href="/privacy" className="hover:text-blue-400">سياسة الخصوصية</Link></li>
                <li className="mb-2"><Link href="/terms" className="hover:text-blue-400">شروط الاستخدام</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">تواصل معنا</h4>
              <p className="mb-4">info@morajaa.com</p>
              <div className="flex justify-center md:justify-start space-x-4 rtl:space-x-reverse">
                {/* Social Icons */}
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-6 text-center">
            <p>&copy; 2025 مراجعة. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}