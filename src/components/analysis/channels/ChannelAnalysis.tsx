import React, { useState } from 'react';
import { Smartphone, Globe, TrendingUp, TrendingDown, Award, Gift, CreditCard, Users, BarChart3, PieChart, Calendar, Download } from 'lucide-react';

interface ChannelMetrics {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  activeUsers: number;
  pointsUsed: number;
  pointsChange: number;
  benefitsRedeemed: number;
  benefitsChange: number;
  transactions: number;
  avgTransactionValue: number;
  marketShare: number;
}

interface ChannelTrend {
  date: string;
  channel: string;
  points: number;
  benefits: number;
}

const ChannelAnalysis: React.FC = () => {
  const [dateRange, setDateRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState<'points' | 'benefits'>('points');

  const channels: ChannelMetrics[] = [
    {
      id: 'ebank',
      name: '企业网银/鑫e伴',
      icon: <Globe className="w-6 h-6" />,
      color: 'bg-blue-500',
      activeUsers: 12453,
      pointsUsed: 3456789,
      pointsChange: 12.5,
      benefitsRedeemed: 2341,
      benefitsChange: 8.7,
      transactions: 15678,
      avgTransactionValue: 220,
      marketShare: 58.3
    },
    {
      id: 'xinyun',
      name: '鑫云财资',
      icon: <Globe className="w-6 h-6" />,
      color: 'bg-purple-500',
      activeUsers: 6782,
      pointsUsed: 1897654,
      pointsChange: 15.3,
      benefitsRedeemed: 1456,
      benefitsChange: 11.2,
      transactions: 9876,
      avgTransactionValue: 192,
      marketShare: 31.9
    },
    {
      id: 'xinweiting',
      name: '鑫微厅',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'bg-green-500',
      activeUsers: 3421,
      pointsUsed: 582345,
      pointsChange: -3.2,
      benefitsRedeemed: 734,
      benefitsChange: 5.6,
      transactions: 4567,
      avgTransactionValue: 127,
      marketShare: 9.8
    }
  ];

  const channelComparison = [
    { channel: '企业网银/鑫e伴', pointsUsed: 3456789, benefitsRedeemed: 2341, users: 12453, transactions: 15678 },
    { channel: '鑫云财资', pointsUsed: 1897654, benefitsRedeemed: 1456, users: 6782, transactions: 9876 },
    { channel: '鑫微厅', pointsUsed: 582345, benefitsRedeemed: 734, users: 3421, transactions: 4567 }
  ];

  const topBenefits = [
    { name: '贵宾休息室服务', ebank: 456, xinyun: 234, xinweiting: 89, total: 779 },
    { name: '机场快速通道', ebank: 389, xinyun: 198, xinweiting: 67, total: 654 },
    { name: '增值税发票优惠', ebank: 345, xinyun: 287, xinweiting: 45, total: 677 },
    { name: '金融咨询服务', ebank: 298, xinyun: 156, xinweiting: 78, total: 532 },
    { name: '专属客户经理', ebank: 267, xinyun: 189, xinweiting: 56, total: 512 }
  ];

  const monthlyTrends: ChannelTrend[] = [
    { date: '01月', channel: '企业网银/鑫e伴', points: 2890000, benefits: 1890 },
    { date: '02月', channel: '企业网银/鑫e伴', points: 3120000, benefits: 2010 },
    { date: '03月', channel: '企业网银/鑫e伴', points: 3456789, benefits: 2341 },
    { date: '01月', channel: '鑫云财资', points: 1560000, benefits: 1200 },
    { date: '02月', channel: '鑫云财资', points: 1720000, benefits: 1320 },
    { date: '03月', channel: '鑫云财资', points: 1897654, benefits: 1456 },
    { date: '01月', channel: '鑫微厅', points: 490000, benefits: 620 },
    { date: '02月', channel: '鑫微厅', points: 530000, benefits: 680 },
    { date: '03月', channel: '鑫微厅', points: 582345, benefits: 734 }
  ];

  const totalPoints = channels.reduce((sum, ch) => sum + ch.pointsUsed, 0);
  const totalBenefits = channels.reduce((sum, ch) => sum + ch.benefitsRedeemed, 0);
  const totalUsers = channels.reduce((sum, ch) => sum + ch.activeUsers, 0);
  const totalTransactions = channels.reduce((sum, ch) => sum + ch.transactions, 0);

  const getMaxValue = (data: any[], key: string) => {
    return Math.max(...data.map(item => item[key]));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">电子渠道分析</h2>
          <p className="text-gray-600">各电子渠道积分和权益使用情况分析</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">近一周</option>
            <option value="month">近一月</option>
            <option value="quarter">近一季度</option>
            <option value="year">近一年</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>导出报表</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">总积分使用量</p>
          <p className="text-2xl font-bold text-gray-900">{(totalPoints / 1000000).toFixed(2)}M</p>
          <p className="text-xs text-gray-500 mt-1">所有渠道累计</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Gift className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">总权益兑换次数</p>
          <p className="text-2xl font-bold text-gray-900">{totalBenefits.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">所有渠道累计</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">活跃用户总数</p>
          <p className="text-2xl font-bold text-gray-900">{totalUsers.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">所有渠道累计</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">总交易笔数</p>
          <p className="text-2xl font-bold text-gray-900">{totalTransactions.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">所有渠道累计</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {channels.map((channel) => (
          <div key={channel.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className={`${channel.color} p-4`}>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-3">
                  {channel.icon}
                  <h3 className="text-lg font-semibold">{channel.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{channel.marketShare}%</p>
                  <p className="text-xs opacity-90">市场份额</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">活跃用户</p>
                  <p className="text-xl font-bold text-gray-900">{channel.activeUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">积分使用量</p>
                  <div className={`flex items-center space-x-1 text-xs font-medium ${
                    channel.pointsChange > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {channel.pointsChange > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{Math.abs(channel.pointsChange)}%</span>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900">{(channel.pointsUsed / 1000).toLocaleString()}k</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">权益兑换次数</p>
                  <div className={`flex items-center space-x-1 text-xs font-medium ${
                    channel.benefitsChange > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {channel.benefitsChange > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{Math.abs(channel.benefitsChange)}%</span>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900">{channel.benefitsRedeemed.toLocaleString()}</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">交易笔数</p>
                  <p className="text-lg font-bold text-gray-900">{channel.transactions.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-600">平均交易价值</p>
                  <p className="text-lg font-bold text-gray-900">{channel.avgTransactionValue} 积分</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">渠道对比分析</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedMetric('points')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    selectedMetric === 'points'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  积分
                </button>
                <button
                  onClick={() => setSelectedMetric('benefits')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    selectedMetric === 'benefits'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  权益
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {channelComparison.map((item, index) => {
                const value = selectedMetric === 'points' ? item.pointsUsed : item.benefitsRedeemed;
                const maxValue = getMaxValue(channelComparison, selectedMetric === 'points' ? 'pointsUsed' : 'benefitsRedeemed');
                const percentage = (value / maxValue) * 100;
                const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500'];

                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{item.channel}</span>
                      <span className="text-sm font-bold text-gray-900">
                        {selectedMetric === 'points'
                          ? `${(value / 1000).toLocaleString()}k`
                          : value.toLocaleString()
                        }
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${colors[index]} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">渠道市场份额</h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {channels.map((channel, index) => {
                const colors = [
                  { bg: 'bg-blue-100', text: 'text-blue-700', bar: 'bg-blue-500' },
                  { bg: 'bg-purple-100', text: 'text-purple-700', bar: 'bg-purple-500' },
                  { bg: 'bg-green-100', text: 'text-green-700', bar: 'bg-green-500' }
                ];
                const color = colors[index];

                return (
                  <div key={channel.id} className="flex items-center space-x-3">
                    <div className={`flex-1 ${color.bg} rounded-lg p-4`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${color.text}`}>{channel.name}</span>
                        <span className={`text-xl font-bold ${color.text}`}>{channel.marketShare}%</span>
                      </div>
                      <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                        <div
                          className={`${color.bar} h-2 rounded-full`}
                          style={{ width: `${channel.marketShare}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">市场份额计算基于</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">活跃用户数</span>
                  <span className="ml-2 font-semibold text-gray-900">{totalUsers.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">积分使用量</span>
                  <span className="ml-2 font-semibold text-gray-900">{(totalPoints / 1000000).toFixed(2)}M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">热门权益兑换排行</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  排名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  权益名称
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  企业网银/鑫e伴
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  鑫云财资
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  鑫微厅
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  总计
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topBenefits.map((benefit, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{benefit.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{benefit.ebank}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{benefit.xinyun}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{benefit.xinweiting}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">{benefit.total}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">渠道趋势分析</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            {['01月', '02月', '03月'].map((month) => (
              <div key={month}>
                <h4 className="text-sm font-medium text-gray-900 mb-3">{month}</h4>
                <div className="space-y-2">
                  {channels.map((channel, index) => {
                    const trends = monthlyTrends.filter(t => t.date === month && t.channel === channel.name);
                    const trend = trends[0];
                    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500'];

                    return (
                      <div key={channel.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">{channel.name}</span>
                          <div className={`w-3 h-3 ${colors[index]} rounded-full`}></div>
                        </div>
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-500">积分:</span>
                            <span className="font-semibold text-gray-900">{(trend.points / 1000).toFixed(0)}k</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">权益:</span>
                            <span className="font-semibold text-gray-900">{trend.benefits}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelAnalysis;
