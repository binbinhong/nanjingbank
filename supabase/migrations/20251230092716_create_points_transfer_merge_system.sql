/*
  # 创建积分转赠合并系统

  1. 新增表
    - `customer_accounts` - 客户账户表
      - `id` (uuid, 主键) - 账户ID
      - `customer_name` (text) - 客户名称
      - `customer_type` (text) - 客户类型 (enterprise/personal)
      - `parent_account_id` (uuid, 可选) - 父账户ID (企业子账号使用)
      - `points_balance` (integer) - 积分余额
      - `branch` (text) - 所属分行
      - `status` (text) - 账户状态
      - `created_at` (timestamptz) - 创建时间
      - `updated_at` (timestamptz) - 更新时间
    
    - `points_transfers` - 积分转赠记录表
      - `id` (uuid, 主键) - 转赠ID
      - `from_account_id` (uuid) - 转出账户ID
      - `to_account_id` (uuid) - 转入账户ID
      - `points_amount` (integer) - 转赠积分数量
      - `transfer_type` (text) - 转赠类型 (enterprise_internal/enterprise_to_retail/retail_to_enterprise)
      - `reason` (text) - 转赠原因
      - `status` (text) - 状态 (pending/completed/failed/rejected)
      - `operator` (text) - 操作人
      - `remark` (text, 可选) - 备注
      - `created_at` (timestamptz) - 创建时间
      - `completed_at` (timestamptz, 可选) - 完成时间
    
    - `points_merges` - 积分合并记录表
      - `id` (uuid, 主键) - 合并ID
      - `from_accounts` (jsonb) - 源账户列表 (包含账户ID和积分)
      - `to_account_id` (uuid) - 目标账户ID
      - `total_points` (integer) - 合并总积分
      - `merge_type` (text) - 合并类型 (sub_to_main/account_consolidation)
      - `reason` (text) - 合并原因
      - `status` (text) - 状态 (pending/completed/failed)
      - `operator` (text) - 操作人
      - `remark` (text, 可选) - 备注
      - `created_at` (timestamptz) - 创建时间
      - `completed_at` (timestamptz, 可选) - 完成时间

  2. 安全性
    - 为所有表启用 RLS
    - 添加认证用户访问策略
*/

-- 创建客户账户表
CREATE TABLE IF NOT EXISTS customer_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_type text NOT NULL CHECK (customer_type IN ('enterprise', 'personal')),
  parent_account_id uuid REFERENCES customer_accounts(id),
  points_balance integer NOT NULL DEFAULT 0,
  branch text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'frozen', 'closed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建积分转赠记录表
CREATE TABLE IF NOT EXISTS points_transfers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_account_id uuid NOT NULL REFERENCES customer_accounts(id),
  to_account_id uuid NOT NULL REFERENCES customer_accounts(id),
  points_amount integer NOT NULL CHECK (points_amount > 0),
  transfer_type text NOT NULL CHECK (transfer_type IN ('enterprise_internal', 'enterprise_to_retail', 'retail_to_enterprise')),
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'rejected')),
  operator text NOT NULL,
  remark text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- 创建积分合并记录表
CREATE TABLE IF NOT EXISTS points_merges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_accounts jsonb NOT NULL,
  to_account_id uuid NOT NULL REFERENCES customer_accounts(id),
  total_points integer NOT NULL CHECK (total_points > 0),
  merge_type text NOT NULL CHECK (merge_type IN ('sub_to_main', 'account_consolidation')),
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  operator text NOT NULL,
  remark text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_customer_accounts_parent ON customer_accounts(parent_account_id);
CREATE INDEX IF NOT EXISTS idx_customer_accounts_type ON customer_accounts(customer_type);
CREATE INDEX IF NOT EXISTS idx_points_transfers_from ON points_transfers(from_account_id);
CREATE INDEX IF NOT EXISTS idx_points_transfers_to ON points_transfers(to_account_id);
CREATE INDEX IF NOT EXISTS idx_points_transfers_status ON points_transfers(status);
CREATE INDEX IF NOT EXISTS idx_points_merges_to ON points_merges(to_account_id);
CREATE INDEX IF NOT EXISTS idx_points_merges_status ON points_merges(status);

