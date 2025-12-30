/*
  # 添加多维度客户标签系统

  ## 1. 新增表

  ### 客户维度数据表 (customer_dimension_data)
  存储每个客户在各个业务维度的具体数值
  - `id` (uuid, 主键) - 记录ID
  - `customer_id` (text) - 客户ID
  - `dimension_code` (text) - 维度代码 (对应evaluation_indicators的indicator_code)
  - `dimension_value` (numeric) - 维度具体数值
  - `dimension_score` (integer) - 该维度得分 (0-100)
  - `last_updated` (timestamptz) - 最后更新时间
  - `data_source` (text) - 数据来源 (system/manual/import)
  - `created_at` (timestamptz) - 创建时间

  ### 标签定义表 (customer_tags)
  定义系统中可用的客户标签
  - `id` (uuid, 主键) - 标签ID
  - `tag_code` (text, 唯一) - 标签代码
  - `tag_name` (text) - 标签名称
  - `tag_category` (text) - 标签分类 (behavior/risk/value/product/service)
  - `tag_color` (text) - 标签显示颜色
  - `description` (text) - 标签描述
  - `is_active` (boolean) - 是否启用
  - `auto_assign_rule` (jsonb) - 自动分配规则 (JSON格式存储规则)
  - `created_at` (timestamptz) - 创建时间
  - `updated_at` (timestamptz) - 更新时间

  ### 客户标签关系表 (customer_tag_relations)
  记录客户与标签的关联关系
  - `id` (uuid, 主键) - 关系ID
  - `customer_id` (text) - 客户ID
  - `tag_code` (text) - 标签代码
  - `assigned_by` (text) - 分配方式 (auto/manual)
  - `assigned_at` (timestamptz) - 分配时间
  - `expires_at` (timestamptz, 可选) - 过期时间
  - `created_at` (timestamptz) - 创建时间

  ## 2. 安全性
  - 为所有新表启用 RLS
  - 添加认证用户访问策略

  ## 3. 说明
  通过多维度数据和标签系统，实现客户的多角度评估和分类
  支持自动和手动标签分配，提供更灵活的客户管理能力
*/

-- 创建客户维度数据表
CREATE TABLE IF NOT EXISTS customer_dimension_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text NOT NULL,
  dimension_code text NOT NULL,
  dimension_value numeric NOT NULL DEFAULT 0,
  dimension_score integer NOT NULL DEFAULT 0 CHECK (dimension_score >= 0 AND dimension_score <= 100),
  last_updated timestamptz DEFAULT now(),
  data_source text NOT NULL DEFAULT 'system' CHECK (data_source IN ('system', 'manual', 'import')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(customer_id, dimension_code)
);

-- 创建标签定义表
CREATE TABLE IF NOT EXISTS customer_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tag_code text UNIQUE NOT NULL,
  tag_name text NOT NULL,
  tag_category text NOT NULL CHECK (tag_category IN ('behavior', 'risk', 'value', 'product', 'service', 'lifecycle', 'industry')),
  tag_color text DEFAULT '#3B82F6',
  description text,
  is_active boolean DEFAULT true,
  auto_assign_rule jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建客户标签关系表
