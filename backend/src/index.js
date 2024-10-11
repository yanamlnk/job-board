const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt"); // Pour hacher le mot de passe
const uid2 = require("uid2"); // Pour générer des tokens uniques
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
app.post("/api/clients", async (req, res) => {
  const {
    name,
    lastName,
    email,
    phoneNumber,
    profilPicture,
    birthDate,
    location,
    password,
  } = req.body;

  try {
    // 1. Hacher le mot de passe avant de l'enregistrer dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10); // 10 est le "salt rounds" (facteur de complexité)

    // 2. Générer un token unique pour l'utilisateur
    const token = uid2(32); // Génère un token de 32 caractères

    // 3. Insérer l'utilisateur dans la base de données avec le mot de passe haché et le token
    const query = `
      INSERT INTO clients (name, lastName, email, phoneNumber, profilPicture, birthDate, location, password, token)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [
        name,
        lastName,
        email,
        phoneNumber,
        profilPicture,
        birthDate,
        location,
        hashedPassword,
        token,
      ],
      (err, result) => {
        if (err) {
          console.error(
            "Erreur lors de l'insertion dans la base de données:",
            err
          );
          res.status(500).json({ error: "Erreur lors de l'insertion" });
        } else {
          res.json({ message: "Client ajouté avec succès!", token });
        }
      }
    );
  } catch (error) {
    console.error("Erreur lors de la création du compte:", error);
    res.status(500).json({ error: "Erreur lors de la création du compte" });
  }
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
