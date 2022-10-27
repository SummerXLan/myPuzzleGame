const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property
  speed: number = 30;
  //onLoad() {}
  start() {}

  update(dt) {
    this.node.x -= this.speed * dt;
    if (this.node.x < -0) {
      this.node.x = 1437;
    }
  }
}
