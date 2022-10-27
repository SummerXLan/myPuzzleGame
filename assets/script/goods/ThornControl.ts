import playerControl from "../PlayerControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class thornControl extends cc.Component {
  player: playerControl = null;
  onLoad() {
    let self = this;
    this.node.on(
      cc.Node.EventType.TOUCH_START,
      function (event) {
        self.node.active = false;
      },
      this.node
    );
  }

  start() {}

  // update (dt) {}

  onCollisionEnter(other, self) {
    if (other.tag == 1) {
      this.player = other.getComponent(playerControl);
      this.player.resetHero(27, 493);
    }
  }
}
