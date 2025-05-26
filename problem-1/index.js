/**
 * Problem 1: Mutki Exchange
 * This program calculates the total amount of mojo after exchanging all mutkis repetetively.
 * It takes an initial amount of mojo as input and returns the total mojo and any leftover mutkis.
 * This problem considers that 3 mutkis can be exchanged for 1 mojo.
 * Usage: node index.js [initial_mojo] | deno index.js [initial_mojo]
 * If no initial_mojo is provided, it defaults to 10.
 * Example: node index.js 20
 * Output: {totalMojo: 29, leftOverMutki: 2}
 */
const initial_mojo = Number(process.argv[2]) || 10

const result = exchangeMutki(initial_mojo);

console.log(result);

function exchangeMutki(mojo) {
  let leftOverMutki = mojo;
  let totalMojo = mojo;
  // Time Complexity will be logarithmic
  while (leftOverMutki >= 3) {
    let exchangedMojo = Math.floor(leftOverMutki / 3);
    leftOverMutki = leftOverMutki % 3;
    leftOverMutki += exchangedMojo;
    totalMojo += exchangedMojo;
  }
  return {totalMojo, leftOverMutki}
}