import { BackgroundUI } from "../classes/background-ui";
import { Game } from "../game";
import { $store } from "../store";
import { BattleUI } from "../ui-elements/battle-ui";
import { Ghost } from "../units/enemies/ghost";
import { Player } from "../units/player";
import { Unit } from "../units/unit";
import { rectRectCollision } from "../utils/utils";
// import { BattleEvent } from "./battle-event";
import { Card } from "./deck/card";
import { IngameMenu } from "./ingame-menu";
// import { TurnCycle } from "./turn-cycle";

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function getYBottomPage(object: Unit | Card) {
  const height = object.height;
  const gameHeight = $store.getGame().main.height;
  const difference = gameHeight - height;

  const yPercentage = difference / gameHeight;
  return yPercentage;
}

function getXMidpage(object: Unit | Card) {
  // todo: is this really mid? Probably not
  const width = object.width;
  const gameWidth = $store.getGame().main.width;
  const difference = gameWidth - width;

  const xPercentage = difference / gameWidth;
  return xPercentage / 2;
}

function getXRightpage(object: Unit | Card) {
  const width = object.width;
  const gameWidth = $store.getGame().main.width;
  const difference = gameWidth - width;

  const xPercentage = difference / gameWidth;
  return xPercentage;
}

export class BattleManager {
  game: Game;
  player: Player;
  enemies: Unit[] = [];
  ingameMenu: IngameMenu = new IngameMenu(this);

  backgroundUI: BackgroundUI;
  battleUI: BattleUI;

  get clickableItems() {
    let clickableItems = [
      ...this.enemies,
      this.player,
      ...this.player.deck.cardsInHand,
      this.battleUI.endTurnButton,
    ];

    return clickableItems;
  }

  constructor(game: Game) {
    this.game = game;
    this.backgroundUI = new BackgroundUI(this.game);
    this.battleUI = new BattleUI(this.game);

    this.player = new Player(this.game, 0, 0);
  }

  init() {
    this.ingameMenu.init();

    this.gameInit();

    this.gameLoop();
  }

  update(deltaTime: number) {
    this.clickableItems.forEach((object) => object.update(deltaTime));
  }

  draw(ctx: CanvasRenderingContext2D) {
    [this.backgroundUI, ...this.clickableItems].forEach((object) =>
      object.draw(ctx)
    );
  }

  async gameLoop() {
    await wait(1000);
    this.enemyUpkeep();

    await this.cpuTurn();
    this.enemyDiscardPhase();

    this.playerUpkeep();
    await this.playerTurn();
    this.playerDiscardPhase();

    this.gameLoop();
  }

  enemyUpkeep() {
    this.enemies.forEach((enemy: Unit) => {
      enemy.deck.drawCards(3);
      enemy.currentMp = enemy.maxMp;
    });
  }

  playerUpkeep() {
    const player = this.player;
    player.deck.drawCards(3);
    player.currentMp = player.maxMp;
  }

  enemyDiscardPhase() {
    this.enemies.forEach((enemy: Unit) => enemy.deck.discardHand());
  }

  playerDiscardPhase() {
    this.player.deck.discardHand();
  }

  gameInit() {
    this.player = new Player(this.game, 0, 0);
    this.player.yPercentage = getYBottomPage(this.player);

    const enemy1 = new Ghost(this.game, 0, 0);

    const enemy2 = new Ghost(this.game, 0.0, 0);
    enemy2.xPercentage = getXRightpage(enemy2);

    const enemy3 = new Ghost(this.game, 0.0, 0);
    enemy3.xPercentage = getXMidpage(enemy3);

    this.enemies = [enemy1, enemy2, enemy3];
    [...this.enemies, this.player].forEach((unit) => unit.init());
  }

  async cpuTurn(): Promise<void> {
    return new Promise((resolve: Function) => {
      this.performAllEnemyTurns(this.enemies, resolve);
    });
  }

  async performAllEnemyTurns(enemies: Unit[], resolveCpuTurn: Function) {
    for await (const enemy of enemies) {
      await this.performEnemyUnitTurn(enemy);
    }

    resolveCpuTurn();
  }

  performEnemyUnitTurn(enemy: Unit): Promise<void> {
    return new Promise((resolve: Function) => {
      setTimeout(() => {
        console.log("enemy attacks", enemy);

        resolve();
      }, 1000); //the attack will happen after 1 second,
    });
  }

  playerTurn(): Promise<void> {
    const game = $store.getGame();
    const canvas = $store.getGame().main.canvas;
    const enemy = this.enemies[0];

    return new Promise<void>((resolve) => {
      /* The listener */
      function mouseClickListener(event: Event) {
        game.battleManager.player.deck.cardsInHand.forEach((card: Card) => {
          if (rectRectCollision(card, game.mouse)) {
            card.playCard(game.battleManager.player, enemy);
          }
        });

        if (
          rectRectCollision(
            game.battleManager.battleUI.endTurnButton,
            game.mouse
          )
        ) {
          console.log("End Player Turn");
          canvas.removeEventListener("click", mouseClickListener);
          resolve();
        }
      }

      canvas.addEventListener("click", mouseClickListener);
    });
  }
}
