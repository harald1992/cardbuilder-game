import { Card } from "./classes/card";
import { $store } from "./classes/store";
import { Game } from "./game";

declare const window: any;

// initialize web components;
Card;

window.onload = () => {
  const canvas: HTMLCanvasElement = document.getElementById(
    "canvas-1"
  ) as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;

  canvas.height = window.innerHeight;
  canvas.width = (window.innerHeight * 16) / 9;

  document.querySelector("#store")?.addEventListener("click", (e) => {
    console.log($store.getGame());
  });

  const game = new Game(this, canvas.width, canvas.height);
  window.game = game;

  game.init();

  let lastTime = 0;

  function animate(timeStamp: number) {
    if (!game.pause) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.update(deltaTime);
      game.draw(ctx);
    } else {
      game.background.draw(ctx);
    }

    if (!game.gameOver) {
      requestAnimationFrame(animate);
    }
  }

  animate(0);
};
