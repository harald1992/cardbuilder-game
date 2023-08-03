import { Main } from ".";
import { MainMenu } from "./main-menu";
import { Mouse } from "./mouse";
import { MouseHandler } from "./mouse-handler";
import { BattleManager } from "./battle/battle-manager";
import { HeaderUI } from "./ui-elements/header-ui";
import { IngameMenu } from "./battle/battle-ui/ingame-menu";

export class Game {
  main: Main;
  mouse: Mouse;
  mouseHandler: MouseHandler;
  battleManager: BattleManager;
  playerGold = 0;
  ingameMenu: IngameMenu;

  headerUI: HeaderUI;

  get clickableItems() {
    return [...this.battleManager.clickableItems];
  }

  get drawableItems() {
    return [...this.battleManager.drawableItems, this.headerUI];
  }

  constructor(main: Main) {
    this.main = main;
    this.mouse = new Mouse(this);
    this.mouseHandler = new MouseHandler(this);
    this.battleManager = new BattleManager(this);
    this.headerUI = new HeaderUI(this);
    this.ingameMenu = new IngameMenu(this);
  }

  update(deltaTime: number) {
    this.drawableItems.forEach((item) => item.update(deltaTime));
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawableItems.forEach((item) => item.draw(ctx));

    if (this.main.debugMode) {
      ctx.strokeStyle = "black";
      this.drawableItems.forEach((item) => {
        ctx.strokeRect(item.x, item.y, item.width, item.height);
      });
    }
  }

  init() {
    this.mouseHandler.init();
    this.ingameMenu.init();
  }

  newGame() {
    this.battleManager.init();
  }
}
