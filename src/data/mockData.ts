import { CertificationItem, DailyDrillItem, ExamQuestion, LabScenario, SessionHistoryItem, UserProfile, WeaknessRadarItem } from '../types';

export const currentUser: UserProfile = {
  name: 'Alex Vance',
  role: 'Senior NetOps Candidate (CCNP / PCNSE)',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoF4UmkpC03X4xjuPn5kLzjV_fZAsM4T1zHgga_jCY2dSQJld7HlJw2DYZmuhEMitEkv6AFc2e628Z2oRmigPkR3CyU8l_vMntXzXKo71PZspCN3voyTzbIccgeJOdVLjxux4A_fwMliztCsvFYZ1IBqkgqH-_hGAMopCnA381wILym-uwhE9TjaXiKWFhSPvHqmhOBfJwNZ_33y3sD8YMIdkxYl2RObml6d-LFBJrDjmuHVZJSTAU',
  streakDays: 14,
  totalQuestions: 1420,
  readinessPercentage: 78,
  nextMockExam: 'CCNP ENCOR Mock #4 dans 3j (Sam 14h00)',
  precisionGlobal: 82.4,
  avgTimePerQuestion: 54,
  labsCompleted: 38,
  totalLabs: 50,
  vlsmSpeedSeconds: 18,
};

