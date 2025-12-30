import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Shield, Plus, Edit2, Users, CheckCircle2 } from 'lucide-react';

interface AdminRole {
  id: string;
  role_code: string;
  role_name: string;
  description: string;
  permissions: string[];
  is_active: boolean;
  created_by: string;
  created_at: string;
}

export default function RoleManagement() {
  const [roles, setRoles] = useState<AdminRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRoles(data || []);
    } catch (error) {
      console.error('Error loading roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (roleCode: string) => {
    const colors: Record<string, string> = {
      SUPER_ADMIN: 'from-purple-500 to-purple-600',
      ADMIN: 'from-blue-500 to-blue-600',
      BRANCH_ADMIN: 'from-green-500 to-green-600',
      OPERATOR: 'from-orange-500 to-orange-600',
      AUDITOR: 'from-red-500 to-red-600',
    };
    return colors[roleCode] || 'from-gray-500 to-gray-600';
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">角色管理</h1>
          <p className="mt-2 text-gray-600">配置系统角色和权限</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          新增角色
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">角色总数</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{roles.length}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">启用角色</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {roles.filter(r => r.is_active).length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">总权限数</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {roles.reduce((sum, role) => sum + role.permissions.length, 0)}
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`bg-gradient-to-r ${getRoleColor(role.role_code)} p-6 text-white`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-white bg-opacity-20 rounded-lg p-2">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{role.role_name}</h3>
                    <p className="text-sm opacity-90">{role.role_code}</p>
                  </div>
                </div>
                {role.is_active && (
                  <CheckCircle2 className="w-6 h-6" />
                )}
              </div>
              <p className="text-sm opacity-90">{role.description}</p>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">权限列表</h4>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  <p>创建人：{role.created_by}</p>
                  <p>创建时间：{new Date(role.created_at).toLocaleDateString('zh-CN')}</p>
                </div>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                  编辑
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
