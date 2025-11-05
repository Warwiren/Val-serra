# Guide de Démarrage Rapide - Val'serra

## 🚀 Installation

Le système Val'serra est déjà installé dans votre instance Foundry VTT.

## 📋 Création de votre Premier Personnage

### Étape 1 : Créer l'Acteur

1. Dans Foundry, allez dans l'onglet **Acteurs**
2. Cliquez sur **Créer un acteur**
3. Donnez-lui un nom et sélectionnez le type **"Personnage"**
4. Cliquez sur **Créer**

### Étape 2 : Remplir les Statistiques

1. Ouvrez la fiche du personnage
2. Dans l'onglet **Statistiques** :
   - Définissez les 6 **Caractéristiques** (Force, Dextérité, etc.)
   - Les modificateurs se calculent automatiquement
   - Configurez les **Points de Vie** (PV)
   - Remplissez Race, Classe et Alignement

### Étape 3 : Configurer les Compétences

1. Toujours dans l'onglet **Statistiques**
2. Pour chaque compétence :
   - Ajustez la **Valeur de base** (bonus personnels)
   - Choisissez le **Rang** d'entraînement
   - Le **Total** se calcule automatiquement

### Étape 4 : Ajouter des Esprits

1. Allez dans l'onglet **Esprits**
2. Cliquez sur **Ajouter un Esprit**
3. Dans la fiche de l'esprit :
   - Donnez-lui un nom (ex: "Ifrit, Esprit du Feu")
   - Choisissez un **Élément** (Feu, Eau, Terre, etc.)
   - Définissez son **Niveau** actuel (1-5)
   - Rédigez une description

### Étape 5 : Créer des Capacités

1. Allez dans l'onglet **Capacités**
2. Cliquez sur **Ajouter une Capacité**
3. Dans la fiche de la capacité :
   - Nommez la capacité (ex: "Boule de Feu")
   - Choisissez le **Type** (actif, passif, réaction)
   - Sélectionnez l'**Esprit Source** (l'esprit qui l'octroie)
   - Définissez le **Niveau requis** de l'esprit
   - Configurez le **Coût en Énergie**
   - Ajoutez un **Cooldown** si nécessaire
   - Décrivez l'effet

### Étape 6 : Équiper votre Personnage

1. Allez dans l'onglet **Inventaire**
2. Cliquez sur **Ajouter un Équipement**
3. Configurez l'item :
   - Type (arme, armure, etc.)
   - Quantité et Poids
   - Cochez "Équipé" si porté actuellement

## 🎲 Utilisation en Jeu

### Faire des Jets de Dés

**Jets de Caractéristique :**

- Dans l'onglet Statistiques, cliquez sur le **cercle coloré** avec le modificateur
- Le système lancera automatiquement 1d20 + modificateur

**Jets de Compétence :**

- Cliquez sur l'**icône de dé** (🎲) à côté de la compétence
- Le système lancera 1d20 + total de compétence

### Utiliser une Capacité

1. Allez dans l'onglet **Capacités**
2. Cliquez sur l'**icône de poing** (👊) à côté de la capacité
3. Un message s'affiche dans le chat avec :
   - Le nom de la capacité
   - Sa description
   - Son coût et ses effets

### Gérer l'Inventaire

- **Équiper/Déséquiper** : Cochez la case "Équipé"
- **Modifier** : Cliquez sur l'icône d'édition (✏️)
- **Supprimer** : Cliquez sur l'icône de poubelle (🗑️)

## 🎭 Créer des PNJ et Monstres

### Pour un PNJ

1. Créez un acteur de type **"PNJ"**
2. Définissez son **Rôle** (marchand, garde, etc.)
3. Configurez son **Attitude** (hostile, amical, neutre)
4. Ajoutez des capacités selon ses besoins

### Pour un Monstre

1. Créez un acteur de type **"Monstre"**
2. Définissez son **Type** (dragon, mort-vivant, etc.)
3. Configurez son **Niveau de Danger**
4. Simplifiez les compétences (entrez juste une valeur totale)

## 💡 Conseils pour les MJs

### Organisation des Esprits

Créez une structure cohérente pour vos esprits :

**Exemple : Esprit de Feu - Ifrit**

- Niveau 1 : Étincelle (capacité de base)
- Niveau 2 : Flamme dansante
- Niveau 3 : Boule de feu
- Niveau 4 : Mur de flammes
- Niveau 5 : Forme de phénix

### Création de Capacités Équilibrées

Utilisez cette formule comme guide :

- **Capacité Faible** : Coût 1-2, Cooldown 0-1, Niveau requis 1
- **Capacité Moyenne** : Coût 3-5, Cooldown 1-2, Niveau requis 2-3
- **Capacité Forte** : Coût 6-8, Cooldown 2-3, Niveau requis 3-4
- **Capacité Ultime** : Coût 10+, Cooldown 3-5, Niveau requis 5

### Système d'Énergie

Le système utilise un "coût en énergie" pour les capacités. Vous devez définir :

1. Le pool d'énergie des personnages (par exemple 20 points)
2. Comment l'énergie se régénère (par repos, par tour, etc.)
3. Les conséquences d'une énergie à 0

💡 **Astuce** : Vous pouvez ajouter un champ "Énergie" dans la section PV en modifiant `template.json`

## 🔧 Personnalisation Avancée

### Ajouter de Nouveaux Éléments

Éditez `systems/valserra/module/main.js` ligne 17-18 :

```javascript
CONFIG.VALSERRA = {
  elements: [
    "Feu",
    "Eau",
    "Terre",
    "Air",
    "Lumière",
    "Ténèbres",
    "Nature",
    "Arcane",
    "Votre Élément",
  ],
  // ...
};
```

### Ajouter de Nouveaux Types d'Équipement

Dans le même fichier, ligne 19 :

```javascript
typesEquipement: [
  "arme",
  "armure",
  "bouclier",
  "accessoire",
  "consommable",
  "autre",
  "nouveau type",
];
```

### Modifier les Rangs de Compétences

Éditez `systems/valserra/module/documents/actor.js` lignes 32-38 pour modifier les bonus de rangs.

## ❓ Questions Fréquentes

**Q : Comment ajouter un système d'énergie ?**  
R : Éditez `template.json` et ajoutez un champ "energie" dans la section "base", similaire aux PV.

**Q : Puis-je créer plus de types d'items ?**  
R : Oui, mais cela nécessite de modifier `system.json`, `template.json` et de créer de nouveaux templates.

**Q : Les calculs de jets de dés sont-ils automatiques ?**  
R : Les modificateurs se calculent automatiquement, mais vous devez cliquer pour lancer les dés.

**Q : Comment créer des compendiums d'esprits ?**  
R : Créez vos esprits, puis dans Foundry, allez dans l'onglet Compendiums > Créer un Compendium > Type: Items.

## 📚 Ressources Supplémentaires

- **Documentation Foundry VTT** : https://foundryvtt.com/article/introduction/
- **API Foundry V13** : https://foundryvtt.com/api/
- **Communauté Discord Foundry FR** : https://discord.gg/foundryvtt

## 🎉 Bon Jeu !

Vous êtes maintenant prêt à explorer l'univers de Val'serra. N'hésitez pas à expérimenter et à personnaliser le système selon vos besoins !

---

_Créé avec ❤️ pour l'univers de Val'serra_
