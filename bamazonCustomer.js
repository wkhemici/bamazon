var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port;
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Algeria1!",
    database: "bamazon_db"
});

connection.connect(function (err, res) {
    if (err) throw err;
    queryProducts();
    console.log("Showing you our products...")
    // console.log(res);
    // searchProducts();
    // searchQuanitity()
})

function queryProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log("Showing you our products...")
        // console.log(res);
    }
    )

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
            {
                type: "input",
                message: "How many",
                name: "quantity"
            },
            // Here we give the user a list to choose from.

        ])
        .then(function (inquirerResponse) {

            connection.query("SELECT stock_quantity FROM products WHERE ?", { product_name: inquirerResponse.products }, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].stock_quantity < inquirerResponse.quantity) {
                        console.log("We only have " + res[i].stock_quantity + " in stock. Please select fewer items and start over.")
                    } else {
                        connection.query("SELECT price, stock_quantity FROM products WHERE ?", { product_name: inquirerResponse.products }, function (err, res) {
                            if (err) throw err;
                            for (var i = 0; i < res.length; i++) {
                                // if (res[i].stock_quantity > inquirerResponse.quantity) {
                                console.log("You purchased " + inquirerResponse.quantity + " " + inquirerResponse.products + " items.");
                                console.log("The total price for your purchase is $" + res[i].price * inquirerResponse.quantity)
                                // };
                                
                                var userInput = parseInt(inquirerResponse.quantity)
                                var dataQuantity = res[i].stock_quantity - userInput;
                                console.log(res[i].stock_quantity);
                                // console.log(dataQuantity);
                                console.log(typeof (dataQuantity))
                                var query = "UPDATE products SET ? WHERE ?;"
                                 connection.query(query,
                                    [
                                        {
                                            stock_quantity: dataQuantity
                                        },
                                        { product_name: inquirerResponse.products }

                                    ],
                                )
                                // console.log(res[i].stock_quantity);
                            }


                            connection.end();
                        }
                        )
                    };

                }
            });
        })

}
