import { GameState, Main } from ".";
import { Background } from "./classes/background";
import { Enemy } from "./classes/enemies/enemy";
import { MainMenu } from "./main-menu";
import { Mouse } from "./classes/mouse";
import { MouseHandler } from "./classes/mouse-handler";
import { Player } from "./classes/player";
import { TurnHandler } from "./classes/turn-handler";
import { BackgroundUI } from "./classes/background-ui";
import { UI } from "./ui-elements/ui";
import { Ghost } from "./classes/enemies/ghost";

export class Game {
  gameOver = false;
  battleBackground: Background;
  mainMenu: MainMenu;
  player: Player;
  enemy: Enemy;
  main: Main;
  index: any;
  backgroundUI: BackgroundUI;
  turnHandler: TurnHandler;
  mouse: Mouse;
  mouseHandler: MouseHandler;
  ui: UI;

  get clickableItems() {
    return [...this.player.deck.cardsInHand, this.ui.endTurnButton];
  }

  constructor(main: Main) {
    this.main = main;
    this.battleBackground = new Background(this.main, "forest1", 0);
    this.mainMenu = new MainMenu(this);
    this.player = new Player(this);
    this.enemy = new Enemy(this);
    this.backgroundUI = new BackgroundUI(this);
    this.turnHandler = new TurnHandler(this);
    this.mouse = new Mouse(this);
    this.mouseHandler = new MouseHandler(this);
    this.ui = new UI(this);
  }

  update(deltaTime: number) {
    [
      this.battleBackground,
      this.backgroundUI,
      this.player,
      this.enemy,
      this.ui,
    ].forEach((item) => item.update(deltaTime));
  }

  draw(ctx: CanvasRenderingContext2D) {
    [
      this.battleBackground,
      this.backgroundUI,
      this.player,
      this.enemy,
      this.ui,
    ].forEach((item) => item.draw(ctx));
  }

  init() {
    this.mainMenu.init();
  }

  newGame() {
    this.player = new Player(this);
    this.player.init();
    this.enemy = new Ghost(this);
    this.enemy.init();

    this.turnHandler.init();
  }
}
