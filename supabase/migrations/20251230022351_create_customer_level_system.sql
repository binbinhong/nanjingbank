/*
  # 客户等级管理系统数据库设计

  ## 1. 新建表
  
  ### 等级定义表 (customer_levels)
  - `id` (uuid, 主键)
  - `level_code` (text) - 等级代码 (如: VIP, GOLD, SILVER)
  - `level_name` (text) - 等级名称
  - `min_score` (integer) - 最低分数
  - `max_score` (integer) - 最高分数
  - `sort_order` (integer) - 排序顺序
  - `color` (text) - 显示颜色
  - `icon` (text) - 图标
  - `description` (text) - 描述
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 评定指标表 (evaluation_indicators)
  - `id` (uuid, 主键)
  - `indicator_name` (text) - 指标名称
  - `indicator_code` (text) - 指标代码
  - `weight` (integer) - 权重 (%)
  - `category` (text) - 指标类别
  - `calculation_method` (text) - 计算方法
  - `is_active` (boolean) - 是否启用
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 客户等级表 (customer_level_records)
  - `id` (uuid, 主键)
  - `customer_id` (text) - 客户ID
  - `customer_name` (text) - 客户名称
  - `current_level_code` (text) - 当前等级代码
  - `current_score` (integer) - 当前得分
  - `previous_level_code` (text) - 之前等级代码
  - `previous_score` (integer) - 之前得分
  - `status` (text) - 状态: normal, pending_upgrade, pending_downgrade, under_review
  - `last_evaluated_at` (timestamptz) - 最后评定时间
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 等级变动审核表 (level_change_reviews)
  - `id` (uuid, 主键)
  - `customer_id` (text) - 客户ID
  - `customer_name` (text) - 客户名称
  - `from_level` (text) - 原等级
  - `to_level` (text) - 目标等级
  - `change_type` (text) - 变动类型: upgrade, downgrade
  - `change_reason` (text) - 变动原因
  - `score_change` (integer) - 分数变化
  - `auto_triggered` (boolean) - 是否自动触发
  - `review_status` (text) - 审核状态: pending, approved, rejected
  - `reviewer_id` (text) - 审核人ID
  - `reviewer_name` (text) - 审核人姓名
  - `review_comment` (text) - 审核意见
  - `reviewed_at` (timestamptz) - 审核时间
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 等级权益表 (level_benefits)
  - `id` (uuid, 主键)
  - `level_code` (text) - 等级代码
  - `benefit_name` (text) - 权益名称
  - `benefit_type` (text) - 权益类型: discount, service, points, credit
  - `benefit_value` (text) - 权益值
  - `description` (text) - 描述
  - `is_active` (boolean) - 是否启用
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 通知记录表 (level_notifications)
  - `id` (uuid, 主键)
  - `customer_id` (text) - 客户ID
  - `customer_name` (text) - 客户名称
  - `notification_type` (text) - 通知类型: level_upgrade, level_downgrade, benefit_change
  - `title` (text) - 标题
  - `content` (text) - 内容
  - `recipient_type` (text) - 接收人类型: manager, customer, both
  - `manager_id` (text) - 客户经理ID
  - `manager_name` (text) - 客户经理姓名
  - `is_sent_to_customer` (boolean) - 是否发送给客户
  - `is_read` (boolean) - 是否已读
  - `sent_at` (timestamptz) - 发送时间
  - `created_at` (timestamptz)

  ## 2. 安全性
  - 所有表启用 RLS
  - 只允许认证用户访问
*/

-- 创建等级定义表
CREATE TABLE IF NOT EXISTS customer_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  level_code text UNIQUE NOT NULL,
  level_name text NOT NULL,
  min_score integer NOT NULL,
  max_score integer NOT NULL,
  sort_order integer NOT NULL,
  color text DEFAULT '#6B7280',
  icon text DEFAULT 'star',
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建评定指标表
CREATE TABLE IF NOT EXISTS evaluation_indicators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  indicator_name text NOT NULL,
  indicator_code text UNIQUE NOT NULL,
  weight integer NOT NULL CHECK (weight >= 0 AND weight <= 100),
  category text NOT NULL,
  calculation_method text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建客户等级记录表
CREATE TABLE IF NOT EXISTS customer_level_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  current_level_code text NOT NULL,
  current_score integer DEFAULT 0,
  previous_level_code text,
  previous_score integer,
  status text DEFAULT 'normal',
  last_evaluated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建等级变动审核表
