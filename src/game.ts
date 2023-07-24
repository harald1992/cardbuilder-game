import { GameState, Main } from ".";
import { Background } from "./classes/background";
import { Enemy } from "./classes/enemy";
import { MainMenu } from "./classes/main-menu";
import { Player } from "./classes/player";
import { TurnHandler } from "./classes/turn-handler";
import { UI } from "./classes/ui";

export class Game {
  gameOver = false;
  battleBackground: Background;
  mainMenu: MainMenu;
  player: Player;
  enemy: Enemy;
  main: Main;
  isPlayerTurn = true;

  index: any;
  ui: UI;
  turnHandler: TurnHandler;

  constructor(main: Main) {
    this.main = main;
    this.battleBackground = new Background(this.main, "background1", 200);
    this.mainMenu = new MainMenu(this);
    this.player = new Player(this);
    this.enemy = new Enemy(this);
    this.ui = new UI(this);
    this.turnHandler = new TurnHandler(this);
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    let itemsToRender: (Background | Player | Enemy | UI)[] = [
      this.battleBackground,
      this.ui,
    ];

    // if (this.main.gameState !== GameState.MAINMENU) {
    itemsToRender = [...itemsToRender, this.player, this.enemy];
    // }

    itemsToRender.forEach((item: any) => {
      item.draw(ctx);
    });
  }

  init() {
    this.mainMenu.init();
  }

  newGame() {
    this.mainMenu = new MainMenu(this);
    this.player = new Player(this);
    this.enemy = new Enemy(this);
    this.enemy.renderCards();
    this.player.renderCards();
  }
}
