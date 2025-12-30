import React, { useState } from 'react';
import { Search, Filter, Calendar, CheckCircle, XCircle, Users, Award, Building, Download } from 'lucide-react';

interface DistributionRecord {
  id: string;
  customerName: string;
  customerType: 'enterprise' | 'personal';
  ruleName: string;
  points: number;
  businessType: string;
  businessAmount: number;
  distributionTime: string;
  status: 'success' | 'failed';
  failReason?: string;
  branch: string;
}

const AutoDistribution: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDate, setFilterDate] = useState('today');

  const records: DistributionRecord[] = [
    {
      id: '1',
      customerName: '南京XX科技有限公司',
      customerType: 'enterprise',
      ruleName: '存款达标奖励',
      points: 10000,
      businessType: '定期存款',
      businessAmount: 1000000,
      distributionTime: '2024-12-30 10:30:15',
      status: 'success',
      branch: '南京分行'
    },
    {
      id: '2',
      customerName: '张三',
      customerType: 'personal',
      ruleName: '结算交易积分',
      points: 50,
      businessType: '转账结算',
      businessAmount: 50000,
      distributionTime: '2024-12-30 10:28:32',
      status: 'success',
      branch: '南京分行'
    },
    {
      id: '3',
      customerName: '江苏XX贸易公司',
      customerType: 'enterprise',
      ruleName: '产品购买奖励',
      points: 5000,
      businessType: '理财产品',
      businessAmount: 500000,
      distributionTime: '2024-12-30 10:25:18',
      status: 'success',
      branch: '苏州分行'
    },
    {
      id: '4',
      customerName: '李四',
      customerType: 'personal',
      ruleName: '信用卡消费积分',
      points: 0,
      businessType: '信用卡消费',
      businessAmount: 8800,
      distributionTime: '2024-12-30 10:20:45',
      status: 'failed',
      failReason: '客户账户状态异常',
      branch: '南京分行'
    },
    {
      id: '5',
      customerName: '南京YY企业集团',
      customerType: 'enterprise',
      ruleName: '存款达标奖励',
      points: 20000,
      businessType: '定期存款',
      businessAmount: 2000000,
      distributionTime: '2024-12-30 10:15:22',
      status: 'success',
      branch: '南京分行'
    },
    {
      id: '6',
      customerName: '王五',
      customerType: 'personal',
      ruleName: '结算交易积分',
      points: 30,
      businessType: '转账结算',
      businessAmount: 30000,
      distributionTime: '2024-12-30 10:12:08',
      status: 'success',
      branch: '无锡分行'
    }
  ];

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.ruleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.businessType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalRecords: records.length,
    successCount: records.filter(r => r.status === 'success').length,
    failedCount: records.filter(r => r.status === 'failed').length,
    totalPoints: records.filter(r => r.status === 'success').reduce((sum, r) => sum + r.points, 0),
    successRate: ((records.filter(r => r.status === 'success').length / records.length) * 100).toFixed(1)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">自动发放明细</h2>
          <p className="text-gray-600">查看系统自动计算并发放的积分明细记录</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          <span>导出明细</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">发放笔数</p>
            <Award className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.totalRecords}</p>
          <p className="text-xs text-gray-500 mt-1">笔</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">成功笔数</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.successCount}</p>
          <p className="text-xs text-gray-500 mt-1">笔</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">失败笔数</p>
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.failedCount}</p>
          <p className="text-xs text-gray-500 mt-1">笔</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">发放总积分</p>
            <Award className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-600">{(stats.totalPoints / 10000).toFixed(1)}万</p>
          <p className="text-xs text-gray-500 mt-1">分</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">成功率</p>
            <CheckCircle className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-600">{stats.successRate}%</p>
          <p className="text-xs text-gray-500 mt-1">比率</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索客户名称、规则名称或业务类型..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">今天</option>
                <option value="yesterday">昨天</option>
                <option value="week">本周</option>
                <option value="month">本月</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">全部状态</option>
                <option value="success">成功</option>
                <option value="failed">失败</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  客户信息
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  发放规则
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  业务类型
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  业务金额
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  发放积分
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  发放时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-2 ${record.customerType === 'enterprise' ? 'bg-blue-100' : 'bg-purple-100'} rounded-lg mr-3`}>
                        {record.customerType === 'enterprise' ? (
                          <Building className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Users className="w-5 h-5 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{record.customerName}</div>
                        <div className="text-xs text-gray-500">{record.branch}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{record.ruleName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{record.businessType}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      ¥{record.businessAmount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-orange-600">
                      {record.points.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{record.distributionTime}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.status === 'success' ? (
                      <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        成功
                      </span>
                    ) : (
                      <div className="flex flex-col">
                        <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 mb-1">
                          <XCircle className="w-3 h-3 mr-1" />
                          失败
                        </span>
                        {record.failReason && (
                          <span className="text-xs text-red-600">{record.failReason}</span>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            共 {filteredRecords.length} 条记录
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">上一页</button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">下一页</button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>说明：</strong>自动发放明细展示系统对接业务系统后，实时抓取数据并自动计算发放的积分记录。发放失败的记录会显示具体失败原因，便于及时处理。
        </p>
      </div>
    </div>
  );
};

export default AutoDistribution;
