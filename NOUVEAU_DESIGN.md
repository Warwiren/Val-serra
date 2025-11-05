# Nouveau Design Gothique Étoilé - Val'serra

## 🌟 Thème : Nuit Étoilée Gothique

Le système Val'serra a été entièrement redesigné avec un thème sombre et mystique inspiré d'un ciel étoilé nocturne.

## 🎨 Palette de Couleurs

### Couleurs Principales

- **Fond Principal** : Bleu-violet foncé (#1a1d3a)
- **Fond Secondaire** : Bleu-violet moyen (#2a2d4a)
- **Bordures** : Blanc pur (#ffffff)
- **Accent** : Bleu lumineux (#6b7fd7)
- **Texte** : Blanc cassé (#f0f0f5)

### Couleurs Fonctionnelles

- **Succès/Talents** : Vert (#4a9d6f)
- **Danger/PV** : Rouge (#d74a4a)
- **Étoiles** : Blanc semi-transparent

## 🌌 Effet de Champ d'Étoiles

Le fond de la fiche simule un ciel étoilé avec :

- Multiple couches d'étoiles de tailles variées
- Animation de scintillement subtile
- Effet de profondeur avec différentes opacités

**Fichier** : `styles/starfield.css`

## 📐 Organisation de la Fiche

### 1. En-tête (Header)

**Structure en 3 sections :**

#### Section 1 : Bannière Supérieure

- Fond dégradé sombre
- Champs en ligne : NOM | NIVEAU | CLASSE (ou RÔLE/DANGER)
- Style : Clip-path polygon avec pointe à droite
- Labels en MAJUSCULES avec espacement de lettres

#### Section 2 : Centre avec Image et PV

- Image de profil (120x120px) avec bordure blanche
- Section PV centrale en forme de pentagone pointant vers le bas
- PV en grand (rouge) avec MAX et TEMP
- Shadow glow rouge autour

#### Section 3 : Détails du Personnage

- Grille de 2-3 colonnes
- Champs : Race, Expérience, Alignement, etc.
- Fond légèrement plus foncé

### 2. Onglets de Navigation

- Fond sombre avec séparateurs subtils
- Texte en MAJUSCULES
- Onglet actif : Ligne d'accent bleue en bas
- Hover : Légère luminosité

### 3. Corps de la Fiche

**Sections Encadrées (framed-section) :**

- Fond semi-transparent
- Bordure blanche fine
- Coins ornementaux (carrés dans les angles)
- Ombre intérieure pour profondeur

## 🔧 Architecture CSS Modulaire

### 7 Fichiers CSS

```
styles/
├── style.css        # Fichier principal (imports uniquement)
├── variables.css    # Variables : couleurs, espacements, ombres
├── starfield.css    # Effet de champ d'étoiles animé
├── layout.css       # Structure générale, onglets, sections
├── header.css       # En-tête, bannière, PV central
├── components.css   # Boutons, items, tables, formulaires
├── actors.css       # Caractéristiques, compétences
└── chat.css         # Messages de sorts et talents
```

### Modification des Styles

| Élément à modifier   | Fichier          | Variable/Section     |
| -------------------- | ---------------- | -------------------- |
| Couleur principale   | `variables.css`  | `--valserra-primary` |
| Couleur des bordures | `variables.css`  | `--valserra-border`  |
| Effet étoiles        | `starfield.css`  | Animation `twinkle`  |
| Onglets              | `layout.css`     | `.sheet-tabs`        |
| PV central           | `header.css`     | `.pv-display`        |
| Caractéristiques     | `actors.css`     | `.caracteristique`   |
| Boutons items        | `components.css` | `.item-create`       |

## 🎯 Éléments Clés du Design

### Caractéristiques Circulaires

- Bordure blanche fine
- Valeur dans un cercle
- Modificateur dans un cercle plus petit en dessous
- Hover : Glow bleu

### Section PV Pentagon

- Forme de pentagone pointant vers le bas (clip-path)
- Bordure rouge épaisse
- PV actuels en grand rouge
- Shadow glow rouge
- Champ TEMP en bas

### Compétences en Table

- Fond sombre
- Ligne pour chaque compétence
- Checkbox de maîtrise
- Sélecteur de rang
- Total calculé en bleu accent
- Bouton de jet de dé

### Items (Sorts, Talents, Équipement)

- Cartes avec coins ornementaux
- Bordure blanche semi-transparente
- Badges colorés pour catégories
- Contrôles en icônes
- Hover : Glow bleu

## 🖼️ Coins Ornementaux

Les sections utilisent des pseudo-éléments (`::before` et `::after`) pour créer des coins ornementaux :

```css
.framed-section::before {
  /* Coin supérieur gauche */
  border-top: 2px solid white;
  border-left: 2px solid white;
}

.framed-section::after {
  /* Coin supérieur droit */
  border-top: 2px solid white;
  border-right: 2px solid white;
}
```

## 🌠 Animations et Transitions

### Scintillement des Étoiles

- Animation `twinkle` sur 10 secondes
- Variation d'opacité de 0.6 à 0.8
- Loop infini

### Transitions d'Interaction

- Hover sur boutons : 0.2s
- Glow au focus : box-shadow avec couleur d'accent
- Transform scale sur boutons de jet

## 📱 Responsive Design

### Breakpoint Mobile (< 768px)

- Header en colonne
- Caractéristiques en 3 colonnes
- Onglets avec texte plus petit
- Padding réduit

## 🎭 Badges et Indicateurs

### Couleurs des Badges

- **Esprits/Sorts** : Bleu accent
- **Talents/Classe** : Vert succès
- **Évolutif** : Vert avec bordure
- **Coût/Fréquence** : Gris clair

## 💡 Personnalisation Rapide

### Changer le Thème de Couleur

Éditez `styles/variables.css` :

```css
:root {
  --valserra-primary: #votre-couleur; /* Fond principal */
  --valserra-accent: #votre-couleur; /* Accent (bleu) */
  --valserra-border: #ffffff; /* Bordures */
}
```

### Désactiver les Étoiles

Dans `styles/starfield.css`, commentez :

```css
/* .valserra.sheet::before { ... } */
/* .valserra.sheet::after { ... } */
```

### Modifier l'Intensité des Étoiles

Dans `styles/starfield.css`, ajustez :

```css
.valserra.sheet::before {
  opacity: 0.6; /* Changez entre 0.0 et 1.0 */
}
```

## 🔍 Détails Techniques

### Clip-Path pour Formes Custom

- **PV Pentagon** : `polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)`
- **Bannière** : `polygon(0 0, 100% 0, 98% 100%, 0 100%)`

### Box-Shadow Multiples

- Ombre extérieure : Profondeur
- Ombre intérieure : Texture
- Shadow glow : Effet lumineux au hover

### Z-Index Layers

0. Background avec étoiles
1. Contenu de la fiche
2. Modals et overlays (si ajoutés)

## 📝 Corrections Apportées

### ✅ Problème de Localisation Résolu

Les clés de localisation (ex: `VALSERRA.ActorSheet.Stats.Race`) ont été remplacées par des **labels directs** dans tous les templates :

- "RACE" au lieu de `{{localize "VALSERRA.ActorSheet.Stats.Race"}}`
- Tous les textes sont maintenant en français direct
- Plus simple et évite les erreurs de chargement

### ✅ Labels en MAJUSCULES

- Tous les labels sont maintenant en MAJUSCULES
- Espacement de lettres augmenté (letter-spacing)
- Style cohérent sur toute la fiche

## 🎯 Résultat Final

Une fiche de personnage :

- ✨ Fond étoilé animé et mystique
- 🖼️ Bordures blanches nettes et contrastées
- 🎨 Style gothique avec coins ornementaux
- 📋 Organisation claire et professionnelle
- 🌙 Ambiance nocturne immersive
- 🎭 Thème parfait pour un univers fantasy sombre

## 🚀 Utilisation

Le nouveau design s'applique automatiquement à toutes les fiches d'acteurs (Personnages, PNJ, Monstres) et d'items (Esprits, Sorts, Talents, Équipement).

Aucune configuration supplémentaire requise !

---

**Style inspiré de** : Designs de fiches de personnage gothiques classiques  
**Optimisé pour** : Foundry VTT V13  
**Version** : 1.1.0
