export enum TileName {
  STONE = "StoneFloor",
  PIT = "Pit",
}

export interface TileConfig {
  name: TileName;
  canMove: boolean;
  src: string;
}

export const $tileDictionary = [
  {
    name: TileName.STONE,
    canMove: true,
    src: "assets/overworld/vdu_tex_grstone.png",
  },
  {
    name: TileName.PIT,
    canMove: false,
    src: "assets/icons/book.svg",
  },
];
