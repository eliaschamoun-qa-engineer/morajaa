"use client";
import { useState } from 'react';
import { carDealers, realEstate, brokers } from '../../data/businesses';

export default function AddReviewPage() {
  const [businessType, setBusinessType] = useState('');
  const [business, setBusiness] = useState('');
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);

  // Get businesses by type
  const businessOptions =
    businessType === 'realEstate'
      ? realEstate
      : businessType === 'carDealer'
      ? carDealers
      : businessType === 'broker'
      ? brokers
      : [];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  }
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      {/* Morajaa Home Logo and Back Link */}
      <div className="mb-8 w-full flex justify-center">
        <a href="/" title="الصفحة الرئيسية">
          <img
            src="/morajaa.jfif"
            alt="Morajaa Logo"
            className="h-16 w-auto mx-auto hover:scale-105 transition-transform duration-200"
            style={{ maxWidth: '180px' }}
          />
        </a>
      </div>
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 text-right">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">أضف تقييمك</h1>
        <p className="mb-6 text-gray-600 text-lg">
          نرحب بتقييمك! يرجى تعبئة النموذج بدقة وإرفاق المستندات والصور التي تثبت تجربتك. سيتم مراجعة التقييم قبل النشر.
        </p>
        <form className="space-y-6">
          <div>
            <label className="block mb-2 font-bold text-gray-700">نوع الشركة</label>
            <select
              style={{ color: 'black', fontSize: '16px', paddingLeft: '16px', paddingRight: '16px', height: '100%', borderWidth: '2px', borderColor: '#E5E7EB', borderRadius: '9999px', outline: 'none', transition: 'border-color 0.3s ease-in-out' }}
              className="w-full border rounded-full py-3 px-4 focus:outline-none focus:border-blue-500"
              value={businessType}
              onChange={e => {
                setBusinessType(e.target.value);
                setBusiness('');
              }}
            >
              <option value="">اختر نوع الشركة</option>
              <option value="realEstate">مطور عقاري</option>
              <option value="carDealer">تاجر سيارات</option>
              <option value="broker">وسيط عقاري</option>
            </select>
          </div>
          {businessType && (
            <div>
              <label className="block mb-2 font-bold text-gray-700">اسم الشركة</label>
              <select
                style={{ color: 'black', fontSize: '16px', paddingLeft: '16px', paddingRight: '16px', height: '100%', borderWidth: '2px', borderColor: '#E5E7EB', borderRadius: '9999px', outline: 'none', transition: 'border-color 0.3s ease-in-out' }}
                className="w-full border rounded-full py-3 px-4 focus:outline-none focus:border-blue-500"
                value={business}
                onChange={e => setBusiness(e.target.value)}
              >
                <option value="">اختر الشركة</option>
                {businessOptions.map(b => (
                  <option key={b.en} value={b.en}>{b.ar} ({b.en})</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block mb-2 font-bold text-gray-700">نص التقييم</label>
            <textarea
              style={{color: 'black'}}
              className="w-full border rounded-2xl py-3 px-4 focus:outline-none focus:border-blue-500 min-h-[100px]"
              value={review}
              onChange={e => setReview(e.target.value)}
              placeholder="اكتب تجربتك بالتفصيل..."
            />
          </div>
          <div>
            <label className="block mb-2 font-bold text-gray-700">إرفاق مستندات (PDF, DOC)</label>
            <input
              style={{color: 'black'}}
              type="file"
              accept=".pdf,.doc,.docx"
              multiple
              onChange={handleFileChange}
              className="w-full border rounded-full py-2 px-4"
            />
            {files.length > 0 && (
              <ul className="mt-2 text-sm text-gray-600">
                {files.map((f, i) => (
                  <li key={i}>{f.name}</li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label className="block mb-2 font-bold text-gray-700">إرفاق صور (JPG, PNG)</label>
            <input
              style={{color: 'black'}}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full border rounded-full py-2 px-4"
            />
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, i) => (
                  <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border">
                    <img src={URL.createObjectURL(img)} alt="preview" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-bold text-gray-700">اسمك الكامل</label>
              <input
                style={{color: 'black'}}
                type="text"
                className="w-full border rounded-full py-3 px-4 focus:outline-none focus:border-blue-500"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="اكتب اسمك هنا"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-gray-700">معلومات التواصل</label>
              <input
                style={{color: 'black'}}
                type="text"
                className="w-full border rounded-full py-3 px-4 focus:outline-none focus:border-blue-500"
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="رقم الهاتف أو البريد الإلكتروني"
              />
            </div>
          </div>
          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-3 px-10 rounded-full hover:bg-blue-700 transition text-lg"
            >
              إرسال التقييم
            </button>
            <p className="mt-4 text-gray-500 text-sm">سيتم مراجعة التقييم والمرفقات قبل النشر لضمان المصداقية.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
