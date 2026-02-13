/**
 * Functional Programming is a popular approach to software development. In Functional Programming,
 * developers organize code into smaller functions, then combine those functions to build complex programs.
 * In this spreadsheet application project,
 * you'll learn about parsing and evaluating mathematical expressions,
 * implementing spreadsheet functions, handling cell references,
 * and creating interactive web interfaces. You'll learn how to dynamically update the page based on user input.
 * This project will cover concepts like the map(), find(), and includes() methods and the parseInt() function.
 */

/*
  Infix operator implementations
  - This object maps simple infix operators to pure functions that take two
    numeric arguments and return the computed result. Keeping these as
    functions makes it easy to evaluate expressions by operator lookup.
  - Supported operators: +, -, *, /
*/

const infixToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};

/*
  infixEval(str, regex)
  - Finds the first occurrence of a binary infix expression in `str` that
    matches `regex`, parses the numeric operands and operator, and returns
    a new string with that single operation replaced by its numeric result.
  - `regex` should capture operand1, operator, operand2 in capture groups.
  - This function only evaluates one match per call (used recursively
    by higher-level helpers to fully reduce expressions).
*/
const infixEval = (str, regex) =>
  str.replace(
    regex,
    (_match, arg1, operator, arg2) =>
      infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)), // parseFloat: convert operand strings to numbers
  );

const highPrecedence = (str) => {
  const regex = /([\d.]+)([*\/])([\d.]+)/;
  const str2 = infixEval(str, regex);
  return str === str2 ? str : highPrecedence(str2);
};

/*
  highPrecedence(str)
  - Recursively evaluates all multiplication and division operations first
    (higher precedence) by repeatedly applying `infixEval` with a regex that
    matches `*` or `/` operations. Returns the partially reduced expression
    string where no * or / pairs remain.
*/

const isEven = (num) => num % 2 === 0;
const sum = (nums) => nums.reduce((acc, el) => acc + el, 0); // reduce: aggregate array values into single result
const average = (nums) => sum(nums) / nums.length;

const median = (nums) => {
  const sorted = nums.slice().sort((a, b) => a - b); // slice: copy array; sort: sort numerically
  const length = sorted.length;
  const middle = length / 2 - 1;
  return isEven(length)
    ? average([sorted[middle], sorted[middle + 1]])
    : sorted[Math.ceil(middle)];
};

/*
  spreadsheetFunctions
  - A lookup table of spreadsheet-like functions exposed to formulas.
  - Keys are function names as they appear in formulas (case-insensitive).
  - Each entry expects an array of numbers (or destructured args) and
    returns a value that replaces the function call in the evaluated string.
  - Examples:
    - `sum`: returns sum of list
    - `average`: arithmetic mean
    - `median`: median value
    - `even`, `someeven`, `everyeven`: predicates/filters using `isEven`
    - `firsttwo`, `lasttwo`: slices of the array
    - `random`: generates a random integer in a simple range
    - `range`: delegates to the `range` helper defined below
*/
const spreadsheetFunctions = {
  sum,
  average,
  median,
  even: (nums) => nums.filter(isEven), // filter: returns items matching predicate
  someeven: (nums) => nums.some(isEven), // some: true if any match predicate
  everyeven: (nums) => nums.every(isEven), // every: true if all match predicate
  firsttwo: (nums) => nums.slice(0, 2), // slice: get first two elements
  lasttwo: (nums) => nums.slice(-2), // slice: get last two elements
  has2: (nums) => nums.includes(2), // includes: check membership
  increment: (nums) => nums.map((num) => num + 1), // map: transform each element
  random: ([x, y]) => Math.floor(Math.random() * y + x), // Math.random/Math.floor: random integer
  range: (nums) => range(...nums),
  nodupes: (nums) => [...new Set(nums).values()], // Set: remove duplicates
  "": (arg) => arg,
};

const applyFunction = (str) => {
  const noHigh = highPrecedence(str);
  const infix = /([\d.]+)([+-])([\d.]+)/;
  const str2 = infixEval(noHigh, infix);
  const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
  const toNumberList = (args) => args.split(",").map(parseFloat); // split+map(parseFloat): convert "1,2" -> [1,2]
  const apply = (fn, args) =>
    spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
  return str2.replace(functionCall, (match, fn, args) =>
    spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) // hasOwnProperty: ensure lookup is own prop
      ? apply(fn, args)
      : match,
  );
};

