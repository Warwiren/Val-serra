# Guide de Test - Val'serra v1.1.0

## 🧪 Checklist de Test

Utilisez cette checklist pour vérifier que tout fonctionne correctement après le redémarrage de Foundry.

### ✅ Étape 1 : Démarrage du Système

- [ ] Redémarrer Foundry VTT complètement
- [ ] Ouvrir la console (F12) et vérifier qu'il n'y a pas d'erreurs
- [ ] Vérifier que le message "Valserra | Système initialisé avec succès" apparaît
- [ ] Ouvrir ou créer un monde avec le système Val'serra

### ✅ Étape 2 : Vérification Visuelle

- [ ] Créer un acteur de type "Personnage"
- [ ] Ouvrir la fiche
- [ ] **Vérifier le design :**
  - [ ] Fond bleu-violet foncé ✨
  - [ ] Étoiles blanches visibles
  - [ ] Bordures blanches sur tous les éléments
  - [ ] Labels en MAJUSCULES (pas de clés de localisation)
  - [ ] Coins ornementaux sur les sections

### ✅ Étape 3 : Test des Onglets

Dans la fiche de personnage, vérifier que **6 onglets** s'affichent :

- [ ] **STATISTIQUES** - Caractéristiques + Compétences + PV
- [ ] **ESPRITS** - Liste des esprits liés
- [ ] **SORTS** - Magie des esprits
- [ ] **TALENTS** - Compétences de classe
- [ ] **INVENTAIRE** - Équipement
- [ ] **BIOGRAPHIE** - Histoire et notes

### ✅ Étape 4 : Test des Fonctionnalités

#### A. Statistiques

- [ ] Modifier une caractéristique (ex: Force = 14)
- [ ] Vérifier que le modificateur se calcule (+2)
- [ ] Cliquer sur le bouton de jet de caractéristique
- [ ] Vérifier qu'un message apparaît dans le chat

#### B. Compétences

- [ ] Modifier une compétence (valeur + rang)
- [ ] Vérifier que le total se calcule automatiquement
- [ ] Cliquer sur le bouton de jet 🎲
- [ ] Vérifier le jet dans le chat

#### C. Esprits

- [ ] Cliquer sur "AJOUTER UN ESPRIT"
- [ ] Remplir les champs :
  - Nom : Ifrit
  - Élément : Feu
  - Niveau : 1
  - Pacte : "Pacte du Phoenix"
- [ ] Sauvegarder
- [ ] Vérifier qu'il apparaît dans la liste

#### D. Sorts

- [ ] Créer un nouveau sort
- [ ] Remplir :
  - Nom : Boule de Feu
  - Esprit Source : Ifrit
  - Niveau requis : 1
  - Coût : 5
  - Portée : 30 mètres
  - Cocher "Évolutif"
- [ ] Cliquer sur "LANCER LE SORT" (icône 🪄)
- [ ] Vérifier le message dans le chat avec :
  - Titre du sort
  - Détails (coût, portée, durée)
  - Effet
  - Effet niveaux supérieurs

#### E. Talents

- [ ] Créer un nouveau talent
- [ ] Remplir :
  - Nom : Second Souffle
  - Classe : Guerrier
  - Type : actif
  - Fréquence : 1/repos court
- [ ] Cliquer sur "UTILISER LE TALENT" (icône 👊)
- [ ] Vérifier le message dans le chat

#### F. Inventaire

- [ ] Ajouter un équipement
- [ ] Remplir les champs
- [ ] Cocher "Équipé"
- [ ] Vérifier qu'il apparaît dans le tableau

### ✅ Étape 5 : Test des Autres Types d'Acteurs

#### PNJ

- [ ] Créer un acteur de type "PNJ"
- [ ] Vérifier les onglets : STATS, TALENTS, INVENTAIRE, BIO
- [ ] Vérifier le champ "ATTITUDE" (sélecteur)

#### Monstre

- [ ] Créer un acteur de type "Monstre"
- [ ] Vérifier les onglets : STATS, CAPACITÉS, BIO
- [ ] Vérifier le champ "NIVEAU DE DANGER"

