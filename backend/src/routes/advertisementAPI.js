const express = require("express");
const db = require("../db"); // Si tu as une configuration de base de données séparée
const router = express.Router();

// Route pour récupérer les annonces de la base de donnée
router.get("/advertisements", (req, res) => {
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

module.exports = router;
