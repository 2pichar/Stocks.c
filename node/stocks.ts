import  './types' // get types
import request from './request';
import * as utils from './utils';
var getStockHistory = async function(ticker: str = "", type: str = "price", period: str = Periods.Year_1){
    var endDate: Date = new Date((new Date()).toLocaleDateString());
    var endYear: int = endDate.getFullYear();
    var endMonth: int = endDate.getMonth();
    var endDay: int = endDate.getDate();
    var startDate: Date = null;
    switch(period){
      case Periods.Day:
        startDate = new Date(endYear, endMonth, endDay - 1);
        break;
      case Periods.Week:
        startDate = new Date(endYear, endMonth, endDay - 7);
        break;
      case Periods.Month_1:
        startDate = new Date(endYear, endMonth-1, endDay);
        break;
      case Periods.Month_3:
        startDate = new Date(endYear, endMonth-3, endDay);
        break;
      case Periods.Month_6:
        startDate = new Date(endYear, endMonth-6, endDay);
        break;
      case Periods.YTD:
        startDate = new Date(endYear, 0, 1);
        break;
      case Periods.Year_1:
        startDate = new Date(endYear-1, endMonth, endDay);
        break;
      case Periods.Year_2:
        startDate = new Date(endYear-2, endMonth, endDay);
        break;
      default:
        startDate = new Date(endYear-1, endMonth, endDay);
    }
    var url: str = `https://query1.finance.yahoo.com/v7/finance/download/${ticker}?interval=1d&events=current&includeAdjustedClose=true&period1=${startDate.valueOf()/1000}&period2=${endDate.valueOf()/1000}`;
    var csvd: str = await request(url);
    var data: (str | int | Date)[][] = utils.parseCSV(csvd);
    for (let i in data){
      data[i][0] = new Date(data[i][0]);
      for(let j = 1; j < data[i].length; j++){
        data[i][j] = +(data[i][j]);
      }
    }
    var ret: StockHistory;
    let i;
    switch (type){
      case "price":
        for(i of data){
          if(typeof i === "string"){
            continue;
          }
          ret.push([i[0], i[1]]);
        }
        break;
      case "open":
        for(i of data){
          if(typeof i === "string"){
            continue;
          }
          ret.push([i[0], i[1]]);
        }
        break;
      case "high":
        for(i of data){
          if(typeof i === "string"){
            continue;
          }
          ret.push([i[0], i[2]]);
        }
        break;
      case "low":
        for(i of data){
          if(typeof i === "string"){
            continue;
          }
          ret.push([i[0], i[3]]);
        }
        break;
      case "close":
        for(i of data){
          if(typeof i === "string"){
            continue;
          }
          ret.push([i[0], i[4]]);
        }
        break;
      case "adjclose":
        for(i of data){
          if(typeof i === "string"){
            continue;
          }
          ret.push([i[0], i[5]]);
        }
        break;
      case "volume":
        for(i of data){
          if(typeof i === "string"){
            continue;
          }
          ret.push([i[0], i[6]]);
        }
        break;
    }
    console.log(ret);
    return ret;
  }