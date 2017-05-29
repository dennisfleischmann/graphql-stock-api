
const exposeStockData = stock => ({
  Code: stock.code,
  Price: stock.dataset_data.data[0][4],
  Exchange: '?',
  Diff: (stock.dataset_data.data[0][4] - stock.dataset_data.data[1][4]).toFixed(2),
});

module.exports = {
  exposeStockData,
};
