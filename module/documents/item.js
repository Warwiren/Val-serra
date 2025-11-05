/**
 * Data model pour les items Val'serra
 */
export class ValserraItem extends Item {
  /**
   * Prépare les données dérivées de l'item
   */
  prepareDerivedData() {
    super.prepareDerivedData();
    const itemData = this;
    const systemData = itemData.system;

    // Logique spécifique selon le type d'item
    if (itemData.type === "esprit") {
      this._prepareEspritData(systemData);
    } else if (itemData.type === "sort") {
      this._prepareSortData(systemData);
    } else if (itemData.type === "talent") {
      this._prepareTalentData(systemData);
    } else if (itemData.type === "equipement") {
      this._prepareEquipementData(systemData);
    }
  }

  /**
   * Prépare les données des esprits
   */
  _prepareEspritData(systemData) {
    // S'assurer que le niveau n'excède pas le maximum
    if (systemData.niveau > systemData.niveauMax) {
      systemData.niveau = systemData.niveauMax;
    }
  }

  /**
   * Prépare les données des sorts
   */
  _prepareSortData(systemData) {
    // Vérifier que les valeurs sont valides
    if (systemData.coutEnergie < 0) systemData.coutEnergie = 0;
    if (systemData.niveauEspritRequis < 1) systemData.niveauEspritRequis = 1;
  }

  /**
   * Prépare les données des talents
   */
  _prepareTalentData(systemData) {
    // Vérifier que les valeurs sont valides
    if (systemData.niveauRequis < 1) systemData.niveauRequis = 1;
  }

  /**
   * Prépare les données de l'équipement
   */
  _prepareEquipementData(systemData) {
    // Calculer le poids total
    systemData.poidsTotal = systemData.poids * systemData.quantite;
  }

  /**
   * Méthode pour lancer un sort
   */
  async lancerSort() {
    if (this.type !== "sort") return;

    const actor = this.actor;
    if (!actor) return;

    // Créer un message dans le chat
    const messageData = {
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: `🔮 ${this.name}`,
      content: `<div class="valserra sort-use">
        <h3>${this.name}</h3>
        <p>${this.system.description}</p>
        <div class="sort-details">
          <p><strong>💧 Coût:</strong> ${this.system.coutEnergie} énergie</p>
          <p><strong>⏱️ Incantation:</strong> ${
            this.system.tempsDIncantation
          }</p>
          <p><strong>📏 Portée:</strong> ${this.system.portee}</p>
          <p><strong>⌛ Durée:</strong> ${this.system.duree}</p>
          ${
            this.system.composantes
              ? `<p><strong>✨ Composantes:</strong> ${this.system.composantes}</p>`
              : ""
          }
        </div>
        ${
          this.system.effet
            ? `<div class="sort-effet"><strong>Effet:</strong> ${this.system.effet}</div>`
            : ""
        }
        ${
          this.system.evolutif && this.system.effetNiveauSuperieur
            ? `<div class="sort-evolutif"><strong>⬆️ Niveaux supérieurs:</strong> ${this.system.effetNiveauSuperieur}</div>`
            : ""
        }
      </div>`,
    };

    ChatMessage.create(messageData);
  }

  /**
   * Méthode pour utiliser un talent
   */
  async utiliserTalent() {
    if (this.type !== "talent") return;

    const actor = this.actor;
    if (!actor) return;

    // Créer un message dans le chat
    const messageData = {
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: `⚔️ ${this.name}`,
      content: `<div class="valserra talent-use">
        <h3>${this.name}</h3>
        <p>${this.system.description}</p>
        <div class="talent-details">
          <p><strong>📚 Classe:</strong> ${this.system.classeSource}</p>
          <p><strong>🔄 Fréquence:</strong> ${this.system.frequence}</p>
          <p><strong>🎯 Type:</strong> ${this.system.type}</p>
        </div>
        ${
          this.system.effet
            ? `<div class="talent-effet"><strong>Effet:</strong> ${this.system.effet}</div>`
            : ""
        }
      </div>`,
    };

    ChatMessage.create(messageData);
  }
}
