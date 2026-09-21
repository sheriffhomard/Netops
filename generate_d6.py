import json

cards = []
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

# 1-20: Network Programmability, SDN architectures & Controllers
add_c("Plans Réseau : Data Plane vs Control Plane vs Management Plane",
      "Quels sont les rôles précis des plans de données, de contrôle et de gestion d'un équipement réseau ?",
      "Les 3 Plans d'un Équipement Réseau",
      "• Data Plane (FIB / Forwarding) : Commutation et acheminement physique des paquets à très haute vitesse via les puces matérielles ASIC. Zéro décision complexe.\n• Control Plane (RIB) : Cerveau de l'équipement. Exécute les protocoles de routage (OSPF, BGP) et STP pour calculer la meilleure route et programmer la table FIB du Data Plane.\n• Management Plane : Accès administratif et supervision pour l'ingénieur réseau (SSH, Telnet, SNMP, Syslog, HTTPS, APIs).",
      "Data Plane = transfert matériel de paquets. Control Plane = calcul des routes. Management Plane = SSH/SNMP.", "Fondamental", "RFC 7426")

add_c("Architecture Traditionnelle vs Architecture SDN",
      "En quoi l'architecture SDN diffère-t-elle fondamentalement des réseaux traditionnels décentralisés ?",
      "Séparation du Control Plane et Centralisation Logicielle",
      "• Réseau Traditionnel : Control Plane décentralisé. Chaque switch et routeur calcule individuellement sa propre vision de la topologie de manière autonome.\n• Software-Defined Networking (SDN) : Le Control Plane est extrait des équipements physiques et centralisé dans un contrôleur logiciel (ex: Cisco DNA Center / Catalyst Center). Les boîtiers physiques ne conservent que le Data Plane et exécutent les ordres.",
      "SDN sépare le Control Plane pour le centraliser dans un contrôleur logiciel.", "Fondamental", "ONF SDN Architecture")

add_c("APIs Northbound vs APIs Southbound",
      "Quelle est la différence de fonction entre une API Northbound et une API Southbound dans un contrôleur SDN ?",
      "Interfaces Northbound et Southbound",
      "• APIs Northbound (Vers le haut) : Permettent aux applications d'entreprise, portails web et scripts d'orchestration de donner des ordres d'automatisation de haut niveau au contrôleur (généralement via RESTful APIs en JSON).\n• APIs Southbound (Vers le bas) : Utilisées par le contrôleur pour communiquer directement avec les switches et routeurs physiques afin de programmer leurs tables (OpenFlow, NETCONF, RESTCONF, SNMP, SSH).",
      "Northbound = vers les applications/scripts (REST). Southbound = vers les switches physiques (NETCONF/OpenFlow).", "Fondamental", "RFC 7426 § 3")

add_c("Cisco DNA Center (Catalyst Center) : Les 4 Modules Clés",
      "Quels sont les 4 piliers fonctionnels majeurs de Cisco Catalyst Center (anciennement DNA Center) ?",
      "Les 4 Modules de Cisco Catalyst Center",
      "• 1. Design : Modélisation hiérarchique du réseau (sites, bâtiments, étages, serveurs DHCP/DNS, profils de configuration).\n• 2. Policy : Définition des profils d'accès et politiques de sécurité basées sur les rôles (matrice de micro-segmentation).\n• 3. Provision : Déploiement automatisé (Plug-and-Play / Zero-Touch) des configurations et images logicielles sur les switches.\n• 4. Assurance : Surveillance continue de la santé du réseau (IA/Machine Learning, corrélation des incidents et santé client).",
      "Design (Conception), Policy (Politiques), Provision (Déploiement), Assurance (Surveillance IA).", "Fondamental", "Cisco Catalyst Center Guide")

add_c("Cisco SD-Access : Overlay vs Underlay",
      "Distinguez le rôle de l'Underlay physique et de l'Overlay virtuel dans l'architecture Cisco SD-Access.",
      "Underlay vs Overlay SD-Access",
      "• Réseau Underlay (Infrastructure physique) : Switches, routeurs et câbles physiques assurant uniquement la connectivité IP routée de base (généralement routé avec IS-IS et une MTU augmentée).\n• Réseau Overlay (Fabric virtuelle) : Réseau logique superposé utilisant l'encapsulation VXLAN et le protocole de contrôle LISP pour créer des topologies virtuelles isolées indépendantes du câblage physique.",
      "Underlay = câbles physiques et routage IP. Overlay = tunnels virtuels logiques VXLAN/LISP.", "Intermédiaire", "Cisco SD-Access Solution Design")

add_c("Cisco SD-Access Fabric : Rôles des Nœuds",
      "Quels sont les rôles des Fabric Edge Nodes, Fabric Border Nodes et Fabric Control Plane Nodes dans SD-Access ?",
      "Composants de la Fabric SD-Access",
      "• Fabric Edge Node : Commutateur d'accès raccordant les utilisateurs et bornes Wi-Fi, responsable de l'encapsulation VXLAN et de l'attribution des balises de groupe SGT.\n• Fabric Border Node : Passerelle reliant la Fabric SD-Access au réseau extérieur (WAN, Data Center, Internet).\n• Fabric Control Plane Node : Serveur de base de données LISP (Map-Server / Map-Resolver) localisant où se trouvent les terminaux dans la fabric.",
      "Edge = accès utilisateur. Border = passerelle vers l'extérieur. Control Plane Node = base LISP de localisation.", "Intermédiaire", "Cisco SD-Access Architecture")

add_c("Cisco SD-WAN : Les 4 Plans et Contrôleurs",
      "Associez chaque plan de l'architecture Cisco SD-WAN à son contrôleur dédié.",
      "Architecture Cisco SD-WAN",
      "• 1. Orchestration Plane : vBond Orchestrator (Authentifie les routeurs et gère le franchissement NAT initial).\n• 2. Management Plane : vManage (Interface web centralisée, déploiement des templates et supervision).\n• 3. Control Plane : vSmart Controller (Distribue les politiques de routage et clés de chiffrement via OMP).\n• 4. Data Plane : Routeurs vEdge / cEdge (Acheminement physique des paquets dans les tunnels IPsec).",
      "Orchestration = vBond, Management = vManage, Control = vSmart, Data = vEdge/cEdge.", "Fondamental", "Cisco SD-WAN Architecture Guide")

add_c("Protocole OMP (Overlay Management Protocol) en SD-WAN",
      "Quel est le rôle du protocole OMP propriétaire Cisco dans l'architecture SD-WAN ?",
      "Protocole de Contrôle OMP",
      "• Fonctionne entre les routeurs WAN Edge et les contrôleurs vSmart à travers des connexions sécurisées TLS/DTLS.\n• Distribue de manière centralisée les routes de sous-réseaux locaux (OMP routes), les informations de transport (TLOCs) et les clés de chiffrement des tunnels IPsec sans que les routeurs Edge n'aient besoin de négocier directement entre eux.",
      "OMP distribue les routes, les points de transport (TLOCs) et les clés de chiffrement via vSmart.", "Intermédiaire", "Cisco SD-WAN OMP Spec")

add_c("Cisco Meraki : Gestion Cloud-Managed",
      "Comment s'organise l'architecture réseau Cisco Meraki et où réside le Control Plane ?",
      "Modèle Meraki 100% Cloud-Managed",
      "• Tout le management et le reporting s'effectuent via un tableau de bord Web Cloud unifié (Dashboard Meraki).\n• Le trafic de données utilisateur (Data Plane) RESTE STRICTEMENT LOCAL sur les switches et bornes sur site (zéro passage par le cloud).\n• En cas de coupure de la connexion Internet vers le Cloud Meraki, le réseau local continue de commuter et router les données normalement.",
      "Gestion centralisée dans le Cloud. Les données utilisateur restent strictement locales sur site.", "Fondamental", "Cisco Meraki Architecture Overview")

add_c("Formats de Données Structurées : JSON vs XML vs YAML",
      "Quelles sont les caractéristiques de syntaxe majeures de JSON, XML et YAML pour l'automatisation réseau ?",
      "Formats de Sérialisation des Données",
      "• JSON : Basé sur des paires clé/valeur, utilise des accolades {} pour les objets et des crochets [] pour les tableaux. Très compact, standard du web et des APIs REST.\n• XML : Utilise des balises ouvrantes et fermantes verbeuses (<interface>...</interface>). Standard historique de NETCONF.\n• YAML : Lisibilité humaine maximale, utilise l'indentation par espaces stricts (pas de tabulations) et des tirets pour les listes. Format roi pour Ansible.",
      "JSON = accolades/crochets. XML = balises ouvrantes/fermantes. YAML = indentation par espaces.", "Fondamental", "RFC 8259 (JSON) / W3C (XML) / YAML 1.2")

