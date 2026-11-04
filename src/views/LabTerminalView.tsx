import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ViewMode } from '../types';
import { getLocalizedLabScenario } from '../data/mockData';
import { Tooltip } from '../components/Tooltip';
import confetti from 'canvas-confetti';

interface LabTerminalViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const LabTerminalView: React.FC<LabTerminalViewProps> = ({ onNavigate }) => {
  const { t, i18n } = useTranslation(['common', 'terminal', 'labs']);
  const isEn = i18n.language?.startsWith('en');
  const [activeDevice, setActiveDevice] = useState<'R1' | 'SW1' | 'PCA' | 'SVR1'>('R1');
  const [terminalInput, setTerminalInput] = useState('');
  const [tasks, setTasks] = useState(() => getLocalizedLabScenario(isEn ? 'en' : 'fr').tasks);
  const [isPacketSimulating, setIsPacketSimulating] = useState(false);
  const [showRunningConfig, setShowRunningConfig] = useState(false);

  useEffect(() => {
    const locTasks = getLocalizedLabScenario(isEn ? 'en' : 'fr').tasks;
    setTasks((prev) =>
      locTasks.map((t) => {
        const existing = prev.find((p) => p.id === t.id);
        return existing
          ? {
              ...t,
              isValidated: existing.isValidated,
              specStatus: existing.isValidated
                ? (isEn ? 'SUCCESS (5/5 ICMP)' : 'SUCCÈS (5/5 ICMP)')
                : t.specStatus,
            }
          : t;
      })
    );
  }, [isEn]);

