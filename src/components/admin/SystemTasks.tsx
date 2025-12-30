import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Clock, Play, CheckCircle, XCircle, Download } from 'lucide-react';

interface AdminTask {
  id: string;
  task_code: string;
  task_name: string;
  task_type: string;
  status: string;
  schedule_time: string | null;
  start_time: string | null;
  end_time: string | null;
  duration: number | null;
  result: string | null;
  error_message: string | null;
  created_at: string;
}

export default function SystemTasks() {
  const [tasks, setTasks] = useState<AdminTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
      pending: {
        label: '待执行',
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: <Clock className="w-4 h-4" />
      },
      running: {
        label: '执行中',
        className: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: <Play className="w-4 h-4" />
      },
      success: {
        label: '成功',
        className: 'bg-green-100 text-green-700 border-green-200',
        icon: <CheckCircle className="w-4 h-4" />
      },
      failed: {
        label: '失败',
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

  const getTaskTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      data_sync: '数据同步',
      report_generate: '报表生成',
      data_backup: '数据备份',
      level_evaluation: '等级评定',
      notification_send: '通知发送',
    };
    return types[type] || type;
  };

  const filteredTasks = filterStatus === 'all'
    ? tasks
    : tasks.filter(t => t.status === filterStatus);

  const statusCounts = {
    pending: tasks.filter(t => t.status === 'pending').length,
    running: tasks.filter(t => t.status === 'running').length,
    success: tasks.filter(t => t.status === 'success').length,
    failed: tasks.filter(t => t.status === 'failed').length,
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">系统任务</h1>
          <p className="mt-2 text-gray-600">查看和管理系统自动任务</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5" />
          导出日志
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">待执行</p>
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
              <p className="text-sm font-medium text-gray-600">执行中</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{statusCounts.running}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <Play className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">成功</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{statusCounts.success}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">失败</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{statusCounts.failed}</p>
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
            <option value="pending">待执行</option>
            <option value="running">执行中</option>
            <option value="success">成功</option>
            <option value="failed">失败</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="border-2 border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{task.task_name}</h3>
                    {getStatusBadge(task.status)}
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {getTaskTypeLabel(task.task_type)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">任务代码：{task.task_code}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                {task.schedule_time && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">计划执行</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(task.schedule_time).toLocaleString('zh-CN')}
                    </p>
                  </div>
                )}
                {task.start_time && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">开始时间</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(task.start_time).toLocaleString('zh-CN')}
                    </p>
                  </div>
                )}
                {task.end_time && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">结束时间</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(task.end_time).toLocaleString('zh-CN')}
                    </p>
                  </div>
                )}
                {task.duration !== null && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">执行时长</p>
                    <p className="text-sm font-medium text-gray-900">{task.duration}秒</p>
                  </div>
                )}
              </div>

              {task.result && (
                <div className="bg-green-50 rounded-lg p-3 mb-3">
                  <p className="text-sm text-green-800">{task.result}</p>
                </div>
              )}

              {task.error_message && (
                <div className="bg-red-50 rounded-lg p-3 mb-3">
                  <p className="text-sm text-red-800">{task.error_message}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  创建时间：{new Date(task.created_at).toLocaleString('zh-CN')}
                </p>
                {task.status === 'pending' && (
                  <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Play className="w-4 h-4" />
                    立即执行
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">暂无任务记录</p>
          </div>
        )}
      </div>
    </div>
  );
}