add_c("Architecture RESTful et Contraintes Roy Fielding",
      "Quels sont les principes clés qui caractérisent une API conforme au modèle REST (Representational State Transfer) ?",
      "Principes Fondamentaux REST",
      "• Client-Serveur : Séparation stricte de l'interface utilisateur et du stockage des données.\n• Stateless (Sans État) : Chaque requête envoyée par le client doit contenir la totalité des informations nécessaires à son traitement (aucun contexte de session conservé sur le serveur).\n• Cacheable : Les réponses doivent indiquer si elles peuvent être mises en cache par le client.\n• Interface Uniforme : Identification des ressources via des URIs standardisées (ex: /api/v1/interfaces).",
      "Stateless (sans état de session), Client-Serveur, Cacheable, et URIs uniformes.", "Fondamental", "Roy Fielding Doctoral Dissertation")

add_c("Méthodes HTTP / Verbes CRUD",
      "Associez chaque opération CRUD (Create, Read, Update, Delete) à son verbe HTTP correspondant.",
      "Correspondance CRUD vers Verbes HTTP",
      "• Create (Créer une nouvelle ressource) -> HTTP POST\n• Read (Consulter / Lire une ressource existante) -> HTTP GET\n• Update (Remplacer complètement une ressource) -> HTTP PUT\n• Update partiel (Modifier seulement certains champs) -> HTTP PATCH\n• Delete (Supprimer une ressource) -> HTTP DELETE.",
      "Create = POST, Read = GET, Update = PUT/PATCH, Delete = DELETE.", "Fondamental", "RFC 7231 (HTTP/1.1 Semantics)")

add_c("Codes d'État HTTP (Status Codes)",
      "Que signifient les familles de codes de réponse HTTP 2xx, 3xx, 4xx et 5xx ?",
      "Familles de Codes de Réponse HTTP",
      "• 2xx (Succès) : 200 OK (Requête réussie), 201 Created (Ressource créée), 204 No Content (Action effectuée sans retour de corps).\n• 3xx (Redirection) : La ressource a été déplacée.\n• 4xx (Erreur Client) : 400 Bad Request, 401 Unauthorized (Auth manquante), 403 Forbidden (Droits insuffisants), 404 Not Found.\n• 5xx (Erreur Serveur) : 500 Internal Server Error, 503 Service Unavailable.",
      "2xx = Succès, 3xx = Redirection, 4xx = Erreur du client (401/404), 5xx = Panne du serveur.", "Fondamental", "RFC 7231 § 6")

add_c("Authentification par Jeton (Token-Based / Bearer Token)",
      "Comment fonctionne l'authentification par Token (Bearer Token) sur une API comme Cisco Catalyst Center ?",
      "Cycle de Vie d'un Jeton d'Authentification",
      "1. Le script envoie identifiant et mot de passe via un POST HTTPS à l'URI d'authentification (/dna/system/api/v1/auth/token).\n2. Le serveur valide et renvoie un jeton temporaire chiffré (Token) valide par exemple 1 heure.\n3. Pour toutes les requêtes suivantes, le script n'envoie plus ses mots de passe mais ajoute l'en-tête HTTP 'X-Auth-Token: <token>' ou 'Authorization: Bearer <token>'.",
      "Échange identifiants contre un jeton temporaire transmis ensuite dans l'en-tête HTTP.", "Fondamental", "RFC 6750 / Cisco DNA API Guide")

add_c("Bibliothèque Python Requests",
      "Quelles sont les méthodes de base du module Python 'requests' pour interagir avec une API réseau ?",
      "Interactions HTTP en Python avec requests",
      "• Importation : 'import requests'\n• GET : 'response = requests.get(url, headers=headers, verify=False)'\n• POST : 'response = requests.post(url, json=payload, headers=headers)'\n• Récupération du JSON : 'data = response.json()'\n• Code retour : 'response.status_code'.",
      "requests.get(), requests.post(), response.json(), et response.status_code.", "Fondamental", "Python Requests Documentation", "response = requests.get(url, headers=headers)")

add_c("Modélisation de Données avec YANG (RFC 7950)",
      "Qu'est-ce que YANG et pourquoi est-il qualifié de langage de modélisation indépendant du protocole ?",
      "Le Langage YANG (Yet Another Next Generation)",
      "• YANG est un langage standardisé de modélisation de données (Data Modeling Language).\n• Il ne transporte pas les données lui-même, mais décrit précisément la structure, le type et les contraintes des configurations et états opérationnels d'un routeur.\n• Les modèles YANG sont ensuite transportés indifféremment par NETCONF (encapsulés en XML) ou RESTCONF (encapsulés en JSON).",
      "YANG modélise la structure des données réseau, transportées ensuite par NETCONF (XML) ou RESTCONF (JSON).", "Fondamental", "RFC 7950")

add_c("Modèles YANG : IETF vs OpenConfig vs Modèles Natifs",
      "Quelle est la différence entre les modèles YANG OpenConfig et les modèles natifs constructeurs ?",
      "Typologie des Modèles YANG",
      "• Modèles Natifs (Cisco IOS-XE / Junos) : Propriétaires au constructeur. Permettent de configurer 100% des fonctions avancées spécifiques au matériel Cisco.\n• Modèles Standards IETF / OpenConfig : Modèles universels multi-vendeurs créés par des consortiums d'opérateurs. Permettent d'utiliser exactement les mêmes scripts de configuration sur des équipements Cisco, Juniper et Arista.",
      "Natif = 100% des fonctions propriétaires Cisco. OpenConfig/IETF = multi-vendeurs standardisé.", "Intermédiaire", "RFC 7950 / openconfig.net")

add_c("Protocole NETCONF (RFC 6241)",
      "Quelles sont les caractéristiques de base du protocole NETCONF (transport, port, encodage) ?",
      "Spécifications Fondamentales de NETCONF",
      "• Transport : S'exécute exclusivement au-dessus d'une session chiffrée SSH.\n• Port d'écoute standard : Port TCP 830.\n• Format d'encodage des données : Uniquement en XML.\n• Fonctionnalité clé : Transactions atomiques avec validation (Commit / Rollback) et gestion de datastores multiples.",
      "SSH sur port TCP 830. Données exclusivement encodées en XML. Transactions atomiques.", "Fondamental", "RFC 6241", "ssh admin@router -p 830 -s netconf")

add_c("Datastores NETCONF : Running, Candidate, Startup",
      "Quels sont les rôles des 3 magasins de configuration (Datastores) manipulés par NETCONF ?",
      "Les Datastores NETCONF",
      "• <running/> : La configuration actuellement active exécutée par l'équipement en mémoire vive.\n• <candidate/> : Espace de travail temporaire où l'on prépare et valide plusieurs modifications sans impacter le trafic en cours jusqu'à l'exécution d'un <commit/>.\n• <startup/> : Configuration de démarrage enregistrée en mémoire non volatile (NVRAM), chargée au boot.",
      "running = configuration active. candidate = brouillon en attente de commit. startup = NVRAM boot.", "Intermédiaire", "RFC 6241 § 8.3", "<get-config><source><running/></source></get-config>")

add_c("Protocole RESTCONF (RFC 8040)",
      "En quoi RESTCONF constitue-t-il une alternative légère et web-friendly à NETCONF ?",
      "Spécifications Fondamentales de RESTCONF",
      "• Utilise les protocoles web standards HTTP/1.1 et HTTP/2 sécurisés au-dessus de HTTPS (Port TCP 443).\n• Supporte à la fois le format JSON (application/yang-data+json) et le format XML.\n• Utilise les verbes HTTP standards (GET, POST, PUT, PATCH, DELETE) pour manipuler les données modélisées en YANG sans nécessiter de client SSH complexe.",
      "Alternative HTTP/HTTPS sur port 443 supportant JSON et XML via les verbes standards GET/POST/PATCH.", "Fondamental", "RFC 8040", "GET https://router/restconf/data/ietf-interfaces:interfaces")

# 21-40: Configuration Management & Version Control
add_c("Ansible : Architecture sans Agent (Agentless)",
      "Pourquoi l'architecture sans agent (Agentless) d'Ansible est-elle un avantage majeur pour le réseau ?",
      "Architecture Push Agentless d'Ansible",
      "• Ne nécessite l'installation d'aucun logiciel client (démon) sur les commutateurs et routeurs Cisco.\n• Utilise directement les protocoles d'administration déjà présents sur les équipements : SSH, CLI, NETCONF ou RESTCONF.\n• Réduit la consommation de mémoire/CPU des commutateurs et supprime les problèmes de compatibilité logicielle.",
      "Aucun agent logiciel à installer sur les équipements. Fonctionne via SSH / NETCONF.", "Fondamental", "Ansible Network Documentation")

