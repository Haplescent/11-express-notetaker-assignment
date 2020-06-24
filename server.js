const express = require("express");
const app = express();
const colors = require("colors");
const cowsay = require("cowsay");
const PORT = 3000;
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public/assets")));

const apiRoutes = require(path.join(__dirname, "./routes/api-route"));
app.use(apiRoutes);

const clientRoutes = require(path.join(__dirname, "./routes/client-route"));
app.use(clientRoutes);

app.listen(PORT, () => {
  console.log(
    cowsay.say({
      text: "\n listening: ".bold + `http://localhost:${PORT}\n`.rainbow,
      e: "oO",
      T: "U ",
    })
  );
});
