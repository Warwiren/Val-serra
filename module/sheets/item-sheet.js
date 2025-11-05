/**
 * Fiche d'item pour Val'serra
 */
export class ValserraItemSheet extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["valserra", "sheet", "item"],
      width: 600,
      height: 650,
      resizable: true,
    });
  }

  get template() {
    const path = "systems/valserra/templates/sheets";
    return `${path}/item-${this.item.type}-sheet.hbs`;
  }

  async getData(options) {
    const context = await super.getData(options);
    const itemData = this.document;

    // Ajouter le système et les données de l'item
    context.system = itemData.system;
    context.config = CONFIG.VALSERRA;

    // Enrichir la description
    context.enrichedDescription = await TextEditor.enrichHTML(
      context.system.description || "",
      { async: true }
    );

    // Préparer les données spécifiques selon le type
    if (itemData.type === "esprit") {
      context.elements = [
        "Feu",
        "Eau",
        "Terre",
        "Air",
        "Lumière",
        "Ténèbres",
        "Nature",
        "Arcane",
      ];
    } else if (itemData.type === "sort") {
      // Récupérer les esprits disponibles si l'item est sur un acteur
      if (this.item.actor) {
        context.esprits = this.item.actor.items.filter(
          (i) => i.type === "esprit"
        );
      }
    } else if (itemData.type === "talent") {
      context.typesTalent = CONFIG.VALSERRA.typesTalent;
      context.frequencesTalent = CONFIG.VALSERRA.frequencesTalent;
    } else if (itemData.type === "equipement") {
      context.typesEquipement = CONFIG.VALSERRA.typesEquipement;
    }

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Tout est éditable sauf pour les observateurs
    if (!this.isEditable) return;

    // Utiliser le sort/talent depuis sa fiche
    html.find(".use-sort").click(this._onUseSort.bind(this));
    html.find(".use-talent").click(this._onUseTalent.bind(this));
  }

  /**
   * Lancer un sort
   */
  async _onUseSort(event) {
    event.preventDefault();
    if (this.item.type === "sort" && this.item.actor) {
      await this.item.lancerSort();
    }
  }

  /**
   * Utiliser un talent
   */
  async _onUseTalent(event) {
    event.preventDefault();
    if (this.item.type === "talent" && this.item.actor) {
      await this.item.utiliserTalent();
    }
  }
}
