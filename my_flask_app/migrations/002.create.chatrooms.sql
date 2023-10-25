CREATE TABLE IF NOT EXISTS chatrooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_by INTEGER NOT NULL,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

INSERT INTO chatrooms (name, created_by)
VALUES ('Easy effective exercises', 1);
 
SELECT * from chatrooms;

DROP TABLE chatrooms;