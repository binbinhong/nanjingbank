import React from 'react';
import { Award, Users, Star, TrendingUp } from 'lucide-react';

const CustomerTiering: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">客户分层运营</h2>
        <p className="text-gray-600">根据客户等级配置差异化积分规则</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { level: '白金客户', count: 156, color: 'bg-purple-100 text-purple-700', icon: Star },
          { level: '黄金客户', count: 324, color: 'bg-yellow-100 text-yellow-700', icon: Award },
          { level: '白银客户', count: 567, color: 'bg-gray-100 text-gray-700', icon: Users },
          { level: '普通客户', count: 892, color: 'bg-blue-100 text-blue-700', icon: TrendingUp }
        ].map((tier, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">{tier.level}</p>
              <tier.icon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{tier.count}</p>
            <div className={`mt-3 px-2 py-1 rounded text-xs font-medium ${tier.color}`}>
              {tier.level}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">等级积分规则</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-purple-600" />
                  <p className="font-semibold text-gray-900">白金客户</p>
                </div>
                <span className="text-sm text-purple-600">1.5倍积分</span>
              </div>
              <p className="text-sm text-gray-600">高净值客户,享受所有积分活动1.5倍奖励</p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <p className="font-semibold text-gray-900">黄金客户</p>
                </div>
                <span className="text-sm text-yellow-600">1.2倍积分</span>
              </div>
              <p className="text-sm text-gray-600">高频交易客户,享受所有积分活动1.2倍奖励</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTiering;
