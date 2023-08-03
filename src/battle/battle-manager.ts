import { BackgroundUI } from "../ui-elements/background-ui";
import { EnemyName } from "../dictionaries/enemy-dictionary";
import { Game } from "../game";
import { $store } from "../store";
import { BattleUI } from "../ui-elements/battle-ui";
import { Enemy } from "../units/enemy";
import { Player } from "../units/player";
import { Unit } from "../units/unit";
import {
  getXMidpage,
  getXRightpage,
  getYBottomPage,
  rectRectCollision,
} from "../utils/utils";
import { Card } from "./deck/card";
import { DragAndDrop } from "./drag-and-drop";
import { IngameMenu } from "./battle-ui/ingame-menu";
import { Background } from "../classes/background";

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export class BattleManager {
  game: Game;
  player: Player;
  enemies: Unit[] = [];
  // ingameMenu: IngameMenu = new IngameMenu(this);
  battleBackground: Background;

  backgroundUI: BackgroundUI;
  battleUI: BattleUI;
  selectedCard: Card | undefined;

  dragAndDrop: DragAndDrop = new DragAndDrop();
  isGameOver = false;

  get clickableItems() {
    let clickableItems = [
      ...this.enemies,
      this.player,
      ...this.player.deck.cardsInHand,
      this.battleUI.endTurnButton,
    ];

    return clickableItems;
  }

  get drawableItems() {
    return [this.battleBackground, this.backgroundUI, ...this.clickableItems];
  }

  constructor(game: Game) {
    this.game = game;
    this.backgroundUI = new BackgroundUI(this.game);
    this.battleUI = new BattleUI(this.game);
    this.player = new Player(this.game, 0, 0);
    this.battleBackground = new Background(this.game);
  }

  init() {
    // this.ingameMenu.init();

    this.battleInit();

    this.gameLoop();
  }

  update(deltaTime: number) {
    // this.clickableItems.forEach((object) => object.update(deltaTime));
  }

  draw(ctx: CanvasRenderingContext2D) {
    // [this.backgroundUI, ...this.clickableItems].forEach((object) =>
    //   object.draw(ctx)
    // );
  }

  async gameLoop() {
    if (this.isGameOver) {
      return;
    }
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

  battleInit() {
    this.player = new Player(this.game, 0, 0);
    this.player.yPercentage = getYBottomPage(this.player);

    const enemy1 = new Enemy(this.game, EnemyName.BAT, 0, 0);

    const enemy2 = new Enemy(this.game, EnemyName.SPECTRE, 0, 0);
    enemy2.xPercentage = getXRightpage(enemy2);

    const enemy3 = new Enemy(this.game, EnemyName.MINOTAUR, 0, 0);
    enemy3.xPercentage = getXMidpage(enemy3);

    this.enemies = [enemy1, enemy2, enemy3];
    [...this.enemies].forEach(
      (unit) => (unit.y += 0.05 * this.game.main.width)
      // clamp for header
    );

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
      } else if (enemy.currentHp <= 0) {
        return resolve();
      }

      setTimeout(() => {
        this.playPossibleCards(enemy, this.player, resolve);

        // resolve();
      }, 1000); //the attack will happen after 1 second,
    });
  }

  playerTurn(): Promise<void> {
    const battleManager = $store.battleManager;
    const mouse = $store.mouse;
    const canvas = $store.game.main.canvas;
    this.dragAndDrop.dragAndDropCards();

    return new Promise<void>((resolve) => {
      if (this.player.isStunned) {
        this.player.isStunned = false;
        resolve();
      }

      function turnEndListener(event: Event) {
        if (rectRectCollision(battleManager.battleUI.endTurnButton, mouse)) {
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
      if (caster.currentHp <= 0) {
        resolve(); // end turn if character kills himself
      }
      this.checkIfUnitsDied();
    }
    this.playPossibleCards(caster, target, resolve);
  }

  checkIfUnitsDied() {
    if (this.player.currentHp <= 0) {
      return this.gameOver();
    }
    const enemiesDied = this.enemies.filter(
      (enemy: Unit) => enemy.currentHp <= 0
    );
    enemiesDied.forEach((enemy: Unit) => {
      this.player.game.playerGold += enemy.maxHp;
    });

    this.enemies = this.enemies.filter((enemy: Unit) => enemy.currentHp > 0);
    if (this.enemies.length === 0) {
      console.log("You win");
      this.init();
    }
  }

  gameOver() {
    console.log("game over");
    this.isGameOver = true;
    // this.init();
  }
}
