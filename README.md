# Système Val'serra pour Foundry VTT

Un système de jeu de rôle personnalisé pour l'univers de Val'serra, conçu pour Foundry VTT V13.

## 🎭 Caractéristiques

### Types d'Acteurs

- **Personnage** : Fiche complète pour les personnages joueurs avec progression
- **PNJ** : Fiche simplifiée pour les personnages non-joueurs
- **Monstre** : Fiche optimisée pour les créatures et adversaires

### Types d'Items

- **Esprit** : Entités spirituelles qui octroient des capacités évolutives
- **Capacité** : Pouvoirs et compétences spéciales liés aux esprits
- **Équipement** : Armes, armures et objets divers

## 📊 Système de Jeu

### Caractéristiques

- Force
- Dextérité
- Constitution
- Intelligence
- Volonté
- Charisme

Chaque caractéristique génère automatiquement un modificateur basé sur sa valeur.

### Compétences

13 compétences disponibles avec système de rang :

- Non-entraîné (+0)
- Novice (+2)
- Intermédiaire (+4)
- Expert (+6)
- Maître (+8)

Les compétences utilisent la formule : `Valeur de base + Modificateur de caractéristique + Bonus de rang`

### Système d'Esprits

Les esprits sont des entités liées aux personnages qui évoluent du niveau 1 au niveau 5. Chaque esprit est associé à un élément :

- Feu
- Eau
- Terre
- Air
- Lumière
- Ténèbres
- Nature
- Arcane

Les capacités sont liées aux esprits et nécessitent un niveau d'esprit minimum pour être utilisées.

## 🎨 Fiches d'Acteur

### Onglets disponibles

#### Personnages

1. **Statistiques** : Caractéristiques, compétences, points de vie
2. **Esprits** : Liste des esprits liés et leur niveau
3. **Capacités** : Pouvoirs actifs et passifs
4. **Inventaire** : Équipement et objets
5. **Biographie** : Histoire et notes du personnage

#### PNJ

1. **Statistiques** : Caractéristiques et compétences
2. **Capacités** : Pouvoirs du PNJ
3. **Inventaire** : Équipement porté
4. **Biographie** : Description et notes

#### Monstres

1. **Statistiques** : Caractéristiques et compétences simplifiées
2. **Capacités** : Attaques et pouvoirs spéciaux
3. **Biographie** : Description et tactiques

## 🎲 Mécaniques de Jeu

### Jets de Dés

- **Caractéristiques** : Cliquez sur le modificateur d'une caractéristique pour lancer 1d20 + modificateur
- **Compétences** : Cliquez sur l'icône de dé pour lancer 1d20 + total de la compétence

### Utilisation des Capacités

Les capacités peuvent être utilisées depuis la fiche d'acteur ou depuis leur propre fiche. Cela créera un message dans le chat avec :

- Le nom de la capacité
- Sa description
- Son coût en énergie
- Ses effets mécaniques

## 🛠️ Pour les MJs

### Création d'Acteurs

1. Créez un nouvel acteur et choisissez le type (Personnage, PNJ ou Monstre)
2. Remplissez les caractéristiques et compétences
3. Ajoutez des esprits depuis l'onglet dédié
4. Créez des capacités liées aux esprits
5. Équipez votre personnage dans l'inventaire

### Création d'Esprits

1. Créez un item de type "Esprit"
2. Définissez son élément
3. Configurez son niveau maximum (généralement 5)
4. Rédigez sa description et son lore
5. Glissez-déposez l'esprit sur un acteur pour le lier

### Création de Capacités

1. Créez un item de type "Capacité"
2. Choisissez le type (actif, passif, réaction)
3. Définissez l'esprit source
4. Configurez le niveau requis de l'esprit
5. Définissez le coût en énergie et le cooldown
6. Décrivez l'effet narratif et mécanique

## 📝 Structure des Fichiers

```
systems/valserra/
├── lang/                  # Fichiers de traduction
│   └── fr.json           # Traduction française
├── module/               # Code JavaScript
│   ├── documents/        # Data models
│   │   ├── actor.js     # Logique des acteurs
│   │   └── item.js      # Logique des items
│   ├── sheets/          # Fiches de personnages
│   │   ├── actor-sheet.js
│   │   └── item-sheet.js
│   └── main.js          # Point d'entrée principal
├── styles/              # Feuilles de style
│   └── style.css       # Styles CSS
├── templates/           # Templates Handlebars
│   └── sheets/         # Fiches d'acteurs et items
│       ├── actor-personnage-sheet.hbs
│       ├── actor-pnj-sheet.hbs
│       ├── actor-monstre-sheet.hbs
│       ├── item-esprit-sheet.hbs
│       ├── item-capacite-sheet.hbs
│       └── item-equipement-sheet.hbs
├── system.json         # Manifeste du système
├── template.json       # Définition des données
└── README.md          # Documentation
```

## 🎯 Prochaines Étapes

Pour personnaliser davantage votre système :

1. **Ajoutez des esprits prédéfinis** : Créez des compendiums avec vos esprits
2. **Développez les capacités** : Ajoutez des effets automatisés
3. **Système de combat** : Implémentez des règles de combat spécifiques
4. **Progression** : Ajoutez un système d'expérience et de montée de niveau
5. **Macros** : Créez des macros pour automatiser les actions courantes

## 📖 Version

**Version actuelle** : 1.0.0  
**Compatible avec** : Foundry VTT V13 (build 350)

## 👤 Auteur

Créé par Warwiren pour l'univers de Val'serra

## 📄 Licence

Système personnalisé - Tous droits réservés