### ✅ Étape 6 : Test de la Console

Ouvrir la console (F12) et vérifier :

- [ ] Aucune erreur rouge
- [ ] Message "Valserra | Système initialisé avec succès"
- [ ] Message "Valserra | Système prêt"
- [ ] Aucun warning critique

## 🐛 Problèmes Potentiels

### Si les labels ne s'affichent pas correctement

**Problème** : Labels vides ou "undefined"  
**Solution** : Les templates utilisent maintenant des labels directs (pas de clés de localisation). Vérifiez que vous avez bien les nouveaux templates.

### Si le fond étoilé ne s'affiche pas

**Problème** : Fond uni sans étoiles  
**Solution** :

1. Vérifier que `starfield.css` est bien importé dans `style.css`
2. Ouvrir la fiche en mode F12 et vérifier les styles CSS appliqués
3. Rafraîchir la page (Ctrl+F5)

### Si les bordures ne sont pas blanches

**Problème** : Bordures grises ou absentes  
**Solution** : Vérifier `variables.css` → `--valserra-border: #ffffff;`

### Si les onglets ne fonctionnent pas

**Problème** : Impossible de changer d'onglet  
**Solution** :

1. Vérifier que `actor-sheet.js` charge correctement
2. Console F12 → Onglet "Sources" → Vérifier module/sheets/actor-sheet.js
3. Vérifier qu'il n'y a pas d'erreur JavaScript

## ✅ Tests de Compatibilité

### Modules à Tester

Si vous utilisez ces modules, testez la compatibilité :

- [ ] **Dice So Nice** - Les jets de dés s'affichent normalement
- [ ] **PopOut!** - Les fiches peuvent se détacher
- [ ] **Token Action HUD** - Pas de conflit
- [ ] **FXMaster** - Pas de conflit visuel

### Navigateurs Testés

Le design fonctionne sur :

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ⚠️ Safari (peut nécessiter des ajustements)

## 🔧 Commandes de Debug Utiles

### Dans la Console (F12)

Vérifier la configuration :

```javascript
console.log(CONFIG.VALSERRA);
```

Vérifier un acteur :

```javascript
let actor = game.actors.getName("Nom du personnage");
console.log(actor.system);
```

Vérifier les items d'un acteur :

```javascript
let actor = game.user.character;
console.log("Esprits:", actor.esprits);
console.log("Sorts:", actor.sorts);
console.log("Talents:", actor.talents);
```

## 📊 Résultats Attendus

### Design

- ✅ Fond bleu-violet (#1a1d3a)
- ✅ Étoiles blanches scintillantes
- ✅ Bordures blanches (#ffffff)
- ✅ Texte clair et lisible
- ✅ Sections bien définies avec coins ornementaux

### Fonctionnalités

- ✅ 3 types d'acteurs fonctionnels
- ✅ 4 types d'items fonctionnels
- ✅ Jets de dés automatiques
- ✅ Messages de chat stylisés
- ✅ Drag & drop d'items
- ✅ Calculs automatiques (mods, totaux)

## 🎯 Si Tout Fonctionne

**Félicitations ! 🎉**

Votre système Val'serra est opérationnel avec :

- Design magnifique
- Fonctionnalités complètes
- Documentation extensive

**Prochaines étapes suggérées :**

1. Créer vos esprits personnalisés
2. Définir vos classes et leurs talents
3. Créer des sorts pour chaque élément
4. Jouer votre première session !

## 🆘 Si Quelque Chose Ne Fonctionne Pas

1. **Vérifier la console (F12)** pour les erreurs
2. **Consulter** `NOUVEAU_DESIGN.md` pour les détails CSS
3. **Relire** `LISEZMOI_CHANGEMENTS.txt` pour les modifications
4. **Vérifier** que tous les fichiers sont présents

---

**Bon test ! 🧪✨**

Si tout fonctionne, vous êtes prêt pour de grandes aventures dans Val'serra ! 🎲
