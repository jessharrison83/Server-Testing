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

server.post("/pets", async (req, res) => {
  const newPet = req.body;
  if (newPet.name && newPet.type) {
    const ids = await db("pets").insert(newPet);
    res.status(201).json(ids);
  } else if (!newPet.name && !newPet.type) {
    res.status(400).json({ message: "object cannot be empty" });
  } else if (!newPet.name) {
    res.status(400).json({ message: "name cannot be empty" });
  } else {
    res.status(400).json({ message: "type cannot be empty" });
  }
});

module.exports = server;
