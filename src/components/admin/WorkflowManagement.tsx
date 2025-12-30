import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { GitBranch, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';

interface Approval {
  id: string;
  approval_no: string;
  workflow_code: string;
  workflow_name: string;
  apply_user_id: string;
  apply_username: string;
  apply_reason: string;
  current_step: number;
  status: string;
  business_data: any;
  created_at: string;
}

export default function WorkflowManagement() {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadApprovals();
  }, []);

  const loadApprovals = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_approvals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApprovals(data || []);
    } catch (error) {
      console.error('Error loading approvals:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
      pending: {
        label: '待审批',
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: <Clock className="w-4 h-4" />
      },
      approved: {
        label: '已通过',
        className: 'bg-green-100 text-green-700 border-green-200',
        icon: <CheckCircle className="w-4 h-4" />
      },
      rejected: {
        label: '已驳回',
        className: 'bg-red-100 text-red-700 border-red-200',
        icon: <XCircle className="w-4 h-4" />
      },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border ${config.className}`}>
        {config.icon}
        {config.label}
      </div>
    );
  };

  const filteredApprovals = filterStatus === 'all'
    ? approvals
    : approvals.filter(a => a.status === filterStatus);

  const statusCounts = {
    pending: approvals.filter(a => a.status === 'pending').length,
    approved: approvals.filter(a => a.status === 'approved').length,
    rejected: approvals.filter(a => a.status === 'rejected').length,
  };

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
        <h1 className="text-3xl font-bold text-gray-900">审批流程</h1>
        <p className="mt-2 text-gray-600">查看和管理审批记录</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">审批总数</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{approvals.length}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <GitBranch className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">待审批</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{statusCounts.pending}</p>
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
              <p className="text-3xl font-bold text-green-600 mt-2">{statusCounts.approved}</p>
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
              <p className="text-3xl font-bold text-red-600 mt-2">{statusCounts.rejected}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">全部状态</option>
            <option value="pending">待审批</option>
            <option value="approved">已通过</option>
            <option value="rejected">已驳回</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredApprovals.map((approval) => (
            <div key={approval.id} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{approval.workflow_name}</h3>
                    {getStatusBadge(approval.status)}
                  </div>
                  <p className="text-sm text-gray-500">审批单号：{approval.approval_no}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">申请人</p>
                  <p className="text-sm font-medium text-gray-900">{approval.apply_username}</p>
                  <p className="text-xs text-gray-500">{approval.apply_user_id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">流程类型</p>
                  <p className="text-sm font-medium text-gray-900">{approval.workflow_code}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">当前步骤</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold">
                        {approval.current_step}
                      </div>
                      <span className="text-sm text-gray-600">第{approval.current_step}步</span>
                    </div>
                  </div>
                </div>
              </div>

              {approval.apply_reason && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1">申请原因</p>
                  <p className="text-sm text-gray-700">{approval.apply_reason}</p>
                </div>
              )}

              {approval.business_data && Object.keys(approval.business_data).length > 0 && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-blue-600 font-medium mb-2 flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    业务数据
                  </p>
                  <div className="space-y-1">
                    {Object.entries(approval.business_data).map(([key, value]) => (
                      <p key={key} className="text-sm text-gray-700">
                        <span className="font-medium">{key}:</span> {String(value)}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  创建时间：{new Date(approval.created_at).toLocaleString('zh-CN')}
                </p>
                {approval.status === 'pending' && (
                  <div className="flex gap-2">
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-200">
                      <CheckCircle className="w-4 h-4" />
                      通过
                    </button>
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200">
                      <XCircle className="w-4 h-4" />
                      驳回
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredApprovals.length === 0 && (
          <div className="text-center py-12">
            <GitBranch className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">暂无审批记录</p>
          </div>
        )}
      </div>
    </div>
  );
}
