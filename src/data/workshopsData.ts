import { ccnaD1Cards } from './ccnaD1Data';
import { ccnaD2Cards } from './ccnaD2Data';
import { ccnaD3Cards } from './ccnaD3Data';
import { ccnaD4Cards } from './ccnaD4Data';
import { ccnaD5Cards } from './ccnaD5Data';
import { ccnaD6Cards } from './ccnaD6Data';
import { encorD1Cards } from './encorD1Data';
import { encorD2Cards } from './encorD2Data';
import { encorD3Cards } from './encorD3Data';
import { encorD4Cards } from './encorD4Data';
import { encorD5Cards } from './encorD5Data';
import { encorD6Cards } from './encorD6Data';
import { enarsiD1Cards } from './enarsiD1Data';
import { enarsiD2Cards } from './enarsiD2Data';
import { enarsiD3Cards } from './enarsiD3Data';
import { enarsiD4Cards } from './enarsiD4Data';
import { scorD1Cards } from './scorD1Data';
import { scorD2Cards } from './scorD2Data';
import { scorD3Cards } from './scorD3Data';
import { scorD4Cards } from './scorD4Data';
import { scorD5Cards } from './scorD5Data';
import { scorD6Cards } from './scorD6Data';
import { pcnseD1Cards } from './pcnseD1Data';
import { pcnseD2Cards } from './pcnseD2Data';
import { pcnseD3Cards } from './pcnseD3Data';
import { pcnseD4Cards } from './pcnseD4Data';
import { pcnseD5Cards } from './pcnseD5Data';
import { pcnseD6Cards } from './pcnseD6Data';
import { fortinetFcpCards } from './fortinetFcpData';
// workshopsData.ts - Data for all Ateliers & Labs modules

export interface Flashcard {
  id: string;
  category: string;
  moduleCode?: string; // e.g. 'CCNA-D1'
  moduleName?: string; // e.g. 'Cisco CCNA - 1.0 Network Fundamentals'
  difficulty: 'Fondamental' | 'Intermédiaire' | 'Avancé';
  frontTitle: string;
  frontPrompt: string;
  backTitle: string;
  backContent: string;
  rfcRef?: string;
  cliExample?: string;
  hint: string;
}

export interface ExactTypingChallenge {
  id: string;
  title: string;
  domain: string;
  devicePrompt: string; // e.g. "R1(config-if)#", "SW1(config)#", "R2#"
  taskDescription: string;
  canonicalCommand: string;
  // Patterns / alias lists for tolerant syntax verification
  acceptedPatterns: RegExp[];
  syntaxNotes: string;
  hint: string;
  rfcOrDoc: string;
}

export interface TroubleshootingChallenge {
  id: string;
  title: string;
  category: string;
  symptom: string;
  topologyDesc: string;
  configSnippet: {
    hostname: string;
    lines: {
      lineNum: number;
      text: string;
      isBug: boolean;
    }[];
  };
  bugExplanation: string;
  correctiveCommand: string;
  simulationSuccessLog: string;
}

export interface OrderingExercise {
  id: string;
  title: string;
  category: string;
  context: string;
  steps: {
    id: string;
    label: string;
    details: string;
    correctIndex: number;
  }[];
  explanation: string;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
  category: string;
  hint?: string;
}

export interface MatchingCategory {
  id: string;
  title: string;
  description: string;
  pairs: MatchingPair[];
}

export interface MiniLabStep {
  stepNumber: number;
  title: string;
  instruction: string;
  context: string;
  devicePrompt: string;
  expectedKeywords: string[];
  acceptedRegex: RegExp;
  suggestedCommand: string;
  hint: string;
  verificationOutput: string;
}

export interface GuidedMiniLab {
  id: string;
  title: string;
  subtitle: string;
  level: 'CCNA 200-301' | 'CCNP ENCOR' | 'PCNSE';
  durationEst: string;
  objective: string;
  topologySummary: string;
  steps: MiniLabStep[];
}

/* ==========================================================================
   1. FLASHCARDS DATA
   ========================================================================== */
