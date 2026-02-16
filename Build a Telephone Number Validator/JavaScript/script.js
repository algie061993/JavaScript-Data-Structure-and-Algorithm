const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const validatePhone = (input) => {
  if (input === "") {
    alert("Please provide a phone number");
    return;
  }

  // The US Phone Regex
  const phoneRegex = /^1?\s?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;

  const isValid = phoneRegex.test(input);
  const resultItem = document.createElement("p");

  resultItem.className = isValid ? "valid" : "invalid";
  resultItem.textContent = `${isValid ? "Valid" : "Invalid"} US number: ${input}`;

  resultsDiv.appendChild(resultItem);
};

checkBtn.addEventListener("click", () => {
  validatePhone(userInput.value);
  userInput.value = "";
});

// Allow "Enter" key to trigger check
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    validatePhone(userInput.value);
    userInput.value = "";
  }
});

clearBtn.addEventListener("click", () => {
  resultsDiv.textContent = "";
});
