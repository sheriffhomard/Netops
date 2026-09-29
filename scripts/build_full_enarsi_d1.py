import json

def generate_d1():
    cards = []

    # 1 to 20: EIGRP (already designed, let's load / specify)
    eigrp_data = [
        ("001", "EIGRP Classic Mode vs Named Mode (Multi-AF)",
         "Quelle est la structure hiérarchique d'EIGRP Named Mode et comment remplace-t-elle la configuration éclatée du mode classique pour IPv4 et IPv6 ?",
         "Structure Hiérarchique EIGRP Named Mode",
         "• EIGRP Named Mode unifie toutes les configurations sous une instance nommée :\n  1. Address-Family : Choix du protocole (IPv4/IPv6) et de l'AS.\n  2. AF-Interface : Paramètres d'interface (hello/hold, authentification, passive-interface, split-horizon, bandwidth-percent, summarization) définis sous le process.\n  3. AF-Topology : Métriques, redistribution, variance, timers SPF/convergence.\n• Avantage majeur : Plus de commandes éparpillées sous les interfaces physiques ; support natif des Wide Metrics 64-bit.",
         "RFC 7868 (Cisco EIGRP Protocol)",
         "router eigrp CISCO-WAN\n address-family ipv4 unicast autonomous-system 100\n  af-interface GigabitEthernet0/0\n   authentication mode hmac-sha-256 CiscoSecretKey\n  topology base\n   variance 2",
         "Named mode regroupe address-family, af-interface et af-topology en un seul bloc cohérent."),
        
        ("002", "EIGRP Wide Metrics (64-bit) vs Classic Metrics (32-bit)",
         "Pourquoi les métriques EIGRP classiques échouent-elles sur les interfaces 10G/40G/100G et comment les Wide Metrics (K1 à K6) résolvent-elles ce problème ?",
         "Wide Metrics 64-bit & Coefficients K1 à K6",
         "• Problème de la métrique classique 32-bit :\n  - Formule : 256 * [ (10^7 / Min_BW_kbps) + Total_Delay_tens_of_usec ].\n  - Dès 10 Gbps, (10^7 / 10^7) = 1. Tout lien supérieur à 10G a la même valeur de bande passante résiduelle (saturation de l'échelle).\n• Solution Wide Metrics 64-bit (Named Mode obligatoire) :\n  - Throughput : [ (10^7 * 65536) / Bandwidth_kbps ].\n  - Latency : [ (Latency_picoseconds * 65536) / 10^6 ].\n  - K6 introduit pour les attributs étendus (Jitter, Energy, Loss). K1=1, K3=1 par défaut.",
         "RFC 7868 § 5.5",
         "R1# show ip eigrp topology 10.1.1.0/24\n  Composite metric is (131072000/65536000)\n  Extended community attribute: K1=1, K2=0, K3=1, K4=0, K5=0, K6=0",
         "Wide Metrics utilise les picosecondes et une échelle 64-bit pour différentier les liens 10G/40G/100G."),
        
        ("003", "Condition de Faisabilité EIGRP (Feasibility Condition - FC)",
         "Énoncez précisément la Feasibility Condition (FC) d'EIGRP et expliquez pourquoi une route ayant une Reported Distance égale à la Feasible Distance est rejetée.",
         "Énoncé et Rigueur de la Condition de Faisabilité",
         "• Règle : RD < FD (Reported Distance strictement inférieure à la Feasible Distance actuelle).\n  - RD (ou AD) : Métrique calculée et annoncée par le voisin pour atteindre la destination.\n  - FD : Plus petite métrique historique calculée par le routeur local depuis le passage à l'état Passive.\n• Si RD = FD ou RD > FD :\n  - Il existe un risque mathématique que le voisin route à travers le routeur local (boucle potentielle).\n  - Le voisin n'est PAS élu Feasible Successor (FS), mais reste un simple voisin valide.",
         "RFC 7868 § 3.5.1",
         "R1# show ip eigrp topology\nP 192.168.10.0/24, 1 successors, FD is 28160\n  via 10.0.0.2 (28160/25600), Gig0/0 (Successor)\n  via 10.0.0.6 (30720/28160), Gig0/1 (Non-FS car RD 28160 == FD 28160)",
         "La condition est strictement inférieure (<), jamais égale ou supérieure (<=)."),
        
        ("004", "EIGRP Unequal-Cost Load Balancing (Variance)",
         "Quelles sont les DEUX conditions obligatoires pour qu'un chemin alternatif soit installé dans la table de routage via la commande 'variance' ?",
         "Double Condition pour l'Équilibrage Inégal (Variance)",
         "• Condition 1 : Le chemin alternatif DOIT IMPÉRATIVEMENT être un Feasible Successor (RD < FD_Successor). Sans respect de la FC, le chemin est ignoré, quel que soit le multiplicateur de variance.\n• Condition 2 : La métrique totale du chemin alternatif doit être strictement inférieure à (Variance * FD_Successor).\n• Répartition du trafic : Inversement proportionnelle aux métriques des différents chemins (plus la métrique est faible, plus le routeur envoie de paquets).",
         "Cisco EIGRP Configuration Guide",
         "router eigrp 100\n variance 2\n! Permet d'installer les chemins FS dont la métrique < 2 * FD",
         "Même avec variance 10, un chemin qui ne valide pas RD < FD ne sera jamais installé."),

        ("005", "Options EIGRP Stub & Blocage de Requêtes (Query Scoping)",
         "Quelles sont les différentes options de la commande 'eigrp stub' et quelle est la configuration par défaut ?",
         "EIGRP Stub Modes & Limitation du Query Scope",
         "• Rôle majeur : Empêche les voisins de propager des paquets Query vers le routeur Stub lors d'une perte de route (élimine le risque de Stuck-In-Active).\n• Options disponibles :\n  - connected : Annonce les réseaux directement connectés (filtrés par network).\n  - summary : Annonce les routes résumées manuelles (ip summary-address).\n  - static : Annonce les routes statiques redistribuées.\n  - receive-only : N'annonce absolument RIEN (interdit toute annonce sortante).\n  - leak-map : Permet de fuiter sélectivement des routes plus spécifiques.\n• Par défaut : 'eigrp stub' équivaut à 'eigrp stub connected summary'.",
         "RFC 7868 § 5.3.4",
         "R-Spoke(config)# router eigrp 100\nR-Spoke(config-router)# eigrp stub connected summary\n! Sur le Hub :\nHub# show ip eigrp neighbors detail\n  Neighbor 10.1.1.2 is a stub, suppresses queries",
         "Par défaut = connected + summary. receive-only bloque toute annonce."),

        ("006", "Mécanisme EIGRP Stuck-In-Active (SIA), SIA-Query et Timers",
         "Comment fonctionne le timer Active (3 min) et comment le protocole utilise-t-il SIA-Query et SIA-Reply pour éviter de couper une adjacence sans raison ?",
         "Cycle de Vie d'une Route en État Active et SIA",
         "• Perte de route sans Feasible Successor -> La route passe de Passive (P) à Active (A).\n• Le routeur émet des paquets Query à tous ses voisins et déclenche l'Active Timer (par défaut 3 minutes / 180s).\n• À mi-parcours (Active Timer / 2 = 90s) : Si aucun Reply n'est reçu, le routeur envoie un paquet SIA-Query.\n• Le voisin répond par un SIA-Reply confirmant qu'il cherche toujours la route.\n• Si aucun SIA-Reply n'est reçu ou si les 3 minutes s'écoulent sans réponse, le routeur déclare la route SIA, réinitialise immédiatement l'adjacence avec le voisin défaillant et supprime toutes ses routes.",
         "RFC 7868 § 4.3",
         "R1# show ip eigrp topology active\nA 10.5.5.0/24, 1 successors, FD is Inaccessible, Q\n    1 replies expected, active for 00:01:45\n    via 10.1.2.2, r stal, wait for reply, SIA query sent",
         "SIA-Query est envoyé à mi-temps (90s) pour vérifier la vie du voisin avant le couperet des 180s."),

        ("007", "Agrégation EIGRP (Manual Summarization) & Route Null0",
         "Sur quel équipement configure-t-on l'agrégation EIGRP, quelle est la distance administrative de la route de défausse Null0 créée et pourquoi ?",
         "Agrégation Manuelle EIGRP et Prévention de Boucles",
         "• Emplacement : Configurée sous l'interface sortante (mode classique : `ip summary-address eigrp <as> <prefix> <mask>` ; named mode : sous `af-interface`).\n• Route vers Null0 :\n  - EIGRP installe automatiquement la route agrégée vers l'interface Null0 dans la table de routage locale avec une Distance Administrative de 5.\n  - But : Éviter les boucles de routage (black-holing du trafic destiné à des sous-réseaux non existants dans le bloc résumé).\n• Métrique de l'agrégat : Égale à la métrique la plus faible parmi tous les sous-réseaux composant l'agrégat.",
         "Cisco EIGRP Technical Reference",
         "R1(config)# router eigrp CORE\nR1(config-router)# address-family ipv4 unicast autonomous-system 1\nR1(config-router-af)# af-interface GigabitEthernet0/1\nR1(config-router-af-interface)# summary-address 172.16.0.0 255.255.0.0\n! Vérification :\nR1# show ip route 172.16.0.0\nRouting entry for 172.16.0.0/16\n  Known via \"eigrp 1\", distance 5, metric 28160, to Null0",
         "La route résumée vers Null0 possède une AD de 5 pour empêcher les boucles."),

        ("008", "Authentification EIGRP : MD5 (Classic) vs HMAC-SHA-256 (Named)",
         "Quelles sont les différences de configuration de l'authentification entre EIGRP Classic (key-chain MD5) et Named Mode (SHA-256 sans keychain) ?",
         "Authentification EIGRP : MD5 vs HMAC-SHA-256",
         "• EIGRP Classic Mode :\n  - Supporte uniquement MD5 (RFC 1321).\n  - Requiert obligatoirement une `key chain` globale configurée avec `key-string` et appliquée sous l'interface via `ip authentication mode eigrp <as> md5` et `ip authentication key-chain eigrp <as> <name>`.\n• EIGRP Named Mode :\n  - Supporte nativement HMAC-SHA-256 (RFC 2104) beaucoup plus robuste.\n  - Peut être configuré directement sous `af-interface` avec un mot de passe en clair sans créer de `key chain`.\n  - Possibilité d'utiliser une `key chain` pour la rotation automatique des clés.",
         "RFC 7868 § 6",
         "! Named Mode SHA-256 direct :\nrouter eigrp LAB\n address-family ipv4 unicast autonomous-system 10\n  af-interface Gi0/0\n   authentication mode hmac-sha-256 MyStrongPass123",
         "Named mode permet de se passer de key chain grâce à l'authentification directe hmac-sha-256."),

        ("009", "Causes Majeures d'Échec d'Adjacence Voisin EIGRP",
         "Quels paramètres doivent impérativement concorder entre deux routeurs pour que l'adjacence EIGRP s'établisse ?",
         "Checklist de Dépannage Voisin EIGRP",
         "• Paramètres DOIVENT CONCORDER :\n  1. Numéro d'AS (Autonomous System).\n  2. Valeurs K (K1 à K5, et K6 en named mode) -> 'K-value mismatch'.\n  3. Authentification (même type MD5/SHA, même clé, même key-id actif).\n  4. Sous-réseau IP primaire identique (EIGRP ignore les adresses secondaires pour le Hello).\n• Paramètres NON OBLIGATOIRES :\n  - Les timers Hello et Hold n'ont PAS besoin d'être identiques (chaque routeur annonce son propre Hold time au voisin) !\n  - La MTU n'empêche pas l'adjacence (contrairement à OSPF), mais une MTU incohérente provoquera des déconnexions lors du transfert de gros paquets Update.",
         "Cisco EIGRP Troubleshooting Guide",
         "R1# show ip eigrp neighbors\n! Si vide, vérifier les logs :\n%DUAL-5-NBRCHANGE: IP-EIGRP(0) 100: Neighbor 10.1.1.2 is down: K-value mismatch",
         "AS, K-values, sous-réseau primaire et auth doivent concorder ; les timers Hello/Hold peuvent différer."),

        ("010", "EIGRP Split Horizon sur Topologies Hub-and-Spoke (DMVPN / Frame Relay)",
         "Pourquoi la règle du Split Horizon bloque-t-elle la communication Spoke-to-Spoke en EIGRP sur une interface multipoint (mGRE) et quelle commande résout ce blocage ?",
         "Désactivation du Split Horizon sur le Hub",
         "• Principe Split Horizon : Un routeur n'annonce jamais une route sur l'interface par laquelle il l'a lui-même apprise.\n• Problème sur Hub-and-Spoke (Tunnel mGRE ou sous-interface multipoint) :\n  - Spoke 1 annonce son sous-réseau au Hub via Tunnel0.\n  - Le Hub apprend la route sur Tunnel0 et refuse de la réannoncer sur Tunnel0 vers Spoke 2.\n• Résolution :\n  - Désactiver le Split Horizon sur l'interface du Hub : `no ip split-horizon eigrp <as>` (ou sous `af-interface` en Named Mode).\n  - Attention : Sur DMVPN Phase 2/3, il faut également désactiver le `next-hop-self` (`no ip next-hop-self eigrp <as>`) pour préserver l'adresse IP du Spoke source.",
         "RFC 7868 § 5.2",
         "interface Tunnel0\n ip address 172.16.1.1 255.255.255.0\n no ip split-horizon eigrp 1\n no ip next-hop-self eigrp 1",
         "no ip split-horizon eigrp <as> sur le hub permet de renvoyer l'annonce sur la même interface mGRE."),

        ("011", "EIGRP Over-The-Top (OTP) Architecture",
         "Comment EIGRP OTP permet-il d'interconnecter des sites distants à travers un réseau WAN de transit sans modifier la configuration du fournisseur ?",
         "EIGRP OTP et Encapsulation LISP Control Plane",
         "• EIGRP OTP encapsule les paquets EIGRP dans des paquets LISP (Locator/ID Separation Protocol) UDP port 4341.\n• Permet à une entreprise de faire tourner un seul processus EIGRP à travers un WAN Layer 3 sans nécessiter de tunnels GRE point-à-point.\n• Le routeur agit en tant que LISP ITR/ETR pour encapsuler les paquets data et control.",
         "Cisco EIGRP OTP Deployment Guide",
         "router eigrp WAN\n address-family ipv4 autonomous-system 1\n  remote-neighbors source Loopback0\n   neighbor 198.51.100.2",
         "EIGRP OTP utilise LISP (UDP 4341) pour router EIGRP à travers un WAN tiers sans GRE."),

        ("012", "EIGRP Graceful Restart (NSF) Mechanism",
         "Quel est le rôle du bit RS (Restart) dans les paquets Hello EIGRP lors d'un basculement de Route Processor (RP) actif vers le RP en veille ?",
         "Maintien de la FIB et Resynchronisation EIGRP NSF",
         "• Lors du switchover RP, le plan de données (CEF) continue de transférer les paquets sans interruption.\n• Le nouveau RP actif envoie un paquet Hello avec le bit RS (Restart) activé à ses pairs.\n• Les pairs maintiennent l'adjacence vivante sans supprimer les routes et renvoient leur base topologique complète (EndOfTable flag).",
         "RFC 7868 § 7.3",
         "R1# show ip eigrp neighbors detail\n  Neighbor 10.1.1.2: Restart support is Peer-Restart-Capable, state is Established",
         "Le bit RS informe les voisins de garder leurs routes actives pendant le redémarrage du processeur."),

        ("013", "EIGRP Unicast Neighbor Command Impact",
         "Quelle est la conséquence immédiate sur une interface lorsqu'on configure manuellement un voisin avec la commande 'neighbor <ip> <interface>' en EIGRP ?",
         "Suppression du Multicast sur l'Interface",
         "• Dès que la commande `neighbor` est saisie, EIGRP cesse totalement d'émettre et d'écouter les paquets Hello sur l'adresse multicast 224.0.0.10 sur cette interface spécifique.\n• Tout autre routeur branché sur le même segment qui écoute en multicast ne pourra plus former d'adjacence à moins d'avoir lui aussi la commande `neighbor` configurée pointant vers ce routeur.",
         "Cisco IOS Command Reference",
         "router eigrp 10\n neighbor 192.168.1.2 GigabitEthernet0/1\n! Coupe le multicast 224.0.0.10 sur Gi0/1",
         "La commande neighbor coupe l'émission multicast sur l'interface concernée."),

        ("014", "EIGRP Route Filtering : distribute-list vs prefix-list",
         "Comment appliquer un filtrage de routes EIGRP par direction (in/out) et pourquoi une prefix-list est-elle préférable à une ACL standard ?",
         "Filtrage Granulaire EIGRP via Distribute-List",
         "• Application : `distribute-list [prefix-list <name> | <acl>] in|out [interface]`.\n• En direction 'out' : Empêche l'annonce de certaines routes aux voisins.\n• En direction 'in' : Empêche l'installation dans la table de routage locale et la topologie EIGRP.\n• Avantage de la prefix-list : Permet le filtrage précis du masque réseau via les paramètres `ge` (greater-equal) et `le` (less-equal) avec des performances de recherche arborescente bien plus rapides.",
         "Cisco EIGRP Route Filtering Guide",
         "ip prefix-list BLOCK_LAN seq 10 deny 10.50.0.0/16 ge 24\nip prefix-list BLOCK_LAN seq 20 permit 0.0.0.0/0 le 32\nrouter eigrp 100\n distribute-list prefix-list BLOCK_LAN in GigabitEthernet0/0",
         "distribute-list avec prefix-list permet un filtrage de longueur de préfixe ge/le ultra précis."),

        ("015", "EIGRP Default Route Injection Methods",
         "Quelles sont les trois méthodes distinctes pour injecter une route par défaut (0.0.0.0/0) dans un domaine EIGRP ?",
         "Méthodes d'Injection de Route par Défaut EIGRP",
         "1. Redistribution d'une route statique par défaut : `ip route 0.0.0.0 0.0.0.0 ...` puis `redistribute static` sous le process EIGRP.\n2. Agrégation manuelle sur l'interface sortante : `ip summary-address eigrp <as> 0.0.0.0 0.0.0.0`.\n3. Commande héritée 'ip default-network <network-classful>' marquant un réseau externe candidat par défaut.",
         "Cisco IOS EIGRP Configuration Guide",
         "interface GigabitEthernet0/1\n ip summary-address eigrp 100 0.0.0.0 0.0.0.0\n! Injecte 0.0.0.0/0 uniquement vers ce voisin spécifique",
         "ip summary-address 0.0.0.0 0.0.0.0 sur une interface permet d'injecter la route par défaut de façon ciblée."),

        ("016", "EIGRP Offset-List & Metric Manipulation",
         "Quel est l'impact de la commande 'offset-list' sur la métrique EIGRP et dans quelle direction l'utilise-t-on pour influencer le choix de route ?",
         "Ajustement Artificiel de Métrique via Offset-List",
         "• Rôle : Ajoute un coût (offset) positif à la métrique de délai calculée pour une route spécifique identifiée par une ACL.\n• Direction IN : Augmente la métrique apprise sur une interface pour favoriser un chemin appris sur une autre interface.\n• Direction OUT : Augmente la métrique annoncée aux voisins pour les inciter à emprunter un autre chemin d'entrée.",
         "Cisco Command Reference",
         "access-list 10 permit 192.168.10.0 0.0.0.255\nrouter eigrp 100\n offset-list 10 in 5120 GigabitEthernet0/0",
         "offset-list ajoute de la métrique pour pénaliser un lien et forcer le basculement."),

        ("017", "EIGRP IPv6 Specifics & Link-Local Next-Hop",
         "Quelles sont les particularités architecturales d'EIGRP pour IPv6 concernant le Next-Hop et l'état de l'interface du processus ?",
         "Spécificités EIGRP IPv6",
         "• Next-Hop : EIGRP IPv6 utilise TOUJOURS l'adresse Link-Local (FE80::/10) du voisin comme passerelle de saut suivant, et non l'adresse Global Unicast.\n• État initial : En mode classique, le process `ipv6 router eigrp <as>` est désactivé par défaut (en état `shutdown`). Il faut impérativement taper `no shutdown`.\n• Activation d'interface : En classique, activé par `ipv6 eigrp <as>` sous chaque interface.",
         "RFC 7868 § 5.7",
         "ipv6 router eigrp 100\n no shutdown\ninterface Gi0/0\n ipv6 eigrp 100\n! Next-hop affiché :\nR1# show ipv6 route eigrp\n  via FE80::21B:D4FF:FE12:3456, GigabitEthernet0/0",
         "EIGRP IPv6 utilise toujours l'adresse Link-Local FE80:: comme Next-Hop."),

        ("018", "EIGRP Router-ID Election & Duplicate RID Behavior",
         "Comment le Router-ID (RID) EIGRP est-il élu et que se passe-t-il si deux routeurs EIGRP possèdent le même Router-ID ?",
         "Élection et Rôle du Router-ID EIGRP",
         "• Ordre d'élection : 1. Commande manuelle `eigrp router-id <ip>`, 2. Plus haute adresse IP sur interface Loopback active, 3. Plus haute adresse IP sur interface physique active.\n• Conséquence de doublon RID : L'adjacence EIGRP s'établit normalement (les Hello ne vérifient pas le RID) ! MAIS les routes externes redistribuées ayant le même RID source seront ignorées pour éviter les boucles.",
         "Cisco EIGRP Troubleshooting Guide",
         "router eigrp 100\n eigrp router-id 1.1.1.1\n! Les routes externes injectées avec ce RID sont protégées contre les boucles",
         "Deux RID EIGRP identiques peuvent former une adjacence, mais bloquent les routes externes."),

        ("019", "EIGRP Passive-Interface Behavior",
         "Quel est l'effet exact de la commande 'passive-interface' sous un processus EIGRP ?",
         "Comportement Passive-Interface en EIGRP",
         "• EIGRP cesse totalement d'émettre des paquets Hello (et tout paquet de contrôle) sur l'interface.\n• Aucune adjacence voisine ne peut se former à travers cette interface.\n• Le sous-réseau IP configuré sur cette interface continue pourtant d'être annoncé aux voisins sur les autres interfaces actives (contrairement à une suppression de la commande network).",
         "Cisco IOS Command Reference",
         "router eigrp 100\n passive-interface default\n no passive-interface GigabitEthernet0/0\n! Recommandation de sécurité : passive par défaut",
         "Passive-interface coupe les Hello mais continue d'annoncer le réseau connecté."),

        ("020", "EIGRP Convergence Timers : Hello & Hold Time",
         "Quelles sont les valeurs par défaut des timers Hello et Hold EIGRP sur liens LAN vs liens WAN lents, et comment le Hold Time est-il propagé ?",
         "Timers de Convergence EIGRP",
         "• Liens rapides (LAN Ethernet, point-to-point) : Hello = 5 secondes, Hold = 15 secondes (3x Hello).\n• Liens lents (multipoint < T1 1.544 Mbps) : Hello = 60 secondes, Hold = 180 secondes.\n• Règle clé : Le Hold Time est communiqué DANS les paquets Hello. Le routeur informe son voisin combien de temps il doit attendre avant de le déclarer mort.",
         "RFC 7868 § 3.2",
         "interface Gi0/0\n ip hello-interval eigrp 100 1\n ip hold-time eigrp 100 3\n! Permet une détection rapide sans BFD sur liaison critique",
         "Le Hold Time est envoyé au voisin pour lui indiquer combien de temps patienter.")
    ]

    for item in eigrp_data:
        cards.append({
            "id": f"fc-enarsi-d1-{item[0]}",
            "category": "ENARSI-D1 : EIGRP Enterprise Routing",
            "moduleCode": "ENARSI-D1",
            "moduleName": "Cisco CCNP ENARSI 300-410 - 1.0 Layer 3 Technologies",
            "difficulty": "Fondamental" if int(item[0]) <= 5 else ("Intermédiaire" if int(item[0]) <= 15 else "Avancé"),
            "frontTitle": item[1],
            "frontPrompt": item[2],
            "backTitle": item[3],
            "backContent": item[4],
            "rfcRef": item[5],
            "cliExample": item[6],
            "hint": item[7]
        })

    print(f"Added EIGRP: {len(cards)} cards")
    return cards

print("Script template ready")
