/** 
 *OOP, or Object Oriented Programming, is one of the major approaches to the software development process. 
 In OOP, developers use objects and classes to structure their code.
 In this shopping cart project, you'll learn how to define classes and use them. 
 You'll create class instances and implement methods for data manipulation.

This project will cover concepts like the ternary operator, the spread operator, the "this" keyword, and more.
*/

const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false; // This variable will be used to toggle the visibility of the shopping cart

/**
 * The products array contains a list of dessert products, each with an id, name, price, and category.
 * This array will be used to display the products on the page and to add items to the shopping cart.
 * Each product is represented as an object with the following properties:
 * - id: A unique identifier for the product.
 * - name: The name of the product.
 * - price: The price of the product.
 * - category: The category of the product.
 *
 */
const products = [
  {
    id: 1,
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
  {
    id: 2,
    name: "French Macaron",
    price: 3.99,
    category: "Macaron",
  },
  {
    id: 3,
    name: "Pumpkin Cupcake",
    price: 3.99,
    category: "Cupcake",
  },
  {
    id: 4,
    name: "Chocolate Cupcake",
    price: 5.99,
    category: "Cupcake",
  },
  {
    id: 5,
    name: "Chocolate Pretzels (4 Pack)",
    price: 10.99,
    category: "Pretzel",
  },
  {
    id: 6,
    name: "Strawberry Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 7,
    name: "Chocolate Macarons (4 Pack)",
    price: 9.99,
    category: "Macaron",
  },
  {
    id: 8,
    name: "Strawberry Pretzel",
    price: 4.99,
    category: "Pretzel",
  },
  {
    id: 9,
    name: "Butter Pecan Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 10,
    name: "Rocky Road Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 11,
    name: "Vanilla Macarons (5 Pack)",
    price: 11.99,
    category: "Macaron",
  },
  {
    id: 12,
    name: "Lemon Cupcakes (4 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
];

/**
 * The forEach loop iterates over the products array and creates a card for each product.
 * Each card displays the product's name, price, category, and an "Add to cart" button.
 * The button has an id that corresponds to the product's id, which will be used to add the product to the shopping cart when clicked.
 * The innerHTML property is used to dynamically generate the HTML for each product card and append it to the dessertCards container.
 */

products.forEach(({ name, id, price, category }) => {
  dessertCards.innerHTML += `
      <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button 
          id="${id}" 
          class="btn add-to-cart-btn">Add to cart
        </button>
      </div>
    `;
});

/**
 * The ShoppingCart class represents a shopping cart that can hold items, calculate totals, and manage the cart's state.
 *
 * The class has the following properties:
 * - items: An array that holds the items added to the cart.
 * - total: The total price of all items in the cart.
 * - taxRate: The tax rate applied to the cart.
 *
 * The class has the following methods:
 * - addItem(id, products): Adds an item to the cart based on its id and the products array.
 * - getCounts(): Returns the total number of items in the cart.
 * - clearCart(): Clears all items from the cart and resets the total.
 * - calculateTaxes(amount): Calculates the taxes based on the given amount and the tax rate.
 * - calculateTotal(): Calculates the total price of the items in the cart, including taxes, and updates the corresponding HTML elements.
 *
 * The class uses the "this" keyword to refer to the instance of the ShoppingCart class and its properties and methods.
 *
 * The addItem method also uses the find method to locate the product in the products
 * array and updates the cart's items and total accordingly.
 *
 * The clearCart method uses the confirm function to ask the user for confirmation
 * before clearing the cart, and it updates the HTML elements to reflect the changes.
 *
 * The calculateTotal method uses the reduce method to sum up the prices of the items in
 * the cart and updates the subtotal, taxes, and total in the HTML.
 *
 * The calculateTaxes method uses the ternary operator to calculate
 * the taxes based on whether the amount is greater than 0 or not.
 *
 * Overall, the ShoppingCart class encapsulates the functionality of a shopping cart
 * and provides methods to manage the cart's state and calculate totals.
 *
 * The class is used to create an instance of the ShoppingCart class and call its methods to
 * add items to the cart, calculate totals, and manage the cart's state.
 */

class ShoppingCart {
  constructor() {
    this.items = []; // This array will hold the items added to the cart
    this.total = 0; // This variable will hold the total price of the items in the cart
    this.taxRate = 8.25; // This variable represents the tax rate applied to the cart (8.25% in this case)
  }

  // This method adds an item to the cart based on its id and the products array
  addItem(id, products) {
    const product = products.find((item) => item.id === id); // The find method is used to locate the product in the products array based on its id
    const { name, price } = product; // Destructuring is used to extract the name and price properties from the product object
    this.items.push(product); // The product is added to the items array of the cart using the push method

    const totalCountPerProduct = {}; // This object will be used to keep track of the total count of each product in the cart

    // The forEach loop iterates over the items in the cart and updates the total count for each product based on its id
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] =
        (totalCountPerProduct[dessert.id] || 0) + 1; // The count for each product is incremented by 1 for each occurrence of the product in the items array
    });

    const currentProductCount = totalCountPerProduct[product.id]; // This variable holds the current count of the product being added to the cart
    const currentProductCountSpan = document.getElementById(
      `product-count-for-id${id}`,
    ); // This variable holds the reference to the HTML element that displays the count of the product in the cart

    // The ternary operator is used to update the count of the product in the cart if it already exists, or to add a new entry for the product if it doesn't exist
    currentProductCount > 1
      ? (currentProductCountSpan.textContent = `${currentProductCount}x`)
      : (productsContainer.innerHTML += `
      <div id="dessert${id}" class="product">
        <p>
          <span class="product-count" id="product-count-for-id${id}"></span>${name}
        </p>
        <p>${price}</p>
      </div>
      `);
  }

  // This method returns the total number of items in the cart by returning the length of the items array
  getCounts() {
    return this.items.length; // The length property of the items array is used to get the total number of items in the cart
  }

  // This method clears all items from the cart and resets the total
  clearCart() {
    // The if statement checks if the items array is empty, and if it is, it alerts the user
    // that the shopping cart is already empty and returns from the function
    if (!this.items.length) {
      alert("Your shopping cart is already empty");
      return;
    }

    const isCartCleared = confirm(
      "Are you sure you want to clear all items from your shopping cart?",
    ); // The confirm function is used to ask the user for confirmation before clearing the cart,
    // and it returns a boolean value based on the user's response

    // If the user confirms that they want to clear the cart, the items array is cleared, the total is reset to 0,
    // and the corresponding HTML elements are updated to reflect the changes
    if (isCartCleared) {
      this.items = []; // The items array is cleared by assigning an empty array to it
      this.total = 0; // The total is reset to 0 by assigning 0 to the total variable
      productsContainer.innerHTML = ""; // The innerHTML property of the productsContainer element is set to an empty string to clear the displayed products in the cart
      totalNumberOfItems.textContent = 0; // The textContent property of the totalNumberOfItems element is set to 0 to update the displayed total number of items in the cart
      cartSubTotal.textContent = 0; // The textContent property of the cartSubTotal element is set to 0 to update the displayed subtotal in the cart
      cartTaxes.textContent = 0; // The textContent property of the cartTaxes element is set to 0 to update the displayed taxes in the cart
      cartTotal.textContent = 0; // The textContent property of the cartTotal element is set to 0 to update the displayed total in the cart
    }
  }

  // This method calculates the taxes based on the given amount and the tax rate and returns the calculated tax amount
  // and use the toFixed method to round the result to 2 decimal places
  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2)); // The tax amount is calculated by multiplying the tax rate (converted to a decimal) by the given amount, and the result is rounded to 2 decimal places using the toFixed method.
    // The parseFloat function is used to convert the string result from toFixed back to a number.
  }

  // This method calculates the total price of the items in the cart, including taxes,
  // and updates the corresponding HTML elements to display the subtotal, taxes, and total in the cart
  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0); // The reduce method is used to sum up the prices of the items in the cart, starting with an initial value of 0 for the total.
    // The total is updated by adding the price of each item in the items array. The result is stored in the subTotal variable.
    const tax = this.calculateTaxes(subTotal); // The calculateTaxes method is called with the subTotal as an argument to calculate the tax
    // amount based on the subtotal. The result is stored in the tax variable.
    this.total = subTotal + tax; // The total price of the items in the cart, including taxes, is calculated by adding the subTotal
    // and the tax, and the result is stored in the total property of the ShoppingCart instance.
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`; // The textContent property of the cartSubTotal element is updated to display
    // the calculated subtotal in the cart, formatted as a currency string with 2 decimal places using the toFixed method.
    cartTaxes.textContent = `$${tax.toFixed(2)}`; // The textContent property of the cartTaxes element is updated to display the
    // calculated tax amount in the cart, formatted as a currency string with 2 decimal places using the toFixed method.
    cartTotal.textContent = `$${this.total.toFixed(2)}`; // The textContent property of the cartTotal element is updated to display
    // the calculated total price of the items in the cart, including taxes, formatted as a currency string with 2 decimal places using
    // the toFixed method.
    return this.total;
  }
}

const cart = new ShoppingCart(); // An instance of the ShoppingCart class is created and stored in the cart variable.
// This instance will be used to call the methods of the ShoppingCart class to manage the shopping cart's state and calculate totals.
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn"); // The getElementsByClassName method is used to get a
// collection of all elements with the class name "add-to-cart-btn", which are the buttons for adding items to the cart.

// The forEach loop is used to iterate over the collection of add-to-cart buttons and add a click event listener to each button.
// Spread ("...") operator is used to convert the HTMLCollection returned by getElementsByClassName into an array,
// allowing us to use the forEach method to iterate over it.
[...addToCartBtns].forEach((btn) => {
  btn.addEventListener("click", (event) => {
    cart.addItem(Number(event.target.id), products); // When a button is clicked, the addItem method of the cart instance is called
    // with the id of the clicked button (converted to a number) and the products array as arguments.
    totalNumberOfItems.textContent = cart.getCounts(); // The textContent property of the totalNumberOfItems element is updated
    // to display the total number of items in the cart by calling the getCounts method of the cart instance.
    cart.calculateTotal(); // The calculateTotal method of the cart instance is called to calculate the total price of the items in
    // the cart, including taxes, and update the corresponding HTML elements to display the subtotal, taxes, and total in the cart.
  });
});

cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));
