let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//global variable array object for weapons
const weapons = [
  { name: "stick", power: 5 },
  { name: "dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "sword", power: 100 },
];

// global variable array object for monsters.
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
];

// global variable array object. to be use for the buttons and text to display
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none"; // to hide the monsterStats display when it is not enganing to a fight
  // get the text from locations array object set it to "button text" property array and set indexes.
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text; // get the text from locations array object and get the text property and set it to display
}

function goTown() {
  update(locations[0]); // invoke the update fucntion and for the parameter use the locations object index 0
}

function goStore() {
  update(locations[1]); // invoke the update fucntion and for the parameter use the locations object index 1
}

function goCave() {
  update(locations[2]); // invoke the update fucntion and for the parameter use the locations object index 2
}

function buyHealth() {
  //if the gold is grater than the value of health minus 10 if the gold is less than 10 display a text
  if (gold >= 10) {
    gold -= 10; //subtraction assignment operator. current gold minus 10
    health += 10; // addition assignment operator. add a plus 10 to health.
    //display the current value of the gold and health.
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  // check if you are already have all of weapons available
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30; //subtraction assignment operator. current gold minus 30
      currentWeapon++; // increment the array
      goldText.innerText = gold; // display the current gold
      let newWeapon = weapons[currentWeapon].name; //get the current weapons's name
      text.innerText = "You now have a " + newWeapon + "."; // display it to the text variable
      inventory.push(newWeapon); // add it to the last in inventory array.
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon; // invoke the sellWeapon function
  }
}

function sellWeapon() {
  /* 
  check if the inventory is greater than 1.
  this if else statement is prevent the user to sell all the weapons in the inventory 
*/
  if (inventory.length > 1) {
    gold += 15; // addition assignment operator. add a 15 to the gold.
    goldText.innerText = gold; // display the added gold.
    let currentWeapon = inventory.shift(); // delete the last weapon in the inventory.
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

/* 
  the fightSlime, fightBeast and fightDragon function
  set the fighting global variable to the index of the monster.
  ex. fighting = 0 is equal to the slime you can find it in monster array object
  then invoke the goFight function.
*/
function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]); // invoke the update fucntion and for the parameter use the locations object index 3
  monsterHealth = monsters[fighting].health; // get the monster health from the monsters global variable and get the index pass by the chosen function of the monster.
  monsterStats.style.display = "block"; // change the display none to display block to show the monster stats when engaging to a fight
  monsterName.innerText = monsters[fighting].name; // get the monster name from the monsters global variable and get the index pass by the chosen function of the monster.
  monsterHealthText.innerText = monsterHealth; // display the health of the monster.
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks."; // display the current monster name when the monster attacks
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + "."; // display the current weapon name when you attack
  /*
    The monster attacks the player. Player's health is reduced by the value returned 
    from the getMonsterAttackValue function, which is calculated based on the monster's 
    level. */
  health -= getMonsterAttackValue(monsters[fighting].level); // subtraction assignment and invoke the getMonsterAttackValue fucntion with the parameter of the monster lvl.
  //Checks if the player's attack hits the monster by calling isMonsterHit().
  if (isMonsterHit()) {
    /*
    If the attack is a hit, the monster's monsterHealth is reduced. The damage is calculated by combining 
    the weapon's base power with a random bonus based on the player's xp */
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    //If the attack is a miss, a "You miss" message is added to the game text.
    text.innerText += " You miss.";
  }
  //Updates the displayed health values for both the player and the monster on the screen.
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  //Checks if either the player's or the monster's health has dropped to or below zero.
  if (health <= 0) {
    lose(); //If player health is 0 or less, the lose() function is called.
  } else if (monsterHealth <= 0) {
    /* If monsterHealth is 0 or less, the game checks which monster was defeated. 
    If it was the final boss (at index 2), the winGame() function is called. Otherwise, 
    the defeatMonster() function is called to award gold and XP.
    */
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  /*
  Has a 10% chance (Math.random() <= 0.1) to break the player's current weapon, 
  provided the player has more than one item in their inventory (to prevent breaking the last weapon). 
  The broken weapon is removed using inventory.pop(), and currentWeapon is decremented.
  */
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}
/*
 Base Damage: The monster's base power is calculated as the passed-in level multiplied by 5 (level * 5).
Defense/Dodge: A defensive modifier is subtracted from the base damage. This modifier is a random number 
between 0 and the player's total xp (exclusive of xp), calculated using Math.floor(Math.random() * xp).
This implements an XP−as−Defense mechanic: the higher the player's xp, the larger the random number can be, 
and therefore the more the monster's damage can be reduced.

If the calculated hit value is greater than 0, the function returns hit as the final damage.
If the calculated hit value is 0 or less (meaning the player's high XP completely nullified the monster's attack), 
the function returns 0, ensuring the monster never heals the player or deals negative damage.
*/
function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit > 0 ? hit : 0;
}

/*
Base Hit Chance
Math.random() > 0.2: Math.random() generates a floating-point number between 0 (inclusive) and 1 (exclusive).
If this random number is greater than 0.2, this part of the condition is true.
This gives the player a 80% chance (1.0−0.2=0.8) to hit the monster under normal circumstances.

Desperation Hit Mechanic
health < 20: This checks if the player's current health is less than 20.
If the player's health is low, this part of the condition is true.
*/
function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7); // monster lvl multiply by 6.7 then round-of to the nearest whole number and add to gold global variable
  xp += monsters[fighting].level; // monster lvl will add to the current xp of the player
  goldText.innerText = gold; // display the added gold
  xpText.innerText = xp; // display the add xp
  update(locations[4]); // invoke the update fucntion and for the parameter use the locations object index 4
}

function lose() {
  update(locations[5]); // invoke the update fucntion and for the parameter use the locations object index 5
}

function winGame() {
  update(locations[6]); // invoke the update fucntion and for the parameter use the locations object index 6
}

// restart the game. set all the neccesary global variable to the default
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

/**
 * This function is a simple trigger to access a hidden or special part of the game.
 * It calls a global function named update() and passes it the object at index 7 of the global array locations.
 * This index likely corresponds to the configuration data for the special "Easter Egg" location or scene.
 */

function easterEgg() {
  update(locations[7]); // invoke the update fucntion and for the parameter use the locations object index 7
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}
/**
 *
 * @param {These are simple wrapper functions that act as convenient entry points, likely connected to game buttons. They simply call the main game logic function, pick(), passing a fixed number (2 or 8) as the player's guess.} guess
 * This is the main function that runs the guess-the-number game. It takes the player's choice (guess) as its parameter.
 * An empty array named numbers is initialized.
   A while loop runs until the array contains 10 numbers.
  Inside the loop, it generates a random integer:
  Math.random() * 11 produces a number between 0 (inclusive) and 11 (exclusive).
  Math.floor() rounds this down, resulting in a random integer between 0 and 10, which is then added to the numbers array.
 */
function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
