import ws from "socket.io-client";

/**
 * 
 * @param {string} session 
 * @param {Function} cb 
 */
export default function (session, cb) {
  const socket = ws("ws://localhost:3001", {
    path: "/test",
    transports: ["websocket"],
    query: {
      token: session
    }
  });
  socket.on("connect", () => {
    cb && cb(socket); // callback
  });
  socket.on("error", err => {
    // console.log("socket", err);\
    cb && cb(null)
    try {
      const [errCode, errMsg] = err.split(",");
      if(Number(errCode) === 401) {
        socket.close();
        console.warn("socket disconnected:");
      }
    } catch (error) { }
  });
}
