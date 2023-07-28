import { $cardDictionary } from "../dictionaries/card-dictionary";
import { Game } from "../game";
import { Card } from "./card";
import { Deck } from "./deck";
import { HealthBar } from "./health-bar";

export class Unit {
  #hp = 1;
  #mp = 1;
  maxHp: number = 1;
  maxMp = 1;

  image = new Image();
  stunnedImage = new Image();

  game: Game;
  healthBar: HealthBar;

  deck: Deck = new Deck(this);

  isPlayer = false;
  isStunned = false;

  get x() {
    return 0;
  }

  get y() {
    return 0;
  }

  get width() {
    return 0.2 * this.game.main.width;
  }

  get height() {
    return 0.2 * this.game.main.width;
  }

  get currentHp() {
    return this.#hp;
  }

  set currentHp(value: number) {
    if (value > this.maxHp) {
      value = this.maxHp;
    }
    this.#hp = value;
  }

  get currentMp() {
    return this.#mp;
  }

  set currentMp(value: number) {
    if (value > this.maxMp) {
      value = this.maxMp;
    }

    this.#mp = value;
  }

  constructor(game: Game) {
    this.game = game;

    this.currentHp = this.maxHp;
    this.currentMp = this.maxMp;
    this.healthBar = new HealthBar(this);
    this.image.src = "assets/units/hero.jpg";
    this.stunnedImage.src = "assets/icons/lightning-spark.svg";
  }

  init() {
    this.currentHp = this.maxHp;
    this.currentMp = this.maxMp;
    this.deck.init();
  }

  update(deltaTime: number) {
    this.deck.update(deltaTime);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.healthBar.draw(ctx);
    this.deck.draw(ctx);

    if (this.isStunned) {
      let stunX = this.x;
      let stunY = this.y;
      let stunWidth = 25;
      let stunHeight = 25;

      ctx.fillStyle = "white";
      ctx.fillRect(stunX, stunY, stunWidth, stunHeight);
      ctx.drawImage(this.stunnedImage, stunX, stunY, stunWidth, stunHeight);
    }

    if (this.game.main.debugMode) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}
