import { Move } from './classes/move.js';


const defaultData = {
    playerData: {
        title: 'playerName',
        src: 'assets/units/champion.webp',

        currentHp: 10,
        maxHp: 10,
        attack: 1,
        moves: [
            new Move('Attack', 1),
            new Move('Tackle', 2)],
    },

    enemyData: {
        title: 'enemyName',
        src: 'assets/units/crusader.webp',
        currentHp: 5,
        maxHp: 5,
        attack: 1,
        moves: [
            new Move('Attack', 1),
        ],
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

    getPlayer() {
        return this.getData().playerData;
    }

    getPlayerUI() {
        return document.querySelector('#player');
    }

    getEnemy() {
        return this.getData().enemyData;
    }

    getEnemyUI() {
        return document.querySelector('#enemy');
    }

    nextTurn() {
        const data = this.getData();
        data.isPlayersTurn = !data.isPlayersTurn;
        this.setData(data);
    }

}

const $store = new Store();


export default $store;