export const certificationsList: CertificationItem[] = [
  // Cisco Systems
  {
    id: 'ccst-net',
    code: 'CCST',
    name: 'CCST Networking',
    tagline: 'Support Technician',
    vendor: 'cisco',
    level: 'support',
    description: 'Fondations réseau pures, modèles TCP/IP et OSI, câblage et utilitaires de test.',
    durationMin: 50,
    thresholdScore: '700/1000',
    itemsCount: '40-50',
    blueprintVersion: 'v1.0',
    readinessPct: 95,
    domains: [
      { name: 'Standards & Modèles Réseau', percentage: 30 },
      { name: 'Adressage et Sous-réseaux IP', percentage: 25 },
      { name: 'Points d\'Accès & Câblage', percentage: 20 },
      { name: 'Dépannage de Premier Niveau', percentage: 25 },
    ],
  },
  {
    id: 'ccna-200-301',
    code: '200-301',
    name: 'Cisco CCNA 200-301',
    tagline: 'Implementing and Administering Cisco Solutions',
    vendor: 'cisco',
    level: 'associate',
    description: '6 domaines clés : Routage IP, Switching VLAN/STP, Sécurité endpoint, Automatisation Python/REST.',
    highlight: true,
    questionsCount: 850,
    labsCount: 24,
    durationMin: 120,
    thresholdScore: '~825/1000',
    itemsCount: '100-120',
    blueprintVersion: 'v1.1 Actif',
    readinessPct: 84,
    domains: [
      { name: 'Network Fundamentals', percentage: 20 },
      { name: 'Network Access (Switching / VLAN / Trunk)', percentage: 20 },
      { name: 'IP Connectivity (Routage OSPFv2, Subnetting)', percentage: 25 },
      { name: 'IP Services (DHCP, DNS, NAT, NTP)', percentage: 10 },
      { name: 'Security Fundamentals (ACLs, Port Security)', percentage: 15 },
      { name: 'Automation & Programmability (REST, JSON)', percentage: 10 },
    ],
  },
  {
    id: 'ccnp-350-401',
    code: '350-401 ENCOR',
    name: 'CCNP Enterprise (350-401 ENCOR)',
    tagline: 'Implementing and Operating Cisco Enterprise Network Core Technologies',
    vendor: 'cisco',
    level: 'professional',
    description: 'Routage BGP/OSPF multi-aire, SDN Cisco DNA Center / Catalyst Center, SD-WAN et QoS.',
    durationMin: 120,
    thresholdScore: '825/1000',
    itemsCount: '102',
    blueprintVersion: 'v1.2',
    readinessPct: 78,
    isEnrolled: true,
    enrolledProgress: 78,
    domains: [
      { name: 'Architecture Réseau (SD-Access, SD-WAN, QoS)', percentage: 15 },
      { name: 'Virtualisation (LISP, VXLAN, Hyperviseurs)', percentage: 10 },
      { name: 'Infrastructure (Routage OSPFv3, BGP, L2 Trunk)', percentage: 30 },
      { name: 'Assurance Réseau (NetFlow, Syslog, SPAN)', percentage: 10 },
      { name: 'Sécurité (CoPP, TrustSec, 802.1X, MACsec)', percentage: 20 },
      { name: 'Automatisation (Python, EEM, RESTCONF, YANG)', percentage: 15 },
    ],
  },
  {
    id: 'ccnp-350-701',
    code: '350-701 SCOR',
    name: 'CCNP Security (350-701 SCOR)',
    tagline: 'Implementing and Operating Cisco Security Core Technologies',
    vendor: 'cisco',
    level: 'professional',
    description: 'Architecture Cisco SAFE, pare-feu FTD/FMC, proxy ESA/WSA/Umbrella, EDR Secure Endpoint et Cisco ISE/TrustSec.',
    durationMin: 120,
    thresholdScore: '825/1000',
    itemsCount: '100-105',
    blueprintVersion: 'v1.1 Actif',
    readinessPct: 74,
    isEnrolled: true,
    enrolledProgress: 74,
    domains: [
      { name: '1.0 Security Concepts (Talos, Cryptographie, VPN)', percentage: 25 },
      { name: '2.0 Network Security (FTD, FMC, ASA, Snort 3)', percentage: 20 },
      { name: '3.0 Securing the Cloud (IaaS/PaaS/SaaS, CASB)', percentage: 15 },
      { name: '4.0 Content Security (ESA, WSA, Umbrella SIG)', percentage: 15 },
      { name: '5.0 Endpoint Protection (Secure Endpoint, AnyConnect, Duo)', percentage: 15 },
      { name: '6.0 Secure Network Access & Visibility (ISE, pxGrid, SNA)', percentage: 10 },
    ],
  },
  {
    id: 'ccie-enterprise',
    code: 'CCIE-EI',
    name: 'CCIE Enterprise Infrastructure',
    tagline: 'Expert Sommet',
    vendor: 'cisco',
    level: 'expert',
    description: 'Examen pratique de 8 heures en laboratoire : conception, déploiement et optimisation complexe.',
    durationMin: 480,
    thresholdScore: 'Pass/Fail',
    itemsCount: 'Lab 8h',
    blueprintVersion: 'v1.1',
    readinessPct: 42,
    domains: [
      { name: 'Campus Architecture & Switching', percentage: 25 },
      { name: 'Software-Defined Infrastructure (Cisco DNA)', percentage: 25 },
      { name: 'WAN Technologies & SD-WAN', percentage: 20 },
      { name: 'Transport Technologies & BGP Peering', percentage: 15 },
      { name: 'Infrastructure Automation & Programmability', percentage: 15 },
    ],
  },

  // CompTIA
  {
    id: 'comptia-network-plus',
    code: 'N10-008 / N10-009',
    name: 'CompTIA Network+',
    tagline: 'Vendor-Neutral',
    vendor: 'comptia',
    level: 'associate',
    description: 'Fondamentaux universels, encapsulation OSI, topologies physiques et logiques, dépannage matériel.',
    scoreMin: 'Score min: 720/900',
    durationMin: 90,
    thresholdScore: '720/900',
    itemsCount: '90',
    blueprintVersion: 'N10-009',
    readinessPct: 91,
    domains: [
      { name: 'Networking Concepts', percentage: 23 },
      { name: 'Network Security', percentage: 19 },
      { name: 'Network Operations', percentage: 16 },
      { name: 'Network Troubleshooting', percentage: 24 },
      { name: 'Infrastructure', percentage: 18 },
    ],
  },
  {
    id: 'comptia-security-plus',
    code: 'SY0-701',
    name: 'CompTIA Security+',
    tagline: 'Cyber Socle',
    vendor: 'comptia',
    level: 'associate',
    description: 'Cybersécurité réseau, cryptographie, gestion des accès PAM/IAM, postures Zero-Trust et conformité.',
    scoreMin: 'Score min: 750/900',
    durationMin: 90,
    thresholdScore: '750/900',
    itemsCount: '90',
    blueprintVersion: 'SY0-701',
    readinessPct: 100,
    isEnrolled: true,
    enrolledProgress: 100,
    domains: [
      { name: 'General Security Concepts', percentage: 12 },
      { name: 'Threats, Vulnerabilities & Mitigations', percentage: 22 },
      { name: 'Security Architecture', percentage: 18 },
      { name: 'Security Operations', percentage: 28 },
      { name: 'Security Program Management & Oversight', percentage: 20 },
    ],
  },

  // Juniper Networks
  {
    id: 'juniper-jncia',
    code: 'JN0-104',
    name: 'JNCIA-Junos',
    tagline: 'Associate',
    vendor: 'juniper',
    level: 'associate',
    description: 'Architecture Junos CLI, filtres pare-feu, routage de transit.',
    durationMin: 90,
    thresholdScore: '65%',
    itemsCount: '65',
    blueprintVersion: 'v2024',
    readinessPct: 70,
    domains: [
      { name: 'Junos OS Fundamentals', percentage: 30 },
      { name: 'Routing Fundamentals', percentage: 25 },
      { name: 'Routing Policy & Firewall Filters', percentage: 25 },
      { name: 'Interface Configuration', percentage: 20 },
    ],
  },
  {
    id: 'juniper-jncis-jncip',
    code: 'JN0-664',
    name: 'JNCIS & JNCIP-ENT',
    tagline: 'Professional',
    vendor: 'juniper',
    level: 'professional',
    description: 'Routage BGP étendu, IS-IS, switching Ethernet EVPN-VXLAN.',
    durationMin: 120,
    thresholdScore: '70%',
    itemsCount: '65',
    blueprintVersion: 'v2025',
    readinessPct: 58,
    domains: [
      { name: 'Layer 2 Switching & VLANs', percentage: 20 },
      { name: 'Spanning Tree & Link Aggregation', percentage: 15 },
      { name: 'OSPF & IS-IS Routing', percentage: 30 },
      { name: 'BGP Routing', percentage: 25 },
      { name: 'High Availability', percentage: 10 },
    ],
  },
  {
    id: 'juniper-jncie',
    code: 'JPR-944',
    name: 'JNCIE-ENT',
    tagline: 'Expert',
    vendor: 'juniper',
    level: 'expert',
    description: 'Examen pratique 6h sur équipements réels en conditions opérateur.',
    durationMin: 360,
    thresholdScore: 'Pass/Fail',
    itemsCount: 'Hands-on Lab',
    blueprintVersion: 'v2024',
    readinessPct: 35,
    domains: [
      { name: 'System Configuration & Monitoring', percentage: 15 },
      { name: 'Security & Class of Service', percentage: 15 },
      { name: 'L2 Switching & EVPN', percentage: 35 },
      { name: 'IGP & BGP Routing Implementations', percentage: 35 },
    ],
  },

  // Security NGFW
  {
    id: 'fortinet-fcp',
    code: 'FCF / FCA / FCP',
    name: 'Fortinet NSE / Engage',
    tagline: 'Focus FCP - FortiGate 7.4 Administrator',
    vendor: 'security',
    level: 'professional',
    description: 'Parcours complet de FortiOS : de la gestion des politiques d\'accès UTM jusqu\'à la haute disponibilité HA et tunnels IPsec complexes.',
    durationMin: 70,
    thresholdScore: 'Pass/Fail',
    itemsCount: '30-40',
    blueprintVersion: 'FortiOS 7.4',
    readinessPct: 62,
    domains: [
      { name: '1.0 System & Network Configuration', percentage: 25 },
      { name: '2.0 Firewall Policies & Security Profiles', percentage: 30 },
      { name: '3.0 Authentication, ZTNA & IPsec VPN', percentage: 25 },
      { name: '4.0 High Availability & Diagnostics', percentage: 20 },
    ],
  },
  {
    id: 'paloalto-pcnse',
    code: 'PAN-OS 11.x',
    name: 'Palo Alto Networks PCNSE',
    tagline: 'PCNSE Engineer Certifié Prisé',
    vendor: 'security',
    level: 'professional',
    description: 'Gestion des appliances PAN-OS, configuration App-ID, User-ID, Content-ID et déploiement de profils de décryptage SSL/TLS.',
    durationMin: 80,
    thresholdScore: 'Pass/Fail',
    itemsCount: '75',
    blueprintVersion: 'PAN-OS 11.1',
    readinessPct: 45,
    isEnrolled: true,
    enrolledProgress: 45,
    domains: [
      { name: '1.0 Planning & Core Architecture', percentage: 16 },
      { name: '2.0 Deploy & Configure Core Components', percentage: 20 },
      { name: '3.0 Deploy & Configure Security & NAT Policies', percentage: 22 },
      { name: '4.0 Configure GlobalProtect & User-ID', percentage: 18 },
      { name: '5.0 Manage & Troubleshoot', percentage: 14 },
      { name: '6.0 Panorama & Centralized Management', percentage: 10 },
    ],
  },

  // Cloud & Hybrid
  {
    id: 'aws-ans-c01',
    code: 'ANS-C01',
    name: 'AWS Advanced Networking',
    tagline: 'Specialty',
    vendor: 'cloud',
    level: 'expert',
    description: 'Conception d\'architectures réseau AWS à grande échelle : Transit Gateway, Direct Connect, Cloud WAN, VPC peering et Route 53 Resolver.',
    durationMin: 170,
    thresholdScore: '750/1000',
    itemsCount: '65',
    blueprintVersion: 'ANS-C01',
    readinessPct: 52,
    domains: [
      { name: 'Network Design & Hybrid Connectivity', percentage: 30 },
      { name: 'Network Implementation & Routing', percentage: 26 },
      { name: 'Network Management & Operations', percentage: 20 },
      { name: 'Network Security, Compliance & Governance', percentage: 24 },
    ],
  },
  {
    id: 'azure-az-700',
    code: 'AZ-700',
    name: 'Azure Network Engineer',
    tagline: 'Associate',
    vendor: 'cloud',
    level: 'associate',
    description: 'Implémentation de Virtual WAN, passerelles VPN ExpressRoute, Azure Firewall, Network Security Groups (NSG) et Application Gateway.',
    durationMin: 120,
    thresholdScore: '700/1000',
    itemsCount: '40-60',
    blueprintVersion: 'AZ-700',
    readinessPct: 65,
    domains: [
      { name: 'Design & Implement Core Networking', percentage: 25 },
      { name: 'Design & Implement Routing & Hybrid Links', percentage: 30 },
      { name: 'Design & Implement Security & NSGs', percentage: 25 },
      { name: 'Monitor & Troubleshoot Networks', percentage: 20 },
    ],
  },
];

