// basic requirements 
const path = require('path');
const express = require('express');
const app = express();

// require json data
const projectData = require('./data.json'); // Adjusted the path if necessary

// require pug 
const pug = require('pug');

// Construct the absolute path to the "public" directory
const publicPath = path.join(__dirname, 'public');

// Serve static files from the "public" directory
app.use(express.static(publicPath));

// Explicitly set MIME type for .js files
app.use(express.static(publicPath, {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Set Pug as the view engine
app.set("view engine", "pug");

// Specify the views directory
app.set("views", path.join(__dirname, 'views'));

// Set routes
app.get("/about", (req, res) => {
  res.render("about"); // Renders views/about.pug
});

// Route to render the Pug template with project data
app.get("/", (req, res) => {
  res.render('index', { projects: projectData.projects }); // Renders views/index.pug
});

// start server on specified port
app.listen(3000, () => {
  console.log("App listening on port 3000");
});
