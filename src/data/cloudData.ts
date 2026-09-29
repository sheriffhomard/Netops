// src/data/cloudData.ts
// Encyclopédie & Glossaire Cloud d'Entreprise - NetOps Academy
import { CloudGlossaryTerm, CloudEncyclopediaArticle } from '../types';

export const cloudGlossaryTerms: CloudGlossaryTerm[] = [
  {
    "id": "term-vpc",
    "term": "VPC — Virtual Private Cloud",
    "acronym": "VPC",
    "category": "Réseau & Interconnexion",
    "shortDef": "Réseau virtuel privé isolé logiquement au sein d'un cloud public, offrant un contrôle total sur l'espace d'adressage IP (CIDR), les sous-réseaux, les tables de routage et les passerelles.",
    "fullExplanation": "Le Virtual Private Cloud (VPC) constitue la frontière réseau fondamentale d'une infrastructure cloud. Il repose sur l'encapsulation logicielle (SDN - Software-Defined Networking) au niveau de l'hyperviseur physique (ex: AWS Nitro, Azure VNet host agent, GCP Andromeda). Contrairement aux VLANs 802.1Q limités à 4096 segments, les VPCs utilisent des protocoles d'encapsulation comme Geneve (RFC 8926) ou VXLAN (RFC 7348) avec des identifiants 24-bits (VNI). Les instances se voient attribuer des interfaces réseau virtuelles (vNIC/ENI) reliées à des sous-réseaux délimités par des blocs CIDR IPv4 (RFC 1918) et IPv6 (GUA).",
    "rfcOrStandard": "RFC 1918 (Private IPv4), RFC 7348 (VXLAN), RFC 8926 (Geneve)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "Amazon VPC",
        "details": "Régional, sous-réseaux zonaux (AZ)"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Virtual Network (VNet)",
        "details": "Régional, sous-réseaux zonaux ou régionaux"
      },
      {
        "provider": "GCP",
        "serviceName": "Google Cloud VPC",
        "details": "Global par défaut, sous-réseaux régionaux"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws ec2 create-vpc --cidr-block 10.100.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=prod-vpc-core}]'",
      "description": "Création d'un VPC de production avec bloc CIDR /16"
    },
    "relatedFlashcardKeywords": [
      "VPC",
      "CIDR",
      "Sous-réseau",
      "Route Table",
      "ENCOR-D1"
    ],
    "relatedArticleId": "art-cloud-transit-routing",
    "tags": [
      "VPC",
      "VNet",
      "SDN",
      "CIDR",
      "Réseau",
      "Overlay"
    ]
  },
  {
    "id": "term-direct-connect",
    "term": "AWS Direct Connect / Azure ExpressRoute / GCP Cloud Interconnect",
    "acronym": "DX / ExpressRoute",
    "category": "Réseau & Interconnexion",
    "shortDef": "Liaison fibre dédiée et privée entre un datacenter sur site (on-premises) et le réseau dorsal (backbone) d'un fournisseur cloud, contournant complètement l'Internet public.",
    "fullExplanation": "Les interconnexions physiques hybrides établissent un lien Ethernet point-à-point (1 Gbps, 10 Gbps, 100 Gbps ou 400 Gbps) raccordé dans un point de présence (PoP / Colocation / Meet-Me Room) entre le routeur client (Customer Edge - CE) et le routeur opérateur du Cloud (Provider Edge - PE). Le multiplexage de services est assuré par des tags VLAN 802.1Q. Le routage dynamique repose obligatoirement sur eBGP (RFC 4271). Sur AWS Direct Connect, 3 types d'interfaces virtuelles (VIF) sont proposées : Private VIF (accès direct à un VPC via VGW), Public VIF (accès aux services publics S3, DynamoDB, API sans passer par Internet) et Transit VIF (raccordement direct à une AWS Transit Gateway). Le chiffrement couche 2 peut être assuré nativement par IEEE 802.1AE (MACsec) à débit nominal filaire (line-rate).",
    "rfcOrStandard": "IEEE 802.1Q (VLAN Tagging), IEEE 802.1AE (MACsec), RFC 4271 (BGP-4)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "AWS Direct Connect (DX)",
        "details": "Private VIF, Public VIF, Transit VIF, MACsec optionnel"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure ExpressRoute",
        "details": "Private Peering, Microsoft Peering, ExpressRoute Direct"
      },
      {
        "provider": "GCP",
        "serviceName": "Google Cloud Interconnect",
        "details": "Dedicated Interconnect (10G/100G) & Partner Interconnect"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws directconnect describe-virtual-interfaces --connection-id dxcon-fh2918a",
      "description": "Vérification de l'état BGP et de la configuration VLAN des interfaces virtuelles DX"
    },
    "relatedFlashcardKeywords": [
      "Direct Connect",
      "ExpressRoute",
      "BGP",
      "802.1Q",
      "MACsec",
      "ENCOR-D1"
    ],
    "relatedArticleId": "art-cloud-hybrid-interconnect",
    "tags": [
      "Direct Connect",
      "ExpressRoute",
      "Interconnect",
      "BGP",
      "Hybride",
      "MACsec",
      "Peering"
    ]
  },
  {
    "id": "term-transit-gateway",
    "term": "Transit Gateway (TGW) / Virtual WAN / Cloud Router",
    "acronym": "TGW / VWAN",
    "category": "Réseau & Interconnexion",
    "shortDef": "Hub de routage réseau cloud centralisé permettant d'interconnecter des milliers de VPCs, de VNets et de sites distants on-premises selon une topologie en étoile (Hub-and-Spoke).",
    "fullExplanation": "Avant l'avènement des Transit Gateways, l'interconnexion de dizaines de VPCs nécessitait un maillage complet de VPC Peerings (Full Mesh O(N²)), créant une complexité ingérable et l'absence de routage transitif. Une Transit Gateway agit comme un routeur virtuel distribué de niveau 3 capable d'agréger des attachements de type VPC, VPN IPsec Site-to-Site, Direct Connect Gateway et peering inter-région. Elle supporte de multiples tables de routage (VRF-like) permettant une micro-segmentation stricte (ex: table Prod, table Dev, table Inspection Firewall DMZ). Chaque attachement est associé à une table de routage et peut propager ses préfixes CIDR vers d'autres tables.",
    "rfcOrStandard": "RFC 4364 (BGP/MPLS IP VPNs architecture concepts), RFC 7938",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "AWS Transit Gateway (TGW)",
        "details": "Supporte jusqu'à 5 000 attachements VPC, routage multi-tables"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Virtual WAN",
        "details": "Hubs virtuels managés interconnectés, SD-WAN natif"
      },
      {
        "provider": "GCP",
        "serviceName": "Network Connectivity Center (NCC)",
        "details": "Utilise Cloud Router et BGP dynamique pour le transit"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws ec2 create-transit-gateway-route-table --transit-gateway-id tgw-04f81a7b92cd311e5 --tag-specifications 'ResourceType=transit-gateway-route-table,Tags=[{Key=Name,Value=Secured-Inspection-RT}]'",
      "description": "Création d'une table de routage dédiée à l'inspection de sécurité sur la Transit Gateway"
    },
    "relatedFlashcardKeywords": [
      "Transit Gateway",
      "Hub-and-Spoke",
      "VPC Peering",
      "BGP",
      "ENCOR-D1"
    ],
    "relatedArticleId": "art-cloud-transit-routing",
    "tags": [
      "Transit Gateway",
      "TGW",
      "Virtual WAN",
      "Hub-and-Spoke",
      "Routage",
      "VRF"
    ]
  },
  {
    "id": "term-vpc-peering",
    "term": "VPC Peering (Appairage de VPC)",
    "acronym": "VPC Peering",
    "category": "Réseau & Interconnexion",
    "shortDef": "Connexion réseau directe point-à-point entre deux VPCs permettant la communication bidirectionnelle via des adresses IP privées à bande passante maximale.",
    "fullExplanation": "Le VPC Peering connecte deux VPCs (au sein du même compte ou entre comptes distincts, dans la même région ou inter-région) au niveau du plan de données sans passerelle intermédiaire ni goulot d'étranglement matériel. Principales contraintes architecturales : 1) Les blocs CIDR des deux VPCs ne doivent JAMAIS se chevaucher (No overlapping CIDRs). 2) Le routage est strictement NON-TRANSITIF : si le VPC A est appairé au VPC B, et le VPC B au VPC C, le trafic de A ne peut pas traverser B pour atteindre C. 3) Les Jumbo Frames (MTU 9001) sont supportées uniquement en Intra-Region Peering, alors que l'Inter-Region Peering applique un MTU standard de 1500 octets.",
    "rfcOrStandard": "AWS Architecture Guidelines & Cloud Networking Specs",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "VPC Peering",
        "details": "Intra-Region (MTU 9001) ou Inter-Region (MTU 1500)"
      },
      {
        "provider": "Azure",
        "serviceName": "VNet Peering",
        "details": "Global VNet Peering avec peering direct sans passerelle"
      },
      {
        "provider": "GCP",
        "serviceName": "VPC Network Peering",
        "details": "Échange de routes internes sans passerelle"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws ec2 create-vpc-peering-connection --vpc-id vpc-01a2b3c4 --peer-vpc-id vpc-09z8y7x6 --peer-owner-id 123456789012",
      "description": "Initiation d'une demande d'appairage entre deux VPCs de comptes différents"
    },
    "relatedFlashcardKeywords": [
      "VPC Peering",
      "MTU",
      "Non-transitif",
      "CIDR",
      "ENCOR-D1"
    ],
    "relatedArticleId": "art-cloud-transit-routing",
    "tags": [
      "VPC Peering",
      "Peering",
      "Transit",
      "MTU",
      "Routage"
    ]
  },
  {
    "id": "term-privatelink",
    "term": "AWS PrivateLink / Azure Private Endpoint / GCP Private Service Connect",
    "acronym": "PrivateLink / PSC",
    "category": "Réseau & Interconnexion",
    "shortDef": "Technologie permettant d'accéder de manière sécurisée et privée à des services managés (PaaS ou SaaS) via une interface réseau locale dans son propre sous-réseau.",
    "fullExplanation": "PrivateLink élimine le besoin d'exposer des services sur l'Internet public ou de configurer des passerelles Internet Gateway, NAT Gateways ou règles de pare-feu complexes. Il provisionne une interface réseau élastique d'endpoint (Interface VPC Endpoint - ENI) dans un sous-réseau spécifique du consommateur, avec une IP privée issue de son propre espace d'adressage CIDR. La communication repose sur la technologie SDN Hyperplane (AWS) ou Private Link (Azure/GCP), assurant une isolation complète de niveau 4/7 avec redirection NAT bidirectionnelle transparente. Cela permet également de résoudre élégamment les problèmes d'adresses IP qui se chevauchent (overlapping CIDRs) entre partenaires SaaS et clients.",
    "rfcOrStandard": "Zero Trust Network Access (ZTNA) / NIST SP 800-207",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "AWS PrivateLink (Interface Endpoint)",
        "details": "Propulsé par AWS Hyperplane, compatible NLB"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Private Link & Private Endpoint",
        "details": "IP privée locale mappée vers service PaaS"
      },
      {
        "provider": "GCP",
        "serviceName": "Private Service Connect (PSC)",
        "details": "Consommation de services producteurs via Forwarding Rule locale"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws ec2 create-vpc-endpoint --vpc-id vpc-11223344 --service-name com.amazonaws.eu-west-3.s3 --vpc-endpoint-type Interface --subnet-ids subnet-aaa111",
      "description": "Création d'un Interface Endpoint PrivateLink pour l'accès privé à Amazon S3"
    },
    "relatedFlashcardKeywords": [
      "PrivateLink",
      "VPC Endpoint",
      "Zero Trust",
      "S3",
      "ENCOR-D1"
    ],
    "relatedArticleId": "art-cloud-security-zero-trust",
    "tags": [
      "PrivateLink",
      "Private Endpoint",
      "PSC",
      "Sécurité",
      "PaaS",
      "Zero Trust"
    ]
  },
  {
    "id": "term-gateway-endpoint",
    "term": "VPC Gateway Endpoint (S3 & DynamoDB)",
    "acronym": "Gateway Endpoint",
    "category": "Réseau & Interconnexion",
    "shortDef": "Cible de routage spéciale insérée dans les tables de routage d'un VPC pour router gratuitement le trafic vers Amazon S3 ou DynamoDB sans transiter par Internet ni consommer d'ENI.",
    "fullExplanation": "Le Gateway Endpoint est un type historique de point de terminaison spécifique à AWS pour deux services clés : S3 et DynamoDB. Contrairement aux Interface Endpoints (PrivateLink) qui créent une ENI facturée à l'heure, le Gateway Endpoint est gratuit et ne consomme aucune adresse IP privée dans le sous-réseau. Il fonctionne en injectant une route spécifique dans la table de routage du VPC (ex: Destination: 'pl-6ba54002 (com.amazonaws.eu-west-3.s3)', Target: 'vpce-12345678'). Il peut être sécurisé par une politique d'endpoint (Endpoint Policy) pour restreindre l'accès à certains buckets spécifiques.",
    "rfcOrStandard": "AWS Network Core Architecture",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "VPC Gateway Endpoint",
        "details": "Disponible exclusivement pour S3 et DynamoDB (gratuit)"
      },
      {
        "provider": "Azure",
        "serviceName": "Service Endpoints",
        "details": "Optimisation de route VNet directe vers Azure Storage/SQL"
      },
      {
        "provider": "GCP",
        "serviceName": "Private Google Access",
        "details": "Accès aux APIs Google sans IP publique"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws ec2 create-vpc-endpoint --vpc-id vpc-00112233 --service-name com.amazonaws.eu-west-3.s3 --route-table-ids rtb-99887766",
      "description": "Attachement d'un Gateway Endpoint S3 à la table de routage privée"
    },
    "relatedFlashcardKeywords": [
      "Gateway Endpoint",
      "S3",
      "Route Table",
      "VPC",
      "ENCOR-D1"
    ],
    "relatedArticleId": "art-cloud-transit-routing",
    "tags": [
      "Gateway Endpoint",
      "S3",
      "DynamoDB",
      "Routage",
      "Économie"
    ]
  },
  {
    "id": "term-load-balancer-alb-nlb",
    "term": "ALB (Application Load Balancer) vs NLB (Network Load Balancer)",
    "acronym": "ALB / NLB",
    "category": "Réseau & Interconnexion",
    "shortDef": "Répartiteurs de charge élastiques cloud opérant respectivement au niveau applicatif L7 (HTTP/HTTPS/gRPC) et au niveau transport L4 (TCP/UDP/TLS).",
    "fullExplanation": "L'Application Load Balancer (ALB) inspecte les en-têtes applicatifs couche 7 du modèle OSI. Il gère le déchiffrement TLS, le routage basé sur les chemins d'URL (/api, /auth), les noms d'hôte (Host header), les en-têtes HTTP, les méthodes (GET/POST) et supporte HTTP/2, HTTP/3 (QUIC), les WebSockets et gRPC. Il modifie l'adresse IP source du client en insérant l'en-tête 'X-Forwarded-For'. À l'inverse, le Network Load Balancer (NLB) opère en couche 4 ultra-rapide avec des puces ASIC/Nitro. Il traite des dizaines de millions de requêtes par seconde avec une latence inférieure à la milliseconde, fournit une adresse IP statique (ou Elastic IP) par zone de disponibilité, et préserve nativement l'adresse IP source du client sans encapsulation proxy.",
    "rfcOrStandard": "RFC 2616 (HTTP/1.1), RFC 9113 (HTTP/2), RFC 9114 (HTTP/3)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "Elastic Load Balancing (ALB / NLB)",
        "details": "ALB (L7) & NLB (L4 ultra-faible latence)"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Application Gateway / Load Balancer",
        "details": "App Gateway (L7 avec WAF) & Azure LB (L4)"
      },
      {
        "provider": "GCP",
        "serviceName": "Cloud Load Balancing",
        "details": "Global External HTTP(S) LB & Network TCP/UDP LB"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws elbv2 create-load-balancer --name core-ingress-nlb --type network --subnets subnet-111 subnet-222",
      "description": "Déploiement d'un Network Load Balancer L4 haut débit multi-AZ"
    },
    "relatedFlashcardKeywords": [
      "Load Balancer",
      "ALB",
      "NLB",
      "L4",
      "L7",
      "ENCOR-D1"
    ],
    "relatedArticleId": "art-cloud-load-balancing",
    "tags": [
      "Load Balancing",
      "ALB",
      "NLB",
      "L7",
      "L4",
      "Haute Disponibilité"
    ]
  },
  {
    "id": "term-gwlb",
    "term": "Gateway Load Balancer (GWLB) & Protocole GENEVE",
    "acronym": "GWLB / GENEVE",
    "category": "Réseau & Interconnexion",
    "shortDef": "Service managé permettant de déployer, faire évoluer et gérer horizontalement une flotte d'appliances de sécurité tierces (Next-Gen Firewalls, IDS/IPS, WAF).",
    "fullExplanation": "Le Gateway Load Balancer combine une passerelle de routage transparente et un équilibreur de charge L3/L4. Il résout le défi historique de l'insertion de firewalls dans le cloud sans nécessiter de Source-NAT (qui masquait l'IP client d'origine). GWLB intercepte le trafic IP entrant et l'encapsule dans des paquets GENEVE (Generic Network Virtualization Encapsulation - RFC 8926) sur le port UDP 6081. Le paquet GENEVE contient le paquet d'origine non modifié ainsi que des métadonnées (ID de flux, tenant ID) transmises à l'appliance firewall (Palo Alto Networks VM-Series, Fortinet FortiGate, Check Point). Après inspection, l'appliance ré-émet le paquet encapsulé vers le GWLB qui le désencapsule et l'achemine vers sa destination.",
    "rfcOrStandard": "RFC 8926 (Geneve Encapsulation Protocol - UDP 6081)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "AWS Gateway Load Balancer (GWLB)",
        "details": "Encapsulation Geneve UDP 6081 vers appliances virtuelles"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Gateway Load Balancer",
        "details": "Chaînage de services réseau NVA transparent via VXLAN"
      },
      {
        "provider": "GCP",
        "serviceName": "Network Passthrough Load Balancer",
        "details": "Inspection NVA via L3 Network Peering"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws elbv2 create-load-balancer --name security-fleet-gwlb --type gateway --subnets subnet-sec-az1 subnet-sec-az2",
      "description": "Création d'un Gateway Load Balancer pour inspection NGFW centralisée"
    },
    "relatedFlashcardKeywords": [
      "GWLB",
      "GENEVE",
      "Firewall",
      "Palo Alto",
      "PCNSE-D1",
      "ENCOR-D1"
    ],
    "relatedArticleId": "art-cloud-load-balancing",
    "tags": [
      "GWLB",
      "GENEVE",
      "Firewall",
      "Inspection",
      "Sécurité",
      "Palo Alto"
    ]
  },
  {
    "id": "term-nat-gateway",
    "term": "NAT Gateway / Cloud NAT",
    "acronym": "NAT-GW",
    "category": "Réseau & Interconnexion",
    "shortDef": "Passerelle de traduction d'adresses réseau (Source-NAT) managée et hautement disponible, permettant aux instances de sous-réseaux privés d'accéder à Internet.",
    "fullExplanation": "La NAT Gateway réalise une translation d'adresses source (SNAT / PAT - Port Address Translation, RFC 3022) pour autoriser le trafic sortant (egress) initié depuis des ressources privées (mises à jour d'OS, appels d'APIs externes, packages npm/pip) tout en interdisant formellement l'initiation de connexions entrantes depuis l'extérieur. Dans AWS, une NAT Gateway est zonale : pour une architecture hautement disponible et tolérante aux pannes (Multi-AZ), il est impératif de déployer une NAT Gateway par zone de disponibilité dans un sous-réseau public avec sa propre IP statique (Elastic IP). Attention au risque d'épuisement des ports sources SNAT (SNAT Port Exhaustion) lorsque des milliers de connexions simultanées ciblent la même adresse IP et le même port de destination.",
    "rfcOrStandard": "RFC 3022 (Traditional IP Network Address Translator - PAT/SNAT)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "AWS NAT Gateway",
        "details": "Managée, bande passante jusqu'à 100 Gbps, zonale"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Virtual Network NAT",
        "details": "Associée au sous-réseau, résout l'épuisement des ports SNAT"
      },
      {
        "provider": "GCP",
        "serviceName": "Cloud NAT",
        "details": "Entièrement logicielle et distribuée sans passerelle intermédiaire"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws ec2 create-nat-gateway --subnet-id subnet-pub-1a --allocation-id eipalloc-0b12c34d5e",
      "description": "Instanciation d'une NAT Gateway avec son adresse IP élastique publique dédiée"
    },
    "relatedFlashcardKeywords": [
      "NAT Gateway",
      "SNAT",
      "PAT",
      "Egress",
      "Sous-réseau",
      "CCNA-D4"
    ],
    "relatedArticleId": "art-cloud-transit-routing",
    "tags": [
      "NAT",
      "PAT",
      "SNAT",
      "Sous-réseau",
      "Egress",
      "Sécurité"
    ]
  },
  {
    "id": "term-route53-dns",
    "term": "Route 53 Private Hosted Zone & Split-Horizon DNS",
    "acronym": "R53 / DNS",
    "category": "Réseau & Interconnexion",
    "shortDef": "Système de résolution de noms de domaine (DNS) hautement disponible supportant les zones privées d'entreprise et les politiques de routage complexes.",
    "fullExplanation": "Le service DNS cloud fournit deux fonctions clés : 1) Zones publiques avec routage basé sur la latence (Latency-Based), la géolocalisation, la géoproximité et les contrôles de santé (Failover Actif/Passif). 2) Zones hébergées privées (Private Hosted Zones) : implémentation du pattern 'Split-Horizon DNS', où le même nom de domaine (ex: api.corp.internal) est résolu en adresses IP privées à l'intérieur du VPC sans jamais fuiter sur l'Internet public. Les Resolver Endpoints (Inbound et Outbound) de Route 53 permettent de relier la résolution DNS entre les serveurs Active Directory/BIND locaux on-premises et les zones privées hébergées dans le Cloud via des règles de transfert conditionnel (Forwarding Rules).",
    "rfcOrStandard": "RFC 1035 (Domain Names Implementation), RFC 2181",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "Amazon Route 53",
        "details": "Zones publiques, privées, Route 53 Resolver (Inbound/Outbound)"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure DNS & Private DNS",
        "details": "Résolution interne avec liaison de réseau virtuel"
      },
      {
        "provider": "GCP",
        "serviceName": "Cloud DNS",
        "details": "DNS Anycast mondial avec Cloud DNS Peering"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws route53 create-hosted-zone --name corp.internal --vpc VPCRegion=eu-west-3,VPCId=vpc-012345 --caller-reference 20260922-01",
      "description": "Création d'une zone hébergée privée DNS rattachée à un VPC d'entreprise"
    },
    "relatedFlashcardKeywords": [
      "DNS",
      "Route 53",
      "Split-Horizon",
      "CCNA-D4"
    ],
    "relatedArticleId": "art-cloud-hybrid-interconnect",
    "tags": [
      "DNS",
      "Route 53",
      "Private Zone",
      "Résolution",
      "Anycast"
    ]
  },
  {
    "id": "term-security-groups-vs-nacls",
    "term": "Security Groups (SG) vs Network ACLs (NACL)",
    "acronym": "SG vs NACL",
    "category": "Sécurité, IAM & Conformité",
    "shortDef": "Les deux niveaux de filtrage de paquets fondamentaux dans un réseau cloud : Stateful au niveau de l'interface (SG) et Stateless au niveau du sous-réseau (NACL).",
    "fullExplanation": "La distinction entre Security Group et NACL est une question classique et fondamentale d'architecture réseau cloud : 1) Security Group : Opère au niveau de l'interface réseau virtuelle (ENI/vNIC). Il est STATEFUL (avec état) : si une requête entrante est autorisée, la réponse sortante correspondante est automatiquement autorisée quel que soit le filtre sortant. Il n'a que des règles d'AUTORISATION (Allow) et supporte le référencement croisé (permettre le trafic provenant d'un autre SG). 2) Network ACL (NACL) : Opère au périmètre du sous-réseau entier. Il est STATELESS (sans état) : les paquets entrants et sortants sont évalués indépendamment. Pour autoriser le retour d'une connexion TCP cliente, il faut explicitement ouvrir les ports éphémères (1024-65535) en sortie. Il évalue les règles par ordre numérique croissant et supporte les règles de REFUS explicite (Deny).",
    "rfcOrStandard": "Stateful Inspection Firewall vs Stateless Packet Filtering",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "Security Groups & Network ACLs",
        "details": "SG (Stateful ENI) & NACL (Stateless Subnet)"
      },
      {
        "provider": "Azure",
        "serviceName": "Network Security Groups (NSG)",
        "details": "Stateful, applicable aux sous-réseaux et cartes NIC"
      },
      {
        "provider": "GCP",
        "serviceName": "VPC Firewall Rules",
        "details": "Stateful, ciblage par Network Tags ou Service Accounts"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws ec2 authorize-security-group-ingress --group-id sg-012ab34cd --protocol tcp --port 443 --cidr 10.0.0.0/8",
      "description": "Ajout d'une règle d'autorisation HTTPS stateful sur un groupe de sécurité"
    },
    "relatedFlashcardKeywords": [
      "Security Group",
      "NACL",
      "Stateful",
      "Stateless",
      "CCNA-D5",
      "ENCOR-D1"
    ],
    "relatedArticleId": "art-cloud-security-zero-trust",
    "tags": [
      "Security Group",
      "NACL",
      "Stateful",
      "Pare-feu",
      "Sécurité",
      "Ports"
    ]
  },
  {
    "id": "term-k8s-cni",
    "term": "CNI (Container Network Interface) & Réseaux Kubernetes",
    "acronym": "CNI",
    "category": "Compute & Conteneurs",
    "shortDef": "Spécification standardisée et ensemble de bibliothèques permettant aux moteurs de conteneurs (Kubernetes, containerd) d'attacher dynamiquement des interfaces réseau aux Pods.",
    "fullExplanation": "Le modèle réseau de Kubernetes impose 3 règles fondamentales : 1) Chaque Pod dispose d'une adresse IP unique et routable. 2) Les Pods sur n'importe quel nœud peuvent communiquer avec tous les Pods sans translation d'adresse (No NAT). 3) Les agents du nœud (kubelet) peuvent communiquer avec tous les Pods du même nœud. Pour implémenter cela, le CNI intervient : AWS VPC CNI alloue directement des adresses IP secondaires issues du sous-réseau VPC à chaque Pod (routage direct natif sans encapsulation). D'autres plugins comme Calico ou Flannel utilisent un réseau superposé (Overlay VXLAN/IPIP). Des CNIs de dernière génération comme Cilium exploitent eBPF (Extended Berkeley Packet Filter) pour contourner complètement la table iptables du noyau Linux, offrant un routage en mémoire ultra-performant et une observabilité L7 fine.",
    "rfcOrStandard": "CNI Specification (containernetworking/cni), eBPF Architecture",
    "providers": [
      {
        "provider": "CNCF",
        "serviceName": "Cilium, Calico, Flannel",
        "details": "Plugins CNI open source pour clusters Kubernetes"
      },
      {
        "provider": "AWS",
        "serviceName": "Amazon VPC CNI Plugin for K8s (EKS)",
        "details": "Attribution directe d'IPs VPC par Pod"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure CNI / Azure CNI Powered by Cilium",
        "details": "IPs VNet directes pour Pods AKS avec eBPF"
      },
      {
        "provider": "GCP",
        "serviceName": "GKE Dataplane V2 (Cilium/eBPF)",
        "details": "Implémentation eBPF native sur Google Kubernetes Engine"
      }
    ],
    "cliExample": {
      "tool": "kubectl",
      "command": "kubectl get daemonsets -n kube-system -l k8s-app=aws-node",
      "description": "Vérification du déploiement du DaemonSet CNI sur les nœuds du cluster"
    },
    "relatedFlashcardKeywords": [
      "Kubernetes",
      "CNI",
      "Pod",
      "eBPF",
      "VPC",
      "ENCOR-D2"
    ],
    "relatedArticleId": "art-k8s-cni-networking",
    "tags": [
      "Kubernetes",
      "CNI",
      "Cilium",
      "Calico",
      "Conteneurs",
      "eBPF"
    ]
  },
  {
    "id": "term-k8s-ingress-gateway-api",
    "term": "Kubernetes Ingress Controller & Gateway API",
    "acronym": "Ingress / Gateway API",
    "category": "Compute & Conteneurs",
    "shortDef": "Ressources Kubernetes orchestrant l'accès HTTP/HTTPS externe vers les services internes du cluster avec routage d'URL et terminaison TLS.",
    "fullExplanation": "Tandis qu'un Service de type 'LoadBalancer' provisionne un équilibreur de charge distinct et coûteux par service, la ressource Ingress mutualise une seule IP publique d'équilibreur (ex: NGINX Ingress, AWS Load Balancer Controller) pour router le trafic vers de multiples microservices en fonction du chemin (/users, /orders) ou du nom de domaine. La nouvelle spécification Gateway API (sig-network) succède à l'Ingress historique. Elle introduit une séparation des rôles (Role-Oriented) : GatewayClass (fournisseur d'infrastructure), Gateway (administrateur de cluster) et HTTPRoute / GRPCRoute / TCPRoute (développeurs d'applications), avec un support natif pour le routage pondéré (Canary releases) et la validation croisée.",
    "rfcOrStandard": "Kubernetes Gateway API (gateway-api.sigs.k8s.io)",
    "providers": [
      {
        "provider": "CNCF",
        "serviceName": "Envoy Gateway, Istio Ingress, Traefik",
        "details": "Contrôleurs Gateway API compatibles"
      },
      {
        "provider": "AWS",
        "serviceName": "AWS Load Balancer Controller",
        "details": "Provisionne automatiquement des ALBs et NLBs pour Ingress"
      },
      {
        "provider": "GCP",
        "serviceName": "GKE Ingress & Gateway Controller",
        "details": "Multi-cluster Ingress piloté par Cloud Load Balancing"
      }
    ],
    "cliExample": {
      "tool": "kubectl",
      "command": "kubectl get ingress,gateway,httproute -A",
      "description": "Liste de toutes les routes Ingress et Gateway API actives sur le cluster"
    },
    "relatedFlashcardKeywords": [
      "Ingress",
      "Gateway API",
      "Kubernetes",
      "ALB",
      "TLS"
    ],
    "relatedArticleId": "art-k8s-cni-networking",
    "tags": [
      "Kubernetes",
      "Ingress",
      "Gateway API",
      "Routage",
      "TLS",
      "Microservices"
    ]
  },
  {
    "id": "term-serverless-containers",
    "term": "Conteneurs Serverless (AWS Fargate, Cloud Run, Azure Container Apps)",
    "acronym": "Fargate / Cloud Run",
    "category": "Compute & Conteneurs",
    "shortDef": "Moteur d'exécution de conteneurs sans serveur permettant de déployer des microservices conteneurisés sans provisionner, gérer ni patcher de machines virtuelles hôtes.",
    "fullExplanation": "Les conteneurs serverless éliminent la couche d'administration des instances EC2/VMs (taille de cluster, scaling d'OS, maintenance du noyau, patching de sécurité). L'utilisateur définit uniquement la mémoire (RAM) et le processeur (vCPU) nécessaires à sa tâche ou son Pod. Chaque tâche s'exécute dans une micro-VM dédiée hautement isolée (ex: Firecracker MicroVM basée sur KVM pour AWS Fargate, gVisor pour Google Cloud Run). Le modèle de facturation est strictement proportionnel au temps d'exécution à la seconde près. Google Cloud Run et Azure Container Apps supportent le 'Scale-to-Zero' (réduction à 0 instance en l'absence de trafic, réveil par premier paquet HTTP entrant).",
    "rfcOrStandard": "OCI Runtime Specification & MicroVM Isolation (Firecracker / gVisor)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "AWS Fargate (pour ECS et EKS)",
        "details": "MicroVM Firecracker dédiée par tâche"
      },
      {
        "provider": "GCP",
        "serviceName": "Google Cloud Run",
        "details": "Basé sur Knative et conteneurs isolés gVisor avec scale-to-zero"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Container Apps (ACA)",
        "details": "Construit sur Kubernetes managé, KEDA et Dapr"
      }
    ],
    "cliExample": {
      "tool": "gcloud",
      "command": "gcloud run deploy api-gateway --image gcr.io/my-corp/api:v2.1 --platform managed --region europe-west1 --min-instances 0 --max-instances 50",
      "description": "Déploiement d'un conteneur serverless avec passage automatique à 0 instance"
    },
    "relatedFlashcardKeywords": [
      "Fargate",
      "Cloud Run",
      "Serverless",
      "Conteneurs",
      "MicroVM"
    ],
    "relatedArticleId": "art-serverless-event-driven",
    "tags": [
      "Serverless",
      "Fargate",
      "Cloud Run",
      "Docker",
      "Microservices",
      "Scale-to-Zero"
    ]
  },
  {
    "id": "term-faas-lambda",
    "term": "Function-as-a-Service (FaaS) — AWS Lambda, Azure Functions, Cloud Functions",
    "acronym": "FaaS / Lambda",
    "category": "Compute & Conteneurs",
    "shortDef": "Modèle d'exécution de code événementiel (Event-Driven) sans provisionnement de serveur, où le code s'exécute uniquement en réponse à un déclencheur.",
    "fullExplanation": "Le FaaS représente le sommet de l'abstraction compute. Une fonction est déclenchée par des événements (requête API Gateway, modification d'objet dans S3, message dans une file SQS/Kafka, stream Kinesis, cron EventBridge). En l'absence d'événement, aucun coût n'est engendré. Défi architectural majeur : le 'Cold Start' (démarrage à froid), qui correspond au temps nécessaire pour initialiser l'environnement d'exécution (téléchargement du code, démarrage de la micro-VM, initialisation du runtime Node.js/Python/Java). Des mécanismes comme AWS Lambda SnapStart (instantanés de mémoire Firecracker) ou Provisioned Concurrency éliminent ce temps de latence pour les APIs critiques.",
    "rfcOrStandard": "CloudEvents Specification (CNCF Serverless Working Group)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "AWS Lambda",
        "details": "Jusqu'à 10 GB de RAM, 15 min d'exécution max, SnapStart"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Functions",
        "details": "Plans Consumption, Premium et Dedicated"
      },
      {
        "provider": "GCP",
        "serviceName": "Google Cloud Functions (2nd Gen)",
        "details": "Construit au-dessus de Google Cloud Run et Eventarc"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws lambda update-function-configuration --function-name process-payment --memory-size 1024 --timeout 30",
      "description": "Ajustement des ressources mémoire et du timeout d'une fonction Lambda"
    },
    "relatedFlashcardKeywords": [
      "Lambda",
      "Serverless",
      "Event-Driven",
      "Cold Start",
      "FaaS"
    ],
    "relatedArticleId": "art-serverless-event-driven",
    "tags": [
      "Lambda",
      "FaaS",
      "Serverless",
      "Événementiel",
      "Cold Start"
    ]
  },
  {
    "id": "term-iam-roles-sts",
    "term": "IAM Roles & Security Token Service (STS) AssumeRole",
    "acronym": "IAM / STS",
    "category": "Sécurité, IAM & Conformité",
    "shortDef": "Mécanisme d'octroi d'identités temporaires sécurisées permettant à des services ou applications d'accéder à des ressources sans identifiants permanents codés en dur.",
    "fullExplanation": "L'utilisation de clés d'accès permanentes (Access Key ID et Secret Access Key) dans le code est l'une des causes majeures de compromission dans le Cloud. Les rôles IAM résolvent ce problème en s'appuyant sur l'AWS Security Token Service (STS). Lorsqu'une ressource (instance EC2, Pod EKS, conteneur Fargate) a besoin d'agir, elle invoque l'API 'sts:AssumeRole'. STS génère dynamiquement un triplet d'identifiants temporaires cryptographiques (AccessKeyId, SecretAccessKey, SessionToken) avec une durée de vie limitée (de 15 minutes à 12 heures) renouvelée automatiquement par le SDK via le service de métadonnées d'instance (IMDSv2). Ce mécanisme est également au cœur de l'authentification inter-comptes (Cross-Account Role Delegation).",
    "rfcOrStandard": "RFC 7519 (JSON Web Token), OAuth 2.0 Token Exchange (RFC 8693)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "AWS IAM Roles & AWS STS",
        "details": "AssumeRole, WebIdentityToken, Instance Profile"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Managed Identities (Entra ID)",
        "details": "System-Assigned & User-Assigned Managed Identity"
      },
      {
        "provider": "GCP",
        "serviceName": "Service Accounts & Workload Identity",
        "details": "Génération de jetons OAuth 2.0 à durée limitée"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws sts assume-role --role-arn arn:aws:iam::123456789012:role/DeployPipelineRole --role-session-name ci-pipeline-session",
      "description": "Obtention de jetons d'authentification temporaires via STS AssumeRole"
    },
    "relatedFlashcardKeywords": [
      "IAM",
      "STS",
      "AssumeRole",
      "Zero Trust",
      "SECPLUS-D4"
    ],
    "relatedArticleId": "art-cloud-security-zero-trust",
    "tags": [
      "IAM",
      "STS",
      "AssumeRole",
      "Sécurité",
      "Jetons",
      "Identité"
    ]
  },
  {
    "id": "term-workload-identity-federation",
    "term": "Workload Identity Federation (OIDC / SPIFFE)",
    "acronym": "WIF / OIDC",
    "category": "Sécurité, IAM & Conformité",
    "shortDef": "Fédération d'identité permettant aux charges de travail hors-cloud (GitHub Actions, GitLab, clusters Kubernetes on-premises) de s'authentifier directement via OpenID Connect.",
    "fullExplanation": "Historiquement, pour déployer dans le Cloud depuis un pipeline CI/CD externe (ex: GitHub Actions), les ingénieurs devaient stocker des clés API statiques dans les secrets du repository. Avec Workload Identity Federation, le pipeline CI/CD demande un jeton d'identité JWT (JSON Web Token) signé cryptographiquement par le fournisseur OIDC (ex: token.actions.githubusercontent.com). Le fournisseur Cloud vérifie la signature de ce jeton via les clés publiques JWKS de GitHub, valide les conditions de sujet (Subject Claim : ex: repo:my-org/core-infra:ref:refs/heads/main), et échange directement ce jeton contre des identifiants cloud temporaires à durée de vie courte. Aucun secret statique n'est jamais stocké.",
    "rfcOrStandard": "OpenID Connect Core 1.0, RFC 7519 (JWT), RFC 8693 (Token Exchange)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "IAM Identity Center & OIDC Identity Provider",
        "details": "AssumeRoleWithWebIdentity"
      },
      {
        "provider": "GCP",
        "serviceName": "Workload Identity Federation",
        "details": "Pools et Providers WIF compatibles OIDC et SAML"
      },
      {
        "provider": "Azure",
        "serviceName": "Workload Identity Federation (Entra ID)",
        "details": "Federated Identity Credentials pour App Registrations"
      }
    ],
    "cliExample": {
      "tool": "gcloud",
      "command": "gcloud iam workload-identity-pools providers create-oidc github-provider --workload-identity-pool=ci-pool --issuer-uri=https://token.actions.githubusercontent.com --attribute-mapping='google.subject=assertion.sub'",
      "description": "Configuration d'un fournisseur d'identité OIDC fédéré pour GitHub Actions"
    },
    "relatedFlashcardKeywords": [
      "OIDC",
      "JWT",
      "Workload Identity",
      "GitHub Actions",
      "SECPLUS-D4"
    ],
    "relatedArticleId": "art-cloud-security-zero-trust",
    "tags": [
      "OIDC",
      "WIF",
      "CI/CD",
      "Zero Secret",
      "GitHub Actions",
      "Sécurité"
    ]
  },
  {
    "id": "term-kms-envelope-encryption",
    "term": "KMS & Chiffrement par Enveloppe (Envelope Encryption)",
    "acronym": "KMS",
    "category": "Sécurité, IAM & Conformité",
    "shortDef": "Technique cryptographique consistant à chiffrer les données avec une clé locale (Data Key), elle-même chiffrée par une clé racine maîtresse (Key Encryption Key) gérée dans un HSM.",
    "fullExplanation": "Chiffrer de gros volumes de données (fichiers de plusieurs gigaoctets dans S3 ou volumes EBS) directement en envoyant les données au service KMS entraînerait une saturation du réseau et des coûts d'API prohibitifs. Le chiffrement par enveloppe résout ce problème : 1) Le service demande à KMS une clé de données (Data Encryption Key - DEK) protégée par la clé maîtresse (Customer Master Key - CMK / KMS Key). 2) KMS renvoie la DEK en clair et la DEK chiffrée. 3) L'application chiffre localement les données volumineuses avec la DEK en clair à l'aide d'un algorithme symétrique rapide (AES-256-GCM). 4) L'application détruit la DEK en clair de sa mémoire et stocke la DEK chiffrée juste à côté des données chiffrées (dans les métadonnées). Pour déchiffrer, seul KMS disposant de la CMK stockée dans un HSM certifié FIPS 140-2/3 peut déchiffrer la DEK.",
    "rfcOrStandard": "NIST SP 800-57 (Key Management), FIPS 140-2 / FIPS 140-3 Cryptographic Modules",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "AWS Key Management Service (KMS)",
        "details": "HSM certifiés FIPS 140-2 niveau 3, support multi-région"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Key Vault & Managed HSM",
        "details": "Clés de chiffrement et gestion de secrets"
      },
      {
        "provider": "GCP",
        "serviceName": "Cloud KMS & Cloud HSM",
        "details": "Clés symétriques/asymétriques avec rotation automatique"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws kms generate-data-key --key-id arn:aws:kms:eu-west-3:123456789012:key/abcd-1234 --key-spec AES_256",
      "description": "Génération d'une paire de clés de données (en clair et chiffrée) pour chiffrement d'enveloppe"
    },
    "relatedFlashcardKeywords": [
      "KMS",
      "Chiffrement",
      "Envelope Encryption",
      "AES-256",
      "SECPLUS-D4"
    ],
    "relatedArticleId": "art-cloud-security-zero-trust",
    "tags": [
      "KMS",
      "Chiffrement",
      "HSM",
      "Envelope Encryption",
      "AES-256"
    ]
  },
  {
    "id": "term-waf-shield",
    "term": "WAF (Web Application Firewall) & Protection Anti-DDoS",
    "acronym": "WAF / DDoS",
    "category": "Sécurité, IAM & Conformité",
    "shortDef": "Pare-feu de couche 7 inspectant le trafic web pour bloquer les attaques applicatives (OWASP Top 10) combiné à une atténuation volumétrique DDoS L3/L4.",
    "fullExplanation": "Un WAF inspecte les requêtes HTTP/HTTPS à l'entrée des points de présence CDN (CloudFront, Cloud CDN) ou des répartiteurs de charge (ALB, App Gateway). Il applique des règles managées contre les injections SQL (SQLi), les scripts intersites (XSS), la manipulation d'en-têtes, et implémente des limitations de débit (Rate-Based Rules) pour neutraliser les attaques par force brute ou scraping. Face aux attaques par déni de service distribué (DDoS), la protection est assurée à deux niveaux : 1) Couches 3 et 4 (DDoS d'infrastructure : SYN floods, UDP amplification) absorbées automatiquement par des réseaux mondiaux Anycast (ex: AWS Shield Standard, Cloudflare). 2) Couche 7 (DDoS applicatif : HTTP floods, Slowloris) mitigées par le WAF avec des règles de défi automatisé (CAPTCHA silencieux, jetons de validation JavaScript).",
    "rfcOrStandard": "OWASP Top 10 Web Application Security Risks, NIST SP 800-44",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "AWS WAF & AWS Shield (Standard / Advanced)",
        "details": "Intégration native CloudFront, ALB, API Gateway"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure WAF & Azure DDoS Protection",
        "details": "Protection sur Application Gateway, Front Door"
      },
      {
        "provider": "GCP",
        "serviceName": "Google Cloud Armor",
        "details": "WAF L7 et protection DDoS basée sur l'infrastructure Google"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws wafv2 create-web-acl --name prod-api-protection --scope REGIONAL --default-action Allow={} --visibility-config SampledRequestsEnabled=true,CloudWatchMetricsEnabled=true,MetricName=ProdWAF",
      "description": "Création d'une WebACL WAF pour protection d'un Application Load Balancer"
    },
    "relatedFlashcardKeywords": [
      "WAF",
      "DDoS",
      "OWASP",
      "Cloud Armor",
      "SECPLUS-D4"
    ],
    "relatedArticleId": "art-cloud-security-zero-trust",
    "tags": [
      "WAF",
      "DDoS",
      "Sécurité",
      "OWASP",
      "Protection",
      "L7"
    ]
  },
  {
    "id": "term-object-storage-s3",
    "term": "Stockage Objet — Amazon S3, Azure Blob, Google Cloud Storage",
    "acronym": "S3 / Blob / GCS",
    "category": "Stockage & Données",
    "shortDef": "Stockage de données non structurées à l'échelle du pétaoctet, accessible via API REST/HTTP, offrant une durabilité de 99,999999999% (11 9's).",
    "fullExplanation": "Contrairement au stockage bloc (EBS) ou fichier (EFS), le stockage objet stocke les données sous forme d'objets immuables composés de données, d'une clé d'identification unique (URI) et de métadonnées personnalisables. La durabilité exceptionnelle de 11 9's est obtenue par réplication synchrone et code à effacement (Erasure Coding) réparti sur au moins 3 zones de disponibilité géographiquement distinctes. Fonctionnalités indispensables en entreprise : 1) Cycles de vie (Lifecycle Rules) pour migrer automatiquement les données froides vers des classes d'archivage (S3 Glacier Deep Archive à coût dérisoire). 2) S3 Object Lock (WORM - Write Once, Read Many) en mode Compliance pour rendre les sauvegardes strictement inaltérables et inviolables face aux ransomwares. 3) Chiffrement SSE-KMS et réplication inter-région (CRR - Cross-Region Replication).",
    "rfcOrStandard": "RESTful Storage Architecture, WORM Compliance (SEC Rule 17a-4)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "Amazon S3",
        "details": "Classes Standard, Intelligent-Tiering, Glacier, S3 Express One Zone"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Blob Storage",
        "details": "Tiers Hot, Cool, Cold, Archive avec Data Lake Gen2"
      },
      {
        "provider": "GCP",
        "serviceName": "Google Cloud Storage (GCS)",
        "details": "Standard, Nearline, Coldline, Archive avec dual-region"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws s3api put-bucket-versioning --bucket corp-audit-logs --versioning-configuration Status=Enabled",
      "description": "Activation du versioning sur un bucket S3 pour conformité et protection anti-suppression"
    },
    "relatedFlashcardKeywords": [
      "S3",
      "Stockage Objet",
      "WORM",
      "Glacier",
      "Durabilité"
    ],
    "relatedArticleId": "art-finops-well-architected",
    "tags": [
      "S3",
      "Blob",
      "GCS",
      "Stockage",
      "WORM",
      "Glacier",
      "Durabilité"
    ]
  },
  {
    "id": "term-block-storage-ebs",
    "term": "Stockage Bloc — Amazon EBS, Azure Managed Disks, GCP Persistent Disks",
    "acronym": "EBS / Disques",
    "category": "Stockage & Données",
    "shortDef": "Volumes disques haute performance attachés au réseau via le bus PCIe/NVMe d'une machine virtuelle pour exécuter des bases de données et systèmes de fichiers.",
    "fullExplanation": "Le stockage bloc fournit un périphérique brut de niveau bloc (raw block device) exposé au système d'exploitation de la machine virtuelle. Les données sont persistées indépendamment du cycle de vie de l'instance. Sur AWS, les volumes EBS sont de plusieurs types : 1) Général (gp3) offrant un débit de 125 MB/s et 3000 IOPS de base découplés de la taille du volume. 2) Provisioned IOPS SSD (io2 Block Express) délivrant jusqu'à 256 000 IOPS et 4 000 MB/s de débit avec une latence sub-milliseconde pour les bases de données transactionnelles lourdes (Oracle, SQL Server, SAP HANA). Les volumes EBS supportent le chiffrement transparent natif géré par KMS et les instantanés (EBS Snapshots) différentiels sauvegardés dans Amazon S3.",
    "rfcOrStandard": "NVMe-over-Fabrics (NVMe-oF), POSIX Block Device Standards",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "Amazon Elastic Block Store (EBS)",
        "details": "gp3, io2 Block Express, st1, sc1"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Managed Disks",
        "details": "Ultra Disk, Premium SSD v2, Standard SSD"
      },
      {
        "provider": "GCP",
        "serviceName": "Persistent Disk & Hyperdisk",
        "details": "Hyperdisk Extreme, Balanced, Zonal/Regional PD"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws ec2 create-volume --volume-type gp3 --size 200 --iops 6000 --throughput 250 --availability-zone eu-west-3a --encrypted",
      "description": "Création d'un volume EBS gp3 chiffré avec 6000 IOPS provisionnés"
    },
    "relatedFlashcardKeywords": [
      "EBS",
      "IOPS",
      "Stockage Bloc",
      "NVMe",
      "KMS"
    ],
    "relatedArticleId": "art-finops-well-architected",
    "tags": [
      "EBS",
      "Disque",
      "IOPS",
      "Stockage Bloc",
      "NVMe",
      "Base de données"
    ]
  },
  {
    "id": "term-cloud-spanner-aurora",
    "term": "Bases de Données Globales — Google Cloud Spanner & Amazon Aurora",
    "acronym": "Spanner / Aurora",
    "category": "Stockage & Données",
    "shortDef": "Systèmes de bases de données relationnelles cloud-natives combinant la cohérence ACID stricte et la scalabilité horizontale mondiale.",
    "fullExplanation": "Historiquement, le théorème CAP stipulait qu'une base distribuée devait choisir entre cohérence (Consistency) et disponibilité (Availability) lors d'un partitionnement réseau. Google Cloud Spanner a révolutionné ce domaine en devenant la première base de données distribuée mondialement avec une cohérence stricte (External Consistency) et une haute disponibilité (99,999%), rendue possible par l'infrastructure matérielle 'TrueTime' (horloges atomiques et récepteurs GPS intégrés dans chaque datacenter pour borner rigoureusement l'incertitude temporelle epsilon). Amazon Aurora réinvente quant à lui le moteur MySQL/PostgreSQL en découplant le moteur de calcul (Compute) et la couche de stockage (Storage) : le stockage est distribué sur 6 répliques dans 3 zones de disponibilité avec quorum 4/6 pour l'écriture et réparation continue sans impact sur les performances.",
    "rfcOrStandard": "Google Spanner TrueTime Paper (OSDI 2012), Amazon Aurora Architecture Paper (SIGMOD 2017)",
    "providers": [
      {
        "provider": "GCP",
        "serviceName": "Google Cloud Spanner",
        "details": "Bases SQL globalement distribuées avec horloges atomiques TrueTime"
      },
      {
        "provider": "AWS",
        "serviceName": "Amazon Aurora (MySQL / PostgreSQL)",
        "details": "Stockage distribué découplé sur 3 AZ, Aurora Serverless v2"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Cosmos DB",
        "details": "Multi-modèle NoSQL/SQL distribué mondialement avec 5 niveaux de cohérence"
      }
    ],
    "cliExample": {
      "tool": "gcloud",
      "command": "gcloud spanner instances create prod-core-db --config=regional-europe-west1 --nodes=3 --description='Production Core Bank DB'",
      "description": "Création d'une instance Cloud Spanner multi-nœuds avec cohérence stricte"
    },
    "relatedFlashcardKeywords": [
      "Aurora",
      "Spanner",
      "ACID",
      "TrueTime",
      "Bases de Données"
    ],
    "relatedArticleId": "art-finops-well-architected",
    "tags": [
      "Base de données",
      "Spanner",
      "Aurora",
      "ACID",
      "TrueTime",
      "Haute Disponibilité"
    ]
  },
  {
    "id": "term-terraform-opentofu",
    "term": "Terraform & OpenTofu (Infrastructure as Code - IaC)",
    "acronym": "IaC / Terraform",
    "category": "DevOps, CI/CD & IaC",
    "shortDef": "Outil déclaratif d'Infrastructure as Code (IaC) permettant de définir, prévisualiser et provisionner des ressources cloud multi-fournisseurs de manière reproductible.",
    "fullExplanation": "L'approche déclarative de Terraform (langage HCL - HashiCorp Configuration Language) permet de décrire l'état cible souhaité de l'infrastructure plutôt que les étapes impératives pour y parvenir. Le cœur de son fonctionnement repose sur le fichier d'état ('terraform.tfstate') qui fait le lien entre la réalité des ressources cloud provisionnées et le code source. En production d'entreprise, le 'Remote State' est stocké dans un bucket S3 chiffré (avec versioning) couplé à un mécanisme de verrouillage distribué (State Locking) via une table Amazon DynamoDB pour empêcher l'exécution concurrente conflictuelle de deux pipelines de déploiement. Le cycle de vie comprend : 'terraform init' (téléchargement des providers), 'terraform plan' (calcul du graphe de dépendances différentiel) et 'terraform apply' (exécution transactionnelle idempotente).",
    "rfcOrStandard": "HCL (HashiCorp Configuration Language), Declarative Systems Engineering",
    "providers": [
      {
        "provider": "Standard",
        "serviceName": "Terraform / OpenTofu",
        "details": "Multi-cloud, standard mondial de facto pour l'IaC"
      },
      {
        "provider": "AWS",
        "serviceName": "AWS CloudFormation & AWS CDK",
        "details": "IaC natif AWS en JSON/YAML ou TypeScript/Python"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Bicep & ARM Templates",
        "details": "Langage déclaratif spécifique à Azure Resource Manager"
      }
    ],
    "cliExample": {
      "tool": "terraform",
      "command": "terraform plan -out=tfplan.binary && terraform apply tfplan.binary",
      "description": "Génération d'un plan d'exécution vérifié et application atomique de l'infrastructure"
    },
    "relatedFlashcardKeywords": [
      "Terraform",
      "IaC",
      "Automatisation",
      "HCL",
      "CCNA-D6",
      "ENCOR-D6"
    ],
    "relatedArticleId": "art-iac-gitops-automation",
    "tags": [
      "Terraform",
      "OpenTofu",
      "IaC",
      "HCL",
      "DevOps",
      "Automatisation"
    ]
  },
  {
    "id": "term-gitops-argocd",
    "term": "GitOps & Déploiement Continu Déclaratif (ArgoCD / Flux)",
    "acronym": "GitOps",
    "category": "DevOps, CI/CD & IaC",
    "shortDef": "Pratique opérationnelle utilisant un dépôt Git comme unique source de vérité pour l'infrastructure et les applications, avec synchronisation continue automatisée.",
    "fullExplanation": "Contrairement aux pipelines CI/CD traditionnels qui 'poussent' des modifications vers le cluster (Push-based avec credentials administrateur stockés dans la CI), GitOps fonctionne sur un modèle 'Pull-based'. Un agent opérateur déployé au cœur du cluster (ex: ArgoCD ou Flux CD) scrute en continu le dépôt Git. Il compare en permanence l'état décrit dans les manifestes déclaratifs (Kustomize, Helm) avec l'état réel des ressources Kubernetes en cours d'exécution. Dès qu'un écart (Drift) est détecté (soit par commit sur Git, soit par modification manuelle clandestine sur le cluster), l'opérateur déclenche une boucle de réconciliation (Reconciliation Loop) pour ramener automatiquement le cluster à l'état désiré ou envoyer une alerte de divergence.",
    "rfcOrStandard": "OpenGitOps Principles (opengitops.dev) - CNCF Incubating",
    "providers": [
      {
        "provider": "CNCF",
        "serviceName": "ArgoCD & Flux CD",
        "details": "Standards GitOps pour Kubernetes"
      },
      {
        "provider": "AWS",
        "serviceName": "AWS Proton & CodePipeline",
        "details": "Plateforme d'orchestration de templates d'environnements"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Arc-enabled Kubernetes with GitOps",
        "details": "Gestion de clusters hybrides pilotée par Flux"
      }
    ],
    "cliExample": {
      "tool": "kubectl",
      "command": "argocd app sync core-ecommerce-prod --prune",
      "description": "Synchronisation manuelle forcée de l'état Git vers le cluster avec nettoyage des orphelins"
    },
    "relatedFlashcardKeywords": [
      "GitOps",
      "ArgoCD",
      "Kubernetes",
      "CI/CD",
      "Automatisation"
    ],
    "relatedArticleId": "art-iac-gitops-automation",
    "tags": [
      "GitOps",
      "ArgoCD",
      "Kubernetes",
      "Déploiement",
      "CI/CD",
      "Reconciliation"
    ]
  },
  {
    "id": "term-finops-lifecycle",
    "term": "FinOps (Cloud Financial Operations) & Optimisation des Coûts",
    "acronym": "FinOps",
    "category": "Architecture & FinOps",
    "shortDef": "Discipline culturelle et opérationnelle unifiant ingénierie, finance et métiers pour maximiser la valeur commerciale de chaque euro dépensé dans le Cloud.",
    "fullExplanation": "Le passage des dépenses d'investissement matériel (CapEx) aux dépenses d'exploitation variables à l'usage (OpEx) nécessite une gouvernance rigoureuse. Le framework FinOps s'articule autour de 3 phases itératives : 1) Inform (Informer) : Allocation précise des coûts grâce à une politique de tagging stricte (Cost Allocation Tags : environnement, centre de coût, propriétaire), visualisation des anomalies et métriques unitaires. 2) Optimize (Optimiser) : Réduction des gaspillages (Right-sizing des instances surdimensionnées, extinction des environnements hors-heures, suppression des volumes orphelins) et optimisation des tarifs via des engagements de consommation (Savings Plans à 1 ou 3 ans avec remises jusqu'à 72%, Reserved Instances) et l'usage d'instances Spot pour les charges tolérantes aux interruptions. 3) Operate (Opérer) : Automatisation continue des politiques et intégration du coût dans les revues d'architecture logicielle.",
    "rfcOrStandard": "FinOps Foundation Framework (finops.org - Linux Foundation)",
    "providers": [
      {
        "provider": "Standard",
        "serviceName": "FinOps Foundation Framework",
        "details": "Méthodologie standardisée Inform / Optimize / Operate"
      },
      {
        "provider": "AWS",
        "serviceName": "AWS Cost Explorer & Compute Optimizer",
        "details": "Recommandations de dimensionnement par IA et suivi budgétaire"
      },
      {
        "provider": "Azure",
        "serviceName": "Microsoft Cost Management & Advisor",
        "details": "Analyse de dépenses et optimisation de réservations"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws ce get-cost-and-usage --time-period Start=2026-08-01,End=2026-09-01 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=SERVICE",
      "description": "Extraction de la répartition mensuelle des coûts cloud par service via l'API Cost Explorer"
    },
    "relatedFlashcardKeywords": [
      "FinOps",
      "Savings Plans",
      "Spot Instances",
      "CapEx",
      "OpEx"
    ],
    "relatedArticleId": "art-finops-well-architected",
    "tags": [
      "FinOps",
      "Coûts",
      "Savings Plans",
      "Optimisation",
      "Budget"
    ]
  },
  {
    "id": "term-disaster-recovery-strategies",
    "term": "Stratégies de Plan de Reprise d'Activité (PRA / Disaster Recovery)",
    "acronym": "PRA / DR",
    "category": "Architecture & FinOps",
    "shortDef": "Méthodologies architecturales de reprise après sinistre définies par deux métriques critiques : le RTO (temps de reprise) et le RPO (perte de données tolérée).",
    "fullExplanation": "Toute stratégie de résilience cloud s'évalue selon deux métriques clés : le RTO (Recovery Time Objective - temps maximal pour rétablir le service) et le RPO (Recovery Point Objective - volume maximal de données perdues mesuré en temps). Il existe 4 grands modèles d'architecture multi-région, du moins coûteux au plus résilient : 1) Backup & Restore (RTO: heures, RPO: 24h) : Sauvegarde régulière dans une autre région, provisionnement à froid lors d'une catastrophe. 2) Pilot Light (RTO: dizaines de minutes, RPO: minutes) : La base de données tourne en continu en réplication synchrone/asynchrone dans la région secondaire, mais le compute n'est démarré qu'en cas d'urgence via IaC. 3) Warm Standby (RTO: minutes, RPO: secondes) : Une version miniature fonctionnelle de l'application tourne en permanence dans la région de secours et monte à l'échelle automatiquement lors d'un basculement. 4) Multi-Site Active-Active (RTO: quasi-nul, RPO: nul) : L'application sert le trafic simultanément sur au moins deux régions cloud avec équilibrage global Anycast/DNS (Route 53 latency routing) et bases de données à réplication multi-régions.",
    "rfcOrStandard": "NIST SP 800-34 (Contingency Planning Guide for Federal Information Systems)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "AWS Elastic Disaster Recovery (DRS)",
        "details": "Réplication bloc continue au niveau de l'OS"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Site Recovery (ASR)",
        "details": "Orchestration et réplication de machines virtuelles"
      },
      {
        "provider": "GCP",
        "serviceName": "Google Cloud Backup and DR Service",
        "details": "Gestion centralisée des plans de reprise"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws route53 change-resource-record-sets --hosted-zone-id Z12345 --change-batch file://failover-dns-policy.json",
      "description": "Bascule DNS d'urgence vers la région de reprise d'activité suite à un incident majeur"
    },
    "relatedFlashcardKeywords": [
      "Disaster Recovery",
      "RTO",
      "RPO",
      "Active-Active",
      "Pilot Light",
      "ENCOR-D1"
    ],
    "relatedArticleId": "art-finops-well-architected",
    "tags": [
      "PRA",
      "DR",
      "RTO",
      "RPO",
      "Résilience",
      "Multi-Région",
      "Haute Disponibilité"
    ]
  },
  {
    "id": "term-subnet",
    "term": "Sous-Réseaux Cloud (Public, Privé, Isolé)",
    "acronym": "Subnet",
    "category": "Réseau & Interconnexion",
    "shortDef": "Segment d'adressage IP découpé au sein d'un VPC et rattaché à une zone de disponibilité spécifique (AZ).",
    "fullExplanation": "Un sous-réseau cloud représente un domaine de diffusion de niveau 3 borné par un bloc CIDR (ex: /24). 1) Sous-réseau Public : Sa table de routage contient une route par défaut (0.0.0.0/0) pointant vers une Internet Gateway (IGW), et ses instances reçoivent des adresses IPv4 publiques. 2) Sous-réseau Privé : Sa route par défaut pointe vers une NAT Gateway, autorisant les sorties vers Internet mais bloquant les entrées. 3) Sous-réseau Isolé (Database) : Aucune route vers Internet (ni IGW, ni NAT-GW). La communication s'effectue exclusivement en interne avec les couches applicatives et via des VPC Endpoints pour les services managés. Note AWS : Sur tout sous-réseau IPv4, 5 adresses IP sont réservées (Réseau .0, Routeur .1, DNS .2, Futur .3, Broadcast .255).",
    "rfcOrStandard": "RFC 950 (Internet Subnetting), RFC 1918",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "VPC Subnet",
        "details": "Strictement zonal (lié à 1 AZ), 5 IPs réservées par subnet"
      },
      {
        "provider": "Azure",
        "serviceName": "VNet Subnet",
        "details": "Régional, 5 IPs réservées par subnet"
      },
      {
        "provider": "GCP",
        "serviceName": "VPC Subnet",
        "details": "Régional avec adresses IP primaires et secondaires"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws ec2 create-subnet --vpc-id vpc-0123 --cidr-block 10.100.10.0/24 --availability-zone eu-west-3a",
      "description": "Création d'un sous-réseau privé dans la zone de disponibilité eu-west-3a"
    },
    "relatedFlashcardKeywords": [
      "Sous-réseau",
      "CIDR",
      "VPC",
      "AZ",
      "CCNA-D1"
    ],
    "relatedArticleId": "art-cloud-transit-routing",
    "tags": [
      "Subnet",
      "VPC",
      "CIDR",
      "Public",
      "Privé",
      "Isolé"
    ]
  },
  {
    "id": "term-igw",
    "term": "Internet Gateway (IGW) & Egress-Only Internet Gateway",
    "acronym": "IGW / EIGW",
    "category": "Réseau & Interconnexion",
    "shortDef": "Composant VPC virtuel hautement disponible assurant la translation d'adresses réseau (1:1 NAT) entre les adresses IP privées et publiques des instances.",
    "fullExplanation": "L'Internet Gateway n'est pas une machine physique ou un gouffre d'étranglement : c'est un routeur logiciel distribué et redondant intégré à la fabrique SDN du cloud sans limitation de bande passante. Pour les communications IPv4, l'IGW effectue une translation 1:1 NAT bidirectionnelle entre l'IP privée de l'ENI et son IP publique élastique. Pour IPv6 (adresses routables globalement sans NAT), AWS propose l'Egress-Only Internet Gateway (EIGW) qui permet aux instances privées de joindre Internet en IPv6 tout en interdisant formellement l'initiation de connexions entrantes depuis l'extérieur (équivalent d'une NAT Gateway pour IPv6).",
    "rfcOrStandard": "RFC 4862 (IPv6 Stateless Address Autoconfiguration), RFC 1631",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "Internet Gateway & Egress-Only IGW",
        "details": "Composant managé sans goulot d'étranglement"
      },
      {
        "provider": "Azure",
        "serviceName": "Default Outbound Access / NAT Gateway",
        "details": "Accès Internet via passerelle explicite"
      },
      {
        "provider": "GCP",
        "serviceName": "Default Internet Gateway",
        "details": "Route implicite 0.0.0.0/0 vers next-hop default-internet-gateway"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws ec2 attach-internet-gateway --internet-gateway-id igw-0987654321 --vpc-id vpc-0123456789",
      "description": "Rattachement d'une passerelle Internet Gateway à un VPC"
    },
    "relatedFlashcardKeywords": [
      "Internet Gateway",
      "IGW",
      "NAT",
      "IPv6",
      "CCNA-D1"
    ],
    "relatedArticleId": "art-cloud-transit-routing",
    "tags": [
      "IGW",
      "EIGW",
      "Internet",
      "IPv4",
      "IPv6",
      "Routage"
    ]
  },
  {
    "id": "term-jumbo-frames-mtu",
    "term": "Jumbo Frames (MTU 9001) & Path MTU Discovery (PMTUD)",
    "acronym": "MTU / Jumbo",
    "category": "Réseau & Interconnexion",
    "shortDef": "Trames réseau Ethernet dont la charge utile (Payload) atteint 9000 octets au lieu des 1500 octets standard, réduisant la surcharge CPU pour les transferts massifs.",
    "fullExplanation": "Le MTU (Maximum Transmission Unit) standard d'Ethernet est de 1500 octets. Dans le cloud, les réseaux VPC internes, les connexions Direct Connect et les peerings intra-région supportent les Jumbo Frames avec un MTU de 9001 octets. Avantages majeurs : pour transférer 9000 octets de données, l'OS n'émet qu'un seul paquet au lieu de 6 paquets de 1500 octets, divisant par 6 les interruptions processeur (softirq) et les en-têtes IP/TCP. Attention critique : le trafic traversant l'Internet public ou un peering inter-région retombe obligatoirement à un MTU de 1500 octets. Si un paquet de 9001 octets avec le bit DF (Don't Fragment) rencontre un saut à MTU 1500, le routeur rejette le paquet et renvoie un message ICMP Type 3 Code 4 ('Fragmentation Needed and DF set'). Si les Security Groups ou NACLs bloquent l'ICMP, la connexion se bloque silencieusement (Black Hole PMTUD).",
    "rfcOrStandard": "RFC 1191 (Path MTU Discovery), RFC 4821 (Packetization Layer PMTUD)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "EC2 Jumbo Frames (MTU 9001)",
        "details": "Supporté dans le VPC, Direct Connect et Placement Groups"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure VM Accelerated Networking",
        "details": "MTU standard 1500 avec support Jumbo sur ExpressRoute"
      },
      {
        "provider": "GCP",
        "serviceName": "GCP Jumbo Frames (MTU 8896)",
        "details": "Supporté pour instances et Cloud Interconnect"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "ip link set dev eth0 mtu 9001 && tracepath -n 10.100.2.20",
      "description": "Configuration du MTU 9001 et test de détection du MTU de chemin (PMTUD)"
    },
    "relatedFlashcardKeywords": [
      "MTU",
      "Jumbo Frames",
      "PMTUD",
      "ICMP",
      "CCNA-D1",
      "ENCOR-D1"
    ],
    "relatedArticleId": "art-cloud-hybrid-interconnect",
    "tags": [
      "MTU",
      "Jumbo Frames",
      "PMTUD",
      "Ethernet",
      "Performances",
      "ICMP"
    ]
  },
  {
    "id": "term-global-accelerator-anycast",
    "term": "Routage Anycast & AWS Global Accelerator / Cloud CDN",
    "acronym": "Anycast",
    "category": "Réseau & Interconnexion",
    "shortDef": "Technologie réseau annonçant la même adresse IP statique depuis des dizaines de points de présence (Edge Locations) mondiaux via BGP Anycast.",
    "fullExplanation": "Dans le routage Unicast classique, une adresse IP correspond à une seule machine ou interface dans une région précise. Le routage Anycast (RFC 4786) annonce la même adresse IP publique simultanément depuis tous les points de présence mondiaux de l'opérateur cloud. Le protocole BGP oriente automatiquement les utilisateurs vers le point d'entrée le plus proche géographiquement avec le plus court chemin AS-Path. Le trafic pénètre immédiatement sur le réseau dorsal (Backbone) fibre optique ultra-rapide et privé du fournisseur cloud au lieu d'errer sur l'Internet public congestionné. AWS Global Accelerator fournit deux adresses Anycast statiques protégées contre les pannes régionales avec basculement automatique instantané (sub-minute failover).",
    "rfcOrStandard": "RFC 4786 (Operation of Anycast Services), RFC 7098",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "AWS Global Accelerator",
        "details": "Deux IPs Anycast statiques mondiales routant vers ALBs/NLBs"
      },
      {
        "provider": "GCP",
        "serviceName": "Cloud Load Balancing Premium Tier",
        "details": "IP Anycast globale routant sur le réseau Google mondial"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Front Door",
        "details": "CDN Anycast de couche 7 avec accélération TCP/WAF"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws globalaccelerator create-accelerator --name global-api-accel --ip-address-type IPV4",
      "description": "Création d'un accélérateur mondial fournissant deux adresses IP Anycast statiques"
    },
    "relatedFlashcardKeywords": [
      "Anycast",
      "Global Accelerator",
      "BGP",
      "AS-Path",
      "ENCOR-D3"
    ],
    "relatedArticleId": "art-cloud-hybrid-interconnect",
    "tags": [
      "Anycast",
      "Global Accelerator",
      "BGP",
      "Latence",
      "Réseau Mondial"
    ]
  },
  {
    "id": "term-cloud-wan",
    "term": "AWS Cloud WAN & SD-WAN Interconnect",
    "acronym": "Cloud WAN",
    "category": "Réseau & Interconnexion",
    "shortDef": "Service managé de réseau étendu (WAN) permettant de créer et de gérer un réseau mondial unifié reliant datacenters, succursales et VPCs multi-régions via un document de politique centrale.",
    "fullExplanation": "Tandis que la Transit Gateway gère le transit au niveau régional, AWS Cloud WAN abstrait la complexité de l'interconnexion mondiale multi-région. L'administrateur définit son réseau d'entreprise dans un document de politique centralisé (Core Network Policy en JSON). Cloud WAN déploie automatiquement les routeurs périphériques (Edge Locations), orchestre les tunnels BGP et segmente le trafic mondial en segments isolés (ex: segment Production, segment Développement, segment Invités) propagés automatiquement sur tous les continents sans configuration manuelle de peerings TGW croisés.",
    "rfcOrStandard": "Software-Defined Wide Area Network (SD-WAN Architecture)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "AWS Cloud WAN",
        "details": "Core Network Policy, attachements automatisés multi-régions"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Virtual WAN (Global Transit)",
        "details": "Interconnexion automatique de hubs virtuels mondiaux"
      },
      {
        "provider": "GCP",
        "serviceName": "Network Connectivity Center",
        "details": "Hub mondial avec support SD-WAN Router Appliance"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws networkmanager get-core-network --core-network-id core-network-0123456789abcdef0",
      "description": "Consultation de l'état du réseau dorsal mondial AWS Cloud WAN"
    },
    "relatedFlashcardKeywords": [
      "Cloud WAN",
      "SD-WAN",
      "Transit Gateway",
      "BGP",
      "ENCOR-D1",
      "ENCOR-D2"
    ],
    "relatedArticleId": "art-cloud-transit-routing",
    "tags": [
      "Cloud WAN",
      "SD-WAN",
      "Multi-Région",
      "Réseau Mondial",
      "Hub-and-Spoke"
    ]
  },
  {
    "id": "term-service-mesh",
    "term": "Service Mesh (Maillage de Services) — Istio, Envoy, Linkerd",
    "acronym": "Service Mesh",
    "category": "Compute & Conteneurs",
    "shortDef": "Couche d'infrastructure logicielle dédiée gérant les communications inter-microservices : chiffrement mTLS, observabilité fine, traçage distribué et routage de trafic.",
    "fullExplanation": "Dans une architecture de microservices composée de centaines de Pods, confier la sécurité (chiffrement TLS, rotation des certificats) et la résilience (retries, timeouts, circuit breaking) au code des développeurs est source d'incohérences. Le Service Mesh résout ce problème en injectant un proxy sidecar léger (généralement Envoy en C++) à côté de chaque conteneur applicatif. Tous les flux réseau est-ouest (inter-services) passent par le proxy. Le plan de contrôle (ex: Istiod) distribue automatiquement les certificats X.509 à durée de vie courte (généralement 24 heures) pour instaurer le mTLS (Mutual TLS) automatique et strict avec authentification bidirectionnelle des identités applicatives (SPIFFE ID).",
    "rfcOrStandard": "SPIFFE / SPIRE (Secure Production Identity Framework for Everyone)",
    "providers": [
      {
        "provider": "CNCF",
        "serviceName": "Istio, Envoy, Linkerd",
        "details": "Standards open source pour Kubernetes"
      },
      {
        "provider": "AWS",
        "serviceName": "AWS App Mesh / Amazon ECS Service Connect",
        "details": "Maillage de services basé sur Envoy"
      },
      {
        "provider": "GCP",
        "serviceName": "Anthos Service Mesh (ASM)",
        "details": "Version managée d'Istio entièrement supportée"
      }
    ],
    "cliExample": {
      "tool": "kubectl",
      "command": "istioctl authn tls-check payments-service.default.svc.cluster.local",
      "description": "Vérification de l'état du chiffrement mTLS mutuel entre microservices via Istio"
    },
    "relatedFlashcardKeywords": [
      "Service Mesh",
      "Istio",
      "Envoy",
      "mTLS",
      "Kubernetes",
      "Microservices"
    ],
    "relatedArticleId": "art-k8s-cni-networking",
    "tags": [
      "Service Mesh",
      "Istio",
      "Envoy",
      "mTLS",
      "Microservices",
      "Zero Trust"
    ]
  },
  {
    "id": "term-nitro-hypervisor",
    "term": "AWS Nitro System & Hyperviseur KVM Déporté",
    "acronym": "Nitro / KVM",
    "category": "Compute & Conteneurs",
    "shortDef": "Plateforme matérielle et logicielle propriétaire déportant les fonctions de virtualisation (réseau, stockage, sécurité) sur des puces ASIC dédiées (Nitro Cards).",
    "fullExplanation": "Traditionnellement, l'hyperviseur (ex: Xen ou VMware ESXi) tourne sur le processeur principal du serveur physique et consomme 15% à 30% des ressources de calcul pour gérer la couche réseau (vNICs), les entrées/sorties disques et la sécurité. Le système AWS Nitro réinvente la virtualisation en déportant l'intégralité de ces fonctions sur des cartes matérielles dédiées (Nitro Cards avec processeurs PCIe indépendants). Résultat : 1) L'hyperviseur KVM allégé ne fait plus que de l'isolation CPU/mémoire, libérant quasiment 100% du CPU hôte pour les machines virtuelles clientes (quasi 'Bare-Metal'). 2) Les cartes Nitro VPC Card gèrent l'encapsulation réseau ENA (Elastic Network Adapter) jusqu'à 400 Gbps avec chiffrement matériel. 3) La puce Nitro Security Chip verrouille matériellement la mémoire flash du serveur pour interdire toute modification de firmware non signée.",
    "rfcOrStandard": "Hardware Root of Trust & PCIe Offloading Architecture",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "AWS Nitro System",
        "details": "Cartes Nitro Card pour VPC, EBS, Local NVMe et sécurité"
      },
      {
        "provider": "GCP",
        "serviceName": "Titan Security Chip & Andromeda SDN",
        "details": "Puce matérielle Titan pour démarrage sécurisé"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Boost",
        "details": "Déchargement matériel sur puces dédiées pour stockage et réseau"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws ec2 describe-instance-types --instance-types c6i.4xlarge --query 'InstanceTypes[0].Hypervisor'",
      "description": "Vérification du support de l'hyperviseur Nitro sur l'instance"
    },
    "relatedFlashcardKeywords": [
      "Nitro",
      "Hyperviseur",
      "KVM",
      "Virtualisation",
      "ENCOR-D2"
    ],
    "relatedArticleId": "art-k8s-cni-networking",
    "tags": [
      "Nitro",
      "KVM",
      "Hyperviseur",
      "Hardware",
      "Virtualisation",
      "Performance"
    ]
  },
  {
    "id": "term-auto-scaling-groups",
    "term": "Auto Scaling Groups (ASG) & Horizontal Pod Autoscaler (HPA)",
    "acronym": "ASG / HPA",
    "category": "Compute & Conteneurs",
    "shortDef": "Mécanismes d'élasticité horizontale ajoutant ou supprimant dynamiquement des instances virtuelles ou des Pods selon la charge applicative réelle.",
    "fullExplanation": "L'élasticité est l'un des piliers du Cloud. Deux niveaux d'élasticité coexistent : 1) Au niveau infrastructure (Auto Scaling Groups) : Surveille des métriques CloudWatch (utilisation CPU moyenne, trafic réseau, latence cible ALB) pour provisionner de nouvelles instances EC2 dans des sous-réseaux multi-AZ. En cas de panne d'une instance (Health Check échoué), l'ASG la termine et la remplace automatiquement (Self-Healing). 2) Au niveau conteneurs (Horizontal Pod Autoscaler - HPA) : Surveille les métriques des Pods (CPU, mémoire ou métriques personnalisées Prometheus comme le nombre de messages dans une file RabbitMQ) pour ajuster le nombre de répliques d'un Deployment Kubernetes de 2 à 100 en quelques secondes.",
    "rfcOrStandard": "Kubernetes Autoscaling API & Cloud Elasticity Frameworks",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "Amazon EC2 Auto Scaling & Target Tracking",
        "details": "Politiques de dimensionnement par suivi de cible"
      },
      {
        "provider": "CNCF",
        "serviceName": "Horizontal Pod Autoscaler (HPA) & KEDA",
        "details": "Autoscaling événementiel pour Kubernetes"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Virtual Machine Scale Sets (VMSS)",
        "details": "Mise à l'échelle élastique de VMs Azure"
      }
    ],
    "cliExample": {
      "tool": "kubectl",
      "command": "kubectl autoscale deployment order-api --cpu-percent=70 --min=3 --max=20",
      "description": "Création d'une règle d'autoscaling HPA déclenchant l'ajout de Pods au-delà de 70% CPU"
    },
    "relatedFlashcardKeywords": [
      "Auto Scaling",
      "ASG",
      "HPA",
      "Élasticité",
      "Kubernetes",
      "ENCOR-D1"
    ],
    "relatedArticleId": "art-finops-well-architected",
    "tags": [
      "Auto Scaling",
      "ASG",
      "HPA",
      "Élasticité",
      "Kubernetes",
      "Haute Disponibilité"
    ]
  },
  {
    "id": "term-imdsv2",
    "term": "IMDSv2 (Instance Metadata Service v2) & Protection Anti-SSRF",
    "acronym": "IMDSv2",
    "category": "Sécurité, IAM & Conformité",
    "shortDef": "Service de métadonnées d'instance orienté session protégeant les identifiants temporaires des instances contre les vulnérabilités SSRF (Server-Side Request Forgery).",
    "fullExplanation": "L'Instance Metadata Service (accessible à l'adresse IP de lien local 169.254.169.254) permet aux logiciels exécutés sur une instance de récupérer des informations sur leur environnement et, surtout, d'obtenir les clés de session IAM temporaires attachées au rôle de l'instance. Dans la version historique IMDSv1, une simple requête HTTP GET 'http://169.254.169.254/latest/meta-data/iam/security-credentials/' permettait de dérober les clés en exploitant une vulnérabilité applicative de type SSRF (comme lors du piratage massif de Capital One en 2019). IMDSv2 neutralise ce risque en imposant un échange basé sur une session : l'application doit d'abord envoyer une requête HTTP PUT avec un en-tête spécial 'X-aws-ec2-metadata-token-ttl-seconds' pour obtenir un jeton de session cryptographique (Token). Seul ce jeton permet ensuite d'accéder aux métadonnées. De plus, la limite de sauts réseau (Hop Limit) de la réponse est fixée à 1, empêchant les conteneurs non autorisés d'intercepter les identifiants de l'hôte.",
    "rfcOrStandard": "RFC 3927 (IPv4 Link-Local 169.254.0.0/16), MITRE ATT&CK T1552.005",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "EC2 Instance Metadata Service v2 (IMDSv2)",
        "details": "Requête PUT obligatoire avec jeton de session"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Instance Metadata Service (IMDS)",
        "details": "En-tête Metadata:true obligatoire"
      },
      {
        "provider": "GCP",
        "serviceName": "GCE Metadata Server",
        "details": "En-tête Metadata-Flavor:Google obligatoire"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "TOKEN=$(curl -s -X PUT 'http://169.254.169.254/latest/api/token' -H 'X-aws-ec2-metadata-token-ttl-seconds: 21600') && curl -H 'X-aws-ec2-metadata-token: $TOKEN' http://169.254.169.254/latest/meta-data/instance-id",
      "description": "Récupération sécurisée de l'ID d'instance via le protocole IMDSv2 avec jeton de session"
    },
    "relatedFlashcardKeywords": [
      "IMDSv2",
      "SSRF",
      "Sécurité",
      "169.254.169.254",
      "IAM",
      "SECPLUS-D4"
    ],
    "relatedArticleId": "art-cloud-security-zero-trust",
    "tags": [
      "IMDSv2",
      "SSRF",
      "Métadonnées",
      "Sécurité",
      "IAM",
      "Token"
    ]
  },
  {
    "id": "term-cspm-cwpp",
    "term": "CSPM (Cloud Security Posture Management) & CWPP",
    "acronym": "CSPM / CWPP",
    "category": "Sécurité, IAM & Conformité",
    "shortDef": "Outils automatisés de gouvernance de sécurité vérifiant en continu la conformité des configurations cloud et protégeant les charges de travail en temps réel.",
    "fullExplanation": "La sécurité cloud se scinde en deux volets complémentaires : 1) CSPM (Cloud Security Posture Management) : Analyse les APIs de configuration du plan de contrôle (Control Plane). Il détecte les erreurs de configuration critiques comme les buckets S3 ouverts au public, les groupes de sécurité autorisant le port SSH (22) ouvert au monde (0.0.0.0/0), les comptes root sans MFA, et valide la conformité aux standards réglementaires (CIS Benchmarks, PCI-DSS, ISO 27001, HIPAA). 2) CWPP (Cloud Workload Protection Platform) : Opère sur le plan de données (Data Plane). Il installe des agents légers ou utilise l'inspection eBPF pour surveiller l'exécution des conteneurs, machines virtuelles et fonctions serverless en temps réel afin de bloquer les logiciels malveillants, ransomwares et élévations de privilèges.",
    "rfcOrStandard": "CIS Cloud Benchmarks (Center for Internet Security), NIST Cybersecurity Framework",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "AWS Security Hub & Amazon GuardDuty",
        "details": "Détection d'anomalies par ML et conformité CIS"
      },
      {
        "provider": "Azure",
        "serviceName": "Microsoft Defender for Cloud",
        "details": "Score de sécurité (Secure Score) et protection CWPP"
      },
      {
        "provider": "GCP",
        "serviceName": "Security Command Center (SCC)",
        "details": "Gestion de la posture de sécurité et détection des menaces"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws securityhub get-findings --filters '{\"SeverityLabel\": [{\"Value\": \"CRITICAL\", \"Comparison\": \"EQUALS\"}]}'",
      "description": "Extraction des alertes de sécurité critiques non conformes aux benchmarks CIS"
    },
    "relatedFlashcardKeywords": [
      "CSPM",
      "GuardDuty",
      "Sécurité",
      "CIS Benchmark",
      "SECPLUS-D4"
    ],
    "relatedArticleId": "art-cloud-security-zero-trust",
    "tags": [
      "CSPM",
      "CWPP",
      "Sécurité",
      "Conformité",
      "CIS",
      "GuardDuty"
    ]
  },
  {
    "id": "term-efs-nfs",
    "term": "Stockage Fichier Managé — Amazon EFS & Azure Files (NFSv4 / SMB)",
    "acronym": "EFS / NFS",
    "category": "Stockage & Données",
    "shortDef": "Système de fichiers partagé distribué et élastique compatible POSIX, pouvant être monté simultanément par des milliers de machines virtuelles et de conteneurs.",
    "fullExplanation": "Contrairement aux volumes blocs EBS qui ne peuvent être attachés qu'à une seule instance EC2 dans une seule zone de disponibilité, Amazon EFS (Elastic File System) est un stockage fichier distribué multi-AZ. Il implémente les protocoles standardisés Network File System (NFSv4.0 et NFSv4.1) avec verrouillage de fichiers POSIX. Des milliers d'instances EC2, de conteneurs ECS/Fargate et de Pods EKS peuvent lire et écrire simultanément sur le même point de montage NFS. Il scale automatiquement de 0 à plusieurs pétaoctets sans intervention administrative et propose des classes de stockage à accès peu fréquent (EFS Infrequent Access) pour réduire les coûts jusqu'à 92%.",
    "rfcOrStandard": "RFC 7530 (NFS Version 4 Protocol Specification)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "Amazon Elastic File System (EFS) & Amazon FSx",
        "details": "NFSv4 multi-AZ et FSx for Lustre / NetApp ONTAP"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Files & Azure NetApp Files",
        "details": "Partages SMB 3.0 et NFSv4.1 pour charges Windows/Linux"
      },
      {
        "provider": "GCP",
        "serviceName": "Google Cloud Filestore",
        "details": "Serveurs NFS managés pour applications HPC et conteneurs"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576 fs-01234567.efs.eu-west-3.amazonaws.com:/ /mnt/shared-data",
      "description": "Montage d'un système de fichiers NFSv4 EFS sur un serveur Linux d'entreprise"
    },
    "relatedFlashcardKeywords": [
      "EFS",
      "NFS",
      "Stockage Partagé",
      "POSIX",
      "Multi-AZ"
    ],
    "relatedArticleId": "art-finops-well-architected",
    "tags": [
      "EFS",
      "NFS",
      "Partage de fichiers",
      "Stockage",
      "POSIX",
      "Multi-AZ"
    ]
  },
  {
    "id": "term-dynamodb-nosql",
    "term": "Bases NoSQL Managées — Amazon DynamoDB & Azure Cosmos DB",
    "acronym": "DynamoDB / NoSQL",
    "category": "Stockage & Données",
    "shortDef": "Bases de données clés-valeurs et documents sans serveur (Serverless) offrant des temps de réponse constants inférieurs à 10 millisecondes à n'importe quelle échelle.",
    "fullExplanation": "Amazon DynamoDB est une base de données entièrement managée NoSQL multi-maître, distribuée géographiquement avec réplication synchrone automatique sur 3 zones de disponibilité. Les données sont indexées par une clé de partitionnement (Partition Key / Hash Key) et une clé de tri optionnelle (Sort Key / Range Key). Pour garantir des temps de réponse sub-milliseconde constants quelle que soit la taille de la table (de 1 Mo à 100 To), DynamoDB partitionne les données horizontalement en mémoire flash NVMe. Les tables globales (Global Tables) permettent la réplication bidirectionnelle multi-régions (Active-Active multi-region) avec réconciliation automatique 'dernier rédacteur gagne' (Last-Writer-Wins).",
    "rfcOrStandard": "Amazon Dynamo Paper (SOSP 2007) - Key-Value Distributed Storage Architecture",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "Amazon DynamoDB",
        "details": "Tables globales, mode On-Demand ou Provisioned, DynamoDB Streams"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Cosmos DB",
        "details": "Multi-API (SQL, MongoDB, Cassandra) avec garanties de SLA de latence"
      },
      {
        "provider": "GCP",
        "serviceName": "Cloud Firestore & Bigtable",
        "details": "Base de documents en temps réel et Bigtable pour l'analytique"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws dynamodb put-item --table-name UserSessions --item '{\"SessionId\": {\"S\": \"sess-998811\"}, \"TTL\": {\"N\": \"1790102000\"}}'",
      "description": "Écriture d'un élément avec expiration automatique TTL dans une table DynamoDB"
    },
    "relatedFlashcardKeywords": [
      "DynamoDB",
      "NoSQL",
      "Global Tables",
      "Serverless",
      "TTL"
    ],
    "relatedArticleId": "art-finops-well-architected",
    "tags": [
      "DynamoDB",
      "NoSQL",
      "Cosmos DB",
      "Faible Latence",
      "Serverless"
    ]
  },
  {
    "id": "term-dx-gw",
    "term": "Direct Connect Gateway (DX-GW)",
    "acronym": "DX-GW",
    "category": "Réseau & Interconnexion",
    "shortDef": "Ressource de routage globale permettant d'interconnecter une ou plusieurs liaisons Direct Connect avec de multiples VPCs ou Transit Gateways répartis dans n'importe quelle région du monde.",
    "fullExplanation": "La Direct Connect Gateway (DX-GW) est une ressource globale AWS qui élimine la nécessité d'établir une interface virtuelle (VIF) par région ou par VPC. Une fois créée, une DX-GW peut être associée à des passerelles privées virtuelles (VGW) ou à des Transit Gateways situées dans différentes régions du monde (à l'exception de la Chine). Le routeur on-premises n'établit qu'une seule session BGP avec la DX-GW, qui propage ensuite les préfixes de manière transparente sur le backbone mondial d'AWS.",
    "rfcOrStandard": "BGP-4 Multi-Exit Discriminator (RFC 4271)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "Direct Connect Gateway",
        "details": "Interconnexion multi-régions via une seule session BGP"
      },
      {
        "provider": "Azure",
        "serviceName": "ExpressRoute Global Reach",
        "details": "Connectivité inter-sites on-premises via le backbone Azure"
      },
      {
        "provider": "GCP",
        "serviceName": "Cloud Router Global Routing",
        "details": "Annonce de préfixes mondiaux sur Cloud Interconnect"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws directconnect create-direct-connect-gateway --direct-connect-gateway-name global-enterprise-dxgw --amazon-side-asn 64512",
      "description": "Création d'une Direct Connect Gateway avec ASN BGP privé"
    },
    "relatedFlashcardKeywords": [
      "Direct Connect",
      "DX-GW",
      "BGP",
      "ASN",
      "ENCOR-D1"
    ],
    "relatedArticleId": "art-cloud-hybrid-interconnect",
    "tags": [
      "Direct Connect",
      "DX-GW",
      "BGP",
      "Multi-Région",
      "Hybride"
    ]
  },
  {
    "id": "term-cloud-observability",
    "term": "Observabilité Cloud & Télémétrie — CloudWatch, CloudTrail & OpenTelemetry",
    "acronym": "Logs / OTel",
    "category": "DevOps, CI/CD & IaC",
    "shortDef": "Ensemble unifié de mécanismes de collecte de métriques, de journaux d'événements (logs) et de traces distribuées pour auditer et diagnostiquer l'état d'un système cloud.",
    "fullExplanation": "L'observabilité cloud repose sur trois piliers : 1) Métriques : Données chiffrées à haute fréquence (CloudWatch Metrics, Prometheus) pour le monitoring temps réel et le déclenchement des alertes. 2) Logs : Journaux applicatifs et systèmes (CloudWatch Logs, Fluentbit) avec recherche indexée (CloudWatch Logs Insights). 3) Traces distribuées (AWS X-Ray, OpenTelemetry / OTel) : Suivi pas-à-pas des requêtes HTTP/gRPC à travers des dizaines de microservices pour identifier les goulets d'étranglement de latence. En matière de gouvernance, AWS CloudTrail enregistre chaque appel d'API avec identité de l'appelant (IAM), adresse IP source, timestamp et paramètres.",
    "rfcOrStandard": "W3C Trace Context Specification, OpenTelemetry (CNCF)",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "Amazon CloudWatch & AWS CloudTrail",
        "details": "Métriques, logs, alarmes et audit d'appels API"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Monitor & Log Analytics",
        "details": "Requêtes Kusto (KQL) et Application Insights"
      },
      {
        "provider": "GCP",
        "serviceName": "Google Cloud Logging & Cloud Monitoring",
        "details": "Stackdriver unifié avec support OpenTelemetry natif"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws logs filter-log-events --log-group-name /aws/eks/prod-cluster/cluster --filter-pattern 'ERROR' --limit 20",
      "description": "Filtrage en temps réel des erreurs dans les journaux d'audit du cluster EKS"
    },
    "relatedFlashcardKeywords": [
      "CloudWatch",
      "CloudTrail",
      "Observabilité",
      "Audit",
      "CCNA-D5"
    ],
    "relatedArticleId": "art-cloud-security-zero-trust",
    "tags": [
      "CloudWatch",
      "CloudTrail",
      "Logs",
      "Métriques",
      "Audit",
      "Observabilité"
    ]
  },
  {
    "id": "term-karpenter-autoscaling",
    "term": "Karpenter vs Cluster Autoscaler (Dimensionnement des Nœuds K8s)",
    "acronym": "Karpenter",
    "category": "Compute & Conteneurs",
    "shortDef": "Contrôleur d'autoscaling de nœuds Kubernetes nouvelle génération capable de provisionner des instances cloud sur-mesure en quelques secondes sans groupes d'autoscaling rigides.",
    "fullExplanation": "Le Cluster Autoscaler traditionnel s'appuie sur les Auto Scaling Groups (ASG) d'AWS : lorsqu'un Pod est en attente (Pending), l'ASG augmente sa taille, lance une instance du type préconfiguré, ce qui prend 3 à 5 minutes. Karpenter (projet open source incubé par la CNCF) révolutionne cette approche : il observe directement les requêtes de ressources des Pods en attente (CPU, mémoire, architecture ARM/x86, GPU, contraintes de zone) et appelle directement les APIs de compute cloud pour provisionner l'instance la plus économique et parfaitement ajustée en moins de 40 secondes. Il consolide et réorganise également les nœuds sous-utilisés (Node Consolidation) pour réduire la facture cloud.",
    "rfcOrStandard": "Kubernetes Scheduling Framework & Node Lifecycle Management",
    "providers": [
      {
        "provider": "CNCF",
        "serviceName": "Karpenter",
        "details": "Provisionneur flexible et ultra-rapide pour Kubernetes"
      },
      {
        "provider": "AWS",
        "serviceName": "Karpenter on Amazon EKS",
        "details": "Support natif des instances Spot et processeurs Graviton"
      },
      {
        "provider": "Azure",
        "serviceName": "Karpenter on AKS (Preview)",
        "details": "Intégration sur Azure Kubernetes Service"
      }
    ],
    "cliExample": {
      "tool": "kubectl",
      "command": "kubectl get nodepools,nodeclaims",
      "description": "Affichage des pools de nœuds et revendications de machines gérées par Karpenter"
    },
    "relatedFlashcardKeywords": [
      "Karpenter",
      "Kubernetes",
      "EKS",
      "Autoscaling",
      "FinOps"
    ],
    "relatedArticleId": "art-k8s-cni-networking",
    "tags": [
      "Karpenter",
      "Kubernetes",
      "Autoscaling",
      "Compute",
      "FinOps"
    ]
  },
  {
    "id": "term-s3-glacier-lifecycle",
    "term": "Cycles de Vie S3 & Stockage Archive (Glacier & Glacier Deep Archive)",
    "acronym": "Glacier / WORM",
    "category": "Stockage & Données",
    "shortDef": "Règles d'automatisation transférant les données non accédées vers des paliers de stockage à très faible coût avec restitution asynchrone.",
    "fullExplanation": "Le stockage S3 Standard coûte environ 0,023 $ par Go/mois. Pour optimiser les coûts sur des pétaoctets de sauvegardes ou de journaux d'audit conservés pour des obligations légales (ex: 10 ans), les règles de cycle de vie (Lifecycle Rules) migrent automatiquement les données : S3 Standard vers S3 Standard-IA (Infrequent Access) après 30 jours, puis vers S3 Glacier Flexible Archive après 90 jours (environ 0,004 $/Go), et enfin vers S3 Glacier Deep Archive après 180 jours (0,00099 $/Go, soit 1 dollar par téraoctet par mois). Pour récupérer les données depuis Deep Archive, un délai de restitution (Retrieval Time) de 12 heures est requis.",
    "rfcOrStandard": "Hierarchical Storage Management (HSM Standards) & SEC Rule 17a-4",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "S3 Lifecycle & Glacier Deep Archive",
        "details": "Archivage à froid le plus économique du marché"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Blob Archive Tier",
        "details": "Niveau d'archivage avec processus de réhydratation"
      },
      {
        "provider": "GCP",
        "serviceName": "Google Cloud Storage Archive Class",
        "details": "Accès sub-seconde même pour les classes archives"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws s3api put-bucket-lifecycle-configuration --bucket audit-vault --lifecycle-configuration file://lifecycle-rule.json",
      "description": "Application d'une politique de transition automatique vers Glacier Deep Archive"
    },
    "relatedFlashcardKeywords": [
      "S3",
      "Glacier",
      "Lifecycle",
      "Archivage",
      "FinOps"
    ],
    "relatedArticleId": "art-finops-well-architected",
    "tags": [
      "S3",
      "Glacier",
      "Archivage",
      "Stockage",
      "FinOps",
      "Lifecycle"
    ]
  },
  {
    "id": "term-k8s-services",
    "term": "Services Kubernetes : ClusterIP, NodePort, LoadBalancer",
    "acronym": "K8s Service",
    "category": "Compute & Conteneurs",
    "shortDef": "Abstraction réseau définissant un ensemble logique de Pods et une politique d'accès par adresse IP virtuelle stable et load-balancing interne.",
    "fullExplanation": "Les Pods Kubernetes étant éphémères (leurs adresses IP changent à chaque redémarrage), un Service fournit un point d'entrée immuable : 1) ClusterIP (Défaut) : Alloue une IP virtuelle interne accessible uniquement depuis l'intérieur du cluster. Le trafic est réparti entre les Pods cibles par kube-proxy ou eBPF. 2) NodePort : Ouvre un port statique dédié (dans la plage 30000-32767) sur chaque nœud du cluster, permettant l'accès externe direct en contactant <NodeIP>:<NodePort>. 3) LoadBalancer : Provisionne automatiquement un équilibreur de charge cloud externe (ALB/NLB sur AWS, Azure LB) pointant vers les ports des nœuds. 4) ExternalName : Mappe le service vers un nom DNS externe (ex: base de données managée).",
    "rfcOrStandard": "Kubernetes Service Specification & Virtual IP Architecture",
    "providers": [
      {
        "provider": "CNCF",
        "serviceName": "Kubernetes Service API",
        "details": "ClusterIP, NodePort, LoadBalancer, Headless Service"
      },
      {
        "provider": "AWS",
        "serviceName": "AWS Load Balancer Controller (NLB Target Type: IP)",
        "details": "Routage direct de l'équilibreur vers l'IP du Pod"
      },
      {
        "provider": "GCP",
        "serviceName": "Container-native load balancing (NEG)",
        "details": "Network Endpoint Groups routant directement vers les Pods"
      }
    ],
    "cliExample": {
      "tool": "kubectl",
      "command": "kubectl expose deployment auth-service --port=80 --target-port=8080 --type=ClusterIP",
      "description": "Création d'un Service ClusterIP interne pour exposer les Pods d'authentification"
    },
    "relatedFlashcardKeywords": [
      "Kubernetes",
      "ClusterIP",
      "NodePort",
      "LoadBalancer",
      "ENCOR-D2"
    ],
    "relatedArticleId": "art-k8s-cni-networking",
    "tags": [
      "Kubernetes",
      "Service",
      "ClusterIP",
      "NodePort",
      "LoadBalancer",
      "Réseau"
    ]
  },
  {
    "id": "term-bgp-as-path-prepending",
    "term": "BGP AS-Path Prepending & MED en Environnement Cloud",
    "acronym": "BGP / Prepend",
    "category": "Réseau & Interconnexion",
    "shortDef": "Techniques de manipulation des attributs BGP utilisées par les entreprises pour contrôler l'ingestion du trafic entrant sur leurs liaisons Direct Connect ou ExpressRoute.",
    "fullExplanation": "Lorsqu'une organisation dispose de deux liaisons Direct Connect redondantes vers AWS, elle souhaite souvent désigner un lien principal et un lien de secours (Active/Passive). Le protocole BGP préfère toujours les chemins avec le plus court AS-Path. Pour forcer AWS à router le trafic vers le lien principal, le routeur client applique l''AS-Path Prepending' sur les annonces du lien secondaire : il insère artificiellement son propre numéro d'AS plusieurs fois (ex: 65001 65001 65001). AWS voyant un AS-Path plus long sur le lien secondaire enverra 100% du trafic retour sur le lien principal. De plus, l'attribut MED (Multi-Exit Discriminator) peut être annoncé pour suggérer à AWS quel routeur d'entrée utiliser (valeur MED la plus basse préférée).",
    "rfcOrStandard": "RFC 4271 (BGP-4 Path Selection Rules)",
    "providers": [
      {
        "provider": "Standard",
        "serviceName": "BGP AS-Path Prepending & MED",
        "details": "Standard Internet pour pilotage du routage retour"
      },
      {
        "provider": "AWS",
        "serviceName": "AWS Direct Connect Active/Passive BGP",
        "details": "Prise en compte prioritaire des BGP Communities et AS-Path"
      },
      {
        "provider": "Azure",
        "serviceName": "ExpressRoute Path Selection",
        "details": "Poids de connexion local et AS-Path prepending"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws directconnect describe-virtual-interfaces --query 'virtualInterfaces[*].[virtualInterfaceId,asn,amazonAddress,customerAddress]'",
      "description": "Affichage des paramètres de sessions BGP sur les interfaces Direct Connect"
    },
    "relatedFlashcardKeywords": [
      "BGP",
      "AS-Path",
      "MED",
      "Direct Connect",
      "ENCOR-D3"
    ],
    "relatedArticleId": "art-cloud-hybrid-interconnect",
    "tags": [
      "BGP",
      "AS-Path",
      "MED",
      "Direct Connect",
      "Routage",
      "Failover"
    ]
  },
  {
    "id": "term-circuit-breaker-resilience",
    "term": "Disjoncteur Applicatif (Circuit Breaker) & Budgets de Réessais",
    "acronym": "Circuit Breaker",
    "category": "Architecture & FinOps",
    "shortDef": "Pattern de conception logicielle évitant l'écroulement en cascade d'une chaîne de microservices lorsqu'une dépendance cloud avale subit une panne.",
    "fullExplanation": "Lorsqu'un service cloud (ex: passerelle de paiement) devient lent ou indisponible, des centaines de microservices appelants continuent d'envoyer des requêtes, consommant des threads, de la mémoire et des sockets jusqu'à saturer toute la plateforme (Panne en cascade). Le pattern Circuit Breaker (popularisé par Netflix Hystrix et implémenté par Envoy / Resilience4j) dispose de 3 états : 1) Closed (Fermé) : Les requêtes passent normalement. 2) Open (Ouvert) : Si le taux d'erreurs dépasse un seuil (ex: 50% sur 10 secondes), le disjoncteur saute. Toutes les requêtes suivantes sont immédiatement rejetées en local (Fail-Fast) sans solliciter le réseau. 3) Half-Open (Semi-ouvert) : Après un délai, quelques requêtes de test sont autorisées. Si elles réussissent, le disjoncteur se referme, restaurant le service.",
    "rfcOrStandard": "Martin Fowler Architecture Patterns & Cloud Resilience Engineering",
    "providers": [
      {
        "provider": "CNCF",
        "serviceName": "Envoy Proxy Circuit Breaking",
        "details": "Configuration max_connections, max_pending_requests"
      },
      {
        "provider": "AWS",
        "serviceName": "AWS App Mesh Outlier Detection",
        "details": "Éjection automatique des hôtes défaillants"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure API Management Circuit Breaker",
        "details": "Politiques de disjonction native sur la passerelle"
      }
    ],
    "cliExample": {
      "tool": "kubectl",
      "command": "kubectl get destinationrules -o yaml",
      "description": "Vérification des règles de disjoncteur (consecutiveGatewayErrors) dans Istio"
    },
    "relatedFlashcardKeywords": [
      "Circuit Breaker",
      "Microservices",
      "Résilience",
      "Envoy",
      "Service Mesh"
    ],
    "relatedArticleId": "art-finops-well-architected",
    "tags": [
      "Résilience",
      "Circuit Breaker",
      "Microservices",
      "Envoy",
      "Istio",
      "Haute Disponibilité"
    ]
  },
  {
    "id": "term-spot-instances",
    "term": "Instances Spot Cloud & Préavis d'Interruption (2 Minutes)",
    "acronym": "Spot / Preemptible",
    "category": "Architecture & FinOps",
    "shortDef": "Capacités serveurs excédentaires vendues aux enchères avec des remises jusqu'à 90% par rapport au tarif à la demande, en contrepartie d'une interruption possible sous 2 minutes.",
    "fullExplanation": "Les fournisseurs cloud possèdent des capacités massives en réserve pour absorber les pics d'activité. Ces serveurs inexploités sont mis à disposition sous forme d'instances Spot (AWS) ou Spot/Preemptible VMs (Azure/GCP). La réduction tarifaire atteint 70% à 90%. Condition stricte : le fournisseur cloud peut reprendre l'instance à tout moment pour la réattribuer à un client payant au plein tarif. Un avertissement d'interruption (Spot Interruption Warning) est émis exactement 2 minutes à l'avance via les métadonnées d'instance (IMDS) et EventBridge. Les architectures cloud-natives exploitent les Spot Instances pour les charges distribuées tolérantes aux pannes : clusters Kubernetes de calcul par lots (Batch processing), rendu 3D, pipelines d'entraînement IA/ML et environnements de développement.",
    "rfcOrStandard": "Cloud Economics & Spot Fleet Capacity Allocation Strategies",
    "providers": [
      {
        "provider": "AWS",
        "serviceName": "Amazon EC2 Spot Instances & Spot Fleet",
        "details": "Stratégie price-capacity-optimized avec rééquilibrage anticipé"
      },
      {
        "provider": "Azure",
        "serviceName": "Azure Spot Virtual Machines",
        "details": "Politique d'éviction par prix ou capacité"
      },
      {
        "provider": "GCP",
        "serviceName": "Spot Virtual Machines (ex-Preemptible)",
        "details": "Tarifs dynamiques avec signal ACPI shutdown de 30 secondes"
      }
    ],
    "cliExample": {
      "tool": "aws",
      "command": "aws ec2 request-spot-fleet --spot-fleet-request-config file://spot-fleet-config.json",
      "description": "Lancement d'une flotte d'instances Spot diversifiée sur plusieurs types de machines"
    },
    "relatedFlashcardKeywords": [
      "Spot",
      "FinOps",
      "Économie",
      "EC2",
      "Conteneurs"
    ],
    "relatedArticleId": "art-finops-well-architected",
    "tags": [
      "Spot",
      "FinOps",
      "Économie",
      "EC2",
      "Calcul",
      "Élasticité"
    ]
  }
];

