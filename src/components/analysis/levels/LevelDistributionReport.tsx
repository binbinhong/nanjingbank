import React, { useState } from 'react';
import { Users, Download, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

export default function LevelDistributionReport() {
  const [dateRange, setDateRange] = useState('本月');

  const levelData = [
    { level: '钻石', count: 2345, percentage: 1.5, growth: '+15.8%', newThisMonth: 123, downgraded: 45,
      avgAge: 48, avgAssets: 6780, avgPoints: 125890, color: 'bg-purple-600' },
    { level: '白金', count: 8921, percentage: 5.7, growth: '+12.3%', newThisMonth: 567, downgraded: 89,
      avgAge: 42, avgAssets: 3520, avgPoints: 92340, color: 'bg-blue-600' },
    { level: '黄金', count: 18670, percentage: 12.0, growth: '+8.7%', newThisMonth: 1234, downgraded: 345,
      avgAge: 38, avgAssets: 1580, avgPoints: 58920, color: 'bg-yellow-500' },
    { level: '普通', count: 125890, percentage: 80.8, growth: '-2.1%', newThisMonth: 3456, downgraded: 0,
      avgAge: 35, avgAssets: 420, avgPoints: 12560, color: 'bg-gray-400' },
  ];

  const branchDistribution = [
    { branch: '江苏省分行', diamond: 856, platinum: 3234, gold: 6789, normal: 38920 },
    { branch: '上海分行', diamond: 712, platinum: 2678, gold: 5432, normal: 32145 },
    { branch: '浙江省分行', diamond: 534, platinum: 1987, gold: 4123, normal: 25678 },
    { branch: '安徽省分行', diamond: 243, platinum: 1022, gold: 2326, normal: 18943 },
    { branch: '北京分行', diamond: 0, platinum: 0, gold: 0, normal: 10204 },
  ];

  const levelUpgrades = [
    { month: '7月', normalToGold: 987, goldToPlatinum: 456, platinumToDiamond: 89 },
    { month: '8月', normalToGold: 1023, goldToPlatinum: 478, platinumToDiamond: 92 },
    { month: '9月', normalToGold: 1156, goldToPlatinum: 512, platinumToDiamond: 103 },
    { month: '10月', normalToGold: 1189, goldToPlatinum: 534, platinumToDiamond: 108 },
    { month: '11月', normalToGold: 1207, goldToPlatinum: 551, platinumToDiamond: 115 },
    { month: '12月', normalToGold: 1234, goldToPlatinum: 567, platinumToDiamond: 123 },
  ];

  const totalCustomers = levelData.reduce((sum, item) => sum + item.count, 0);
  const totalNew = levelData.reduce((sum, item) => sum + item.newThisMonth, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">客户等级分布报表</h2>
        <p className="text-gray-600">分析各等级客户分布和变化趋势</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {levelData.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${item.color.replace('bg-', 'bg-').replace('600', '50')} ${item.color.replace('bg-', 'text-')}`}>
                <Users className="w-6 h-6" />
              </div>
              <span className={`text-sm font-medium ${item.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {item.growth}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{item.count.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mb-3">{item.level}客户 ({item.percentage}%)</div>
            <div className="text-xs text-gray-500">
              本月新增 {item.newThisMonth} 人
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">等级分布可视化</h3>
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
          </div>

          <div className="relative mb-8" style={{ height: '280px' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  {levelData.map((item, index) => {
                    const prevPercentage = levelData.slice(0, index).reduce((sum, i) => sum + i.percentage, 0);
                    const radius = 35;
                    const circumference = 2 * Math.PI * radius;
                    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -((prevPercentage / 100) * circumference);
                    const colorMap: Record<string, string> = {
                      'bg-purple-600': '#9333ea',
                      'bg-blue-600': '#2563eb',
                      'bg-yellow-500': '#eab308',
                      'bg-gray-400': '#9ca3af'
                    };

                    return (
                      <circle
                        key={index}
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke={colorMap[item.color]}
                        strokeWidth="20"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-gray-900">{totalCustomers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">总客户数</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {levelData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded ${item.color}`}></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{item.level}</div>
                  <div className="text-xs text-gray-500">{item.count.toLocaleString()}人 · {item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">等级详细指标</h3>
          <div className="space-y-4">
            {levelData.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${item.color.replace('bg-', 'bg-').replace('600', '100').replace('500', '100').replace('400', '100')} ${item.color.replace('bg-', 'text-').replace('600', '800').replace('500', '800').replace('400', '800')}`}>
                    {item.level}
                  </span>
                  <span className="text-lg font-bold text-gray-900">{item.count.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-gray-500">平均年龄</div>
                    <div className="font-semibold text-gray-900">{item.avgAge}岁</div>
                  </div>
                  <div>
                    <div className="text-gray-500">平均资产</div>
                    <div className="font-semibold text-gray-900">{item.avgAssets}万</div>
                  </div>
                  <div>
                    <div className="text-gray-500">平均积分</div>
                    <div className="font-semibold text-gray-900">{item.avgPoints.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">本月新增</div>
                    <div className="font-semibold text-green-600">+{item.newThisMonth}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">机构等级分布</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-5 h-5" />
            <span>导出</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">机构名称</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">钻石客户</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">白金客户</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">黄金客户</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">普通客户</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">客户总数</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 uppercase">高端占比</th>
              </tr>
            </thead>
            <tbody>
              {branchDistribution.map((branch, index) => {
                const total = branch.diamond + branch.platinum + branch.gold + branch.normal;
                const highEndRate = ((branch.diamond + branch.platinum + branch.gold) / total * 100).toFixed(1);
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-900 font-medium">{branch.branch}</td>
                    <td className="py-4 px-4 text-sm text-purple-600 text-right font-medium">{branch.diamond.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-blue-600 text-right font-medium">{branch.platinum.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-yellow-600 text-right font-medium">{branch.gold.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-gray-600 text-right font-medium">{branch.normal.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right font-bold">{total.toLocaleString()}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                        {highEndRate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">等级晋升趋势（近6个月）</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">月份</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">普通→黄金</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">黄金→白金</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">白金→钻石</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">总晋升人数</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 uppercase">环比</th>
              </tr>
            </thead>
            <tbody>
              {levelUpgrades.map((item, index) => {
                const total = item.normalToGold + item.goldToPlatinum + item.platinumToDiamond;
                const prevTotal = index > 0 ? levelUpgrades[index - 1].normalToGold + levelUpgrades[index - 1].goldToPlatinum + levelUpgrades[index - 1].platinumToDiamond : total;
                const growth = ((total - prevTotal) / prevTotal * 100).toFixed(1);
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-900 font-medium">{item.month}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right">{item.normalToGold.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right">{item.goldToPlatinum.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right">{item.platinumToDiamond.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right font-bold">{total.toLocaleString()}</td>
                    <td className="py-4 px-4 text-center">
                      {index > 0 && (
                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                          parseFloat(growth) >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {parseFloat(growth) >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {growth}%
                        </span>
                      )}
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
