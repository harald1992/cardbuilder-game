export enum GameState {
  OVERWORLD,
  BATTLE,
}

export interface SpriteConfig {
  src: string;
  animations: {
    idleRight: number[][]; // x and y
    walkRight: number[][]; // x and y
    idleLeft: number[][]; // x and y
    walkLeft: number[][]; // x and y
  };
  cutConfig: {
    sourceX: number;
    sourceY: number;
    cutSizeX: number;
    cutSizeY: number;
  };
}

export enum TileType {
  WALL,
  FLOOR,
}
