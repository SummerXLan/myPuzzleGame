const { ccclass, property } = cc._decorator;

@ccclass
export default class playerControl extends cc.Component {
  @property
  xSpeed: number = 100;
  @property
  jumpHeight: number = 200;

  accLeft: boolean = false;
  accRight: boolean = false;
  isJump: boolean = false;

  rb: cc.RigidBody = null;
  onLoad() {
    cc.director.getPhysicsManager().enabled = true;
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }
  start() {
    this.rb = this.getComponent(cc.RigidBody);
  }

  update(dt) {
    if (this.accLeft) {
      this.node.x -= this.xSpeed * dt;
    } else if (this.accRight) {
      this.node.x += this.xSpeed * dt;
    }
  }

  onDestroy() {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }

  jumpAction() {
    this.rb.linearVelocity = new cc.Vec2(0, this.jumpHeight);
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = true;
        break;
      case cc.macro.KEY.d:
        this.accRight = true;
        break;
      case cc.macro.KEY.w:
        if (!this.isJump) {
          this.isJump = true;
          this.jumpAction();
        }
        break;
    }
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = false;
        break;
      case cc.macro.KEY.d:
        this.accRight = false;
        break;
    }
  }

  onBeginContact(contact, self, other) {
    let points = contact.getWorldManifold().points;
    if (points[0].y < 100) {
      this.isJump = false;
    }
  }
}
