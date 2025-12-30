/*
  # 后台管理系统数据库设计

  ## 1. 新建表

  ### 角色管理表 (admin_roles)
  - `id` (uuid, 主键)
  - `role_code` (text) - 角色代码
  - `role_name` (text) - 角色名称
  - `description` (text) - 描述
  - `permissions` (jsonb) - 权限列表
  - `is_active` (boolean) - 是否启用
  - `created_by` (text) - 创建人
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 用户管理表 (admin_users)
  - `id` (uuid, 主键)
  - `user_id` (text) - 用户ID
  - `username` (text) - 用户名
  - `real_name` (text) - 真实姓名
  - `email` (text) - 邮箱
  - `phone` (text) - 手机号
  - `department` (text) - 部门
  - `position` (text) - 职位
  - `role_codes` (text[]) - 角色代码列表
  - `branch_code` (text) - 所属机构代码
  - `is_active` (boolean) - 是否启用
  - `last_login_at` (timestamptz) - 最后登录时间
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 机构管理表 (admin_branches)
  - `id` (uuid, 主键)
  - `branch_code` (text) - 机构代码
  - `branch_name` (text) - 机构名称
  - `parent_code` (text) - 上级机构代码
  - `branch_type` (text) - 机构类型
  - `level` (integer) - 机构层级
  - `province` (text) - 省份
  - `city` (text) - 城市
  - `address` (text) - 地址
  - `contact_person` (text) - 联系人
  - `contact_phone` (text) - 联系电话
  - `status` (text) - 状态
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 参数配置表 (admin_parameters)
  - `id` (uuid, 主键)
  - `param_code` (text) - 参数代码
  - `param_name` (text) - 参数名称
  - `param_value` (text) - 参数值
  - `param_type` (text) - 参数类型
  - `category` (text) - 分类
  - `description` (text) - 描述
  - `is_editable` (boolean) - 是否可编辑
  - `updated_by` (text) - 更新人
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 数据字典表 (admin_dictionaries)
  - `id` (uuid, 主键)
  - `dict_type` (text) - 字典类型
  - `dict_code` (text) - 字典代码
  - `dict_label` (text) - 字典标签
  - `dict_value` (text) - 字典值
  - `sort_order` (integer) - 排序
  - `is_active` (boolean) - 是否启用
  - `remark` (text) - 备注
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 系统任务表 (admin_tasks)
  - `id` (uuid, 主键)
  - `task_code` (text) - 任务代码
  - `task_name` (text) - 任务名称
  - `task_type` (text) - 任务类型
  - `status` (text) - 状态
  - `schedule_time` (timestamptz) - 计划执行时间
  - `start_time` (timestamptz) - 开始时间
  - `end_time` (timestamptz) - 结束时间
  - `duration` (integer) - 执行时长(秒)
  - `result` (text) - 执行结果
  - `error_message` (text) - 错误信息
  - `created_at` (timestamptz)

  ### 任务日志表 (admin_task_logs)
  - `id` (uuid, 主键)
  - `task_id` (uuid) - 任务ID
  - `log_level` (text) - 日志级别
  - `log_message` (text) - 日志内容
  - `log_time` (timestamptz) - 日志时间

  ### 操作日志表 (admin_operation_logs)
  - `id` (uuid, 主键)
  - `user_id` (text) - 用户ID
  - `username` (text) - 用户名
  - `operation_type` (text) - 操作类型
  - `module` (text) - 模块
  - `description` (text) - 操作描述
  - `ip_address` (text) - IP地址
  - `request_url` (text) - 请求URL
  - `request_params` (jsonb) - 请求参数
  - `response_data` (jsonb) - 响应数据
  - `status` (text) - 状态
  - `error_message` (text) - 错误信息
  - `duration` (integer) - 执行时长(ms)
  - `created_at` (timestamptz)

  ### 审批流程表 (admin_workflows)
  - `id` (uuid, 主键)
  - `workflow_code` (text) - 流程代码
  - `workflow_name` (text) - 流程名称
  - `workflow_type` (text) - 流程类型
  - `steps` (jsonb) - 流程步骤
  - `is_active` (boolean) - 是否启用
  - `created_by` (text) - 创建人
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 审批记录表 (admin_approvals)
  - `id` (uuid, 主键)
  - `approval_no` (text) - 审批单号
  - `workflow_code` (text) - 流程代码
  - `workflow_name` (text) - 流程名称
  - `apply_user_id` (text) - 申请人ID
  - `apply_username` (text) - 申请人姓名
  - `apply_reason` (text) - 申请原因
  - `current_step` (integer) - 当前步骤
  - `status` (text) - 状态
  - `business_data` (jsonb) - 业务数据
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 商城接口配置表 (admin_mall_configs)
  - `id` (uuid, 主键)
  - `config_name` (text) - 配置名称
  - `api_url` (text) - API地址
  - `api_key` (text) - API密钥
  - `app_id` (text) - 应用ID
  - `timeout` (integer) - 超时时间
  - `retry_times` (integer) - 重试次数
  - `is_enabled` (boolean) - 是否启用
  - `remark` (text) - 备注
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 商城对接日志表 (admin_mall_logs)
  - `id` (uuid, 主键)
  - `interface_name` (text) - 接口名称
  - `request_method` (text) - 请求方法
  - `request_url` (text) - 请求地址
  - `request_params` (jsonb) - 请求参数
  - `response_data` (jsonb) - 响应数据
  - `status_code` (integer) - 状态码
  - `duration` (integer) - 耗时(ms)
  - `success` (boolean) - 是否成功
  - `error_message` (text) - 错误信息
  - `created_at` (timestamptz)

  ## 2. 安全性
  - 所有表启用 RLS
  - 允许所有用户访问（演示环境）
*/

