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

// Require json data
const projectData = require('./data.json'); 

// Set routes
app.get("/about", (req, res) => {
  res.render("about"); // Renders views/about.pug
});

app.get("/projects", (req, res) => {
  res.render("projects", { projects: projectData.projects }); 
});

// Dynamic route to handle individual project pages
app.get("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  const project = projectData.projects.find(p => p.id === projectId);

  if (project) {
    res.render("project", { project }); 
  } else {
    res.status(404).send('Project not found');
  }
});

// Route to render the pug template with project data
app.get("/", (req, res) => {
  res.render('index', { projects: projectData.projects }); 
});

// Start server on specified port
app.listen(3000, () => {
  console.log("App listening on port 3000");
});
