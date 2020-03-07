const listenMap = new Map();
export default {
  on: function (event, cb) {
    if (!listenMap.has(event)) {
      listenMap.set(event, new Map);
    }
    const mapLen = listenMap.get(event).size;
    listenMap.get(event).set(mapLen, cb);
    // 返回一个取消listen方法
    return function (){
        return listenMap.get(event).delete(mapLen);
      };
  },

  emit: function (event, ...arg) {
    const maps = listenMap.get(event);
    if (maps) {
      maps.forEach((cb) => {
        cb && cb(...arg);
      });
    }
  },
}
