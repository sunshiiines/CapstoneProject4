import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const db = await sqlite.open({
    filename: './101.db',
    driver: sqlite3.Database
});

await db.migrate()

console.log('start')

// users

export async function getUsers() {
    const result = await db.all('select * from users')
    return result;
}
const result = await getUsers()
//console.log(result)

export async function addUser(username, email, password, status) {
    const sql = 'insert into users (username, email, password, status) values (?, ?, ?, ?)'
    await db.run(sql, [username, email, password, status]);
}
export async function deleteUser(username) {
    const sql = 'delete from users where username = ?';
    await db.run(sql, [username]);
}

// chatrooms

export async function getChatrooms() {
    const result3 = await db.all('select * from chatrooms')
    return result3;
}
const result3 = await getChatrooms()
console.log(result3)

export async function addChatroom(name, created_by) {
    const sql = 'insert into chatrooms (name, created_by) values (?, ?)'
    await db.run(sql, [name, created_by]);
}
export async function deleteChatroom(name) {
    const sql = 'delete from chatrooms where name = ?';
    await db.run(sql, [name]);
}
export async function updateChatroom(newName, chatroomId) {
    const sql = 'update chatrooms set name = ? where id = ?';
    await db.run(sql, [newName, chatroomId]);
}


// chatrooms_members

export async function getChatroomMembers() {
    const result5 = await db.all('select * from chatrooms')
    return result5;
}
const result5 = await getChatroomMembers()
console.log(result5)

export async function addChatroomMember(chatroomId, userId, joinedAt){
const sql = 'insert into chatroom_members (chatroom_id, user_id, joined_at) values (?, ?, ?)';
await db.run(sql, [chatroomId, userId, joinedAt]);
}

// posts

export async function getPosts() {
    const result7 = await db.all('select * from posts')
    return result7;
}
const result7 = await getPosts()
console.log(result7)

export async function addPost(post_info, sender_id, chatroom_id, created_at) {
    const sql = 'insert into posts (post_info, sender_id, chatroom_id, created_at) values (?, ?, ?, ?)'
    await db.run(sql, [post_info, sender_id, chatroom_id, created_at]);
}
export async function deletePost(postId) {
    const sql = 'delete from posts where id = ?';
    await db.run(sql, [postId]);
}
export async function updatePost(post_info, postId){
    const sql = 'update posts set post_info = ? where id = ?';
    await db.run(sql, [post_info, postId]);
}

console.log('====================')
// await addUser('Mandy_Z', 'mandyZ@example.com', 'pasword2', 'offline');
// await deleteUser('Mandy_Z');

//await addChatroomMember(1, 5, '2023-09-28 14:35:00')

//await addChatroom('Hypertension tracking', 5);
//await updateChatroom('Hypertension patients', 4);
//await deleteChatroom('Hypertension tracking');

//await addPost('Hi i am new here', 5, 2, '2023-09-28 14:35:00');
//await updatePost('Hi,I am new here, whats up?', 3);
//await deletePost(2);

const result2 = await getUsers()
console.log(result2);
const result4 = await getChatrooms()
console.log(result4);
const result6 = await addChatroomMember()
console.log(result6)
const result8 = await getPosts()
console.log(result8);

console.log('====================')

console.log('end')