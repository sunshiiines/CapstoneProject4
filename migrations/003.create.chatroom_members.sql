CREATE TABLE IF NOT EXISTS chatroom_members (
    chatroom_id INTEGER NOT NULL,
    user_id INTEGER,
    joined_at DATETIME NOT NULL,
    PRIMARY KEY (chatroom_id, user_id),
    FOREIGN KEY (chatroom_id) REFERENCES chatrooms(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TRIGGER set_joined_at_on_insert
AFTER INSERT ON chatroom_members
BEGIN
  UPDATE chatroom_members
  SET joined_at = DATETIME('now')
  WHERE rowid = NEW.rowid;
END;

INSERT INTO chatroom_members (chatroom_id, user_id, joined_at) 
VALUES (2, 1, '2023-09-28 14:35:00');

SELECT * FROM chatroom_members;

-- DROP TABLE chatroom_members;