# Guide d'Extension du Système Val'serra

Ce guide explique comment étendre et personnaliser le système Val'serra pour répondre à vos besoins spécifiques.

## 📊 Ajouter de Nouveaux Champs aux Acteurs

### Exemple : Ajouter un Système d'Énergie

#### 1. Modifier `template.json`

Ajoutez le champ "energie" dans la section "base" :

```json
"base": {
  "biographie": "",
  "notes": "",
  "pv": {
    "value": 20,
    "max": 20,
    "temp": 0
  },
  "energie": {
    "value": 20,
    "max": 20
  },
  "caracteristiques": {
    // ... reste du code
  }
}
```

#### 2. Modifier le Template Handlebars

Éditez `templates/sheets/actor-personnage-sheet.hbs` et ajoutez après la section PV :

```handlebars
{{! Énergie }}
<div class="energie-section">
  <h3>Énergie</h3>
  <div class="energie-fields">
    <div class="field">
      <label>Énergie</label>
      <input
        type="number"
        name="system.energie.value"
        value="{{system.energie.value}}"
      />
    </div>
    <span class="separator">/</span>
    <div class="field">
      <label>Max</label>
      <input
        type="number"
        name="system.energie.max"
        value="{{system.energie.max}}"
      />
    </div>
  </div>
</div>
```

#### 3. Ajouter des Styles CSS

Dans `styles/style.css`, ajoutez :

```css
.valserra .energie-section {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  padding: 15px;
  border-radius: 8px;
  color: white;
  margin-bottom: 20px;
}

.valserra .energie-section h3 {
  color: white;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  margin-top: 0;
}

.valserra .energie-fields {
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
```

## 🎭 Ajouter un Nouveau Type d'Acteur

### Exemple : Créer un Type "Véhicule"

#### 1. Modifier `system.json`

```json
"documentTypes": {
  "Actor": {
    "personnage": {},
    "pnj": {},
    "monstre": {},
    "vehicule": {}
  }
}
```

#### 2. Modifier `template.json`

```json
"vehicule": {
  "templates": ["base"],
  "typeVehicule": "terrestre",
  "vitesse": 0,
  "capacitePassagers": 1,
  "pointsStructure": {
    "value": 100,
    "max": 100
  }
}
```

#### 3. Créer le Template

Créez `templates/sheets/actor-vehicule-sheet.hbs` (inspirez-vous des autres templates).

#### 4. Enregistrer le Template

Dans `module/main.js`, ligne 39 :

```javascript
Actors.registerSheet("valserra", ValserraActorSheet, {
  types: ["personnage", "pnj", "monstre", "vehicule"],
  makeDefault: true,
  label: "VALSERRA.ActorSheet",
});
```

## 📦 Ajouter un Nouveau Type d'Item

### Exemple : Créer un Type "Rituel"

#### 1. Modifier `system.json`

```json
"documentTypes": {
  "Item": {
    "esprit": {},
    "capacite": {},
    "equipement": {},
    "rituel": {}
  }
}
```

#### 2. Modifier `template.json`

```json
"rituel": {
  "templates": ["baseItem"],
  "duree": "1 heure",
  "composants": "",
  "niveauRequis": 1,
  "effet": ""
}
```

#### 3. Créer le Template

Créez `templates/sheets/item-rituel-sheet.hbs` :

```handlebars
<form class="{{cssClass}} flexcol" autocomplete="off">
  <header class="sheet-header">
    <img
      class="profile-img"
      src="{{item.img}}"
      data-edit="img"
      title="{{item.name}}"
    />
    <div class="header-fields">
      <h1 class="charname">
        <input
          name="name"
          type="text"
          value="{{item.name}}"
          placeholder="Nom du rituel"
        />
      </h1>
    </div>
  </header>

  <section class="sheet-body">
    <div class="form-group">
      <label>Durée</label>
      <input type="text" name="system.duree" value="{{system.duree}}" />
    </div>

    <div class="form-group">
      <label>Niveau Requis</label>
      <input
        type="number"
        name="system.niveauRequis"
        value="{{system.niveauRequis}}"
      />
    </div>

    <div class="form-group">
      <label>Composants</label>
      <textarea
        name="system.composants"
        rows="3"
      >{{system.composants}}</textarea>
    </div>

    <div class="form-group editor-content">
      <label>Description</label>
      {{editor
        enrichedDescription
        target="system.description"
        button=true
        owner=owner
        editable=editable
      }}
    </div>

    <div class="form-group">
      <label>Effet</label>
      <textarea name="system.effet" rows="4">{{system.effet}}</textarea>
    </div>
  </section>
</form>
```

