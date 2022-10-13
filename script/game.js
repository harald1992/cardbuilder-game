import { Unit } from './classes/unit.js'

import $store from './store.js';

Unit;

window.onload = () => {


    const $game = new Game();
    $game.init();
    // document.querySelector('#game-actions').innerHTML('click', () => {
    //     const data = $store.getData();
    //     console.log(data);
}


class Game {
    constructor() { }

    init() {
        this.updateMovesUI();
    }


    updateMovesUI() {
        const moves = $store.getData().playerData.moves;

        const movesUI = document.querySelector('#game-moves');
        movesUI.innerHTML = null;

        const isPlayer = $store.getData().isPlayersTurn;

        for (let i = 0; i < data.playerCards.length; i++) {
            let newCardEl = document.createElement('app-card');
            newCardEl.setAttribute('cardNumber', data.playerCards[i]);
            if (isPlayer) {
                // newCardEl.classList.add("card-hover");
            }
            playerCardsUI.appendChild(newCardEl)
        }


        const enemyCardsUI = document.querySelector('#enemy-cards');
        enemyCardsUI.innerHTML = null;

        for (let i = 0; i < data.enemyCards.length; i++) {
            let newCardEl = document.createElement('app-card');
            newCardEl.setAttribute('cardNumber', data.enemyCards[i]);
            if (!isPlayer) {
                // newCardEl.classList.add("card-hover");
            }
            enemyCardsUI.appendChild(newCardEl)
        }
    },
}