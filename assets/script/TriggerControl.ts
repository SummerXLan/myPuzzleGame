const { ccclass, property } = cc._decorator;

@ccclass
export default class triggerControl extends cc.Component {
  @property
  sceneName: string = "0";
  onCollisionEnter(other, self) {
    if (other.node.group == "player") {
      cc.director.loadScene(this.sceneName);
    }
  }
}
