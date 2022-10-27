cc.Class({
  extends: cc.Component,

  properties: {
    //这一整根绳子的锚点
    anchor: {
      default: null,
      type: cc.Node,
    },

    //存放每一个绳子小节（预制体）
    ropeCutPrefab: {
      default: null,
      type: cc.Prefab,
    },

    ropeEndPrefab: {
      default: null,
      type: cc.Prefab,
    },

    softDegree: 0, //绳子总的小节数，越多则绳子越柔软
  },

  onLoad() {
    cc.director.getPhysicsManager().enabled = true; //开启物理引擎
  },

  start() {
    var ropeCutArray = new Array(); //存放所有绳子小节的数组

    //遍历这个数组
    for (var i = 0; i < this.softDegree; i++) {
      if (i == this.softDegree - 1) {
        ropeCutArray[i] = cc.instantiate(this.ropeEndPrefab);
      } else {
        ropeCutArray[i] = cc.instantiate(this.ropeCutPrefab); //生成新的绳子小节存放到数组中
      }

      this.node.addChild(ropeCutArray[i]); //将绳子小节添加为Canvas的子节点，这里的this.node指的是Canvas

      //如果是第一个绳子小节，那么它的Connected Body就应该是anchor
      if (i == 0) {
        ropeCutArray[i].getComponent(cc.RopeJoint).connectedBody =
          this.anchor.getComponent(cc.RigidBody);
        //修改绳子的最大长度
        ropeCutArray[i].getComponent(cc.RopeJoint).maxLength =
          (this.anchor.width + ropeCutArray[i].width) / 2;
      }
      //如果是第2~n个绳子小节，那么它的Connected Body就应该是上一个绳子小节，直接数组索引-1就可以得到
      else {
        ropeCutArray[i].getComponent(cc.RopeJoint).connectedBody = ropeCutArray[
          i - 1
        ].getComponent(cc.RigidBody);
        //修改绳子的最大长度
        ropeCutArray[i].getComponent(cc.RopeJoint).maxLength =
          ropeCutArray[i].width;
      }

      //修改完RopeJoint的属性之后一定要调用apply()方法，不然所有修改都无效！
      ropeCutArray[i].getComponent(cc.RopeJoint).apply();
    }
  },

  // update (dt) {},
});
