import React, { useState } from 'react';
import { Plus, Target, Calendar, Users, Award, TrendingUp } from 'lucide-react';

const CampaignManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">积分计划管理</h2>
          <p className="text-gray-600">创建和管理积分营销活动</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>新建计划</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">进行中</p>
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">8</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">已完成</p>
            <Award className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">23</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">参与客户</p>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-600">1.2k</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">发放积分</p>
            <TrendingUp className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-600">156万</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">2024年春季积分翻倍活动</h3>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                  进行中
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>2024-03-01 至 2024-05-31</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>目标客户: 白金/黄金客户</span>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">456</p>
                  <p className="text-xs text-gray-600 mt-1">参与人数</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">89%</p>
                  <p className="text-xs text-gray-600 mt-1">完成率</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">45.6万</p>
                  <p className="text-xs text-gray-600 mt-1">发放积分</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignManagement;
