import json

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

# 1-20: Security Concepts & Principles
add_c("La Triade CIA (Confidentialité, Intégrité, Disponibilité)",
      "Que représentent les 3 piliers de la triade CIA dans la sécurité des réseaux ?",
      "La Triade CIA",
      "• Confidentialité : Les données ne sont accessibles qu'aux entités autorisées (chiffrement AES, ACLs).\n• Intégrité : Garantie que les données n'ont pas été modifiées ou altérées en transit (fonctions de hachage SHA-256, HMAC).\n• Disponibilité : Les services et ressources réseau restent accessibles aux utilisateurs légitimes en permanence (redondance FHRP, STP, protection anti-DDoS).",
      "Confidentialité (chiffrement), Intégrité (hash), Disponibilité (redondance).", "Fondamental", "NIST SP 800-12")

add_c("Vecteurs d'Attaque : Internes vs Externes",
      "Pourquoi les menaces d'origine interne sont-elles considérées comme les plus destructrices ?",
      "Menaces Internes (Insider Threats)",
      "• Les utilisateurs internes disposent déjà d'accès physiques, de comptes valides et de privilèges sur le LAN derrière les pare-feux périmétriques.\n• Qu'il s'agisse de négligence (Shadow IT, phishing) ou de malveillance, ils contournent la sécurité de bordure.",
      "L'utilisateur interne a déjà un accès légitime derrière le pare-feu.", "Fondamental", "Cisco Security Guide")

add_c("Vulnérabilité vs Menace vs Risque vs Exploitation",
      "Définissez les relations exactes entre Vulnérabilité, Menace, Risque et Exploit.",
      "Vocabulaire de Gestion des Risques",
      "• Vulnérabilité : Faille ou faiblesse logicielle/matérielle/humaine (ex: bug IOS non patché).\n• Menace (Threat) : Danger potentiel capable d'exploiter la faille (ex: un pirate, un malware).\n• Exploit : Outil ou script exploitant concrètement la vulnérabilité.\n• Risque : Probabilité qu'une menace exploite la vulnérabilité multipliée par l'impact métier.",
      "Risque = Probabilité x Impact. La menace exploite la vulnérabilité via un exploit.", "Fondamental", "ISO 27005 / NIST 800-30")

add_c("Attaque Man-in-the-Middle (MitM)",
      "Comment se déroule une attaque MitM sur un réseau local et quelle est son intention ?",
      "Interception et Altération de Trafic (MitM)",
      "• L'attaquant s'insère discrètement entre deux nœuds légitimes (ex: client et passerelle par défaut) pour intercepter, écouter ou modifier les flux en temps réel.\n• Sur LAN Ethernet, souvent réalisée par ARP Poisoning / Spoofing.",
      "L'attaquant intercepte et peut modifier le trafic entre deux victimes.", "Fondamental", "OWASP MitM")

add_c("ARP Spoofing / Poisoning",
      "Comment un pirate empoisonne-t-il la table ARP d'une victime sur un switch Ethernet ?",
      "Mécanisme de l'Usurpation ARP",
      "• Le protocole ARP ne valide pas l'authenticité des réponses.\n• L'attaquant envoie continuellement de fausses réponses 'Gratuitous ARP' prétendant associer sa propre adresse MAC à l'adresse IP de la passerelle par défaut.\n• La victime met à jour sa table ARP et envoie tous ses paquets au pirate.",
      "Envoie de fausses réponses ARP gratuites associant la MAC pirate à l'IP de la passerelle.", "Fondamental", "RFC 826", "SW1# show ip arp")

add_c("Dynamic ARP Inspection (DAI)",
      "Comment le switch neutralise-t-il l'ARP Spoofing avec Dynamic ARP Inspection ?",
      "Validation des Paquets ARP par DAI",
      "• Le switch intercepte tous les paquets ARP circulant sur les ports non fiables (Untrusted).\n• Il compare la paire [MAC source / IP émettrice] avec la base de données DHCP Snooping Binding.\n• Si la correspondance est fausse ou absente, le paquet ARP est détruit et une alerte est levée.",
      "DAI valide chaque paquet ARP contre la table DHCP Snooping. Rejette les incohérences.", "Intermédiaire", "Cisco Security Guide", "SW1(config)# ip arp inspection vlan 10")

add_c("DAI Ports Trusted vs Untrusted",
      "Quels ports doivent être configurés en 'ip arp inspection trust' ?",
      "Classification des Ports DAI",
      "• Ports Untrusted : Tous les ports d'accès connectés aux utilisateurs finals, téléphones et imprimantes (inspection active de chaque trame ARP).\n• Ports Trusted : Interfaces d'interconnexion (Trunks vers switches, uplinks vers routeurs et pare-feux).",
      "Trunks et liens routeurs = Trusted. Ports PC utilisateurs = Untrusted.", "Fondamental", "Cisco Switch Guide", "SW1(config-if)# ip arp inspection trust")

add_c("DAI ARP ACLs (Pour Hôtes avec IP Statique)",
      "Comment autoriser un serveur à adresse IP statique (sans bail DHCP) sous DAI ?",
      "ARP Access-Lists de Secours",
      "• Comme le serveur statique n'a pas de bail DHCP Snooping, DAI bloque ses requêtes ARP par défaut.\n• Solution : Créer une 'arp access-list' liant sa MAC à son IP statique et l'attacher avec 'ip arp inspection filter <NOM> vlan <ID>'.",
      "Créer une arp access-list avec l'IP et la MAC statique du serveur.", "Intermédiaire", "Cisco Catalyst Guide", "SW1(config)# arp access-list STATIC_SRV\nSW1(config-arp-nacl)# permit ip host 10.1.1.5 mac host 0050.56a1.2233")

add_c("IP Source Guard (IPSG)",
      "Quel type d'attaque IP Source Guard bloque-t-il au niveau des ports d'accès ?",
      "Protection contre l'Usurpation d'Adresse IP (Spoofing)",
      "• Empêche un pirate de changer manuellement son IP pour usurper celle d'un serveur ou contourner une ACL.\n• Le switch installe dynamiquement un filtre PACL sur le port matériel autorisant uniquement le trafic avec l'IP et la MAC déclarées dans la table DHCP Snooping.",
      "Bloque l'usurpation d'adresse IP en validant le trafic entrant contre la table DHCP Snooping.", "Intermédiaire", "Cisco Security Architecture", "SW1(config-if)# ip verify source mac-check")

add_c("Attaque par Déni de Service Distribué (DDoS) & SYN Flood",
      "Comment fonctionne une attaque TCP SYN Flood et quel équipement la bloque efficacement ?",
      "Saturation des Tables d'État (SYN Flood)",
      "• L'attaquant envoie des flux massifs de paquets TCP SYN avec des adresses IP sources forgées sans jamais envoyer le ACK final.\n• Le serveur garde des demi-connexions ouvertes (SYN_RECEIVED) en mémoire jusqu'à épuisement complet de sa table de connexions.\n• Parade : Pare-feu Stateful avec SYN Cookies / TCP Intercept.",
      "Inonde de paquets SYN sans ACK pour saturer la table des sessions du serveur.", "Fondamental", "RFC 4987", "Protection via SYN Cookies ou Next-Gen Firewall")

add_c("Ingénierie Sociale : Phishing vs Spear Phishing vs Whaling",
      "Distinguez les 3 formes courantes d'attaques par ingénierie sociale par e-mail.",
      "Typologie du Phishing",
      "• Phishing classique : Campagne générique massive envoyée aveuglément à des milliers d'adresses.\n• Spear Phishing : Attaque ciblée personnalisée sur un groupe spécifique ou des employés d'une même entreprise.\n• Whaling (Fraude au Président) : Attaque hautement ciblée visant les cadres dirigeants (CEO, DAF).",
      "Phishing = masse générique. Spear phishing = ciblé entreprise. Whaling = cadres dirigeants.", "Fondamental", "NIST Phishing Awareness")

add_c("Attaque DDoS par Réflexion et Amplification (DNS/NTP)",
      "Comment un attaquant démultiplie-t-il sa puissance d'attaque via amplification DNS ou NTP ?",
      "Attaques par Amplification UDP",
      "• 1. Usurpation : Le pirate envoie des requêtes en UDP (sans handshake) en usurpant l'IP source de sa victime.\n• 2. Amplification : Il demande un enregistrement très lourd (ex: 'ANY' DNS ou 'monlist' NTP). Une requête de 60 octets génère une réponse de 3 000 octets envoyée à la victime.",
      "Spoofe l'IP victime en envoyant une petite requête UDP qui génère une réponse gigantesque.", "Intermédiaire", "CISA Alert TA14-017A")

