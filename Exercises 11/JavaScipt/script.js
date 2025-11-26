const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");
const animationData = [
  {
    inputVal: 5,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    addElDelay: 1500,
    msg: "decimalToBinary(2) returns '1' + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.",
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    addElDelay: 2000,
    msg: "decimalToBinary(1) returns '1' (base case) and gives that value to the stack below. Then it pops off the stack.",
    showMsgDelay: 5000,
    removeElDelay: 10000,
  },
];
/**
 *  a simple recursive function that counts down to 0 and back up to the original number
 *  the base case is when the number is 0 and the function returns
 *  the recursive case is when the number is greater than 0 and the function calls itself with the number decremented by 1 
 *  logs the number before and after the recursive call to show the countdown and count up effect
 *  Now you should see a countdown from 3 to 0, followed by Reached base case, and a count from 1 to 3.
 *  This is because, after the recursive loop is finished, the function will continue to execute the code after the recursive call. 
 *  This is why you see Reached base case before the count from 1 to 3.
 * @param {*} number 
 * @returns 
 * 
 *  const countDownAndUp = (number) => {
    console.log(number);

      if (number === 0) {
        console.log("Reached base case");
        return;
      } else {
        countDownAndUp(number - 1);
        console.log(number);
      }
    };
    countDownAndUp(3);
 */

/**
 * this is the longer version of decimal to binary conversion
 * it is commented out because it is not used in the code
 * 
  const decimalToBinary = (input) => {
  const inputs = [];
  const quotients = [];
  const remainders = [];

  if (input === 0) {
    result.innerText = "0";
    return;
  }

  while (input > 0) {
    const quotient = Math.floor(input / 2);
    const remainder = input % 2;

    inputs.push(input);
    quotients.push(quotient);
    remainders.push(remainder);
    input = quotient;
  }

  console.log("Inputs: ", inputs);
  console.log("Quotients: ", quotients);
  console.log("Remainders: ", remainders);

  result.innerText = remainders.reverse().join("");
};
 * @param {*} input
 * @returns {void} void means it doesn't return anything 
 */

/**
 * converts a decimal number to its binary representation
 * this is the more concise version
 * its a refactored version of the longer one above
 * removes the need for storing intermediate values in arrays
 * returns the binary representation as a string
 * stack recursion concept is used here
 * @param {*} input
 * 
 *  const decimalToBinary = (input) => {
    let binary = "";

    if (input === 0) {
      binary = "0";
    }

    while (input > 0) {
      binary = (input % 2) + binary;
      input = Math.floor(input / 2);
    }

    result.innerText = binary;
  };
 */
const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

const showAnimation = () => {
  result.innerText = "Call Stack Animation";
  animationData.forEach((obj) => {
    setTimeout(() => {
      animationContainer.innerHTML += `<p id="${obj.inputVal}" class="animation-frame">decimalToBinary(${obj.inputVal})</p>`;
    }, obj.addElDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });

  setTimeout(() => {
    result.textContent = decimalToBinary(5);
  }, 20000);
};

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);
  if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
    alert("Please provide a decimal number greater than or equal to 0");
    return;
  }
  if (parseInt(numberInput.value) === 5) {
    showAnimation();
    return;
  }
  result.textContent = decimalToBinary(inputInt);
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
