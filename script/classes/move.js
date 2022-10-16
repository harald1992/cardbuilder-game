export class Move {
    constructor(name, damage) {
        this.name = name;
        this.baseDamage = damage;
    }

    resolve(attacker, target) {
        const damage = this.baseDamage + attacker.attack;
        target.currentHp -= damage;
    }
}