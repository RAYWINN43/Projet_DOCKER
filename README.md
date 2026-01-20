![Node + Docker CI](https://github.com//RAYWINN43/Projet_DOCKER/actions/workflows/node-ci.yml/badge.svg)

# Site bande annonce film

> **MEMBRES DU GROUPE :**
> - **BLAIN Antoine**
> - **PECONTAL Corentin** 
> - **MARTIN Evan**

---

## 1. Présentation du Projet
Dans ce projet, nous allons créer un site très basique dédié aux bandes-annonces de films. L’objectif principal est de mettre en place un CRUD (Créer, Lire, Mettre à jour, Supprimer) pour gérer facilement les films et leurs bandes-annonces.

**Fonctionnalités principales :**
* Afficher des trailers (Image Thumbnail, Titre, Date de publication, synopsis, Btn regarder avec le lien YT)
* Ajouter des trailers
* Modifier les trailers
* Suppression des trailers en cascade 
* barre de recherche (type AJAX si on a le temps)

**Techno utilise :**
* nodes JS 
* google doc 
* mangoDB
* discord 
* GitHub et Git

## 2. Architecture Technique

### Schéma d'infrastructure
*Ce schéma est généré dynamiquement à partir du fichier `architecture.puml` présent dans ce dépôt.*

![Architecture du Projet](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/RAYWINN43/Projet_DOCKER/main/architecture.puml)


## 3. Guide d'installation
Pour lancer le projet localement :

1.  Cloner le dépôt :
    ```bash
    git clone [https://github.com/RAYWINN43/Projet_DOCKER.git](https://github.com/RAYWINN43/Projet_DOCKER.git)
    cd votre-repo
    ```

2.  Lancer la stack :
    ```bash
    docker compose up -d
    ```

3.  lancer via le CMD 
    ```bash
    docker run -d --name mongo -p 27017:27017 mongo:7  
    ```


4. Accéder aux services :
    * Web : `http://localhost`
    * Admin : `http://localhost/adminer` (exemple)

5.  Obtenir l'URL publique :
    ```bash
    docker compose logs -f tunnel
    ```

## 4. Méthodologie & Transparence IA

### Organisation
Evan partie Back 
Antoine partie DOCK + README
Corentin partie Front

### Utilisation de l'IA
* **Outils utilisés :** (ChatGPT 5.2,Github Copilot)
* **Usage :**
    * *aide BDD:* nous a donnée des commande CURL pour verrifier le bon fonctionnement de la BDD 
    * *GIT :* aide avec les commande GIT (pour travailler a plusieur + 2,3 bug branch)
    * *Front :*aide pour du CSS (vibe)

## 5. Difficultés rencontrées & Solutions
* *GITHUB :* des merge qui ne voulez pas se faire car les branche etait distant
* *Solution :* commande git pour regler ce probleme 