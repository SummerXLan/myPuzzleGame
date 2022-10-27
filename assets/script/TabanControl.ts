const { ccclass, property } = cc._decorator;

@ccclass
export default class TabanControl extends cc.Component {
  anim: cc.Animation = null;
  door: cc.Node = null;
  onLoad() {
    this.anim = this.getComponent(cc.Animation);
    this.door = cc.find("door");
  }

  /*onBeginContact(contact, self, other) {
    let normal: cc.Vec2 = contact.getWorldManifold().normal;
    if (normal.y == 1) {
      console.debug("Taban collider");
      this.anim.enabled = false;
    }
  }*/

  onCollisionEnter(other, self) {
    console.debug("trigger");
    this.anim.play("push");
    this.door.active = false;
  }

  onCollisionExit(other, self) {
    console.debug("trigger out");
    this.anim.play("pop");
    this.door.active = true;
  }
}
