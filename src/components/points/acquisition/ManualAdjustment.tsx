import React, { useState } from 'react';
import { Plus, Search, Filter, CheckCircle, Clock, XCircle, Award, UserPlus, UserMinus, FileText } from 'lucide-react';

interface AdjustmentRecord {
  id: string;
  customerName: string;
  customerCode: string;
  adjustType: 'increase' | 'decrease';
  points: number;
  reason: string;
  applicant: string;
  approver: string;
  status: 'pending' | 'approved' | 'rejected';
  applyTime: string;
  approveTime: string;
  remark: string;
}

const ManualAdjustment: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);

  const records: AdjustmentRecord[] = [
    {
      id: '1',
      customerName: '南京XX科技有限公司',
      customerCode: 'C2024001',
      adjustType: 'increase',
      points: 5000,
      reason: '年度优质客户奖励',
      applicant: '张三',
      approver: '李四',
      status: 'approved',
      applyTime: '2024-12-28 10:30:00',
      approveTime: '2024-12-28 14:25:00',
      remark: '符合年度优质客户标准'
    },
    {
      id: '2',
      customerName: '江苏XX贸易公司',
      customerCode: 'C2024002',
      adjustType: 'decrease',
      points: 1000,
      reason: '违规操作扣除',
      applicant: '王五',
      approver: '赵六',
      status: 'approved',
      applyTime: '2024-12-29 09:15:00',
      approveTime: '2024-12-29 11:20:00',
      remark: '客户违规使用积分，经核实扣除'
    },
    {
      id: '3',
      customerName: '苏州XX实业集团',
      customerCode: 'C2024003',
      adjustType: 'increase',
      points: 3000,
      reason: '特殊贡献奖励',
      applicant: '李四',
      approver: '',
      status: 'pending',
      applyTime: '2024-12-30 08:45:00',
      approveTime: '',
      remark: '推荐多个优质客户'
    },
    {
      id: '4',
      customerName: '无锡XX制造有限公司',
      customerCode: 'C2024004',
      adjustType: 'increase',
      points: 2000,
      reason: '系统错误补偿',
      applicant: '赵六',
      approver: '张三',
      status: 'rejected',
      applyTime: '2024-12-27 14:20:00',
      approveTime: '2024-12-27 16:30:00',
      remark: '核实后无系统错误'
    },
    {
      id: '5',
      customerName: '常州XX投资公司',
      customerCode: 'C2024005',
      adjustType: 'increase',
      points: 10000,
      reason: '重大项目奖励',
      applicant: '王五',
      approver: '',
      status: 'pending',
      applyTime: '2024-12-30 09:00:00',
      approveTime: '',
      remark: '参与重大项目合作'
    }
  ];

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.customerCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: records.length,
    pending: records.filter(r => r.status === 'pending').length,
    approved: records.filter(r => r.status === 'approved').length,
    rejected: records.filter(r => r.status === 'rejected').length,
    totalIncrease: records.filter(r => r.status === 'approved' && r.adjustType === 'increase')
      .reduce((sum, r) => sum + r.points, 0),
    totalDecrease: records.filter(r => r.status === 'approved' && r.adjustType === 'decrease')
      .reduce((sum, r) => sum + r.points, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '待审批';
      case 'approved':
        return '已通过';
      case 'rejected':
        return '已驳回';
      default:
        return '未知';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">手动积分调整</h2>
          <p className="text-gray-600">特殊场景下手动增减积分，需走审批流程</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>新增调整申请</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">总申请数</p>
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">待审批</p>
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">已通过</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">已驳回</p>
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">累计增加</p>
            <UserPlus className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">+{stats.totalIncrease.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">累计扣除</p>
            <UserMinus className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">-{stats.totalDecrease.toLocaleString()}</p>
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
                <option value="pending">待审批</option>
                <option value="approved">已通过</option>
                <option value="rejected">已驳回</option>
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
                  调整类型
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  积分数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  调整原因
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  申请人
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  审批人
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  申请时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.customerName}</div>
                      <div className="text-xs text-gray-500">{record.customerCode}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      record.adjustType === 'increase'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {record.adjustType === 'increase' ? (
                        <>
                          <UserPlus className="w-3 h-3" />
                          <span>增加</span>
                        </>
                      ) : (
                        <>
                          <UserMinus className="w-3 h-3" />
                          <span>扣除</span>
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-bold ${
                      record.adjustType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {record.adjustType === 'increase' ? '+' : '-'}{record.points.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{record.reason}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{record.applicant}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{record.approver || '-'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      <span>{getStatusText(record.status)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs text-gray-600">{record.applyTime}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.status === 'pending' && (
                      <div className="flex items-center space-x-2">
                        <button className="text-green-600 hover:text-green-800 text-sm">
                          通过
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm">
                          驳回
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">新增积分调整申请</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">客户名称</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="搜索客户"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">客户编号</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="自动填充"
                    disabled
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">调整类型</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">选择类型</option>
                    <option value="increase">增加积分</option>
                    <option value="decrease">扣除积分</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">积分数量</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入积分数"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">调整原因</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">选择原因</option>
                  <option value="年度优质客户奖励">年度优质客户奖励</option>
                  <option value="特殊贡献奖励">特殊贡献奖励</option>
                  <option value="系统错误补偿">系统错误补偿</option>
                  <option value="违规操作扣除">违规操作扣除</option>
                  <option value="其他">其他</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">备注说明</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入详细说明"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>提示：</strong>手动积分调整需要走双人复核流程，申请提交后将发送给审批人进行审核。
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  提交申请
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualAdjustment;
