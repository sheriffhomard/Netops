import React, { useState } from 'react';

interface SubnetCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubnetCalculatorModal: React.FC<SubnetCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [ip, setIp] = useState('192.168.10.10');
  const [cidr, setCidr] = useState(24);

  if (!isOpen) return null;

  // Helpers for calculation
  const ipParts = ip.split('.').map((p) => parseInt(p, 10) || 0);
  const validIp =
    ipParts.length === 4 && ipParts.every((p) => p >= 0 && p <= 255);

  const calculateSubnet = () => {
    if (!validIp) return null;

    const totalBits = 32;
    const hostBits = totalBits - cidr;
    const totalHosts = Math.pow(2, hostBits);
    const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : totalHosts - 2;

    // Mask in 4 octets
    const maskBits = '1'.repeat(cidr).padEnd(32, '0');
    const maskOctets = [
      parseInt(maskBits.slice(0, 8), 2),
      parseInt(maskBits.slice(8, 16), 2),
      parseInt(maskBits.slice(16, 24), 2),
      parseInt(maskBits.slice(24, 32), 2),
    ];

    // Wildcard
    const wildcardOctets = maskOctets.map((m) => 255 - m);

    // Network IP
    const networkOctets = ipParts.map((part, idx) => part & maskOctets[idx]);

    // Broadcast IP
    const broadcastOctets = networkOctets.map((net, idx) => net | wildcardOctets[idx]);

    // First and last usable host
    const firstHost = [...networkOctets];
    const lastHost = [...broadcastOctets];

    if (cidr < 31) {
      firstHost[3] += 1;
      lastHost[3] -= 1;
    }

    return {
      maskStr: maskOctets.join('.'),
      wildcardStr: wildcardOctets.join('.'),
      networkStr: networkOctets.join('.'),
      broadcastStr: broadcastOctets.join('.'),
      hostRangeStr: `${firstHost.join('.')} - ${lastHost.join('.')}`,
      totalHosts,
      usableHosts: usableHosts < 0 ? 0 : usableHosts,
    };
  };

  const results = calculateSubnet();

  return (
    <div className="fixed inset-0 bg-[#0f131c]/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[#181c24] border border-[#334155] rounded-xl shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-[#334155]">
          <div className="flex items-center gap-2 text-[#00daf3]">
            <span className="material-symbols-outlined text-2xl">calculate</span>
            <h3 className="font-semibold text-lg text-[#dfe2ee]">
              Calculatrice de Sous-Réseaux CIDR &amp; VLSM
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#849396] hover:text-[#dfe2ee] transition-colors p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 font-mono">
          <div>
            <label className="text-xs uppercase text-[#bac9cc] block mb-1">
              Adresse IP IPv4
            </label>
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full bg-[#0a0e16] border border-[#334155] rounded-lg px-3 py-2 text-sm text-[#00daf3] focus:border-[#00e5ff] focus:outline-none"
              placeholder="192.168.10.10"
            />
          </div>
          <div>
            <label className="text-xs uppercase text-[#bac9cc] block mb-1">
              Masque CIDR (/{cidr})
            </label>
            <select
              value={cidr}
              onChange={(e) => setCidr(Number(e.target.value))}
              className="w-full bg-[#0a0e16] border border-[#334155] rounded-lg px-3 py-2 text-sm text-[#00daf3] focus:border-[#00e5ff] focus:outline-none"
            >
              {Array.from({ length: 25 }, (_, i) => i + 8).map((bit) => (
                <option key={bit} value={bit}>
                  /{bit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Matrix */}
        {results ? (
          <div className="bg-[#0a0e16] rounded-lg p-4 font-mono text-xs flex flex-col gap-2.5 border border-[#334155]/60">
            <div className="flex justify-between py-1 border-b border-[#334155]/40">
              <span className="text-[#849396]">Masque Décimal :</span>
              <span className="text-[#00e5ff] font-semibold">{results.maskStr}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#334155]/40">
              <span className="text-[#849396]">Masque Inversé (Wildcard) :</span>
              <span className="text-[#a8ffd2] font-semibold">{results.wildcardStr}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#334155]/40">
              <span className="text-[#849396]">Adresse Réseau (Subnet ID) :</span>
              <span className="text-[#dfe2ee] font-semibold">{results.networkStr} /{cidr}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#334155]/40">
              <span className="text-[#849396]">Adresse de Diffusion (Broadcast) :</span>
              <span className="text-[#ffb4ab] font-semibold">{results.broadcastStr}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#334155]/40">
              <span className="text-[#849396]">Plage d&apos;Hôtes Utilisables :</span>
              <span className="text-[#c0c1ff] font-semibold">{results.hostRangeStr}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-[#849396]">Nombre d&apos;Hôtes Utilisables :</span>
              <span className="text-[#5be9ad] font-bold text-sm">
                {results.usableHosts.toLocaleString()}
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-[#0a0e16] p-4 text-center text-xs text-[#ffb4ab] font-mono rounded-lg">
            Format d&apos;adresse IP invalide. Exemple : 192.168.10.10
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#dfe2ee] rounded-lg transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