export const initialFlashcards: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'OSPF & BGP',
    moduleCode: 'ENCOR-D3',
    moduleName: 'Cisco CCNP ENCOR 350-401 - 3.0 Infrastructure',
    difficulty: 'Intermédiaire',
    frontTitle: 'LSA Type 5 & Forward Address',
    frontPrompt: 'Dans quel cas la "Forward Address" (FA) d\'une LSA Type-5 générée par un ASBR est-elle non nulle (≠ 0.0.0.0) ?',
    backTitle: 'Condition RFC 2328 pour Forward Address non nulle',
    backContent: 'La FA est renseignée avec une adresse spécifique si :\n1. OSPF est activé sur l\'interface du next-hop externe.\n2. L\'interface n\'est pas déclarée en passive-interface.\n3. L\'interface utilise un réseau broadcast/non-broadcast (pas point-to-point).\n4. Le réseau du next-hop est inclus dans une commande "network" OSPF.',
    rfcRef: 'RFC 2328 § 16.4',
    cliExample: 'R1# show ip ospf database external 10.0.0.0\nForward Address: 172.16.1.1',
    hint: 'Pensez aux interfaces broadcast partagées avec un routeur non-OSPF.',
  },
  {
    id: 'fc-4',
    category: 'Ports & RFC',
    moduleCode: 'NETPLUS-D1',
    moduleName: 'CompTIA Network+ - 1.0 Networking Concepts',
    difficulty: 'Fondamental',
    frontTitle: 'Ports BGP, RADIUS & NTP',
    frontPrompt: 'Quels sont les numéros de ports de transport (TCP/UDP) pour BGP, RADIUS Authentication et NTP ?',
    backTitle: 'Ports de Transport Standards IANA',
    backContent: '• BGP : Port TCP 179 (connexion point-à-point fiable)\n• RADIUS Authentification : Port UDP 1812 (ou ancien 1645)\n• NTP (Network Time Protocol) : Port UDP 123',
    rfcRef: 'IANA Service Name & Port Numbers',
    hint: 'Deux utilisent UDP, un seul utilise TCP.',
  },
  {
    id: 'fc-5',
    category: 'Automatisation & Cloud',
    moduleCode: 'ENCOR-D6',
    moduleName: 'Cisco CCNP ENCOR 350-401 - 6.0 Automation',
    difficulty: 'Avancé',
    frontTitle: 'RESTCONF vs NETCONF',
    frontPrompt: 'Quelles sont les différences clés d\'encodage et de transport entre NETCONF et RESTCONF ?',
    backTitle: 'Comparatif Protocoles Programmabilité Réseau',
    backContent: '• NETCONF (RFC 6241) : Transport SSH (port 830), Encodage XML uniquement, transactions avec datastores (candidate, running, startup).\n• RESTCONF (RFC 8040) : Transport HTTPS (port 443), Encodage JSON ou XML, verbes HTTP (GET, POST, PUT, PATCH, DELETE) sans datastore candidate.',
    rfcRef: 'RFC 8040 & RFC 6241',
    cliExample: 'curl -k -u cisco:cisco -X GET https://192.168.1.1/restconf/data/ietf-interfaces:interfaces',
    hint: 'Pensez à SSH vs HTTPS et verbes RESTful.',
  },
  {
    id: 'fc-6',
    category: 'OSPF & BGP',
    moduleCode: 'ENARSI-D1',
    moduleName: 'Cisco CCNP ENARSI 300-410 - 1.0 Layer 3 Routing',
    difficulty: 'Intermédiaire',
    frontTitle: 'BGP Path Selection Order',
    frontPrompt: 'Quels sont les 4 premiers critères consécutifs examinés par l\'algorithme de décision de chemin BGP ?',
    backTitle: 'Algorithme BGP (Critères 1 à 4)',
    backContent: '1. Poids (Weight) : Valeur la plus élevée (local Cisco, 0 à 65535).\n2. Préférence Locale (Local Preference) : Valeur la plus élevée (par défaut 100).\n3. Origine locale (Locally originated) : Routes générées par "network" ou "aggregate".\n4. Longueur de l\'AS-Path : Le chemin traversant le moins d\'AS (shortest AS_PATH).',
    rfcRef: 'Cisco BGP Best Path Selection Algorithm',
    hint: 'We Love Origin As (W-L-O-A).',
  },
    ...ccnaD1Cards,
  ...ccnaD2Cards,
  ...ccnaD3Cards,
  {
    id: 'fc-pcnse-01',
    category: 'PCNSE : Palo Alto Networks',
    moduleCode: 'PCNSE-D1',
    moduleName: 'Palo Alto PCNSE - 1.0 Core Concepts & SP3',
    difficulty: 'Intermédiaire',
    frontTitle: 'Architecture Single-Pass Parallel Processing (SP3)',
    frontPrompt: 'Quel est le principe de l\'architecture matérielle Single-Pass SP3 de Palo Alto Networks et comment sépare-t-elle le Control Plane et le Data Plane ?',
    backTitle: 'Architecture SP3 & Séparation CP / DP PAN-OS',
    backContent: '• Single-Pass Software :\n  - Traite chaque paquet une seule fois pour toutes les opérations (App-ID, User-ID, Content-ID, Déchiffrement SSL, Antivirus, IPS).\n  - Évite les chaînages UTM traditionnels qui ré-inspectent les paquets en cascade.\n\n• Parallel Processing Hardware :\n  - Séparation physique complète entre le Control Plane (Management, logging, configuration via CPU dédié) et le Data Plane (Processeurs dédiés réseau, signatures et cryptographie).\n  - Une saturation d\'administration (ex: génération d\'un rapport lourd) ne dégrade jamais le débit de transfert réseau.',
    rfcRef: 'Palo Alto Networks PAN-OS Architecture Whitepaper',
    cliExample: 'admin@PA-3220> show system resources\nadmin@PA-3220> show running resource-monitor',
    hint: 'Single-Pass = 1 seule inspection complète ; Processeurs indépendants pour CP et DP.',
  },
  {
    id: 'fc-pcnse-02',
    category: 'PCNSE : Palo Alto Networks',
    moduleCode: 'PCNSE-D3',
    moduleName: 'Palo Alto PCNSE - 3.0 Security Profiles & App-ID',
    difficulty: 'Avancé',
    frontTitle: 'App-ID vs Ports et Ordre d\'Inspection des Règles',
    frontPrompt: 'Sur un firewall Palo Alto PAN-OS, que se passe-t-il si une règle autorise "web-browsing" sur le port 80/tcp mais que le flux bascule ensuite en SSL/TLS sur ce même port ?',
    backTitle: 'Mécanisme d\'Identification Continue App-ID',
    backContent: '• App-ID ré-évalue le trafic de manière dynamique :\n  - L\'identification d\'application commence par le port et la poignée de main initiale.\n  - Si l\'application change en cours de session (ex: tunnel SSL ou transfert BitTorrent masqué sur le port 80), l\'App-ID met à jour l\'application identifiée (ex: "ssl").\n  - Le pare-feu ré-évalue aussitôt la base des règles de sécurité de haut en bas.\n  - Si aucune règle n\'autorise explicitement l\'application "ssl" sur ce port ou avec déchiffrement, la session est immédiatement interrompue (Drop).',
    rfcRef: 'PAN-OS Security Policy Guide',
    cliExample: 'admin@PA-3220> show session all filter application web-browsing',
    hint: 'App-ID est dynamique et ré-évalue les règles si la nature du flux applicatif change.',
  },
  {
    id: 'fc-secplus-01',
    category: 'Security+ : Cyber Threat & Auth',
    moduleCode: 'SECPLUS-D4',
    moduleName: 'CompTIA Security+ SY0-701 - 4.0 Security Operations',
    difficulty: 'Fondamental',
    frontTitle: 'SAML 2.0 vs OAuth 2.0 vs OIDC (OpenID Connect)',
    frontPrompt: 'Distinguez précisément les rôles de SAML 2.0, OAuth 2.0 et OpenID Connect (OIDC) en matière d\'Authentification et d\'Autorisation.',
    backTitle: 'Protocoles de Fédération d\'Identité',
    backContent: '• SAML 2.0 (Security Assertion Markup Language) :\n  - Protocole d\'AUTHENTIFICATION et de SSO d\'entreprise (assertions XML entre Identity Provider IdP et Service Provider SP).\n\n• OAuth 2.0 (RFC 6749) :\n  - Framework d\'AUTORISATION (délégation d\'accès via Access Tokens / Bearer Tokens JSON sans divulguer le mot de passe).\n  - Ne fournit pas d\'authentification native de l\'utilisateur.\n\n• OpenID Connect (OIDC) :\n  - Couche d\'AUTHENTIFICATION standardisée construite AU-DESSUS d\'OAuth 2.0.\n  - Introduit l\'ID Token au format JWT (JSON Web Token) pour valider l\'identité de l\'utilisateur.',
    rfcRef: 'RFC 6749 (OAuth 2.0) & OpenID Connect Core 1.0',
    hint: 'SAML = Auth XML d\'entreprise. OAuth = Autorisation (Access Token). OIDC = Authentification au-dessus d\'OAuth (ID Token JWT).',
  },
  {
    id: 'fc-jncia-01',
    category: 'JNCIA : Juniper Junos OS',
    moduleCode: 'JNCIA-D1',
    moduleName: 'Juniper JNCIA-Junos JN0-105 - 1.0 Junos Architecture',
    difficulty: 'Fondamental',
    frontTitle: 'Routing Engine (RE) vs Packet Forwarding Engine (PFE)',
    frontPrompt: 'Quelle est la séparation fonctionnelle stricte entre le RE et le PFE sur un équipement Juniper sous Junos OS ?',
    backTitle: 'Architecture Junos Dual-Engine',
    backContent: '• Routing Engine (RE - Plan de Contrôle) :\n  - Tourne sur un processeur x86 standard sous FreeBSD.\n  - Calcule les tables de routage (Routing Table `inet.0`), gère les protocoles (OSPF, BGP, IS-IS), l\'interface utilisateur (CLI Junos) et la maintenance système.\n  - Compile et injecte la Forwarding Table (FIB) vers le PFE.\n\n• Packet Forwarding Engine (PFE - Plan de Données) :\n  - Construit sur des ASICs propriétaires programmables haute vitesse (Trio, Express).\n  - Effectue la commutation de paquets en temps réel, applique les filtres stateless de pare-feu et la Class of Service (CoS) sans solliciter le CPU du RE.',
    rfcRef: 'Juniper Networks Junos OS Architecture Guide',
    cliExample: 'user@router> show chassis routing-engine\nuser@router> show chassis fpc',
    hint: 'RE = cerveau/calcul (OSPF, BGP, CLI) ; PFE = muscles/ASICs pour le transfert ultra-rapide.',
  },
  {
    id: 'fc-jncia-02',
    category: 'JNCIA : Juniper Junos OS',
    moduleCode: 'JNCIA-D2',
    moduleName: 'Juniper JNCIA-Junos JN0-105 - 2.0 User Interfaces',
    difficulty: 'Fondamental',
    frontTitle: 'Sécurité de Configuration : "commit confirmed"',
    frontPrompt: 'Quel est le fonctionnement précis de la commande "commit confirmed [minutes]" sur Junos OS et pourquoi est-elle critique lors d\'interventions à distance ?',
    backTitle: 'Mécanisme Rollback Automatique Junos',
    backContent: '• Fonctionnement :\n  - Applique immédiatement les modifications de la configuration candidate à la running-configuration active.\n  - Déclenche un compte à rebours automatique (10 minutes par défaut si aucun délai n\'est spécifié).\n  - Si l\'administrateur ne tape pas un second `commit` confirmatoire avant l\'expiration du délai, Junos effectue automatiquement un `rollback 1` et réactive l\'ancienne configuration fonctionnelle.\n\n• Bénéfice opérationnel critique :\n  - Évite le blocage ou la rupture d\'accès définitive (lock-out) si une mauvaise commande coupe le lien réseau de gestion (SSH).',
    rfcRef: 'Junos OS Configuration Management',
    cliExample: 'user@router# commit confirmed 5\ncommit confirmed will be automatically rolled back in 5 minutes\n\nuser@router# commit\ncommit complete',
    hint: 'Applique avec un compte à rebours (10 min par défaut) et rollback auto si non re-confirmé.',
  },
  ...ccnaD4Cards,
  ...ccnaD5Cards,
  ...ccnaD6Cards,
  ...encorD1Cards,
  ...encorD2Cards,
  ...encorD3Cards,
  ...encorD4Cards,
  ...encorD5Cards,
  ...encorD6Cards,
  ...enarsiD1Cards,
  ...enarsiD2Cards,
  ...enarsiD3Cards,
  ...enarsiD4Cards,
  ...scorD1Cards,
  ...scorD2Cards,
  ...scorD3Cards,
  ...scorD4Cards,
  ...scorD5Cards,
  ...scorD6Cards,
  ...pcnseD1Cards,
  ...pcnseD2Cards,
  ...pcnseD3Cards,
  ...pcnseD4Cards,
  ...pcnseD5Cards,
  ...pcnseD6Cards,
  ...fortinetFcpCards,
];

