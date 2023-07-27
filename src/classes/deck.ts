import { $cardDictionary, CardConfig } from "../dictionaries/card-dictionary";
import { Card } from "./card";
import { Unit } from "./unit";

export class Deck {
    unit: Unit;
    allCards: Card[] = [];
    handCards: Card[] = [];
    handCardX = 0;
    handCardY = 0;

    constructor(unit: Unit) {
        this.unit = unit;

        $cardDictionary.forEach((cardConfig: CardConfig) => {
            this.allCards.push(new Card(this.unit, cardConfig))
        })

        this.handCards = this.allCards.slice(0, 3);
    }

    update(deltaTime: number) {
        this.handCards.forEach((card: Card, index: number) => {
            card.x = index * card.width;
            card.y = this.unit.game.main.height - card.height;
        })
    }


    draw(ctx: CanvasRenderingContext2D) {

        if (this.unit.isPlayer) {
            this.handCards.forEach(card => card.draw(ctx));
        } else {
            // this.handCards.forEach(card => card.draw(ctx));
        }
    }
}