  // Terminal log state per device
  const [terminalLogs, setTerminalLogs] = useState<{
    R1: string[];
    SW1: string[];
    PCA: string[];
    SVR1: string[];
  }>({
    R1: [
      'Cisco IOS Software, C2900 Software (C2900-UNIVERSALK9-M), Version 15.7(3)M2',
      'Technical Support: http://www.cisco.com/techsupport',
      'Compiled Wed 28-Nov-24 04:32 by prod_rel_team',
      '*Mar  1 00:00:02.148: %LINK-3-UPDOWN: Interface GigabitEthernet0/0, changed state to up',
      '*Mar  1 00:00:03.149: %LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0.10, changed state to up',
      '*Mar  1 00:00:03.151: %LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0.20, changed state to up',
    ],
    SW1: [
      'Cisco IOS Software, C3650 Software (CAT3K_CAA-UNIVERSALK9-M), Version 16.12.04',
      '*Mar  1 00:00:01.012: %SPANTREE-5-TOPOTX: Topology Change Notice on FastEthernet0/24',
      '*Mar  1 00:00:01.240: %LINK-3-UPDOWN: Interface FastEthernet0/24, changed state to up',
      'SW1#',
    ],
    PCA: [
      'Microsoft Windows [Version 10.0.19045.3803]',
      '(c) Microsoft Corporation. All rights reserved.',
      'C:\\Users\\Candidate> ipconfig',
      'IPv4 Address. . . . . . . . . . . : 192.168.10.10',
      'Subnet Mask . . . . . . . . . . . : 255.255.255.0',
      'Default Gateway . . . . . . . . . : 192.168.10.1',
    ],
    SVR1: [
      'Ubuntu Linux 22.04.3 LTS (GNU/Linux 5.15.0-89-generic x86_64)',
      'root@srv-intranet:~# ip addr show eth0',
      'inet 192.168.20.50/24 brd 192.168.20.255 scope global eth0',
    ],
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs, activeDevice]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const devicePrompt =
      activeDevice === 'R1'
        ? 'R1#'
        : activeDevice === 'SW1'
        ? 'SW1#'
        : activeDevice === 'PCA'
        ? 'C:\\Users\\Candidate>'
        : 'root@srv-intranet:~#';

    let responses: string[] = [];

    if (trimmed.toLowerCase().includes('ping 192.168.20.50') || trimmed.toLowerCase() === 'ping') {
      responses = [
        'Type escape sequence to abort.',
        'Sending 5, 100-byte ICMP Echos to 192.168.20.50, timeout is 2 seconds:',
        '!!!!!',
        'Success rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms',
        '*Mar  1 00:04:12.890: %ICMP-6-CONVERGED: Sub-interface gi0/0.20 relayed 5/5 packets successfully.',
      ];
      // Mark task 4 validé!
      setTasks((prev) =>
        prev.map((t) =>
          t.id === 'task-4'
            ? { ...t, isValidated: true, specStatus: 'SUCCÈS (5/5 ICMP)' }
            : t
        )
      );
      // Trigger packet animation
      setIsPacketSimulating(true);
      setTimeout(() => setIsPacketSimulating(false), 3000);
    } else if (trimmed.toLowerCase().includes('show ip interface brief')) {
      responses = [
        'Interface                  IP-Address      OK? Method Status                Protocol',
        'GigabitEthernet0/0         unassigned      YES unset  up                    up',
        'GigabitEthernet0/0.10      192.168.10.1    YES manual up                    up',
        'GigabitEthernet0/0.20      192.168.20.1    YES manual up                    up',
        'GigabitEthernet0/1         unassigned      YES unset  administratively down down',
      ];
    } else if (trimmed.toLowerCase().includes('show ip route')) {
      responses = [
        'Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP',
        'Gateway of last resort is not set',
        '',
        '      192.168.10.0/24 is variably subnetted, 2 subnets, 2 masks',
        'C        192.168.10.0/24 is directly connected, GigabitEthernet0/0.10',
        'L        192.168.10.1/32 is directly connected, GigabitEthernet0/0.10',
        '      192.168.20.0/24 is variably subnetted, 2 subnets, 2 masks',
        'C        192.168.20.0/24 is directly connected, GigabitEthernet0/0.20',
        'L        192.168.20.1/32 is directly connected, GigabitEthernet0/0.20',
      ];
    } else if (trimmed.toLowerCase().includes('show vlan') || trimmed.toLowerCase().includes('show vlan brief')) {
      responses = [
        'VLAN Name                             Status    Ports',
        '---- -------------------------------- --------- -------------------------------',
        '1    default                          active    Fa0/3, Fa0/4, Fa0/5',
        '10   Sales                            active    Fa0/1',
        '20   Engineering                      active    Fa0/2',
        '1002 fddi-default                     act/unsup',
      ];
    } else if (trimmed.toLowerCase().includes('show interfaces trunk')) {
      responses = [
        'Port        Mode             Encapsulation  Status        Native vlan',
        'Fa0/24      on               802.1q         trunking      1',
        '',
        'Port        Vlans allowed on trunk',
        'Fa0/24      1-4094',
        '',
        'Port        Vlans in spanning tree forwarding state and not pruned',
        'Fa0/24      1,10,20',
      ];
    } else if (trimmed.toLowerCase() === 'clear') {
      setTerminalLogs((prev) => ({
        ...prev,
        [activeDevice]: [],
      }));
      setTerminalInput('');
      return;
    } else {
      responses = [
        `Command executed: "${trimmed}"`,
        '% Configuration state unchanged in sandbox mode. Type "?" or use suggested actions.',
      ];
    }

    setTerminalLogs((prev) => ({
      ...prev,
      [activeDevice]: [...prev[activeDevice], `${devicePrompt} ${trimmed}`, ...responses],
    }));
    setTerminalInput('');
  };