/* ==========================================================================
   2. SAISIE EXACTE (CLI SYNTAX DRILL) DATA
   ========================================================================== */
export const initialExactChallenges: ExactTypingChallenge[] = [
  {
    id: 'drill-1',
    title: 'Configuration d\'un Port Trunk 802.1Q avec filtrage VLAN',
    domain: 'Commutation Cisco Catalyst',
    devicePrompt: 'SW1(config-if)#',
    taskDescription:
      'Autorisez expressément les VLANs 10, 20 et 30 sur le trunk actuel en écrasant la liste précédente.',
    canonicalCommand: 'switchport trunk allowed vlan 10,20,30',
    syntaxNotes:
      'Accepte les abréviations Cisco usuelles (sw tr all vl 10,20,30 ou switchport trunk allowed vlan 10, 20, 30).',
    hint: 'La commande commence par switchport trunk allowed vlan...',
    rfcOrDoc: 'Cisco Command Reference - switchport trunk allowed',
    acceptedPatterns: [
      /^(switchport|sw)\s+(trunk|tr)\s+(allowed|all)\s+(vlan|vl)\s+10\s*,\s*20\s*,\s*30$/i,
      /^(switchport|sw)\s+(trunk|tr)\s+(allowed|all)\s+(vlan|vl)\s+10-30$/i,
    ],
  },
  {
    id: 'drill-2',
    title: 'Activation d\'OSPFv2 avec Wildcard Mask',
    domain: 'Routage IPv4 OSPF',
    devicePrompt: 'R1(config-router)#',
    taskDescription:
      'Activez OSPF pour le sous-réseau 192.168.10.0/24 dans la zone dorsale (Area 0).',
    canonicalCommand: 'network 192.168.10.0 0.0.0.255 area 0',
    syntaxNotes:
      'Note : OSPF requiert impérativement un masque générique inversé (wildcard mask 0.0.0.255) et non un masque de sous-réseau.',
    hint: 'Format : network <ip> <wildcard> area <area-id>',
    rfcOrDoc: 'RFC 2328 OSPFv2',
    acceptedPatterns: [
      /^(network|net)\s+192\.168\.10\.0\s+0\.0\.0\.255\s+(area|ar)\s+0$/i,
      /^(network|net)\s+192\.168\.10\.0\s+0\.0\.0\.255\s+(area|ar)\s+0\.0\.0\.0$/i,
    ],
  },
  {
    id: 'drill-3',
    title: 'Route Statique IPv4 par Défaut',
    domain: 'Routage Statique',
    devicePrompt: 'R1(config)#',
    taskDescription:
      'Configurez la route par défaut (Gateway of Last Resort) passant par le next-hop 172.16.1.254.',
    canonicalCommand: 'ip route 0.0.0.0 0.0.0.0 172.16.1.254',
    syntaxNotes:
      'Le préfixe et le masque sont 0.0.0.0 0.0.0.0.',
    hint: 'ip route 0.0.0.0 0.0.0.0 <next-hop>',
    rfcOrDoc: 'Cisco IOS IP Routing: Protocol-Independent',
    acceptedPatterns: [
      /^ip\s+(route|ro)\s+0\.0\.0\.0\s+0\.0\.0\.0\s+172\.16\.1\.254$/i,
    ],
  },
  {
    id: 'drill-4',
    title: 'Sécurisation Port-Security (Maximum d\'adresses MAC)',
    domain: 'Sécurité Commutation L2',
    devicePrompt: 'SW1(config-if)#',
    taskDescription:
      'Fixez à 2 le nombre maximum d\'adresses MAC autorisées sur ce port d\'accès avec Port-Security.',
    canonicalCommand: 'switchport port-security maximum 2',
    syntaxNotes:
      'Accepte "sw port max 2" ou syntaxe complète.',
    hint: 'switchport port-security maximum <nombre>',
    rfcOrDoc: 'Cisco Port Security Configuration Guide',
    acceptedPatterns: [
      /^(switchport|sw)\s+(port-security|port)\s+(maximum|max)\s+2$/i,
    ],
  },
  {
    id: 'drill-5',
    title: 'Inspection des Voisins OSPF',
    domain: 'Vérification & Troubleshooting',
    devicePrompt: 'R1#',
    taskDescription:
      'Affichez l\'état de contiguïté, le Router ID et l\'adresse IP de tous les voisins OSPF.',
    canonicalCommand: 'show ip ospf neighbor',
    syntaxNotes:
      'Accepte "sh ip ospf nei", "show ip ospf neighbor", "sh ip ospf neighbor detail".',
    hint: 'show ip ospf neighbor',
    rfcOrDoc: 'Cisco IOS OSPF Command Reference',
    acceptedPatterns: [
      /^(show|sh)\s+ip\s+ospf\s+(neighbor|nei|neigh)(\s+detail)?$/i,
    ],
  },
];

