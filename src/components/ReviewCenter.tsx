import React, { useEffect, useState } from 'react';
import { supabase, LevelChangeReview } from '../lib/supabase';
import { CheckCircle, XCircle, Clock, TrendingUp, TrendingDown, MessageSquare } from 'lucide-react';

export default function ReviewCenter() {
  const [reviews, setReviews] = useState<LevelChangeReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<LevelChangeReview | null>(null);
  const [reviewComment, setReviewComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | null>(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('level_change_reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (reviewId: string, status: 'approved' | 'rejected', comment: string) => {
    try {
      await supabase
        .from('level_change_reviews')
        .update({
          review_status: status,
          reviewer_name: '审核员',
          review_comment: comment,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', reviewId);

      await loadReviews();
      setShowModal(false);
      setSelectedReview(null);
      setReviewComment('');
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const openReviewModal = (review: LevelChangeReview, action: 'approve' | 'reject') => {
    setSelectedReview(review);
    setReviewAction(action);
    setShowModal(true);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
      pending: {
        label: '待审核',
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: <Clock className="w-4 h-4" />
      },
      approved: {
        label: '已通过',
        className: 'bg-green-100 text-green-800 border-green-200',
        icon: <CheckCircle className="w-4 h-4" />
      },
      rejected: {
        label: '已驳回',
        className: 'bg-red-100 text-red-800 border-red-200',
        icon: <XCircle className="w-4 h-4" />
      },
    };
    const config = statusMap[status] || statusMap.pending;
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border ${config.className}`}>
        {config.icon}
        {config.label}
      </div>
    );
  };

  const pendingCount = reviews.filter(r => r.review_status === 'pending').length;
  const approvedCount = reviews.filter(r => r.review_status === 'approved').length;
  const rejectedCount = reviews.filter(r => r.review_status === 'rejected').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">审核中心</h1>
        <p className="mt-2 text-gray-600">审核客户等级变动申请，支持人工干预与复核</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">待审核</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{pendingCount}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">已通过</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{approvedCount}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">已驳回</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{rejectedCount}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="space-y-4 p-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{review.customer_name}</h3>
                    {getStatusBadge(review.review_status)}
                    {review.auto_triggered && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        自动触发
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">客户ID</p>
                      <p className="text-sm font-medium text-gray-900">{review.customer_id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">变动类型</p>
                      <div className="flex items-center gap-1.5">
                        {review.change_type === 'upgrade' ? (
                          <>
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">升级</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="w-4 h-4 text-red-600" />
                            <span className="text-sm font-medium text-red-600">降级</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">等级变化</p>
                      <p className="text-sm font-medium text-gray-900">
                        {review.from_level} → {review.to_level}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">分数变化</p>
                      <p className={`text-sm font-semibold ${review.score_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {review.score_change >= 0 ? '+' : ''}{review.score_change}
                      </p>
                    </div>
                  </div>

                  {review.change_reason && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-xs text-gray-500 mb-1">变动原因</p>
                      <p className="text-sm text-gray-700">{review.change_reason}</p>
                    </div>
                  )}

                  {review.review_status !== 'pending' && review.review_comment && (
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-xs text-blue-600 font-medium mb-1">审核意见</p>
                          <p className="text-sm text-gray-700">{review.review_comment}</p>
                          {review.reviewer_name && (
                            <p className="text-xs text-gray-500 mt-2">
                              审核人：{review.reviewer_name} |
                              时间：{new Date(review.reviewed_at!).toLocaleString('zh-CN')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {review.review_status === 'pending' && (
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => openReviewModal(review, 'approve')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      通过
                    </button>
                    <button
                      onClick={() => openReviewModal(review, 'reject')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      驳回
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  申请时间：{new Date(review.created_at).toLocaleString('zh-CN')}
                </p>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">暂无审核记录</p>
            </div>
          )}
        </div>
      </div>

      {showModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {reviewAction === 'approve' ? '通过审核' : '驳回申请'}
            </h3>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">客户：{selectedReview.customer_name}</p>
              <p className="text-sm text-gray-600">
                等级变动：{selectedReview.from_level} → {selectedReview.to_level}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                审核意见 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入审核意见..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (reviewAction && reviewComment.trim()) {
                    handleReview(
                      selectedReview.id,
                      reviewAction === 'approve' ? 'approved' : 'rejected',
                      reviewComment
                    );
                  }
                }}
                disabled={!reviewComment.trim()}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  reviewAction === 'approve'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                确认{reviewAction === 'approve' ? '通过' : '驳回'}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedReview(null);
                  setReviewComment('');
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
