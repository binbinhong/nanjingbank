import React, { useEffect, useState } from 'react';
import { supabase, CustomerLevel, EvaluationIndicator } from '../lib/supabase';
import { Settings, Plus, Edit2, Save, X } from 'lucide-react';

export default function LevelRulesConfig() {
  const [levels, setLevels] = useState<CustomerLevel[]>([]);
  const [indicators, setIndicators] = useState<EvaluationIndicator[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingIndicator, setEditingIndicator] = useState<string | null>(null);
  const [editedWeight, setEditedWeight] = useState<number>(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [levelsRes, indicatorsRes] = await Promise.all([
        supabase.from('customer_levels').select('*').order('sort_order'),
        supabase.from('evaluation_indicators').select('*').order('weight', { ascending: false }),
      ]);

      setLevels(levelsRes.data || []);
      setIndicators(indicatorsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleIndicator = async (id: string, currentStatus: boolean) => {
    try {
      await supabase
        .from('evaluation_indicators')
        .update({ is_active: !currentStatus })
        .eq('id', id);
      await loadData();
    } catch (error) {
      console.error('Error toggling indicator:', error);
    }
  };

  const handleSaveWeight = async (id: string) => {
    try {
      await supabase
        .from('evaluation_indicators')
        .update({ weight: editedWeight })
        .eq('id', id);
      setEditingIndicator(null);
      await loadData();
    } catch (error) {
      console.error('Error updating weight:', error);
    }
  };

  const startEditWeight = (id: string, currentWeight: number) => {
    setEditingIndicator(id);
    setEditedWeight(currentWeight);
  };

  const totalWeight = indicators.filter(i => i.is_active).reduce((sum, i) => sum + i.weight, 0);

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
        <h1 className="text-3xl font-bold text-gray-900">等级规则配置</h1>
        <p className="mt-2 text-gray-600">配置客户等级评定标准和指标权重</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">等级定义</h2>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            添加等级
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {levels.map((level) => (
            <div
              key={level.id}
              className="border-2 rounded-xl p-5 hover:shadow-md transition-all"
              style={{ borderColor: level.color }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: level.color + '20' }}
                  >
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: level.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{level.level_name}</h3>
                    <p className="text-xs text-gray-500">{level.level_code}</p>
                  </div>
                </div>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">分数区间</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {level.min_score} - {level.max_score}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{level.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">评定指标配置</h2>
            <p className="text-sm text-gray-600 mt-1">
              总权重：<span className={`font-semibold ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
                {totalWeight}%
              </span>
              {totalWeight !== 100 && <span className="text-red-600 ml-2">（权重需调整为100%）</span>}
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            添加指标
          </button>
        </div>

        <div className="space-y-3">
          {indicators.map((indicator) => (
            <div
              key={indicator.id}
              className={`border-2 rounded-lg p-4 transition-all ${
                indicator.is_active ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => handleToggleIndicator(indicator.id, indicator.is_active)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      indicator.is_active ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        indicator.is_active ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{indicator.indicator_name}</h3>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {indicator.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{indicator.calculation_method}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {editingIndicator === indicator.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={editedWeight}
                          onChange={(e) => setEditedWeight(parseInt(e.target.value) || 0)}
                          min="0"
                          max="100"
                          className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-center font-semibold"
                        />
                        <span className="text-gray-600">%</span>
                        <button
                          onClick={() => handleSaveWeight(indicator.id)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingIndicator(null)}
                          className="p-1.5 text-gray-400 hover:bg-gray-100 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">{indicator.weight}</p>
                          <p className="text-xs text-gray-500">权重 %</p>
                        </div>
                        <button
                          onClick={() => startEditWeight(indicator.id, indicator.weight)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${indicator.weight}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="bg-blue-600 rounded-lg p-3">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">自动评定规则</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              系统将根据配置的指标和权重自动计算客户得分，并匹配相应等级。当得分发生变化导致等级变动时，将自动触发升级或降级流程，并推送通知给相关客户经理。
            </p>
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                保存配置
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium border border-gray-300">
                重置为默认
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