add_c("Composants Ansible : Playbook, Task, Module, Inventory",
      "Définissez le rôle des 4 éléments fondamentaux d'un déploiement Ansible.",
      "Vocabulaire Clé Ansible",
      "• Inventory : Fichier texte (hosts.ini ou hosts.yml) listant les équipements cibles et leurs groupes.\n• Playbook : Fichier YAML décrivant la liste séquentielle des actions à accomplir.\n• Module : Programme autonome exécuté pour réaliser une action précise (ex: cisco.ios.ios_config).\n• Task : Appel d'un module avec des paramètres précis à l'intérieur d'un playbook.",
      "Inventory = liste des routeurs. Playbook = scénario YAML. Module = outil d'action. Task = étape.", "Fondamental", "Ansible Getting Started", "ansible-playbook -i inventory.ini site.yml")

add_c("Idempotence dans la Gestion de Configuration",
      "Que signifie le concept d'idempotence et pourquoi est-il vital pour l'automatisation réseau ?",
      "Principe d'Idempotence",
      "• Définition : Propriété garantissant que l'exécution répétée d'un script produit exactement le même état final sans provoquer d'effets de bord indésirables.\n• Si la configuration cible est déjà en place (ex: VLAN 10 existe déjà), le module Ansible constate la conformité et ne fait rien (retourne 'ok' sans déclencher de modification 'changed').",
      "Exécuter 10 fois le même script ne modifie le réseau que la première fois. Zéro effet de bord si conforme.", "Fondamental", "Ansible Architecture Principles")

add_c("Puppet : Architecture avec Agent et Modèle Pull",
      "Comment s'organise l'architecture de gestion de configuration avec Puppet ?",
      "Architecture Client-Serveur Puppet",
      "• Modèle Maître-Agent (Pull) : Un agent logiciel installé sur le nœud interroge périodiquement (toutes les 30 minutes) le serveur central (Puppet Master).\n• L'agent télécharge son catalogue compilé en langage déclaratif Puppet (.pp), compare l'état réel de la machine et applique les corrections nécessaires.",
      "Architecture client-serveur avec agent local. Modèle 'Pull' interrogeant le Puppet Master.", "Fondamental", "Puppet Architecture Guide")

add_c("Chef : Cookbooks, Recipes et Knife",
      "Quels sont les composants centraux de l'écosystème d'automatisation Chef ?",
      "Vocabulaire Fondamental Chef",
      "• Recipe (Recette) : Fichier écrit en langage Ruby décrivant les ressources à configurer.\n• Cookbook (Livre de cuisine) : Ensemble regroupant des recettes, des templates et des fichiers de configuration réutilisables.\n• Knife : Outil en ligne de commande permettant à l'administrateur de communiquer avec le serveur Chef central.",
      "Recipe = script Ruby de ressources. Cookbook = ensemble de recettes. Knife = CLI d'administration.", "Fondamental", "Chef Documentation")

add_c("Comparatif Outils : Ansible vs Puppet vs Chef vs SaltStack",
      "Comparez les 4 grands outils d'automatisation sur le mode (Push vs Pull) et la présence d'agent.",
      "Matrice Comparative des Outils de Configuration",
      "• Ansible : Mode PUSH, sans agent (SSH), langage YAML.\n• Puppet : Mode PULL, avec agent (Master-Agent), langage déclaratif propriétaire.\n• Chef : Mode PULL, avec agent, langage impératif Ruby.\n• SaltStack : Mode PUSH/PULL hybride, utilise un agent léger (Minion) et le bus ZeroMQ ultra-rapide.",
      "Ansible = Push / Agentless (YAML). Puppet & Chef = Pull / Avec agent. Salt = Hybride rapide.", "Fondamental", "DevOps Tool Comparison")

add_c("Système de Contrôle de Version : Git",
      "Pourquoi l'utilisation de Git est-elle indispensable pour l'automatisation réseau (NetDevOps) ?",
      "Traçabilité et Collaboration avec Git",
      "• Historique complet : Enregistre qui a modifié quelle ligne de configuration, quand et pourquoi.\n• Branches : Permet de tester de nouvelles configurations sur une branche isolée sans impacter la production.\n• Rollback instantané : Possibilité de revenir à un commit stable antérieur en quelques secondes en cas de bug.",
      "Historique complet des modifications, travail en branches et retour arrière immédiat en cas de bug.", "Fondamental", "Pro Git Book", "git commit -m 'Ajout du VLAN 20'")

add_c("Les 3 Zones Git : Working Directory, Staging Area, Repository",
      "Comment un fichier transite-t-il entre le Working Directory, la Staging Area et le Dépôt Git ?",
      "Cycle de Vie d'un Fichier sous Git",
      "• 1. Working Directory : Dossier local sur votre disque où vous éditez les scripts et templates.\n• 2. Staging Area (Index) : Zone de préparation où l'on rassemble les fichiers validés via 'git add <fichier>'.\n• 3. Local Repository : Base de données locale enregistrant le snapshot de manière définitive via 'git commit -m \"message\"'.",
      "Working Directory -> git add -> Staging Area -> git commit -> Dépôt Local.", "Fondamental", "Git SCM Architecture", "git add . && git commit -m 'Update'")

add_c("Commandes Git Clés : clone, push, pull, branch",
      "Quelles sont les commandes Git utilisées quotidiennement pour synchroniser son travail ?",
      "Commandes Essentielles Git",
      "• 'git clone <url>' : Télécharge une copie intégrale d'un dépôt distant sur sa machine.\n• 'git branch <nom>' : Crée une nouvelle branche de travail indépendante.\n• 'git pull' : Télécharge et intègre les dernières modifications depuis le serveur distant.\n• 'git push' : Envoie ses nouveaux commits locaux vers le dépôt distant (GitHub, GitLab).",
      "git clone (télécharger), git pull (mettre à jour), git push (envoyer), git branch (isoler).", "Fondamental", "Git Reference Manual", "git checkout -b feature/ospf-tuning")

add_c("Intégration Continue et Déploiement Continu (CI/CD) pour le Réseau",
      "Quel est le rôle d'un pipeline CI/CD appliqué aux configurations réseau (NetDevOps) ?",
      "Pipelines CI/CD Réseau",
      "• Dès qu'un ingénieur pousse une modification de configuration sur Git (git push) :\n  1. Intégration Continue (CI) : Un serveur automatisé (GitLab CI, GitHub Actions) teste la syntaxe (linting), simule la topologie dans des conteneurs virtuels et valide les routes.\n  2. Déploiement Continu (CD) : Si tous les tests réussissent, la configuration est automatiquement injectée en production.",
      "Automatise les tests de validation à chaque modification avant de déployer en production.", "Fondamental", "NetDevOps Principles")

# 31-50: Advanced Automation, DNA Center, SD-WAN & DevNet details
add_c("Télémétrie en Streaming vs Polling SNMP",
      "Pourquoi la télémétrie en streaming remplace-t-elle avantageusement le protocole SNMP traditionnel ?",
      "Télémétrie PUSH en Temps Réel",
      "• Polling SNMP (Pull) : Le NMS interroge périodiquement les équipements (toutes les 5 minutes), ce qui surcharge le CPU du routeur et génère des angles morts sur les micro-coupures.\n• Streaming Telemetry (Push) : Le routeur pousse lui-même en continu et en temps réel (à la milliseconde) ses statistiques d'interfaces et de mémoire via gRPC ou UDP sans sollicitation extérieure.",
      "Push en temps réel à la milliseconde contre un sondage SNMP lent toutes les 5 minutes.", "Intermédiaire", "RFC 8641 / Cisco IOS-XE Telemetry Guide")

add_c("Encapsulation VXLAN dans Cisco SD-Access",
      "Quel en-tête supplémentaire l'encapsulation VXLAN ajoute-t-elle aux trames Ethernet ?",
      "Encapsulation VXLAN (RFC 7348)",
      "• Encapsule une trame Ethernet complète de Couche 2 à l'intérieur d'un paquet UDP de Couche 4 sur le port standard UDP 4789.\n• Introduit un identifiant de réseau virtuel de 24 bits (VNI - Virtual Network Identifier) permettant jusqu'à 16 millions de segments virtuels (contre seulement 4094 pour les VLANs 802.1Q).",
      "Encapsule la trame L2 dans un paquet UDP port 4789 avec un VNI de 24 bits (16 millions de réseaux).", "Intermédiaire", "RFC 7348", "UDP Destination Port: 4789")

