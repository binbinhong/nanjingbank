import React from 'react';
import { Bell, Mail, MessageSquare, CheckCircle } from 'lucide-react';

const NotificationCenter: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">提醒通知管理</h2>
        <p className="text-gray-600">管理各类积分通知提醒</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">今日发送</p>
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">短信通知</p>
            <MessageSquare className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">856</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">APP推送</p>
            <Mail className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-600">378</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">送达成功</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">98.5%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">通知类型</h3>
        </div>
        <div className="p-6 space-y-3">
          {[
            { type: '积分到账提醒', desc: '积分入账后立即通知客户', color: 'bg-blue-50 border-blue-200' },
            { type: '兑换成功提醒', desc: '权益兑换成功后通知', color: 'bg-green-50 border-green-200' },
            { type: '兑换失败提醒', desc: '兑换失败原因通知', color: 'bg-red-50 border-red-200' },
            { type: '活动开始提醒', desc: '积分活动开始前提醒', color: 'bg-purple-50 border-purple-200' },
            { type: '积分过期提醒', desc: '积分到期前30天/7天提醒', color: 'bg-orange-50 border-orange-200' }
          ].map((item, idx) => (
            <div key={idx} className={`p-4 border rounded-lg ${item.color}`}>
              <p className="font-semibold text-gray-900 mb-1">{item.type}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
