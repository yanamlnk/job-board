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

//Route pour gérer la connexion d'un client
app.post("/api/SignIn", (req, res) => {
  const { email, password } = req.body;
  try {
    const query = "SELECT * FROM clients WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Erreur lors la query à la base de données:", err);
        res.status(500).json({ error: "Erreur lors de la query" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: "incorrect password" });
      }
      res.json({ message: "Client connecté avec succès!", token: user.token });
    });
  } catch (error) {
    console.error("Erreur lors de la connexion au compte:", error);
    res.status(500).json({ error: "Erreur lors de la connexion au compte" });
  }
});

// Route pour gérer l'inscription d'un client
app.post("/api/SignUp", async (req, res) => {
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
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = uid2(32);
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
      (err, results) => {
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
  db.query(query, (err, resultss) => {
    if (err) {
      console.error("Erreur lors de la récupération des données:", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des données" });
    } else {
      res.json(resultss);
    }
  });
});
