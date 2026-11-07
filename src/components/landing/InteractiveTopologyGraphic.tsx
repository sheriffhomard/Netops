import React, { useState } from 'react';

interface NodeDetail {
  id: string;
  label: string;
  role: string;
  ip: string;
  asNum?: string;
  status: 'ONLINE' | 'ACTIVE' | 'STANDBY';
  throughput: string;
  latency: string;
}

const NODES: Record<string, NodeDetail> = {
  wan: {
    id: 'wan',
    label: 'Tier-1 Transit Gateway',
    role: 'Carrier Dual-Homed Internet Peering',
    ip: '198.51.100.1 / 203.0.113.1',
    asNum: 'AS 15169 / AS 3356',
    status: 'ONLINE',
    throughput: '9.4 Gbps / 10 Gbps',
    latency: '1.2 ms',
  },
  router: {
    id: 'router',
    label: 'Edge Border Router (BGP-R01)',
    role: 'BGP Multi-Homing & Default Route Origination',
    ip: '172.16.0.1 / 10.0.0.1',
    asNum: 'AS 65001',
    status: 'ONLINE',
    throughput: '4.8 Gbps',
    latency: '0.4 ms',
  },
  firewall: {
    id: 'firewall',
    label: 'Next-Gen Firewall Cluster (NGFW-HA)',
    role: 'App-ID, IPS/IDS & Zero Trust Perimeter',
    ip: '10.0.0.2 / 10.10.0.1',
    status: 'ACTIVE',
    throughput: '3.6 Gbps Stateful',
    latency: '0.6 ms',
  },
  core: {
    id: 'core',
    label: 'Core L3 Backbone Switch (Core-SW01)',
    role: 'OSPF Area 0 Backbone & Inter-VLAN Routing',
    ip: '10.10.0.2',
    status: 'ONLINE',
    throughput: '40 Gbps Fabric',
    latency: '0.1 ms',
  },
  leafSpine: {
    id: 'leafSpine',
    label: 'Distribution Spine & Leaf Fabric',
    role: '802.1Q Trunks, EtherChannel & Access Port Security',
    ip: 'VLAN 10/20/50 Subnets',
    status: 'ONLINE',
    throughput: '12.2 Gbps Aggregate',
    latency: '0.2 ms',
  },
};

