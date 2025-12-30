import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Settings, Bell } from 'lucide-react';

const RiskControl: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">积分风控管理</h2>
          <p className="text-gray-600">客户维度的风险识别和管控</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Settings className="w-4 h-4" />
          <span>风险规则配置</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">高风险客户</p>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">8</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">中风险客户</p>
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">23</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">正常客户</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">今日预警</p>
            <Bell className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-600">5</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">风险规则</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-600" />
                <p className="font-semibold text-gray-900">异常大额兑换监控</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                高风险
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">单日兑换积分超过10万分,或单次兑换超过5万分</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">触发次数: 8次</span>
              <span className="text-red-600 font-medium">已触发预警</span>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-yellow-600" />
                <p className="font-semibold text-gray-900">频繁操作监控</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                中风险
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">单日积分操作超过20次,或短时间内频繁兑换</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">触发次数: 23次</span>
              <span className="text-yellow-600 font-medium">监控中</span>
            </div>
          </div>

          <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-orange-600" />
                <p className="font-semibold text-gray-900">异常转赠监控</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
                中风险
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">大额积分转赠,或转赠对象异常</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">触发次数: 12次</span>
              <span className="text-orange-600 font-medium">监控中</span>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <p className="font-semibold text-gray-900">账户异常行为监控</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                低风险
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">账户长期不活跃后突然大量操作</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">触发次数: 5次</span>
              <span className="text-blue-600 font-medium">正常</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">最近预警</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">南京XX科技有限公司</p>
                    <p className="text-xs text-gray-500">客户编号: C2024{i.toString().padStart(3, '0')}</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                  高风险
                </span>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-gray-900 mb-1">
                  <strong>风险类型:</strong> 异常大额兑换
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>详情:</strong> 单日兑换积分超过10万分 (实际兑换: 12.5万分)
                </p>
                <p className="text-xs text-gray-500">
                  触发时间: 2024-12-30 {10 + i}:30:00
                </p>
              </div>
              <div className="flex items-center justify-end space-x-2 mt-3">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  查看详情
                </button>
                <button className="text-green-600 hover:text-green-800 text-sm">
                  标记已处理
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm">
                  冻结账户
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">配置风险规则</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">规则名称</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入规则名称"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">风险等级</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">选择等级</option>
                    <option value="high">高风险</option>
                    <option value="medium">中风险</option>
                    <option value="low">低风险</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">监控维度</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">选择维度</option>
                    <option value="amount">金额</option>
                    <option value="frequency">频率</option>
                    <option value="behavior">行为</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">触发条件</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入触发条件"
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

export default RiskControl;
