import React, { useState } from 'react';
import { Building2, Download, Calendar, TrendingUp, Star } from 'lucide-react';

export default function SupplierBenefitsReport() {
  const [dateRange, setDateRange] = useState('本月');

  const supplierData = [
    { id: 'S001', name: '携程旅行', category: '旅游出行', cooperationDate: '2020-03-15',
      totalExchanges: 56700, revenue: 17010000, satisfaction: 4.8, activeProducts: 245, trend: '+18.5%' },
    { id: 'S002', name: '如家酒店', category: '酒店住宿', cooperationDate: '2019-06-20',
      totalExchanges: 42300, revenue: 12690000, satisfaction: 4.6, activeProducts: 189, trend: '+15.3%' },
    { id: 'S003', name: '海底捞', category: '餐饮美食', cooperationDate: '2021-01-10',
      totalExchanges: 38900, revenue: 11670000, satisfaction: 4.9, activeProducts: 156, trend: '+22.7%' },
    { id: 'S004', name: '美年大健康', category: '健康医疗', cooperationDate: '2020-09-05',
      totalExchanges: 23400, revenue: 9360000, satisfaction: 4.7, activeProducts: 87, trend: '+12.8%' },
    { id: 'S005', name: '万达影城', category: '休闲娱乐', cooperationDate: '2019-11-18',
      totalExchanges: 18900, revenue: 3780000, satisfaction: 4.5, activeProducts: 134, trend: '+8.9%' },
    { id: 'S006', name: '星巴克', category: '餐饮美食', cooperationDate: '2020-04-22',
      totalExchanges: 34560, revenue: 6912000, satisfaction: 4.8, activeProducts: 98, trend: '+16.4%' },
    { id: 'S007', name: '京东商城', category: '购物消费', cooperationDate: '2018-12-01',
      totalExchanges: 67800, revenue: 20340000, satisfaction: 4.7, activeProducts: 1245, trend: '+14.2%' },
    { id: 'S008', name: '健身环球', category: '运动健身', cooperationDate: '2021-03-08',
      totalExchanges: 15670, revenue: 6268000, satisfaction: 4.6, activeProducts: 76, trend: '+19.3%' },
  ];

  const stats = {
    totalSuppliers: 156,
    activeSuppliers: 142,
    totalRevenue: 135680000,
    avgSatisfaction: 4.7,
    totalProducts: 4567,
    growth: '+16.8%',
  };

  const topCategories = [
    { category: '旅游出行', suppliers: 28, exchanges: 89200, revenue: 26760000 },
    { category: '酒店住宿', suppliers: 35, exchanges: 67800, revenue: 20340000 },
    { category: '餐饮美食', suppliers: 42, exchanges: 78900, revenue: 19725000 },
    { category: '健康医疗', suppliers: 18, exchanges: 34560, revenue: 13824000 },
    { category: '休闲娱乐', suppliers: 33, exchanges: 56700, revenue: 11340000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">供应商权益报表</h2>
        <p className="text-gray-600">供应商合作绩效和权益提供分析</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+12</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.activeSuppliers}</div>
          <div className="text-sm text-gray-600">活跃供应商（共{stats.totalSuppliers}家）</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">{stats.growth}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            ¥{(stats.totalRevenue / 10000).toLocaleString()}万
          </div>
          <div className="text-sm text-gray-600">总交易金额</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+0.3</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.avgSatisfaction}</div>
          <div className="text-sm text-gray-600">平均满意度</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Building2 className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+285</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalProducts.toLocaleString()}</div>
          <div className="text-sm text-gray-600">在架权益产品</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">供应商绩效排行</h3>
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
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">供应商名称</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">业务类别</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">合作日期</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">兑换次数</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">交易金额</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 uppercase">满意度</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">在架产品</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 uppercase">增长率</th>
              </tr>
            </thead>
            <tbody>
              {supplierData.map((supplier, index) => (
                <tr key={supplier.id} className="border-b border-gray-100 hover:bg-gray-50">
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
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">{supplier.name}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {supplier.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{supplier.cooperationDate}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">{supplier.totalExchanges.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right font-semibold">
                    ¥{(supplier.revenue / 10000).toLocaleString()}万
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium text-gray-900">{supplier.satisfaction}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">{supplier.activeProducts}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                      <TrendingUp className="w-3 h-3" />
                      {supplier.trend}
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
          <h3 className="text-lg font-semibold text-gray-900 mb-6">类别分布</h3>
          <div className="space-y-4">
            {topCategories.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-900">{item.category}</span>
                    <span className="text-xs text-gray-500">{item.suppliers}家供应商</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">¥{(item.revenue / 10000).toLocaleString()}万</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(item.revenue / topCategories[0].revenue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">TOP供应商对比</h3>
          <div className="space-y-4">
            {supplierData.slice(0, 5).map((supplier, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  index === 0 ? 'bg-yellow-400 text-yellow-900' :
                  index === 1 ? 'bg-gray-300 text-gray-700' :
                  index === 2 ? 'bg-orange-400 text-orange-900' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{supplier.name}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-xs">★</span>
                      <span className="text-sm font-medium text-gray-900">{supplier.satisfaction}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{supplier.totalExchanges.toLocaleString()}次</span>
                    <span>¥{(supplier.revenue / 10000).toLocaleString()}万</span>
                    <span className="text-green-600">{supplier.trend}</span>
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