-- 创建角色管理表
CREATE TABLE IF NOT EXISTS admin_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_code text UNIQUE NOT NULL,
  role_name text NOT NULL,
  description text,
  permissions jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_by text DEFAULT '系统管理员',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建用户管理表
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  real_name text NOT NULL,
  email text,
  phone text,
  department text,
  position text,
  role_codes text[] DEFAULT ARRAY[]::text[],
  branch_code text,
  is_active boolean DEFAULT true,
  last_login_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建机构管理表
CREATE TABLE IF NOT EXISTS admin_branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_code text UNIQUE NOT NULL,
  branch_name text NOT NULL,
  parent_code text,
  branch_type text NOT NULL,
  level integer DEFAULT 1,
  province text,
  city text,
  address text,
  contact_person text,
  contact_phone text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建参数配置表
CREATE TABLE IF NOT EXISTS admin_parameters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  param_code text UNIQUE NOT NULL,
  param_name text NOT NULL,
  param_value text NOT NULL,
  param_type text DEFAULT 'string',
  category text,
  description text,
  is_editable boolean DEFAULT true,
  updated_by text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建数据字典表
CREATE TABLE IF NOT EXISTS admin_dictionaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dict_type text NOT NULL,
  dict_code text NOT NULL,
  dict_label text NOT NULL,
  dict_value text NOT NULL,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  remark text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(dict_type, dict_code)
);

-- 创建系统任务表
CREATE TABLE IF NOT EXISTS admin_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_code text UNIQUE NOT NULL,
  task_name text NOT NULL,
  task_type text NOT NULL,
  status text DEFAULT 'pending',
  schedule_time timestamptz,
  start_time timestamptz,
  end_time timestamptz,
  duration integer,
  result text,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- 创建任务日志表
CREATE TABLE IF NOT EXISTS admin_task_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES admin_tasks(id),
  log_level text DEFAULT 'info',
  log_message text NOT NULL,
  log_time timestamptz DEFAULT now()
);

