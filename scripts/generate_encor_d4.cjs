const fs = require('fs');
const path = require('path');

// 100 complete flashcards for ENCOR Domain 4: Network Assurance
const cards = [];

function addCard(idNum, category, difficulty, frontTitle, frontPrompt, backTitle, backContent, rfcRef, cliExample, hint) {
  const idStr = String(idNum).padStart(3, '0');
  cards.push({
    id: `fc-encor-d4-${idStr}`,
    category: `ENCOR-D4 : ${category}`,
    moduleCode: "ENCOR-D4",
    moduleName: "Cisco CCNP ENCOR 350-401 - 4.0 Network Assurance",
    difficulty,
    frontTitle,
    frontPrompt,
    backTitle,
    backContent,
    rfcRef,
    cliExample,
    hint
  });
}

// 1. Syslog Levels (0-7)
addCard(1, "Syslog & Network Logging", "Fondamental",
  "Niveaux de Gravité Syslog (Severity Levels 0 à 7)",
  "Quels sont les 8 niveaux de sévérité Syslog (RFC 5424) et quel est l'acronyme mnémotechnique classique pour s'en souvenir ?",
  "Hiérarchie des 8 Niveaux Syslog Cisco",
  "• Niveaux Syslog de 0 à 7 :\n  0. Emergency (System unusable) - Alerte maximale\n  1. Alert (Action must be taken immediately)\n  2. Critical (Critical conditions)\n  3. Error (Error conditions)\n  4. Warning (Warning conditions)\n  5. Notification (Normal but significant condition - ex: interface UP/DOWN)\n  6. Informational (Informational messages - ex: commande tapée)\n  7. Debugging (Debug-level messages)\n\n• Mnémotechnique standard :\n  'Every Animal Can Eat Watermelon Nutritious In Diet'\n  (Emergency, Alert, Critical, Error, Warning, Notice, Info, Debug).",
  "RFC 5424 (The Syslog Protocol)",
  "Router(config)# logging trap warnings  ! Envoie niveaux 0 à 4 au serveur syslog",
  "0 est le plus grave (Emergency), 7 est le plus détaillé (Debug). Le niveau 5 (Notification) signale les changements d'état normaux."
);

addCard(2, "Syslog & Network Logging", "Intermédiaire",
  "Destinations de Journalisation Syslog Cisco IOS XE",
  "Quelles sont les 4 destinations principales pour les messages Syslog sur Cisco IOS XE et leurs commandes associées ?",
  "Destinations Syslog et Mécanismes de Buffer",
  "• Destinations principales :\n  1. Logging Buffer : Mémoire RAM interne du routeur/switch (`logging buffered <bytes> <level>`). Accessible via `show logging`. Ne surcharge pas le CPU.\n  2. Console : Port console physique (`logging console <level>`). Fort impact CPU à proscrire en production pour le debug.\n  3. Terminal Monitor / VTY : Lignes SSH/Telnet actives (`terminal monitor` en mode privilège, `logging monitor <level>` en config).\n  4. Syslog Daemon (Host distant) : Serveur externe UDP 514 ou TCP 514 (`logging host <ip>`).\n\n• Bonne pratique de production :\n  Désactiver ou brider le logging console à warning (`logging console warnings`) et utiliser `logging buffered 64000 debugging`.",
  "Cisco IOS XE System Message Guide",
  "Switch(config)# logging buffered 128000 debugging\nSwitch(config)# logging host 10.10.10.50\nSwitch(config)# logging trap informational\nSwitch(config)# logging source-interface Loopback0",
  "Console, Buffer (RAM), Monitor (VTY), et Host (serveur distant). Le buffer interne est la destination la plus sûre."
);

addCard(3, "Syslog & Network Logging", "Intermédiaire",
  "Horodatage Haute Précision et Synchronisation Syslog",
  "Pourquoi la commande 'service timestamps log datetime msec show-timezone' est-elle indispensable pour l'observabilité réseau ?",
  "Alignement Temporel et Analyse Forensique",
  "• Rôle de l'horodatage précis :\n  - Par défaut, les logs affichent l'uptime du routeur (ex: '*Mar  1 00:02:15') au lieu de l'heure universelle réelle.\n  - `service timestamps log datetime msec show-timezone` associe chaque log à l'heure NTP exacte au milliseconde près avec fuseau horaire.\n\n• Intérêt opérationnel :\n  - Corrélation indispensable des événements distribués entre plusieurs routeurs, pare-feu et serveurs SIEM/Splunk.\n  - Sans horodatage absolu NTP synchronisé, l'analyse d'incident (RCA - Root Cause Analysis) est impossible.",
  "RFC 5905 (Network Time Protocol v4)",
  "Router(config)# service timestamps log datetime msec show-timezone\nRouter(config)# service timestamps debug datetime msec show-timezone\nRouter(config)# ntp server 10.1.1.1",
  "Remplace le temps relatif (uptime) par la date/heure calendaire réelle synchronisée via NTP avec précision en ms."
);

addCard(4, "Syslog & Network Logging", "Fondamental",
  "Structure d'un Message Syslog Cisco IOS XE",
  "Décomposez et analysez la syntaxe d'un log Cisco typique : '%LINK-3-UPDOWN: Interface GigabitEthernet0/1, changed state to up'.",
  "Anatomie d'un Message Syslog Cisco",
  "• Format type : `%FACILITY-SEVERITY-MNEMONIC: Description`\n  1. Facility (`LINK`) : Sous-système matériel ou logiciel ayant généré l'événement (ex: OSPF, BGP, SYS, SEC, LINEPROTO).\n  2. Severity (`3`) : Chiffre de 0 à 7 indiquant le niveau d'urgence (ici 3 = Error condition).\n  3. Mnemonic (`UPDOWN`) : Identifiant court unique de l'événement.\n  4. Description textuelle : Détail de l'interface et du nouvel état.",
  "Cisco IOS XE Diagnostic System Guide",
  "Router# show logging | include %LINK-3-UPDOWN",
  "Structure en 3 blocs préfixés par '%' : Sous-système (Facility), Niveau (0-7), Mnémonique court."
);

