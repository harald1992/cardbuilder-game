import { Background } from "./classes/background";
import { Game } from "./game";
import { $store } from "./store";

declare const window: any;

// initialize web components;

export enum GameState {
  MAINMENU,
  INGAME,
  INGAMEPAUSE,
  GAMEOVER,
}

export class Main {
  game: Game;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  gameContainer: HTMLElement;
  debounceTime: any;
  timeOutMs = 100;
  gameState = GameState.MAINMENU;
  background: Background;
  debugMode = false;

  get width() {
    return this.canvas.width;
  }

  set width(value: number) {
    this.canvas.width = value;
    this.gameContainer.style.width = value + "px";
  }

  get height() {
    return this.canvas.height;
  }

  set height(value: number) {
    this.canvas.height = value;
    this.gameContainer.style.height = value + "px";
  }

  constructor() {
    this.canvas = document.getElementById("canvas-1") as HTMLCanvasElement;

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.gameContainer = document.querySelector(
      ".game-container"
    ) as HTMLElement;

    this.background = new Background(this);

    this.game = new Game(this);
  }

  init() {
    this.calculateHeightAndWidth();
    this.changeGameState(GameState.MAINMENU);
    // this.recalculateObjectPositions();

    window.addEventListener("resize", (event: Event) => {
      clearTimeout(this.debounceTime);

      this.debounceTime = setTimeout(() => {
        this.calculateHeightAndWidth();
        // this.recalculateObjectPositions();
      }, this.timeOutMs);
    });

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "d") {
        // this.debugMode = !this.debugMode;
      }
    });
  }

  calculateHeightAndWidth() {
    let width = 0;
    let height = 0;

    if (window.innerWidth / 16 >= window.innerHeight / 9) {
      // width is bigger in proportion to resolution
      height = window.innerHeight;
      width = (window.innerHeight * 16) / 9;
    } else {
      // height is bigger
      width = window.innerWidth;
      height = (window.innerWidth * 9) / 16;
    }

    this.width = width;
    this.height = height;
  }

  changeGameState(state: GameState) {
    this.gameState = state;

    switch (state) {
      case GameState.MAINMENU:
        this.game.mainMenu.mainMenuElement.style.display = "flex";

        break;
      case GameState.INGAMEPAUSE:
        break;
      case GameState.INGAME:
        this.game.mainMenu.mainMenuElement.style.display = "none";

        break;
      case GameState.GAMEOVER:
        alert("game over");
    }
  }
}

window.onload = () => {
  const main = new Main();
  main.init();
  $store.setGame(main.game);

  main.game.init();

  let lastTime = 0;

  function animate(timeStamp: number) {
    main.ctx.clearRect(0, 0, main.width, main.height);

    switch (main.gameState) {
      case GameState.MAINMENU:
        main.background.draw(main.ctx);
        break;
      case GameState.INGAMEPAUSE:
        main.game.draw(main.ctx);
        break;
      case GameState.INGAME:
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        main.game.update(deltaTime);
        main.game.draw(main.ctx);
        break;
      case GameState.GAMEOVER:
        console.log("game over");
    }

    requestAnimationFrame(animate);
  }
  animate(0);
};
