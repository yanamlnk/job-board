const express = require("express");
const bcrypt = require("bcrypt");
const uid2 = require("uid2"); // Pour générer des tokens uniques
const db = require("../db"); // Si tu as une configuration de base de données séparée
const router = express.Router();

//Route pour gérer la connexion d'un client
router.post("/SignIn", (req, res) => {
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
router.post("/SignUp", async (req, res) => {
  const { name, lastName, email, phoneNumber, birthDate, location, password } =
    req.body;

  try {
    // Vérifier si l'email existe déjà dans la base de données
    const emailQuery = "SELECT * FROM clients WHERE email = ?";
    db.query(emailQuery, [email], async (err, results) => {
      if (err) {
        console.error("Erreur lors de la vérification de l'email:", err);
        return res
          .status(500)
          .json({ error: "Erreur lors de la vérification de l'email" });
      }

      // Si l'email existe déjà
      if (results.length > 0) {
        return res.status(400).json({ error: "Cet email est déjà utilisé." });
      }

      // Si l'email n'existe pas, procéder à l'inscription
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = uid2(32);
      const query = `
          INSERT INTO clients (name, lastName, email, phoneNumber, birthDate, location, password, token)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

      db.query(
        query,
        [
          name,
          lastName,
          email,
          phoneNumber,
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
            return res
              .status(500)
              .json({ error: "Erreur lors de l'insertion" });
          }
          res.json({ message: "Client ajouté avec succès!", token });
        }
      );
    });
  } catch (error) {
    console.error("Erreur lors de la création du compte:", error);
    res.status(500).json({ error: "Erreur lors de la création du compte" });
  }
});

// Route pour récupérer tous les clients
router.get("/", (req, res) => {
  db.query("SELECT * FROM clients", (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des clients" });
    }
    res.json(results);
  });
});

// Route pour qu'un admin puisse modifier un client

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, lastName, email, phoneNumber, birthDate, location } = req.body;

  let query = "UPDATE clients SET ";
  const updates = [];
  const values = [];

  if (name) {
    updates.push("name = ?");
    values.push(name);
  }
  if (lastName) {
    updates.push("lastName = ?");
    values.push(lastName);
  }
  if (email) {
    updates.push("email = ?");
    values.push(email);
  }
  if (phoneNumber) {
    updates.push("phoneNumber = ?");
    values.push(phoneNumber);
  }
  if (birthDate) {
    updates.push("birthDate = ?");
    values.push(birthDate);
  }
  if (location) {
    updates.push("location = ?");
    values.push(location);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: "Aucune modification fournie" });
  }

  query += updates.join(", ") + " WHERE id = ?";
  values.push(id);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour:", err);
      return res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }

    res.json({ success: true, message: "Client mis à jour avec succès" });
  });
});

// Route pour supprimer un client par ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM clients WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la suppression du client" });
    }
    res.json({ message: "Client supprimé avec succès!" });
  });
});

// Route pour qu'un client puisse modifier ses propres données

const authentificateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  // console.log("voici le token : ", token);
  if (!token) {
    return res
      .status(401)
      .json({ error: "Accès non autorisé, erreur de token" });
  }
  const query = "SELECT * FROM clients WHERE token = ?";
  db.query(query, [token], (err, results) => {
    if (err || results.length === 0) {
      return res
        .status(403)
        .json({ error: "Client non trouvé ou token invalide" });
    }
    req.client = results[0];
    // console.log(req.client);
    next();
  });
};

router.get("/Client", authentificateToken, (req, res) => {
  res.json(req.client);
});

router.put("/Update/Update", authentificateToken, (req, res) => {
  const { name, lastName, email, phoneNumber, location } = req.body;

  let query = "UPDATE clients SET ";
  const updates = [];
  const values = [];

  if (name) {
    updates.push("name = ?");
    values.push(name);
  }
  if (lastName) {
    updates.push("lastName = ?");
    values.push(lastName);
  }
  if (email) {
    updates.push("email = ?");
    values.push(email);
  }
  if (phoneNumber) {
    updates.push("phoneNumber = ?");
    values.push(phoneNumber);
  }
  if (location) {
    updates.push("location = ?");
    values.push(location);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: "Aucune modification fournie" });
  }

  query += updates.join(", ") + " WHERE id = ?";
  values.push(req.client.id);
  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Erreur lors de la mise à jour:", err);
      return res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }
    console.log("Je suis le dernier résultat : ", results);
    res.json({ success: true, message: "Profil mis à jour avec succès" });
  });
});

// Route pour changer le mot de passe
router.put("/changePassword/changePassword", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const { currentPassword, newPassword } = req.body;

  if (!token) {
    return res.status(401).json({ error: "Accès non autorisé" });
  }

  // Récupérer l'utilisateur via son token
  const query = "SELECT * FROM clients WHERE token = ?";
  db.query(query, [token], (err, results) => {
    if (err || results.length === 0) {
      return res
        .status(403)
        .json({ error: "Utilisateur non trouvé ou token invalide" });
    }

    const user = results[0];

    // Vérifier que le mot de passe actuel est correct
    bcrypt.compare(currentPassword, user.password, (err, match) => {
      if (!match) {
        return res.status(401).json({ error: "Mot de passe actuel incorrect" });
      }

      // Si les mots de passe correspondent, on peut mettre à jour avec le nouveau mot de passe
      const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
      const updateQuery = "UPDATE clients SET password = ? WHERE id = ?";

      db.query(updateQuery, [hashedNewPassword, user.id], (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la mise à jour du mot de passe" });
        }

        res.json({
          success: true,
          message: "Mot de passe mis à jour avec succès",
        });
      });
    });
  });
});

// Route pour récupérer les emails des clients
router.get("/emails", (req, res) => {
  const query = "SELECT id, email FROM clients";
  db.query(query, (err, results) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération des emails des clients:",
        err
      );
      return res
        .status(500)
        .json({
          error: "Erreur lors de la récupération des emails des clients",
        });
    }
    res.json(results);
  });
});
module.exports = router;
