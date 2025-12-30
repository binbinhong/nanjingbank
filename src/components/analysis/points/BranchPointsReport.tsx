import React, { useState } from 'react';
import { Building, Download, TrendingUp, Calendar, BarChart3 } from 'lucide-react';

export default function BranchPointsReport() {
  const [dateRange, setDateRange] = useState('本月');

  const branchData = [
    { id: 'B001', name: '江苏省分行', code: 'JS001', city: '南京',
      customers: 32456, balance: 685200000, earned: 285600000, consumed: 178900000,
      avgPerCustomer: 21110, activeRate: 82.5, growth: '+18.3%' },
    { id: 'B002', name: '上海分行', code: 'SH001', city: '上海',
      customers: 28903, balance: 598700000, earned: 234100000, consumed: 156700000,
      avgPerCustomer: 20710, activeRate: 79.8, growth: '+15.7%' },
    { id: 'B003', name: '浙江省分行', code: 'ZJ001', city: '杭州',
      customers: 24678, balance: 478900000, earned: 192000000, consumed: 132400000,
      avgPerCustomer: 19410, activeRate: 76.3, growth: '+12.9%' },
    { id: 'B004', name: '安徽省分行', code: 'AH001', city: '合肥',
      customers: 19854, balance: 367800000, earned: 168000000, consumed: 118900000,
      avgPerCustomer: 18520, activeRate: 74.6, growth: '+10.5%' },
    { id: 'B005', name: '北京分行', code: 'BJ001', city: '北京',
      customers: 18932, balance: 328500000, earned: 145600000, consumed: 98700000,
      avgPerCustomer: 17350, activeRate: 71.2, growth: '+8.8%' },
    { id: 'B006', name: '广东省分行', code: 'GD001', city: '广州',
      customers: 15678, balance: 298600000, earned: 132400000, consumed: 89300000,
      avgPerCustomer: 19040, activeRate: 68.9, growth: '+14.2%' },
    { id: 'B007', name: '山东省分行', code: 'SD001', city: '济南',
      customers: 13245, balance: 245700000, earned: 118900000, consumed: 76500000,
      avgPerCustomer: 18550, activeRate: 65.4, growth: '+6.7%' },
    { id: 'B008', name: '四川省分行', code: 'SC001', city: '成都',
      customers: 11890, balance: 219800000, earned: 98700000, consumed: 67800000,
      avgPerCustomer: 18490, activeRate: 62.8, growth: '+11.3%' },
  ];

  const totalStats = {
    totalBranches: 38,
    totalCustomers: 165636,
    totalBalance: 3223200000,
    totalEarned: 1375300000,
    totalConsumed: 919200000,
    avgGrowth: 12.3,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">机构积分报表</h2>
        <p className="text-gray-600">查看各机构积分发放、消费和余额统计</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+{totalStats.avgGrowth}%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{totalStats.totalBranches}</div>
          <div className="text-sm text-gray-600">机构总数</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+15.8%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{(totalStats.totalBalance / 100000000).toFixed(1)}亿</div>
          <div className="text-sm text-gray-600">积分总余额</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+12.4%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{(totalStats.totalEarned / 100000000).toFixed(1)}亿</div>
          <div className="text-sm text-gray-600">本期发放</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+10.9%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{(totalStats.totalConsumed / 100000000).toFixed(1)}亿</div>
          <div className="text-sm text-gray-600">本期消费</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">机构积分排行</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>本日</option>
                <option>本周</option>
                <option>本月</option>
                <option>本季度</option>
                <option>本年</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-5 h-5" />
              <span>导出</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">排名</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">机构名称</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">机构代码</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">所在城市</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">客户数量</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">积分余额</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">本期发放</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">本期消费</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">人均积分</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 uppercase">活跃率</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 uppercase">增长率</th>
              </tr>
            </thead>
            <tbody>
              {branchData.map((branch, index) => (
                <tr key={branch.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-400 text-yellow-900' :
                      index === 1 ? 'bg-gray-300 text-gray-700' :
                      index === 2 ? 'bg-orange-400 text-orange-900' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">{branch.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{branch.code}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{branch.city}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">{branch.customers.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right font-semibold">
                    {(branch.balance / 10000).toLocaleString()}万
                  </td>
                  <td className="py-4 px-4 text-sm text-green-600 text-right font-medium">
                    {(branch.earned / 10000).toLocaleString()}万
                  </td>
                  <td className="py-4 px-4 text-sm text-red-600 text-right font-medium">
                    {(branch.consumed / 10000).toLocaleString()}万
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">
                    {branch.avgPerCustomer.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${branch.activeRate}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{branch.activeRate}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                      <TrendingUp className="w-3 h-3" />
                      {branch.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">积分余额TOP 10</h3>
          <div className="space-y-4">
            {branchData.slice(0, 5).map((branch, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index === 0 ? 'bg-yellow-400 text-yellow-900' :
                  index === 1 ? 'bg-gray-300 text-gray-700' :
                  index === 2 ? 'bg-orange-400 text-orange-900' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{branch.name}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {(branch.balance / 10000).toLocaleString()}万
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(branch.balance / branchData[0].balance) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">本期发放TOP 10</h3>
          <div className="space-y-4">
            {branchData.slice(0, 5).map((branch, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index === 0 ? 'bg-yellow-400 text-yellow-900' :
                  index === 1 ? 'bg-gray-300 text-gray-700' :
                  index === 2 ? 'bg-orange-400 text-orange-900' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{branch.name}</span>
                    <span className="text-sm font-bold text-green-600">
                      {(branch.earned / 10000).toLocaleString()}万
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(branch.earned / branchData[0].earned) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
