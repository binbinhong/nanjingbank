/*
  # 添加南京银行对公客户业务数据

  ## 说明
  本次迁移添加更多真实的对公客户业务数据，包括：
  - 江苏省内各类企业客户（制造业、科技、医药、贸易、建筑、物流等）
  - 更多等级变动审核记录
  - 更多通知记录
  - 符合银行对公业务特点的数据
*/

-- 插入更多客户等级记录数据
INSERT INTO customer_level_records (customer_id, customer_name, current_level_code, current_score, previous_level_code, previous_score, status, last_evaluated_at) VALUES
  ('CUST011', '江苏国信集团有限公司', 'DIAMOND', 98, 'DIAMOND', 96, 'normal', now() - interval '2 days'),
  ('CUST012', '南京钢铁股份有限公司', 'PLATINUM', 88, 'PLATINUM', 87, 'normal', now() - interval '3 days'),
  ('CUST013', '扬子江药业集团', 'DIAMOND', 96, 'PLATINUM', 89, 'normal', now() - interval '5 days'),
  ('CUST014', '苏宁控股集团', 'PLATINUM', 84, 'GOLD', 79, 'normal', now() - interval '7 days'),
  ('CUST015', '江苏沙钢集团', 'DIAMOND', 94, 'DIAMOND', 93, 'normal', now() - interval '1 day'),
  ('CUST016', '南京医药股份有限公司', 'GOLD', 77, 'GOLD', 76, 'normal', now() - interval '4 days'),
  ('CUST017', '江苏洋河酒厂股份有限公司', 'PLATINUM', 86, 'PLATINUM', 85, 'normal', now() - interval '6 days'),
  ('CUST018', '苏州工业园区建设发展集团', 'GOLD', 78, 'SILVER', 69, 'pending_upgrade', now() - interval '1 hour'),
  ('CUST019', '南京新百集团', 'GOLD', 74, 'GOLD', 72, 'normal', now() - interval '8 days'),
  ('CUST020', '江苏恒瑞医药股份有限公司', 'DIAMOND', 97, 'PLATINUM', 88, 'normal', now() - interval '10 days'),
  ('CUST021', '无锡尚德太阳能电力有限公司', 'GOLD', 73, 'GOLD', 71, 'normal', now() - interval '5 days'),
  ('CUST022', '江苏悦达集团', 'PLATINUM', 83, 'PLATINUM', 82, 'normal', now() - interval '3 days'),
  ('CUST023', '常州天合光能有限公司', 'GOLD', 76, 'SILVER', 68, 'normal', now() - interval '12 days'),
  ('CUST024', '南京市城市建设投资控股集团', 'DIAMOND', 93, 'DIAMOND', 92, 'normal', now() - interval '2 days'),
  ('CUST025', '江苏华西集团', 'PLATINUM', 81, 'GOLD', 78, 'normal', now() - interval '15 days'),
  ('CUST026', '苏州固锝电子股份有限公司', 'SILVER', 67, 'SILVER', 66, 'normal', now() - interval '7 days'),
  ('CUST027', '江苏新华发集团', 'GOLD', 75, 'GOLD', 74, 'normal', now() - interval '4 days'),
  ('CUST028', '南京港（集团）有限公司', 'PLATINUM', 85, 'PLATINUM', 84, 'normal', now() - interval '6 days'),
  ('CUST029', '无锡红豆集团', 'GOLD', 72, 'SILVER', 67, 'normal', now() - interval '20 days'),
  ('CUST030', '江苏苏美达集团', 'PLATINUM', 82, 'PLATINUM', 81, 'normal', now() - interval '3 days'),
  ('CUST031', '徐州矿务集团', 'SILVER', 66, 'SILVER', 65, 'normal', now() - interval '9 days'),
  ('CUST032', '江苏东华能源股份有限公司', 'GOLD', 79, 'GOLD', 77, 'normal', now() - interval '5 days'),
  ('CUST033', '连云港港口集团', 'PLATINUM', 87, 'GOLD', 79, 'normal', now() - interval '18 days'),
  ('CUST034', '南京雨润食品有限公司', 'SILVER', 64, 'GOLD', 71, 'under_review', now() - interval '2 hours'),
  ('CUST035', '江苏天工集团', 'GOLD', 73, 'GOLD', 72, 'normal', now() - interval '11 days'),
  ('CUST036', '宿迁洋河新区建设集团', 'SILVER', 62, 'SILVER', 61, 'normal', now() - interval '8 days'),
  ('CUST037', '江苏吴中集团', 'GOLD', 77, 'GOLD', 76, 'normal', now() - interval '6 days'),
  ('CUST038', '南通中远海运川崎船舶工程有限公司', 'PLATINUM', 80, 'GOLD', 78, 'normal', now() - interval '22 days'),
  ('CUST039', '盐城市城市建设投资集团', 'SILVER', 68, 'SILVER', 67, 'normal', now() - interval '7 days'),
  ('CUST040', '泰州医药城建设发展有限公司', 'GOLD', 70, 'SILVER', 69, 'pending_upgrade', now() - interval '3 hours'),
  ('CUST041', '镇江新区产业投资集团', 'SILVER', 63, 'BRONZE', 58, 'normal', now() - interval '25 days'),
  ('CUST042', '扬州经济技术开发区投资发展集团', 'SILVER', 65, 'SILVER', 64, 'normal', now() - interval '10 days'),
  ('CUST043', '江苏亨通集团', 'PLATINUM', 89, 'PLATINUM', 88, 'normal', now() - interval '4 days'),
  ('CUST044', '无锡威孚高科技集团', 'GOLD', 78, 'GOLD', 77, 'normal', now() - interval '5 days'),
  ('CUST045', '南京高科技开发区总公司', 'GOLD', 74, 'GOLD', 73, 'normal', now() - interval '8 days'),
  ('CUST046', '苏州协鑫集团', 'PLATINUM', 81, 'PLATINUM', 80, 'normal', now() - interval '6 days'),
  ('CUST047', '江苏中南建设集团', 'GOLD', 76, 'GOLD', 75, 'normal', now() - interval '9 days'),
  ('CUST048', '常州东方国际集团', 'SILVER', 69, 'SILVER', 68, 'normal', now() - interval '7 days'),
  ('CUST049', '淮安市水利投资建设集团', 'BRONZE', 58, 'BRONZE', 56, 'normal', now() - interval '12 days'),
  ('CUST050', '江阴华西钢铁有限公司', 'GOLD', 71, 'GOLD', 70, 'normal', now() - interval '5 days')