add_c("Attaques par Rebond et Malwares : Ransomware, Vers, Chevaux de Troie",
      "Quelle est la différence fondamentale entre un Ver (Worm) et un Virus informatique ?",
      "Propagation Autonome vs Vecteur Porteur",
      "• Virus : Nécessite une action humaine (exécution d'un fichier infecté, clic sur pièce jointe) et un programme hôte pour se propager.\n• Ver (Worm) : Programme malveillant autonome capable de se répliquer et de se propager automatiquement à travers le réseau en scannant et exploitant des vulnérabilités sans aucune intervention humaine.",
      "Le ver s'auto-propage sur le réseau sans intervention humaine. Le virus nécessite un hôte.", "Fondamental", "NIST SP 800-83")

add_c("Politiques de Mots de Passe Robustes & MFA",
      "Quelles sont les recommandations actuelles du NIST SP 800-63B pour l'authentification ?",
      "Directives NIST pour Mots de Passe Modernes",
      "• Privilégier la longueur (passphrase de 16+ caractères) plutôt que la complexité arbitraire.\n• Supprimer le changement périodique forcé (sauf compromission suspectée).\n• Rendre obligatoire l'authentification multi-facteurs (MFA) avec clés FIDO2/WebAuthn.",
      "Passphrases longues (16+ caractères) et MFA obligatoire. Ne plus forcer les expirations 90j.", "Fondamental", "NIST SP 800-63B")

add_c("Authentification Multi-Facteurs (MFA) : Les 3 Piliers",
      "Quelles sont les 3 catégories traditionnelles de facteurs d'authentification ?",
      "Les Facteurs d'Authentification",
      "1. Ce que l'on sait (Something you know) : Mot de passe, code PIN, phrase secrète.\n2. Ce que l'on a (Something you have) : Carte à puce, clé USB de sécurité YubiKey, token TOTP/téléphone.\n3. Ce que l'on est (Something you are) : Données biométriques (empreinte digitale, scan rétinien, reconnaissance faciale).",
      "Ce que je sais (MDP), ce que j'ai (Token/Clé physique), ce que je suis (Biométrie).", "Fondamental", "NIST SP 800-63B § 5")

add_c("Principe du Moindre Privilège (PoLP)",
      "Comment le principe du moindre privilège s'applique-t-il aux comptes d'administration réseau ?",
      "Principle of Least Privilege (PoLP)",
      "• Chaque compte utilisateur ou processus système ne doit recevoir que le niveau minimal d'autorisations strictement nécessaire à l'accomplissement de sa tâche précise, et pour la durée minimale requise.\n• Évite l'utilisation quotidienne d'un compte 'enable 15' ou 'root' pour des tâches de supervision.",
      "Donner uniquement les privilèges strictement nécessaires pour exécuter la tâche requise.", "Fondamental", "NIST SP 800-53")

add_c("Architecture de Sécurité Zero Trust (NIST SP 800-207)",
      "Quelle est la devise directrice de l'architecture Zero Trust ?",
      "Principes Fondateurs Zero Trust",
      "• Devise : 'Never Trust, Always Verify' (Ne jamais faire confiance, toujours vérifier).\n• Postulat : Le réseau interne est considéré comme aussi hostile qu'Internet. Tout utilisateur, terminal et flux doit être authentifié, autorisé et chiffré en continu.",
      "Never Trust, Always Verify. Le réseau interne n'est plus considéré comme sûr par défaut.", "Fondamental", "NIST SP 800-207")

add_c("Chiffrement Symétrique vs Asymétrique",
      "Comparez le chiffrement symétrique et asymétrique en termes de vitesse et de clés.",
      "Algorithmes Cryptographiques Symétriques vs Asymétriques",
      "• Symétrique (AES-128/256, ChaCha20) : Une seule clé secrète partagée pour chiffrer et déchiffrer. Extrêmement rapide, idéal pour les gros volumes de données en transit.\n• Asymétrique (RSA, ECDSA, ECC) : Paire de clés (clé publique et clé privée). Mathématiquement lourd et lent, utilisé pour l'échange de clés et les signatures numériques.",
      "Symétrique = 1 seule clé, très rapide (AES). Asymétrique = paire publique/privée, lent (RSA).", "Fondamental", "NIST FIPS 197 / RFC 8446")

add_c("Fonctions de Hachage Cryptographique : MD5 vs SHA-1 vs SHA-256",
      "Pourquoi MD5 et SHA-1 sont-ils formellement interdits pour la sécurité moderne ?",
      "Collisions et Obsolescence de MD5 / SHA-1",
      "• Une fonction de hachage produit une empreinte à sens unique (one-way).\n• MD5 et SHA-1 souffrent d'attaques par collision démontrées : un attaquant peut fabriquer deux fichiers différents produisant la même empreinte.\n• SHA-2 (SHA-256, SHA-512) et SHA-3 sont les seuls standards approuvés.",
      "MD5 et SHA-1 sont cassés par des attaques de collision. Utiliser SHA-256 au minimum.", "Fondamental", "NIST Policy on Hash Functions")

add_c("Certificats Numériques X.509 et Infrastructure PKI",
      "Quel est le rôle d'une Autorité de Certification (CA) dans une PKI X.509 ?",
      "Chaîne de Confiance PKI",
      "• La CA est un tiers de confiance qui signe cryptographiquement le certificat du serveur.\n• Le certificat lie de manière infalsifiable l'identité d'une entité (nom de domaine) à sa clé publique.\n• Le client valide l'authenticité en vérifiant la signature avec le certificat racine de la CA préinstallé dans son OS.",
      "La CA signe le certificat pour lier de manière certifiée un domaine à sa clé publique.", "Fondamental", "RFC 5280")

# 21-40: Layer 2 Security (Port Security, DHCP Snooping, Private VLANs)
add_c("Attaque par Inondation de Table MAC (MAC Flooding)",
      "Comment un outil comme macof sature-t-il la table CAM d'un switch et quelle est la conséquence ?",
      "Saturation CAM et Transformation en Hub",
      "• macof génère des milliers de trames par seconde avec de fausses adresses MAC sources aléatoires.\n• La table CAM s'épuise (Fail-Open) : le switch ne pouvant plus apprendre, il diffuse (flood) toutes les trames unicast sur tous ses ports comme un simple hub passif, permettant à l'attaquant d'espionner tout le trafic.",
      "Sature la table CAM pour forcer le switch à diffuser tout le trafic sur tous les ports.", "Fondamental", "Cisco Security Guide", "SW1# show mac address-table count")

add_c("Port Security : Activation et Paramétrage",
      "Quelles sont les commandes pour activer Port Security sur un port d'accès ?",
      "Configuration de Base Port Security",
      "1. 'switchport mode access' (indispensable, incompatible avec les trunks dynamiques)\n2. 'switchport port-security'\n3. 'switchport port-security maximum <1-1024>'\n4. 'switchport port-security violation {protect | restrict | shutdown}'.",
      "switchport mode access puis switchport port-security.", "Fondamental", "Cisco Catalyst Switch Guide", "SW1(config-if)# switchport mode access\nSW1(config-if)# switchport port-security")

add_c("Port Security Modes de Violation : Shutdown vs Restrict vs Protect",
      "Distinguez les 3 modes de réaction en cas de violation de Port Security.",
      "Modes de Violation Port Security",
      "• Shutdown (défaut) : L'interface est immédiatement désactivée (état err-disable), le voyant passe à l'orange, un log Syslog et un trap SNMP sont émis.\n• Restrict : Les trames de la MAC non autorisée sont jetées, un log Syslog est généré et le compteur de violations s'incrémente.\n• Protect : Les trames non autorisées sont jetées silencieusement, aucun log ni alerte n'est produit.",
      "Shutdown coupe le port en err-disable. Restrict jette et logue. Protect jette sans log.", "Fondamental", "Cisco Command Reference", "SW1(config-if)# switchport port-security violation restrict")

add_c("Port Security Sticky MAC Addresses",
      "Comment fonctionne l'apprentissage MAC 'Sticky' sous Cisco IOS ?",
      "Enregistrement Automatique Sticky MAC",
      "• Commande : 'switchport port-security mac-address sticky'.\n• Le switch apprend dynamiquement la première adresse MAC branchée sur le port et l'injecte immédiatement dans la running-configuration comme si elle avait été saisie à la main.\n• Si 'copy running-config startup-config' est tapé, l'adresse MAC est persistée après redémarrage.",
      "Apprend la MAC connectée et l'enregistre directement dans la running-config.", "Fondamental", "Cisco Switch Configuration", "SW1(config-if)# switchport port-security mac-address sticky")

