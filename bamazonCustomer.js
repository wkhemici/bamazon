var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
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
    console.log(res);
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
        connection.query("SELECT price FROM products WHERE ?", { product_name: inquirerResponse.products }, function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                // if (res[i].stock_quantity > inquirerResponse.quantity) {
                console.log("You purchased " + inquirerResponse.quantity + " " + inquirerResponse.products + " items.");
                console.log("The total price for your purchase is $" + res[i].price * inquirerResponse.quantity)
                // };
     }

     connection.end();
 }
    )
            };

        }
        });
})

     }

//My attempt at updated mySQL:
//      let sql = `UPDATE products,
//            SET stock_quantity = ?,
//            WHERE  = ?`;
 
// let data = [false, 1];
// connection.query(sql, data, (error, results, fields) => {
//     if (error){
//       return console.error(error.message);
//     }
//     console.log('Rows affected:', results.affectedRows);
//   });

