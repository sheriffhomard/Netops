import React, { useState } from 'react';

export const InteractiveSubnetWidget: React.FC = () => {
  const [ip, setIp] = useState('172.16.10.35');
  const [cidr, setCidr] = useState(27);

  const ipParts = ip.split('.').map((p) => parseInt(p, 10) || 0);
  const validIp = ipParts.length === 4 && ipParts.every((p) => p >= 0 && p <= 255);

  const calculateSubnet = () => {
    if (!validIp) return null;

    const hostBits = 32 - cidr;
    const totalHosts = Math.pow(2, hostBits);
    const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

    const maskBits = '1'.repeat(cidr).padEnd(32, '0');
    const maskOctets = [
      parseInt(maskBits.slice(0, 8), 2),
      parseInt(maskBits.slice(8, 16), 2),
      parseInt(maskBits.slice(16, 24), 2),
      parseInt(maskBits.slice(24, 32), 2),
    ];

    const wildcardOctets = maskOctets.map((m) => 255 - m);
    const networkOctets = ipParts.map((part, idx) => part & maskOctets[idx]);
    const broadcastOctets = networkOctets.map((net, idx) => net | wildcardOctets[idx]);

    const firstHost = [...networkOctets];
    const lastHost = [...broadcastOctets];
    if (cidr < 31) {
      firstHost[3] += 1;
      lastHost[3] -= 1;
    }

    return {
      maskStr: maskOctets.join('.'),
      wildcardStr: wildcardOctets.join('.'),
      netStr: networkOctets.join('.'),
      bcastStr: broadcastOctets.join('.'),
      rangeStr: cidr >= 31 ? `${networkOctets.join('.')} - ${broadcastOctets.join('.')}` : `${firstHost.join('.')} - ${lastHost.join('.')}`,
      totalHosts,
      usableHosts,
    };
  };

  const result = calculateSubnet();

  return (
    <div className="w-full rounded-2xl bg-[#0a0e16]/95 border border-[#334155]/60 p-5 sm:p-6 backdrop-blur-xl shadow-2xl font-sans">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#334155]/40 text-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00e5ff] text-base">calculate</span>
          <span className="font-mono font-semibold text-[#dfe2ee]">
            Calculateur CIDR / VLSM Instantané
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#00e5ff]">
          Utilitaire d'ingénierie intégré
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-mono text-[#849396] mb-1">
            Adresse IPv4 :
          </label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#0f131c] border border-[#334155] text-xs font-mono text-[#00e5ff] focus:outline-none focus:border-[#00e5ff]"
            placeholder="192.168.1.1"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] font-mono text-[#849396] mb-1">
            <span>Préfixe de masque :</span>
            <span className="text-[#00e5ff] font-bold">/{cidr}</span>
          </div>
          <input
            type="range"
            min="8"
            max="30"
            value={cidr}
            onChange={(e) => setCidr(Number(e.target.value))}
            className="w-full h-2 bg-[#181c24] rounded-lg appearance-none cursor-pointer accent-[#00e5ff]"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#849396] mt-1">
            <span>/8 (Class A)</span>
            <span>/24 (Subnet 254)</span>
            <span>/30 (P2P Link)</span>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-4 pt-4 border-t border-[#334155]/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-[#0e1422] border border-[#334155]/40">
            <span className="text-[10px] text-[#849396] uppercase block">Masque Sous-Réseau</span>
            <span className="text-[#dfe2ee] font-semibold truncate block mt-0.5">{result.maskStr}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0e1422] border border-[#334155]/40">
            <span className="text-[10px] text-[#849396] uppercase block">Adresse Réseau</span>
            <span className="text-[#00e5ff] font-semibold truncate block mt-0.5">{result.netStr}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0e1422] border border-[#334155]/40">
            <span className="text-[10px] text-[#849396] uppercase block">Broadcast IP</span>
            <span className="text-[#dfe2ee] font-semibold truncate block mt-0.5">{result.bcastStr}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0e1422] border border-[#334155]/40">
            <span className="text-[10px] text-[#849396] uppercase block">Hôtes Utilisables</span>
            <span className="text-[#10b981] font-bold text-sm block mt-0.5">{result.usableHosts} IPs</span>
          </div>
        </div>
      )}
    </div>
  );
};
