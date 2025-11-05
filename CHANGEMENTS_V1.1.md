# Changements Version 1.1 - Val'serra

## 📋 Résumé des Modifications

Cette version restructure complètement le système d'items pour mieux distinguer les sorts (liés aux esprits) et les talents (liés aux classes).

## 🔄 Restructuration des Items

### Avant (v1.0)

- **Esprit** : Entité spirituelle
- **Capacité** : Mélange confus de sorts et de talents de classe
- **Équipement** : Objets

### Maintenant (v1.1)

- **Esprit** : Entité spirituelle qui octroie des sorts
- **Sort** : Pouvoir magique lié à un esprit, évolutif selon le niveau de l'esprit
- **Talent** : Compétence de classe, lié à une classe spécifique
- **Équipement** : Objets (inchangé)

## 🆕 Nouveaux Types d'Items

### Sort

Les sorts remplacent les "capacités magiques" et sont maintenant clairement liés aux esprits.

**Champs :**

- `espritSource` : L'esprit qui octroie ce sort
- `niveauEspritRequis` : Niveau minimum de l'esprit (1-5)
- `coutEnergie` : Coût en points d'énergie
- `tempsDIncantation` : Temps pour lancer le sort
- `portee` : Portée du sort
- `duree` : Durée de l'effet
- `composantes` : Composantes nécessaires (V, S, M)
- `evolutif` : Le sort évolue avec le niveau de l'esprit
- `effetNiveauSuperieur` : Description de l'évolution

**Exemple de sort :**

```
Nom : Boule de Feu
Esprit Source : Ifrit (Feu)
Niveau Requis : 3
Coût : 5 énergie
Temps d'Incantation : 1 action
Portée : 30 mètres
Durée : Instantané
Évolutif : Oui
Effet : Inflige 3d6 dégâts de feu
Niveaux supérieurs : +1d6 par niveau d'esprit au-dessus de 3
```

### Talent

Les talents sont des compétences de classe, distinctes de la magie des esprits.

**Champs :**

- `classeSource` : La classe qui octroie ce talent
- `niveauRequis` : Niveau de personnage requis
- `type` : actif, passif, ou réaction
- `frequence` : illimité, 1/repos court, 1/repos long, 1/jour, 1/combat
- `prerequis` : Conditions pour obtenir le talent
- `effet` : Description mécanique

**Exemple de talent :**

```
Nom : Second Souffle
Classe Source : Guerrier
Niveau Requis : 1
Type : Actif
Fréquence : 1/repos court
Prérequis : Aucun
Effet : Par une action bonus, récupérez 1d10 + niveau PV
```

## 📊 Structure des Fiches d'Acteur

### Nouveaux Onglets

Les fiches personnages ont maintenant **6 onglets** au lieu de 5 :

1. **Statistiques** - Caractéristiques, compétences, PV
2. **Esprits** - Liste des esprits liés
3. **Sorts** - 🆕 Sorts obtenus via les esprits
4. **Talents** - 🆕 Talents de classe
5. **Inventaire** - Équipement
6. **Biographie** - Histoire et notes

### Modification des Esprits

Les esprits ont maintenant un champ **"Pacte"** pour décrire le type de lien avec l'esprit.

## 🎨 Réorganisation CSS

Le CSS a été divisé en **5 fichiers modulaires** pour une meilleure maintenabilité :

### Structure des Fichiers CSS

```
styles/
├── style.css        # Fichier principal (imports uniquement)
├── variables.css    # Variables CSS et tokens de design
├── layout.css       # Structure générale et mise en page
├── components.css   # Composants réutilisables
├── actors.css       # Styles spécifiques aux acteurs
└── chat.css         # Messages de chat
```

### Avantages

- ✅ **Maintenabilité** : Chaque fichier a un rôle précis
- ✅ **Lisibilité** : Plus facile de trouver un style spécifique
- ✅ **Réutilisabilité** : Variables CSS centralisées
- ✅ **Performance** : Pas d'impact (imports CSS natifs)

### Comment Modifier les Styles ?

| Pour modifier...                  | Éditez le fichier... |
| --------------------------------- | -------------------- |
| Couleurs, espacements             | `variables.css`      |
| Header, onglets, structure        | `layout.css`         |
| Boutons, items, formulaires       | `components.css`     |
| PV, caractéristiques, compétences | `actors.css`         |
| Messages de sorts/talents         | `chat.css`           |

## 🔧 Modifications Techniques

### Fichiers Modifiés

**Configuration :**

- `system.json` - Ajout des types sort et talent
- `template.json` - Nouvelles structures de données
- `lang/fr.json` - Nouvelles traductions

**Code JavaScript :**

- `module/main.js` - Configuration des nouveaux types
- `module/documents/actor.js` - Getters pour sorts et talents
- `module/documents/item.js` - Méthodes `lancerSort()` et `utiliserTalent()`
- `module/sheets/actor-sheet.js` - Gestion des nouveaux items
- `module/sheets/item-sheet.js` - Sheets pour sorts et talents

**Templates :**

- `templates/sheets/actor-personnage-sheet.hbs` - 6 onglets
- `templates/sheets/item-sort-sheet.hbs` - 🆕 Fiche de sort
- `templates/sheets/item-talent-sheet.hbs` - 🆕 Fiche de talent
- `templates/sheets/item-esprit-sheet.hbs` - Ajout du champ pacte
- ~~`templates/sheets/item-capacite-sheet.hbs`~~ - ❌ Supprimé

## 🎯 Migration des Données

### Si vous aviez des "Capacités" existantes

Les anciennes capacités ne seront plus reconnues. Vous devrez les recréer comme :

- **Sorts** si elles viennent d'un esprit
- **Talents** si elles viennent d'une classe

### Procédure de Migration Manuelle

1. Notez vos capacités existantes
2. Supprimez-les
3. Créez-les comme Sorts ou Talents selon leur nature

## 📝 Messages de Chat

### Sorts

Les sorts affichent maintenant :

- 🔮 Icône de magie
- 💧 Coût en énergie
- ⏱️ Temps d'incantation
- 📏 Portée
- ⌛ Durée
- ✨ Composantes
- ⬆️ Effets évolutifs

### Talents

Les talents affichent :

- ⚔️ Icône de talent
- 📚 Classe source
- 🔄 Fréquence d'utilisation
- 🎯 Type (actif/passif/réaction)

## ✨ Améliorations Futures Suggérées

- [ ] Ajouter un système d'énergie complet dans la fiche
- [ ] Créer des compendiums d'esprits avec leurs sorts
- [ ] Créer des compendiums de classes avec leurs talents
- [ ] Ajouter des effets automatisés pour les sorts
- [ ] Système de progression automatique des esprits

## 📖 Documentation Mise à Jour

- `README.md` - Vue d'ensemble du système
- `GUIDE_DEMARRAGE.md` - Guide pour démarrer (à mettre à jour)
- `EXEMPLES_MACROS.md` - Exemples de macros (à mettre à jour)
- `EXTENSION.md` - Guide d'extension du système

## 🔄 Compatibilité

- **Version minimale** : Foundry VTT V13
- **Compatibilité descendante** : ❌ Les anciennes capacités ne sont plus supportées
- **Migration requise** : Oui, recréer les capacités en sorts/talents

---

**Version** : 1.1.0  
**Date** : 4 novembre 2025  
**Auteur** : Warwiren
