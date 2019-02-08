const express = require("express");
const server = express();
const db = require("../data/dbConfig");

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ message: "server is responding" });
});

server.get("/pets", async (req, res) => {
  const pets = await db("pets");
  res.status(200).json(pets);
});

server.post("/pets", (req, res) => {
  const newPet = req.body;
  db.insert(newPet)
    .then(response => {
      if (newPet.name && newPet.type) {
        response.status(201).json({ message: "pet added" });
      } else if (!newPet.name && !newPet.type) {
        response.status(400).json({ message: "object cannot be empty" });
      } else if (!newPet.name) {
        response.status(400).json({ message: "name cannot be empty" });
      } else {
        response.status(400).json({ message: "type cannot be empty" });
      }
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

module.exports = server;
