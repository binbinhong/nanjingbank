import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ShoppingCart, Link as LinkIcon, CheckCircle, XCircle, Clock, Plus } from 'lucide-react';

interface MallConfig {
  id: string;
  config_name: string;
  api_url: string;
  api_key: string;
  app_id: string;
  timeout: number;
  retry_times: number;
  is_enabled: boolean;
  remark: string;
  created_at: string;
}

interface MallLog {
  id: string;
  interface_name: string;
  request_method: string;
  request_url: string;
  status_code: number;
  duration: number;
  success: boolean;
  error_message: string | null;
  created_at: string;
}

export default function MallConfig() {
  const [configs, setConfigs] = useState<MallConfig[]>([]);
  const [logs, setLogs] = useState<MallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'config' | 'logs'>('config');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [configsRes, logsRes] = await Promise.all([
        supabase.from('admin_mall_configs').select('*').order('created_at'),
        supabase.from('admin_mall_logs').select('*').order('created_at', { ascending: false }).limit(50),
      ]);

      setConfigs(configsRes.data || []);
      setLogs(logsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleConfig = async (id: string, currentStatus: boolean) => {
    try {
      await supabase
        .from('admin_mall_configs')
        .update({ is_enabled: !currentStatus })
        .eq('id', id);
      await loadData();
    } catch (error) {
      console.error('Error toggling config:', error);
    }
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
          <h1 className="text-3xl font-bold text-gray-900">商城接口配置</h1>
          <p className="mt-2 text-gray-600">管理对公客户商城接口对接</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          新增接口
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">接口总数</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{configs.length}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <LinkIcon className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">启用接口</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {configs.filter(c => c.is_enabled).length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">调用成功</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {logs.filter(l => l.success).length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">调用失败</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {logs.filter(l => !l.success).length}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('config')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'config'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              接口配置
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'logs'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              调用日志
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'config' ? (
            <div className="space-y-4">
              {configs.map((config) => (
                <div key={config.id} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <ShoppingCart className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{config.config_name}</h3>
                          {config.is_enabled ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              已启用
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              已停用
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{config.remark}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">API地址</p>
                            <p className="text-sm font-mono text-gray-900 break-all">{config.api_url}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">应用ID</p>
                            <p className="text-sm font-mono text-gray-900">{config.app_id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">超时时间</p>
                            <p className="text-sm text-gray-900">{config.timeout}ms</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">重试次数</p>
                            <p className="text-sm text-gray-900">{config.retry_times}次</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleConfig(config.id, config.is_enabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        config.is_enabled ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          config.is_enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      创建时间：{new Date(config.created_at).toLocaleString('zh-CN')}
                    </p>
                  </div>
                </div>
              ))}

              {configs.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">暂无接口配置</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className={`border-2 rounded-lg p-4 ${
                  log.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{log.interface_name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          log.success
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-800'
                        }`}>
                          {log.success ? '成功' : '失败'}
                        </span>
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                          {log.request_method}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-mono break-all mb-2">{log.request_url}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">状态码</p>
                      <p className="text-sm font-semibold text-gray-900">{log.status_code}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">耗时</p>
                      <p className="text-sm font-semibold text-gray-900">{log.duration}ms</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs text-gray-500 mb-1">调用时间</p>
                      <p className="text-sm text-gray-900 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(log.created_at).toLocaleString('zh-CN')}
                      </p>
                    </div>
                  </div>

                  {log.error_message && (
                    <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                      <p className="text-xs text-red-600 font-medium mb-1">错误信息</p>
                      <p className="text-sm text-red-800">{log.error_message}</p>
                    </div>
                  )}
                </div>
              ))}

              {logs.length === 0 && (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">暂无调用日志</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
