CREATE TABLE IF NOT EXISTS tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER , -- User ID column
    systolic INTEGER NOT NULL,
    diastolic INTEGER NOT NULL,
    pulse INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tracking (user_id, systolic, diastolic, pulse)
VALUES (2, 120, 80, 90);

SELECT * from tracking;

DROP TABLE tracking;