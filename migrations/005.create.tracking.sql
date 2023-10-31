CREATE TABLE IF NOT EXISTS tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER , 
    systolic INTEGER NOT NULL,
    diastolic INTEGER NOT NULL,
    pulse INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data (optional)
INSERT INTO tracking (user_id, systolic, diastolic, pulse)
VALUES (1, 120, 80, 90); -- User 1's reading

-- Select all data from the tracking table
SELECT * FROM tracking;
