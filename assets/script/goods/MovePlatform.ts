const { ccclass, property } = cc._decorator;

@ccclass
export default class movePlatform extends cc.Component {
  @property
  speed: number = 5;
  rb: cc.RigidBody = null;
  onLoad() {
    this.rb = this.getComponent(cc.RigidBody);
    cc.director.getPhysicsManager().enabled = true;
  }

  start() {
    this.rb.linearVelocity = new cc.Vec2(this.speed, 0);
  }

  onCollisionEnter(other, self) {
    if (other.tag == 1) {
      this.rb.linearVelocity = new cc.Vec2(-this.rb.linearVelocity.x, 0);
    }
  }
}