export const defaultExamQuestionsFr: ExamQuestion[] = [
  {
    id: 34,
    number: 34,
    domain: 'Domaine 3.0 : Connectivité IP (OSPFv2 / OSPFv3 Routing & LSA Filtering)',
    domainTitle: 'DOMAINE 3.0 : CONNECTIVITÉ IP (OSPFV2 / OSPFV3 ROUTING & LSA FILTERING)',
    statement: 'Un ingénieur réseau observe que le routeur R2 n\'installe pas la route externe OSPF 10.250.0.0/16 dans sa table de routage globale (RIB). Après investigation, la base de données LSDB renvoie la télémétrie suivante :',
    cliSnippet: {
      hostname: 'R2#',
      osVersion: 'IOS-XE 17.06.01a',
      command: 'show ip ospf database external 10.250.0.0',
      output: `            OSPF Router with ID (10.0.0.2) (Process ID 1)

                Type-5 AS External Link States

  LS age: 412
  Options: (No TOS-capability, DC, Upward)
  LS Type: AS External Link
  Link State ID: 10.250.0.0 (External Network Number)
  Advertising Router: 192.168.1.1
  LS Seq Number: 80000003
  Checksum: 0x4F12
  Length: 36
  Network Mask: /16
        Metric Type: 2 (Larger than any link state path)
        TOS: 0
        Metric: 20
        Forward Address: 172.16.10.5
        External Route Tag: 65100`,
    },
    hasExhibit: true,
    questionQuery: 'Quelle est la cause la plus probable pour laquelle cette route n\'est pas installée dans la table de routage de R2 ?',
    options: [
      {
        key: 'A',
        text: 'L\'adresse de transfert (Forward Address) 172.16.10.5 n\'est pas accessible via un chemin interne OSPF intrazone ou interzone connu dans la RIB de R2.',
      },
      {
        key: 'B',
        text: 'La valeur de distance administrative de la route externe (110) est supérieure à celle d\'une route EIGRP concurrente présente dans la topologie.',
      },
      {
        key: 'C',
        text: 'Le routeur ASBR 192.168.1.1 se trouve dans une zone Totally Stubby Area (NSSA) qui interdit la génération de LSA Type-5 sans traduction Type-7.',
      },
      {
        key: 'D',
        text: 'Le masque de sous-réseau /16 n\'est pas supporté par la métrique externe de type 2 (E2) sans clause de redistribution explicite de type 1 (E1).',
      },
    ],
    correctAnswer: 'A',
    explanation: 'Conformément à la RFC 2328 section 16.4 (Calcul des routes externes OSPF), si une LSA Type-5 contient une Forward Address (FA) non nulle (différente de 0.0.0.0), le routeur récepteur DOIT obligatoirement avoir une route intra-area ou inter-area vers cette Forward Address dans sa table de routage. Si la FA n\'est pas joignable via OSPF, la route externe Type-5 n\'est pas installée dans la RIB.',
    isFlagged: false,
  },
];

