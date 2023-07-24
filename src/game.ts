// import { Unit } from "./classes/unit.js";

import { GameState, Main } from ".";
import { Background } from "./classes/background";
import { Enemy } from "./classes/enemy";
import { MainMenu } from "./classes/main-menu";
import { Player } from "./classes/player";
import { UI } from "./classes/ui";

// Unit;

export class Game {
  gameOver = false;
  battleBackground: Background;
  mainMenu: MainMenu;
  player: Player;
  enemy: Enemy;
  main: Main;
  isPlayerTurn = true;

  index: any;
  ui: UI;
  constructor(main: Main) {
    this.main = main;
    this.battleBackground = new Background(this.main, "background1", 200);
    this.mainMenu = new MainMenu(this);
    this.player = new Player(this);
    this.enemy = new Enemy(this);
    this.ui = new UI(this);
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    let itemsToRender: (Background | Player | Enemy | UI)[] = [
      this.battleBackground,
      this.ui,
    ];

    // if (this.main.gameState !== GameState.MAINMENU) {
    itemsToRender = [...itemsToRender, this.player, this.enemy];
    // }

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
    this.enemy.renderCards();
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
