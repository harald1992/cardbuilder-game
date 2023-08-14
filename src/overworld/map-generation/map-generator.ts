// import { Cell } from "./cell";

// export class MapGenerator {
//   canvas: HTMLCanvasElement;
//   ctx: CanvasRenderingContext2D;

//   map: Cell[] = [];

//   tiles = [];

//   columns = 25;
//   rows = 25;

//   constructor() {
//     this.canvas = document.querySelector(
//       "#mapgenerator-canvas"
//     ) as HTMLCanvasElement;
//     this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
//   }

//   createMap() {
//     this.createGrid();

//     // for (let i = 0; i < this.map.length; i++) {
//     //   const element = this.map[i];
//     // }
//     console.log(this.map);

//     this.draw(this.ctx);
//   }

//   createGrid() {
//     for (let y = 0; y < this.columns; y++) {
//       for (let x = 0; x < this.rows; x++) {
//         const element = new Cell(x, y);
//         this.map.push(element);
//       }
//     }
//   }

//   draw(ctx: CanvasRenderingContext2D) {
//     this.map.forEach((tile: any) => {
//       tile.draw(ctx);
//     });
//   }
// }
