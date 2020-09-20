
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// sets up the port to listen to
const PORT = process.env.PORT || 3000;

// initializes express
const app = express();

// bring in the morgan logger
app.use(logger("dev"));

// bring in middleware to parse the request body
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware to serve static files like images, CSS and JavaScript files
app.use(express.static("public"));

// use mongoose to connect to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

});

 // import in routes folder
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});