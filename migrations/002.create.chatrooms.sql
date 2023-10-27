CREATE TABLE IF NOT EXISTS chatrooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_by INTEGER,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

INSERT INTO chatrooms (name, created_by)
VALUES ('Hypertensive', 2);
 
SELECT * from chatrooms;

DELETE from chatrooms where id = 6;

DROP TABLE chatrooms;