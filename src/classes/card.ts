import { Game } from "../game";
import { Player } from "./player";
import { $store } from "./store";

export class Card extends HTMLElement {
  effect: (caster: any, target: any) => void = () => {
    console.log("no effect yet for this card");
  };

  game: Game;
  alreadyAddedListeners = false;

  get cost() {
    let cost = this.getAttribute("cost");
    return parseInt(cost || "0");
  }

  get cardTitle() {
    return this.getAttribute("cardTitle");
  }

  get cardBody() {
    return this.getAttribute("cardBody");
  }

  get imgSrc() {
    return this.getAttribute("imgSrc");
  }

  get isPlayersCard() {
    let isPlayersCard = this.getAttribute("isPlayersCard");
    if (!isPlayersCard || isPlayersCard === "true") {
      return true;
    } else {
      return false;
    }
  }

  get discardButton() {
    return this.querySelector(".card__title--discard") as HTMLElement;
  }

  constructor() {
    super();

    this.game = $store.getGame();
  }

  render() {
    this.innerHTML = `
    <div class="card">
        <div class="card__title">${this.cardTitle}
          <span class="card__title--cost">${this.cost}</span>
          <button class="card__title--discard">X</button>
        </div>

         <img src="${this.imgSrc}" />
         <div class="card__body">${this.cardBody}
       </div>
    </div>
    `;
  }

  connectedCallback() {
    this.render();

    if (!this.alreadyAddedListeners) {
      // only do this once otherwise every time the card re-renders it triggers another listener
      this.addClickListener();
      this.addDiscardListener();
      this.alreadyAddedListeners = true;
    }
  }

  addClickListener() {
    if (this.isPlayersCard) {
      this.addEventListener("click", (event: MouseEvent) => {
        console.log(event);
        if (event.target === this.discardButton) {
          return;
        }

        const { caster, target } = $store.getCasterAndTarget();

        if (caster.currentMp >= this.cost) {
          caster.currentMp -= this.cost;
          this.effect(caster, target);
          caster.discardCard(this);
        } else {
          alert("you don't have enough mana");
        }
      });
    }
  }

  addDiscardListener() {
    if (this.isPlayersCard) {
      this.discardButton.addEventListener("click", (event: MouseEvent) => {
        const { caster, target } = $store.getCasterAndTarget();

        // console.log(caster.cards.find((card) => card === this));
        // caster.cards = caster.cards.filter((card) => card !== this);
        // caster.renderCards();
        caster.discardCard(this);
      });
    }
  }
}

customElements.get("app-card") || customElements.define("app-card", Card);
