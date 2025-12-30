import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

const CostReconciliation: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">积分成本核对</h2>
        <p className="text-gray-600">积分成本分摊和核算管理</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">本月成本</p>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">¥156万</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">环比变化</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">+12.5%</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">消费成本</p>
            <TrendingDown className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-600">¥98万</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">消费率</p>
            <PieChart className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-600">62.8%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">成本分摊模式</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-semibold text-gray-900 mb-2">按机构分摊</p>
            <p className="text-sm text-gray-600">根据各机构发放积分数量分摊成本</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-gray-900 mb-2">按场景分摊</p>
            <p className="text-sm text-gray-600">根据不同业务场景分摊积分成本</p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="font-semibold text-gray-900 mb-2">按客户等级分摊</p>
            <p className="text-sm text-gray-600">根据客户等级的积分使用情况分摊</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostReconciliation;
