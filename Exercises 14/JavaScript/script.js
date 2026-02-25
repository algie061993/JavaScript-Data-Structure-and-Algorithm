/**
 * Statistics is a way of using math to make sense of data.
 * It helps us understand patterns and trends in information,
 * so we can make predictions and decisions based on that information.
 * i add "0" to the reduce method to avoid NaN result
 * beacause empty string is not a number
 * In this challenge, you will build a statistics calculator that takes
 * a set of numbers and returns the mean, median, mode, standard deviation, and variance.
 */

const getMean = (array) =>
  array.reduce((acc, el) => acc + el, 0) / array.length; // Mean is the sum of all numbers divided by the count of numbers

console.log(getMean([1, 2, 3, 4, 5])); // 3
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
 * Mode is the number that appears most frequently in a data set.
 * If multiple numbers appear with the same highest frequency, all of them are considered modes.
 * If all numbers appear with the same frequency, there is no mode.
 *
 * @param {*} array
 */
const getMode = (array) => {
  const counts = {}; // Object to store the frequency of each number

  array.forEach((el) => (counts[el] = counts[el] ? counts[el] + 1 : 1)); // Count the frequency of each number in the array

  // Check if all numbers have the same frequency
  if (new Set(Object.values(counts)).size === 1) {
    return null; // No mode if all numbers have the same frequency
  }

  const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0]; // Find the highest frequency number

  // Find all numbers that have the highest frequency
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest],
  );

  return mode.join(", "); // Return the mode(s) as a comma-separated string
};

/**
 *  Range is the difference between the highest and lowest values in a data set.
 *  i use Math.max() and Math.min() to find the highest and lowest values in the array
 *  and spread operator (...) to pass the array elements as individual arguments to these functions.
 *  and then subtract the minimum value from the maximum value to get the range.
 * @param {*} array
 * @returns
 */
const getRange = (array) => {
  return Math.max(...array) - Math.min(...array); // Range is the difference between the highest and lowest values in the array
};

/**
 * Standard Deviation is a measure of how spread out the numbers in a data set are.
 * It tells us how much the numbers deviate from the mean (average) value.
 * A low standard deviation means that the numbers are close to the mean,
 * while a high standard deviation means that the numbers are far from the mean.
 * @param {*} array
 * @returns
 */
const getVariance = (array) => {
  // Variance is the average of the squared differences from the mean for each number in the array

  const mean = getMean(array); // Calculate the mean of the array by calling the getMean function

  // Calculate the variance using the formula (1/n) * sum((x - mean)^2) for each number x in the array
  const variance =
    array.reduce((acc, el) => {
      const difference = el - mean; // Calculate the difference between the number and the mean
      const squared = difference ** 2; // Square the difference
      return acc + squared; // Add the squared difference to the accumulator
    }, 0) / array.length; // Divide the total squared differences by the number of elements in the array

  return variance; // Return the variance
};

/**
 * Standard Deviation is the square root of the variance.
 * i use Math.sqrt() to calculate the square root of the variance.
 * @param {*} array
 * @returns
 */

const getStandardDeviation = (array) => {
  const variance = getVariance(array); // Calculate the variance by calling the getVariance function
  const standardDeviation = Math.sqrt(variance); // Calculate the standard deviation by taking the square root of the variance
  return standardDeviation; // Return the standard deviation
};

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
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);

  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
};