export const defaultExamQuestionsEn: ExamQuestion[] = [
  {
    id: 34,
    number: 34,
    domain: 'Domain 3.0: IP Connectivity (OSPFv2 / OSPFv3 Routing & LSA Filtering)',
    domainTitle: 'DOMAIN 3.0: IP CONNECTIVITY (OSPFV2 / OSPFV3 ROUTING & LSA FILTERING)',
    statement: 'A network engineer notices that router R2 does not install the external OSPF route 10.250.0.0/16 into its global routing table (RIB). Upon investigation, the LSDB returns the following telemetry:',
    cliSnippet: {
      hostname: 'R2#',
      osVersion: 'IOS-XE 17.06.01a',
      command: 'show ip ospf database external 10.250.0.0',
      output: `            OSPF Router with ID (10.0.0.2) (Process ID 1)

                Type-5 AS External Link States

  LS age: 412
  Options: (No TOS-capability, DC, Upward)
  LS Type: AS External Link
  Link State ID: 10.250.0.0 (External Network Number)
  Advertising Router: 192.168.1.1
  LS Seq Number: 80000003
  Checksum: 0x4F12
  Length: 36
  Network Mask: /16
        Metric Type: 2 (Larger than any link state path)
        TOS: 0
        Metric: 20
        Forward Address: 172.16.10.5
        External Route Tag: 65100`,
    },
    hasExhibit: true,
    questionQuery: 'What is the most likely reason why this route is not installed in R2\'s routing table?',
    options: [
      {
        key: 'A',
        text: 'The Forward Address (FA) 172.16.10.5 is not reachable via a known intra-area or inter-area OSPF path in R2\'s RIB.',
      },
      {
        key: 'B',
        text: 'The administrative distance of the external route (110) is higher than that of a competing EIGRP route in the topology.',
      },
      {
        key: 'C',
        text: 'The ASBR 192.168.1.1 is in a Totally Stubby Area (NSSA) which forbids Type-5 LSA generation without Type-7 translation.',
      },
      {
        key: 'D',
        text: 'The /16 subnet mask is not supported by Type 2 external metrics (E2) without an explicit Type 1 (E1) redistribution clause.',
      },
    ],
    correctAnswer: 'A',
    explanation: 'Pursuant to RFC 2328 Section 16.4 (Calculating OSPF External Routes), if a Type-5 LSA contains a non-zero Forward Address (FA != 0.0.0.0), the receiving router MUST have an intra-area or inter-area route to that Forward Address in its routing table. If the FA is not reachable via OSPF, the Type-5 route is not installed into the RIB.',
    isFlagged: false,
  },
];