CREATE TABLE IF NOT EXISTS level_change_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text NOT NULL,
  customer_name text NOT NULL,
  from_level text NOT NULL,
  to_level text NOT NULL,
  change_type text NOT NULL,
  change_reason text,
  score_change integer DEFAULT 0,
  auto_triggered boolean DEFAULT true,
  review_status text DEFAULT 'pending',
  reviewer_id text,
  reviewer_name text,
  review_comment text,
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建等级权益表
CREATE TABLE IF NOT EXISTS level_benefits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  level_code text NOT NULL,
  benefit_name text NOT NULL,
  benefit_type text NOT NULL,
  benefit_value text NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建通知记录表
CREATE TABLE IF NOT EXISTS level_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text NOT NULL,
  customer_name text NOT NULL,
  notification_type text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  recipient_type text DEFAULT 'manager',
  manager_id text,
  manager_name text,
  is_sent_to_customer boolean DEFAULT false,
  is_read boolean DEFAULT false,
  sent_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- 启用 RLS
ALTER TABLE customer_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_level_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE level_change_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE level_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE level_notifications ENABLE ROW LEVEL SECURITY;

-- 创建 RLS 策略 (允许所有认证用户访问)
CREATE POLICY "Allow authenticated users to view customer_levels"
  ON customer_levels FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage customer_levels"
  ON customer_levels FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view evaluation_indicators"
  ON evaluation_indicators FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage evaluation_indicators"
  ON evaluation_indicators FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view customer_level_records"
  ON customer_level_records FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage customer_level_records"
  ON customer_level_records FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view level_change_reviews"
  ON level_change_reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage level_change_reviews"
  ON level_change_reviews FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view level_benefits"
  ON level_benefits FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage level_benefits"
  ON level_benefits FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view level_notifications"
  ON level_notifications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage level_notifications"
  ON level_notifications FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 插入初始等级数据
INSERT INTO customer_levels (level_code, level_name, min_score, max_score, sort_order, color, icon, description) VALUES
  ('DIAMOND', '钻石客户', 90, 100, 1, '#9333EA', 'gem', '最高等级客户，享受全方位专属服务'),
  ('PLATINUM', '白金客户', 80, 89, 2, '#3B82F6', 'award', '高价值客户，享受优先服务'),
  ('GOLD', '黄金客户', 70, 79, 3, '#F59E0B', 'medal', '重要客户，享受增值服务'),
  ('SILVER', '银卡客户', 60, 69, 4, '#6B7280', 'star', '标准客户，享受基础服务'),
  ('BRONZE', '铜卡客户', 0, 59, 5, '#92400E', 'circle', '普通客户，享受基本服务')
ON CONFLICT (level_code) DO NOTHING;

-- 插入初始评定指标数据
INSERT INTO evaluation_indicators (indicator_name, indicator_code, weight, category, calculation_method, is_active) VALUES
  ('存款余额', 'DEPOSIT_BALANCE', 25, '资产规模', '根据客户存款余额计算得分', true),
  ('贷款余额', 'LOAN_BALANCE', 20, '资产规模', '根据客户贷款余额计算得分', true),
  ('交易频次', 'TRANSACTION_FREQ', 15, '活跃度', '根据月均交易次数计算得分', true),
  ('合作年限', 'COOPERATION_YEARS', 10, '忠诚度', '根据合作年限计算得分', true),
  ('产品覆盖率', 'PRODUCT_COVERAGE', 15, '业务深度', '根据使用产品数量计算得分', true),
  ('风险等级', 'RISK_LEVEL', 15, '风险控制', '根据客户风险评级计算得分', true)
ON CONFLICT (indicator_code) DO NOTHING;