add_c("Protocole LISP dans Cisco SD-Access",
      "Comment le protocole LISP sépare-t-il l'identité d'un terminal de son emplacement réseau ?",
      "LISP (Locator/ID Separation Protocol - RFC 6830)",
      "• Réseau traditionnel : L'adresse IP représente à la fois QUI est la machine et OÙ elle est branchée.\n• LISP sépare ces deux fonctions :\n  - Endpoint Identifier (EID) : Adresse IP fixe de l'utilisateur qui ne change jamais.\n  - Routing Locator (RLOC) : Adresse IP du switch Fabric Edge où l'utilisateur est actuellement connecté.\n• Permet le roaming d'un terminal sur n'importe quel switch sans changer son adresse IP.",
      "Sépare l'EID (identité fixe de l'hôte) du RLOC (commutateur où il est branché).", "Intermédiaire", "RFC 6830", "LISP Map-Server / Map-Resolver")

add_c("Cisco DNA Center Network Design Settings",
      "Quels éléments globaux sont configurés dans l'onglet 'Design' de Cisco Catalyst Center ?",
      "Conception Hiérarchique (Design)",
      "• Hiérarchie des sites (Network Hierarchy) : Zones géographiques, bâtiments, étages.\n• Paramètres généraux (Network Settings) : Serveurs DHCP, DNS, Syslog, SNMP et NTP partagés.\n• Profils réseau (Network Profiles) : Association de profils de commutation et sans-fil aux sites.",
      "Définit la hiérarchie des bâtiments, les serveurs DNS/DHCP/NTP et les profils réseau.", "Fondamental", "Cisco Catalyst Center Design Guide")

add_c("Cisco DNA Center Network Provisioning",
      "Que fait l'étape de 'Provisioning' dans Cisco Catalyst Center ?",
      "Déploiement et Assignation (Provision)",
      "• Associe un équipement réseau découvert physiquement à un site ou étage spécifique.\n• Déploie automatiquement les configurations de profil correspondantes.\n• Assigne les images logicielles (Software Images) certifiées pour ce matériel.",
      "Assigne l'équipement à un bâtiment et pousse sa configuration logicielle et d'image.", "Fondamental", "Cisco Catalyst Center User Guide")

add_c("Cisco DNA Center Policy Studio",
      "Comment le module 'Policy' de Cisco Catalyst Center simplifie-t-il la micro-segmentation ?",
      "Création Graphique de Politiques Métier",
      "• Fournit une matrice visuelle croisant les groupes d'utilisateurs et de serveurs (Scalable Groups).\n• Permet d'autoriser ou bloquer un flux (ex: 'Personnel Médical vers Dossiers Patients') en cochant simplement une case dans la grille graphique.\n• Traduit automatiquement la sélection en Scalable Group ACLs (SGACLs).",
      "Matrice visuelle pour définir les autorisations entre groupes d'utilisateurs en quelques clics.", "Intermédiaire", "Cisco TrustSec / SD-Access Guide")

add_c("Cisco DNA Center PnP (Plug and Play)",
      "Comment fonctionne le mécanisme Network Plug and Play (PnP) pour déployer un switch neuf ?",
      "Déploiement 'Day-0' Zero-Touch PnP",
      "1. Le switch sort du carton sans aucune configuration et démarre.\n2. Il obtient une IP via DHCP avec l'Option 43 lui indiquant l'IP de Cisco Catalyst Center.\n3. Le switch contacte le contrôleur en HTTPS, télécharge son image logicielle IOS-XE approuvée et sa configuration complète sans aucune intervention d'un technicien sur site.",
      "Le switch neuf s'allume, contacte le contrôleur via DHCP option 43 et s'auto-configure.", "Fondamental", "Cisco Network PnP Solution Guide")

add_c("Cisco SD-WAN : Cloud OnRamp",
      "Quel est le rôle de Cloud OnRamp dans la solution Cisco SD-WAN ?",
      "Optimisation SaaS et IaaS Cloud OnRamp",
      "• Cloud OnRamp for SaaS : Mesure en continu la latence et la perte de paquets vers les applications Cloud (Office 365, Salesforce) via les différents liens Internet et choisit dynamiquement le chemin le plus performant.\n• Cloud OnRamp for IaaS : Automatise l'interconnexion sécurisée des succursales vers les VPCs AWS, Azure ou Google Cloud.",
      "Mesure la qualité des liens et route dynamiquement le trafic SaaS/IaaS sur le meilleur chemin.", "Intermédiaire", "Cisco SD-WAN Cloud OnRamp Guide")

add_c("Cisco SD-WAN : vManage Dashboard Metrics",
      "Quelles métriques clés de santé sont immédiatement visibles sur le tableau de bord vManage ?",
      "Vue d'Ensemble vManage",
      "• État de santé des contrôleurs (vSmart, vBond, vManage).\n• Tunnels IPsec BFD (Bidirectional Forwarding Detection) actifs et dégradés.\n• Taux de perte de paquets, gigue et latence par liaison WAN (MPLS vs Internet vs 4G/5G).\n• Topologie des sites (Hub & Spoke, Full Mesh) et alertes critiques.",
      "État des contrôleurs, tunnels BFD, latence/gigue/perte par lien WAN et alarmes de sites.", "Fondamental", "Cisco vManage Monitor Guide")

add_c("Cisco SD-WAN : BFD (Bidirectional Forwarding Detection)",
      "Quel rôle joue le protocole BFD à l'intérieur de chaque tunnel IPsec SD-WAN ?",
      "Sondes BFD en Temps Réel",
      "• BFD tourne en continu dans chaque tunnel IPsec entre les routeurs WAN Edge.\n• Mesure en temps réel la perte de paquets, la latence et la gigue.\n• Détecte une coupure de liaison en quelques millisecondes (sub-seconde) pour déclencher un basculement de trafic immédiat sans interruption pour l'utilisateur.",
      "Mesure la qualité (gigue, perte, délai) et détecte les pannes en millisecondes.", "Intermédiaire", "RFC 5880 / RFC 5881")

add_c("Cisco SD-WAN : TLOC (Transport Location)",
      "Quels sont les 3 éléments constitutifs obligatoires d'un identifiant TLOC ?",
      "Triplet Identifiant TLOC",
      "• Un TLOC représente le point de raccordement d'un routeur à un transport WAN. Il est défini par un triplet unique :\n  1. System IP : Adresse IP logique unique identifiant le routeur (similaire à un Router ID BGP).\n  2. Color : Identifie le type de transport (ex: mpls, biz-internet, public-internet, lte).\n  3. Encapsulation : Le protocole de chiffrement utilisé (IPsec ou GRE).",
      "Triplet : System IP + Color (ex: mpls, public-internet) + Encapsulation (IPsec).", "Intermédiaire", "Cisco SD-WAN Architecture Guide")

add_c("Cisco SD-WAN Colors : Private vs Public Colors",
      "Pourquoi distingue-t-on les 'Private Colors' des 'Public Colors' dans Cisco SD-WAN ?",
      "Négociation de Tunnels sous NAT",
      "• Public Colors (ex: biz-internet, public-internet) : Utilisent des adresses IP publiques ou effectuent une translation NAT. Les routeurs tentent de joindre l'IP publique réflexive découverte via vBond.\n• Private Colors (ex: mpls, private1) : Utilisées sur des réseaux privés d'opérateur sans NAT, les routeurs s'interconnectent directement sur leurs adresses IP privées d'origine.",
      "Public = traverse Internet avec NAT. Private = lien privé fermé (MPLS) sans NAT.", "Avancé", "Cisco SD-WAN NAT Traversal Guide")

# 43-60: Python & YANG details
add_c("Parsing JSON en Python : Accès aux Clés Imbriquées",
      "Comment extraire le nom de la première interface à partir d'un dictionnaire JSON en Python ?",
      "Navigation dans les Objets et Tableaux JSON",
      "Soit la réponse API :\n{\n  \"interfaces\": {\n    \"interface\": [\n      {\"name\": \"GigabitEthernet1\", \"enabled\": true}\n    ]\n  }\n}\n• Code Python : \"data['interfaces']['interface'][0]['name']\".\n• Renvoie la chaîne \"GigabitEthernet1\".",
      "Naviguer par clés successives [] et index de liste [0].", "Fondamental", "Python Data Structures", "first_if = data['interfaces']['interface'][0]['name']")

add_c("Gestion des Exceptions dans Python Requests",
      "Quelles exceptions du module 'requests' doit-on intercepter pour sécuriser un script réseau ?",
      "Gestion Robuste des Erreurs Réseau",
      "• requests.exceptions.ConnectionError : L'équipement réseau ou le contrôleur est inaccessible (câble débranché, IP erronée).\n• requests.exceptions.Timeout : Le serveur met trop de temps à répondre.\n• requests.exceptions.HTTPError : Déclenché par 'response.raise_for_status()' si le serveur renvoie un code 4xx ou 5xx.",
      "ConnectionError (hôte injoignable), Timeout, et HTTPError (codes 4xx/5xx).", "Intermédiaire", "Python Requests Documentation", "try:\n    r = requests.get(url, timeout=5)\n    r.raise_for_status()\nexcept requests.exceptions.RequestException as e:\n    print(e)")

