import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface CustomerLevel {
  id: string;
  level_code: string;
  level_name: string;
  min_score: number;
  max_score: number;
  sort_order: number;
  color: string;
  icon: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface EvaluationIndicator {
  id: string;
  indicator_name: string;
  indicator_code: string;
  weight: number;
  category: string;
  calculation_method: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CustomerLevelRecord {
  id: string;
  customer_id: string;
  customer_name: string;
  current_level_code: string;
  current_score: number;
  previous_level_code: string | null;
  previous_score: number | null;
  status: string;
  last_evaluated_at: string;
  created_at: string;
  updated_at: string;
}

export interface LevelChangeReview {
  id: string;
  customer_id: string;
  customer_name: string;
  from_level: string;
  to_level: string;
  change_type: string;
  change_reason: string;
  score_change: number;
  auto_triggered: boolean;
  review_status: string;
  reviewer_id: string | null;
  reviewer_name: string | null;
  review_comment: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface LevelBenefit {
  id: string;
  level_code: string;
  benefit_name: string;
  benefit_type: string;
  benefit_value: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LevelNotification {
  id: string;
  customer_id: string;
  customer_name: string;
  notification_type: string;
  title: string;
  content: string;
  recipient_type: string;
  manager_id: string | null;
  manager_name: string | null;
  is_sent_to_customer: boolean;
  is_read: boolean;
  sent_at: string;
  created_at: string;
}
