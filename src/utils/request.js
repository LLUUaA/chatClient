const axios = require('axios');
// import config from 'config'
const baseUrl = 'http://localhost:3000/';
export default function (opt = {}) {
  opt.url = baseUrl + opt.url || '';
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      timeout: 6000,
      headers: {
        'access-control-allow': '*',
        'Access-Control-Allow-Origin': '*',
      },
      ...opt
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
        reject(err.response)
      })
  })
}