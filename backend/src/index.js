const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//Import des fichiers de route
const clientAPI = require("./routes/clientAPI");
const advertisementAPI = require("./routes/advertisementAPI");
const applicationAPI = require("./routes/applicationAPI");

app.use("/api/client", clientAPI);
app.use("/api/advertisement", advertisementAPI);
app.use("/api/application", applicationAPI);

// Démarrer le serveur
app.listen(3001, () => {
  console.log(`Serveur backend démarré sur le port ${3001}`);
});
