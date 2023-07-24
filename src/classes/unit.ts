import { $cardDictionary } from "../dictionaries/card-dictionary";
import { Game } from "../game";
import { Card } from "./card";
import { HealthBar } from "./health-bar";

export class Unit {
  x = 500;
  y = 200;
  width = 100;
  height = 100;
  #hp = 1;
  #mp = 1;
  maxHp: number = 10;
  maxMp = 10;

  image = new Image();
  game: Game;
  healthBar: HealthBar;

  cards: Card[] = [];

  get currentHp() {
    return this.#hp;
  }

  set currentHp(value: number) {
    if (value > this.currentHp) {
      value = this.maxHp;
    }
    this.#hp = value;
  }

  get currentMp() {
    return this.#mp;
  }

  set currentMp(value: number) {
    if (value > this.currentMp) {
      value = this.maxMp;
    }
    this.#mp = value;
  }

  constructor(
    game: Game,
    x: number,
    y: number,
    imgSrc: string = "assets/units/monster-ghost.png"
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.currentHp = this.maxHp;
    this.currentMp = this.maxMp;
    this.healthBar = new HealthBar(this);
    this.image.src = imgSrc;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.healthBar.draw(ctx);

    if (this.game.main.debugMode) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.x, this.y, 100, 100);
    }
  }

  renderCards() {}

  drawCards(amount = 1) {
    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * $cardDictionary.length);
      const newCard = $cardDictionary[randomIndex]();
      this.cards.push(newCard);
    }

    this.renderCards();

    // let
    // const card = $cardDictionary[0]();
    // this.cards.push(card);
  }

  discardCard(cardToDiscard: Card) {
    this.cards = this.cards.filter((card) => card !== cardToDiscard);
    this.renderCards();
  }
}
