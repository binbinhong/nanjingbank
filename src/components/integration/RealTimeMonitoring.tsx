import React, { useState, useEffect } from 'react';
import { Activity, Users, TrendingUp, Award, Gift, CreditCard, Zap, AlertTriangle } from 'lucide-react';

interface RealtimeMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
}

interface ActivityLog {
  id: string;
  timestamp: Date;
  type: 'points' | 'benefits' | 'level' | 'api' | 'system';
  message: string;
  status: 'success' | 'warning' | 'error';
}

const RealTimeMonitoring: React.FC = () => {
  const [metrics, setMetrics] = useState<RealtimeMetric[]>([
    {
      id: 'active-users',
      name: '在线用户数',
      value: 1247,
      unit: '人',
      change: 5.2,
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 'points-transactions',
      name: '积分交易/分钟',
      value: 234,
      unit: '笔',
      change: 12.5,
      trend: 'up',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      id: 'benefits-redeemed',
      name: '权益兑换/小时',
      value: 1856,
      unit: '次',
      change: -3.2,
      trend: 'down',
      icon: <Gift className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      id: 'level-upgrades',
      name: '今日等级升级',
      value: 89,
      unit: '人',
      change: 8.7,
      trend: 'up',
      icon: <Award className="w-6 h-6" />,
      color: 'bg-orange-500'
    },
    {
      id: 'api-calls',
      name: 'API调用/秒',
      value: 456,
      unit: '次',
      change: 2.1,
      trend: 'up',
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    {
      id: 'active-campaigns',
      name: '活跃营销活动',
      value: 23,
      unit: '个',
      change: 0,
      trend: 'stable',
      icon: <Activity className="w-6 h-6" />,
      color: 'bg-teal-500'
    }
  ]);

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: '1',
      timestamp: new Date(),
      type: 'points',
      message: '客户 320101199001011234 积分累计 +500',
      status: 'success'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 5000),
      type: 'benefits',
      message: '客户 91320000MA1PABC123 兑换权益：贵宾休息室服务',
      status: 'success'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 12000),
      type: 'level',
      message: '客户 91320000MA1PXYZ789 等级升级：铂金卡 → 钻石卡',
      status: 'success'
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 18000),
      type: 'api',
      message: 'API接口 /api/v1/points/query 响应时间超过阈值 (156ms)',
      status: 'warning'
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 25000),
      type: 'system',
      message: '营销平台连接正常恢复',
      status: 'success'
    }
  ]);

  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const variation = (Math.random() - 0.5) * 20;
        const newValue = Math.max(0, Math.floor(metric.value + variation));
        const newChange = parseFloat(((variation / metric.value) * 100).toFixed(1));

        return {
          ...metric,
          value: newValue,
          change: newChange,
          trend: newChange > 1 ? 'up' : newChange < -1 ? 'down' : 'stable'
        };
      }));
    }, 2000);

    const logsInterval = setInterval(() => {
      const messages = [
        { type: 'points' as const, message: `客户 ${Math.random().toString(36).substr(2, 18).toUpperCase()} 积分累计 +${Math.floor(Math.random() * 1000)}`, status: 'success' as const },
        { type: 'benefits' as const, message: `客户 ${Math.random().toString(36).substr(2, 18).toUpperCase()} 兑换权益：${['贵宾休息室', '机场快速通道', '增值税发票', '金融咨询服务'][Math.floor(Math.random() * 4)]}`, status: 'success' as const },
        { type: 'level' as const, message: `客户 ${Math.random().toString(36).substr(2, 18).toUpperCase()} 等级升级`, status: 'success' as const },
        { type: 'api' as const, message: `API接口调用成功：${['/api/v1/points/query', '/api/v1/benefits/redeem', '/api/v1/level/query'][Math.floor(Math.random() * 3)]}`, status: 'success' as const },
        { type: 'system' as const, message: '系统健康检查通过', status: 'success' as const }
      ];

      const newLog: ActivityLog = {
        id: Date.now().toString(),
        timestamp: new Date(),
        ...messages[Math.floor(Math.random() * messages.length)]
      };

      setActivityLogs(prev => [newLog, ...prev.slice(0, 19)]);
    }, 5000);

    return () => {
      clearInterval(metricsInterval);
      clearInterval(logsInterval);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case 'warning':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
      case 'error':
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      points: '积分',
      benefits: '权益',
      level: '等级',
      api: 'API',
      system: '系统'
    };
    return labels[type] || type;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">实时监控</h2>
          <p className="text-gray-600">系统运行状态与业务数据实时监控</p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-600">实时更新中</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${metric.color} text-white rounded-lg`}>
                {metric.icon}
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : metric.trend === 'down' ? (
                  <Activity className="w-4 h-4 rotate-180" />
                ) : (
                  <Activity className="w-4 h-4" />
                )}
                <span>{metric.change > 0 ? '+' : ''}{metric.change}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{metric.name}</p>
              <p className="text-3xl font-bold text-gray-900">
                {metric.value.toLocaleString()}
                <span className="text-lg font-normal text-gray-600 ml-1">{metric.unit}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">实时活动日志</h3>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {activityLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="mt-1.5">{getStatusIcon(log.status)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(log.status)}`}>
                        {getTypeLabel(log.type)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-900">{log.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">系统健康度</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">CPU使用率</span>
                  <span className="text-sm font-semibold text-gray-900">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">内存使用率</span>
                  <span className="text-sm font-semibold text-gray-900">62%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">磁盘使用率</span>
                  <span className="text-sm font-semibold text-gray-900">38%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '38%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">网络带宽</span>
                  <span className="text-sm font-semibold text-gray-900">28%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">告警通知</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">响应时间超时</p>
                  <p className="text-xs text-yellow-700 mt-1">ESC系统响应时间超过阈值</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;
