# Exemples de Macros pour Val'serra

Ce document contient des macros utiles pour automatiser certaines tâches dans le système Val'serra.

## 🎲 Macros de Jets de Dés

### Jet de Caractéristique Personnalisé

```javascript
// Macro : Jet de Force avec Bonus
const actor = game.user.character;
if (!actor) {
  ui.notifications.warn("Aucun personnage sélectionné !");
  return;
}

const force = actor.system.caracteristiques.force;
const bonus = 2; // Bonus situationnel

const roll = new Roll("1d20 + @mod + @bonus", {
  mod: force.mod,
  bonus: bonus,
});
await roll.evaluate();

roll.toMessage({
  speaker: ChatMessage.getSpeaker({ actor: actor }),
  flavor: `Jet de Force (avec bonus +${bonus})`,
});
```

### Jet de Compétence Rapide

```javascript
// Macro : Jet de Perception Rapide
const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
if (!actor) {
  ui.notifications.warn("Sélectionnez un token ou assignez un personnage !");
  return;
}

const perception = actor.system.competences.perception;
const roll = new Roll("1d20 + @total", { total: perception.total });
await roll.evaluate();

roll.toMessage({
  speaker: ChatMessage.getSpeaker({ actor: actor }),
  flavor: "Jet de Perception",
});
```

## 🔮 Macros de Gestion d'Énergie

### Dépenser de l'Énergie

```javascript
// Macro : Utiliser de l'Énergie
// Note : Nécessite d'ajouter un champ "energie" dans template.json

const actor = game.user.character;
if (!actor) {
  ui.notifications.warn("Aucun personnage sélectionné !");
  return;
}

// Demander le coût
const cout = await Dialog.prompt({
  title: "Coût en Énergie",
  content: `
        <form>
            <div class="form-group">
                <label>Énergie à dépenser :</label>
                <input type="number" name="cout" value="5" min="0" />
            </div>
        </form>
    `,
  callback: (html) => html.find('[name="cout"]').val(),
});

const coutNum = parseInt(cout);
const energieActuelle = actor.system.energie?.value || 0;

if (energieActuelle < coutNum) {
  ui.notifications.error("Énergie insuffisante !");
  return;
}

await actor.update({
  "system.energie.value": energieActuelle - coutNum,
});

ChatMessage.create({
  speaker: ChatMessage.getSpeaker({ actor: actor }),
  content: `<p>${actor.name} dépense <strong>${coutNum}</strong> énergie.</p>
              <p>Énergie restante : <strong>${
                energieActuelle - coutNum
              }</strong></p>`,
});
```

### Repos Court (Récupération d'Énergie)

```javascript
// Macro : Repos Court
const actor = game.user.character;
if (!actor) {
  ui.notifications.warn("Aucun personnage sélectionné !");
  return;
}

const energieMax = actor.system.energie?.max || 20;
const recuperation = Math.floor(energieMax / 2);
const energieActuelle = actor.system.energie?.value || 0;
const nouvelleEnergie = Math.min(energieActuelle + recuperation, energieMax);

await actor.update({
  "system.energie.value": nouvelleEnergie,
});

ChatMessage.create({
  speaker: ChatMessage.getSpeaker({ actor: actor }),
  content: `<p>${actor.name} prend un repos court et récupère <strong>${recuperation}</strong> points d'énergie.</p>
              <p>Énergie actuelle : <strong>${nouvelleEnergie}/${energieMax}</strong></p>`,
});
```

## 👊 Macros de Combat

### Attaque de Base

```javascript
// Macro : Attaque de Base
const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
if (!actor) {
  ui.notifications.warn("Sélectionnez un token !");
  return;
}

const force = actor.system.caracteristiques.force;
const rollAttaque = new Roll("1d20 + @mod", { mod: force.mod });
await rollAttaque.evaluate();

const rollDegats = new Roll("1d8 + @mod", { mod: force.mod });
await rollDegats.evaluate();

rollAttaque.toMessage({
  speaker: ChatMessage.getSpeaker({ actor: actor }),
  flavor: "Jet d'Attaque",
});

rollDegats.toMessage({
  speaker: ChatMessage.getSpeaker({ actor: actor }),
  flavor: "Dégâts",
});
```

### Soins

```javascript
// Macro : Soins
const actor = game.user.character;
if (!actor) {
  ui.notifications.warn("Aucun personnage sélectionné !");
  return;
}

const rollSoins = new Roll("2d6 + 5");
await rollSoins.evaluate();
const soins = rollSoins.total;

const pvActuels = actor.system.pv.value;
const pvMax = actor.system.pv.max;
const nouveauxPV = Math.min(pvActuels + soins, pvMax);

await actor.update({
  "system.pv.value": nouveauxPV,
});

ChatMessage.create({
  speaker: ChatMessage.getSpeaker({ actor: actor }),
  content: `<div class="valserra">
        <h3>💚 Soins</h3>
        <p>${actor.name} récupère <strong>${soins}</strong> PV.</p>
        <p>PV : <strong>${nouveauxPV}/${pvMax}</strong></p>
    </div>`,
});
```

