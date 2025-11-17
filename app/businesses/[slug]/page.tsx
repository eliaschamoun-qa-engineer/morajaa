"use client";
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { StarIcon, BuildingOffice2Icon, RocketLaunchIcon, UserIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { carDealers, realEstate, brokers } from '../../../data/businesses';
import { getBusinessData } from '../../../data/businessData';
import CommentsSection from '../../../components/CommentsSection';
import ServiceFeedbackSection from '../../../components/ServiceFeedbackSection';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Helper function to get business by slug
function getBusinessBySlug(slug: string) {
  const allBusinesses = [
    ...realEstate.map(b => ({ ...b, type: 'realEstate' as const })),
    ...carDealers.map(b => ({ ...b, type: 'carDealer' as const })),
    ...brokers.map(b => ({ ...b, type: 'broker' as const })),
  ];
  
  return allBusinesses.find(b => 
    b.en.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase() ||
    b.ar === decodeURIComponent(slug)
  );
}

export default function BusinessDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const business = getBusinessBySlug(slug);

  if (!business) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">الشركة غير موجودة</h1>
          <Link href="/businesses" className="text-blue-600 hover:text-blue-700 underline">
            العودة إلى قائمة الشركات
          </Link>
        </div>
      </div>
    );
  }

  // Get dummy data for the business
  const businessData = getBusinessData(business.en, business.type);
  const images = businessData.images;
  const rating = businessData.rating;
  const reviewCount = businessData.reviewCount;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" title="الصفحة الرئيسية">
              <span className="inline-flex items-center justify-center bg-gray-50 border border-gray-200 rounded-full p-1 shadow">
                <img src="/morajaa.jfif" alt="Morajaa Logo" className="h-12 w-auto rounded-full hover:scale-105 transition-transform duration-200" />
              </span>
            </Link>
            <Link href="/" className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition duration-300">
              مراجعة
            </Link>
          </div>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition duration-300 px-4">الرئيسية</Link>
            <span className="hidden md:inline-block w-2"></span>
            <Link href="/businesses" className="text-gray-600 hover:text-blue-600 transition duration-300 px-4">الشركات</Link>
            <span className="hidden md:inline-block w-2"></span>
            <Link href="/#contact" className="text-gray-600 hover:text-blue-600 transition duration-300 px-4">تواصل معنا</Link>
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
                <Link href="/" className="block py-3 px-4 text-gray-700 hover:text-blue-600 font-bold w-full text-right" onClick={() => setMenuOpen(false)}>الرئيسية</Link>
                <div className="w-full h-px bg-gray-100 my-1" />
                <Link href="/businesses" className="block py-3 px-4 text-gray-700 hover:text-blue-600 font-bold w-full text-right" onClick={() => setMenuOpen(false)}>الشركات</Link>
                <div className="w-full h-px bg-gray-100 my-1" />
                <Link href="/#contact" className="block py-3 px-4 text-gray-700 hover:text-blue-600 font-bold w-full text-right" onClick={() => setMenuOpen(false)}>تواصل معنا</Link>
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <Link href="/add-review">
              <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg">
                أضف تقييمك
              </button>
            </Link>
          </div>
          {/* Mobile Add Review Button */}
          <div className="md:hidden ms-2">
            <Link href="/add-review">
              <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 text-sm shadow-md">
                أضف تقييمك
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Business Header - Enhanced */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 mb-12 border border-blue-100 transform hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-xl me-4 ${
                  business.type === 'realEstate' ? 'bg-blue-100' :
                  business.type === 'carDealer' ? 'bg-blue-100' :
                  'bg-blue-100'
                }`}>
                  {business.type === 'realEstate' && (
                    <BuildingOffice2Icon className="h-10 w-10 text-blue-600" />
                  )}
                  {business.type === 'carDealer' && (
                    <RocketLaunchIcon className="h-10 w-10 text-blue-600" />
                  )}
                  {business.type === 'broker' && (
                    <UserIcon className="h-10 w-10 text-blue-600" />
                  )}
                </div>
                <div>
                  <h1 className="text-[56px] md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6 leading-[1.5]">
                    {business.ar}
                  </h1>
                  <p className="text-xl text-gray-600 font-medium">{business.en}</p>
                </div>
              </div>
              
              {/* Rating - Enhanced */}
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 w-fit shadow-md">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    i < Math.floor(rating) ? (
                      <StarIconSolid key={i} className="h-7 w-7" />
                    ) : i < rating ? (
                      <StarIconSolid key={i} className="h-7 w-7 opacity-50" />
                    ) : (
                      <StarIcon key={i} className="h-7 w-7 text-gray-300" />
                    )
                  ))}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-800">{rating.toFixed(1)}</span>
                  <span className="text-gray-500 text-sm">({reviewCount.toLocaleString()} تقييم)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Swiper - Enhanced */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full me-4"></div>
            <h2 className="text-3xl font-bold text-gray-800">صور الشركة</h2>
          </div>
          {images.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            loop={images.length > 1}
            dir="rtl"
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="business-swiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${business.ar} - صورة ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          )}
        </div>

        {/* Business Details - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* About Section - Enhanced */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full me-4"></div>
              <h2 className="text-2xl font-bold text-gray-800">عن الشركة</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {businessData.description}
            </p>
          </div>

          {/* Contact Info - Enhanced */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full me-4"></div>
              <h2 className="text-2xl font-bold text-gray-800">معلومات الاتصال</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                <span className="text-gray-600 font-semibold block mb-2">العنوان:</span>
                <p className="text-gray-800 font-medium">{businessData.address}</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                <span className="text-gray-600 font-semibold block mb-2">الهاتف:</span>
                <a href={`tel:${businessData.phone}`} className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  {businessData.phone}
                </a>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                <span className="text-gray-600 font-semibold block mb-2">الموقع الإلكتروني:</span>
                <a 
                  href={`https://${businessData.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium break-all transition-colors"
                >
                  {businessData.website}
                </a>
              </div>
              {businessData.openingHours && businessData.openingHours.length > 0 && (
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                  <span className="text-gray-600 font-semibold block mb-2">ساعات العمل:</span>
                  <div className="text-gray-800 mt-2 space-y-1">
                    {businessData.openingHours.map((hours, idx) => (
                      <p key={idx} className="text-sm font-medium">{hours}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <CommentsSection businessSlug={slug} />

        {/* Service Feedback Section */}
        <ServiceFeedbackSection 
          businessName={business.en}
          businessType={business.type}
          businessSlug={slug}
        />
      </main>
      
      {/* Footer Spacing */}
      <div className="h-16"></div>
    </div>
  );
}

