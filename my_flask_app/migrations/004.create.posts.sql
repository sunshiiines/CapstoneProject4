CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_info TEXT NOT NULL,
    sender_id INTEGER NOT NULL,
    chatroom_id INTEGER,
    created_at DATETIME,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (chatroom_id) REFERENCES chatrooms(id)
); 

CREATE TRIGGER set_created_at_on_insert
AFTER INSERT ON posts
BEGIN
  UPDATE posts
  SET created_at = DATETIME('now')
  WHERE rowid = NEW.rowid;
END;

INSERT INTO posts (post_info, sender_id, chatroom_id, created_at) 
VALUES ('Hi, I am Jane, a personal trainer', 2, 1, '2023-09-28 14:35:00');

SELECT * from posts; 