add_c("Récupération d'un Port en err-disable",
      "Comment réactiver un port tombé en 'err-disable' suite à une violation de Port Security ?",
      "Restauration Manuelle et Automatique err-disable",
      "• Manuelle : Entrer sous l'interface et taper successivement 'shutdown' puis 'no shutdown'.\n• Automatique : Configurer globalement 'errdisable recovery cause psecure-violation' et 'errdisable recovery interval <secondes>' (300s par défaut).",
      "shutdown puis no shutdown sous l'interface, ou errdisable recovery automatique.", "Fondamental", "Cisco Troubleshooting Guide", "SW1# show interfaces status err-disabled")

add_c("Attaque par Saut de VLAN (VLAN Hopping : Switch Spoofing)",
      "Comment fonctionne l'attaque Switch Spoofing et comment la neutraliser ?",
      "Switch Spoofing via DTP",
      "• L'attaquant se fait passer pour un switch en émettant des trames DTP (Dynamic Trunking Protocol) 'desirable' ou 'auto'. Si le port est resté par défaut, un trunk 802.1Q se négocie et le pirate a accès à tous les VLANs !\n• Parade : 'switchport mode access' et 'switchport nonegotiate'.",
      "Le pirate négocie un trunk avec DTP. Désactiver DTP avec switchport nonegotiate.", "Intermédiaire", "Cisco LAN Security Guide", "SW1(config-if)# switchport nonegotiate")

add_c("Attaque Double Tagging 802.1Q (Double Marquage)",
      "Comment fonctionne l'attaque Double Tagging et pourquoi ne fonctionne-t-elle que dans un sens ?",
      "Double Tagging 802.1Q",
      "• L'attaquant émet une trame avec deux tags VLAN : le tag externe correspond au VLAN natif du trunk (ex: VLAN 1) et le tag interne au VLAN cible (ex: VLAN 10).\n• Le premier switch dépouille le tag natif et propage la trame sur le trunk sans retagger. Le second switch lit le tag interne et envoie la trame dans le VLAN 10.\n• Unidirectionnel (pas de retour possible). Parade : changer le VLAN natif pour un VLAN inutilisé dédié.",
      "Exploite le VLAN natif non tagué pour sauter dans un autre VLAN. Définir un VLAN natif isolé.", "Intermédiaire", "Cisco Best Practices", "SW1(config-if)# switchport trunk native vlan 999")

add_c("Bonnes Pratiques de Sécurisation des Ports Commutateurs",
      "Quelles sont les règles standard pour durcir les ports inutilisés d'un switch Cisco ?",
      "Durcissement des Ports Inutilisés",
      "1. Assigner tous les ports inutilisés à un VLAN 'poubelle' (Blackhole VLAN, ex: VLAN 999) non routé et sans accès réseau.\n2. Désactiver le mode trunk : 'switchport mode access'.\n3. Désactiver la négociation DTP : 'switchport nonegotiate'.\n4. Éteindre administrativement les ports : 'shutdown'.",
      "Assigner à un VLAN poubelle non routé, désactiver DTP et taper shutdown.", "Fondamental", "Cisco Hardening Guide", "SW1(config-if-range)# switchport access vlan 999\nSW1(config-if-range)# shutdown")

add_c("BPDU Guard & Protection Spanning Tree",
      "Quel est le rôle de BPDU Guard et sur quels ports doit-il être activé ?",
      "Protection contre les BPDUs Non Autorisés",
      "• S'active sur tous les ports d'accès configurés avec PortFast.\n• Si un commutateur pirate ou non approuvé est raccordé et envoie un paquet BPDU pour détourner la racine STP, BPDU Guard désactive instantanément le port en état err-disable.",
      "Coupe immédiatement en err-disable tout port PortFast qui reçoit une trame BPDU.", "Fondamental", "Cisco STP Guide", "SW1(config-if)# spanning-tree bpduguard enable")

add_c("Root Guard STP",
      "Quelle est la différence entre BPDU Guard et Root Guard sous Spanning Tree ?",
      "Protection de la Racine STP (Root Guard)",
      "• BPDU Guard : Coupe le port (err-disable) dès réception du moindre BPDU.\n• Root Guard : Autorise la réception de BPDUs ordinaires, mais si un BPDU reçu annonce un Root Bridge supérieur, le port est mis en état 'root-inconsistent' (bloqué pour le trafic) jusqu'à ce que les BPDUs illégitimes cessent.",
      "Root Guard bloque le port en 'root-inconsistent' pour empêcher un switch externe de devenir Root.", "Intermédiaire", "Cisco Spanning Tree Guide", "SW1(config-if)# spanning-tree guard root")

# 31-50: AAA & Device Access Security
add_c("Les 3 Piliers AAA (Authentification, Autorisation, Traçabilité)",
      "Définissez le rôle de chaque 'A' dans l'architecture de sécurité réseau AAA.",
      "Le Modèle AAA (RFC 2904)",
      "• Authentification (Qui êtes-vous ?) : Vérification de l'identité via identifiant et mot de passe ou certificat.\n• Autorisation (Qu'avez-vous le droit de faire ?) : Restriction des commandes ou services accessibles (ex: droit d'exécuter show mais pas configure terminal).\n• Traçabilité / Accounting (Qu'avez-vous fait ?) : Journalisation horodatée de chaque commande tapée et début/fin de session.",
      "Authentification (Identité), Autorisation (Droits/Privilèges), Traçabilité (Journaux d'actions).", "Fondamental", "RFC 2904", "SW1(config)# aaa new-model")

add_c("Comparatif Protocoles AAA : TACACS+ vs RADIUS",
      "Quelles sont les 4 différences majeures entre TACACS+ et RADIUS ?",
      "TACACS+ vs RADIUS",
      "• 1. Propriété : TACACS+ est propriétaire Cisco ; RADIUS est un standard ouvert IETF (RFC 2865/2866).\n• 2. Transport : TACACS+ utilise TCP port 49 (fiable) ; RADIUS utilise UDP 1812 (Auth) et 1813 (Acct).\n• 3. Séparation : TACACS+ sépare strictement A, A et A ; RADIUS combine Authentification et Autorisation.\n• 4. Chiffrement : TACACS+ chiffre tout le paquet payload ; RADIUS ne chiffre que le mot de passe.",
      "TACACS+ = TCP 49, chiffre tout, sépare A/A/A. RADIUS = UDP 1812/1813, chiffre que le mot de passe.", "Fondamental", "RFC 2865 / Cisco TACACS+ Spec", "TACACS+ (Administration réseau) vs RADIUS (Accès 802.1X/VPN)")

add_c("Activation AAA sous Cisco IOS : aaa new-model",
      "Quelle commande est le prérequis absolu pour activer le moteur AAA sous Cisco IOS ?",
      "Activation du Framework AAA",
      "• Commande : 'aaa new-model' en mode de configuration globale.\n• Sans cette commande, toutes les directives 'aaa authentication' ou 'aaa authorization' sont rejetées par le système.",
      "aaa new-model est obligatoire pour débloquer les fonctions AAA sous Cisco IOS.", "Fondamental", "Cisco AAA Guide", "SW1(config)# aaa new-model")

add_c("Méthodes de Secours AAA (Fallback)",
      "Comment garantir l'accès au routeur si le serveur TACACS+ / RADIUS central tombe en panne ?",
      "Listes de Méthodes avec Repli Local",
      "• Dans la définition de la liste AAA, on spécifie le groupe de serveurs distants en première position, suivi du mot-clé 'local' :\n• 'aaa authentication login default group tacacs+ local'.\n• Si le serveur TACACS+ ne répond pas (timeout), le routeur bascule automatiquement sur sa base locale.",
      "Ajouter le mot-clé 'local' en fin de liste AAA pour basculer sur la base locale si le serveur est injoignable.", "Intermédiaire", "Cisco AAA Best Practices", "R1(config)# aaa authentication login default group tacacs+ local")

add_c("Chiffrement des Mots de Passe Locaux : type 7 vs type 5 vs type 8/9",
      "Pourquoi 'service password-encryption' (Type 7) n'offre-t-il aucune sécurité réelle ?",
      "Types de Hachage de Mots de Passe Cisco",
      "• Type 7 (Vigenère réversible) : Se déchiffre instantanément en un clic sur Internet avec n'importe quel décodeur en ligne.\n• Type 5 (MD5 crypté) : Ancien, vulnérable aux attaques par dictionnaire.\n• Type 8 (PBKDF2 avec SHA-256) et Type 9 (Scrypt) : Recommandés, robustes contre les attaques par force brute GPU.",
      "Type 7 se casse en 1 seconde sur le web. Utiliser 'username secret' (Type 8 ou 9 avec Scrypt).", "Fondamental", "Cisco Password Security Guide", "R1(config)# username admin algorithm-type scrypt secret Cisco123!")

