var mysql = require("mysql");
var inquirer = require ("inquirer");

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

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}


function Product (number,units) {
    this.number = number;
    this.units = units;  
}

Product.prototype.printInfo = function() {
    console.log("ID #: " + this.number + "\nUnits: " + this.units);
  };

inquirer.prompt ([
{
    name: "Id #",
    message: "What is the ID # of the prodcut that you are looking for (1-10)?"
},
{
    name: "Units",
    message: "How many units of this product would you like to buy?",
},
]).then((answer) =>{
    var cart = new Cart(answer.number, answer.units);
    cart.printStats();
});


// Write code here to parse command line arguments and store them into variables

var idNumber = process.argv[2];
var units = process.argv.splice(6).join(" ");

// Add code to print whether there is enough inventory of the item that was chosen

if(units < units) {
    console.log("Insufficient quantity");
}
