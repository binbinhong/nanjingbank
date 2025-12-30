import React, { useEffect, useState } from 'react';
import { supabase, LevelNotification } from '../lib/supabase';
import { Bell, Send, TrendingUp, TrendingDown, Gift, Mail, CheckCircle } from 'lucide-react';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<LevelNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [filterRead, setFilterRead] = useState('all');

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('level_notifications')
        .select('*')
        .order('sent_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await supabase
        .from('level_notifications')
        .update({ is_read: true })
        .eq('id', id);

      await loadNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await supabase
        .from('level_notifications')
        .update({ is_read: true })
        .eq('is_read', false);

      await loadNotifications();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'level_upgrade':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'level_downgrade':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      case 'benefit_change':
        return <Gift className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'level_upgrade':
        return 'bg-green-50 border-green-200';
      case 'level_downgrade':
        return 'bg-red-50 border-red-200';
      case 'benefit_change':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = filterType === 'all' || notification.notification_type === filterType;
    const matchesRead = filterRead === 'all' ||
                       (filterRead === 'unread' && !notification.is_read) ||
                       (filterRead === 'read' && notification.is_read);
    return matchesType && matchesRead;
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">通知中心</h1>
          <p className="mt-2 text-gray-600">
            管理客户等级变动通知
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-sm rounded-full font-medium">
                {unreadCount} 条未读
              </span>
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            全部标记为已读
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">总通知数</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{notifications.length}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">等级升级</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {notifications.filter(n => n.notification_type === 'level_upgrade').length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">等级降级</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {notifications.filter(n => n.notification_type === 'level_downgrade').length}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">已发送客户</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {notifications.filter(n => n.is_sent_to_customer).length}
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <Send className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex gap-4 mb-6">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">全部类型</option>
            <option value="level_upgrade">等级升级</option>
            <option value="level_downgrade">等级降级</option>
            <option value="benefit_change">权益变更</option>
          </select>

          <select
            value={filterRead}
            onChange={(e) => setFilterRead(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">全部状态</option>
            <option value="unread">未读</option>
            <option value="read">已读</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`border-2 rounded-xl p-5 transition-all ${
                notification.is_read ? 'border-gray-200 bg-white' : getNotificationColor(notification.notification_type)
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-lg p-3 ${
                  notification.is_read ? 'bg-gray-100' : 'bg-white'
                }`}>
                  {getNotificationIcon(notification.notification_type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      {!notification.is_read && (
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(notification.sent_at).toLocaleString('zh-CN')}
                    </p>
                  </div>

                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">{notification.content}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium">客户：</span>
                      <span>{notification.customer_name}</span>
                    </div>
                    {notification.manager_name && (
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">客户经理：</span>
                        <span>{notification.manager_name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3" />
                      <span>
                        {notification.is_sent_to_customer ? '已发送客户' : '仅内部通知'}
                      </span>
                    </div>
                  </div>

                  {!notification.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      标记为已读
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">暂无通知记录</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
