const express = require("express");
const db = require("../db");
const router = express.Router();

// 1. Récupérer toutes les annonces
router.get("/", (req, res) => {
  const query = `
    SELECT advertisements.*, companies.name AS companyName
    FROM advertisements
    JOIN companies ON advertisements.company = companies.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des annonces" });
    }
    res.json(results);
  });
});

// 2. Ajouter une nouvelle annonce
router.post("/", (req, res) => {
  const { title, description, company, location, contract, salary, postDate } =
    req.body;
  const query = `
    INSERT INTO advertisements (title, description, company, location, contract, salary, postDate)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [title, description, company, location, contract, salary, postDate],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erreur lors de l'ajout de l'annonce" });
      }
      res.json({ message: "Annonce ajoutée avec succès!" });
    }
  );
});

// 3. Mettre à jour une annonce par ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, company, location, contract, salary, postDate } =
    req.body;
  const query = `
    UPDATE advertisements 
    SET title = ?, description = ?, company = ?, location = ?, contract = ?, salary = ?, postDate = ?
    WHERE id = ?
  `;
  db.query(
    query,
    [title, description, company, location, contract, salary, postDate, id],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la mise à jour de l'annonce" });
      }
      res.json({ message: "Annonce mise à jour avec succès!" });
    }
  );
});

// 4. Supprimer une annonce par ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM advertisements WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la suppression de l'annonce" });
    }
    res.json({ message: "Annonce supprimée avec succès!" });
  });
});

// Route pour supprimer toutes les annonces associées à une entreprise
router.delete("/byCompany/:companyId", (req, res) => {
  const { companyId } = req.params;
  const query = "DELETE FROM advertisements WHERE company = ?";

  db.query(query, [companyId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression des annonces:", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la suppression des annonces" });
    }
    res.json({
      message:
        "Toutes les annonces associées à l'entreprise ont été supprimées",
    });
  });
});

// Route pour récupérer les titres des annonces
router.get("/titles", (req, res) => {
  const query = "SELECT id, title FROM advertisements";
  db.query(query, (err, results) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération des titres des annonces:",
        err
      );
      return res.status(500).json({
        error: "Erreur lors de la récupération des titres des annonces",
      });
    }
    res.json(results);
  });
});

module.exports = router;
