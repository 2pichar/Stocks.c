import * as stocks from './stocks';

/**
 * Gets a list of stocks in a given exchange, analyzes them, and returns the result.
 * @param exchange The exchange to get the stocks from.
 * @returns A list of stocks from the exchange that are at a good buy point.
 * @throws An error if the exchange is not supported.
 */

var analyzeStocks = async function (exchange: string): Promise<{str: bool}> {
	var stockList = await stocks.getStocks(exchange);
	return stocks.analyze(stockList);
}