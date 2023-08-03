import { Deck } from "../battle/deck/deck";
import { GameObject } from "../classes/game-object";
import { Game } from "../game";
import { FloatingText } from "../ui-elements/floating-text";
import { HealthBar } from "./health-bar";

export class Unit extends GameObject {
  #hp = 1;
  #mp = 1;
  maxHp: number = 1;
  maxMp = 1;
  image = new Image();
  stunnedImage = new Image();
  healthBar: HealthBar;
  deck: Deck = new Deck(this);
  isStunned = false;

  floatingTexts: FloatingText[] = [];
  // didTurn = false;
  team: "player" | "enemy" = "enemy";

  targetMark = false;

  // todo: remove and go to currentTeam
  get isPlayer() {
    return this.team === "player";
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
    super(game, xPercentage, yPercentage, 0.1, 0.2);

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
    this.floatingTexts = this.floatingTexts.filter(
      (text: FloatingText) => !text.markedForDeletion
    );

    this.deck.update(deltaTime);

    this.floatingTexts.forEach((floatingText: FloatingText) =>
      floatingText.update(deltaTime)
    );
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

    if (this.targetMark) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    this.floatingTexts.forEach((floatingText: FloatingText) =>
      floatingText.draw(ctx)
    );

    super.draw(ctx);
  }

  damage(amount: number) {
    const floatingText = new FloatingText(this, "-" + amount);
    this.floatingTexts.push(floatingText);
    this.currentHp -= amount;
  }

  heal(amount: number) {
    const floatingText = new FloatingText(this, "+" + amount);
    this.floatingTexts.push(floatingText);

    this.currentHp += amount;
  }
}