#### 4. Ajouter la Logique

Dans `module/documents/item.js`, ajoutez :

```javascript
_prepareRituelData(systemData) {
  // Logique spécifique aux rituels
  if (systemData.niveauRequis < 1) systemData.niveauRequis = 1;
}
```

Et dans `prepareDerivedData` :

```javascript
} else if (itemData.type === 'rituel') {
  this._prepareRituelData(systemData);
}
```

## ⚙️ Ajouter des Effets Automatisés

### Exemple : Effet de Buff sur une Capacité

#### 1. Modifier `module/documents/item.js`

Dans la méthode `utiliserCapacite` :

```javascript
async utiliserCapacite() {
  if (this.type !== 'capacite') return;

  const actor = this.actor;
  if (!actor) return;

  // Appliquer l'effet
  if (this.system.effet.includes("bonus force")) {
    const bonusForce = 2;
    const forceActuelle = actor.system.caracteristiques.force.value;

    await actor.update({
      "system.caracteristiques.force.value": forceActuelle + bonusForce
    });

    ui.notifications.info(`Force augmentée de ${bonusForce} !`);
  }

  // Message dans le chat...
}
```

### Système d'Effets Plus Avancé

Pour un système d'effets vraiment robuste, utilisez l'API Active Effects de Foundry :

```javascript
// Créer un effet actif
async ajouterEffet(actor, nomEffet, duree) {
  const effectData = {
    name: nomEffet,
    icon: "icons/svg/aura.svg",
    duration: {
      rounds: duree
    },
    changes: [
      {
        key: "system.caracteristiques.force.value",
        mode: 2, // ADD
        value: "+2"
      }
    ]
  };

  await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
}
```

## 🎲 Personnaliser les Jets de Dés

### Ajouter des Dés Explosifs

Dans `module/sheets/actor-sheet.js`, modifiez `_onCompetenceRoll` :

```javascript
async _onCompetenceRoll(event) {
  event.preventDefault();
  const element = event.currentTarget;
  const dataset = element.dataset;
  const compName = dataset.competence;
  const compData = this.actor.system.competences[compName];

  // Demander si dés explosifs
  const explosif = await Dialog.confirm({
    title: "Dés Explosifs",
    content: "<p>Utiliser des dés explosifs ?</p>"
  });

  const formule = explosif ? "1d20x + @total" : "1d20 + @total";
  const roll = new Roll(formule, { total: compData.total });
  await roll.evaluate();

  roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor: this.actor }),
    flavor: `Jet de ${game.i18n.localize(`VALSERRA.ActorSheet.Competences.${compName.charAt(0).toUpperCase() + compName.slice(1)}`)}`
  });
}
```

## 🌐 Ajouter une Nouvelle Langue

### 1. Créer le Fichier de Langue

Créez `lang/en.json` (copie de `fr.json`) et traduisez :

```json
{
  "VALSERRA": {
    "ActorSheet": {
      "Tabs": {
        "Stats": "Statistics",
        "Esprits": "Spirits",
        "Capacites": "Abilities",
        "Inventaire": "Inventory",
        "Biographie": "Biography"
      }
      // ... etc
    }
  }
}
```

### 2. Enregistrer dans `system.json`

```json
"languages": [
  {
    "lang": "fr",
    "name": "Français",
    "path": "lang/fr.json"
  },
  {
    "lang": "en",
    "name": "English",
    "path": "lang/en.json"
  }
]
```

## 🔧 Ajouter des Handlebars Helpers

Dans `module/main.js`, ajoutez de nouveaux helpers :

