const { ccclass, property } = cc._decorator;

@ccclass
export default class clamCheck extends cc.Component {
  rb: cc.RigidBody = null;
  timer: number = 0;
  @property
  waitTime: number = 5;
  @property(cc.Node)
  block: cc.Node = null;
  @property(cc.Node)
  paltform: cc.Node = null;
  onLoad() {
    this.rb = cc.find("Player").getComponent(cc.RigidBody);
  }

  start() {}

  update(dt) {
    this.checkCalm(dt);
  }

  checkCalm(dt) {
    if (this.rb.linearVelocity.len() == 0) {
      this.timer += dt;
    } else {
      this.timer = 0;
    }
    if (this.timer >= this.waitTime) {
      console.debug("success");
      this.block.active = false;
      this.paltform.active = true;
      this.enabled = false;
    }
  }
}
