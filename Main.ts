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

var test = function(){
  getStockHistory('AAPL');
}