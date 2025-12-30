import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Award, DollarSign, ShoppingCart, CreditCard, TrendingUp, Check, X } from 'lucide-react';

interface PointsRule {
  id: string;
  name: string;
  scenario: string;
  type: string;
  status: 'active' | 'inactive';
  calcMethod: string;
  pointsAmount: number;
  condition: string;
  effectiveDate: string;
  expiryDate: string;
  description: string;
  createdAt: string;
  updatedBy: string;
}

const RuleConfig: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingRule, setEditingRule] = useState<PointsRule | null>(null);

  const rules: PointsRule[] = [
    {
      id: '1',
      name: '存款达标奖励',
      scenario: '存款业务',
      type: '自动计算',
      status: 'active',
      calcMethod: '按金额比例',
      pointsAmount: 100,
      condition: '日均存款 ≥ 100万元',
      effectiveDate: '2024-01-01',
      expiryDate: '2024-12-31',
      description: '每月日均存款达到100万元，奖励100积分',
      createdAt: '2024-01-15',
      updatedBy: '张三'
    },
    {
      id: '2',
      name: '结算交易积分',
      scenario: '结算业务',
      type: '自动计算',
      status: 'active',
      calcMethod: '按笔数',
      pointsAmount: 10,
      condition: '单笔交易金额 ≥ 1万元',
      effectiveDate: '2024-01-01',
      expiryDate: '2024-12-31',
      description: '每笔结算交易金额达到1万元，奖励10积分',
      createdAt: '2024-01-20',
      updatedBy: '李四'
    },
    {
      id: '3',
      name: '产品购买奖励',
      scenario: '产品销售',
      type: '自动计算',
      status: 'active',
      calcMethod: '按金额固定',
      pointsAmount: 500,
      condition: '购买理财产品金额 ≥ 50万元',
      effectiveDate: '2024-02-01',
      expiryDate: '2024-12-31',
      description: '购买理财产品达到50万元，奖励500积分',
      createdAt: '2024-02-01',
      updatedBy: '王五'
    },
    {
      id: '4',
      name: '开户推荐奖励',
      scenario: '客户推荐',
      type: '手动发放',
      status: 'active',
      calcMethod: '固定积分',
      pointsAmount: 200,
      condition: '成功推荐新客户开户',
      effectiveDate: '2024-01-01',
      expiryDate: '2024-12-31',
      description: '成功推荐新客户开户，奖励200积分',
      createdAt: '2024-01-10',
      updatedBy: '赵六'
    },
    {
      id: '5',
      name: '信用卡消费积分',
      scenario: '信用卡业务',
      type: '自动计算',
      status: 'inactive',
      calcMethod: '按金额比例',
      pointsAmount: 1,
      condition: '每消费1元',
      effectiveDate: '2024-03-01',
      expiryDate: '2024-12-31',
      description: '信用卡每消费1元，奖励1积分',
      createdAt: '2024-02-15',
      updatedBy: '张三'
    }
  ];

  const scenarios = [
    { value: 'deposit', label: '存款业务', icon: DollarSign, color: 'bg-green-100 text-green-700' },
    { value: 'settlement', label: '结算业务', icon: CreditCard, color: 'bg-blue-100 text-blue-700' },
    { value: 'product', label: '产品销售', icon: ShoppingCart, color: 'bg-purple-100 text-purple-700' },
    { value: 'referral', label: '客户推荐', icon: TrendingUp, color: 'bg-orange-100 text-orange-700' },
    { value: 'credit', label: '信用卡业务', icon: Award, color: 'bg-pink-100 text-pink-700' }
  ];

  const filteredRules = rules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.scenario.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || rule.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: rules.length,
    active: rules.filter(r => r.status === 'active').length,
    inactive: rules.filter(r => r.status === 'inactive').length,
    auto: rules.filter(r => r.type === '自动计算').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">积分获取规则配置</h2>
          <p className="text-gray-600">配置和管理积分获取规则，支持多场景自动计算</p>
        </div>
        <button
          onClick={() => {
            setEditingRule(null);
            setShowModal(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>新增规则</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">规则总数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">启用中</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">已停用</p>
              <p className="text-2xl font-bold text-gray-500">{stats.inactive}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <X className="w-6 h-6 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">自动计算</p>
              <p className="text-2xl font-bold text-purple-600">{stats.auto}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">业务场景</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {scenarios.map((scenario) => (
            <div
              key={scenario.value}
              className={`${scenario.color} p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center space-x-3">
                <scenario.icon className="w-5 h-5" />
                <span className="font-medium">{scenario.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索规则名称或场景..."
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
                <option value="active">启用中</option>
                <option value="inactive">已停用</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  规则名称
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  业务场景
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  计算方式
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  积分数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  触发条件
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  有效期
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <Award className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                        <div className="text-xs text-gray-500">{rule.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{rule.scenario}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{rule.calcMethod}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-orange-600">{rule.pointsAmount}分</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{rule.condition}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs text-gray-600">
                      <div>{rule.effectiveDate}</div>
                      <div>至 {rule.expiryDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      rule.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {rule.status === 'active' ? '启用中' : '已停用'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditingRule(rule);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingRule ? '编辑规则' : '新增规则'}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">规则名称</label>
                  <input
                    type="text"
                    defaultValue={editingRule?.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入规则名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">业务场景</label>
                  <select
                    defaultValue={editingRule?.scenario}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">选择场景</option>
                    <option value="存款业务">存款业务</option>
                    <option value="结算业务">结算业务</option>
                    <option value="产品销售">产品销售</option>
                    <option value="客户推荐">客户推荐</option>
                    <option value="信用卡业务">信用卡业务</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">发放类型</label>
                  <select
                    defaultValue={editingRule?.type}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="自动计算">自动计算</option>
                    <option value="手动发放">手动发放</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">计算方式</label>
                  <select
                    defaultValue={editingRule?.calcMethod}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="按金额比例">按金额比例</option>
                    <option value="按笔数">按笔数</option>
                    <option value="按金额固定">按金额固定</option>
                    <option value="固定积分">固定积分</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">积分数量</label>
                  <input
                    type="number"
                    defaultValue={editingRule?.pointsAmount}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入积分数"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">触发条件</label>
                  <input
                    type="text"
                    defaultValue={editingRule?.condition}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入触发条件"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">生效日期</label>
                  <input
                    type="date"
                    defaultValue={editingRule?.effectiveDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">失效日期</label>
                  <input
                    type="date"
                    defaultValue={editingRule?.expiryDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">规则描述</label>
                <textarea
                  defaultValue={editingRule?.description}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入规则描述"
                />
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
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RuleConfig;
