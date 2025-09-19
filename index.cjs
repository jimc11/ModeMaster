// index.js
const express = require('express');
const app = express();
const PORT = 3000;

// serve static files from "public" folder
app.use(express.static('public'));

// simple route
app.get('/', (req, res) => {
  res.send('Hello, world! My first Node.js website 🚀');
});

// start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
