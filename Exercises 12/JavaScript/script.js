/**
 * SPAM FILTER APPLICATION - WORKPLACE DOCUMENTATION
 * 
 * This JavaScript application implements a client-side spam detection system
 * using regular expressions to identify common spam patterns in user messages.
 * Designed for educational purposes and workplace email/message filtering.
 */

// DOM ELEMENT REFERENCES
// These constants store references to HTML elements for user interaction
const messageInput = document.getElementById("message-input"); // Text input where users type messages to check
const result = document.getElementById("result"); // Display area for showing spam detection results
const checkMessageButton = document.getElementById("check-message-btn"); // Button that triggers the spam check process

// SPAM DETECTION PATTERNS
// Regular expressions that match common spam message characteristics
// All patterns use 'i' flag for case-insensitive matching

const helpRegex = /please help|assist me/i; 
// Detects help requests: "please help" or "assist me" (common in scam emails)

const dollarRegex = /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i;
// Detects money amounts: "100 dollars", "5 million dollars", "thousand dollars"
// [0-9]+ = one or more digits
// \s* = optional whitespace
// (?:...) = non-capturing group for amount descriptors
// ? = makes the amount descriptor optional

const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;
// Detects "free money" with leetspeak variations: "free money", "fr33 m0n3y"
// (?:^|\s) = word boundary (start of string or whitespace)
// [e3] = matches either 'e' or '3'
// [o0] = matches either 'o' or '0'
// (?:$|\s) = word boundary (end of string or whitespace)

const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;
// Detects "stock alert" with leetspeak: "stock alert", "5t0ck 4l3rt"
// [s5] = 's' or '5', [t7] = 't' or '7', [c{[(] = 'c' or similar characters
// [a@4] = 'a', '@', or '4'

const dearRegex = /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i;
// Detects "dear friend" with variations: "dear friend", "d34r fr13nd"
// [i1|] = 'i', '1', or '|' (pipe character)

// SPAM PATTERN COLLECTION
// Array containing all regex patterns for efficient testing
const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

// SPAM DETECTION FUNCTION
// Core logic that determines if a message contains spam
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));
// Array.some() returns true if ANY regex pattern matches the message
// regex.test() returns boolean indicating if pattern is found in message

// USER INTERACTION EVENT HANDLER
// Handles button clicks to check messages for spam
checkMessageButton.addEventListener("click", () => {
  // INPUT VALIDATION
  // Check if user entered a message before processing
  if (messageInput.value === "") {
    alert("Please enter a message."); // Show error dialog for empty input
    return; // Exit function early to prevent further processing
  }

  // SPAM DETECTION AND RESULT DISPLAY
  // Use ternary operator to show appropriate message based on spam detection
  result.textContent = isSpam(messageInput.value)
    ? "Oh no! This looks like a spam message." // Message when spam is detected
    : "This message does not seem to contain any spam."; // Message when no spam found
  
  // USER INTERFACE CLEANUP
  // Clear input field after processing for better user experience
  messageInput.value = "";
});