import json

# 100 Flashcards for CCNA-D4: IP Services
# Topics:
# 1-15: NAT/PAT (Inside/Outside Local/Global, Static, Dynamic, PAT/Overload, port translation, show ip nat translations, clear ip nat translation)
# 16-30: NTP (Network Time Protocol, stratum 0-16, peer vs server, authentication, show ntp status, show ntp associations, loopback source)
# 31-45: DHCPv4 & DHCPv6 (DORA process, DHCP Snooping, trusted vs untrusted ports, option 82, ip helper-address, SLAAC, Stateful vs Stateless DHCPv6)
# 46-55: DNS (Domain Name System, A/AAAA records, resolver, ip domain lookup, ip name-server, reverse lookup PTR)
# 56-70: SNMP (v1, v2c, v3, community strings, get/set/trap/inform, MIB & OID, SNMPv3 USM noAuthNoPriv, authNoPriv, authPriv with HMAC-SHA and AES)
# 71-85: Syslog & Logging (levels 0-7: Emergency, Alert, Critical, Error, Warning, Notice, Informational, Debugging, logging buffered, logging trap, timestamps)
# 86-93: FHRP (HSRP, VRRP, GLBP, virtual IP, virtual MAC, preemption, tracking, priority)
# 94-100: QoS (Quality of Service, classification & marking, CoS 802.1p vs ToS/DSCP, Queuing FIFO/CQ/PQ/CBWFQ/LLQ, Policing vs Shaping, WRED)

cards = []

nat_topics = [
    ("NAT Inside Local vs Inside Global",
     "Quelle est la différence fondamentale entre une adresse 'Inside Local' et une adresse 'Inside Global' dans la terminologie Cisco NAT ?",
     "Définition des Adresses NAT Cisco (RFC 2663)",
     "• Inside Local (Local Interne) : L'adresse IP privée attribuée à un équipement sur le réseau interne local (ex: 192.168.1.50). Elle n'est pas routable sur Internet.\n• Inside Global (Globale Interne) : L'adresse IP publique légitime (allouée par le FAI) qui représente l'équipement interne aux yeux du monde extérieur (Internet).\n• Outside Local : L'adresse IP d'un hôte externe telle qu'elle apparaît sur le réseau local interne.\n• Outside Global : L'adresse IP publique réelle assignée à un hôte sur le réseau externe (Internet).",
     "RFC 2663 (IP Network Address Translator Terminology)",
     "R1# show ip nat translations\nPro Inside global      Inside local       Outside local      Outside global\n--- 203.0.113.5:1024  192.168.1.50:1024  198.51.100.1:80    198.51.100.1:80",
     "Inside Local = IP privée dans le LAN. Inside Global = IP publique sur Internet."),
    
    ("NAT Statique (Static NAT)",
     "Quel est le cas d'usage typique du NAT Statique (Static NAT 1:1) et quelle est sa commande de configuration sur Cisco IOS ?",
     "Mappage Fixe Un pour Un (1:1 Static NAT)",
     "• Rôle : Établir une correspondance permanente et bidirectionnelle un-pour-un entre une adresse IP privée interne (Inside Local) et une adresse IP publique dédiée (Inside Global).\n• Cas d'usage : Rendre un serveur interne (Serveur Web, Mail, SFTP) accessible en permanence depuis Internet sur son adresse publique fixe.\n• Commande IOS : 'ip nat inside source static <IP-Locale> <IP-Globale>' configurée en mode de configuration globale, avec 'ip nat inside' et 'ip nat outside' sur les interfaces respectives.",
     "Cisco IOS IP Addressing Services Command Reference",
     "R1(config)# ip nat inside source static 192.168.10.10 203.0.113.10\nR1(config-if)# interface Gi0/0\nR1(config-if)# ip nat inside\nR1(config-if)# interface Gi0/1\nR1(config-if)# ip nat outside",
     "Association fixe 1:1 pour publier un serveur interne vers Internet."),
    
    ("NAT Dynamique (Dynamic NAT Pool)",
     "Comment fonctionne le NAT Dynamique avec un pool d'adresses publiques et que se passe-t-il lorsque le pool est épuisé ?",
     "Allocation Dynamique 1:1 à partir d'un Pool",
     "• Fonctionnement : Les hôtes internes demandant à sortir sur Internet reçoivent temporairement une adresse IP publique disponible parmi un bloc (pool) d'adresses définies par l'administrateur.\n• Épuisement du Pool : Comme le NAT dynamique standard effectue un mappage 1:1 (sans multiplexage de ports), dès que toutes les adresses publiques du pool sont allouées, TOUTE NOUVELLE REQUÊTE est immédiatement rejetée (paquets jetés) jusqu'à ce qu'une session existante expire et libère son adresse !",
     "RFC 3022 (Traditional IP Network Address Translator)",
     "R1(config)# ip nat pool PUBLIC_POOL 203.0.113.10 203.0.113.14 netmask 255.255.255.248\nR1(config)# ip nat inside source list 1 pool PUBLIC_POOL",
     "Sans overload, c'est du 1:1 : si le pool est vide, les nouveaux flux sont bloqués."),
    
    ("PAT / NAT Overload (Port Address Translation)",
     "Comment le PAT (Port Address Translation / NAT Overload) permet-il à des milliers d'hôtes internes de partager une unique adresse IP publique ?",
     "Multiplexage de Ports de Couche 4 (PAT)",
     "• Principe : PAT inspecte et modifie les numéros de ports source de couche 4 (TCP ou UDP).\n• Mécanisme : Chaque flux émis par un hôte interne est associé à l'adresse IP publique unique combinée à un numéro de port source unique (16 bits, offrant théoriquement jusqu'à ~65 000 sessions simultanées).\n• Maintien de l'état : Le routeur conserve une table de correspondance [IP privée:Port privé <-> IP publique:Port public aléatoire] pour réacheminer le trafic retour vers le bon hôte local.",
     "RFC 3022 § 4.1 (NAPT)",
     "R1(config)# access-list 1 permit 192.168.0.0 0.0.255.255\nR1(config)# ip nat inside source list 1 interface GigabitEthernet0/1 overload",
     "Le mot-clé 'overload' utilise les numéros de ports TCP/UDP pour distinguer les hôtes."),
]

# We will generate a rich catalog of 100 cards for CCNA-D4
