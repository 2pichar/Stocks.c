import './types' // get types
import request from './request';
import * as util from './utils';
var getStockData = async function(ticker: str = "", type:str = "price"){
  var url: str = `https://query1.finance.yahoo.com/v7/finance/download/${ticker}?interval=1d&events=current&includeAdjustedClose=true`;
  var csv: str = await request(url);
  var data: (str | int | Date)[][] = util.parseCsv(csv);
  data[1][0] = new Date(data[1][0])
  for(let i = 1; i < data[1].length; i++){
    data[1][i] = +data[1][i];
  }
  switch(type){
    case "price": return data[1][5];
    case "volume": return data[1][6];
    case "open": return data[1][1];
    case "close": return data[1][5];
    default: return data[1][5];
  }
}
var getStockHistory = async function (ticker: str = "", type: str = "price", period: str = Periods.Year_1) {
  var endDate: Date = new Date((new Date()).toLocaleDateString());
  var endYear: int = endDate.getFullYear();
  var endMonth: int = endDate.getMonth();
  var endDay: int = endDate.getDate();
  var startDate: Date = null;
  switch (period) {
    case Periods.Day:
      startDate = new Date(endYear, endMonth, endDay - 1);
      break;
    case Periods.Week:
      startDate = new Date(endYear, endMonth, endDay - 7);
      break;
    case Periods.Month_1:
      startDate = new Date(endYear, endMonth - 1, endDay);
      break;
    case Periods.Month_3:
      startDate = new Date(endYear, endMonth - 3, endDay);
      break;
    case Periods.Month_6:
      startDate = new Date(endYear, endMonth - 6, endDay);
      break;
    case Periods.YTD:
      startDate = new Date(endYear, 0, 1);
      break;
    case Periods.Year_1:
      startDate = new Date(endYear - 1, endMonth, endDay);
      break;
    case Periods.Year_2:
      startDate = new Date(endYear - 2, endMonth, endDay);
      break;
    default:
      startDate = new Date(endYear - 1, endMonth, endDay);
  }
  var url: str = `https://query1.finance.yahoo.com/v7/finance/download/${ticker}?interval=1d&events=current&includeAdjustedClose=true&period1=${startDate.valueOf() / 1000}&period2=${endDate.valueOf() / 1000}`;
  var csvd: str = await request(url);
  var data: (str | int | Date)[][] = util.parseCsv(csvd);
  for (let i in data) {
    data[i][0] = new Date(data[i][0]);
    for (let j = 1; j < data[i].length; j++) {
      data[i][j] = +(data[i][j]);
    }
  }
  var ret: StockHistory;
  let i;
  switch (type) {
    case "price":
      for (i of data) {
        if (typeof i === "string") {
          continue;
        }
        ret.push([i[0], i[1]]);
      }
      break;
    case "open":
      for (i of data) {
        if (typeof i === "string") {
          continue;
        }
        ret.push([i[0], i[1]]);
      }
      break;
    case "high":
      for (i of data) {
        if (typeof i === "string") {
          continue;
        }
        ret.push([i[0], i[2]]);
      }
      break;
    case "low":
      for (i of data) {
        if (typeof i === "string") {
          continue;
        }
        ret.push([i[0], i[3]]);
      }
      break;
    case "close":
      for (i of data) {
        if (typeof i === "string") {
          continue;
        }
        ret.push([i[0], i[4]]);
      }
      break;
    case "adjclose":
      for (i of data) {
        if (typeof i === "string") {
          continue;
        }
        ret.push([i[0], i[5]]);
      }
      break;
    case "volume":
      for (i of data) {
        if (typeof i === "string") {
          continue;
        }
        ret.push([i[0], i[6]]);
      }
      break;
  }
  console.log(ret);
  return ret;
};

var getStocks = async function(exch: str = "all"): Promise<str[]>{
  exch = exch.toLowerCase();
  var exchs: str[] = ["all", "nasdaq", "nyse"];
  if (!exchs.includes(exch)){
    throw new Error("Invalid exchange");
  }
  var csv: str;
  var url: str;
  if(exch === "nasdaq"){
    url = ndxlsturl;
  } else if(exch == "nyse"){
    url = ndxlsturl;
  } else {
    //exch == "all"
    var ndx = await getStocks("nasdaq");
    var nyse = await getStocks("nyse");
    return [...ndx, ...nyse];
  }
  csv = await request(url);
  var data: str[][] = util.parseCsv(csv);
  var tickers: str[] = data[0].slice(1);
  return tickers;
}

var _analyze = function (data: int[]): int {
  let score: int = 0;
  let chng = data.last() - data[0];
  if (chng < 0) return -10;
  let counts = {
    up: 0,
    down: 0
  };
  data.reduce((_prev, _acc, ind, arr) => {
    if (arr[ind] > arr[ind - 1]) { // Up Day Gain
      counts.up++;
    } else
      if (arr[ind] == arr[ind - 1]) { // Flat Day Gain
        counts.up++;
      }
      else { // Down Day Gain
        counts.down++;
      }
    return null;
  });
  if (counts.up > counts.down) {
    score++;
  }
  let doubled = data.last() / data[0] >= 2;
  if (doubled) {
    score++;
  }
  let sma = {
    20: [],
    50: [],
    200: []
  };
  // Get Moving Average Data
  let i: int;
  for (i = 20; i < data.length; i++) {
    sma[20].push(util.avg(...(data.slice(i - 20, i))));
    if (i >= 50) {
      sma[50].push(util.avg(...(data.slice(i - 50, i))));
      if (i >= 200) {
        sma[200].push(util.avg(...(data.slice(i - 200, i))));
      }
    }
  }
  let smaOrdered = ((sma[20]).last() > (sma[50]).last() && (sma[50]).last() > (sma[200]).last());
  if (smaOrdered) {
    score++;
  }
  return score;
};
var analyze = async function (stocks: str[]): Promise<{ str: bool }> {
  let picks: { str: bool };
  let stock: str;
  for (stock of stocks) {
    let data: StockHistory = await getStockHistory(stock);
    let values: int[];
    let i: StockData;
    for (i of data) {
      values.push(i[1]);
    }
    let score: int = _analyze(values);
    picks[stock] = score;
  }
  return picks;
}
export default analyze;
export {analyze, getStockHistory, getStockData, getStocks};
module.exports = {
  analyze,
  getStockHistory,
  getStockData,
  getStocks
};