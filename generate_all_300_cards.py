import json

def gen_pack_d4():
    # Load what we have and top up to exactly 100
    with open("src/data/ccnaD4Flashcards.ts", "r", encoding="utf-8") as f:
        text = f.read()
    json_part = text.split("export const ccnaD4Cards: Flashcard[] = ")[1].rstrip(";\n")
    cards = json.loads(json_part)

    # We had 94 cards. Add 6 more to make it exactly 100
    extra_6 = [
        {
            "frontTitle": "DHCP Option 3 : Default Gateway",
            "frontPrompt": "Quelle est l'utilité de l'Option DHCP 3 et que se passe-t-il si elle est omise ?",
            "backTitle": "Passerelle par Défaut (Option 3)",
            "backContent": "• L'Option 3 spécifie une liste ordonnée d'adresses IPv4 de passerelles par défaut (routeurs de sortie).\n• Sans cette option (ou la commande default-router sous Cisco IOS), les clients ne peuvent joindre que leur propre sous-réseau local et ne peuvent pas accéder à Internet ou à d'autres VLANs.",
            "hint": "Option 3 = passerelle par défaut. Sans elle, pas de routage inter-VLAN ni d'accès Internet.",
            "difficulty": "Fondamental",
            "rfcRef": "RFC 2132 § 3.5",
            "cliExample": "R1(config-dhcp)# default-router 192.168.1.1"
        },
        {
            "frontTitle": "DHCP Option 6 : Domain Name Server",
            "frontPrompt": "Quel paramètre réseau indispensable l'Option DHCP 6 transmet-elle aux hôtes ?",
            "backTitle": "Serveurs DNS (Option 6)",
            "backContent": "• L'Option 6 communique aux clients les adresses IP des résolveurs DNS (Domain Name System).\n• Permet la résolution des noms d'hôtes (ex: www.cisco.com) en adresses IP.\n• Configuré via la commande \"dns-server <IP1> <IP2>\" sous Cisco IOS.",
            "hint": "Option 6 = résolveurs DNS pour les clients DHCP.",
            "difficulty": "Fondamental",
            "rfcRef": "RFC 2132 § 3.8",
            "cliExample": "R1(config-dhcp)# dns-server 8.8.8.8 1.1.1.1"
        },
        {
            "frontTitle": "Syslog UDP 514 vs RFC 5425 (Syslog TLS)",
            "frontPrompt": "Pourquoi le Syslog standard UDP 514 est-il vulnérable et quelle est l'alternative moderne ?",
            "backTitle": "Sécurisation des Journaux d'Événements",
            "backContent": "• UDP 514 transmet les logs en texte clair sans garantie de livraison (paquets pouvant être perdus ou usurpés par spoofing IP).\n• RFC 5425 définit l'acheminement sécurisé des logs Syslog encapsulés dans une session chiffrée TLS via TCP 6514.",
            "hint": "UDP 514 est en clair et non fiable. TCP 6514 TLS apporte intégrité et chiffrement.",
            "difficulty": "Intermédiaire",
            "rfcRef": "RFC 5425",
            "cliExample": "R1(config)# logging host 10.1.1.50 transport tcp port 6514"
        },
        {
            "frontTitle": "DHCPv6 DUID (DHCP Unique Identifier)",
            "frontPrompt": "Comment un client DHCPv6 est-il identifié de façon permanente auprès d'un serveur ?",
            "backTitle": "Identifiant Unique DUID (RFC 8415)",
            "backContent": "• En DHCPv6, l'adresse MAC brute n'est plus utilisée directement comme Client ID.\n• Le client génère un DUID (DHCP Unique Identifier), généralement basé sur l'adresse MAC + un timestamp (DUID-LLT) ou l'adresse MAC pure (DUID-LL) ou l'UUID matériel (DUID-UUID).",
            "hint": "Le DUID remplace l'adresse MAC brute pour identifier un client DHCPv6.",
            "difficulty": "Avancé",
            "rfcRef": "RFC 8415 § 11",
            "cliExample": "R1# show ipv6 dhcp binding"
        },
        {
            "frontTitle": "IP SLA (Service Level Agreement) Cisco",
            "frontPrompt": "Quel est le rôle d'IP SLA et comment l'associer à une route statique flottante ?",
            "backTitle": "Sondes Actives IP SLA et Suivi par Track",
            "backContent": "• IP SLA génère des sondes actives périodiques (ex: ICMP Echo vers la passerelle du FAI).\n• Un objet \"track\" surveille l'état du test IP SLA.\n• La route par défaut principale est liée au track (\"ip route 0.0.0.0 0.0.0.0 Gi0/1 track 1\"). Si les pings échouent, la route est retirée et la route de secours prend le relais.",
            "hint": "IP SLA teste la connectivité réelle et bascule la route par défaut si le FAI ne répond plus.",
            "difficulty": "Avancé",
            "rfcRef": "Cisco IP SLA Configuration Guide",
            "cliExample": "R1(config)# ip sla 1\nR1(config-ip-sla)# icmp-echo 8.8.8.8\nR1(config)# track 1 ip sla 1 reachability"
        },
        {
            "frontTitle": "QoS DSCP AF (Assured Forwarding) Dropping Precedence",
            "frontPrompt": "Dans la classe AF23, que représentent le premier chiffre '2' et le second chiffre '3' ?",
            "backTitle": "Codage des Classes AF (RFC 2597)",
            "backContent": "• Format AFxy :\n  - x (1 à 4) représente la classe de bande passante allouée (Class 2).\n  - y (1 à 3) représente la probabilité de rejet en cas de congestion (Drop Precedence).\n• AF23 a donc la probabilité de rejet la plus élevée (3) au sein de la classe 2, ses paquets seront jetés avant ceux marqués AF21.",
            "hint": "x = classe de file (1 à 4). y = probabilité de rejet (1=faible, 2=moyenne, 3=forte).",
            "difficulty": "Avancé",
            "rfcRef": "RFC 2597",
            "cliExample": "R1(config-cmap)# match ip dscp af23"
        }
    ]

    for item in extra_6:
        cid = f'fc-ccna-d4-{len(cards)+1:03d}'
        cards.append({
            'id': cid,
            'category': 'CCNA-D4 : IP Services',
            'moduleCode': 'CCNA-D4',
            'moduleName': 'Cisco CCNA 200-301 - 4.0 IP Services',
            'difficulty': item['difficulty'],
            'frontTitle': item['frontTitle'],
            'frontPrompt': item['frontPrompt'],
            'backTitle': item['backTitle'],
            'backContent': item['backContent'],
            'rfcRef': item.get('rfcRef'),
            'cliExample': item.get('cliExample'),
            'hint': item['hint']
        })

    print(f"CCNA-D4 total cards: {len(cards)}")
    with open("src/data/ccnaD4Flashcards.ts", "w", encoding="utf-8") as f:
        f.write("// ccnaD4Flashcards.ts - 100 Flashcards pour Cisco CCNA-D4: IP Services\n")
        f.write("import { Flashcard } from './workshopsData';\n\n")
        f.write("export const ccnaD4Cards: Flashcard[] = " + json.dumps(cards, ensure_ascii=False, indent=2) + ";\n")

gen_pack_d4()
