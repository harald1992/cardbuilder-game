import { Background } from "./background";
import { Card } from "./card";
import { Player } from "./player";

export class Sprite {
  item: Player | Card | Background;

  constructor(item: Player | Card) {
    this.item = item;
  }
}
