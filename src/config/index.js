const config = {
    requestUrl: '',
    uploadUrl: '',
    socketUrl: '',
};

const isDev = true && process.env.NODE_ENV === 'development';
if(isDev) {
    config.requestUrl = "http://127.0.0.1:3003/";
    config.uploadUrl = "http://127.0.0.1:3002/";
    // config.socketUrl = "ws://sockect.test.xin";
    config.socketUrl = "ws://127.0.0.1:3004";
    // config.socketUrl = "ws://sockect.bubaocloud.xin";
    // config.socketUrl = "ws://127.0.0.1:3100";
} else {
    config.requestUrl = "http://api2.bubaocloud.xin/";
    config.uploadUrl = "http://upload.bubaocloud.xin/";
    config.socketUrl = "ws://sockect.bubaocloud.xin";
}

module.exports = config