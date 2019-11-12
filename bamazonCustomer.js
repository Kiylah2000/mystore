var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "princessK95$",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    readProducts();
});

// Function that accesses Mysql database and returns the item ID, department, price, product name
function readProducts() {
    console.log("Here is a list of all products that we offer....\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        Questions();
    });
}

// Function that uses inquirer to promt the customer and asks what do the want to buy and how many units do they want
function Questions() {

    inquirer.prompt([
        {
            name: "purchaseID",
            type: "input",
            message: "What is the ID # of the prodcut that you are looking for (1-10)?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        },
        {
            name: "purchaseUnits",
            type: "input",
            message: "How many units of this product would you like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        },
    ]).then((purchases) => {
        // Check to see of the given item # exists with the desired quantity
        connection.query("SELECT item_id, product_name, stock_quantity, price FROM products WHERE ?", { item_id: purchases.purchaseID }, 
        function (err, data) {
            if (err) throw err;
            if (data[0].stock_quantity >= purchases.purchaseUnits) {
                //updates the quantities in the database
                var purchaseTotal = purchases.purchaseUnits * data[0].price;
                var query = ("UPDATE products SET stock_quantity = " + (data[0].stock_quantity - purchases.purchaseUnits) + " WHERE item_id= "+ purchases.purchaseID);                connection.query(query, function(err, data) {
                    if (err) throw err;
                    console.log("Your total is: " + purchaseTotal);
                    console.log("Congratulations, the product you requested is in stock! Placing Your order!");

                });
            }
            else {
                console.log("Sorry, there is not enough product in stock, your order can not be placed.");
                console.log("Please modify your order.");
                console.log("\n---------------------------------------------------------------------\n");
                readProducts();
            }
        }

    )}
)};