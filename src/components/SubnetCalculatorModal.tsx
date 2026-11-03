import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip, FieldHelper } from './Tooltip';

interface SubnetCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubnetCalculatorModal: React.FC<SubnetCalculatorModalProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation(['common', 'settings']);
  const isEn = i18n.language?.startsWith('en');
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
            <div>
              <h3 className="font-semibold text-lg text-[#dfe2ee]">
                {t('settings:subnetCalc.title')}
              </h3>
              <p className="text-[11px] text-[#849396]">
                {isEn
                  ? 'Hover over help icons (?) to understand each network subnetting parameter'
                  : "Survolez les icônes d'aide (?) pour comprendre chaque paramètre réseau"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#849396] hover:text-[#dfe2ee] transition-colors p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 font-mono">
          <div>
            <FieldHelper
              label={t('settings:subnetCalc.ipAddress')}
              helpText={
                isEn
                  ? 'Standard 4-octet IPv4 format from 0 to 255 separated by dots (e.g. 192.168.1.1 or 10.0.0.1).'
                  : 'Format standard 4 octets de 0 à 255 séparés par des points (ex: 192.168.1.1 ou 10.0.0.1).'
              }
              className="mb-1"
            />
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full bg-[#0a0e16] border border-[#334155] rounded-lg px-3 py-2 text-sm text-[#00daf3] focus:border-[#00e5ff] focus:outline-none"
              placeholder="192.168.10.10"
            />
          </div>
          <div>
            <FieldHelper
              label={`${isEn ? 'CIDR Prefix' : 'Préfixe CIDR'} (/${cidr})`}
              helpText={
                isEn
                  ? 'Number of masked network bits. /24 = 254 usable hosts, /30 = 2 hosts for point-to-point links.'
                  : 'Nombre de bits à 1 dans le masque réseau. /24 = 254 hôtes, /30 = 2 hôtes pour liaisons point-à-point.'
              }
              className="mb-1"
            />
            <select
              value={cidr}
              onChange={(e) => setCidr(Number(e.target.value))}
              className="w-full bg-[#0a0e16] border border-[#334155] rounded-lg px-3 py-2 text-sm text-[#00daf3] focus:border-[#00e5ff] focus:outline-none cursor-pointer"
            >
              {Array.from({ length: 25 }, (_, i) => i + 8).map((bit) => (
                <option key={bit} value={bit}>
                  /{bit} — {Math.pow(2, 32 - bit) - 2 > 0 ? Math.pow(2, 32 - bit) - 2 : (bit === 31 ? 2 : 1)} {t('common:units.hosts', 'hosts')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Matrix with Tooltips */}
        {results ? (
          <div className="bg-[#0a0e16] rounded-lg p-4 font-mono text-xs flex flex-col gap-2.5 border border-[#334155]/60">
            <div className="flex justify-between items-center py-1 border-b border-[#334155]/40">
              <span className="text-[#849396] flex items-center gap-1.5">
                <span>{t('settings:subnetCalc.netmask')} :</span>
                <Tooltip content={isEn ? 'Subnet mask in decimal notation corresponding to the CIDR prefix.' : 'Masque de sous-réseau en notation décimale équivalente au préfixe CIDR sélectionné.'} />
              </span>
              <span className="text-[#00e5ff] font-semibold">{results.maskStr}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[#334155]/40">
              <span className="text-[#849396] flex items-center gap-1.5">
                <span>{t('settings:subnetCalc.wildcard')} :</span>
                <Tooltip content={isEn ? 'Wildcard mask used in Cisco ACLs and OSPF network statements (255.255.255.255 - Mask).' : 'Masque inversé utilisé dans les ACL Cisco et les déclarations de réseaux OSPF (255.255.255.255 - Masque).'} />
              </span>
              <span className="text-[#a8ffd2] font-semibold">{results.wildcardStr}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[#334155]/40">
              <span className="text-[#849396] flex items-center gap-1.5">
                <span>{t('settings:subnetCalc.networkAddress')} :</span>
                <Tooltip content={isEn ? 'First address of the IP block representing the network itself.' : 'Première adresse du bloc IP représentant le sous-réseau lui-même.'} />
              </span>
              <span className="text-[#dfe2ee] font-semibold">{results.networkStr} /{cidr}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[#334155]/40">
              <span className="text-[#849396] flex items-center gap-1.5">
                <span>{t('settings:subnetCalc.broadcastAddress')} :</span>
                <Tooltip content={isEn ? 'Last address of the block to broadcast packets to all subnet hosts.' : 'Dernière adresse du bloc IP permettant d\'envoyer un paquet à tous les hôtes du sous-réseau.'} />
              </span>
              <span className="text-[#ffb4ab] font-semibold">{results.broadcastStr}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[#334155]/40">
              <span className="text-[#849396] flex items-center gap-1.5">
                <span>{isEn ? 'Usable Host Range :' : 'Plage d\'Hôtes Utilisables :'}</span>
                <Tooltip content={isEn ? 'Range of IP addresses assignable to network interfaces and endpoints.' : 'Intervalle d\'adresses IP pouvant être attribuées aux interfaces, routeurs, serveurs et postes clients.'} />
              </span>
              <span className="text-[#c0c1ff] font-semibold">{results.hostRangeStr}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-[#849396] flex items-center gap-1.5">
                <span>{t('settings:subnetCalc.usableHosts')} :</span>
                <Tooltip content={isEn ? 'Total addresses 2^(32-CIDR) minus network and broadcast (-2).' : "Nombre total d'adresses (2^(32-CIDR)) moins l'adresse réseau et l'adresse de diffusion (-2)."} />
              </span>
              <span className="text-[#5be9ad] font-bold text-sm">
                {new Intl.NumberFormat(isEn ? 'en-US' : 'fr-FR').format(results.usableHosts)}
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-[#0a0e16] p-4 text-center text-xs text-[#ffb4ab] font-mono rounded-lg">
            {isEn ? 'Invalid IPv4 address. Example: 192.168.10.10' : 'Format d\'adresse IP invalide. Exemple : 192.168.10.10'}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#dfe2ee] rounded-lg transition-colors cursor-pointer"
          >
            {t('common:actions.close')}
          </button>
        </div>
      </div>
    </div>
  );
};
