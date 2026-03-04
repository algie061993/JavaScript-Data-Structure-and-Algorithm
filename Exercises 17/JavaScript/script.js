/**
 * Coding a game is a great way to grasp fundamental programming principles,
 * while also creating an interactive gaming experience.
 * In this platformer game project, you'll continue to learn about classes, objects, inheritance,
 * and encapsulation. You'll also learn how to design and organize game elements efficiently and
 * gain insights into problem-solving and code reusability.
 */
const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("canvas");
const startScreen = document.querySelector(".start-screen");
const checkpointScreen = document.querySelector(".checkpoint-screen");
const checkpointMessage = document.querySelector(".checkpoint-screen > p");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 0.5;
let isCheckpointCollisionDetectionActive = true;
/**
 * The proportionalSize function is a utility function that adjusts the size of game
 * elements based on the height of the browser window.
 *
 * It takes a size parameter and returns a scaled size if the window height is less than 500 pixels,
 * ensuring that the game remains playable on smaller screens.
 *
 * If the window height is 500 pixels or more, it returns the original size,
 * allowing for a consistent gaming experience across different screen sizes.
 *
 * This function is particularly useful for maintaining the visual integrity of the game on various devices,
 * ensuring that elements are appropriately sized and the game remains enjoyable regardless of the screen dimensions.
 *
 * @param {number} size - The original size of the game element to be adjusted.
 * @returns {number} - The adjusted size of the game element based on the window height.
 */

const proportionalSize = (size) => {
  return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size; // This function scales the size of game elements based on the height of the browser window, ensuring that the game remains playable on smaller screens.
};

/**
 * The Player class represents the main character in the platformer game. It defines the player's properties such as position,
 * velocity, width, and height, and includes methods for drawing the player on the canvas and updating its position based on
 * user input and gravity.
 *
 * The constructor initializes the player's position, velocity, width, and height.
 * The draw method renders the player as a rectangle on the canvas, while the update method handles the player's
 * movement and collision detection with the platforms and checkpoints.
 *
 * The update method also ensures that the player does not fall through the platforms and allows for
 * jumping mechanics by applying gravity.
 * Additionally, it includes boundary checks to prevent the player from moving off the screen.
 */

class Player {
  // The "constructor" method initializes the player's position, velocity, width, and height when a new
  // instance of the Player class is created. It sets the initial position of the player on the canvas,
  // initializes the velocity to zero, and defines the dimensions of the player character.
  constructor() {
    this.position = {
      x: proportionalSize(10), // Initial horizontal position of the player, scaled based on the window height.
      y: proportionalSize(400), // Initial vertical position of the player, scaled based on the window height.
    };
    // The "velocity" property is an object that represents the player's movement speed in both
    // the horizontal (x) and vertical (y) directions.
    this.velocity = {
      x: 0, // Initial horizontal velocity of the player, set to zero to indicate that the player is stationary at the start.
      y: 0, // Initial vertical velocity of the player, set to zero to indicate that the player is not moving vertically at the start.
    };
    this.width = proportionalSize(40); // The width of the player character, scaled based on the window height to ensure that it remains appropriately sized on different screen sizes.
    this.height = proportionalSize(40); // The height of the player character, scaled based on the window height to ensure that it remains appropriately sized on different screen sizes.
  }