-- 插入等级权益数据
INSERT INTO level_benefits (level_code, benefit_name, benefit_type, benefit_value, description, is_active) VALUES
  ('DIAMOND', '专属客户经理', 'service', '1对1', '配备专属客户经理提供全天候服务', true),
  ('DIAMOND', '贷款利率优惠', 'discount', '最高8折', '贷款利率享受最高8折优惠', true),
  ('DIAMOND', '积分加速', 'points', '3倍', '所有交易积分3倍加速', true),
  ('DIAMOND', '授信额度提升', 'credit', '+50%', '授信额度提升50%', true),
  ('PLATINUM', '优先服务通道', 'service', '优先办理', '享受优先服务通道', true),
  ('PLATINUM', '贷款利率优惠', 'discount', '最高9折', '贷款利率享受最高9折优惠', true),
  ('PLATINUM', '积分加速', 'points', '2倍', '所有交易积分2倍加速', true),
  ('PLATINUM', '授信额度提升', 'credit', '+30%', '授信额度提升30%', true),
  ('GOLD', '快速审批', 'service', '48小时', '业务审批48小时内完成', true),
  ('GOLD', '贷款利率优惠', 'discount', '9.5折', '贷款利率享受9.5折优惠', true),
  ('GOLD', '积分加速', 'points', '1.5倍', '所有交易积分1.5倍加速', true),
  ('GOLD', '授信额度提升', 'credit', '+20%', '授信额度提升20%', true),
  ('SILVER', '标准服务', 'service', '标准', '享受标准服务', true),
  ('SILVER', '积分累积', 'points', '1倍', '交易积分正常累积', true),
  ('BRONZE', '基础服务', 'service', '基础', '享受基础服务', true)
ON CONFLICT DO NOTHING;

-- 插入模拟客户数据
INSERT INTO customer_level_records (customer_id, customer_name, current_level_code, current_score, previous_level_code, previous_score, status) VALUES
  ('CUST001', '江苏制造集团有限公司', 'DIAMOND', 95, 'PLATINUM', 88, 'normal'),
  ('CUST002', '南京科技股份有限公司', 'PLATINUM', 85, 'GOLD', 78, 'normal'),
  ('CUST003', '苏州贸易有限公司', 'GOLD', 75, 'GOLD', 73, 'normal'),
  ('CUST004', '无锡建设集团', 'PLATINUM', 82, 'PLATINUM', 81, 'normal'),
  ('CUST005', '常州医药有限公司', 'GOLD', 72, 'SILVER', 68, 'pending_upgrade'),
  ('CUST006', '镇江物流股份公司', 'SILVER', 65, 'SILVER', 64, 'normal'),
  ('CUST007', '扬州食品加工厂', 'SILVER', 61, 'GOLD', 70, 'under_review'),
  ('CUST008', '泰州化工有限公司', 'GOLD', 76, 'GOLD', 75, 'normal'),
  ('CUST009', '南通纺织集团', 'BRONZE', 55, 'BRONZE', 52, 'normal'),
  ('CUST010', '徐州能源股份公司', 'DIAMOND', 92, 'DIAMOND', 91, 'normal')
ON CONFLICT (customer_id) DO NOTHING;

-- 插入审核记录数据
INSERT INTO level_change_reviews (customer_id, customer_name, from_level, to_level, change_type, change_reason, score_change, auto_triggered, review_status) VALUES
  ('CUST005', '常州医药有限公司', 'SILVER', 'GOLD', 'upgrade', '存款余额大幅增加，交易频次提升', 4, true, 'pending'),
  ('CUST007', '扬州食品加工厂', 'GOLD', 'SILVER', 'downgrade', '贷款逾期，风险等级上升', -9, true, 'pending'),
  ('CUST011', '连云港港口集团', 'GOLD', 'PLATINUM', 'upgrade', '新增多项业务合作，产品覆盖率提升', 8, false, 'pending')
ON CONFLICT DO NOTHING;

-- 插入通知记录数据
INSERT INTO level_notifications (customer_id, customer_name, notification_type, title, content, recipient_type, manager_name, is_sent_to_customer, is_read) VALUES
  ('CUST001', '江苏制造集团有限公司', 'level_upgrade', '客户等级提升通知', '恭喜！江苏制造集团有限公司已从白金客户升级为钻石客户，当前得分95分。新增权益：专属客户经理、贷款利率8折优惠等。', 'both', '张经理', true, false),
  ('CUST002', '南京科技股份有限公司', 'level_upgrade', '客户等级提升通知', '南京科技股份有限公司已从黄金客户升级为白金客户，当前得分85分。', 'manager', '李经理', false, true),
  ('CUST005', '常州医药有限公司', 'level_upgrade', '客户接近等级提升阈值', '常州医药有限公司当前得分72分，距离黄金客户仅差8分，建议制定针对性提升方案。', 'manager', '王经理', false, false)
ON CONFLICT DO NOTHING;