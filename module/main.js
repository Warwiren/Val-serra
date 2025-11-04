import { GrimoireActorSheet } from "./actor-sheet.js";

Hooks.once("init", function () {
  console.log("Valserra | Initialisation du système");

  // Charger les templates de données
//   CONFIG.Actor.dataModels = {
//     personnage: {}
//   };
Handlebars.registerHelper("eq", (a, b) => a === b);

  // Enregistrer la fiche de perso
const { ActorSheet } = foundry.appv1.sheets;
foundry.documents.collections.Actors.unregisterSheet("core", ActorSheet);
foundry.documents.collections.Actors.registerSheet("valserra", GrimoireActorSheet, { makeDefault: true });

});
