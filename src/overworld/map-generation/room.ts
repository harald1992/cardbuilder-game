export interface Coordinates {
  x: number;
  y: number;
}

export class Room {
  center: Coordinates = { x: 0, y: 0 };
  size: number;
  allCellCoordinates: Coordinates[] = [];
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(centerX: number, centerY: number, size = 3) {
    this.center.x = centerX;
    this.center.y = centerY;
    this.size = size;

    this.x = this.center.x - 1;
    this.y = this.center.y - 1;
    this.width = size;
    this.height = size;

    this.setAllCellCoordinates();
  }

  setAllCellCoordinates() {
    // only works for size 3 for now
    const startingX = this.x;
    const startingY = this.y;

    for (let y = startingY; y < startingY + this.size; y++) {
      for (let x = startingX; x < startingX + this.size; x++) {
        this.allCellCoordinates.push({ x, y });
      }
    }
  }
}
