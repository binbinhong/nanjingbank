import React, { useState } from 'react';
import { TrendingUp, Download, Calendar, DollarSign, Award } from 'lucide-react';

export default function LevelContributionReport() {
  const [dateRange, setDateRange] = useState('本月');

  const contributionData = [
    { level: '钻石', customers: 2345, customerRatio: 1.5,
      aum: 158.9, aumRatio: 42.8, profit: 45.8, profitRatio: 38.5,
      avgAUM: 6780, avgProfit: 195300, pointsUsed: 1250000, benefitsUsed: 8920,
      growth: '+18.3%', color: 'purple' },
    { level: '白金', customers: 8921, customerRatio: 5.7,
      aum: 312.5, aumRatio: 32.4, profit: 68.4, profitRatio: 35.6,
      avgAUM: 3520, avgProfit: 76700, pointsUsed: 3180000, benefitsUsed: 12340,
      growth: '+15.7%', color: 'blue' },
    { level: '黄金', customers: 18670, customerRatio: 12.0,
      aum: 285.7, aumRatio: 18.2, profit: 42.3, profitRatio: 20.8,
      avgAUM: 1580, avgProfit: 22660, pointsUsed: 2890000, benefitsUsed: 5670,
      growth: '+12.4%', color: 'yellow' },
    { level: '普通', customers: 125890, customerRatio: 80.8,
      aum: 180.4, aumRatio: 6.6, profit: 18.9, profitRatio: 5.1,
      avgAUM: 420, avgProfit: 1500, pointsUsed: 914567, benefitsUsed: 1526,
      growth: '-2.1%', color: 'gray' },
  ];

  const monthlyTrend = [
    { month: '7月', diamond: 42.5, platinum: 63.2, gold: 38.9, normal: 16.8 },
    { month: '8月', diamond: 43.1, platinum: 64.8, gold: 39.7, normal: 17.2 },
    { month: '9月', diamond: 43.9, platinum: 66.2, gold: 40.5, normal: 17.8 },
    { month: '10月', diamond: 44.6, platinum: 67.1, gold: 41.2, normal: 18.1 },
    { month: '11月', diamond: 45.2, platinum: 67.8, gold: 41.8, normal: 18.5 },
    { month: '12月', diamond: 45.8, platinum: 68.4, gold: 42.3, normal: 18.9 },
  ];

  const productContribution = [
    { product: '存款', diamond: 45.2, platinum: 32.8, gold: 18.6, normal: 3.4 },
    { product: '理财', diamond: 52.3, platinum: 28.9, gold: 14.7, normal: 4.1 },
    { product: '基金', diamond: 38.7, platinum: 34.2, gold: 21.4, normal: 5.7 },
    { product: '保险', diamond: 41.5, platinum: 31.6, gold: 19.8, normal: 7.1 },
    { product: '贷款', diamond: 28.9, platinum: 35.4, gold: 26.7, normal: 9.0 },
  ];

  const totalAUM = contributionData.reduce((sum, item) => sum + item.aum, 0);
  const totalProfit = contributionData.reduce((sum, item) => sum + item.profit, 0);
  const totalCustomers = contributionData.reduce((sum, item) => sum + item.customers, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">等级贡献度报表</h2>
        <p className="text-gray-600">分析各等级客户对银行业务的贡献价值</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-blue-100">总资产规模</span>
            <TrendingUp className="w-5 h-5 text-blue-100" />
          </div>
          <div className="text-3xl font-bold mb-1">{totalAUM.toFixed(1)}亿</div>
          <div className="text-sm text-blue-100">人均 {(totalAUM * 100000000 / totalCustomers / 10000).toFixed(0)}万</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-green-100">总利润贡献</span>
            <DollarSign className="w-5 h-5 text-green-100" />
          </div>
          <div className="text-3xl font-bold mb-1">{totalProfit.toFixed(1)}万</div>
          <div className="text-sm text-green-100">环比 +14.8%</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-purple-100">高端客户占比</span>
            <Award className="w-5 h-5 text-purple-100" />
          </div>
          <div className="text-3xl font-bold mb-1">19.2%</div>
          <div className="text-sm text-purple-100">贡献{((contributionData[0].profitRatio + contributionData[1].profitRatio + contributionData[2].profitRatio)).toFixed(1)}%利润</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-orange-100">人均产值</span>
            <TrendingUp className="w-5 h-5 text-orange-100" />
          </div>
          <div className="text-3xl font-bold mb-1">{Math.round(totalProfit * 10000 / totalCustomers).toLocaleString()}</div>
          <div className="text-sm text-orange-100">元/人</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">等级贡献度对比</h3>
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
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">客户等级</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">客户数量</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">占比</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">资产规模(亿)</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">资产占比</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">利润贡献(万)</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">利润占比</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">人均AUM(万)</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">人均利润(元)</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 uppercase">增长率</th>
              </tr>
            </thead>
            <tbody>
              {contributionData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      item.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                      item.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                      item.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.level}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">{item.customers.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 text-right">{item.customerRatio}%</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right font-semibold">{item.aum.toFixed(1)}</td>
                  <td className="py-4 px-4 text-sm text-blue-600 text-right font-medium">{item.aumRatio}%</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right font-semibold">{item.profit.toFixed(1)}</td>
                  <td className="py-4 px-4 text-sm text-green-600 text-right font-medium">{item.profitRatio}%</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">{item.avgAUM.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">{item.avgProfit.toLocaleString()}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.growth.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.growth.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <span>↓</span>}
                      {item.growth}
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
          <h3 className="text-lg font-semibold text-gray-900 mb-6">利润贡献趋势（近6个月）</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">月份</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">钻石</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">白金</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">黄金</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">普通</th>
                </tr>
              </thead>
              <tbody>
                {monthlyTrend.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-3 text-gray-900 font-medium">{item.month}</td>
                    <td className="py-3 px-3 text-purple-600 text-right font-medium">{item.diamond.toFixed(1)}万</td>
                    <td className="py-3 px-3 text-blue-600 text-right font-medium">{item.platinum.toFixed(1)}万</td>
                    <td className="py-3 px-3 text-yellow-600 text-right font-medium">{item.gold.toFixed(1)}万</td>
                    <td className="py-3 px-3 text-gray-600 text-right font-medium">{item.normal.toFixed(1)}万</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">产品贡献度分布</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">产品</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">钻石</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">白金</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">黄金</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">普通</th>
                </tr>
              </thead>
              <tbody>
                {productContribution.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-3 text-gray-900 font-medium">{item.product}</td>
                    <td className="py-3 px-3 text-purple-600 text-right">{item.diamond.toFixed(1)}%</td>
                    <td className="py-3 px-3 text-blue-600 text-right">{item.platinum.toFixed(1)}%</td>
                    <td className="py-3 px-3 text-yellow-600 text-right">{item.gold.toFixed(1)}%</td>
                    <td className="py-3 px-3 text-gray-600 text-right">{item.normal.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">积分权益使用情况</h3>
          <div className="space-y-4">
            {contributionData.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    item.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                    item.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                    item.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.level}
                  </span>
                  <span className="text-sm text-gray-600">{item.customers.toLocaleString()}人</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">积分使用</div>
                    <div className="text-lg font-bold text-gray-900">{item.pointsUsed.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">人均 {Math.round(item.pointsUsed / item.customers).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">权益兑换</div>
                    <div className="text-lg font-bold text-gray-900">{item.benefitsUsed.toLocaleString()}次</div>
                    <div className="text-xs text-gray-500">人均 {(item.benefitsUsed / item.customers).toFixed(1)}次</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">价值创造分析</h3>
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-600 mb-3">资产集中度</div>
              <div className="space-y-2">
                {contributionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-16 text-xs text-gray-700">{item.level}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.color === 'purple' ? 'bg-purple-600' :
                          item.color === 'blue' ? 'bg-blue-600' :
                          item.color === 'yellow' ? 'bg-yellow-500' :
                          'bg-gray-400'
                        }`}
                        style={{ width: `${item.aumRatio * 2.33}%` }}
                      />
                    </div>
                    <div className="w-12 text-xs text-gray-900 text-right font-medium">{item.aumRatio}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-3">利润集中度</div>
              <div className="space-y-2">
                {contributionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-16 text-xs text-gray-700">{item.level}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.color === 'purple' ? 'bg-purple-600' :
                          item.color === 'blue' ? 'bg-blue-600' :
                          item.color === 'yellow' ? 'bg-yellow-500' :
                          'bg-gray-400'
                        }`}
                        style={{ width: `${item.profitRatio * 2.6}%` }}
                      />
                    </div>
                    <div className="w-12 text-xs text-gray-900 text-right font-medium">{item.profitRatio}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
