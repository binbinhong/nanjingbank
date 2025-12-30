import React from 'react';
import { ArrowRightLeft, Merge, TrendingUp } from 'lucide-react';

const TransferMerge: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">积分转赠/合并</h2>
        <p className="text-gray-600">支持账户间积分转赠和合并操作</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">今日转赠</p>
            <ArrowRightLeft className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">45</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">账户合并</p>
            <Merge className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">转赠总额</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">8.5万</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">转赠规则</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-semibold text-gray-900 mb-2">企业内部转赠</p>
            <p className="text-sm text-gray-600">同一企业客户下多账户之间可以互相转赠积分</p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="font-semibold text-gray-900 mb-2">账户合并</p>
            <p className="text-sm text-gray-600">企业子账户积分可合并至主账户</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-gray-900 mb-2">零售客户转赠</p>
            <p className="text-sm text-gray-600">企业积分可转赠至关联的零售客户积分系统</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferMerge;
