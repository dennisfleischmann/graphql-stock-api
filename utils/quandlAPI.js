const axios = require('axios');
const { exposeStockData } = require('./mapper');

const fetchStockData = ({ code }) => {
  return axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${code}/data.json?api_key=${'hyFyxojQfFCYfK_6tesP'}&limit=5s`)
    .then(({ data }) => {
      console.log('quandlAPI.data', data);
      console.log('xposeStockData(data)', xposeStockData(data));
      return Object.assign(
        {}, 
        exposeStockData(data), 
        { code });
    })
    .catch(function(error) {
      console.log(error);
    });
}

module.exports = {
  fetchStockData
}