  const handleValidateLab = () => {
    // Mark all tasks validated and celebrate
    setTasks((prev) =>
      prev.map((t) => ({ ...t, isValidated: true, specStatus: 'VALIDÉ 100%' }))
    );
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const completedCount = tasks.filter((t) => t.isValidated).length;

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#0f131c] pb-20 lg:pb-8">
      {/* 1. Header Bar with UID & Progress */}
      <div className="sticky top-0 z-30 bg-[#181c24]/95 backdrop-blur-md border-b border-[#334155]/50 px-6 py-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4 select-none">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono text-[#849396] uppercase">
              LABS VIRTUELS • CCNA 200-301 • TRACK ROUTAGE
            </span>
            <span className="text-[#3b494c]">•</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#5be9ad]/10 text-[#5be9ad] text-[10px] font-mono border border-[#5be9ad]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5be9ad] animate-ping" />
              EN COURS D&apos;EXÉCUTION
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#262a33] text-[#00daf3] border border-[#334155]/60">
              UID: LAB-VLAN-ROAS-08
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[#dfe2ee] tracking-tight">
            Lab 08 : Configuration d&apos;un Trunk 802.1Q et Routage Inter-VLAN (Router-on-a-Stick)
          </h1>
        </div>

        {/* Progress & Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 self-start xl:self-auto">
          {/* Progress Indicators */}
          <div className="flex items-center gap-4 bg-[#0a0e16] border border-[#334155]/50 px-4 py-2 rounded-xl text-xs font-mono">
            <div className="flex flex-col pr-3 border-r border-[#334155]/40">
              <span className="text-[10px] text-[#849396]">{isEn ? 'TASKS COMPLETED' : 'TÂCHES RÉUSSIES'}</span>
              <span className="font-bold text-[#a8ffd2]">
                {completedCount} / {tasks.length}
              </span>
            </div>
            <div className="flex flex-col pr-3 border-r border-[#334155]/40">
              <span className="text-[10px] text-[#849396]">{isEn ? 'MESH LATENCY' : 'LATENCE MESH'}</span>
              <span className="font-bold text-[#00e5ff]">1.4ms</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#849396]">{isEn ? 'PASS SCORE' : 'SCORE PASS'}</span>
              <span className="font-bold text-[#dfe2ee]">
                {Math.round((completedCount / tasks.length) * 100)}%
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setTasks(getLocalizedLabScenario(isEn ? 'en' : 'fr').tasks);
              }}
              className="px-3 py-2 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#bac9cc] hover:text-[#dfe2ee] border border-[#334155] transition-colors"
            >
              {isEn ? 'Reset' : 'Réinitialiser'}
            </button>
            <button
              onClick={() => setShowRunningConfig(true)}
              className="px-3 py-2 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#00daf3] border border-[#334155] transition-colors"
            >
              Running-Config
            </button>
            <button
              onClick={() => executeCommand('ping 192.168.20.50')}
              className="px-4 py-2 rounded-lg bg-[#00363d] hover:bg-[#00363d]/80 text-[#00e5ff] text-xs font-mono font-semibold border border-[#00e5ff]/40 shadow-sm transition-all"
            >
              Auto-Check (ICMP)
            </button>
            <button
              onClick={handleValidateLab}
              className="px-4 py-2 rounded-lg bg-[#00e5ff] hover:brightness-110 text-[#00363d] font-bold text-xs font-mono shadow-[0_0_12px_rgba(0,229,255,0.3)] transition-all cursor-pointer"
            >
              {isEn ? 'Validate Lab' : 'Valider le Lab'}
            </button>
            <button
              onClick={() => onNavigate('ateliers-et-labs')}
              className="p-2 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#ffb4ab] border border-[#334155] transition-colors cursor-pointer"
              title={isEn ? "Exit lab and return to workshops" : "Quitter le lab et revenir aux ateliers"}
              aria-label={isEn ? "Exit lab" : "Quitter le lab"}
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Interactive Split: Topology (Left) & CLI (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 flex-1 items-stretch">
        {/* LEFT: Dynamic Network Topology Canvas (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4 bg-[#181c24]/90 border border-[#334155]/50 rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#334155]/40">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00e5ff]">schema</span>
              <h3 className="font-semibold text-sm text-[#dfe2ee] uppercase font-mono">
                Topologie Dynamique (L2/L3 Hybride)
              </h3>
            </div>
            <button
              onClick={() => {
                setIsPacketSimulating(true);
                setTimeout(() => setIsPacketSimulating(false), 3000);
              }}
              className="text-[10px] font-mono px-2 py-1 rounded bg-[#262a33] text-[#00daf3] hover:bg-[#31353e] border border-[#334155]"
            >
              Simuler Trame 802.1Q
            </button>
          </div>

          {/* Telemetry Strip HUD */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
            <div className="bg-[#0a0e16] p-2 rounded border border-[#334155]/40">
              <span className="text-[#849396] block">ENCAP</span>
              <span className="text-[#00daf3] font-bold">802.1Q (dot1Q)</span>
            </div>
            <div className="bg-[#0a0e16] p-2 rounded border border-[#334155]/40">
              <span className="text-[#849396] block">MTU</span>
              <span className="text-[#a8ffd2] font-bold">1500 octets</span>
            </div>
            <div className="bg-[#0a0e16] p-2 rounded border border-[#334155]/40">
              <span className="text-[#849396] block">SPEED</span>
              <span className="text-[#dfe2ee] font-bold">1 Gbps Full</span>
            </div>
          </div>

          {/* SVG Interactive Topology Canvas */}
          <div className="relative w-full h-80 sm:h-96 bg-[#0a0e16] rounded-xl border border-[#334155]/60 overflow-hidden flex items-center justify-center select-none">
            <svg className="w-full h-full" viewBox="0 0 500 400">
              {/* Background grid dots */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#262a33" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Trunk Link: R1 (250, 70) to SW1 (250, 210) */}
              <line
                x1="250"
                y1="70"
                x2="250"
                y2="210"
                stroke="#00e5ff"
                strokeWidth="4"
                strokeDasharray={isPacketSimulating ? '6 6' : undefined}
                className={isPacketSimulating ? 'animate-pulse' : ''}
              />
              {/* Access Link 1: SW1 to PC-A (120, 330) */}
              <line x1="250" y1="210" x2="120" y2="330" stroke="#a8ffd2" strokeWidth="2.5" />
              {/* Access Link 2: SW1 to SVR-1 (380, 330) */}
              <line x1="250" y1="210" x2="380" y2="330" stroke="#c0c1ff" strokeWidth="2.5" />

              {/* Animated Packet Token if simulating */}
              {isPacketSimulating && (
                <circle r="6" fill="#00e5ff" className="animate-ping">
                  <animate
                    attributeName="cy"
                    from="70"
                    to="210"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                  <animate attributeName="cx" values="250; 250" dur="1.2s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Trunk Badge on Link */}
              <g transform="translate(260, 130)">
                <rect x="0" y="0" width="85" height="24" rx="4" fill="#00363d" stroke="#00e5ff" strokeWidth="1" />
                <text x="6" y="15" fill="#00e5ff" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">
                  TRUNK 802.1Q
                </text>
              </g>

              {/* R1 Router Node (Top) */}
              <g
                transform="translate(250, 70)"
                onClick={() => setActiveDevice('R1')}
                className="cursor-pointer group"
              >
                <circle
                  r="32"
                  fill={activeDevice === 'R1' ? '#00363d' : '#1c2028'}
                  stroke={activeDevice === 'R1' ? '#00e5ff' : '#334155'}
                  strokeWidth="3"
                />
                <text textAnchor="middle" y="4" fill="#dfe2ee" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono">
                  R1
                </text>
                <text textAnchor="middle" y="-40" fill="#00e5ff" fontSize="10" fontWeight="600" fontFamily="JetBrains Mono">
                  Cisco 2911 (ROAS)
                </text>
                <text textAnchor="middle" y="48" fill="#bac9cc" fontSize="9" fontFamily="JetBrains Mono">
                  Gi0/0.10 &amp; Gi0/0.20
                </text>
              </g>

              {/* SW1 Switch Node (Center) */}
              <g
                transform="translate(250, 210)"
                onClick={() => setActiveDevice('SW1')}
                className="cursor-pointer group"
              >
                <rect
                  x="-36"
                  y="-24"
                  width="72"
                  height="48"
                  rx="8"
                  fill={activeDevice === 'SW1' ? '#00363d' : '#1c2028'}
                  stroke={activeDevice === 'SW1' ? '#00e5ff' : '#334155'}
                  strokeWidth="3"
                />
                <text textAnchor="middle" y="4" fill="#dfe2ee" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono">
                  SW1
                </text>
                <text textAnchor="middle" y="-32" fill="#bac9cc" fontSize="10" fontFamily="JetBrains Mono">
                  Catalyst 3650
                </text>
                <text x="42" y="4" fill="#849396" fontSize="9" fontFamily="JetBrains Mono">
                  Fa0/24 (Trunk)
                </text>
              </g>

              {/* PC-A Host (Bottom Left, VLAN 10) */}
              <g
                transform="translate(120, 330)"
                onClick={() => setActiveDevice('PCA')}
                className="cursor-pointer group"
              >
                <circle
                  r="24"
                  fill={activeDevice === 'PCA' ? '#003824' : '#1c2028'}
                  stroke={activeDevice === 'PCA' ? '#5be9ad' : '#334155'}
                  strokeWidth="2.5"
                />
                <text textAnchor="middle" y="4" fill="#dfe2ee" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">
                  PC-A
                </text>
                <text textAnchor="middle" y="38" fill="#a8ffd2" fontSize="9" fontFamily="JetBrains Mono">
                  VLAN 10 • 192.168.10.10
                </text>
                <text textAnchor="middle" y="50" fill="#849396" fontSize="8" fontFamily="JetBrains Mono">
                  GW: 192.168.10.1
                </text>
              </g>

              {/* SVR-1 Server (Bottom Right, VLAN 20) */}
              <g
                transform="translate(380, 330)"
                onClick={() => setActiveDevice('SVR1')}
                className="cursor-pointer group"
              >
                <rect
                  x="-26"
                  y="-22"
                  width="52"
                  height="44"
                  rx="6"
                  fill={activeDevice === 'SVR1' ? '#1000a9' : '#1c2028'}
                  stroke={activeDevice === 'SVR1' ? '#c0c1ff' : '#334155'}
                  strokeWidth="2.5"
                />
                <text textAnchor="middle" y="4" fill="#dfe2ee" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">
                  SVR-1
                </text>
                <text textAnchor="middle" y="38" fill="#c0c1ff" fontSize="9" fontFamily="JetBrains Mono">
                  VLAN 20 • 192.168.20.50
                </text>
                <text textAnchor="middle" y="50" fill="#849396" fontSize="8" fontFamily="JetBrains Mono">
                  GW: 192.168.20.1
                </text>
              </g>
            </svg>
          </div>

          <span className="text-[11px] font-mono text-[#849396] text-center">
            {isEn
              ? 'Click on a device (R1, SW1, PC-A, SVR-1) to switch active CLI session.'
              : 'Cliquez sur un équipement (R1, SW1, PC-A, SVR-1) pour basculer le terminal actif.'}
          </span>
        </div>

        {/* RIGHT: Cisco IOS Simulated CLI Terminal (7 cols) */}
        <div className="lg:col-span-7 flex flex-col bg-[#0a0e16] border border-[#334155] rounded-xl shadow-2xl overflow-hidden min-h-[460px]">
          {/* Terminal Window Chrome */}
          <div className="bg-[#1c2028] px-4 py-2.5 border-b border-[#334155]/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ffb4ab]" />
              <span className="w-3 h-3 rounded-full bg-[#31353e]" />
              <span className="w-3 h-3 rounded-full bg-[#5be9ad]" />
              <span className="font-mono text-xs text-[#bac9cc] pl-2 font-semibold">
                cisco-ios-xe# {activeDevice}-CLI
              </span>
            </div>

            {/* Device Switcher Tabs with Tooltip */}
            <div className="flex items-center gap-1 font-mono text-xs">
              {(['R1', 'SW1', 'PCA', 'SVR1'] as const).map((dev) => (
                <Tooltip
                  key={dev}
                  content={
                    dev === 'R1'
                      ? (isEn ? 'Cisco 2900 Router (Inter-VLAN routing / Sub-interfaces)' : 'Routeur Cisco 2900 (Routage inter-VLAN / Sub-interfaces)')
                      : dev === 'SW1'
                      ? (isEn ? 'Catalyst 3650 Switch (802.1Q Trunk & VLANs)' : 'Commutateur Catalyst 3650 (Trunk 802.1Q & VLANs)')
                      : dev === 'PCA'
                      ? (isEn ? 'Windows Client Host VLAN 10 (IP: 192.168.10.10)' : 'Poste client Windows VLAN 10 (IP: 192.168.10.10)')
                      : (isEn ? 'Linux Intranet Server VLAN 20 (IP: 192.168.20.50)' : 'Serveur Linux Intranet VLAN 20 (IP: 192.168.20.50)')
                  }
                >
                  <button
                    onClick={() => setActiveDevice(dev)}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      activeDevice === dev
                        ? 'bg-[#00e5ff] text-[#00363d] font-bold'
                        : 'text-[#bac9cc] hover:bg-[#262a33]'
                    }`}
                  >
                    {dev}
                  </button>
                </Tooltip>
              ))}
              <Tooltip content={isEn ? "Clear terminal screen output" : "Effacer le contenu de l'écran du terminal"}>
                <button
                  onClick={() => executeCommand('clear')}
                  className="p-1 text-[#849396] hover:text-[#dfe2ee] ml-2 cursor-pointer"
                  title={isEn ? "Clear screen" : "Effacer l'écran"}
                >
                  <span className="material-symbols-outlined text-sm">cleaning_services</span>
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto max-h-[380px] text-[#a8ffd2] flex flex-col gap-1 select-text">
            {terminalLogs[activeDevice].map((line, idx) => (
              <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                {line}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Command Pill Quick Suggestions */}
          <div className="bg-[#181c24]/90 px-3 py-2 border-t border-[#334155]/40 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-mono text-[#849396] uppercase shrink-0">
              {isEn ? 'Suggestions:' : 'Suggestions :'}
            </span>
            <button
              onClick={() => executeCommand('ping 192.168.20.50')}
              className="px-2 py-0.5 rounded bg-[#262a33] text-[#00daf3] hover:bg-[#31353e] text-[11px] font-mono whitespace-nowrap border border-[#334155]/50"
            >
              ping 192.168.20.50
            </button>
            <button
              onClick={() => executeCommand('show ip interface brief')}
              className="px-2 py-0.5 rounded bg-[#262a33] text-[#00daf3] hover:bg-[#31353e] text-[11px] font-mono whitespace-nowrap border border-[#334155]/50"
            >
              show ip int brief
            </button>
            <button
              onClick={() => executeCommand('show ip route')}
              className="px-2 py-0.5 rounded bg-[#262a33] text-[#00daf3] hover:bg-[#31353e] text-[11px] font-mono whitespace-nowrap border border-[#334155]/50"
            >
              show ip route
            </button>
            <button
              onClick={() => executeCommand('show interfaces trunk')}
              className="px-2 py-0.5 rounded bg-[#262a33] text-[#00daf3] hover:bg-[#31353e] text-[11px] font-mono whitespace-nowrap border border-[#334155]/50"
            >
              show int trunk
            </button>
            <button
              onClick={() => executeCommand('show vlan brief')}
              className="px-2 py-0.5 rounded bg-[#262a33] text-[#00daf3] hover:bg-[#31353e] text-[11px] font-mono whitespace-nowrap border border-[#334155]/50"
            >
              show vlan brief
            </button>
          </div>

          {/* Interactive Command Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCommand(terminalInput);
            }}
            className="bg-[#0f131c] px-4 py-2.5 border-t border-[#334155] flex items-center gap-2 font-mono text-xs"
          >
            <span className="text-[#00e5ff] font-bold">
              {activeDevice === 'R1'
                ? 'R1#'
                : activeDevice === 'SW1'
                ? 'SW1#'
                : activeDevice === 'PCA'
                ? 'C:\\>'
                : 'root@srv:~#'}
            </span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder={isEn ? "Enter an IOS command (e.g., ping 192.168.20.50, show ip route)..." : "Entrez une commande IOS (ex: ping 192.168.20.50, show ip route)..."}
              className="flex-1 bg-transparent border-none outline-none text-[#dfe2ee] font-mono placeholder:text-[#849396] focus:ring-0"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded bg-[#00e5ff] text-[#00363d] font-bold text-xs hover:brightness-110"
            >
              {isEn ? 'Execute' : 'Exécuter'}
            </button>
          </form>
        </div>
      </div>

      {/* 3. Bottom: Matrice de Validation du Scénario (4 Task Cards) */}
      <div className="p-6 pt-0">
        <div className="bg-[#181c24]/90 border border-[#334155]/50 rounded-xl p-5 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#334155]/40">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#5be9ad]">task_alt</span>
              <h3 className="font-semibold text-sm text-[#dfe2ee] font-mono uppercase">
                {isEn ? 'Scenario Validation Matrix (4 Tasks)' : 'Matrice de Validation du Scénario (4 Tâches)'}
              </h3>
            </div>
            <span className="text-xs font-mono text-[#00daf3]">
              {isEn ? 'Real-time automated validation' : 'Validation automatique en temps réel'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all ${
                  task.isValidated
                    ? 'bg-[#003824]/20 border-[#5be9ad]/40 shadow-sm'
                    : 'bg-[#1c2028] border-[#334155]/40'
                }`}
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#bac9cc]">
                      {task.title}
                    </span>
                    <span
                      className={`material-symbols-outlined text-base ${
                        task.isValidated ? 'text-[#5be9ad]' : 'text-[#849396]'
                      }`}
                    >
                      {task.isValidated ? 'check_circle' : 'pending'}
                    </span>
                  </div>
                  <p className="text-xs text-[#dfe2ee]">{task.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#334155]/30 text-[11px] font-mono">
                  <span className="text-[#849396]">{task.specLabel}</span>
                  {task.isValidated ? (
                    <span className="text-[#5be9ad] font-bold">{task.specStatus}</span>
                  ) : (
                    <button
                      onClick={() => executeCommand('ping 192.168.20.50')}
                      className="text-[#00e5ff] hover:underline font-semibold"
                    >
                      {isEn ? 'Run test' : 'Lancer le test'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Running Config Modal */}
      {showRunningConfig && (
        <div className="fixed inset-0 bg-[#0f131c]/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#181c24] border border-[#334155] rounded-xl p-6 max-w-2xl w-full flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#334155]">
              <div className="flex items-center gap-2 text-[#00daf3]">
                <span className="material-symbols-outlined text-xl">settings</span>
                <h3 className="font-semibold text-base text-[#dfe2ee]">
                  R1 Cisco IOS Running-Configuration
                </h3>
              </div>
              <button
                onClick={() => setShowRunningConfig(false)}
                className="text-[#849396] hover:text-[#dfe2ee]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <pre className="bg-[#0a0e16] p-4 rounded-lg font-mono text-xs text-[#a8ffd2] overflow-y-auto max-h-80 whitespace-pre leading-relaxed border border-[#334155]/60">
{`!
hostname R1
!
interface GigabitEthernet0/0
 no ip address
 duplex auto
 speed auto
!
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0
!
interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0
!
end`}
            </pre>
            <div className="flex justify-end">
              <button
                onClick={() => setShowRunningConfig(false)}
                className="px-4 py-2 bg-[#262a33] text-xs font-mono text-[#dfe2ee] rounded-lg hover:bg-[#31353e]"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
