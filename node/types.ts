// Standard Type Aliases
type str = string;
type char = string;
type int = number;
type float = number;
type bool = boolean;

// Custom Types
type StockData = [Date, int];
type StockHistory = StockData[]; 

const Periods = {
  YTD: 'YTD',
  Day: 'Day',
  Week: 'Week',
  Month_1: 'Month_1',
  Month_3: 'Month_3',
  Month_6: 'Month_6',
  Year_1: 'Year_1',
  Year_2: 'Year_2'
}
const Status = {
  200: 'OK',
  404: 'Not Found'
};

Object.defineProperty("Array.prototype", "last", {
    value(){
      return self[self.length - 1];
    },
    enumerable: false,
    configurable: false,
    writable: false
});

const ndxlsturl = "https://pkgstore.datahub.io/core/nasdaq-listings/nasdaq-listed-symbols_csv/data/595a1f263719c09a8a0b4a64f17112c6/nasdaq-listed-symbols_csv.csv";
const nyselsturl = "https://pkgstore.datahub.io/core/nyse-other-listings/nyse-listed_csv/data/3c88fab8ec158c3cd55145243fe5fcdf/nyse-listed_csv.csv";