add_c("Sécurisation des Lignes VTY : SSH vs Telnet",
      "Pourquoi Telnet (port TCP 23) doit-il être formellement banni au profit de SSH (TCP 22) ?",
      "Telnet en Texte Clair vs SSH Chiffré",
      "• Telnet transmet toutes les données en texte clair non chiffré sur le câble (y compris identifiants et mot de passe 'enable' visibles dans Wireshark).\n• SSHv2 négocie un canal sécurisé chiffré (AES) avec vérification d'intégrité (HMAC) et authentification du serveur par clé.",
      "Telnet envoie les identifiants en clair sur le réseau. SSH chiffre tout de bout en bout.", "Fondamental", "RFC 4253 (SSH)", "SW1(config-line)# transport input ssh")

add_c("Génération de Clé RSA pour SSH",
      "Quels sont les prérequis obligatoires avant de pouvoir générer une clé RSA avec crypto key generate ?",
      "Prérequis SSH sur Cisco IOS",
      "1. Configurer un nom d'hôte : 'hostname <NOM>'.\n2. Configurer un nom de domaine IP : 'ip domain name <DOMAINE>'.\n3. Générer la clé : 'crypto key generate rsa modulus 2048' (minimum 2048 bits recommandé pour la sécurité moderne).",
      "Hostname et ip domain name obligatoires avant crypto key generate rsa modulus 2048.", "Fondamental", "Cisco Security Guide", "R1(config)# crypto key generate rsa modulus 2048")

add_c("Restriction d'Accès aux Lignes VTY par ACL (access-class)",
      "Quelle commande applique une ACL pour restreindre les connexions SSH aux seuls postes d'administration ?",
      "access-class sous line vty",
      "• Commande : 'access-class <NUM_OU_NOM> in' sous la configuration 'line vty 0 4'.\n• 'ip access-group' s'applique aux interfaces physiques de transit, alors que 'access-class' s'applique aux lignes de terminal virtuelles (Management Plane).",
      "access-class in s'utilise sous line vty pour restreindre l'accès SSH par ACL.", "Fondamental", "Cisco Command Reference", "SW1(config-line)# access-class ADMIN_ONLY in")

add_c("Standard 802.1X (EAP, Supplicant, Authenticator, Auth Server)",
      "Quels sont les 3 rôles définis dans l'architecture de contrôle d'accès réseau 802.1X ?",
      "Les 3 Acteurs IEEE 802.1X",
      "• 1. Supplicant : Le poste de travail client ou téléphone demandant l'accès au réseau.\n• 2. Authenticator : Le switch ou contrôleur Wi-Fi qui bloque tout trafic tant que l'identité n'est pas validée.\n• 3. Authentication Server : Le serveur RADIUS / Cisco ISE central qui vérifie les identifiants et ordonne l'ouverture du port.",
      "Supplicant (Client), Authenticator (Switch d'accès), Authentication Server (Serveur RADIUS/ISE).", "Fondamental", "IEEE 802.1X Standard", "dot1x system-auth-control")

add_c("Port-Based Network Access Control (802.1X Port States)",
      "Dans quel état se trouve un port de switch 802.1X avant l'authentification de l'utilisateur ?",
      "État Unauthorized vs Authorized",
      "• État Unauthorized : Le switch bloque tous les paquets de données utilisateur. Seuls les paquets de négociation 802.1X (EAP over LAN / EAPOL), STP et CDP/LLDP sont autorisés à transiter.\n• Dès validation par le serveur RADIUS, le port bascule en état 'Authorized' et s'ouvre au trafic IP.",
      "Unauthorized : le port est bloqué pour tout trafic utilisateur sauf les trames EAPOL d'authentification.", "Intermédiaire", "Cisco 802.1X Guide", "SW1# show dot1x all")

# 41-60: ACLs (IPv4 & IPv6)
add_c("ACLs Standards vs Étendues (Plages Numériques)",
      "Quelles sont les plages de numéros pour les ACLs IPv4 standards et étendues sous Cisco IOS ?",
      "Numérotation des ACLs IPv4",
      "• Standards (filtre sur IP source uniquement) : 1 à 99 et plage étendue 1300 à 1999.\n• Étendues (filtre sur IP source, destination, protocole et ports) : 100 à 199 et plage étendue 2000 à 2699.",
      "Standard = 1-99 & 1300-1999 (IP source seule). Étendue = 100-199 & 2000-2699 (Source, Dest, Port).", "Fondamental", "Cisco IOS Security Guide", "access-list 10 permit 10.1.1.0 0.0.0.255")

add_c("Masque Inversé (Wildcard Mask)",
      "Comment calcule-t-on le masque générique (wildcard mask) d'un sous-réseau /27 (255.255.255.224) ?",
      "Calcul du Wildcard Mask",
      "• Règle : Soustraire chaque octet du masque de sous-réseau de 255.255.255.255.\n• 255 - 255 = 0\n• 255 - 255 = 0\n• 255 - 255 = 0\n• 255 - 224 = 31\n• Résultat : 0.0.0.31 (Un bit 0 signifie 'vérifier strictement', un bit 1 signifie 'ignorer').",
      "255.255.255.255 moins le masque de sous-réseau donne le wildcard. /27 donne 0.0.0.31.", "Fondamental", "Cisco IP Addressing Guide", "R1(config)# access-list 1 permit 192.168.1.0 0.0.0.31")

add_c("Mots-Clés 'host' et 'any' dans les ACLs",
      "À quels masques génériques correspondent les mots-clés 'host' et 'any' ?",
      "Équivalences Wildcard host et any",
      "• 'host 192.168.1.5' équivaut strictement à '192.168.1.5 0.0.0.0' (tous les bits doivent correspondre exactement).\n• 'any' équivaut strictement à '0.0.0.0 255.255.255.255' (n'importe quelle adresse IPv4).",
      "host = 0.0.0.0 (adresse exacte). any = 0.0.0.0 255.255.255.255 (toutes les adresses).", "Fondamental", "Cisco Command Reference", "permit ip host 10.1.1.1 any")

add_c("Le 'Deny Any' Implicite en Fin d'ACL",
      "Que contient implicitement toute ACL Cisco à sa fin et quelle en est la conséquence directe ?",
      "Deny Implicite Invisible",
      "• Toute ACL se termine par une règle implicite invisible : 'deny ip any any' (ou 'deny any' en standard).\n• Tout paquet qui ne correspond expressément à aucune des lignes précédentes de l'ACL est rejeté et détruit.\n• Si une ACL ne contient que des lignes 'deny', elle bloquera la totalité du trafic !",
      "Toute ACL finit par un deny implicite qui rejette tout paquet non expressément autorisé.", "Fondamental", "Cisco Security Guide", "Astuce : Toujours inclure un permit si nécessaire.")

add_c("Emplacement Optimal des ACLs : Standards vs Étendues",
      "Où doit-on positionner une ACL standard et une ACL étendue selon les règles de conception Cisco ?",
      "Placement Stratégique des ACLs",
      "• ACL Standard : Doit être placée LE PLUS PRÈS POSSIBLE DE LA DESTINATION (car ne filtrant que sur la source, la placer trop près de la source bloquerait l'accès à tous les autres services légitimes).\n• ACL Étendue : Doit être placée LE PLUS PRÈS POSSIBLE DE LA SOURCE (pour détruire le trafic interdit au plus tôt et économiser la bande passante du réseau).",
      "Standard = au plus près de la destination. Étendue = au plus près de la source.", "Fondamental", "Cisco ACL Best Practices", "Standard -> Proche Destination / Étendue -> Proche Source")

add_c("Sens d'Application d'une ACL : Inbound (in) vs Outbound (out)",
      "Quelle est la différence entre une ACL appliquée en 'in' et en 'out' sur une interface de routeur ?",
      "Sens de Filtrage des Paquets",
      "• Inbound (in) : Le paquet est filtré dès son entrée sur l'interface, AVANT la décision de routage. Si refusé, le routeur économise un cycle CPU de routage.\n• Outbound (out) : Le paquet a déjà été routé vers l'interface de sortie, et est filtré juste avant d'être encapsulé et transmis sur le média physique.",
      "in = filtré à l'arrivée avant routage. out = filtré au départ après décision de routage.", "Fondamental", "Cisco Command Reference", "R1(config-if)# ip access-group 101 in")

add_c("ACLs Nommées et Édition par Numéros de Séquence",
      "Quel avantage décisif apportent les ACLs nommées lors de la maintenance en production ?",
      "Gestion par Numéros de Séquence",
      "• Les ACLs nommées ('ip access-list extended MON_ACL') attribuent un numéro de séquence (10, 20, 30...) à chaque ligne.\n• Permet d'insérer une nouvelle règle entre deux lignes existantes (ex: '15 permit ...') ou de supprimer une règle précise sans devoir détruire et réécrire toute l'ACL.",
      "Permet d'insérer ou supprimer des règles ciblées grâce aux numéros de séquence (10, 20...).", "Fondamental", "Cisco IOS Security Guide", "R1(config-nacl)# 15 permit tcp any any eq 443")

