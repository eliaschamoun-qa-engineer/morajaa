"use client";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="mb-8 w-full flex justify-center">
        <Link href="/">
          <span className="inline-flex items-center justify-center bg-gray-50 border border-gray-200 rounded-full p-1 shadow">
            <img src="/morajaa.jfif" alt="Morajaa Logo" className="h-12 w-auto rounded-full hover:scale-105 transition-transform duration-200" />
          </span>
        </Link>
      </div>
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-right">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">عن المنصة</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          منصة "مراجعة" هي منصة إلكترونية تهدف إلى تعزيز الشفافية والمصداقية في السوق اللبناني من خلال تمكين المستخدمين من مشاركة تجاربهم وتقييماتهم حول مختلف الشركات والخدمات. نحن نؤمن بأن التقييمات الصادقة تساعد الجميع على اتخاذ قرارات أفضل، وتدعم الشركات الملتزمة بالجودة والاحترافية.
        </p>
        <ul className="list-disc pr-6 text-gray-600 text-base mb-6">
          <li>تسهيل البحث والمقارنة بين الشركات والخدمات.</li>
          <li>تشجيع مشاركة التجارب الحقيقية لتعزيز الثقة.</li>
          <li>دعم المجتمع في اتخاذ قرارات واعية ومبنية على المعرفة.</li>
        </ul>
        <p className="text-gray-500 text-sm">للمزيد من المعلومات أو التواصل معنا، يرجى زيارة صفحة <Link href="/#contact" className="text-blue-600 underline">تواصل معنا</Link>.</p>
      </div>
    </div>
  );
}
