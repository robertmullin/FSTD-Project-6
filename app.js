const path = require('path');
const express = require('express');
const app = express();

// require json data
const projectData = require('./data.json');

// require pug 
const pug = require('pug');

// Construct the absolute path to the "public" directory
const publicPath = path.join(__dirname, 'public');

// Serve static files from the "public" directory
app.use(express.static(publicPath));

// Set Pug as the view engine
app.set("view engine", "pug");

// being rendered res.render()
app.set("views", "./views");

// routes
app.get("/", (req, res) => {
  res.render("index"); // Renders views/index.pug
});

app.get("/about", (req, res) => {
  res.render("about"); // Renders views/about.pug
});

// route to render project details dynamically
app.get('/projects/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projectsData.projects.find(proj => proj.id === projectId);

  if (!project) {
    return res.status(404).send('Project not found');
  }

  res.render('project', { project });
});

// start server on specified port
app.listen(3000, () => {
  console.log("App listening on port 3000");
});
