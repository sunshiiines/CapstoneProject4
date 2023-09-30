CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'offline'
); 

INSERT INTO users (username, email, password, status)
VALUES ('joe_doe', 'joe@example.com', 'password123', 'offline');

UPDATE users
SET email = 'jane1@example.com'
WHERE username = 'jane_tae';
               
 

DROP TABLE users;
