import playerControl from "../PlayerControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class leftButtonClick extends cc.Component {
  player: playerControl = null;
  onLoad() {
    this.player = cc.find("Player").getComponent(playerControl);
    this.node.on(
      cc.Node.EventType.TOUCH_START,
      () => {
        this.player.onButtonLeftDown();
      },
      this.node
    );
    this.node.on(
      cc.Node.EventType.TOUCH_END,
      () => {
        this.player.onButtonLeftUp();
      },
      this.node
    );
  }
}
