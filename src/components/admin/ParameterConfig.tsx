import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Settings, Search, Edit2, Save, X } from 'lucide-react';

interface AdminParameter {
  id: string;
  param_code: string;
  param_name: string;
  param_value: string;
  param_type: string;
  category: string;
  description: string;
  is_editable: boolean;
  updated_by: string;
  updated_at: string;
}

export default function ParameterConfig() {
  const [parameters, setParameters] = useState<AdminParameter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingParam, setEditingParam] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState('');

  useEffect(() => {
    loadParameters();
  }, []);

  const loadParameters = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_parameters')
        .select('*')
        .order('category')
        .order('param_code');

      if (error) throw error;
      setParameters(data || []);
    } catch (error) {
      console.error('Error loading parameters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveParam = async (id: string) => {
    try {
      await supabase
        .from('admin_parameters')
        .update({ param_value: editedValue, updated_at: new Date().toISOString() })
        .eq('id', id);
      setEditingParam(null);
      await loadParameters();
    } catch (error) {
      console.error('Error updating parameter:', error);
    }
  };

  const startEdit = (id: string, currentValue: string) => {
    setEditingParam(id);
    setEditedValue(currentValue);
  };

  const categories = [...new Set(parameters.map(p => p.category))];

  const filteredParameters = parameters.filter(param => {
    const matchesSearch = param.param_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         param.param_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || param.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedParams = categories.map(category => ({
    category,
    params: filteredParameters.filter(p => p.category === category)
  })).filter(g => g.params.length > 0);

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
        <h1 className="text-3xl font-bold text-gray-900">参数配置</h1>
        <p className="mt-2 text-gray-600">管理系统运行参数</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">参数总数</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{parameters.length}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <Settings className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">可编辑参数</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {parameters.filter(p => p.is_editable).length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <Edit2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">配置分类</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{categories.length}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <Settings className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">只读参数</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {parameters.filter(p => !p.is_editable).length}
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <Settings className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索参数名称或代码..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">全部分类</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {groupedParams.map(({ category, params }) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200">
                {category}
              </h3>
              <div className="space-y-3">
                {params.map((param) => (
                  <div key={param.id} className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{param.param_name}</h4>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {param.param_code}
                          </span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {param.param_type}
                          </span>
                          {!param.is_editable && (
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                              只读
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{param.description}</p>

                        {editingParam === param.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editedValue}
                              onChange={(e) => setEditedValue(e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              onClick={() => handleSaveParam(param.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              <Save className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => setEditingParam(null)}
                              className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-mono font-semibold text-blue-600">
                              {param.param_value}
                            </span>
                            {param.is_editable && (
                              <button
                                onClick={() => startEdit(param.id, param.param_value)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        )}

                        <div className="mt-3 text-xs text-gray-500">
                          最后更新：{param.updated_by} · {new Date(param.updated_at).toLocaleString('zh-CN')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
