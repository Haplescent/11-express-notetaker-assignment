const express = require("express");
const router = express.Router();
const fs = require("fs");
const util = require("util");
const path = require("path");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const PATH = path.join(__dirname, "../db/db.json");

router.get("/api/notes", (req, res) => {
  readFileAsync(PATH, "utf8")
    .then((file) => {
      return JSON.parse(file);
    })
    .then((file) => {
      res.send(file);
    });
});

router.post("/api/notes", (req, res) => {
  readFileAsync(PATH, "utf8")
    .then((file) => {
      return JSON.parse(file);
    })
    .then((data) => {
      const newNoteObject = req.body;
      newNoteObject.id = data.length + 1;
      data.push(newNoteObject);
      writeFileAsync("./db/db.json", JSON.stringify(data, null, 2));
      return data;
    })
    .then((data) => {
      res.send(data);
    });
});

router.delete("/api/notes/:id", (req, res) => {
  readFileAsync(PATH, "utf8")
    .then((file) => {
      return JSON.parse(file);
    })
    .then((data) => {
      const incomingID = req.params.id;
      data.forEach((value, index) => {
        if (value.id == incomingID) {
          data.splice(index, 1);
        }
      });
      writeFileAsync(PATH, JSON.stringify(data, null, 2));
      return data;
    })
    .then(() => {
      res.send({ msg: "success" });
    });
});

module.exports = router;
