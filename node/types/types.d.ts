// Standard Type Aliases
type str = string;
type char = string;
type int = number;
type float = number;
type bool = boolean;

// Custom Types
type StockData = [Date, int];
type StockHistory = StockData[];

declare const Periods: {
  [key:string]: string
}

declare interface Array<T> {
  last: ()=>T;
}