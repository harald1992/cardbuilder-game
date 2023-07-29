// import { $utilService } from "../utils/utilService";
// import { BattleManager } from "./battle-manager";
// import { TurnHandler } from "./turn-handler";

// export class BattleEvent {
//   event: any;
//   battleManager: BattleManager;

//   constructor(event: any, battleManager: BattleManager) {
//     this.event = event;
//     this.battleManager = battleManager;
//   }

//   init(resolve: any) {
//     console.log('----');

//     console.log(this.event.type);
//     console.log(resolve);
//     console.log('----');

//     // this[this.event.type](resolve);

//     (this as any)[this.event.type as any](resolve);
//   }

//   textMessage(resolve: any) {
//     const text = this.event.text
//       .replace("{CASTER}", this.event.caster?.name)
//       .replace("{TARGET}", this.event.target?.name)
//       .replace("{ACTION}", this.event.action?.name);

//     const message = {
//       text,
//       onComplete: () => {
//         resolve();
//       },
//     };

//     console.info(message.text);
//     // messageService.setMessage(message.text);
//     message.onComplete();
//   }

//   turnHandler(resolve: any) {
//     console.log('turnhandler,', resolve);

//     const turnHandler = new TurnHandler(
//       this.event.caster,
//       this.event.enemy,
//       (turnDecision: any) => {
//         // what move to use, who to use it on
//         resolve(turnDecision);
//       }
//     );
//     turnHandler.init();
//   }

//   async stateChange(resolve: any) {
//     // make it async whenever you use an await somewhere in the function.
//     const { target, caster, damage } = this.event;
//     if (damage) {
//       // target starts blinking
//       // target loses hp
//       // target.overlay = overlayDictionary.damaged;
//     }

//     await $utilService.wait(600);
//     target.receiveDamage(damage);
//     target.overlay = null;
//     // stop blinking
//     resolve();
//   }

//   newLevel(resolve: any) {
//     console.log("new level");
//     /* TODO: saveChanges and reload */
//     location.reload();
//   }
// }
