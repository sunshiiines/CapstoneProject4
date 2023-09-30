import express from 'express';
import cors from 'cors';
import { getUsers, addUser, deleteUser, getChatrooms, addChatroom, updateChatroom, deleteChatroom, getChatroomMembers, addChatroomMember, getPosts, addPost, updatePost, deletePost } from './db.js'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Get users
app.get('/api/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json({ users });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a user
app.post('/api/addUser', async (req, res) => {
  const { username, email, password, status } = req.body;
  try {
    await addUser(username, email, password, status);
    res.json({
      status: 'success',
      message: 'User added successfully',
    });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a user
app.delete('/api/deleteUser/:username', async (req, res) => {
  const { username } = req.params;
  try {
    await deleteUser(username);
    res.json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get chatrooms
app.get('/api/chatrooms', async (req, res) => {
  try {
    const chatrooms = await getChatrooms();
    res.json({ chatrooms });
  } catch (error) {
    console.error('Error retrieving chatrooms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a chatroom
app.post('/api/addChatroom', async (req, res) => {
  const { name, created_by } = req.body;
  try {
    await addChatroom(name, created_by);
    res.json({
      status: 'success',
      message: 'Chatroom added successfully',
    });
  } catch (error) {
    console.error('Error adding chatroom:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//update chatroom
app.put('/api/updateChatroom/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await updateChatroom(id, name); 
    res.json({
      status: 'success',
      message: `Chatroom ${id} updated successfully`,
    });
  } catch (error) {
    console.error(`Error updating chatroom ${id}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a chatroom
app.delete('/api/deleteChatroom/:name', async (req, res) => {
  const { name } = req.params;
  try {
    await deleteChatroom(name);
    res.json({
      status: 'success',
      message: 'Chatroom deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting chatroom:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json({ posts });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a post
app.post('/api/addPost', async (req, res) => {
  const { post_info, sender_id, chatroom_id, created_at } = req.body;
  try {
    await addPost(post_info, sender_id, chatroom_id, created_at);
    res.json({
      status: 'success',
      message: 'Post added successfully',
    });
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//update a post
app.put('/api/updatePost/:id', async (req, res) => {
  const { id } = req.params;
  const { post_info } = req.body;
  try {
    await updatePost(id, post_info); 
    res.json({
      status: 'success',
      message: `Post ${id} updated successfully`,
    });
  } catch (error) {
    console.error(`Error updating post ${id}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a post
app.delete('/api/deletePost/:name', async (req, res) => {
  const { name } = req.params;
  try {
    await deletePost(name);
    res.json({
      status: 'success',
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get chatrooms members
app.get('/api/chatroomMembers', async (req, res) => {
  try {
    const chatrooms_members = await getChatroomMembers();
    res.json({ chatrooms_members });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/api/addChatroomMember', async (req, res) => {
  const { chatroom_id, user_id, joined_at } = req.body;
  try {
    await addChatroomMember(chatroom_id, user_id, joined_at);
    res.json({
      status: 'success',
      message: 'Chatroom member added successfully',
    });
  } catch (error) {
    console.error('Error adding chatroom member:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});