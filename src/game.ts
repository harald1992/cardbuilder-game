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
  #preventCardClick = false;
  index: any;
  ui: UI;
  turnHandler: TurnHandler;

  get preventCardClick() {
    return this.#preventCardClick;
  }

  set preventCardClick(value: boolean) {
    this.#preventCardClick = value;
  }

  constructor(main: Main) {
    this.main = main;
    this.battleBackground = new Background(this.main, "background1", 200);
    this.mainMenu = new MainMenu(this);
    this.player = new Player(this);
    this.enemy = new Enemy(this);
    this.ui = new UI(this);
    this.turnHandler = new TurnHandler(this);
  }

  update(deltaTime: number) {
    [this.battleBackground, this.ui, this.player, this.enemy].forEach(item => item.update(deltaTime))
  }

  draw(ctx: CanvasRenderingContext2D) {
    [this.battleBackground, this.ui, this.player, this.enemy].forEach(item => item.draw(ctx))

  }

  init() {
    this.mainMenu.init();
  }

  newGame() {
    // this.mainMenu = new MainMenu(this);
    this.player = new Player(this);
    this.enemy = new Enemy(this);
    // this.enemy.renderCards();
    // this.player.renderCards();
  }
}
