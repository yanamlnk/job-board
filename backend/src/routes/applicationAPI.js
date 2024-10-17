const express = require("express");
const db = require("../db");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/apply", (req, res) => {
  const { userId, advertisementId, motivation } = req.body;

  if (!userId || !advertisementId || !motivation) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
      INSERT INTO applications (clientId, advertisementId, motivation)
      VALUES (?, ?, ?)
    `;
  const values = [userId, advertisementId, motivation];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error submitting application:", err);
      return res.status(500).json({ error: "Failed to submit application" });
    }

    res.status(200).json({ message: "Application submitted successfully!" });
  });
});

router.post("/check-application", (req, res) => {
  const { userId, advertisementId } = req.body;

  if (!userId || !advertisementId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
      SELECT * FROM applications
      WHERE clientId = ? AND advertisementId = ?
    `;
  const values = [userId, advertisementId];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error checking application:", err);
      return res.status(500).json({ error: "Failed to check application" });
    }

    if (results.length > 0) {
      return res.status(200).json({ alreadyApplied: true });
    }

    res.status(200).json({ alreadyApplied: false });
  });
});

// Route pour récupérer les candidatures d'un client
router.get("/clientApplications", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Accès non autorisé" });
  }

  // Récupérer l'ID du client via son token
  const queryClient = "SELECT id FROM clients WHERE token = ?";
  db.query(queryClient, [token], (err, results) => {
    if (err || results.length === 0) {
      return res
        .status(403)
        .json({ error: "Client non trouvé ou token invalide" });
    }

    const clientId = results[0].id;

    // Requête pour récupérer les annonces avec le nom de l'entreprise
    const queryApplications = `
      SELECT advertisements.id, advertisements.title, companies.name AS companyName, advertisements.location, applications.motivation
      FROM applications
      JOIN advertisements ON applications.advertisementId = advertisements.id
      JOIN companies ON advertisements.company = companies.id
      WHERE applications.clientId = ?
    `;
    db.query(queryApplications, [clientId], (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des candidatures:", err);
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des candidatures" });
      }

      res.json(results);
    });
  });
});

// Route pour envoyer un email après une candidature
router.post("/sendApplication", (req, res) => {
  const { clientId, advertisementId, motivation } = req.body;

  // Requête pour récupérer les informations de l'annonce
  const queryAdvertisement = `
    SELECT advertisements.title, companies.name AS companyName, advertisements.location
    FROM advertisements
    JOIN companies ON advertisements.company = companies.id
    WHERE advertisements.id = ?
  `;

  db.query(queryAdvertisement, [advertisementId], (err, results) => {
    if (err || results.length === 0) {
      console.error(
        "Erreur lors de la récupération des informations de l'annonce:",
        err
      );
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération de l'annonce" });
    }

    const advertisement = results[0];

    // Créer le transporteur Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jobs.epitech@gmail.com",
        pass: "AxelYana2024",
      },
    });

    // Contenu de l'email
    const mailOptions = {
      from: "jobs.epitech@gmail.com",
      to: "axelh33@hotmail.fr",
      subject: "Nouvelle Candidature",
      text: `
        Un client a postulé à une offre d'emploi.

        Informations du client :
        - Motivation : ${motivation}

        Informations de l'annonce :
        - Titre de l'annonce : ${advertisement.title}
        - Entreprise : ${advertisement.companyName}
        - Localisation : ${advertisement.location}
      `,
    };

    // Envoyer l'email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
        return res
          .status(500)
          .json({ error: "Erreur lors de l'envoi de l'email" });
      }
      console.log("Email envoyé :", info.response);
      res.json({ success: true, message: "Email envoyé avec succès" });
    });
  });
});

module.exports = router;