CREATE TABLE IF NOT EXISTS customer_tag_relations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text NOT NULL,
  tag_code text NOT NULL,
  assigned_by text NOT NULL DEFAULT 'auto' CHECK (assigned_by IN ('auto', 'manual')),
  assigned_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(customer_id, tag_code)
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_customer_dimension_customer ON customer_dimension_data(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_dimension_code ON customer_dimension_data(dimension_code);
CREATE INDEX IF NOT EXISTS idx_customer_tag_relations_customer ON customer_tag_relations(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_tag_relations_tag ON customer_tag_relations(tag_code);
CREATE INDEX IF NOT EXISTS idx_customer_tags_category ON customer_tags(tag_category);

-- 启用 RLS
ALTER TABLE customer_dimension_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_tag_relations ENABLE ROW LEVEL SECURITY;

-- 创建 RLS 策略
CREATE POLICY "Authenticated users can view dimension data"
  ON customer_dimension_data FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert dimension data"
  ON customer_dimension_data FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update dimension data"
  ON customer_dimension_data FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete dimension data"
  ON customer_dimension_data FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view tags"
  ON customer_tags FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert tags"
  ON customer_tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tags"
  ON customer_tags FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tags"
  ON customer_tags FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view tag relations"
  ON customer_tag_relations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert tag relations"
  ON customer_tag_relations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tag relations"
  ON customer_tag_relations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tag relations"
  ON customer_tag_relations FOR DELETE
  TO authenticated
  USING (true);

-- 插入标签定义数据
INSERT INTO customer_tags (tag_code, tag_name, tag_category, tag_color, description, is_active) VALUES
  -- 价值类标签
  ('HIGH_VALUE', '高净值客户', 'value', '#9333EA', '资产规模超过500万的高价值客户', true),
  ('GROWTH_POTENTIAL', '成长潜力客户', 'value', '#10B981', '业务增长快速，具有较大发展潜力', true),
  ('STRATEGIC_CLIENT', '战略客户', 'value', '#EF4444', '对银行业务具有战略意义的重要客户', true),
  
  -- 行为类标签
  ('ACTIVE_TRADER', '活跃交易', 'behavior', '#3B82F6', '月均交易次数超过20次', true),
  ('MOBILE_FIRST', '移动优先', 'behavior', '#8B5CF6', '主要通过移动端办理业务', true),
  ('BRANCH_PREFERRED', '网点偏好', 'behavior', '#F59E0B', '主要通过网点办理业务', true),
  ('DORMANT_ACCOUNT', '休眠账户', 'behavior', '#6B7280', '超过6个月无交易活动', true),
  
  -- 风险类标签
  ('LOW_RISK', '低风险', 'risk', '#10B981', '信用记录良好，风险评级低', true),
  ('MEDIUM_RISK', '中等风险', 'risk', '#F59E0B', '风险评级中等，需要关注', true),
  ('HIGH_RISK', '高风险', 'risk', '#EF4444', '存在风险因素，需重点监控', true),
  ('OVERDUE_HISTORY', '逾期记录', 'risk', '#DC2626', '历史上存在贷款逾期记录', true),
  
  -- 产品类标签
  ('MULTI_PRODUCT', '多产品客户', 'product', '#3B82F6', '持有3种以上银行产品', true),
  ('LOAN_CLIENT', '贷款客户', 'product', '#8B5CF6', '持有贷款产品', true),
  ('WEALTH_CLIENT', '理财客户', 'product', '#F59E0B', '持有理财产品', true),
  ('INSURANCE_CLIENT', '保险客户', 'product', '#10B981', '持有保险产品', true),
  ('CREDIT_CARD', '信用卡客户', 'product', '#EC4899', '持有信用卡产品', true),
  
  -- 服务类标签
  ('VIP_SERVICE', 'VIP服务', 'service', '#9333EA', '享受VIP专属服务', true),
  ('COMPLAINT_HISTORY', '投诉记录', 'service', '#EF4444', '存在客户投诉记录', true),
  ('HIGH_SATISFACTION', '高满意度', 'service', '#10B981', '客户满意度评分超过90分', true),
  
  -- 生命周期类标签
  ('NEW_CLIENT', '新客户', 'lifecycle', '#3B82F6', '合作时间少于1年', true),
  ('LOYAL_CLIENT', '忠诚客户', 'lifecycle', '#9333EA', '合作时间超过5年', true),
  ('CHURN_RISK', '流失风险', 'lifecycle', '#EF4444', '存在客户流失风险', true),
  
  -- 行业类标签
  ('MANUFACTURING', '制造业', 'industry', '#6366F1', '制造业企业客户', true),
  ('TECH_COMPANY', '科技企业', 'industry', '#8B5CF6', '科技类企业客户', true),
  ('RETAIL_BUSINESS', '零售商贸', 'industry', '#EC4899', '零售商贸企业客户', true),
  ('REAL_ESTATE', '房地产', 'industry', '#F59E0B', '房地产企业客户', true),
  ('HEALTHCARE', '医疗健康', 'industry', '#10B981', '医疗健康行业客户', true)
ON CONFLICT (tag_code) DO NOTHING;

-- 插入客户维度数据示例
INSERT INTO customer_dimension_data (customer_id, dimension_code, dimension_value, dimension_score, data_source) VALUES
  -- CUST001 江苏制造集团有限公司
  ('CUST001', 'DEPOSIT_BALANCE', 8500000, 95, 'system'),
  ('CUST001', 'LOAN_BALANCE', 12000000, 98, 'system'),
  ('CUST001', 'TRANSACTION_FREQ', 45, 92, 'system'),
  ('CUST001', 'COOPERATION_YEARS', 8, 95, 'system'),
  ('CUST001', 'PRODUCT_COVERAGE', 6, 100, 'system'),
  ('CUST001', 'RISK_LEVEL', 2, 95, 'system'),
  
  -- CUST002 南京科技股份有限公司
  ('CUST002', 'DEPOSIT_BALANCE', 5200000, 85, 'system'),
  ('CUST002', 'LOAN_BALANCE', 7800000, 85, 'system'),
  ('CUST002', 'TRANSACTION_FREQ', 38, 88, 'system'),
  ('CUST002', 'COOPERATION_YEARS', 5, 80, 'system'),
  ('CUST002', 'PRODUCT_COVERAGE', 5, 83, 'system'),
  ('CUST002', 'RISK_LEVEL', 2, 90, 'system'),
  
  -- CUST003 苏州贸易有限公司
  ('CUST003', 'DEPOSIT_BALANCE', 3200000, 72, 'system'),
  ('CUST003', 'LOAN_BALANCE', 4500000, 70, 'system'),
  ('CUST003', 'TRANSACTION_FREQ', 28, 75, 'system'),
  ('CUST003', 'COOPERATION_YEARS', 4, 75, 'system'),
  ('CUST003', 'PRODUCT_COVERAGE', 4, 67, 'system'),
  ('CUST003', 'RISK_LEVEL', 3, 80, 'system'),
  
  -- CUST004 无锡建设集团
  ('CUST004', 'DEPOSIT_BALANCE', 4800000, 82, 'system'),
  ('CUST004', 'LOAN_BALANCE', 9200000, 88, 'system'),
  ('CUST004', 'TRANSACTION_FREQ', 32, 82, 'system'),
  ('CUST004', 'COOPERATION_YEARS', 6, 85, 'system'),
  ('CUST004', 'PRODUCT_COVERAGE', 5, 83, 'system'),
  ('CUST004', 'RISK_LEVEL', 2, 85, 'system'),
  
  -- CUST005 常州医药有限公司
  ('CUST005', 'DEPOSIT_BALANCE', 2800000, 68, 'system'),
  ('CUST005', 'LOAN_BALANCE', 3500000, 65, 'system'),
  ('CUST005', 'TRANSACTION_FREQ', 25, 72, 'system'),
  ('CUST005', 'COOPERATION_YEARS', 3, 70, 'system'),
  ('CUST005', 'PRODUCT_COVERAGE', 4, 67, 'system'),
  ('CUST005', 'RISK_LEVEL', 3, 75, 'system')
ON CONFLICT (customer_id, dimension_code) DO NOTHING;

-- 插入客户标签关系示例
INSERT INTO customer_tag_relations (customer_id, tag_code, assigned_by) VALUES
  -- CUST001
  ('CUST001', 'HIGH_VALUE', 'auto'),
  ('CUST001', 'STRATEGIC_CLIENT', 'manual'),
  ('CUST001', 'ACTIVE_TRADER', 'auto'),
  ('CUST001', 'MULTI_PRODUCT', 'auto'),
  ('CUST001', 'LOAN_CLIENT', 'auto'),
  ('CUST001', 'WEALTH_CLIENT', 'auto'),
  ('CUST001', 'VIP_SERVICE', 'auto'),
  ('CUST001', 'LOYAL_CLIENT', 'auto'),
  ('CUST001', 'MANUFACTURING', 'manual'),
  ('CUST001', 'LOW_RISK', 'auto'),
  
  -- CUST002
  ('CUST002', 'HIGH_VALUE', 'auto'),
  ('CUST002', 'GROWTH_POTENTIAL', 'manual'),
  ('CUST002', 'ACTIVE_TRADER', 'auto'),
  ('CUST002', 'MULTI_PRODUCT', 'auto'),
  ('CUST002', 'MOBILE_FIRST', 'auto'),
  ('CUST002', 'TECH_COMPANY', 'manual'),
  ('CUST002', 'LOW_RISK', 'auto'),
  
  -- CUST003
  ('CUST003', 'MULTI_PRODUCT', 'auto'),
  ('CUST003', 'LOAN_CLIENT', 'auto'),
  ('CUST003', 'RETAIL_BUSINESS', 'manual'),
  ('CUST003', 'MEDIUM_RISK', 'auto'),
  
  -- CUST004
  ('CUST004', 'HIGH_VALUE', 'auto'),
  ('CUST004', 'ACTIVE_TRADER', 'auto'),
  ('CUST004', 'MULTI_PRODUCT', 'auto'),
  ('CUST004', 'LOAN_CLIENT', 'auto'),
  ('CUST004', 'LOYAL_CLIENT', 'auto'),
  ('CUST004', 'REAL_ESTATE', 'manual'),
  ('CUST004', 'LOW_RISK', 'auto'),
  
  -- CUST005
  ('CUST005', 'GROWTH_POTENTIAL', 'manual'),
  ('CUST005', 'MULTI_PRODUCT', 'auto'),
  ('CUST005', 'HEALTHCARE', 'manual'),
  ('CUST005', 'MEDIUM_RISK', 'auto')
ON CONFLICT (customer_id, tag_code) DO NOTHING;
