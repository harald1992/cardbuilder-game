import { Game } from "../game";
import { Player } from "./player";
import { $store } from "./store";

export class Card extends HTMLElement {
  //   player: Player;
  effect: (caster: any, target: any) => void = () => {
    console.log("no effect yet for this card");
  };
  //   shadowRoot!: ShadowRoot | null;

  game: Game;

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

  constructor() {
    super();

    this.game = $store.getGame();

    // this.player = player;
  }

  render() {
    this.innerHTML = `
    <div class="card">
        <div class="card__title">${this.cardTitle}
          <span class="circle">${this.cost}</span></div>
         <img src="${this.imgSrc}" />
         <div class="card__body">${this.cardBody}
        
       </div>
    </div>
  
          `;
  }

  connectedCallback() {
    this.render();

    this.addClickListener();
  }

  addClickListener() {
    this.addEventListener("click", (event: MouseEvent) => {
      const { caster, target } = $store.getCasterAndTarget();

      if (caster.currentMp >= this.cost) {
        caster.currentMp -= this.cost;
        this.effect(caster, target);
        console.log("cast effect");
      } else {
        alert("you don't have enough mana");
      }
    });
  }
}

customElements.get("app-card") || customElements.define("app-card", Card);