/* ==========================================================================
   3. TROUBLESHOOTING / FIND THE BUG DATA
   ========================================================================== */
export const initialTroubleshootings: TroubleshootingChallenge[] = [
  {
    id: 'tb-1',
    title: 'Voisin OSPF bloqué en état EXSTART / EXCHANGE',
    category: 'Routage Dynamique',
    symptom:
      'R1 et R2 échangent des paquets Hello et passent en 2-WAY, mais la relation de voisinage reste bloquée en EXSTART sans jamais atteindre FULL.',
    topologyDesc: 'Lien direct GigabitEthernet0/0 entre R1 et R2.',
    configSnippet: {
      hostname: 'R1',
      lines: [
        { lineNum: 1, text: 'interface GigabitEthernet0/0', isBug: false },
        { lineNum: 2, text: ' ip address 10.1.1.1 255.255.255.252', isBug: false },
        { lineNum: 3, text: ' ip mtu 1400', isBug: true },
        { lineNum: 4, text: ' ip ospf 1 area 0', isBug: false },
        { lineNum: 5, text: ' no shutdown', isBug: false },
        { lineNum: 6, text: '!', isBug: false },
        { lineNum: 7, text: 'router ospf 1', isBug: false },
        { lineNum: 8, text: ' router-id 1.1.1.1', isBug: false },
      ],
    },
    bugExplanation:
      'Ligne 3 : L\'interface Gi0/0 de R1 a un MTU configuré à 1400 octets alors que R2 est à la valeur par défaut de 1500 octets. Lors de la phase EXSTART, les routeurs OSPF s\'échangent des paquets DBD (Database Description) dont la taille dépasse 1400 octets, provoquant un rejet silencieux de R1.',
    correctiveCommand: 'ip mtu 1500  (ou : ip ospf mtu-ignore)',
    simulationSuccessLog:
      '*Mar  1 00:08:42.112: %OSPF-5-ADJCHANGE: Process 1, Nbr 2.2.2.2 on GigabitEthernet0/0 from EXSTART to FULL, Done\n*Mar  1 00:08:43.010: %SYS-5-CONFIG_I: MTU convergence verified (1500 bytes on both peers).',
  },
  {
    id: 'tb-2',
    title: 'Inversion de Masque OSPF (Subnet Mask vs Wildcard Mask)',
    category: 'Configuration OSPF',
    symptom:
      'Le sous-réseau LAN 192.168.1.0/24 n\'est pas injecté dans le processus OSPF et les routes ne sont pas diffusées.',
    topologyDesc: 'Routeur d\'agence Cisco ISR 4331.',
    configSnippet: {
      hostname: 'R_BRANCH',
      lines: [
        { lineNum: 1, text: 'router ospf 10', isBug: false },
        { lineNum: 2, text: ' router-id 192.168.1.1', isBug: false },
        { lineNum: 3, text: ' network 192.168.1.0 255.255.255.0 area 0', isBug: true },
        { lineNum: 4, text: ' passive-interface GigabitEthernet0/0/1', isBug: false },
      ],
    },
    bugExplanation:
      'Ligne 3 : L\'administrateur a renseigné le masque de sous-réseau 255.255.255.0 au lieu du masque générique inversé (Wildcard Mask) 0.0.0.255. OSPF n\'active le protocole que sur les adresses correspondant exactement au bit 0 de la wildcard.',
    correctiveCommand: 'no network 192.168.1.0 255.255.255.0 area 0\nnetwork 192.168.1.0 0.0.0.255 area 0',
    simulationSuccessLog:
      'R_BRANCH(config-router)# network 192.168.1.0 0.0.0.255 area 0\n*Mar  1 00:12:15.890: %OSPF-5-ADJCHANGE: Interface GigabitEthernet0/0/0 active in Area 0.',
  },
  {
    id: 'tb-3',
    title: 'Ordre erroné dans une Liste de Contrôle d\'Accès (ACL)',
    category: 'Sécurité d\'Infrastructure',
    symptom:
      'Les utilisateurs du réseau 10.10.0.0/16 ne peuvent plus accéder au serveur HTTPS (port 443), malgré la présence apparente d\'une règle d\'autorisation.',
    topologyDesc: 'Firewall de bordure Cisco ASA / Routeur IOS.',
    configSnippet: {
      hostname: 'GW-EDGE',
      lines: [
        { lineNum: 1, text: 'ip access-list extended INBOUND_SEC', isBug: false },
        { lineNum: 2, text: ' permit udp any any eq domain', isBug: false },
        { lineNum: 3, text: ' deny ip 10.10.0.0 0.0.255.255 any', isBug: true },
        { lineNum: 4, text: ' permit tcp 10.10.0.0 0.0.255.255 host 192.168.50.10 eq 443', isBug: false },
        { lineNum: 5, text: ' deny ip any any', isBug: false },
      ],
    },
    bugExplanation:
      'Ligne 3 : Les ACLs Cisco s\'évaluent séquentiellement de haut en bas selon la règle "First Match Wins". La règle "deny ip 10.10.0.0 0.0.255.255 any" en ligne 3 attrape tout le trafic IP de ce réseau AVANT que la ligne 4 n\'autorise le port 443.',
    correctiveCommand: 'Placer la ligne "permit tcp 10.10.0.0 ... eq 443" en tête d\'ACL (ex: séquence 25 avant la ligne deny 30).',
    simulationSuccessLog:
      'GW-EDGE# show access-lists INBOUND_SEC\nExtended IP access list INBOUND_SEC\n 20 permit udp any any eq 53\n 25 permit tcp 10.10.0.0 0.0.255.255 host 192.168.50.10 eq 443 (412 matches)\n 30 deny ip 10.10.0.0 0.0.255.255 any',
  },
  {
    id: 'tb-4',
    title: 'Discordance de VLAN Natif sur lien Trunk (CDP Warning)',
    category: 'Commutation Layer 2',
    symptom:
      'Le switch SW1 logge en continu le message : "%CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch discovered on GigabitEthernet0/1 (99), with SW2 GigabitEthernet0/1 (1)."',
    topologyDesc: 'Lien Trunk 802.1Q entre SW1 et SW2.',
    configSnippet: {
      hostname: 'SW1',
      lines: [
        { lineNum: 1, text: 'interface GigabitEthernet0/1', isBug: false },
        { lineNum: 2, text: ' description Uplink to SW2', isBug: false },
        { lineNum: 3, text: ' switchport mode trunk', isBug: false },
        { lineNum: 4, text: ' switchport trunk native vlan 99', isBug: true },
        { lineNum: 5, text: ' switchport trunk allowed vlan 10,20,99', isBug: false },
      ],
    },
    bugExplanation:
      'Ligne 4 : SW1 a défini son VLAN natif sur 99, alors que SW2 est resté sur la valeur par défaut (VLAN 1). Cette discordance entraîne des fuites de trafic inter-VLAN et l\'inactivation par Spanning-Tree PVST+ du port pour éviter une boucle.',
    correctiveCommand: 'Harmoniser le VLAN natif sur SW2 : "switchport trunk native vlan 99" ou remettre 1 sur SW1.',
    simulationSuccessLog:
      'SW2(config-if)# switchport trunk native vlan 99\n*Mar  1 00:15:33.201: %CDP-4-NATIVE_VLAN_MISMATCH: Resolved. Spanning-tree unblocking port Gi0/1.',
  },
];

