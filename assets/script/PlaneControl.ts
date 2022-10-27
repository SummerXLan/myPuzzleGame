import { PoolManager } from "./PoolManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class planeControl extends cc.Component {
  @property
  speed: number = 10;
  onLoad() {
    cc.director.getCollisionManager().enabled = true;
  }

  update(dt) {
    this.node.y -= this.speed * dt;
  }

  onCollisionEnter(other, self) {
    if (other.node.group == "player") {
      let curScene: string = cc.director.getScene().name;
      cc.director.loadScene(curScene);
      cc.log("rese4t");
    }
    PoolManager.instance.put(this.node);
  }
}