  // The "draw" method is responsible for rendering the player character on the canvas.
  // It sets the fill color to a light blue shade and draws a rectangle at the player's current position
  // with the defined width and height.
  draw() {
    ctx.fillStyle = "#99c9ff"; // Sets the fill color for the player character to a light blue shade.
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height); // Draws a rectangle on the canvas at the player's current
    // position (this.position.x, this.position.y) with the specified width and height, visually representing the player
    // character in the game.
  }

  // The "update" method is responsible for updating the player's position based on its velocity and handling the effects of gravity.
  // It first calls the draw method to render the player on the canvas, then updates the player's position by adding the velocity values to the current position.
  // The method also includes logic to apply gravity to the player's vertical velocity and checks for collisions with the platforms and
  // boundaries of the canvas to ensure that the player does not fall through platforms or move off-screen.
  update() {
    this.draw(); // Calls the draw method to render the player on the canvas before updating its position.
    this.position.x += this.velocity.x; // Updates the player's horizontal position by adding the horizontal velocity to the current x-coordinate.
    this.position.y += this.velocity.y; // Updates the player's vertical position by adding the vertical velocity to the current y-coordinate.

    // The following block of code applies gravity to the player's vertical velocity and checks for collisions with the platforms and
    // boundaries of the canvas.
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      // If the player's next vertical position (current position + height + vertical velocity) is less than or equal to
      // the canvas height,
      // it means the player is still within the bounds of the canvas and can continue to fall due to gravity.
      if (this.position.y < 0) {
        this.position.y = 0; // If the player's vertical position is above the top of the canvas (less than 0),
        // it resets the position to 0 to prevent it from moving off-screen.

        this.velocity.y = gravity; // It also sets the vertical velocity to the gravity value, allowing the player to start
        // falling back down into the canvas.
      }
      this.velocity.y += gravity; // If the player is within the bounds of the canvas, it applies gravity by incrementing the
      // vertical velocity with the gravity value,
      // causing the player to accelerate downwards over time.
    } else {
      this.velocity.y = 0; // If the player's next vertical position exceeds the canvas height, it means the player has hit the
      // bottom of the canvas.
    }
    // The following block of code checks for horizontal boundaries to prevent the player from moving off-screen.
    if (this.position.x < this.width) {
      this.position.x = this.width; // If the player's horizontal position is less than its width (indicating it has moved off the left edge of the canvas),
      // it resets the position to the width value, ensuring that the player stays within the left boundary of the canvas.
    }

    // This condition checks if the player's horizontal position is greater than or equal to the canvas width minus twice the player's width.
    // If true, it means the player is trying to move beyond the right boundary of the canvas.
    // In this case, the player's horizontal position is set to the canvas width minus twice the player's width,
    // effectively preventing the player from moving off the right side of the screen.
    if (this.position.x >= canvas.width - this.width * 2) {
      this.position.x = canvas.width - this.width * 2; // If the player's horizontal position exceeds the right boundary of the canvas,
      //it resets the position to the maximum allowed value,
      // ensuring that the player stays within the right boundary of the canvas.
    }
  }
}
/**
 * The Platform class represents the platforms in the platformer game. It defines the properties of a platform, such as its position,
 * width, and height, and includes a method for drawing the platform on the canvas.
 *
 * The constructor initializes the platform's position based on the provided x and y coordinates, and sets the width and height of the platform.
 * The draw method renders the platform as a rectangle on the canvas with a specific color.
 * Platforms serve as surfaces that the player can stand on, jump from, or interact with in various ways throughout the game.
 */
class Platform {
  // The "constructor" method initializes the platform's position, width, and height when a new instance of the Platform class is created.
  // It takes two parameters, x and y, which represent the horizontal and vertical coordinates of the platform on the canvas.
  // The position is stored as an object with x and y properties, while the width and height are set to fixed values, with the
  // height being scaled based on the window height using the proportionalSize function.
  constructor(x, y) {
    this.position = {
      x,
      y,
    };
    this.width = 200; // The width of the platform is set to a fixed value of 200 pixels, providing a consistent size for all
    // platforms in the game.
    this.height = proportionalSize(40); // The height of the platform is set to a value of 40 pixels, scaled based on the window
    //height using the proportionalSize function.
  }

  // The "draw" method is responsible for rendering the platform on the canvas. It sets the fill color to a light green shade and
  // draws a rectangle at the platform's current position with the defined width and height.
  draw() {
    ctx.fillStyle = "#acd157"; // Sets the fill color for the platform to a light green shade.
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height); // Draws a rectangle on the canvas at the platform's current
    // position (this.position.x, this.position.y) with the
    // specified width and height,
  }
}

/**
 * The CheckPoint class represents the checkpoints in the platformer game. It defines the properties of a checkpoint,
 * such as its position, width, height, and claimed status, and includes methods for drawing the checkpoint on the canvas and
 * claiming it.
 *
 * The constructor initializes the checkpoint's position based on the provided x and y coordinates, sets the width and height
 * of the checkpoint,
 *
 * and initializes the claimed status to false. The draw method renders the checkpoint as a rectangle on the canvas with a
 * specific color,
 *
 * while the claim method updates the checkpoint's properties to indicate that it has been claimed by the player.
 * Checkpoints serve as save points or progress markers in the game, allowing players to respawn at specific locations after
 *  reaching them.
 */
