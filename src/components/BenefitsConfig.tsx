import React, { useEffect, useState } from 'react';
import { supabase, LevelBenefit, CustomerLevel } from '../lib/supabase';
import { Gift, CreditCard, Percent, Star, Plus, Trash2, Edit2 } from 'lucide-react';

export default function BenefitsConfig() {
  const [benefits, setBenefits] = useState<LevelBenefit[]>([]);
  const [levels, setLevels] = useState<CustomerLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [benefitsRes, levelsRes] = await Promise.all([
        supabase.from('level_benefits').select('*').order('created_at'),
        supabase.from('customer_levels').select('*').order('sort_order'),
      ]);

      setBenefits(benefitsRes.data || []);
      setLevels(levelsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBenefit = async (id: string, currentStatus: boolean) => {
    try {
      await supabase
        .from('level_benefits')
        .update({ is_active: !currentStatus })
        .eq('id', id);
      await loadData();
    } catch (error) {
      console.error('Error toggling benefit:', error);
    }
  };

  const getBenefitIcon = (type: string) => {
    switch (type) {
      case 'discount':
        return <Percent className="w-5 h-5" />;
      case 'service':
        return <Star className="w-5 h-5" />;
      case 'points':
        return <Gift className="w-5 h-5" />;
      case 'credit':
        return <CreditCard className="w-5 h-5" />;
      default:
        return <Gift className="w-5 h-5" />;
    }
  };

  const getBenefitTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      discount: '费率优惠',
      service: '服务权益',
      points: '积分权益',
      credit: '授信权益',
    };
    return typeMap[type] || type;
  };

  const getLevelInfo = (levelCode: string) => {
    return levels.find(l => l.level_code === levelCode);
  };

  const filteredBenefits = selectedLevel === 'all'
    ? benefits
    : benefits.filter(b => b.level_code === selectedLevel);

  const groupedBenefits = levels.map(level => ({
    level,
    benefits: benefits.filter(b => b.level_code === level.level_code),
  }));

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
        <h1 className="text-3xl font-bold text-gray-900">等级权益配置</h1>
        <p className="mt-2 text-gray-600">配置不同等级客户的专属权益和服务</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">总权益数</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{benefits.length}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <Gift className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">费率优惠</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {benefits.filter(b => b.benefit_type === 'discount').length}
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <Percent className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">服务权益</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {benefits.filter(b => b.benefit_type === 'service').length}
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">已启用</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {benefits.filter(b => b.is_active).length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">全部等级</option>
              {levels.map(level => (
                <option key={level.level_code} value={level.level_code}>{level.level_name}</option>
              ))}
            </select>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            添加权益
          </button>
        </div>

        {selectedLevel === 'all' ? (
          <div className="space-y-8">
            {groupedBenefits.map(({ level, benefits: levelBenefits }) => (
              <div key={level.level_code}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: level.color }}
                  />
                  <h3 className="text-lg font-semibold text-gray-900">{level.level_name}</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {levelBenefits.length} 项权益
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {levelBenefits.map((benefit) => (
                    <div
                      key={benefit.id}
                      className={`border-2 rounded-xl p-4 transition-all ${
                        benefit.is_active ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div
                            className="rounded-lg p-2.5"
                            style={{ backgroundColor: level.color + '20', color: level.color }}
                          >
                            {getBenefitIcon(benefit.benefit_type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{benefit.benefit_name}</h4>
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {getBenefitTypeLabel(benefit.benefit_type)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{benefit.description}</p>
                            <p className="text-lg font-bold" style={{ color: level.color }}>
                              {benefit.benefit_value}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleBenefit(benefit.id, benefit.is_active)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              benefit.is_active ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                benefit.is_active ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBenefits.map((benefit) => {
              const level = getLevelInfo(benefit.level_code);
              return (
                <div
                  key={benefit.id}
                  className={`border-2 rounded-xl p-4 transition-all ${
                    benefit.is_active ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className="rounded-lg p-2.5"
                        style={{ backgroundColor: level?.color + '20', color: level?.color }}
                      >
                        {getBenefitIcon(benefit.benefit_type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{benefit.benefit_name}</h4>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {getBenefitTypeLabel(benefit.benefit_type)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{benefit.description}</p>
                        <p className="text-lg font-bold" style={{ color: level?.color }}>
                          {benefit.benefit_value}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleBenefit(benefit.id, benefit.is_active)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          benefit.is_active ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            benefit.is_active ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredBenefits.length === 0 && (
          <div className="text-center py-12">
            <Gift className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">暂无权益配置</p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-3">权益关联说明</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-medium mb-2">✓ 自动生效机制</p>
            <p className="text-gray-600">客户等级变动后，对应权益自动生效或取消，无需人工操作。</p>
          </div>
          <div>
            <p className="font-medium mb-2">✓ 权益叠加规则</p>
            <p className="text-gray-600">高等级客户可享受本等级及以下所有等级的基础权益。</p>
          </div>
          <div>
            <p className="font-medium mb-2">✓ 通知推送</p>
            <p className="text-gray-600">权益变动时自动向客户经理和客户推送详细通知。</p>
          </div>
          <div>
            <p className="font-medium mb-2">✓ 灵活配置</p>
            <p className="text-gray-600">支持随时调整权益内容，实时生效，满足业务需求。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
