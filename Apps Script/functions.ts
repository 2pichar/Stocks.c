/**
* Use all of the functions and constants in the JS Math Object.
* @param {"sin"} key The math function or constant to be used.
* @param {1.5707963268} param Optional: The value to pass into the math function. 
* @customfunction
*/
function MATH(key, param){
  return (typeof(Math[key]) === "function") ? Math[key](param): Math[key];
}

/** 
 * Execute JavaScript code from within Google Sheets.
 * @param {"return a+b+c;"} codeString The string containing the body code for the function.
 * @param {["a", "b", "c"]} params An array or range of parameters that the function uses.
 * @param {1, 2, 3} parameters The parameters passed into the function after it is created.
 * @customfunction
*/
function JS(codeString, params = [], ...parameters){
  if(Array.isArray(params[0])){
    params.flat(Infinity);
  }
  return new Function(...params, codeString)(...parameters);
}

/**
 * Retrieve Stock Data From Yahoo Finance for multiple tickers
 * @param {"A1:A14"} tickers The tickers to retrieve stock data for
 * @param {"price"} type The type of data to retrieve. Either price, volume, open or close
 * @customfunction
 */
function STOCKS(tickers, type = "price"){
  tickers = tickers.flat(2);
  var return_table = [];
  for(let ticker of tickers){
    return_table.push([ticker, getStockData(ticker, type)]);
  }
  return return_table;
}

/**
 * Retrieve Stock Data from Yahoo Finance
 * @param {"AAPL"} ticker The ticker to retrieve stock data for
 * @param {"price"} type The type of data to retrieve. Either price, volume, open or close
 * @customfunction
 */
function STOCK(ticker, type = "price"){
  return getStockData(ticker, type)
}