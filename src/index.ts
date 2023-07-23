import { Game } from "./game";

window.onload = () => {
  console.log("loaded 7");

  const canvas: HTMLCanvasElement = document.getElementById(
    "canvas-1"
  ) as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;

  canvas.height = window.innerHeight;
  canvas.width = (window.innerHeight * 16) / 9;

  document.querySelector("#store")?.addEventListener("click", (e) => {
    // console.log($store.getData());
  });

  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;

  function animate(timeStamp: number) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // game.update(deltaTime);
    // game.draw(ctx);

    // if (!game.gameOver) {
    requestAnimationFrame(animate);
    // }
  }

  animate(0);
};