-- 启用 RLS
ALTER TABLE customer_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_merges ENABLE ROW LEVEL SECURITY;

-- 创建 RLS 策略
CREATE POLICY "Authenticated users can view customer accounts"
  ON customer_accounts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert customer accounts"
  ON customer_accounts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update customer accounts"
  ON customer_accounts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view transfers"
  ON points_transfers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert transfers"
  ON points_transfers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update transfers"
  ON points_transfers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view merges"
  ON points_merges FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert merges"
  ON points_merges FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update merges"
  ON points_merges FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 插入示例客户账户数据
INSERT INTO customer_accounts (customer_name, customer_type, points_balance, branch, status) VALUES
('南京XX科技有限公司', 'enterprise', 500000, '南京分行', 'active'),
('江苏YY贸易公司', 'enterprise', 300000, '苏州分行', 'active'),
('张三', 'personal', 8500, '南京分行', 'active'),
('李四', 'personal', 12300, '南京分行', 'active'),
('王五', 'personal', 6800, '无锡分行', 'active');

-- 为企业账户创建子账户
DO $$
DECLARE
  parent_id uuid;
BEGIN
  SELECT id INTO parent_id FROM customer_accounts WHERE customer_name = '南京XX科技有限公司' LIMIT 1;
  
  IF parent_id IS NOT NULL THEN
    INSERT INTO customer_accounts (customer_name, customer_type, parent_account_id, points_balance, branch, status) VALUES
    ('南京XX科技-研发部', 'enterprise', parent_id, 50000, '南京分行', 'active'),
    ('南京XX科技-销售部', 'enterprise', parent_id, 35000, '南京分行', 'active'),
    ('南京XX科技-市场部', 'enterprise', parent_id, 28000, '南京分行', 'active');
  END IF;
END $$;

-- 插入示例转赠记录
INSERT INTO points_transfers (from_account_id, to_account_id, points_amount, transfer_type, reason, status, operator, completed_at)
SELECT 
  (SELECT id FROM customer_accounts WHERE customer_name = '南京XX科技有限公司' LIMIT 1),
  (SELECT id FROM customer_accounts WHERE customer_name = '张三' LIMIT 1),
  5000,
  'enterprise_to_retail',
  '企业员工福利发放',
  'completed',
  '管理员',
  now() - interval '2 hours';

INSERT INTO points_transfers (from_account_id, to_account_id, points_amount, transfer_type, reason, status, operator)
SELECT 
  (SELECT id FROM customer_accounts WHERE customer_name = '南京XX科技-研发部' LIMIT 1),
  (SELECT id FROM customer_accounts WHERE customer_name = '南京XX科技-销售部' LIMIT 1),
  10000,
  'enterprise_internal',
  '部门间积分调拨',
  'pending',
  '财务部';

-- 插入示例合并记录
INSERT INTO points_merges (from_accounts, to_account_id, total_points, merge_type, reason, status, operator, completed_at)
SELECT 
  jsonb_build_array(
    jsonb_build_object('account_id', sub1.id, 'account_name', sub1.customer_name, 'points', 15000),
    jsonb_build_object('account_id', sub2.id, 'account_name', sub2.customer_name, 'points', 12000)
  ),
  parent.id,
  27000,
  'sub_to_main',
  '子账户积分合并至主账户',
  'completed',
  '系统管理员',
  now() - interval '1 day'
FROM 
  customer_accounts parent,
  customer_accounts sub1,
  customer_accounts sub2
WHERE 
  parent.customer_name = '南京XX科技有限公司'
  AND sub1.customer_name = '南京XX科技-研发部'
  AND sub2.customer_name = '南京XX科技-销售部'
LIMIT 1;
