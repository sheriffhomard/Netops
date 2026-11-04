import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ViewMode } from '../types';

interface QuestionBankViewProps {
  onNavigate: (view: ViewMode) => void;
  onSelectCert?: (code: string) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({ onNavigate }) => {
  const { t, i18n } = useTranslation(['common', 'exams', 'navigation']);
  const isEn = i18n.language?.startsWith('en');
  const [search, setSearch] = useState('');
  const [selectedCert, setSelectedCert] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const bankQuestionsFr = [
    {
      id: 1,
      cert: 'CCNP ENCOR 350-401',
      domain: 'Connectivité IP & OSPF',
      title: 'OSPFv2 Type-5 LSA Forward Address non nulle',
      statement:
        'Lorsque R2 reçoit une LSA Type-5 avec une Forward Address 172.16.10.5, quelle condition dans la table de routage est obligatoire pour installer la route externe dans sa RIB ?',
      codeSnippet: `R2# show ip ospf database external 10.250.0.0
Forward Address: 172.16.10.5
Metric Type: 2`,
      options: [
        'A. La Forward Address doit être accessible via un chemin intra-area ou inter-area dans la RIB.',
        'B. L\'ASBR doit être dans une Totally Stubby Area.',
        'C. La métrique doit obligatoirement être de type 1 (E1).',
        'D. Une route par défaut 0.0.0.0/0 suffit pour joindre la FA.',
      ],
      correctAnswer: 'A',
      explanation:
        'RFC 2328 Section 16.4 : Si la Forward Address est différente de 0.0.0.0, le routeur récepteur doit avoir une route intra-area ou inter-area vers cette adresse spécifique pour pouvoir installer la route externe dans la table de routage globale.',
      rfc: 'RFC 2328 §16.4',
    },
    {
      id: 2,
      cert: 'CCNA 200-301',
      domain: 'Network Access & Switching',
      title: 'Encapsulation 802.1Q et VLAN Natif Tagged',
      statement:
        'Par défaut sur un commutateur Cisco Catalyst, quel est le comportement appliqué aux trames appartenant au VLAN natif transitant par un port en mode Trunk 802.1Q ?',
      codeSnippet: `SW1# show interfaces trunk
Port        Mode             Encapsulation  Status        Native vlan
Fa0/24      on               802.1q         trunking      1`,
      options: [
        'A. Elles sont encapsulées sans balise (tag) 802.1Q de 4 octets.',
        'B. Elles sont systématiquement rejetées par Spanning-Tree.',
        'C. Elles reçoivent un tag CoS de niveau 7 automatiquement.',
        'D. Elles sont redirigées vers le CPU du switch pour inspection.',
      ],
      correctAnswer: 'A',
      explanation:
        'Par défaut dans le standard 802.1Q, le trafic associé au VLAN natif (généralement VLAN 1) traverse le lien Trunk non balisé (untagged). La commande globale "vlan dot1q tag native" peut modifier ce comportement.',
      rfc: 'IEEE 802.1Q Standard',
    },
    {
      id: 3,
      cert: 'Palo Alto PCNSE',
      domain: 'Sécurité & Politiques NGFW',
      title: 'Comportement App-ID avec changement de port (Service Dependency)',
      statement:
        'Un administrateur configure une règle de sécurité autorisant l\'application "web-browsing" mais restreint le service au port TCP 8080. Si le trafic HTTP standard passe sur le port 80, comment le moteur PAN-OS traite-t-il la session ?',
      codeSnippet: `admin@PA-3220> show security-rule-match application web-browsing destination-port 80
Status: DENIED (Service port mismatch)`,
      options: [
        'A. Le trafic est bloqué car le port physique ne correspond pas à la restriction du champ Service.',
        'B. L\'App-ID contourne automatiquement le port grâce au décryptage SSL.',
        'C. Le trafic est réécrit en NAT vers le port 8080.',
        'D. Le trafic est mis en quarantaine pour inspection WildFire.',
      ],
      correctAnswer: 'A',
      explanation:
        'Dans PAN-OS, si un service spécifique est défini (ex: service-http-8080 au lieu de "application-default"), le paquet doit correspondre À LA FOIS à l\'application reconnue et au port TCP/UDP défini.',
      rfc: 'PAN-OS 11.x Security Policy Architecture',
    },
    {
      id: 4,
      cert: 'CompTIA Security+',
      domain: 'Architecture Zero-Trust & IAM',
      title: 'Principe du Moindre Privilège et PAM (Privileged Access Management)',
      statement:
        'Quelle mesure permet d\'éviter l\'élévation permanente des privilèges et applique une politique d\'accès Just-In-Time (JIT) sur les routeurs d\'infrastructure ?',
      codeSnippet: `AAA Authentication: TACACS+ / RADIUS Authorization Server
Attribute: Cisco-AVPair = "priv-lvl=15" with Time-Limited Ticket`,
      options: [
        'A. Déployer un bastion PAM avec octroi temporaire de jeton à durée déterminée (JIT).',
        'B. Désactiver tous les comptes d\'administration locale et utiliser SNMPv1.',
        'C. Augmenter le timeout de session Telnet à 3600 secondes.',
        'D. Implémenter une clé de chiffrement symétrique statique partagée.',
      ],
      correctAnswer: 'A',
      explanation:
        'L\'approche Just-In-Time (JIT) au sein d\'une solution PAM garantit que les privilèges administratifs ne sont accordés que pour une fenêtre temporelle restreinte et révoqués automatiquement.',
      rfc: 'NIST SP 800-207 Zero Trust Architecture',
    },
  ];

  const bankQuestionsEn = [
    {
      id: 1,
      cert: 'CCNP ENCOR 350-401',
      domain: 'IP Connectivity & OSPF',
      title: 'OSPFv2 Type-5 LSA Non-Zero Forward Address',
      statement:
        'When R2 receives a Type-5 LSA with a Forward Address 172.16.10.5, which condition in the routing table is mandatory to install the external route into its RIB?',
      codeSnippet: `R2# show ip ospf database external 10.250.0.0
Forward Address: 172.16.10.5
Metric Type: 2`,
      options: [
        'A. The Forward Address must be reachable via an intra-area or inter-area path in the RIB.',
        'B. The ASBR must reside in a Totally Stubby Area.',
        'C. The metric must strictly be Type 1 (E1).',
        'D. A default route 0.0.0.0/0 is sufficient to reach the FA.',
      ],
      correctAnswer: 'A',
      explanation:
        'RFC 2328 Section 16.4: If the Forward Address is non-zero, the receiving router MUST have an intra-area or inter-area path to this specific address in order to install the external route into its global routing table.',
      rfc: 'RFC 2328 §16.4',
    },
    {
      id: 2,
      cert: 'CCNA 200-301',
      domain: 'Network Access & Switching',
      title: '802.1Q Encapsulation and Tagged Native VLAN',
      statement:
        'By default on a Cisco Catalyst switch, what behavior is applied to frames belonging to the native VLAN traversing an 802.1Q Trunk port?',
      codeSnippet: `SW1# show interfaces trunk
Port        Mode             Encapsulation  Status        Native vlan
Fa0/24      on               802.1q         trunking      1`,
      options: [
        'A. They are transmitted without the 4-byte 802.1Q header tag (untagged).',
        'B. They are systematically dropped by Spanning-Tree.',
        'C. They receive a level 7 CoS priority tag automatically.',
        'D. They are redirected to switch CPU for deep packet inspection.',
      ],
      correctAnswer: 'A',
      explanation:
        'By default in IEEE 802.1Q standard, traffic associated with the native VLAN (usually VLAN 1) traverses Trunk links untagged. The global command "vlan dot1q tag native" can modify this behavior.',
      rfc: 'IEEE 802.1Q Standard',
    },
    {
      id: 3,
      cert: 'Palo Alto PCNSE',
      domain: 'Security & NGFW Policies',
      title: 'App-ID Behavior with Custom Port (Service Dependency)',
      statement:
        'An engineer configures a security rule permitting application "web-browsing" but restricts the service to TCP port 8080. If standard HTTP traffic arrives on port 80, how does the PAN-OS engine handle the session?',
      codeSnippet: `admin@PA-3220> show security-rule-match application web-browsing destination-port 80
Status: DENIED (Service port mismatch)`,
      options: [
        'A. Traffic is blocked because the destination port does not match the Service field specification.',
        'B. App-ID automatically bypasses the port mismatch via SSL decryption.',
        'C. Traffic is rewritten using NAT onto port 8080.',
        'D. Traffic is quarantined for WildFire dynamic analysis.',
      ],
      correctAnswer: 'A',
      explanation:
        'In PAN-OS, when an explicit custom service port is configured (e.g. service-http-8080 instead of "application-default"), packets must match BOTH the identified application and the specified TCP/UDP port.',
      rfc: 'PAN-OS 11.x Security Policy Architecture',
    },
    {
      id: 4,
      cert: 'CompTIA Security+',
      domain: 'Zero-Trust Architecture & IAM',
      title: 'Principle of Least Privilege & PAM (Privileged Access Management)',
      statement:
        'Which security control prevents standing privileges and enforces Just-In-Time (JIT) access policies on core network infrastructure devices?',
      codeSnippet: `AAA Authentication: TACACS+ / RADIUS Authorization Server
Attribute: Cisco-AVPair = "priv-lvl=15" with Time-Limited Ticket`,
      options: [
        'A. Deploy a PAM bastion vault with time-limited ticket provisioning (JIT).',
        'B. Disable all local administrator accounts and revert to SNMPv1.',
        'C. Increase Telnet session idle timeout to 3600 seconds.',
        'D. Enforce a static shared symmetric encryption key across all routers.',
      ],
      correctAnswer: 'A',
      explanation:
        'The Just-In-Time (JIT) access model in PAM ensures that administrative elevated privileges are only granted for a strictly delimited time window and revoked automatically upon expiration.',
      rfc: 'NIST SP 800-207 Zero Trust Architecture',
    },
  ];

  const bankQuestions = isEn ? bankQuestionsEn : bankQuestionsFr;

  const filtered = bankQuestions.filter((q) => {
    const matchSearch =
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.statement.toLowerCase().includes(search.toLowerCase()) ||
      q.domain.toLowerCase().includes(search.toLowerCase());
    const matchCert = selectedCert === 'all' || q.cert.includes(selectedCert);
    const matchDomain = selectedDomain === 'all' || q.domain === selectedDomain;
    return matchSearch && matchCert && matchDomain;
  });

  const activeQ = bankQuestions.find((q) => q.id === activeQuestionId) || bankQuestions[0];

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 py-6 pb-20 lg:pb-8 gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#334155]/40">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-2xl">database</span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#00daf3]">
              {isEn ? 'ITEM BANK & EXPLANATIONS' : 'ITEM BANK & FLASHCARDS'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#dfe2ee]">
            {isEn ? 'Network & Cyber Question Bank' : 'Banque de Questions Réseau & Cybersécurité'}
          </h1>
          <p className="text-sm text-[#bac9cc]">
            {isEn
              ? 'Explore 14,280 questions indexed by RFC, vendor and official blueprints with in-depth technical justifications.'
              : 'Explorez 14 280 questions indexées par RFC, vendor et blueprint officiel avec explications détaillées.'}
          </p>
        </div>
        <button
          onClick={() => onNavigate('simulateur-d-examen')}
          className="px-5 py-2.5 rounded-xl bg-[#00e5ff] text-[#00363d] font-bold text-sm hover:brightness-110 shadow-lg flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">play_arrow</span>
          <span>{isEn ? 'Launch Mock Exam' : 'Lancer un Mock Exam'}</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[#849396] text-xl">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isEn
                ? 'Search a question, RFC keyword, protocol (OSPF, BGP, VLAN)...'
                : 'Rechercher une question, mot-clé RFC, protocole (OSPF, BGP, VLAN)...'
            }
            className="w-full bg-[#181c24] border border-[#334155]/50 rounded-lg pl-11 pr-4 py-2 text-sm text-[#dfe2ee] placeholder:text-[#849396] focus:outline-none focus:border-[#00e5ff]"
          />
        </div>

        <select
          value={selectedCert}
          onChange={(e) => setSelectedCert(e.target.value)}
          className="w-full sm:w-56 bg-[#181c24] border border-[#334155]/50 rounded-lg px-3 py-2 text-sm text-[#dfe2ee] focus:outline-none"
        >
          <option value="all">{isEn ? 'All Certifications' : 'Toutes les certifications'}</option>
          <option value="ENCOR">Cisco CCNP ENCOR</option>
          <option value="CCNA">Cisco CCNA 200-301</option>
          <option value="PCNSE">Palo Alto PCNSE</option>
          <option value="Security+">CompTIA Security+</option>
        </select>
      </div>

      {/* Split List & Question Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Questions List (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {filtered.map((q) => {
            const isActive = q.id === activeQ.id;
            return (
              <div
                key={q.id}
                onClick={() => {
                  setActiveQuestionId(q.id);
                  setShowAnswer(false);
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 ${
                  isActive
                    ? 'bg-[#181c24] border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                    : 'bg-[#181c24]/80 border-[#334155]/40 hover:bg-[#181c24]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#262a33] text-[#00daf3]">
                    {q.cert}
                  </span>
                  <span className="text-[10px] font-mono text-[#849396]">{q.rfc}</span>
                </div>
                <h4 className="text-sm font-semibold text-[#dfe2ee]">{q.title}</h4>
                <p className="text-xs text-[#bac9cc] line-clamp-2">{q.statement}</p>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Question Inspector / Explanation (7 cols) */}
        <div className="lg:col-span-7 bg-[#181c24] border border-[#334155] rounded-xl p-6 shadow-xl flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#334155]/40">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#00363d] text-[#00e5ff] text-xs font-mono font-bold">
                {activeQ.cert}
              </span>
              <span className="text-xs font-mono text-[#bac9cc]">{activeQ.domain}</span>
            </div>
            <span className="text-xs font-mono text-[#a8ffd2]">{activeQ.rfc}</span>
          </div>

          <h3 className="text-lg font-bold text-[#dfe2ee]">{activeQ.title}</h3>
          <p className="text-sm text-[#dfe2ee] leading-relaxed">{activeQ.statement}</p>

          {activeQ.codeSnippet && (
            <div className="bg-[#0a0e16] p-3 rounded-lg border border-[#334155]/50 font-mono text-xs text-[#a8ffd2] whitespace-pre-wrap">
              {activeQ.codeSnippet}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-[#849396] uppercase">
              {isEn ? 'Multiple Choice Options:' : 'Options au choix :'}
            </span>
            {activeQ.options.map((opt, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-[#0a0e16] border border-[#334155]/40 text-xs text-[#dfe2ee]"
              >
                {opt}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#334155]/40 flex flex-col gap-3">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="py-2.5 px-4 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#00daf3] transition-colors self-start flex items-center gap-2 border border-[#334155] cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">
                {showAnswer ? 'visibility_off' : 'lightbulb'}
              </span>
              <span>
                {showAnswer
                  ? (isEn ? 'Hide Answer' : 'Masquer la réponse')
                  : (isEn ? 'Reveal Answer & RFC Justification' : 'Révéler la réponse & justification RFC')}
              </span>
            </button>

            {showAnswer && (
              <div className="bg-[#0a0e16] p-4 rounded-xl border border-[#00daf3]/40 flex flex-col gap-2 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-[#a8ffd2] font-mono text-xs font-bold">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>{isEn ? 'Correct Answer:' : 'Réponse correcte :'} {activeQ.correctAnswer}</span>
                </div>
                <p className="text-xs text-[#dfe2ee] leading-relaxed">{activeQ.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