/* ==========================================================================
   4. EXERCICES D'ORDONNANCEMENT (TIMELINE & BOOT ORDER) DATA
   ========================================================================== */
export const initialOrderingExercises: OrderingExercise[] = [
  {
    id: 'order-1',
    title: 'Séquence de Démarrage d\'un Commutateur Cisco (Switch Boot Sequence)',
    category: 'Hardware & Architecture IOS',
    context:
      'Ordonnez chronologiquement les étapes physiques et logicielles lors de la mise sous tension d\'un commutateur Cisco Catalyst.',
    steps: [
      {
        id: 's-1',
        label: 'Exécution du POST (Power-On Self-Test)',
        details: 'Vérification du processeur, des sous-systèmes mémoire DRAM, Flash et contrôleurs ASIC.',
        correctIndex: 0,
      },
      {
        id: 's-2',
        label: 'Initialisation du Bootloader (chargeur de démarrage)',
        details: 'Le microcode de la mémoire ROM initialise les registres CPU de base et localise le système d\'exploitation.',
        correctIndex: 1,
      },
      {
        id: 's-3',
        label: 'Chargement de l\'image Cisco IOS depuis la Flash vers la RAM',
        details: 'Le Bootloader décompresse et charge l\'image .bin stockée dans la mémoire Flash vers la mémoire vive.',
        correctIndex: 2,
      },
      {
        id: 's-4',
        label: 'Recherche et chargement de la startup-config depuis la NVRAM',
        details: 'L\'IOS vérifie le registre de configuration (0x2102) et copie le fichier de configuration vers la running-config en RAM.',
        correctIndex: 3,
      },
      {
        id: 's-5',
        label: 'Affichage de l\'invite User EXEC (Switch>)',
        details: 'Si un fichier de configuration existe, l\'invite personnalisée ou par défaut apparaît pour l\'administrateur.',
        correctIndex: 4,
      },
    ],
    explanation:
      'Séquence standard Cisco : 1. POST (ROM) -> 2. Bootloader (ROM) -> 3. Chargement IOS (Flash vers RAM) -> 4. Chargement startup-config (NVRAM vers RAM) -> 5. Invite User EXEC.',
  },
  {
    id: 'order-2',
    title: 'Processus d\'Obtention d\'Adresse IP via DHCP (DORA)',
    category: 'Services Réseau IP',
    context:
      'Remettez dans l\'ordre strict les quatre échanges de paquets du protocole DHCPv4 entre un client et un serveur.',
    steps: [
      {
        id: 'd-1',
        label: 'DHCP DISCOVER',
        details: 'Le client diffuse une requête broadcast (255.255.255.255, port UDP 67) pour localiser un serveur DHCP actif.',
        correctIndex: 0,
      },
      {
        id: 'd-2',
        label: 'DHCP OFFER',
        details: 'Le serveur DHCP réserve une adresse IP libre et envoie une proposition contenant l\'IP, le masque, le lease time et la passerelle.',
        correctIndex: 1,
      },
      {
        id: 'd-3',
        label: 'DHCP REQUEST',
        details: 'Le client diffuse un message acceptant l\'offre du serveur choisi et déclinant implicitement les autres offres potentielles.',
        correctIndex: 2,
      },
      {
        id: 'd-4',
        label: 'DHCP ACK (Acknowledge)',
        details: 'Le serveur confirme formellement le bail et finalise l\'assignation des paramètres réseau au client.',
        correctIndex: 3,
      },
    ],
    explanation:
      'Acronyme mnémotechnique universel DORA : Discover -> Offer -> Request -> Acknowledge (RFC 2131).',
  },
  {
    id: 'order-3',
    title: 'Machine à États de Voisinage OSPF (OSPF Neighbor States)',
    category: 'Routage Dynamique',
    context:
      'Ordonnez chronologiquement les 7 états traversés par deux routeurs OSPF pour former une contiguïté complète (Adjacency).',
    steps: [
      {
        id: 'o-1',
        label: '1. DOWN',
        details: 'Aucun paquet Hello reçu du voisin. Début du processus.',
        correctIndex: 0,
      },
      {
        id: 'o-2',
        label: '2. INIT',
        details: 'Un paquet Hello a été reçu du voisin, mais le Router ID local n\'y figure pas encore.',
        correctIndex: 1,
      },
      {
        id: 'o-3',
        label: '3. 2-WAY',
        details: 'Communication bidirectionnelle confirmée (le routeur voit son propre RID dans le Hello). Élection du DR/BDR.',
        correctIndex: 2,
      },
      {
        id: 'o-4',
        label: '4. EXSTART',
        details: 'Négociation de la relation Maître / Esclave et choix du numéro de séquence DBD initial.',
        correctIndex: 3,
      },
      {
        id: 'o-5',
        label: '5. EXCHANGE',
        details: 'Échange des paquets Database Description (DBD) décrivant le contenu sommaire des LSDB.',
        correctIndex: 4,
      },
      {
        id: 'o-6',
        label: '6. LOADING',
        details: 'Envoi de Link-State Requests (LSR) pour les LSA manquantes et réception des Link-State Updates (LSU).',
        correctIndex: 5,
      },
      {
        id: 'o-7',
        label: '7. FULL',
        details: 'Bases de données LSDB strictement synchronisées. Routage opérationnel.',
        correctIndex: 6,
      },
    ],
    explanation:
      'Machine d\'état standard RFC 2328 : Down -> Init -> 2-Way -> ExStart -> Exchange -> Loading -> Full.',
  },
  {
    id: 'order-4',
    title: 'Établissement d\'une Connexion TCP (3-Way Handshake)',
    category: 'Couche Transport TCP/IP',
    context:
      'Classez les segments échangés et les transitions d\'état lors de l\'établissement d\'une connexion TCP.',
    steps: [
      {
        id: 't-1',
        label: 'Client envoie SYN (ISN = x)',
        details: 'Le client envoie un paquet avec le flag SYN actif et initialise son numéro de séquence initial (ISN = x).',
        correctIndex: 0,
      },
      {
        id: 't-2',
        label: 'Serveur répond SYN-ACK (ISN = y, ACK = x + 1)',
        details: 'Le serveur accepte la demande, initialise son propre ISN = y et acquitte le numéro client reçu avec x + 1.',
        correctIndex: 1,
      },
      {
        id: 't-3',
        label: 'Client acquitte avec ACK (ACK = y + 1)',
        details: 'Le client confirme la réception avec un flag ACK actif et le numéro attendu y + 1.',
        correctIndex: 2,
      },
      {
        id: 't-4',
        label: 'Transition en état ESTABLISHED',
        details: 'Le socket bidirectionnel est ouvert et la transmission des données de charge utile peut commencer.',
        correctIndex: 3,
      },
    ],
    explanation:
      '3-Way Handshake TCP (RFC 793) : SYN -> SYN-ACK -> ACK -> ESTABLISHED.',
  },
];

