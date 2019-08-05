DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INTEGER(10) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  department VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER(10) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (name, department, price, stock) 
VALUES ('football', 'sports', 10.00, 20), ('soccer ball', 'sports', 11.00, 20), ('laptop', 'electronics', 210.00, 10),
('tv', 'electronics', 250.00, 10), ('video game', 'electronics', 50.00, 15), ('shirt', 'apparel', 20.00, 25),
('jacket', 'apparel', 90.00, 15), ('hat', 'apparel', 25.00, 5),
('chair', 'home', 10.00, 8), ('table', 'home', 120.00, 2);

SELECT * FROM products;