class CheckPoint {
  // The "constructor" method initializes the checkpoint's position, width, height, and claimed status when a new instance of the CheckPoint class is created.
  // It takes three parameters: x and y for the horizontal and vertical coordinates of the checkpoint on the canvas, and z for the checkpoint's identifier or level.
  // The position is stored as an object with x and y properties, while the width and height are set to fixed values, with the height being scaled based on the window height using the proportionalSize function.
  // The claimed property is initialized to false, indicating that the checkpoint has not yet been claimed by the player.
  constructor(x, y, z) {
    // The "z" parameter is not used in the constructor, but it can be utilized to differentiate between different checkpoints or
    // levels in the game.
    this.position = {
      x, // The horizontal coordinate of the checkpoint on the canvas, set to the value of the x parameter passed to the constructor.
      y, // The vertical coordinate of the checkpoint on the canvas, set to the value of the y parameter passed to the constructor.
    };
    this.width = proportionalSize(40); // The width of the checkpoint is set to a value of 40 pixels, scaled based on the window
    // height using the proportionalSize function.
    this.height = proportionalSize(70); // The height of the checkpoint is set to a value of 70 pixels, scaled based on the window
    // height using the proportionalSize function.
    this.claimed = false; // The claimed property is initialized to false, indicating that the checkpoint has not yet been
    // claimed by the player. This property can be updated to true when the player reaches the checkpoint,
    // allowing for game mechanics such as respawning or saving progress.
  }

  // The "draw" method is responsible for rendering the checkpoint on the canvas. It sets the fill color to a golden yellow shade and
  // draws a rectangle at the checkpoint's current position with the defined width and height.
  // Checkpoints serve as save points or progress markers in the game, allowing players to respawn at specific locations after
  // reaching them.
  draw() {
    ctx.fillStyle = "#f1be32"; // Sets the fill color for the checkpoint to a golden yellow shade.
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height); // Draws a rectangle on the canvas at the checkpoint's current position (this.position.x, this.position.y) with the
  }
  // The "claim" method is responsible for updating the checkpoint's properties to indicate that it has been claimed by the player.
  // When this method is called, it sets the width and height of the checkpoint to zero, effectively making it invisible on the canvas.
  // It also sets the vertical position to Infinity, which can be used to prevent further interactions with the checkpoint.
  // Finally, it updates the claimed property to true, indicating that the checkpoint has been successfully claimed by the player.
  claim() {
    this.width = 0; // Sets the width of the checkpoint to zero, making it invisible on the canvas.
    this.height = 0; // Sets the height of the checkpoint to zero, making it invisible on the canvas.
    this.position.y = Infinity; // Sets the vertical position of the checkpoint to Infinity, which can be used to prevent further interactions with the checkpoint.
    this.claimed = true; // Updates the claimed property to true, indicating that the checkpoint has been successfully claimed by the player.
  }
}

// Create a new instance of the Player class, which represents the main character in the platformer game.
// This instance will be used to track the player's position, velocity, and interactions with platforms and
// checkpoints throughout the game.
const player = new Player();

/**
 * The platformPositions array defines the initial positions of the platforms in the platformer game. Each object in the
 * array contains x and y properties, which represent the horizontal and vertical coordinates of a platform on the canvas.
 * The y values are scaled using the proportionalSize function to ensure that the platforms are appropriately sized based on
 * the window height.
 */

const platformPositions = [
  { x: 500, y: proportionalSize(450) },
  { x: 700, y: proportionalSize(400) },
  { x: 850, y: proportionalSize(350) },
  { x: 900, y: proportionalSize(350) },
  { x: 1050, y: proportionalSize(150) },
  { x: 2500, y: proportionalSize(450) },
  { x: 2900, y: proportionalSize(400) },
  { x: 3150, y: proportionalSize(350) },
  { x: 3900, y: proportionalSize(450) },
  { x: 4200, y: proportionalSize(400) },
  { x: 4400, y: proportionalSize(200) },
  { x: 4700, y: proportionalSize(150) },
];

/**
 * The platforms array is created by mapping over the platformPositions array and
 * instantiating a new Platform object for each set of coordinates.
 *
 * The map function takes each platform object from the platformPositions array,
 * extracts the x and y coordinates, and passes them as arguments to the Platform constructor.
 *
 * Each Platform object is initialized with the x and y coordinates from the platformPositions array,
 * which define the position of the platform on the canvas.
 *
 * The resulting platforms array contains instances of the Platform class, each representing a platform in the game that
 * the player can interact with.
 *
 * This array will be used to manage and render all the platforms in the game, allowing for interactions with
 * the player character as they navigate through the level.
 */
const platforms = platformPositions.map(
  (platform) => new Platform(platform.x, platform.y),
);

