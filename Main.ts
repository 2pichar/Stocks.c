type str = string;
type int = number;
type bool = boolean;

var Periods =  {
  YTD:'YTD',
  Month_1:'Month_1',
  Month_3:'Month_3',
  Month_6:'Month_6',
  Year_1:'Year_1',
  Year_2:'Year_2'
}
const msPerDay = 1000*60*60*24;

const urlFetch = UrlFetchApp;
const util = Utilities;
const sheet = SpreadsheetApp.getActiveSpreadsheet();
const sheetname = sheet.getName();
var ui: GoogleAppsScript.Base.Ui = null
function onOpen(e){
  //create custom menu
  ui = SpreadsheetApp.getUi();
  var scriptsMenu = ui.createMenu("Stocks");
  scriptsMenu.addItem("Show Charts", "showCharts");
  scriptsMenu.addItem("Buy Stock", "Buy");
  scriptsMenu.addItem("Sell Stock", "Sell");
  scriptsMenu.addToUi();
}

var getStockData = function(ticker: str = "", type: str = "price"){
  var url: str = `https://query1.finance.yahoo.com/v7/finance/download/${ticker}?interval=1d&events=current&includeAdjustedClose=true`;
  var csv: str = urlFetch.fetch(url).getContentText();
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

var getStockHistory = function(ticker: str = "", type: str = "price", period: str = Periods.Year_1){
  var endDate: Date = new Date((new Date()).toLocaleDateString());
  var endYear: int = endDate.getFullYear();
  var endMonth: int = endDate.getMonth();
  var endDay: int = endDate.getDate();
  var startDate: Date = null;
  switch(period){
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
  var csv: str = urlFetch.fetch(url).getContentText();
  var data: (str | int | Date)[][] = util.parseCsv(csv);
  for (let i in data){
    data[i][0] = new Date(data[i][0]);
    for(let j = 1; j < data[i].length; j++){
      data[i][j] = +(data[i][j]);
    }
  }
  Logger.log(data)
}

var test = function(){
  getStockHistory('AAPL');
}