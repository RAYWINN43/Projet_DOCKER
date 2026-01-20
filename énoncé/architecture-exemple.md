
@startuml
!theme bluegray
title Architecture – Site de bandes-annonces

cloud "Internet" {
    actor Utilisateur
}

node "Docker Host" {

    component "Cloudflared" as Tunnel #Orange
    component "Caddy" as Proxy #red

    package "Internal Network" {

        component "Front-end" as Front
        component "API Node.js" as API
        component "MySQL" as DB
    }
}

Utilisateur --> Tunnel : HTTPS
Tunnel --> Proxy : HTTP
Proxy --> Front : /
Proxy --> API : /api/films
API --> DB
@enduml
