import { Game } from "../game";
import { $store } from "../store";
import { Ghost } from "../units/enemies/ghost";
import { Unit } from "../units/unit";
import { rectRectCollision } from "../utils/utils";
// import { BattleEvent } from "./battle-event";
import { Card } from "./deck/card";
// import { TurnCycle } from "./turn-cycle";

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export class BattleManager {
  game: Game;

  // turnCycle: TurnCycle | undefined = undefined;
  enemies: Unit[] = [];

  constructor(game: Game) {
    this.game = game;
  }

  init() {
    this.gameInit();

    this.gameLoop();
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    this.enemies.forEach((enemy) => enemy.draw(ctx));
  }

  async gameLoop() {
    await this.cpuTurn();
    // if playerHP is x -> end game
    await this.playerTurn();
    // if enemy Hp =x   -> end game

    this.gameLoop();
  }

  enemyUpkeep() {
    this.enemies.forEach((enemy: Unit) => {
      enemy.deck.drawCards(3);
      enemy.currentMp = enemy.maxMp;
    });
  }

  playerUpkeep() {
    const player = this.game.player;
    player.deck.drawCards(3);
    player.currentMp = player.maxMp;
  }

  gameInit() {
    const enemy1 = new Ghost(this.game, 0.75, 0.2);

    const enemy2 = new Ghost(this.game, 0.75, 0.3);
    this.enemies = [enemy1, enemy2];
    this.enemies.forEach((enemy) => enemy.init());
    //...set CPU and player HP each to 40
  }

  async cpuTurn() {
    this.enemyUpkeep();

    return new Promise((resolve: Function) => {
      this.performAllEnemyTurns(this.enemies);
      resolve();
    }); //which is also when the promise resolves
  }

  async performAllEnemyTurns(enemies: Unit[]) {
    for await (const enemy of enemies) {
      await this.performEnemyUnitTurn(enemy);
    }
  }

  performEnemyUnitTurn(enemy: Unit): Promise<void> {
    return new Promise((resolve: Function) => {
      setTimeout(function () {
        console.log("enemy attacks", enemy);

        resolve();
      }, 1000); //the attack will happen after 1 second,
    });
  }

  playerTurn(): Promise<void> {
    this.playerUpkeep();
    const game = $store.getGame();
    const canvas = $store.getGame().main.canvas;
    const enemy = this.enemies[0];

    return new Promise<void>((resolve) => {
      /* The listener */
      function mouseClickListener(event: Event) {
        game.player.deck.cardsInHand.forEach((card: Card) => {
          if (rectRectCollision(card, game.mouse)) {
            card.playCard(game.player, enemy);
          }
        });

        if (rectRectCollision(game.ui.endTurnButton, game.mouse)) {
          console.log("End Player Turn");
          canvas.removeEventListener("click", mouseClickListener);
          resolve();
        }
      }

      canvas.addEventListener("click", mouseClickListener);
    });
  }
}
