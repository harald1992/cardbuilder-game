import { Deck } from "../battle/deck/deck";
import { Game } from "../game";
import { HealthBar } from "./health-bar";

export class Unit {
  xPercentage = 0;
  yPercentage = 0;

  #hp = 1;
  #mp = 1;
  maxHp: number = 1;
  maxMp = 1;

  image = new Image();
  stunnedImage = new Image();

  game: Game;
  healthBar: HealthBar;

  deck: Deck = new Deck(this);

  isStunned = false;

  didTurn = false;
  team: "player" | "enemy" = "enemy";

  // todo: remove and go to currentTeam
  get isPlayer() {
    return this.team === "player";
  }

  // set isPlayer(value: any) {
  //   this.currentTeam
  // }

  get x() {
    return this.xPercentage * this.game.main.width;
  }

  get y() {
    return this.yPercentage * this.game.main.height;
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

  constructor(game: Game, xPercentage = 0, yPercentage = 0) {
    this.game = game;

    this.currentHp = this.maxHp;
    this.currentMp = this.maxMp;
    this.healthBar = new HealthBar(this);
    this.image.src = "assets/units/hero.jpg";
    this.stunnedImage.src = "assets/icons/lightning-spark.svg";
    this.xPercentage = xPercentage;
    this.yPercentage = yPercentage;
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
  }
}
