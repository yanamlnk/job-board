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
app.get("/api/test", (req, res) => {
  res.json({ message: "Connexion réussie au backend!" });
});

// Démarrer le serveur
app.listen(3001, () => {
  console.log(`Serveur backend démarré sur le port ${3001}`);
});
