import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Merge, Users, Building, Search, Plus, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface Account {
  id: string;
  customer_name: string;
  customer_type: 'enterprise' | 'personal';
  parent_account_id: string | null;
  points_balance: number;
  branch: string;
  status: string;
}

interface Transfer {
  id: string;
  from_account: Account;
  to_account: Account;
  points_amount: number;
  transfer_type: string;
  reason: string;
  status: string;
  operator: string;
  remark?: string;
  created_at: string;
  completed_at?: string;
}

interface Merge {
  id: string;
  from_accounts: Array<{ account_id: string; account_name: string; points: number }>;
  to_account: Account;
  total_points: number;
  merge_type: string;
  reason: string;
  status: string;
  operator: string;
  remark?: string;
  created_at: string;
  completed_at?: string;
}

const TransferMerge: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'transfer' | 'merge'>('transfer');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [merges, setMerges] = useState<Merge[]>([]);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [transferForm, setTransferForm] = useState({
    from_account_id: '',
    to_account_id: '',
    points_amount: '',
    transfer_type: 'enterprise_internal',
    reason: '',
    operator: '系统管理员',
    remark: ''
  });

  const [mergeForm, setMergeForm] = useState({
    from_account_ids: [] as string[],
    to_account_id: '',
    merge_type: 'sub_to_main',
    reason: '',
    operator: '系统管理员',
    remark: ''
  });

  useEffect(() => {
    loadAccounts();
    loadTransfers();
    loadMerges();
  }, []);

  const loadAccounts = async () => {
    const { data, error } = await supabase
      .from('customer_accounts')
      .select('*')
      .eq('status', 'active')
      .order('customer_name');

    if (!error && data) {
      setAccounts(data);
    }
  };

  const loadTransfers = async () => {
    const { data, error } = await supabase
      .from('points_transfers')
      .select(`
        *,
        from_account:from_account_id(customer_name, customer_type, branch, points_balance),
        to_account:to_account_id(customer_name, customer_type, branch, points_balance)
      `)
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error && data) {
      setTransfers(data as any);
    }
  };

  const loadMerges = async () => {
    const { data, error } = await supabase
      .from('points_merges')
      .select(`
        *,
        to_account:to_account_id(customer_name, customer_type, branch, points_balance)
      `)
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error && data) {
      setMerges(data as any);
    }
  };

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('points_transfers')
      .insert({
        from_account_id: transferForm.from_account_id,
        to_account_id: transferForm.to_account_id,
        points_amount: parseInt(transferForm.points_amount),
        transfer_type: transferForm.transfer_type,
        reason: transferForm.reason,
        operator: transferForm.operator,
        remark: transferForm.remark || null,
        status: 'completed',
        completed_at: new Date().toISOString()
      });

    if (!error) {
      setShowTransferModal(false);
      setTransferForm({
        from_account_id: '',
        to_account_id: '',
        points_amount: '',
        transfer_type: 'enterprise_internal',
        reason: '',
        operator: '系统管理员',
        remark: ''
      });
      loadTransfers();
      loadAccounts();
    }
  };

  const handleMergeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fromAccounts = mergeForm.from_account_ids.map(id => {
      const account = accounts.find(a => a.id === id);
      return {
        account_id: id,
        account_name: account?.customer_name || '',
        points: account?.points_balance || 0
      };
    });

    const totalPoints = fromAccounts.reduce((sum, acc) => sum + acc.points, 0);

    const { error } = await supabase
      .from('points_merges')
      .insert({
        from_accounts: fromAccounts,
        to_account_id: mergeForm.to_account_id,
        total_points: totalPoints,
        merge_type: mergeForm.merge_type,
        reason: mergeForm.reason,
        operator: mergeForm.operator,
        remark: mergeForm.remark || null,
        status: 'completed',
        completed_at: new Date().toISOString()
      });

    if (!error) {
      setShowMergeModal(false);
      setMergeForm({
        from_account_ids: [],
        to_account_id: '',
        merge_type: 'sub_to_main',
        reason: '',
        operator: '系统管理员',
        remark: ''
      });
      loadMerges();
      loadAccounts();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'rejected': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'failed': return <XCircle className="w-3 h-3" />;
      case 'rejected': return <AlertCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'pending': return '处理中';
      case 'failed': return '失败';
      case 'rejected': return '已拒绝';
      default: return '未知';
    }
  };

  const filteredAccounts = accounts.filter(account =>
    account.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    todayTransfers: transfers.filter(t =>
      new Date(t.created_at).toDateString() === new Date().toDateString()
    ).length,
    todayMerges: merges.filter(m =>
      new Date(m.created_at).toDateString() === new Date().toDateString()
    ).length,
    totalTransferPoints: transfers
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.points_amount, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">积分转赠/合并</h2>
          <p className="text-gray-600">支持企业与个人账户间积分转赠，子账户积分合并至主账户</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">今日转赠</p>
            <ArrowRightLeft className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.todayTransfers}</p>
          <p className="text-xs text-gray-500 mt-1">笔</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">今日合并</p>
            <Merge className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-600">{stats.todayMerges}</p>
          <p className="text-xs text-gray-500 mt-1">笔</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">转赠总额</p>
            <ArrowRightLeft className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{(stats.totalTransferPoints / 10000).toFixed(1)}万</p>
          <p className="text-xs text-gray-500 mt-1">分</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between p-6">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('transfer')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'transfer'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <ArrowRightLeft className="w-4 h-4" />
                  <span>积分互转</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('merge')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'merge'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Merge className="w-4 h-4" />
                  <span>积分合并</span>
                </div>
              </button>
            </div>
            <button
              onClick={() => activeTab === 'transfer' ? setShowTransferModal(true) : setShowMergeModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{activeTab === 'transfer' ? '新建转赠' : '新建合并'}</span>
            </button>
          </div>
        </div>

        {activeTab === 'transfer' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    转出账户
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    转入账户
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    转赠积分
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    转赠类型
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    原因
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作人
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    时间
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`p-2 ${transfer.from_account.customer_type === 'enterprise' ? 'bg-blue-100' : 'bg-purple-100'} rounded-lg mr-3`}>
                          {transfer.from_account.customer_type === 'enterprise' ? (
                            <Building className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Users className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{transfer.from_account.customer_name}</div>
                          <div className="text-xs text-gray-500">{transfer.from_account.branch}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`p-2 ${transfer.to_account.customer_type === 'enterprise' ? 'bg-blue-100' : 'bg-purple-100'} rounded-lg mr-3`}>
                          {transfer.to_account.customer_type === 'enterprise' ? (
                            <Building className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Users className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{transfer.to_account.customer_name}</div>
                          <div className="text-xs text-gray-500">{transfer.to_account.branch}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-orange-600">{transfer.points_amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {transfer.transfer_type === 'enterprise_internal' ? '企业内部' :
                         transfer.transfer_type === 'enterprise_to_retail' ? '企业转个人' : '个人转企业'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{transfer.reason}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{transfer.operator}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transfer.status)}`}>
                        {getStatusIcon(transfer.status)}
                        <span>{getStatusText(transfer.status)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {new Date(transfer.created_at).toLocaleString('zh-CN')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    源账户
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    目标账户
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    合并积分
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    合并类型
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    原因
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作人
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    时间
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {merges.map((merge) => (
                  <tr key={merge.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {merge.from_accounts.map((acc, idx) => (
                          <div key={idx} className="text-sm">
                            <span className="font-medium text-gray-900">{acc.account_name}</span>
                            <span className="text-gray-500 ml-2">({acc.points.toLocaleString()}分)</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`p-2 ${merge.to_account.customer_type === 'enterprise' ? 'bg-blue-100' : 'bg-purple-100'} rounded-lg mr-3`}>
                          {merge.to_account.customer_type === 'enterprise' ? (
                            <Building className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Users className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{merge.to_account.customer_name}</div>
                          <div className="text-xs text-gray-500">{merge.to_account.branch}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-orange-600">{merge.total_points.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {merge.merge_type === 'sub_to_main' ? '子账户合并' : '账户整合'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{merge.reason}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{merge.operator}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(merge.status)}`}>
                        {getStatusIcon(merge.status)}
                        <span>{getStatusText(merge.status)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {new Date(merge.created_at).toLocaleString('zh-CN')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showTransferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">新建积分转赠</h3>
            <form onSubmit={handleTransferSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">转出账户</label>
                <select
                  value={transferForm.from_account_id}
                  onChange={(e) => setTransferForm({ ...transferForm, from_account_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">请选择转出账户</option>
                  {accounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {account.customer_name} ({account.customer_type === 'enterprise' ? '企业' : '个人'}) - 余额: {account.points_balance.toLocaleString()}分
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">转入账户</label>
                <select
                  value={transferForm.to_account_id}
                  onChange={(e) => setTransferForm({ ...transferForm, to_account_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">请选择转入账户</option>
                  {accounts.filter(a => a.id !== transferForm.from_account_id).map(account => (
                    <option key={account.id} value={account.id}>
                      {account.customer_name} ({account.customer_type === 'enterprise' ? '企业' : '个人'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">转赠积分</label>
                <input
                  type="number"
                  value={transferForm.points_amount}
                  onChange={(e) => setTransferForm({ ...transferForm, points_amount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入转赠积分数量"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">转赠类型</label>
                <select
                  value={transferForm.transfer_type}
                  onChange={(e) => setTransferForm({ ...transferForm, transfer_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="enterprise_internal">企业内部转赠</option>
                  <option value="enterprise_to_retail">企业转个人</option>
                  <option value="retail_to_enterprise">个人转企业</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">转赠原因</label>
                <input
                  type="text"
                  value={transferForm.reason}
                  onChange={(e) => setTransferForm({ ...transferForm, reason: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入转赠原因"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">备注（可选）</label>
                <textarea
                  value={transferForm.remark}
                  onChange={(e) => setTransferForm({ ...transferForm, remark: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入备注信息"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  确认转赠
                </button>
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showMergeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">新建积分合并</h3>
            <form onSubmit={handleMergeSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">源账户（多选）</label>
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="搜索账户..."
                  />
                </div>
                <div className="border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
                  {filteredAccounts.map(account => (
                    <label key={account.id} className="flex items-center p-3 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mergeForm.from_account_ids.includes(account.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setMergeForm({
                              ...mergeForm,
                              from_account_ids: [...mergeForm.from_account_ids, account.id]
                            });
                          } else {
                            setMergeForm({
                              ...mergeForm,
                              from_account_ids: mergeForm.from_account_ids.filter(id => id !== account.id)
                            });
                          }
                        }}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{account.customer_name}</div>
                        <div className="text-xs text-gray-500">
                          {account.customer_type === 'enterprise' ? '企业' : '个人'} - 余额: {account.points_balance.toLocaleString()}分
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">已选择 {mergeForm.from_account_ids.length} 个账户</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">目标账户</label>
                <select
                  value={mergeForm.to_account_id}
                  onChange={(e) => setMergeForm({ ...mergeForm, to_account_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">请选择目标账户</option>
                  {accounts.filter(a => !mergeForm.from_account_ids.includes(a.id)).map(account => (
                    <option key={account.id} value={account.id}>
                      {account.customer_name} ({account.customer_type === 'enterprise' ? '企业' : '个人'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">合并类型</label>
                <select
                  value={mergeForm.merge_type}
                  onChange={(e) => setMergeForm({ ...mergeForm, merge_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="sub_to_main">子账户合并至主账户</option>
                  <option value="account_consolidation">账户整合</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">合并原因</label>
                <input
                  type="text"
                  value={mergeForm.reason}
                  onChange={(e) => setMergeForm({ ...mergeForm, reason: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入合并原因"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">备注（可选）</label>
                <textarea
                  value={mergeForm.remark}
                  onChange={(e) => setMergeForm({ ...mergeForm, remark: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入备注信息"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  确认合并
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMergeModal(false);
                    setSearchTerm('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>说明：</strong>
          积分转赠支持企业内部、企业与个人之间的积分划转；积分合并支持将多个子账户的积分合并至主账户，适用于企业账户管理场景。
        </p>
      </div>
    </div>
  );
};

export default TransferMerge;
