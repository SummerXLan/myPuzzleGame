const { ccclass, property } = cc._decorator;

const enum PlayerState {
  normal,
  die,
}

@ccclass
export default class playerControl extends cc.Component {
  @property
  xSpeed: number = 20;
  @property
  jumpHeight: number = 200;

  accLeft: boolean = false;
  accRight: boolean = false;
  isJump: boolean = false;

  rb: cc.RigidBody = null;
  anim: cc.Animation = null;
  anima: string = null;

  state: PlayerState = null;

  onLoad() {
    cc.director.getPhysicsManager().enabled = true;
    cc.director.getCollisionManager().enabled = true;
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    this.state = PlayerState.normal;
  }
  start() {
    this.rb = this.getComponent(cc.RigidBody);
    this.anim = this.getComponent(cc.Animation);
  }

  update(dt) {
    let anima = this.anima;
    if (this.accLeft) {
      //this.node.x -= this.xSpeed * dt;
      this.rb.linearVelocity = new cc.Vec2(
        -this.xSpeed,
        this.rb.linearVelocity.y
      );
      anima = "walk";
    } else if (this.accRight) {
      //this.node.x += this.xSpeed * dt;
      this.rb.linearVelocity = new cc.Vec2(
        this.xSpeed,
        this.rb.linearVelocity.y
      );
      anima = "walk";
    } else {
      anima = "idle";
      this.rb.linearVelocity = new cc.Vec2(0, this.rb.linearVelocity.y);
    }

    if (anima) {
      this.setAnim(anima);
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
    if (cc.director.isPaused()) return;
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = true;
        this.accRight = false;
        this.node.scaleX = -2;
        break;
      case cc.macro.KEY.d:
        this.accRight = true;
        this.accLeft = false;
        this.node.scaleX = 2;
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
    if (other.tag == 0) {
      //let points = contact.getWorldManifold().points;
      let normal: cc.Vec2 = contact.getWorldManifold().normal;
      if (normal.y == -1) {
        this.isJump = false;
      }
    }
  }

  setAnim(animStr: string) {
    if (this.anima == animStr) return;

    this.anima = animStr;
    this.anim.play(animStr);
  }

  resetHero(posX: number = 30, poxY: number = 140) {
    this.node.x = posX;
    this.node.y = poxY;
    this.state = PlayerState.normal;
  }

  onButtonLeftDown() {
    this.accLeft = true;
    this.accRight = false;
    this.node.scaleX = -2;
  }

  onButtonLeftUp() {
    this.accLeft = false;
  }

  onButtonRightDown() {
    this.accRight = true;
    this.accLeft = false;
    this.node.scaleX = 2;
  }

  onButtonRightUp() {
    this.accRight = false;
  }

  onButtonJumpDown() {
    if (!this.isJump) {
      this.isJump = true;
      this.jumpAction();
    }
  }
}
