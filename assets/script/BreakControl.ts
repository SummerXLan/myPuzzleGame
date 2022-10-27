const { ccclass, property } = cc._decorator;

@ccclass
export default class breakControl extends cc.Component {
  @property
  hp: number = 10;
  sprite: cc.SpriteFrame = null;
  @property(cc.Node)
  trigger: cc.Node = null;
  start() {
    this.sprite = this.getComponent(cc.Sprite).spriteFrame;
    console.debug(this.trigger == null);
  }

  onCollisionEnter(other, self) {
    this.hp -= 2;
    console.debug("trigger");
    if (this.hp < 0) {
      this.enableTrigger();
      this.node.destroy();
    }
  }

  enableTrigger() {
    let self = this;
    setTimeout(function () {
      //self.trigger.enabled = true;
      self.trigger.active = true;
      console.debug("success");
    }, 1000);
  }
}
