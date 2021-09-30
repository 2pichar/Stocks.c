type str = string;
type char = string;
type int = number;
type float = number;
type bool = boolean;

var Periods =  {
  YTD:'YTD',
  Day: 'Day',
  Week: 'Week',
  Month_1:'Month_1',
  Month_3:'Month_3',
  Month_6:'Month_6',
  Year_1:'Year_1',
  Year_2:'Year_2'
}

const ndxlsturl = "https://pkgstore.datahub.io/core/nasdaq-listings/nasdaq-listed-symbols_csv/data/595a1f263719c09a8a0b4a64f17112c6/nasdaq-listed-symbols_csv.csv";
const nyselsturl = "https://pkgstore.datahub.io/core/nyse-other-listings/nyse-listed_csv/data/3c88fab8ec158c3cd55145243fe5fcdf/nyse-listed_csv.csv";

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