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

export async function addUser(name, email, password, status) {
    const sql = 'insert into users (name, email, password, status) values (?, ?, ?, ?)'
    await db.run(sql, [name, email, password, status]);
}
export async function deleteUser(id) {
    const sql = 'delete from users where id = ?';
    await db.run(sql, [id]);
}

// chatrooms

export async function getChatrooms() {
    const result3 = await db.all('select * from chatrooms')
    return result3;
}
const result3 = await getChatrooms()
//console.log(result3)

export async function addChatroom(name, created_by) {
    const sql = 'insert into chatrooms (name, created_by) values (?, ?)'
    await db.run(sql, [name, created_by]);
}
export async function deleteChatroom(id) {
    const sql = 'delete from chatrooms where id = ?';
    await db.run(sql, [id]);
}
export async function updateChatroom(name, id) {
    const sql = 'update chatrooms set name = ? where id = ?';
    await db.run(sql, [name, id]);
}


// chatrooms_members

export async function getChatroomMembers() {
    const result5 = await db.all('select * from chatroom_members')
    return result5;
}
const result5 = await getChatroomMembers()
//console.log(result5)

export async function addChatroomMember(chatroom_id, user_id, joined_at){
const sql = 'insert into chatroom_members (chatroom_id, user_id, joined_at) values (?, ?, ?)';
await db.run(sql, [chatroom_id, user_id, joined_at]);
}
export async function deleteChatroomMember(chatroom_id, user_id) {
    const sql = 'delete from chatroom_members where chatroom_id = ? and user_id = ?';
    await db.run(sql, [chatroom_id, user_id]);
}


// posts

export async function getPosts() {
    const result7 = await db.all('select * from posts')
    return result7;
}
const result7 = await getPosts()
//console.log(result7)

export async function addPost(post_info, sender_id, chatroom_id, created_at) {
    const sql = 'insert into posts (post_info, sender_id, chatroom_id, created_at) values (?, ?, ?, ?)'
    await db.run(sql, [post_info, sender_id, chatroom_id, created_at]);
}
export async function deletePost(id) {
    const sql = 'delete from posts where id = ?';
    await db.run(sql, [id]);
}
export async function updatePost(post_info, id){
    const sql = 'update posts set post_info = ? where id = ?';
    await db.run(sql, [post_info, id]);
}

//tracking
export async function getTracking() {
    const result = await db.all('SELECT * FROM tracking');
    return result;
}

export async function addTracking(user_id, systolic, diastolic, pulse) {
    const sql = 'INSERT INTO tracking (user_id, systolic, diastolic, pulse) VALUES (?, ?, ?, ?)';
    await db.run(sql, [user_id, systolic, diastolic, pulse]);
}

export async function deleteTracking(id) {
    const sql = 'DELETE FROM tracking WHERE id = ?';
    await db.run(sql, [id]);
}

export async function updateTracking(systolic, diastolic, pulse, id) {
    const sql = 'UPDATE tracking SET systolic = ?, diastolic = ?, pulse = ? WHERE id = ?';
    await db.run(sql, [systolic, diastolic, pulse, id]);
}

const result2 = await getUsers()
console.log(result2);
const result4 = await getChatrooms()
console.log(result4);
const result6 = await getChatroomMembers()
console.log(result6)
const result8 = await getPosts()
console.log(result8);
const result10 = await getTracking()
console.log(result10);

console.log('====================')

console.log('end')