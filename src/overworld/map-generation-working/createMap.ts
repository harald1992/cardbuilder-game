// Define the dimensions of the dungeon
let dungeonWidth: number = 10;
let dungeonHeight: number = 20;

// Create an empty dungeon
const dungeon: string[][] = [];

// Initialize the dungeon with walls
for (let y: number = 0; y < dungeonHeight; y++) {
  const row: string[] = [];
  for (let x: number = 0; x < dungeonWidth; x++) {
    row.push("#");
  }
  dungeon.push(row);
}

// Function to create a room
function createRoom(x: number, y: number, width: number, height: number): void {
  for (let i: number = y; i < y + height; i++) {
    for (let j: number = x; j < x + width; j++) {
      dungeon[i][j] = ".";
    }
  }
}

// Function to generate rooms and corridors in the dungeon
function generateDungeon(): void {
  const nRooms = 2;
  const roomVariance = 0;
  const rooms: { x: number; y: number; width: number; height: number }[] = [];

  for (let i: number = 0; i < nRooms; i++) {
    const roomWidth: number = Math.floor(Math.random() * roomVariance) + 3; // Random width between 4 and 9 -> for now just 3*3
    const roomHeight: number = Math.floor(Math.random() * roomVariance) + 3; // Random height between 4 and 9 -> for now just 3*3
    const x: number =
      Math.floor(Math.random() * (dungeonWidth - roomWidth - 1)) + 1;
    const y: number =
      Math.floor(Math.random() * (dungeonHeight - roomHeight - 1)) + 1;

    const room: { x: number; y: number; width: number; height: number } = {
      x,
      y,
      width: roomWidth,
      height: roomHeight,
    };

    // Check if the new room overlaps with existing rooms
    const overlapping: boolean = rooms.some((existingRoom) => {
      return (
        room.x < existingRoom.x + existingRoom.width &&
        room.x + room.width > existingRoom.x &&
        room.y < existingRoom.y + existingRoom.height &&
        room.y + room.height > existingRoom.y
      );
    });

    if (!overlapping) {
      createRoom(room.x, room.y, room.width, room.height);
      rooms.push(room);
    }
  }

  // Connect rooms with corridors
  for (let i: number = 1; i < rooms.length; i++) {
    const roomA = rooms[i - 1];
    const roomB = rooms[i];

    let xA: number = Math.floor(roomA.x + roomA.width / 2);
    let yA: number = Math.floor(roomA.y + roomA.height / 2);
    let xB: number = Math.floor(roomB.x + roomB.width / 2);
    let yB: number = Math.floor(roomB.y + roomB.height / 2);

    while (xA !== xB || yA !== yB) {
      if (xA < xB) {
        xA++;
      } else if (xA > xB) {
        xA--;
      } else if (yA < yB) {
        yA++;
      } else if (yA > yB) {
        yA--;
      }
      dungeon[yA][xA] = ".";
    }
  }
}

// Generate rooms and corridors in the dungeon
generateDungeon();

// Print the dungeon to the console
for (let y: number = 0; y < dungeonHeight; y++) {
  // console.log(dungeon[y].join(""));
}

console.log(dungeon);
// process.stdout.write(dungeon);

export function getNewDungeon(): string[][] {
  generateDungeon();
  return dungeon;
}