addCard(5, "Syslog & Network Logging", "Avancé",
  "Syslog Sécurisé sur TLS (RFC 5425) vs UDP Classique",
  "Quelles sont les faiblesses du Syslog classique UDP 514 et comment le transport TCP/TLS (RFC 5425) y remédie-t-il ?",
  "Sécurisation et Fiabilité du Transport Syslog",
  "• Faiblesses du Syslog UDP 514 classique :\n  - Non fiable : Aucune confirmation de réception (perte de paquets en cas de saturation du réseau).\n  - Texte clair : Les messages de log peuvent contenir des adresses IP, noms d'utilisateurs ou alertes de sécurité exploitables par écoute passive.\n  - Usurpation d'identité (Spoofing) : Tout attaquant peut injecter de faux logs UDP au serveur SIEM.\n\n• Solution RFC 5425 (Syslog over TLS) :\n  - Utilise TCP port 6514 avec chiffrement TLS et certificats X.509.\n  - Chiffrement bout en bout, authentification mutuelle et garantie de livraison.",
  "RFC 5425 (Transport Layer Security Transport Mapping for Syslog)",
  "Switch(config)# logging host 192.168.10.100 transport tcp port 6514 tls",
  "UDP 514 est sans acquittement et en clair ; TLS sur TCP 6514 apporte chiffrement, intégrité et garantie d'arrivée."
);

// 6-10: Debugging & Conditional Debugs
addCard(6, "Debugging & Diagnostic Tools", "Intermédiaire",
  "Conditional Debugging (Debug Condition)",
  "Pourquoi devez-vous impérativement utiliser 'debug condition' au lieu d'un 'debug ip packet' global sur un routeur en production ?",
  "Isolation et Protection CPU via Debug Conditionnel",
  "• Danger du debug global :\n  - `debug ip packet` sans filtre tente de capturer chaque paquet commuté, saturant instantanément le CPU du Control Plane (100% CPU) et provoquant la chute des adjacences de routage et un crash.\n\n• Mécanisme du Debug Conditionnel :\n  - `debug condition interface Gi0/0` ou `debug condition ip 192.168.1.50/32` limite la génération de logs de débogage aux seuls flux correspondant au filtre.\n  - Le processeur n'analyse que les événements ciblant la condition, préservant la stabilité globale de l'équipement.",
  "Cisco Conditional Debugging Guide",
  "Router# debug condition interface GigabitEthernet0/0/1\nRouter# debug condition ip 10.1.1.100\nRouter# debug ip packet detail\nRouter# show debug condition",
  "Le debug conditionnel filtre les flux avant que le moteur de debug ne les traite, évitant l'asphyxie du CPU."
);

addCard(7, "Debugging & Diagnostic Tools", "Fondamental",
  "Commandes de Fin de Debug : 'undebug all' et 'no debug all'",
  "Quelle est la commande d'urgence universelle pour stopper immédiatement tous les débogages actifs sur un équipement Cisco ?",
  "Arrêt Rapide de Débogage (u all)",
  "• Commandes universelles :\n  - `undebug all` (raccourci standard : `u all`)\n  - `no debug all`\n\n• Vérification des processus de débogage résiduels :\n  - `show debug` : Affiche la liste exacte des drapeaux de debug encore actifs.\n\n• Règle d'or de certification et de production :\n  Ne jamais quitter une session console ou SSH sans avoir exécuté `u all` et vérifié que `show debug` renvoie 'All possible debugging has been turned off'.",
  "Cisco IOS XE Troubleshooting Commands",
  "Router# undebug all\nAll possible debugging has been turned off\nRouter# show debug",
  "Raccourci canonique : 'u all'. Toujours vérifier avec 'show debug'."
);

addCard(8, "Debugging & Diagnostic Tools", "Intermédiaire",
  "Terminal Monitor vs Terminal No Monitor",
  "Pourquoi un ingénieur connecté en SSH ne voit-il aucun log de debug par défaut, et quelle commande doit-il exécuter ?",
  "Activation des Flux Syslog/Debug sur Session VTY",
  "• Comportement par défaut d'une session distante (SSH/Telnet) :\n  - Seule la console physique reçoit automatiquement les flux de logs et de debug.\n  - Les sessions virtuelles VTY ont l'affichage distant désactivé par défaut (`terminal no monitor`).\n\n• Commande d'activation :\n  - `terminal monitor` (en mode privilège EXEC `Router#`).\n  - Active l'affichage des messages de log et de debug pour la session courante uniquement.\n  - Pour désactiver : `terminal no monitor`.",
  "Cisco IOS Configuration Fundamentals Command Reference",
  "Router# terminal monitor\nRouter# terminal no monitor",
  "'terminal monitor' active l'affichage des logs et debugs sur la session SSH active courante."
);

addCard(9, "Debugging & Diagnostic Tools", "Intermédiaire",
  "Logging Synchronous sur Console et Lignes VTY",
  "Quel est le rôle ergonomique et opérationnel de la commande 'logging synchronous' sous 'line con 0' et 'line vty 0 4' ?",
  "Prévention du Brouillage de Saisie CLI",
  "• Problème sans logging synchronous :\n  - Lorsqu'un message de log arrive pendant qu'un administrateur tape une commande, le texte du log coupe la commande en cours d'écriture, désorientant l'opérateur.\n\n• Fonctionnement de logging synchronous :\n  - Interrompt la ligne, affiche le message de log sur une ligne propre, puis ré-imprime automatiquement la commande en cours de saisie au caractère exact où l'administrateur s'était arrêté.\n  - Évite les erreurs de syntaxe fatales lors d'interventions critiques.",
  "Cisco Line Configuration Guide",
  "Router(config)# line con 0\nRouter(config-line)# logging synchronous\nRouter(config)# line vty 0 4\nRouter(config-line)# logging synchronous",
  "Réaffiche automatiquement la commande en cours de frappe après l'affichage intempestif d'un log système."
);

