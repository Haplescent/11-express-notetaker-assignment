const express = require("express");
const router = express.Router();
const fs = require("fs");
const util = require("util");
const path = require("path");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get("/api/notes", async (req, res) => {
  const file = JSON.parse(await readFileAsync("./db/db.json", "utf8"));
  res.send(file);
});

router.post("/api/notes", async (req, res) => {
  const data = JSON.parse(await readFileAsync("./db/db.json", "utf8"));
  const newNoteObject = req.body;
  newNoteObject.id = data.length + 1;
  data.push(newNoteObject);
  await writeFileAsync("./db/db.json", JSON.stringify(data, null, 2));
  res.send(data);
});
router.delete("/api/notes/:id", async (req, res) => {
  const data = JSON.parse(await readFileAsync("./db/db.json", "utf8"));
  const incomingID = req.params.id;
  data.forEach((value, index) => {
    if (value.id == incomingID) {
      data.splice(index, 1);
    }
  });
  await writeFileAsync("./db/db.json", JSON.stringify(data, null, 2));
  res.send({ msg: "success" });
});

module.exports = router;
