import crossSuccessControl from "./CrossSuccessControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class crossControl extends cc.Component {
  @property
  curState: boolean = false;
  @property
  changeTime: number = 5000;

  sf: cc.Sprite = null;
  manager: crossSuccessControl = null;

  t = undefined;

  onLoad() {
    cc.director.getPhysicsManager().enabled = true;
    this.manager = cc.find("GameManager").getComponent(crossSuccessControl);
  }

  start() {
    this.sf = this.getComponentInChildren(cc.Sprite);
    //this.changeState();
  }

  onBeginContact(contact, self, other) {
    let normal: cc.Vec2 = contact.getWorldManifold().normal;
    if (normal.y == -1) {
      this.changeState();
      console.debug(this.curState);
    }
  }

  changeState() {
    this.curState = !this.curState;
    if (this.curState) {
      let self = this;
      cc.loader.loadRes("ui/gou", cc.SpriteFrame, function (err, sp) {
        self.sf.spriteFrame = sp;
        self.t = setTimeout(() => {
          self.changeState();
          console.debug("settimeout");
        }, self.changeTime);
      });
      crossSuccessControl.passNum++;
      this.manager.checkPassNum();
    } else {
      let self = this;
      cc.loader.loadRes("ui/chahao", cc.SpriteFrame, function (err, sp) {
        self.sf.spriteFrame = sp;
      });
      crossSuccessControl.passNum--;
    }
  }

  resetCurState() {
    this.curState = false;
    this.changeState();
  }

  stopAllTimeout() {
    clearTimeout(this.t);
  }

  protected onDestroy(): void {
    this.unscheduleAllCallbacks();
  }
}
