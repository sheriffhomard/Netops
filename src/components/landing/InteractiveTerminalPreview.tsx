import React, { useState } from 'react';

const SAMPLES: Record<string, string> = {
  'show ip route': `Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area 
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2

Gateway of last resort is 198.51.100.1 to network 0.0.0.0

S*    0.0.0.0/0 [1/0] via 198.51.100.1
      10.0.0.0/8 is variably subnetted, 4 subnets, 2 masks
C        10.10.1.0/24 is directly connected, GigabitEthernet0/0/1
L        10.10.1.1/32 is directly connected, GigabitEthernet0/0/1
O        10.20.0.0/24 [110/20] via 10.10.1.2, 00:42:15, GigabitEthernet0/0/1
O E2     192.168.100.0/24 [110/30] via 10.10.1.2, 00:15:30, GigabitEthernet0/0/1
B        172.16.50.0/24 [20/0] via 198.51.100.2, 01:22:04`,

  'show ip ospf neighbor': `Neighbor ID     Pri   State           Dead Time   Address         Interface
10.255.255.2      1   FULL/BDR        00:00:36    10.10.1.2       GigabitEthernet0/0/1
10.255.255.3      1   FULL/DROTHER    00:00:34    10.10.1.3       GigabitEthernet0/0/1
10.255.255.4      1   FULL/DR         00:00:38    10.10.1.4       GigabitEthernet0/0/1`,

  'show interfaces status': `Port      Name               Status       Vlan       Duplex  Speed Type
Gi0/0/1   Uplink-Core-SW01   connected    trunk        full   1000BaseTX
Gi0/0/2   Trunk-NGFW-Cluster connected    trunk        full   1000BaseTX
Gi0/0/3   Server-Farm-01     connected    10           full   1000BaseTX
Gi0/0/4   NOC-Workstation    connected    20           full   1000BaseTX
Te0/1/1   WAN-Transit-10G    connected    routed       full    10GBase-LR`,

  'show version': `Cisco IOS XE Software, Version 17.09.03a
Cisco IOS Software [Cupertino], Catalyst L3 Switch Software
ROM: IOS-XE ROMMON
Core-SW01 uptime is 42 weeks, 3 days, 14 hours, 22 minutes
System returned to ROM by reload at 04:12:00 UTC
System image file is "bootflash:packages.conf"
cisco C9300-48UXM (X86) processor with 16777216K/3145728K bytes of memory.
Processor board ID FOC2441L01E
48 Virtual Ethernet interfaces
4 Ten Gigabit Ethernet interfaces
Model Number: C9300-48UXM-A
Base Ethernet MAC Address: 00:42:68:aa:bb:cc
Configuration register is 0x2102`,
};

export const InteractiveTerminalPreview: React.FC = () => {
  const [activeCmd, setActiveCmd] = useState<string>('show ip route');
  const [inputValue, setInputValue] = useState<string>('');
  const [customOutput, setCustomOutput] = useState<string | null>(null);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim().toLowerCase();
    if (!trimmed) return;

    if (SAMPLES[trimmed]) {
      setActiveCmd(trimmed);
      setCustomOutput(null);
    } else if (trimmed === 'help' || trimmed === '?') {
      setCustomOutput(`NetOps Academy CLI Help:
Available commands in this live demo:
  - show ip route
  - show ip ospf neighbor
  - show interfaces status
  - show version
  - clear

(Note : Le simulateur complet disponible dans l'application supporte la navigation hiérarchique, configure terminal, les ACLs, OSPF et le découpage VLAN).`);
    } else if (trimmed === 'clear') {
      setCustomOutput('');
    } else {
      setCustomOutput(`% Invalid input detected at '^' marker.\nType 'help' or click a command below to explore Cisco IOS-XE outputs.`);
    }
    setInputValue('');
  };

  const outputText = customOutput !== null ? customOutput : (SAMPLES[activeCmd] || SAMPLES['show ip route']);

  return (
    <div className="w-full rounded-2xl bg-[#070a10] border border-[#334155]/60 overflow-hidden shadow-2xl font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f1422] border-b border-[#334155]/60 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80 inline-block" />
          </div>
          <span className="ml-2 text-[#849396] text-[11px]">
            Cisco IOS-XE v17.9 · Console Session (ttyp0)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5 rounded border border-[#00e5ff]/20">
            SIMULATED CLI
          </span>
        </div>
      </div>

      {/* Terminal Content Screen */}
      <div className="p-4 sm:p-5 text-[#dfe2ee] leading-relaxed max-h-[320px] overflow-y-auto select-text">
        <div className="text-[#849396] mb-3 text-[11px]">
          NetOps Academy Integrated Terminal Engine — Ready for CCNA &amp; CCNP CLI drills.
        </div>

        {/* Previous Command */}
        <div className="flex items-center gap-2 text-[#00e5ff] font-semibold">
          <span>NetOps-Core-SW01#</span>
          <span>{activeCmd}</span>
        </div>

        {/* Command Output */}
        <pre className="mt-2 text-[#bac9cc] whitespace-pre-wrap font-mono text-[11.5px] leading-tight">
          {outputText}
        </pre>

        {/* Active Prompt Line */}
        <form onSubmit={handleCommandSubmit} className="mt-3 flex items-center gap-2 pt-2 border-t border-[#334155]/30">
          <span className="text-[#00e5ff] font-semibold shrink-0">NetOps-Core-SW01#</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tapez 'show ip ospf neighbor' ou 'help'..."
            className="flex-1 bg-transparent text-[#c3f5ff] placeholder-[#849396]/50 focus:outline-none font-mono text-xs"
          />
          <button
            type="submit"
            className="px-2 py-0.5 text-[10px] bg-[#181c24] text-[#00e5ff] hover:bg-[#262a33] rounded border border-[#334155]/60 cursor-pointer"
          >
            ENTER ↵
          </button>
        </form>
      </div>

      {/* Quick Command Selector Strip */}
      <div className="flex flex-wrap items-center gap-1.5 px-4 py-2.5 bg-[#0a0e16] border-t border-[#334155]/40 text-[11px]">
        <span className="text-[#849396] text-[10px] mr-1">Exemples CLI :</span>
        {Object.keys(SAMPLES).map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => {
              setActiveCmd(cmd);
              setCustomOutput(null);
            }}
            className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
              activeCmd === cmd && customOutput === null
                ? 'bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40'
                : 'bg-[#181c24] text-[#bac9cc] hover:text-[#00e5ff] border border-[#334155]/40'
            }`}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
