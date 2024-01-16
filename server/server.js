import express from 'express';
import mongoose from 'mongoose';
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB kapcsolat létrehozása
mongoose.connect('mongodb+srv://mernuser:nCunJZhHpoK34bCJ@clustermern.c1s1okf.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Usertípusú séma definiálása
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

// User model létrehozása a séma alapján
const User = mongoose.model('User', userSchema);

// Middleware a JSON adatok kezeléséhez
app.use(express.json());

// CRUD műveletek
// Create
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read (minden user lekérése)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    //const prettyJson = JSON.stringify(users, null, 2);
    //res.type('json').status(200).send(prettyJson);
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read (egy adott user lekérése ID alapján)
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    const prettyJson = JSON.stringify(user, null, 2);
    res.type('json').status(200).send(prettyJson);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update
app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Szerver indítása
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
