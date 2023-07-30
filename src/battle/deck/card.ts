import {
  $cardDictionary,
  CardConfig,
} from "../../dictionaries/card-dictionary";
import { roundedImage } from "../../utils/utils";
import { Enemy } from "../../units/enemies/enemy";
import { Player } from "../../units/player";
import { v4 as uuidv4 } from "uuid";
import { Unit } from "../../units/unit";

export enum CardType {
  OFFENSIVE = "assets/cards/background_red.png",
  DEFENSIVE = "assets/cards/background_blue.png",
  INCOME = "assets/cards/background_green.png",
  MISC = "assets/cards/background_purple.png",
}

const wrapText = function (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): any {
  // First, start by splitting all of our text into words, but splitting it into an array split by spaces
  let words = text.split(" ");
  let line = ""; // This will store the text of the current line
  let testLine = ""; // This will store the text when we add a word, to test if it's too long
  let lineArray = []; // This is an array of lines, which the function will return

  // Lets iterate over each word
  for (var n = 0; n < words.length; n++) {
    // Create a test line, and measure it..
    testLine += `${words[n]} `;
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    // If the width of this test line is more than the max width
    if (testWidth > maxWidth && n > 0) {
      // Then the line is finished, push the current line into "lineArray"
      lineArray.push([line, x, y]);
      // Increase the line height, so a new line is started
      y += lineHeight;
      // Update line and test line to use this word as the first word on the next line
      line = `${words[n]} `;
      testLine = `${words[n]} `;
    } else {
      // If the test line is still less than the max width, then add the word to the current line
      line += `${words[n]} `;
    }
    // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
    if (n === words.length - 1) {
      lineArray.push([line, x, y]);
    }
  }
  // Return the line array
  return lineArray;
};

export class Card {
  unit: Unit;
  cost = 0;
  title = "title";
  body = "body";
  effect: (caster: Unit, target: Unit) => void = (caster: Unit, target: Unit) =>
    console.log("no effect");
  //   x: number = 2000; // not visible
  //   y: number = 2000; // not visible
  background = new Image();
  image = new Image();
  costCircle = new Image();
  id: string = uuidv4();
  markedForDeletion = false;

  xPercentage = 0;
  yPercentage = 0;

  widthPercentage = 0.1;
  heightPercentage = 0.2;

  get x() {
    // return 0.75 * this.game.main.width;
    return this.xPercentage * this.unit.game.main.width;
  }

  get y() {
    // return 0.4 * this.game.main.height;
    return this.yPercentage * this.unit.game.main.height;
  }

  get width() {
    return this.widthPercentage * this.unit.game.main.width;
  }

  get height() {
    return this.heightPercentage * this.unit.game.main.width;
  }

  constructor(
    unit: Player | Enemy | Unit,
    config: CardConfig,
    xPercentage = 0.75,
    yPercentage = 0.4
  ) {
    this.unit = unit;
    this.cost = config.cost;
    this.title = config.title;
    this.body = config.body;
    this.effect = config.effect;

    this.image.src = config.imgSrc;

    this.background.src = config.background || CardType.OFFENSIVE;
    this.costCircle.src = "assets/cards/card-cost-circle.png";
    this.xPercentage = xPercentage;
    this.yPercentage = yPercentage;
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    // ctx.globalAlpha = 0.3;

    this.drawCardBackground(ctx);
    this.drawCost(ctx);
    this.drawCardTitle(ctx);
    this.drawCardImage(ctx);
    this.drawCardType(ctx);
    this.drawCardBody(ctx);
    // ctx.globalAlpha = 1;
  }

  drawCost(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      this.x + 0.1 * this.width,
      this.y + 0.1 * this.width,
      8,
      0,
      2 * Math.PI,
      false
    );
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "grey";
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = `12px Roboto`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
      this.cost.toString(),
      this.x + 0.1 * this.width,
      this.y + 0.1 * this.width
    );
  }

  drawCardBackground(ctx: CanvasRenderingContext2D) {
    ctx.save();
    roundedImage(ctx, this.x, this.y, this.width, this.height, 4);
    ctx.clip();

    ctx.drawImage(this.background, this.x, this.y, this.width, this.height);

    ctx.restore();
  }

  drawCardTitle(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "black";
    ctx.font = `12px Roboto`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    ctx.fillText(
      this.title,
      this.x + 0.1 * this.width + 12,
      this.y + 0.1 * this.width
    );
  }

  drawCardImage(ctx: CanvasRenderingContext2D) {
    ctx.save();
    roundedImage(
      ctx,
      this.x + 0.1 * this.width,
      this.y + 0.1 * this.height,
      0.8 * this.width,
      0.8 * this.width,
      4
    );
    ctx.clip();

    ctx.drawImage(
      this.image,
      this.x + 0.1 * this.width,
      this.y + 0.1 * this.height,
      0.8 * this.width,
      0.8 * this.width
    );
    ctx.restore();
  }

  drawCardType(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "black";
    ctx.font = `12px Roboto`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    ctx.fillText(
      "Spell",
      this.x + 0.1 * this.width + 4,
      this.y + 0.55 * this.height
    );
  }

  drawCardBody(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";
    ctx.fillRect(
      this.x + 0.1 * this.width,
      this.y + 0.6 * this.height,
      0.8 * this.width,
      0.6 * this.width
    );

    ctx.font = `12px Roboto`;
    ctx.textAlign = "start";
    ctx.textBaseline = "top";
    ctx.fillStyle = "black";
    const padding = 4;
    const textX = this.x + 0.1 * this.width + padding;
    const textY = this.y + 0.6 * this.height + padding;

    let wrappedText = wrapText(
      ctx,
      this.body,
      textX,
      textY,
      0.8 * this.width,
      16
    );
    wrappedText.forEach(function (item: any) {
      ctx.fillText(item[0], item[1], item[2]);
    });
  }

  playCard(caster: Player | Enemy, target: Player | Enemy) {
    if (caster.currentMp >= this.cost) {
      caster.currentMp -= this.cost;

      setTimeout(() => {
        this.effect(caster, target);
        caster.deck.discardCard(this);
      });
    } else {
      console.log("you don't have enough mana");
    }
  }
}