add_c("Opérateurs de Ports dans les ACLs Étendues (eq, neq, lt, gt, range)",
      "Quels sont les opérateurs disponibles pour filtrer les ports TCP/UDP dans une ACL étendue ?",
      "Opérateurs de Ports L4",
      "• eq <port> : Égal à (ex: eq 80 ou eq www).\n• neq <port> : Différent de.\n• lt <port> : Inférieur à (Less Than).\n• gt <port> : Supérieur à (Greater Than).\n• range <début> <fin> : Plage continue de ports (ex: range 1024 65535).",
      "eq (égal), neq (différent), lt (inférieur), gt (supérieur), range (plage de ports).", "Fondamental", "Cisco Command Reference", "permit tcp any any range 20 21")

add_c("Le Mot-Clé 'established' dans les ACLs TCP",
      "Que vérifie le mot-clé 'established' à la fin d'une règle ACL TCP ?",
      "Filtrage Basique d'État de Connexion TCP",
      "• Vérifie la présence des drapeaux (flags) ACK ou RST dans l'en-tête du paquet TCP.\n• Indique que le paquet appartient à une session déjà ouverte initiée depuis l'intérieur, et bloque les paquets SYN d'une nouvelle connexion tentant d'entrer depuis l'extérieur.",
      "Autorise uniquement les paquets de réponses d'une connexion TCP déjà établie (drapeau ACK/RST).", "Intermédiaire", "RFC 793 / Cisco ACL Guide", "permit tcp any 192.168.1.0 0.0.0.255 established")

add_c("Journalisation des ACLs : Le Mot-Clé 'log'",
      "Que fait le mot-clé 'log' ajouté en fin d'une ligne d'ACL et quel est son impact matériel ?",
      "Journalisation Syslog des Règles ACL",
      "• Génère un message Syslog dès qu'un paquet correspond à la règle, indiquant IP source, destination et ports.\n• Impact matériel : Le paquet correspondant doit être commuté par le processeur (Software Process Switching) au lieu d'être traité par la puce matérielle ASIC/TCAM, risquant de saturer le CPU en cas de fort trafic.",
      "Envoie un log Syslog mais force le traitement logiciel par le CPU (risque de saturation).", "Intermédiaire", "Cisco Hardening Guide", "deny ip any any log")

# 51-70: VPNs, Cryptography & Firewalls
add_c("VPNs : Site-to-Site vs Remote Access",
      "Quelle est la différence fondamentale entre un VPN Site-à-Site et un VPN Remote Access ?",
      "Typologie des Architectures VPN",
      "• Site-à-Site (IPsec) : Interconnecte de manière transparente deux réseaux complets via deux passerelles (routeurs/firewalls). Les utilisateurs n'ont aucun logiciel client à installer.\n• Remote Access (AnyConnect / SSL) : Établi par un utilisateur distant nomade depuis son PC/smartphone vers la passerelle de l'entreprise via un client logiciel dédié.",
      "Site-à-site relie deux réseaux via routeurs. Remote Access relie un PC nomade via un client.", "Fondamental", "Cisco VPN Architecture", "IPsec Tunnel vs Cisco AnyConnect SSL")

add_c("IPsec : Protocole ESP vs AH",
      "Pourquoi le protocole ESP est-il massivement utilisé à la place d'AH dans les VPNs IPsec ?",
      "Encapsulating Security Payload (ESP) vs AH",
      "• ESP (Protocole IP 50) : Fournit le CHIFFREMENT (confidentialité), l'intégrité et l'authentification des données.\n• AH (Authentication Header - Protocole IP 51) : Ne fournit QUE l'intégrité et l'authentification, les données transitent EN CLAIR sur Internet ! De plus, AH est incompatible avec le NAT car il intègre l'IP externe dans son hash.",
      "ESP chiffre les données (confidentialité). AH ne chiffre rien (données en clair) et casse le NAT.", "Fondamental", "RFC 4302 (AH) / RFC 4303 (ESP)", "ESP: Protocole IP 50 / AH: Protocole IP 51")

add_c("IPsec Modes : Tunnel Mode vs Transport Mode",
      "Dans quel cas utilise-t-on le mode Tunnel et le mode Transport en IPsec ?",
      "Modes d'Encapsulation IPsec",
      "• Mode Tunnel (défaut) : L'intégralité du paquet IP d'origine est chiffrée et encapsulée dans un NOUVEL en-tête IP externe. Requis pour les tunnels VPN Site-à-Site traversant un réseau public.\n• Mode Transport : Seul le payload de transport (L4) est chiffré, l'en-tête IP d'origine reste intact. Utilisé pour les communications hôte-à-hôte ou à l'intérieur d'un tunnel GRE.",
      "Mode Tunnel = nouvel en-tête IP (Site-à-Site). Mode Transport = en-tête IP original préservé.", "Intermédiaire", "RFC 4301", "crypto ipsec transform-set TS esp-aes esp-sha-hmac")

add_c("IKEv1 vs IKEv2",
      "Quels sont les avantages majeurs d'IKEv2 par rapport à IKEv1 pour les VPNs IPsec ?",
      "Évolution vers IKEv2 (RFC 7296)",
      "• Simplicité : IKEv2 remplace les 9 messages d'IKEv1 par un échange de seulement 4 messages initiaux.\n• Support natif du NAT Traversal (NAT-T).\n• Support natif de la mobilité avec MOBIKE (changement d'IP sans couper le tunnel VPN, idéal pour la 4G/5G/Wi-Fi).\n• Réduction de la consommation de bande passante et meilleure résistance aux attaques DoS.",
      "IKEv2 est plus rapide (4 messages au lieu de 9), intègre nativement le NAT-T et supporte MOBIKE.", "Intermédiaire", "RFC 7296", "crypto ikev2 proposal PROP_1")

add_c("NAT Traversal (NAT-T) en IPsec",
      "Quel port UDP est utilisé par NAT-T pour faire traverser un routeur NAT à un tunnel IPsec ?",
      "Encapsulation NAT-T (RFC 3948)",
      "• Problème : ESP (protocole IP 50) ne possède pas de ports L4 (TCP/UDP), le NAT Overload / PAT ne peut donc pas le traduire.\n• Solution NAT-T : Détecte la présence d'un équipement NAT et encapsule automatiquement les paquets ESP dans des paquets UDP sur le port 4500.",
      "Port UDP 4500. Encapsule le paquet ESP sans ports dans de l'UDP pour traverser le PAT.", "Intermédiaire", "RFC 3948", "UDP 500 (IKE) -> UDP 4500 (NAT-T)")

add_c("Pare-feux : Filtrage Sans État (Stateless) vs Avec État (Stateful)",
      "Quelle est la supériorité fondamentale d'un pare-feu Stateful sur une ACL classique Stateless ?",
      "Stateful Packet Inspection (SPI)",
      "• Stateless (ACL) : Évalue chaque paquet isolément sans mémoire des paquets précédents (nécessite d'ouvrir manuellement les ports retour).\n• Stateful (Pare-feu) : Maintient une table d'état (State Table). Dès qu'un flux sortant légitime est autorisé, le pare-feu ouvre dynamiquement et temporairement le passage pour le trafic retour correspondant et le referme dès la fin de session.",
      "Le pare-feu Stateful retient l'état des connexions et autorise automatiquement le trafic retour.", "Fondamental", "NIST SP 800-41", "State Table: [SrcIP:Port, DstIP:Port, Protocol, State]")

add_c("Pare-feux de Nouvelle Génération (NGFW)",
      "Quelles fonctionnalités clés distinguent un pare-feu NGFW d'un pare-feu stateful traditionnel ?",
      "Capacités d'un NGFW",
      "• Inspection applicative profonde (Couche 7) : Identifie l'application réelle quel que soit le port utilisé (ex: bloque BitTorrent même masqué sur le port 443).\n• Système de Prévention d'Intrusion (IPS) intégré.\n• Déchiffrement et inspection SSL/TLS du trafic chiffré.\n• Filtrage d'URLs et intégration avec des flux de Threat Intelligence en temps réel (ex: Cisco Talos).",
      "Inspection L7 de l'application réelle, IPS intégré, déchiffrement SSL/TLS et Threat Intelligence.", "Fondamental", "Gartner NGFW Definition", "Exemple : Cisco Firepower / Secure Firewall")

