import { Card } from "../battle/deck/card";
import { DeckAndDiscardPile } from "../battle/deck/deck-and-discard-pile";
import { GameObject } from "../classes/game-object";
import { Mouse } from "../mouse";
import { $store } from "../store";
import { Unit } from "../units/unit";

export function getCenterPos(ob: any) {
  const x = ob?.x + ob?.width / 2;
  const y = ob?.y + ob?.height / 2;
  return { x, y };
}

export function getDistanceBetween(object1: any, object2: any) {
  const dx = object2.x - object1.x;
  const dy = object2.y - object1.y;
  const distance = Math.sqrt(Math.pow(dx, 2) + Math.sqrt(Math.pow(dy, 2)));
  return distance;
}

export function circleCircleColliding(circle1: any, circle2: any) {
  // const dx = getCenterPos(enemy).x - getCenterPos(this).x;
  // const dy = getCenterPos(enemy).y - getCenterPos(this).y;
  // const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  // if (distance < enemy.width / 2 + this.width / 2) {
  //     return true; // collision
  // } else {
  //     return false;
  // }
}

// return true if the rectangle and circle are colliding
export function rectCircleColliding(
  circle: any, // 0{x, y, r}
  rect: any // { x, y, w, h}
) {
  var distX = Math.abs(circle.x - rect.x - rect.w / 2);
  var distY = Math.abs(circle.y - rect.y - rect.h / 2);

  if (distX > rect.w / 2 + circle.r) {
    return false;
  }
  if (distY > rect.h / 2 + circle.r) {
    return false;
  }

  if (distX <= rect.w / 2) {
    return true;
  }
  if (distY <= rect.h / 2) {
    return true;
  }

  var dx = distX - rect.w / 2;
  var dy = distY - rect.h / 2;
  return dx * dx + dy * dy <= circle.r * circle.r;
}

export function getRandomArrayElement(array: []) {
  // const randomI = Math.floor(Math.random() * this.player.game.enemies.length);
  // return array[randomI];
}

export function rectRectCollision(rect1: any, rect2: any) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

export function mouseRectCollision(mouse: Mouse, rect2: GameObject) {
  if (!mouse.x || !mouse.y) {
    return;
  }
  return (
    mouse.x < rect2.drawX + rect2.width &&
    mouse.x + mouse.width > rect2.drawX &&
    mouse.y < rect2.drawY + rect2.height &&
    mouse.y + mouse.height > rect2.drawY
  );
}

export function roundedImage(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export function getYBottomPage(object: Unit | Card | DeckAndDiscardPile) {
  const height = object.height;
  const gameHeight = $store.main.height;
  const difference = gameHeight - height;

  const yPercentage = difference / gameHeight;
  return yPercentage;
}

export function getXMidpage(object: Unit | Card) {
  // todo: is this really mid? Probably not
  const width = object.width;
  const gameWidth = $store.main.width;
  const difference = gameWidth - width;

  const xPercentage = difference / gameWidth;
  return xPercentage / 2;
}

export function getXRightpage(object: Unit | Card) {
  const width = object.width;
  const gameWidth = $store.main.width;
  const difference = gameWidth - width;

  const xPercentage = difference / gameWidth;
  return xPercentage;
}
