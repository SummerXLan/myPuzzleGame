const { ccclass, property } = cc._decorator;

@ccclass
export default class keyControl extends cc.Component {
  door: cc.Node = null;
  onCollisionEnter(other, self) {
    this.door = cc.find("door");
    this.door.active = false;
    this.node.active = false;
  }
}
