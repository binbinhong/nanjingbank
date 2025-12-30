import React, { useState } from 'react';
import { FileText, Search, Filter, Download, Calendar } from 'lucide-react';

const Ledger: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('month');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">积分运营台账</h2>
          <p className="text-gray-600">记录每笔积分的生命周期,支持审计追溯</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Download className="w-4 h-4" />
          <span>导出台账</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">台账总数</p>
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">45.6万</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">已消耗</p>
            <Calendar className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">28.3万</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">未消耗</p>
            <Calendar className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-600">15.8万</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">已过期</p>
            <Calendar className="w-5 h-5 text-gray-600" />
          </div>
          <p className="text-2xl font-bold text-gray-600">1.5万</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">消耗率</p>
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-600">62.1%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索客户、机构、场景..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
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
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  生成时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  来源场景
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  客户
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  积分价值
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  归属机构
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  消耗状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  核销时间
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    2024-12-{30 - i} 10:{i}5:00
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    存款业务
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    南京XX科技有限公司
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-600">
                    {1000 * i}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    南京分行
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      i % 3 === 0
                        ? 'bg-green-100 text-green-700'
                        : i % 3 === 1
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {i % 3 === 0 ? '已消耗' : i % 3 === 1 ? '未消耗' : '已过期'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {i % 3 === 0 ? `2024-12-${30 - i} 15:00:00` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>提示：</strong>积分台账保留3年以上,支持按机构、时间、积分类型筛选查询,满足审计追溯需求。
        </p>
      </div>
    </div>
  );
};

export default Ledger;
