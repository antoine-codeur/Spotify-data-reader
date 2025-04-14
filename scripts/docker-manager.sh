#!/bin/bash

# Couleurs pour l'interface
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Variables de configuration
IMAGE_NAME="project"
CONTAINER_NAME="project-container"
PORT="8080"

# Fonction pour afficher une bannière
show_banner() {
    clear
    echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║                                                            ║${NC}"
    echo -e "${BLUE}║  ${WHITE}🐳 PROJECT DOCKER MANAGER 🐳${BLUE}                         ║${NC}"
    echo -e "${BLUE}║                                                            ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Fonction pour afficher un message de succès
show_success() {
    echo -e "${GREEN}✅ $1${NC}"
    echo ""
}

# Fonction pour afficher un message d'erreur
show_error() {
    echo -e "${RED}❌ $1${NC}"
    echo ""
}

# Fonction pour afficher un message d'information
show_info() {
    echo -e "${YELLOW}ℹ️ $1${NC}"
    echo ""
}

# Fonction pour afficher l'état actuel de Docker
show_docker_status() {
    echo -e "${CYAN}=== 🔍 ÉTAT ACTUEL DOCKER 🔍 ===${NC}"
    
    # Vérifier si le conteneur existe et son état
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        CONTAINER_STATUS=$(docker ps -f "name=${CONTAINER_NAME}" --format '{{.Status}}')
        if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
            echo -e "${GREEN}🟢 Conteneur ${CONTAINER_NAME} en cours d'exécution${NC}"
            echo -e "  ${YELLOW}Status: ${CONTAINER_STATUS}${NC}"
        else
            echo -e "${RED}🔴 Conteneur ${CONTAINER_NAME} arrêté${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️ Aucun conteneur ${CONTAINER_NAME} trouvé${NC}"
    fi
    
    # Vérifier si l'image existe
    if docker images --format '{{.Repository}}' | grep -q "^${IMAGE_NAME}$"; then
        IMAGE_INFO=$(docker images --format '{{.Repository}}:{{.Tag}} ({{.Size}})' | grep "^${IMAGE_NAME}")
        echo -e "${GREEN}📦 Image ${IMAGE_INFO} disponible${NC}"
    else
        echo -e "${YELLOW}⚠️ Aucune image ${IMAGE_NAME} trouvée${NC}"
    fi
    echo ""
}

# Fonction pour construire l'image Docker
build_docker_image() {
    show_banner
    echo -e "${MAGENTA}🏗️ CONSTRUCTION DE L'IMAGE DOCKER 🏗️${NC}"
    echo -e "${YELLOW}Construction de l'image ${IMAGE_NAME}...${NC}"
    echo ""
    
    if docker build -t ${IMAGE_NAME} .; then
        show_success "Image Docker construite avec succès 🚀"
    else
        show_error "Échec de la construction de l'image Docker 💥"
    fi
    
    read -p "Appuyez sur Entrée pour continuer..."
}

# Fonction pour démarrer le conteneur Docker
start_docker_container() {
    show_banner
    echo -e "${MAGENTA}▶️ DÉMARRAGE DU CONTENEUR DOCKER ▶️${NC}"
    
    # Vérifier si le conteneur existe déjà
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        echo -e "${YELLOW}Un conteneur avec le nom ${CONTAINER_NAME} existe déjà.${NC}"
        
        # Vérifier si le conteneur est en cours d'exécution
        if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
            show_info "Le conteneur est déjà en cours d'exécution. 🟢"
            read -p "Appuyez sur Entrée pour continuer..."
            return
        else
            echo -e "${YELLOW}Démarrage du conteneur existant... 🔄${NC}"
            if docker start ${CONTAINER_NAME}; then
                show_success "Conteneur démarré avec succès 🚀"
                echo -e "${GREEN}Application accessible sur: ${CYAN}http://localhost:${PORT} 🌐${NC}"
            else
                show_error "Échec du démarrage du conteneur 💥"
            fi
        fi
    else
        echo -e "${YELLOW}Création et démarrage d'un nouveau conteneur... 🆕${NC}"
        if docker run -d -p ${PORT}:80 --name ${CONTAINER_NAME} ${IMAGE_NAME}; then
            show_success "Conteneur créé et démarré avec succès 🚀"
            echo -e "${GREEN}Application accessible sur: ${CYAN}http://localhost:${PORT} 🌐${NC}"
        else
            show_error "Échec de la création du conteneur 💥"
        fi
    fi
    
    read -p "Appuyez sur Entrée pour continuer..."
}

# Fonction pour arrêter le conteneur Docker
stop_docker_container() {
    show_banner
    echo -e "${MAGENTA}⏹️ ARRÊT DU CONTENEUR DOCKER ⏹️${NC}"
    
    # Vérifier si le conteneur est en cours d'exécution
    if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        echo -e "${YELLOW}Arrêt du conteneur ${CONTAINER_NAME}... 🛑${NC}"
        if docker stop ${CONTAINER_NAME}; then
            show_success "Conteneur arrêté avec succès ✅"
        else
            show_error "Échec de l'arrêt du conteneur ❌"
        fi
    else
        show_info "Aucun conteneur ${CONTAINER_NAME} en cours d'exécution 🔍"
    fi
    
    read -p "Appuyez sur Entrée pour continuer..."
}

# Fonction pour supprimer le conteneur Docker
remove_docker_container() {
    show_banner
    echo -e "${MAGENTA}🗑️ SUPPRESSION DU CONTENEUR DOCKER 🗑️${NC}"
    
    # Vérifier si le conteneur existe
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        # Vérifier si le conteneur est en cours d'exécution
        if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
            echo -e "${YELLOW}Le conteneur est en cours d'exécution. Arrêt du conteneur... 🛑${NC}"
            docker stop ${CONTAINER_NAME} > /dev/null
        fi
        
        echo -e "${YELLOW}Suppression du conteneur ${CONTAINER_NAME}... 🧹${NC}"
        if docker rm ${CONTAINER_NAME}; then
            show_success "Conteneur supprimé avec succès 🗑️✨"
        else
            show_error "Échec de la suppression du conteneur ❌"
        fi
    else
        show_info "Aucun conteneur ${CONTAINER_NAME} trouvé 🔍"
    fi
    
    read -p "Appuyez sur Entrée pour continuer..."
}

# Fonction pour supprimer l'image Docker
remove_docker_image() {
    show_banner
    echo -e "${MAGENTA}🖼️ SUPPRESSION DE L'IMAGE DOCKER 🖼️${NC}"
    
    # Vérifier si l'image existe
    if docker images --format '{{.Repository}}' | grep -q "^${IMAGE_NAME}$"; then
        echo -e "${YELLOW}Suppression de l'image ${IMAGE_NAME}... 🧹${NC}"
        
        # Vérifier si un conteneur utilise cette image
        if docker ps -a --format '{{.Image}}' | grep -q "^${IMAGE_NAME}$"; then
            echo -e "${YELLOW}Des conteneurs utilisent cette image. Suppression des conteneurs... 🧹${NC}"
            docker ps -a --filter "ancestor=${IMAGE_NAME}" --format '{{.Names}}' | xargs -r docker rm -f > /dev/null
        fi
        
        if docker rmi ${IMAGE_NAME}; then
            show_success "Image supprimée avec succès 🗑️✨"
        else
            show_error "Échec de la suppression de l'image ❌"
        fi
    else
        show_info "Aucune image ${IMAGE_NAME} trouvée 🔍"
    fi
    
    read -p "Appuyez sur Entrée pour continuer..."
}

# Fonction pour afficher les logs du conteneur
show_docker_logs() {
    show_banner
    echo -e "${MAGENTA}LOGS DU CONTENEUR DOCKER${NC}"
    
    # Vérifier si le conteneur existe
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        echo -e "${YELLOW}Affichage des logs du conteneur ${CONTAINER_NAME}...${NC}"
        echo ""
        docker logs ${CONTAINER_NAME}
        echo ""
    else
        show_info "Aucun conteneur ${CONTAINER_NAME} trouvé"
    fi
    
    read -p "Appuyez sur Entrée pour continuer..."
}

# Fonction pour redémarrer complètement (full cycle)
restart_full_cycle() {
    show_banner
    echo -e "${MAGENTA}REDÉMARRAGE COMPLET (FULL CYCLE)${NC}"
    echo -e "${YELLOW}Cette opération va arrêter, supprimer, reconstruire et redémarrer le conteneur.${NC}"
    echo ""
    
    # 1. Arrêter le conteneur s'il est en cours d'exécution
    if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        echo -e "${YELLOW}1/5 - Arrêt du conteneur ${CONTAINER_NAME}... ⏹️${NC}"
        if docker stop ${CONTAINER_NAME} > /dev/null; then
            echo -e "    ${GREEN}✓ Conteneur arrêté 🛑${NC}"
        else
            echo -e "    ${RED}✗ Échec de l'arrêt du conteneur ❌${NC}"
            read -p "Appuyez sur Entrée pour continuer..."
            return
        fi
    else
        echo -e "${YELLOW}1/5 - Aucun conteneur en cours d'exécution à arrêter 🔍${NC}"
    fi
    
    # 2. Supprimer le conteneur s'il existe
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        echo -e "${YELLOW}2/5 - Suppression du conteneur ${CONTAINER_NAME}...${NC}"
        if docker rm ${CONTAINER_NAME} > /dev/null; then
            echo -e "    ${GREEN}✓ Conteneur supprimé 🗑️${NC}"
        else
            echo -e "    ${RED}✗ Échec de la suppression du conteneur ❌${NC}"
            read -p "Appuyez sur Entrée pour continuer..."
            return
        fi
    else
        echo -e "${YELLOW}2/5 - Aucun conteneur à supprimer 🔍${NC}"
    fi
    
    # 3. Supprimer l'image si elle existe
    if docker images --format '{{.Repository}}' | grep -q "^${IMAGE_NAME}$"; then
        echo -e "${YELLOW}3/5 - Suppression de l'image ${IMAGE_NAME}... 🖼️${NC}"
        if docker rmi ${IMAGE_NAME} > /dev/null; then
            echo -e "    ${GREEN}✓ Image supprimée 🗑️✨${NC}"
        else
            echo -e "    ${RED}✗ Échec de la suppression de l'image ❌${NC}"
            read -p "Appuyez sur Entrée pour continuer..."
            return
        fi
    else
        echo -e "${YELLOW}3/5 - Aucune image à supprimer${NC}"
    fi
    
    # 4. Construire une nouvelle image
    echo -e "${YELLOW}4/5 - Construction d'une nouvelle image...${NC}"
    if docker build -t ${IMAGE_NAME} . > /dev/null; then
        echo -e "    ${GREEN}✓ Image construite avec succès${NC}"
    else
        echo -e "    ${RED}✗ Échec de la construction de l'image${NC}"
        read -p "Appuyez sur Entrée pour continuer..."
        return
    fi
    
    # 5. Démarrer un nouveau conteneur
    echo -e "${YELLOW}5/5 - Démarrage d'un nouveau conteneur...${NC}"
    if docker run -d -p ${PORT}:80 --name ${CONTAINER_NAME} ${IMAGE_NAME} > /dev/null; then
        echo -e "    ${GREEN}✓ Conteneur créé et démarré avec succès${NC}"
        echo -e "${GREEN}Application accessible sur: ${CYAN}http://localhost:${PORT}${NC}"
    else
        echo -e "    ${RED}✗ Échec de la création du conteneur${NC}"
        read -p "Appuyez sur Entrée pour continuer..."
        return
    fi
    
    show_success "Redémarrage complet effectué avec succès"
    read -p "Appuyez sur Entrée pour continuer..."
}

# Menu principal
while true; do
    show_banner
    show_docker_status
    
    echo -e "${WHITE}MENU PRINCIPAL${NC}"
    echo -e "${CYAN}1.${NC} Construire l'image Docker"
    echo -e "${CYAN}2.${NC} Démarrer le conteneur"
    echo -e "${CYAN}3.${NC} Arrêter le conteneur"
    echo -e "${CYAN}4.${NC} Supprimer le conteneur"
    echo -e "${CYAN}5.${NC} Supprimer l'image"
    echo -e "${CYAN}6.${NC} Afficher les logs du conteneur"
    echo -e "${CYAN}7.${NC} Redémarrage complet (arrêt, suppression, reconstruction, redémarrage)"
    echo -e "${CYAN}0.${NC} Quitter"
    echo ""
    
    read -p "Choisissez une option [0-7]: " choice
    
    case $choice in
        1) build_docker_image ;;
        2) start_docker_container ;;
        3) stop_docker_container ;;
        4) remove_docker_container ;;
        5) remove_docker_image ;;
        6) show_docker_logs ;;
        7) restart_full_cycle ;;
        0) clear; echo -e "${GREEN}Au revoir !${NC}"; exit 0 ;;
        *) show_error "Option invalide. Veuillez réessayer." ;;
    esac
done