import React, { useEffect, useState } from 'react';
import { supabase, CustomerLevelRecord, CustomerLevel } from '../lib/supabase';
import { Search, TrendingUp, TrendingDown, Filter, ChevronRight, X, Tag as TagIcon, BarChart3 } from 'lucide-react';

interface DimensionData {
  dimension_code: string;
  dimension_value: number;
  dimension_score: number;
}

interface CustomerTag {
  tag_code: string;
  tag_name: string;
  tag_category: string;
  tag_color: string;
}

interface TagDefinition {
  tag_code: string;
  tag_name: string;
  tag_category: string;
  tag_color: string;
  description: string;
}

export default function CustomerLevelList() {
  const [customers, setCustomers] = useState<CustomerLevelRecord[]>([]);
  const [levels, setLevels] = useState<CustomerLevel[]>([]);
  const [allTags, setAllTags] = useState<TagDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [customerDimensions, setCustomerDimensions] = useState<DimensionData[]>([]);
  const [customerTags, setCustomerTags] = useState<CustomerTag[]>([]);
  const [showTagFilter, setShowTagFilter] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [customersRes, levelsRes, tagsRes] = await Promise.all([
        supabase.from('customer_level_records').select('*').order('current_score', { ascending: false }),
        supabase.from('customer_levels').select('*').order('sort_order'),
        supabase.from('customer_tags').select('*').eq('is_active', true).order('tag_category, tag_name'),
      ]);

      setCustomers(customersRes.data || []);
      setLevels(levelsRes.data || []);
      setAllTags(tagsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCustomerDetails = async (customerId: string) => {
    try {
      const [dimensionsRes, tagsRes] = await Promise.all([
        supabase
          .from('customer_dimension_data')
          .select('dimension_code, dimension_value, dimension_score')
          .eq('customer_id', customerId),
        supabase
          .from('customer_tag_relations')
          .select(`
            tag_code,
            customer_tags!inner(tag_name, tag_category, tag_color)
          `)
          .eq('customer_id', customerId),
      ]);

      setCustomerDimensions(dimensionsRes.data || []);
      setCustomerTags(
        (tagsRes.data || []).map((item: any) => ({
          tag_code: item.tag_code,
          tag_name: item.customer_tags.tag_name,
          tag_category: item.customer_tags.tag_category,
          tag_color: item.customer_tags.tag_color,
        }))
      );
      setSelectedCustomer(customerId);
    } catch (error) {
      console.error('Error loading customer details:', error);
    }
  };

  const getLevelInfo = (levelCode: string) => {
    return levels.find(l => l.level_code === levelCode);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      normal: { label: '正常', className: 'bg-green-100 text-green-800' },
      pending_upgrade: { label: '待升级', className: 'bg-blue-100 text-blue-800' },
      pending_downgrade: { label: '待降级', className: 'bg-orange-100 text-orange-800' },
      under_review: { label: '审核中', className: 'bg-purple-100 text-purple-800' },
    };
    const config = statusMap[status] || statusMap.normal;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const getDimensionName = (code: string) => {
    const names: Record<string, string> = {
      DEPOSIT_BALANCE: '存款余额',
      LOAN_BALANCE: '贷款余额',
      TRANSACTION_FREQ: '交易频次',
      COOPERATION_YEARS: '合作年限',
      PRODUCT_COVERAGE: '产品覆盖',
      RISK_LEVEL: '风险等级',
    };
    return names[code] || code;
  };

  const formatDimensionValue = (code: string, value: number) => {
    if (code === 'DEPOSIT_BALANCE' || code === 'LOAN_BALANCE') {
      return `¥${(value / 10000).toFixed(2)}万`;
    }
    if (code === 'TRANSACTION_FREQ') {
      return `${value}次/月`;
    }
    if (code === 'COOPERATION_YEARS') {
      return `${value}年`;
    }
    if (code === 'PRODUCT_COVERAGE') {
      return `${value}个产品`;
    }
    if (code === 'RISK_LEVEL') {
      const levels = ['优秀', '良好', '一般', '较差', '差'];
      return levels[value - 1] || value.toString();
    }
    return value.toString();
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      behavior: '行为特征',
      risk: '风险标签',
      value: '价值标签',
      product: '产品标签',
      service: '服务标签',
      lifecycle: '生命周期',
      industry: '行业标签',
    };
    return names[category] || category;
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.customer_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || customer.current_level_code === filterLevel;
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const tagsByCategory = allTags.reduce((acc, tag) => {
    if (!acc[tag.tag_category]) {
      acc[tag.tag_category] = [];
    }
    acc[tag.tag_category].push(tag);
    return acc;
  }, {} as Record<string, TagDefinition[]>);

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
        <h1 className="text-3xl font-bold text-gray-900">客户等级管理</h1>
        <p className="mt-2 text-gray-600">基于多维度业务数据和标签体系的综合客户评估</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索客户名称或ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">全部等级</option>
                {levels.map(level => (
                  <option key={level.level_code} value={level.level_code}>{level.level_name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <button
              onClick={() => setShowTagFilter(!showTagFilter)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <TagIcon className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">标签筛选</span>
              {filterTags.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {filterTags.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {showTagFilter && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">按标签筛选</h3>
              {filterTags.length > 0 && (
                <button
                  onClick={() => setFilterTags([])}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  清除全部
                </button>
              )}
            </div>
            <div className="space-y-3">
              {Object.entries(tagsByCategory).map(([category, tags]) => (
                <div key={category}>
                  <p className="text-xs font-medium text-gray-500 mb-2">{getCategoryName(category)}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <button
                        key={tag.tag_code}
                        onClick={() => {
                          setFilterTags(prev =>
                            prev.includes(tag.tag_code)
                              ? prev.filter(t => t !== tag.tag_code)
                              : [...prev, tag.tag_code]
                          );
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          filterTags.includes(tag.tag_code)
                            ? 'ring-2 ring-offset-1'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                        style={{
                          backgroundColor: filterTags.includes(tag.tag_code) ? tag.tag_color : `${tag.tag_color}40`,
                          color: filterTags.includes(tag.tag_code) ? '#fff' : tag.tag_color,
                          ringColor: tag.tag_color,
                        }}
                      >
                        {tag.tag_name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  客户信息
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  当前等级
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  评分
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  客户标签
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  等级变化
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => {
                const currentLevel = getLevelInfo(customer.current_level_code);
                const previousLevel = customer.previous_level_code ? getLevelInfo(customer.previous_level_code) : null;
                const scoreChange = customer.previous_score ? customer.current_score - customer.previous_score : 0;

                return (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{customer.customer_name}</p>
                        <p className="text-sm text-gray-500">{customer.customer_id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {currentLevel && (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: currentLevel.color }}
                          />
                          <span className="font-medium text-gray-900">{currentLevel.level_name}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">{customer.current_score}</span>
                        <span className="text-sm text-gray-500">/100</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        <button
                          onClick={() => loadCustomerDetails(customer.customer_id)}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors flex items-center space-x-1"
                        >
                          <TagIcon className="w-3 h-3" />
                          <span>查看标签</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {previousLevel && scoreChange !== 0 && (
                        <div className="flex items-center gap-2">
                          {scoreChange > 0 ? (
                            <>
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-600">+{scoreChange}</span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="w-4 h-4 text-red-600" />
                              <span className="text-sm font-medium text-red-600">{scoreChange}</span>
                            </>
                          )}
                          <span className="text-xs text-gray-500">
                            {previousLevel.level_name} → {currentLevel?.level_name}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(customer.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => loadCustomerDetails(customer.customer_id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        查看详情
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">未找到符合条件的客户</p>
          </div>
        )}
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">客户详情</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {customers.find(c => c.customer_id === selectedCustomer)?.customer_name}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCustomer(null);
                  setCustomerDimensions([]);
                  setCustomerTags([]);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <TagIcon className="w-5 h-5 text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">客户标签</h3>
                  <span className="text-sm text-gray-500">({customerTags.length}个)</span>
                </div>
                <div className="space-y-3">
                  {Object.entries(
                    customerTags.reduce((acc, tag) => {
                      if (!acc[tag.tag_category]) {
                        acc[tag.tag_category] = [];
                      }
                      acc[tag.tag_category].push(tag);
                      return acc;
                    }, {} as Record<string, CustomerTag[]>)
                  ).map(([category, tags]) => (
                    <div key={category} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs font-medium text-gray-500 mb-2">{getCategoryName(category)}</p>
                      <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                          <span
                            key={tag.tag_code}
                            className="px-3 py-1.5 rounded-full text-sm font-medium text-white"
                            style={{ backgroundColor: tag.tag_color }}
                          >
                            {tag.tag_name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {customerTags.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">暂无标签数据</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">多维度评估</h3>
                </div>
                <div className="space-y-4">
                  {customerDimensions.map(dimension => (
                    <div key={dimension.dimension_code} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          {getDimensionName(dimension.dimension_code)}
                        </span>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600">
                            {formatDimensionValue(dimension.dimension_code, dimension.dimension_value)}
                          </span>
                          <span className="text-sm font-semibold text-blue-600">
                            {dimension.dimension_score}分
                          </span>
                        </div>
                      </div>
                      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${dimension.dimension_score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  {customerDimensions.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">暂无维度数据</p>
                  )}
                </div>
              </div>

              {customerDimensions.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>综合评分：</strong>
                    该客户的等级评定基于以上{customerDimensions.length}个维度的综合评估，
                    包括资产规模、活跃度、业务深度、风险控制等多个方面。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>共 {filteredCustomers.length} 条记录</p>
        <p className="text-xs text-gray-500">
          客户评级基于多维度业务数据综合评估，包括资产规模、交易频次、合作年限、产品覆盖、风险等级等
        </p>
      </div>
    </div>
  );
}
