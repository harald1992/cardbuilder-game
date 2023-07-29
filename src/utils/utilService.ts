export const $utilService = {
  // destroyGameObject(object) {
  //   const gameObjects = $store.getGameObjects();
  //   const index = gameObjects.findIndex((obj) => obj === object);
  //   gameObjects.splice(index, 1);
  // },

  // getRandomCoordinates(
  //   nTilesW = $store.getMapSettings().nTilesW,
  //   nTilesH = $store.getMapSettings().nTilesH
  // ) {
  //   const x = Math.floor(Math.random() * nTilesW);
  //   const y = Math.floor(Math.random() * nTilesH);
  //   return { x, y };
  // },

  // getTileIndexByCoordinates(x, y) {
  //   return $store.getTerrainArray().findIndex((tile) => {
  //     return tile.x == x && tile.y == y;
  //   });
  // },

  getRandomNumberBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  },

  getRandomItemFromArray(array: []) {
    return array[Math.floor(Math.random() * array.length)];
  },

  wait(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  },

  // findGameObjectByCoordinates(xPixel, yPixel) {
  //   const x = Math.floor(xPixel / $store.getTileSize());
  //   const y = Math.floor(yPixel / $store.getTileSize());
  //   const objects = $store.getGameObjects();
  //   const foundObject = objects.find((obj) => obj.x === x && obj.y === y);
  //   return foundObject;
  // },

  // checkIfTerrainIsPassable(destinationX, destinationY) {
  //   const terrainArray = $store.getTerrainArray();
  //   const destinationTerrain = terrainArray.filter(
  //     (terrain) => terrain.x === destinationX && terrain.y === destinationY
  //   )[0];

  //   return destinationTerrain?.bluePrint?.canMove;
  // },

  // handleObjectCollision(destinationX, destinationY) {
  //   const unitArray = $store.getGameObjects();
  //   const destinationObject = unitArray.filter(
  //     (obj) => obj.x === destinationX && obj.y === destinationY
  //   )[0];

  //   if (destinationObject) {
  //     messageService.setMessage("1 damageDealt");
  //     destinationObject.receiveDamage(1);
  //     return false;
  //   }

  //   return true;
  // },
};