export const defaultExamQuestions = defaultExamQuestionsFr;

// Helper to generate the remaining 101 questions for full 102 items simulation
export function generateFullExamQuestions(lang: 'fr' | 'en' = 'fr'): ExamQuestion[] {
  const isEn = lang === 'en';
  const list: ExamQuestion[] = [];
  const domains = isEn
    ? [
        'Domain 1.0: Architecture & QoS (SD-Access, SD-WAN, QoS)',
        'Domain 2.0: Virtualization (LISP, VXLAN, Hypervisors)',
        'Domain 3.0: IP Connectivity (OSPFv2 / OSPFv3 Routing & LSA Filtering)',
        'Domain 4.0: Network Assurance (NetFlow, Syslog, SPAN, IP SLA)',
        'Domain 5.0: Security (CoPP, TrustSec, 802.1X, MACsec)',
        'Domain 6.0: Automation & Programmability (Python, EEM, RESTCONF)',
      ]
    : [
        'Domaine 1.0 : Architecture & QoS (SD-Access, SD-WAN, QoS)',
        'Domaine 2.0 : Virtualisation (LISP, VXLAN, Hyperviseurs)',
        'Domaine 3.0 : Connectivité IP (OSPFv2 / OSPFv3 Routing & LSA Filtering)',
        'Domaine 4.0 : Assurance Réseau (NetFlow, Syslog, SPAN, IP SLA)',
        'Domaine 5.0 : Sécurité (CoPP, TrustSec, 802.1X, MACsec)',
        'Domaine 6.0 : Automatisation & Programmabilité (Python, EEM, RESTCONF)',
      ];

  const defaultQ = isEn ? defaultExamQuestionsEn[0] : defaultExamQuestionsFr[0];

  for (let i = 1; i <= 102; i++) {
    if (i === 34) {
      list.push(defaultQ);
      continue;
    }

    const domainIdx = (i - 1) % domains.length;
    const dom = domains[domainIdx];
    const isAnswered = i < 34;
    const isFlagged = [7, 19, 28].includes(i);

    list.push({
      id: i,
      number: i,
      domain: dom,
      domainTitle: dom.toUpperCase(),
      statement: isEn
        ? `Technical scenario #${i}: Convergence analysis and protocol validation. The engineer inspects the switching table and control plane exchanges on the primary transit interface.`
        : `Scénario technique #${i} : Analyse de la convergence et validation du protocole sous-jacent. L'administrateur inspecte la table de commutation et les paquets d'échange sur l'interface principale.`,
      cliSnippet: i % 3 === 0 ? {
        hostname: `R${(i % 4) + 1}#`,
        osVersion: 'IOS-XE 17.09.02',
        command: i % 2 === 0 ? 'show ip bgp summary' : 'show ip route ospf',
        output: i % 2 === 0
          ? `BGP router identifier 10.0.0.${i % 5}, local AS number 65001
BGP table version is 24, main routing table version 24
Neighbor        V           AS MsgRcvd MsgSent   TblVer  InQ OutQ Up/Down  State/PfxRcd
10.1.1.2        4        65002     240     245       24    0    0 04:12:08        12`
          : `Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
O IA  10.${i}.0.0/24 [110/20] via 192.168.1.1, 01:42:15, GigabitEthernet0/0/1`,
      } : undefined,
      questionQuery: isEn
        ? `Which configuration command or design adjustment best resolves the observed behavior according to ENCOR guidelines?`
        : `Quelle action de configuration résout le comportement observé selon les recommandations officielles du référentiel ENCOR ?`,
      options: isEn
        ? [
            { key: 'A', text: `Adjust the hold-down timer parameter to enforce deterministic path selection across inter-node links.` },
            { key: 'B', text: `Enable Loop-Free Alternate (LFA) fast-reroute with alternate path computation independent of composite metrics.` },
            { key: 'C', text: `Deploy an inbound prefix-list filter paired with a route-map on the active process.` },
            { key: 'D', text: `Modify default administrative distance to align installation priority in the global routing table.` },
          ]
        : [
            { key: 'A', text: `Ajuster la valeur du timer de maintien pour forcer une ré-élection déterministe sur le lien inter-nœuds.` },
            { key: 'B', text: `Activer le mécanisme de fast-reroute (LFA) avec calcul de chemin alternatif indépendant de la métrique composite.` },
            { key: 'C', text: `Déployer une politique de filtrage basée sur prefix-list associée à une route-map sur le processus actif.` },
            { key: 'D', text: `Modifier la distance administrative par défaut pour aligner la priorité d'installation dans la table globale.` },
          ],
      correctAnswer: (['A', 'B', 'C', 'D'] as const)[i % 4],
      explanation: isEn
        ? `According to Cisco Enterprise Design standards, validating control plane convergence prevents transient routing loops during topology state transitions.`
        : `L'action recommandée par les guides de conception Cisco Enterprise garantit la stabilité du plan de contrôle tout en évitant les boucles de routage transitoires lors du basculement d'interface.`,
      userAnswer: isAnswered ? (['A', 'B', 'C', 'D'] as const)[(i + 1) % 4] : undefined,
      isFlagged: isFlagged,
    });
  }

  return list;
}

