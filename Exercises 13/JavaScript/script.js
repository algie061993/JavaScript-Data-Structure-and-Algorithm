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

  // uncomment the line below to use selection sort
  // const sortedValues = selectionSort(inputValues);

  // uncomment the line below to use insertion sort
  // const sortedValues = insertionSort(inputValues);

  // the line below uses the default sort method to sort the input values in ascending order
  const sortedValues = inputValues.sort((a, b) => {
    return a - b; // default sort method for comparison
  });

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

  for (let i = 0; i < array.length; i++) {
    let minIndex = i; // assume the minimum value is at the current index i.

    // inner loop to find the index of the minimum value in the unsorted portion of the array.

    for (let j = i + 1; j < array.length; j++) {
      console.log(
        " to see the array and its values being compared: ",
        array,
        array[j],
        array[minIndex],
      );

      // compare the current value of array[j] with the current value of array[minIndex].
      // If array[j] is less than array[minIndex], update minIndex with the index of array[j].

      if (array[j] < array[minIndex]) {
        minIndex = j; // update minIndex to the index of the new minimum value found.
      }
    }

    // after finding the index of the minimum value in the unsorted portion of the array,
    // swap it with the value at the current index i.

    const temp = array[i]; // store the value of array[i] in a temporary variable.
    array[i] = array[minIndex]; // assign the value of array[minIndex] to array[i].
    array[minIndex] = temp; // assign the value of the temporary variable to array[minIndex].

    // this effectively swaps the two values in the array by using a temporary variable to hold one of the values during the swap process.
  }
  return array;
};

/**
 * The last sorting algorithm you will implement is the insertion sort.
 * This algorithm works by building up a sorted array at the beginning of the list.
 * It begins the sorted array with the first element.
 * Then it inspects the next element and swaps it backward into the sorted array until it is in a sorted position, and so on.
 *
 * @param {number[]} array
 * @returns {number[]}
 */

const insertionSort = (array) => {
  // outer loop to iterate through the entire array, starting from the second element.

  for (let i = 1; i < array.length; i++) {
    const currValue = array[i]; // store the current value being inspected.

    // inner loop to compare the current value with the sorted portion of the array.
    let j = i - 1; // start from the last index of the sorted portion of the array.
    while (j >= 0 && array[j] > currValue) {
      console.log(
        " to see the array and its values being compared: ",
        array,
        array[j],
        currValue,
      );
      array[j + 1] = array[j]; // shift the larger value to the right by one position.
      j--; // move to the previous index in the sorted portion of the array.
    }
    array[j + 1] = currValue; // insert the current value into its correct position in the sorted portion of the array.
  }
  return array;
};

sortButton.addEventListener("click", sortInputArray);
