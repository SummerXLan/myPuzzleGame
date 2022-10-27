import doorFall from "../goods/DoorFall";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  panel: cc.Node = null;

  click() {
    if (cc.director.isPaused() == true) return;
    let curScene: string = cc.director.getScene().name;
    cc.director.loadScene(curScene);
  }

  stopClick() {
    cc.director.pause();
    this.panel.active = true;
  }

  fakeStop() {
    this.panel.active = true;
    cc.find("door").getComponent(doorFall).stopMove();
  }
}
