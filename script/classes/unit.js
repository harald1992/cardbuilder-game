import $store from "../store.js";

const style = document.createElement("style");
style.textContent = `
.unit {
    border: 1px solid black;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
 }

 img {
    width: 100px;
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
        console.log($store.getData());
        if (this.team === 'player') { this.data = $store.getData().playerData; }
        if (this.team === 'enemy') { this.data = $store.getData().enemyData; }

        this.render();
    }


}

customElements.define('app-unit', Unit);