import React, { useState } from 'react';
import { Gift, Search, Filter, CheckCircle, Clock, XCircle } from 'lucide-react';

const BenefitsExchange: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">权益兑换管理</h2>
        <p className="text-gray-600">客户使用积分兑换权益的全流程管理</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">今日兑换</p>
            <Gift className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">156</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">待发放</p>
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">23</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">已完成</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">133</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">兑换失败</p>
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">0</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索兑换记录..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Gift className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">贵宾休息室服务</p>
                    <p className="text-xs text-gray-500">客户: 南京XX科技有限公司 | 2024-12-30 10:30:00</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-orange-600">-5000 积分</p>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                    已完成
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsExchange;
