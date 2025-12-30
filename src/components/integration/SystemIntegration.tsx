import React, { useState, useEffect } from 'react';
import { Server, CheckCircle, XCircle, Clock, Activity, AlertCircle, TrendingUp } from 'lucide-react';

interface SystemStatus {
  id: string;
  name: string;
  description: string;
  status: 'online' | 'offline' | 'warning';
  responseTime: number;
  uptime: number;
  lastCheck: Date;
  apiCalls: number;
  errorRate: number;
}

const SystemIntegration: React.FC = () => {
  const [systems, setSystems] = useState<SystemStatus[]>([
    {
      id: 'marketing',
      name: '营销平台',
      description: '创建和发布营销活动',
      status: 'online',
      responseTime: 45,
      uptime: 99.8,
      lastCheck: new Date(),
      apiCalls: 15678,
      errorRate: 0.2
    },
    {
      id: 'tag',
      name: '标签平台',
      description: '客户标签管理与查询',
      status: 'online',
      responseTime: 32,
      uptime: 99.9,
      lastCheck: new Date(),
      apiCalls: 23451,
      errorRate: 0.1
    },
    {
      id: 'datawarehouse',
      name: '数据仓库',
      description: '核心数据存储与查询',
      status: 'online',
      responseTime: 120,
      uptime: 99.5,
      lastCheck: new Date(),
      apiCalls: 45890,
      errorRate: 0.5
    },
    {
      id: 'datamart',
      name: '数据集市',
      description: '业务数据分析与报表',
      status: 'online',
      responseTime: 78,
      uptime: 99.7,
      lastCheck: new Date(),
      apiCalls: 12345,
      errorRate: 0.3
    },
    {
      id: 'esc',
      name: 'ESC系统',
      description: '企业服务中心',
      status: 'warning',
      responseTime: 156,
      uptime: 98.5,
      lastCheck: new Date(),
      apiCalls: 8934,
      errorRate: 1.5
    },
    {
      id: 'ebank',
      name: '企业网银/鑫e伴',
      description: '对公电子渠道',
      status: 'online',
      responseTime: 55,
      uptime: 99.9,
      lastCheck: new Date(),
      apiCalls: 34567,
      errorRate: 0.1
    },
    {
      id: 'xinyuncaizi',
      name: '鑫云财资',
      description: '财资管理平台',
      status: 'online',
      responseTime: 68,
      uptime: 99.6,
      lastCheck: new Date(),
      apiCalls: 9876,
      errorRate: 0.4
    },
    {
      id: 'xingongsi',
      name: '鑫公司',
      description: '对公客户服务平台',
      status: 'online',
      responseTime: 42,
      uptime: 99.8,
      lastCheck: new Date(),
      apiCalls: 28900,
      errorRate: 0.2
    },
    {
      id: 'weixin',
      name: '企业微信',
      description: '企业通讯与客户触达',
      status: 'online',
      responseTime: 88,
      uptime: 99.4,
      lastCheck: new Date(),
      apiCalls: 56432,
      errorRate: 0.6
    },
    {
      id: 'xinweiting',
      name: '鑫微厅',
      description: '微信小程序服务渠道',
      status: 'online',
      responseTime: 51,
      uptime: 99.7,
      lastCheck: new Date(),
      apiCalls: 18765,
      errorRate: 0.3
    }
  ]);

  const [stats, setStats] = useState({
    totalSystems: 10,
    onlineSystems: 9,
    warningSystems: 1,
    offlineSystems: 0,
    avgResponseTime: 63,
    totalApiCalls: 254838
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystems(prev => prev.map(system => ({
        ...system,
        responseTime: Math.floor(system.responseTime + (Math.random() - 0.5) * 10),
        apiCalls: system.apiCalls + Math.floor(Math.random() * 10),
        lastCheck: new Date()
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onlineCount = systems.filter(s => s.status === 'online').length;
    const warningCount = systems.filter(s => s.status === 'warning').length;
    const offlineCount = systems.filter(s => s.status === 'offline').length;
    const avgResponse = Math.floor(systems.reduce((sum, s) => sum + s.responseTime, 0) / systems.length);
    const totalCalls = systems.reduce((sum, s) => sum + s.apiCalls, 0);

    setStats({
      totalSystems: systems.length,
      onlineSystems: onlineCount,
      warningSystems: warningCount,
      offlineSystems: offlineCount,
      avgResponseTime: avgResponse,
      totalApiCalls: totalCalls
    });
  }, [systems]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'offline':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">系统集成监控</h2>
        <p className="text-gray-600">对公客户权益平台系统对接实时状态监控</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">总系统数</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalSystems}</p>
            </div>
            <Server className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">在线系统</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.onlineSystems}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">告警系统</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.warningSystems}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">离线系统</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.offlineSystems}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">平均响应</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgResponseTime}ms</p>
            </div>
            <Activity className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">总调用次数</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{(stats.totalApiCalls / 1000).toFixed(1)}k</p>
            </div>
            <TrendingUp className="w-8 h-8 text-indigo-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">系统对接列表</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {systems.map((system) => (
            <div key={system.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-1">{getStatusIcon(system.status)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-base font-semibold text-gray-900">{system.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(system.status)}`}>
                        {system.status === 'online' ? '运行中' : system.status === 'warning' ? '告警' : '离线'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{system.description}</p>
                    <div className="flex items-center space-x-6 mt-3 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">响应: {system.responseTime}ms</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Activity className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">可用率: {system.uptime}%</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">调用: {system.apiCalls.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">错误率: {system.errorRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500 ml-4">
                  最后检查: {system.lastCheck.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemIntegration;