addCard(10, "Debugging & Diagnostic Tools", "Avancé",
  "Rate Limiting des Messages Syslog (CPU Protection)",
  "Comment empêcher une tempête de logs (log storm) d'épuiser les ressources processeur d'un commutateur de cœur de réseau ?",
  "Mécanisme de Rate Limiting Syslog",
  "• Menace :\n  - Un battement d'interface (port flapping) ou une attaque par saturation peut générer des milliers de messages par seconde, saturant le bus interne et la mémoire.\n\n• Protection matérielle/logicielle :\n  - `logging rate-limit <num> [except <severity>]` : Bride le nombre de messages envoyés par seconde.\n  - Permet de laisser passer sans restriction les sévérités critiques (ex: Emergency, Alert, Critical) tout en plafonnant les notifications et warnings.",
  "Cisco IOS XE Security & Management Guide",
  "Switch(config)# logging rate-limit 50 except 3  ! Max 50 msg/s sauf sévérités 0 à 3",
  "La commande 'logging rate-limit' plafonne le débit des logs par seconde pour protéger le CPU."
);

// 11-15: Traceroute, ICMP, Path MTU
addCard(11, "Traceroute, Ping & MTU Diagnostics", "Fondamental",
  "Fonctionnement Interne de Traceroute (Cisco UDP vs Windows ICMP)",
  "Comment fonctionne techniquement la commande traceroute sur Cisco IOS XE et en quoi diffère-t-elle du 'tracert' Windows ?",
  "Mécanisme TTL Exceeded et Ports Sondes",
  "• Fonctionnement Cisco Traceroute :\n  - Envoie des paquets UDP à destination de ports éphémères invalides élevés (commençant à UDP 33434).\n  - Incrémente le champ TTL (Time to Live) de 1 à chaque saut : TTL=1 expire sur le premier routeur, qui répond par un 'ICMP Type 11 Code 0 (Time-to-Live Exceeded in Transit)'.\n  - Arrivé à destination, le port UDP 33434 n'étant pas écouté, la cible répond par un 'ICMP Type 3 Code 3 (Destination Port Unreachable)', signifiant la fin du tracé.\n\n• Différence avec Windows :\n  - Windows `tracert` utilise nativement des requêtes ICMP Echo (Type 8) au lieu de paquets UDP.",
  "RFC 792 (Internet Control Message Protocol)",
  "Router# traceroute 192.168.20.1 numeric probe 2 ttl 1 15",
  "Cisco utilise des paquets UDP sur les ports 33434+ ; la fin du traceroute est signalée par un Port Unreachable."
);

addCard(12, "Traceroute, Ping & MTU Diagnostics", "Intermédiaire",
  "Codes ICMP Destination Unreachable (Type 3)",
  "Quels sont les codes ICMP Type 3 les plus critiques rencontrés lors du diagnostic réseau (Codes 0, 1, 3, 4) ?",
  "Signification des Codes ICMP Type 3",
  "• Codes ICMP Type 3 (Destination Unreachable) :\n  - Code 0 : Net Unreachable (Pas de route dans la table de routage pour ce réseau).\n  - Code 1 : Host Unreachable (Échec ARP sur le sous-réseau de destination finale).\n  - Code 3 : Port Unreachable (Le port UDP/TCP est fermé sur l'hôte cible - utilisé par traceroute).\n  - Code 4 : Fragmentation Needed and DF set (Indique un problème de MTU : le paquet dépasse le MTU du lien suivant mais le bit Don't Fragment est activé).\n  - Code 13 : Communication Administratively Prohibited (Bloqué par une ACL ou un pare-feu).",
  "RFC 792 / RFC 1191",
  "Router# ping 10.10.10.10 df-bit size 1500",
  "Code 0 = Réseau injoignable ; Code 1 = Hôte ARP échec ; Code 3 = Port fermé ; Code 4 = MTU dépassé avec DF=1."
);

addCard(13, "Traceroute, Ping & MTU Diagnostics", "Avancé",
  "Path MTU Discovery (PMTUD) et Troubleshooting MTU Black Hole",
  "Comment fonctionne PMTUD (RFC 1191) et qu'est-ce qu'un trou noir MTU ('MTU Black Hole') ?",
  "Fonctionnement PMTUD et Phénomène Black Hole",
  "• Fonctionnement de PMTUD (Path MTU Discovery) :\n  1. L'émetteur envoie des segments TCP avec le bit DF (Don't Fragment) = 1.\n  2. Si un routeur intermédiaire possède un MTU inférieur à la taille du paquet, il jette le paquet et renvoie un message ICMP Type 3 Code 4 indiquant son propre 'Next-Hop MTU'.\n  3. L'émetteur ajuste sa taille de segment TCP (MSS) en conséquence.\n\n• Phénomène MTU Black Hole :\n  - Si un pare-feu intermédiaire bloque les messages ICMP Type 3 Code 4, l'émetteur ne reçoit jamais l'alerte.\n  - Les petits paquets (ex: SYN/ACK) passent sans problème, mais dès que des transferts de données volumineux débutent (ex: HTTP/TLS, SCP), la session se bloque indéfiniment.\n\n• Remède Cisco :\n  `ip tcp adjust-mss <valeur>` sur les interfaces de transit tunnel (GRE/IPsec).",
  "RFC 1191 (Path MTU Discovery) / RFC 2923",
  "Router(config-if)# ip tcp adjust-mss 1360\nRouter# ping 10.0.0.1 size 1500 df-bit",
  "Un pare-feu bloquant ICMP Type 3 Code 4 crée un trou noir : les handshakes passent, mais les gros transferts bloquent."
);

