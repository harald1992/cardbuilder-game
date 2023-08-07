import { BackgroundUI } from "../ui-elements/background-ui";
import { EnemyName } from "../dictionaries/enemy-dictionary";
import { Game } from "../game";
import { $store } from "../store";
// import { BattleUI } from "../ui-elements/battle-ui";
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
import { GameObject } from "../classes/game-object";
import { GameState } from "../models/models";
import { EndTurnButton } from "../ui-elements/end-turn-button";

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
  // battleUI: BattleUI;
  endTurnButton: EndTurnButton;
  selectedCard: Card | undefined;

  dragAndDrop: DragAndDrop = new DragAndDrop(this);
  // isGameOver = false;

  get clickableItems() {
    let clickableItems = [
      ...this.enemies,
      this.player,
      ...this.player.deck.cardsInHand,
      this.player.deck.deckAndDiscardPile,
      this.endTurnButton,
    ];

    return clickableItems;
  }

  get drawableItems() {
    return [this.battleBackground, this.backgroundUI, ...this.clickableItems];
  }

  constructor(game: Game, player: Player, enemies: Enemy[]) {
    this.game = game;
    this.backgroundUI = new BackgroundUI(this.game);
    this.endTurnButton = new EndTurnButton(this);
    // this.battleUI = new BattleUI(this.game);
    this.battleBackground = new Background(this.game);

    this.player = player;
    this.enemies = enemies;
  }

  init() {
    // this.ingameMenu.init();
    console.log("battlemanager init happening");

    this.battleInit();

    this.gameLoop();
  }

  update(deltaTime: number) {
    this.enemies = this.enemies.filter(
      (enemy: GameObject) => !enemy.markedForDeletion
    );
    // this.clickableItems.forEach((object) => object.update(deltaTime));
  }

  draw(ctx: CanvasRenderingContext2D) {
    // [this.backgroundUI, ...this.clickableItems].forEach((object) =>
    //   object.draw(ctx)
    // );
  }

  async gameLoop() {
    console.log("gameloop starting");

    // if (this.isGameOver) {
    //   return;
    // }
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
    this.player.x = 0;
    this.player.y = this.game.main.height - this.player.height;

    for (let i = 0; i < this.enemies.length; i++) {
      // spacearound
      const enemy = this.enemies[i];
      let totalWidth = this.game.main.width - enemy.width;
      const percentage = (i + 0.5) / this.enemies.length;

      enemy.x = percentage * totalWidth;

      enemy.y = 0.05 * this.game.main.width; // clamp for header
    }

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
    const canvas = $store.canvas;
    this.dragAndDrop.dragAndDropCards();

    return new Promise<void>((resolve) => {
      if (this.player.isStunned) {
        this.player.isStunned = false;
        resolve();
      }

      const turnEndListener = (event: Event) => {
        if (rectRectCollision(this.endTurnButton, this.game.mouse)) {
          canvas.removeEventListener("click", turnEndListener);

          canvas.removeEventListener("mousedown", this.dragAndDrop.onMouseDown);
          resolve();
        }
      };

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

  // enum GameResult {
  //   CONTINUE, PLAYERLOST, PLAYERWIN
  // }

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
      this.game.goBackToOverworld();
    }
  }

  gameOver() {
    console.log("game over");
    // this.isGameOver = true;
    this.game.gameOver();
  }
}
