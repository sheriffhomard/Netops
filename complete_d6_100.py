import json

with open("src/data/ccnaD6Flashcards.ts", "r", encoding="utf-8") as f:
    text = f.read()

json_part = text.split("export const ccnaD6Cards: Flashcard[] = ")[1].rstrip(";\n")
cards = json.loads(json_part)

def add_c(title, prompt, b_title, b_content, hint, diff='Intermédiaire', rfc=None, cli=None):
    cid = f'fc-ccna-d6-{len(cards)+1:03d}'
    cards.append({
        'id': cid,
        'category': 'CCNA-D6 : Automation & Programmability',
        'moduleCode': 'CCNA-D6',
        'moduleName': 'Cisco CCNA 200-301 - 6.0 Automation & Programmability',
        'difficulty': diff,
        'frontTitle': title,
        'frontPrompt': prompt,
        'backTitle': b_title,
        'backContent': b_content,
        'rfcRef': rfc,
        'cliExample': cli,
        'hint': hint
    })

# Add 42 additional high-value cards to hit exactly 100 for D6
d6_additional = [
    # Cisco DNA Center / Catalyst Center Deep Dive
    ("Cisco DNA Center Network Design Settings",
     "Quels éléments globaux sont configurés dans l'onglet 'Design' de Cisco Catalyst Center ?",
     "Conception Hiérarchique (Design)",
     "• Hiérarchie des sites (Network Hierarchy) : Zones géographiques, bâtiments, étages.\n• Paramètres généraux (Network Settings) : Serveurs DHCP, DNS, Syslog, SNMP et NTP partagés.\n• Profils réseau (Network Profiles) : Association de profils de commutation et sans-fil aux sites.",
     "Définit la hiérarchie des bâtiments, les serveurs DNS/DHCP/NTP et les profils réseau.", "Fondamental", "Cisco Catalyst Center Design Guide"),

    ("Cisco DNA Center Network Provisioning",
     "Que fait l'étape de 'Provisioning' dans Cisco Catalyst Center ?",
     "Déploiement et Assignation (Provision)",
     "• Associe un équipement réseau découvert physiquement à un site ou étage spécifique.\n• Déploie automatiquement les configurations de profil correspondantes.\n• Assigne les images logicielles (Software Images) certifiées pour ce matériel.",
     "Assigne l'équipement à un bâtiment et pousse sa configuration logicielle et d'image.", "Fondamental", "Cisco Catalyst Center User Guide"),

    ("Cisco DNA Center Policy Studio",
     "Comment le module 'Policy' de Cisco Catalyst Center simplifie-t-il la micro-segmentation ?",
     "Création Graphique de Politiques Métier",
     "• Fournit une matrice visuelle croisant les groupes d'utilisateurs et de serveurs (Scalable Groups).\n• Permet d'autoriser ou bloquer un flux (ex: 'Personnel Médical vers Dossiers Patients') en cochant simplement une case dans la grille graphique.\n• Traduit automatiquement la sélection en Scalable Group ACLs (SGACLs).",
     "Matrice visuelle pour définir les autorisations entre groupes d'utilisateurs en quelques clics.", "Intermédiaire", "Cisco TrustSec / SD-Access Guide"),

    ("Cisco DNA Center PnP (Plug and Play)",
     "Comment fonctionne le mécanisme Network Plug and Play (PnP) pour déployer un switch neuf ?",
     "Déploiement 'Day-0' Zero-Touch PnP",
     "1. Le switch sort du carton sans aucune configuration et démarre.\n2. Il obtient une IP via DHCP avec l'Option 43 lui indiquant l'IP de Cisco Catalyst Center.\n3. Le switch contacte le contrôleur en HTTPS, télécharge son image logicielle IOS-XE approuvée et sa configuration complète sans aucune intervention d'un technicien sur site.",
     "Le switch neuf s'allume, contacte le contrôleur via DHCP option 43 et s'auto-configure.", "Fondamental", "Cisco Network PnP Solution Guide"),

    ("Cisco SD-WAN : Cloud OnRamp",
     "Quel est le rôle de Cloud OnRamp dans la solution Cisco SD-WAN ?",
     "Optimisation SaaS et IaaS Cloud OnRamp",
     "• Cloud OnRamp for SaaS : Mesure en continu la latence et la perte de paquets vers les applications Cloud (Office 365, Salesforce) via les différents liens Internet et choisit dynamiquement le chemin le plus performant.\n• Cloud OnRamp for IaaS : Automatise l'interconnexion sécurisée des succursales vers les VPCs AWS, Azure ou Google Cloud.",
     "Mesure la qualité des liens et route dynamiquement le trafic SaaS/IaaS sur le meilleur chemin.", "Intermédiaire", "Cisco SD-WAN Cloud OnRamp Guide"),

    ("Cisco SD-WAN : vManage Dashboard Metrics",
     "Quelles métriques clés de santé sont immédiatement visibles sur le tableau de bord vManage ?",
     "Vue d'Ensemble vManage",
     "• État de santé des contrôleurs (vSmart, vBond, vManage).\n• Tunnels IPsec BFD (Bidirectional Forwarding Detection) actifs et dégradés.\n• Taux de perte de paquets, gigue et latence par liaison WAN (MPLS vs Internet vs 4G/5G).\n• Topologie des sites (Hub & Spoke, Full Mesh) et alertes critiques.",
     "État des contrôleurs, tunnels BFD, latence/gigue/perte par lien WAN et alarmes de sites.", "Fondamental", "Cisco vManage Monitor Guide"),

    ("Cisco SD-WAN : BFD (Bidirectional Forwarding Detection)",
     "Quel rôle joue le protocole BFD à l'intérieur de chaque tunnel IPsec SD-WAN ?",
     "Sondes BFD en Temps Réel",
     "• BFD tourne en continu dans chaque tunnel IPsec entre les routeurs WAN Edge.\n• Mesure en temps réel la perte de paquets, la latence et la gigue.\n• Détecte une coupure de liaison en quelques millisecondes (sub-seconde) pour déclencher un basculement de trafic immédiat sans interruption pour l'utilisateur.",
     "Mesure la qualité (gigue, perte, délai) et détecte les pannes en millisecondes.", "Intermédiaire", "RFC 5880 / RFC 5881"),

    ("Cisco SD-WAN : TLOC (Transport Location)",
     "Quels sont les 3 éléments constitutifs obligatoires d'un identifiant TLOC ?",
     "Triplet Identifiant TLOC",
     "• Un TLOC représente le point de raccordement d'un routeur à un transport WAN. Il est défini par un triplet unique :\n  1. System IP : Adresse IP logique unique identifiant le routeur (similaire à un Router ID BGP).\n  2. Color : Identifie le type de transport (ex: mpls, biz-internet, public-internet, lte).\n  3. Encapsulation : Le protocole de chiffrement utilisé (IPsec ou GRE).",
     "Triplet : System IP + Color (ex: mpls, public-internet) + Encapsulation (IPsec).", "Intermédiaire", "Cisco SD-WAN Architecture Guide"),

    ("Cisco SD-WAN Colors : Private vs Public Colors",
     "Pourquoi distingue-t-on les 'Private Colors' des 'Public Colors' dans Cisco SD-WAN ?",
     "Négociation de Tunnels sous NAT",
     "• Public Colors (ex: biz-internet, public-internet) : Utilisent des adresses IP publiques ou effectuent une translation NAT. Les routeurs tentent de joindre l'IP publique réflexive découverte via vBond.\n• Private Colors (ex: mpls, private1) : Utilisées sur des réseaux privés d'opérateur sans NAT, les routeurs s'interconnectent directement sur leurs adresses IP privées d'origine.",
     "Public = traverse Internet avec NAT. Private = lien privé fermé (MPLS) sans NAT.", "Avancé", "Cisco SD-WAN NAT Traversal Guide"),

    # RESTful APIs & Python Details
    ("Parsing JSON en Python : Accès aux Clés Imbriquées",
     "Comment extraire le nom de la première interface à partir d'un dictionnaire JSON en Python ?",
     "Navigation dans les Objets et Tableaux JSON",
     "Soit la réponse API :\n{\n  \"ietf-interfaces:interfaces\": {\n    \"interface\": [\n      {\"name\": \"GigabitEthernet1\", \"enabled\": true}\n    ]\n  }\n}\n• Code Python : \"data['ietf-interfaces:interfaces']['interface'][0]['name']\".\n• Renvoie la chaîne \"GigabitEthernet1\".",
     "Naviguer par clés successives [] et index de liste [0].", "Fondamental", "Python Data Structures", "first_if = data['interfaces'][0]['name']"),

    ("Gestion des Exceptions dans Python Requests",
     "Quelles exceptions du module 'requests' doit-on intercepter pour sécuriser un script réseau ?",
     "Gestion Robuste des Erreurs Réseau",
     "• requests.exceptions.ConnectionError : L'équipement réseau ou le contrôleur est inaccessible (câble débranché, IP erronée).\n• requests.exceptions.Timeout : Le serveur met trop de temps à répondre.\n• requests.exceptions.HTTPError : Déclenché par 'response.raise_for_status()' si le serveur renvoie un code 4xx ou 5xx.",
     "ConnectionError (hôte injoignable), Timeout, et HTTPError (codes 4xx/5xx).", "Intermédiaire", "Python Requests Documentation", "try:\n    r = requests.get(url, timeout=5)\n    r.raise_for_status()\nexcept requests.exceptions.RequestException as e:\n    print(e)"),

    ("Authentification HTTP Basic vs Digest",
     "Comment fonctionne l'authentification HTTP Basic et pourquoi HTTPS est-il obligatoire avec celle-ci ?",
     "En-tête Authorization: Basic",
     "• Le client concatène 'identifiant:motdepasse' et l'encode en Base64.\n• Il envoie l'en-tête : \"Authorization: Basic YWRtaW46Q2lzY28xMjM=\".\n• Attention : Le Base64 n'est PAS un chiffrement ! N'importe qui peut le décoder en 1 milliseconde. Le chiffrement HTTPS (TLS) sous-jacent est donc strictement obligatoire.",
     "Base64(user:pass) envoyé dans l'en-tête. Le Base64 n'est pas chiffré, HTTPS est indispensable.", "Fondamental", "RFC 7617", 'headers = {"Authorization": "Basic " + encoded_str}'),

    ("API Query Parameters (Paramètres d'URL)",
     "Quelle est la syntaxe pour filtrer ou paginer une ressource API via des query parameters ?",
     "Query String dans les URIs",
     "• Les paramètres débutent par un point d'interrogation (?) et sont séparés par des esperluettes (&).\n• Syntaxe : \"https://api.example.com/devices?family=Routers&limit=10&offset=0\".\n• Permet de filtrer côté serveur sans télécharger toute la base de données.",
     "Débute par ? puis cle=valeur&cle2=valeur2 (ex: ?family=Switches&limit=50).", "Fondamental", "RFC 3986 § 3.4", "requests.get(url, params={'family': 'Routers'})"),

    ("Webhooks : Modèle Réactif par Événements",
     "En quoi un Webhook diffère-t-il d'une API REST classique et quel est son intérêt pour le réseau ?",
     "Architecture Event-Driven / Webhooks",
     "• API REST classique (Pull) : Votre script doit interroger le contrôleur toutes les 30 secondes pour savoir si un lien est tombé (Polling consommateur).\n• Webhook (Push) : Vous fournissez une URL de callback. Dès qu'un événement survient (ex: alerte critique, panne de port), le contrôleur envoie instantanément une requête HTTP POST avec le détail au format JSON vers votre serveur.",
     "Le contrôleur envoie automatiquement un POST vers votre URL dès qu'un événement survient.", "Fondamental", "Webhooks Architecture Guide", "POST /webhook/alerts HTTP/1.1"),

    ("Postman Collection Runner et Newman",
     "Quel est le rôle de Newman dans l'automatisation des tests d'APIs ?",
     "Exécution CLI avec Newman",
     "• Newman est le compagnon en ligne de commande (CLI) de Postman.\n• Permet d'exécuter des collections de tests Postman directement dans un terminal ou au sein d'un pipeline CI/CD (Jenkins, GitLab CI) sans avoir besoin d'ouvrir l'interface graphique de Postman.",
     "Exécute des collections de tests Postman en ligne de commande dans des pipelines CI/CD.", "Intermédiaire", "Newman Documentation", "newman run my_collection.json -e env.json"),

    # YANG & Data Modeling Deep Dive
    ("YANG Leaf vs Leaf-List vs Container vs List",
     "Quelles sont les 4 structures de nœuds de base dans un modèle YANG ?",
     "Nœuds de Données YANG (RFC 7950)",
     "• leaf : Contient une seule valeur scalaire (ex: hostname, mtu).\n• leaf-list : Contient une séquence de valeurs scalaires simples du même type.\n• container : Regroupe des nœuds liés sous un même ensemble, sans clé d'indexation (ex: 'system').\n• list : Représente une séquence d'entrées d'un tableau, chaque entrée étant identifiée de manière unique par une clé ('key', ex: une liste d'interfaces).",
     "leaf = 1 valeur. leaf-list = liste de valeurs. container = groupe sans clé. list = tableau avec clé unique.", "Intermédiaire", "RFC 7950 § 7", "list interface { key \"name\"; leaf name { type string; } }"),

    ("YANG Types de Données Primitifs",
     "Quels types de données primitifs sont fréquemment utilisés dans les fichiers .yang ?",
     "Types YANG Standards",
     "• string, boolean, empty (drapeau sans valeur).\n• int8, int16, int32, int64 (entiers signés).\n• uint8, uint16, uint32, uint64 (entiers non signés).\n• enumeration (liste de valeurs autorisées, ex: up, down, testing).\n• typedef (création de types personnalisés réutilisables).",
     "string, boolean, uint32, int32, enumeration, empty.", "Intermédiaire", "RFC 7950 § 9", "type enumeration { enum up; enum down; }"),

    ("Outil pyang pour Valider et Visualiser les Modèles YANG",
     "Comment visualiser l'arborescence graphique d'un modèle YANG en ligne de commande avec pyang ?",
     "Visualisation d'Arbres avec pyang",
     "• pyang est le compilateur et validateur de référence pour les fichiers YANG.\n• Commande : \"pyang -f tree ietf-interfaces.yang\"\n• Affiche une vue arborescente compacte et hyper-lisible des containers, listes, clés (prefixées par '+--rw') et données en lecture seule (+--ro).",
     "pyang -f tree <modele.yang> affiche l'arborescence visuelle complète.", "Intermédiaire", "RFC 8340", "pyang -f tree cisco-ios-xe-native.yang"),

    ("Données de Configuration vs Données Opérationnelles (rw vs ro)",
     "Dans un arbre YANG, quelle est la différence entre les drapeaux rw et ro ?",
     "Config (rw) vs State (ro)",
     "• rw (Read-Write / Configuration) : Données configurables par l'administrateur, persistées dans les datastores (ex: IP assignée, description d'interface, no shutdown).\n• ro (Read-Only / State Data) : Données opérationnelles dynamiques générées par le matériel en temps réel (ex: compteurs d'octets reçus, température de la sonde, état physique courant).",
     "rw = modifiable (config). ro = lecture seule en temps réel (statistiques matérielles).", "Fondamental", "RFC 7950 § 7.1", "+--rw ip-address\n+--ro in-octets"),

    ("NETCONF Capabilities Exchange (<hello>)",
     "Comment un client et un serveur NETCONF négocient-ils leurs fonctionnalités lors de la connexion initiale ?",
     "Message Initial NETCONF <hello>",
     "• Dès l'ouverture de la session SSH sur le port 830, le client et le routeur s'échangent simultanément un message XML <hello>.\n• Ce message liste les versions supportées (urn:ietf:params:netconf:base:1.1) et tous les modules YANG supportés par l'équipement avec leurs numéros de révision.",
     "Échange initial du message <hello> listant tous les modèles YANG et versions supportés.", "Intermédiaire", "RFC 6241 § 8.1", "<hello xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">"),

    ("Bibliothèque Python ncclient pour NETCONF",
     "Comment se connecter et extraire la configuration d'un routeur Cisco avec la librairie 'ncclient' en Python ?",
     "ncclient en Python",
     "Exemple type :\nfrom ncclient import manager\nwith manager.connect(host=\"10.1.1.1\", port=830, username=\"admin\", password=\"cisco\", hostkey_verify=False, device_params={'name': 'csr1000v'}) as m:\n    config = m.get_config(source='running')\n    print(config)",
     "manager.connect(host, port=830, device_params={'name':'iosxe'}). Utilise m.get_config().", "Intermédiaire", "ncclient Documentation", "m.get_config(source='running')"),

    ("RESTCONF Media Types Spécifiques",
     "Quels en-têtes Content-Type spécifiques utilise RESTCONF selon la RFC 8040 ?",
     "En-têtes Media Types RESTCONF",
     "• Pour du JSON YANG : \"application/yang-data+json\"\n• Pour du XML YANG : \"application/yang-data+xml\"\n• Utilisé dans les en-têtes Content-Type et Accept pour certifier la conformité aux modèles de données YANG sous-jacents.",
     "application/yang-data+json et application/yang-data+xml.", "Intermédiaire", "RFC 8040 § 11.3", 'headers = {"Accept": "application/yang-data+json"}'),

    ("RESTCONF Query Parameters : content, depth, fields",
     "Comment restreindre la profondeur ou le type de données retournées par RESTCONF ?",
     "Paramètres de Requête RESTCONF (RFC 8040 § 4.8)",
     "• ?content=config : Renvoie uniquement les données de configuration (rw).\n• ?content=nonconfig : Renvoie uniquement les données opérationnelles en lecture seule (ro).\n• ?depth=1 : Limite l'arborescence au premier niveau pour éviter les payloads gigantesques.\n• ?fields=name,enabled : Filtre uniquement les champs souhaités.",
     "?content=config pour la config seule, ?depth=X pour limiter la profondeur de l'arbre.", "Avancé", "RFC 8040 § 4.8", "GET /restconf/data/ietf-interfaces:interfaces?depth=2"),

    # Configuration Management & NetDevOps Expansion
    ("Ansible Core vs Ansible Automation Platform (AAP / Tower)",
     "Qu'apporte Ansible Automation Platform (anciennement Ansible Tower / AWX) par rapport à la CLI Ansible ?",
     "Fonctionnalités Entreprise Ansible Tower / AAP",
     "• Interface graphique web centralisée pour piloter l'exécution des playbooks.\n• Gestion des accès basée sur les rôles (RBAC) pour restreindre qui peut lancer quel script sur quel groupe de routeurs.\n• Coffre-fort sécurisé pour les identifiants sans les divulguer aux utilisateurs.\n• Ordonnanceur de tâches planifiées et intégration native avec les Webhooks Git.",
     "Interface web, gestion des rôles RBAC, stockage sécurisé des mots de passe et ordonnanceur.", "Fondamental", "Red Hat Ansible Platform Guide"),

    ("Ansible Vault : Chiffrement des Secrets",
     "Comment Ansible Vault protège-t-il les mots de passe et clés SSH stockés dans les dépôts Git ?",
     "Chiffrement de Fichiers avec Ansible Vault",
     "• Commande : \"ansible-vault encrypt passwords.yml\"\n• Chiffre le fichier YAML contenant les secrets avec l'algorithme AES-256.\n• Le fichier chiffré peut être versionné en toute sécurité sur GitHub.\n• Déchiffré à la volée lors de l'exécution du playbook avec \"--ask-vault-pass\" ou un fichier de mot de passe.",
     "ansible-vault encrypt chiffre les fichiers de variables sensibles avec AES-256.", "Fondamental", "Ansible Vault Guide", "ansible-playbook site.yml --ask-vault-pass"),

    ("Ansible Facts : Collecte Automatisée avec ios_facts",
     "Quelles informations le module 'cisco.ios.ios_facts' extrait-il d'un switch Cisco ?",
     "Découverte Système avec ios_facts",
     "• Extrait automatiquement l'état complet du boîtier sans taper de commandes show manuelles :\n  - Version exacte d'IOS-XE et image logicielle.\n  - Numéro de série et modèle matériel du châssis.\n  - Liste de toutes les interfaces physiques avec MAC et IP.\n  - Espace mémoire libre et configuration active.\n• Stocke ces données dans des variables utilisables dans les tâches suivantes.",
     "Collecte automatiquement le modèle, l'OS, le numéro de série et les interfaces dans des variables.", "Intermédiaire", "Ansible ios_facts Module", "- name: Gather Facts\n  cisco.ios.ios_facts:\n    gather_subset: all"),

    ("Templates Jinja2 dans Ansible (.j2)",
     "Comment les gabarits Jinja2 permettent-ils de générer dynamiquement des configurations Cisco personnalisées ?",
     "Moteur de Gabarits Jinja2",
     "• Utilise des balises de variables {{ ma_variable }} et de boucles {% for iface in interfaces %}.\n• Exemple de template 'ospf.j2' :\n  router ospf {{ ospf_process }}\n  {% for net in networks %}\n    network {{ net.ip }} {{ net.wildcard }} area {{ net.area }}\n  {% endfor %}\n• Le module 'template' génère la configuration finale adaptée à chaque équipement.",
     "Génère des configurations sur mesure en combinant des variables YAML et des boucles conditionnelles.", "Intermédiaire", "Jinja2 Template Documentation", "- template: src=ospf.j2 dest=/tmp/config.txt"),

    ("Puppet Hiera : Séparation du Code et des Données",
     "Quel est le rôle de Hiera dans l'architecture Puppet ?",
     "Magasin Hiérarchique de Données Hiera",
     "• Sépare strictement le code d'automatisation (Manifests Puppet) des données spécifiques aux sites (adresses IP, VLANs, noms d'hôtes).\n• Permet d'écrire un manifest générique et d'aller chercher les valeurs correspondantes dans des fichiers YAML hiérarchisés par environnement (Dev, Test, Prod).",
     "Sépare le code de configuration des données réelles (adresses IP, VLANs) stockées en YAML.", "Intermédiaire", "Puppet Hiera Documentation"),

    ("Chef Supermarket",
     "Qu'est-ce que le Chef Supermarket dans l'écosystème d'automatisation Chef ?",
     "Dépôt Communautaire de Cookbooks",
     "• Dépôt public et centralisé officiel où la communauté et les constructeurs partagent des Cookbooks préconçus et testés.\n• Permet de réutiliser des briques de configuration prêtes à l'emploi (ex: configuration NTP, Syslog, SNMP) sans avoir à réécrire le code Ruby de zéro.",
     "Bibliothèque publique officielle pour partager et télécharger des Cookbooks Chef préconçus.", "Fondamental", "Chef Supermarket Portal"),

    ("Git Merge vs Git Rebase",
     "Quelle est la différence entre 'git merge' et 'git rebase' lors de l'intégration d'une branche ?",
     "Intégration de Branches Git",
     "• git merge : Crée un nouveau commit de fusion (Merge Commit) liant l'historique des deux branches. Préserve l'historique chronologique exact mais peut rendre le graphe complexe.\n• git rebase : Réapplique les commits de votre branche un par un au sommet de la branche principale. Crée un historique linéaire, propre et sans commit de fusion superflu.",
     "merge crée un commit de fusion. rebase réapplique les commits pour un historique linéaire propre.", "Intermédiaire", "Pro Git Book", "git merge feature / git rebase main"),

    ("Fichier .gitignore",
     "Quel est le rôle du fichier .gitignore dans un projet d'automatisation réseau ?",
     "Exclusion de Fichiers sous Git",
     "• Liste les motifs de fichiers et répertoires que Git doit délibérément ignorer et ne jamais versionner.\n• Exemples indispensables : fichiers d'environnement contenant des clés secrètes (.env), clés privées SSH (*.pem), environnements virtuels Python (venv/), ou fichiers temporaires de cache (__pycache__/).",
     "Empêche de commiter par erreur des mots de passe, clés SSH privées ou fichiers temporaires.", "Fondamental", "Git Documentation", ".env\n*.pem\nvenv/\n__pycache__/"),

    ("Git Diff & Git Log",
     "Comment vérifier les modifications exactes avant de commiter avec 'git diff' ?",
     "Inspection des Changements Git",
     "• \"git diff\" : Affiche les lignes ajoutées (+) et supprimées (-) entre votre copie de travail et la dernière version enregistrée.\n• \"git diff --staged\" : Affiche les différences pour les fichiers déjà indexés dans la staging area avec 'git add'.\n• \"git log --oneline\" : Affiche l'historique résumé des commits précédents.",
     "git diff affiche ligne par ligne les ajouts (+) et suppressions (-) avant validation.", "Fondamental", "Git Command Reference", "git diff HEAD~1"),

    ("Environnements Virtuels Python (venv)",
     "Pourquoi est-il fortement recommandé d'isoler chaque projet d'automatisation dans un 'venv' ?",
     "Isolation des Dépendances Python",
     "• Évite les conflits de versions entre bibliothèques (ex: Projet A nécessite Netmiko 3.x alors que Projet B requiert Netmiko 4.x).\n• Préserve l'environnement Python du système d'exploitation.\n• Création et activation :\n  \"python3 -m venv venv\"\n  \"source venv/bin/activate\".",
     "Isole les versions des librairies Python par projet pour éviter les conflits de packages.", "Fondamental", "Python venv Documentation", "source venv/bin/activate"),

    ("Gestion des Dépendances avec requirements.txt",
     "Comment figer et réinstaller fidèlement les bibliothèques d'un script d'automatisation réseau ?",
     "Fichier requirements.txt",
     "• Exportation de l'environnement : \"pip freeze > requirements.txt\" (enregistre la liste exacte des packages et leurs versions, ex: requests==2.31.0, ncclient==0.6.13).\n• Réinstallation sur une nouvelle machine : \"pip install -r requirements.txt\".",
     "pip freeze > requirements.txt sauvegarde les packages, pip install -r requirements.txt les réinstalle.", "Fondamental", "Pip User Guide", "pip install -r requirements.txt"),

    ("Linting de Code : Flake8 et Black pour Python",
     "Quel est l'intérêt d'outils de linting et formatage comme Black ou Flake8 en NetDevOps ?",
     "Qualité et Conformité du Code (PEP 8)",
     "• Flake8 : Analyse statique du code détectant les erreurs de syntaxe potentielles, les variables non utilisées et les non-conformités à la norme de style officielle PEP 8.\n• Black : Formateur automatique sans concession qui reformate tout le code Python de manière uniforme et standardisée pour faciliter la relecture par les pairs.",
     "Vérifie la syntaxe, supprime le code mort et unifie le style d'écriture du code (norme PEP 8).", "Intermédiaire", "Python PEP 8 Style Guide", "black my_script.py"),

    ("Parsing CLI avec TextFSM et Cisco Genie",
     "Comment convertir la sortie texte non structurée d'un 'show ip route' en données structurées JSON ?",
     "Transformation CLI en Données Structurées",
     "• Les équipements anciens ne disposent pas d'APIs REST ou NETCONF et ne renvoient que du texte brut en CLI.\n• Outils : TextFSM ou Cisco Genie Parsers appliquent des expressions régulières (Regex) sur le texte brut pour le transformer automatiquement en dictionnaire ou liste JSON exploitable par un script Python.",
     "Transforme le texte brut d'une commande 'show' CLI en JSON structuré grâce à des modèles de regex.", "Intermédiaire", "Cisco Genie Documentation", "from genie import testbed"),

    ("Protocole gRPC et Télémétrie gNMI",
     "Pourquoi gRPC et gNMI sont-ils utilisés pour la gestion ultra-rapide des réseaux modernes ?",
     "gRPC Network Management Interface (gNMI)",
     "• gRPC : Protocole d'appel de procédure distante développé par Google, utilisant HTTP/2 en sous-jacent et les Protocol Buffers binaires (sérialisation ultra-compacte et performante comparée au JSON texte).\n• gNMI : Standard ouvert pour la configuration et la télémétrie en streaming temps réel basé sur gRPC et YANG.",
     "Protocole binaire ultra-rapide basé sur HTTP/2 et Protocol Buffers pour la télémétrie temps réel.", "Avancé", "OpenConfig gNMI Specification"),

    ("Docker et Conteneurs en Réseau",
     "Comment les conteneurs Docker facilitent-ils le déploiement d'outils d'automatisation réseau ?",
     "Conteneurisation des Outils Réseau",
     "• Permet d'embarquer dans une image conteneur légère et immuable tout l'environnement d'automatisation (Python, Ansible, pyATS, modules spécifiques) avec leurs dépendances exactes.\n• Garantit que le script s'exécute de façon 100% identique sur le PC de l'ingénieur, sur un serveur de test ou dans un runner de pipeline CI/CD.",
     "Embarque le script et toutes ses dépendances dans une image légère pour garantir le même fonctionnement partout.", "Fondamental", "Docker Documentation", "docker run -it ansible/ansible-runner"),

    ("GitHub Actions pour l'Automatisation Réseau",
     "Comment un fichier de workflow GitHub Actions (.github/workflows/main.yml) automatise-t-il les tests ?",
     "Pipelines CI/CD avec GitHub Actions",
     "• Déclenché automatiquement à chaque 'git push' ou 'pull request'.\n• Démarre une machine virtuelle éphémère (Runner), installe Python, exécute le linting (Flake8), valide les fichiers JSON/YAML avec des schémas, et lance des tests pyATS contre un banc d'essai virtuel.\n• Bloque la fusion si un test échoue.",
     "Déclenche des tests automatisés à chaque push pour valider la configuration avant mise en production.", "Intermédiaire", "GitHub Actions Documentation", "on: [push, pull_request]"),

    ("API Rate Limiting et En-têtes HTTP 429",
     "Que signifie le code HTTP 429 Too Many Requests et comment un script doit-il réagir ?",
     "Gestion du Rate Limiting API",
     "• Signification : Le client a dépassé le nombre de requêtes autorisées par seconde/minute fixé par le contrôleur pour protéger ses ressources CPU.\n• En-têtes : Le serveur renvoie souvent \"Retry-After: <secondes>\".\n• Bonne pratique : Implémenter un mécanisme d'attente exponentielle (Exponential Backoff avec Jitter) dans le script avant de réémettre l'appel.",
     "Le serveur sature et demande de ralentir (HTTP 429). Le script doit patienter avant de réessayer.", "Intermédiaire", "RFC 6585 § 4", "HTTP/1.1 429 Too Many Requests\nRetry-After: 30"),

    ("OpenFlow Protocol dans l'Histoire du SDN",
     "Quel rôle historique a joué le protocole OpenFlow dans l'émergence des réseaux SDN ?",
     "Protocole OpenFlow (Open Networking Foundation)",
     "• Premier protocole standardisé d'interface Southbound permettant à un contrôleur logiciel externe de programmer directement les tables de flux (Flow Tables) TCAM des commutateurs matériels.\n• Bien que supplanté par NETCONF/RESTCONF et les architectures Fabric (VXLAN/EVPN), il a théorisé la séparation moderne Control/Data Plane.",
     "Pionnier du SDN ayant standardisé la programmation directe des tables de flux par un contrôleur externe.", "Fondamental", "ONF OpenFlow Switch Specification")
]

for item in d6_additional:
    add_c(item[0], item[1], item[2], item[3], item[4], item[5], item[6] if len(item) > 6 else None, item[7] if len(item) > 7 else None)

print(f"Total cards for CCNA-D6: {len(cards)}")
with open("src/data/ccnaD6Flashcards.ts", "w", encoding="utf-8") as f:
    f.write("// ccnaD6Flashcards.ts - 100 Flashcards pour Cisco CCNA-D6: Automation & Programmability\n")
    f.write("import { Flashcard } from './workshopsData';\n\n")
    f.write("export const ccnaD6Cards: Flashcard[] = " + json.dumps(cards, ensure_ascii=False, indent=2) + ";\n")

print("Saved src/data/ccnaD6Flashcards.ts with 100 cards!")
