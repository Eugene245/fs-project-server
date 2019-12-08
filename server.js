const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const cors = require("cors")

const app = express();

app.use(express.json());

app.use(cors())

const db = config.get("mongoURI");

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

  app.use('/api/users/registration', require('./routes/api/users/registration'))
  app.use('/api/users/login', require('./routes/api/users/login'))
  app.use('/api/users', require('./routes/api/users/users'))
  app.use('/api/users/following', require('./routes/api/users/following'))
  app.use('/api/users/edit', require('./routes/api/users/edit'))
  app.use('/api/posts', require('./routes/api/posts/posts'))
  app.use('/api/posts/new-comment', require('./routes/api/posts/addComment'))
  app.use('/api/posts/add', require('./routes/api/posts/add'))
  app.use('/api/posts/delete', require('./routes/api/posts/delete'))

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on PORT ${port}`));