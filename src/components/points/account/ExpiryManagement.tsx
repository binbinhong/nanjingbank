import React from 'react';
import { Calendar, AlertCircle, Bell, Award } from 'lucide-react';

const ExpiryManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">积分过期管理</h2>
        <p className="text-gray-600">管理积分有效期,自动提醒和清零过期积分</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">30天内过期</p>
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">25.6万</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">7天内过期</p>
            <Calendar className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-600">8.3万</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">已发送提醒</p>
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">456</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">本月已清零</p>
            <Award className="w-5 h-5 text-gray-600" />
          </div>
          <p className="text-2xl font-bold text-gray-600">15.2万</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">过期提醒规则</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Bell className="w-5 h-5 text-yellow-600" />
              <p className="font-semibold text-gray-900">30天提醒</p>
            </div>
            <p className="text-sm text-gray-600">积分到期前30天通过短信/APP推送提醒</p>
          </div>
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Bell className="w-5 h-5 text-orange-600" />
              <p className="font-semibold text-gray-900">7天提醒</p>
            </div>
            <p className="text-sm text-gray-600">积分到期前7天再次提醒</p>
          </div>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="font-semibold text-gray-900">过期清零</p>
            </div>
            <p className="text-sm text-gray-600">积分过期后自动清零并记录</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpiryManagement;