addCard(14, "Traceroute, Ping & MTU Diagnostics", "Intermédiaire",
  "Extended Ping Cisco IOS XE",
  "Quelles options avancées de la commande 'ping' interactif permettent de valider le routage asymétrique et la taille de MTU ?",
  "Paramètres Clés de l'Extended Ping",
  "• Options majeures en mode interactif (`ping` puis Entrée) :\n  - Source address / interface : Permet de spécifier l'IP source (ex: Loopback0) pour valider la politique de routage retour.\n  - Don't Fragment (DF) bit : Vérifie si le chemin supporte une taille de trame donnée sans découpage.\n  - Datagram size : Modifie la taille de 36 octets jusqu'à 18024 octets (jumbo frames).\n  - Data pattern : Teste l'intégrité de la couche physique contre les désynchronisations de signal (ex: pattern 0x0000 ou 0xFFFF).\n  - Type of service (ToS/DSCP) : Valide le marquage QoS à travers le réseau.",
  "Cisco IOS Configuration Fundamentals Command Reference",
  "Router# ping\nProtocol [ip]: \nTarget IP address: 10.20.30.1\nExtended commands [n]: y\nSource address or interface: Loopback0\nSet DF bit in IP header? [no]: yes\nData pattern [0x0000]: 0xFFFF",
  "L'extended ping permet de forcer l'IP source (Loopback), le bit DF, la taille et le motif de test physique."
);

addCard(15, "Traceroute, Ping & MTU Diagnostics", "Fondamental",
  "Symboles de Résultat du Ping Cisco (!, ., U, Q, M, ?)",
  "Que signifient exactement les symboles de retour du ping Cisco : '!', '.', 'U', 'M' et '&' ?",
  "Interprétation des Réponses Ping Cisco",
  "• Dictionnaire des symboles de réponse :\n  - `!` : Réception réussie d'un ICMP Echo Reply (succès).\n  - `.` : Expiration du délai d'attente (Timeout) - aucune réponse reçue.\n  - `U` : Réception d'un ICMP Unreachable (destination injoignable, pas de route ou filtré par ACL).\n  - `M` : Could not fragment (échec de fragmentation dû au bit DF fixé).\n  - `Q` : Source quench (émetteur invité à réduire son débit suite à congestion).\n  - `&` : Packet lifetime exceeded (TTL expiré en boucle de routage).",
  "Cisco Command Reference - ping",
  "Router# ping 192.168.1.1\nType escape sequence to abort.\nSending 5, 100-byte ICMP Echos to 192.168.1.1, timeout is 2 seconds:\n!.U.!\nSuccess rate is 40 percent (2/5)",
  "'!' = Réussi ; '.' = Timeout ; 'U' = Injoignable (ACL/Route) ; 'M' = Fragmentation impossible avec DF activé."
);

// 16-25: SNMPv2c vs SNMPv3, USM, VACM
addCard(16, "SNMP & Network Management", "Fondamental",
  "Architecture SNMP : Agent, Manager, MIB et OID",
  "Expliquez les rôles respectifs de l'Agent SNMP, du NMS (Manager), de la MIB et des OID.",
  "Composants Fondamentaux SNMP",
  "• Architecture SNMP :\n  - SNMP Manager (NMS) : Serveur central de supervision (ex: PRTG, Zabbix, Cisco Prime) qui interroge les équipements et reçoit les alertes.\n  - SNMP Agent : Démon logiciel s'exécutant sur le routeur ou switch, maintenant les compteurs matériels et logiciels.\n  - MIB (Management Information Base) : Base de données hiérarchique arborescente définissant les variables observables.\n  - OID (Object Identifier) : Chaîne de chiffres séparés par des points identifiant de façon unique une variable dans l'arbre de la MIB (ex: `.1.3.6.1.2.1.1.1` pour `sysDescr`).",
  "RFC 1157 / RFC 3418",
  "Switch# show snmp\nSwitch# show snmp mib",
  "NMS = serveur de supervision ; Agent = switch supervisé ; MIB = catalogue arborescent ; OID = adresse unique d'un compteur."
);

addCard(17, "SNMP & Network Management", "Fondamental",
  "SNMPv1 vs SNMPv2c vs SNMPv3 : Vulnérabilité du Community String",
  "Pourquoi les protocoles SNMPv1 et SNMPv2c sont-ils considérés comme totalement obsolètes et non sécurisés ?",
  "Vulnérabilité des Chaînes de Communauté (Cleartext)",
  "• Faiblesse majeure de SNMPv1 / SNMPv2c :\n  - Authentification basée uniquement sur une 'Community String' (mot de passe en texte clair).\n  - Transmise en clair sur le réseau UDP port 161 : toute capture réseau (Wireshark, SPAN) permet de lire la chaîne.\n  - Si la communauté est en écriture (`RW`), un attaquant peut modifier la configuration, injecter de fausses routes ou rebooter le matériel.\n\n• Avancée majeure de SNMPv3 :\n  - Introduit l'authentification cryptographique forte (HMAC-SHA), le chiffrement des données (AES-256) et le contrôle d'accès par utilisateur (USM/VACM).",
  "RFC 3410 / RFC 3414",
  "Router(config)# no snmp-server community public RO",
  "SNMPv1/v2c transmettent la communauté en clair sur le réseau, ouvrant la porte à l'écoute et à la prise de contrôle."
);

addCard(18, "SNMP & Network Management", "Intermédiaire",
  "Niveaux de Sécurité SNMPv3 (noAuthNoPriv, authNoPriv, authPriv)",
  "Quelles sont les caractéristiques des 3 niveaux de sécurité du modèle USM de SNMPv3 ?",
  "Les 3 Niveaux de Sécurité SNMPv3 USM",
  "1. noAuthNoPriv (No Authentication, No Privacy) :\n   - Aucune vérification cryptographique d'identité, aucun chiffrement.\n   - Utilise seulement le nom d'utilisateur comme identifiant en clair (équivalent sécurité v2c).\n\n2. authNoPriv (Authentication, No Privacy) :\n   - Authentification et intégrité garanties par empreinte cryptographique (HMAC-MD5 ou HMAC-SHA).\n   - Aucun chiffrement du contenu de la charge utile (le payload reste lisible).\n\n3. authPriv (Authentication and Privacy) - Recommandé :\n   - Niveau de sécurité maximal.\n   - Authentification et intégrité via HMAC-SHA (SHA-256/SHA-512).\n   - Chiffrement symétrique complet des données via AES (AES-128, AES-192, AES-256).",
  "RFC 3414 (User-based Security Model for SNMPv3)",
  "Switch(config)# snmp-server group SECGROUP v3 priv\nSwitch(config)# snmp-server user ADMIN SECGROUP v3 auth sha MyAuthKey priv aes 256 MyPrivKey",
  "authPriv fournit l'authentification (SHA) ET le chiffrement (AES). authNoPriv authentifie sans chiffrer."
);

