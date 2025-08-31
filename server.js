const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve your HTML file
app.use(express.static(__dirname));

// Handle registration form submission
app.post("/register", (req, res) => {
  const { fullname, email, phone, notes } = req.body;

  const entry = `Name: ${fullname}, Email: ${email}, Phone: ${phone}, Notes: ${notes || "N/A"}\n`;

  fs.appendFile("registrations.txt", entry, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error saving registration.");
    }
    res.send("Registration saved!");
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
