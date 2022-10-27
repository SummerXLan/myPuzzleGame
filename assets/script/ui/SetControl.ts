const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  panel: cc.Node = null;
  back() {
    cc.director.resume();
    this.panel.active = false;
  }
}
