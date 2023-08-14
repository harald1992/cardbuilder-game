// let canvas: HTMLCanvasElement;
// canvas = document.querySelector("#mapgenerator-canvas") as HTMLCanvasElement;
// let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// let tileSize = 20; // tilesize?
// let rows = 45;
// let columns = 45;

// let grid: Cell[] = [];
// let rooms: Room[] = [];
// let collide = false;

// var amountOfRooms = 10;
// var size = 5;
// var sizeMin = 5;

// var disX: number;
// var disY: number;
// let corridorW = 1;

// export class MapGenerator {
//   constructor() {}

//   createMap() {}
// }

// enum TileType {
//   WALL,
//   FLOOR,
// }

// class Cell {
//   column: number;
//   row: number;
//   x: number;
//   y: number;
//   tileType = TileType.WALL;

//   constructor(column: any, row: any, x: number, y: number, tileType: TileType) {
//     this.column = column;
//     this.row = row;
//     this.x = x;
//     this.y = y;
//     this.tileType = tileType;
//   }

//   draw() {
//     if (this.tileType === TileType.FLOOR) {
//       //   console.log("Floor");

//       ctx.fillStyle = "#696966";
//       ctx.fillRect(this.x, this.y, tileSize, tileSize);
//     } else {
//       //   console.log("Wall");

//       ctx.fillStyle = "#323232";
//       ctx.fillRect(this.x, this.y, tileSize, tileSize);
//     }
//   }

//   carve() {
//     for (var i = 0; i < rooms.length; i++) {
//       if (
//         this.column >= rooms[i].y / tileSize &&
//         this.column < rooms[i].y / tileSize + rooms[i].height / tileSize &&
//         this.row >= rooms[i].x / tileSize &&
//         this.row < rooms[i].x / tileSize + rooms[i].width / tileSize
//       ) {
//         // console.log("carve");

//         this.tileType = TileType.FLOOR;
//       }
//     }
//   }

//   carveH(dis: any, x: number, y: number) {
//     if (
//       this.row >= x &&
//       this.row < x + dis &&
//       this.column < y + corridorW &&
//       this.column > y - corridorW
//     ) {
//       this.tileType = TileType.FLOOR;
//     }
//   }

//   carveV(dis: any, x: number, y: number) {
//     if (
//       this.column >= y &&
//       this.column < y + dis &&
//       this.row < x + corridorW &&
//       this.row > x - corridorW
//     ) {
//       this.tileType = TileType.FLOOR;
//     }
//   }
// }

// function makeGrid() {
//   for (var row = 0; row < rows; row++) {
//     for (var column = 0; column < columns; column++) {
//       var y = column * tileSize;
//       var x = row * tileSize;
//       var cell = new Cell(column, row, x, y, TileType.WALL);
//       grid.push(cell);
//     }
//   }
// }

// function draw() {
//   for (var i = 0; i < grid.length; i++) {
//     grid[i].carve();

//     grid[i].draw();
//   }

//   for (var i = 0; i < rooms.length; i++) {
//     rooms[i].draw();
//   }
// }

// class Room {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   i: number;
//   center: [number, number] = [0, 0];

//   constructor(x: number, y: number, width: number, height: number, i: number) {
//     this.x = (x - 1) * width;
//     this.y = (y - 1) * width;
//     this.width = width * width;
//     this.height = height * width;
//     this.i = i;

//     this.center = [
//       Math.floor(this.x / width + width / 2),
//       Math.floor(this.y / width + height / 2),
//     ];
//   }

//   draw() {
//     ctx.fillStyle = "white";
//     ctx.fillText(
//       this.i.toString(),
//       this.x + this.width / 2,
//       this.y + this.height / 2 - 20
//     );
//   }
// }

// function createRooms1() {
//   for (var i = 0; i < amountOfRooms; i++) {
//     var room = new Room(
//       Math.floor(Math.random() * rows) + 1,
//       Math.floor(Math.random() * columns) + 1,
//       Math.floor(Math.random() * size) + sizeMin,
//       Math.floor(Math.random() * size) + sizeMin,
//       i
//     );
//     rooms.push(room);
//   }
// }

// function createRooms2(amountOfTimesTried = 0) {
//   console.log(amountOfTimesTried);

//   if (amountOfTimesTried > 5) {
//     console.log("Too little space");

//     return;
//   }
//   for (var i = 0; i < amountOfRooms; i++) {
//     var room = new Room(
//       Math.floor(Math.random() * rows) + 1,
//       Math.floor(Math.random() * columns) + 1,
//       Math.floor(Math.random() * size) + sizeMin,
//       Math.floor(Math.random() * size) + sizeMin,
//       i
//     );

//     if (i > 0) {
//       if (
//         rooms[0].x + rooms[0].width >= canvas.width ||
//         rooms[0].x <= 0 ||
//         rooms[0].y + rooms[0].height >= canvas.height ||
//         rooms[0].y <= 0
//       ) {
//         rooms = [];
//         // createRooms1(amountOfTimesTried + 1);
//         break;
//       }

//       for (var e = 0; e < rooms.length; e++) {
//         collide = false;

//         if (
//           room.x <= rooms[e].x + rooms[e].width &&
//           room.x + room.width >= rooms[e].x &&
//           room.y <= rooms[e].y + rooms[e].height &&
//           room.y + room.height >= rooms[e].y
//         ) {
//           collide = true;
//           i--;
//           break;
//         } else if (
//           room.x + room.width >= canvas.width ||
//           room.x <= 0 ||
//           room.y + room.height >= canvas.height ||
//           room.y <= 0
//         ) {
//           collide = true;
//           i--;
//           break;
//         }
//       }
//     }

//     console.log(collide);

//     if (collide == false) {
//       rooms.push(room);

//       if (i > 0) {
//         hCorridor(
//           rooms[i - 1].center[0],
//           room.center[0],
//           rooms[i - 1].center[1],
//           room.center[1]
//         );
//         vCorridor(
//           rooms[i - 1].center[0],
//           room.center[0],
//           rooms[i - 1].center[1],
//           room.center[1]
//         );
//       }
//     }
//   }
// }

// function hCorridor(x1: number, x2: number, y1: number, y2: number) {
//   if (x1 > x2) {
//     disX = x1 - x2;
//     disX += 1;

//     for (var i = 0; i < grid.length; i++) {
//       grid[i].carveH(disX, x2, y2);
//     }
//   } else {
//     disX = x2 - x1;
//     disX += 1;
//     for (var i = 0; i < grid.length; i++) {
//       grid[i].carveH(disX, x1, y1);
//     }
//   }
// }

// function vCorridor(x1: number, x2: number, y1: number, y2: number) {
//   var x;

//   if (y1 > y2) {
//     disY = y1 - y2;
//     disY += 1;

//     if (x2 + (disX - 1) > x1 + (disX - 1)) {
//       x = x2;
//     } else {
//       x = x2 + (disX - 1);
//     }

//     for (var i = 0; i < grid.length; i++) {
//       grid[i].carveV(disY, x, y2);
//     }
//   } else {
//     disY = y2 - y1;
//     disY += 1;

//     if (x1 + (disX - 1) > x2 + (disX - 1)) {
//       x = x1;
//     } else {
//       x = x1 + (disX - 1);
//     }

//     for (var i = 0; i < grid.length; i++) {
//       grid[i].carveV(disY, x, y1);
//     }
//   }
// }

// makeGrid();
// ctx.clearRect(0, 0, 1000, 1000);
// createRooms1();
// draw();

// console.log(rooms);
