
/*
spreadsheet variable naming convention:
  sheetname: gainstithing
  sheetnameCELLREF: gainstithingA1
*/
function showCharts(){
  var current = sheet.getCurrentCell();
  var ticker = current.getValue();
  var charts = sheet.getSheetByName("Chart");
  var chartsA1 = charts.getRange("A1");
  var chartsB1 = charts.getRange("B1");
  chartsA1.setValue("");
  chartsB1.setValue(ticker);
  charts.activate();
  return;
}

function Buy(){
  beginOrder("Buy");
}

function Sell(){
  beginOrder("Sell");
}

function beginOrder(type){
  var current = sheet.getCurrentCell();
  var ticker = current.getValue();
  var orders = sheet.getSheetByName("orders");
  var ordersB2 = orders.getRange("B2");
  var ordersC2 = orders.getRange("C2");
  var ordersD2 = orders.getRange("D2");
  var ordersE2 = orders.getRange("E2");
  var ordersF2 = orders.getRange("F2");
  ordersB2.setValue(ticker);
  ordersC2.setValue("");
  ordersD2.setValue(type);
  ordersE2.setValue("");
  ordersF2.setValue("");
  orders.activate();
  return;
}

function sendOrder(){
  var orders = sheet.getSheetByName("Orders");
  var ordersA2 = orders.getRange("A2");
  var ordersB2 = orders.getRange("B2");
  var ordersC2 = orders.getRange("C2");
  var ordersD2 = orders.getRange("D2");
  var ordersE2 = orders.getRange("E2");
  var ordersF1 = orders.getRange("F1");
  var ordersF2 = orders.getRange("F2");
  var accnt = ordersA2.getValue();
  var ticker = ordersB2.getValue();
  var shares = ordersC2.getValue();
  var tType = ordersD2.getValue();
  var oType = ordersE2.getValue();
  var amt;
  if(ordersF1 !== null){
    amt = ordersF2.getValue();
  }
  var recipient = 'david.ludden@gmail.com';
  var subject = 'STOCKS - ' + tType.toUpperCase() + ' ' + ticker;
  var body = tType + " " + shares + " share(s) " + ticker + ((oType === "Market")? " @ Market" : (oType === "Limit")? " Limit @ $" + amt : (oType === "Trailing $")? " Trailing @ $" + amt: " Trailing @ " + amt + "%") + " in " + accnt + "’s Account.";
  var options = {
    name: sheetname + " Automated Order Processer"
  };
  ordersA2.clearContent();
  ordersB2.clearContent();
  ordersC2.clearContent();
  ordersD2.clearContent();
  ordersE2.clearContent();
  ordersF2.clearContent();
  MailApp.sendEmail(recipient, subject, body, options);
  ui.alert("Order has been sent. Please notify recipient of order status. Thanks!");
  return;
}