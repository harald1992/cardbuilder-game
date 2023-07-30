import { BackgroundUI } from "../classes/background-ui";
import { Game } from "../game";
import { $store } from "../store";
import { BattleUI } from "../ui-elements/battle-ui";
import { Enemy } from "../units/enemies/enemy";
import { Ghost } from "../units/enemies/ghost";
import { Player } from "../units/player";
import { Unit } from "../units/unit";
import { rectRectCollision } from "../utils/utils";
// import { BattleEvent } from "./battle-event";
import { Card } from "./deck/card";
import { DragAndDrop } from "./drag-and-drop";
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
  const gameHeight = $store.game.main.height;
  const difference = gameHeight - height;

  const yPercentage = difference / gameHeight;
  return yPercentage;
}

function getXMidpage(object: Unit | Card) {
  // todo: is this really mid? Probably not
  const width = object.width;
  const gameWidth = $store.game.main.width;
  const difference = gameWidth - width;

  const xPercentage = difference / gameWidth;
  return xPercentage / 2;
}

function getXRightpage(object: Unit | Card) {
  const width = object.width;
  const gameWidth = $store.game.main.width;
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
  selectedCard: Card | undefined;

  dragAndDrop: DragAndDrop = new DragAndDrop();

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
    // await wait(500);
    this.playerUpkeep();
    await this.playerTurn();
    this.playerDiscardPhase();

    this.enemyUpkeep();
    await this.cpuTurn();
    this.enemyDiscardPhase();

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
      if (enemy.isStunned) {
        console.log("enemy is stunned");

        enemy.isStunned = false;
        return resolve();
      }

      setTimeout(() => {
        this.playPossibleCards(enemy, this.player, resolve);

        // resolve();
      }, 1000); //the attack will happen after 1 second,
    });
  }

  playerTurn(): Promise<void> {
    const game = $store.game;
    const canvas = $store.game.main.canvas;
    const enemy = this.enemies[0];

    this.dragAndDrop.dragAndDropCards();

    return new Promise<void>((resolve) => {
      if (this.player.isStunned) {
        this.player.isStunned = false;
        resolve();
      }

      function turnEndListener(event: Event) {
        if (
          rectRectCollision(
            game.battleManager.battleUI.endTurnButton,
            game.mouse
          )
        ) {
          canvas.removeEventListener("click", turnEndListener);

          canvas.removeEventListener(
            "mousedown",
            $store.dragAndDrop.onMouseDown
          );
          resolve();
        }
      }

      canvas.addEventListener("click", turnEndListener);
    });
  }

  playPossibleCards(caster: Unit, target: Unit, resolve: Function) {
    const possibleCardsToPlay = [...caster.deck.cardsInHand].filter(
      (card: Card) => card.cost <= caster.currentMp && !card.isUnPlayable
    );
    if (possibleCardsToPlay.length === 0) {
      return resolve();
    }
    const randomIndex = Math.floor(Math.random() * possibleCardsToPlay.length);
    const randomCard = possibleCardsToPlay[randomIndex];
    if (randomCard) {
      randomCard.playCard(caster, target);
    }
    this.playPossibleCards(caster, target, resolve);
  }
}
