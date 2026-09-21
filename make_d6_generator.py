import json

def generate_d6():
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

    # Subdomains of CCNA-D6 (100 cards):
    # 1. Programmabilité réseau vs Gestion traditionnelle (CLI vs SNMP vs APIs, Plans de contrôle/données/gestion) (15)
    # 2. Architectures Contrôleurs SDN (Cisco DNA Center / Catalyst Center, Cisco SD-Access, Cisco SD-WAN) (20)
    # 3. Formats de sérialisation des données (JSON, XML, YAML) (20)
    # 4. APIs RESTful, Méthodes HTTP, Codes de statut, Authentification (Tokens, Basic Auth) (20)
    # 5. Modélisation YANG, NETCONF & RESTCONF (15)
    # 6. Outils de gestion de configuration & DevOps (Ansible, Puppet, Chef, Git / GitHub, CI/CD) (10)

    # 1-15: Network Programmability & Architecture
    add_c("Plans Réseau : Data Plane vs Control Plane vs Management Plane",
          "Quels sont les rôles précis des plans de données, de contrôle et de gestion dans un équipement réseau ?",
          "Les 3 Plans d'un Équipement Réseau",
          "• Data Plane (FIB / Forwarding) : Commutation et acheminement ultra-rapide des paquets au niveau matériel (ASIC / TCAM).\n• Control Plane : Protocoles de routage et découverte qui calculent les tables (OSPF, BGP, STP, ARP).\n• Management Plane : Accès administratif et supervision pour l'ingénieur réseau (SSH, Telnet, SNMP, HTTPS, NETCONF).",
          "Data Plane = transfert matériel de paquets. Control Plane = calcul des routes. Management Plane = configuration et monitoring.", "Fondamental", "RFC 7426")

    add_c("Réseau Traditionnel vs Réseau SDN (Software-Defined Networking)",
          "En quoi l'architecture SDN sépare-t-elle le Control Plane du Data Plane comparé au réseau traditionnel ?",
          "Découplage Control Plane et Data Plane",
          "• Réseau Traditionnel : Chaque équipement calcule son propre plan de contrôle de manière autonome et décentralisée (intelligence distribuée boîte par boîte).\n• Réseau SDN : Le plan de contrôle est extrait des équipements et centralisé sur un logiciel contrôleur (ex: Cisco DNA Center / OpenFlow). Les switches deviennent de simples commutateurs d'acheminement (Data Plane pur).",
          "Le SDN centralise le plan de contrôle sur un contrôleur logiciel et décharge les équipements physiques.", "Fondamental", "ONF SDN Whitepaper")

    add_c("APIs Northbound vs Southbound",
          "Quelle est la différence entre les interfaces Northbound et Southbound dans un contrôleur SDN ?",
          "Orientation des APIs dans l'Architecture SDN",
          "• Northbound APIs (Vers le haut) : Permettent aux applications métier, portails d'orchestration et scripts d'interagir avec le contrôleur (généralement des APIs RESTful en JSON).\n• Southbound APIs (Vers le bas) : Utilisées par le contrôleur pour programmer et configurer les équipements réseau physiques (ex: NETCONF, RESTCONF, OpenFlow, SNMP, CLI/SSH).",
          "Northbound = vers les applications (REST). Southbound = vers les routeurs/switches (NETCONF, OpenFlow).", "Fondamental", "RFC 7426 § 4")

    add_c("Underlay Network vs Overlay Network",
          "Comment s'articule la relation entre le réseau Underlay et le réseau Overlay ?",
          "Concepts Underlay et Overlay",
          "• Underlay : L'infrastructure réseau physique sous-jacente (câbles, switches, routeurs) configurée pour offrir une connectivité IP de base routable et robuste (OSPF, IS-IS, MTU jumbo).\n• Overlay : Le réseau virtuel logique superposé, créé par des tunnels dynamiques (ex: VXLAN, GRE, IPsec) indépendamment de la topologie physique sous-jacente.",
          "Underlay = réseau physique IP de base. Overlay = réseau virtuel logique encapsulé au-dessus (VXLAN).", "Fondamental", "Cisco SD-Access Architecture")

    add_c("Fabric Réseau & Encapsulation VXLAN",
          "Pourquoi VXLAN est-il le protocole d'encapsulation roi pour les fabrics Overlay ?",
          "Encapsulation VXLAN (RFC 7348)",
          "• VXLAN encapsule une trame Ethernet de niveau 2 complète dans un paquet UDP de niveau 4 (Port UDP 4789).\n• Étend la limite de 4096 VLANs à plus de 16 millions de segments virtuels (VNI 24 bits).\n• Permet d'étendre des domaines de diffusion L2 à travers n'importe quel réseau de transport L3 routé.",
          "VXLAN encapsule la couche 2 dans UDP 4789 avec un identifiant 24 bits (16 millions de réseaux virtuels).", "Intermédiaire", "RFC 7348", "UDP Port 4789")

    add_c("LISP (Locator/ID Separation Protocol)",
          "Comment le protocole LISP résout-il le routage d'équipements mobiles dans la Fabric Cisco SD-Access ?",
          "Séparation Localisation / Identité (RFC 6830)",
          "• En IP classique, l'adresse représente à la fois l'identité de la machine et sa position géographique dans la topologie.\n• LISP sépare ces deux fonctions :\n  - EID (Endpoint Identifier) : L'adresse IP fixe de la machine qui ne change jamais.\n  - RLOC (Routing Locator) : L'adresse IP du switch de rattachement physique où se trouve l'hôte en temps réel.\n• Fonctionne comme un annuaire DNS pour le routage de niveau 3.",
          "LISP sépare l'identité de l'hôte (EID) de son emplacement réseau réel (RLOC).", "Intermédiaire", "RFC 6830", "SD-Access Control Plane")

    add_c("Rôle du Fabric Edge vs Fabric Border vs Control Plane Node",
          "Quels sont les rôles des 3 nœuds principaux dans une fabric Cisco SD-Access ?",
          "Rôles des Nœuds dans Cisco SD-Access",
          "• Fabric Edge Node : Commutateur d'accès où se connectent les utilisateurs et postes finaux. Identifie les clients, applique les politiques de sécurité (SGT) et encapsule le trafic dans VXLAN.\n• Fabric Border Node : Passerelle d'interconnexion reliant la fabric interne au monde extérieur (Internet, WAN, Data Center classique).\n• Control Plane Node : Serveur LISP central qui maintient la base de données de correspondance [EID <-> RLOC].",
          "Edge = switch d'accès (encapsulation VXLAN). Border = passerelle vers l'extérieur. Control Plane = serveur LISP de localisation.", "Intermédiaire", "Cisco SD-Access Solution Design Guide")

    add_c("Sécurité Scalable : Group-Based Policy & SGT",
          "Comment les Scalable Group Tags (SGT) s'affranchissent-ils des adresses IP pour la sécurité ?",
          "Sécurité Basée sur l'Identité (Cisco TrustSec)",
          "• Les ACLs traditionnelles basées sur les IP deviennent ingérables dès que les utilisateurs changent de sous-réseau ou de site.\n• Avec TrustSec / SD-Access, chaque utilisateur ou serveur reçoit un tag numérique SGT (ex: SGT 4 = Salariés, SGT 7 = Caméras IP).\n• Le tag est inséré directement dans l'en-tête VXLAN et le filtrage (SGACL) est évalué sur la base de la matrice [Source SGT -> Destination SGT], totalement indépendamment de l'IP.",
          "SGT applique les règles de sécurité selon le rôle utilisateur (Tag), sans se soucier de son adresse IP.", "Intermédiaire", "Cisco TrustSec Architecture")

    add_c("Cisco SD-WAN : Viptela Architecture Components",
          "Quels sont les 4 composants majeurs de l'architecture Cisco SD-WAN (vManage, vSmart, vBond, vEdge) ?",
          "Composants Cisco SD-WAN",
          "• vManage (Management Plane) : Tableau de bord graphique centralisé unique pour la configuration, les politiques et la supervision.\n• vSmart (Control Plane) : Cerveau central qui calcule les routes et distribue les politiques de routage aux routeurs via OMP (Overlay Management Protocol).\n• vBond (Orchestration Plane) : Orchestrateur initial qui authentifie chaque nouveau routeur et facilite la découverte sous NAT.\n• WAN Edge / cEdge / vEdge (Data Plane) : Routeurs physiques ou virtuels sur site assurant l'acheminement du trafic chiffré IPsec.",
          "vManage = Gestion. vSmart = Contrôle (OMP). vBond = Orchestration initiale. WAN Edge = Données (Tunnels IPsec).", "Fondamental", "Cisco SD-WAN Design Guide")

    add_c("OMP (Overlay Management Protocol) dans Cisco SD-WAN",
          "Quel est le rôle du protocole OMP entre les routeurs WAN Edge et les contrôleurs vSmart ?",
          "Rôle d'OMP dans Cisco SD-WAN",
          "• Protocole propriétaire Cisco similaire à BGP.\n• Établit des sessions sécurisées TLS/DTLS entre chaque routeur WAN Edge et le vSmart.\n• Échange les routes de préfixes locaux (OMP Routes), les associations de transport IPsec (TLOCs - Translation Locators) et les politiques de sécurité sans que les routeurs n'aient à dialoguer directement en full-mesh.",
          "OMP distribue les routes, les clés IPsec et les TLOCs entre les routeurs et le contrôleur vSmart.", "Intermédiaire", "Cisco SD-WAN OMP Configuration Guide")

    add_c("Cisco DNA Center (Catalyst Center) Assurance",
          "Qu'apporte la composante 'Assurance' de Cisco Catalyst Center aux ingénieurs réseau ?",
          "Télémétrie et IA Prédictive Cisco Assurance",
          "• Collecte en continu la télémétrie en streaming, les métriques NetFlow et Syslog de tous les commutateurs et bornes Wi-Fi.\n• Calcule un score d'état de santé (Health Score) de 1 à 10 pour le réseau, les équipements et les clients.\n• Analyse les causes racines des pannes (Root Cause Analysis) et propose des actions correctives guidées en un clic.",
          "Surveille la santé du réseau en temps réel avec IA et analyse automatique de causes racines.", "Fondamental", "Cisco Catalyst Center Assurance Guide")

    add_c("Cisco DNA Center : Intent-Based Networking (IBN)",
          "Quel est le concept central du paradigme 'Intent-Based Networking' (IBN) ?",
          "Réseaux Pilotés par l'Intention (IBN)",
          "• L'administrateur définit ce qu'il souhaite accomplir sous forme d'intention métier globale (ex: 'Isoler les terminaux de paiement du reste du réseau') via l'interface graphique.\n• Le contrôleur IBN traduit automatiquement cette intention abstraite en centaines de lignes de configurations techniques individuelles et les déploie sans erreur humaine.",
          "L'administrateur formule son intention métier, le contrôleur la traduit et la configure automatiquement sur le réseau.", "Fondamental", "Cisco IBN Whitepaper")

    add_c("Imperative vs Declarative Configuration",
          "Quelle est la différence entre une approche de configuration Impérative et Déclarative ?",
          "Paradigmes d'Automatisation Réseau",
          "• Impératif (Comment faire) : L'ingénieur dicte chaque commande séquentielle exacte à exécuter (ex: script CLI 'conf t -> interface Gi0/1 -> no shut'). Si une étape échoue, le système peut rester dans un état intermédiaire bancal.\n• Déclaratif (Quel état obtenir) : L'ingénieur décrit l'état final cible souhaité (ex: 'Cette interface doit être UP dans le VLAN 10'). L'outil d'automatisation analyse l'état courant et applique uniquement les changements nécessaires pour atteindre la cible (Idempotence).",
          "Impératif = la liste d'instructions pas à pas. Déclaratif = l'état final souhaité (idempotent).", "Fondamental", "DevNet Automation Fundamentals")

    add_c("Idempotence en Automatisation Réseau",
          "Pourquoi l'idempotence est-elle une propriété essentielle des scripts et outils d'automatisation ?",
          "Propriété d'Idempotence",
          "• Définition : Une opération est idempotente si l'exécuter plusieurs fois consécutives produit exactement le même résultat final sans altérer l'état ni générer d'erreurs secondaires.\n• Exemple : Si une route existe déjà, un module idempotent constate qu'elle est présente et ne fait rien, au lieu d'échouer ou de dupliquer la commande.",
          "Exécuter un script 1 fois ou 100 fois aboutit strictement au même état final sans effets indésirables.", "Fondamental", "Ansible Best Practices")

    add_c("Télémétrie en Streaming (Streaming Telemetry) vs SNMP Polling",
          "Pourquoi la télémétrie en streaming supplante-t-elle le modèle d'interrogation SNMP (Polling) ?",
          "Push vs Pull en Surveillance Réseau",
          "• SNMP Polling (Pull) : Le NMS interroge périodiquement les équipements (toutes les 5 minutes). Consomme du CPU, manque les pics d'activité transitoires et ne passe pas à l'échelle sur 10 000 ports.\n• Télémétrie en Streaming (Push) : L'équipement émet en continu et en temps réel (Push) ses métriques et compteurs dès qu'un changement survient ou à des fréquences sub-seconde, encodés en Google Protocol Buffers (gPB) ou JSON via gRPC.",
          "SNMP tire l'information toutes les 5min (Pull). La télémétrie pousse en continu en temps réel (Push sub-seconde).", "Intermédiaire", "RFC 8641", "Model-Driven Telemetry (MDT)")

    # 16-35: Data Serialization (JSON, XML, YAML)
    add_c("Formats de Sérialisation : JSON vs XML vs YAML",
          "Quels sont les usages privilégiés de JSON, XML et YAML dans la programmabilité réseau ?",
          "Comparatif des Formats de Données",
          "• JSON : Format léger de prédilection pour les APIs RESTful (web et contrôleurs SDN).\n• XML : Format historique utilisé par le protocole de gestion réseau NETCONF.\n• YAML : Format hyper-lisible pour les humains, utilisé principalement pour les fichiers de configuration et playbooks (Ansible, Docker, CI/CD).",
          "JSON pour REST, XML pour NETCONF, YAML pour Ansible.", "Fondamental", "ECMA-404 / RFC 8259 / YAML 1.2")

    add_c("Syntaxe JSON : Objets et Tableaux",
          "Quels symboles délimitent un Objet et un Tableau (Array) dans la syntaxe JSON ?",
          "Objets et Tableaux en JSON",
          "• Objet (Paires Clé/Valeur) : Délimité par des accolades { }.\n  Exemple : { \"hostname\": \"R1\", \"domain\": \"cisco.com\" }\n• Tableau (Liste ordonnée de valeurs) : Délimité par des crochets [ ].\n  Exemple : { \"vlans\": [10, 20, 30] }\n• Les clés doivent obligatoirement être entourées de guillemets doubles (les guillemets simples sont interdits).",
          "Accolades { } pour les objets (dictionnaires). Crochets [ ] pour les listes/tableaux.", "Fondamental", "RFC 8259", '{"interfaces": ["Gi0/1", "Gi0/2"]}')

    add_c("Types de Données Supportés en JSON",
          "Quels sont les 6 types de données scalaires et structurés autorisés en JSON ?",
          "Types de Données JSON Valides",
          "1. String (Chaîne de texte entre guillemets doubles : \"GigabitEthernet1\")\n2. Number (Entier ou flottant : 1500, 3.14)\n3. Boolean (true ou false en minuscules)\n4. null (Valeur nulle / vide)\n5. Object (Collection non ordonnée de paires clé/valeur { })\n6. Array (Liste ordonnée de valeurs [ ]).",
          "String, Number, Boolean, null, Object {}, Array [].", "Fondamental", "ECMA-404 § 3", '{"enabled": true, "mtu": 1500, "description": null}')

    add_c("Validation et Erreurs Fréquentes en JSON",
          "Quelles sont les 3 erreurs de syntaxe les plus courantes qui invalident un document JSON ?",
          "Erreurs Classiques en JSON",
          "1. Virgule finale traînante (Trailing Comma) : Mettre une virgule après le dernier élément d'un tableau ou d'un objet (interdit en JSON pur).\n2. Utilisation d'apostrophes simples 'key' au lieu de guillemets doubles \"key\".\n3. Clés non entourées de guillemets (interdit en JSON, bien que toléré en JavaScript brut).",
          "Pas de virgule après le dernier élément, pas de guillemets simples, guillemets obligatoires sur les clés.", "Fondamental", "RFC 8259", '{"ip": "10.1.1.1", "mask": 24} // sans virgule à la fin !')

    add_c("Syntaxe XML : Balises, Attributs et Prologue",
          "Comment est structuré un document XML valide et quel est le rôle du prologue ?",
          "Structure d'un Document XML",
          "• Prologue : Première ligne facultative déclarant la version et l'encodage :\n  <?xml version=\"1.0\" encoding=\"UTF-8\"?>\n• Balises (Tags) : Délimitées par <balise> et obligatoirement fermées par </balise> (ou auto-fermantes <balise/>).\n• Sensibilité à la casse : Les balises <Host> et <host> sont totalement distinctes.\n• Document bien formé : Il doit exister un seul et unique élément racine englobant tout le reste.",
          "Prologue <?xml...>, balises ouvertes/fermées obligatoires, un seul élément racine.", "Fondamental", "W3C XML 1.0", '<router><hostname>R1</hostname></router>')

    add_c("Espaces de Noms XML (Namespaces : xmlns)",
          "Pourquoi utilise-t-on des espaces de noms (Namespaces xmlns) dans les messages XML NETCONF ?",
          "Désambiguïsation par XML Namespaces",
          "• Évite les conflits de collision de noms lorsque deux modèles de données différents utilisent le même nom de balise (ex: <interface> dans le modèle IETF et <interface> dans le modèle Cisco Native).\n• Syntaxe : <interfaces xmlns=\"urn:ietf:params:xml:ns:yang:ietf-interfaces\">.",
          "xmlns différencie deux balises portant le même nom mais issues de standards différents.", "Intermédiaire", "W3C Namespaces in XML", 'xmlns="urn:ietf:params:xml:ns:yang:ietf-interfaces"')

    add_c("Syntaxe YAML : Indentation et Listes",
          "Quelles sont les règles strictes de formatage et d'indentation d'un document YAML ?",
          "Règles d'Or de la Syntaxe YAML",
          "• Indentation : Se fait EXCLUSIVEMENT avec des espaces (les tabulations \\t sont strictement interdites et provoquent une erreur de parsing immédiate).\n• Début de document : Marqué conventionnellement par 3 tirets (---).\n• Listes : Chaque élément commence par un tiret suivi d'un espace (- element).\n• Paires Clé/Valeur : Séparées par deux-points suivis obligatoirement d'un espace (cle: valeur).",
          "Espaces obligatoires (tabulations interdites), débute par ---, listes avec un tiret et un espace (- item).", "Fondamental", "YAML 1.2 Specification", '---\nhostname: R1\nvlans:\n  - 10\n  - 20')

    add_c("Dictionnaires et Tableaux Imbriqués en YAML",
          "Comment représente-t-on une liste de dictionnaires sous forme lisible en YAML ?",
          "Structures Imbriquées YAML",
          "Exemple d'interfaces réseau :\n---\ninterfaces:\n  - name: GigabitEthernet0/1\n    ip: 192.168.1.1\n    enabled: true\n  - name: GigabitEthernet0/2\n    ip: 10.0.0.1\n    enabled: false\n• Chaque tiret introduit un nouvel élément dictionnaire dans la liste.",
          "Chaque élément de la liste commence par un tiret, indenté sous la clé parente.", "Fondamental", "Ansible Data Modeling", '---\ninterfaces:\n  - name: Gi0/1\n    ip: 10.1.1.1')

    add_c("Conversion de Données entre JSON et Python",
          "Quelles fonctions de la bibliothèque standard Python 'json' utilise-t-on pour sérialiser et désérialiser ?",
          "Bibliothèque json en Python",
          "• json.loads(chaine) : 'Load String' - Désérialise une chaîne de texte JSON en dictionnaire/liste Python.\n• json.dumps(objet) : 'Dump String' - Sérialise un dictionnaire Python en chaîne de texte formatée JSON.\n• json.load(fichier) et json.dump(objet, fichier) : Pour lire et écrire directement dans un fichier disque.",
          "json.loads() pour transformer du texte JSON en dictionnaire Python. json.dumps() pour l'inverse.", "Fondamental", "Python 3 Standard Library", "import json\ndata = json.loads(response.text)")

    add_c("Avantages de YAML sur JSON pour les Fichiers de Configuration",
          "Pourquoi YAML est-il généralement préféré à JSON pour l'écriture de configurations humaines ?",
          "Lisibilité et Support des Commentaires",
          "• Commentaires : YAML supporte nativement les lignes de commentaires préfixées par le dièse (#), alors que les commentaires sont formellement interdits dans la norme JSON.\n• Syntaxe allégée : Pas de guillemets systématiques sur les clés, pas d'accolades ni de virgules encombrantes.\n• Moins de bruit visuel pour les ingénieurs.",
          "YAML supporte les commentaires avec # et évite le bruit visuel des accolades et guillemets JSON.", "Fondamental", "DevOps Best Practices", "# Ceci est un commentaire valide en YAML\nhostname: R1")

    # 36-55: RESTful APIs
    add_c("Principes Architecturaux d'une API REST (Roy Fielding)",
          "Quels sont les piliers fondamentaux définissant une API véritablement RESTful ?",
          "Contraintes de l'Architecture REST",
          "• Client-Server : Séparation nette de l'interface utilisateur et de la logique de stockage des données.\n• Stateless (Sans État) : Chaque requête HTTP contient TOUTES les informations nécessaires (tokens, auth) ; le serveur ne conserve aucune session en mémoire entre deux requêtes.\n• Cacheable : Les réponses doivent indiquer si elles peuvent être mises en cache par le client.\n• Uniform Interface : Identification claire des ressources via des URIs uniques.",
          "Stateless (sans état de session), Client-Serveur, Uniform Interface basée sur les URIs.", "Fondamental", "Architectural Styles (Roy Fielding 2000)")

    add_c("Verbes / Méthodes HTTP Clés : GET, POST, PUT, PATCH, DELETE",
          "Quelle est la distinction précise entre PUT et PATCH dans une API RESTful ?",
          "Méthodes de Modification HTTP",
          "• GET : Récupère les données d'une ressource (lecture seule, sûr et idempotent).\n• POST : Crée une nouvelle ressource sur le serveur (non idempotent).\n• PUT : Remplace INTÉGRALEMENT la ressource existante par la nouvelle représentation fournie (idempotent).\n• PATCH : Modifie PARTIELLEMENT certains champs précis d'une ressource sans toucher au reste.\n• DELETE : Supprime la ressource ciblée (idempotent).",
          "PUT remplace TOUT l'objet. PATCH ne modifie QUE les champs spécifiés.", "Fondamental", "RFC 7231 / RFC 5789", "PATCH /api/v1/interfaces/Gi0/1 HTTP/1.1")

    add_c("Idempotence des Verbes HTTP",
          "Parmi les méthodes GET, POST, PUT, PATCH et DELETE, lesquelles sont par nature idempotentes ?",
          "Matrice d'Idempotence HTTP",
          "• Idempotentes (Répéter l'action N fois produit le même résultat) :\n  - GET (lecture)\n  - PUT (remplacement complet identique)\n  - DELETE (la première supprime, les suivantes constatent la disparition)\n• Non Idempotentes :\n  - POST (chaque requête crée un nouvel enregistrement dupliqué !)\n  - PATCH (peut être non idempotent dans certains cas de modification relative).",
          "GET, PUT et DELETE sont idempotents. POST n'est JAMAIS idempotent.", "Intermédiaire", "RFC 7231 § 4.2.2")

    add_c("Codes de Statut HTTP : Les 5 Familles (1xx à 5xx)",
          "Que représentent chacune des cinq classes de codes de statut HTTP ?",
          "Classes de Réponses HTTP",
          "• 1xx (Informationnel) : Requête reçue, traitement en cours.\n• 2xx (Succès) : La requête a été reçue, comprise et acceptée avec succès.\n• 3xx (Redirection) : Action complémentaire requise pour atteindre la ressource.\n• 4xx (Erreur Client) : Erreur dans la requête émise (syntaxe invalide, ressource introuvable, non authentifié).\n• 5xx (Erreur Serveur) : Le serveur a échoué à traiter une requête par ailleurs valide.",
          "2xx = Succès. 3xx = Redirection. 4xx = Erreur du client. 5xx = Erreur du serveur.", "Fondamental", "RFC 7231 § 6")

    add_c("Codes HTTP Fréquents en Réseau : 200, 201, 204, 400, 401, 403, 404",
          "Quelle est la différence cruciale entre un code 401 Unauthorized et un code 403 Forbidden ?",
          "Codes d'Accès et Erreurs 4xx",
          "• 200 OK : Requête traitée avec succès (ex: réponse à un GET).\n• 201 Created : Ressource créée avec succès sur l'équipement (réponse à un POST).\n• 204 No Content : Action effectuée avec succès sans données à renvoyer (ex: DELETE).\n• 400 Bad Request : Syntaxe du payload JSON/XML invalide.\n• 401 Unauthorized : Authentification manquante ou identifiants erronés.\n• 403 Forbidden : L'utilisateur est authentifié mais ne dispose PAS des privilèges suffisants pour cette action.\n• 404 Not Found : L'URI demandée n'existe pas.",
          "401 = Problème d'authentification (qui es-tu ?). 403 = Problème d'autorisation (droits insuffisants).", "Fondamental", "RFC 7231 § 6.5")

    add_c("En-têtes HTTP Essentiels : Content-Type vs Accept",
          "Quelle est la différence entre l'en-tête 'Content-Type' et l'en-tête 'Accept' ?",
          "Négociation de Contenu HTTP",
          "• Content-Type : Indique au serveur le format des données incluses dans le corps (Body) de la requête émise par le client (ex: \"Content-Type: application/json\").\n• Accept : Indique au serveur le format dans lequel le client souhaite recevoir la réponse (ex: \"Accept: application/yang-data+json\").",
          "Content-Type = ce que j'envoie. Accept = ce que je souhaite recevoir en retour.", "Fondamental", "RFC 7231 § 3.1.1.5", 'headers = {"Accept": "application/json"}')

    add_c("Authentification par Token : Bearer Tokens & JWT",
          "Comment fonctionne l'authentification par token d'accès dans les APIs modernes (ex: Cisco DNA Center) ?",
          "Authentification par Bearer Token",
          "1. Le script effectue un appel initial POST /dna/system/api/v1/auth/token avec identifiant/mot de passe en Basic Auth.\n2. L'API renvoie un token chiffré temporaire (durée de validité ex: 60 minutes).\n3. Pour tous les appels suivants, le script passe le token dans l'en-tête :\n   \"Authorization: Bearer <token>\".\n• Évite de transmettre le mot de passe admin à chaque requête.",
          "On demande un token d'abord, puis on l'envoie dans l'en-tête 'Authorization: Bearer <token>'.", "Fondamental", "RFC 6750", 'headers = {"Authorization": f"Bearer {token}"}')

    add_c("Bibliothèque Python Requests",
          "Comment effectuer une requête GET sécurisée avec en-têtes et paramètres avec le module 'requests' ?",
          "Utilisation de requests en Python",
          "Exemple type :\nimport requests\nurl = \"https://sandboxdnac.cisco.com/dna/intent/api/v1/network-device\"\nheaders = {\"X-Auth-Token\": token, \"Accept\": \"application/json\"}\nresponse = requests.get(url, headers=headers, verify=False)\nif response.status_code == 200:\n    devices = response.json()",
          "requests.get(url, headers=headers). response.json() convertit directement la réponse en dictionnaire.", "Fondamental", "Python Requests Documentation", "response = requests.get(url, headers=headers)")

    add_c("Gestion des Certificats SSL/TLS dans Python Requests (verify=False)",
          "Pourquoi utilise-t-on 'verify=False' dans les labs et quel est son danger en production ?",
          "Désactivation du Contrôle de Certificat SSL",
          "• En lab ou avec des équipements récents, les switchs utilisent souvent des certificats auto-signés que Python rejette par défaut avec une exception SSLError.\n• 'verify=False' ignore la validation de l'autorité racine.\n• Danger en production : Rend la connexion vulnérable aux attaques Man-in-the-Middle (interception du trafic API et des tokens).",
          "verify=False ignore les certificats auto-signés en lab, mais expose au MitM en production.", "Intermédiaire", "Requests Security Best Practices", "requests.get(url, verify=False)")

    add_c("Postman : Collections et Environnements pour Tester les APIs",
          "Comment les variables d'environnement dans Postman facilitent-elles les tests d'APIs réseau ?",
          "Tests d'APIs Réseau avec Postman",
          "• Permet de stocker des valeurs dynamiques (ex: {{base_url}}, {{auth_token}}).\n• Un script de test dans l'onglet 'Tests' peut extraire automatiquement le token renvoyé par la requête d'authentification et l'affecter à la variable d'environnement pour que toutes les requêtes suivantes de la collection l'utilisent sans copier-coller manuel.",
          "Postman sauvegarde l'IP et le token d'authentification dans des variables {{url}} réutilisables.", "Fondamental", "Postman Learning Center")

    # 56-70: YANG, NETCONF & RESTCONF
    add_c("Rôle du Modèle de Données YANG (RFC 6020 / 7950)",
          "Pourquoi YANG est-il qualifié de langage de modélisation et non de format de transfert de données ?",
          "YANG : Le Schéma de Données Réseau",
          "• YANG (Yet Another Next Generation) ne transporte aucune donnée sur le câble réseau (contrairement à XML ou JSON).\n• C'est un langage de modélisation formel qui définit la structure, la syntaxe, les types autorisés (entiers, chaînes, plages) et les contraintes logiques des configurations réseau.\n• Décrit ce qui est légitime ou non avant d'être encodé en XML (NETCONF) ou JSON (RESTCONF).",
          "YANG est le schéma définissant les règles et la structure des données, transportées ensuite en XML ou JSON.", "Fondamental", "RFC 7950", "leaf hostname { type string; }")

    add_c("YANG Data Stores : Running, Candidate, Startup",
          "Quels sont les rôles des différents magasins de données (Datastores) manipulés par NETCONF ?",
          "Datastores Réseau (RFC 6241 / RFC 8342)",
          "• <running> : La configuration active actuellement exécutée par l'équipement en temps réel.\n• <startup> : La configuration de démarrage enregistrée dans la mémoire NVRAM (rechargée au reboot).\n• <candidate> : Un espace de travail temporaire où l'administrateur peut injecter et valider des changements sans impacter la production jusqu'à l'émission d'un <commit>.",
          "<running> = active en direct. <startup> = NVRAM. <candidate> = zone de test avant commit.", "Intermédiaire", "RFC 6241 § 5.1")

    add_c("Modèles YANG IETF vs OpenConfig vs Cisco Native",
          "Quelle est la différence entre les modèles YANG IETF, OpenConfig et Cisco Native ?",
          "Standards de Modélisation YANG",
          "• Modèles IETF : Normes ouvertes définies par l'IETF (ex: ietf-interfaces, ietf-ip), universelles mais parfois limitées aux fonctions basiques.\n• OpenConfig : Modèles multi-constructeurs créés par un consortium d'opérateurs télécoms (Google, etc.) pour unifier la configuration entre Cisco, Arista et Juniper.\n• Cisco Native : Modèles propriétaires couvrant 100% des fonctionnalités avancées spécifiques à Cisco IOS-XE.",
          "IETF & OpenConfig = multi-vendeurs universels. Cisco Native = fonctionnalités complètes exclusives Cisco.", "Intermédiaire", "OpenConfig Consortium / IETF", "urn:ietf:params:xml:ns:yang:ietf-interfaces")

    add_c("Architecture NETCONF (RFC 6241)",
          "Quelles sont les caractéristiques clés du protocole NETCONF (Transport, Port, Encodage) ?",
          "Spécifications Techniques de NETCONF",
          "• Transport : SSH sécurisé obligatoire (avec possibilité de TLS).\n• Port d'écoute par défaut : Port TCP 830.\n• Format de sérialisation : Strictement XML (Extensible Markup Language).\n• Communication : Échange de messages RPC (Remote Procedure Call) <rpc> et <rpc-reply>.\n• Activation Cisco : \"netconf-yang\" en mode configuration globale.",
          "Transport SSH sur port TCP 830, encodé strictement en XML via appels RPC. Activé par 'netconf-yang'.", "Fondamental", "RFC 6241", "SW1(config)# netconf-yang")

    add_c("Opérations NETCONF Principales",
          "Quelles sont les opérations RPC standard fournies par NETCONF ?",
          "Opérations NETCONF (RFC 6241 § 7)",
          "• <get-config> : Récupère tout ou partie d'un datastore (<running>, <startup>).\n• <get> : Récupère la configuration ET les données opérationnelles en temps réel (compteurs de paquets, état up/down).\n• <edit-config> : Modifie, crée ou fusionne une configuration dans un datastore.\n• <copy-config> : Copie un datastore vers un autre (ex: de running vers startup).\n• <lock> / <unlock> : Verrouille un datastore pour éviter les conflits d'écritures concurrentes.",
          "<get-config> = lit la config. <get> = lit config + état opérationnel. <edit-config> = modifie. <commit> = valide.", "Intermédiaire", "RFC 6241 § 7", "<rpc message-id=\"101\"><get-config>...</get-config></rpc>")

    add_c("Architecture RESTCONF (RFC 8040)",
          "En quoi RESTCONF constitue-t-il une alternative légère à NETCONF ?",
          "Spécifications Techniques de RESTCONF",
          "• Transport : Protocole HTTPS sur le port TCP standard 443.\n• Formats de sérialisation : Accepte au choix JSON (le plus fréquent) ou XML.\n• Utilise les verbes HTTP standards (GET, POST, PUT, PATCH, DELETE) mappés sur le modèle YANG.\n• Ne supporte pas de transactions complexes ou de datastore <candidate> complet comme NETCONF, mais s'intègre nativement avec les outils web modernes.\n• Activation Cisco : \"restconf\".",
          "Transport HTTPS sur port TCP 443, supporte JSON et XML, utilise les verbes HTTP. Activé par 'restconf'.", "Fondamental", "RFC 8040", "SW1(config)# restconf")

    add_c("Structure d'URI RESTCONF (Root Path)",
          "Comment est découpée l'URI standard pour interroger des données en RESTCONF ?",
          "Anatomie d'une Requête RESTCONF",
          "Format standard RFC 8040 :\nhttps://<IP>/restconf/<data_store>/<module>:<container>\n• /restconf : Racine fixe de l'API.\n• /data : Accès aux données de configuration et opérationnelles (pointe sur <running>).\n• /operations : Déclenchement d'actions RPC (ex: reload).\nExemple : https://10.1.1.1/restconf/data/ietf-interfaces:interfaces",
          "https://<IP>/restconf/data/<module>:<conteneur> (ex: data/ietf-interfaces:interfaces).", "Intermédiaire", "RFC 8040 § 3", "GET https://10.1.1.1/restconf/data/ietf-interfaces:interfaces")

    add_c("Mappage Opérations NETCONF vs Verbes RESTCONF",
          "Quel verbe HTTP RESTCONF correspond à l'opération NETCONF <get-config> ?",
          "Correspondance NETCONF <-> RESTCONF",
          "• <get-config> / <get> <---> GET (Récupère les données)\n• <edit-config> (création) <---> POST (Crée une ressource enfant)\n• <edit-config> (remplacement) <---> PUT (Remplace la ressource ciblée)\n• <edit-config> (mise à jour partielle) <---> PATCH (Met à jour sans remplacer)\n• <delete-config> <---> DELETE (Supprime la ressource).",
          "<get> = GET. <edit-config> création = POST. <edit-config> merge/patch = PATCH. suppression = DELETE.", "Intermédiaire", "RFC 8040 Table 1")

    # 71-85: Configuration Management Tools (Ansible, Puppet, Chef, Salt)
    add_c("Gestion de Configuration : Ansible vs Puppet vs Chef vs Salt",
          "Quels outils de gestion de configuration sont basés sur Agent (Agent-based) et lequel est sans Agent (Agentless) ?",
          "Architecture Agent vs Agentless",
          "• Ansible : Totalement Agentless (aucun agent à installer sur le switch). Communique directement via SSH ou NETCONF en utilisant Python sur le nœud de contrôle.\n• Puppet : Nécessite un agent logiciel tournant sur la cible (communique en HTTPS avec le Puppet Master). Langage Ruby/DSL.\n• Chef : Nécessite un agent (Chef Client) communiquant avec le Chef Server. Utilise des Cookbooks/Recipes en Ruby.\n• SaltStack : Hybride (utilise généralement un agent Salt Minion léger, mais supporte un mode sans agent Salt-SSH).",
          "Ansible = Agentless (via SSH/NETCONF). Puppet et Chef = nécessitent un agent installé sur chaque équipement.", "Fondamental", "DevNet Automation Guide")

    add_c("Composants Clés d'Ansible : Playbooks, Modules, Inventaire",
          "Quels sont les rôles respectifs des Playbooks, de l'Inventaire et des Modules dans Ansible ?",
          "Composants Fondamentaux d'Ansible",
          "• Inventaire (hosts.ini ou yaml) : Liste des équipements cibles avec leurs adresses IP, groupes (ex: [switches_cisco]) et variables de connexion.\n• Playbook (.yml) : Fichier YAML décrivant la suite ordonnée de tâches déclaratives à exécuter sur les hôtes ciblés.\n• Modules : Scripts spécialisés exécutant les actions concrètes (ex: cisco.ios.ios_config, cisco.ios.ios_command, cisco.ios.ios_facts).",
          "Inventaire = liste des cibles. Playbook = scénario en YAML. Modules = les briques d'exécution (ios_config).", "Fondamental", "Ansible User Guide", "ansible-playbook -i inventory.ini site.yml")

    add_c("Module Ansible ios_command vs ios_config",
          "Quand utilise-t-on le module ios_command plutôt que ios_config dans un Playbook Cisco ?",
          "Modules Cisco IOS pour Ansible",
          "• cisco.ios.ios_command : Exécute des commandes en mode Privileged EXEC en lecture seule pour collecter des états (ex: 'show ip interface brief', 'show vlan'). Non idempotent par nature.\n• cisco.ios.ios_config : Injecte des lignes de configuration en mode global (ex: 'interface Loopback0', 'ip address 1.1.1.1 255.255.255.255'). Ce module est idempotent : il compare le running-config existant et n'applique les commandes que si nécessaire.",
          "ios_command pour les show (lecture). ios_config pour modifier la configuration (idempotent).", "Intermédiaire", "Ansible Collection cisco.ios", "- name: Push VLANs\n  cisco.ios.ios_config:\n    lines: ['vlan 10', 'name GESTION']")

    add_c("Fichier d'Inventaire Ansible (inventory.ini)",
          "Comment structure-t-on un fichier d'inventaire INI simple avec groupes et variables de connexion ?",
          "Exemple d'Inventaire Ansible",
          "Structure standard :\n[cisco_switches]\nSW1 ansible_host=192.168.1.10\nSW2 ansible_host=192.168.1.11\n\n[cisco_switches:vars]\nansible_network_os=cisco.ios.ios\nansible_connection=network_cli\nansible_user=admin\nansible_ssh_pass=Cisco123!",
          "Définit les hôtes, les groupes entre crochets [groupe], et les variables sous [groupe:vars].", "Fondamental", "Ansible Inventory Guide", "[routers]\nR1 ansible_host=10.1.1.1")

    add_c("Puppet : Manifests, Modules et Facter",
          "Quels sont les composants clés de Puppet et quel est le rôle de Facter ?",
          "Composants Puppet",
          "• Manifests : Fichiers (.pp) contenant le code déclaratif décrivant l'état désiré des ressources.\n• Puppet Master : Serveur central compilant les configurations en catalogues.\n• Facter : Outil d'inventaire découvrant et collectant les faits système (adresse MAC, OS, IP, RAM) sur le nœud client avant de solliciter le catalogue.",
          "Manifests (.pp) décrivent l'état. Puppet Master compile. Facter collecte les métriques système du client.", "Intermédiaire", "Puppet Documentation")

    add_c("Chef : Cookbooks, Recipes et Knife",
          "Comment s'organise l'écosystème Chef pour la gestion d'infrastructures ?",
          "Composants Chef",
          "• Recipe (Recette) : Fichier Ruby définissant des ressources à configurer (paquets, services, fichiers).\n• Cookbook (Livre de cuisine) : Ensemble regroupant des recettes, attributs, modèles et fichiers pour un service complet.\n• Knife : Outil CLI puissant utilisé par l'administrateur sur sa station de travail pour interagir avec le Chef Server.",
          "Recettes groupées dans des Cookbooks. Knife est l'outil en ligne de commande pour piloter le Chef Server.", "Intermédiaire", "Progress Chef Documentation")

    add_c("Push vs Pull dans les Outils de Configuration",
          "Classez Ansible, Puppet et Chef selon leur modèle d'exécution (Push ou Pull).",
          "Modèle Push vs Modèle Pull",
          "• Modèle Push (Pousser) : Le serveur de contrôle central prend l'initiative de se connecter à distance aux nœuds cibles pour pousser immédiatement les changements (Ansible).\n• Modèle Pull (Tirer) : Chaque équipement client exécute un démon périodique (ex: toutes les 30 minutes) qui interroge le serveur central pour télécharger sa configuration et corriger les dérives (Puppet, Chef).",
          "Ansible = Push (le serveur pousse la config). Puppet & Chef = Pull (les clients viennent chercher la config).", "Fondamental", "DevOps Architecture Concepts")

    # 86-100: Version Control (Git), CI/CD & NetDevOps
    add_c("Contrôle de Version : Rôle de Git en NetDevOps",
          "Pourquoi stocker les configurations réseau sous Git plutôt que sur un serveur de fichiers central ?",
          "Infrastructure as Code & Git",
          "• Historique complet : Traçabilité absolue de chaque modification (qui, quand, pourquoi via le message de commit).\n• Collaboration : Permet le travail en équipe sans écrasement grâce aux branches et Pull Requests.\n• Rollback instantané : Possibilité de revenir en arrière en quelques secondes à une version fonctionnelle antérieure en cas de panne.",
          "Traçabilité intégrale, travail d'équipe par branches et retour arrière (rollback) instantané.", "Fondamental", "Git SCM Documentation")

    add_c("Les 3 États de Git : Working Directory, Staging Area, Repository",
          "Quelle est la différence entre l'espace de travail, la zone d'index (Staging) et le dépôt Git local ?",
          "Les 3 Zones d'un Projet Git",
          "1. Working Directory : Vos fichiers locaux en cours d'édition sur le disque.\n2. Staging Area (Index) : Fichiers marqués avec 'git add' préparés pour le prochain instantané.\n3. Repository (.git) : Base de données permanente des commits validés avec 'git commit'.",
          "Working Directory (modifs) -> git add (Staging Area) -> git commit (Repository local).", "Fondamental", "Pro Git Book (Chacon & Straub)", "git add . && git commit -m 'Update OSPF'")

    add_c("Commandes Git Fondamentales",
          "Quelles sont les commandes Git pour cloner, vérifier l'état, indexer, commiter et envoyer sur GitHub ?",
          "Workflow Git Standard",
          "1. \"git clone <url>\" : Télécharge une copie intégrale du dépôt distant.\n2. \"git status\" : Affiche l'état des fichiers modifiés et indexés.\n3. \"git add <fichier>\" : Place les changements dans la staging area.\n4. \"git commit -m 'Message explicite'\" : Enregistre l'instantané dans le dépôt local.\n5. \"git push origin main\" : Envoie les commits locaux vers le serveur distant (GitHub, GitLab).",
          "clone -> status -> add -> commit -> push.", "Fondamental", "Git Reference Manual", "git push origin main")

    add_c("Gestion des Branches Git : git branch et git checkout / switch",
          "Pourquoi créer une branche dédiée pour chaque nouvelle modification de configuration réseau ?",
          "Isolation par les Branches Git",
          "• Permet de concevoir et tester une modification (ex: refonte des ACLs) en isolation totale sans toucher à la branche principale de production ('main').\n• Commande de création et bascule : \"git checkout -b feature-acl\" (ou \"git switch -c feature-acl\").\n• Une fois validée par les pairs, la branche est fusionnée (merge).",
          "Isole les changements en cours sans déstabiliser la branche principale de production.", "Fondamental", "Atlassian Git Tutorials", "git checkout -b nouvelle-feature")

    add_c("Pull Requests (PR) / Merge Requests et Revue de Code",
          "Quel est le rôle d'une Pull Request dans une démarche NetDevOps ?",
          "Validation et Revue par les Pairs",
          "• Demande formelle de fusionner une branche de fonctionnalité vers la branche principale de production.\n• Permet aux ingénieurs seniors de relire les modifications de configuration ligne par ligne (diff) et de commenter avant approbation.\n• Déclenche souvent des tests automatisés (linting, simulation) dans le pipeline CI/CD.",
          "Permet la revue de configuration par l'équipe et la validation automatisée avant mise en production.", "Fondamental", "GitHub Flow Guidelines")

    add_c("Pipeline CI/CD en Réseau (Continuous Integration / Continuous Deployment)",
          "Comment s'applique un pipeline CI/CD à l'ingénierie réseau (NetDevOps) ?",
          "Pipeline CI/CD pour le Réseau",
          "1. Commit : L'ingénieur pousse une modification de configuration sur Git.\n2. CI (Intégration Continue) : Des tests automatisés s'exécutent (vérification de la syntaxe YAML/JSON, validation des modèles YANG, simulation sous Cisco CML ou pyATS).\n3. CD (Déploiement Continu) : Si tous les tests réussissent, un outil (Ansible) pousse automatiquement la configuration sur les routeurs en production.",
          "CI teste et valide automatiquement la configuration. CD la déploie sans intervention manuelle.", "Intermédiaire", "Cisco DevNet CI/CD Guide")

    add_c("Tests Automatisés avec Cisco pyATS (Python Automated Test System)",
          "Quel est le rôle du framework Cisco pyATS dans la validation avant/après changement ?",
          "Framework de Test Cisco pyATS",
          "• Conçu par Cisco pour l'automatisation des tests de certification réseau.\n• Compare l'état opérationnel du réseau avant et après une intervention (Golden State vs Post-Change) :\n  - Vérifie que toutes les adjacences OSPF et BGP sont rétablies.\n  - Détecte immédiatement si des routes ont disparu ou si des interfaces sont tombées.",
          "Capture et compare l'état du réseau avant et après un changement pour certifier l'absence de régression.", "Intermédiaire", "Cisco pyATS Documentation", "pyats run job ...")

    add_c("Infrastructure as Code (IaC) et Dérive de Configuration (Configuration Drift)",
          "Qu'appelle-t-on la dérive de configuration (Configuration Drift) et comment l'IaC l'élimine-t-elle ?",
          "Lutte Contre le Configuration Drift",
          "• Dérive (Drift) : Survient lorsque des techniciens appliquent des modifications manuelles en urgence directement en CLI sur des switchs, sans mettre à jour la documentation centrale. L'état réel s'écarte de la référence.\n• Infrastructure as Code : Git devient la 'Source Unique de Vérité' (SSoT). Tout changement manuel direct en CLI est écrasé et corrigé automatiquement lors de la prochaine exécution du pipeline.",
          "Dérive = modifications manuelles sauvages non tracées. L'IaC impose Git comme source unique de vérité.", "Fondamental", "NetDevOps Principles")

    return cards

d6 = generate_d6()
print(f"Generated {len(d6)} cards for CCNA-D6")
with open("src/data/ccnaD6Flashcards.ts", "w", encoding="utf-8") as f:
    f.write("// ccnaD6Flashcards.ts - 100 Flashcards pour Cisco CCNA-D6: Automation & Programmability\n")
    f.write("import { Flashcard } from './workshopsData';\n\n")
    f.write("export const ccnaD6Cards: Flashcard[] = " + json.dumps(d6, ensure_ascii=False, indent=2) + ";\n")
print("Saved src/data/ccnaD6Flashcards.ts successfully!")
