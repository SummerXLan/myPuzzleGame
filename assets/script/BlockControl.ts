const { ccclass, property } = cc._decorator;

@ccclass
export default class blockControl extends cc.Component {
  onLoad() {
    this.node.on(
      cc.Node.EventType.TOUCH_MOVE,
      function (event) {
        var delta = event.touch.getDelta();
        this.x += delta.x;
        this.y += delta.y;
      },
      this.node
    );
  }
}
