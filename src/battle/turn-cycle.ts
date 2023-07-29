// import { $store } from "../store";
// import { Unit } from "../units/unit";
// import { BattleManager } from "./battle-manager";

// export class TurnCycle {
//   battleManager: BattleManager;
//   onNewEvent: (params: any) => any;

//   currentTeam: "player" | "enemy" = "player";
//   caster: Unit;
//   casterTarget: Unit;

//   get isPlayersTurn() {
//     return this.currentTeam === 'player';
//   }

//   constructor(battleManager: BattleManager, onNewEvent: (params: any) => any) {
//     this.battleManager = battleManager;
//     this.onNewEvent = onNewEvent; // calling this function emits the event to the battleManager

//     this.caster = $store.getPlayer();
//     this.casterTarget = $store.getEnemies()[0];
//   }

//   async turn(): Promise<any> {
//     this.setCasterAndTarget();
//     // if (this.caster && !this.casterTarget) {
//     //   await this.onNewEvent({
//     //     type: "textMessage",
//     //     text: "The battle has been won!",
//     //   });

//     //   await this.onNewEvent({
//     //     type: "newLevel",
//     //   });
//     //   return;
//     // }
//     // if (!this.caster) {
//     //   if (!this.casterTarget) {
//     //     return;
//     //   }
//     //   this.endCurrentTeamsTurn();
//     //   return this.turn();
//     // }

//     // this.setCasterOverlay();

//     const turnDecision = await this.onNewEvent({
//       // wait for the caster to do an actions
//       type: "turnHandler",
//       caster: this.caster,
//       casterTarget: this.casterTarget,
//     });

//     const resultingEvents = turnDecision.action.success || [];
//     for (let i = 0; i < resultingEvents.length; i++) {
//       const event = {
//         ...resultingEvents[i],
//         turnDecision,
//         action: turnDecision.action,
//         caster: this.caster,
//         target: turnDecision.target,
//       };

//       await this.onNewEvent(event); // wait for this.onNewEvent to be finished/resolved in the battleManager
//     }

//     this.endCasterTurn();

//     setTimeout(() => {
//       // todo: wait for animation of turn before starting the next
//       this.turn();
//     }, 750);
//   }

//   async init() {
//     await this.onNewEvent({
//       // wait for the message to be confirmed?
//       type: "textMessage",
//       text: "The battle is starting",
//     });

//     // start the first turn
//     this.turn();
//   }

//   setCasterAndTarget() {
//     // who's turn is it: the caster
//     if (this.currentTeam === 'player') {
//       this.caster = $store.getPlayer();
//     } else {
//       const caster = $store.getEnemies()?.find((enemy) => !enemy.didTurn);
//       if (caster) {
//         this.caster = caster;
//       } else {
//         this.endCurrentTeamsTurn();

//       }
//     }

//     this.casterTarget =
//       this.currentTeam === "player"
//         ? $store.getEnemies()[0]
//         : $store.getPlayer();
//   }

//   endCurrentTeamsTurn() {
//     this.currentTeam = this.currentTeam == "player" ? "enemy" : "player";
//   }

//   endCasterTurn() {
//     if (this.currentTeam == "enemy") {
//       this.caster.didTurn = true;
//       const enemies = $store.getEnemies();
//       if (enemies.every((enemy) => enemy.didTurn)) {
//         this.currentTeam = "player";
//         for (const enemy of enemies) {
//           enemy.didTurn = false;
//         }
//       }
//     } else if (this.currentTeam == "player") {
//       this.currentTeam = this.currentTeam == "player" ? "enemy" : "player";
//     }
//   }

//   // setCasterOverlay(caster) {
//   //   for (let ob of $store.getGameObjects()) {
//   //     ob.overlay = undefined;
//   //   }
//   //   this.caster.overlay = overlayDictionary.isCurrentTurn;
//   // }
// }
