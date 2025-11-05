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
});