export function getLocalizedLabScenario(lang: 'fr' | 'en' = 'fr'): LabScenario {
  const isEn = lang === 'en';
  return {
    id: 'lab-08',
    track: isEn ? 'CCNA 200-301 • Routing Track' : 'CCNA 200-301 • Track Routage',
    status: isEn ? 'Running' : 'En cours d\'exécution',
    uid: 'LAB-VLAN-ROAS-08',
    title: isEn
      ? 'Lab 08 : 802.1Q Trunk Configuration & Inter-VLAN Routing (Router-on-a-Stick)'
      : 'Lab 08 : Configuration d\'un Trunk 802.1Q et Routage Inter-VLAN (Router-on-a-Stick)',
    description: isEn
      ? 'Configure R1 sub-interfaces fa0/0.10 and fa0/0.20 with dot1q encapsulation, configure switch SW1 in trunk mode and verify ping between PC-A (192.168.10.10) and Server-SRV (192.168.20.50).'
      : 'Configurer R1 avec sous-interfaces fa0/0.10 et fa0/0.20, encapsuler en dot1q, configurer le switch SW1 en trunk et tester le ping entre PC-A (192.168.10.10) et Serveur-SRV (192.168.20.50).',
    tasksCompleted: 3,
    totalTasks: 4,
    meshLatency: '1.4ms',
    passScore: '100%',
    activeDevice: 'R1',
    tasks: [
      {
        id: 'task-1',
        title: isEn ? 'TASK 01 • SW1 VLAN DATABASE' : 'TÂCHE 01 • SW1 VLAN DATABASE',
        description: isEn
          ? 'Create VLAN 10 (Sales) and VLAN 20 (Engineering) on switch SW1.'
          : 'Créer les VLANs 10 (Sales) et 20 (Engineering) sur le switch SW1.',
        specLabel: 'Fa0/1, Fa0/2 Assignment',
        specStatus: 'MATCH OK',
        isValidated: true,
      },
      {
        id: 'task-2',
        title: isEn ? 'TASK 02 • SW1 TRUNK PORT' : 'TÂCHE 02 • SW1 TRUNK PORT',
        description: isEn
          ? 'Configure interface Fa0/24 in 802.1Q Trunk mode towards router R1.'
          : 'Configurer l\'interface Fa0/24 en mode Trunk 802.1Q vers le routeur R1.',
        specLabel: 'switchport mode trunk',
        specStatus: 'UP / FORWARDING',
        isValidated: true,
      },
      {
        id: 'task-3',
        title: isEn ? 'TASK 03 • R1 SUB-INTERFACES' : 'TÂCHE 03 • R1 SUB-INTERFACES',
        description: isEn
          ? 'Configure ROAS routing on R1 (dot1Q 10 and dot1Q 20 with Gateway IPs).'
          : 'Configurer le routage ROAS sur R1 (dot1Q 10 et dot1Q 20 avec IP Gateway).',
        specLabel: 'gi0/0.10 & gi0/0.20',
        specStatus: 'ROUTE INTERFACE OK',
        isValidated: true,
      },
      {
        id: 'task-4',
        title: isEn ? 'TASK 04 • ICMP CONVERGENCE' : 'TÂCHE 04 • ICMP CONVERGENCE',
        description: isEn
          ? 'Verify end-to-end ICMP connectivity (Ping PC-A -> SVR-1 : 192.168.20.50).'
          : 'Vérifier la connectivité ICMP bout-en-bout (Ping PC-A -> SVR-1 : 192.168.20.50).',
        specLabel: 'Echo Request (Type 8)',
        specStatus: isEn ? 'Pending...' : 'En attente...',
        isValidated: false,
      },
    ],
  };
}

