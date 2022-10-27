const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label)
  p_Text: cc.Label = null;
  p_Bar: cc.ProgressBar = null;
  @property
  p_Speed: number = 10;

  p_flag: number = 0;
  door: cc.Node = null;
  onLoad() {
    this.p_Bar = this.getComponent(cc.ProgressBar);
    this.door = cc.find("door");
  }

  start() {}

  update(dt) {
    this.setProcess(dt);
    if (this.p_Bar.progress >= 1) {
      this.door.active = false;
      this.p_Text.string = "success";
      this.enabled = false;
    }
  }

  setProcess(dt) {
    if (this.p_Bar.progress <= 0.9 && this.p_flag == 0) {
      this.p_Bar.progress += dt * this.p_Speed;
    } else if (this.p_flag != 0) {
      this.p_Bar.progress += dt * this.p_Speed * this.p_flag;
    }
  }

  onBeginContact(contact, self, other) {
    if (other.tag == 1) {
      //right
      this.p_flag = 1;
    } else if (other.tag == 2) {
      this.p_flag = -1;
    }
  }
}
