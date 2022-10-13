

const defaultData = {
    playerData: {
        title: 'playerName',
        currentHp: 10,
        maxHp: 10,
        src: 'assets/units/champion.webp',
        moves: [],
    },

    enemyData: {
        title: 'enemyName',
        currentHp: 5,
        maxHp: 5,
        src: 'assets/units/crusader.webp',
        moves: [],
    },

    isPlayersTurn: true,
}


class Store {
    constructor() {
        this.initGame();
    }

    initGame() {
        let data = defaultData;
        this.setData(data)
    }

    getData() {
        return window.data;
    }

    setData(data) {
        window.data = data
    }

    loadGame() {
        const data = JSON.parse(localStorage.getItem('gameData'));
        this.setData(data)
    }

    saveGame(data = this.getData()) {
        localStorage.setItem('gameData', JSON.stringify(data));
    }

}

const $store = new Store();


export default $store;