import express from 'express';
import cors from 'cors';
import { getUsers, addUser, deleteUser, getChatrooms, addChatroom, updateChatroom, deleteChatroom, getChatroomMembers, addChatroomMember, deleteChatroomMember, getPosts, addPost, updatePost, deletePost, addTracking, updateTracking, deleteTracking, getTracking } from './db.js'
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
  const { name, email, password, status } = req.body;
  try {
    await addUser(name, email, password, status);
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
app.post('/api/deleteUser', async (req, res) => {
  const {id} = req.body;
  try {
      await deleteUser(id);
      res.json({
          status: `Success`,
          message: 'User deleted succesfully'
      });
  } catch(error) {
    console.error('Error adding user:', error);
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
app.post('/api/updateChatroom/', async (req, res) => {
  const { name, id } = req.body;

  try {
    await updateChatroom( name, id); 
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
app.post('/api/deleteChatroom', async (req, res) => {
  const {id} = req.body;
  try {
      await deleteChatroom(id);
      res.json({
          status: `Success`,
          message: 'Chatroom deleted succesfully'
      });
  } catch(error) {
    console.error('Error adding chatroom:', error);
    res.status(500).json({ error: 'Internal server error' });
      }
  });


  // Get chatroom members
app.get('/api/chatroomMembers', async (req, res) => {
  try {
    const chatrooms_members = await getChatroomMembers();
    res.json({ chatrooms_members });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//add chatroom member
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

//delete chatroom member
app.post('/api/deleteChatroomMember/', async (req, res) => {
  const { chatroom_id, user_id } = req.body;
  try {
    await deleteChatroomMember(chatroom_id, user_id);
    res.json({
      status: 'success',
      message: 'Chatroom member deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting chatroom member:', error);
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
app.post('/api/updatePost/', async (req, res) => {
  const { post_info, id } = req.body;
  
  try {
    await updatePost( post_info, id); 
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
app.post('/api/deletePost', async (req, res) => {
  const {id} = req.body;
  try {
      await deletePost(id);
      res.json({
          status: `Success`,
          message: 'Post deleted succesfully'
      });
  } catch(error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal server error' });
      }
  });

// Get tracking
app.get('/api/tracking', async (req, res) => {
  try {
    const tracking = await getTracking();
    res.json({ tracking });
  } catch (error) {
    console.error('Error retrieving tracking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//add Tracking
app.post('/api/addTracking', async (req, res) => {
  const { user_id, systolic_bp, diastolic_bp, pulse } = req.body;
  try {
    await addTracking(user_id, systolic_bp, diastolic_bp, pulse);
    res.json({
      status: 'success',
      message: 'Tracking added successfully',
    });
  } catch (error) {
    console.error('Error adding tracking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//update tracking
app.post('/api/updateTracking/', async (req, res) => {
  const { systolic_bp, diastolic_bp, pulse, id } = req.body;
  try {
    await updateTracking( systolic_bp, diastolic_bp, pulse, id); 
    res.json({
      status: 'success',
      message: `Tracking ${id} updated successfully`,
    });
  } catch (error) {
    console.error(`Error updating tracking ${id}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete tracking
app.post('/api/deleteTracking/', async (req, res) => {
  const { id } = req.body;
  try {
    await deleteTracking(id);
    res.json({
      status: 'success',
      message: 'Tracking deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting tracking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});