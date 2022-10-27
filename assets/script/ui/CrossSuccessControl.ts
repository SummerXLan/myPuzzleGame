import crossControl from "./CrossControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class crossSuccessControl extends cc.Component {
  static passNum: number = 0;
  door: cc.Node = null;
  @property(cc.Node)
  boxes: cc.Node[] = [];
  onLoad() {
    crossSuccessControl.passNum = 0;
    this.door = cc.find("door");
  }

  start() {}

  checkPassNum() {
    if (crossSuccessControl.passNum == 6) {
      this.door.active = false;
      for (let i = 0; i < this.boxes.length; i++) {
        let cross = this.boxes[i].getComponent(crossControl);
        cross.stopAllTimeout();
        cross.enabled = false;
      }
    }
  }
}
