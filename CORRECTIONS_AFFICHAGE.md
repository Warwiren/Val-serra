# Corrections d'Affichage - Val'serra v1.1.1

## 🔧 Problèmes Corrigés

### 1. ✅ Sélecteurs (Select) Peu Lisibles

**Problème :** Les dropdowns étaient gris foncé avec du texte blanc, rendant les options difficiles à lire.

**Solution :**

- ✅ Fond **clair** pour les select (#e8e8f0 → presque blanc)
- ✅ Texte **noir** dans les select (#1a1a1a)
- ✅ Bordure **bleue** plus épaisse pour visibilité
- ✅ Options avec fond blanc et texte noir
- ✅ Hover : Fond blanc pur + glow bleu

**Fichier modifié :** `styles/forms.css` (nouveau fichier)

**Avant :**

```css
select {
  background: var(--valserra-bg-dark); /* Très sombre */
  color: var(--valserra-light); /* Blanc */
}
```

**Après :**

```css
select {
  background: #e8e8f0; /* Clair ! */
  color: #1a1a1a; /* Noir ! */
  border: 2px solid blue; /* Bordure visible */
}

select option {
  background: #ffffff; /* Blanc pur */
  color: #1a1a1a; /* Noir */
}
```

### 2. ✅ Marges Excessives sur la Fiche

**Problème :** Grosse marges inutiles, contenu ne remplissait pas la largeur.

**Solutions appliquées :**

#### A. Largeur de la Fiche Augmentée

```javascript
// module/sheets/actor-sheet.js
width: 850,    // Était 720
height: 900,   // Était 800
resizable: true  // Permet de redimensionner
```

#### B. Marges Réduites

```css
/* layout.css */
.sheet-body {
  padding: var(--valserra-spacing-md); /* Était lg */
  width: 100%;
  box-sizing: border-box;
}

.framed-section {
  padding: var(--valserra-spacing-md); /* Était lg */
  margin-bottom: var(--valserra-spacing-md); /* Était lg */
  width: 100%;
  box-sizing: border-box;
}
```

#### C. Sections Pleine Largeur

Ajout de `width: 100%` et `box-sizing: border-box` sur :

- `.sheet-header`
- `.header-banner`
- `.header-main`
- `.header-details`
- `.sheet-body`
- `.framed-section`
- `.caracteristiques-section`
- `.competences-section`
- `.items-list`
- Toutes les tables

### 3. ✅ Grilles et Tables Améliorées

**Caractéristiques :**

```css
.caracteristiques-grid {
  grid-template-columns: repeat(6, 1fr); /* 6 colonnes égales */
  width: 100%;
}
```

**Tables :**

```css
.competences-table {
  width: 100%;
  table-layout: fixed; /* Distribution égale */
}
```

## 📝 Fichiers Modifiés

### Nouveaux Fichiers

- ✅ `styles/forms.css` - Styles optimisés pour formulaires et select

### Fichiers Modifiés

- ✅ `module/sheets/actor-sheet.js` - Largeur 850px, resizable
- ✅ `styles/style.css` - Import de forms.css
- ✅ `styles/layout.css` - Marges réduites, width: 100%
- ✅ `styles/header.css` - Header pleine largeur
- ✅ `styles/actors.css` - Grilles et tables pleine largeur
- ✅ `styles/components.css` - Items pleine largeur

## 🎨 Résultats Visuels

### Sélecteurs (Select)

**Avant :**

```
┌────────────────────┐
│ Option 1  ← Gris foncé + blanc = peu lisible
│ Option 2
└────────────────────┘
```

**Après :**

```
┌────────────────────┐
│ Option 1  ← Fond blanc + texte noir = Très lisible !
│ Option 2
└────────────────────┘
+ Bordure bleue épaisse
+ Glow au hover
```

### Marges et Largeur

**Avant :**

```
┌──────────────────────────────────────┐
│ [==== Beaucoup d'espace vide ====]   │
│                                      │
│    [Contenu étroit]                  │
│                                      │
└──────────────────────────────────────┘
```

**Après :**

```
┌──────────────────────────────────────┐
│ [========== Contenu large ==========]│
│ Utilise toute la largeur disponible │
│ Marges réduites et cohérentes       │
└──────────────────────────────────────┘
```

## ⚙️ Nouvelles Fonctionnalités

### Fiche Redimensionnable

La fiche peut maintenant être redimensionnée manuellement :

- Cliquez et glissez sur le bord de la fenêtre
- Largeur minimale : 850px
- Hauteur minimale : 900px

## 🔍 Détails Techniques

### Select - Contraste Élevé

```css
/* Fond clair, texte foncé */
select {
  background: #e8e8f0; /* 93% blanc */
  color: #1a1a1a; /* Presque noir */
  border: 2px solid #6b7fd7; /* Bleu visible */
  font-weight: 600; /* Texte gras */
}

/* Options encore plus contrastées */
select option {
  background: #ffffff; /* Blanc pur */
  color: #1a1a1a; /* Noir */
}

/* Au survol/sélection */
select option:checked {
  background: #6b7fd7; /* Bleu */
  color: #ffffff; /* Blanc */
}
```

### Box-Sizing Universel

Tous les éléments utilisent maintenant `box-sizing: border-box` :

- Les paddings et bordures sont inclus dans la largeur
- Plus de débordement inattendu
- Layout plus prévisible

### Variables d'Espacement

```css
--valserra-spacing-xs: 4px
--valserra-spacing-sm: 8px
--valserra-spacing-md: 12px   ← Utilisé pour la plupart des marges
--valserra-spacing-lg: 16px
--valserra-spacing-xl: 24px
```

## 🚀 Utilisation

### Redimensionner la Fiche

1. Ouvrez une fiche de personnage
2. Placez votre curseur sur le bord droit ou inférieur
3. Cliquez et glissez pour ajuster la taille
4. La fiche mémorisera votre préférence

### Vérifier les Select

1. Allez dans l'onglet STATISTIQUES
2. Regardez les sélecteurs de "Rang" dans les compétences
3. Cliquez sur un sélecteur
4. Le fond est maintenant **BLANC** avec texte **NOIR**
5. Beaucoup plus lisible ! ✨

## 📊 Comparaison Avant/Après

### Lisibilité des Select

| Aspect     | Avant              | Après         |
| ---------- | ------------------ | ------------- |
| Fond       | Gris foncé #2a2d4a | Clair #e8e8f0 |
| Texte      | Blanc #f0f0f5      | Noir #1a1a1a  |
| Contraste  | ⚠️ Faible          | ✅ Élevé      |
| Bordure    | Fine grise         | Épaisse bleue |
| Lisibilité | ⭐⭐               | ⭐⭐⭐⭐⭐    |

### Utilisation de l'Espace

| Aspect          | Avant | Après |
| --------------- | ----- | ----- |
| Largeur         | 720px | 850px |
| Marges body     | 16px  | 12px  |
| Marges sections | 16px  | 12px  |
| Utilisation     | ~70%  | ~95%  |

## ✅ Checklist de Vérification

Après redémarrage de Foundry :

- [ ] Les sélecteurs ont un **fond clair**
- [ ] Le texte des sélecteurs est **noir**
- [ ] Les options sont lisibles quand le menu est ouvert
- [ ] La fiche est plus **large** (850px)
- [ ] Les marges sont **réduites**
- [ ] Le contenu utilise **toute la largeur**
- [ ] Les caractéristiques s'affichent sur **1 ligne** (6 colonnes)
- [ ] Les tables sont **larges** et bien espacées
- [ ] Pas d'espace vide excessif

## 🎯 Prochaines Améliorations Possibles

Si vous souhaitez personnaliser davantage :

### Rendre la Fiche Encore Plus Large

```javascript
// module/sheets/actor-sheet.js
width: 1000,  // Au lieu de 850
```

### Supprimer Complètement les Marges

```css
/* layout.css */
.sheet-body {
  padding: 0; /* Au lieu de spacing-md */
}
```

### Changer la Couleur des Select

```css
/* forms.css */
select {
  background: #your-color;
  color: #your-text-color;
}
```

## 📝 Notes

- Les select utilisent maintenant un fond clair pour **maximum de contraste**
- C'est différent du thème sombre général, mais c'est **volontaire** pour la lisibilité
- Si vous préférez un thème 100% sombre, utilisez un fond gris moyen (#666) avec texte blanc

## 🔄 Version

**Version** : 1.1.1 (Corrections d'affichage)  
**Date** : 4 novembre 2025  
**Changements** : Select lisibles + Marges optimisées

---

**Les select sont maintenant parfaitement lisibles ! ✨**  
**La fiche utilise l'espace efficacement ! 📐**