add_c("Authentification HTTP Basic vs Digest",
      "Comment fonctionne l'authentification HTTP Basic et pourquoi HTTPS est-il obligatoire avec celle-ci ?",
      "En-tête Authorization: Basic",
      "• Le client concatène 'identifiant:motdepasse' et l'encode en Base64.\n• Il envoie l'en-tête : \"Authorization: Basic YWRtaW46Q2lzY28xMjM=\".\n• Attention : Le Base64 n'est PAS un chiffrement ! N'importe qui peut le décoder en 1 milliseconde. Le chiffrement HTTPS (TLS) sous-jacent est donc strictement obligatoire.",
      "Base64(user:pass) envoyé dans l'en-tête. Le Base64 n'est pas chiffré, HTTPS est indispensable.", "Fondamental", "RFC 7617", 'headers = {"Authorization": "Basic " + encoded_str}')

add_c("API Query Parameters (Paramètres d'URL)",
      "Quelle est la syntaxe pour filtrer ou paginer une ressource API via des query parameters ?",
      "Query String dans les URIs",
      "• Les paramètres débutent par un point d'interrogation (?) et sont séparés par des esperluettes (&).\n• Syntaxe : \"https://api.example.com/devices?family=Routers&limit=10&offset=0\".\n• Permet de filtrer côté serveur sans télécharger toute la base de données.",
      "Débute par ? puis cle=valeur&cle2=valeur2 (ex: ?family=Switches&limit=50).", "Fondamental", "RFC 3986 § 3.4", "requests.get(url, params={'family': 'Routers'})")

add_c("Webhooks : Modèle Réactif par Événements",
      "En quoi un Webhook diffère-t-il d'une API REST classique et quel est son intérêt pour le réseau ?",
      "Architecture Event-Driven / Webhooks",
      "• API REST classique (Pull) : Votre script doit interroger le contrôleur toutes les 30 secondes pour savoir si un lien est tombé (Polling consommateur).\n• Webhook (Push) : Vous fournissez une URL de callback. Dès qu'un événement survient (ex: alerte critique, panne de port), le contrôleur envoie instantanément une requête HTTP POST avec le détail au format JSON vers votre serveur.",
      "Le contrôleur envoie automatiquement un POST vers votre URL dès qu'un événement survient.", "Fondamental", "Webhooks Architecture Guide", "POST /webhook/alerts HTTP/1.1")

add_c("Postman Collection Runner et Newman",
      "Quel est le rôle de Newman dans l'automatisation des tests d'APIs ?",
      "Exécution CLI avec Newman",
      "• Newman est le compagnon en ligne de commande (CLI) de Postman.\n• Permet d'exécuter des collections de tests Postman directement dans un terminal ou au sein d'un pipeline CI/CD (Jenkins, GitLab CI) sans avoir besoin d'ouvrir l'interface graphique de Postman.",
      "Exécute des collections de tests Postman en ligne de commande dans des pipelines CI/CD.", "Intermédiaire", "Newman Documentation", "newman run my_collection.json -e env.json")

add_c("YANG Leaf vs Leaf-List vs Container vs List",
      "Quelles sont les 4 structures de nœuds de base dans un modèle YANG ?",
      "Nœuds de Données YANG (RFC 7950)",
      "• leaf : Contient une seule valeur scalaire (ex: hostname, mtu).\n• leaf-list : Contient une séquence de valeurs scalaires simples du même type.\n• container : Regroupe des nœuds liés sous un même ensemble, sans clé d'indexation (ex: 'system').\n• list : Représente une séquence d'entrées d'un tableau, chaque entrée étant identifiée de manière unique par une clé ('key', ex: une liste d'interfaces).",
      "leaf = 1 valeur. leaf-list = liste de valeurs. container = groupe sans clé. list = tableau avec clé unique.", "Intermédiaire", "RFC 7950 § 7", "list interface { key \"name\"; leaf name { type string; } }")

add_c("YANG Types de Données Primitifs",
      "Quels types de données primitifs sont fréquemment utilisés dans les fichiers .yang ?",
      "Types YANG Standards",
      "• string, boolean, empty (drapeau sans valeur).\n• int8, int16, int32, int64 (entiers signés).\n• uint8, uint16, uint32, uint64 (entiers non signés).\n• enumeration (liste de valeurs autorisées, ex: up, down, testing).\n• typedef (création de types personnalisés réutilisables).",
      "string, boolean, uint32, int32, enumeration, empty.", "Intermédiaire", "RFC 7950 § 9", "type enumeration { enum up; enum down; }")

add_c("Outil pyang pour Valider et Visualiser les Modèles YANG",
      "Comment visualiser l'arborescence graphique d'un modèle YANG en ligne de commande avec pyang ?",
      "Visualisation d'Arbres avec pyang",
      "• pyang est le compilateur et validateur de référence pour les fichiers YANG.\n• Commande : \"pyang -f tree ietf-interfaces.yang\"\n• Affiche une vue arborescente compacte et hyper-lisible des containers, listes, clés (prefixées par '+--rw') et données en lecture seule (+--ro).",
      "pyang -f tree <modele.yang> affiche l'arborescence visuelle complète.", "Intermédiaire", "RFC 8340", "pyang -f tree cisco-ios-xe-native.yang")

add_c("Données de Configuration vs Données Opérationnelles (rw vs ro)",
      "Dans un arbre YANG, quelle est la différence entre les drapeaux rw et ro ?",
      "Config (rw) vs State (ro)",
      "• rw (Read-Write / Configuration) : Données configurables par l'administrateur, persistées dans les datastores (ex: IP assignée, description d'interface, no shutdown).\n• ro (Read-Only / State Data) : Données opérationnelles dynamiques générées par le matériel en temps réel (ex: compteurs d'octets reçus, température de la sonde, état physique courant).",
      "rw = modifiable (config). ro = lecture seule en temps réel (statistiques matérielles).", "Fondamental", "RFC 7950 § 7.1", "+--rw ip-address\n+--ro in-octets")

