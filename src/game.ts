import { Main } from ".";
import { Background } from "./classes/background";
import { Enemy } from "./units/enemies/enemy";
import { MainMenu } from "./main-menu";
import { Mouse } from "./mouse";
import { Player } from "./units/player";
// import { TurnHandler } from "./battle/turn-handler";
import { BackgroundUI } from "./classes/background-ui";
import { UI } from "./ui-elements/ui";
import { Ghost } from "./units/enemies/ghost";
import { MouseHandler } from "./mouse-handler";
import { BattleManager } from "./battle/battle-manager";

export class Game {
  battleBackground: Background;
  mainMenu: MainMenu;
  player: Player;
  // enemy: Enemy;
  main: Main;
  index: any;
  backgroundUI: BackgroundUI;
  // turnHandler: TurnHandler;
  mouse: Mouse;
  mouseHandler: MouseHandler;
  ui: UI;

  battleManager: BattleManager;

  get clickableItems() {
    return [...this.player.deck.cardsInHand, this.ui.endTurnButton];
  }

  constructor(main: Main) {
    this.main = main;
    this.battleBackground = new Background(this.main, "forest1", 0);
    this.mainMenu = new MainMenu(this);
    this.player = new Player(this);
    // this.enemy = new Enemy(this);
    this.backgroundUI = new BackgroundUI(this);
    // this.turnHandler = new TurnHandler(this);
    this.mouse = new Mouse(this);
    this.mouseHandler = new MouseHandler(this);
    this.ui = new UI(this);

    this.battleManager = new BattleManager(this);
  }

  update(deltaTime: number) {
    [
      this.battleBackground,
      this.backgroundUI,
      this.player,
      this.battleManager,
      this.ui,
    ].forEach((item) => item.update(deltaTime));
  }

  draw(ctx: CanvasRenderingContext2D) {
    [
      this.battleBackground,
      this.backgroundUI,
      this.player,
      this.battleManager,
      this.ui,
    ].forEach((item) => item.draw(ctx));
  }

  init() {
    this.mainMenu.init();
  }

  newGame() {
    this.player = new Player(this);
    this.player.init();
    // this.enemy = new Ghost(this);
    // this.enemy.init();

    // this.turnHandler.init();
    this.battleManager.init();
  }
}
