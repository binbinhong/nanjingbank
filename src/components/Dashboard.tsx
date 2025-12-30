import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { TrendingUp, TrendingDown, Users, Bell, AlertCircle, Award } from 'lucide-react';

interface DashboardStats {
  totalCustomers: number;
  pendingReviews: number;
  unreadNotifications: number;
  recentUpgrades: number;
  recentDowngrades: number;
  levelDistribution: { level_code: string; level_name: string; count: number; color: string }[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    pendingReviews: 0,
    unreadNotifications: 0,
    recentUpgrades: 0,
    recentDowngrades: 0,
    levelDistribution: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [customersRes, reviewsRes, notificationsRes, levelsRes] = await Promise.all([
        supabase.from('customer_level_records').select('*'),
        supabase.from('level_change_reviews').select('*').eq('review_status', 'pending'),
        supabase.from('level_notifications').select('*').eq('is_read', false),
        supabase.from('customer_levels').select('*').order('sort_order'),
      ]);

      const customers = customersRes.data || [];
      const reviews = reviewsRes.data || [];
      const notifications = notificationsRes.data || [];
      const levels = levelsRes.data || [];

      const upgradesCount = reviews.filter(r => r.change_type === 'upgrade').length;
      const downgradesCount = reviews.filter(r => r.change_type === 'downgrade').length;

      const distribution = levels.map(level => ({
        level_code: level.level_code,
        level_name: level.level_name,
        count: customers.filter(c => c.current_level_code === level.level_code).length,
        color: level.color,
      }));

      setStats({
        totalCustomers: customers.length,
        pendingReviews: reviews.length,
        unreadNotifications: notifications.length,
        recentUpgrades: upgradesCount,
        recentDowngrades: downgradesCount,
        levelDistribution: distribution,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">客户等级管理系统</h1>
        <p className="mt-2 text-gray-600">南京银行对公客户等级评定与管理平台</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">客户总数</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCustomers}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">待审核</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingReviews}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">未读通知</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.unreadNotifications}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <Bell className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">等级变动</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-xl font-bold text-green-600">{stats.recentUpgrades}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  <span className="text-xl font-bold text-red-600">{stats.recentDowngrades}</span>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">客户等级分布</h2>
          <div className="space-y-4">
            {stats.levelDistribution.map((level) => (
              <div key={level.level_code}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{level.level_name}</span>
                  <span className="text-sm font-semibold text-gray-900">{level.count} 家</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(level.count / stats.totalCustomers) * 100}%`,
                      backgroundColor: level.color,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  占比 {((level.count / stats.totalCustomers) * 100).toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">快速操作</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group">
              <Award className="w-6 h-6 text-gray-400 group-hover:text-blue-600 mb-2" />
              <p className="font-medium text-gray-900">等级评定</p>
              <p className="text-xs text-gray-500 mt-1">查看客户等级</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all text-left group">
              <AlertCircle className="w-6 h-6 text-gray-400 group-hover:text-orange-600 mb-2" />
              <p className="font-medium text-gray-900">审核中心</p>
              <p className="text-xs text-gray-500 mt-1">处理待审核项</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left group">
              <Bell className="w-6 h-6 text-gray-400 group-hover:text-green-600 mb-2" />
              <p className="font-medium text-gray-900">通知管理</p>
              <p className="text-xs text-gray-500 mt-1">查看通知记录</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-left group">
              <Users className="w-6 h-6 text-gray-400 group-hover:text-purple-600 mb-2" />
              <p className="font-medium text-gray-900">规则配置</p>
              <p className="text-xs text-gray-500 mt-1">设置评定规则</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
