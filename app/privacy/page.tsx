"use client";
import Link from "next/link";

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-blue-700 mb-4">سياسة الخصوصية</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          نحن في منصة "مراجعة" نولي أهمية قصوى لخصوصية مستخدمينا. نلتزم بحماية بياناتك الشخصية وعدم مشاركتها مع أي جهة خارجية إلا في الحالات التي يفرضها القانون أو لتحسين جودة الخدمة.
        </p>
        <ul className="list-disc pr-6 text-gray-600 text-base mb-6">
          <li>يتم جمع البيانات الأساسية فقط عند التسجيل أو إضافة تقييم.</li>
          <li>تستخدم البيانات لتحسين تجربة المستخدم وتطوير المنصة.</li>
          <li>لا يتم بيع أو مشاركة بياناتك مع أي طرف ثالث لأغراض تجارية.</li>
          <li>يمكنك طلب حذف بياناتك في أي وقت عبر التواصل معنا.</li>
        </ul>
        <p className="text-gray-500 text-sm">لمزيد من التفاصيل أو الاستفسارات، يرجى زيارة صفحة <Link href="/#contact" className="text-blue-600 underline">تواصل معنا</Link>.</p>
      </div>
    </div>
  );
}