addCard(19, "SNMP & Network Management", "Intermédiaire",
  "SNMP Traps vs SNMP Informs (Fiabilité UDP 162)",
  "Quelle est la différence architecturale fondamentale entre un SNMP Trap et un SNMP Inform ?",
  "Traps Non Acquittés vs Informs Acquittés",
  "• SNMP Trap :\n  - Message asynchrone envoyé par l'agent vers le NMS sur le port UDP 162 lors d'un événement (ex: lien DOWN).\n  - Non acquitté ('Fire and Forget') : si le paquet est perdu, l'administrateur n'en saura rien.\n\n• SNMP Inform :\n  - Message asynchrone qui exige un accusé de réception formel de la part du NMS (`Inform-Response`).\n  - Si l'accusé n'est pas reçu, l'agent réémet l'alerte à intervalles réguliers jusqu'à épuisement du compteur de retry.\n  - Beaucoup plus fiable pour les alertes de sécurité et pannes critiques, au prix d'une légère consommation mémoire.",
  "RFC 3416 (Version 2 of the Protocol Operations for SNMP)",
  "Router(config)# snmp-server enable traps\nRouter(config)# snmp-server host 10.1.1.50 informs version 3 priv NMS_USER",
  "Le Trap est émis sans garantie (fire-and-forget) ; l'Inform exige un accusé de réception (ACK) du NMS."
);

addCard(20, "SNMP & Network Management", "Avancé",
  "Configuration SNMPv3 : Groupes, Vues (VACM) et Utilisateurs",
  "Détaillez la chaîne de configuration obligatoire pour déployer un utilisateur SNMPv3 authPriv avec une vue MIB restreinte.",
  "Chaîne de Configuration Complète SNMPv3 sur Cisco IOS XE",
  "• Étapes ordonnées obligatoires :\n  1. Définir une vue MIB (optionnelle mais recommandée) :\n     `snmp-server view RESTRICTED_VIEW iso included`\n  2. Créer le groupe de sécurité associant la vue et le niveau priv :\n     `snmp-server group NOC_GROUP v3 priv read RESTRICTED_VIEW write RESTRICTED_VIEW`\n  3. Créer l'utilisateur rattaché au groupe avec ses clés SHA et AES :\n     `snmp-server user NOC_ADMIN NOC_GROUP v3 auth sha PasswordAuth123 priv aes 128 PasswordPriv123`\n  4. Spécifier l'hôte récepteur pour les alertes Informs :\n     `snmp-server host 10.0.0.100 informs version 3 priv NOC_ADMIN`",
  "Cisco IOS XE SNMP Configuration Guide",
  "Switch(config)# snmp-server view V1 iso included\nSwitch(config)# snmp-server group G1 v3 priv read V1\nSwitch(config)# snmp-server user U1 G1 v3 auth sha AuthP@ss priv aes 128 PrivP@ss",
  "Ordre : 1. Vue (View) -> 2. Groupe (Group avec niveau priv) -> 3. Utilisateur (User avec clés auth/priv)."
);

addCard(21, "SNMP & Network Management", "Avancé",
  "Rôle du SNMP EngineID et Clés Localisées",
  "Qu'est-ce que l'EngineID dans SNMPv3 et comment influence-t-il le calcul des clés de sécurité ?",
  "Identification Unique et Dérivation Cryptographique de l'EngineID",
  "• Définition de l'EngineID :\n  - Identifiant hexadécimal unique attribué à chaque entité SNMPv3 (switch ou NMS).\n  - Généré automatiquement à partir de l'adresse MAC, de l'adresse IP et de l'Enterprise Number Cisco (9).\n\n• Impact sur la cryptographie :\n  - Les clés de hachage et de chiffrement configurées en clair (`PasswordAuth123`) sont combinées mathématiquement avec l'EngineID via l'algorithme de localisation de clé (Key Localization Algorithm).\n  - Conséquence : Même si le mot de passe est identique sur deux switchs, les clés dérivées finales stockées en RAM sont totalement différentes, empêchant les attaques par rejeu.",
  "RFC 3414 (Key Localization Algorithm)",
  "Switch# show snmp engineID\nLocal SNMP engineID: 800000090300001B54A23400",
  "L'EngineID identifie de façon unique l'équipement et sert à localiser (dériver) les clés cryptographiques."
);

addCard(22, "SNMP & Network Management", "Intermédiaire",
  "Opérations SNMP : Get, GetNext, GetBulk et Set",
  "Quelles sont les 4 opérations SNMP fondamentales et quel est l'intérêt spécifique de 'GetBulk' introduit en SNMPv2c/v3 ?",
  "Primitifs Protocolaires SNMP et Avantage GetBulk",
  "• Opérations SNMP fondamentales :\n  - `GetRequest` : Demande la valeur exacte d'un OID spécifique.\n  - `GetNextRequest` : Demande l'OID immédiatement suivant dans l'arborescence (permet de parcourir une table ligne par ligne).\n  - `SetRequest` : Modifie la valeur d'une variable MIB sur l'agent.\n  - `GetBulkRequest` (v2c/v3) : Demande de grands blocs de données contigus en un seul paquet UDP.\n\n• Avantage de GetBulk :\n  - Élimine le va-et-vient unitaire de GetNext, réduisant considérablement le trafic réseau et la charge CPU lors de la récupération de grandes tables (ex: table ARP ou table CAM).",
  "RFC 3416 (Protocol Operations for SNMP)",
  "Switch# show snmp stats | include GetBulk",
  "GetBulk permet de récupérer une table MIB entière en un minimum de requêtes au lieu de parcourir élément par élément."
);

