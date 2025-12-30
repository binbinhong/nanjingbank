import React, { useState } from 'react';
import { Gift, Download, Calendar, TrendingUp } from 'lucide-react';

export default function CustomerBenefitsReport() {
  const [dateRange, setDateRange] = useState('本月');

  const customerData = [
    { id: 'C001', name: '江苏交通建设集团有限公司', phone: '025-****5678', branch: '江苏省分行', level: '钻石',
      totalExchanges: 89, pointsUsed: 267000, benefitsValue: 534000, favorite: '机场贵宾厅', lastExchange: '2025-12-28' },
    { id: 'C002', name: '上海建工集团股份有限公司', phone: '021-****2345', branch: '上海分行', level: '钻石',
      totalExchanges: 76, pointsUsed: 228000, benefitsValue: 456000, favorite: '酒店优惠券', lastExchange: '2025-12-29' },
    { id: 'C003', name: '南京钢铁股份有限公司', phone: '025-****8901', branch: '江苏省分行', level: '钻石',
      totalExchanges: 82, pointsUsed: 246000, benefitsValue: 492000, favorite: '高尔夫体验', lastExchange: '2025-12-30' },
    { id: 'C004', name: '浙江物产化工集团有限公司', phone: '0571-****4567', branch: '浙江省分行', level: '白金',
      totalExchanges: 64, pointsUsed: 192000, benefitsValue: 384000, favorite: '餐饮折扣', lastExchange: '2025-12-27' },
    { id: 'C005', name: '苏宁控股集团有限公司', phone: '025-****6789', branch: '江苏省分行', level: '白金',
      totalExchanges: 58, pointsUsed: 174000, benefitsValue: 348000, favorite: '健康体检', lastExchange: '2025-12-26' },
    { id: 'C006', name: '北京首钢集团有限公司', phone: '010-****1234', branch: '北京分行', level: '白金',
      totalExchanges: 51, pointsUsed: 153000, benefitsValue: 306000, favorite: '机场贵宾厅', lastExchange: '2025-12-29' },
    { id: 'C007', name: '安徽海螺水泥股份有限公司', phone: '0553-****5432', branch: '安徽省分行', level: '黄金',
      totalExchanges: 43, pointsUsed: 129000, benefitsValue: 258000, favorite: '影院票券', lastExchange: '2025-12-28' },
    { id: 'C008', name: '江苏扬子江船业集团有限公司', phone: '0523-****9876', branch: '江苏省分行', level: '黄金',
      totalExchanges: 37, pointsUsed: 111000, benefitsValue: 222000, favorite: '商超卡券', lastExchange: '2025-12-30' },
  ];

  const stats = {
    totalCustomers: 124560,
    activeExchangers: 45678,
    totalExchanges: 284560,
    totalPointsUsed: 851680000,
    avgExchangesPerCustomer: 6.2,
    satisfactionRate: 94.6,
  };

  const benefitCategories = [
    { category: '旅游出行', exchanges: 8920, users: 6234, pointsUsed: 267600000, satisfaction: 4.8 },
    { category: '酒店住宿', exchanges: 6780, users: 4892, pointsUsed: 203400000, satisfaction: 4.6 },
    { category: '餐饮美食', exchanges: 5340, users: 4123, pointsUsed: 160200000, satisfaction: 4.9 },
    { category: '健康医疗', exchanges: 3890, users: 2789, pointsUsed: 116700000, satisfaction: 4.7 },
    { category: '休闲娱乐', exchanges: 3526, users: 2456, pointsUsed: 105780000, satisfaction: 4.5 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">客户兑换权益报表</h2>
        <p className="text-gray-600">分析客户权益兑换行为和偏好</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-blue-100">活跃兑换客户</span>
            <TrendingUp className="w-5 h-5 text-blue-100" />
          </div>
          <div className="text-3xl font-bold mb-1">{(stats.activeExchangers / 10000).toFixed(1)}万</div>
          <div className="text-sm text-blue-100">占比 {((stats.activeExchangers / stats.totalCustomers) * 100).toFixed(1)}%</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-green-100">总兑换次数</span>
            <Gift className="w-5 h-5 text-green-100" />
          </div>
          <div className="text-3xl font-bold mb-1">{(stats.totalExchanges / 10000).toFixed(1)}万</div>
          <div className="text-sm text-green-100">环比 +18.7%</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-purple-100">消耗积分</span>
            <Gift className="w-5 h-5 text-purple-100" />
          </div>
          <div className="text-3xl font-bold mb-1">{(stats.totalPointsUsed / 100000000).toFixed(2)}亿</div>
          <div className="text-sm text-purple-100">环比 +15.3%</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-orange-100">满意度</span>
            <TrendingUp className="w-5 h-5 text-orange-100" />
          </div>
          <div className="text-3xl font-bold mb-1">{stats.satisfactionRate}%</div>
          <div className="text-sm text-orange-100">人均 {stats.avgExchangesPerCustomer}次</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">客户兑换明细</h3>
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
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">客户编号</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">公司名称</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">所属机构</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 uppercase">客户等级</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">兑换次数</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">消耗积分</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">权益价值</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">偏好权益</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">最近兑换</th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((customer, index) => (
                <tr key={customer.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">{customer.id}</td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">{customer.name}</div>
                    <div className="text-xs text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{customer.branch}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      customer.level === '钻石' ? 'bg-purple-100 text-purple-800' :
                      customer.level === '白金' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {customer.level}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right font-semibold">{customer.totalExchanges}</td>
                  <td className="py-4 px-4 text-sm text-orange-600 text-right font-medium">
                    {customer.pointsUsed.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-sm text-green-600 text-right font-medium">
                    ¥{customer.benefitsValue.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">{customer.favorite}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{customer.lastExchange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">显示 1-8 条，共 {stats.activeExchangers.toLocaleString()} 条记录</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">上一页</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">2</button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">下一页</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">权益类别分析</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">权益类别</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">兑换次数</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">兑换人数</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">消耗积分</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">人均兑换</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 uppercase">满意度</th>
              </tr>
            </thead>
            <tbody>
              {benefitCategories.map((category, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">{category.category}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">{category.exchanges.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">{category.users.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">{(category.pointsUsed / 10000).toLocaleString()}万</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">
                    {(category.exchanges / category.users).toFixed(1)}次
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium text-gray-900">{category.satisfaction}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
