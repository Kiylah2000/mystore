DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(45) NULL,
department_name VARCHAR(45) NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Men's Blazer", "Menswear", 29.99, 9), 
("Men's socks", "Menswear", 12.99, 6),
("scarfs", "Outerwear", 12.99, 4), 
("Windbreaker", "Outerwear", 32.99, 9),
("Hoodie", "Outerwear", 22.99, 4),
("Silk Robe", "Intimates", 50.99, 7),
("Lingerie", "Intimates", 27.99, 2),
("Earrings", "Jewelry", 8.99, 5),
("Necklace", "Jewelry", 7.99, 4),
("Bracelets", "Jewelry", 9.99, 3);

