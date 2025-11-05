import { ValserraActor } from "./documents/actor.js";
import { ValserraItem } from "./documents/item.js";
import { ValserraActorSheet } from "./sheets/actor-sheet.js";
import { ValserraItemSheet } from "./sheets/item-sheet.js";

/**
 * Initialisation du système Val'serra
 */
Hooks.once("init", function () {
  console.log("Valserra | Initialisation du système Val'serra");

  // Définir les classes de documents personnalisées
  CONFIG.Actor.documentClass = ValserraActor;
  CONFIG.Item.documentClass = ValserraItem;

  // Configuration globale
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
    ],
    typesTalent: ["actif", "passif", "réaction"],
    frequencesTalent: [
      "illimité",
      "1/repos court",
      "1/repos long",
      "1/jour",
      "1/combat",
    ],
    typesEquipement: [
      "arme",
      "armure",
      "bouclier",
      "accessoire",
      "consommable",
      "autre",
    ],
  };

  // Enregistrer les Handlebars helpers
  Handlebars.registerHelper("eq", (a, b) => a === b);
  Handlebars.registerHelper("concat", (...args) => {
    args.pop(); // Remove the options object
    return args.join("");
  });
  Handlebars.registerHelper("capitalize", (str) => {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  // Désenregistrer les sheets par défaut
  Actors.unregisterSheet("core", ActorSheet);
  Items.unregisterSheet("core", ItemSheet);

  // Enregistrer les sheets personnalisées pour les acteurs
  Actors.registerSheet("valserra", ValserraActorSheet, {
    types: ["personnage", "pnj", "monstre"],
    makeDefault: true,
    label: "VALSERRA.ActorSheet",
  });

  // Enregistrer les sheets personnalisées pour les items
  Items.registerSheet("valserra", ValserraItemSheet, {
    types: ["esprit", "sort", "talent", "equipement"],
    makeDefault: true,
    label: "VALSERRA.ItemSheet",
  });

  console.log("Valserra | Système initialisé avec succès");
});

/**
 * Hook pour préparer les données du système
 */
Hooks.once("ready", function () {
  console.log("Valserra | Système prêt");
  // Met à jour les tokens créés pour utiliser une image ronde avec bordure
  Hooks.on("createToken", async (doc) => {
    try {
      const actor = game.actors?.get(doc.actorId);
      if (!actor) return;
      const borderColor = actor.system?.token?.borderColor || "#ffffff";
      const borderWidth = actor.system?.token?.borderWidth ?? 6;
      const rounded = await generateRoundToken(actor.img, borderColor, borderWidth);
      await doc.update({ "texture.src": rounded });
    } catch (e) {
      console.warn("Valserra | Échec génération token rond:", e);
    }
  });

  // Met à jour le prototype de token à chaque changement d'image ou de couleur
  Hooks.on("updateActor", async (actor, changes) => {
    const imgChanged = !!changes.img;
    const tokenColorChanged = !!changes["system"]?.token?.borderColor ||
      typeof changes["system"]?.token?.borderWidth !== "undefined";
    if (!imgChanged && !tokenColorChanged) return;
    try {
      const borderColor = actor.system?.token?.borderColor || "#ffffff";
      const borderWidth = actor.system?.token?.borderWidth ?? 6;
      const rounded = await generateRoundToken(actor.img, borderColor, borderWidth);
      await actor.update({ prototypeToken: { texture: { src: rounded } } });
    } catch (e) {
      console.warn("Valserra | Échec mise à jour prototype token rond:", e);
    }
  });
});

/**
 * Génère une image ronde avec bordure depuis une source
 * @param {string} src
 * @param {string} borderColor
 * @param {number} borderWidth
 * @returns {Promise<string>} data URL PNG
 */
async function generateRoundToken(src, borderColor, borderWidth) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const img = await loadImage(src);

  // Couverture centrée
  const imgRatio = img.width / img.height;
  const canvasRatio = 1;
  let drawWidth, drawHeight;
  if (imgRatio > canvasRatio) {
    // Image plus large que haute: remplir en hauteur, centrer horizontalement
    drawHeight = size;
    drawWidth = img.width * (size / img.height);
  } else {
    // Image plus haute que large: remplir en largeur
    drawWidth = size;
    drawHeight = img.height * (size / img.width);
  }
  const dx = (size - drawWidth) / 2;
  // Aligner depuis le haut pour que le haut de l'image soit visible
  const dy = 0;

  // Masque circulaire
  ctx.save();
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, (size / 2) - borderWidth, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
  ctx.restore();

  // Bordure
  if (borderWidth > 0) {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, (size / 2) - (borderWidth / 2), 0, Math.PI * 2);
    ctx.closePath();
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    ctx.stroke();
  }

  return canvas.toDataURL("image/png");
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
