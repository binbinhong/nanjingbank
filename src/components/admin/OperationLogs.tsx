import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FileText, Download, Filter, Calendar } from 'lucide-react';

interface OperationLog {
  id: string;
  user_id: string;
  username: string;
  operation_type: string;
  module: string;
  description: string;
  ip_address: string;
  request_url: string;
  status: string;
  duration: number;
  created_at: string;
}

export default function OperationLogs() {
  const [logs, setLogs] = useState<OperationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterModule, setFilterModule] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_operation_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error loading logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getOperationTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      create: '新增',
      update: '修改',
      delete: '删除',
      query: '查询',
      export: '导出',
      import: '导入',
    };
    return labels[type] || type;
  };

  const getOperationTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      create: 'bg-green-100 text-green-700',
      update: 'bg-blue-100 text-blue-700',
      delete: 'bg-red-100 text-red-700',
      query: 'bg-purple-100 text-purple-700',
      export: 'bg-orange-100 text-orange-700',
      import: 'bg-yellow-100 text-yellow-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const modules = [...new Set(logs.map(l => l.module))];

  const filteredLogs = logs.filter(log => {
    const matchesModule = filterModule === 'all' || log.module === filterModule;
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    return matchesModule && matchesStatus;
  });

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
          <h1 className="text-3xl font-bold text-gray-900">操作日志</h1>
          <p className="mt-2 text-gray-600">查看系统操作记录</p>
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
              <p className="text-sm font-medium text-gray-600">日志总数</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{logs.length}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">成功操作</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {logs.filter(l => l.status === 'success').length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">失败操作</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {logs.filter(l => l.status === 'failed').length}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <FileText className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">涉及模块</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{modules.length}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <Filter className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select
            value={filterModule}
            onChange={(e) => setFilterModule(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">全部模块</option>
            {modules.map(module => (
              <option key={module} value={module}>{module}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">全部状态</option>
            <option value="success">成功</option>
            <option value="failed">失败</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">操作时间</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">操作人</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">操作类型</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">模块</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">操作描述</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">IP地址</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">耗时</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {new Date(log.created_at).toLocaleString('zh-CN')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{log.username}</p>
                      <p className="text-xs text-gray-500">{log.user_id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getOperationTypeColor(log.operation_type)}`}>
                      {getOperationTypeLabel(log.operation_type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{log.module}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 max-w-xs truncate">{log.description}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 font-mono">{log.ip_address}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{log.duration}ms</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.status === 'success' ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        成功
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                        失败
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">暂无操作日志</p>
          </div>
        )}
      </div>
    </div>
  );
}
