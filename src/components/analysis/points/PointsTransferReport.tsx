import React, { useState } from 'react';
import { ArrowRightLeft, Download, Calendar, TrendingUp } from 'lucide-react';

export default function PointsTransferReport() {
  const [dateRange, setDateRange] = useState('本月');

  const transferData = [
    { id: 'T2025120001', date: '2025-12-30 14:35', from: '江苏交通建设集团', fromPhone: '025-****5678',
      to: '上海建工集团', toPhone: '021-****2345', amount: 5000, status: '成功', reason: '合作共享' },
    { id: 'T2025120002', date: '2025-12-30 13:22', from: '南京钢铁股份', fromPhone: '025-****8901',
      to: '浙江物产化工', toPhone: '0571-****4567', amount: 3200, status: '成功', reason: '业务往来' },
    { id: 'T2025120003', date: '2025-12-30 11:18', from: '苏宁控股集团', fromPhone: '025-****6789',
      to: '北京首钢集团', toPhone: '010-****1234', amount: 4800, status: '成功', reason: '战略合作' },
    { id: 'T2025120004', date: '2025-12-30 10:45', from: '安徽海螺水泥', fromPhone: '0553-****5432',
      to: '扬子江船业', toPhone: '0523-****9876', amount: 2100, status: '成功', reason: '项目合作' },
    { id: 'T2025120005', date: '2025-12-30 09:33', from: '上海电气集团', fromPhone: '021-****6543',
      to: '浙江吉利控股', toPhone: '0571-****2109', amount: 1900, status: '成功', reason: '供应链合作' },
    { id: 'T2025120006', date: '2025-12-29 18:56', from: '江苏沙钢集团', fromPhone: '0512-****3456',
      to: '中天钢铁集团', toPhone: '0519-****7890', amount: 2800, status: '成功', reason: '业务感谢' },
    { id: 'T2025120007', date: '2025-12-29 16:42', from: '徐工集团', fromPhone: '0516-****6789',
      to: '中联重科', toPhone: '0731-****8901', amount: 3400, status: '成功', reason: '技术交流' },
    { id: 'T2025120008', date: '2025-12-29 15:28', from: '恒力集团', fromPhone: '0512-****2345',
      to: '盛虹集团', toPhone: '0512-****5678', amount: 1500, status: '失败', reason: '余额不足' },
  ];

  const topTransferSenders = [
    { rank: 1, name: '江苏交通建设集团', phone: '025-****5678', level: '钻石', branch: '江苏省分行',
      transferOut: 45000, transferCount: 23, avgAmount: 1957 },
    { rank: 2, name: '上海建工集团', phone: '021-****2345', level: '钻石', branch: '上海分行',
      transferOut: 38900, transferCount: 19, avgAmount: 2047 },
    { rank: 3, name: '南京钢铁股份', phone: '025-****8901', level: '钻石', branch: '江苏省分行',
      transferOut: 36700, transferCount: 21, avgAmount: 1748 },
    { rank: 4, name: '浙江物产化工', phone: '0571-****4567', level: '白金', branch: '浙江省分行',
      transferOut: 32100, transferCount: 17, avgAmount: 1888 },
    { rank: 5, name: '苏宁控股集团', phone: '025-****6789', level: '白金', branch: '江苏省分行',
      transferOut: 28900, transferCount: 15, avgAmount: 1927 },
  ];

  const transferStats = {
    totalTransfers: 34210,
    totalAmount: 134000000,
    successRate: 98.7,
    avgAmount: 3917,
    activeUsers: 18456,
    growth: '+16.3%',
  };

  const transferReasons = [
    { reason: '合作共享', count: 8920, percentage: 26.1, amount: 35680000 },
    { reason: '业务往来', count: 7234, percentage: 21.1, amount: 28936000 },
    { reason: '战略合作', count: 6543, percentage: 19.1, amount: 26172000 },
    { reason: '项目合作', count: 5678, percentage: 16.6, amount: 22712000 },
    { reason: '供应链合作', count: 4321, percentage: 12.6, amount: 17284000 },
    { reason: '其他', count: 1514, percentage: 4.4, amount: 6056000 },
  ];

  const transferByLevel = [
    { level: '钻石', transferOut: 42300000, transferIn: 38900000, count: 8234, avgOut: 5138, avgIn: 4725 },
    { level: '白金', transferOut: 35600000, transferIn: 32100000, count: 10567, avgOut: 3369, avgIn: 3038 },
    { level: '黄金', transferOut: 28900000, transferIn: 34500000, count: 9876, avgOut: 2926, avgIn: 3493 },
    { level: '普通', transferOut: 27200000, transferIn: 28500000, count: 5533, avgOut: 4916, avgIn: 5151 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">积分转赠报表</h2>
        <p className="text-gray-600">查看客户间积分转赠详情和统计</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <ArrowRightLeft className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">{transferStats.growth}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{transferStats.totalTransfers.toLocaleString()}</div>
          <div className="text-sm text-gray-600">转赠总笔数</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+18.5%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {(transferStats.totalAmount / 100000000).toFixed(2)}亿
          </div>
          <div className="text-sm text-gray-600">转赠总金额</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <ArrowRightLeft className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+2.3%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{transferStats.avgAmount.toLocaleString()}</div>
          <div className="text-sm text-gray-600">平均每笔</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+12.7%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{transferStats.successRate}%</div>
          <div className="text-sm text-gray-600">成功率</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">转赠明细</h3>
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
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">交易编号</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">交易时间</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">转出方</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">转入方</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">转赠积分</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">转赠原因</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 uppercase">状态</th>
              </tr>
            </thead>
            <tbody>
              {transferData.map((item, index) => (
                <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">{item.id}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{item.date}</td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">{item.from}</div>
                    <div className="text-xs text-gray-500">{item.fromPhone}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">{item.to}</div>
                    <div className="text-xs text-gray-500">{item.toPhone}</div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right font-semibold">
                    {item.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{item.reason}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === '成功' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">显示 1-8 条，共 {transferStats.totalTransfers.toLocaleString()} 条记录</div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">转赠原因分析</h3>
          <div className="space-y-4">
            {transferReasons.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.reason}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{item.count.toLocaleString()}笔</span>
                    <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${item.percentage * 3.8}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">转赠TOP客户</h3>
          <div className="space-y-3">
            {topTransferSenders.map((customer) => (
              <div key={customer.rank} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  customer.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                  customer.rank === 2 ? 'bg-gray-300 text-gray-700' :
                  customer.rank === 3 ? 'bg-orange-400 text-orange-900' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {customer.rank}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{customer.name}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        customer.level === '钻石' ? 'bg-purple-100 text-purple-800' :
                        customer.level === '白金' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {customer.level}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{customer.transferOut.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{customer.branch}</span>
                    <span>{customer.transferCount}笔 · 均{customer.avgAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">等级维度转赠分析</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">客户等级</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">转出总额</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">转入总额</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">转赠笔数</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">平均转出</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">平均转入</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 uppercase">净流向</th>
              </tr>
            </thead>
            <tbody>
              {transferByLevel.map((item, index) => {
                const netFlow = item.transferIn - item.transferOut;
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        item.level === '钻石' ? 'bg-purple-100 text-purple-800' :
                        item.level === '白金' ? 'bg-blue-100 text-blue-800' :
                        item.level === '黄金' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.level}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-red-600 text-right font-medium">
                      -{(item.transferOut / 10000).toLocaleString()}万
                    </td>
                    <td className="py-4 px-4 text-sm text-green-600 text-right font-medium">
                      +{(item.transferIn / 10000).toLocaleString()}万
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right">{item.count.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right">{item.avgOut.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right">{item.avgIn.toLocaleString()}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        netFlow > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {netFlow > 0 ? '+' : ''}{(netFlow / 10000).toLocaleString()}万
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
