const express = require("express");
const db = require("../db");
const router = express.Router();

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

module.exports = router;