export const cloudEncyclopediaArticles: CloudEncyclopediaArticle[] = [
  {
    "id": "art-cloud-hybrid-interconnect",
    "title": "Architecture des Interconnexions Hybrides : AWS Direct Connect, Azure ExpressRoute & GCP Cloud Interconnect",
    "subtitle": "Conception des liens privés dédiés, routage dynamique BGP, encapsulation 802.1Q et sécurisation MACsec / IPsec",
    "category": "Réseau & Interconnexion",
    "badge": "Architecture Réseau Fondatrice",
    "readTime": "14 min",
    "level": "Avancé",
    "diagramAscii": "+------------------------+                        +------------------------------------+\n|  Datacenter On-Premises|                        |         Fournisseur Cloud          |\n|                        |                        |                                    |\n|   +----------------+   |   Liaison Dédiée 10G   |   +------------+   +-----------+   |\n|   | Routeur Client |===|========================|===| Routeur PE |---| AWS DX-GW |   |\n|   | Customer Edge  |   | (PoP / Meet-Me-Room)   |   |   (Meet-Me)|   +-----+-----+   |\n|   +-------+--------+   |    802.1Q VLAN Trunk   |   +------------+         |         |\n+-----------|------------+                        +--------------------------|---------+\n            |                                                                | Transit\n            | BGP Peering (ASN Privé/Public)                                 | VIF\n            | Trames Jumbo MTU 9001                                          v\n            v                                                      +-------------------+\n    +---------------+                                              |  Transit Gateway  |\n    | Chiffrement   |==============================================|   (TGW / VWAN)    |\n    | MACsec 802.1AE| (Débit nominal filaire / Line-Rate)          +----+---------+----+\n    +---------------+                                                   |         |\n                                                                        v         v\n                                                                    +-------+ +-------+\n                                                                    | VPC A | | VPC B |\n                                                                    +-------+ +-------+",
    "overview": "Dans les architectures d'entreprise modernes, relier un système d'information existant (on-premises) au cloud public ne peut pas reposer uniquement sur des connexions VPN Internet. Les interconnexions physiques directes (AWS Direct Connect, Azure ExpressRoute, GCP Cloud Interconnect) fournissent un chemin réseau dédié, déterministe en latence, affranchi des variations d'Internet, et supportant des débits allant jusqu'à 400 Gbps.",
    "keyTakeaways": [
      "Les liaisons dédiées opèrent en couche 2 au niveau physique (Ethernet 1/10/100G) avec multiplexage logique 802.1Q (VLANs).",
      "Le routage dynamique est obligatoirement orchestré par BGP (Border Gateway Protocol, RFC 4271) avec sessions eBGP.",
      "Trois types d'interfaces virtuelles (VIF) sur AWS : Private VIF (accès VPC direct), Public VIF (APIs publiques) et Transit VIF (raccordement TGW).",
      "Le chiffrement filaire matériel repose sur IEEE 802.1AE (MACsec) à 10G/100G, évitant la baisse de débit liée à IPsec.",
      "Le support des trames Jumbo (MTU 9001) permet d'optimiser le transfert massif de données sans fragmentation."
    ],
    "sections": [
      {
        "heading": "1. Topologie Physique et Point de Présence (PoP)",
        "content": "La mise en œuvre commence dans un centre de colocation accrédité (ex: Equinix, Interxion, Digital Realty). Le client demande une lettre d'autorisation (LOA-CFA - Letter of Authorization and Connecting Facility Assignment). Un câble fibre optique (Cross-Connect) relie l'équipement du client (Customer Edge - CE) au commutateur ou routeur du fournisseur cloud (Provider Edge - PE).\n\nChaque liaison physique peut être découpée en multiples circuits virtuels grâce aux balises VLAN 802.1Q. Chaque sous-interface VLAN correspond à une session BGP dédiée et à un périmètre de routage étanche."
      },
      {
        "heading": "2. Architecture des VIFs et Transit Gateway",
        "content": "Sur AWS, l'intégration historique utilisait une Virtual Private Gateway (VGW) associée à un unique VPC. L'introduction de la Direct Connect Gateway (DX-GW) et des Transit VIFs permet désormais de raccorder un lien physique unique à une Transit Gateway (TGW) qui dessert ensuite des centaines de VPCs à travers plusieurs régions cloud.\n\n• Private VIF : Connecte une DX-GW à une VGW pour un petit nombre de VPCs.\n• Transit VIF : Connecte une DX-GW directement à une Transit Gateway pour une topologie Hub-and-Spoke à grande échelle.\n• Public VIF : Reçoit les préfixes IP publics globaux d'AWS (S3, DynamoDB, API endpoints) via BGP pour éviter de consommer de la bande passante Internet commerciale."
      },
      {
        "heading": "3. Chiffrement Haute Vitesse : MACsec vs IPsec",
        "content": "Par défaut, une liaison Direct Connect ou ExpressRoute n'est PAS chiffrée (elle est simplement privée et isolée sur une fibre dédiée). Pour satisfaire les normes bancaires et de défense (PCI-DSS, RGPD, HIPAA), deux options de chiffrement existent :\n\n1. IPsec au-dessus de DX : Création d'un tunnel IPsec IKEv2 entre le CE et la passerelle cloud. Inconvénient majeur : le chiffrement logiciel ou crypto-ASIC d'IPsec plafonne généralement le débit par tunnel à 1.25 Gbps ou quelques Gbps.\n\n2. MACsec (IEEE 802.1AE) : Chiffrement natif au niveau de la couche liaison de données (L2) opéré directement sur le port optique physique de 10G ou 100G. Il offre un débit nominal filaire (Line-Rate) sans pénalité de latence ni surcharge d'en-tête IP.",
        "callout": {
          "type": "security",
          "text": "MACsec requiert des ports dédiés compatibles et une gestion des clés MKA (MACsec Key Agreement) configurées via AWS KMS ou des paires de clés CKN/CAK."
        }
      }
    ],
    "multiCloudComparison": [
      {
        "feature": "Nom du service dédié",
        "aws": "AWS Direct Connect (DX)",
        "azure": "Azure ExpressRoute",
        "gcp": "Google Cloud Dedicated Interconnect",
        "cncfOrStandard": "IEEE 802.1Q / BGP-4"
      },
      {
        "feature": "Vitesse des ports physiques",
        "aws": "1 Gbps, 10 Gbps, 100 Gbps, 400 Gbps",
        "azure": "10 Gbps, 100 Gbps (ExpressRoute Direct)",
        "gcp": "10 Gbps, 100 Gbps",
        "cncfOrStandard": "Ethernet IEEE 802.3"
      },
      {
        "feature": "Raccordement au Hub de transit",
        "aws": "Transit VIF -> Direct Connect Gateway -> TGW",
        "azure": "ExpressRoute Gateway -> Virtual WAN Hub",
        "gcp": "VLAN Attachment -> Cloud Router -> NCC",
        "cncfOrStandard": "BGP Multi-Exit Discriminator"
      },
      {
        "feature": "Chiffrement couche 2 natif",
        "aws": "MACsec (IEEE 802.1AE)",
        "azure": "MACsec sur ExpressRoute Direct",
        "gcp": "MACsec pour Dedicated Interconnect",
        "cncfOrStandard": "IEEE 802.1AE"
      }
    ],
    "relatedGlossaryTermIds": [
      "term-direct-connect",
      "term-transit-gateway",
      "term-vpc",
      "term-vpc-peering"
    ],
    "flashcardSearchQuery": "Direct Connect",
    "flashcardCountHint": 12
  },
  {
    "id": "art-cloud-transit-routing",
    "title": "Routage Centralisé Hub-and-Spoke & Transit Cloud : AWS Transit Gateway, Azure Virtual WAN & GCP NCC",
    "subtitle": "Micro-segmentation, tables de routage multiples, inspection centralisée NGFW et interconnexion inter-région",
    "category": "Réseau & Interconnexion",
    "badge": "Design Réseau d'Entreprise",
    "readTime": "16 min",
    "level": "Avancé",
    "diagramAscii": "                   +----------------------------------------------------+\n                   |             Inspection VPC (DMZ / SecOps)          |\n                   |                                                    |\n                   |         +--------------------------------+         |\n                   |         |  Appliance Firewall Palo Alto  |         |\n                   |         |     / Gateway Load Balancer    |         |\n                   |         +---------------+----------------+         |\n                   +-------------------------|--------------------------+\n                                             | Attachement VPC Sécurité\n                                             v\n                     +===============================================+\n                     |         AWS TRANSIT GATEWAY (TGW)             |\n                     |                                               |\n                     | [Table Route Prod]     [Table Route Non-Prod] |\n                     |   - Vers Prod VPCs       - Vers Dev/Stage VPCs|\n                     |   - Vers Sécurité        - Vers Sécurité      |\n                     +===============================================+\n                            |                 |                 |\n            Attachement VPC | Attachement VPC | Attachement TGW | Attachement\n                     Prod A |          Dev 01 |    Inter-Région | Direct Connect\n                            v                 v                 v               v\n                        +-------+         +-------+        +---------+      +-------+\n                        | VPC   |         | VPC   |        | TGW     |      | On-   |\n                        | Prod  |         | Dev   |        | Irlande |      | Prem  |\n                        +-------+         +-------+        +---------+      +-------+",
    "overview": "À mesure qu'une organisation migre vers le cloud, le nombre de VPCs et de comptes explose (approche multi-comptes AWS Organizations ou Azure Management Groups). Gérer des peerings directs un-à-un devient rapidement un gouffre opérationnel impossible à sécuriser. Les passerelles de transit (Transit Gateway, Azure Virtual WAN, GCP Network Connectivity Center) établissent une topologie en étoile (Hub-and-Spoke) capable d'acheminer des dizaines de gigabits par seconde avec un contrôle de sécurité granulaire.",
    "keyTakeaways": [
      "Une Transit Gateway est un routeur virtuel régional distribué capable d'interconnecter jusqu'à 5 000 VPCs.",
      "L'isolation réseau repose sur le découplage entre Association (où va le trafic du VPC) et Propagation (quels réseaux le VPC apprend).",
      "Permet la création de tables de routage distinctes simulant des VRFs (Virtual Routing and Forwarding) Cisco.",
      "Facilite l'insertion d'un VPC d'inspection centralisé avec des appliances Next-Gen Firewall (Palo Alto, Fortinet, Check Point).",
      "Supporte le peering inter-région chiffré sur le backbone mondial du fournisseur cloud."
    ],
    "sections": [
      {
        "heading": "1. Dépasser les Limites du VPC Peering",
        "content": "Le VPC Peering traditionnel présente 3 blocages majeurs en grande entreprise :\n1. Non-transitivité : Impossible de traverser un VPC central pour atteindre un autre VPC ou un lien Direct Connect.\n2. Limites de scalabilité : Plafond sur le nombre d'appairages actifs par VPC (125 maximum sur AWS).\n3. Absence de point de filtrage unique : Pour inspecter le trafic est-ouest (entre VPCs), chaque VPC devrait héberger ses propres firewalls, multipliant les coûts de licence et de maintenance."
      },
      {
        "heading": "2. Mécanisme d'Association et de Propagation",
        "content": "Chaque ressource connectée à la Transit Gateway est un 'Attachement' (VPC Attachment, VPN Attachment, Direct Connect Gateway Attachment, Peering Attachment).\n\n• Association : Chaque attachement est associé à EXACTEMENT UNE table de routage de la TGW. C'est cette table qui dicte les décisions de routage pour les paquets quittant cet attachement.\n• Propagation : Un attachement peut propager son bloc CIDR vers UNE OU PLUSIEURS tables de routage de la TGW. Cela permet, par exemple, au VPC de production de faire connaître sa route à la table 'Inspection' et à la table 'Shared Services' sans pour autant la propager à la table 'Dev'."
      },
      {
        "heading": "3. Pattern d'Inspection Centralisée (North-South & East-West)",
        "content": "Le pattern d'architecture de référence consiste à forcer tout le trafic inter-VPC et le trafic vers Internet à traverser un VPC d'inspection centralisé. Dans les tables de routage des VPC spokes, la route par défaut 0.0.0.0/0 pointe vers la TGW. Dans la TGW, la route par défaut pointe vers l'attachement du VPC Inspection. Dans le VPC Inspection, un Gateway Load Balancer distribue les paquets de façon transparente vers un pool d'appliances NGFW sans masquer l'IP source grâce au protocole GENEVE."
      }
    ],
    "multiCloudComparison": [
      {
        "feature": "Service de transit managé",
        "aws": "AWS Transit Gateway (TGW)",
        "azure": "Azure Virtual WAN Hub",
        "gcp": "Network Connectivity Center (NCC)",
        "cncfOrStandard": "Hub-and-Spoke Architecture"
      },
      {
        "feature": "Support multi-tables de routage (VRF)",
        "aws": "Oui (TGW Route Tables multiples)",
        "azure": "Oui (Virtual WAN Custom Route Tables)",
        "gcp": "Oui (Via Cloud Router et BGP communities)",
        "cncfOrStandard": "RFC 4364 (VRF)"
      },
      {
        "feature": "Débit par attachement VPC",
        "aws": "Jusqu'à 50 Gbps en mode burst",
        "azure": "Jusqu'à 50 Gbps par hub",
        "gcp": "Routage natif SDN Andromeda à débit filaire",
        "cncfOrStandard": "SDN Datapath"
      }
    ],
    "relatedGlossaryTermIds": [
      "term-transit-gateway",
      "term-vpc",
      "term-gwlb",
      "term-vpc-peering",
      "term-nat-gateway"
    ],
    "flashcardSearchQuery": "Transit Gateway",
    "flashcardCountHint": 14
  },
  {
    "id": "art-k8s-cni-networking",
    "title": "Réseaux de Conteneurs Kubernetes & Architectures CNI : AWS VPC CNI, Calico, Cilium eBPF",
    "subtitle": "Modèle réseau de Pods, évitement d'épuisement d'adresses IP, routage eBPF sans iptables et politiques de sécurité",
    "category": "Compute & Conteneurs",
    "badge": "Deep-Dive Conteneurs & CNI",
    "readTime": "15 min",
    "level": "Avancé",
    "diagramAscii": "       +-----------------------------------------------------------+\n       |                  Nœud Kubernetes (Worker Node)            |\n       |                                                           |\n       |   +-----------------------+   +-----------------------+   |\n       |   | Pod A (App Frontend)  |   | Pod B (App Backend)   |   |\n       |   | IP: 10.100.1.15       |   | IP: 10.100.1.28       |   |\n       |   +-----------+-----------+   +-----------+-----------+   |\n       |               | vethA                     | vethB         |\n       |               +-------------+-------------+               |\n       |                             |                             |\n       |       +---------------------v---------------------+       |\n       |       | Moteur CNI (ex: Cilium eBPF / VPC CNI)    |       |\n       |       |  - Contournement des chaînes iptables     |       |\n       |       |  - Routage direct en mémoire du noyau BPF |       |\n       |       +---------------------+---------------------+       |\n       |                             |                             |\n       |                   +---------v---------+                   |\n       |                   | Carte Réseau ENI  |                   |\n       |                   | eth0 (10.100.1.10)|                   |\n       |                   +---------+---------+                   |\n       +-----------------------------|-----------------------------+\n                                     v\n                        +--------------------------+\n                        |  Réseau VPC / VNet Cloud |\n                        +--------------------------+",
    "overview": "Kubernetes a révolutionné le déploiement applicatif, mais impose une complexité réseau considérable. Contrairement à Docker standard qui isole chaque conteneur derrière un pont NAT (docker0), Kubernetes exige que chaque Pod reçoive une adresse IP unique et puisse converser avec n'importe quel autre Pod du cluster sans NAT. Le choix du plugin CNI (Container Network Interface) conditionne directement la performance, la sécurité et la scalabilité du cluster.",
    "keyTakeaways": [
      "Le plugin CNI est un binaire exécuté par le runtime de conteneur pour configurer l'interface réseau du Pod lors de sa création.",
      "Deux grandes familles : les réseaux Overlay (encapsulation VXLAN/Geneve) et les réseaux Underlay/Routés (adresses IP directes du VPC).",
      "AWS VPC CNI alloue des adresses IP secondaires issues du sous-réseau VPC, ce qui permet l'accès direct sans passerelle mais risque l'épuisement d'adresses IP.",
      "Cilium remplace kube-proxy et iptables par des programmes eBPF compilés dans le noyau Linux, réduisant la latence de 40% et augmentant le débit.",
      "Les NetworkPolicies permettent la micro-segmentation de couche 3, 4 et 7 entre Pods au sein du cluster."
    ],
    "sections": [
      {
        "heading": "1. Overlay vs Underlay (Routage Direct)",
        "content": "• Réseau Overlay (ex: Flannel, Calico en mode VXLAN) : Les paquets des Pods sont encapsulés dans des paquets UDP sur le port 4789. Avantage : n'importe quel espace d'adressage IP privé peut être utilisé pour les Pods sans impacter le plan d'adressage du VPC. Inconvénient : surcharge d'en-tête (50 octets de moins sur le MTU), consommation CPU pour l'encapsulation, et invisibilité des flux pour les outils de sécurité cloud natifs (VPC Flow Logs).\n\n• Réseau Routé Direct (ex: AWS VPC CNI, Azure CNI) : Chaque Pod reçoit une véritable adresse IP du VPC. Avantage : performances maximales (zero overhead), compatibilité native avec les Security Groups et Direct Connect. Inconvénient : consommation massive d'adresses IP privées dans les sous-réseaux (un cluster de 1000 Pods consomme 1000 IPs du VPC)."
      },
      {
        "heading": "2. La Révolution eBPF avec Cilium",
        "content": "Dans un cluster Kubernetes standard, le composant kube-proxy implémente les Services (ClusterIP) en générant des règles de filtrage 'iptables' dans le noyau Linux. Lorsqu'un cluster atteint des milliers de services et de Pods, iptables doit évaluer les règles de manière séquentielle O(N), provoquant une dégradation mesurable des temps de réponse et une surconsommation CPU lors des mises à jour.\n\nCilium résout ce problème en compilant des programmes eBPF (Extended Berkeley Packet Filter) injectés dynamiquement dans les points d'accroche (hooks) réseau du noyau Linux (XDP - eXpress Data Path et tc - Traffic Control). La recherche de destination de service s'effectue en temps constant O(1) via des tables de hachage BPF en mémoire vive, offrant un gain de performance spectaculaire et une observabilité de couche 7 complète sans proxy sidecar (Hubble)."
      },
      {
        "heading": "3. NetworkPolicies et Sécurité Zero Trust pour Conteneurs",
        "content": "Par défaut, dans un cluster Kubernetes, tout Pod peut communiquer avec n'importe quel autre Pod (flat network). La ressource 'NetworkPolicy' permet de définir des règles de pare-feu déclaratives :\n- Sélection des Pods cibles par étiquettes (podSelector)\n- Filtrage du trafic entrant (Ingress) et sortant (Egress)\n- Autorisation basée sur les namespaces, les étiquettes de Pods ou les blocs CIDR IP\n\nNote critique : Le composant natif AWS VPC CNI supporte désormais les NetworkPolicies grâce à une extension eBPF intégrée, évitant d'avoir à installer Calico en surcouche."
      }
    ],
    "multiCloudComparison": [
      {
        "feature": "CNI par défaut",
        "aws": "Amazon VPC CNI (IPs VPC par Pod)",
        "azure": "Azure CNI ou Azure CNI powered by Cilium",
        "gcp": "GKE Dataplane V2 (Cilium eBPF)",
        "cncfOrStandard": "CNI Specification"
      },
      {
        "feature": "Mécanisme de proxy de service",
        "aws": "kube-proxy (iptables / IPVS)",
        "azure": "kube-proxy ou eBPF Host Routing",
        "gcp": "eBPF (Dataplane V2)",
        "cncfOrStandard": "iptables, IPVS, eBPF"
      },
      {
        "feature": "Support NetworkPolicies natif",
        "aws": "Oui (via extension VPC CNI eBPF)",
        "azure": "Oui (Azure Network Policies ou Cilium)",
        "gcp": "Oui (Dataplane V2 / Cilium)",
        "cncfOrStandard": "Kubernetes NetworkPolicy API"
      }
    ],
    "relatedGlossaryTermIds": [
      "term-k8s-cni",
      "term-k8s-ingress-gateway-api",
      "term-serverless-containers",
      "term-vpc"
    ],
    "flashcardSearchQuery": "Kubernetes",
    "flashcardCountHint": 16
  },
  {
    "id": "art-cloud-security-zero-trust",
    "title": "Sécurité Multi-Cloud, Gestion des Identités IAM & Modèle Zero Trust",
    "subtitle": "Architecture sans secrets statiques, fédération OIDC, chiffrement d'enveloppe KMS et protection périmétrique WAF",
    "category": "Sécurité, IAM & Conformité",
    "badge": "Sécurité & Conformité de Référence",
    "readTime": "15 min",
    "level": "Avancé",
    "diagramAscii": "+--------------------+                     +---------------------------------------+\n|  Client / CI/CD    |                     |        Fournisseur Cloud (AWS/GCP)    |\n|                    |                     |                                       |\n|  GitHub Actions    |  1. Jeton JWT OIDC  |  +--------------------------------+   |\n|  (OIDC Issuer)     |-------------------->|  | Workload Identity Federation   |   |\n|                    |                     |  |  - Valide signature JWKS       |   |\n+--------------------+                     |  |  - Valide Subject (Repo/Branch)|   |\n                                           |  +---------------+----------------+   |\n                                           |                  |                    |\n                                           |                  | 2. AssumeRole      |\n                                           |                  v                    |\n                                           |  +--------------------------------+   |\n                                           |  | Jeton Temporaire STS (1 heure) |   |\n                                           |  +---------------+----------------+   |\n                                           |                  |                    |\n                                           |                  | 3. Déchiffrement   |\n                                           |                  v                    |\n                                           |  +--------------------------------+   |\n                                           |  | AWS KMS (Module HSM FIPS 140-3)|   |\n                                           |  | Clé de données (Envelope DEK)  |   |\n                                           |  +--------------------------------+   |\n                                           +---------------------------------------+",
    "overview": "Le modèle de sécurité périmétrique traditionnel en 'château fort' (Castle-and-Moat) est obsolète dans un environnement cloud hybride. Le modèle Zero Trust (NIST SP 800-207) repose sur le principe fondamental : 'Ne jamais faire confiance, toujours vérifier' (Never Trust, Always Verify). Chaque requête, qu'elle provienne de l'intérieur ou de l'extérieur du réseau, doit être explicitement authentifiée, autorisée et chiffrée.",
    "keyTakeaways": [
      "Élimination totale des identifiants permanents statiques (Access Keys) au profit d'identités temporaires STS et Managed Identities.",
      "Workload Identity Federation (WIF) permet aux pipelines CI/CD d'utiliser des jetons OIDC éphémères sans secrets stockés.",
      "Le principe du moindre privilège (PoLP) impose des politiques IAM restrictives avec conditions contextuelles (IP source, MFA, tags).",
      "Le chiffrement par enveloppe KMS protège les données au repos avec rotation automatique des clés maîtresses en HSM.",
      "Les défenses en profondeur associent WAF L7, protection DDoS et micro-segmentation réseau par Security Groups."
    ],
    "sections": [
      {
        "heading": "1. Le Modèle de Responsabilité Partagée (Shared Responsibility)",
        "content": "Comprendre où s'arrête la responsabilité du fournisseur cloud et où commence celle du client est la première exigence de sécurité :\n\n• IaaS (EC2, VMs) : Le cloud gère la sécurité DU cloud (matériel, hyperviseur, datacenters physiques). Le client gère la sécurité DANS le cloud (système d'exploitation, patchs de vulnérabilités, pare-feu local, configuration réseau, chiffrement des données et gestion des accès).\n\n• PaaS (S3, RDS, Cloud Run) : Le cloud gère l'OS et le moteur de base de données. Le client gère ses données, les autorisations IAM et la configuration réseau.\n\n• SaaS (Microsoft 365, Salesforce) : Le fournisseur gère l'application complète. Le client gère uniquement l'identité des utilisateurs et les données."
      },
      {
        "heading": "2. Zero Static Secrets : Fédération OIDC et STS",
        "content": "La fuite de clés d'accès permanentes (AWS_ACCESS_KEY_ID et AWS_SECRET_ACCESS_KEY) dans des dépôts Git publics est le premier vecteur d'attaque dans le Cloud. Les architectures Zero Trust interdisent la création d'utilisateurs IAM avec clés statiques.\n\nÀ la place :\n- Les applications tournant dans le cloud utilisent des rôles IAM attachés aux instances (Instance Profiles) ou aux Pods (IRSA - IAM Roles for Service Accounts).\n- Les outils externes (GitHub Actions, Terraform Cloud) utilisent la fédération OpenID Connect (OIDC). Le cloud valide le jeton signé cryptographiquement et fournit des identifiants valides pour 15 à 60 minutes seulement."
      },
      {
        "heading": "3. Chiffrement de Bout en Bout et Protection des Données",
        "content": "La protection des données requiert le chiffrement à deux niveaux :\n\n1. Données en transit (In-Transit) : Forcer TLS 1.3 avec suites cryptographiques modernes (Perfect Forward Secrecy - PFS), politiques HSTS et validation mutuelle mTLS pour les communications inter-services (Service Mesh).\n\n2. Données au repos (At-Rest) : Chiffrement par enveloppe (Envelope Encryption) avec clés KMS gérées par le client (Customer Managed Keys - CMK). La séparation stricte des privilèges permet d'empêcher un administrateur système d'accéder aux données confidentielles s'il ne possède pas la permission 'kms:Decrypt' explicite sur la clé."
      }
    ],
    "multiCloudComparison": [
      {
        "feature": "Service de gestion des identités",
        "aws": "AWS IAM & AWS IAM Identity Center",
        "azure": "Microsoft Entra ID (ex-Azure AD)",
        "gcp": "Cloud IAM & Cloud Identity",
        "cncfOrStandard": "RBAC / ABAC / OIDC"
      },
      {
        "feature": "Identités pour charges de travail externes",
        "aws": "IAM Roles Anywhere / OIDC AssumeRole",
        "azure": "Workload Identity Federation",
        "gcp": "Workload Identity Federation Pools",
        "cncfOrStandard": "SPIFFE / SPIRE"
      },
      {
        "feature": "Gestionnaire de clés et HSM",
        "aws": "AWS KMS & AWS CloudHSM",
        "azure": "Azure Key Vault & Managed HSM",
        "gcp": "Cloud KMS & Cloud HSM",
        "cncfOrStandard": "FIPS 140-2 / FIPS 140-3"
      }
    ],
    "relatedGlossaryTermIds": [
      "term-iam-roles-sts",
      "term-workload-identity-federation",
      "term-kms-envelope-encryption",
      "term-waf-shield",
      "term-security-groups-vs-nacls"
    ],
    "flashcardSearchQuery": "Sécurité IAM",
    "flashcardCountHint": 18
  },
  {
    "id": "art-cloud-load-balancing",
    "title": "Architectures d'Équilibrage de Charge L4 / L7 & Gateway Load Balancer",
    "subtitle": "Conception haute performance, inspection SSL/TLS, Gateway Load Balancer avec protocole GENEVE et haute disponibilité multi-AZ",
    "category": "Réseau & Interconnexion",
    "badge": "Performance & Équilibrage",
    "readTime": "13 min",
    "level": "Intermédiaire",
    "diagramAscii": "       +-------------------------------------------------------------+\n       |               Internet / Utilisateurs Publics               |\n       +------------------------------+------------------------------+\n                                      | Requêtes HTTPS (Port 443)\n                                      v\n       +-------------------------------------------------------------+\n       |             Application Load Balancer (ALB L7)              |\n       |  - Déchiffrement TLS (Certificat ACM)                       |\n       |  - Routage par chemin d'URL (/api/* vs /static/*)           |\n       |  - Injection d'en-tête X-Forwarded-For                      |\n       +------------------------------+------------------------------+\n                      |                               |\n        Chemin /api/* |                 Chemin /web/* |\n                      v                               v\n       +------------------------------+ +----------------------------+\n       | Groupe Cible Microservice API| | Groupe Cible Frontend Web  |\n       |  - 4x Pods EKS (Privés)      | |  - 2x Instances EC2 gp3    |\n       +------------------------------+ +----------------------------+",
    "overview": "Les répartiteurs de charge managés sont la pierre angulaire de toute architecture cloud scalable et tolérante aux pannes. Ils absorbent les variations brutales de trafic, détectent automatiquement les instances défaillantes grâce à des sondes de santé (Health Checks), et distribuent uniformément le trafic au sein d'une région multi-AZ.",
    "keyTakeaways": [
      "L'Application Load Balancer (ALB) inspecte les en-têtes applicatifs L7 (HTTP/HTTPS, WebSockets, gRPC).",
      "Le Network Load Balancer (NLB) opère en couche 4 ultra-rapide (TCP/UDP), fournit des IPs statiques et gère des millions de connexions/sec.",
      "Le Gateway Load Balancer (GWLB) insère de manière transparente des appliances réseau tierces (Firewalls) via l'encapsulation GENEVE (UDP 6081).",
      "La fonction Cross-Zone Load Balancing distribue équitablement le trafic entre toutes les instances cibles, même si les zones ont un nombre inégal de cibles.",
      "L'intégration avec les groupes d'Auto Scaling assure l'élasticité dynamique selon les métriques de charge CPU ou de requêtes par seconde."
    ],
    "sections": [
      {
        "heading": "1. Choix Architectural : ALB vs NLB vs Classic",
        "content": "• Choisir ALB (L7) quand : Vous avez besoin de routage basé sur les chemins (/api, /checkout), sur les noms d'hôtes (app1.corp.com, app2.corp.com), de terminaison TLS/SSL centralisée, de redirection automatique HTTP vers HTTPS, ou d'authentification utilisateur intégrée (OIDC / Cognito) avant d'atteindre l'application.\n\n• Choisir NLB (L4) quand : Vous traitez des protocoles non-HTTP (bases de données, streaming TCP/UDP, SIP), exigez une latence sub-milliseconde, avez besoin d'adresses IP statiques ou Elastic IPs dédiées par zone, ou devez préserver l'adresse IP source du client sans dépendre des en-têtes applicatifs."
      },
      {
        "heading": "2. Gateway Load Balancer (GWLB) & Protocole GENEVE",
        "content": "Le GWLB résout l'un des défis les plus épineux de la sécurité réseau cloud : comment faire passer tout le trafic d'un VPC à travers un pool de pare-feu virtuels (NGFW) sans casser la symétrie de routage ni masquer les adresses IP d'origine par du SNAT ?\n\nLe GWLB écoute sur la couche 3 et encapsule les paquets IP dans des trames GENEVE (Generic Network Virtualization Encapsulation, RFC 8926) sur le port UDP 6081. Le paquet d'origine reste intact dans le payload. Le pare-feu inspecte le paquet, applique ses règles de filtrage (App-ID, Antivirus, IPS), et ré-émet le paquet au GWLB qui le désencapsule et l'achemine à sa destination finale."
      }
    ],
    "multiCloudComparison": [
      {
        "feature": "Équilibreur applicatif L7",
        "aws": "Application Load Balancer (ALB)",
        "azure": "Azure Application Gateway (avec WAF)",
        "gcp": "Cloud Load Balancing (External HTTP/S)",
        "cncfOrStandard": "Envoy / NGINX"
      },
      {
        "feature": "Équilibreur réseau L4 haute perf",
        "aws": "Network Load Balancer (NLB)",
        "azure": "Azure Load Balancer (Standard)",
        "gcp": "Network Passthrough Load Balancer",
        "cncfOrStandard": "IPVS / Maglev"
      },
      {
        "feature": "Équilibreur pour appliances tierces",
        "aws": "Gateway Load Balancer (GWLB - GENEVE)",
        "azure": "Azure Gateway Load Balancer (VXLAN)",
        "gcp": "Network Passthrough Load Balancer NVA",
        "cncfOrStandard": "RFC 8926 (GENEVE)"
      }
    ],
    "relatedGlossaryTermIds": [
      "term-load-balancer-alb-nlb",
      "term-gwlb",
      "term-vpc",
      "term-waf-shield"
    ],
    "flashcardSearchQuery": "Load Balancer",
    "flashcardCountHint": 10
  },
  {
    "id": "art-iac-gitops-automation",
    "title": "Infrastructure as Code (IaC) & Déploiement Continu GitOps Multi-Cloud",
    "subtitle": "Gestion de l'état Terraform, verrouillage distribué DynamoDB, pipelines CI/CD et boucles de réconciliation ArgoCD",
    "category": "DevOps, CI/CD & IaC",
    "badge": "Automatisation & DevOps",
    "readTime": "14 min",
    "level": "Intermédiaire",
    "diagramAscii": "+--------------------+          Pull Request approuvée & merge\n|  Ingénieur Cloud   |---------------------------------------------------+\n|  Code HCL / YAML   |                                                   |\n+--------------------+                                                   v\n                                                            +-------------------------+\n                                                            | Dépôt Git d'Entreprise  |\n                                                            | (Single Source of Truth)|\n                                                            +------------+------------+\n                                                                         |\n                                                   Détection automatique| Boucle de\n                                                   de modifications      | Réconciliation\n                                                                         v\n                                                            +-------------------------+\n                                                            | Opérateur ArgoCD / Flux |\n                                                            | (Tourne dans le cluster)|\n                                                            +------------+------------+\n                                                                         |\n                                                            Synchronisation déclarative\n                                                            sans identifiants externes\n                                                                         v\n                                                      +-----------------------------------+\n                                                      | Écosystème Kubernetes & Cloud     |\n                                                      | (VPCs, Pods, Services, Ingress)   |\n                                                      +-----------------------------------+",
    "overview": "Gérer des infrastructures complexes via la console web (ClickOps) est une source majeure d'erreurs humaines, de dérives de configuration (Configuration Drift) et d'audits impossibles. L'Infrastructure as Code (IaC) et la méthodologie GitOps transforment les réseaux et plateformes cloud en artefacts logiciels versionnés, testés et déployés de façon prédictible.",
    "keyTakeaways": [
      "Terraform/OpenTofu utilise un modèle déclaratif : on spécifie l'état final souhaité, le moteur calcule le graphe de dépendances.",
      "Le fichier d'état (.tfstate) est critique : il doit être stocké dans un backend distant chiffré avec verrouillage d'état (State Locking).",
      "La modularisation (Terraform Modules) permet de standardiser les blocs architecturaux approuvés par les équipes SecOps.",
      "GitOps remplace le modèle Push traditionnel par un modèle Pull réconcilié en permanence par un agent interne (ArgoCD).",
      "La détection automatique de dérive (Drift Detection) garantit que les modifications manuelles non autorisées sont instantanément écrasées."
    ],
    "sections": [
      {
        "heading": "1. Bonnes Pratiques de Gestion du State Terraform",
        "content": "Le fichier 'terraform.tfstate' contient la cartographie exacte entre le code et les identifiants réels des ressources créées. Il peut contenir des données sensibles en clair (mots de passe générés, certificats).\n\nExigences impératives en production :\n1. Stockage distant sécurisé : Utiliser un backend S3 chiffré par KMS avec versioning activé pour permettre le rollback en cas de corruption.\n2. Verrouillage distribué (Locking) : Configurer une table DynamoDB avec clé primaire 'LockID'. Dès qu'une commande 'plan' ou 'apply' débute, un verrou est posé pour interdire toute exécution concurrente.\n3. Découpage fin des états : Ne jamais mettre toute l'infrastructure dans un seul state géant. Isoler le state réseau (VPCs, DX), le state des données (bases, S3) et le state applicatif (EKS, conteneurs)."
      },
      {
        "heading": "2. GitOps et Dérive de Configuration (Drift)",
        "content": "Dans une approche GitOps, Git est la seule source de vérité autorisée. Aucun être humain ne possède de droits d'écriture directs sur les APIs de production. Si un administrateur modifie manuellement un groupe de sécurité ou augmente le nombre de répliques via la console cloud, l'opérateur GitOps (ex: ArgoCD) détecte immédiatement la différence lors de sa boucle de réconciliation et réapplique automatiquement l'état décrit dans Git, restaurant l'intégrité de la plateforme."
      }
    ],
    "multiCloudComparison": [
      {
        "feature": "Outil d'IaC de référence",
        "aws": "AWS CloudFormation / AWS CDK",
        "azure": "Azure Bicep / ARM Templates",
        "gcp": "Cloud Deployment Manager / Config Connector",
        "cncfOrStandard": "Terraform / OpenTofu (Multi-Cloud)"
      },
      {
        "feature": "Moteur GitOps",
        "aws": "EKS avec ArgoCD / Flux",
        "azure": "Azure Arc GitOps (Flux)",
        "gcp": "Config Controller (Anthos / KRM)",
        "cncfOrStandard": "ArgoCD / Flux CD"
      },
      {
        "feature": "Backend de stockage d'état",
        "aws": "Amazon S3 + DynamoDB Lock",
        "azure": "Azure Blob Storage (avec lease blob lock)",
        "gcp": "Google Cloud Storage (avec lock natif)",
        "cncfOrStandard": "Terraform Cloud / Remote HTTP"
      }
    ],
    "relatedGlossaryTermIds": [
      "term-terraform-opentofu",
      "term-gitops-argocd",
      "term-k8s-cni"
    ],
    "flashcardSearchQuery": "Automatisation",
    "flashcardCountHint": 15
  },
  {
    "id": "art-finops-well-architected",
    "title": "FinOps & Cadre Well-Architected Cloud : Optimisation des Coûts & Résilience Multi-Région",
    "subtitle": "Les 6 piliers Well-Architected, gestion des Savings Plans / Spot, stratégies multi-régions RTO/RPO",
    "category": "Architecture & FinOps",
    "badge": "Gouvernance & Excellence",
    "readTime": "14 min",
    "level": "Avancé",
    "diagramAscii": "+-----------------------------------------------------------------------------+\n|                 CADRE CLOUD WELL-ARCHITECTED (6 PILIERS)                    |\n+-----------------------------------------------------------------------------+\n| 1. Excellence Opérationnelle | 2. Sécurité & ZTNA   | 3. Fiabilité & Résilience|\n|    - Tout en code (IaC)      |    - Moindre privil. |    - Multi-AZ / Multi-Rég|\n|    - Observabilité continue  |    - Zero secrets    |    - Calcul RTO & RPO    |\n+------------------------------+----------------------+--------------------------+\n| 4. Efficacité de la Perf.    | 5. Optimisation Coûts| 6. Durabilité (Green IT) |\n|    - Choix techno adapté     |    - Modèle FinOps   |    - Réduction empreinte |\n|    - Serverless first        |    - Savings Plans   |    - Extinction idle     |\n+-----------------------------------------------------------------------------+",
    "overview": "Construire dans le cloud sans cadre d'architecture conduit invariablement à deux écueils : des factures incontrôlées (Cloud Sprawl) et des pannes catastrophiques lors d'incidents régionaux. Le cadre Well-Architected et la démarche FinOps fournissent un ensemble structuré de principes directeurs pour bâtir des systèmes fiables, sécurisés et financièrement optimisés.",
    "keyTakeaways": [
      "Les 6 piliers Well-Architected : Excellence opérationnelle, Sécurité, Fiabilité, Efficacité de performance, Optimisation des coûts, Durabilité.",
      "FinOps structure la gestion financière du cloud en trois phases itératives : Informer, Optimiser, Opérer.",
      "Les Savings Plans et Reserved Instances permettent d'économiser jusqu'à 72% en échange d'un engagement d'usage sur 1 ou 3 ans.",
      "Les instances Spot exploitent les capacités serveurs inutilisées avec des remises jusqu'à 90% pour les charges tolérantes aux pannes.",
      "La résilience multi-région s'arbitre rigoureusement selon les objectifs de temps de reprise (RTO) et de perte de données tolérée (RPO)."
    ],
    "sections": [
      {
        "heading": "1. Les 6 Piliers du Cadre Well-Architected",
        "content": "Formalisé initialement par AWS puis adopté par Microsoft Azure et Google Cloud, le Well-Architected Framework sert de référence d'audit pour valider toute conception logicielle cloud :\n\n1. Excellence Opérationnelle : Automatisation des opérations par code, gestion des incidents par 'blameless post-mortems' et déploiements fréquents et réversibles.\n2. Sécurité : Traçabilité complète (CloudTrail), chiffrement partout, micro-segmentation et application du moindre privilège.\n3. Fiabilité : Conception orientée panne (Design for Failure), reprise d'activité testée régulièrement et dimensionnement automatique.\n4. Performance : Utilisation de technologies cloud-natives adaptées (stockage objet vs bloc, serverless, bases NoSQL dédiées).\n5. Optimisation des Coûts : Attribution transparente des dépenses par tags et élimination proactive des ressources zombies.\n6. Durabilité : Minimisation de l'impact écologique en éteignant les ressources inutilisées et en sélectionnant des régions à énergie décarbonée."
      },
      {
        "heading": "2. Stratégies Multi-Régions et Calcul RTO / RPO",
        "content": "Chaque architecture de continuité d'activité (Business Continuity) est un compromis entre coût financier et rapidité de reprise :\n\n• Backup & Restore (RTO: heures, RPO: 24h) : Sauvegardes asynchrones transférées dans une région secondaire. Solution la plus économique mais reprise lente.\n• Pilot Light (RTO: dizaines de minutes, RPO: minutes) : La base de données tourne en permanence en réplication dans la région de secours, mais les serveurs applicatifs ne sont provisionnés qu'au moment du sinistre via Terraform.\n• Warm Standby (RTO: minutes, RPO: secondes) : Une réplique miniature complète de l'application tourne en permanence dans la région secondaire et scale-out automatiquement lors de la bascule.\n• Multi-Site Active-Active (RTO: quasi-nul, RPO: nul) : Le trafic est servi simultanément sur au moins deux régions cloud mondiales avec routage DNS dynamique (Route 53) et bases distribuées (Spanner, Aurora Global)."
      }
    ],
    "multiCloudComparison": [
      {
        "feature": "Cadre d'architecture formel",
        "aws": "AWS Well-Architected Framework",
        "azure": "Azure Well-Architected Framework",
        "gcp": "Google Cloud Architecture Framework",
        "cncfOrStandard": "Architecture Guidelines"
      },
      {
        "feature": "Engagements d'économie tarifaire",
        "aws": "Compute Savings Plans / EC2 Instance SP",
        "azure": "Azure Savings Plans & Reservations",
        "gcp": "Committed Use Discounts (CUDs)",
        "cncfOrStandard": "FinOps Best Practices"
      },
      {
        "feature": "Outil d'optimisation automatisée",
        "aws": "AWS Compute Optimizer & Cost Explorer",
        "azure": "Azure Advisor & Cost Management",
        "gcp": "Active Assist / Recommender",
        "cncfOrStandard": "FinOps Foundation"
      }
    ],
    "relatedGlossaryTermIds": [
      "term-finops-lifecycle",
      "term-disaster-recovery-strategies",
      "term-object-storage-s3",
      "term-block-storage-ebs"
    ],
    "flashcardSearchQuery": "FinOps",
    "flashcardCountHint": 12
  }
];

