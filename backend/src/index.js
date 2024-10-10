const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Démarrer le serveur
app.listen(3001, () => {
  console.log(`Serveur backend démarré sur le port ${3001}`);
});

// Configurer la connexion à la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "job_board",
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à MySQL:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

// Route pour gérer l'inscription des clients
app.post("/api/clients", (req, res) => {
  const {
    name,
    lastName,
    email,
    phoneNumber,
    profilPicture,
    birthDate,
    location,
  } = req.body;

  const query = `
    INSERT INTO clients (name, lastName, email, phoneNumber, profilPicture, birthDate, location)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [name, lastName, email, phoneNumber, profilPicture, birthDate, location],
    (err, result) => {
      if (err) {
        console.error(
          "Erreur lors de l'insertion dans la base de données:",
          err
        );
        res.status(500).json({ error: "Erreur lors de l'insertion" });
      } else {
        res.json({ message: "Client ajouté avec succès!", result });
      }
    }
  );
});

// Récupère la liste de tous les annonces dans la base de donnée
app.get("/api/advertisements", (req, res) => {
  const query = `
    SELECT advertisements.*, companies.name AS companyName
    FROM advertisements
    JOIN companies ON advertisements.company = companies.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des données:", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des données" });
    } else {
      res.json(results);
    }
  });
});
