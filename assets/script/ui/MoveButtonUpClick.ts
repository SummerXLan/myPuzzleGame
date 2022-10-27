import playerControl from "../PlayerControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class jumpButtonClick extends cc.Component {
  player: playerControl = null;
  onLoad() {
    this.player = cc.find("Player").getComponent(playerControl);
    this.node.on(
      cc.Node.EventType.TOUCH_START,
      () => {
        this.player.onButtonJumpDown();
      },
      this.node
    );
  }
}