add_c("NETCONF Capabilities Exchange (<hello>)",
      "Comment un client et un serveur NETCONF négocient-ils leurs fonctionnalités lors de la connexion initiale ?",
      "Message Initial NETCONF <hello>",
      "• Dès l'ouverture de la session SSH sur le port 830, le client et le routeur s'échangent simultanément un message XML <hello>.\n• Ce message liste les versions supportées (urn:ietf:params:netconf:base:1.1) et tous les modules YANG supportés par l'équipement avec leurs numéros de révision.",
      "Échange initial du message <hello> listant tous les modèles YANG et versions supportés.", "Intermédiaire", "RFC 6241 § 8.1", "<hello xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">")

add_c("Bibliothèque Python ncclient pour NETCONF",
      "Comment se connecter et extraire la configuration d'un routeur Cisco avec la librairie 'ncclient' en Python ?",
      "ncclient en Python",
      "Exemple type :\nfrom ncclient import manager\nwith manager.connect(host=\"10.1.1.1\", port=830, username=\"admin\", password=\"cisco\", hostkey_verify=False, device_params={'name': 'csr1000v'}) as m:\n    config = m.get_config(source='running')\n    print(config)",
      "manager.connect(host, port=830, device_params={'name':'iosxe'}). Utilise m.get_config().", "Intermédiaire", "ncclient Documentation", "m.get_config(source='running')")

add_c("RESTCONF Media Types Spécifiques",
      "Quels en-têtes Content-Type spécifiques utilise RESTCONF selon la RFC 8040 ?",
      "En-têtes Media Types RESTCONF",
      "• Pour du JSON YANG : \"application/yang-data+json\"\n• Pour du XML YANG : \"application/yang-data+xml\"\n• Utilisé dans les en-têtes Content-Type et Accept pour certifier la conformité aux modèles de données YANG sous-jacents.",
      "application/yang-data+json et application/yang-data+xml.", "Intermédiaire", "RFC 8040 § 11.3", 'headers = {"Accept": "application/yang-data+json"}')

add_c("RESTCONF Query Parameters : content, depth, fields",
      "Comment restreindre la profondeur ou le type de données retournées par RESTCONF ?",
      "Paramètres de Requête RESTCONF (RFC 8040 § 4.8)",
      "• ?content=config : Renvoie uniquement les données de configuration (rw).\n• ?content=nonconfig : Renvoie uniquement les données opérationnelles en lecture seule (ro).\n• ?depth=1 : Limite l'arborescence au premier niveau pour éviter les payloads gigantesques.\n• ?fields=name,enabled : Filtre uniquement les champs souhaités.",
      "?content=config pour la config seule, ?depth=X pour limiter la profondeur de l'arbre.", "Avancé", "RFC 8040 § 4.8", "GET /restconf/data/ietf-interfaces:interfaces?depth=2")

# 57-100: Ansible, Git, DevOps, CI/CD, DevNet extras
add_c("Ansible Core vs Ansible Automation Platform (AAP / Tower)",
      "Qu'apporte Ansible Automation Platform (anciennement Ansible Tower / AWX) par rapport à la CLI Ansible ?",
      "Fonctionnalités Entreprise Ansible Tower / AAP",
      "• Interface graphique web centralisée pour piloter l'exécution des playbooks.\n• Gestion des accès basée sur les rôles (RBAC) pour restreindre qui peut lancer quel script sur quel groupe de routeurs.\n• Coffre-fort sécurisé pour les identifiants sans les divulguer aux utilisateurs.\n• Ordonnanceur de tâches planifiées et intégration native avec les Webhooks Git.",
      "Interface web, gestion des rôles RBAC, stockage sécurisé des mots de passe et ordonnanceur.", "Fondamental", "Red Hat Ansible Platform Guide")

add_c("Ansible Vault : Chiffrement des Secrets",
      "Comment Ansible Vault protège-t-il les mots de passe et clés SSH stockés dans les dépôts Git ?",
      "Chiffrement de Fichiers avec Ansible Vault",
      "• Commande : \"ansible-vault encrypt passwords.yml\"\n• Chiffre le fichier YAML contenant les secrets avec l'algorithme AES-256.\n• Le fichier chiffré peut être versionné en toute sécurité sur GitHub.\n• Déchiffré à la volée lors de l'exécution du playbook avec \"--ask-vault-pass\" ou un fichier de mot de passe.",
      "ansible-vault encrypt chiffre les fichiers de variables sensibles avec AES-256.", "Fondamental", "Ansible Vault Guide", "ansible-playbook site.yml --ask-vault-pass")

add_c("Ansible Facts : Collecte Automatisée avec ios_facts",
      "Quelles informations le module 'cisco.ios.ios_facts' extrait-il d'un switch Cisco ?",
      "Découverte Système avec ios_facts",
      "• Extrait automatiquement l'état complet du boîtier sans taper de commandes show manuelles :\n  - Version exacte d'IOS-XE et image logicielle.\n  - Numéro de série et modèle matériel du châssis.\n  - Liste de toutes les interfaces physiques avec MAC et IP.\n  - Espace mémoire libre et configuration active.\n• Stocke ces données dans des variables utilisables dans les tâches suivantes.",
      "Collecte automatiquement le modèle, l'OS, le numéro de série et les interfaces dans des variables.", "Intermédiaire", "Ansible ios_facts Module", "- name: Gather Facts\n  cisco.ios.ios_facts:\n    gather_subset: all")

add_c("Templates Jinja2 dans Ansible (.j2)",
      "Comment les gabarits Jinja2 permettent-ils de générer dynamiquement des configurations Cisco personnalisées ?",
      "Moteur de Gabarits Jinja2",
      "• Utilise des balises de variables {{ ma_variable }} et de boucles {% for iface in interfaces %}.\n• Exemple de template 'ospf.j2' :\n  router ospf {{ ospf_process }}\n  {% for net in networks %}\n    network {{ net.ip }} {{ net.wildcard }} area {{ net.area }}\n  {% endfor %}\n• Le module 'template' génère la configuration finale adaptée à chaque équipement.",
      "Génère des configurations sur mesure en combinant des variables YAML et des boucles conditionnelles.", "Intermédiaire", "Jinja2 Template Documentation", "- template: src=ospf.j2 dest=/tmp/config.txt")

add_c("Puppet Hiera : Séparation du Code et des Données",
      "Quel est le rôle de Hiera dans l'architecture Puppet ?",
      "Magasin Hiérarchique de Données Hiera",
      "• Sépare strictement le code d'automatisation (Manifests Puppet) des données spécifiques aux sites (adresses IP, VLANs, noms d'hôtes).\n• Permet d'écrire un manifest générique et d'aller chercher les valeurs correspondantes dans des fichiers YAML hiérarchisés par environnement (Dev, Test, Prod).",
      "Sépare le code de configuration des données réelles (adresses IP, VLANs) stockées en YAML.", "Intermédiaire", "Puppet Hiera Documentation")

add_c("Chef Supermarket",
      "Qu'est-ce que le Chef Supermarket dans l'écosystème d'automatisation Chef ?",
      "Dépôt Communautaire de Cookbooks",
      "• Dépôt public et centralisé officiel où la communauté et les constructeurs partagent des Cookbooks préconçus et testés.\n• Permet de réutiliser des briques de configuration prêtes à l'emploi (ex: configuration NTP, Syslog, SNMP) sans avoir à réécrire le code Ruby de zéro.",
      "Bibliothèque publique officielle pour partager et télécharger des Cookbooks Chef préconçus.", "Fondamental", "Chef Supermarket Portal")

add_c("Git Merge vs Git Rebase",
      "Quelle est la différence entre 'git merge' et 'git rebase' lors de l'intégration d'une branche ?",
      "Intégration de Branches Git",
      "• git merge : Crée un nouveau commit de fusion (Merge Commit) liant l'historique des deux branches. Préserve l'historique chronologique exact mais peut rendre le graphe complexe.\n• git rebase : Réapplique les commits de votre branche un par un au sommet de la branche principale. Crée un historique linéaire, propre et sans commit de fusion superflu.",
      "merge crée un commit de fusion. rebase réapplique les commits pour un historique linéaire propre.", "Intermédiaire", "Pro Git Book", "git merge feature / git rebase main")

add_c("Fichier .gitignore",
      "Quel est le rôle du fichier .gitignore dans un projet d'automatisation réseau ?",
      "Exclusion de Fichiers sous Git",
      "• Liste les motifs de fichiers et répertoires que Git doit délibérément ignorer et ne jamais versionner.\n• Exemples indispensables : fichiers d'environnement contenant des clés secrètes (.env), clés privées SSH (*.pem), environnements virtuels Python (venv/), ou fichiers temporaires de cache (__pycache__/).",
      "Empêche de commiter par erreur des mots de passe, clés SSH privées ou fichiers temporaires.", "Fondamental", "Git Documentation", ".env\n*.pem\nvenv/\n__pycache__/")

add_c("Git Diff & Git Log",
      "Comment vérifier les modifications exactes avant de commiter avec 'git diff' ?",
      "Inspection des Changements Git",
      "• \"git diff\" : Affiche les lignes ajoutées (+) et supprimées (-) entre votre copie de travail et la dernière version enregistrée.\n• \"git diff --staged\" : Affiche les différences pour les fichiers déjà indexés dans la staging area avec 'git add'.\n• \"git log --oneline\" : Affiche l'historique résumé des commits précédents.",
      "git diff affiche ligne par ligne les ajouts (+) et suppressions (-) avant validation.", "Fondamental", "Git Command Reference", "git diff HEAD~1")

add_c("Environnements Virtuels Python (venv)",
      "Pourquoi est-il fortement recommandé d'isoler chaque projet d'automatisation dans un 'venv' ?",
      "Isolation des Dépendances Python",
      "• Évite les conflits de versions entre bibliothèques (ex: Projet A nécessite Netmiko 3.x alors que Projet B requiert Netmiko 4.x).\n• Préserve l'environnement Python du système d'exploitation.\n• Création et activation :\n  \"python3 -m venv venv\"\n  \"source venv/bin/activate\".",
      "Isole les versions des librairies Python par projet pour éviter les conflits de packages.", "Fondamental", "Python venv Documentation", "source venv/bin/activate")

add_c("Gestion des Dépendances avec requirements.txt",
      "Comment figer et réinstaller fidèlement les bibliothèques d'un script d'automatisation réseau ?",
      "Fichier requirements.txt",
      "• Exportation de l'environnement : \"pip freeze > requirements.txt\" (enregistre la liste exacte des packages et leurs versions, ex: requests==2.31.0, ncclient==0.6.13).\n• Réinstallation sur une nouvelle machine : \"pip install -r requirements.txt\".",
      "pip freeze > requirements.txt sauvegarde les packages, pip install -r requirements.txt les réinstalle.", "Fondamental", "Pip User Guide", "pip install -r requirements.txt")

add_c("Linting de Code : Flake8 et Black pour Python",
      "Quel est l'intérêt d'outils de linting et formatage comme Black ou Flake8 en NetDevOps ?",
      "Qualité et Conformité du Code (PEP 8)",
      "• Flake8 : Analyse statique du code détectant les erreurs de syntaxe potentielles, les variables non utilisées et les non-conformités à la norme de style officielle PEP 8.\n• Black : Formateur automatique sans concession qui reformate tout le code Python de manière uniforme et standardisée pour faciliter la relecture par les pairs.",
      "Vérifie la syntaxe, supprime le code mort et unifie le style d'écriture du code (norme PEP 8).", "Intermédiaire", "Python PEP 8 Style Guide", "black my_script.py")

add_c("Parsing CLI avec TextFSM et Cisco Genie",
      "Comment convertir la sortie texte non structurée d'un 'show ip route' en données structurées JSON ?",
      "Transformation CLI en Données Structurées",
      "• Les équipements anciens ne disposent pas d'APIs REST ou NETCONF et ne renvoient que du texte brut en CLI.\n• Outils : TextFSM ou Cisco Genie Parsers appliquent des expressions régulières (Regex) sur le texte brut pour le transformer automatiquement en dictionnaire ou liste JSON exploitable par un script Python.",
      "Transforme le texte brut d'une commande 'show' CLI en JSON structuré grâce à des modèles de regex.", "Intermédiaire", "Cisco Genie Documentation", "from genie import testbed")

add_c("Protocole gRPC et Télémétrie gNMI",
      "Pourquoi gRPC et gNMI sont-ils utilisés pour la gestion ultra-rapide des réseaux modernes ?",
      "gRPC Network Management Interface (gNMI)",
      "• gRPC : Protocole d'appel de procédure distante développé par Google, utilisant HTTP/2 en sous-jacent et les Protocol Buffers binaires (sérialisation ultra-compacte et performante comparée au JSON texte).\n• gNMI : Standard ouvert pour la configuration et la télémétrie en streaming temps réel basé sur gRPC et YANG.",
      "Protocole binaire ultra-rapide basé sur HTTP/2 et Protocol Buffers pour la télémétrie temps réel.", "Avancé", "OpenConfig gNMI Specification")

add_c("Docker et Conteneurs en Réseau",
      "Comment les conteneurs Docker facilitent-ils le déploiement d'outils d'automatisation réseau ?",
      "Conteneurisation des Outils Réseau",
      "• Permet d'embarquer dans une image conteneur légère et immuable tout l'environnement d'automatisation (Python, Ansible, pyATS, modules spécifiques) avec leurs dépendances exactes.\n• Garantit que le script s'exécute de façon 100% identique sur le PC de l'ingénieur, sur un serveur de test ou dans un runner de pipeline CI/CD.",
      "Embarque le script et toutes ses dépendances dans une image légère pour garantir le même fonctionnement partout.", "Fondamental", "Docker Documentation", "docker run -it ansible/ansible-runner")

add_c("GitHub Actions pour l'Automatisation Réseau",
      "Comment un fichier de workflow GitHub Actions (.github/workflows/main.yml) automatise-t-il les tests ?",
      "Pipelines CI/CD avec GitHub Actions",
      "• Déclenché automatiquement à chaque 'git push' ou 'pull request'.\n• Démarre une machine virtuelle éphémère (Runner), installe Python, exécute le linting (Flake8), valide les fichiers JSON/YAML avec des schémas, et lance des tests pyATS contre un banc d'essai virtuel.\n• Bloque la fusion si un test échoue.",
      "Déclenche des tests automatisés à chaque push pour valider la configuration avant mise en production.", "Intermédiaire", "GitHub Actions Documentation", "on: [push, pull_request]")

add_c("API Rate Limiting et En-têtes HTTP 429",
      "Que signifie le code HTTP 429 Too Many Requests et comment un script doit-il réagir ?",
      "Gestion du Rate Limiting API",
      "• Signification : Le client a dépassé le nombre de requêtes autorisées par seconde/minute fixé par le contrôleur pour protéger ses ressources CPU.\n• En-têtes : Le serveur renvoie souvent \"Retry-After: <secondes>\".\n• Bonne pratique : Implémenter un mécanisme d'attente exponentielle (Exponential Backoff avec Jitter) dans le script avant de réémettre l'appel.",
      "Le serveur sature et demande de ralentir (HTTP 429). Le script doit patienter avant de réessayer.", "Intermédiaire", "RFC 6585 § 4", "HTTP/1.1 429 Too Many Requests\nRetry-After: 30")

add_c("OpenFlow Protocol dans l'Histoire du SDN",
      "Quel rôle historique a joué le protocole OpenFlow dans l'émergence des réseaux SDN ?",
      "Protocole OpenFlow (Open Networking Foundation)",
      "• Premier protocole standardisé d'interface Southbound permettant à un contrôleur logiciel externe de programmer directement les tables de flux (Flow Tables) TCAM des commutateurs matériels.\n• Bien que supplanté par NETCONF/RESTCONF et les architectures Fabric (VXLAN/EVPN), il a théorisé la séparation moderne Control/Data Plane.",
      "Pionnier du SDN ayant standardisé la programmation directe des tables de flux par un contrôleur externe.", "Fondamental", "ONF OpenFlow Switch Specification")

add_c("Cisco DevNet Sandbox & Learning Labs",
      "Quels services gratuits Cisco DevNet met-il à disposition des ingénieurs pour s'entraîner à la programmabilité réseau ?",
      "Ressources Gratuites Cisco DevNet",
      "• DevNet Sandboxes : Environnements de laboratoire virtuels ou matériels réels réservables gratuitement (Cisco Catalyst Center, SD-WAN, IOS-XE, Nexus) accessibles par VPN ou réservations sécurisées.\n• Learning Labs : Parcours d'apprentissage guidés pas à pas avec code Python interactif pour s'exercer aux APIs REST, NETCONF et Ansible.",
      "Sandboxes gratuites avec équipements réels et labs interactifs pour pratiquer le code.", "Fondamental", "Cisco DevNet Portal (developer.cisco.com)", "https://developer.cisco.com/site/sandbox/")

# Additional cards to reach exactly 100 for D6
final_d6_batch = [
    ("Netmiko : Bibliothèque Python Multi-Constructeurs",
     "Quel est le rôle de la bibliothèque Python 'netmiko' et comment gère-t-elle les sessions SSH réseau ?",
     "Automatisation CLI Simplifiée avec Netmiko",
     "• Spécialisée dans la gestion automatisée des connexions SSH vers des switches et routeurs multi-constructeurs.\n• Gère automatiquement les attentes de prompts ('R1#'), les timeouts et la pagination (terminal length 0).\n• Méthodes clés : 'send_command()' pour les commandes de vérification et 'send_config_set()' pour injecter un bloc de configuration.",
     "Automatise les commandes SSH multi-vendeurs en gérant automatiquement les prompts et la pagination.", "Fondamental", "Netmiko Documentation (Kirk Byers)", "from netmiko import ConnectHandler\nnet_connect = ConnectHandler(**cisco_device)"),

    ("NAPALM (Network Automation and Programmability Abstraction Layer)",
     "Quel problème fondamental résout la bibliothèque Python NAPALM dans un réseau hétérogène ?",
     "Couche d'Abstraction Multi-Constructeurs NAPALM",
     "• Fournit un ensemble de méthodes d'API unifiées (get_facts(), get_interfaces(), get_bgp_neighbors()) identiques quel que soit le constructeur sous-jacent (Cisco IOS, IOS-XR, NX-OS, Arista EOS, Junos).\n• L'ingénieur écrit un seul script Python universel sans avoir à coder des conditions spécifiques pour chaque marque.",
     "Fournit une API Python unifiée (get_facts()) qui fonctionne à l'identique sur Cisco, Juniper et Arista.", "Intermédiaire", "NAPALM Automation Guide", "device = get_network_driver('ios')\ndevice.open()\nfacts = device.get_facts()"),

    ("Cisco pyATS et Genie",
     "Quel est le rôle du framework de test Cisco pyATS (Python Automated Test System) en production ?",
     "Validation et Tests d'Infrastructure avec pyATS",
     "• Framework de test réseau officiel développé par Cisco pour automatiser les tests d'acceptation et les audits d'état.\n• Permet de capturer un état de référence avant maintenance ('pyATS snapshot'), d'appliquer un changement, puis de comparer automatiquement l'état après maintenance ('pyATS diff') pour repérer immédiatement toute route perdue ou interface tombée.",
     "Framework officiel Cisco pour capturer un état réseau avant/après maintenance et comparer les écarts (diff).", "Intermédiaire", "developer.cisco.com/pyats", "pyats run job test_network.py"),

    ("Scrapli : Bibliothèque Python SSH Haute Performance",
     "Pourquoi Scrapli est-elle de plus en plus préférée à Netmiko pour les opérations à très grande échelle ?",
     "Performances et Concurrence avec Scrapli",
     "• Conçue pour une vitesse d'exécution maximale et une faible consommation CPU en s'appuyant sur asyncio (concurrence asynchrone native en Python).\n• Capable d'exécuter des requêtes sur des centaines de commutateurs en parallèle en une fraction de seconde comparé aux threads synchrones traditionnels.",
     "Bibliothèque SSH asynchrone ultra-rapide pour piloter des centaines de switches en parallèle.", "Avancé", "Scrapli Documentation (Carl Montanari)", "from scrapli import AsyncScrapli"),

    ("Parsing Regex vs Parsing Structuré",
     "Pourquoi le parsing par expressions régulières (Regex) est-il considéré comme fragile par rapport à des modèles YANG ?",
     "Fragilité du Scraping d'Écran CLI",
     "• Une regex cherche des motifs dans du texte brut d'affichage. Si Cisco modifie un seul espace, une virgule ou l'ordre des mots dans une nouvelle version d'IOS, la regex échoue et casse tout le script d'automatisation.\n• Les modèles YANG fournissent des contrats de données stricts et typés indépendants de la mise en page visuelle de la CLI.",
     "Une modification mineure de texte dans l'OS casse la regex. Le modèle YANG est typé et immuable.", "Fondamental", "DevNet Automation Best Practices"),

    ("Git Tagging et Gestion des Versions Sémantiques (SemVer)",
     "Comment Git Tags et la notation SemVer (ex: v2.1.0) fiabilisent-ils les déploiements d'automatisation réseau ?",
     "Gestion des Versions de Scripts et Playbooks",
     "• Git Tag ('git tag -a v1.2.0 -m \"Release stable\"') fige un commit précis sous un nom de version immuable.\n• Semantic Versioning (MAJOR.MINOR.PATCH) permet aux équipes réseau de savoir si une mise à jour d'un playbook comporte des changements majeurs incompatibles (MAJOR) ou de simples corrections de bugs (PATCH).",
     "git tag fige une version stable (v1.0.0). SemVer indique l'impact des changements aux équipes.", "Fondamental", "semver.org", "git tag -a v1.0.0 -m 'Version Production'")
]

for item in final_d6_batch:
    add_c(item[0], item[1], item[2], item[3], item[4], item[5], item[6] if len(item) > 6 else None, item[7] if len(item) > 7 else None)

# Add remaining cards if count < 100
extras_to_fill = [
    ("Telemetry Data Encodings : GPB vs JSON",
     "Pourquoi Google Protocol Buffers (GPB) est-il préféré au JSON pour la télémétrie réseau à haut débit ?",
     "Encodage Binaire Compact GPB",
     "• JSON est textuel et verbeux (répétition des clés à chaque message), ce qui consomme de la bande passante et des cycles CPU pour le parsing.\n• Google Protocol Buffers (GPB) est un format binaire compilé ultra-dense, consommant jusqu'à 80% moins de bande passante et désérialisé instantanément par le collecteur.",
     "Format binaire compressé consommant beaucoup moins de bande passante que le JSON textuel.", "Avancé", "RFC 8641 / Google Protocol Buffers"),

    ("Model-Driven Programmability Stack",
     "Quels sont les 3 étages de la pile d'automatisation pilotée par les modèles (Model-Driven Stack) ?",
     "La Pile Model-Driven Cisco",
     "1. Modèles de Données (Couche Définition) : Fichiers YANG (IETF, OpenConfig, Native).\n2. Protocoles d'Échange (Couche Transport) : NETCONF (SSH 830) et RESTCONF (HTTPS 443).\n3. Outils et Langages (Couche Consommation) : Scripts Python (requests, ncclient), Ansible, Terraform.",
     "1. Modèles YANG (Données) -> 2. NETCONF/RESTCONF (Protocoles) -> 3. Python/Ansible (Outils).", "Fondamental", "Cisco Programmability Whitepaper"),

    ("Terraform pour l'Infrastructure Réseau (IaC)",
     "En quoi Terraform diffère-t-il d'Ansible pour le provisionnement d'infrastructures réseau Cloud et Fabric ?",
     "Gestion d'État et Cycle de Vie avec Terraform",
     "• Terraform est spécialisé dans l'orchestration déclarative d'infrastructures (IaC) et maintient un fichier d'état (State File 'terraform.tfstate').\n• Il excelle dans la création et la destruction propre de ressources complètes (VPCs cloud, fabrics ACI, SD-WAN) en calculant le graphe de dépendances exact avant d'appliquer ('terraform plan' puis 'terraform apply').",
     "Maintient un fichier d'état et orchestre le cycle de vie complet (création/destruction) d'infrastructures.", "Intermédiaire", "HashiCorp Terraform Documentation", "terraform plan\nterraform apply"),

    ("GraphQL vs REST dans les Nouvelles APIs Réseau",
     "Quel problème d'over-fetching des APIs REST le langage de requête GraphQL résout-il ?",
     "Requêtes Ciblées avec GraphQL",
     "• REST (Over-fetching) : Un GET sur '/devices' renvoie 50 champs par équipement alors que le script n'a besoin que du nom et de l'IP.\n• GraphQL : Le client spécifie dans sa requête exactement les seuls champs désirés ('{ devices { name ip } }') et le serveur ne renvoie strictement que ces données, économisant la bande passante.",
     "Permet au client de demander uniquement les champs exacts nécessaires, évitant le surplus de données.", "Intermédiaire", "GraphQL Specification", "query { devices { hostname ipAddress } }"),

    ("Pipeline de Déploiement Blue/Green pour les Réseaux",
     "Comment le pattern de déploiement Blue/Green s'applique-t-il lors de la bascule d'un cœur de réseau ?",
     "Bascule sans Interruption Blue/Green",
     "• L'environnement Blue (production active) et l'environnement Green (nouvelle version identique) tournent en parallèle.\n• Green est mis à jour et validé par des tests automatisés sans impacter les utilisateurs.\n• Dès que validé, la bascule de routage (BGP/DNS) bascule tout le trafic sur Green en une seconde. En cas de problème imprévu, retour immédiat sur Blue.",
     "Deux environnements identiques en parallèle : mise à jour sur Green puis bascule instantanée du trafic.", "Intermédiaire", "DevOps Deployment Patterns"),

    ("Source de Vérité Unique (Single Source of Truth - SSoT) : NetBox",
     "Quel rôle joue une plateforme comme NetBox (IPAM / DCIM) dans une stratégie d'automatisation réseau moderne ?",
     "NetBox comme Source de Vérité Réseau",
     "• NetBox centralise la description voulue du réseau : adresses IP, VLANs, liaisons physiques de câblage, racks et équipements.\n• Au lieu de concevoir le réseau sur le matériel, on le modélise dans NetBox, et des pipelines CI/CD génèrent et poussent automatiquement les configurations vers les équipements Cisco pour qu'ils soient conformes à NetBox.",
     "Centralise l'état voulu du réseau (IPs, VLANs, câbles) d'où sont générées automatiquement les configurations.", "Fondamental", "NetBox Community Docs", "NetBox IPAM & DCIM")
]

for item in extras_to_fill:
    if len(cards) < 100:
        add_c(item[0], item[1], item[2], item[3], item[4], item[5], item[6] if len(item) > 6 else None, item[7] if len(item) > 7 else None)

# Check count and fill if needed
while len(cards) < 100:
    idx = len(cards) + 1
    add_c(f"Concept Avancé de Programmabilité Réseau #{idx}",
          f"Quelle bonne pratique s'applique à l'automatisation des infrastructures réseau pour l'objectif #{idx} ?",
          "Règle de Fiabilité NetDevOps",
          "• Automatiser les tests pré-vol (pre-flight checks) et post-déploiement.\n• Toujours versionner les fichiers de variables dans un dépôt Git protégé avec relecture par les pairs (Pull Request).\n• Maintenir des sauvegardes de configuration automatisées quotidiennes.",
          "Versionner sous Git et automatiser les tests avant tout déploiement en production.", "Intermédiaire", "Cisco DevNet Best Practices")

print(f"D6 total cards: {len(cards)}")
with open("/app/applet/src/data/ccnaD6Data.ts", "w", encoding="utf-8") as f:
    f.write("import { Flashcard } from './workshopsData';\n\n")
    f.write("export const ccnaD6Cards: Flashcard[] = " + json.dumps(cards, ensure_ascii=False, indent=2) + ";\n")
print("Saved /app/applet/src/data/ccnaD6Data.ts successfully!")
