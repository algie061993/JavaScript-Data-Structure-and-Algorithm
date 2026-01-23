const sortButton = document.getElementById("sort");

const sortInputArray = (event) => {
  event.preventDefault();
  /**
   * @description Get the input values from the dropdowns in the UI and convert them to numbers.
   * @type {number[]}
   * @example
   * Get the input values from the dropdowns in the UI
   * const inputValues = [
   *   ...document.getElementsByClassName('values-dropdown'),
   * ].map((dropdown) => Number(dropdown.value));
   * This will give you an array of numbers that you can then sort using your sorting algorithm.
   * because the values from the dropdowns are strings by default, we need to convert them to numbers using Number().
   * @returns {number[]} An array of numbers representing the input values from the dropdowns.
   *
   */
  const inputValues = [
    ...document.getElementsByClassName("values-dropdown"),
  ].map((dropdown) => Number(dropdown.value));

  //uncomment the line below to use bubble sort
  // const sortedValues = bubbleSort(inputValues);

  const sortedValues = selectionSort(inputValues);

  updateUI(sortedValues);
  // uncomment the line below to see the unsorted values in the UI
  // updateUI(inputValues);
};

// update the UI with the sorted values
const updateUI = (array = []) => {
  // for each value in the array, update the corresponding output node in the UI with the value from the array.

  array.forEach((num, i) => {
    /**
     * @description Get the output value node from the DOM by its ID.
     * @param {number} i - The index of the current value in the array.
     * @example
     * Get the output value node for the first value in the array
     * const outputValueNode = document.getElementById('output-value-0');
     * and set its inner text to the value of the first element in the array.
     * get the output node by its id and update its inner text with the value from the array.
        the id of the output node is output-value-0, output-value-1, output-value-2, etc.
        we use a template literal to construct the id string.
        for example, if i is 0, the id will be output-value-0.
        we then set the innerText of the output node to the value of num.
        this will update the UI with the sorted values.
     * @returns {HTMLElement} The output value node. 
     * @type {HTMLElement}
     */

    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  });
};

/**
 * The first sorting algorithm you will implement is the bubble sort,
 * which starts at the beginning of the array and 'bubbles up'
 * unsorted values towards the end, iterating through the array until it is completely sorted.
 * @param {number[]} array
 * @returns {number[]}
 */

const bubbleSort = (array) => {
  // outer loop to iterate through the entire array

  for (let i = 0; i < array.length; i++) {
    // inner loop to compare adjacent values in the array

    for (let j = 0; j < array.length - 1; j++) {
      console.log(
        " to see the array and its values being compared: ",
        array,
        array[j],
        array[j + 1],
      );

      // compare the current value with the next value

      if (array[j] > array[j + 1]) {
        const temp = array[j]; // store the value of array[j] in a temporary variable
        array[j] = array[j + 1]; // assign the value of array[j + 1] to array[j]
        array[j + 1] = temp; // assign the value of the temporary variable to array[j + 1]
        // this effectively swaps the two values in the array by using a temporary variable to hold one of the values during the swap process.
      }
    }
  }

  return array; // return the sorted array
};

/**
 * Time to implement another sorting algorithm.
 * This time, you'll be implementing a selection sort.
 * Selection sort works by finding the smallest value in the array,
 * then swapping it with the first value in the array.
 * Then, it finds the next smallest value in the array,
 * and swaps it with the second value in the array.
 * It continues iterating through the array until it is completely sorted.
 *
 * @param {number[]} array
 * @returns {number[]}
 */

const selectionSort = (array) => {
  // outer loop to iterate through the entire array.

  for (let i = 0; i < array.length; i++) {}
};

sortButton.addEventListener("click", sortInputArray);
