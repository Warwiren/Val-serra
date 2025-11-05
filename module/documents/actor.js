/**
 * Data model pour les acteurs Val'serra
 */
export class ValserraActor extends Actor {
  /**
   * Prépare les données dérivées de l'acteur
   */
  prepareDerivedData() {
    super.prepareDerivedData();
    const actorData = this;
    const systemData = actorData.system;

    // Calcul des modificateurs de caractéristiques
    for (let [key, carac] of Object.entries(systemData.caracteristiques)) {
      carac.mod = Math.floor((carac.value - 10) / 2);
    }

    // Calcul des compétences SANS dépendance aux caractéristiques
    this._prepareCompetences(systemData);

    // Calcul des PV max et clamp de la valeur courante
    const force = systemData.caracteristiques.force?.value || 0;
    const constitution = systemData.caracteristiques.constitution?.value || 0;
    systemData.pv = systemData.pv || { value: 10, max: 10, temp: 0 };
    systemData.pv.max = 10 + constitution * 10 + force * 3;
    if (systemData.pv.value > systemData.pv.max) systemData.pv.value = systemData.pv.max;
    if (systemData.pv.value < 0) systemData.pv.value = 0;

    // Calcul de la Mana
    const intelligence = systemData.caracteristiques.intelligence?.value || 0;
    const volonte = systemData.caracteristiques.volonte?.value || 0;
    systemData.mana = systemData.mana || { value: 5, max: 5 };
    systemData.mana.max = 5 + intelligence * 4 + volonte * 2;
    if (systemData.mana.value > systemData.mana.max) systemData.mana.value = systemData.mana.max;
    if (systemData.mana.value < 0) systemData.mana.value = 0;

    // Barre martiale
    systemData.martial = systemData.martial || { value: 5, max: 10 };
    systemData.martial.max = 10;
    if (systemData.martial.value > systemData.martial.max) systemData.martial.value = systemData.martial.max;
    if (systemData.martial.value < 0) systemData.martial.value = 0;

    // Armure (CA) en fonction des équipements équipés
    let totalArmure = 0;
    for (const item of this.items) {
      if (item.type !== "equipement") continue;
      const eq = item.system || {};
      if (eq.equipe && typeof eq.armure === "number") totalArmure += eq.armure;
    }
    systemData.armure = totalArmure;
  }

  /**
   * Prépare les compétences avec leurs modificateurs
   */
  _prepareCompetences(systemData) {
    const rangBonus = {
      "non-entrainé": 0,
      novice: 2,
      intermédiaire: 4,
      expert: 6,
      maitre: 8,
    };

    for (let [, comp] of Object.entries(systemData.competences)) {
      const rangeMod = rangBonus[comp.rang] || 0;
      comp.total = (comp.value || 0) + rangeMod;
    }
  }

  /**
   * Récupère les items par type
   */
  get esprits() {
    return this.items.filter((i) => i.type === "esprit");
  }

  get sorts() {
    return this.items.filter((i) => i.type === "sort");
  }

  get talents() {
    return this.items.filter((i) => i.type === "talent");
  }

  get equipements() {
    return this.items.filter((i) => i.type === "equipement");
  }
}
