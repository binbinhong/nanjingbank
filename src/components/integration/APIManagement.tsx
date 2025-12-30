import React, { useState, useEffect } from 'react';
import { Code, TrendingUp, TrendingDown, Activity, Clock, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

interface APIEndpoint {
  id: string;
  category: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  description: string;
  totalCalls: number;
  successRate: number;
  avgResponseTime: number;
  lastCalled: Date;
  trend: 'up' | 'down' | 'stable';
}

const APIManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [apis, setApis] = useState<APIEndpoint[]>([
    {
      id: 'points-query',
      category: '积分管理',
      name: '客户积分查询',
      method: 'GET',
      endpoint: '/api/v1/points/query',
      description: '查询指定客户的积分余额和明细',
      totalCalls: 45678,
      successRate: 99.8,
      avgResponseTime: 45,
      lastCalled: new Date(),
      trend: 'up'
    },
    {
      id: 'points-accumulate',
      category: '积分管理',
      name: '客户积分累计',
      method: 'POST',
      endpoint: '/api/v1/points/accumulate',
      description: '为客户累计积分',
      totalCalls: 23456,
      successRate: 99.5,
      avgResponseTime: 78,
      lastCalled: new Date(),
      trend: 'up'
    },
    {
      id: 'points-consume',
      category: '积分管理',
      name: '客户积分消耗',
      method: 'POST',
      endpoint: '/api/v1/points/consume',
      description: '消耗客户积分（兑换权益时）',
      totalCalls: 12345,
      successRate: 99.2,
      avgResponseTime: 89,
      lastCalled: new Date(),
      trend: 'stable'
    },
    {
      id: 'points-reverse',
      category: '积分管理',
      name: '客户积分冲正',
      method: 'POST',
      endpoint: '/api/v1/points/reverse',
      description: '撤销积分交易，恢复积分余额',
      totalCalls: 567,
      successRate: 98.5,
      avgResponseTime: 102,
      lastCalled: new Date(),
      trend: 'down'
    },
    {
      id: 'benefits-query',
      category: '权益管理',
      name: '客户权益查询',
      method: 'GET',
      endpoint: '/api/v1/benefits/query',
      description: '查询客户可用权益列表',
      totalCalls: 34567,
      successRate: 99.9,
      avgResponseTime: 38,
      lastCalled: new Date(),
      trend: 'up'
    },
    {
      id: 'benefits-redeem',
      category: '权益管理',
      name: '客户权益兑换',
      method: 'POST',
      endpoint: '/api/v1/benefits/redeem',
      description: '客户兑换指定权益',
      totalCalls: 15678,
      successRate: 99.3,
      avgResponseTime: 125,
      lastCalled: new Date(),
      trend: 'up'
    },
    {
      id: 'benefits-reverse',
      category: '权益管理',
      name: '客户权益冲正',
      method: 'POST',
      endpoint: '/api/v1/benefits/reverse',
      description: '撤销权益兑换交易',
      totalCalls: 234,
      successRate: 97.8,
      avgResponseTime: 156,
      lastCalled: new Date(),
      trend: 'stable'
    },
    {
      id: 'level-query',
      category: '等级管理',
      name: '客户等级查询',
      method: 'GET',
      endpoint: '/api/v1/level/query',
      description: '查询客户当前等级信息',
      totalCalls: 28901,
      successRate: 99.9,
      avgResponseTime: 32,
      lastCalled: new Date(),
      trend: 'up'
    },
    {
      id: 'level-benefits-match',
      category: '等级管理',
      name: '等级权益匹配',
      method: 'POST',
      endpoint: '/api/v1/level/benefits/match',
      description: '根据客户等级匹配可用权益',
      totalCalls: 19876,
      successRate: 99.6,
      avgResponseTime: 56,
      lastCalled: new Date(),
      trend: 'up'
    },
    {
      id: 'level-upgrade',
      category: '等级管理',
      name: '客户等级升级',
      method: 'POST',
      endpoint: '/api/v1/level/upgrade',
      description: '触发客户等级升级评估',
      totalCalls: 3456,
      successRate: 99.1,
      avgResponseTime: 234,
      lastCalled: new Date(),
      trend: 'stable'
    },
    {
      id: 'marketing-activity-create',
      category: '营销平台',
      name: '创建营销活动',
      method: 'POST',
      endpoint: '/api/v1/marketing/activity/create',
      description: '创建新的营销活动',
      totalCalls: 1234,
      successRate: 98.9,
      avgResponseTime: 178,
      lastCalled: new Date(),
      trend: 'stable'
    },
    {
      id: 'marketing-activity-publish',
      category: '营销平台',
      name: '发布营销活动',
      method: 'POST',
      endpoint: '/api/v1/marketing/activity/publish',
      description: '发布营销活动到各渠道',
      totalCalls: 987,
      successRate: 99.2,
      avgResponseTime: 145,
      lastCalled: new Date(),
      trend: 'up'
    },
    {
      id: 'tag-query',
      category: '标签平台',
      name: '客户标签查询',
      method: 'GET',
      endpoint: '/api/v1/tag/query',
      description: '查询客户标签信息',
      totalCalls: 23456,
      successRate: 99.7,
      avgResponseTime: 42,
      lastCalled: new Date(),
      trend: 'up'
    },
    {
      id: 'channel-sync',
      category: '渠道对接',
      name: '渠道数据同步',
      method: 'POST',
      endpoint: '/api/v1/channel/sync',
      description: '同步权益数据到各渠道（鑫公司、企业微信、鑫微厅等）',
      totalCalls: 8765,
      successRate: 98.8,
      avgResponseTime: 234,
      lastCalled: new Date(),
      trend: 'stable'
    }
  ]);

  const categories = ['all', '积分管理', '权益管理', '等级管理', '营销平台', '标签平台', '渠道对接'];

  useEffect(() => {
    const interval = setInterval(() => {
      setApis(prev => prev.map(api => ({
        ...api,
        totalCalls: api.totalCalls + Math.floor(Math.random() * 5),
        avgResponseTime: Math.max(20, api.avgResponseTime + Math.floor((Math.random() - 0.5) * 10)),
        lastCalled: new Date()
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredApis = apis.filter(api => {
    const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || api.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalApis: apis.length,
    totalCalls: apis.reduce((sum, api) => sum + api.totalCalls, 0),
    avgSuccessRate: (apis.reduce((sum, api) => sum + api.successRate, 0) / apis.length).toFixed(1),
    avgResponseTime: Math.floor(apis.reduce((sum, api) => sum + api.avgResponseTime, 0) / apis.length)
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'POST':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'PUT':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'DELETE':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">API接口管理</h2>
        <p className="text-gray-600">对公客户权益平台API接口监控与管理</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">接口总数</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalApis}</p>
            </div>
            <Code className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">总调用次数</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{(stats.totalCalls / 1000).toFixed(1)}k</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">平均成功率</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgSuccessRate}%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">平均响应时间</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgResponseTime}ms</p>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索API接口名称、路径或描述..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? '全部分类' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredApis.map((api) => (
            <div key={api.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded border text-xs font-semibold ${getMethodColor(api.method)}`}>
                      {api.method}
                    </span>
                    <h4 className="text-base font-semibold text-gray-900">{api.name}</h4>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {api.category}
                    </span>
                  </div>
                  <code className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">{api.endpoint}</code>
                  <p className="text-sm text-gray-600 mt-2">{api.description}</p>
                  <div className="flex items-center space-x-6 mt-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">调用: {api.totalCalls.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {api.successRate >= 99 ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className="text-gray-600">成功率: {api.successRate}%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">响应: {api.avgResponseTime}ms</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(api.trend)}
                      <span className="text-gray-600">
                        趋势: {api.trend === 'up' ? '上升' : api.trend === 'down' ? '下降' : '稳定'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500 ml-4">
                  最后调用: {api.lastCalled.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APIManagement;
