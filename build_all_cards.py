import json
import sys

def create_d4_cards():
    cards = []
    def add_c(title, prompt, b_title, b_content, hint, diff='Intermédiaire', rfc=None, cli=None):
        cid = f'fc-ccna-d4-{len(cards)+1:03d}'
        cards.append({
            'id': cid,
            'category': 'CCNA-D4 : IP Services',
            'moduleCode': 'CCNA-D4',
            'moduleName': 'Cisco CCNA 200-301 - 4.0 IP Services',
            'difficulty': diff,
            'frontTitle': title,
            'frontPrompt': prompt,
            'backTitle': b_title,
            'backContent': b_content,
            'rfcRef': rfc,
            'cliExample': cli,
            'hint': hint
        })

    # 1-20: NAT/PAT
    add_c('NAT Inside Local vs Inside Global',
          'Quelle est la différence fondamentale entre une adresse Inside Local et Inside Global dans la terminologie Cisco NAT ?',
          'Terminologie NAT Cisco (RFC 2663)',
          '• Inside Local : Adresse IP privée attribuée à un équipement sur le LAN interne (ex: 192.168.1.50). Non routable sur Internet.\n• Inside Global : Adresse IP publique légitime (allouée par le FAI) qui représente l\'hôte interne sur Internet.\n• Outside Local : Adresse IP d\'un hôte externe telle qu\'elle apparaît sur le réseau local interne.\n• Outside Global : Adresse IP publique réelle assignée à un hôte sur Internet.',
          'Inside Local = IP privée dans le LAN. Inside Global = IP publique sur Internet.', 'Fondamental', 'RFC 2663', 'R1# show ip nat translations')

    add_c('NAT Statique (1:1 Static NAT)',
          'Quel est le cas d\'usage du NAT Statique et sa syntaxe de configuration sur Cisco IOS ?',
          'Mappage Fixe Un pour Un',
          '• Rôle : Établit une correspondance permanente 1:1 entre une adresse IP privée et une adresse IP publique dédiée.\n• Cas d\'usage : Publication d\'un serveur interne (Web, Mail, SFTP) accessible depuis Internet.\n• Commande : "ip nat inside source static <IP-Locale> <IP-Globale>" avec "ip nat inside" et "ip nat outside" sur les interfaces.',
          'Association fixe 1:1 pour publier un serveur interne.', 'Fondamental', 'Cisco IOS IP Addressing Guide', 'R1(config)# ip nat inside source static 192.168.1.10 203.0.113.10')

    add_c('NAT Dynamique (Dynamic NAT Pool)',
          'Comment fonctionne le NAT Dynamique avec pool et que se passe-t-il quand le pool est épuisé ?',
          'Allocation Dynamique 1:1 à partir d\'un Pool',
          '• Fonctionnement : Les hôtes internes reçoivent temporairement une IP publique parmi un bloc (pool) défini.\n• Épuisement : Comme le NAT dynamique est en 1:1, si toutes les adresses du pool sont allouées, toute nouvelle requête est rejetée jusqu\'à expiration d\'un bail.',
          'Sans overload, c\'est du 1:1 : si le pool est vide, les nouveaux flux sont bloqués.', 'Intermédiaire', 'RFC 3022', 'R1(config)# ip nat pool POOL1 203.0.113.1 203.0.113.5 netmask 255.255.255.248')

    add_c('PAT / NAT Overload (Port Address Translation)',
          'Comment le PAT permet-il à des milliers d\'hôtes internes de partager une seule adresse IP publique ?',
          'Multiplexage de Ports de Couche 4 (PAT)',
          '• Principe : PAT modifie les numéros de ports source de couche 4 (TCP/UDP).\n• Chaque flux interne est associé à l\'IP publique unique + un port source unique (16 bits, ~65 000 sessions simultanées).\n• Le routeur conserve une table de correspondance [IP privée:Port <-> IP publique:Port].',
          'Le mot-clé overload utilise les ports TCP/UDP pour distinguer les hôtes.', 'Fondamental', 'RFC 3022 § 4.1', 'R1(config)# ip nat inside source list 1 interface Gi0/1 overload')

    add_c('Port Forwarding (PAT Statique)',
          'Comment rediriger le port TCP 80 d\'une IP publique vers le port 8080 d\'un serveur web interne ?',
          'Redirection de Port Spécifique',
          '• Commande : "ip nat inside source static tcp <IP-Locale> <Port-Local> <IP-Globale> <Port-Global>".\n• Exemple : "ip nat inside source static tcp 192.168.1.100 8080 203.0.113.2 80".\n• Permet d\'héberger plusieurs services différents sur une seule IP publique.',
          'Spécifier tcp/udp et les ports source et destination.', 'Intermédiaire', 'Cisco IOS NAT Guide', 'R1(config)# ip nat inside source static tcp 192.168.1.100 8080 203.0.113.2 80')

    add_c('Inspection de la Table NAT : show ip nat translations',
          'Que montre la commande show ip nat translations et que signifient les entrées avec ports ?',
          'Table de Traduction NAT Active',
          '• Entrée sans port : Traduction statique 1:1 permanente.\n• Entrée avec ports (IP:Port) : Session dynamique active gérée par PAT (Overload).\n• Affiche : Pro, Inside global, Inside local, Outside local, Outside global.',
          'Permet de vérifier la correspondance entre IP privée et IP/port public.', 'Fondamental', 'Cisco IOS Master Command List', 'R1# show ip nat translations')

    add_c('Statistiques NAT : show ip nat statistics',
          'Quelles informations clés fournit show ip nat statistics pour le diagnostic ?',
          'Compteurs et Diagnostic Global NAT',
          '• Affiche les interfaces configurées en inside et outside.\n• Nombre total de traductions actives.\n• Compteurs Hits (paquets traduits) et Misses (nouveaux flux créant une entrée).\n• État des pools et taux d\'allocation d\'adresses.',
          'Affiche interfaces inside/outside, hits/misses et état des pools.', 'Intermédiaire', 'Cisco IOS Command Reference', 'R1# show ip nat statistics')

    add_c('Purge de la Table NAT : clear ip nat translation',
          'Comment vider la table NAT en cas de saturation de sessions ?',
          'Réinitialisation des Traductions Dynamiques',
          '• Commande globale : "clear ip nat translation *".\n• Supprime immédiatement toutes les entrées dynamiques (interrompt les connexions en cours).\n• Ciblage fin possible par IP ou port spécifique.',
          'clear ip nat translation * pour vider toutes les sessions dynamiques.', 'Intermédiaire', 'Cisco IOS NAT Guide', 'R1# clear ip nat translation *')

    add_c('Timeouts NAT : Sessions TCP vs UDP',
          'Quels sont les délais d\'inactivité par défaut des traductions NAT sous Cisco IOS pour TCP et UDP ?',
          'Minuteurs de Rétention NAT',
          '• TCP Timeout : 86 400 secondes (24 heures) pour une connexion établie.\n• UDP Timeout : 300 secondes (5 minutes).\n• ICMP Timeout : 60 secondes.\n• DNS Timeout : 60 secondes.',
          'TCP = 24h par défaut ; UDP = 5min ; ICMP = 1min.', 'Intermédiaire', 'Cisco IOS NAT Guide', 'R1(config)# ip nat translation tcp-timeout 3600')

    add_c('Ordre des Opérations : Inside vers Outside',
          'Dans quel ordre un routeur traite-t-il un paquet allant d\'une interface inside vers une interface outside ?',
          'Ordre Inside vers Outside',
          '1. ACLs d\'entrée sur l\'interface inside.\n2. Décision de routage (Routing Table Lookup) pour trouver l\'interface de sortie.\n3. Traduction NAT (Inside vers Outside).\n4. ACLs de sortie sur l\'interface outside.\n• Règle : Le routage a lieu AVANT le NAT quand le flux va d\'inside vers outside !',
          'Inside vers Outside : le routage est fait AVANT le NAT.', 'Avancé', 'Cisco IOS Order of Operation', 'Ingress ACL -> Routing -> NAT -> Egress ACL')

    add_c('Ordre des Opérations : Outside vers Inside',
          'Dans quel ordre un routeur traite-t-il un paquet arrivant de l\'outside à destination du réseau inside ?',
          'Ordre Outside vers Inside',
          '1. ACLs d\'entrée sur l\'interface outside.\n2. Traduction NAT de destination (Outside vers Inside).\n3. Décision de routage vers le LAN interne.\n4. ACLs de sortie sur l\'interface inside.\n• Règle : Le NAT a lieu AVANT le routage lors d\'un flux Outside vers Inside !',
          'Outside vers Inside : le NAT est fait AVANT la décision de routage.', 'Avancé', 'Cisco IOS Order of Operation', 'Ingress ACL -> NAT -> Routing -> Egress ACL')

    add_c('NAT et Protocoles Applicatifs (ALGs)',
          'Pourquoi FTP et SIP nécessitent-ils un module ALG (Application Layer Gateway) avec le NAT ?',
          'Application Layer Gateway (ALG)',
          '• FTP Actif et SIP intègrent des adresses IP et ports dans le corps même des données utiles (Payload L7).\n• L\'ALG inspecte le payload en profondeur (DPI) et réécrit les adresses IP internes pour préserver la connectivité.',
          'L\'ALG modifie les adresses IP encapsulées dans le payload applicatif L7 (FTP, SIP).', 'Avancé', 'RFC 2663 § 2.9', 'R1(config)# ip nat service ftp')

    add_c('Double NAT (Twice NAT)',
          'Qu\'est-ce que le Twice NAT et dans quelle situation est-il indispensable ?',
          'Translation Simultanée Source et Destination',
          '• Définition : Traduction simultanée de l\'IP source ET de l\'IP destination d\'un paquet.\n• Cas d\'usage : Fusion d\'entreprises où les deux réseaux utilisent les mêmes plages privées RFC 1918 (conflit de doublons).',
          'Utilisé lors de fusions d\'entreprises ayant des sous-réseaux IP identiques.', 'Avancé', 'Cisco ASA NAT Guide', 'R1(config)# ip nat pool OVERLAP_SRC ...')

    add_c('NAT Virtual Interface (NVI)',
          'Quelle limitation du NAT traditionnel l\'architecture Cisco NVI résout-elle ?',
          'Suppression de la Dichotomie Inside/Outside',
          '• Le NAT traditionnel exige qu\'un paquet transite entre inside et outside.\n• NVI utilise "ip nat enable" sous les interfaces et achemine le trafic vers une interface virtuelle NVI0, permettant le NAT entre n\'importe quelles zones.',
          'NVI remplace inside/outside par ip nat enable.', 'Avancé', 'Cisco IOS NVI Guide', 'R1(config-if)# ip nat enable')

    add_c('Carrier-Grade NAT (CGNAT) & RFC 6598',
          'Quelle est la plage IPv4 réservée au Carrier-Grade NAT (CGNAT) par la RFC 6598 ?',
          'Plage Réservée CGNAT (100.64.0.0/10)',
          '• Plage réservée : 100.64.0.0/10 (de 100.64.0.0 à 100.127.255.255, 4 millions d\'adresses).\n• Utilisée par les FAI pour adresser les box clientes sans entrer en conflit avec la RFC 1918 des foyers.',
          '100.64.0.0/10 : réservé aux FAI pour éviter les conflits RFC 1918.', 'Intermédiaire', 'RFC 6598', 'R1# show ip route 100.64.0.0 255.192.0.0')

    add_c('NAT64 & DNS64',
          'Quel est le rôle du couple NAT64 / DNS64 dans les réseaux IPv6-only ?',
          'Interconnexion Clients IPv6 vers Serveurs IPv4',
          '• DNS64 synthétise une adresse IPv6 fictive préfixée par 64:ff9b::/96 pour les serveurs IPv4-only.\n• NAT64 intercepte le paquet IPv6, retire le préfixe et traduit le trafic en IPv4 standard.',
          'DNS64 crée une fausse IPv6 (64:ff9b::) et NAT64 traduit vers l\'IPv4.', 'Avancé', 'RFC 6146 / RFC 6147', 'Préfixe Well-Known : 64:ff9b::/96')

    add_c('Policy NAT (NAT avec Route-Map)',
          'Comment empêcher le NAT pour le trafic d\'un VPN IPsec tout en traduisant le trafic Internet ?',
          'Bypass NAT via ACL / Route-Map',
          '• L\'ACL liée au NAT contient un "deny" vers le réseau distant du VPN et un "permit any" pour Internet.\n• Les paquets vers le site VPN distant conservent ainsi leur IP privée source originale.',
          'Deny dans l\'ACL NAT pour le sous-réseau distant du VPN pour éviter la traduction.', 'Avancé', 'Cisco Security Guide', 'R1(config)# access-list 105 deny ip 192.168.1.0 0.0.0.255 192.168.2.0 0.0.0.255')

    add_c('Déclaration d\'un Pool NAT avec Prefix-Length',
          'Quelle est la syntaxe pour déclarer un pool NAT avec prefix-length sous Cisco IOS ?',
          'Syntaxe ip nat pool prefix-length',
          '• Commande : "ip nat pool NOM_POOL 203.0.113.1 203.0.113.6 prefix-length 29".\n• Équivalent strict de la syntaxe "netmask 255.255.255.248".',
          'ip nat pool <nom> <ip-début> <ip-fin> prefix-length <longueur>.', 'Fondamental', 'Cisco IOS Command Reference', 'R1(config)# ip nat pool POOL_EXT 203.0.113.1 203.0.113.6 prefix-length 29')

    add_c('NAT Static Network Mapping',
          'Comment mapper un sous-réseau privé complet /24 vers un /24 public en une seule commande ?',
          'NAT Statique de Sous-Réseau Entier',
          '• Commande : "ip nat inside source static network <IP-Réseau-Local> <IP-Réseau-Global> /24".\n• Conserve automatiquement les derniers octets d\'hôtes sans devoir taper 254 lignes individuelles.',
          'ip nat inside source static network traduit tout le sous-réseau en conservant les hôtes.', 'Intermédiaire', 'Cisco IOS NAT Guide', 'R1(config)# ip nat inside source static network 10.1.1.0 203.0.113.0 /24')

    add_c('Attaque par Épuisement de Ports PAT',
          'Comment un hôte compromis peut-il saturer le PAT d\'un routeur et comment s\'en protéger ?',
          'PAT Port Exhaustion & Protection Cisco',
          '• L\'attaquant ouvre des milliers de connexions TCP SYN pour consommer les ~65 000 ports disponibles.\n• Protection : "ip nat translation max-entries <nombre>" pour plafonner le nombre de sessions autorisées par hôte.',
          'ip nat translation max-entries limite le nombre de sessions par hôte pour bloquer l\'épuisement.', 'Intermédiaire', 'Cisco Security Best Practices', 'R1(config)# ip nat translation max-entries 3000')

    # 21-35: NTP
    add_c('Rôle de NTP dans le Réseau',
          'Pourquoi la synchronisation précise de l\'heure par NTP est-elle indispensable ?',
          'Importance Critique de NTP (RFC 5905)',
          '• Corrélation des logs Syslog lors d\'incidents de sécurité.\n• Validation des certificats X.509 (TLS, IPsec) qui échoue si l\'horloge dévie.\n• Kerberos / Active Directory rejette toute connexion si l\'écart dépasse 5 minutes.',
          'UDP 123. Vital pour les logs Syslog et les certificats TLS.', 'Fondamental', 'RFC 5905', 'R1# show clock detail')

    add_c('Niveaux de Stratum NTP (0 à 16)',
          'Que représente le niveau de Stratum en NTP et que signifie Stratum 16 ?',
          'Hiérarchie des Stratums NTP',
          '• Stratum 0 : Horloges de référence physique (GPS, césium).\n• Stratum 1 : Serveurs directement reliés à une source Stratum 0.\n• Stratum 2 : Serveurs synchronisés sur un Stratum 1.\n• Stratum 16 : Équipement non synchronisé ou inaccessible (non fiable).',
          'Stratum 0 = GPS/Horloge atomique. Stratum 16 = non synchronisé.', 'Fondamental', 'RFC 5905 § 7.3', 'R1# show ntp status')

    add_c('NTP Client/Server vs Peer',
          'Quelle est la différence entre le mode Client/Server et le mode Symmetric Peer en NTP ?',
          'Modes d\'Association NTP',
          '• Client/Server ("ntp server <IP>") : Le client reçoit l\'heure sans influencer le serveur (unidirectionnel).\n• Symmetric Peer ("ntp peer <IP>") : Deux routeurs de même niveau se synchronisent mutuellement pour la redondance.',
          'ntp server = réception unilatérale. ntp peer = synchronisation mutuelle.', 'Intermédiaire', 'RFC 5905 § 3', 'R1(config)# ntp peer 10.1.1.2')

    add_c('show ntp status : Validation',
          'Quels indicateurs clés certifient la synchronisation dans show ntp status ?',
          'Champs Clés de show ntp status',
          '• "Clock is synchronized" indique le succès.\n• Stratum : Niveau de distance à la source.\n• Reference : IP du serveur de référence retenu.\n• Offset : Décalage horaire en millisecondes (doit être proche de 0 ms).',
          'Vérifier "Clock is synchronized", le stratum et l\'offset.', 'Fondamental', 'Cisco IOS Command Reference', 'R1# show ntp status')

    add_c('show ntp associations : Symboles d\'État',
          'Dans show ntp associations, que signifient les symboles *, + et ~ ?',
          'Symboles de Sélection NTP',
          '• * (Sys.Peer / Master) : Serveur maître sélectionné par l\'algorithme.\n• + (Candidate) : Candidat valide en secours immédiat.\n• - (Outlyer) : Serveur rejeté (dérive anormale).\n• ~ (Configured) : Configuré statiquement dans la configuration.',
          '* = maître sélectionné ; + = candidat valide ; - = rejeté.', 'Intermédiaire', 'Cisco Command Reference', 'R1# show ntp associations')

    add_c('Authentification NTP Sécurisée',
          'Comment sécuriser les échanges NTP par clé partagée sous Cisco IOS ?',
          'Sécurisation NTP avec Clé MD5 / SHA',
          '1. "ntp authenticate"\n2. "ntp authentication-key 1 md5 CléSecrète"\n3. "ntp trusted-key 1"\n4. "ntp server <IP> key 1".\n• Tout paquet sans le hash valide est immédiatement détruit.',
          'ntp authenticate, authentication-key, trusted-key, puis key sur ntp server.', 'Intermédiaire', 'Cisco Security Guide', 'R1(config)# ntp authenticate\nR1(config)# ntp trusted-key 1')

    add_c('NTP Source Interface (Loopback)',
          'Pourquoi utiliser une interface Loopback comme source NTP ?',
          'Stabilité de la Source NTP',
          '• Si une interface physique tombe, l\'IP source change et brise les associations sécurisées ou filtrées.\n• "ntp source Loopback0" garantit une IP source immuable tant que le routeur est actif.',
          'La Loopback ne tombe jamais, assurant la stabilité de la session NTP.', 'Fondamental', 'Cisco Best Practices', 'R1(config)# ntp source Loopback0')

    add_c('NTP Access-Group (Filtrage par ACL)',
          'À quoi sert ntp access-group et que fait l\'option serve-only ?',
          'Contrôle d\'Accès NTP par ACL',
          '• Restreint les échanges NTP par des ACLs standards IPv4.\n• "serve-only" autorise les clients à synchroniser leur heure sur le routeur sans jamais modifier l\'horloge de ce dernier.',
          'serve-only permet aux clients de prendre l\'heure sans toucher au routeur.', 'Avancé', 'Cisco NTP Guide', 'R1(config)# ntp access-group serve-only 10')

    add_c('Configuration Fuseau Horaire et Heure d\'Été',
          'Comment régler le fuseau Paris (UTC+1) et l\'heure d\'été sous Cisco IOS ?',
          'clock timezone & summer-time',
          '• "clock timezone CET 1 0" pour UTC+1.\n• "clock summer-time CEST recurring last Sun Mar 2:00 last Sun Oct 3:00" pour le passage automatique été/hiver.\n• L\'horloge interne reste en UTC.',
          'clock timezone CET 1 0 et clock summer-time recurring.', 'Fondamental', 'Cisco Fundamentals Guide', 'R1(config)# clock timezone CET 1 0')

    add_c('NTP Broadcast vs Multicast',
          'Comment diffuser l\'heure sur un LAN sans configurer l\'IP du serveur sur chaque client ?',
          'Diffusion d\'Heure NTP Broadcast / Multicast',
          '• Le serveur utilise "ntp broadcast" ou "ntp multicast 224.0.1.1" sur l\'interface LAN.\n• Les clients écoutent avec "ntp broadcast client" ou "ntp multicast client".',
          'Permet aux clients d\'écouter l\'heure sur le LAN sans configuration individuelle.', 'Intermédiaire', 'RFC 5905 § 3.2', 'SW1(config-if)# ntp broadcast client')

    add_c('NTP Master Local (Horloge Autonome)',
          'Que fait la commande ntp master et quel est son danger ?',
          'Routeur Érigé en Serveur de Référence',
          '• "ntp master [stratum]" force le routeur à se déclarer serveur NTP de référence même sans source externe.\n• Utile en réseau isolé d\'usine. Danger : si connecté à Internet, peut propager une fausse heure.',
          'ntp master X : le routeur se prend pour une référence. À réserver aux réseaux isolés.', 'Intermédiaire', 'Cisco NTP Guide', 'R1(config)# ntp master 8')

    add_c('SNTP (Simple NTP) vs NTPv4',
          'En quoi SNTP diffère-t-il de l\'implémentation complète de NTPv4 ?',
          'Comparatif SNTP vs NTP Complet',
          '• SNTP (RFC 4330) applique l\'heure reçue sans calcul statistique complexe de dérive d\'oscillateur.\n• Adapté aux petits switches ou IoT ayant peu de CPU. NTPv4 reste indispensable sur les cœurs de réseau.',
          'SNTP est une version allégée sans calcul statistique de dérive pour petits équipements.', 'Fondamental', 'RFC 4330', 'SW1(config)# sntp server 192.168.1.1')

    add_c('Forcer la Version NTP sous Cisco IOS',
          'Comment forcer la version 4 du protocole NTP sous Cisco IOS ?',
          'Spécification de Version NTP',
          '• Commande : "ntp server <IP> version 4".\n• NTPv4 apporte le support natif d\'IPv6, une précision accrue et le chiffrement renforcé.',
          'Ajouter version 4 à la fin de la commande ntp server.', 'Fondamental', 'Cisco Command Reference', 'R1(config)# ntp server 10.1.1.10 version 4')

    add_c('Software Clock vs Hardware Calendar',
          'Quelle est la différence entre Clock logicielle et Calendar matériel sur routeur Cisco ?',
          'Clock RAM vs Calendar Batterie',
          '• Clock : Horloge en mémoire vive synchronisée par NTP.\n• Calendar : Horloge matérielle temps réel (RTC) alimentée par pile bouton sur la carte mère.\n• "clock update-calendar" copie l\'heure NTP sur la pile RTC.',
          'Clock = RAM. Calendar = pile RTC matérielle qui survit aux coupures.', 'Intermédiaire', 'Cisco System Guide', 'R1(config)# clock update-calendar')

    add_c('NTP Poll Interval & Reach Register',
          'Que signifient poll et reach dans show ntp associations ?',
          'Fréquence de Sondage et Portée NTP',
          '• Poll : Intervalle d\'interrogation en secondes (ex: 64s).\n• Reach : Registre à décalage de 8 bits affiché en octal. La valeur 377 (11111111 en binaire) atteste que les 8 dernières sondes ont toutes réussi.',
          'Poll = intervalle. Reach 377 = 8 succès consécutifs sur les 8 dernières requêtes.', 'Intermédiaire', 'RFC 5905 § 7.3', 'R1# show ntp associations')

    # 36-55: DHCPv4 & DHCPv6
    add_c('Processus DORA de DHCPv4',
          'Quelles sont les 4 étapes de DHCPv4 (DORA) et les ports UDP utilisés ?',
          'Séquence DORA (RFC 2131)',
          '1. Discover (Client -> Broadcast 255.255.255.255)\n2. Offer (Serveur -> Client)\n3. Request (Client -> Broadcast confirmation)\n4. Acknowledge (Serveur -> Client validation du bail).\n• Ports UDP : 67 (Serveur) et 68 (Client).',
          'DORA : Discover -> Offer -> Request -> Acknowledge. Ports UDP 67/68.', 'Fondamental', 'RFC 2131', 'Wireshark: bootp.type == 1')

    add_c('DHCP Relay Agent (ip helper-address)',
          'Pourquoi utiliser ip helper-address quand le serveur DHCP est sur un autre sous-réseau ?',
          'Relais DHCP Unicast',
          '• Les routeurs bloquent les broadcasts des clients. ip helper-address intercepte le broadcast UDP 67, le convertit en unicast routable vers le serveur, et renseigne le champ GIADDR.',
          'Transforme le broadcast DHCP client en unicast routable vers le serveur distant.', 'Fondamental', 'RFC 1542', 'R1(config-if)# ip helper-address 10.10.10.5')

    add_c('Services Relayés par ip helper-address',
          'Quels sont les services UDP relayés par défaut par ip helper-address ?',
          'Les 8 Ports UDP Relayés par Défaut',
          'Relaye automatiquement 8 services : DHCP/BOOTP (67/68), DNS (53), TFTP (69), Time (37), TACACS (49), NetBIOS (137/138).\n• Modifiable avec "ip forward-protocol udp".',
          'Relaye DHCP (67/68), DNS (53), TFTP (69), Time (37), TACACS (49), NetBIOS (137/138).', 'Intermédiaire', 'Cisco Command Reference', 'R1(config)# no ip forward-protocol udp 137')

    add_c('Configuration Serveur DHCP sur Routeur Cisco',
          'Quelles sont les commandes pour configurer un pool DHCP complet sous Cisco IOS ?',
          'Pool DHCP Complet Cisco IOS',
          '1. "ip dhcp excluded-address 192.168.1.1 192.168.1.10"\n2. "ip dhcp pool LAN_USERS"\n3. "network 192.168.1.0 255.255.255.0"\n4. "default-router 192.168.1.1"\n5. "dns-server 8.8.8.8"\n6. "lease 1".',
          'Exclure les adresses statiques d\'abord, puis network, default-router et dns-server.', 'Fondamental', 'Cisco IP Services Guide', 'R1(config)# ip dhcp excluded-address 192.168.1.1 192.168.1.10')

    add_c('Conflits d\'Adresses DHCP : Détection & Show',
          'Comment Cisco IOS détecte-t-il les conflits DHCP avant attribution ?',
          'Détection Proactive de Conflit',
          '• Le routeur ping 2 fois l\'adresse IP avant de proposer le bail. Si une réponse arrive, l\'IP est mise en quarantaine dans la table conflict.\n• Côté client : émet un Gratuitous ARP et renvoie un DHCP Decline en cas de doublon.',
          'Le routeur ping l\'adresse avant de l\'offrir. Commande : show ip dhcp conflict.', 'Intermédiaire', 'Cisco IP Addressing Guide', 'R1# show ip dhcp conflict')

    add_c('Baux DHCP Actifs : show ip dhcp binding',
          'Que contient la commande show ip dhcp binding ?',
          'Table des Baux DHCP Actifs',
          '• Affiche la correspondance entre l\'adresse IP allouée, l\'adresse MAC matérielle du client (Client ID), la date d\'expiration et le type (Automatic ou Manual).',
          'Affiche IP, MAC et date d\'expiration des baux alloués.', 'Fondamental', 'Cisco Command Reference', 'R1# show ip dhcp binding')

    add_c('DHCP Snooping : Ports Trusted vs Untrusted',
          'Comment DHCP Snooping neutralise-t-il un serveur DHCP pirate (Rogue DHCP) ?',
          'Classification des Ports DHCP Snooping',
          '• Ports Untrusted (défaut) : Bloquent immédiatement tout paquet émis par un serveur (DHCP Offer, ACK, NAK).\n• Ports Trusted : Seuls ports autorisés à relayer les messages serveurs vers les clients légitimes.',
          'Les ports Untrusted bloquent les réponses serveurs (Offer/ACK). Seuls les Trusted les laissent passer.', 'Intermédiaire', 'Cisco Security Guide', 'SW1(config-if)# ip dhcp snooping trust')

    add_c('Table de Liaison DHCP Snooping Binding',
          'Quelles informations sont stockées dans la table DHCP Snooping Binding ?',
          'Données de la Table Snooping Binding',
          '• Enregistre : Adresse MAC du client, adresse IP obtenue, durée du bail, numéro de VLAN et port physique.\n• Sert de base de données de référence inviolable pour Dynamic ARP Inspection (DAI) et IP Source Guard.',
          'Contient MAC, IP, Bail, VLAN et Port. Utilisé par DAI et IP Source Guard.', 'Intermédiaire', 'Cisco Switch Guide', 'SW1# show ip dhcp snooping binding')

    add_c('Option DHCP 82 & Commandes de Contournement',
          'Quel est le rôle de l\'Option DHCP 82 et pourquoi génère-t-elle des rejets sans configuration adéquate ?',
          'Option DHCP 82 (Relay Agent Information)',
          '• Insère le Circuit ID et Remote ID pour localiser le port physique du switch d\'où provient le client.\n• Si le switch l\'ajoute avec une IP d\'agent nulle, le routeur rejette le paquet. Résolution : "no ip dhcp snooping information option" sur le switch.',
          'Transmet l\'ID de switch et de port au serveur. no ip dhcp snooping info opt évite les rejets.', 'Avancé', 'RFC 3046', 'SW1(config)# no ip dhcp snooping information option')

    add_c('Attaque par Famine DHCP (DHCP Starvation)',
          'Comment fonctionne l\'attaque DHCP Starvation et comment la contrer ?',
          'Attaque par Famine de Baux & Parades',
          '• L\'attaquant inonde le réseau de requêtes Discover avec de fausses MACs pour épuiser le pool d\'adresses.\n• Parades : Port Security (limitation du nombre de MACs par port) et "ip dhcp snooping limit rate <pps>".',
          'L\'attaque épuise le pool d\'IP. Bloquée par Port Security et rate limiting snooping.', 'Intermédiaire', 'Cisco Security Guidelines', 'SW1(config-if)# ip dhcp snooping limit rate 15')

    add_c('SLAAC IPv6 (Autoconfiguration sans État)',
          'Comment fonctionne SLAAC en IPv6 et quels messages ICMPv6 sont utilisés ?',
          'SLAAC (RFC 4862)',
          '• Le client émet un Router Solicitation (RS - type 133 vers FF02::2).\n• Le routeur répond par un Router Advertisement (RA - type 134) contenant le préfixe /64.\n• Le client génère sa partie hôte (EUI-64 ou aléatoire) et teste son unicité par DAD.',
          'SLAAC utilise RS (133) et RA (134) pour autoconfigurer l\'adresse sans serveur DHCP.', 'Intermédiaire', 'RFC 4862', 'R1(config-if)# no ipv6 nd ra suppress')

    add_c('Stateless DHCPv6 et le Flag O',
          'Quel est le rôle du Stateless DHCPv6 et quel flag du paquet RA est activé ?',
          'Stateless DHCPv6 (Flag O)',
          '• Le client génère son adresse IPv6 via SLAAC, mais interroge un serveur DHCPv6 pour obtenir les DNS et options annexes.\n• Activé par la commande "ipv6 nd other-config-flag" sur l\'interface du routeur.',
          'Flag O (Other) : IP via SLAAC, mais DNS et options via DHCPv6.', 'Intermédiaire', 'RFC 8415', 'R1(config-if)# ipv6 nd other-config-flag')

    add_c('Stateful DHCPv6 et le Flag M',
          'En quoi le Stateful DHCPv6 diffère-t-il et quel flag est requis ?',
          'Stateful DHCPv6 (Flag M)',
          '• Le serveur DHCPv6 gère et alloue l\'adresse IPv6 complète ainsi que les options (comme en IPv4).\n• Activé par "ipv6 nd managed-config-flag". La passerelle reste l\'adresse Link-Local du routeur.',
          'Flag M (Managed) : L\'adresse IP complète est attribuée par le serveur DHCPv6.', 'Intermédiaire', 'RFC 8415', 'R1(config-if)# ipv6 nd managed-config-flag')

    add_c('Messages DHCPv6 (SARR)',
          'Quels sont les 4 messages de négociation en DHCPv6 (SARR) et les ports UDP ?',
          'Séquence SARR en DHCPv6',
          '• 1. Solicit (Client vers FF02::1:2)\n• 2. Advertise (Serveurs)\n• 3. Request (Client)\n• 4. Reply (Serveur).\n• Ports UDP : 546 (Client) et 547 (Serveur/Relais).',
          'SARR : Solicit -> Advertise -> Request -> Reply. Ports UDP 546 et 547.', 'Intermédiaire', 'RFC 8415 § 5', 'Wireshark: dhcpv6')

    add_c('Détection d\'Adresse IPv6 en Double (DAD)',
          'Comment fonctionne le mécanisme DAD (Duplicate Address Detection) en IPv6 ?',
          'Procédure DAD (RFC 4862)',
          '• L\'adresse est placée à l\'état "Tentative".\n• Le nœud émet un Neighbor Solicitation (NS - type 135) avec IP source :: vers son adresse Solicited-Node.\n• Si aucune réponse (NA) n\'arrive, l\'adresse est validée.',
          'DAD teste l\'adresse provisoire avec un Neighbor Solicitation pour éviter les doublons.', 'Intermédiaire', 'RFC 4862 § 5.4', 'R1# show ipv6 interface Gi0/0')

    # 51-60: DNS
    add_c('Résolution DNS : Récursive vs Itérative',
          'Quelle est la différence entre une requête DNS récursive et itérative ?',
          'Requêtes DNS Récursives vs Itératives',
          '• Récursive : Le client demande au resolver local d\'obtenir la réponse finale complète pour lui.\n• Itérative : Le resolver interroge successivement la hiérarchie (Racines . -> TLD .com -> Serveurs faisant autorité).',
          'Client vers Resolver = Récursif. Resolver vers Hiérarchie = Itératif.', 'Fondamental', 'RFC 1034 / 1035', 'Host# nslookup www.cisco.com')

    add_c('Enregistrements DNS : A, AAAA, CNAME, MX, PTR',
          'Quels sont les rôles des enregistrements DNS majeurs (A, AAAA, CNAME, MX, PTR) ?',
          'Types d\'Enregistrements DNS Standards',
          '• A : Résolution nom vers IPv4.\n• AAAA : Résolution nom vers IPv6.\n• CNAME : Alias pointant vers un autre nom.\n• MX : Serveur de messagerie du domaine.\n• PTR : Résolution inverse (IP vers nom).',
          'A = IPv4, AAAA = IPv6, CNAME = Alias, MX = Mail, PTR = Inverse.', 'Fondamental', 'RFC 1035', 'srv1.lan. IN A 192.168.1.10')

    add_c('Configuration Client DNS sur Cisco IOS',
          'Quelles sont les commandes pour configurer le client DNS sous Cisco IOS ?',
          'Commandes DNS Cisco IOS',
          '• "ip domain lookup" : Active la résolution DNS.\n• "ip name-server <IP1> <IP2>" : Déclare les résolveurs récursifs.\n• "ip domain name <domaine>" : Définit le suffixe par défaut.',
          'ip domain lookup, ip name-server, et ip domain name.', 'Fondamental', 'Cisco Command Reference', 'R1(config)# ip name-server 8.8.8.8 1.1.1.1')

    add_c('Désactiver le DNS Lookup (no ip domain lookup)',
          'Pourquoi désactiver le DNS lookup en lab ou sur routeur de production sans serveur DNS ?',
          'Prévention du Blocage sur Faute de Frappe',
          '• Par défaut, toute faute de frappe en CLI est interprétée comme un nom d\'hôte et le routeur envoie des requêtes broadcast 255.255.255.255 en bloquant le terminal.\n• "no ip domain lookup" élimine ce gel.',
          'no ip domain lookup empêche le terminal de se figer lors d\'une faute de frappe.', 'Fondamental', 'Cisco Troubleshooting Guide', 'R1(config)# no ip domain lookup')

    add_c('DNS : Ports UDP 53 vs TCP 53',
          'Quand le protocole DNS utilise-t-il TCP 53 au lieu de UDP 53 ?',
          'Transport DNS : UDP vs TCP',
          '• UDP 53 : Requêtes standards rapides (< 512 octets).\n• TCP 53 : Réponses tronquées (> 512 octets, flag TC), transferts de zone (AXFR/IXFR) et clés DNSSEC volumineuses.',
          'UDP 53 pour les requêtes standard. TCP 53 si tronqué (>512 octets) ou transfert de zone.', 'Intermédiaire', 'RFC 7766', 'Port UDP 53 vs Port TCP 53')

    # 61-75: SNMP
    add_c('Architecture SNMP : NMS, Agent, MIB & OID',
          'Comment s\'articule l\'architecture SNMP entre NMS, Agent, MIB et OID ?',
          'Composants de l\'Architecture SNMP',
          '• NMS : Serveur de supervision central qui interroge et collecte.\n• Agent : Démon sur le switch/routeur fournissant les métriques.\n• MIB : Base hiérarchique de variables supervisées.\n• OID : Identifiant numérique unique d\'une variable (ex: 1.3.6.1.2.1.1.3).',
          'NMS = serveur de monitoring. Agent = switch. MIB = arborescence. OID = identifiant numérique.', 'Fondamental', 'RFC 3411', 'NMS --(Get UDP 161)--> Agent')

    add_c('Opérations SNMP : Get, Set, Trap, Inform',
          'Quelles sont les opérations SNMP et la différence clé entre Trap et Inform ?',
          'Types de Messages SNMP',
          '• Get/Set : Lecture et écriture déclenchées par le NMS (port UDP 161).\n• Trap : Alerte asynchrone non acquittée envoyée par l\'agent vers le NMS (port UDP 162, risque de perte).\n• Inform : Alerte avec acquittement obligatoire du NMS (garantie de livraison).',
          'Trap = non acquitté (risque de perte). Inform = acquitté obligatoirement par le NMS.', 'Intermédiaire', 'RFC 3416', 'R1(config)# snmp-server enable traps')

    add_c('SNMP Versions : v1, v2c et v3',
          'Pourquoi SNMPv1 et SNMPv2c sont-ils interdits en environnement sécurisé ?',
          'Vulnérabilités de SNMPv1/v2c',
          '• v1 et v2c transmettent la Community String en texte clair sur le réseau, facilement interceptable par reniflage.\n• SNMPv3 apporte une sécurité cryptographique complète (authentification HMAC et chiffrement AES).',
          'v1/v2c = mot de passe en clair. v3 = authentification et chiffrement AES.', 'Fondamental', 'RFC 3414', 'SW1(config)# snmp-server group G1 v3 priv')

    add_c('Niveaux de Sécurité SNMPv3',
          'Quels sont les 3 niveaux de sécurité de SNMPv3 (noAuthNoPriv, authNoPriv, authPriv) ?',
          'Les 3 Niveaux de Sécurité SNMPv3',
          '• noAuthNoPriv : Pas d\'authentification par mot de passe, pas de chiffrement.\n• authNoPriv : Authentification par hash HMAC (MD5/SHA), mais données en clair.\n• authPriv : Authentification HMAC + chiffrement symétrique complet (DES/AES-128/AES-256).',
          'noAuthNoPriv = rien. authNoPriv = auth seule. authPriv = auth + chiffrement AES.', 'Intermédiaire', 'RFC 3414 § 1.4', 'auth sha Pass1 priv aes 128 Pass2')

    add_c('Configuration SNMPv3 sur Cisco IOS',
          'Quelles sont les 3 commandes pour créer un utilisateur SNMPv3 en mode authPriv ?',
          'Déploiement SNMPv3 Cisco IOS',
          '1. "snmp-server view VUE iso included"\n2. "snmp-server group GRP v3 priv read VUE write VUE"\n3. "snmp-server user USR GRP v3 auth sha CléAuth priv aes 128 CléPriv".',
          '1. view -> 2. group (priv) -> 3. user (auth sha + priv aes).', 'Avancé', 'Cisco SNMP Guide', 'R1(config)# snmp-server user ADMIN GRP v3 auth sha Pass1 priv aes 128 Pass2')

    add_c('SNMP Community Strings : RO vs RW',
          'Quelle est la différence entre une communauté RO et RW et quel est le risque de RW ?',
          'Droits des Communautés SNMP',
          '• RO (Read-Only) : Autorise la lecture des métriques uniquement.\n• RW (Read-Write) : Autorise la modification de la configuration de l\'équipement.\n• Risque de RW : Un attaquant découvrant la communauté peut reconfigurer ou couper le routeur.',
          'RO = lecture seule. RW = écriture (danger : modification de configuration par un attaquant).', 'Fondamental', 'Cisco Best Practices', 'R1(config)# snmp-server community PublicStr RO 10')

    add_c('Ports UDP SNMP : Port 161 vs Port 162',
          'Quels sont les rôles des ports UDP 161 et 162 en SNMP ?',
          'Ports UDP 161 et 162',
          '• Port UDP 161 : Écouté par l\'agent (switch/routeur) pour recevoir les requêtes Get/Set du NMS.\n• Port UDP 162 : Écouté par le serveur NMS pour recevoir les Traps et Informs des agents.',
          'UDP 161 = Agent (requêtes NMS). UDP 162 = NMS (réception des Traps/alertes).', 'Fondamental', 'IANA Port Numbers', 'UDP 161: Polling / UDP 162: Traps')

    # 71-85: Syslog & Logging
    add_c('Les 8 Niveaux de Gravité Syslog (0 à 7)',
          'Listez dans l\'ordre les 8 niveaux de gravité Syslog (0 à 7).',
          'Niveaux Syslog RFC 5424',
          'Mnémonique : Every Awesome Cisco Engineer Will Need Icecream Daily\n0: Emergency\n1: Alert\n2: Critical\n3: Error\n4: Warning\n5: Notice\n6: Informational\n7: Debugging.',
          '0=Emergency, 1=Alert, 2=Critical, 3=Error, 4=Warning, 5=Notice, 6=Info, 7=Debug.', 'Fondamental', 'RFC 5424', '0 (plus critique) à 7 (debugging)')

    add_c('Format d\'un Message Syslog Cisco IOS',
          'Décomposez le format standard d\'un message de log Cisco IOS.',
          'Anatomie du Message Syslog',
          'Format : [Timestamp]: %[Facility]-[Severity]-[MNEMONIC]: [Description]\nExemple : %LINK-3-UPDOWN: Interface Gi0/1, changed state to up\n• Facility = LINK, Severity = 3 (Error), Mnemonic = UPDOWN.',
          '%FACILITY-SEVERITY-MNEMONIC: Description (ex: %OSPF-5-ADJCHG).', 'Fondamental', 'Cisco System Message Guide', '%SYS-5-CONFIG_I: Configured from console')

    add_c('Destinations de Logs sous Cisco IOS',
          'Quelles sont les 4 destinations de logs possibles sous Cisco IOS ?',
          'Les 4 Cibles de Journalisation',
          '1. Console (logging console) : Port physique série.\n2. Monitor (logging monitor) : Sessions SSH/Telnet distantes.\n3. Buffered (logging buffered) : RAM circulaire locale.\n4. Host (logging host) : Serveur Syslog distant (UDP port 514).',
          'Console, Monitor (SSH), Buffered (RAM), Host (serveur distant UDP 514).', 'Fondamental', 'Cisco Command Reference', 'R1(config)# logging host 192.168.1.10')

    add_c('Activation des Logs sur Session SSH (terminal monitor)',
          'Pourquoi ne voit-on aucun log sur une session SSH par défaut et quelle commande taper ?',
          'terminal monitor sur Ligne Virtuelle VTY',
          '• Par mesure de confort, les logs ne s\'affichent pas sur les sessions distantes par défaut.\n• La commande "terminal monitor" en mode privilège active l\'affichage pour la session courante.',
          'terminal monitor affiche les logs sur la session SSH active.', 'Fondamental', 'Cisco Configuration Guide', 'R1# terminal monitor')

    add_c('Horodatage Précis des Logs : service timestamps',
          'Quelle commande active l\'horodatage précis à la milliseconde dans les logs ?',
          'service timestamps log datetime',
          '• Commande recommandée : "service timestamps log datetime msec localtime show-timezone".\n• Ajoute date, heure, millisecondes et fuseau horaire indispensable pour la traçabilité légale.',
          'service timestamps log datetime msec localtime show-timezone.', 'Intermédiaire', 'Cisco System Guide', 'R1(config)# service timestamps log datetime msec')

    add_c('Filtrage des Logs Distants : logging trap',
          'Quel est le rôle de logging trap et quel niveau choisir en production ?',
          'Seuil de Sévérité logging trap',
          '• Définit le niveau maximal envoyé au serveur Syslog ("logging trap informational" envoie 0 à 6).\n• Ne jamais régler sur debugging (7) en production pour éviter la saturation réseau et CPU.',
          'logging trap définit le niveau max envoyé au serveur (ex: informational = niveaux 0 à 6).', 'Intermédiaire', 'Cisco System Guide', 'R1(config)# logging trap informational')

    add_c('Confort CLI : logging synchronous',
          'Pourquoi configurer logging synchronous sous les lignes console et VTY ?',
          'Réaffichage Propre du Prompt',
          '• Empêche les messages de log d\'apparaître au milieu d\'une commande en cours de saisie.\n• Réaffiche l\'invite et la commande tapée sur une nouvelle ligne propre.',
          'logging synchronous réaffiche la commande saisie sur une ligne propre après un log.', 'Fondamental', 'Cisco Command Reference', 'R1(config-line)# logging synchronous')

    # 86-100: FHRP & QoS
    add_c('Comparatif FHRP : HSRP vs VRRP vs GLBP',
          'Comparez HSRP, VRRP et GLBP en termes de standardisation et équilibrage.',
          'Matrice FHRP',
          '• HSRP : Propriétaire Cisco, Actif/Passif (1 Active, 1 Standby).\n• VRRP : Standard ouvert IETF (RFC 5798), Actif/Passif (1 Master, des Backups).\n• GLBP : Propriétaire Cisco, Actif/Actif réel avec jusqu\'à 4 routeurs actifs (AVF).',
          'HSRP = Cisco (Actif/Passif). VRRP = Standard ouvert. GLBP = Cisco (Actif/Actif réel).', 'Fondamental', 'RFC 5798', 'HSRP / VRRP / GLBP')

    add_c('Adresses MAC Virtuelles FHRP',
          'Quels sont les formats des adresses MAC virtuelles de HSRPv1, HSRPv2 et VRRP ?',
          'Formats des MAC Virtuelles',
          '• HSRPv1 : 0000.0c07.acXX (XX = groupe hexadécimal 00 à FF).\n• HSRPv2 : 0000.0c9f.fXXX (XXX = groupe 000 à FFF).\n• VRRP IPv4 : 0000.5e00.01XX (XX = VRID 01 à FF).',
          'HSRPv1 = 0000.0c07.acXX. HSRPv2 = 0000.0c9f.fXXX. VRRP = 0000.5e00.01XX.', 'Intermédiaire', 'RFC 2281 / RFC 5798', 'Exemple VRRP Grp 1: 0000.5e00.0101')

    add_c('Multicast et Timers HSRPv1 vs HSRPv2',
          'Quelles sont les adresses multicast et minuteurs par défaut de HSRPv1 et HSRPv2 ?',
          'Multicast et Timers HSRP',
          '• HSRPv1 : Multicast 224.0.0.2. Timers : Hello 3s, Hold 10s.\n• HSRPv2 : Multicast 224.0.0.102 (dédié). Timers : Hello 3s, Hold 10s (support millisecondes).',
          'HSRPv1 = 224.0.0.2. HSRPv2 = 224.0.0.102. Timers : Hello 3s / Hold 10s.', 'Intermédiaire', 'Cisco HSRP Guide', 'R1(config-if)# standby version 2')

    add_c('Modèles QoS : Best Effort vs IntServ vs DiffServ',
          'Quels sont les 3 modèles QoS et pourquoi DiffServ s\'est-il imposé ?',
          'Les 3 Modèles QoS (RFC 2475)',
          '• Best Effort : Aucun traitement prioritaire (FIFO standard).\n• IntServ : Réservation de ressources bout en bout avec RSVP (non scalable).\n• DiffServ : Marquage en périphérie (DSCP) et traitement par classe dans le cœur (scalable, standard).',
          'DiffServ est le standard absolu : marquage DSCP à l\'entrée et traitement par classe.', 'Fondamental', 'RFC 2475', 'Best Effort / IntServ / DiffServ')

    add_c('Marquage QoS : CoS (L2) vs DSCP (L3)',
          'Comment la priorité QoS est-elle marquée en niveau 2 (CoS) et niveau 3 (DSCP) ?',
          'CoS 802.1Q vs DSCP IP',
          '• CoS (L2) : 3 bits dans le tag VLAN 802.1Q (8 valeurs de 0 à 7, valeur 5 = Voix). Disparaît au routage.\n• DSCP (L3) : 6 bits dans l\'en-tête IP (64 valeurs possibles de 0 à 63). Préservé de bout en bout.',
          'CoS = 3 bits dans le tag VLAN (L2). DSCP = 6 bits dans l\'en-tête IP (L3, bout en bout).', 'Intermédiaire', 'RFC 2474', 'CoS 5 (Voix) <-> DSCP EF 46')

    add_c('Valeurs Standards DSCP : CS, AF et EF',
          'Que signifient les marquages DSCP Class Selector (CS), AF et EF ?',
          'Marquages DSCP Standards',
          '• CS (Class Selector) : Rétrocompatibilité avec IP Precedence (CS = IP Precedence x 8).\n• AF (Assured Forwarding) : 4 classes avec 3 niveaux de probabilité de rejet (ex: AF31).\n• EF (Expedited Forwarding - valeur 46) : Priorité stricte pour la Voix (faible gigue/latence).',
          'EF (46) = Voix. AFxy = Données garanties. CS = Precedence.', 'Intermédiaire', 'RFC 2597 / RFC 3246', 'EF: DSCP 46 / AF41: DSCP 34')

    add_c('Ordonnancement des Files d\'Attente (Queuing) : LLQ',
          'Pourquoi Low Latency Queuing (LLQ) est-il obligatoire pour la Voix sur IP ?',
          'LLQ (Low Latency Queuing = CBWFQ + PQ)',
          '• Combine une file à priorité stricte (Priority Queue) pour les paquets Voix (EF) avec des files équitables CBWFQ pour les données.\n• Évite les retards et la gigue sur la voix sans affamer les données.',
          'LLQ = file stricte pour la voix + bande passante équitable pour les données.', 'Intermédiaire', 'Cisco QoS Guide', 'R1(config-pmap-c)# priority 512')

    add_c('Évitement de Congestion : Tail Drop vs WRED',
          'Quel problème du Tail Drop le mécanisme WRED résout-il ?',
          'WRED et Synchronisation Globale TCP',
          '• Tail Drop jette tous les paquets quand la file est pleine, provoquant l\'effondrement simultané de tous les flux TCP (synchronisation globale).\n• WRED rejette aléatoirement quelques paquets avant saturation pour étaler les ralentissements.',
          'WRED jette préventivement quelques paquets pour éviter la synchronisation globale TCP.', 'Avancé', 'RFC 2309', 'R1(config-pmap-c)# random-detect')

    add_c('Conditionnement du Trafic : Policing vs Shaping',
          'Quelle est la différence fondamentale entre Traffic Policing et Traffic Shaping ?',
          'Policing vs Shaping',
          '• Policing : Rejette immédiatement les paquets excédentaires (ou remarque DSCP vers le bas). Aucun buffer, aucun délai (in/out).\n• Shaping : Met les paquets excédentaires en mémoire tampon pour les émettre à débit lissé. Uniquement en sortie (egress).',
          'Policing jette sans délai (in/out). Shaping met en mémoire tampon pour lisser (out).', 'Intermédiaire', 'Cisco QoS Guide', 'police vs shape average')

    add_c('Architecture Cisco MQC (Modular QoS CLI)',
          'Quelles sont les 3 étapes de configuration QoS sous Cisco MQC ?',
          'Les 3 Composants MQC',
          '1. class-map : Identifie et classifie le trafic (match ip dscp, match access-group).\n2. policy-map : Définit les actions (priority, bandwidth, shape, police).\n3. service-policy : Attache la politique à l\'interface (input ou output).',
          '1. class-map (qui ?) -> 2. policy-map (quoi faire ?) -> 3. service-policy (où l\'appliquer ?).', 'Intermédiaire', 'Cisco MQC Guide', 'service-policy output PM_WAN')

    # Add remaining to reach exactly 100 for D4
    d4_extras = [
        ('DHCP Option 150 vs Option 66', 'Quelle est la différence entre l\'Option DHCP 150 et l\'Option 66 pour la téléphonie IP Cisco ?', 'Options DHCP VoIP Cisco', '• Option 150 (Propriétaire Cisco) : Permet de fournir une liste ordonnée d\'adresses IP de serveurs TFTP (CallManager / CUCM) aux téléphones IP.\n• Option 66 (Standard RFC 2132) : Ne prend en charge qu\'un seul nom d\'hôte ou une seule adresse IP TFTP.', 'Option 150 supporte une liste d\'IPs de serveurs TFTP pour téléphones Cisco.', 'Intermédiaire', 'RFC 2132', 'R1(config-dhcp)# option 150 ip 10.1.1.5 10.1.1.6'),
        ('DHCP Lease Renewal : T1 & T2 Timers', 'À quels moments un client DHCP tente-t-il de renouveler son bail (minuteries T1 et T2) ?', 'Renouvellement de Bail DHCP (T1 et T2)', '• T1 (Renouvellement) : À 50% de la durée du bail, le client envoie un DHCP Request en unicast au serveur émetteur initial.\n• T2 (Rebinding) : À 87.5% de la durée du bail, si le serveur initial n\'a pas répondu, le client diffuse un DHCP Request en broadcast à tous les serveurs du réseau.', 'T1 = 50% du bail en unicast. T2 = 87.5% du bail en broadcast.', 'Intermédiaire', 'RFC 2131 § 4.4.5', 'Bail 24h : T1 à 12h, T2 à 21h'),
        ('DHCP Release vs DHCP Decline', 'Quelle est la différence entre un message DHCP Release et un message DHCP Decline ?', 'Messages DHCP Release vs Decline', '• DHCP Release : Émis volontairement par le client lors d\'une déconnexion propre pour libérer immédiatement son adresse IP dans le pool.\n• DHCP Decline : Émis par le client dès réception du DHCP ACK s\'il détecte par Gratuitous ARP que l\'adresse IP proposée est déjà utilisée par un autre hôte.', 'Release libère le bail volontairement. Decline signale un conflit d\'IP au serveur.', 'Intermédiaire', 'RFC 2131', 'Wireshark: bootp.dhcp == 7 (Release) ou 4 (Decline)'),
        ('DNS Reverse Lookup (Zone Inverse in-addr.arpa)', 'Comment est structurée une requête de résolution inverse (Reverse DNS PTR) pour l\'IP 192.168.1.50 ?', 'Structure du Domaine in-addr.arpa', '• Les octets de l\'adresse IPv4 sont inversés et suffixés par .in-addr.arpa.\n• Pour 192.168.1.50, la requête PTR interroge le nom : "50.1.168.192.in-addr.arpa".\n• En IPv6, les quartets sont inversés sous le domaine .ip6.arpa.', 'Les octets sont inversés : 192.168.1.50 devient 50.1.168.192.in-addr.arpa.', 'Intermédiaire', 'RFC 1035', 'nslookup -type=PTR 192.168.1.50'),
        ('DNS Dynamic Updates (DDNS)', 'Quel est le rôle du DNS Dynamique (DDNS - RFC 2136) dans une infrastructure d\'entreprise ?', 'Mise à Jour Automatisée des Enregistrements DNS', '• Permet aux clients ou serveurs DHCP de mettre à jour automatiquement les enregistrements A et PTR sur le serveur DNS dès l\'attribution d\'un nouveau bail.\n• Évite la gestion manuelle fastidieuse des noms d\'hôtes pour les postes de travail mobiles.', 'DDNS met à jour automatiquement les enregistrements A et PTR lors d\'un bail DHCP.', 'Fondamental', 'RFC 2136', 'R1(config)# ip ddns update method ...'),
        ('SNMP MIB-II (RFC 1213)', 'Quels sont les sous-groupes principaux définis dans la MIB-II standard (RFC 1213) ?', 'Organisation de la MIB-II', '• Contient les groupes universels supportés par tout équipement réseau :\n  - system (1.3.6.1.2.1.1) : sysDescr, sysUpTime, sysContact, sysName.\n  - interfaces (1.3.6.1.2.1.2) : ifNumber, ifTable (ifSpeed, ifInOctets, ifOperStatus).\n  - ip, icmp, tcp, udp, transmission, snmp.', 'Groupe system (uptime, nom) et interfaces (débits, compteurs d\'erreurs).', 'Intermédiaire', 'RFC 1213', 'snmpget -v2c -c public 10.1.1.1 1.3.6.1.2.1.1.3.0'),
        ('SNMP ifHCInOctets vs ifInOctets (Compteurs 64-bit)', 'Pourquoi les compteurs 64-bit ifHCInOctets de SNMPv2c/v3 sont-ils indispensables sur les interfaces 10G/100G ?', 'Compteurs 32-bit vs 64-bit', '• Un compteur 32-bit ifInOctets sature et repasse à zéro (wrap around) en moins de 34 secondes sur un lien 1 Gbps plein débit, rendant le calcul de bande passante faux.\n• Les compteurs 64-bit (High Capacity) évitent tout débordement pendant des décennies.', 'Les compteurs 32-bit saturent en quelques secondes sur le haut débit. Le 64-bit est obligatoire.', 'Intermédiaire', 'RFC 2863 (The Interfaces Group MIB)', 'ifHCInOctets: 1.3.6.1.2.1.31.1.1.1.6'),
        ('NTP Peer vs Client : Algorithme de Marzullo', 'Quel algorithme mathématique le protocole NTP utilise-t-il pour éliminer les sources de temps menteuses (Falsetickers) ?', 'Algorithme de Marzullo & Intersection NTP', '• NTP collecte les décalages de plusieurs serveurs et applique l\'algorithme de Marzullo pour trouver l\'intervalle de confiance commun le plus étroit.\n• Élimine les serveurs dont l\'heure dévie anormalement (affichés avec le symbole "-" dans show ntp associations).', 'Algorithme d\'intersection de Marzullo pour éliminer les horloges erronées.', 'Avancé', 'RFC 5905 § 11', 'Élimine les falsetickers pour ne garder que les truechimers.'),
        ('NTP Access-Control Query-Only', 'Dans quel cas configure-t-on ntp access-group query-only sous Cisco IOS ?', 'Contrôle d\'Accès Query-Only', '• Permet uniquement les requêtes de contrôle et de surveillance administrative (ex: commandes de monitoring ntpq).\n• Interdit formellement aux tiers de se synchroniser sur le routeur ou de modifier son horloge.', 'query-only autorise les requêtes de diagnostic sans synchronisation horaire.', 'Avancé', 'Cisco IOS Security Guide', 'R1(config)# ntp access-group query-only 15'),
        ('HSRP Multi-Group (MHSRP) pour Équilibrage', 'Comment réaliser un équilibrage de charge entre deux routeurs avec HSRP ?', 'HSRP Multi-Group (MHSRP)', '• Comme HSRP est actif/passif par groupe, on configure deux groupes HSRP distincts par VLAN :\n  - Routeur 1 est Actif pour le Groupe 1 (VLAN 10) et Standby pour le Groupe 2 (VLAN 20).\n  - Routeur 2 est Actif pour le Groupe 2 (VLAN 20) et Standby pour le Groupe 1 (VLAN 10).\n• Les deux routeurs partagent ainsi la charge globale du réseau.', 'Actif pour le groupe 1 sur R1 et actif pour le groupe 2 sur R2 pour partager la charge.', 'Intermédiaire', 'Cisco High Availability Guide', 'R1(config-if)# standby 1 priority 110\nR1(config-if)# standby 2 priority 90'),
        ('VRRP Preemption par Défaut', 'La préemption est-elle activée par défaut dans VRRP comparé à HSRP ?', 'Différence de Préemption VRRP vs HSRP', '• HSRP : La préemption est DÉSACTIVÉE par défaut (nécessite standby preempt).\n• VRRP : La préemption est ACTIVÉE par défaut selon la norme RFC 5798 !\n• Si un routeur VRRP de priorité supérieure démarre, il prend immédiatement le rôle de Master sans commande supplémentaire.', 'Dans VRRP, la préemption est activée par défaut (contrairement à HSRP).', 'Fondamental', 'RFC 5798 § 5.2.7', 'vrrp 1 priority 120 (préemption implicite)'),
        ('GLBP Active Virtual Gateway (AVG)', 'Quel est le rôle unique de l\'AVG (Active Virtual Gateway) dans un groupe GLBP ?', 'Rôle de l\'AVG GLBP', '• L\'AVG est élu parmi les routeurs du groupe (plus haute priorité ou IP).\n• Il répond à toutes les requêtes ARP des clients pour l\'IP virtuelle en distribuant en Round-Robin des adresses MAC virtuelles différentes associées aux 4 routeurs AVF.',
         'L\'AVG répond aux requêtes ARP en distribuant les MACs virtuelles des routeurs actifs.', 'Intermédiaire', 'Cisco GLBP Overview', 'R1# show glbp brief'),
        ('QoS NBAR2 (Network Based Application Recognition)', 'Comment NBAR2 permet-il de classifier des flux applicatifs chiffrés ou changeant de port ?', 'Inspection Applicative Profonde NBAR2', '• NBAR2 inspecte les en-têtes applicatifs L7 et utilise des signatures pour identifier plus de 1 000 applications (ex: Netflix, Zoom, Teams, Salesforce) même si elles utilisent des ports dynamiques ou du HTTPS.\n• Utilisable dans les class-maps : "match protocol zoom".', 'NBAR2 identifie les applications L7 (Zoom, Netflix) sans dépendre des ports fixes.', 'Intermédiaire', 'Cisco NBAR2 Guide', 'R1(config-cmap)# match protocol skype'),
        ('QoS Trust Boundary (Frontière de Confiance)', 'Où doit être située la frontière de confiance QoS (Trust Boundary) dans un réseau d\'accès d\'entreprise ?', 'Emplacement de la Frontière de Confiance QoS', '• Idéalement sur le commutateur d\'accès ou le téléphone IP d\'entreprise.\n• Les marquages CoS/DSCP des téléphones IP et serveurs fiables sont conservés (trusted).\n• Les marquages provenant des PC utilisateurs non approuvés sont immédiatement réécrits à 0 (Untrusted / Best Effort) pour empêcher un utilisateur de s\'octroyer indûment la priorité.', 'Sur le switch d\'accès ou le téléphone IP. Tout port PC non approuvé est reclassé en Best Effort.', 'Fondamental', 'Cisco QoS Design Guide', 'SW1(config-if)# mls qos trust cos'),
        ('DHCP Option 43 (WLC Controller IP)', 'Quel est le rôle de l\'Option DHCP 43 pour les points d\'accès Wi-Fi Cisco (AP) ?', 'Découverte des Contrôleurs WLC via Option 43', '• Fournit automatiquement aux bornes Wi-Fi (AP Lightweight CAPWAP) l\'adresse IP du contrôleur WLC auquel elles doivent se rattacher.\n• Permet le déploiement Zero-Touch des bornes dans des filiales sans contrôleur local.', 'Fournit l\'adresse IP du contrôleur WLC aux bornes Wi-Fi Cisco au démarrage.', 'Intermédiaire', 'Cisco Wireless Configuration Guide', 'R1(dhcp-config)# option 43 hex f1040a010105')
    ]

    for item in d4_extras:
        add_c(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7])

    return cards

d4 = create_d4_cards()
print(f"Generated {len(d4)} cards for CCNA-D4")
with open("src/data/ccnaD4Flashcards.ts", "w", encoding="utf-8") as f:
    f.write("// ccnaD4Flashcards.ts - 100 Flashcards pour Cisco CCNA-D4: IP Services\n")
    f.write("import { Flashcard } from './workshopsData';\n\n")
    f.write("export const ccnaD4Cards: Flashcard[] = " + json.dumps(d4, ensure_ascii=False, indent=2) + ";\n")
print("Saved src/data/ccnaD4Flashcards.ts successfully!")