/* ==========================================================================
   5. ATELIERS D'APPARIEMENT (MATCHING GAMES) DATA
   ========================================================================== */
export const matchingCategories: MatchingCategory[] = [
  {
    id: 'cat-ad',
    title: 'Distances Administratives (AD) Cisco',
    description: 'Reliez chaque source de route à sa distance administrative par défaut dans Cisco IOS.',
    pairs: [
      { id: 'ad-1', left: 'Connected (Directement connecté)', right: '0', category: 'ad' },
      { id: 'ad-2', left: 'Static Route (Route statique)', right: '1', category: 'ad' },
      { id: 'ad-3', left: 'eBGP (External BGP)', right: '20', category: 'ad' },
      { id: 'ad-4', left: 'EIGRP (Interne)', right: '90', category: 'ad' },
      { id: 'ad-5', left: 'OSPF', right: '110', category: 'ad' },
      { id: 'ad-6', left: 'RIPv2', right: '120', category: 'ad' },
      { id: 'ad-7', left: 'iBGP (Internal BGP)', right: '200', category: 'ad' },
    ],
  },
  {
    id: 'cat-ports',
    title: 'Ports & Protocoles Réseau Essentiels',
    description: 'Associez chaque protocole ou service à son port de transport standard (TCP/UDP).',
    pairs: [
      { id: 'p-1', left: 'BGP (Border Gateway Protocol)', right: 'TCP 179', category: 'ports' },
      { id: 'p-2', left: 'DNS (Domain Name System)', right: 'UDP/TCP 53', category: 'ports' },
      { id: 'p-3', left: 'NTP (Network Time Protocol)', right: 'UDP 123', category: 'ports' },
      { id: 'p-4', left: 'SNMP (Traps / Requêtes)', right: 'UDP 161 / 162', category: 'ports' },
      { id: 'p-5', left: 'RADIUS Authentication', right: 'UDP 1812', category: 'ports' },
      { id: 'p-6', left: 'LDAPS (Secure LDAP)', right: 'TCP 636', category: 'ports' },
      { id: 'p-7', left: 'SSH (Secure Shell)', right: 'TCP 22', category: 'ports' },
    ],
  },
  {
    id: 'cat-lsa',
    title: 'Types de LSA OSPFv2 (RFC 2328)',
    description: 'Associez chaque type de Link-State Advertisement (LSA) à son nom officiel et générateur.',
    pairs: [
      { id: 'lsa-1', left: 'LSA Type 1', right: 'Router LSA (Tout routeur interne)', category: 'lsa' },
      { id: 'lsa-2', left: 'LSA Type 2', right: 'Network LSA (Désigné par le DR)', category: 'lsa' },
      { id: 'lsa-3', left: 'LSA Type 3', right: 'Summary LSA (Généré par l\'ABR)', category: 'lsa' },
      { id: 'lsa-4', left: 'LSA Type 4', right: 'ASBR Summary LSA (Par l\'ABR vers l\'ASBR)', category: 'lsa' },
      { id: 'lsa-5', left: 'LSA Type 5', right: 'AS External LSA (Généré par l\'ASBR)', category: 'lsa' },
      { id: 'lsa-6', left: 'LSA Type 7', right: 'NSSA External LSA (Dans une zone NSSA)', category: 'lsa' },
    ],
  },
  {
    id: 'cat-ipv6',
    title: 'Adresses Multicast Spéciales IPv6',
    description: 'Reliez chaque adresse IPv6 multicast à sa fonction ou son groupe d\'écouteurs.',
    pairs: [
      { id: 'ip6-1', left: 'FF02::1', right: 'Tous les nœuds du lien local (All Nodes)', category: 'ipv6' },
      { id: 'ip6-2', left: 'FF02::2', right: 'Tous les routeurs du lien local (All Routers)', category: 'ipv6' },
      { id: 'ip6-3', left: 'FF02::5', right: 'Tous les routeurs OSPFv3', category: 'ipv6' },
      { id: 'ip6-4', left: 'FF02::6', right: 'Routeurs OSPFv3 désignés (DR / BDR)', category: 'ipv6' },
      { id: 'ip6-5', left: 'FF02::1:FF00:0/104', right: 'Adresse de nœud sollicité (Solicited-Node)', category: 'ipv6' },
    ],
  },
];

