export class GrimoireActorSheet extends foundry.appv1.sheets.ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["valserra", "sheet", "actor"],
      template: "systems/valserra/module/actor-sheet.html",
      width: 600,
      height: "auto",
    });
  }

  async getData(options) {
    const context = await super.getData(options);
    const system = this.actor.system;

    // Fallback si une nouvelle fiche n'a pas encore les valeurs
    context.system = system;
    context.caracteristiques = system.caracteristiques || {
      force: 0,
      dexterite: 0,
      constitution: 0,
      intelligence: 0,
      sagesse: 0,
      charisme: 0
    };
    context.competences = system.competences || {
      intimidation: { valeur: 0, rang: "non-entrainé" },
      acrobatie: { valeur: 0, rang: "non-entrainé" },
      volonte: { valeur: 0, rang: "non-entrainé" },
      nature: { valeur: 0, rang: "non-entrainé" },
      diplomatie: { valeur: 0, rang: "non-entrainé" },
      discretion: { valeur: 0, rang: "non-entrainé" },
      arcane: { valeur: 0, rang: "non-entrainé" },
      medecine: { valeur: 0, rang: "non-entrainé" },
      performance: { valeur: 0, rang: "non-entrainé" },
      histoire: { valeur: 0, rang: "non-entrainé" },
      survie: { valeur: 0, rang: "non-entrainé" },
      perception: { valeur: 0, rang: "non-entrainé" },
      intuition: { valeur: 0, rang: "non-entrainé" }
    };

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find("input, select").change(async (event) => {
      event.preventDefault();
      const element = event.currentTarget;
      const name = element.name;
      const value = element.type === "number" ? parseInt(element.value) : element.value;
      await this.actor.update({ [name]: value });
    });
  }
}