/*
  applyFunction(str)
  - Orchestrates evaluation of a (sub)expression string:
    1. Reduces all * and / operations via `highPrecedence`.
    2. Reduces remaining + and - operations with `infixEval`.
    3. Detects a single function call like `SUM(1,2,3)` (no nested calls)
       using `functionCall` regex, converts the comma-separated args to
       numbers, and applies the corresponding `spreadsheetFunctions` entry.
  - Returns the expression string with one function call or infix pair
    replaced; callers may call this repeatedly to fully reduce.
*/

const range = (start, end) =>
  Array(end - start + 1)
    .fill(start) // fill: initialize array with `start` so map can compute offsets
    .map((element, index) => element + index); // map: compute each sequential value
const charRange = (start, end) =>
  range(start.charCodeAt(0), end.charCodeAt(0)).map(
    (code) => String.fromCharCode(code), // fromCharCode: convert numeric char codes to chars
  );

/*
  charRange(start, end)
  - Produces an array of consecutive characters from `start` to `end`.
  - Internally uses `range` on character codes and converts back to chars.
  - Useful for generating column labels like A..J.
*/

const evalFormula = (x, cells) => {
  const idToText = (id) => cells.find((cell) => cell.id === id).value;
  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2)); // parseInt: convert row string to integer
  const elemValue = (num) => (character) => idToText(character + num);
  const addCharacters = (character1) => (character2) => (num) =>
    charRange(character1, character2).map(elemValue(num)); // map: turn column letters into cell ids and lookup values
  const rangeExpanded = x.replace(
    rangeRegex,
    (_match, char1, num1, char2, num2) =>
      rangeFromString(num1, num2).map(addCharacters(char1)(char2)),
  );
  const cellRegex = /[A-J][1-9][0-9]?/gi;
  const cellExpanded = rangeExpanded.replace(
    cellRegex,
    (match) => idToText(match.toUpperCase()), // toUpperCase: normalize id case before lookup
  );
  const functionExpanded = applyFunction(cellExpanded);
  return functionExpanded === x
    ? functionExpanded
    : evalFormula(functionExpanded, cells);
};

/*
  evalFormula(x, cells)
  - Evaluates a spreadsheet formula string `x` with access to `cells`, an
    array-like collection of DOM nodes (or objects) that have `id` and
    `value` properties.
  - Steps performed:
    1. Expand ranges like `A1:B2` into nested arrays of cell values.
    2. Replace individual cell references (e.g., `A1`) with their text
       values via `idToText`.
    3. Apply numeric evaluation (operators and built-in functions) via
       `applyFunction`.
    4. If the result changed, repeat recursively until fully reduced.
  - Returns the fully evaluated value string for the input formula.
*/

window.onload = () => {
  const container = document.getElementById("container");
  const createLabel = (name) => {
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;
    container.appendChild(label);
  };
  const letters = charRange("A", "J");
  letters.forEach(createLabel);
  range(1, 99).forEach((number) => {
    createLabel(number);
    letters.forEach((letter) => {
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number;
      input.ariaLabel = letter + number;
      input.onchange = update;
      container.appendChild(input);
    });
  });
};

/*
  UI initialization (window.onload)
  - Builds a simple spreadsheet grid in the `#container` element using
    column labels A..J and rows 1..99.
  - For each cell it creates a text `input` with an `id` like 'A1' and
    attaches the `update` handler to the `onchange` event so formulas are
    re-evaluated when the user changes a value.
*/

const update = (event) => {
  const element = event.target;
  const value = element.value.replace(/\s/g, ""); // replace with regex: remove whitespace
  if (!value.includes(element.id) && value.startsWith("=")) {
    element.value = evalFormula(
      value.slice(1),
      Array.from(document.getElementById("container").children),
    );
  }
};

/*
  update(event)
  - Handler attached to each cell input `onchange` event.
  - Removes whitespace from the input and, if the value starts with '=' and
    does not contain a self-reference, evaluates the formula (everything
    after the '=') by calling `evalFormula` with the list of container
    children (cell elements). The input's value is replaced by the result.
*/
