CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'offline'
); 

INSERT INTO users (name, email, password, status)
VALUES ('John Doe', 'johndoe@example.com', 'password567', 'offline');

UPDATE users
SET email = 'jane1@example.com'
WHERE username = 'jane_tae';
               
SELECT * FROM users;

-- DROP TABLE users;