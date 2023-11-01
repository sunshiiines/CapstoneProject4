import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { getUsers, addUser, deleteUser, login, getChatrooms, addChatroom, updateChatroom, deleteChatroom, getChatroomMembers, addChatroomMember, deleteChatroomMember, getPosts, addPost, updatePost, deletePost, addTracking, updateTracking, deleteTracking, getTracking } from './db.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: 'hypertension-screening-tool-123',
  resave: false,
  saveUninitialized: true
}));


//appointment
app.get('/api/user-data', (req, res) => {
  const userData = {
      name: 'John Doe',
      contacts: '123-456-7890',
      email: 'john.doe@example.com',
      appointments: {
          doctor: 'Dr. Smith',
          date: '2023-10-15',
          time: '10:00 AM',
      },
  };

  res.json(userData);
});

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

// user login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password);

    if (user) {
      req.session.userId = user.id;
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// user authentication
function requireAuth(req, res, next) {
  if (req.session.userId) {
    next(); // User is authenticated, proceed to the next middleware
  } else {
    res.redirect('/api/login'); // User is not authenticated, redirect to the login page
  }
}


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
  const { name } = req.body;
  const id = req.session.userId;

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
app.get('/api/chatrooms/:chatroomId/posts', async (req, res) => {
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
app.post('/api/updatePost/:id', async (req, res) => {
  const { post_info } = req.body;
  const id = req.params.id;
  
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
app.post('/api/deletePost/:id', async (req, res) => {
  const {id} = req.params.id;
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


// Define a route to handle GET requests for tracking data
app.get('/api/tracking', async (req, res) => {
  try {
    const trackingData = await getTracking(database);
    res.json(trackingData);
  } catch (error) {
    console.error('Error fetching tracking data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//add Tracking
app.post('/api/addTracking', async (req, res) => {
  const { user_id, systolic, diastolic, pulse } = req.body;
  try {
    await addTracking(user_id, systolic, diastolic, pulse);
    res.json({
      status: 'success',
      message: 'Tracking added successfully',
    });
  } catch (error) {
    console.error('Error adding tracking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a route to handle POST requests to update tracking data
app.post('/api/updateTracking', async (req, res) => {
  const { systolic, diastolic, pulse, id } = req.body;
  try {
    await updateTracking(database, id, systolic, diastolic, pulse);
    res.json({
      status: 'success',
      message: `Tracking ${id} updated successfully`,
    });
  } catch (error) {
    console.error(`Error updating tracking ${id}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a route to handle POST requests to delete tracking data
app.post('/api/deleteTracking', async (req, res) => {
  const { id } = req.body;
  try {
    await deleteTracking(database, id);
    res.json({
      status: 'success',
      message: 'Tracking deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting tracking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