add_c("Systèmes de Détection et Prévention d'Intrusion (IDS vs IPS)",
      "Quelle est la différence opérationnelle majeure entre un IDS et un IPS ?",
      "Positionnement IDS (Hors-Bande) vs IPS (En-Ligne)",
      "• IDS (Intrusion Detection System) : Placé 'out-of-band' (sur un port miroir SPAN). Il analyse une copie du trafic et génère des alertes sans pouvoir bloquer directement l'attaque en cours.\n• IPS (Intrusion Prevention System) : Placé 'in-line' directement sur le passage des paquets physiques. Il inspecte et peut détruire (drop) instantanément les paquets malveillants avant qu'ils n'atteignent la cible.",
      "L'IDS écoute une copie et alerte. L'IPS est sur le chemin en ligne et bloque immédiatement l'attaque.", "Fondamental", "NIST SP 800-94", "IPS inline mode vs IDS promiscuous mode")

add_c("Méthodes de Détection IPS : Signature vs Anomalie",
      "Distinguez la détection basée sur les signatures de la détection basée sur les anomalies comportementales.",
      "Moteurs de Détection IPS",
      "• Détection par signatures : Compare le trafic à une base de motifs d'attaques connues (fiable, zéro faux positif, mais aveugle face aux attaques Zero-Day).\n• Détection par anomalies / heuristique : Définit une ligne de base (baseline) du comportement normal du réseau et lève une alerte en cas d'écart statistique anormal (détecte les Zero-Days mais risque de faux positifs).",
      "Signature = motif connu (zéro faux positif). Anomalie = écart par rapport à la normale (détecte Zero-Day).", "Intermédiaire", "NIST SP 800-94 § 3", "Base de signatures mise à jour en continu")

add_c("Cisco Talos Threat Intelligence",
      "Quel est le rôle de Cisco Talos dans l'écosystème de sécurité mondial ?",
      "Centre de Renseignement sur les Menaces Cisco Talos",
      "• L'un des plus grands groupes privés de cyber-renseignement au monde.\n• Analyse des milliards de requêtes web, e-mails et fichiers suspects par jour.\n• Rétro-ingénierie des malwares et publication automatique et en temps réel de nouvelles règles IPS, réputations IP et signatures sur tous les équipements de sécurité Cisco mondiaux.",
      "Fournit le renseignement sur les cybermenaces et met à jour en continu les règles des pare-feux Cisco.", "Fondamental", "talosintelligence.com", "Cisco Talos Intelligence Group")