export const InteractiveTopologyGraphic: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('router');
  const node = NODES[selectedNode] || NODES.router;

  return (
    <div className="relative w-full rounded-2xl bg-[#0a0e16]/90 border border-[#334155]/60 p-4 sm:p-6 backdrop-blur-xl shadow-2xl overflow-hidden font-sans">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #00e5ff 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Header of the Widget */}
      <div className="relative flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#334155]/40 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] animate-pulse" />
          <span className="font-mono font-semibold text-[#00e5ff] uppercase tracking-wider">
            NOC Live Topology & Telemetry
          </span>
          <span className="text-[#849396] font-mono">· Core Infrastructure</span>
        </div>
        <div className="flex items-center gap-4 text-[#849396] font-mono text-[11px]">
          <span>Loss: <strong className="text-[#00e5ff]">0.00%</strong></span>
          <span>Avg RTT: <strong className="text-[#00e5ff]">1.8 ms</strong></span>
          <span className="hidden sm:inline">BGP Peering: <strong className="text-[#10b981]">ESTABLISHED</strong></span>
        </div>
      </div>

      {/* Interactive Topology Canvas (SVG Vector + Interactive Nodes) */}
      <div className="relative w-full aspect-[16/9] min-h-[260px] max-h-[380px] bg-[#070a10] rounded-xl border border-[#334155]/40 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
        <svg
          viewBox="0 0 800 450"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="fiberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="activeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0a0e16" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Connection Lines (Cables with glowing packets) */}
          {/* WAN to Router */}
          <line
            x1="400"
            y1="55"
            x2="400"
            y2="140"
            stroke="url(#fiberGrad)"
            strokeWidth="3"
            strokeDasharray="4 4"
          />
          {/* Router to Firewall */}
          <line
            x1="400"
            y1="175"
            x2="400"
            y2="245"
            stroke="#00e5ff"
            strokeWidth="3"
          />
          {/* Firewall to Core Switch */}
          <line
            x1="400"
            y1="280"
            x2="400"
            y2="345"
            stroke="#00e5ff"
            strokeWidth="3"
          />
          {/* Core Switch to Left Leaf */}
          <line
            x1="370"
            y1="365"
            x2="220"
            y2="410"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          {/* Core Switch to Center Leaf */}
          <line
            x1="400"
            y1="380"
            x2="400"
            y2="410"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          {/* Core Switch to Right Leaf */}
          <line
            x1="430"
            y1="365"
            x2="580"
            y2="410"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="2 2"
          />

          {/* Animated data particle dots */}
          <circle cx="400" cy="100" r="3" fill="#00e5ff" filter="url(#glow)">
            <animate attributeName="cy" values="60;140;60" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="210" r="3" fill="#10b981" filter="url(#glow)">
            <animate attributeName="cy" values="180;245;180" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="310" r="3" fill="#00e5ff" filter="url(#glow)">
            <animate attributeName="cy" values="280;345;280" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* NODE 1: WAN Transit Cloud */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedNode('wan')}
          >
            <rect
              x="310"
              y="20"
              width="180"
              height="45"
              rx="8"
              fill={selectedNode === 'wan' ? '#18283d' : '#0e1422'}
              stroke={selectedNode === 'wan' ? '#00e5ff' : '#334155'}
              strokeWidth={selectedNode === 'wan' ? '2' : '1'}
            />
            <text x="330" y="47" fill="#dfe2ee" fontSize="13" fontFamily="JetBrains Mono" fontWeight="600">
              ☁️ INTERNET BGP
            </text>
            <text x="445" y="47" fill="#00e5ff" fontSize="10" fontFamily="JetBrains Mono">
              10G
            </text>
          </g>

          {/* NODE 2: Edge Router */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedNode('router')}
          >
            <rect
              x="310"
              y="135"
              width="180"
              height="45"
              rx="8"
              fill={selectedNode === 'router' ? '#18283d' : '#0e1422'}
              stroke={selectedNode === 'router' ? '#00e5ff' : '#334155'}
              strokeWidth={selectedNode === 'router' ? '2' : '1'}
            />
            <circle cx="330" cy="157" r="7" fill="#00e5ff" fillOpacity="0.2" stroke="#00e5ff" strokeWidth="1.5" />
            <text x="345" y="162" fill="#dfe2ee" fontSize="12" fontFamily="JetBrains Mono" fontWeight="600">
              Edge-R01 (BGP)
            </text>
            <text x="450" y="162" fill="#10b981" fontSize="10" fontFamily="JetBrains Mono">
              UP
            </text>
          </g>

          {/* NODE 3: Firewall Cluster */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedNode('firewall')}
          >
            <rect
              x="300"
              y="240"
              width="200"
              height="45"
              rx="8"
              fill={selectedNode === 'firewall' ? '#18283d' : '#0e1422'}
              stroke={selectedNode === 'firewall' ? '#00e5ff' : '#334155'}
              strokeWidth={selectedNode === 'firewall' ? '2' : '1'}
            />
            <text x="320" y="267" fill="#dfe2ee" fontSize="12" fontFamily="JetBrains Mono" fontWeight="600">
              🛡️ NGFW-HA Cluster
            </text>
            <text x="460" y="267" fill="#10b981" fontSize="10" fontFamily="JetBrains Mono">
              PASS
            </text>
          </g>

          {/* NODE 4: Core L3 Switch */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedNode('core')}
          >
            <rect
              x="310"
              y="340"
              width="180"
              height="45"
              rx="8"
              fill={selectedNode === 'core' ? '#18283d' : '#0e1422'}
              stroke={selectedNode === 'core' ? '#00e5ff' : '#334155'}
              strokeWidth={selectedNode === 'core' ? '2' : '1'}
            />
            <text x="330" y="367" fill="#dfe2ee" fontSize="12" fontFamily="JetBrains Mono" fontWeight="600">
              ⚡ Core-SW01 (L3)
            </text>
            <text x="450" y="367" fill="#00e5ff" fontSize="10" fontFamily="JetBrains Mono">
              OSPF
            </text>
          </g>

          {/* NODE 5: Leaf Distribution Access */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedNode('leafSpine')}
          >
            {/* Left Leaf */}
            <rect x="150" y="405" width="130" height="32" rx="6" fill="#0e1422" stroke="#334155" />
            <text x="165" y="425" fill="#bac9cc" fontSize="11" fontFamily="JetBrains Mono">
              VLAN 10 Mgmt
            </text>

            {/* Center Leaf */}
            <rect x="335" y="405" width="130" height="32" rx="6" fill="#0e1422" stroke="#334155" />
            <text x="350" y="425" fill="#bac9cc" fontSize="11" fontFamily="JetBrains Mono">
              VLAN 20 Prod
            </text>

            {/* Right Leaf */}
            <rect x="520" y="405" width="130" height="32" rx="6" fill="#0e1422" stroke="#334155" />
            <text x="535" y="425" fill="#bac9cc" fontSize="11" fontFamily="JetBrains Mono">
              VLAN 50 DMZ
            </text>
          </g>
        </svg>

        {/* Click hint pill */}
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-[#849396] bg-[#0a0e16]/80 px-2 py-0.5 rounded border border-[#334155]/40 pointer-events-none">
          Cliquez sur un équipement pour inspecter la télémétrie
        </div>
      </div>

      {/* Selected Node Telemetry Card */}
      <div className="mt-4 pt-3 border-t border-[#334155]/40 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-2.5 rounded-lg bg-[#0e1422] border border-[#334155]/40">
          <span className="text-[10px] text-[#849396] uppercase block">Équipement Actif</span>
          <span className="text-[#00e5ff] font-semibold truncate block mt-0.5">{node.label}</span>
          <span className="text-[10px] text-[#bac9cc] truncate block">{node.role}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-[#0e1422] border border-[#334155]/40">
          <span className="text-[10px] text-[#849396] uppercase block">Adressage & AS</span>
          <span className="text-[#dfe2ee] font-semibold truncate block mt-0.5">{node.ip}</span>
          <span className="text-[10px] text-[#00e5ff]">{node.asNum || 'Local Area 0'}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-[#0e1422] border border-[#334155]/40">
          <span className="text-[10px] text-[#849396] uppercase block">Débit & Charge</span>
          <span className="text-[#dfe2ee] font-semibold block mt-0.5">{node.throughput}</span>
          <span className="text-[10px] text-[#10b981] font-semibold">Statut : {node.status}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-[#0e1422] border border-[#334155]/40">
          <span className="text-[10px] text-[#849396] uppercase block">Latence Traversante</span>
          <span className="text-[#00e5ff] font-semibold text-sm block mt-0.5">{node.latency}</span>
          <span className="text-[10px] text-[#849396]">Jitter: &lt; 0.05 ms</span>
        </div>
      </div>
    </div>
  );
};
