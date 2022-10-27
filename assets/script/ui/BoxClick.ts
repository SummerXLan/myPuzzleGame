import checkNumber from "./CheckNumber";

const { ccclass, property } = cc._decorator;

@ccclass
export default class boxClick extends cc.Component {
  curNum: number = 0;
  myLabel: cc.Label = null;
  @property(checkNumber)
  checkNum: checkNumber = null;
  onLoad() {
    this.myLabel = this.getComponentInChildren(cc.Label);
    let self = this;
    this.node.on(
      cc.Node.EventType.TOUCH_START,
      function (event) {
        self.changeNum();
      },
      this.node
    );
  }

  start() {}

  // update (dt) {}
  changeNum() {
    this.curNum++;
    //cc.log("touch");
    if (this.curNum >= 10) {
      this.curNum = 0;
    }

    this.myLabel.string = this.curNum.toString();
    this.checkNum.checkCurrentNum();
  }
}
