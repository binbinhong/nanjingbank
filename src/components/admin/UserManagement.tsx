import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Shield, Users, UserCheck } from 'lucide-react';

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState<'managers' | 'systemUsers'>('managers');
  const [searchTerm, setSearchTerm] = useState('');

  const managers = [
    { id: 'M001', name: '王经理', employeeId: 'EMP20231001', phone: '138****1234',
      department: '对公业务部', branch: '江苏省分行', customerCount: 156, level: '高级客户经理', status: '在职' },
    { id: 'M002', name: '李经理', employeeId: 'EMP20231002', phone: '139****2345',
      department: '对公业务部', branch: '上海分行', customerCount: 142, level: '高级客户经理', status: '在职' },
    { id: 'M003', name: '张经理', employeeId: 'EMP20231003', phone: '136****3456',
      department: '对公业务部', branch: '江苏省分行', customerCount: 128, level: '客户经理', status: '在职' },
    { id: 'M004', name: '刘经理', employeeId: 'EMP20231004', phone: '137****4567',
      department: '对公业务部', branch: '浙江省分行', customerCount: 119, level: '客户经理', status: '在职' },
    { id: 'M005', name: '陈经理', employeeId: 'EMP20231005', phone: '135****5678',
      department: '对公业务部', branch: '安徽省分行', customerCount: 98, level: '客户经理', status: '在职' },
    { id: 'M006', name: '赵经理', employeeId: 'EMP20231006', phone: '133****6789',
      department: '对公业务部', branch: '北京分行', customerCount: 87, level: '初级客户经理', status: '在职' },
  ];

  const systemUsers = [
    { id: 'U001', username: 'admin001', realName: '张管理员', email: 'admin001@njcb.com.cn',
      phone: '025-****1234', department: '信息科技部', position: '系统管理员',
      roles: ['系统管理员', '超级用户'], branch: '总行', status: '正常', lastLogin: '2025-12-30 15:30' },
    { id: 'U002', username: 'audit001', realName: '李审计', email: 'audit001@njcb.com.cn',
      phone: '025-****2345', department: '审计部', position: '审计专员',
      roles: ['审计员'], branch: '总行', status: '正常', lastLogin: '2025-12-30 14:20' },
    { id: 'U003', username: 'ops001', realName: '王运营', email: 'ops001@njcb.com.cn',
      phone: '025-****3456', department: '运营部', position: '运营专员',
      roles: ['运营管理员'], branch: '江苏省分行', status: '正常', lastLogin: '2025-12-30 13:45' },
    { id: 'U004', username: 'report001', realName: '刘分析', email: 'report001@njcb.com.cn',
      phone: '025-****4567', department: '数据分析部', position: '数据分析师',
      roles: ['报表查看'], branch: '总行', status: '正常', lastLogin: '2025-12-29 16:30' },
    { id: 'U005', username: 'config001', realName: '陈配置', email: 'config001@njcb.com.cn',
      phone: '025-****5678', department: '业务部', position: '业务配置员',
      roles: ['配置管理员'], branch: '江苏省分行', status: '正常', lastLogin: '2025-12-30 09:15' },
  ];

  const managerStats = {
    total: managers.length,
    active: managers.filter(m => m.status === '在职').length,
    totalCustomers: managers.reduce((sum, m) => sum + m.customerCount, 0),
    avgCustomers: Math.round(managers.reduce((sum, m) => sum + m.customerCount, 0) / managers.length),
  };

  const systemUserStats = {
    total: systemUsers.length,
    active: systemUsers.filter(u => u.status === '正常').length,
    admins: systemUsers.filter(u => u.roles.includes('系统管理员')).length,
    online: systemUsers.filter(u => {
      const lastLogin = new Date(u.lastLogin);
      const now = new Date();
      return (now.getTime() - lastLogin.getTime()) / 1000 / 60 < 30;
    }).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">用户管理</h1>
          <p className="mt-2 text-gray-600">管理客户经理和系统用户</p>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('managers')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'managers'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              <span>客户经理管理</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('systemUsers')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'systemUsers'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>系统用户管理</span>
            </div>
          </button>
        </nav>
      </div>

      {activeTab === 'managers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">客户经理总数</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{managerStats.total}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <UserCheck className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">在职经理</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{managerStats.active}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">服务客户总数</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{managerStats.totalCustomers}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">人均客户数</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{managerStats.avgCustomers}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="搜索经理姓名、工号、部门..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-5 h-5" />
                新增客户经理
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">经理信息</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">工号</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">部门</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">所属机构</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">职级</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">服务客户数</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">状态</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {managers.map((manager) => (
                    <tr key={manager.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{manager.name}</p>
                          <p className="text-sm text-gray-500">{manager.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{manager.employeeId}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{manager.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{manager.branch}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          manager.level === '高级客户经理' ? 'bg-purple-100 text-purple-700' :
                          manager.level === '客户经理' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {manager.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-lg font-bold text-blue-600">{manager.customerCount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                          {manager.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'systemUsers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">系统用户总数</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{systemUserStats.total}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">活跃用户</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{systemUserStats.active}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">管理员数量</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{systemUserStats.admins}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">在线用户</p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">{systemUserStats.online}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="搜索用户姓名、账号或部门..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-5 h-5" />
                新增系统用户
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">用户信息</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">账号</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">部门职位</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">角色</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">所属机构</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">最后登录</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">状态</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {systemUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{user.realName}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-400">{user.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.username}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.department}</p>
                          <p className="text-xs text-gray-500">{user.position}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {user.roles.map(role => (
                            <span key={role} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {role}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.branch}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
