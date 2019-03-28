// Load the NPM Package inquirer
var inquirer = require("inquirer");

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
        type: "list",
        message: "Which product do you choose?",
        choices: ["Manolos", "Hermes", "Versace", "Nike", "Dior",
                 "Victoria Beckham", "Louboutin", "Jimmy Choo", "Prada", "Celine"],
        name: "products"
    },
    // Here we create a basic password-protected text prompt.
    {
      type: "input",
      message: "How many",
      name: "quantity"
    },
    // Here we give the user a list to choose from.
    
  ])
  .then(function(inquirerResponse) {
      console.log("You purchased " +  inquirerResponse.quantity + " " + inquirerResponse.products + " items.");
    }
);
