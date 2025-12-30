import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Building2, MapPin, Phone, User, Plus, Edit2 } from 'lucide-react';

interface AdminBranch {
  id: string;
  branch_code: string;
  branch_name: string;
  parent_code: string | null;
  branch_type: string;
  level: number;
  province: string;
  city: string;
  address: string;
  contact_person: string;
  contact_phone: string;
  status: string;
  created_at: string;
}

export default function BranchManagement() {
  const [branches, setBranches] = useState<AdminBranch[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_branches')
        .select('*')
        .order('level')
        .order('branch_code');

      if (error) throw error;
      setBranches(data || []);
    } catch (error) {
      console.error('Error loading branches:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBranchTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      headquarters: '总行',
      branch: '分行',
      sub_branch: '支行',
    };
    return labels[type] || type;
  };

  const getBranchTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      headquarters: 'bg-purple-100 text-purple-700',
      branch: 'bg-blue-100 text-blue-700',
      sub_branch: 'bg-green-100 text-green-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const filteredBranches = filterType === 'all'
    ? branches
    : branches.filter(b => b.branch_type === filterType);

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
          <h1 className="text-3xl font-bold text-gray-900">机构管理</h1>
          <p className="mt-2 text-gray-600">管理南京银行机构信息</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          新增机构
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">机构总数</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{branches.length}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">总行</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {branches.filter(b => b.branch_type === 'headquarters').length}
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <Building2 className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">分行</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {branches.filter(b => b.branch_type === 'branch').length}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">支行</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {branches.filter(b => b.branch_type === 'sub_branch').length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">全部类型</option>
            <option value="headquarters">总行</option>
            <option value="branch">分行</option>
            <option value="sub_branch">支行</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBranches.map((branch) => (
            <div key={branch.id} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{branch.branch_name}</h3>
                      <span className={`px-2 py-0.5 ${getBranchTypeColor(branch.branch_type)} text-xs rounded-full font-medium`}>
                        {getBranchTypeLabel(branch.branch_type)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">机构代码：{branch.branch_code}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{branch.province} {branch.city}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{branch.address}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{branch.contact_person}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{branch.contact_phone}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  branch.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {branch.status === 'active' ? '正常' : '停用'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
