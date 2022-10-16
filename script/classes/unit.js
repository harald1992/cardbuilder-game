import $store from "../store.js";

const style = document.createElement("style");
style.textContent = `

@keyframes blink {
    0%   {background-color: white;}
    25%  {background-color: black;}
    50%  {background-color: white;}
    75% {background-color: black;}
    100% {background-color: white;}

 }
 
.unit {
    border: 1px solid black;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
 }

 img {
    // width: 100px;
    // height: 100px;
    max-height: 100px;
    max-width: 100px;
 }

 .blink {
    animation-name: blink;
    animation-duration: 1s;
 }



 *,
*::before,
*::after {
    box-sizing: border-box
}

p,
h1,
h2,
h3,
h4,
h5 {
    margin: 0;
}


`;

const template = document.createElement("template");
template.innerHTML = `
    <div id="unit" class="unit">
        <p id="unit-title" class="unit-title"></p>
        <p id="unit-health" class="unit-health"></p>

        <img id="unit-image" class="unit-image">
        <div id="unit-body" class="unit-body"></div>
    </div>
`;

export class Unit extends HTMLElement {
    unit = undefined;

    get team() {
        return this.getAttribute("team");
    }

    constructor() {
        super();
        this.attachShadowDom();

    }

    render() {

        this.shadowRoot.querySelector("#unit").innerHTML =
            `
            <p>${this.data.title || 'title'}</p>
            <p>${this.data.currentHp} /  ${this.data.maxHp} </p >

            <img src="${this.data.src || 'assets/units/Zealot.webp'}" />
        `
    }


    attachShadowDom() {
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(style.cloneNode(true));
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        if (this.team === 'player') { this.data = $store.getData().playerData; }
        if (this.team === 'enemy') { this.data = $store.getData().enemyData; }

        this.render();
    }

    blinkAnimation(delay) {
        const unit = this.shadowRoot.querySelector('.unit');

        unit.classList.add("blink");
        unit.style.animationDuration = delay + 'ms';
    }

    animateUp() {
        this.shadowRoot.querySelector('.unit').style.transform = "translate(0, -10px)";
    }

    animateDown() {
        this.shadowRoot.querySelector('.unit').style.transform = "translate(0, 10px)";
    }


}

customElements.define('app-unit', Unit);