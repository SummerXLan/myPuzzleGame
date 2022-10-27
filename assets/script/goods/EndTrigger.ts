const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  start() {}

  onCollisionEnter(other, self) {
    if (other.node.group == "player") {
      this.label.string = "真没了......";
    }
  }
}
