import { MusicManager } from "./audio/music-manager";
import { SoundManager } from "./audio/sound-manager";
import { GameObject } from "./classes/game-object";
import { Game } from "./game";
import { MainMenu } from "./main-menu";
// import { MapGenerator } from "./overworld/map-generation/map-generator";
import { $store } from "./store";

function recreateNode(el: any, withChildren: any) {
  if (withChildren) {
    el.parentNode.replaceChild(el.cloneNode(true), el);
  } else {
    var newEl = el.cloneNode(false);
    while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
    el.parentNode.replaceChild(newEl, el);
  }
}

declare const window: any;

export class Main {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  mainMenu: MainMenu;
  // overworld: Overworld;
  game: Game | undefined;
  gameContainer: HTMLElement;
  debounceTime: any;
  timeOutMs = 100;
  // previousGameState = GameState.MAINMENU;
  // gameState = GameState.MAINMENU;

  isMainMenu = true;
  // background: Background;

  debugMode = false;

  soundManager: SoundManager;
  musicManager: MusicManager;

  oldWidth = 0;
  oldHeight = 0;

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

    this.calculateHeightAndWidth();

    // this.overworld = new Overworld(this);
    this.game = new Game(this);
    this.mainMenu = new MainMenu(this);

    this.soundManager = new SoundManager();
    this.musicManager = new MusicManager();
  }

  init() {
    this.mainMenu.init();

    this.calculateHeightAndWidth();

    // this.changeGameState(GameState.MAINMENU);

    window.addEventListener("resize", (event: Event) => {
      clearTimeout(this.debounceTime);

      this.debounceTime = setTimeout(() => {
        this.calculateHeightAndWidth();
      }, this.timeOutMs);
    });

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "d") {
        this.debugMode = !this.debugMode;
        console.log($store.game);
      }
    });
  }

  newGame() {
    // this.changeGameState(GameState.OVERWORLD);
    this.isMainMenu = false;
    this.game = new Game(this);
    this.game.init();
    this.game.newGame();
  }

  recalculateObjectPositions() {
    this.game?.drawableItems?.forEach((object: GameObject) => {
      object.updatePositions();
    });
  }

  calculateHeightAndWidth() {
    this.oldWidth = this.width;
    this.oldHeight = this.height;

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

    this.recalculateObjectPositions();
  }

  clearGame() {
    this.game = undefined;
  }
}

window.onload = () => {
  const main = new Main();
  main.init();
  $store.main = main;
  let lastTime = 0;

  function animate(timeStamp: number) {
    let deltaTime = 0;

    main.ctx.clearRect(0, 0, main.width, main.height);

    if (!main.isMainMenu) {
      deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      main.game?.update(deltaTime);
      main.game?.draw(main.ctx);
    } else {
      main.mainMenu.draw(main.ctx);
    }

    requestAnimationFrame(animate);
  }
  animate(0);
};
