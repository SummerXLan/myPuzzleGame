import boxClick from "./BoxClick";

const { ccclass, property } = cc._decorator;

@ccclass
export default class checkNumber extends cc.Component {
  @property(boxClick)
  boxNum: boxClick[] = [];
  @property(cc.Node)
  door: cc.Node = null;

  checkCurrentNum() {
    if (
      this.boxNum[0].curNum == 1 &&
      this.boxNum[1].curNum == 2 &&
      this.boxNum[2].curNum == 4
    ) {
      console.debug("success");
      this.door.active = false;
    }
  }
}
