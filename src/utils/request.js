const axios = require('axios');
// import config from 'config'
import { getSession,clearSession } from './session';
const baseUrl = 'http://localhost:3000/';
export default function (opt = {}) {
  return new Promise((resolve, reject) => {
    const session = getSession();
    opt.url = baseUrl + opt.url || '';
    axios({
      method: 'get',
      timeout: 6000,
      headers: {
        'access-control-allow': '*',
        'Access-Control-Allow-Origin': '*',
        'Authorization': session ? `SessionKey ${session}` : ''
      },
      ...opt
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      if(err.response && err.response.status === 401) {
        this.$router.push('/login')
      }
      reject(err.response)
    })
  })
}