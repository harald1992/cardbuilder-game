import { CardTitle } from "./card-dictionary";

export enum EnemyName {
  TEMPLATE = "Template",
  BAT = "Bat",
  SPECTRE = "Spectre",
  MINOTAUR = "Minotaur",
}

export type EnemyConfig = {
  name: EnemyName;
  imgSrc: string;
  allCards: CardTitle[];
  maxHp: number;
  maxMp: number;
};

export const $enemyDictionary: EnemyConfig[] = [
  {
    name: EnemyName.TEMPLATE,
    imgSrc: "assets/units/po_hu_m_99_h.png",
    maxHp: 1,
    maxMp: 1,
    allCards: [
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
    ],
  },
  {
    name: EnemyName.BAT,
    imgSrc: "assets/units/po_a_bat_h.png",
    maxHp: 1,
    maxMp: 2,
    allCards: [
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.BITE,
      CardTitle.BITE,
      CardTitle.BITE,
      CardTitle.BITE,
      CardTitle.BITE,
    ],
  },

  {
    name: EnemyName.SPECTRE,
    imgSrc: "assets/units/po_shfiend_h.png",
    maxHp: 5,
    maxMp: 2,
    allCards: [
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_BOLT,
    ],
  },

  {
    name: EnemyName.MINOTAUR,
    imgSrc: "assets/units/po_minchief_h.png",
    maxHp: 10,
    maxMp: 2,
    allCards: [
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.STRIKE,
      CardTitle.STRIKE,
      CardTitle.STRIKE,
      CardTitle.STRIKE,
      CardTitle.STRIKE,
    ],
  },
];
