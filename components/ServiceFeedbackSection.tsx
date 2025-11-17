"use client";
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftRightIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ServiceFeedback {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// Dummy feedback data about the service
const dummyFeedbacks: ServiceFeedback[] = [
  {
    id: '1',
    userName: 'أحمد محمد',
    rating: 5,
    comment: 'منصة رائعة! ساعدتني كثيراً في العثور على مطور عقاري موثوق. التصميم جميل وسهل الاستخدام.',
    date: '2024-01-15',
  },
  {
    id: '2',
    userName: 'سارة خالد',
    rating: 5,
    comment: 'خدمة ممتازة ومفيدة جداً. التقييمات صادقة وواضحة. شكراً لكم على هذه المبادرة الرائعة.',
    date: '2024-01-10',
  },
  {
    id: '3',
    userName: 'محمد علي',
    rating: 4,
    comment: 'فكرة رائعة للمنصة. أتمنى أن تضيفوا المزيد من الميزات مثل البحث المتقدم والفلاتر.',
    date: '2024-01-05',
  },
  {
    id: '4',
    userName: 'ليلى حسن',
    rating: 5,
    comment: 'استخدمت المنصة للبحث عن وكالة سيارات وكانت تجربة ممتازة. التقييمات ساعدتني في اتخاذ القرار الصحيح.',
    date: '2023-12-28',
  },
  {
    id: '5',
    userName: 'خالد فاضل',
    rating: 4,
    comment: 'منصة مفيدة جداً. أتمنى أن تضيفوا إمكانية رؤية المزيد من التفاصيل عن كل شركة.',
    date: '2023-12-20',
  },
];

interface ServiceFeedbackSectionProps {
  businessName: string;
  businessType: string;
  businessSlug: string;
}

export default function ServiceFeedbackSection({ businessName, businessType, businessSlug }: ServiceFeedbackSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedFeedbacks = showAll ? dummyFeedbacks : dummyFeedbacks.slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-LB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Map business type to the format expected by add-review page
  const getBusinessTypeForReview = () => {
    if (businessType === 'realEstate') return 'realEstate';
    if (businessType === 'carDealer') return 'carDealer';
    if (businessType === 'broker') return 'broker';
    return '';
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 mb-8 border border-blue-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full me-4"></div>
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600 me-3" />
          <h2 className="text-3xl font-bold text-gray-800">تقييمات الخدمة</h2>
        </div>
      </div>

      <p className="text-gray-600 mb-6 text-lg">
        شاركنا رأيك حول منصة مراجعة ومساعدتها لك في العثور على أفضل الشركات
      </p>

      {/* Add Feedback Button */}
      <div className="mb-8">
        <Link 
          href={`/add-review?businessType=${getBusinessTypeForReview()}&business=${encodeURIComponent(businessName)}&from=${encodeURIComponent(businessSlug)}`}
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          <span>أضف تقييمك للخدمة</span>
        </Link>
      </div>

      {/* Feedbacks List */}
      <div className="space-y-6">
        {displayedFeedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">
                    {feedback.userName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{feedback.userName}</h4>
                  <p className="text-sm text-gray-500">{formatDate(feedback.date)}</p>
                </div>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${i < feedback.rating ? '' : 'opacity-30'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{feedback.comment}</p>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {dummyFeedbacks.length > 3 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-700 font-semibold transition duration-300"
          >
            {showAll ? (
              <>
                <ChevronUpIcon className="h-5 w-5 inline-block ms-2" />
                إظهار أقل
              </>
            ) : (
              <>
                إظهار المزيد ({dummyFeedbacks.length - 3} تقييمات أخرى)
                <ChevronDownIcon className="h-5 w-5 inline-block me-2" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

