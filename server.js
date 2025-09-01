const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve your HTML file
app.use(express.static(__dirname));

const path = require("path");

// Handle registration form submission
app.post("/register", (req, res) => {
  const { fullname, email, phone, registrationNumber, notes } = req.body;

  const filePath = path.join(__dirname, "registrations.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    let registrations = [];
    if (!err && data) {
      try {
        registrations = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing JSON:", parseErr);
        // If parse error, overwrite with new array
        registrations = [];
      }
    }
    registrations.push({ fullname, email, phone, registrationNumber, notes: notes || "N/A", createdAt: new Date().toISOString() });

    fs.writeFile(filePath, JSON.stringify(registrations, null, 2), (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        return res.status(500).send("Error saving registration.");
      }
      res.send("Registration saved!");
    });
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
