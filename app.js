// Basic requirements 
const path = require('path');
const express = require('express');
const app = express();

// Require pug 
const pug = require('pug');

app.set('view engine', 'pug');

// Construct the absolute path to the "public" directory
const publicPath = path.join(__dirname, 'public');

// Serve static files from the "public" directory
app.use(express.static(publicPath));

// Specify the views directory
app.set("views", path.join(__dirname, 'views'));

// Set routes
app.get("/about", (req, res) => {
  res.render("about"); // Renders views/about.pug
});

// Require json data
const projectData = require('./data.json'); 

// Route to render the pug template with project data
app.get("/", (req, res) => {
  res.render('index', { projects: projectData.projects }); // Renders views/index.pug with project data
});

// Start server on specified port
app.listen(3000, () => {
  console.log("App listening on port 3000");
});