# 71-100: Additional 30 items to reach 100 for D5
extras_d5 = [
    ("Sécurité Sans-Fil : WPA2 vs WPA3",
     "Quelle vulnérabilité majeure de WPA2 le protocole SAE (Simultaneous Authentication of Equals) de WPA3 élimine-t-il ?",
     "Transition WPA2 vers WPA3",
     "• WPA2 (PSK) : Vulnérable aux attaques par dictionnaire hors-ligne (KRACK) si un attaquant capture le handshake 4-voies.\n• WPA3 (SAE / DragonFly) : Élimine totalement les attaques par dictionnaire hors-ligne. Même si le mot de passe est faible, l'attaquant ne peut tenter qu'une seule supposition en ligne par échange. Assure également la confidentialité persistante (Forward Secrecy).",
     "SAE élimine les attaques par dictionnaire hors-ligne et apporte le Forward Secrecy.", "Fondamental", "Wi-Fi Alliance WPA3 Spec"),

    ("WPA Enterprise vs WPA Personal",
     "Pourquoi les entreprises déploient-elles WPA2/WPA3 Enterprise plutôt que Personal ?",
     "Authentification Individuelle 802.1X",
     "• WPA Personal : Un mot de passe unique partagé (PSK) par tous les employés. Si un employé quitte l'entreprise, il faut reconfigurer tous les terminaux.\n• WPA Enterprise : Chaque employé utilise ses propres identifiants d'entreprise uniques (Active Directory) validés via 802.1X et un serveur RADIUS (Cisco ISE). Révocation instantanée d'un compte individuel.",
     "Enterprise authentifie chaque utilisateur individuellement via un serveur RADIUS / 802.1X.", "Fondamental", "Cisco Wireless Security Guide"),

    ("Cisco Umbrella (Sécurité de la Couche DNS)",
     "Comment Cisco Umbrella bloque-t-il les cyberattaques avant même l'établissement d'une connexion IP ?",
     "Protection Préventive au Niveau DNS",
     "• Intercepte chaque résolution DNS émise par les postes de travail.\n• Si le nom de domaine demandé est classé malveillant (serveur C2 de ransomware, site de phishing), Umbrella renvoie l'IP d'une page de blocage au lieu de l'IP du pirate.\n• L'infection est neutralisée avant même le début de la communication TCP/IP.",
     "Résolution DNS sécurisée qui bloque l'accès aux domaines malveillants avant la connexion.", "Fondamental", "Cisco Umbrella Architecture"),

    ("Cisco ISE (Identity Services Engine)",
     "Quel est le rôle central de Cisco ISE dans la gestion des accès réseau d'entreprise ?",
     "Plateforme de Contrôle d'Accès Centralisée",
     "• Serveur AAA / RADIUS / TACACS+ de référence de Cisco.\n• Centralise l'application des politiques de sécurité basées sur le contexte : Qui (utilisateur), Quoi (PC corporate vs mobile personnel BYOD), Où (bureau vs Wi-Fi invité) et Quand.\n• Pilote la posture de sécurité (antivirus à jour, OS patché) avant d'autoriser l'accès.",
     "Serveur central RADIUS/TACACS+ appliquant les politiques d'accès selon le contexte et la posture.", "Fondamental", "Cisco ISE Solution Guide"),

    ("Cisco TrustSec & Scalable Group Tags (SGT)",
     "Comment Cisco TrustSec simplifie-t-il la sécurité par rapport aux milliers d'ACLs IP traditionnelles ?",
     "Sécurité Basée sur les Rôles avec SGT",
     "• Attribue un tag numérique de 16 bits (SGT - Scalable Group Tag) au paquet dès l'authentification de l'utilisateur (ex: SGT 4 = Équipe Médicale, SGT 5 = Invités).\n• Les politiques de filtrage (SGACLs) s'appliquent sur la matrice de rôles (SGT Source vers SGT Destination) indépendamment des adresses IP physiques des machines.",
     "Remplace les règles basées sur les adresses IP par des tags de rôles (SGT) indépendants de la topologie.", "Intermédiaire", "Cisco TrustSec Architecture"),

    ("Attaques par Force Brute et Dictionnaire",
     "Quelle commande Cisco IOS permet de bloquer automatiquement les tentatives de force brute sur les lignes de login ?",
     "Blocage Temporisé login block-for",
     "• Commande : 'login block-for <sec> attempts <nb> within <sec>'.\n• Exemple : 'login block-for 120 attempts 3 within 30' bloque toute tentative de connexion pendant 2 minutes si 3 échecs consécutifs surviennent en 30 secondes.\n• Neutralise les scripts automatisés de force brute.",
     "login block-for X attempts Y within Z bloque l'accès après des tentatives consécutives échouées.", "Intermédiaire", "Cisco Command Reference", "R1(config)# login block-for 120 attempts 3 within 30"),

    ("Sécurisation du Mot de Passe Console et Timeout d'Inactivité",
     "Quelles commandes sous 'line con 0' empêchent un tiers d'accéder au terminal laissé sans surveillance ?",
     "Verrouillage de la Console Physique",
     "• 'exec-timeout <minutes> <secondes>' : Déconnecte automatiquement la session après une période d'inactivité (ex: 'exec-timeout 5 0' pour 5 minutes).\n• 'login local' : Exige un compte d'utilisateur nominatif au lieu d'un simple mot de passe global partagé.",
     "exec-timeout 5 0 déconnecte automatiquement la session inactive après 5 minutes.", "Fondamental", "Cisco Hardening Guide", "SW1(config-line)# exec-timeout 5 0\nSW1(config-line)# login local"),

    ("Bannière de Sécurité Légale (banner motd)",
     "Que doit contenir la bannière 'banner motd' d'un équipement Cisco pour avoir une valeur juridique ?",
     "Avertissement Légal de Non-Responsabilité",
     "• Doit expressément avertir que l'accès est strictement réservé au personnel autorisé et que toute action est enregistrée et passible de poursuites judiciaires.\n• NE JAMAIS écrire 'Welcome' ou 'Bienvenue', car cela a déjà été retenu par des tribunaux comme une invitation implicite réduisant la culpabilité de l'intrus !",
     "Avertir que l'accès est restreint et surveillé. Ne jamais écrire 'Bienvenue'.", "Fondamental", "Cisco Security Best Practices", "R1(config)# banner motd # ACCES RESTREINT ET SURVEILLE #"),

    ("Désactivation des Services Inutilisés sous Cisco IOS",
     "Quels anciens services réseau doivent être impérativement désactivés sur un routeur Cisco durci ?",
     "Fermeture des Ports et Services Hérités",
     "• 'no ip http server' : Désactive l'interface web HTTP non sécurisée.\n• 'no service finger' : Empêche l'énumération des utilisateurs connectés.\n• 'no ip bootp server' : Désactive le serveur BOOTP inutile.\n• 'no ip source-route' : Rejette les paquets dont l'expéditeur a forcé la route réseau.",
     "Désactiver le serveur web HTTP non chiffré et les protocoles obsolètes (finger, bootp, source-route).", "Fondamental", "Cisco Hardening Guide", "R1(config)# no ip http server\nR1(config)# no ip source-route"),

    ("Control Plane Policing (CoPP)",
     "Quel est le rôle crucial de CoPP pour la survie du processeur (CPU) d'un routeur Cisco ?",
     "Protection du Processeur de Contrôle par CoPP",
     "• Le Control Plane gère les protocoles vitaux (OSPF, BGP, SSH, SNMP).\n• Si un attaquant inonde le routeur de trafic dirigé vers son CPU (ex: pings massifs), le routeur peut crasher.\n• CoPP applique des règles de QoS strictes pour plafonner et prioriser le trafic à destination du CPU de gestion.",
     "Plafonne et protège le processeur du routeur contre les saturations et dénis de service.", "Avancé", "Cisco CoPP Guide", "control-plane\n service-policy input COPP_POLICY"),

    ("Segmentation Réseau : DMZ (Zone Démilitarisée)",
     "Quel est le rôle d'une zone DMZ dans l'architecture d'un pare-feu d'entreprise ?",
     "Isolation des Services Publics en DMZ",
     "• Sous-réseau isolé hébergeant les serveurs accessibles depuis Internet (Web, Mail, DNS public).\n• Règle de flux : Internet peut joindre la DMZ, mais la DMZ n'a JAMAIS le droit d'initier des connexions vers le réseau interne de production (LAN interne). Si un serveur web est piraté, l'attaquant reste confiné dans la DMZ.",
     "Isole les serveurs exposés à Internet et leur interdit d'initier des flux vers le LAN interne.", "Fondamental", "NIST SP 800-41 § 2"),

    ("Honeypot (Pot de Miel)",
     "Quel est l'objectif d'un Honeypot dans une stratégie de cyberdéfense ?",
     "Système Leurre pour Détection et Renseignement",
     "• Fausse machine ou fausse cible vulnérable volontairement déployée sur le réseau sans aucune fonction de production légitime.\n• Tout accès ou scan vers le honeypot est par définition malveillant.\n• Permet de piéger l'attaquant, de sonner l'alarme immédiatement et d'analyser ses tactiques (TTPs).",
     "Fausse cible vulnérable servant à piéger et détecter immédiatement les attaquants sur le réseau.", "Fondamental", "SANS Security Resources"),

    ("Vulnerability Assessment vs Penetration Testing",
     "Quelle est la différence entre un scan de vulnérabilités et un test d'intrusion (Pentest) ?",
     "Audit Automatisé vs Test Offensif Manuel",
     "• Scan de vulnérabilités (ex: Nessus, Qualys) : Outil automatisé qui dresse l'inventaire des failles potentielles et logiciels non patchés sans les exploiter.\n• Pentest : Simulation d'attaque réelle menée par des experts éthiques tentant d'exploiter concrètement les failles pour évaluer l'impact sur l'entreprise.",
     "Le scan liste automatiquement les failles. Le pentest tente de les exploiter concrètement.", "Fondamental", "NIST SP 800-115"),

    ("CVE (Common Vulnerabilities and Exposures) & CVSS",
     "Que représentent un identifiant CVE et le score CVSS dans la gestion des failles ?",
     "Standardisation Internationale des Failles",
     "• CVE (ex: CVE-2024-20399) : Dictionnaire public identifiant de manière unique chaque vulnérabilité de sécurité découverte dans un logiciel ou matériel.\n• CVSS (Common Vulnerability Scoring System) : Note standardisée de 0.0 à 10.0 mesurant la gravité de la faille (faible, moyen, élevé, critique à partir de 9.0).",
     "CVE identifie la faille de façon unique. CVSS mesure sa gravité de 0.0 à 10.0 (Critique >= 9.0).", "Fondamental", "NIST NVD / FIRST CVSS"),

    ("Sécurité des Protocoles de Routage : Authentification OSPF",
     "Pourquoi et comment authentifier les échanges de routage OSPFv2 ?",
     "Authentification Cryptographique des Voisins OSPF",
     "• Empêche un équipement pirate injecté sur le LAN de former une contiguïté OSPF et d'injecter de fausses routes pour détourner le trafic.\n• Configuration recommandée : Authentification cryptographique par clé MD5 ou SHA sous l'interface : 'ip ospf message-digest-key 1 md5 <CLE>' et 'ip ospf authentication message-digest'.",
     "Empêche un intrus d'injecter de fausses routes OSPF. Utilise une clé de hachage partagée.", "Intermédiaire", "RFC 2328", "R1(config-if)# ip ospf authentication message-digest"),

    ("Sécurité BGP : Authentification TCP MD5 (RFC 2385)",
     "Comment le mot-clé 'neighbor password' protège-t-il les sessions BGP d'une tentative de Reset ?",
     "Protection de la Session TCP 179 BGP",
     "• BGP utilise une session TCP standard sur le port 179, vulnérable aux paquets TCP RST forgés par un tiers pour couper le peering.\n• La commande 'neighbor <IP> password <CLE>' active l'option TCP MD5 Signature (RFC 2385) qui signe chaque segment TCP au niveau du noyau.",
     "neighbor password signe les segments TCP BGP avec MD5 pour empêcher les attaques TCP RST.", "Intermédiaire", "RFC 2385", "R1(config-router)# neighbor 10.1.1.2 password SecretBgpKey"),

    ("IPsec Perfect Forward Secrecy (PFS)",
     "Quelle garantie de sécurité supplémentaire l'activation de PFS apporte-t-elle à un VPN IPsec ?",
     "Confidentialité Persistante (PFS)",
     "• Sans PFS, toutes les clés de chiffrement de Phase 2 dérivent de la clé de Phase 1 initiale. Si cette dernière est compromise, tout l'historique des échanges passés peut être déchiffré.\n• PFS force une renégociation Diffie-Hellman indépendante à chaque renouvellement de clé de Phase 2, garantissant que la compromission d'une clé n'affecte aucun échange passé ou futur.",
     "PFS renégocie une nouvelle clé Diffie-Hellman à chaque cycle pour protéger l'historique passé.", "Avancé", "RFC 4301 § 5.1", "crypto map CMAP 10 ipsec-isakmp\n set pfs group14"),

    ("VPN GRE over IPsec",
     "Pourquoi encapsule-t-on souvent un tunnel GRE à l'intérieur d'un tunnel IPsec ?",
     "Transport du Multicast et Routage Dynamique",
     "• IPsec natif en mode tunnel ne peut chiffrer que le trafic IP unicast : il est incapable d'acheminer du trafic Multicast ou Broadcast.\n• Par conséquent, les protocoles de routage dynamique (OSPF, EIGRP) ne peuvent pas traverser un VPN IPsec seul.\n• Solution : GRE encapsule le multicast/OSPF, puis IPsec chiffre le paquet GRE.",
     "GRE supporte le multicast (OSPF, EIGRP) et IPsec chiffre l'ensemble pour le sécuriser.", "Intermédiaire", "Cisco VPN Guide", "tunnel mode gre ip / crypto map"),

    ("Cisco DMVPN (Dynamic Multipoint VPN)",
     "Quelles sont les 3 technologies constitutives majeures de la solution Cisco DMVPN ?",
     "Les 3 Piliers DMVPN",
     "1. mGRE (Multipoint GRE) : Une seule interface tunnel sur le Hub gère plusieurs spokes dynamiques.\n2. NHRP (Next Hop Resolution Protocol - RFC 2332) : Annuaire dynamique associant les IPs privées de tunnel aux IPs publiques réelles des agences.\n3. IPsec : Chiffre la totalité des tunnels pour sécuriser les flux sur Internet.",
     "mGRE (tunnel multipoint) + NHRP (résolution d'adresses) + IPsec (chiffrement).", "Avancé", "Cisco DMVPN Design Guide", "tunnel mode gre multipoint"),

    ("Storm Control sur Commutateur Cisco",
     "Quel est le rôle de Storm Control sur les ports d'un commutateur d'accès ?",
     "Protection contre les Tempêtes de Diffusion (Storms)",
     "• Une tempête de diffusion (boucle L2, carte réseau défaillante) peut saturer la bande passante et faire tomber le réseau.\n• Storm Control mesure en continu le niveau de broadcast, multicast ou unicast inconnu sur le port physique.\n• Si le seuil configuré est franchi, le switch bloque le trafic excédentaire ou désactive le port.",
     "Bloque les tempêtes de broadcast ou multicast qui menacent de saturer le commutateur.", "Fondamental", "Cisco Switch Security", "SW1(config-if)# storm-control broadcast level 20.0 10.0"),

    ("MACsec (IEEE 802.1AE)",
     "À quelle couche du modèle OSI le protocole MACsec chiffre-t-il les trames ?",
     "Chiffrement Matériel au Niveau 2 (L2)",
     "• MACsec chiffre l'intégralité de la trame Ethernet au niveau de la Couche 2 (Liaison de données) directement dans le matériel (ASIC à débit de ligne sans latence).\n• Protège tous les flux circulant sur le câble physique (y compris CDP, LLDP, DHCP, ARP et paquets de routage).",
     "Chiffre les trames au niveau Couche 2 (Liaison de données) à débit matériel sans latence.", "Intermédiaire", "IEEE 802.1AE", "SW1(config-if)# macsec"),

    ("Désactivation de CDP et LLDP sur les Ports Externes",
     "Pourquoi désactiver CDP et LLDP sur les interfaces connectées à Internet ou aux zones publiques ?",
     "Prévention de la Fuite d'Informations (Reconnaissance)",
     "• CDP et LLDP diffusent périodiquement en clair des informations sensibles sur le matériel : modèle exact de switch, version d'IOS, adresse IP de gestion et capacités.\n• Un attaquant branché sur une prise murale publique collecte ces données pour cibler précisément des vulnérabilités connues de l'équipement.",
     "CDP et LLDP dévoilent en clair le modèle de switch, l'OS et l'IP de gestion aux attaquants.", "Fondamental", "Cisco Security Hardening", "SW1(config-if)# no cdp enable\nSW1(config-if)# no lldp transmit"),

    ("Sécurité Physique des Équipements Réseau",
     "Pourquoi la sécurité logique (mots de passe, ACLs) est-elle inutile sans sécurité physique ?",
     "Priorité de la Sécurité Physique",
     "• Tout attaquant ayant un accès physique direct au commutateur ou au routeur peut réaliser une procédure de recouvrement de mot de passe (Password Recovery via la touche Break au démarrage), contourner l'authentification et voler la configuration complète.\n• Baies verrouillées, badge d'accès et vidéosurveillance sont les premiers remparts indispensables.",
     "Un accès physique permet de réinitialiser les mots de passe via la console et le registre de démarrage.", "Fondamental", "ISO 27002 / NIST SP 800-53"),

    ("Procédure de Password Recovery et Registre de Configuration Cisco",
     "Quelle valeur de registre de configuration permet d'ignorer la startup-config au boot pour réinitialiser un routeur ?",
     "Registre de Démarrage 0x2142",
     "• La valeur par défaut normale est 0x2102 (charge la configuration depuis la NVRAM).\n• En mode ROMMON (Rom Monitor), configurer 'confreg 0x2142' force le routeur à ignorer la NVRAM au démarrage.\n• Permet à un administrateur physique de réinitialiser le mot de passe 'enable' oublié.",
     "0x2142 force le routeur à démarrer sans charger la configuration de la NVRAM.", "Intermédiaire", "Cisco Troubleshooting Guide", "rommon 1 > confreg 0x2142\nrommon 2 > reset"),

    ("Brouillage et Attaques DoS sur le Wi-Fi (RF Jamming)",
     "Comment une attaque par déni de service radio (RF Jamming) perturbe-t-elle un réseau Wi-Fi ?",
     "Brouillage des Fréquences 2.4 GHz et 5 GHz",
     "• L'attaquant émet un signal électromagnétique continu à haute puissance sur les canaux Wi-Fi pour dégrader le rapport signal-sur-bruit (SNR).\n• Le mécanisme CSMA/CA (Clear Channel Assessment) des équipements Wi-Fi détecte le canal comme constamment occupé et refuse d'émettre, bloquant toute communication.",
     "Émet un bruit radio continu saturant les fréquences pour empêcher les équipements d'émettre.", "Fondamental", "CWNA Wireless Guide"),

    ("Attaque Evil Twin (Faux Point d'Accès Wi-Fi)",
     "Comment fonctionne l'attaque Wi-Fi du 'Jumeau Malveillant' (Evil Twin) ?",
     "Usurpation de SSID et Portail Captif Pirate",
     "• L'attaquant configure un point d'accès Wi-Fi rogue diffusant exactement le même SSID légitime (ex: 'MonEntreprise_WiFi') avec une puissance radio supérieure.\n• Les clients se reconnectent automatiquement sur la borne pirate.\n• L'attaquant intercepte le trafic ou affiche un faux portail captif pour voler les identifiants.",
     "Faux point d'accès diffusant le même nom de réseau (SSID) pour leurrer les utilisateurs.", "Fondamental", "OWASP Wireless Security"),

    ("WIPS (Wireless Intrusion Prevention System)",
     "Comment un système WIPS détecte-t-il et neutralise-t-il les points d'accès pirates (Rogue APs) ?",
     "Détection et Neutralisation Radio WIPS",
     "• Les bornes Wi-Fi ou capteurs dédiés scannent en continu l'espace hertzien pour repérer les nouveaux BSSIDs non autorisés raccordés au réseau filaire de l'entreprise.\n• Neutralisation : Émet des trames de désauthentification 802.11 vers les clients pour les empêcher de communiquer avec la borne pirate.",
     "Détecte les bornes non autorisées et envoie des trames de désauthentification pour bloquer les clients.", "Intermédiaire", "Cisco CleanAir & WIPS Guide"),

    ("Sécurité IPv6 : RA Guard (Router Advertisement Guard)",
     "Quel risque le mécanisme IPv6 RA Guard neutralise-t-il sur un commutateur d'accès ?",
     "Protection contre les Faux Routeurs IPv6 (Rogue RAs)",
     "• Tout poste pirate peut émettre de faux paquets ICMPv6 Router Advertisement (RA) pour s'annoncer comme passerelle par défaut ou distribuer un faux préfixe (attaque MitM).\n• RA Guard inspecte les trames ICMPv6 de niveau 2 et détruit tout paquet RA arrivant sur un port non fiable d'utilisateur.",
     "Bloque les faux paquets ICMPv6 Router Advertisement émis par des pirates sur les ports utilisateurs.", "Intermédiaire", "RFC 6105", "SW1(config-if)# ipv6 nd raguard"),

    ("Sécurité IPv6 : DHCPv6 Guard",
     "Quel est l'équivalent de DHCP Snooping pour bloquer les faux serveurs DHCP en IPv6 ?",
     "Blocage des Serveurs DHCPv6 Pirates",
     "• DHCPv6 Guard bloque les messages de réponse émis par des serveurs DHCPv6 non autorisés (messages Advertise et Reply) arrivant sur les ports d'accès utilisateurs.\n• Seuls les ports explicitement autorisés peuvent relayer des réponses de serveurs DHCPv6.",
     "Bloque les messages serveurs DHCPv6 (Advertise/Reply) arrivant sur des ports non fiables.", "Intermédiaire", "RFC 7113", "SW1(config-if)# ipv6 dhcp guard attach-policy"),

    ("Segmentation Réseau : AAA Accounting & Audit Légal",
     "Pourquoi la traçabilité des commandes (AAA Accounting) est-elle obligatoire pour la conformité réglementaire ?",
     "Exigence de Traçabilité et Non-Répudiation",
     "• Les normes de conformité (PCI-DSS, ISO 27001, RGPD) exigent de savoir exactement qui s'est connecté, à quelle heure précise, depuis quelle IP, et quelles commandes de configuration ont été modifiées.\n• En cas d'intrusion ou de panne, permet de reconstituer fidèlement la chronologie des événements et garantit la non-répudiation.",
     "Fournit des preuves légales horodatées de chaque commande saisie pour la conformité et l'audit.", "Fondamental", "PCI-DSS Requirement 10 / ISO 27001", "SW1(config)# aaa accounting commands 15 default start-stop group tacacs+")
]

for item in extras_d5:
    add_c(item[0], item[1], item[2], item[3], item[4], item[5], item[6] if len(item) > 6 else None, item[7] if len(item) > 7 else None)

print(f"D5 total cards: {len(cards)}")
with open("/app/applet/src/data/ccnaD5Data.ts", "w", encoding="utf-8") as f:
    f.write("import { Flashcard } from './workshopsData';\n\n")
    f.write("export const ccnaD5Cards: Flashcard[] = " + json.dumps(cards, ensure_ascii=False, indent=2) + ";\n")
print("Saved /app/applet/src/data/ccnaD5Data.ts successfully!")
