"use client";
import { useState, useEffect } from 'react';
import { getCurrentUser, login, isLoggedIn } from '../lib/auth';
import { UserIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface Comment {
  id: string;
  businessSlug: string;
  userId: string;
  userName: string;
  comment: string;
  createdAt: string;
}

interface CommentsSectionProps {
  businessSlug: string;
}

// Component for live updating time display
function LiveTime({ dateString }: { dateString: string }) {
  const [timeString, setTimeString] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 10) return 'الآن';
    if (seconds < 60) return `منذ ${seconds} ثانية`;
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    if (days < 7) return `منذ ${days} يوم`;
    if (weeks < 4) return `منذ ${weeks} أسبوع`;
    if (months < 12) return `منذ ${months} شهر`;
    if (years < 1) return `منذ ${years} سنة`;
    
    return new Date(dateString).toLocaleDateString('ar-LB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    // Update immediately
    setTimeString(formatDate(dateString));

    // Calculate update interval based on how recent the comment is
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    let interval: number;
    
    if (minutes < 1) {
      // Update every 10 seconds for very recent comments
      interval = window.setInterval(() => {
        setTimeString(formatDate(dateString));
      }, 10000);
    } else if (minutes < 60) {
      // Update every minute for comments less than an hour old
      interval = window.setInterval(() => {
        setTimeString(formatDate(dateString));
      }, 60000);
    } else if (minutes < 1440) {
      // Update every 5 minutes for comments less than a day old
      interval = window.setInterval(() => {
        setTimeString(formatDate(dateString));
      }, 300000);
    } else {
      // Update every hour for older comments
      interval = window.setInterval(() => {
        setTimeString(formatDate(dateString));
      }, 3600000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [dateString]);

  return <span className="text-sm text-gray-500">{timeString}</span>;
}

export default function CommentsSection({ businessSlug }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [mounted, setMounted] = useState(false);

  // Fix hydration error by only reading from localStorage after mount
  useEffect(() => {
    setMounted(true);
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchComments();
    }
  }, [businessSlug, mounted]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/comments?businessSlug=${encodeURIComponent(businessSlug)}`);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (!newComment.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessSlug,
          userId: user.id,
          userName: user.name,
          comment: newComment,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments([data.comment, ...comments]);
        setNewComment('');
      } else {
        alert('فشل في إضافة التعليق. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('حدث خطأ أثناء إضافة التعليق.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = () => {
    if (loginName.trim()) {
      const loggedInUser = login(loginName.trim());
      setUser(loggedInUser);
      setShowLoginModal(false);
      setLoginName('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center mb-6">
        <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600 ms-2" />
        <h2 className="text-2xl font-bold text-gray-800">التعليقات</h2>
        <span className="text-gray-500 me-4">({comments.length})</span>
      </div>

      {/* Comment Form */}
      {mounted && user ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <UserIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="اكتب تعليقك هنا..."
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                style={{ color: 'black' }}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">مسجل كـ {user.name}</span>
                <button
                  type="submit"
                  disabled={submitting || !newComment.trim()}
                  className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'جاري الإرسال...' : 'إرسال التعليق'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : mounted ? (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-700 mb-4">يجب تسجيل الدخول لإضافة تعليق</p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300"
          >
            تسجيل الدخول
          </button>
        </div>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-700 mb-4">جاري التحميل...</p>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">تسجيل الدخول</h3>
            <p className="text-gray-600 mb-4">أدخل اسمك للمتابعة</p>
            <input
              type="text"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              placeholder="اسمك"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ color: 'black' }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
            />
            <div className="flex gap-3">
              <button
                onClick={handleLogin}
                disabled={!loginName.trim()}
                className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 disabled:opacity-50"
              >
                تسجيل الدخول
              </button>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginName('');
                }}
                className="flex-1 bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">جاري تحميل التعليقات...</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>لا توجد تعليقات بعد. كن أول من يعلق!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="h-6 w-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-800">{comment.userName}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <LiveTime dateString={comment.createdAt} />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

