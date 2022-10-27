const { ccclass, property } = cc._decorator;

@ccclass
export default class ropeMove extends cc.Component {
  onLoad() {
    this.node.on(
      cc.Node.EventType.TOUCH_START,
      function (t) {
        console.log("触摸开始");
      },
      this
    );
    //监听
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
    //this.node.on(cc.Node.EventType.TOUCH_MOVE,this.on_touch_move,this);
    //触摸抬起
    this.node.on(
      cc.Node.EventType.TOUCH_END,
      function (t) {
        console.log("触摸内结束");
      },
      this
    );
    this.node.on(
      cc.Node.EventType.TOUCH_CANCEL,
      function (t) {
        console.log("触摸外开始");
      },
      this
    );
  }

  on_touch_move(t) {
    //定义一个n_pos变量存储当前触摸点的位置
    var n_pos = t.getLocation();
    console.log(n_pos, n_pos.x, n_pos.y);

    var delta = t.getDelta();

    this.node.x += delta.x;
    this.node.y += delta.y;
  }
}
