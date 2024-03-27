const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Define Schema
const studentSchema = new mongoose.Schema({
  name: String,
  studentID: String
});

// Create Model
const Student = mongoose.model('w24student', studentSchema);

// Handle form submission
app.post('/', async (req, res) => {
  const mongoURI = req.body.myuri; // Extract MongoDB URI from form submission
  const data = [{ name: "Elena", studentID: "300377316" }];

  // Connect to MongoDB using the submitted URI
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");

    // Add Data to Collection
    await Student.insertMany(data);
    console.log("Data added to w24students collection");

    // Send response to user
    res.send(`<h1>Data Added</h1>`);
  } catch (error) {
    console.error("Error connecting to MongoDB or adding data:", error);
    res.status(500).send("Error connecting to MongoDB or adding data");
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});