// Define the dimensions of the dungeon
let dungeonWidth = 40;
let dungeonHeight = 20;

// Create an empty dungeon
const dungeon = [];

// Initialize the dungeon with walls
for (let y = 0; y < dungeonHeight; y++) {
  const row = [];
  for (let x = 0; x < dungeonWidth; x++) {
    row.push("#");
  }
  dungeon.push(row);
}

// Function to create a room
function createRoom(x, y, width, height) {
  for (let i = y; i < y + height; i++) {
    for (let j = x; j < x + width; j++) {
      dungeon[i][j] = ".";
    }
  }
}

// Function to generate rooms and corridors in the dungeon
function generateDungeon() {
  const rooms = [];

  for (let i = 0; i < 5; i++) {
    const roomWidth = Math.floor(Math.random() * 6) + 4; // Random width between 4 and 9
    const roomHeight = Math.floor(Math.random() * 6) + 4; // Random height between 4 and 9
    const x = Math.floor(Math.random() * (dungeonWidth - roomWidth - 1)) + 1;
    const y = Math.floor(Math.random() * (dungeonHeight - roomHeight - 1)) + 1;

    const room = {
      x,
      y,
      width: roomWidth,
      height: roomHeight,
    };

    // Check if the new room overlaps with existing rooms
    const overlapping = rooms.some((existingRoom) => {
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
  for (let i = 1; i < rooms.length; i++) {
    const roomA = rooms[i - 1];
    const roomB = rooms[i];

    let xA = Math.floor(roomA.x + roomA.width / 2);
    let yA = Math.floor(roomA.y + roomA.height / 2);
    let xB = Math.floor(roomB.x + roomB.width / 2);
    let yB = Math.floor(roomB.y + roomB.height / 2);

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
for (let y = 0; y < dungeonHeight; y++) {
  console.log(dungeon[y].join(""));
}

console.log(dungeon);

export function getNewDungeon() {}
