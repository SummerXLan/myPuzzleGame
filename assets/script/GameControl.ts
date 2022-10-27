import playerControl from "./PlayerControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameControl extends cc.Component {
  player: playerControl = null;

  start() {
    this.player = cc.find("Player").getComponent(playerControl);
    let curScene: string = cc.director.getScene().name;
    if (curScene === "level19") {
      this.player.resetHero(27, 493);
      cc.log("sccess");
    } else {
      this.player.resetHero();
    }
  }

  // update (dt) {}
}
