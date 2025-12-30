import React, { useState } from 'react';
import { Play, Pause, RefreshCw, CheckCircle, Clock, AlertCircle, TrendingUp, Users, Award, Database } from 'lucide-react';

interface AutoTask {
  id: string;
  ruleName: string;
  status: 'running' | 'paused' | 'completed' | 'failed';
  lastRunTime: string;
  nextRunTime: string;
  processedCount: number;
  successCount: number;
  failedCount: number;
  totalPoints: number;
  duration: string;
}

const AutoDistribution: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const tasks: AutoTask[] = [
    {
      id: '1',
      ruleName: '存款达标奖励',
      status: 'running',
      lastRunTime: '2024-12-30 10:30:00',
      nextRunTime: '2024-12-31 00:00:00',
      processedCount: 1523,
      successCount: 1520,
      failedCount: 3,
      totalPoints: 152000,
      duration: '2分15秒'
    },
    {
      id: '2',
      ruleName: '结算交易积分',
      status: 'running',
      lastRunTime: '2024-12-30 10:25:00',
      nextRunTime: '2024-12-30 11:00:00',
      processedCount: 3456,
      successCount: 3456,
      failedCount: 0,
      totalPoints: 34560,
      duration: '5分30秒'
    },
    {
      id: '3',
      ruleName: '产品购买奖励',
      status: 'completed',
      lastRunTime: '2024-12-30 09:00:00',
      nextRunTime: '2024-12-31 09:00:00',
      processedCount: 234,
      successCount: 234,
      failedCount: 0,
      totalPoints: 117000,
      duration: '1分05秒'
    },
    {
      id: '4',
      ruleName: '信用卡消费积分',
      status: 'paused',
      lastRunTime: '2024-12-29 23:00:00',
      nextRunTime: '-',
      processedCount: 0,
      successCount: 0,
      failedCount: 0,
      totalPoints: 0,
      duration: '-'
    },
    {
      id: '5',
      ruleName: '定期存款积分',
      status: 'failed',
      lastRunTime: '2024-12-30 08:00:00',
      nextRunTime: '2024-12-30 12:00:00',
      processedCount: 567,
      successCount: 450,
      failedCount: 117,
      totalPoints: 45000,
      duration: '3分20秒'
    }
  ];

  const stats = {
    totalProcessed: tasks.reduce((sum, task) => sum + task.processedCount, 0),
    totalSuccess: tasks.reduce((sum, task) => sum + task.successCount, 0),
    totalFailed: tasks.reduce((sum, task) => sum + task.failedCount, 0),
    totalPoints: tasks.reduce((sum, task) => sum + task.totalPoints, 0),
    runningTasks: tasks.filter(t => t.status === 'running').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-100 text-blue-700';
      case 'paused':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Play className="w-4 h-4" />;
      case 'paused':
        return <Pause className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running':
        return '运行中';
      case 'paused':
        return '已暂停';
      case 'completed':
        return '已完成';
      case 'failed':
        return '失败';
      default:
        return '未知';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">自动计算发放</h2>
          <p className="text-gray-600">对接业务系统，实时抓取数据自动计算并发放积分</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Play className="w-4 h-4" />
            <span>启动全部</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" />
            <span>刷新状态</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">处理总数</p>
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalProcessed.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">笔</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">成功数</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.totalSuccess.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">笔</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">失败数</p>
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.totalFailed.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">笔</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">发放积分</p>
            <Award className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-600">{(stats.totalPoints / 10000).toFixed(1)}万</p>
          <p className="text-xs text-gray-500 mt-1">分</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">运行任务</p>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-600">{stats.runningTasks}</p>
          <p className="text-xs text-gray-500 mt-1">个</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">自动任务列表</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-6 hover:bg-gray-50 cursor-pointer ${
                selectedTask === task.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedTask(task.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{task.ruleName}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusIcon(task.status)}
                        <span>{getStatusText(task.status)}</span>
                      </span>
                      <span className="text-xs text-gray-500">耗时: {task.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Play className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg">
                    <Pause className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">处理笔数</p>
                  <p className="text-lg font-bold text-gray-900">{task.processedCount}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">成功笔数</p>
                  <p className="text-lg font-bold text-green-600">{task.successCount}</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">失败笔数</p>
                  <p className="text-lg font-bold text-red-600">{task.failedCount}</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">发放积分</p>
                  <p className="text-lg font-bold text-orange-600">{task.totalPoints.toLocaleString()}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">成功率</p>
                  <p className="text-lg font-bold text-blue-600">
                    {task.processedCount > 0
                      ? ((task.successCount / task.processedCount) * 100).toFixed(1)
                      : 0}%
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>上次运行: {task.lastRunTime}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>下次运行: {task.nextRunTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">系统对接状态</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">核心业务系统</p>
                  <p className="text-xs text-gray-600">在线 - 正常运行</p>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">存款系统</p>
                  <p className="text-xs text-gray-600">在线 - 正常运行</p>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">信用卡系统</p>
                  <p className="text-xs text-gray-600">维护中</p>
                </div>
              </div>
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoDistribution;