-- 创建操作日志表
CREATE TABLE IF NOT EXISTS admin_operation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  username text NOT NULL,
  operation_type text NOT NULL,
  module text NOT NULL,
  description text NOT NULL,
  ip_address text,
  request_url text,
  request_params jsonb,
  response_data jsonb,
  status text DEFAULT 'success',
  error_message text,
  duration integer,
  created_at timestamptz DEFAULT now()
);

-- 创建审批流程表
CREATE TABLE IF NOT EXISTS admin_workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_code text UNIQUE NOT NULL,
  workflow_name text NOT NULL,
  workflow_type text NOT NULL,
  steps jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_by text DEFAULT '系统管理员',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建审批记录表
CREATE TABLE IF NOT EXISTS admin_approvals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  approval_no text UNIQUE NOT NULL,
  workflow_code text NOT NULL,
  workflow_name text NOT NULL,
  apply_user_id text NOT NULL,
  apply_username text NOT NULL,
  apply_reason text,
  current_step integer DEFAULT 1,
  status text DEFAULT 'pending',
  business_data jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建商城接口配置表
CREATE TABLE IF NOT EXISTS admin_mall_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  config_name text NOT NULL,
  api_url text NOT NULL,
  api_key text,
  app_id text,
  timeout integer DEFAULT 30000,
  retry_times integer DEFAULT 3,
  is_enabled boolean DEFAULT true,
  remark text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建商城对接日志表
CREATE TABLE IF NOT EXISTS admin_mall_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interface_name text NOT NULL,
  request_method text NOT NULL,
  request_url text NOT NULL,
  request_params jsonb,
  response_data jsonb,
  status_code integer,
  duration integer,
  success boolean DEFAULT false,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- 启用 RLS
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_parameters ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_dictionaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_task_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_operation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_mall_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_mall_logs ENABLE ROW LEVEL SECURITY;

-- 创建允许所有用户访问的策略
CREATE POLICY "Allow all to view admin_roles" ON admin_roles FOR SELECT USING (true);
CREATE POLICY "Allow all to manage admin_roles" ON admin_roles FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all to view admin_users" ON admin_users FOR SELECT USING (true);
CREATE POLICY "Allow all to manage admin_users" ON admin_users FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all to view admin_branches" ON admin_branches FOR SELECT USING (true);
CREATE POLICY "Allow all to manage admin_branches" ON admin_branches FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all to view admin_parameters" ON admin_parameters FOR SELECT USING (true);
CREATE POLICY "Allow all to manage admin_parameters" ON admin_parameters FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all to view admin_dictionaries" ON admin_dictionaries FOR SELECT USING (true);
CREATE POLICY "Allow all to manage admin_dictionaries" ON admin_dictionaries FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all to view admin_tasks" ON admin_tasks FOR SELECT USING (true);
CREATE POLICY "Allow all to manage admin_tasks" ON admin_tasks FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all to view admin_task_logs" ON admin_task_logs FOR SELECT USING (true);
CREATE POLICY "Allow all to manage admin_task_logs" ON admin_task_logs FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all to view admin_operation_logs" ON admin_operation_logs FOR SELECT USING (true);
CREATE POLICY "Allow all to manage admin_operation_logs" ON admin_operation_logs FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all to view admin_workflows" ON admin_workflows FOR SELECT USING (true);
CREATE POLICY "Allow all to manage admin_workflows" ON admin_workflows FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all to view admin_approvals" ON admin_approvals FOR SELECT USING (true);
CREATE POLICY "Allow all to manage admin_approvals" ON admin_approvals FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all to view admin_mall_configs" ON admin_mall_configs FOR SELECT USING (true);
CREATE POLICY "Allow all to manage admin_mall_configs" ON admin_mall_configs FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all to view admin_mall_logs" ON admin_mall_logs FOR SELECT USING (true);
CREATE POLICY "Allow all to manage admin_mall_logs" ON admin_mall_logs FOR ALL USING (true) WITH CHECK (true);