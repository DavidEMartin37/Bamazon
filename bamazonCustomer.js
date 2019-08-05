var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("ID #: " + res[i].id + " | " + "Item Name: " + res[i].name + " | " + "Item Price: " + res[i].price);
    };
    // console.log(res);
    start(res);
  });
}

function start(res) {
  inquirer
    .prompt([
      {
        name: "choice",
        type: "input",
        message: "What is the desired item's id number?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like?"
      }
    ])
    .then(function (answer) {
      var choiceId = parseInt(answer.choice);
      var quantity = parseInt(answer.quantity);
      var itemChosen = check(choiceId, res);
      if (quantity > itemChosen.stock) {
        console.log("\nInsufficient quantity!");
        readProducts();
      }
      else {
        buy(itemChosen, quantity);
      }
    });
}

function check(choiceId, res) {
  for (var i = 0; i < res.length; i++) {
    if (res[i].id === choiceId) {
      return res[i];
    } else {
      readProducts();
    }
  }
}

function buy(itemChosen, quantity) {
  connection.query(
    "UPDATE products SET stock = stock - ? WHERE id = ?",
    [quantity, itemChosen.id],
    function (err, res) {
      console.log("\nThank you for buying: " + quantity + " " + itemChosen.name);
      console.log("Your total cost was: $ " + (quantity * itemChosen.price));
      connection.end();
    }
  );
  
}
