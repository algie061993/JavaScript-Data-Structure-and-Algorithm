// 1. Get DOM elements
const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

/**
 * Checks if a string is a palindrome.
 * It ignores all non-alphanumeric characters (like spaces, punctuation, symbols)
 * and is case-insensitive.
 * @param {string} str The string to check.
 * @returns {boolean} True if the string is a palindrome, false otherwise.
 */
const isPalindrome = (str) => {
  // Regular expression to match any non-alphanumeric characters.
  // [^a-z0-9] means "anything that is NOT a lowercase letter or a number".
  const nonAlphanumericRegex = /[^a-z0-9]/g;

  // Normalize the string:
  // 1. Convert to lowercase.
  // 2. Remove all non-alphanumeric characters.
  const normalizedStr = str.toLowerCase().replace(nonAlphanumericRegex, "");

  // Reverse the normalized string.
  const reversedStr = normalizedStr.split("").reverse().join("");

  // A string is a palindrome if the normalized version is the same as the reversed version.
  return normalizedStr === reversedStr;
};

/**
 * Handles the button click event: checks for input, determines if it's a
 * palindrome, and updates the result area.
 */
const checkPalindrome = () => {
  const inputValue = textInput.value;

  // 2. Check for empty input and show alert (User Story 4)
  if (!inputValue.trim()) {
    alert("Please input a value");
    // Clear previous result display if any
    resultDiv.textContent = "";
    return;
  }

  // Determine if it is a palindrome using the original, un-normalized input
  // for the display text.
  const originalText = inputValue;
  const isPal = isPalindrome(inputValue);

  // 3. Construct and display the result text (Remaining User Stories)
  let resultText = `<strong>${originalText}</strong> is `;

  if (isPal) {
    resultText += `a palindrome.`;
  } else {
    resultText += `not a palindrome.`;
  }

  // Update the inner HTML of the result element
  resultDiv.innerHTML = resultText;
};

// 4. Attach the event listener to the button
checkBtn.addEventListener("click", checkPalindrome);

// Optional: Allow pressing 'Enter' key in the input field to trigger the check
textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkPalindrome();
  }
});
