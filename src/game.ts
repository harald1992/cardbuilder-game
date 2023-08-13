import { Main } from ".";
import { Mouse } from "./mouse";
import { MouseHandler } from "./mouse-handler";
import { BattleManager } from "./battle/battle-manager";
import { HeaderUI } from "./ui-elements/header-ui";
import { IngameMenu } from "./battle/battle-ui/ingame-menu";
import { Overworld } from "./overworld/overworld";
import { EnemyConfig, EnemyName } from "./dictionaries/enemy-dictionary";
import { Enemy } from "./units/enemy";
import { GameObject } from "./classes/game-object";
import { Player } from "./units/player";
import { GameState, SpriteConfig } from "./models/models";
import { CardTitle } from "./dictionaries/card-dictionary";
import { Camera } from "./camera";

export type PlayerData = {
  name: string;
  imgSrc: string;
  allCards: CardTitle[];
  maxHp: number;
  maxMp: number;
  spriteConfig?: SpriteConfig;
};

export class Game {
  main: Main;
  mouse: Mouse;
  mouseHandler: MouseHandler;
  playerGold = 0;
  ingameMenu: IngameMenu;

  headerUI: HeaderUI;

  overworld: Overworld | undefined;
  battleManager: BattleManager | undefined;
  camera: Camera;

  gameState: GameState = GameState.OVERWORLD;

  playerData: PlayerData = {
    name: "Player",
    imgSrc: "assets/units/po_hoodshade_L.png",
    allCards: [
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.BITE,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIBRARY,
      CardTitle.HEALING_AID,
      CardTitle.STRIKE,
      CardTitle.LIGHTNING_BOLT,
    ],
    maxHp: 20,
    maxMp: 3,

    spriteConfig: {
      src: "assets/swordman pack/swordman_1.png",
      animations: {
        idleRight: [
          [0, 0],
          [1, 0],
          [2, 0],
          [3, 0],
          [4, 0],
          [5, 0],
        ],
        walkRight: [
          [0, 1],
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 1],
          [5, 1],
        ],

        idleLeft: [
          [6, 0],
          [7, 0],
          [8, 0],
          [9, 0],
          [10, 0],
          [11, 0],
        ],
        walkLeft: [
          [6, 1],
          [7, 1],
          [8, 1],
          [9, 1],
          [10, 1],
          [11, 1],
        ],
      },
      cutConfig: {
        sourceX: 0,
        sourceY: 0,
        cutSizeX: 32,
        cutSizeY: 32,
      },
    },
  };

  get clickableItems() {
    if (this.gameState === GameState.OVERWORLD) {
      return [...(this.overworld?.clickableItems || [])];
    } else if (this.gameState === GameState.BATTLE) {
      return [...(this.battleManager?.clickableItems || [])];
    } else {
      return [];
    }
  }

  get drawableItems() {
    if (this.gameState === GameState.OVERWORLD) {
      return [...(this.overworld?.drawableItems || [])];
    } else if (this.gameState === GameState.BATTLE) {
      return [...(this.battleManager?.drawableItems || [])];
    } else {
      return [];
    }
  }

  get uiItems() {
    return this.headerUI;
  }

  constructor(main: Main) {
    this.main = main;
    this.headerUI = new HeaderUI(this);

    this.mouse = new Mouse(this);
    this.mouseHandler = new MouseHandler(this);
    // this.battleManager = new BattleManager(this);
    this.ingameMenu = new IngameMenu(this);
    this.camera = new Camera(this);
  }

  update(deltaTime: number) {
    this.camera.update(deltaTime);
    this.drawableItems?.forEach((item) => item.update(deltaTime));
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawableItems?.forEach((item: GameObject) => {
      item.draw(ctx);
    });

    this.uiItems.draw(ctx);
  }

  init() {
    this.mouseHandler.init();
    this.ingameMenu.init();
    this.overworld = undefined;
    this.battleManager = undefined;
  }

  newGame() {
    this.playerGold = 0;
    this.overworld = new Overworld(this);

    this.overworld?.newGame();
    this.gameState = GameState.OVERWORLD;
  }

  startBattle(enemies: EnemyConfig[]) {
    this.main.musicManager.playBattleMusic();

    let player = new Player(this, 0, 0);

    const army = enemies.map((enemy) => new Enemy(this, enemy.name));

    // const enemy3 = new Enemy(this, EnemyName.MINOTAUR, 0, 0);
    // enemies.push(enemy3);

    this.battleManager = new BattleManager(this, player, army);

    this.battleManager.init();
    this.gameState = GameState.BATTLE;
  }

  goBackToOverworld() {
    console.log("go back to overworld");
    this.main.musicManager.playOverworldMusic();

    this.battleManager?.dragAndDrop?.removeEventListeners();
    this.battleManager = undefined;
    this.gameState = GameState.OVERWORLD;
    this.overworld?.init();

    // this.overworld?.addEventListeners();
  }

  goToMainMenu() {
    this.main.isMainMenu = true;
    this.main.mainMenu.mainMenuElement.style.display = "flex";
  }

  gameOver() {
    this.main.isMainMenu = true;
    this.main.mainMenu.mainMenuElement.style.display = "flex";

    this.main.clearGame();
  }
}
