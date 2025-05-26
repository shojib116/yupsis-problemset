/**
 * Problem 2: Inventory Management With Multiple Units
 * This program calculates and update stock in multiple Units
 * Typescript is used for avoiding unnecessary hindrance during runtime since so many values are involved
 * Usage: node index.ts | deno index.ts
 */


type Stock = {
  "tons": number 
  "kilograms": number 
  "grams": number
  "milligrams": number
}


type Transcation = "sell" | "purchase"

const multipliers = {
  ton: 1_000_000_000,
  kilogram: 1_000_000,
  gram: 1_000,
  miligram: 1 
}

const initial_stock: Stock = {"tons": 1, "kilograms": 2, "grams": 0, "milligrams": 0}

const after_sale = updateStock(initial_stock, {"tons": 0, "kilograms": 0, "grams": 1, "milligrams": 0}, "sell")
console.log(after_sale)

const after_purchase = updateStock(after_sale, {"tons": 0, "kilograms": 0, "grams": 1001, "milligrams": 0}, "purchase")
console.log(after_purchase)






function updateStock(initial_stock: Stock, current_transaction: Stock, transaction_type: Transcation): Stock {
  let final_stock: Stock = {"tons": 0, "kilograms": 0, "grams": 0, "milligrams": 0}
  const initial_stock_in_mg = convertToMg(initial_stock);
  const current_transaction_in_mg = convertToMg(current_transaction);

  if (transaction_type == "sell") {
    if (current_transaction_in_mg > initial_stock_in_mg) {
      throw new Error("You cannot sell more than you have!");
    }
    final_stock = convertToStockValue(initial_stock_in_mg - current_transaction_in_mg);
  } else {
    final_stock = convertToStockValue(initial_stock_in_mg + current_transaction_in_mg);
  }

  return final_stock
}

function convertToMg(stock: Stock): number {
  let mg = stock.milligrams * multipliers.miligram;
  mg += stock.grams * multipliers.gram;
  mg += stock.kilograms * multipliers.kilogram;
  mg += stock.tons * multipliers.ton;
  
  return mg;
}

function convertToStockValue(amountInMg: number): Stock {
  let stock = {"tons": 0, "kilograms": 0, "grams": 0, "milligrams": 0};
  stock.tons = Math.floor(amountInMg / multipliers.ton);
  amountInMg -= stock.tons * multipliers.ton;
  stock.kilograms = Math.floor(amountInMg / multipliers.kilogram);
  amountInMg -= stock.kilograms * multipliers.kilogram;
  stock.grams = Math.floor(amountInMg / multipliers.gram);
  amountInMg -= stock.grams * multipliers.gram;
  stock.milligrams = amountInMg;
  return stock;
}