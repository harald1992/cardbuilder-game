import { BackgroundUI } from "../ui-elements/background-ui";
import { Game } from "../game";
import { $store } from "../store";
import { Enemy } from "../units/enemy";
import { Player } from "../units/player";
import { Unit } from "../units/unit";
import { rectRectCollision, wait } from "../utils/utils";
import { Card } from "./deck/card";
import { DragAndDrop } from "./drag-and-drop";
import { Background } from "../classes/background";
import { EndTurnButton } from "../ui-elements/end-turn-button";

export class BattleManager {
  game: Game;
  player: Player;
  enemies: Unit[] = [];
  battleBackground: Background;

  backgroundUI: BackgroundUI;
  endTurnButton: EndTurnButton;
  selectedCard: Card | undefined;

  dragAndDrop: DragAndDrop = new DragAndDrop(this);

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
    this.battleBackground = new Background(this.game);

    this.player = player;
    this.enemies = enemies;
  }

  init() {
    console.log("battlemanager init happening");

    this.battleInit();

    this.gameLoop();
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
      await wait(500);
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

        // resolve(); // resolve happens in playPossibleCards function
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

  async playPossibleCards(caster: Unit, target: Unit, resolve: Function) {
    await wait(500);

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
      console.log("player currentHP <= 0");

      return this.gameOver();
    }
    const enemiesDied = [...this.enemies].filter(
      (enemy: Unit) => enemy.currentHp <= 0
    );
    enemiesDied.forEach((enemy: Unit) => {
      this.player.game.playerGold += enemy.maxHp;
    });

    this.enemies = [...this.enemies].filter(
      (enemy: Unit) => enemy.currentHp > 0
    );
    if (this.enemies.length === 0) {
      console.log("enemies length = 0");

      this.game.goBackToOverworld();
    }
  }

  gameOver() {
    console.log("game over");
    this.game.gameOver();
  }
}
