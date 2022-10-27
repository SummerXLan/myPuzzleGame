const { ccclass, property } = cc._decorator;

@ccclass
export default class doorFall extends cc.Component {
  rb: cc.RigidBody = null;
  @property
  speed: number = 10;
  onLoad() {
    cc.director.getPhysicsManager().enabled = true;
    this.rb = this.getComponent(cc.RigidBody);
  }

  start() {
    this.rb.linearVelocity = new cc.Vec2(0, -this.speed);
  }

  update(dt) {}

  onBeginContact(contact, self, other) {
    if (other.tag == 0) {
      console.debug("contact");
      this.rb.linearVelocity = new cc.Vec2(0, 0);
    }
  }

  stopMove() {
    this.rb.linearVelocity = new cc.Vec2(0, 0);
  }
}
