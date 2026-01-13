/**
 * Regular expressions, often shortened to "regex" or "regexp", 
 * are patterns that help programmers match, search, and replace 
 * text. Regular expressions are powerful, but can be difficult to 
 * understand because they use so many special characters.

 * In this spam filter project, you'll learn about capture groups, 
 * positive lookaheads, negative lookaheads, and other techniques to 
 * match any text you want.
 */

const messageInput = document.getElementById("message-input");
const result = document.getElementById("result");
const checkMessageButton = document.getElementById("check-message-btn");
/**
 * The helpRegex matches messages that ask for help or assistance.
 
 * The dollarRegex matches messages that mention large sums of money in dollars or hundreds of dollars or 
 * thousands of dollars or millions of dollars or billions of dollars.
 
 * The freeRegex matches messages that offer free money or fr33 m0n3y or fre3 m0n3y or 
 * any combination that say "free money".
 
 * The stockRegex matches messages that promote stock alerts same as s5t0ck k4lr7 or 
 * s5t0ck 4l3r7 or s5t0ck 4l3r7 or any combination that say "stock alerts".
 
 * The dearRegex matches messages that start with "Dear friend" or same as d3ar fr1end or 
 * d3ar fr1end or d3ar fr1end or any combination that say "Dear friend".
 */
const helpRegex = /please help|assist me/i;
const dollarRegex = /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i;
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;
const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;
const dearRegex = /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i;

//The denyList array contains all the regex patterns that identify spam messages.
const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

/**
 * Checks if a message matches any spam patterns using some() method to iterate over the denyList array.
 * @param {*} msg
 * @returns
 */
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));

// Event listener for the "Check Message" button
checkMessageButton.addEventListener("click", () => {
  if (messageInput.value === "") {
    alert("Please enter a message.");
    return;
  }
  // Display the result based on whether the message is spam or not
  result.textContent = isSpam(messageInput.value)
    ? "Oh no! This looks like a spam message."
    : "This message does not seem to contain any spam.";
  messageInput.value = "";
});
