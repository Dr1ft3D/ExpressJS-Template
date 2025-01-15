CREATE DATABASE IF NOT EXISTS ejstemplate;
USE ejstemplate;


CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    discordid VARCHAR(255) UNIQUE,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    avatar VARCHAR(255),
    accesstoken TEXT,
    refreshtoken TEXT,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
