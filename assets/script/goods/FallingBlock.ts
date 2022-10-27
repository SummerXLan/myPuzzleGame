const { ccclass, property } = cc._decorator;

@ccclass
export default class fallingBlock extends cc.Component {
  rb: cc.RigidBody = null;
  protected onLoad(): void {
    cc.director.getPhysicsManager().enabled = true;
    this.rb = this.getComponent(cc.RigidBody);
  }
  onBeginContact(contact, self, other) {
    if (other.tag == 2) {
      let normal: cc.Vec2 = contact.getWorldManifold().normal;

      if (normal.y <= -10) {
        //console.debug(this.rb.linearVelocity.y);
        let curScene: string = cc.director.getScene().name;
        cc.director.loadScene(curScene);
      }
    }
  }
}
