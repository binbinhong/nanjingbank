import React, { useState } from 'react';
import { ShoppingBag, Download, Calendar, PieChart } from 'lucide-react';

export default function PointsConsumptionReport() {
  const [dateRange, setDateRange] = useState('本月');

  const consumptionByCategory = [
    { category: '商城兑换', amount: 328000000, count: 152340, percentage: 39.8, avgPerOrder: 2153, color: 'bg-blue-600' },
    { category: '权益兑换', amount: 267000000, count: 87650, percentage: 32.4, avgPerOrder: 3046, color: 'bg-green-600' },
    { category: '积分转赠', amount: 134000000, count: 34210, percentage: 16.3, avgPerOrder: 3917, color: 'bg-purple-600' },
    { category: '慈善捐赠', amount: 94456700, count: 21340, percentage: 11.5, avgPerOrder: 4426, color: 'bg-orange-600' },
  ];

  const consumptionTrend = [
    { month: '7月', mall: 285600, benefits: 234100, transfer: 118900, donation: 78500 },
    { month: '8月', mall: 298700, benefits: 245800, transfer: 125600, donation: 82400 },
    { month: '9月', mall: 312400, benefits: 256700, transfer: 129800, donation: 87300 },
    { month: '10月', mall: 324500, benefits: 264900, transfer: 132100, donation: 89600 },
    { month: '11月', mall: 318900, benefits: 267000, transfer: 134000, donation: 91200 },
    { month: '12月', mall: 328000, benefits: 271400, transfer: 136700, donation: 94457 },
  ];

  const topConsumers = [
    { rank: 1, name: '江苏交通建设集团', level: '钻石', branch: '江苏省分行', consumed: 189000, orders: 245, avgOrder: 771 },
    { rank: 2, name: '上海建工集团', level: '钻石', branch: '上海分行', consumed: 156000, orders: 198, avgOrder: 788 },
    { rank: 3, name: '南京钢铁股份', level: '钻石', branch: '江苏省分行', consumed: 213000, orders: 287, avgOrder: 742 },
    { rank: 4, name: '浙江物产化工', level: '白金', branch: '浙江省分行', consumed: 192000, orders: 256, avgOrder: 750 },
    { rank: 5, name: '苏宁控股集团', level: '白金', branch: '江苏省分行', consumed: 167000, orders: 223, avgOrder: 749 },
    { rank: 6, name: '北京首钢集团', level: '白金', branch: '北京分行', consumed: 149000, orders: 201, avgOrder: 741 },
    { rank: 7, name: '安徽海螺水泥', level: '黄金', branch: '安徽省分行', consumed: 182000, orders: 267, avgOrder: 682 },
    { rank: 8, name: '扬子江船业', level: '黄金', branch: '江苏省分行', consumed: 158000, orders: 234, avgOrder: 675 },
  ];

  const consumptionByTime = [
    { hour: '00-06', amount: 12450000, percentage: 1.5 },
    { hour: '06-09', amount: 58900000, percentage: 7.1 },
    { hour: '09-12', amount: 156700000, percentage: 19.0 },
    { hour: '12-15', amount: 198400000, percentage: 24.1 },
    { hour: '15-18', amount: 167800000, percentage: 20.4 },
    { hour: '18-21', amount: 178900000, percentage: 21.7 },
    { hour: '21-24', amount: 50306700, percentage: 6.1 },
  ];

  const totalConsumption = consumptionByCategory.reduce((sum, item) => sum + item.amount, 0);
  const totalOrders = consumptionByCategory.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">积分消费报表</h2>
        <p className="text-gray-600">分析客户积分消费行为和趋势</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-blue-100">总消费金额</span>
            <ShoppingBag className="w-5 h-5 text-blue-100" />
          </div>
          <div className="text-3xl font-bold mb-1">{(totalConsumption / 100000000).toFixed(2)}亿</div>
          <div className="text-sm text-blue-100">环比 +12.8%</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-green-100">总订单数</span>
            <ShoppingBag className="w-5 h-5 text-green-100" />
          </div>
          <div className="text-3xl font-bold mb-1">{(totalOrders / 10000).toFixed(1)}万</div>
          <div className="text-sm text-green-100">环比 +8.3%</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-purple-100">客单价</span>
            <PieChart className="w-5 h-5 text-purple-100" />
          </div>
          <div className="text-3xl font-bold mb-1">{Math.round(totalConsumption / totalOrders).toLocaleString()}</div>
          <div className="text-sm text-purple-100">积分/单</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-orange-100">活跃用户</span>
            <ShoppingBag className="w-5 h-5 text-orange-100" />
          </div>
          <div className="text-3xl font-bold mb-1">12.4万</div>
          <div className="text-sm text-orange-100">环比 +15.7%</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">消费分类统计</h3>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="space-y-4">
              {consumptionByCategory.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-900">{item.category}</span>
                    <span className="text-lg font-bold text-gray-900">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div
                      className={`h-3 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <div className="text-gray-500">消费金额</div>
                      <div className="font-semibold text-gray-900">{(item.amount / 10000).toLocaleString()}万</div>
                    </div>
                    <div>
                      <div className="text-gray-500">订单数</div>
                      <div className="font-semibold text-gray-900">{item.count.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">平均订单</div>
                      <div className="font-semibold text-gray-900">{item.avgPerOrder.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="relative" style={{ height: '400px' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {consumptionByCategory.map((item, index) => {
                      const prevPercentage = consumptionByCategory.slice(0, index).reduce((sum, i) => sum + i.percentage, 0);
                      const radius = 35;
                      const circumference = 2 * Math.PI * radius;
                      const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -((prevPercentage / 100) * circumference);

                      return (
                        <circle
                          key={index}
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="none"
                          stroke={item.color.replace('bg-', '#').replace('blue-600', '2563eb').replace('green-600', '16a34a').replace('purple-600', '9333ea').replace('orange-600', 'ea580c')}
                          strokeWidth="20"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-gray-900">{(totalConsumption / 100000000).toFixed(1)}亿</div>
                    <div className="text-sm text-gray-600">总消费</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">消费时段分布</h3>
          <div className="space-y-3">
            {consumptionByTime.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.hour}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{(item.amount / 10000).toLocaleString()}万</span>
                    <span className="text-sm font-bold text-gray-900 w-12 text-right">{item.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${item.percentage * 4}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">消费TOP客户</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-xs">
                  <th className="text-left py-2 px-2 font-semibold text-gray-700">排名</th>
                  <th className="text-left py-2 px-2 font-semibold text-gray-700">公司名称</th>
                  <th className="text-center py-2 px-2 font-semibold text-gray-700">等级</th>
                  <th className="text-right py-2 px-2 font-semibold text-gray-700">消费积分</th>
                </tr>
              </thead>
              <tbody>
                {topConsumers.map((customer) => (
                  <tr key={customer.rank} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        customer.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                        customer.rank === 2 ? 'bg-gray-300 text-gray-700' :
                        customer.rank === 3 ? 'bg-orange-400 text-orange-900' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {customer.rank}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-900">{customer.name}</td>
                    <td className="py-3 px-2 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        customer.level === '钻石' ? 'bg-purple-100 text-purple-800' :
                        customer.level === '白金' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {customer.level}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-900 text-right font-semibold">
                      {customer.consumed.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">消费趋势（近6个月）</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">月份</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">商城兑换</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">权益兑换</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">积分转赠</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">慈善捐赠</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">总计</th>
              </tr>
            </thead>
            <tbody>
              {consumptionTrend.map((item, index) => {
                const total = item.mall + item.benefits + item.transfer + item.donation;
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-900 font-medium">{item.month}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right">{item.mall.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right">{item.benefits.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right">{item.transfer.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right">{item.donation.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right font-bold">{total.toLocaleString()}</td>
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
