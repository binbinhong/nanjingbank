import React, { useState } from 'react';
import { Lock, Unlock, AlertTriangle, Search } from 'lucide-react';

const StatusControl: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">积分状态控制</h2>
        <p className="text-gray-600">冻结/解冻积分账户，防止违规操作</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">正常账户</p>
            <Unlock className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">1234</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">冻结账户</p>
            <Lock className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">15</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">风险账户</p>
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">8</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索客户..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-center py-8">请输入客户信息进行搜索</p>
        </div>
      </div>
    </div>
  );
};

export default StatusControl;
