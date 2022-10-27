import { PoolManager } from "./PoolManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class planeCreator extends cc.Component {
  @property(cc.Node)
  pool: cc.Node = null;
  start() {
    //setInterval(this.createPlane, 1000);
    this.schedule(this.createPlane, 0.1);
  }

  createPlane() {
    let posX: number = Math.round(Math.random() * 1084 + 90);
    //let pos: cc.Vec2 = new cc.Vec2(740, 520);
    let pos: cc.Vec2 = new cc.Vec2(posX, 700);
    PoolManager.instance.get("plane", this.pool, pos);
  }
  protected onDestroy(): void {
    this.unscheduleAllCallbacks();
  }
}