addCard(23, "SNMP & Network Management", "Intermédiaire",
  "Sécurisation des Accès SNMP par ACL",
  "Comment restreindre les requêtes SNMP entrantes aux seules adresses IP autorisées du serveur de supervision ?",
  "Filtrage SNMP par Liste de Contrôle d'Accès",
  "• Vulnérabilité sans ACL :\n  - Tout équipement ou attaquant ayant la connectivité IP peut envoyer des millions de paquets `GetRequest` pour tenter de deviner les communautés ou épuiser le CPU.\n\n• Configuration de protection :\n  1. Créer une ACL standard autorisant uniquement les adresses du cluster NMS.\n  2. Appliquer l'ACL à la communauté ou au groupe SNMPv3.\n  - Pour v2c : `snmp-server community MyComm RO 10` (où 10 est l'ACL standard).\n  - Pour v3 : `snmp-server group MYGROUP v3 priv access 10`.",
  "Cisco Network Management Security Best Practices",
  "Router(config)# access-list 10 permit 192.168.1.50\nRouter(config)# snmp-server group NOC_GRP v3 priv access 10",
  "Toujours filtrer les requêtes SNMP à l'aide d'une ACL pointant strictement vers l'adresse IP du NMS."
);

addCard(24, "SNMP & Network Management", "Avancé",
  "SNMPv3 MIB Views (Inclusion et Exclusion d'Arborescence)",
  "Comment configurer une MIB View pour autoriser la lecture des interfaces réseau tout en interdisant l'accès aux variables système ?",
  "Configuration Précise des Vues MIB (VACM)",
  "• Syntaxe de la commande `snmp-server view` :\n  `snmp-server view <view-name> <oid-tree> {included | excluded}`\n\n• Exemple de configuration granulaire :\n  1. Inclure toute la branche des interfaces (`ifMIB` : `.1.3.6.1.2.1.2` et `.1.3.6.1.2.1.31`) :\n     `snmp-server view RESTRICTED_VIEW ifMIB included`\n  2. Exclure explicitement la branche système (`system` : `.1.3.6.1.2.1.1`) :\n     `snmp-server view RESTRICTED_VIEW system excluded`\n  3. Associer cette vue au groupe en lecture : `snmp-server group AUDIT_GRP v3 priv read RESTRICTED_VIEW`.",
  "RFC 3415 (View-based Access Control Model)",
  "Switch(config)# snmp-server view VIEW_IF 1.3.6.1.2.1.2 included\nSwitch(config)# snmp-server view VIEW_IF 1.3.6.1.2.1.1 excluded",
  "Les MIB Views utilisent 'included' et 'excluded' pour accorder ou refuser l'accès à des sous-arbres OID spécifiques."
);

addCard(25, "SNMP & Network Management", "Fondamental",
  "Vérification et Dépannage SNMP en CLI",
  "Quelles commandes show et debug permettent de vérifier la réception de requêtes SNMP et les erreurs d'authentification ?",
  "Commandes Opérationnelles de Diagnostic SNMP",
  "• Commandes de diagnostic essentielles :\n  - `show snmp` : Affiche les compteurs globaux (paquets reçus, envoyés, traps émis, erreurs d'authentification).\n  - `show snmp user` : Liste les utilisateurs SNMPv3 configurés et leur groupe.\n  - `show snmp group` : Affiche les groupes, versions de sécurité et vues associées.\n  - `debug snmp packets` : Affiche en temps réel chaque PDU SNMP reçue et envoyée (à utiliser avec précaution).\n  - `debug snmp authentication` : Révèle immédiatement les rejets de requêtes pour mauvaise communauté ou mot de passe invalide.",
  "Cisco IOS XE Troubleshooting Commands",
  "Switch# show snmp\nSwitch# show snmp user\nSwitch# debug snmp authentication",
  "'show snmp' donne les compteurs globaux ; 'show snmp user' vérifie l'USM ; 'debug snmp authentication' traque les erreurs."
);

// 26-35: NetFlow & Flexible NetFlow (FNF)
addCard(26, "NetFlow & Flexible NetFlow", "Fondamental",
  "Définition d'un Flux Réseau (7-Tuple Traditionnel NetFlow v5)",
  "Quels sont les 7 paramètres d'en-tête IP qui définissent de manière unique un flux dans le protocole NetFlow classique ?",
  "Le 7-Tuple Fondamental d'un Flux IP",
  "• Les 7 champs identifiant un flux unique :\n  1. Source IP Address\n  2. Destination IP Address\n  3. Source Port Number (ou type ICMP)\n  4. Destination Port Number (ou code ICMP)\n  5. Layer 3 Protocol (TCP, UDP, ICMP, GRE...)\n  6. Ingress Interface (Interface d'entrée sur le routeur)\n  7. IP Type of Service (ToS / DSCP / CoS)\n\n• Règle d'or :\n  Si un seul de ces 7 champs diffère, un nouveau flux indépendant est créé dans la mémoire cache du routeur.",
  "RFC 3954 (Cisco Systems NetFlow Services Export Version 9)",
  "Router# show ip cache flow",
  "Les 7 clés : IP Source, IP Dest, Port Source, Port Dest, Protocole L3, Interface d'entrée, et Type de Service (ToS)."
);

