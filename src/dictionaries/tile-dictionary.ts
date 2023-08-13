export enum TileName {
  STONE = "StoneFloor",
  PIT = "Pit",
  // DUNGEONFLOOR1 = "Dungeon Floor1",
  // DUNGEONFLOOR2 = "Dungeon Floor2",
  // DUNGEONFLOOR3 = "Dungeon Floor3",
  // DUNGEONFLOOR4 = "Dungeon Floor4",
  // DUNGEONFLOOR5 = "Dungeon Floor5",
  // DUNGEONFLOOR6 = "Dungeon Floor16",
}

export interface TileConfig {
  name: TileName | string;
  canMove: boolean;
  src: string;
  spriteConfig?: {
    sourceX: number;
    sourceY: number;
    cutSizeX: number;
    cutSizeY: number;
  };
  width?: number;
  height?: number;
}

export const $tileDictionary: TileConfig[] = [
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

export const $dungeonTileDictionary: TileConfig[] = [
  {
    name: "Dungeon Floor Big Tiles 1",
    canMove: true,
    src: "assets/RF_Catacombs_v1.0/mainlevbuild.png",
    spriteConfig: {
      sourceX: 736,
      sourceY: 210,
      // sourceY: 208, // new
      cutSizeX: 32,
      cutSizeY: 32,
    },
  },
  {
    name: "Dungeon Floor Big Tiles 2",
    canMove: true,
    src: "assets/RF_Catacombs_v1.0/mainlevbuild.png",
    spriteConfig: {
      sourceX: 784,
      sourceY: 210,
      cutSizeX: 32,
      cutSizeY: 32,
    },
  },

  {
    name: "Dungeon Floor 1",
    canMove: true,
    src: "assets/RF_Catacombs_v1.0/mainlevbuild.png",
    spriteConfig: {
      sourceX: 736,
      sourceY: 272,
      cutSizeX: 32,
      cutSizeY: 32,
    },
  },
  {
    name: "Dungeon Floor 2",
    canMove: true,
    src: "assets/RF_Catacombs_v1.0/mainlevbuild.png",
    spriteConfig: {
      sourceX: 784,
      sourceY: 272,
      cutSizeX: 32,
      cutSizeY: 32,
    },
  },
  {
    name: "Dungeon Floor 3",
    canMove: true,
    src: "assets/RF_Catacombs_v1.0/mainlevbuild.png",
    spriteConfig: {
      sourceX: 736,
      sourceY: 320,
      cutSizeX: 32,
      cutSizeY: 32,
    },
  },
  {
    name: "Dungeon Floor 4",
    canMove: true,
    src: "assets/RF_Catacombs_v1.0/mainlevbuild.png",
    spriteConfig: {
      sourceX: 784,
      sourceY: 320,
      cutSizeX: 32,
      cutSizeY: 32,
    },
  },
  {
    name: "Dungeon Floor 5",
    canMove: true,
    src: "assets/RF_Catacombs_v1.0/mainlevbuild.png",
    spriteConfig: {
      sourceX: 736,
      sourceY: 368,
      cutSizeX: 32,
      cutSizeY: 32,
    },
  },
  {
    name: "Dungeon Floor 6",
    canMove: true,
    src: "assets/RF_Catacombs_v1.0/mainlevbuild.png",
    spriteConfig: {
      sourceX: 784,
      sourceY: 368,
      cutSizeX: 32,
      cutSizeY: 32,
    },
  },
];
