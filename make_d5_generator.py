import json

def generate_d5():
    cards = []
    def add_c(title, prompt, b_title, b_content, hint, diff='Intermédiaire', rfc=None, cli=None):
        cid = f'fc-ccna-d5-{len(cards)+1:03d}'
        cards.append({
            'id': cid,
            'category': 'CCNA-D5 : Security Fundamentals',
            'moduleCode': 'CCNA-D5',
            'moduleName': 'Cisco CCNA 200-301 - 5.0 Security Fundamentals',
            'difficulty': diff,
            'frontTitle': title,
            'frontPrompt': prompt,
            'backTitle': b_title,
            'backContent': b_content,
            'rfcRef': rfc,
            'cliExample': cli,
            'hint': hint
        })

    # Subdomains of CCNA-D5 (100 cards):
    # 1. Concepts fondamentaux de sécurité (CIA, Vulnérabilité vs Menace vs Risque, Zero Trust, Social Engineering) (15)
    # 2. Sécurisation des accès aux équipements (Passphrases, Type 5/7/8/9, Console, VTY, SSHv2, AAA) (20)
    # 3. Contrôle d'accès et ACLs (IPv4 Standard & Extended, Named ACLs, Wildcard Masks, Placement) (25)
    # 4. Sécurité de couche 2 / Switchport (Port Security, DHCP Snooping, DAI, IP Source Guard, Private VLANs) (20)
    # 5. VPNs & Cryptographie (IPsec IKEv1/IKEv2, ESP/AH, Chiffrement Symétrique vs Asymétrique, Hash) (10)
    # 6. Sécurité Sans-Fil (WPA2 vs WPA3, 802.1X/EAP, SAE, Rogue APs) (10)

    # 1-15: Security Concepts
    add_c("La Triade CIA (Confidentialité, Intégrité, Disponibilité)",
          "Que représentent les 3 piliers de la triade CIA dans la sécurité des systèmes d'information ?",
          "La Triade CIA",
          "• Confidentialité : Les données ne sont accessibles qu'aux entités autorisées (chiffrement AES, ACLs).\n• Intégrité : Garantie que les données n'ont été ni altérées ni falsifiées (hashes SHA-256, HMAC).\n• Disponibilité : Les services et équipements restent opérationnels pour les utilisateurs légitimes (redondance HSRP, anti-DDoS).",
          "Confidentialité (chiffrement), Intégrité (hash), Disponibilité (redondance/anti-DDoS).", "Fondamental", "NIST SP 800-12")

    add_c("Vulnérabilité vs Menace vs Risque vs Exploit",
          "Quelle est la distinction précise entre Menace, Vulnérabilité, Exploit et Risque ?",
          "Vocabulaire Standard de la Sécurité",
          "• Vulnérabilité : Faille ou faiblesse logicielle/matérielle/humaine (ex: bug IOS, mot de passe par défaut).\n• Menace (Threat) : Danger potentiel capable d'exploiter la vulnérabilité (ex: cyberattaquant, malware).\n• Exploit : Outil ou code conçu pour tirer parti d'une vulnérabilité spécifique.\n• Risque : Probabilité qu'une menace exploite une vulnérabilité x Impact financier ou opérationnel.",
          "Risque = Menace x Vulnérabilité x Impact. L'exploit est le vecteur d'attaque.", "Fondamental", "ISO/IEC 27005")

    add_c("Ingénierie Sociale : Phishing vs Spear Phishing vs Whaling",
          "Comment se différencient Phishing, Spear Phishing et Whaling ?",
          "Variantes des Attaques d'Ingénierie Sociale",
          "• Phishing (Hameçonnage) : Campagne massive et générique envoyée à des milliers de cibles sans distinction.\n• Spear Phishing (Harponnage) : Attaque ciblée et personnalisée visant une personne ou une entreprise précise.\n• Whaling : Spear phishing haut de gamme ciblant spécifiquement les dirigeants (PDG, directeurs financiers).",
          "Phishing = de masse. Spear Phishing = ciblé personnalisé. Whaling = dirigeants exécutifs.", "Fondamental", "Cisco Cybersecurity Specialization")

    add_c("Modèle de Sécurité Zero Trust (NIST SP 800-207)",
          "Quel est le principe directeur fondamental de l'architecture Zero Trust ?",
          "Principe 'Never Trust, Always Verify'",
          "• Abandonne le concept de périmètre réseau fiable (LAN interne réputé sûr).\n• Tout utilisateur, équipement et flux réseau, qu'il soit interne ou externe, doit être authentifié, autorisé et chiffré en continu avant d'accéder à la moindre ressource (Least Privilege).",
          "'Never Trust, Always Verify' : aucune confiance implicite, même sur le réseau local.", "Fondamental", "NIST SP 800-207")

    add_c("Attaques DoS vs DDoS",
          "Quelle est la différence technique entre une attaque DoS et une attaque DDoS ?",
          "Déni de Service Distribué",
          "• DoS (Denial of Service) : Émise depuis une seule machine source ciblant la bande passante ou le CPU de la victime.\n• DDoS (Distributed DoS) : Orchestrée simultanément depuis des milliers de machines zombies infectées (Botnet) réparties mondialement, rendant le blocage par simple IP source inefficace.",
          "DoS = 1 source. DDoS = réseau de bots (botnet) distribué mondialement.", "Fondamental", "RFC 4732")

    add_c("Attaque de l'Homme du Milieu (MitM)",
          "Quel est le mécanisme d'une attaque Man-in-the-Middle sur un réseau local ?",
          "Interception de Trafic Actif",
          "• L'attaquant s'insère subrepticement entre deux interlocuteurs légitimes (ex: client et passerelle par défaut).\n• Généralement réalisée via ARP Spoofing/Poisoning sur un LAN.\n• Permet d'écouter, d'intercepter et de modifier les paquets non chiffrés à la volée.",
          "L'attaquant intercepte et peut modifier le trafic entre deux hôtes (souvent par ARP Spoofing).", "Fondamental", "OWASP MitM Guidelines")

    add_c("Principe du Moindre Privilège (Least Privilege)",
          "Comment s'applique la règle du moindre privilège dans l'administration réseau ?",
          "Moindre Privilège (Least Privilege)",
          "• Règle : Un utilisateur ou un service ne doit disposer que des permissions strictement nécessaires à l'accomplissement de sa tâche, et pour la durée minimale requise.\n• Application Cisco : Création de vues personnalisées (Parser Views) ou rôles AAA au lieu de donner un accès 'enable secret 15' généralisé.",
          "Accorder uniquement les privilèges strictement indispensables à la mission de l'utilisateur.", "Fondamental", "NIST SP 800-53")

    add_c("Attaques Brute-Force vs Dictionnaire vs Password Spraying",
          "En quoi consiste le 'Password Spraying' comparé à une attaque par force brute classique ?",
          "Techniques d'Attaque sur Mots de Passe",
          "• Brute-Force : Teste des millions de combinaisons sur un seul compte jusqu'à trouver le mot de passe (déclenche le verrouillage du compte).\n• Password Spraying : Teste un seul mot de passe très courant (ex: Summer2024!) sur des centaines de comptes différents à intervalles espacés pour contourner les seuils de verrouillage automatique.",
          "Password Spraying = un mot de passe testé sur plein de comptes pour éviter le verrouillage.", "Intermédiaire", "MITRE ATT&CK T1110.003")

    add_c("Politique de Sécurité (Security Policy)",
          "Quels sont les composants majeurs d'une politique de sécurité organisationnelle ?",
          "Composants d'une Politique de Sécurité",
          "• AUP (Acceptable Use Policy) : Règles d'utilisation légitime du matériel informatique par les employés.\n• Password Policy : Longueur minimale, complexité, rotation et historique.\n• BYOD Policy : Conditions d'accès au réseau pour les terminaux personnels.\n• Incident Response Plan : Procédure formelle en cas de brèche de sécurité avérée.",
          "AUP (charte d'usage), règles de mots de passe, BYOD et plan de réponse à incident.", "Fondamental", "SANS Security Policy Templates")

    add_c("Défense en Profondeur (Defense in Depth)",
          "Qu'appelle-t-on la stratégie de défense en profondeur dans un réseau d'entreprise ?",
          "Superposition des Couches de Sécurité",
          "• Principe : Superposer de multiples barrières défensives indépendantes à chaque couche (Périmètre, Réseau, Hôte, Données).\n• Si une couche cède (ex: firewall contourné), les couches suivantes (IPS, 802.1X, EDR sur postes, chiffrement base de données) stoppent la progression de l'attaquant.",
          "Multiplication de couches de sécurité indépendantes (Pare-feu, 802.1X, EDR, Chiffrement).", "Fondamental", "Cisco SAFE Architecture")

    add_c("Malware : Virus vs Ver vs Ransomware vs Cheval de Troie",
          "Quelle est la caractéristique distinctive qui différencie un Ver (Worm) d'un Virus ?",
          "Capacité d'Autoréplication Autonome du Ver",
          "• Virus : Nécessite l'intervention d'un utilisateur humain (exécution d'un fichier infecté) pour se propager et infecter d'autres fichiers hôtes.\n• Ver (Worm) : Totalement autonome, se réplique et se propage tout seul à travers le réseau en exploitant des vulnérabilités sans aucune action humaine.\n• Ransomware : Chiffre les données de la victime et exige une rançon pour la clé.",
          "Le Ver se propage de façon autonome sur le réseau sans intervention humaine.", "Fondamental", "NIST Malware Guide")

    add_c("Surface d'Attaque (Attack Surface)",
          "Comment définit-on la surface d'attaque d'un équipement réseau Cisco et comment la réduire ?",
          "Réduction de la Surface d'Attaque",
          "• Définition : L'ensemble de tous les points d'entrée possibles qu'un attaquant peut sonder ou exploiter.\n• Réduction sur switch/routeur : Désactiver les ports non utilisés, fermer Telnet/HTTP, couper CDP/LLDP sur les interfaces tournées vers l'extérieur, désactiver les services inutiles (chargement auto, TFTP server).",
          "Désactiver tout service ou port inutile pour limiter les vecteurs d'exposition.", "Fondamental", "Cisco Hardening Guide", "R1(config)# no ip http server\nR1(config-if)# shutdown")

    add_c("Vulnérabilités Zero-Day & CVE / CVSS",
          "Que signifient CVE et le score CVSS dans la gestion des vulnérabilités logicielles ?",
          "Standards CVE et Métrique CVSS",
          "• CVE (Common Vulnerabilities and Exposures) : Dictionnaire public identifiant chaque vulnérabilité connue de manière unique (ex: CVE-2023-20198).\n• Score CVSS (Common Vulnerability Scoring System) : Note de sévérité de 0.0 à 10.0 (Faible, Moyen, Élevé, Critique > 9.0) calculée selon la complexité d'attaque et l'impact.",
          "CVE = identifiant public unique. CVSS = score de gravité de 0.0 à 10.0.", "Fondamental", "FIRST CVSS v3.1 / v4.0")

    add_c("Spoofing d'Adresse IP & RFC 2827 (BCP 38)",
          "En quoi consiste le Spoofing IP et quelle norme prescrit son filtrage à la source ?",
          "Usurpation d'Adresse IP & Ingress Filtering",
          "• Spoofing IP : L'attaquant falsifie l'en-tête IP d'un paquet en y inscrivant l'adresse IP d'une victime ou d'un équipement légitime.\n• RFC 2827 (BCP 38) : Impose aux FAI et entreprises de filtrer en entrée (Ingress Filtering) tout paquet dont l'adresse source n'appartient pas à la plage allouée au client (ex: via Cisco Unicast RPF).",
          "Falsification de l'IP source. Neutralisé par BCP 38 / Cisco uRPF.", "Intermédiaire", "RFC 2827 (BCP 38)", "R1(config-if)# ip verify unicast source reachable-via rx")

    add_c("SIEM (Security Information and Event Management)",
          "Quel est le rôle d'un système SIEM dans un centre de supervision de la sécurité (SOC) ?",
          "Centralisation et Corrélation des Logs de Sécurité",
          "• Collecte en temps réel les journaux d'événements (Syslog, NetFlow, pare-feu, authentification Active Directory).\n• Analyse et corrèle les alertes via des règles d'intelligence pour détecter les attaques furtives et générer des incidents pour les analystes du SOC (ex: Splunk, Microsoft Sentinel).",
          "Agrège et corrèle les logs de toute l'entreprise pour identifier les menaces en temps réel.", "Intermédiaire", "Cisco SOC Framework")

    # 16-35: Device Access Security
    add_c("Chiffrement des Mots de Passe : Type 7 vs Type 5 vs Type 8/9",
          "Pourquoi le chiffrement 'service password-encryption' (Type 7) est-il totalement obsolète ?",
          "Algorithmes de Hachage des Mots de Passe Cisco",
          "• Type 7 (service password-encryption) : Utilise un simple chiffrement par décalage Vigenère réversible en 1 seconde par n'importe quel site web.\n• Type 5 : Hachage MD5 (enable secret classique).\n• Type 8 (PBKDF2 avec SHA-256) & Type 9 (Scrypt) : Fonctions de dérivation hautement résistantes aux attaques par GPU.",
          "Type 7 est réversible instantanément. Préférer enable algorithm-type scrypt (Type 9) ou sha256 (Type 8).", "Fondamental", "Cisco Password Hash Guide", "R1(config)# enable algorithm-type scrypt secret CléUltraSecrète")

    add_c("Sécurisation de la Console et Minuteur d'Inactivité",
          "Quelles commandes configurent une authentification locale et une déconnexion automatique sur la console ?",
          "Ligne Console Sécurisée",
          "1. \"line con 0\"\n2. \"login local\" (impose l'utilisation d'un compte de la base locale)\n3. \"exec-timeout 5 0\" (déconnecte la session après 5 minutes et 0 seconde d'inactivité)\n4. \"logging synchronous\".",
          "line con 0, login local, et exec-timeout 5 0.", "Fondamental", "Cisco IOS Security Configuration Guide", "R1(config-line)# exec-timeout 5 0")

    add_c("Configuration Complète de SSHv2",
          "Quelles sont les 5 étapes obligatoires pour activer SSHv2 sur un commutateur Cisco ?",
          "Activation SSHv2 Cisco IOS",
          "1. Définir un nom d'hôte non par défaut : \"hostname SW1\"\n2. Définir un nom de domaine IP : \"ip domain name lab.local\"\n3. Générer la paire de clés RSA : \"crypto key generate rsa modulus 2048\"\n4. Forcer la version 2 : \"ip ssh version 2\"\n5. Sous \"line vty 0 4\" : \"transport input ssh\" et \"login local\".",
          "Hostname + ip domain name + crypto key generate rsa (2048) + ip ssh version 2 + transport input ssh.", "Fondamental", "Cisco IOS Security Guide", "SW1(config)# ip ssh version 2")

    add_c("Désactivation de Telnet (transport input ssh)",
          "Pourquoi Telnet est-il strictement proscrit et quelle commande l'interdit sur les lignes VTY ?",
          "Élimination de Telnet (Port TCP 23)",
          "• Vulnérabilité : Telnet transmet tout le trafic (y compris identifiants et mots de passe enable) en texte clair non chiffré.\n• Sécurisation : Sous \"line vty 0 15\", taper \"transport input ssh\". Cette commande refuse toute connexion Telnet entrante.",
          "Telnet envoie les identifiants en clair. Forcer 'transport input ssh' sur les VTY.", "Fondamental", "RFC 854 / RFC 4253", "SW1(config-line)# transport input ssh")

    add_c("Bannière Légale d'Avertissement (banner motd)",
          "Pourquoi la bannière MOTD ne doit-elle JAMAIS contenir le mot 'Welcome' (Bienvenue) ?",
          "Implications Juridiques de la Bannière MOTD",
          "• Les tribunaux ont déjà rejeté des poursuites contre des intrus au motif que le mot 'Welcome' constituait une invitation implicite à se connecter !\n• Règle : Rédiger un avertissement strict stipulant que l'accès est strictement réservé au personnel autorisé et que toute tentative fera l'objet de poursuites judiciaires.",
          "Ne jamais écrire 'Bienvenue' : avertir d'un accès strictement restreint sous peine de poursuites.", "Fondamental", "Cisco Legal Best Practices", "R1(config)# banner motd #ACCES RESERVE - TOUTE INTRUSION SERA POURSUIVIE#")

    add_c("Protection Anti-Brute-Force : login block-for",
          "Comment bloquer temporairement les tentatives d'intrusion répétées sur un routeur Cisco ?",
          "Commande Cisco login block-for (Login Quarantine)",
          "• Commande : \"login block-for 120 attempts 3 within 60\"\n• Signification : Si 3 tentatives de connexion échouent en moins de 60 secondes, l'accès au routeur (SSH/Telnet/HTTP) est totalement verrouillé pendant 120 secondes pour tous les clients non exemptés.",
          "login block-for <durée> attempts <nb> within <fenêtre> bloque les assauts par force brute.", "Intermédiaire", "Cisco IOS Login Enhancement Guide", "R1(config)# login block-for 180 attempts 4 within 60")

    add_c("Exemption de Blocage : login quiet-mode access-class",
          "Comment permettre aux administrateurs de se connecter même pendant un blocage login block-for ?",
          "Liste Blanche en Mode Silencieux (Quiet Mode)",
          "• Lors d'un blocage 'login block-for', le routeur bascule en 'Quiet Mode'.\n• La commande \"login quiet-mode access-class ADMIN_ACL\" associe une ACL permettant aux adresses IP de la station d'administration de continuer à se connecter.",
          "login quiet-mode access-class autorise les admins à se connecter même en plein blocage.", "Intermédiaire", "Cisco Login Guide", "R1(config)# login quiet-mode access-class 10")

    add_c("Architecture AAA : Authentification, Autorisation, Traçabilité",
          "Quels sont les rôles précis de chacun des 3 piliers du modèle AAA ?",
          "Les 3 Piliers AAA (RFC 2865)",
          "• Authentification (Qui êtes-vous ?) : Vérification de l'identité de l'utilisateur (identifiant, mot de passe, certificat, token MFA).\n• Autorisation (Qu'avez-vous le droit de faire ?) : Délimite les commandes et privilèges accordés à l'utilisateur une fois connecté.\n• Traçabilité / Accounting (Qu'avez-vous fait ?) : Enregistre l'historique complet de toutes les actions et commandes exécutées avec horodatage.",
          "Authentication = qui tu es ; Authorization = ce que tu as le droit de faire ; Accounting = ce que tu as fait.", "Fondamental", "RFC 2865 / RFC 8907")

    add_c("Comparatif Protocoles AAA : TACACS+ vs RADIUS",
          "Quelles sont les 4 différences techniques majeures entre TACACS+ et RADIUS ?",
          "TACACS+ (Cisco) vs RADIUS (Standard Ouvert)",
          "1. Transport : TACACS+ utilise TCP 49 (fiable). RADIUS utilise UDP 1812/1813 (ou 1645/1646).\n2. Chiffrement : TACACS+ chiffre l'intégralité du paquet. RADIUS ne chiffre que le mot de passe.\n3. Séparation : TACACS+ sépare distinctement Authentification et Autorisation (permet l'autorisation commande par commande). RADIUS combine Authentification et Autorisation dans un seul échange.\n4. Standard : TACACS+ (développé par Cisco) est optimisé pour l'administration d'équipements réseau. RADIUS (IETF) est optimisé pour l'accès réseau des utilisateurs (802.1X, Wi-Fi, VPN).",
          "TACACS+ = TCP 49, tout le paquet chiffré, sépare Auth/Author. RADIUS = UDP 1812/1813, seul le mot de passe est chiffré.", "Fondamental", "RFC 8907 / RFC 2865")

    add_c("Configuration de Base AAA sur Cisco IOS",
          "Quelles sont les commandes pour activer AAA et configurer une méthode d'authentification par repli ?",
          "Méthodes AAA avec Repli Local (Fallback)",
          "1. \"aaa new-model\" : Active le framework AAA.\n2. Déclarer le serveur : \"tacacs server ISE_SRV ...\"\n3. \"aaa authentication login default group tacacs+ local\"\n• Fonctionnement du repli : Le routeur interroge le serveur TACACS+ en premier. Si le serveur ne répond pas (panne réseau), il bascule sur la base locale d'utilisateurs.",
          "aaa new-model puis aaa authentication login default group tacacs+ local.", "Intermédiaire", "Cisco AAA Guide", "R1(config)# aaa authentication login default group tacacs+ local")

    add_c("AAA Command Authorization (Contrôle Commande par Commande)",
          "Comment TACACS+ empêche-t-il un technicien de taper 'reload' ou 'configure terminal' ?",
          "Autorisation Granulaire des Commandes en CLI",
          "• Commande : \"aaa authorization commands 15 default group tacacs+ local\"\n• À chaque commande saisie au niveau 15, le routeur envoie une requête d'autorisation au serveur TACACS+ (Cisco ISE) contenant le texte exact de la commande.\n• Si l'administrateur n'a pas le droit d'exécuter cette commande, le serveur renvoie un REJECT et la commande est bloquée.",
          "aaa authorization commands 15 soumet chaque commande au serveur TACACS+ avant exécution.", "Avancé", "Cisco ISE Administrator Guide", "R1(config)# aaa authorization commands 15 default group tacacs+")

    add_c("Niveaux de Privilèges Cisco (0 à 15)",
          "Quels sont les niveaux de privilèges par défaut sous Cisco IOS et leurs usages ?",
          "Hiérarchie des Privilèges 0 à 15",
          "• Niveau 1 (User EXEC) : Accès initial par défaut (prompt '>'), commandes de base en lecture seule (ping, show basique).\n• Niveau 15 (Privileged EXEC) : Accès administrateur complet (prompt '#'), équivalent du compte root.\n• Niveau 0 : Commandes très restreintes (disable, enable, exit, help, logout).\n• Niveaux 2 à 14 : Niveaux personnalisables configurables par l'administrateur.",
          "Niveau 1 = User EXEC (>). Niveau 15 = Privileged EXEC (#, root complet). Niveaux 2-14 = personnalisables.", "Fondamental", "Cisco Privileges Guide", "R1(config)# privilege exec level 5 show running-config")

    add_c("Parser Views (Role-Based Access Control sans AAA)",
          "Comment créer un profil administrateur restreint sans serveur TACACS+ externe ?",
          "Cisco IOS Parser Views (RBAC Local)",
          "• Activer le mode root view : \"enable view\"\n• Créer une vue dédiée : \"parser view HELP_DESK\"\n• Allouer des commandes spécifiques : \"commands exec include show ip interface brief\" et \"commands exec include show running-config interface\"\n• Permet d'accorder un accès chirurgical sans donner le niveau 15.",
          "parser view permet de créer des rôles personnalisés locaux avec commandes autorisées.", "Avancé", "Cisco IOS Security Guide", "R1(config)# parser view OPERATOR")

    add_c("Sécurisation du Port Console Physique",
          "Quels risques pèsent sur le port console et comment s'en prémunir ?",
          "Protection Physique et Réglages Console",
          "• Risque : Un attaquant ayant un accès physique peut brancher un câble console et redémarrer l'équipement avec le registre de configuration 0x2142 pour réinitialiser le mot de passe (Password Recovery Procedure).\n• Protection : Mettre les commutateurs sous armoire réseau verrouillée à clé, configurer 'no service password-recovery' (neutralise la procédure de récupération).",
          "Accès physique = risque de réinitialisation de mot de passe. no service password-recovery bloque la manipulation.", "Intermédiaire", "Cisco Hardware Security Guide", "SW1(config)# no service password-recovery")

    add_c("Longueur Minimale des Mots de Passe : security passwords min-length",
          "Quelle commande impose une taille plancher pour tous les mots de passe sous Cisco IOS ?",
          "Commande security passwords min-length",
          "• Commande : \"security passwords min-length <nombre>\" (ex: 12 ou 14 caractères).\n• Toute tentative de création d'un mot de passe ou d'une clé secrète inférieure à cette taille est immédiatement rejetée par le compilateur IOS avec une erreur de syntaxe.",
          "security passwords min-length 12 impose un minimum de caractères sur l'ensemble du boîtier.", "Fondamental", "Cisco Command Reference", "R1(config)# security passwords min-length 12")

    add_c("Sécurisation de l'Interface Web (HTTP/HTTPS Server)",
          "Pourquoi et comment désactiver le serveur HTTP non sécurisé sur un routeur Cisco ?",
          "Neutralisation du Serveur Web HTTP Non Chiffré",
          "• Le serveur HTTP embarqué sous Cisco IOS transmet les identifiants en clair et a historiquement présenté des vulnérabilités critiques.\n• Commandes recommandées :\n  1. \"no ip http server\" (coupe le port TCP 80 en clair)\n  2. \"ip http secure-server\" (active uniquement HTTPS sur le port TCP 443 chiffré par TLS).",
          "no ip http server pour couper le port 80 en clair. ip http secure-server pour activer HTTPS.", "Fondamental", "Cisco Security Best Practices", "R1(config)# no ip http server\nR1(config)# ip http secure-server")

    add_c("Limitation du Nombre de Sessions SSH Simultanées",
          "Comment éviter qu'un pirate ne sature toutes les lignes VTY d'un commutateur ?",
          "Gestion des Lignes VTY et Concurrence",
          "• Ne pas ouvrir de lignes superflues : si seules les lignes 0 à 4 sont configurées, fermer les lignes 5 à 15 avec 'transport input none'.\n• Utiliser 'ip ssh max-startups' pour limiter le nombre de négociations SSH simultanées non authentifiées.",
          "Fermer les lignes 5 à 15 inutilisées avec 'transport input none' pour éviter la saturation de slots.", "Intermédiaire", "Cisco IOS Hardening Guide", "SW1(config-line)# line vty 5 15\nSW1(config-line)# transport input none")

    add_c("Clé Privée RSA et Algorithmes Modernes SSH",
          "Quelle taille minimale de clé RSA doit-on générer pour SSHv2 ?",
          "Dimensionnement des Clés RSA",
          "• Taille minimale absolue : 2 048 bits (\"crypto key generate rsa modulus 2048\").\n• Les clés de 512 et 768 bits sont cassables et refusées par la plupart des clients SSH modernes (OpenSSH, PuTTY récent).\n• Les versions récentes d'IOS-XE supportent également ECDSA (Elliptic Curve Digital Signature Algorithm).",
          "Modulus 2048 bits au minimum pour garantir la sécurité et la compatibilité des clients.", "Fondamental", "NIST SP 800-131A", "R1(config)# crypto key generate rsa general-keys modulus 2048")

    add_c("Protection Contre les Chiffrements SSH Faibles",
          "Comment interdire les ciphers obsolètes (ex: 3DES, CBC) dans le serveur SSH de Cisco IOS ?",
          "Restriction des Ciphers et Algorithmes HMAC SSH",
          "• Commandes Cisco IOS-XE :\n  - \"ip ssh server algorithm encryption aes256-ctr aes192-ctr aes128-ctr\"\n  - \"ip ssh server algorithm mac hmac-sha2-512 hmac-sha2-256\"\n• Rejette les chiffrements vulnérables comme DES, 3DES et les chiffrements par blocs CBC vulnérables aux attaques de type padding oracle.",
          "ip ssh server algorithm encryption aes256-ctr force des algorithmes modernes et sûrs.", "Avancé", "Cisco Hardening Recommendations", "R1(config)# ip ssh server algorithm encryption aes256-ctr")

    add_c("Sauvegarde Automatique Sécurisée via SCP",
          "Comment activer le serveur SCP sécurisé sur Cisco IOS pour remplacer le protocole TFTP ?",
          "Activation du Serveur SCP (Secure Copy)",
          "• TFTP ne possède ni chiffrement ni authentification.\n• SCP s'appuie sur le canal SSH chiffré existant.\n• Commande d'activation : \"ip scp server enable\".\n• Permet de téléverser et télécharger des configurations de manière chiffrée et authentifiée.",
          "ip scp server enable active le transfert sécurisé de fichiers via SSH (remplace TFTP).", "Intermédiaire", "Cisco System Management Guide", "R1(config)# ip scp server enable")

    # 36-60: ACLs (IPv4 Standard & Extended, Named, Wildcard Masks)
    add_c("ACL IPv4 Standard vs Extended : Plages Numérotées",
          "Quelles sont les plages de numéros standards et étendues pour les ACLs IPv4 ?",
          "Plages de Numérotation des ACLs IPv4",
          "• ACLs Standards : 1 à 99 et 1300 à 1999 (plage étendue de secours).\n• ACLs Étendues (Extended) : 100 à 199 et 2000 à 2699 (plage étendue de secours).\n• Les ACLs standards ne filtrent QUE sur l'adresse IP source.\n• Les ACLs étendues filtrent sur l'IP source, l'IP destination, le protocole (IP, TCP, UDP, ICMP) et les ports.",
          "Standard : 1-99 & 1300-1999 (IP source uniquement). Extended : 100-199 & 2000-2699 (Source, Dest, Port).", "Fondamental", "Cisco IOS IP Access List Guide")

    add_c("Règle Implicite de Fin d'ACL (Implicit Deny Any)",
          "Quelle est la règle implicite invisible présente à la fin de TOUTE ACL Cisco ?",
          "Implicit Deny All",
          "• Toute liste d'accès se termine silencieusement par : \"deny ip any any\" (ou \"deny any\" en standard).\n• Conséquence : Si un paquet ne matche aucune ligne 'permit' explicite, il est immédiatement rejeté et détruit.\n• Règle d'or : Toute ACL doit comporter au moins une instruction 'permit', sinon elle bloque 100% du trafic !",
          "deny ip any any invisible à la fin : tout paquet non explicitement autorisé est bloqué.", "Fondamental", "Cisco Access Control Guide")

    add_c("Emplacement Idéal des ACLs : Standard vs Extended",
          "Où doit-on placer une ACL Standard et une ACL Extended selon les recommandations Cisco ?",
          "Règle de Placement Optimal des ACLs",
          "• ACL Standard : À placer le plus près possible de la DESTINATION.\n  (Raison : Comme elle ne filtre que sur l'adresse source, la placer près de la source bloquerait tout le trafic de l'hôte, y compris vers d'autres destinations autorisées !)\n• ACL Extended : À placer le plus près possible de la SOURCE.\n  (Raison : Rejette le trafic indésirable dès l'entrée pour ne pas saturer inutilement la bande passante du réseau de transit).",
          "Standard = au plus près de la DESTINATION. Extended = au plus près de la SOURCE.", "Fondamental", "Cisco Design Best Practices")

    add_c("Calcul des Masques Génériques (Wildcard Masks)",
          "Comment calcule-t-on le masque générique (Wildcard Mask) associé au sous-réseau 192.168.10.0 /26 ?",
          "Méthode par Soustraction du Masque Réseau",
          "• Formule : 255.255.255.255 MOINS le masque de sous-réseau.\n• Masque /26 = 255.255.255.192.\n• Calcul :\n    255.255.255.255\n  - 255.255.255.192\n  -----------------\n    0.  0.  0. 63\n• Le Wildcard Mask pour un /26 est donc 0.0.0.63. Les bits à 0 doivent correspondre exactement, les bits à 1 sont ignorés.",
          "255.255.255.255 - 255.255.255.192 = 0.0.0.63.", "Fondamental", "Cisco CCNA Math Guide")

    add_c("Mots-Clés 'host' et 'any' dans les ACLs",
          "À quels masques génériques correspondent exactement les mots-clés 'host' et 'any' ?",
          "Équivalences host et any",
          "• \"host 192.168.1.10\" équivaut strictement à \"192.168.1.10 0.0.0.0\" (matche uniquement cette adresse IP précise).\n• \"any\" équivaut strictement à \"0.0.0.0 255.255.255.255\" (matche n'importe quelle adresse IP existante).",
          "host = 0.0.0.0 (une seule IP). any = 0.0.0.0 255.255.255.255 (toutes les adresses).", "Fondamental", "Cisco Command Reference", "access-list 1 permit host 10.1.1.1")

    add_c("ACLs Nommées (Named ACLs) vs Numérotées",
          "Quels sont les avantages des ACLs nommées introduites par 'ip access-list' ?",
          "Avantages des Named ACLs",
          "• Lisibilité accrue grâce à des noms explicites (ex: PERMIT_WEB_ONLY).\n• Permet l'édition chirurgicale : chaque ligne possède un numéro de séquence (10, 20, 30...).\n• On peut insérer une nouvelle règle entre deux lignes existantes ou supprimer une seule ligne (\"no 20\") sans devoir effacer et retaper l'intégralité de la liste !",
          "Named ACLs permettent de nommer clairement la règle et d'insérer/supprimer des lignes par numéro de séquence.", "Fondamental", "Cisco IOS IP Configuration Guide", "R1(config)# ip access-list extended DMZ_FILTER")

    add_c("Application d'une ACL sur Interface : Inbound vs Outbound",
          "Quelle est la différence entre appliquer une ACL avec 'in' et 'out' sous une interface ?",
          "Direction Inbound (in) vs Outbound (out)",
          "• Inbound (\"ip access-group ACL_NAME in\") : Les paquets sont inspectés dès leur entrée sur le port, AVANT d'être routés. Économise du CPU si le paquet est rejeté.\n• Outbound (\"ip access-group ACL_NAME out\") : Les paquets sont inspectés après que le routeur a déterminé l'interface de sortie, juste avant d'être transmis sur le câble physique.",
          "in = filtrage à l'arrivée avant le routage. out = filtrage au départ après décision de routage.", "Fondamental", "Cisco IOS Command Reference", "R1(config-if)# ip access-group 100 in")

    add_c("Sécurisation des Lignes VTY par ACL (access-class)",
          "Comment restreindre l'administration SSH d'un routeur à un unique sous-réseau avec access-class ?",
          "Commande access-class sous line vty",
          "1. Créer une ACL standard autorisant le réseau de gestion :\n   \"access-list 10 permit 192.168.99.0 0.0.0.255\"\n2. Entrer sous la configuration des lignes virtuelles :\n   \"line vty 0 4\"\n3. Appliquer avec access-class :\n   \"access-class 10 in\"\n• Tout client provenant d'un autre sous-réseau voit sa connexion TCP SSH refusée immédiatement.",
          "Créer une ACL standard puis l'appliquer sous 'line vty' avec la commande 'access-class X in'.", "Fondamental", "Cisco VTY Hardening Guide", "R1(config-line)# access-class 10 in")

    add_c("Filtrage par Numéro de Port L4 dans une ACL Extended",
          "Quels opérateurs relationnels sont utilisables pour filtrer les ports TCP/UDP dans une ACL étendue ?",
          "Opérateurs de Ports L4",
          "• eq (equal) : Matche un port exact (ex: eq 80, eq www, eq 443).\n• neq (not equal) : Matche tous les ports sauf celui spécifié.\n• gt (greater than) / lt (less than) : Ports supérieurs ou inférieurs à une valeur.\n• range : Plage de ports consécutifs (ex: range 1024 65535).",
          "eq (égal), neq (différent), gt (plus grand), lt (plus petit), range (plage).", "Fondamental", "Cisco Command Reference", "R1(config-ext-nacl)# permit tcp any any range 80 443")

    add_c("Le Mot-Clé 'established' dans les ACLs TCP",
          "Comment le mot-clé 'established' permet-il de créer un pare-feu basique sans état (Stateless) ?",
          "Filtrage des Paquets TCP Établis (Flag ACK ou RST)",
          "• Commande : \"permit tcp any 192.168.1.0 0.0.0.255 established\"\n• Fonctionnement : Matche uniquement les paquets TCP dont le bit ACK ou RST est positionné à 1 dans l'en-tête.\n• Empêche les hôtes extérieurs d'initier une nouvelle connexion (SYN sans ACK), tout en autorisant les paquets de réponse légitimes aux requêtes initiées par les clients internes.",
          "established autorise le trafic retour TCP dont le drapeau ACK ou RST est actif.", "Intermédiaire", "RFC 793", "R1(config-ext-nacl)# permit tcp any 10.1.1.0 0.0.0.255 established")

    add_c("Reflexive ACLs vs CBAC vs Zone-Based Firewall",
          "Quelle est la différence entre une ACL classique et un pare-feu avec état (Stateful Firewall) ?",
          "Stateless Packet Filtering vs Stateful Inspection",
          "• ACL classique (Stateless) : Évalue chaque paquet isolément sans mémoriser l'historique des sessions (ne peut pas associer un paquet de retour à une requête).\n• Stateful Firewall (ZBF / ASA) : Maintient une table d'état dynamique des connexions ouvertes. Autorise automatiquement le trafic de retour légitime sur les ports dynamiques et inspecte les anomalies de protocole.",
          "Une ACL classique est sans état (stateless). Un pare-feu stateful inspecte et mémorise les sessions.", "Intermédiaire", "Cisco Firewall Concepts", "ZBF: Zone-Based Policy Firewall")

    add_c("Numéros de Séquence et Réorganisation d'ACLs",
          "Comment insérer une règle oubliée au début d'une ACL nommée sans tout réécrire ?",
          "Numéros de Séquence des Named ACLs",
          "• Cisco attribue par défaut des numéros de séquence espacés de 10 en 10 (10, 20, 30...).\n• Pour insérer une règle en tout premier, on utilise un numéro de séquence inférieur à 10 :\n  \"ip access-list extended MON_ACL\"\n  \"5 permit ip host 10.0.0.1 any\"\n• On peut renuméroter l'ensemble avec \"ip access-list resequence MON_ACL 10 10\".",
          "Taper le numéro de séquence souhaité (ex: 5) dans la configuration de l'ACL pour l'insérer avant 10.", "Intermédiaire", "Cisco IOS CLI Guide", "R1(config-ext-nacl)# 5 permit tcp host 10.1.1.5 any eq 22")

    add_c("show access-lists : Compteurs de Correspondance (Matches)",
          "Comment vérifier si une règle d'ACL est réellement sollicitée en production ?",
          "Vérification des Compteurs de Matches",
          "• Commande : \"show access-lists\" ou \"show ip access-lists <nom>\".\n• Affiche chaque ligne avec un compteur entre parenthèses : \"(154 matches)\".\n• Si le compteur reste à 0, la règle n'est jamais sollicitée (ou une règle précédente a déjà capté le trafic).\n• On réinitialise les compteurs avec \"clear access-list counters\".",
          "show access-lists affiche le nombre de paquets ayant matché chaque règle.", "Fondamental", "Cisco Command Reference", "R1# show ip access-lists")

    add_c("Journalisation des ACLs : Le Mot-Clé 'log'",
          "Quel est l'impact de l'ajout du mot-clé 'log' à la fin d'une règle d'ACL ?",
          "Génération de Messages Syslog par les ACLs",
          "• Lorsqu'un paquet matche une ligne avec \"log\", le routeur génère un message Syslog (%SEC-6-IPACCESSLOGP) contenant IP source/dest, ports et protocoles.\n• Avertissement de performance : Génère des interruptions CPU. À utiliser avec parcimonie pour le débogage ou les alertes sur règles critiques, jamais sur des flux massifs.",
          "Génère un log Syslog pour chaque paquet capté. Attention à l'impact CPU en cas de fort trafic.", "Intermédiaire", "Cisco Logging Guide", "R1(config-ext-nacl)# deny ip any any log")

    add_c("ACLs et Masques Génériques pour Sous-Réseaux Pairs ou Impairs",
          "Comment filtrer uniquement les adresses IP impaires d'un réseau grâce au masque générique ?",
          "Filtrage Avancé de Bits par Wildcard Mask",
          "• Une adresse IP impaire a obligatoirement son dernier bit de poids faible égal à 1.\n• Pour matcher tous les hôtes impairs de 192.168.1.0/24 :\n  - Adresse : 192.168.1.1\n  - Masque : 0.0.0.254 (en binaire : 11111110 -> teste tous les bits sauf le dernier qui doit rester à 1).\n• Règle : \"permit ip 192.168.1.1 0.0.0.254 any\".",
          "Masque 0.0.0.254 teste tous les bits sauf le dernier : permet de filtrer pairs (0) ou impairs (1).", "Avancé", "Cisco Advanced Routing Guide", "access-list 1 permit 192.168.1.1 0.0.0.254")

    add_c("ACLs Temps Réel : Time-Based ACLs",
          "Comment configurer une règle d'accès Internet active uniquement pendant les heures ouvrables ?",
          "Time-Based Access Lists",
          "1. Définir la plage horaire : \"time-range HEURES_BUREAU\"\n   \"periodic weekdays 8:00 to 18:00\"\n2. Appliquer dans l'ACL avec le mot-clé time-range :\n   \"permit tcp 192.168.1.0 0.0.0.255 any eq 80 time-range HEURES_BUREAU\"\n• En dehors de cette plage horaire, la règle devient inactive et le trafic est refusé.",
          "Créer un objet 'time-range' avec les horaires puis l'associer à la règle d'ACL.", "Intermédiaire", "Cisco IOS Security Guide", "R1(config)# time-range WORK_HOURS\nR1(config-time-range)# periodic weekdays 9:00 to 17:00")

    add_c("ACLs Dynamiques (Lock-and-Key)",
          "Qu'est-ce qu'une ACL Lock-and-Key et quel était son principe de fonctionnement ?",
          "ACL Dynamique Lock-and-Key",
          "• L'accès au réseau est totalement verrouillé par défaut.\n• L'utilisateur se connecte en Telnet/SSH sur le routeur et s'authentifie.\n• Dès validation, le routeur ouvre dynamiquement un trou temporaire dans l'ACL pour l'adresse IP de l'utilisateur pendant une durée déterminée.",
          "Ouvre dynamiquement un port dans l'ACL après authentification de l'utilisateur.", "Intermédiaire", "Cisco Legacy Security", "R1(config-ext-nacl)# dynamic MON_ACCES timeout 15 permit ip any any")

    add_c("IPv6 Traffic-Filter vs IPv4 Access-Group",
          "Quelle commande applique une liste d'accès IPv6 sur une interface sous Cisco IOS ?",
          "Application des ACLs IPv6",
          "• En IPv4, on utilise : \"ip access-group <nom> in/out\".\n• En IPv6, la commande dédiée est : \"ipv6 traffic-filter <nom> in/out\".\n• Les ACLs IPv6 sont toujours nommées et intègrent implicitement l'autorisation du trafic ND (Neighbor Discovery ICMPv6).",
          "ipv6 traffic-filter (au lieu de ip access-group en IPv4).", "Fondamental", "Cisco IPv6 Configuration Guide", "R1(config-if)# ipv6 traffic-filter BLOCK_HTTP in")

    add_c("ACLs Implicites IPv6 : Règles ND Cachées",
          "Quelles règles d'autorisation sont insérées implicitement à la fin d'une ACL IPv6 ?",
          "Règles Implicites ICMPv6 Neighbor Discovery",
          "• En plus du \"deny ipv6 any any\" final, toute ACL IPv6 inclut implicitement deux règles vitales :\n  - \"permit icmp any any nd-na\" (Neighbor Advertisement)\n  - \"permit icmp any any nd-ns\" (Neighbor Solicitation)\n• Ces règles évitent de casser la résolution d'adresses MAC locale (équivalent d'ARP) lors du blocage du trafic.",
          "Autorise implicitement nd-na et nd-ns pour ne pas casser la résolution d'adresses MAC ICMPv6.", "Intermédiaire", "RFC 4861", "permit icmp any any nd-ns / nd-na")

    add_c("Standard Access-List Wildcard Mask Omis",
          "Que se passe-t-il sous Cisco IOS si l'on tape 'access-list 1 permit 10.1.1.1' sans spécifier de masque ?",
          "Masque par Défaut Implicite 0.0.0.0",
          "• Si le masque générique est omis dans une ACL standard, Cisco IOS applique automatiquement un wildcard mask de 0.0.0.0 (correspondant à un hôte unique).\n• La commande est automatiquement réécrite en \"access-list 1 permit 10.1.1.1 0.0.0.0\" (ou host 10.1.1.1).",
          "Sans masque spécifié, l'IOS applique 0.0.0.0 par défaut (hôte unique).", "Fondamental", "Cisco Command Reference", "R1(config)# access-list 1 permit 10.1.1.1 (devient host 10.1.1.1)")

    add_c("VACL (VLAN Access Maps)",
          "Quelle est la particularité d'une VACL appliquée sur un commutateur de niveau 2/3 ?",
          "Filtrage Intra-VLAN de Couche 2 (VACL)",
          "• Une ACL normale (RACL) ne filtre que le trafic routé traversant une interface de couche 3 (SVI ou port routé).\n• Une VACL (VLAN Access Map) filtre le trafic commuté au sein d'un MÊME VLAN de niveau 2 (entre deux PC du même sous-réseau).\n• Permet d'isoler des machines locales sans routeur.",
          "VACL filtre le trafic au sein du même VLAN (couche 2), sans passer par le routage.", "Intermédiaire", "Cisco Catalyst Security Guide", "SW1(config)# vlan access-map SEC_VLAN 10\nSW1(config)# vlan filter SEC_VLAN vlan-list 10")

    add_c("Port ACL (PACL)",
          "Qu'est-ce qu'une PACL et où s'applique-t-elle sur un switch Catalyst ?",
          "Port Access Control List (PACL)",
          "• Une PACL est une liste d'accès appliquée directement sur un port physique de niveau 2 de commutateur en entrée uniquement (\"ip access-group <nom> in\").\n• Inspecte et bloque le trafic dès l'entrée sur le port matériel avant même le traitement VLAN ou VACL.",
          "PACL s'applique sur un port physique L2 en entrée uniquement.", "Intermédiaire", "Cisco Catalyst Configuration Guide", "SW1(config-if)# ip access-group PACL_1 in")

    add_c("Ordre de Traitement des ACLs sur Commutateur (PACL -> VACL -> RACL)",
          "Dans quel ordre un commutateur multicouche applique-t-il les différents types d'ACLs ?",
          "Hiérarchie d'Évaluation des ACLs Cisco",
          "1. PACL (Port ACL en entrée sur le port physique de switch)\n2. VACL (VLAN Access Map sur le VLAN ingress)\n3. RACL (Router ACL sur l'interface SVI ou le port routé L3).\n• Si la PACL jette le paquet, il n'atteint jamais la VACL ni la RACL.",
          "1. PACL (port physique) -> 2. VACL (VLAN) -> 3. RACL (interface routée L3).", "Avancé", "Cisco Catalyst Switching Guide", "PACL -> VACL -> RACL")

    add_c("ACLs Réseau avec Remarques (Remarks)",
          "Comment documenter une règle d'ACL pour faciliter la maintenance par l'équipe d'exploitation ?",
          "Commande remark dans les ACLs",
          "• Commande : \"access-list 100 remark Autorisation Serveurs Web DMZ\"\n• La ligne 'remark' s'insère directement au-dessus des règles associées dans le running-config.\n• N'a aucun impact sur le trafic ou les performances, mais améliore considérablement la lisibilité lors d'audits de sécurité.",
          "Le mot-clé 'remark' documente le rôle d'une règle directement dans la configuration.", "Fondamental", "Cisco Best Practices", "R1(config-ext-nacl)# remark Flux Web et HTTPS autorises")

    add_c("ACLs et Fragmentation IP (fragment / non-initial-fragment)",
          "Comment les ACLs étendues traitent-elles les fragments IP lors d'attaques par défragmentation ?",
          "Traitement des Fragments dans les ACLs",
          "• Le fragment initial contient l'en-tête de couche 4 (ports TCP/UDP) et peut être évalué normalement.\n• Les fragments non initiaux ne contiennent PAS d'en-tête L4 (uniquement l'en-tête IP et l'offset).\n• Le mot-clé \"fragments\" permet d'interdire ou d'autoriser spécifiquement les fragments résiduels pour bloquer les attaques de contournement de pare-feu.",
          "Les fragments résiduels n'ont pas d'en-tête L4. Filtrables avec le mot-clé fragments.", "Avancé", "RFC 1858 / RFC 3128", "R1(config-ext-nacl)# deny tcp any any fragments")

    # 61-80: Layer 2 Security (Port Security, DHCP Snooping, DAI, IP Source Guard)
    add_c("Port Security : Nombre Maximal d'Adresses MAC",
          "Comment limiter un port d'accès à une seule adresse MAC avec Port Security ?",
          "Limitation MAC avec Port Security",
          "1. Basculer le port en mode accès obligatoire : \"switchport mode access\"\n2. Activer la fonctionnalité : \"switchport port-security\"\n3. Plafonner le nombre de MACs : \"switchport port-security maximum 1\"\n• Empêche un utilisateur de brancher un switch sauvage sous son bureau pour raccorder plusieurs postes.",
          "switchport mode access, switchport port-security, switchport port-security maximum 1.", "Fondamental", "Cisco Switch Security Guide", "SW1(config-if)# switchport port-security maximum 1")

    add_c("Port Security : Les 3 Modes de Violation",
          "Quelles sont les différences majeures entre les modes de violation Protect, Restrict et Shutdown ?",
          "Les 3 Actions en Cas de Violation MAC",
          "• Protect : Rejette silencieusement les paquets de la MAC non autorisée. Le port reste ouvert pour la MAC légitime. Aucun log Syslog généré, aucun incrément de compteur d'erreur.\n• Restrict : Rejette les paquets non autorisés, incrémente le compteur de violations et émet une alerte Syslog et un Trap SNMP.\n• Shutdown (Défaut) : Désactive immédiatement le port entier en état 'err-disabled' (voyant orange), coupe tout trafic et génère un log Syslog/SNMP.",
          "Protect = jette sans log. Restrict = jette + log Syslog/SNMP. Shutdown (défaut) = err-disabled sur le port entier.", "Fondamental", "Cisco Command Reference", "SW1(config-if)# switchport port-security violation restrict")

    add_c("Port Security : Adresses MAC 'Sticky'",
          "Comment fonctionne l'apprentissage dynamique 'Sticky MAC' ?",
          "Apprentissage Automatique Sticky MAC",
          "• Commande : \"switchport port-security mac-address sticky\"\n• Le commutateur apprend dynamiquement la première adresse MAC reçue sur le port et l'enregistre automatiquement dans la configuration en mémoire vive (running-config) comme si elle avait été saisie statiquement.\n• Une sauvegarde (\"write memory\") fige la MAC de manière permanente au redémarrage.",
          "Sticky apprend la première MAC active et l'écrit directement dans la running-config.", "Fondamental", "Cisco Switch Guide", "SW1(config-if)# switchport port-security mac-address sticky")

    add_c("Réactivation d'un Port en 'err-disabled'",
          "Comment restaurer manuellement ou automatiquement une interface passée en état err-disabled ?",
          "Sortie de l'État err-disabled",
          "• Méthode manuelle : Exécuter successivement \"shutdown\" puis \"no shutdown\" sous l'interface concernée.\n• Méthode automatique : Configurer la reprise automatique globale :\n  \"errdisable recovery cause psecure-violation\"\n  \"errdisable recovery interval 300\" (réactive automatiquement l'interface après 300 secondes de quarantaine).",
          "Manuel : shutdown puis no shutdown. Automatique : errdisable recovery cause psecure-violation.", "Fondamental", "Cisco Troubleshooting Guide", "SW1# show interfaces status err-disabled")

    add_c("Dynamic ARP Inspection (DAI)",
          "Comment Dynamic ARP Inspection neutralise-t-il les attaques par ARP Spoofing / Poisoning ?",
          "Interception des Réponses ARP Falsifiées",
          "• DAI intercepte tous les paquets ARP sur les ports untrusted.\n• Il compare l'adresse IP et l'adresse MAC contenues dans le payload ARP avec la table sécurisée DHCP Snooping Binding.\n• Si la correspondance IP/MAC ne concorde pas, le paquet ARP est détruit et une alerte de sécurité est journalisée.",
          "DAI valide les paquets ARP par rapport à la base DHCP Snooping pour stopper l'ARP Poisoning.", "Intermédiaire", "Cisco Security Guide", "SW1(config)# ip arp inspection vlan 10,20")

    add_c("Ports DAI Trusted vs Untrusted",
          "Quels commutateurs ou ports doivent être configurés en 'ip arp inspection trust' ?",
          "Ports de Confiance pour DAI",
          "• Les ports raccordés aux postes clients finaux doivent rester en 'Untrusted' (défaut).\n• Les ports raccordés aux routeurs légitimes, serveurs à adresses IP fixes et liens d'interconnexion (Trunks entre switches) doivent être configurés en \"ip arp inspection trust\" pour ne pas être bloqués.",
          "Trunks, routeurs et serveurs = Trusted. Ports clients d'accès = Untrusted.", "Intermédiaire", "Cisco Catalyst Switch Guide", "SW1(config-if)# ip arp inspection trust")

    add_c("DAI avec Serveurs à IP Fixe (ARP ACL)",
          "Comment DAI valide-t-il les paquets ARP d'un serveur configuré avec une adresse IP statique ?",
          "ARP Access-List pour Hôtes Statiques",
          "• Comme le serveur statique n'utilise pas DHCP, il n'apparaît pas dans la table DHCP Snooping Binding.\n• Solution : Créer une ARP ACL associant statiquement la MAC et l'IP :\n  \"arp access-list STATIC_SRV\"\n  \"permit ip host 192.168.1.10 mac host 0011.2233.4455\"\n  \"ip arp inspection filter STATIC_SRV vlan 10\".",
          "Créer une arp access-list avec la paire IP/MAC statique et l'attacher avec ip arp inspection filter.", "Intermédiaire", "Cisco Catalyst Guide", "SW1(config)# arp access-list SRV_ARP\nSW1(config-arp-nacl)# permit ip host 10.1.1.10 mac host aabb.ccdd.eeff")

    add_c("DAI Validation Complémentaire : src-mac, dst-mac, ip",
          "Quelles vérifications supplémentaires peut-on activer avec 'ip arp inspection validate' ?",
          "Validation Stricte des En-têtes ARP",
          "• \"src-mac\" : Vérifie que la MAC source dans l'en-tête Ethernet correspond à la MAC source dans le corps ARP.\n• \"dst-mac\" : Vérifie que la MAC destination Ethernet correspond à la MAC cible ARP (pour les réponses ARP).\n• \"ip\" : Rejette les adresses IP invalides (0.0.0.0, 255.255.255.255, adresses de multidiffusion de classe D).",
          "Vérifie la concordance des MACs Ethernet et ARP, et élimine les adresses IP aberrantes (0.0.0.0).", "Avancé", "Cisco Security Best Practices", "SW1(config)# ip arp inspection validate src-mac dst-mac ip")

    add_c("IP Source Guard (IPSG)",
          "Quel type d'attaque IP Source Guard bloque-t-il et sur quoi s'appuie-t-il ?",
          "Prévention du Spoofing d'Adresse IP sur le LAN",
          "• Empêche un poste compromis d'émettre des paquets en usurpant l'adresse IP d'un autre équipement du réseau.\n• S'appuie sur la table DHCP Snooping Binding pour créer un filtre matériel dynamique (PACL implicite sur le port).\n• Bloque tout paquet dont l'IP source ne correspond pas au bail attribué sur ce port physique précis.",
          "Bloque l'usurpation d'IP sur le port d'accès grâce à la table DHCP Snooping.", "Intermédiaire", "Cisco IP Source Guard Guide", "SW1(config-if)# ip verify source")

    add_c("IP Source Guard avec Filtrage MAC (ip verify source port-security)",
          "Quelle est la différence entre 'ip verify source' simple et avec l'option 'port-security' ?",
          "Filtrage IP Seul vs IP + MAC",
          "• \"ip verify source\" (simple) : Filtre uniquement sur l'adresse IP source.\n• \"ip verify source port-security\" : Filtre simultanément sur l'adresse IP source ET l'adresse MAC source (nécessite l'activation préalable de Port Security sur le port).",
          "Sans option = filtre IP source. Avec port-security = filtre IP source ET adresse MAC source.", "Avancé", "Cisco Security Configuration Guide", "SW1(config-if)# ip verify source port-security")

    add_c("Attaques VLAN Hopping : Switch Spoofing",
          "Comment un attaquant réalise-t-il une attaque par Switch Spoofing et comment la neutraliser ?",
          "DTP et Usurpation de Commutateur",
          "• Mécanisme : L'attaquant envoie des paquets DTP (Dynamic Trunking Protocol) avec des trames 'desirable' pour négocier un lien Trunk 802.1Q avec le port du commutateur, accédant ainsi à tous les VLANs du réseau.\n• Neutralisation : Forcer explicitement le port en mode accès (\"switchport mode access\") et désactiver DTP avec \"switchport nonegotiate\".",
          "L'attaquant négocie un Trunk via DTP. Bloqué par 'switchport mode access' et 'switchport nonegotiate'.", "Intermédiaire", "Cisco VLAN Security Guidelines", "SW1(config-if)# switchport mode access\nSW1(config-if)# switchport nonegotiate")

    add_c("Attaques VLAN Hopping : Double Tagging 802.1Q",
          "Comment fonctionne l'attaque par Double Tagging et pourquoi le Native VLAN en est-il la cause ?",
          "Exploitation du Native VLAN Non Étiqueté",
          "• L'attaquant envoie une trame avec deux tags 802.1Q : le tag externe correspond au Native VLAN du trunk, le tag interne au VLAN cible de la victime.\n• Le premier switch retire le tag externe natif et relaie la trame sur le trunk sans tag.\n• Le switch suivant lit le tag interne restant et livre le paquet à la victime.\n• Neutralisation : Changer le Native VLAN par défaut (ne jamais laisser VLAN 1) et forcer l'étiquetage avec \"vlan dot1q tag native\".",
          "Exploite le VLAN natif non taggué. Neutralisé en changeant le Native VLAN et avec 'vlan dot1q tag native'.", "Intermédiaire", "Cisco Security Guide", "SW1(config)# vlan dot1q tag native")

    add_c("Sécurisation du Native VLAN sur les Trunks",
          "Quelles sont les deux règles fondamentales de configuration pour sécuriser le Native VLAN ?",
          "Bonnes Pratiques du Native VLAN",
          "1. Ne jamais utiliser le VLAN 1 par défaut comme Native VLAN (créer un VLAN fictif dédié non utilisé, ex: VLAN 999).\n2. Configurer le même ID de Native VLAN sur les deux extrémités du lien Trunk pour éviter les alertes de Native VLAN Mismatch CDP.",
          "Assigner un VLAN inutilisé dédié (ex: VLAN 999) comme Native VLAN des deux côtés du Trunk.", "Fondamental", "Cisco Best Practices", "SW1(config-if)# switchport trunk native vlan 999")

    add_c("Attaque par Inondation de Table MAC (MAC Flooding)",
          "Comment fonctionne l'attaque MAC Flooding et que devient le comportement du commutateur ?",
          "Saturation de la Mémoire CAM du Commutateur",
          "• L'attaquant (avec des outils comme macof) bombarde le switch avec des milliers d'adresses MAC sources fictives en quelques secondes.\n• La table CAM s'épuise et s'effondre. Le switch ne sachant plus router les trames bascule en mode 'fail-open' et diffuse tout le trafic en broadcast sur tous les ports (Fail-open as a Hub), permettant à l'attaquant de renifler tout le trafic du réseau.\n• Protection absolue : Port Security.",
          "Sature la table CAM pour forcer le switch à diffuser tout le trafic comme un hub. Bloqué par Port Security.", "Fondamental", "Cisco Security Principles", "SW1# show mac address-table count")

    add_c("STP BPDU Guard",
          "Que fait la fonction BPDU Guard lorsqu'elle reçoit une BPDU sur un port d'accès protégé par PortFast ?",
          "Protection de l'Arbre STP par BPDU Guard",
          "• Les ports connectés à des postes utilisateurs sont en PortFast (ne doivent jamais recevoir de BPDU STP).\n• Si un utilisateur branche un commutateur sauvage émettant des BPDUs, BPDU Guard coupe immédiatement le port et le place en état 'err-disabled' pour empêcher la déstabilisation de la racine STP.\n• Commande : \"spanning-tree portfast bpduguard default\" ou par interface.",
          "Coupe immédiatement le port en état err-disabled s'il reçoit une trame BPDU.", "Fondamental", "Cisco Spanning Tree Guide", "SW1(config)# spanning-tree portfast bpduguard default")

    add_c("STP Root Guard",
          "Quel problème Root Guard prévient-il sur les ports des commutateurs de distribution ?",
          "Verrouillage du Pont Racine STP (Root Bridge)",
          "• Empêche un commutateur nouvellement raccordé de s'autoproclamer Root Bridge du réseau STP en émettant une priorité 0.\n• S'applique sur les ports désignés de sortie vers les commutateurs d'accès. Si une BPDU supérieure est reçue, le port est placé en état 'root-inconsistent' (bloque le trafic mais ne coupe pas le port physique jusqu'à cessation des BPDUs).",
          "Empêche un switch externe de devenir Root Bridge en plaçant le port en état 'root-inconsistent'.", "Intermédiaire", "Cisco STP Security Guide", "SW1(config-if)# spanning-tree guard root")

    add_c("Private VLANs (PVLANs) : Promiscuous vs Isolated vs Community",
          "Quels sont les rôles des 3 types de ports dans une architecture de VLANs Privés (PVLAN) ?",
          "Segmentation Avancée par Private VLANs",
          "• Promiscuous Port (P-Port) : Connecté à la passerelle/routeur, peut communiquer avec TOUS les ports du PVLAN.\n• Isolated Port (I-Port) : Totalement isolé, ne peut communiquer qu'avec le port Promiscuous (ne peut joindre aucun autre port isolé ni communauté, idéal pour l'hébergement mutualisé ou chambres d'hôtel).\n• Community Port (C-Port) : Peut communiquer avec les membres de sa communauté et le port Promiscuous, mais isolé des autres communautés.",
          "Promiscuous = parle à tout le monde. Isolated = parle uniquement au routeur. Community = parle à sa communauté + routeur.", "Avancé", "RFC 5517", "SW1(config-if)# switchport mode private-vlan host")

    add_c("STP Loop Guard vs UDLD (UniDirectional Link Detection)",
          "En quoi la protection UDLD diffère-t-elle de Loop Guard sur les liens fibre optique ?",
          "Détection de Liens Unidirectionnels",
          "• Loop Guard : Surveille la disparition des BPDUs STP causée par des congestions logicielles et bloque le port en état loop-inconsistent.\n• UDLD (Couche 2) : Envoie des sondes d'écho de niveau 2 pour tester la continuité physique bidirectionnelle de la fibre (Tx et Rx). Si un brin de fibre est coupé (Tx fonctionne mais pas Rx), UDLD désactive immédiatement le port pour empêcher les boucles de redirection.",
          "Loop Guard gère les pannes logicielles STP. UDLD teste la continuité physique bidirectionnelle de la fibre.", "Avancé", "RFC 5171", "SW1(config)# udld enable")

    add_c("Désactivation des Protocoles de Découverte : CDP vs LLDP",
          "Pourquoi désactiver CDP et LLDP sur les interfaces connectées aux utilisateurs et vers Internet ?",
          "Fuite d'Informations et Reconnaissance Réseau",
          "• CDP (Cisco) et LLDP (IEEE) diffusent périodiquement en clair des informations critiques sur l'équipement : adresse IP de gestion, modèle exact du switch, version d'IOS, nom du boîtier et numéro de port.\n• Un attaquant branché au port d'accès collecte ces données pour cibler précisément les failles connues de l'IOS.\n• Désactivation ciblée : \"no cdp enable\" et \"no lldp transmit / receive\" sous l'interface.",
          "CDP/LLDP divulguent le modèle, l'IP et la version d'IOS en clair. À couper sur les ports clients.", "Fondamental", "Cisco Hardening Recommendations", "SW1(config-if)# no cdp enable\nSW1(config-if)# no lldp transmit")

    add_c("Storm Control (Contrôle des Tempêtes Broadcast/Multicast)",
          "Comment la fonction Storm Control protège-t-elle le commutateur des tempêtes de broadcast ?",
          "Plafonnement du Débit de Tempête",
          "• Surveille le pourcentage de bande passante ou le nombre de paquets par seconde (pps) consommés par le trafic Broadcast, Multicast ou Unknown Unicast.\n• Si le seuil configuré est dépassé (ex: plus de 20% de la capacité du port), Storm Control filtre immédiatement les paquets excédentaires ou coupe le port physique.",
          "Bloque les tempêtes de broadcast dès qu'un seuil de débit ou de paquets/seconde est franchi.", "Intermédiaire", "Cisco Catalyst Configuration Guide", "SW1(config-if)# storm-control broadcast level 20.0 10.0")

    # 81-90: VPNs & Cryptography
    add_c("Chiffrement Symétrique vs Asymétrique",
          "Quelle est la différence fondamentale entre chiffrement symétrique et asymétrique ?",
          "Principes Cryptographiques Clés",
          "• Symétrique : Utilise une seule et même clé secrète partagée pour chiffrer ET déchiffrer. Très rapide, idéal pour le trafic volumineux (ex: AES-128, AES-256).\n• Asymétrique : Utilise une paire de clés mathématiquement liées : une clé publique (diffusée à tous pour chiffrer) et une clé privée (gardée secrète pour déchiffrer). Beaucoup plus lent, utilisé pour l'échange de clés initial et les signatures (ex: RSA, DH, ECDSA).",
          "Symétrique = même clé secrète pour chiffrer/déchiffrer (rapide, AES). Asymétrique = paire clé publique/privée (RSA/DH).", "Fondamental", "NIST SP 800-175B")

    add_c("Fonctions de Hachage et HMAC (SHA-256 vs MD5)",
          "Quel est le rôle d'un HMAC et pourquoi MD5 et SHA-1 sont-ils proscrits ?",
          "Intégrité et Authentification des Messages",
          "• Hachage (Hash) : Fonction à sens unique transformant un message de taille arbitraire en une empreinte de taille fixe. Vérifie l'intégrité.\n• HMAC (Hash-based Message Authentication Code) : Combine le message avec une clé secrète partagée, garantissant à la fois l'intégrité et l'authenticité de l'émetteur.\n• MD5 et SHA-1 présentent des collisions cryptographiques démontrées. Utiliser impérativement SHA-256 ou SHA-512.",
          "HMAC = hash + clé secrète pour prouver l'authenticité. MD5/SHA-1 sont vulnérables, utiliser SHA-256.", "Fondamental", "RFC 2104 / RFC 6234")

    add_c("IPsec : Protocole ESP vs AH",
          "Pourquoi le protocole ESP est-il massivement utilisé à la place de AH dans les VPNs IPsec ?",
          "ESP (Protocole IP 50) vs AH (Protocole IP 51)",
          "• AH (Authentication Header - IP 51) : Fournit intégrité et authentification de l'en-tête IP complet, mais AUCUN chiffrement (données en clair) ! Incompatible avec le NAT car le NAT modifie l'adresse IP et casse le hash d'AH.\n• ESP (Encapsulating Security Payload - IP 50) : Fournit à la fois le chiffrement des données (confidentialité), l'intégrité et l'authentification. Totalement compatible avec le NAT (via NAT-Traversal UDP 4500).",
          "ESP (IP 50) chiffre les données et passe le NAT. AH (IP 51) ne chiffre rien et casse avec le NAT.", "Fondamental", "RFC 4302 / RFC 4303")

    add_c("Modes IPsec : Transport vs Tunnel",
          "Quelle est la différence structurelle entre le mode Transport et le mode Tunnel en IPsec ?",
          "Mode Transport vs Mode Tunnel",
          "• Mode Transport : Conserve l'en-tête IP d'origine et insère l'en-tête ESP entre l'IP et la couche 4 (TCP/UDP). Utilisé pour les communications hôte à hôte directes.\n• Mode Tunnel (Défaut pour VPN Site-à-Site) : Encapsule l'intégralité du paquet IP d'origine (en-tête + données) dans un TOUT NOUVEL en-tête IP externe routable sur Internet. Masque totalement le plan d'adressage privé interne.",
          "Transport = garde l'en-tête IP d'origine (hôte à hôte). Tunnel = crée un nouvel en-tête IP externe (Site-à-Site).", "Fondamental", "RFC 4301 § 4.1", "crypto ipsec transform-set MY_SET esp-aes esp-sha-hmac\nmode tunnel")

    add_c("IKEv1 vs IKEv2 (Internet Key Exchange)",
          "Quels sont les avantages d'IKEv2 par rapport à IKEv1 pour l'établissement de tunnels IPsec ?",
          "Évolution d'IKEv1 vers IKEv2 (RFC 7296)",
          "• Moins d'échanges de messages : IKEv2 négocie le tunnel en 4 messages (au lieu de 6 ou 9 en IKEv1).\n• Support natif de la mobilité et du multihoming (MOBIKE - survie au changement d'IP du client).\n• Support natif du NAT-Traversal et de l'authentification EAP.\n• Résistance accrue aux attaques par déni de service (cookies cryptographiques anti-spoofing).",
          "IKEv2 est plus rapide (4 paquets), plus résistant au DoS, et supporte nativement le NAT-T et la mobilité.", "Intermédiaire", "RFC 7296")

    add_c("Échange de Clés Diffie-Hellman (DH Groups)",
          "Comment l'algorithme Diffie-Hellman permet-il à deux routeurs d'établir une clé secrète sur Internet ?",
          "Échange Sécurisé Diffie-Hellman",
          "• Permet à deux interlocuteurs qui ne se sont jamais rencontrés de dériver conjointement une même clé secrète partagée sur un canal public non sécurisé sans jamais transmettre la clé sur le câble.\n• Groupes DH : Définissent la puissance cryptographique. Les groupes 1, 2 et 5 sont obsolètes. Utiliser au minimum le Groupe 14 (2048 bits) ou les groupes de courbes elliptiques 19, 20 ou 21 (ECDH).",
          "Permet de calculer une clé secrète commune sur un réseau public. Choisir au minimum le Groupe 14 (2048 bits).", "Intermédiaire", "RFC 3526", "R1(config-ikev2-policy)# proposal 1\nR1(config-ikev2-proposal)# group 14 19")

    add_c("NAT-Traversal (NAT-T) en IPsec",
          "Pourquoi et comment NAT-Traversal permet-il à IPsec de traverser un routeur PAT ?",
          "Encapsulation NAT-Traversal (UDP 4500)",
          "• Problème : Le protocole ESP (IP 50) ne possède pas de numéro de port TCP/UDP, un routeur PAT ne peut donc pas multiplexer les sessions de retour.\n• Solution NAT-T : Si un équipement NAT est détecté durant la phase IKE, le paquet ESP est automatiquement encapsulé dans un datagramme UDP standard sur le port 4500, permettant au routeur NAT de modifier les ports normalement.",
          "Encapsule ESP dans un paquet UDP port 4500 pour traverser les routeurs PAT sans blocage.", "Intermédiaire", "RFC 3948", "IKE UDP 500 -> bascule sur NAT-T UDP 4500")

    add_c("Certificats Numériques X.509 et Autorités de Certification (PKI)",
          "Quel est le rôle d'une autorité de certification (CA) et d'un certificat X.509 ?",
          "Infrastructure à Clés Publiques (PKI)",
          "• Le certificat X.509 lie cryptographiquement une identité (nom de domaine, IP, entreprise) à une clé publique spécifique.\n• L'Autorité de Certification (CA) signe numériquement le certificat avec sa propre clé privée.\n• Tout client faisant confiance à la CA racine valide automatiquement l'authenticité de l'équipement distant.",
          "Le certificat lie une identité à une clé publique, garanti par la signature numérique d'une autorité de confiance.", "Fondamental", "RFC 5280")

    add_c("VPNs d'Accès Distant : IPsec vs SSL/TLS",
          "Comparez les VPNs d'accès distant basés sur IPsec et sur SSL/TLS (Cisco AnyConnect / Secure Client).",
          "VPN Client IPsec vs VPN Client SSL/TLS",
          "• VPN IPsec d'accès distant : Nécessite un client logiciel lourd dédié sur le poste, peut être bloqué par les pare-feux des hôtels/aéroports filtrant les protocoles IP 50/51.\n• VPN SSL/TLS : Utilise le port TCP 443 standard (identique au HTTPS), traverse 100% des pare-feux et proxys sans blocage, supporte le mode sans client (portail web) ou le client léger Cisco Secure Client.",
          "SSL/TLS utilise TCP 443 et traverse tous les pare-feux d'hôtels/aéroports sans blocage.", "Fondamental", "Cisco Secure Client Guide")

    add_c("GRE sur IPsec (Generic Routing Encapsulation)",
          "Pourquoi encapsule-t-on les tunnels GRE dans IPsec pour les protocoles de routage dynamique ?",
          "Chiffrement du Trafic Multicast / Protocoles de Routage",
          "• GRE (Protocole IP 47) permet d'encapsuler n'importe quel trafic, y compris les paquets Multicast des protocoles de routage dynamique (OSPF, EIGRP), mais n'offre AUCUN chiffrement (données en clair).\n• IPsec chiffre parfaitement les données mais ne supporte pas nativement le Multicast.\n• GRE over IPsec combine le meilleur des deux : GRE transporte le multicast de routage, et IPsec chiffre l'ensemble du tunnel.",
          "GRE supporte le multicast de routage (OSPF) sans sécurité ; IPsec apporte le chiffrement manquant.", "Intermédiaire", "RFC 2784 / RFC 2890", "R1(config-if)# tunnel mode ipsec ipv4")

    # 91-100: Wireless Security (WPA2 vs WPA3, 802.1X, SAE)
    add_c("Évolution de la Sécurité Wi-Fi : WEP vs WPA vs WPA2 vs WPA3",
          "Quels algorithmes de chiffrement sont employés par WEP, WPA, WPA2 et WPA3 ?",
          "Histoire et Chiffrements Wi-Fi",
          "• WEP : RC4 avec clé statique (cassable en 30 secondes, interdit).\n• WPA : TKIP basé sur RC4 (obsolète).\n• WPA2 : Chiffrement robuste AES-CCMP (norme 802.11i standard depuis 2004).\n• WPA3 : AES-GCMP (Galois/Counter Mode Protocol) avec cryptographie 192 bits en entreprise et protocole SAE.",
          "WEP = RC4 (cassé). WPA = TKIP (obsolète). WPA2 = AES-CCMP. WPA3 = AES-GCMP + SAE.", "Fondamental", "IEEE 802.11i / Wi-Fi Alliance")

    add_c("WPA3 SAE (Simultaneous Authentication of Equals)",
          "Comment le protocole SAE de WPA3 neutralise-t-il les attaques par dictionnaire hors ligne (KRACK) ?",
          "Protocole SAE (RFC 7664 / Dragonfly Handshake)",
          "• En WPA2-Personal (PSK), un attaquant capturant le 4-Way Handshake peut tester des millions de mots de passe hors ligne sur son PC sans que le réseau ne s'en aperçoive.\n• WPA3-Personal remplace la PSK par SAE (Dragonfly) : échange à connaissance nulle avec confidentialité persistante (Forward Secrecy). Même si un attaquant découvre le mot de passe plus tard, il ne peut pas déchiffrer les sessions passées.",
          "SAE élimine les attaques par dictionnaire hors ligne et apporte la confidentialité persistante (Forward Secrecy).", "Intermédiaire", "RFC 7664", "Wi-Fi Alliance WPA3 Specification")

    add_c("WPA2/WPA3 Personal vs Enterprise",
          "Quelle est la différence d'architecture entre le mode Personal et le mode Enterprise en Wi-Fi ?",
          "Pre-Shared Key vs Authentification 802.1X",
          "• Mode Personal : Tous les utilisateurs partagent la même clé secrète (PSK / Passphrase). Si un employé quitte l'entreprise, il faut reconfigurer tous les équipements du site !\n• Mode Enterprise (802.1X/EAP) : Chaque employé s'authentifie avec ses identifiants personnels uniques (login/mot de passe ou certificat X.509) relayés vers un serveur RADIUS (Cisco ISE). La révocation est instantanée.",
          "Personal = même clé partagée pour tous. Enterprise = identifiant personnel unique validé par serveur RADIUS.", "Fondamental", "IEEE 802.1X Architecture")

    add_c("Composants de l'Architecture 802.1X",
          "Quels sont les 3 rôles définis par la norme IEEE 802.1X ?",
          "Supplicant, Authenticator, Authentication Server",
          "1. Supplicant : Le logiciel client tournant sur le terminal de l'utilisateur (PC, smartphone).\n2. Authenticator : L'équipement réseau intermédiaire (Commutateur d'accès ou Contrôleur WLC / AP) qui contrôle l'accès physique ou radio.\n3. Authentication Server : Le serveur d'authentification central (serveur RADIUS, ex: Cisco ISE, Microsoft NPS).",
          "Supplicant (PC utilisateur) -> Authenticator (Switch/WLC) -> Authentication Server (RADIUS/ISE).", "Fondamental", "IEEE 802.1X-2004", "EAP over LAN (EAPOL)")

    add_c("Variantes du Protocole EAP : PEAP vs EAP-TLS vs EAP-FAST",
          "Quelle variante d'EAP offre le niveau de sécurité le plus élevé et pourquoi ?",
          "Comparatif des Méthodes EAP",
          "• EAP-TLS : Niveau de sécurité maximal absolu. Utilise une authentification mutuelle par certificats numériques X.509 (le serveur a un certificat ET chaque client possède un certificat personnel). Aucun mot de passe transmissible.\n• PEAP (Protected EAP) : Le serveur présente un certificat pour monter un tunnel chiffré, dans lequel l'utilisateur transmet son identifiant/mot de passe Active Directory (MS-CHAPv2).\n• EAP-FAST : Développé par Cisco, utilise des PAC (Protected Access Credentials) au lieu de certificats.",
          "EAP-TLS est le plus sûr : exige un certificat numérique sur le serveur ET sur le poste client.", "Intermédiaire", "RFC 5216 (EAP-TLS)", "WLC WLAN Security: WPA2/WPA3 Enterprise")

    add_c("Détection des Points d'Accès Pirates (Rogue APs)",
          "Qu'est-ce qu'un Rogue AP et comment l'architecture Cisco WLC le neutralise-t-elle ?",
          "Rogue AP et Attaque Evil Twin",
          "• Rogue AP : Une borne Wi-Fi non autorisée branchée discrètement par un employé ou un pirate sur une prise réseau de l'entreprise, créant une porte dérobée sans sécurité.\n• Evil Twin : Fausse borne diffusant le même SSID que l'entreprise pour intercepter les identifiants.\n• Détection : Les bornes Cisco scannent en permanence les canaux radio, détectent le BSSID pirate et envoient des trames de désauthentification 802.11 pour confiner la borne.",
          "Borne non autorisée branchée sur le réseau. Le WLC la détecte et la neutralise par désauthentification.", "Fondamental", "Cisco Wireless Security Guide")

    add_c("Management Frame Protection (MFP / 802.11w)",
          "Quelle vulnérabilité critique des trames de gestion Wi-Fi la norme 802.11w corrige-t-elle ?",
          "Protection Contre les Attaques par Désauthentification",
          "• En Wi-Fi classique, les trames de gestion (Management Frames : Deauthentication, Disassociation) ne sont pas chiffrées.\n• N'importe quel attaquant peut forger de fausses trames de déconnexion pour déconnecter tous les utilisateurs d'un réseau.\n• 802.11w (MFP) signe cryptographiquement les trames de gestion, rendant les attaques par déconnexion impossible. Obligatoire dans WPA3 !",
          "802.11w protège les trames de gestion pour empêcher les attaques par déconnexion Wi-Fi forcée (obligatoire en WPA3).", "Intermédiaire", "IEEE 802.11w / RFC 5288", "WLC: Protected Management Frames (PMF) Required")

    add_c("Chiffrement Opportuniste sans Fil : Wi-Fi Enhanced Open (OWE)",
          "Comment la norme OWE apporte-t-elle la confidentialité sur les réseaux Wi-Fi ouverts (ex: cafés, aéroports) ?",
          "Opportunistic Wireless Encryption (RFC 8110)",
          "• Sur les réseaux publics ouverts traditionnels, tout le trafic radio transite en clair, lisible par n'importe qui avec Wireshark.\n• OWE utilise un échange Diffie-Hellman pour chiffrer individuellement la liaison radio de chaque utilisateur sans exiger de mot de passe.\n• Aucun tiers ne peut écouter le trafic de son voisin de table.",
          "OWE chiffre la liaison radio sur les réseaux Wi-Fi publics ouverts sans exiger de mot de passe.", "Intermédiaire", "RFC 8110", "WLAN Security: Enhanced Open")

    add_c("Portail Captif et Isolation des Clients Wi-Fi (Client P2P Blocking)",
          "Pourquoi activer l'isolation des clients sur un SSID invité (Guest Wi-Fi) ?",
          "Interdiction des Échanges Inter-Clients Wi-Fi",
          "• Par défaut, les clients Wi-Fi connectés à un même point d'accès peuvent communiquer directement entre eux de niveau 2.\n• Sur un réseau invité, un utilisateur malveillant pourrait scanner et attaquer les PC portables des autres visiteurs.\n• L'isolation des clients (Peer-to-Peer Blocking) interdit toute trame entre deux postes Wi-Fi : ils ne peuvent échanger qu'avec la passerelle Internet.",
          "Empêche les clients Wi-Fi de communiquer entre eux sur le réseau invité pour éviter les piratages.", "Fondamental", "Cisco WLC Best Practices", "WLC WLAN -> Advanced -> P2P Blocking Action: Drop")

    add_c("Segmentation Réseau : AAA Dynamic VLAN Assignment",
          "Comment le serveur RADIUS affecte-t-il dynamiquement un utilisateur dans son bon VLAN après authentification ?",
          "Attribution Dynamique de VLAN par Attributs RADIUS",
          "• L'utilisateur se connecte sur un SSID unique d'entreprise (ex: CORP-WIFI) ou un port de switch 802.1X.\n• Cisco ISE authentifie l'utilisateur, consulte son groupe Active Directory (RH, Finance, IT) et renvoie dans la réponse RADIUS Accept les attributs RFC 2868/3580 :\n  - Tunnel-Type = VLAN (13)\n  - Tunnel-Medium-Type = 802 (6)\n  - Tunnel-Private-Group-ID = <Numéro du VLAN>\n• Le switch ou contrôleur WLC bascule automatiquement le port ou le client dans ce VLAN dédié.",
          "Le serveur RADIUS renvoie le numéro de VLAN selon le profil de l'utilisateur pour l'isoler automatiquement.", "Avancé", "RFC 3580", "RADIUS Attribute 81 (Tunnel-Private-Group-ID)")

    return cards

d5 = generate_d5()
print(f"Generated {len(d5)} cards for CCNA-D5")
with open("src/data/ccnaD5Flashcards.ts", "w", encoding="utf-8") as f:
    f.write("// ccnaD5Flashcards.ts - 100 Flashcards pour Cisco CCNA-D5: Security Fundamentals\n")
    f.write("import { Flashcard } from './workshopsData';\n\n")
    f.write("export const ccnaD5Cards: Flashcard[] = " + json.dumps(d5, ensure_ascii=False, indent=2) + ";\n")
print("Saved src/data/ccnaD5Flashcards.ts successfully!")
