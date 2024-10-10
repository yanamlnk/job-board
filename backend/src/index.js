const express = require("express");
const mysql = require("mysql2");
const cors = require("cors"); // Pour autoriser les requêtes venant du frontend

const app = express(); // Crée une instance d'Express

// Middleware
app.use(cors()); // Permet d'accepter les requêtes cross-origin (CORS)
app.use(express.json()); // Permet de traiter les données JSON

// Configurer la connexion à la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Mot de passe, si applicable
  database: "job_board", // Remplace par le nom de ta base de données
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à MySQL:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

// Route de test pour vérifier la connexion au backend
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
      res.json(results); // Retourner les résultats sous forme de JSON
    }
  });
});

// Démarrer le serveur
app.listen(3001, () => {
  console.log(`Serveur backend démarré sur le port ${3001}`);
});
