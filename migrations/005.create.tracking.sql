CREATE TABLE IF NOT EXISTS tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    systolic_bp INTEGER NOT NULL,
    diastolic_bp INTEGER NOT NULL,
    pulse INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
); 

INSERT INTO tracking (user_id, systolic_bp, diastolic_bp, pulse)
VALUES (2, 120, 80, 90);

SELECT * from tracking;

DROP TABLE tracking;