## 📊 Macros d'Affichage

### Afficher Tous les Esprits

```javascript
// Macro : Liste des Esprits
const actor = game.user.character;
if (!actor) {
  ui.notifications.warn("Aucun personnage sélectionné !");
  return;
}

const esprits = actor.items.filter((i) => i.type === "esprit");

if (esprits.length === 0) {
  ui.notifications.info("Aucun esprit lié !");
  return;
}

let content = "<h2>Esprits Liés</h2><ul>";
for (let esprit of esprits) {
  content += `
        <li>
            <strong>${esprit.name}</strong> (${esprit.system.element})<br>
            Niveau ${esprit.system.niveau}/${esprit.system.niveauMax}
        </li>
    `;
}
content += "</ul>";

ChatMessage.create({
  speaker: ChatMessage.getSpeaker({ actor: actor }),
  content: `<div class="valserra">${content}</div>`,
});
```

### Résumé du Personnage

```javascript
// Macro : Résumé du Personnage
const actor = game.user.character;
if (!actor) {
  ui.notifications.warn("Aucun personnage sélectionné !");
  return;
}

const sys = actor.system;
const esprits = actor.items.filter((i) => i.type === "esprit").length;
const capacites = actor.items.filter((i) => i.type === "capacite").length;

ChatMessage.create({
  speaker: ChatMessage.getSpeaker({ actor: actor }),
  content: `
        <div class="valserra" style="padding: 15px; background: linear-gradient(135deg, #4a6fa5, #2c3e50); color: white; border-radius: 8px;">
            <h2 style="color: white; border-bottom: 2px solid white;">${actor.name}</h2>
            <p><strong>Niveau ${sys.niveau}</strong> ${sys.race} ${sys.classe}</p>
            <hr style="border-color: rgba(255,255,255,0.3);">
            <p><strong>PV :</strong> ${sys.pv.value}/${sys.pv.max}</p>
            <p><strong>Esprits liés :</strong> ${esprits}</p>
            <p><strong>Capacités :</strong> ${capacites}</p>
            <hr style="border-color: rgba(255,255,255,0.3);">
            <p><em>${sys.alignement}</em></p>
        </div>
    `,
});
```

## 🎯 Macros de MJ

### Initialiser un Nouveau Personnage

```javascript
// Macro MJ : Initialiser PJ
if (!game.user.isGM) {
  ui.notifications.error("Réservé au MJ !");
  return;
}

// Créer un nouveau personnage avec valeurs par défaut
const actorData = {
  name: "Nouveau Héros",
  type: "personnage",
  system: {
    niveau: 1,
    experience: 0,
    race: "Humain",
    classe: "Aventurier",
    pv: {
      value: 20,
      max: 20,
      temp: 0,
    },
    caracteristiques: {
      force: { value: 10, mod: 0 },
      dexterite: { value: 10, mod: 0 },
      constitution: { value: 10, mod: 0 },
      intelligence: { value: 10, mod: 0 },
      volonte: { value: 10, mod: 0 },
      charisme: { value: 10, mod: 0 },
    },
  },
};

const actor = await Actor.create(actorData);
ui.notifications.info(`Personnage ${actor.name} créé !`);
actor.sheet.render(true);
```

### Donner de l'Expérience

```javascript
// Macro MJ : Donner XP
if (!game.user.isGM) {
  ui.notifications.error("Réservé au MJ !");
  return;
}

const xp = await Dialog.prompt({
  title: "Attribution d'XP",
  content: `
        <form>
            <div class="form-group">
                <label>Points d'expérience à attribuer :</label>
                <input type="number" name="xp" value="100" min="0" />
            </div>
        </form>
    `,
  callback: (html) => html.find('[name="xp"]').val(),
});

const xpNum = parseInt(xp);

for (let actor of game.actors.filter((a) => a.type === "personnage")) {
  const xpActuel = actor.system.experience || 0;
  await actor.update({
    "system.experience": xpActuel + xpNum,
  });
}

ChatMessage.create({
  user: game.user.id,
  content: `<p>Le MJ accorde <strong>${xpNum} XP</strong> à tous les personnages !</p>`,
});
```

## 📦 Installation d'une Macro

1. Dans Foundry, allez dans l'onglet **Macros** (en bas à gauche)
2. Cliquez sur **Créer une macro**
3. Donnez-lui un nom
4. Sélectionnez le type **Script**
5. Copiez-collez le code de la macro
6. Cliquez sur **Enregistrer**
7. Glissez la macro sur votre barre de raccourcis

## 💡 Personnalisation

N'hésitez pas à modifier ces macros selon vos besoins ! Les macros JavaScript offrent une grande flexibilité pour automatiser votre jeu.

Pour en savoir plus sur les macros Foundry :

- Documentation officielle : https://foundryvtt.com/article/macros/
- API Foundry : https://foundryvtt.com/api/

---

_Ces macros sont des exemples de base. Explorez l'API Foundry pour créer des macros plus avancées !_
