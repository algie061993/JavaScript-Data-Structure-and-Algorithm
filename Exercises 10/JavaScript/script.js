// --- DOM Element Selection ---
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// --- Global Data Storage and State ---
// Initialize taskData by parsing JSON from local storage, or default to an empty array
const taskData = JSON.parse(localStorage.getItem("data")) || [];

// Object to hold the task currently being edited. Used to determine if form is in 'edit mode'
let currentTask = {};

/**
 * Utility function to remove any characters that are not letters, numbers, or spaces.
 * This is used before creating an ID or saving content to keep the data clean.
 * @param {string} str - The input string to clean.
 * @returns {string} The cleaned string.
 */
const removeSpecialChars = (str) => {
  return str.replace(/[^a-zA-Z0-9 ]/g, "");
};

/**
 * Handles the submission of the task form for both creating and updating tasks.
 * 1. Validates that the title input is not empty.
 * 2. Creates a new task object with a unique ID (cleaned title + timestamp).
 * 3. Determines if the operation is an 'add' (dataArrIndex === -1) or an 'update'.
 * 4. Pushes new tasks to the beginning of taskData or overwrites the existing task.
 * 5. Persists the updated taskData array to Local Storage.
 * 6. Calls updateTaskContainer() to refresh the visible task list.
 * 7. Calls reset() to clear the form inputs and hide the form.
 */
const addOrUpdateTask = () => {
  if (!titleInput.value.trim()) {
    alert("Please provide a title");
    return;
  }
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${removeSpecialChars(titleInput.value)
      .toLowerCase()
      .split(" ")
      .join("-")}-${Date.now()}`,
    title: removeSpecialChars(titleInput.value),
    date: dateInput.value,
    description: removeSpecialChars(descriptionInput.value),
  };

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }
  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer();
  reset();
};

/**
 * Renders the task list in the DOM based on the contents of the taskData array.
 * It completely clears the tasksContainer and rebuilds the HTML for every task.
 * The Edit and Delete buttons use inline 'onclick' handlers to pass the task element reference.
 */
const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";
  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
    <div class="task" id="${id}">
      <p><strong>Title:</strong> ${title}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Description:</strong> ${description}</p>
        <button onclick="editTask(this)" type="button" class="btn">Edit</button>
        <button onclick="deleteTask(this)" type="button" class="btn">Delete</button>
    </div>
    `;
  });
};

/**
 * Deletes a task from the global taskData array and removes its corresponding element from the DOM.
 * @param {HTMLElement} buttonEl - The button element that was clicked (used to find the parent task ID).
 */
const deleteTask = (buttonEl) => {
  // Find the array index by matching the task's ID
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );
  taskData.splice(dataArrIndex, 1); // Remove task from array
  buttonEl.parentElement.remove(); // Remove task's div from the DOM
  localStorage.setItem("data", JSON.stringify(taskData)); // Update local storage
};

/**
 * Sets the form into 'edit mode' by populating inputs with existing task data.
 * @param {HTMLElement} buttonEl - The button element that was clicked (used to find the parent task ID).
 */
const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex]; // Store original task data in currentTask
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  taskForm.classList.toggle("hidden"); // Show the form
  addOrUpdateTaskBtn.innerText = "Update Task"; // Change button text
};

/**
 * Resets the form inputs, clears the currentTask state (exiting edit mode), and hides the form.
 */
const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  currentTask = {}; // Important: clears the edit state
  taskForm.classList.toggle("hidden");
};

// --- Initialization ---
// Load tasks from storage and render them if any exist on page load
if (taskData.length) {
  updateTaskContainer();
}

// --- Event Listeners ---

openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden");
});

closeTaskFormBtn.addEventListener("click", () => {
  // Check 1: True if ANY form field has content (for new tasks)
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;

  // Check 2: True if ANY input value differs from the original task in currentTask (for editing)
  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;

  // Show modal only if:
  // (New Task AND there are values) OR (Editing Task AND values have changed)
  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset(); // Safely close and reset if no relevant changes were made
  }
});

cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close(); // Close the modal, keeping the form open
});

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close(); // Close the modal
  reset(); // Discard changes (resets inputs) and hide the form
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop the default form submission behavior
  addOrUpdateTask();
});
/**
 * JSON.stringify() - Converts a JavaScript object or value to a JSON string
 * JSON.parse() - Parses a JSON string and converts it into a JavaScript object
 * Local Storage - A web storage object that allows you to store key/value pairs in a web browser with no expiration date
 * localStorage.setItem("key", "value") - Stores a value in local storage with the specified key
 * localStorage.getItem("key") - Retrieves the value associated with the specified key from local storage
 * localStorage.removeItem("key") - Removes the key/value pair associated with the specified key from local storage
 * localStorage.clear() - Clears all key/value pairs from local storage
 * This is for testing purposes only to know how CRUD works in local storage with JSON methods
 */

// const myTaskArr = [
//   { task: "Walk the Dog", date: "22-04-2022" },
//   { task: "Read some books", date: "02-11-2023" },
//   { task: "Watch football", date: "10-08-2021" },
// ];
// localStorage.setItem("data", JSON.stringify(myTaskArr));
// const getTaskArr = localStorage.getItem("data");
// console.log("without JSON.parse", getTaskArr);
// const getTaskArrObj = JSON.parse(localStorage.getItem("data"));
// console.log("with JSON.parse", getTaskArrObj);
// localStorage.removeItem("data");
