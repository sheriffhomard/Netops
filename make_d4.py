import json

def get_d4():
    # 100 flashcards for CCNA-D4: IP Services
    items = [
        # 1-20: NAT & PAT
        {
            "frontTitle": "NAT Inside Local vs Inside Global",
            "frontPrompt": "Quelle est la différence fondamentale entre une adresse Inside Local et Inside Global dans la terminologie Cisco NAT ?",
            "backTitle": "Terminologie NAT Cisco (RFC 2663)",
            "backContent": "• Inside Local : Adresse IP privée attribuée à un équipement sur le LAN interne (ex: 192.168.1.50). Non routable sur Internet.\n• Inside Global : Adresse IP publique légitime (allouée par le FAI) qui représente l'hôte interne sur Internet.\n• Outside Local : Adresse IP d'un hôte externe telle qu'elle apparaît sur le réseau local interne.\n• Outside Global : Adresse IP publique réelle assignée à un hôte sur Internet.",
            "hint": "Inside Local = IP privée dans le LAN. Inside Global = IP publique sur Internet.",
            "difficulty": "Fondamental",
            "rfcRef": "RFC 2663",
            "cliExample": "R1# show ip nat translations"
        },
        {
            "frontTitle": "NAT Statique (1:1 Static NAT)",
            "frontPrompt": "Quel est le cas d'usage du NAT Statique et sa syntaxe de configuration sur Cisco IOS ?",
            "backTitle": "Mappage Fixe Un pour Un",
            "backContent": "• Rôle : Établit une correspondance permanente 1:1 entre une adresse IP privée et une adresse IP publique dédiée.\n• Cas d'usage : Publication d'un serveur interne (Web, Mail, SFTP) accessible depuis Internet.\n• Commande : 'ip nat inside source static <IP-Locale> <IP-Globale>' avec 'ip nat inside' et 'ip nat outside' sur les interfaces.",
            "hint": "Association fixe 1:1 pour publier un serveur interne.",
            "difficulty": "Fondamental",
            "rfcRef": "Cisco IOS IP Addressing Guide",
            "cliExample": "R1(config)# ip nat inside source static 192.168.1.10 203.0.113.10"
        },
        {
            "frontTitle": "NAT Dynamique (Dynamic NAT Pool)",
            "frontPrompt": "Comment fonctionne le NAT Dynamique avec pool et que se passe-t-il quand le pool est épuisé ?",
            "backTitle": "Allocation Dynamique 1:1 à partir d'un Pool",
            "backContent": "• Fonctionnement : Les hôtes internes reçoivent temporairement une IP publique parmi un bloc (pool) défini.\n• Épuisement : Comme le NAT dynamique est en 1:1, si toutes les adresses du pool sont allouées, toute nouvelle requête est rejetée jusqu'à expiration d'un bail.",
            "hint": "Sans overload, c'est du 1:1 : si le pool est vide, les nouveaux flux sont bloqués.",
            "difficulty": "Intermédiaire",
            "rfcRef": "RFC 3022",
            "cliExample": "R1(config)# ip nat pool POOL1 203.0.113.1 203.0.113.5 netmask 255.255.255.248"
        },
        {
            "frontTitle": "PAT / NAT Overload (Port Address Translation)",
            "frontPrompt": "Comment le PAT permet-il à des milliers d'hôtes internes de partager une seule adresse IP publique ?",
            "backTitle": "Multiplexage de Ports de Couche 4 (PAT)",
            "backContent": "• Principe : PAT modifie les numéros de ports source de couche 4 (TCP/UDP).\n• Chaque flux interne est associé à l'IP publique unique + un port source unique (16 bits, ~65 000 sessions simultanées).\n• Le routeur conserve une table de correspondance [IP privée:Port <-> IP publique:Port].",
            "hint": "Le mot-clé overload utilise les ports TCP/UDP pour distinguer les hôtes.",
            "difficulty": "Fondamental",
            "rfcRef": "RFC 3022 § 4.1",
            "cliExample": "R1(config)# ip nat inside source list 1 interface Gi0/1 overload"
        },
        {
            "frontTitle": "Port Forwarding (PAT Statique)",
            "frontPrompt": "Comment rediriger le port TCP 80 d'une IP publique vers le port 8080 d'un serveur web interne ?",
            "backTitle": "Redirection de Port Spécifique",
            "backContent": "• Commande : 'ip nat inside source static tcp <IP-Locale> <Port-Local> <IP-Globale> <Port-Global>'.\n• Exemple : 'ip nat inside source static tcp 192.168.1.100 8080 203.0.113.2 80'.\n• Permet d'héberger plusieurs services différents sur une seule IP publique.",
            "hint": "Spécifier tcp/udp et les ports source et destination.",
            "difficulty": "Intermédiaire",
            "rfcRef": "Cisco IOS NAT Guide",
            "cliExample": "R1(config)# ip nat inside source static tcp 192.168.1.100 8080 203.0.113.2 80"
        },
        {
            "frontTitle": "Inspection de la Table NAT : show ip nat translations",
            "frontPrompt": "Que montre la commande show ip nat translations et que signifient les entrées avec ports ?",
            "backTitle": "Table de Traduction NAT Active",
            "backContent": "• Entrée sans port : Traduction statique 1:1 permanente.\n• Entrée avec ports (IP:Port) : Session dynamique active gérée par PAT (Overload).\n• Affiche : Pro, Inside global, Inside local, Outside local, Outside global.",
            "hint": "Permet de vérifier la correspondance entre IP privée et IP/port public.",
            "difficulty": "Fondamental",
            "rfcRef": "Cisco IOS Master Command List",
            "cliExample": "R1# show ip nat translations"
        },
        {
            "frontTitle": "Statistiques NAT : show ip nat statistics",
            "frontPrompt": "Quelles informations clés fournit show ip nat statistics pour le diagnostic ?",
            "backTitle": "Compteurs et Diagnostic Global NAT",
            "backContent": "• Affiche les interfaces configurées en inside et outside.\n• Nombre total de traductions actives.\n• Compteurs Hits (paquets traduits) et Misses (nouveaux flux créant une entrée).\n• État des pools et taux d'allocation d'adresses.",
            "hint": "Affiche interfaces inside/outside, hits/misses et état des pools.",
            "difficulty": "Intermédiaire",
            "rfcRef": "Cisco IOS Command Reference",
            "cliExample": "R1# show ip nat statistics"
        },
        {
            "frontTitle": "Purge de la Table NAT : clear ip nat translation",
            "frontPrompt": "Comment vider la table NAT en cas de saturation de sessions ?",
            "backTitle": "Réinitialisation des Traductions Dynamiques",
            "backContent": "• Commande globale : 'clear ip nat translation *'.\n• Supprime immédiatement toutes les entrées dynamiques (interrompt les connexions en cours).\n• Ciblage fin possible par IP ou port spécifique.",
            "hint": "clear ip nat translation * pour vider toutes les sessions dynamiques.",
            "difficulty": "Intermédiaire",
            "rfcRef": "Cisco IOS NAT Guide",
            "cliExample": "R1# clear ip nat translation *"
        },
        {
            "frontTitle": "Timeouts NAT : Sessions TCP vs UDP",
            "frontPrompt": "Quels sont les délais d'inactivité par défaut des traductions NAT sous Cisco IOS pour TCP et UDP ?",
            "backTitle": "Minuteurs de Rétention NAT",
            "backContent": "• TCP Timeout : 86 400 secondes (24 heures) pour une connexion établie.\n• UDP Timeout : 300 secondes (5 minutes).\n• ICMP Timeout : 60 secondes.\n• DNS Timeout : 60 secondes.",
            "hint": "TCP = 24h par défaut ; UDP = 5min ; ICMP = 1min.",
            "difficulty": "Intermédiaire",
            "rfcRef": "Cisco IOS NAT Guide",
            "cliExample": "R1(config)# ip nat translation tcp-timeout 3600"
        },
        {
            "frontTitle": "Ordre des Opérations : Inside vers Outside",
            "frontPrompt": "Dans quel ordre un routeur traite-t-il un paquet allant d'une interface inside vers une interface outside ?",
            "backTitle": "Ordre Inside vers Outside",
            "backContent": "1. ACLs d'entrée sur l'interface inside.\n2. Décision de routage (Routing Table Lookup) pour trouver l'interface de sortie.\n3. Traduction NAT (Inside vers Outside).\n4. ACLs de sortie sur l'interface outside.\n• Règle : Le routage a lieu AVANT le NAT quand le flux va d'inside vers outside !",
            "hint": "Inside vers Outside : le routage est fait AVANT le NAT.",
            "difficulty": "Avancé",
            "rfcRef": "Cisco IOS Order of Operation",
            "cliExample": "Ingress ACL -> Routing -> NAT -> Egress ACL"
        },
        {
            "frontTitle": "Ordre des Opérations : Outside vers Inside",
            "frontPrompt": "Dans quel ordre un routeur traite-t-il un paquet arrivant de l'outside à destination du réseau inside ?",
            "backTitle": "Ordre Outside vers Inside",
            "backContent": "1. ACLs d'entrée sur l'interface outside.\n2. Traduction NAT de destination (Outside vers Inside).\n3. Décision de routage vers le LAN interne.\n4. ACLs de sortie sur l'interface inside.\n• Règle : Le NAT a lieu AVANT le routage lors d'un flux Outside vers Inside !",
            "hint": "Outside vers Inside : le NAT est fait AVANT la décision de routage.",
            "difficulty": "Avancé",
            "rfcRef": "Cisco IOS Order of Operation",
            "cliExample": "Ingress ACL -> NAT -> Routing -> Egress ACL"
        },
        {
            "frontTitle": "NAT et Protocoles Applicatifs (ALGs)",
            "frontPrompt": "Pourquoi FTP et SIP nécessitent-ils un module ALG (Application Layer Gateway) avec le NAT ?",
            "backTitle": "Application Layer Gateway (ALG)",
            "backContent": "• FTP Actif et SIP intègrent des adresses IP et ports dans le corps même des données utiles (Payload L7).\n• L'ALG inspecte le payload en profondeur (DPI) et réécrit les adresses IP internes pour préserver la connectivité.",
            "hint": "L'ALG modifie les adresses IP encapsulées dans le payload applicatif L7 (FTP, SIP).",
            "difficulty": "Avancé",
            "rfcRef": "RFC 2663 § 2.9",
            "cliExample": "R1(config)# ip nat service ftp"
        },
        {
            "frontTitle": "Double NAT (Twice NAT)",
            "frontPrompt": "Qu'est-ce que le Twice NAT et dans quelle situation est-il indispensable ?",
            "backTitle": "Translation Simultanée Source et Destination",
            "backContent": "• Définition : Traduction simultanée de l'IP source ET de l'IP destination d'un paquet.\n• Cas d'usage : Fusion d'entreprises où les deux réseaux utilisent les mêmes plages privées RFC 1918 (conflit de doublons).",
            "hint": "Utilisé lors de fusions d'entreprises ayant des sous-réseaux IP identiques.",
            "difficulty": "Avancé",
            "rfcRef": "Cisco ASA NAT Guide",
            "cliExample": "R1(config)# ip nat pool OVERLAP_SRC ..."
        },
        {
            "frontTitle": "NAT Virtual Interface (NVI)",
            "frontPrompt": "Quelle limitation du NAT traditionnel l'architecture Cisco NVI résout-elle ?",
            "backTitle": "Suppression de la Dichotomie Inside/Outside",
            "backContent": "• Le NAT traditionnel exige qu'un paquet transite entre inside et outside.\n• NVI utilise 'ip nat enable' sous les interfaces et achemine le trafic vers une interface virtuelle NVI0, permettant le NAT entre n'importe quelles zones.",
            "hint": "NVI remplace inside/outside par ip nat enable.",
            "difficulty": "Avancé",
            "rfcRef": "Cisco IOS NVI Guide",
            "cliExample": "R1(config-if)# ip nat enable"
        },
        {
            "frontTitle": "Carrier-Grade NAT (CGNAT) & RFC 6598",
            "frontPrompt": "Quelle est la plage IPv4 réservée au Carrier-Grade NAT (CGNAT) par la RFC 6598 ?",
            "backTitle": "Plage Réservée CGNAT (100.64.0.0/10)",
            "backContent": "• Plage réservée : 100.64.0.0/10 (de 100.64.0.0 à 100.127.255.255, 4 millions d'adresses).\n• Utilisée par les FAI pour adresser les box clientes sans entrer en conflit avec la RFC 1918 des foyers.",
            "hint": "100.64.0.0/10 : réservé aux FAI pour éviter les conflits RFC 1918.",
            "difficulty": "Intermédiaire",
            "rfcRef": "RFC 6598",
            "cliExample": "R1# show ip route 100.64.0.0 255.192.0.0"
        },
        {
            "frontTitle": "NAT64 & DNS64",
            "frontPrompt": "Quel est le rôle du couple NAT64 / DNS64 dans les réseaux IPv6-only ?",
            "backTitle": "Interconnexion Clients IPv6 vers Serveurs IPv4",
            "backContent": "• DNS64 synthétise une adresse IPv6 fictive préfixée par 64:ff9b::/96 pour les serveurs IPv4-only.\n• NAT64 intercepte le paquet IPv6, retire le préfixe et traduit le trafic en IPv4 standard.",
            "hint": "DNS64 crée une fausse IPv6 (64:ff9b::) et NAT64 traduit vers l'IPv4.",
            "difficulty": "Avancé",
            "rfcRef": "RFC 6146 / RFC 6147",
            "cliExample": "Préfixe Well-Known : 64:ff9b::/96"
        },
        {
            "frontTitle": "Policy NAT (NAT avec Route-Map)",
            "frontPrompt": "Comment empêcher le NAT pour le trafic d'un VPN IPsec tout en traduisant le trafic Internet ?",
            "backTitle": "Bypass NAT via ACL / Route-Map",
            "backContent": "• L'ACL liée au NAT contient un 'deny' vers le réseau distant du VPN et un 'permit any' pour Internet.\n• Les paquets vers le site VPN distant conservent ainsi leur IP privée source originale.",
            "hint": "Deny dans l'ACL NAT pour le sous-réseau distant du VPN pour éviter la traduction.",
            "difficulty": "Avancé",
            "rfcRef": "Cisco Security Guide",
            "cliExample": "R1(config)# access-list 105 deny ip 192.168.1.0 0.0.0.255 192.168.2.0 0.0.0.255"
        },
        {
            "frontTitle": "Déclaration d'un Pool NAT avec Prefix-Length",
            "frontPrompt": "Quelle est la syntaxe pour déclarer un pool NAT avec prefix-length sous Cisco IOS ?",
            "backTitle": "Syntaxe ip nat pool prefix-length",
            "backContent": "• Commande : 'ip nat pool NOM_POOL 203.0.113.1 203.0.113.6 prefix-length 29'.\n• Équivalent strict de la syntaxe 'netmask 255.255.255.248'.",
            "hint": "ip nat pool <nom> <ip-début> <ip-fin> prefix-length <longueur>.",
            "difficulty": "Fondamental",
            "rfcRef": "Cisco IOS Command Reference",
            "cliExample": "R1(config)# ip nat pool POOL_EXT 203.0.113.1 203.0.113.6 prefix-length 29"
        },
        {
            "frontTitle": "NAT Static Network Mapping",
            "frontPrompt": "Comment mapper un sous-réseau privé complet /24 vers un /24 public en une seule commande ?",
            "backTitle": "NAT Statique de Sous-Réseau Entier",
            "backContent": "• Commande : 'ip nat inside source static network <IP-Réseau-Local> <IP-Réseau-Global> /24'.\n• Conserve automatiquement les derniers octets d'hôtes sans devoir taper 254 lignes individuelles.",
            "hint": "ip nat inside source static network traduit tout le sous-réseau en conservant les hôtes.",
            "difficulty": "Intermédiaire",
            "rfcRef": "Cisco IOS NAT Guide",
            "cliExample": "R1(config)# ip nat inside source static network 10.1.1.0 203.0.113.0 /24"
        },
        {
            "frontTitle": "Attaque par Épuisement de Ports PAT",
            "frontPrompt": "Comment un hôte compromis peut-il saturer le PAT d'un routeur et comment s'en protéger ?",
            "backTitle": "PAT Port Exhaustion & Protection Cisco",
            "backContent": "• L'attaquant ouvre des milliers de connexions TCP SYN pour consommer les ~65 000 ports disponibles.\n• Protection : 'ip nat translation max-entries <nombre>' pour plafonner le nombre de sessions autorisées par hôte.",
            "hint": "ip nat translation max-entries limite le nombre de sessions par hôte pour bloquer l'épuisement.",
            "difficulty": "Intermédiaire",
            "rfcRef": "Cisco Security Best Practices",
            "cliExample": "R1(config)# ip nat translation max-entries 3000"
        }
    ]
    return items

print("make_d4 imported successfully")
