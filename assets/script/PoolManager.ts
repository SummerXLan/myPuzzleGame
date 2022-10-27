const { ccclass, property } = cc._decorator;

@ccclass
export class PoolManager extends cc.Component {
  public static instance: PoolManager;

  onLoad() {
    PoolManager.instance = this;

    // 初始化预制体name到map中存为索引值，new预制体数量的NodePool
    for (let i = 0; i < this.prefab.length; i++) {
      this.prefabMap[this.prefab[i].name] = i;
      this.poolMap[this.prefab[i].name + "Pool"] = new cc.NodePool();
    }

    for (let key in this.prefabMap) {
      cc.log(key + this.prefabMap[key]);
    }
  }

  /**(1)需要建立对象池的预制体 */
  @property(cc.Prefab)
  public prefab: cc.Prefab[] = [];
  public prefabMap: { [key: string]: number } = {};
  public poolMap: { [key: string]: cc.NodePool } = {};

  /**(2)不需要建立对象池的预制体 */
  @property(cc.Prefab)
  public playerSkin: cc.Prefab[] = []; // 玩家皮肤

  /**从对象池取出 */
  public get(prefabName: string, parent: cc.Node, pos: cc.Vec2): cc.Node {
    let i: number = this.prefabMap[prefabName];
    if (i == undefined) {
      console.log("预制体不存在或未加载（未拖拽）");
      return;
    }
    let getNode = this.poolMap[prefabName + "Pool"].get();
    if (this.poolMap[prefabName + "Pool"].size() > 0) {
      getNode.active = true;
    } else {
      getNode = cc.instantiate(this.prefab[i]);
      getNode.active = true;
    }
    getNode.setParent(parent);
    getNode.setPosition(pos);
    //cc.log("取出成功");
    return getNode;
  }

  /**放回对象池 */
  public put(putNode: cc.Node) {
    putNode.active = false;
    this.poolMap[putNode.name + "Pool"].put(putNode);
    //cc.log("放回成功");
  }
}
