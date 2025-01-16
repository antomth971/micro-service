# Projet Microservices avec Eureka, Gateway et AdonisJS

## Description du Projet
Ce projet est une architecture microservices permettant de gérer des entités "students" et "schools". L'infrastructure repose sur des services développés avec **AdonisJS**, orchestrés par **Eureka** pour la découverte de services, et inclut un système de base de données relationnelle (**PostgreSQL**) et NoSQL (**MongoDB**). Ainsi qu'une passerelle (**Spring Cloud Gateway**) pour centraliser les appels aux services.

---

## Architecture Globale

L'architecture suit une organisation modulaire avec les éléments suivants :

- **Eureka Server** : Service de découverte des microservices.
- **Microservices AdonisJS** : Services indépendants pour la gestion des "students" et "schools".
- **Bases de données** : PostgreSQL pour les écoles et MongoDB pour les étudiants.
- **Gateway** : Point d'entrée unique pour les appels aux services.

### Schéma de l'Architecture

```plaintext
                          +----------------+
                          |   Eureka       |
                          |  (Docker)      |
                          +----------------+
                                 |  
        +-------------------------+-------------------------+
        |                                                   |
+---------------+                                     +---------------+
| School Service|                                     | Student Service|
| (AdonisJS)    |                                     | (AdonisJS)     |
+---------------+                                     +---------------+
        |                                                   |
+----------------------+                          +----------------------+
|   PostgreSQL         |                          |   MongoDB            |
|   (Docker)           |                          |   (Docker)           |
+----------------------+                          +----------------------+
```

---

## Technologies Utilisées

### 1. **Eureka (Service Discovery)**
- **Pourquoi ?**
  Eureka est un service de découverte permettant à chaque microservice de s'enregistrer dynamiquement. Cela facilite la communication entre les services sans avoir besoin de connaître les adresses IP ou ports.
- **Utilisation :**
  - Une image Docker préconfigurée de Spring Cloud Eureka.
  - Les services "students" et "schools" s'enregistrent dynamiquement dans Eureka grâce à un client configuré.

### 2. **AdonisJS (Node.js)**
- **Pourquoi ?**
  AdonisJS fournit une structure robuste pour développer des API REST rapides et maintenables avec une syntaxe claire et une excellente gestion des bases de données.
- **Utilisation :**
  - Deux microservices :
    - **School Service** : Gestion des entités "schools" avec PostgreSQL.
    - **Student Service** : Gestion des entités "students" avec MongoDB.

### 3. **PostgreSQL**
- **Pourquoi ?**
  PostgreSQL est choisi pour les données structurées (relations entre écoles et autres entités potentielles).
- **Utilisation :**
  - Conteneur Docker configuré pour le stockage des données "schools".

### 4. **MongoDB**
- **Pourquoi ?**
  MongoDB est adapté pour les données non structurées ou semi-structurées, comme les informations sur les étudiants.
- **Utilisation :**
  - Conteneur Docker configuré pour le stockage des données "students".

### 5. **Docker**
- **Pourquoi ?**
  Docker permet de containeriser les composants de l’application pour garantir leur portabilité et isoler leurs environnements.
- **Utilisation :**
  - Conteneurs pour PostgreSQL, MongoDB et Eureka Server.

### 6. **Spring Cloud Gateway**
- **Pourquoi ?**
  Spring Cloud Gateway est utilisé pour centraliser les appels aux services et gérer les requêtes entrantes.
- **Utilisation :**
  - Configuration pour rediriger les appels vers les services appropriés.
---

## Hiérarchie des Dossiers
Voici une organisation typique de vos dossiers pour le projet :

```
micro-service/
├── gateway/                      # Configuration pour le Gateway (Spring Cloud Gateway)
├── school-service/               # Microservice pour les "schools" (AdonisJS)
│   ├── app/                      # Contrôleurs, modèles, etc.
│   ├── config/                   # Configuration de la base de données (PostgreSQL)
│   ├── start/                    # Points d'entrée
│   └── .../
├── student-service/              # Microservice pour les "students" (AdonisJS)
│   ├── app/                      # Contrôleurs, modèles, etc.
│   ├── config/                   # Configuration de la base de données (MongoDB)
│   ├──start/                    # Points d'entrée
│   └── .../
├── docker-compose.yml            # Configuration Docker pour Eureka, PostgreSQL, MongoDB
└── README.md                     # Documentation du projet
```

---

## Instructions pour Lancer le Projet

### Prérequis
- **Docker** et **Docker Compose** installés.
- Node.js et npm installés pour les microservices `school` et `student`.

### Étapes

1. **Lancer les Conteneurs Docker :**
   ```bash
   docker-compose up --build
   ```

2. **Démarrer les Microservices :**
   - Pour `school-service` :
     ```bash
     cd school-service
     node ace serve --watch
     ```
   - Pour `student-service` :
     ```bash
     cd student-service
     node ace serve --watch
     ```

3. **Vérifier Eureka :**
   Rendez-vous sur `http://localhost:8761/` pour confirmer que les services sont bien enregistrés.

4. **Tester les Services :**
  (Sans Gateway)
   - Pour `schools` :
     ```bash
     curl http://localhost:3334/schools
     ```
   - Pour `students` :
     ```bash
     curl http://localhost:3336/students
     ```
  (Avec Gateway)
    - Pour `schools` :
      ```bash
      curl http://localhost:8084/schools
      ```
    - Pour `students` :
      ```bash
      curl http://localhost:8084/students
      ```

---

## Notes Complémentaires

- **Extensions Futures :** Vous pouvez intégrer un système de Gateway pour centraliser les appels.
- **Problèmes Communs :** Si un service ne s’enregistre pas dans Eureka, vérifiez la connectivité et les endpoints `/health` et `/info`.

---

## Auteur
**MATHIEU Anthony**

Si vous avez des questions ou des suggestions, n’hésitez pas à me contacter.