const checkpointPositions = [
  { x: 1170, y: proportionalSize(80), z: 1 },
  { x: 2900, y: proportionalSize(330), z: 2 },
  { x: 4800, y: proportionalSize(80), z: 3 },
];

const checkpoints = checkpointPositions.map(
  (checkpoint) => new CheckPoint(checkpoint.x, checkpoint.y, checkpoint.z),
);

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  platforms.forEach((platform) => {
    platform.draw();
  });

  checkpoints.forEach((checkpoint) => {
    checkpoint.draw();
  });

  player.update();

  if (keys.rightKey.pressed && player.position.x < proportionalSize(400)) {
    player.velocity.x = 5;
  } else if (
    keys.leftKey.pressed &&
    player.position.x > proportionalSize(100)
  ) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.rightKey.pressed && isCheckpointCollisionDetectionActive) {
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });

      checkpoints.forEach((checkpoint) => {
        checkpoint.position.x -= 5;
      });
    } else if (keys.leftKey.pressed && isCheckpointCollisionDetectionActive) {
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });

      checkpoints.forEach((checkpoint) => {
        checkpoint.position.x += 5;
      });
    }
  }

  platforms.forEach((platform) => {
    const collisionDetectionRules = [
      player.position.y + player.height <= platform.position.y,
      player.position.y + player.height + player.velocity.y >=
        platform.position.y,
      player.position.x >= platform.position.x - player.width / 2,
      player.position.x <=
        platform.position.x + platform.width - player.width / 3,
    ];

    if (collisionDetectionRules.every((rule) => rule)) {
      player.velocity.y = 0;
      return;
    }

    const platformDetectionRules = [
      player.position.x >= platform.position.x - player.width / 2,
      player.position.x <=
        platform.position.x + platform.width - player.width / 3,
      player.position.y + player.height >= platform.position.y,
      player.position.y <= platform.position.y + platform.height,
    ];

    if (platformDetectionRules.every((rule) => rule)) {
      player.position.y = platform.position.y + player.height;
      player.velocity.y = gravity;
    }
  });

  checkpoints.forEach((checkpoint, index, checkpoints) => {
    const checkpointDetectionRules = [
      player.position.x >= checkpoint.position.x,
      player.position.y >= checkpoint.position.y,
      player.position.y + player.height <=
        checkpoint.position.y + checkpoint.height,
      isCheckpointCollisionDetectionActive,
      player.position.x - player.width <=
        checkpoint.position.x - checkpoint.width + player.width * 0.9,
      index === 0 || checkpoints[index - 1].claimed === true,
    ];

    if (checkpointDetectionRules.every((rule) => rule)) {
      checkpoint.claim();

      if (index === checkpoints.length - 1) {
        isCheckpointCollisionDetectionActive = false;
        showCheckpointScreen("You reached the final checkpoint!");
        movePlayer("ArrowRight", 0, false);
      } else if (
        player.position.x >= checkpoint.position.x &&
        player.position.x <= checkpoint.position.x + 40
      ) {
        showCheckpointScreen("You reached a checkpoint!");
      }
    }
  });
};

const keys = {
  rightKey: {
    pressed: false,
  },
  leftKey: {
    pressed: false,
  },
};

const movePlayer = (key, xVelocity, isPressed) => {
  if (!isCheckpointCollisionDetectionActive) {
    player.velocity.x = 0;
    player.velocity.y = 0;
    return;
  }

  switch (key) {
    case "ArrowLeft":
      keys.leftKey.pressed = isPressed;
      if (xVelocity === 0) {
        player.velocity.x = xVelocity;
      }
      player.velocity.x -= xVelocity;
      break;
    case "ArrowUp":
    case " ":
    case "Spacebar":
      player.velocity.y -= 8;
      break;
    case "ArrowRight":
      keys.rightKey.pressed = isPressed;
      if (xVelocity === 0) {
        player.velocity.x = xVelocity;
      }
      player.velocity.x += xVelocity;
  }
};

const startGame = () => {
  canvas.style.display = "block";
  startScreen.style.display = "none";
  animate();
};

const showCheckpointScreen = (msg) => {
  checkpointScreen.style.display = "block";
  checkpointMessage.textContent = msg;
  if (isCheckpointCollisionDetectionActive) {
    setTimeout(() => (checkpointScreen.style.display = "none"), 2000);
  }
};

startBtn.addEventListener("click", startGame);

window.addEventListener("keydown", ({ key }) => {
  movePlayer(key, 8, true);
});

window.addEventListener("keyup", ({ key }) => {
  movePlayer(key, 0, false);
});