export const lab08Scenario: LabScenario = getLocalizedLabScenario('fr');

export const dailyDrills: DailyDrillItem[] = [
  {
    id: 'drill-1',
    category: 'ENCOR • ROUTAGE IP',
    level: 'Avancé',
    levelBadge: 'bg-error-container/40 text-error',
    questionsCount: 15,
    title: 'OSPFv3 Multi-Area LSA Type Analysis',
    description: 'Différenciation LSA Type 1, 2, 3, 8 & 9 dans un environnement multi-instances IPv6 unifié.',
  },
  {
    id: 'drill-2',
    category: 'FONDATION CORE',
    level: 'Chronométré',
    levelBadge: 'bg-tertiary-container/30 text-tertiary',
    timeLimit: '120s max',
    questionsCount: 10,
    title: 'Subnetting Blitz : Calcul CIDR & Masques Wildcard',
    description: 'Entraînement réflexe pour ACLs et OSPF networks sans calculatrice ni brouillon.',
  },
  {
    id: 'drill-3',
    category: 'ARCHITECTURE BGP',
    level: 'Intermédiaire',
    levelBadge: 'bg-surface-container-highest text-on-surface-variant',
    questionsCount: 12,
    title: 'BGP Path Selection & Attributes Matrix',
    description: 'Ordre d\'évaluation canonique : Weight > Local Pref > Originate > AS-Path > Origin > MED.',
  },
];

