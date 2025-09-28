// Exercise 1 - create a defferent way of pyramid

const character = "#";
const count = 8;
const rows = [];
let inverted = false; // make it true to invert the pyramid

function padRow(rowNumber, rowCount) {
  return (
    " ".repeat(rowCount - rowNumber) +
    character.repeat(2 * rowNumber - 1) +
    " ".repeat(rowCount - rowNumber)
  );
}

for (let i = 1; i <= count; i++) {
  if (inverted) {
    rows.unshift(padRow(i, count));
  } else {
    rows.push(padRow(i, count));
  }
}

console.log("this is the for loop pyramid \n", rows.join("\n"));

while (rows.length < count) {
  rows.push(padRow(rows.length + 1, count));
}

console.log("this is the while loop pyramid \n", rows.join("\n"));

for (let i = count; i > 0; i--) {
  rows.push(padRow(i, count));
}

console.log("this is the for loop pyramid (inverted) \n", rows.join("\n"));

let result = "";

for (const row of rows) {
  result = result + row + "\n";
}

console.log("this is the for of loop pyramid \n", result);
