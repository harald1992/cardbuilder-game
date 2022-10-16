import { Unit } from './classes/unit.js'

import $store from './store.js';

Unit;

window.onload = () => {


    const $game = new Game();
    $game.init();



    document.querySelector('#store').addEventListener('click', e => {
        console.log($store.getData());
    })
}


class Game {
    constructor() { }

    init() {
        this.renderGame();
    }

    renderGame() {

        this.renderUnits();

        this.updateMovesUI();
    }

    renderUnits() {
        document.querySelector('#player-container').innerHTML = `
            <app-unit id="player" team="player"> </app-unit>
            `
        document.querySelector('#enemy-container').innerHTML = `
        <app-unit id="enemy" team="enemy"> </app-unit>
        `

    }

    updateMovesUI() {
        const data = $store.getData()
        const isPlayer = $store.getData().isPlayersTurn;

        const movesUI = document.querySelector('#game-moves');
        movesUI.innerHTML = null;

        const moves = $store.getData().playerData.moves;

        if (isPlayer) {
            for (let i = 0; i < moves.length; i++) {
                let newBtn = document.createElement('button');
                // newBtn.classList.add("card-hover");
                newBtn.innerText = moves[i].name
                if (i === 0) {
                    newBtn.focus();
                }
                newBtn.addEventListener('click', (e) => {
                    const player = $store.getPlayer();
                    const enemy = $store.getEnemy();

                    const delay = 2000;

                    $store.getPlayerUI().animateUp();
                    $store.getEnemyUI().blinkAnimation(delay);

                    setTimeout(() => {
                        moves[i].resolve($store.getPlayer(), $store.getEnemy());

                        $store.nextTurn();
                        this.renderGame();
                    }, delay);

                })

                movesUI.appendChild(newBtn);

                movesUI.querySelector('button:first-child').focus();
            }
        } else {
            const randomEnemyMove = data.enemyData.moves[0];

            const player = $store.getPlayer();
            const enemy = $store.getEnemy();

            const delay = 1000;

            $store.getEnemyUI().animateDown();
            $store.getPlayerUI().blinkAnimation(delay);

            setTimeout(() => {
                randomEnemyMove.resolve($store.getEnemy(), $store.getPlayer());

                $store.nextTurn();
                this.renderGame();
            }, delay);

        }
    }


}