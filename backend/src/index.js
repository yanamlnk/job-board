const mysql = require("mysql2");

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
