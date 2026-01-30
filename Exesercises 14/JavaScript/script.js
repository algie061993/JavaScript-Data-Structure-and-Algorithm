/**
 * Statistics is a way of using math to make sense of data.
 * It helps us understand patterns and trends in information,
 * so we can make predictions and decisions based on that information.
 *
 * In this challenge, you will build a statistics calculator that takes
 * a set of numbers and returns the mean, median, mode, standard deviation, and variance.
 */

const getMean = (array) =>
  array.reduce((acc, el) => acc + el, 0) / array.length; // Mean is the sum of all numbers divided by the count of numbers

/**
 * The .sort() method mutates the original array -
 * in other words, it modifies the order of the elements directly.
 * This is generally considered bad practice, as it can result in unexpected side effects.
 * Instead, you should use the .toSorted() method, which creates a new array.
 * This new array is sorted based on the provided function, and the original array is not modified.

 * @param {array} array
 */
const getMedian = (array) => {
  const sorted = array.toSorted((a, b) => a - b); // Ascending order

  // Check if the length of the array is odd or even
  if (sorted.length % 2 === 1) {
    return sorted[Math.floor(sorted.length / 2)]; // Middle element for odd length
  } else {
    const mid1 = sorted[sorted.length / 2 - 1]; // First middle element for even length
    const mid2 = sorted[sorted.length / 2]; // Second middle element for even length
    return (mid1 + mid2) / 2; // Average of the two middle elements
  }
};

/**
 *
 * @param {*} array
 */
const getMode = (array) => {};

/**
 * Uncomment the lines below to test your code
 * You should see the mean, median, mode, standard deviation, and variance
 * for the test arrays logged to the console
 * Expected Output:
 * 3
 * 3
 * [1, 2, 3, 4, 5]
 * 1.4142135623730951
 * 2
 * 3.5
 * 3.5
 * [1, 2, 3, 4, 5, 6]
 * 1.707825127659933
 * 2.9166666666666665
 */

// const testArr1 = [1, 2, 3, 4, 5];
// const testArr2 = [1, 2, 3, 4, 5, 6];

// const isOdd = testArr1.length % 2 === 1;
// console.log(isOdd);

// const isEven = testArr2.length % 2 === 0;
// console.log(isEven);

// const oddListMedian = testArr1[Math.floor(testArr1.length / 2)];
// console.log(oddListMedian);

// const evenListMedian =
//   (testArr2[testArr2.length / 2 - 1] + testArr2[testArr2.length / 2]) / 2;
// console.log(evenListMedian);

const calculate = () => {
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  const numbers = array.map((el) => Number(el)).filter((el) => !isNaN(el));
  const mean = getMean(numbers);
  const median = getMedian(numbers);

  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
};
