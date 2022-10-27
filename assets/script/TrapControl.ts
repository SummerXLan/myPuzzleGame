import playerControl from "./PlayerControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class trapTrigger extends cc.Component {
  player: playerControl = null;
  onCollisionEnter(other, self) {
    this.player = other.getComponent(playerControl);
    this.player.resetHero();
  }
}
