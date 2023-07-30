import { Main } from ".";
import { Background } from "./classes/background";
import { Enemy } from "./units/enemies/enemy";
import { MainMenu } from "./main-menu";
import { Mouse } from "./mouse";
import { Player } from "./units/player";
// import { TurnHandler } from "./battle/turn-handler";
import { BackgroundUI } from "./classes/background-ui";
import { Ghost } from "./units/enemies/ghost";
import { MouseHandler } from "./mouse-handler";
import { BattleManager } from "./battle/battle-manager";

export class Game {
  battleBackground: Background;
  mainMenu: MainMenu;
  main: Main;
  index: any;
  mouse: Mouse;
  mouseHandler: MouseHandler;
  battleManager: BattleManager;

  get clickableItems() {
    return this.battleManager.clickableItems;
  }

  constructor(main: Main) {
    this.main = main;
    this.battleBackground = new Background(this.main, "particle-background", 0);
    this.mainMenu = new MainMenu(this);
    this.mouse = new Mouse(this);
    this.mouseHandler = new MouseHandler(this);
    this.battleManager = new BattleManager(this);
  }

  update(deltaTime: number) {
    [this.battleBackground, this.battleManager].forEach((item) =>
      item.update(deltaTime)
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    [this.battleBackground, this.battleManager].forEach((item) =>
      item.draw(ctx)
    );

    if (this.main.debugMode) {
      ctx.strokeStyle = "black";
      this.clickableItems.forEach((item) => {
        ctx.strokeRect(item.x, item.y, item.width, item.height);
      });
    }
  }

  init() {
    this.mainMenu.init();
  }

  newGame() {
    this.battleManager.init();
  }
}
