import React, { useEffect, useState } from 'react';
import { supabase, CustomerLevelRecord, CustomerLevel } from '../lib/supabase';
import { Search, TrendingUp, TrendingDown, Filter, ChevronRight } from 'lucide-react';

export default function CustomerLevelList() {
  const [customers, setCustomers] = useState<CustomerLevelRecord[]>([]);
  const [levels, setLevels] = useState<CustomerLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [customersRes, levelsRes] = await Promise.all([
        supabase.from('customer_level_records').select('*').order('current_score', { ascending: false }),
        supabase.from('customer_levels').select('*').order('sort_order'),
      ]);

      setCustomers(customersRes.data || []);
      setLevels(levelsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelInfo = (levelCode: string) => {
    return levels.find(l => l.level_code === levelCode);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      normal: { label: '正常', className: 'bg-green-100 text-green-800' },
      pending_upgrade: { label: '待升级', className: 'bg-blue-100 text-blue-800' },
      pending_downgrade: { label: '待降级', className: 'bg-orange-100 text-orange-800' },
      under_review: { label: '审核中', className: 'bg-purple-100 text-purple-800' },
    };
    const config = statusMap[status] || statusMap.normal;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.customer_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || customer.current_level_code === filterLevel;
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesLevel && matchesStatus;
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">客户等级管理</h1>
        <p className="mt-2 text-gray-600">查看和管理客户等级评定信息</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索客户名称或ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">全部等级</option>
                {levels.map(level => (
                  <option key={level.level_code} value={level.level_code}>{level.level_name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">全部状态</option>
              <option value="normal">正常</option>
              <option value="pending_upgrade">待升级</option>
              <option value="pending_downgrade">待降级</option>
              <option value="under_review">审核中</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  客户信息
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  当前等级
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  评分
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  等级变化
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  最后评定时间
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => {
                const currentLevel = getLevelInfo(customer.current_level_code);
                const previousLevel = customer.previous_level_code ? getLevelInfo(customer.previous_level_code) : null;
                const scoreChange = customer.previous_score ? customer.current_score - customer.previous_score : 0;

                return (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{customer.customer_name}</p>
                        <p className="text-sm text-gray-500">{customer.customer_id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {currentLevel && (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: currentLevel.color }}
                          />
                          <span className="font-medium text-gray-900">{currentLevel.level_name}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">{customer.current_score}</span>
                        <span className="text-sm text-gray-500">/100</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {previousLevel && scoreChange !== 0 && (
                        <div className="flex items-center gap-2">
                          {scoreChange > 0 ? (
                            <>
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-600">+{scoreChange}</span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="w-4 h-4 text-red-600" />
                              <span className="text-sm font-medium text-red-600">{scoreChange}</span>
                            </>
                          )}
                          <span className="text-xs text-gray-500">
                            {previousLevel.level_name} → {currentLevel?.level_name}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(customer.status)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {new Date(customer.last_evaluated_at).toLocaleDateString('zh-CN')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        查看详情
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">未找到符合条件的客户</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>共 {filteredCustomers.length} 条记录</p>
      </div>
    </div>
  );
}
