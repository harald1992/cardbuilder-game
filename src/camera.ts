import { Game } from "./game";
import { GameState } from "./models/models";
import { $store } from "./store";

export class Camera {
  game: Game;
  //   x = 0;
  //   y = 0;

  get x() {
    if (this.game.gameState === GameState.BATTLE) {
      return 0;
    } else {
      return -(
        this.game.main.width / 2 -
        (this.game.overworld?.overworldPlayer?.x || 0)
      );
    }
  }

  get y() {
    if (this.game.gameState === GameState.BATTLE) {
      return 0;
    } else {
      return -(
        this.game.main.height / 2 -
        (this.game.overworld?.overworldPlayer?.y || 0)
      );
    }
  }

  constructor(game: Game) {
    this.game = game;
  }
  //   get x() {
  //     let playerX =
  //       this.game.overworld?.overworldPlayer.x || 0.5 * $store.main.width;
  //     let cameraOffset = playerX - 0.5 * $store.main.width;
  //     console.log(playerX, cameraOffset);

  //     // console.log(cameraOffset);

  //     return cameraOffset;
  //     // return playerX - 0.5 * $store.main.width;
  //   }

  //   get y() {
  //     let playerY =
  //       this.game.overworld?.overworldPlayer.y || 0.5 * $store.main.height;

  //     return playerY - 0.5 * $store.main.height;
  //   }

  update(deltaTime: number) {
    // const overworldPlayer = this.game.overworld?.overworldPlayer;
    // let x = overworldPlayer?.x || 0.5 * $store.main.width;
    // let cameraOffsetX = x - 0.5 * $store.main.width;
    // this.x = cameraOffsetX;
    // let y = overworldPlayer?.y || 0.5 * $store.main.height;
    // let cameraOffsetY = y - 0.5 * $store.main.height;
    // this.y = cameraOffsetY;
  }
}