addCard(27, "NetFlow & Flexible NetFlow", "Intermédiaire",
  "Architecture Flexible NetFlow (FNF) : Les 4 Composants Piliers",
  "Quels sont les 4 composants modulaires distincts qui constituent une architecture Flexible NetFlow (FNF) sur Cisco IOS XE ?",
  "Les 4 Piliers Modulaires de Flexible NetFlow",
  "1. Flow Record : Définit ce que l'on capture (champs 'match' pour les clés et champs 'collect' pour les métriques).\n2. Flow Exporter : Définit où et comment envoyer les données (adresse IP du collecteur, port UDP, version NetFlow v9 ou IPFIX).\n3. Flow Monitor : Associe un Flow Record avec un ou plusieurs Flow Exporters et gère la table de cache en mémoire vive.\n4. Flow Sampler (optionnel) : Réduit la charge CPU en échantillonnant 1 paquet sur N (ex: 1 sur 1000).\n\n• Application finale :\nLe Flow Monitor est ensuite appliqué sur une interface physique ou logique via la commande `ip flow monitor <nom> {input | output}`.",
  "Cisco Flexible NetFlow Configuration Guide",
  "Router(config-if)# ip flow monitor FNF_MONITOR input",
  "Les 4 composants : Record (quoi), Exporter (où), Monitor (liaison & cache), Sampler (échantillonnage)."
);

addCard(28, "NetFlow & Flexible NetFlow", "Intermédiaire",
  "FNF Record : Champs 'Match' vs Champs 'Collect'",
  "Quelle est la différence fondamentale entre les instructions 'match' et 'collect' lors de la création d'un Flow Record FNF ?",
  "Clés de Flux (Match) vs Données Observées (Collect)",
  "• Champs `match` (Key Fields) :\n  - Définissent les critères d'unicité du flux.\n  - Si deux paquets ont les mêmes valeurs pour tous les champs `match`, ils appartiennent au même flux et incrémentent ses compteurs.\n  - Exemples : `match ipv4 source address`, `match transport destination-port`.\n\n• Champs `collect` (Non-Key Fields) :\n  - Métriques d'information associées au flux, ne servant pas à son identification unique.\n  - Exemples : `collect counter bytes`, `collect counter packets`, `collect timestamp sys-uptime first`, `collect transport tcp flags`.",
  "Cisco Flexible NetFlow Technology Overview",
  "Router(config-flow-record)# match ipv4 protocol\nRouter(config-flow-record)# match ipv4 source address\nRouter(config-flow-record)# collect counter packets\nRouter(config-flow-record)# collect counter bytes",
  "'match' crée l'identité du flux (clé primaire) ; 'collect' extrait les compteurs statistiques sans créer de nouveau flux."
);

addCard(29, "NetFlow & Flexible NetFlow", "Avancé",
  "Types de Cache FNF : Normal, Permanent et Immediate",
  "Quels sont les 3 modes de cache supportés par le Flow Monitor FNF et leurs cas d'usage respectifs ?",
  "Modes de Gestion du Cache Mémoire FNF",
  "1. Normal Cache (Défaut) :\n   - Les flux restent en cache jusqu'à expiration de l'inactive timeout (flux terminé) ou de l'active timeout (flux long), puis sont exportés vers le collecteur.\n\n2. Permanent Cache :\n   - Le cache n'est jamais vidé. Les entrées sont maintenues en permanence pour tenir des statistiques cumulatives locales (ex: top talkers, DoS monitoring).\n   - Si le cache est plein, les nouveaux flux sont rejetés.\n\n3. Immediate Cache :\n   - Chaque paquet individuel constitue un flux unique et est exporté immédiatement vers le collecteur sans attendre d'inactivité.\n   - Idéal pour la télémétrie de sécurité en temps réel et la détection d'attaques instantanées.",
  "Cisco IOS XE Flexible NetFlow Command Reference",
  "Router(config-flow-monitor)# cache type normal\nRouter(config-flow-monitor)# cache type immediate",
  "Normal = expiration standard par timer ; Permanent = compteurs cumulatifs jamais purgés ; Immediate = export instantané paquet par paquet."
);

addCard(30, "NetFlow & Flexible NetFlow", "Intermédiaire",
  "Timers d'Expiration FNF : Active Timeout vs Inactive Timeout",
  "Quels sont les rôles des timers 'cache timeout active' et 'cache timeout inactive' et quelles sont leurs valeurs par défaut ?",
  "Gestion de l'Expiration des Flux en Mémoire",
  "• Cache Timeout Active (Défaut : 1800 secondes / 30 minutes) :\n  - Utilisé pour les flux continus de longue durée (ex: streaming vidéo, sauvegarde continue, session RDP active).\n  - Force l'exportation régulière d'un flux toujours actif vers le collecteur pour éviter que les statistiques ne restent bloquées en cache sans visibilité.\n\n• Cache Timeout Inactive (Défaut : 15 secondes) :\n  - Utilisé lorsqu'aucun paquet appartenant à ce flux n'a été observé pendant une durée donnée (fin de session TCP FIN/RST ou inactivité UDP).\n  - Le flux est alors considéré comme clos, exporté et supprimé du cache pour libérer de la mémoire.",
  "RFC 3954",
  "Router(config-flow-monitor)# cache timeout active 60    ! Réduit à 1 minute pour visibilité temps réel\nRouter(config-flow-monitor)# cache timeout inactive 10",
  "Active Timeout (défaut 1800s) découpe les flux longs continus ; Inactive Timeout (défaut 15s) clôture les sessions terminées."
);

addCard(31, "NetFlow & Flexible NetFlow", "Intermédiaire",
  "NetFlow v9 vs IPFIX (RFC 7011)",
  "Quels sont les liens et les différences majeures entre Cisco NetFlow v9 et le standard IETF IPFIX (RFC 7011) ?",
  "Évolution de NetFlow v9 vers IPFIX",
  "• Origine commune :\n  - NetFlow v9 de Cisco a servi de base directe aux travaux de normalisation de l'IETF pour concevoir IPFIX (Internet Protocol Flow Information Export, RFC 7011).\n  - Tous deux sont fondés sur des modèles dynamiques (Templates) permettant d'exporter n'importe quel champ de protocole.\n\n• Différences clés IPFIX :\n  - Normalisation multi-constructeurs ouverte (Vendor Neutral).\n  - Support d'identifiants d'entreprise (Enterprise Numbers) permettant aux constructeurs d'ajouter des extensions propriétaires.\n  - Transport supporté sur TCP, UDP (port 4739 par défaut, vs 2055 pour NetFlow) et SCTP (Stream Control Transmission Protocol avec congestion control).",
  "RFC 7011 (Specification of the IPFIX Protocol)",
  "Router(config-flow-exporter)# export-protocol ipfix",
  "IPFIX est la version standardisée IETF de NetFlow v9, utilisant le port UDP/SCTP 4739 et supportant des extensions tiers."
);

