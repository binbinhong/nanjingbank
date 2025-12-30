import React, { useState } from 'react';
import { Search, Download, Filter, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

export default function CustomerPointsReport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('本月');

  const customerData = [
    { id: 'C001', name: '江苏交通建设集团有限公司', phone: '025-****5678', branch: '江苏省分行', level: '钻石',
      balance: 125890, earned: 45200, consumed: 18900, transferred: 5000, expired: 300, trend: '+15.3%' },
    { id: 'C002', name: '上海建工集团股份有限公司', phone: '021-****2345', branch: '上海分行', level: '钻石',
      balance: 118750, earned: 42100, consumed: 15600, transferred: 3200, expired: 150, trend: '+12.8%' },
    { id: 'C003', name: '南京钢铁股份有限公司', phone: '025-****8901', branch: '江苏省分行', level: '钻石',
      balance: 109430, earned: 38900, consumed: 21300, transferred: 4800, expired: 520, trend: '+8.9%' },
    { id: 'C004', name: '浙江物产化工集团有限公司', phone: '0571-****4567', branch: '浙江省分行', level: '白金',
      balance: 98560, earned: 35600, consumed: 19200, transferred: 2100, expired: 240, trend: '+18.5%' },
    { id: 'C005', name: '苏宁控股集团有限公司', phone: '025-****6789', branch: '江苏省分行', level: '白金',
      balance: 92340, earned: 32800, consumed: 16700, transferred: 1900, expired: 380, trend: '+6.7%' },
    { id: 'C006', name: '北京首钢集团有限公司', phone: '010-****1234', branch: '北京分行', level: '白金',
      balance: 87650, earned: 31200, consumed: 14900, transferred: 2800, expired: 190, trend: '+11.2%' },
    { id: 'C007', name: '安徽海螺水泥股份有限公司', phone: '0553-****5432', branch: '安徽省分行', level: '黄金',
      balance: 76540, earned: 28900, consumed: 18200, transferred: 1500, expired: 420, trend: '+5.4%' },
    { id: 'C008', name: '江苏扬子江船业集团有限公司', phone: '0523-****9876', branch: '江苏省分行', level: '黄金',
      balance: 69870, earned: 26500, consumed: 15800, transferred: 3400, expired: 270, trend: '-2.3%' },
    { id: 'C009', name: '上海电气集团股份有限公司', phone: '021-****6543', branch: '上海分行', level: '黄金',
      balance: 63450, earned: 24100, consumed: 13600, transferred: 2200, expired: 350, trend: '+9.8%' },
    { id: 'C010', name: '浙江吉利控股集团有限公司', phone: '0571-****2109', branch: '浙江省分行', level: '黄金',
      balance: 58920, earned: 22800, consumed: 16400, transferred: 1800, expired: 180, trend: '+14.6%' },
  ];

  const summary = {
    totalCustomers: 155826,
    totalBalance: 2458920000,
    totalEarned: 1234567000,
    totalConsumed: 823456700,
    avgBalance: 15780,
    activeRate: 78.6,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">客户积分报表</h2>
        <p className="text-gray-600">查看和分析客户积分详细数据</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-blue-100">客户总数</span>
            <TrendingUp className="w-5 h-5 text-blue-100" />
          </div>
          <div className="text-3xl font-bold mb-1">{summary.totalCustomers.toLocaleString()}</div>
          <div className="text-sm text-blue-100">活跃率 {summary.activeRate}%</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-green-100">积分总余额</span>
            <TrendingUp className="w-5 h-5 text-green-100" />
          </div>
          <div className="text-3xl font-bold mb-1">{(summary.totalBalance / 100000000).toFixed(2)}亿</div>
          <div className="text-sm text-green-100">平均 {summary.avgBalance.toLocaleString()} 分/人</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-purple-100">本期发放</span>
            <TrendingUp className="w-5 h-5 text-purple-100" />
          </div>
          <div className="text-3xl font-bold mb-1">{(summary.totalEarned / 100000000).toFixed(2)}亿</div>
          <div className="text-sm text-purple-100">消费 {(summary.totalConsumed / 100000000).toFixed(2)}亿</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索公司名称、联系电话、客户编号..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span className="hidden md:inline">筛选</span>
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-5 h-5" />
            <span>导出报表</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">客户编号</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">公司名称</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">联系电话</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">所属机构</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 uppercase">客户等级</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">积分余额</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">本期获得</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">本期消费</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">转赠积分</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">过期积分</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 uppercase">增长趋势</th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((customer, index) => (
                <tr key={customer.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">{customer.id}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{customer.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{customer.phone}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{customer.branch}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      customer.level === '钻石' ? 'bg-purple-100 text-purple-800' :
                      customer.level === '白金' ? 'bg-blue-100 text-blue-800' :
                      customer.level === '黄金' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.level}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right font-semibold">{customer.balance.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-green-600 text-right font-medium">+{customer.earned.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-red-600 text-right font-medium">-{customer.consumed.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-orange-600 text-right font-medium">-{customer.transferred.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-gray-500 text-right">-{customer.expired.toLocaleString()}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                      customer.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {customer.trend.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {customer.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            显示 1-10 条，共 {summary.totalCustomers.toLocaleString()} 条记录
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">上一页</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">3</button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}
