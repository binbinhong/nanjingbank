import { useState } from 'react';
import { LayoutDashboard, Users, Settings, ClipboardCheck, Bell, Gift, Menu, X, Building2, Shield, Building, Database, Clock, FileText, GitBranch, ShoppingCart, BarChart3, Award, TrendingUp, ArrowRightLeft, Server, Code, Network, Activity } from 'lucide-react';
import Dashboard from './components/Dashboard';
import CustomerLevelList from './components/CustomerLevelList';
import LevelRulesConfig from './components/LevelRulesConfig';
import ReviewCenter from './components/ReviewCenter';
import NotificationCenter from './components/NotificationCenter';
import BenefitsConfig from './components/BenefitsConfig';
import UserManagement from './components/admin/UserManagement';
import RoleManagement from './components/admin/RoleManagement';
import BranchManagement from './components/admin/BranchManagement';
import ParameterConfig from './components/admin/ParameterConfig';
import SystemTasks from './components/admin/SystemTasks';
import OperationLogs from './components/admin/OperationLogs';
import WorkflowManagement from './components/admin/WorkflowManagement';
import MallConfig from './components/admin/MallConfig';
import CustomerPointsReport from './components/analysis/points/CustomerPointsReport';
import BranchPointsReport from './components/analysis/points/BranchPointsReport';
import PointsConsumptionReport from './components/analysis/points/PointsConsumptionReport';
import PointsTransferReport from './components/analysis/points/PointsTransferReport';
import CustomerBenefitsReport from './components/analysis/benefits/CustomerBenefitsReport';
import SupplierBenefitsReport from './components/analysis/benefits/SupplierBenefitsReport';
import LevelDistributionReport from './components/analysis/levels/LevelDistributionReport';
import LevelContributionReport from './components/analysis/levels/LevelContributionReport';
import SystemIntegration from './components/integration/SystemIntegration';
import APIManagement from './components/integration/APIManagement';
import SystemArchitecture from './components/integration/SystemArchitecture';
import RealTimeMonitoring from './components/integration/RealTimeMonitoring';

type PageType = 'dashboard' | 'customers' | 'rules' | 'review' | 'notifications' | 'benefits' |
  'customer-points' | 'branch-points' | 'points-consumption' | 'points-transfer' |
  'customer-benefits' | 'supplier-benefits' |
  'level-distribution' | 'level-contribution' |
  'users' | 'roles' | 'branches' | 'parameters' | 'tasks' | 'logs' | 'workflows' | 'mall' |
  'system-integration' | 'api-management' | 'system-architecture' | 'realtime-monitoring';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    {
      section: '客户管理',
      items: [
        { id: 'dashboard' as PageType, name: '仪表盘', icon: LayoutDashboard },
        { id: 'customers' as PageType, name: '客户等级', icon: Users },
        { id: 'rules' as PageType, name: '规则配置', icon: Settings },
        { id: 'review' as PageType, name: '审核中心', icon: ClipboardCheck },
        { id: 'notifications' as PageType, name: '通知管理', icon: Bell },
        { id: 'benefits' as PageType, name: '权益配置', icon: Gift },
      ]
    },
    {
      section: '数据分析',
      items: [
        { id: 'customer-points' as PageType, name: '客户积分报表', icon: Award },
        { id: 'branch-points' as PageType, name: '机构积分报表', icon: Building },
        { id: 'points-consumption' as PageType, name: '积分消费报表', icon: ShoppingCart },
        { id: 'points-transfer' as PageType, name: '积分转赠报表', icon: ArrowRightLeft },
        { id: 'customer-benefits' as PageType, name: '客户兑换权益报表', icon: Gift },
        { id: 'supplier-benefits' as PageType, name: '供应商权益报表', icon: Building2 },
        { id: 'level-distribution' as PageType, name: '客户等级分布', icon: BarChart3 },
        { id: 'level-contribution' as PageType, name: '等级贡献度分析', icon: TrendingUp },
      ]
    },
    {
      section: '系统集成',
      items: [
        { id: 'system-integration' as PageType, name: '系统对接监控', icon: Server },
        { id: 'api-management' as PageType, name: 'API接口管理', icon: Code },
        { id: 'system-architecture' as PageType, name: '系统架构图', icon: Network },
        { id: 'realtime-monitoring' as PageType, name: '实时监控', icon: Activity },
      ]
    },
    {
      section: '系统管理',
      items: [
        { id: 'users' as PageType, name: '用户管理', icon: Users },
        { id: 'roles' as PageType, name: '角色管理', icon: Shield },
        { id: 'branches' as PageType, name: '机构管理', icon: Building },
        { id: 'parameters' as PageType, name: '参数配置', icon: Database },
        { id: 'tasks' as PageType, name: '系统任务', icon: Clock },
        { id: 'logs' as PageType, name: '操作日志', icon: FileText },
        { id: 'workflows' as PageType, name: '审批流程', icon: GitBranch },
        { id: 'mall' as PageType, name: '商城配置', icon: ShoppingCart },
      ]
    }
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <CustomerLevelList />;
      case 'rules':
        return <LevelRulesConfig />;
      case 'review':
        return <ReviewCenter />;
      case 'notifications':
        return <NotificationCenter />;
      case 'benefits':
        return <BenefitsConfig />;
      case 'customer-points':
        return <CustomerPointsReport />;
      case 'branch-points':
        return <BranchPointsReport />;
      case 'points-consumption':
        return <PointsConsumptionReport />;
      case 'points-transfer':
        return <PointsTransferReport />;
      case 'customer-benefits':
        return <CustomerBenefitsReport />;
      case 'supplier-benefits':
        return <SupplierBenefitsReport />;
      case 'level-distribution':
        return <LevelDistributionReport />;
      case 'level-contribution':
        return <LevelContributionReport />;
      case 'system-integration':
        return <SystemIntegration />;
      case 'api-management':
        return <APIManagement />;
      case 'system-architecture':
        return <SystemArchitecture />;
      case 'realtime-monitoring':
        return <RealTimeMonitoring />;
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RoleManagement />;
      case 'branches':
        return <BranchManagement />;
      case 'parameters':
        return <ParameterConfig />;
      case 'tasks':
        return <SystemTasks />;
      case 'logs':
        return <OperationLogs />;
      case 'workflows':
        return <WorkflowManagement />;
      case 'mall':
        return <MallConfig />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-2.5 shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">南京银行</h1>
                <p className="text-xs text-gray-500">对公客户等级管理系统</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">管理员</p>
              <p className="text-xs text-gray-500">admin@njbank.com</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        </div>
      </div>

      <div className="flex pt-20">
        <aside
          className={`fixed left-0 top-20 bottom-0 w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-20 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
        >
          <nav className="p-4 space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            {navigation.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.section}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCurrentPage(item.id);
                          if (window.innerWidth < 1024) {
                            setSidebarOpen(false);
                          }
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-xs text-gray-600">
              <p className="font-medium mb-1">系统版本 v2.3.7</p>
              <p className="text-gray-500">© 2025 南京银行</p>
            </div>
          </div>
        </aside>

        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'lg:ml-64' : 'ml-0'
          }`}
        >
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
