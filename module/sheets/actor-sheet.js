/**
 * Fiche d'acteur pour Val'serra avec onglets
 */
export class ValserraActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["valserra", "sheet", "actor"],
      width: 850,
      height: 900,
      resizable: true,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "stats",
        },
      ],
    });
  }

  get template() {
    const path = "systems/valserra/templates/sheets";
    return `${path}/actor-${this.actor.type}-sheet.hbs`;
  }

  async getData(options) {
    const context = await super.getData(options);
    const actorData = this.document;

    // Ajouter le système et les données de l'acteur
    context.system = actorData.system;
    context.config = CONFIG.VALSERRA;

    // Préparer les items par type
    context.esprits = actorData.items.filter((i) => i.type === "esprit");
    context.sorts = actorData.items.filter((i) => i.type === "sort");
    context.talents = actorData.items.filter((i) => i.type === "talent");
    context.equipements = actorData.items.filter(
      (i) => i.type === "equipement"
    );

    // Enrichir les descriptions HTML
    context.enrichedBiographie = await TextEditor.enrichHTML(
      context.system.biographie || "",
      { async: true }
    );
    context.enrichedNotes = await TextEditor.enrichHTML(
      context.system.notes || "",
      { async: true }
    );

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Tout est éditable sauf pour les observateurs
    if (!this.isEditable) return;

    // Rollable caractéristiques
    html
      .find(".characteristic-roll")
      .click(this._onCharacteristicRoll.bind(this));

    // Rollable compétences
    html.find(".competence-roll").click(this._onCompetenceRoll.bind(this));

    // Gestion des items
    html.find(".item-create").click(this._onItemCreate.bind(this));
    html.find(".item-edit").click(this._onItemEdit.bind(this));
    html.find(".item-delete").click(this._onItemDelete.bind(this));
    html.find(".item-use").click(this._onItemUse.bind(this));

    // Drag and drop
    const dragHandler = (event) => this._onDragStart(event);
    html.find(".item").each((i, li) => {
      li.setAttribute("draggable", true);
      li.addEventListener("dragstart", dragHandler, false);
    });
  }

  /**
   * Jet de caractéristique
   */
  async _onCharacteristicRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    const caracName = dataset.characteristic;
    const caracData = this.actor.system.caracteristiques[caracName];

    const roll = new Roll("1d20 + @mod", { mod: caracData.mod });
    await roll.evaluate();

    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `Jet de ${game.i18n.localize(
        `VALSERRA.ActorSheet.Caracteristiques.${
          caracName.charAt(0).toUpperCase() + caracName.slice(1)
        }`
      )}`,
    });
  }

  /**
   * Jet de compétence
   */
  async _onCompetenceRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    const compName = dataset.competence;
    const compData = this.actor.system.competences[compName];

    const roll = new Roll("1d20 + @total", { total: compData.total });
    await roll.evaluate();

    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `Jet de ${game.i18n.localize(
        `VALSERRA.ActorSheet.Competences.${
          compName.charAt(0).toUpperCase() + compName.slice(1)
        }`
      )}`,
    });
  }

  /**
   * Créer un nouvel item
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    const type = dataset.type;

    const itemData = {
      name: `Nouveau ${type}`,
      type: type,
      system: {},
    };

    return await Item.create(itemData, { parent: this.actor });
  }

  /**
   * Éditer un item
   */
  _onItemEdit(event) {
    event.preventDefault();
    const li = $(event.currentTarget).parents(".item");
    const item = this.actor.items.get(li.data("itemId"));
    if (item) {
      item.sheet.render(true);
    }
  }

  /**
   * Supprimer un item
   */
  async _onItemDelete(event) {
    event.preventDefault();
    const li = $(event.currentTarget).parents(".item");
    const item = this.actor.items.get(li.data("itemId"));
    if (item) {
      const confirmed = await Dialog.confirm({
        title: `Supprimer ${item.name}`,
        content: `<p>Êtes-vous sûr de vouloir supprimer <strong>${item.name}</strong> ?</p>`,
      });
      if (confirmed) {
        await item.delete();
      }
    }
  }

  /**
   * Utiliser un item (sort ou talent)
   */
  async _onItemUse(event) {
    event.preventDefault();
    const li = $(event.currentTarget).parents(".item");
    const item = this.actor.items.get(li.data("itemId"));
    if (item) {
      if (item.type === "sort") {
        await item.lancerSort();
      } else if (item.type === "talent") {
        await item.utiliserTalent();
      }
    }
  }
}
