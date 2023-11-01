CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    contacts TEXT NOT NULL UNIQUE,
    doctor TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
); 

INSERT INTO appointments (user_id, contacts, doctor)
VALUES (1, '0714567389', 'Doctor Three');

SELECT * from appointments;

-- DROP TABLE appointments;