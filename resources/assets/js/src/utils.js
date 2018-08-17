const axios = require('axios');

const Instance = axios.create({
    baseURL: 'http://localhost:8000/api/auth'
  });

  Instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  Instance.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
  Instance.defaults.headers.Accept = 'application/json';
  Instance.defaults.headers.Authorization = localStorage.getItem('userToken');
  
  Instance.changeToken = (token) => {
    localStorage.setItem('userToken', token);
    Instance.defaults.headers.Authorization = token;
  }

module.exports = Instance;