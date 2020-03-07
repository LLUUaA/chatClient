const config = {
    requestUrl: '',
    uploadUrl: '',
};
const isDev = process.env.NODE_ENV === 'development';
if(isDev) {
    config.requestUrl = "http://127.0.0.1:3001/";
    config.uploadUrl = "http://127.0.0.1:3003/"
} else {
    config.requestUrl = "http://api2.bubaocloud.xin/";
    config.uploadUrl = "http://upload.bubaocloud.xin/"
}

module.exports = config