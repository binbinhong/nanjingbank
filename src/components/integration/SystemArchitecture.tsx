import React, { useState } from 'react';
import { Layers, ArrowRight, Database, Cloud, Smartphone, Globe, Settings, Zap } from 'lucide-react';

interface SystemNode {
  id: string;
  name: string;
  type: 'core' | 'platform' | 'channel' | 'data';
  x: number;
  y: number;
  icon: React.ReactNode;
  color: string;
}

interface Connection {
  from: string;
  to: string;
  label: string;
  type: 'bidirectional' | 'unidirectional';
}

const SystemArchitecture: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'flow' | 'layer'>('flow');

  const nodes: SystemNode[] = [
    {
      id: 'core',
      name: '对公客户权益平台',
      type: 'core',
      x: 50,
      y: 50,
      icon: <Layers className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 'marketing',
      name: '营销平台',
      type: 'platform',
      x: 20,
      y: 20,
      icon: <Zap className="w-5 h-5" />,
      color: 'bg-purple-500'
    },
    {
      id: 'tag',
      name: '标签平台',
      type: 'platform',
      x: 20,
      y: 35,
      icon: <Settings className="w-5 h-5" />,
      color: 'bg-purple-500'
    },
    {
      id: 'datawarehouse',
      name: '数据仓库',
      type: 'data',
      x: 20,
      y: 65,
      icon: <Database className="w-5 h-5" />,
      color: 'bg-green-500'
    },
    {
      id: 'datamart',
      name: '数据集市',
      type: 'data',
      x: 20,
      y: 80,
      icon: <Database className="w-5 h-5" />,
      color: 'bg-green-500'
    },
    {
      id: 'esc',
      name: 'ESC',
      type: 'platform',
      x: 80,
      y: 20,
      icon: <Cloud className="w-5 h-5" />,
      color: 'bg-orange-500'
    },
    {
      id: 'ebank',
      name: '企业网银/鑫e伴',
      type: 'channel',
      x: 80,
      y: 35,
      icon: <Globe className="w-5 h-5" />,
      color: 'bg-indigo-500'
    },
    {
      id: 'xinyun',
      name: '鑫云财资',
      type: 'channel',
      x: 80,
      y: 50,
      icon: <Globe className="w-5 h-5" />,
      color: 'bg-indigo-500'
    },
    {
      id: 'xingongsi',
      name: '鑫公司',
      type: 'channel',
      x: 80,
      y: 65,
      icon: <Smartphone className="w-5 h-5" />,
      color: 'bg-teal-500'
    },
    {
      id: 'weixin',
      name: '企业微信',
      type: 'channel',
      x: 80,
      y: 80,
      icon: <Smartphone className="w-5 h-5" />,
      color: 'bg-teal-500'
    }
  ];

  const connections: Connection[] = [
    { from: 'marketing', to: 'core', label: '活动发布', type: 'bidirectional' },
    { from: 'tag', to: 'core', label: '标签查询', type: 'bidirectional' },
    { from: 'core', to: 'datawarehouse', label: '数据存储', type: 'bidirectional' },
    { from: 'core', to: 'datamart', label: '数据分析', type: 'bidirectional' },
    { from: 'core', to: 'esc', label: '服务调用', type: 'bidirectional' },
    { from: 'core', to: 'ebank', label: '权益领取', type: 'unidirectional' },
    { from: 'core', to: 'xinyun', label: '权益领取', type: 'unidirectional' },
    { from: 'core', to: 'xingongsi', label: '权益发放', type: 'bidirectional' },
    { from: 'core', to: 'weixin', label: '权益发放', type: 'bidirectional' }
  ];

  const getNodeById = (id: string) => nodes.find(n => n.id === id);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">系统架构图</h2>
          <p className="text-gray-600">对公客户权益平台系统对接架构可视化</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('flow')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'flow'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            流程视图
          </button>
          <button
            onClick={() => setViewMode('layer')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'layer'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            分层视图
          </button>
        </div>
      </div>

      {viewMode === 'flow' ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          <svg className="w-full" viewBox="0 0 100 100" style={{ height: '600px' }}>
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#6B7280" />
              </marker>
              <marker
                id="arrowhead-bidirectional"
                markerWidth="10"
                markerHeight="10"
                refX="1"
                refY="3"
                orient="auto"
              >
                <polygon points="10 0, 0 3, 10 6" fill="#6B7280" />
              </marker>
            </defs>

            {connections.map((conn, idx) => {
              const fromNode = getNodeById(conn.from);
              const toNode = getNodeById(conn.to);
              if (!fromNode || !toNode) return null;

              const x1 = fromNode.x;
              const y1 = fromNode.y;
              const x2 = toNode.x;
              const y2 = toNode.y;

              const midX = (x1 + x2) / 2;
              const midY = (y1 + y2) / 2;

              return (
                <g key={idx}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#6B7280"
                    strokeWidth="0.2"
                    strokeDasharray={conn.type === 'bidirectional' ? '0' : '1,0.5'}
                    markerEnd="url(#arrowhead)"
                    markerStart={conn.type === 'bidirectional' ? 'url(#arrowhead-bidirectional)' : ''}
                  />
                  <text
                    x={midX}
                    y={midY - 1}
                    fontSize="2"
                    fill="#4B5563"
                    textAnchor="middle"
                    className="select-none"
                  >
                    {conn.label}
                  </text>
                </g>
              );
            })}

            {nodes.map((node) => (
              <g
                key={node.id}
                onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                className="cursor-pointer"
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.type === 'core' ? '6' : '4'}
                  className={`${node.color} ${
                    selectedNode === node.id ? 'opacity-100' : 'opacity-80'
                  } hover:opacity-100 transition-opacity`}
                  stroke={selectedNode === node.id ? '#1F2937' : 'white'}
                  strokeWidth={selectedNode === node.id ? '0.5' : '0.3'}
                />
                <text
                  x={node.x}
                  y={node.y + (node.type === 'core' ? 8 : 6)}
                  fontSize={node.type === 'core' ? '2.5' : '2'}
                  fill="#1F2937"
                  textAnchor="middle"
                  fontWeight={node.type === 'core' ? 'bold' : 'normal'}
                  className="select-none"
                >
                  {node.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <h3 className="text-lg font-semibold text-gray-900">核心平台层</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {nodes.filter(n => n.type === 'core').map(node => (
                <div
                  key={node.id}
                  className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <div className="p-2 bg-blue-500 text-white rounded-lg">
                    {node.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{node.name}</h4>
                    <p className="text-sm text-gray-600">客户等级、积分、权益管理核心系统</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <h3 className="text-lg font-semibold text-gray-900">平台服务层</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {nodes.filter(n => n.type === 'platform').map(node => (
                <div
                  key={node.id}
                  className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200"
                >
                  <div className={`p-2 ${node.color} text-white rounded-lg`}>
                    {node.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{node.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <h3 className="text-lg font-semibold text-gray-900">数据支撑层</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {nodes.filter(n => n.type === 'data').map(node => (
                <div
                  key={node.id}
                  className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200"
                >
                  <div className="p-2 bg-green-500 text-white rounded-lg">
                    {node.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{node.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-4 h-4 bg-teal-500 rounded"></div>
              <h3 className="text-lg font-semibold text-gray-900">渠道应用层</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {nodes.filter(n => n.type === 'channel').map(node => (
                <div
                  key={node.id}
                  className="flex items-center space-x-3 p-4 bg-teal-50 rounded-lg border border-teal-200"
                >
                  <div className={`p-2 ${node.color} text-white rounded-lg`}>
                    {node.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{node.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">对接说明</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900">营销活动对接</h4>
              <p className="text-sm text-gray-600">通过营销平台创建和发布活动，实现营销活动和对公客户权益平台的打通</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900">权益发放渠道</h4>
              <p className="text-sm text-gray-600">通过鑫公司、企业微信、对公客户权益平台等渠道实现权益发放</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900">权益领取与兑现</h4>
              <p className="text-sm text-gray-600">通过电子渠道（企业网银/鑫e伴、鑫云财资）及鑫微厅等渠道实现权益的领取和兑现</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900">数据支撑</h4>
              <p className="text-sm text-gray-600">与数据仓库、数据集市对接，实现数据存储、查询和分析功能</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;
