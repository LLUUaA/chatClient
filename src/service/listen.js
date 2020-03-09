const listenMap = new Map();
export default {
  on: function (event, cb) {
    if (!listenMap.has(event)) {
      listenMap.set(event, new Map);
    }
    const mapLen = listenMap.get(event).size;
    listenMap.get(event).set(mapLen, cb);

    return {
      // 返回一个取消listen方法
      cancel: function () {
        listenMap.get(event).delete(mapLen);
      },
    }
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