ON CONFLICT (customer_id) DO NOTHING;

-- 插入更多审核记录
INSERT INTO level_change_reviews (customer_id, customer_name, from_level, to_level, change_type, change_reason, score_change, auto_triggered, review_status, created_at) VALUES
  ('CUST018', '苏州工业园区建设发展集团', 'SILVER', 'GOLD', 'upgrade', '大型基建项目贷款增加，存款余额突破5亿元，业务合作深度显著提升', 9, true, 'pending', now() - interval '1 hour'),
  ('CUST034', '南京雨润食品有限公司', 'GOLD', 'SILVER', 'downgrade', '企业现金流紧张，部分贷款出现逾期，风险评级下调', -7, true, 'pending', now() - interval '2 hours'),
  ('CUST040', '泰州医药城建设发展有限公司', 'SILVER', 'GOLD', 'upgrade', '医药产业园项目获批，新增授信3亿元，交易频次月均提升40%', 8, true, 'pending', now() - interval '3 hours'),
  ('CUST013', '扬子江药业集团', 'PLATINUM', 'DIAMOND', 'upgrade', '集团营收突破500亿元，新增多项跨境金融业务，产品覆盖率达95%', 7, false, 'approved', now() - interval '5 days'),
  ('CUST020', '江苏恒瑞医药股份有限公司', 'PLATINUM', 'DIAMOND', 'upgrade', 'IPO成功上市，市值突破千亿，存款余额和贷款余额均创新高', 9, true, 'approved', now() - interval '10 days'),
  ('CUST033', '连云港港口集团', 'GOLD', 'PLATINUM', 'upgrade', '港口吞吐量年增长35%，国际贸易结算业务大幅增加', 8, false, 'approved', now() - interval '18 days'),
  ('CUST038', '南通中远海运川崎船舶工程有限公司', 'GOLD', 'PLATINUM', 'upgrade', '获得大型船舶订单，贸易融资需求增长，合作年限超过10年', 7, true, 'approved', now() - interval '22 days'),
  ('CUST029', '无锡红豆集团', 'SILVER', 'GOLD', 'upgrade', '海外业务扩展，跨境支付结算量提升，新增供应链金融业务', 5, true, 'approved', now() - interval '20 days'),
  ('CUST023', '常州天合光能有限公司', 'SILVER', 'GOLD', 'upgrade', '光伏产业回暖，订单量激增，设备融资租赁业务开展顺利', 8, true, 'approved', now() - interval '12 days'),
  ('CUST041', '镇江新区产业投资集团', 'BRONZE', 'SILVER', 'upgrade', '产业园区招商成功，入驻企业超过50家，资金流动性改善', 5, true, 'approved', now() - interval '25 days'),
  ('CUST052', '宜兴陶瓷产业集团', 'GOLD', 'SILVER', 'downgrade', '陶瓷行业整体下行，企业营收下降，部分应收账款逾期', -6, true, 'rejected', now() - interval '30 days'),
  ('CUST053', '昆山开发区投资发展集团', 'SILVER', 'GOLD', 'upgrade', '台资企业聚集效应显现，外汇结算业务量大增', 7, false, 'approved', now() - interval '28 days')