```javascript
// Helper pour formater les nombres
Handlebars.registerHelper("formatNumber", (num) => {
  return num.toLocaleString();
});

// Helper pour conditions multiples
Handlebars.registerHelper("or", function () {
  return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
});

// Helper pour afficher des étoiles de niveau
Handlebars.registerHelper("stars", (niveau, max) => {
  let stars = "";
  for (let i = 0; i < max; i++) {
    stars += i < niveau ? "★" : "☆";
  }
  return stars;
});
```

Utilisation dans les templates :

```handlebars
<p>Niveau : {{stars system.niveau system.niveauMax}}</p>
```

## 📊 Ajouter des Compendiums

### 1. Créer le Dossier

Créez `packs/esprits-de-base/` dans votre système.

### 2. Déclarer dans `system.json`

```json
"packs": [
  {
    "name": "esprits-de-base",
    "label": "Esprits de Base",
    "path": "packs/esprits-de-base",
    "type": "Item",
    "system": "valserra"
  }
]
```

### 3. Créer via l'Interface

1. Dans Foundry, allez dans l'onglet **Compendium Packs**
2. Le compendium "Esprits de Base" apparaît
3. Créez vos esprits et glissez-les dans le compendium

## 🎨 Personnaliser les Couleurs

Dans `styles/style.css`, modifiez les variables CSS :

```css
:root {
  --valserra-primary: #8b4513; /* Brun au lieu de bleu */
  --valserra-secondary: #654321; /* Brun foncé */
  --valserra-accent: #ff6347; /* Rouge tomate */
  --valserra-success: #32cd32; /* Vert citron */
  /* ... etc */
}
```

## 🔐 Ajouter des Permissions

Dans `module/sheets/actor-sheet.js` :

```javascript
activateListeners(html) {
  super.activateListeners(html);

  // Limiter l'édition aux propriétaires
  if (!this.isEditable) return;

  // Fonctionnalités MJ uniquement
  if (game.user.isGM) {
    html.find('.gm-only-button').click(this._onGMFunction.bind(this));
  } else {
    html.find('.gm-only-button').hide();
  }

  // ... reste du code
}
```

## 📚 Ressources Additionnelles

### Documentation Foundry

- **System Development Tutorial** : https://foundryvtt.com/article/system-development/
- **API Documentation** : https://foundryvtt.com/api/
- **Data Models V10+** : https://foundryvtt.com/article/v10-data-model/

### Exemples de Systèmes

Étudiez ces systèmes pour apprendre :

- **Simple Worldbuilding** : Système de base simple
- **Boilerplate System** : Template pour créer un système
- **D&D5e** : Système complexe et complet

### Communauté

- **Discord Foundry VTT** : https://discord.gg/foundryvtt
- **Reddit r/FoundryVTT** : https://reddit.com/r/FoundryVTT
- **Forums officiels** : https://forums.forge-vtt.com/

## 💡 Bonnes Pratiques

1. **Testez régulièrement** : Testez chaque modification dans Foundry
2. **Sauvegardez souvent** : Faites des sauvegardes avant les gros changements
3. **Versionnez** : Utilisez Git pour suivre vos modifications
4. **Documentez** : Commentez votre code et mettez à jour le CHANGELOG
5. **Modularisez** : Séparez votre code en fichiers logiques
6. **Suivez les conventions** : Respectez les conventions de nommage Foundry

## 🐛 Debugging

### Console du Navigateur

Appuyez sur `F12` dans Foundry pour ouvrir la console et voir les erreurs.

### Logs Utiles

Ajoutez des logs dans votre code :

```javascript
console.log("Valeur de la variable:", maVariable);
console.warn("Attention, ceci est suspect");
console.error("Erreur critique!");
```

### Breakpoints

Dans la console (F12), onglet "Sources", cliquez sur un numéro de ligne pour ajouter un breakpoint.

---

## 🎉 Conclusion

Le système Val'serra est conçu pour être extensible. N'hésitez pas à expérimenter et à l'adapter à vos besoins. Si vous créez des extensions intéressantes, partagez-les avec la communauté !

**Bon développement !** 🚀
