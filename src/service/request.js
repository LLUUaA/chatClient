const axios = require('axios');
import { requestUrl } from '../config';
import { getSession,clearSession } from './session';

export default function (opt = {}) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common['Authorization'] = `SessionKey ${getSession()}` ;
    axios({
      method: 'get',
      baseURL: requestUrl,
      timeout: 6000,
      headers: {
        'access-control-allow': '*',
        'Access-Control-Allow-Origin': '*'
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