export const weaknessRadar: WeaknessRadarItem[] = [
  {
    name: 'Spanning-Tree (STP/RSTP/MSTP)',
    score: 61,
    statusLabel: 'Besoin critique de révision',
    actionText: 'Revoir BPDU Guard >',
    actionLink: '#',
    statusType: 'critical',
  },
  {
    name: 'VXLAN & EVPN Overlays',
    score: 68,
    statusLabel: 'Moyen • Compréhension VNI',
    actionText: 'Drill BGP-EVPN >',
    actionLink: '#',
    statusType: 'medium',
  },
  {
    name: 'IPsec VPN & Cryptographie',
    score: 89,
    statusLabel: 'Maîtrisé (Phase 1 & Phase 2)',
    statusType: 'mastered',
  },
  {
    name: 'Routage BGP & OSPF',
    score: 92,
    statusLabel: 'Excellent • Zone de force',
    statusType: 'strong',
  },
];

export const sessionHistory: SessionHistoryItem[] = [
  {
    id: 's1',
    date: 'Hier, 21:40',
    simulation: 'ENCOR Mini-Mock #12',
    score: 86,
    status: 'PASS',
  },
  {
    id: 's2',
    date: '22 Fév',
    simulation: 'PCNSE Security Policies',
    score: 74,
    status: 'FAIL',
  },
  {
    id: 's3',
    date: '20 Fév',
    simulation: 'VLSM Marathon 50',
    score: 91,
    status: 'PASS',
  },
  {
    id: 's4',
    date: '18 Fév',
    simulation: 'QoS & Queuing Mechanics',
    score: 88,
    status: 'PASS',
  },
];
