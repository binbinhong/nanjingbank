import React, { useState } from 'react';
import { Search, Filter, Award, Lock, Unlock, Eye, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface PointsAccount {
  id: string;
  customerName: string;
  customerCode: string;
  customerLevel: string;
  totalPoints: number;
  availablePoints: number;
  frozenPoints: number;
  expiringSoon: number;
  accountStatus: 'normal' | 'frozen' | 'suspended';
  lastTransaction: string;
  validUntil: string;
}

const AccountManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedAccount, setSelectedAccount] = useState<PointsAccount | null>(null);

  const accounts: PointsAccount[] = [
    {
      id: '1',
      customerName: '南京XX科技有限公司',
      customerCode: 'C2024001',
      customerLevel: '白金客户',
      totalPoints: 125600,
      availablePoints: 120000,
      frozenPoints: 5600,
      expiringSoon: 15000,
      accountStatus: 'normal',
      lastTransaction: '2024-12-29 14:30:00',
      validUntil: '2025-12-31'
    },
    {
      id: '2',
      customerName: '江苏XX贸易公司',
      customerCode: 'C2024002',
      customerLevel: '黄金客户',
      totalPoints: 89200,
      availablePoints: 89200,
      frozenPoints: 0,
      expiringSoon: 8500,
      accountStatus: 'normal',
      lastTransaction: '2024-12-30 09:15:00',
      validUntil: '2025-12-31'
    },
    {
      id: '3',
      customerName: '苏州XX实业集团',
      customerCode: 'C2024003',
      customerLevel: '白金客户',
      totalPoints: 234500,
      availablePoints: 0,
      frozenPoints: 234500,
      expiringSoon: 0,
      accountStatus: 'frozen',
      lastTransaction: '2024-12-15 16:45:00',
      validUntil: '2025-12-31'
    },
    {
      id: '4',
      customerName: '无锡XX制造有限公司',
      customerCode: 'C2024004',
      customerLevel: '白银客户',
      totalPoints: 45800,
      availablePoints: 45800,
      frozenPoints: 0,
      expiringSoon: 23000,
      accountStatus: 'normal',
      lastTransaction: '2024-12-28 11:20:00',
      validUntil: '2025-12-31'
    },
    {
      id: '5',
      customerName: '常州XX投资公司',
      customerCode: 'C2024005',
      customerLevel: '黄金客户',
      totalPoints: 156700,
      availablePoints: 150000,
      frozenPoints: 6700,
      expiringSoon: 35000,
      accountStatus: 'normal',
      lastTransaction: '2024-12-30 10:05:00',
      validUntil: '2025-12-31'
    }
  ];

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.customerCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || account.accountStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: accounts.length,
    normal: accounts.filter(a => a.accountStatus === 'normal').length,
    frozen: accounts.filter(a => a.accountStatus === 'frozen').length,
    totalPoints: accounts.reduce((sum, a) => sum + a.totalPoints, 0),
    totalFrozen: accounts.reduce((sum, a) => sum + a.frozenPoints, 0),
    totalExpiring: accounts.reduce((sum, a) => sum + a.expiringSoon, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-700';
      case 'frozen':
        return 'bg-red-100 text-red-700';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal':
        return '正常';
      case 'frozen':
        return '已冻结';
      case 'suspended':
        return '已暂停';
      default:
        return '未知';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">积分账户管理</h2>
          <p className="text-gray-600">管理客户积分账户信息、状态与生命周期</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">账户总数</p>
            <Award className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">正常账户</p>
            <Unlock className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.normal}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">冻结账户</p>
            <Lock className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.frozen}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">积分总额</p>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-600">{(stats.totalPoints / 10000).toFixed(1)}万</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">冻结积分</p>
            <Lock className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-600">{(stats.totalFrozen / 10000).toFixed(1)}万</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">即将过期</p>
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">{(stats.totalExpiring / 10000).toFixed(1)}万</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索客户名称或编号..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">全部状态</option>
                <option value="normal">正常</option>
                <option value="frozen">已冻结</option>
                <option value="suspended">已暂停</option>
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
                  客户等级
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  积分总额
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  可用积分
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  冻结积分
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  即将过期
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  账户状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  最后交易
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{account.customerName}</div>
                      <div className="text-xs text-gray-500">{account.customerCode}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                      {account.customerLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-purple-600">
                      {account.totalPoints.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-green-600">
                        {account.availablePoints.toLocaleString()}
                      </span>
                      {account.availablePoints > 0 && (
                        <TrendingUp className="w-4 h-4 ml-1 text-green-600" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-orange-600">
                        {account.frozenPoints.toLocaleString()}
                      </span>
                      {account.frozenPoints > 0 && (
                        <Lock className="w-4 h-4 ml-1 text-orange-600" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-red-600">
                        {account.expiringSoon.toLocaleString()}
                      </span>
                      {account.expiringSoon > 10000 && (
                        <AlertCircle className="w-4 h-4 ml-1 text-red-600" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(account.accountStatus)}`}>
                      {getStatusText(account.accountStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs text-gray-600">{account.lastTransaction}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedAccount(account)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">账户详情</h3>
              <button
                onClick={() => setSelectedAccount(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">客户名称</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedAccount.customerName}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">客户编号</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedAccount.customerCode}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">积分总额</p>
                  <p className="text-2xl font-bold text-purple-600">{selectedAccount.totalPoints.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">可用积分</p>
                  <p className="text-2xl font-bold text-green-600">{selectedAccount.availablePoints.toLocaleString()}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">冻结积分</p>
                  <p className="text-2xl font-bold text-orange-600">{selectedAccount.frozenPoints.toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">积分明细历史</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">存款达标奖励</p>
                        <p className="text-xs text-gray-500">2024-12-29 14:30:00</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-green-600">+5000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">权益兑换</p>
                        <p className="text-xs text-gray-500">2024-12-28 10:15:00</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-red-600">-3000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;