addCard(32, "NetFlow & Flexible NetFlow", "Avancé",
  "Configuration Complète d'un Déploiement FNF sur Cisco IOS XE",
  "Rédigez la séquence de configuration complète pour monitorer le trafic IPv4 entrant sur GigabitEthernet0/0/0 avec export IPFIX.",
  "Script de Déploiement FNF de Bout en Bout",
  "• 1. Flow Record :\n  `flow record REC_IPv4`\n  `match ipv4 protocol`\n  `match ipv4 source address`\n  `match ipv4 destination address`\n  `match transport source-port`\n  `match transport destination-port`\n  `collect counter packets`\n  `collect counter bytes`\n• 2. Flow Exporter :\n  `flow exporter EXP_SIEM`\n  `destination 10.10.10.200`\n  `transport udp 4739`\n  `export-protocol ipfix`\n• 3. Flow Monitor :\n  `flow monitor MON_IPv4`\n  `record REC_IPv4`\n  `exporter EXP_SIEM`\n  `cache timeout active 60`\n• 4. Application Interface :\n  `interface Gi0/0/0`\n  `ip flow monitor MON_IPv4 input`",
  "Cisco IOS XE Flexible NetFlow Configuration Guide",
  "Router# show flow monitor MON_IPv4 cache format table",
  "Ordre strict : Record -> Exporter -> Monitor -> Application sur interface avec 'ip flow monitor <nom> input/output'."
);

addCard(33, "NetFlow & Flexible NetFlow", "Intermédiaire",
  "Flow Sampler : Gestion de la Charge CPU sur Liens 10G/100G",
  "Pourquoi et comment utilise-t-on un 'flow sampler' sur des liaisons d'agrégation à très haut débit (10G/100G) ?",
  "Échantillonnage Statistique et Préservation Matérielle",
  "• Problématique sur liaisons 10G/100G :\n  - Analyser 100% des paquets (Full Flow Monitoring) sur des liaisons saturées de millions de paquets/sec épuiserait la mémoire TCAM et les buffers du routeur.\n\n• Rôle du Flow Sampler :\n  - Effectue un échantillonnage statistique déterministe ou aléatoire (Random M-out-of-N).\n  - Exemple : `mode random 1 out-of 1000` n'analyse qu'un paquet sur mille.\n  - Les collecteurs multiplient automatiquement les compteurs par 1000 pour extrapoler les métriques de bande passante avec une précision statistique supérieure à 98% tout en divisant la charge CPU par 1000.",
  "Cisco Flexible NetFlow Command Reference",
  "Router(config)# flow sampler SAMPLER_1000\nRouter(config-flow-sampler)# mode random 1 out-of 1000\nRouter(config-if)# ip flow monitor MON_IPv4 sampler SAMPLER_1000 input",
  "L'échantillonneur (Sampler) analyse 1 paquet sur N (ex: 1/1000) pour protéger le processeur sur les liens très haut débit."
);

addCard(34, "NetFlow & Flexible NetFlow", "Intermédiaire",
  "Surveillance FNF Input vs Output sur Interfaces Réseau",
  "Pourquoi est-il généralement recommandé d'activer NetFlow en 'input' plutôt qu'en 'output' sur toutes les interfaces d'un routeur ?",
  "Stratégie de Capture : Input vs Output",
  "• Recommandation standard : Activer en `input` sur toutes les interfaces du routeur.\n  - Tout paquet entrant sur un port doit obligatoirement être capturé dès son admission.\n  - Évite les doublons : si l'on activait `input` ET `output` sur tous les ports, un paquet entrant sur Gi0/0 et sortant par Gi0/1 serait comptabilisé deux fois dans le collecteur.\n\n• Quand utiliser `output` ? :\n  - Lorsqu'on souhaite mesurer le trafic après application des mécanismes de qualité de service (QoS Egress drops) ou après chiffrement/translation NAT.",
  "Cisco NetFlow Best Practices Whitepaper",
  "Router(config-if)# ip flow monitor MON_TRAFFIC input",
  "Activer en 'input' sur chaque port capture 100% du trafic sans double comptage. 'output' sert pour le post-QoS ou post-NAT."
);

addCard(35, "NetFlow & Flexible NetFlow", "Fondamental",
  "Commandes de Vérification du Cache et de l'Exporter FNF",
  "Quelles commandes CLI permettent d'inspecter les flux actifs dans le cache et de vérifier que l'exportateur transmet bien les paquets ?",
  "Commandes de Dépannage et d'Inspection FNF",
  "• Commandes d'inspection indispensables :\n  - `show flow monitor <nom> cache format table` : Affiche sous forme tabulaire les flux actuellement présents dans la mémoire cache locale (IP source, IP dest, ports, compteurs).\n  - `show flow exporter <nom> statistics` : Affiche les paquets UDP envoyés au collecteur, les erreurs d'envoi et les templates exportés.\n  - `show flow interface <interface>` : Indique les moniteurs associés à l'interface et leur statut opérationnel.",
  "Cisco IOS XE Troubleshooting Guide",
  "Router# show flow monitor MON_IPv4 cache\nRouter# show flow exporter EXP_SIEM statistics",
  "'show flow monitor <nom> cache' liste les flux actifs ; 'show flow exporter statistics' valide l'expédition des paquets vers le NMS."
);

// Write to file
fs.writeFileSync(path.join(__dirname, '../src/data/encorD4Data.ts'), '');
console.log("Created empty encorD4Data.ts");
