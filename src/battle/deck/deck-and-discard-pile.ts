import { GameObject } from "../../classes/game-object";
import { getYBottomPage } from "../../utils/utils";
import { Deck } from "./deck";

export class DeckAndDiscardPile extends GameObject {
  deck: Deck;
  deckImage = new Image();

  constructor(deck: Deck) {
    super(deck.unit.game, 0, 0, 0.1, 0.2);
    this.deck = deck;
    this.deckImage.src = "assets/cardbackgrounds/po_clswizard_h.png";
    this.x = 0.8 * deck.unit.game.main.width;
    this.y = this.deck.unit.game.main.height - this.height;
  }

  mainDraw(ctx: CanvasRenderingContext2D) {
    ctx.font = `24px Roboto`;

    this.drawDeck(ctx);
    this.drawDiscard(ctx);
  }

  drawDeck(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.deckImage,
      0,
      0,
      256,
      512 - 112, // clip the nwn asset bottom color thing off.  FUll thing is 256*512, but picture part is 256*400

      this.x,
      this.y,
      this.width,
      this.height
    );

    ctx.save();
    ctx.textAlign = "center";

    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 3;
    ctx.shadowColor = "black";
    ctx.fillStyle = "white";
    ctx.fillText(
      this.deck.cardsInDeck.length.toString(),
      this.x + 0.5 * this.width,
      this.y + 0.5 * this.height
    );
    ctx.restore();
  }

  drawDiscard(ctx: CanvasRenderingContext2D) {
    const discardX = this.x + 0.1 * this.deck.unit.game.main.width;
    ctx.fillStyle = "#838383";
    ctx.fillRect(discardX, this.y, this.width, this.height);

    ctx.save();
    ctx.globalAlpha = 0.7;
    const lastCardInDiscard =
      this.deck.cardsInDiscard[this.deck.cardsInDiscard.length - 1];

    if (lastCardInDiscard) {
      lastCardInDiscard.x = this.x + 0.1 * this.deck.unit.game.main.width;
      lastCardInDiscard.y =
        this.deck.unit.game.main.height - lastCardInDiscard.height;
      lastCardInDiscard.draw(ctx);
    }

    ctx.restore();

    ctx.save();
    ctx.fillStyle = "black";

    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 3;
    ctx.shadowColor = "black";
    ctx.fillStyle = "white";
    ctx.fillText(
      this.deck.cardsInDiscard.length.toString(),
      discardX + 0.5 * this.width,
      this.y + 0.5 * this.height
    );

    ctx.restore();
  }
}
