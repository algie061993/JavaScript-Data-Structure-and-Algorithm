// Exercise 1 - create a defferent way of pyramid

const character = "#";
const count = 8;
const rows = [];
let inverted = false; // make it true to invert the pyramid

// pyramid function
function padRow(rowNumber, rowCount) {
  /* 
  it is a function that creates a row of the pyramid 
  it takes two arguments: the row number and the total number of rows
  rowNumber: the number of the row
  rowCount: the total number of rows
  it returns a string that represents the row
  the " ".repeat(rowCount - rowNumber)  method is used to add spaces to the beginning and end of the row so that the pyramid is centered
  the  character.repeat(2 * rowNumber - 1)  method is used to add the characters to the row
  */
  return (
    " ".repeat(rowCount - rowNumber) +
    character.repeat(2 * rowNumber - 1) +
    " ".repeat(rowCount - rowNumber)
  );
}

// pyramid with for loop
for (let i = 1; i <= count; i++) {
  // if the inverted variable is true
  if (inverted) {
    // unshift the row to the rows array
    rows.unshift(padRow(i, count));
  } else {
    // push the row to the rows array
    rows.push(padRow(i, count));
  }
}

console.log("this is the for loop pyramid \n", rows.join("\n"));

// pyramid with while loop
while (rows.length < count) {
  // push the row to the rows array
  rows.push(padRow(rows.length + 1, count));
}

console.log("this is the while loop pyramid \n", rows.join("\n"));

// pyramid with for loop but inverted
for (let i = count; i > 0; i--) {
  // push the row to the rows array
  rows.push(padRow(i, count));
}

console.log("this is the for loop pyramid (inverted) \n", rows.join("\n"));

// pyramid with for of loop
let result = "";

for (const row of rows) {
  result = result + row + "\n"; // add the row to the result
}

console.log("this is the for of loop pyramid \n", result);
