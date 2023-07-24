// import { Unit } from "./classes/unit.js";

import { Background } from "./classes/background";
import { Enemy } from "./classes/enemy";
import { MainMenu } from "./classes/main-menu";
import { Player } from "./classes/player";

// Unit;

export class Game {
  width: number = 0;
  height = 0;
  gameOver = false;
  pause = true;
  background: Background;
  mainMenu: MainMenu;
  player: Player;
  enemy: Enemy;

  isPlayerTurn = true;

  index: any;

  constructor(index: any, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.background = new Background(this);
    this.mainMenu = new MainMenu(this);
    this.player = new Player(this);
    this.enemy = new Enemy(this);
    this.index = index;
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    let itemsToRender: (Background | Player | Enemy)[] = [this.background];

    if (!this.pause) {
      itemsToRender = [...itemsToRender, this.player, this.enemy];
    }

    itemsToRender.forEach((item: any) => {
      item.draw(ctx);
    });
  }

  init() {
    this.mainMenu.init();
    // this.renderGame();
  }

  newGame() {
    this.mainMenu = new MainMenu(this);
    this.player = new Player(this);
    this.enemy = new Enemy(this);
    this.pause = false;
    this.player.renderCards();
  }

  //   renderGame() {
  //     this.renderUnits();

  //     this.updateMovesUI();
  //   }

  //   renderUnits() {
  //     document.querySelector("#player-container").innerHTML = `
  //             <app-unit id="player" team="player"> </app-unit>
  //             `;
  //     document.querySelector("#enemy-container").innerHTML = `
  //         <app-unit id="enemy" team="enemy"> </app-unit>
  //         `;
  //   }

  //   updateMovesUI() {
  //     const data = $store.getData();
  //     const isPlayer = $store.getData().isPlayersTurn;

  //     const movesUI = document.querySelector("#game-moves");
  //     movesUI.innerHTML = null;

  //     const moves = $store.getData().playerData.moves;

  //     if (isPlayer) {
  //       for (let i = 0; i < moves.length; i++) {
  //         let newBtn = document.createElement("button");
  //         // newBtn.classList.add("card-hover");
  //         newBtn.innerText = moves[i].name;
  //         if (i === 0) {
  //           newBtn.focus();
  //         }
  //         newBtn.addEventListener("click", (e) => {
  //           const player = $store.getPlayer();
  //           const enemy = $store.getEnemy();

  //           const delay = 2000;

  //           $store.getPlayerUI().animateUp();
  //           $store.getEnemyUI().blinkAnimation(delay);

  //           setTimeout(() => {
  //             moves[i].resolve($store.getPlayer(), $store.getEnemy());

  //             $store.nextTurn();
  //             this.renderGame();
  //           }, delay);
  //         });

  //         movesUI.appendChild(newBtn);

  //         movesUI.querySelector("button:first-child").focus();
  //       }
  //     } else {
  //       const randomEnemyMove = data.enemyData.moves[0];

  //       const player = $store.getPlayer();
  //       const enemy = $store.getEnemy();

  //       const delay = 1000;

  //       $store.getEnemyUI().animateDown();
  //       $store.getPlayerUI().blinkAnimation(delay);

  //       setTimeout(() => {
  //         randomEnemyMove.resolve($store.getEnemy(), $store.getPlayer());

  //         $store.nextTurn();
  //         this.renderGame();
  //       }, delay);
  //     }
  //   }
}