ON CONFLICT DO NOTHING;

-- 插入更多通知记录
INSERT INTO level_notifications (customer_id, customer_name, notification_type, title, content, recipient_type, manager_name, is_sent_to_customer, is_read, sent_at) VALUES
  ('CUST013', '扬子江药业集团', 'level_upgrade', '客户等级提升至钻石级', '恭喜！扬子江药业集团已成功升级为钻石客户。当前评分96分，较上期提升7分。新增权益包括：专属客户经理、贷款利率最高8折优惠、积分3倍加速、授信额度提升50%。感谢您对南京银行的长期信赖与支持！', 'both', '王建军', true, true, now() - interval '5 days'),
  ('CUST020', '江苏恒瑞医药股份有限公司', 'level_upgrade', '客户等级提升至钻石级', '尊敬的客户，江苏恒瑞医药股份有限公司已升级为钻石客户！当前评分97分。作为我行最高等级客户，您将享受全方位专属金融服务。客户经理将在24小时内与您联系，介绍详细权益内容。', 'both', '李明华', true, true, now() - interval '10 days'),
  ('CUST033', '连云港港口集团', 'level_upgrade', '客户等级提升至白金级', '连云港港口集团已从黄金客户升级为白金客户，当前评分87分，提升8分。新增权益：优先服务通道、贷款利率9折优惠、积分2倍加速、授信额度提升30%。', 'both', '张伟', true, false, now() - interval '18 days'),
  ('CUST018', '苏州工业园区建设发展集团', 'level_upgrade', '客户接近等级提升阈值', '苏州工业园区建设发展集团当前评分78分（银卡），距离黄金客户仅差2分。建议制定针对性提升方案：增加存款余额、提升产品覆盖率、开展供应链金融等业务。', 'manager', '陈晓东', false, false, now() - interval '1 hour'),
  ('CUST040', '泰州医药城建设发展有限公司', 'level_upgrade', '客户等级即将提升', '泰州医药城建设发展有限公司当前评分70分（银卡），已达到黄金客户标准。系统已自动发起等级提升审核，预计2个工作日内完成。', 'manager', '刘芳', false, false, now() - interval '3 hours'),
  ('CUST034', '南京雨润食品有限公司', 'level_downgrade', '客户等级可能降级预警', '南京雨润食品有限公司风险评级上升，评分从71分降至64分。建议客户经理及时跟进，了解企业经营状况，制定风险管控措施。该客户可能面临等级降级。', 'manager', '周强', false, false, now() - interval '2 hours'),
  ('CUST029', '无锡红豆集团', 'level_upgrade', '客户等级提升至黄金级', '无锡红豆集团已从银卡客户升级为黄金客户！当前评分72分，较上期提升5分。新增权益：快速审批（48小时内）、贷款利率9.5折优惠、积分1.5倍加速、授信额度提升20%。', 'both', '孙丽', true, true, now() - interval '20 days'),
  ('CUST012', '南京钢铁股份有限公司', 'benefit_change', '客户权益更新通知', '南京钢铁股份有限公司（白金客户）：根据最新政策，您的贷款利率优惠已从9折调整为8.8折，供应链金融手续费下调20%，外汇交易手续费优惠额度提升。', 'both', '赵敏', true, false, now() - interval '3 days'),
  ('CUST015', '江苏沙钢集团', 'level_upgrade', '客户维持钻石等级', '江苏沙钢集团（钻石客户）本期评分94分，继续保持钻石等级。作为我行战略合作伙伴，本季度新增贸易融资额度10亿元已审批通过。', 'both', '马云飞', true, true, now() - interval '1 day'),
  ('CUST024', '南京市城市建设投资控股集团', 'level_upgrade', '客户评分稳步提升', '南京市城市建设投资控股集团（钻石客户）本期评分93分，较上期提升1分。城市基建项目融资进展顺利，建议继续深化债券承销、资产管理等综合金融服务合作。', 'manager', '钱晓明', false, true, now() - interval '2 days'),
  ('CUST038', '南通中远海运川崎船舶工程有限公司', 'level_upgrade', '客户等级提升至白金级', '南通中远海运川崎船舶工程有限公司已成功升级为白金客户！评分80分。船舶制造行业回暖，企业订单饱满，建议开展船舶金融、出口信贷等专项业务。', 'both', '吴刚', true, true, now() - interval '22 days'),
  ('CUST043', '江苏亨通集团', 'level_upgrade', '白金客户服务提醒', '江苏亨通集团（白金客户）本期评分89分，距离钻石客户仅差1分。通信行业5G建设加速，建议把握机遇，增加设备融资和产业链金融合作。', 'manager', '郑海', false, false, now() - interval '4 days'),
  ('CUST017', '江苏洋河酒厂股份有限公司', 'benefit_change', '季度积分加速活动', '江苏洋河酒厂股份有限公司（白金客户）：本季度针对白酒行业推出积分加速活动，您的积分倍率临时提升至3倍（原2倍），活动期至12月31日。', 'both', '沈静', true, false, now() - interval '6 days'),
  ('CUST046', '苏州协鑫集团', 'level_upgrade', '新能源行业客户关怀', '苏州协鑫集团（白金客户）本期评分81分。新能源行业政策利好，我行特推出绿色金融专项产品，包括碳资产质押贷款、绿色债券承销等，欢迎咨询。', 'manager', '朱红', false, true, now() - interval '6 days'),
  ('CUST023', '常州天合光能有限公司', 'level_upgrade', '客户等级提升至黄金级', '常州天合光能有限公司已从银卡客户升级为黄金客户！当前评分76分，提升8分。光伏产业迎来发展机遇，建议开展设备融资租赁、海外项目贷款等业务合作。', 'both', '冯磊', true, true, now() - interval '12 days'),
  ('CUST041', '镇江新区产业投资集团', 'level_upgrade', '客户等级提升至银卡', '镇江新区产业投资集团已从铜卡客户升级为银卡客户！评分63分，提升5分。产业园区运营良好，建议后续开展园区企业批量授信、产业基金托管等业务。', 'both', '顾文', true, true, now() - interval '25 days'),
  ('CUST030', '江苏苏美达集团', 'level_upgrade', '外贸客户专属服务', '江苏苏美达集团（白金客户）本期评分82分。国际贸易回暖，我行外汇交易系统已升级，支持多币种实时结算，汇率优惠幅度提升15%。', 'manager', '姜波', false, false, now() - interval '3 days'),
  ('CUST044', '无锡威孚高科技集团', 'level_upgrade', '汽车零部件行业关注', '无锡威孚高科技集团（黄金客户）本期评分78分。新能源汽车零部件需求旺盛，建议增加研发贷款、技术改造贷款等产品使用。', 'manager', '袁军', false, true, now() - interval '5 days'),
  ('CUST047', '江苏中南建设集团', 'level_upgrade', '建筑行业客户关怀', '江苏中南建设集团（黄金客户）本期评分76分。房地产调控政策趋稳，保障性住房项目融资通道已开放，欢迎申报。', 'manager', '卢强', false, false, now() - interval '9 days'),
  ('CUST028', '南京港（集团）有限公司', 'benefit_change', '港口物流专项优惠', '南京港（集团）有限公司（白金客户）：针对长江经济带战略，我行推出港口物流金融专项方案，包括仓单质押、港口设备融资等，手续费优惠30%。', 'both', '韩旭', true, true, now() - interval '6 days')
ON CONFLICT DO NOTHING;

-- 更新统计信息
-- 添加一些历史数据让系统看起来已经运行一段时间
UPDATE customer_level_records 
SET last_evaluated_at = now() - (random() * interval '30 days')
WHERE last_evaluated_at > now() - interval '1 day';