/* ==========================================================================
   6. SCÉNARIOS PRATIQUES GUIDÉS (MINI-LABS PAS À PAS) DATA
   ========================================================================== */
export const guidedMiniLabs: GuidedMiniLab[] = [
  {
    id: 'lab-port-sec',
    title: 'Sécurisation d\'un Commutateur d\'Accès : Port-Security & Sticky MAC',
    subtitle: 'Protection contre l\'usurpation MAC et limitation physique de port',
    level: 'CCNA 200-301',
    durationEst: '12 min',
    objective:
      'Configurer le port FastEthernet0/1 du switch d\'étage SW1 pour n\'autoriser qu\'une seule machine dont l\'adresse MAC sera apprise dynamiquement (sticky) et bloquer définitivement le port en cas d\'intrusion (violation shutdown).',
    topologySummary: 'PC1 (MAC 0050.7966.6800) connecté à SW1 port Fa0/1.',
    steps: [
      {
        stepNumber: 1,
        title: 'Passer le port en mode Accès statique',
        instruction:
          'Positionnez le port FastEthernet0/1 en mode accès inconditionnel (la fonction Port-Security ne peut être activée sur un port dynamique ou trunk).',
        context: 'Mode de configuration d\'interface sur Cisco IOS.',
        devicePrompt: 'SW1(config-if)#',
        expectedKeywords: ['switchport', 'mode', 'access'],
        acceptedRegex: /^(switchport|sw)\s+(mode|mod)\s+(access|acc)$/i,
        suggestedCommand: 'switchport mode access',
        hint: 'Tapez : switchport mode access',
        verificationOutput:
          'SW1(config-if)# switchport mode access\n% Port Fa0/1 set to static access mode.',
      },
      {
        stepNumber: 2,
        title: 'Activer la fonctionnalité Port-Security',
        instruction:
          'Activez la fonction globale Port-Security sur l\'interface Fa0/1.',
        context: 'Activation requise avant de définir les paramètres avancés.',
        devicePrompt: 'SW1(config-if)#',
        expectedKeywords: ['switchport', 'port-security'],
        acceptedRegex: /^(switchport|sw)\s+(port-security|port)$/i,
        suggestedCommand: 'switchport port-security',
        hint: 'Tapez : switchport port-security',
        verificationOutput:
          'SW1(config-if)# switchport port-security\n% Port-Security enabled on FastEthernet0/1.',
      },
      {
        stepNumber: 3,
        title: 'Activer l\'apprentissage automatique Sticky MAC',
        instruction:
          'Configurez l\'apprentissage automatique de l\'adresse MAC de la première trame reçue et son enregistrement persistant dans la configuration (sticky).',
        context: 'Évite de saisir manuellement les adresses MAC physiques.',
        devicePrompt: 'SW1(config-if)#',
        expectedKeywords: ['switchport', 'port-security', 'mac-address', 'sticky'],
        acceptedRegex: /^(switchport|sw)\s+(port-security|port)\s+(mac-address|mac)\s+sticky$/i,
        suggestedCommand: 'switchport port-security mac-address sticky',
        hint: 'Tapez : switchport port-security mac-address sticky',
        verificationOutput:
          'SW1(config-if)# switchport port-security mac-address sticky\n% Sticky MAC address learning activated.',
      },
      {
        stepNumber: 4,
        title: 'Définir le mode de violation sur Shutdown',
        instruction:
          'Définissez l\'action en cas de violation : le port doit être immédiatement désactivé (état error-disabled) et consigné dans le journal syslog.',
        context: 'Les trois modes possibles sont protect, restrict et shutdown.',
        devicePrompt: 'SW1(config-if)#',
        expectedKeywords: ['switchport', 'port-security', 'violation', 'shutdown'],
        acceptedRegex: /^(switchport|sw)\s+(port-security|port)\s+(violation|viol)\s+(shutdown|shut)$/i,
        suggestedCommand: 'switchport port-security violation shutdown',
        hint: 'Tapez : switchport port-security violation shutdown',
        verificationOutput:
          'SW1(config-if)# switchport port-security violation shutdown\n% Violation mode set to Shutdown (err-disable on intrusion).',
      },
      {
        stepNumber: 5,
        title: 'Vérifier l\'état opérationnel de Port-Security',
        instruction:
          'Affichez l\'état détaillé de Port-Security sur l\'interface FastEthernet0/1.',
        context: 'Sortie de commande en mode privilégié.',
        devicePrompt: 'SW1#',
        expectedKeywords: ['show', 'port-security', 'interface'],
        acceptedRegex: /^(show|sh)\s+(port-security|port)\s+(interface|int)\s+fa(stethernet)?0\/1$/i,
        suggestedCommand: 'show port-security interface fa0/1',
        hint: 'Tapez : show port-security interface fa0/1',
        verificationOutput: `Port Security              : Enabled
Port Status                : Secure-up
Violation Mode             : Shutdown
Aging Time                 : 0 mins
Aging Type                 : Absolute
SecureStatic Address Aging : Disabled
Maximum MAC Addresses      : 1
Total MAC Addresses        : 1
Configured MAC Addresses   : 0
Sticky MAC Addresses       : 1 (0050.7966.6800)
Last Source Address:Vlan   : 0050.7966.6800:10
Security Violation Count   : 0`,
      },
    ],
  },
  {
    id: 'lab-dhcp-snoop',
    title: 'Protection L2 : Déploiement de DHCP Snooping',
    subtitle: 'Blocage des serveurs DHCP pirates (Rogue DHCP) et ports Trust/Untrust',
    level: 'CCNP ENCOR',
    durationEst: '15 min',
    objective:
      'Activer DHCP Snooping globalement sur SW1 pour le VLAN 10, déclarer le port Uplink Gi0/1 vers le serveur légitime en état de confiance (trusted) et vérifier la table de liaison snooping.',
    topologySummary: 'Serveur DHCP d\'entreprise sur Gi0/1 (Trust) ; Utilisateurs sur Fa0/1 à Fa0/24 (Untrusted).',
    steps: [
      {
        stepNumber: 1,
        title: 'Activer DHCP Snooping globalement',
        instruction:
          'Activez le mécanisme de filtrage DHCP Snooping au niveau global du commutateur.',
        context: 'Commande globale de configuration Cisco IOS.',
        devicePrompt: 'SW1(config)#',
        expectedKeywords: ['ip', 'dhcp', 'snooping'],
        acceptedRegex: /^ip\s+dhcp\s+snooping$/i,
        suggestedCommand: 'ip dhcp snooping',
        hint: 'Tapez : ip dhcp snooping',
        verificationOutput:
          'SW1(config)# ip dhcp snooping\n% DHCP Snooping feature enabled globally.',
      },
      {
        stepNumber: 2,
        title: 'Activer Snooping spécifiquement pour le VLAN 10',
        instruction:
          'Activez la surveillance DHCP pour le VLAN utilisateur 10.',
        context: 'DHCP Snooping est inactif tant qu\'il n\'est pas rattaché à un VLAN.',
        devicePrompt: 'SW1(config)#',
        expectedKeywords: ['ip', 'dhcp', 'snooping', 'vlan', '10'],
        acceptedRegex: /^ip\s+dhcp\s+snooping\s+vlan\s+10$/i,
        suggestedCommand: 'ip dhcp snooping vlan 10',
        hint: 'Tapez : ip dhcp snooping vlan 10',
        verificationOutput:
          'SW1(config)# ip dhcp snooping vlan 10\n% DHCP Snooping active on VLAN 10.',
      },
      {
        stepNumber: 3,
        title: 'Déclarer le port de confiance (Trust) vers le serveur DHCP',
        instruction:
          'Accédez à l\'interface GigabitEthernet0/1 et configurez-la comme port de confiance (Trusted Port) pour autoriser les paquets DHCP Offer et Ack du serveur.',
        context: 'Par défaut, tous les ports sont non fiables (untrusted).',
        devicePrompt: 'SW1(config-if)#',
        expectedKeywords: ['ip', 'dhcp', 'snooping', 'trust'],
        acceptedRegex: /^ip\s+dhcp\s+snooping\s+trust$/i,
        suggestedCommand: 'ip dhcp snooping trust',
        hint: 'Tapez : ip dhcp snooping trust',
        verificationOutput:
          'SW1(config-if)# ip dhcp snooping trust\n% Gi0/1 configured as DHCP Snooping Trusted port.',
      },
      {
        stepNumber: 4,
        title: 'Vérifier la table de liaison (DHCP Snooping Binding Table)',
        instruction:
          'Affichez la base de données des baux DHCP dynamiques inspectés par le commutateur.',
        context: 'Vérification en mode privilégié.',
        devicePrompt: 'SW1#',
        expectedKeywords: ['show', 'ip', 'dhcp', 'snooping', 'binding'],
        acceptedRegex: /^(show|sh)\s+ip\s+dhcp\s+snooping\s+binding$/i,
        suggestedCommand: 'show ip dhcp snooping binding',
        hint: 'Tapez : show ip dhcp snooping binding',
        verificationOutput: `MacAddress          IpAddress        Lease(sec)  Type           VLAN  Interface
------------------  ---------------  ----------  -------------  ----  --------------------
00:1B:77:23:45:90   192.168.10.15    86400       dhcp-snooping  10    FastEthernet0/2
00:50:56:89:12:33   192.168.10.16    86400       dhcp-snooping  10    FastEthernet0/3
Total number of bindings: 2`,
      },
    ],
  },
];
