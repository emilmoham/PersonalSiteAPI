const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors());

// Import routes
const blogRoute = require('./routes/blog');

// Attach Route Middlewares
app.use('/blog', blogRoute);

app.get("/", (req, res) =>{
  res.json("Hello World!");
})


app.listen(8081, () => {
  console.log('Server running on port 8081')
})
