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
  res.render("about"); 
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

/* Example route that throws an error
app.get('/error', (req, res, next) => {
  try {
    throw new Error('Simulated 500 error');
  } catch (err) {
    next(err); // Pass the error to Express error handling middleware
  }
});
*/
// Route for errors
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
  console.log('404 Page Not Found');
});

// Error handling middleware for other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Internal Server Error' });
  console.log('500 Internal Server Error');
});

// Start server on specified port
app.listen(3000, () => {
  console.log("App listening on port 3000");
});