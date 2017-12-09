DROP DATABASE IF EXISTS restaurant_db;
-- Database Creation
CREATE DATABASE restaurant_db;

USE restaurant_db;

-- Table Creation
CREATE TABLE diners(
id INTEGER AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50),
location VARCHAR(50),
type VARCHAR(50),
date TIMESTAMP);