# Changelog - Système Val'serra

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [1.0.0] - 2025-11-04

### ✨ Ajout Initial

#### Système de Base

- Support complet pour Foundry VTT V13 (build 350)
- Configuration du système avec manifeste et templates
- Traduction française complète
- Documentation complète (README et Guide de démarrage)

#### Types d'Acteurs

- **Personnage** : Fiche complète avec 5 onglets
  - Statistiques (caractéristiques, compétences, PV)
  - Esprits (gestion des entités spirituelles)
  - Capacités (pouvoirs actifs et passifs)
  - Inventaire (équipement et objets)
  - Biographie (histoire et notes)
- **PNJ** : Fiche simplifiée pour personnages non-joueurs
  - Système d'attitude (hostile, neutre, amical, etc.)
  - Gestion des rôles
- **Monstre** : Fiche optimisée pour créatures
  - Système de niveau de danger
  - Compétences simplifiées

#### Caractéristiques

- 6 caractéristiques principales (Force, Dextérité, Constitution, Intelligence, Volonté, Charisme)
- Calcul automatique des modificateurs : (valeur - 10) / 2
- Jets de caractéristique cliquables (1d20 + modificateur)

#### Compétences

- 13 compétences disponibles
- Système de rang à 5 niveaux :
  - Non-entraîné (+0)
  - Novice (+2)
  - Intermédiaire (+4)
  - Expert (+6)
  - Maître (+8)
- Calcul automatique : Valeur de base + Mod. de caractéristique + Bonus de rang
- Jets de compétence cliquables

#### Types d'Items

##### Esprit

- 8 éléments disponibles (Feu, Eau, Terre, Air, Lumière, Ténèbres, Nature, Arcane)
- Système de progression à 5 niveaux
- Lien avec les capacités octroyées
- Description et lore personnalisables

##### Capacité

- 3 types : Actif, Passif, Réaction
- Lien avec un esprit source
- Niveau d'esprit requis
- Système de coût en énergie
- Système de cooldown
- Utilisation depuis la fiche avec message dans le chat
- Description narrative et mécanique

##### Équipement

- 6 types : Arme, Armure, Bouclier, Accessoire, Consommable, Autre
- Gestion de la quantité et du poids
- Système d'équipement (équipé/non équipé)
- Prix et propriétés spéciales

#### Interface et Design

- Design moderne et responsive
- Palette de couleurs cohérente (bleu/gris/orange)
- Onglets avec navigation fluide
- Hover effects et transitions
- Images cliquables pour acteurs et items
- Scrollbar personnalisée
- Support mobile et tablette

#### Fonctionnalités Techniques

- Data models personnalisés pour acteurs et items
- Sheets modulaires et extensibles
- Handlebars helpers personnalisés (eq, concat, capitalize)
- Système de hooks Foundry
- Drag & drop d'items
- Messages de chat formatés pour les capacités
- Éditeur de texte riche pour descriptions

#### Documentation

- README complet avec vue d'ensemble
- Guide de démarrage rapide étape par étape
- Structure des fichiers documentée
- Exemples d'utilisation
- FAQ pour questions courantes
- Conseils pour MJs

### 🎨 Styles CSS

- Plus de 600 lignes de CSS personnalisé
- Variables CSS pour personnalisation facile
- Thème cohérent sur toutes les fiches
- Effets visuels pour meilleure UX
- Design cards pour les items
- Tableaux stylisés pour compétences et inventaire

### 🔧 Architecture

```
module/
├── documents/     # Logique métier (Actor, Item)
├── sheets/        # Fiches (ActorSheet, ItemSheet)
└── main.js       # Point d'entrée

templates/
└── sheets/       # Templates Handlebars (6 fichiers)

styles/
└── style.css     # Styles complets

lang/
└── fr.json       # Traduction française
```

### 📝 Notes de Version

Cette première version fournit une base solide et extensible pour le système Val'serra. Le système est entièrement fonctionnel et prêt à l'emploi.

#### Limitations Connues

- Le système d'énergie n'est pas encore implémenté (seulement le coût des capacités)
- Les effets automatisés des capacités ne sont pas encore développés
- Pas de compendiums prédéfinis
- Pas de système de combat intégré

#### Prochaines Étapes Suggérées

- [ ] Ajouter un système d'énergie complet
- [ ] Créer des compendiums d'esprits
- [ ] Implémenter des effets automatisés
- [ ] Ajouter un système de combat
- [ ] Créer un système de progression/XP
- [ ] Ajouter des macros prédéfinies
- [ ] Support multilingue (EN, ES, etc.)

---

## Format du Changelog

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

### Types de changements

- **Ajouté** : pour les nouvelles fonctionnalités
- **Modifié** : pour les changements aux fonctionnalités existantes
- **Déprécié** : pour les fonctionnalités qui seront retirées
- **Retiré** : pour les fonctionnalités retirées
- **Corrigé** : pour les corrections de bugs
- **Sécurité** : pour les changements de sécurité