export interface MultiCloudServiceItem {
  category: string;
  aws: string;
  azure: string;
  gcp: string;
  cncf: string;
}

export const multiCloudMatrix: MultiCloudServiceItem[] = [
  {
    "category": "Réseau Virtuel Isolé",
    "aws": "Amazon VPC (Virtual Private Cloud)",
    "azure": "Azure Virtual Network (VNet)",
    "gcp": "Virtual Private Cloud (VPC Global)",
    "cncf": "Calico / Cilium eBPF"
  },
  {
    "category": "Routage Transit Centralisé",
    "aws": "AWS Transit Gateway (TGW)",
    "azure": "Azure Virtual WAN (VWAN)",
    "gcp": "Network Connectivity Center (NCC)",
    "cncf": "BGP Router / FRRouting"
  },
  {
    "category": "Interconnexion Dédiée Fibre",
    "aws": "AWS Direct Connect (DX)",
    "azure": "Azure ExpressRoute",
    "gcp": "Cloud Interconnect (Dedicated)",
    "cncf": "IEEE 802.1Q / BGP-4"
  },
  {
    "category": "Équilibrage de Charge L7",
    "aws": "Application Load Balancer (ALB)",
    "azure": "Azure Application Gateway",
    "gcp": "External HTTP(S) Load Balancing",
    "cncf": "Envoy Proxy / NGINX Ingress"
  },
  {
    "category": "Équilibrage de Charge L4",
    "aws": "Network Load Balancer (NLB)",
    "azure": "Azure Load Balancer (Standard)",
    "gcp": "TCP/UDP Network Load Balancing",
    "cncf": "IPVS / MetalLB"
  },
  {
    "category": "Inspection Appliances Pare-Feu",
    "aws": "Gateway Load Balancer (GWLB)",
    "azure": "Azure Gateway Load Balancer",
    "gcp": "Network Passthrough LB (NVA)",
    "cncf": "GENEVE (RFC 8926)"
  },
  {
    "category": "DNS Hautement Disponible",
    "aws": "Amazon Route 53",
    "azure": "Azure DNS / Private DNS",
    "gcp": "Google Cloud DNS",
    "cncf": "CoreDNS / BIND"
  },
  {
    "category": "Machines Virtuelles / Compute",
    "aws": "Amazon EC2 (Elastic Compute Cloud)",
    "azure": "Azure Virtual Machines (VM)",
    "gcp": "Google Compute Engine (GCE)",
    "cncf": "KubeVirt / QEMU-KVM"
  },
  {
    "category": "Orchestration Kubernetes",
    "aws": "Amazon EKS",
    "azure": "Azure Kubernetes Service (AKS)",
    "gcp": "Google Kubernetes Engine (GKE)",
    "cncf": "Kubernetes (K8s)"
  },
  {
    "category": "Conteneurs Serverless",
    "aws": "AWS Fargate (ECS / EKS)",
    "azure": "Azure Container Apps (ACA)",
    "gcp": "Google Cloud Run",
    "cncf": "Knative Serving"
  },
  {
    "category": "Functions-as-a-Service (FaaS)",
    "aws": "AWS Lambda",
    "azure": "Azure Functions",
    "gcp": "Google Cloud Functions",
    "cncf": "OpenFaaS / Knative"
  },
  {
    "category": "Stockage Objet Durable",
    "aws": "Amazon S3",
    "azure": "Azure Blob Storage",
    "gcp": "Google Cloud Storage (GCS)",
    "cncf": "MinIO / Ceph"
  },
  {
    "category": "Stockage Bloc Haute Perf.",
    "aws": "Amazon EBS (Elastic Block Store)",
    "azure": "Azure Managed Disks",
    "gcp": "Persistent Disk / Hyperdisk",
    "cncf": "Rook Ceph / OpenEBS"
  },
  {
    "category": "Stockage Fichier Partagé NFS",
    "aws": "Amazon EFS / FSx",
    "azure": "Azure Files / NetApp Files",
    "gcp": "Google Cloud Filestore",
    "cncf": "NFSv4 / GlusterFS"
  },
  {
    "category": "Base Relationnelle Distribuée",
    "aws": "Amazon Aurora",
    "azure": "Azure Cosmos DB (PostgreSQL)",
    "gcp": "Google Cloud Spanner",
    "cncf": "CockroachDB / YugabyteDB"
  },
  {
    "category": "Gestion des Identités (IAM)",
    "aws": "AWS IAM & STS",
    "azure": "Microsoft Entra ID (Azure AD)",
    "gcp": "Google Cloud IAM",
    "cncf": "Keycloak / Dex OIDC"
  },
  {
    "category": "Gestionnaire de Clés & Chiffrement",
    "aws": "AWS KMS & CloudHSM",
    "azure": "Azure Key Vault & Managed HSM",
    "gcp": "Google Cloud KMS & Cloud HSM",
    "cncf": "HashiCorp Vault"
  },
  {
    "category": "Pare-Feu Applicatif Web (WAF)",
    "aws": "AWS WAF",
    "azure": "Azure WAF",
    "gcp": "Google Cloud Armor",
    "cncf": "ModSecurity / Coraza"
  },
  {
    "category": "Infrastructure as Code (IaC)",
    "aws": "AWS CloudFormation & CDK",
    "azure": "Azure Bicep & ARM",
    "gcp": "Deployment Manager / Config Connector",
    "cncf": "Terraform / OpenTofu"
  },
  {
    "category": "Déploiement Continu GitOps",
    "aws": "AWS CodePipeline & CodeDeploy",
    "azure": "Azure DevOps / GitHub Actions",
    "gcp": "Google Cloud Build",
    "cncf": "ArgoCD / Flux CD"
  }
];
