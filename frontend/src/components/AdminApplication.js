import React, { useState, useEffect } from "react";

function AdminApplication() {
  const [applications, setApplications] = useState([]);
  // const [clients, setClients] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [editApplication, setEditApplication] = useState(null);
  const [newApplication, setNewApplication] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    advertisementId: "",
    motivation: "",
  });

  useEffect(() => {
    // Fetch toutes les applications
    fetch("http://localhost:3001/api/application/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) =>
        console.error("Erreur lors du fetch des candidatures:", err)
      );

    // // Fetch les emails des clients pour le menu déroulant
    // fetch("http://localhost:3001/api/client/emails")
    //   .then((res) => res.json())
    //   .then((data) => setClients(data))
    //   .catch((err) =>
    //     console.error("Erreur lors du fetch des emails des clients:", err)
    //   );

    // Fetch les titres des annonces pour le menu déroulant
    fetch("http://localhost:3001/api/advertisement/titles")
      .then((res) => res.json())
      .then((data) => setAdvertisements(data))
      .catch((err) =>
        console.error("Erreur lors du fetch des titres des annonces:", err)
      );
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/application/applications/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setApplications(applications.filter((app) => app.id !== id));
      })
      .catch((err) => console.error("Erreur lors de la suppression:", err));
  };

  const handleSubmit = (e) => {
    fetch("http://localhost:3001/api/application/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newApplication),
    })
      .then((res) => res.json())
      .then((data) => {
        setApplications([...applications, data]);
        setNewApplication({
          name: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          location: "",
          advertisementId: "",
          motivation: "",
        });
      })
      .catch((err) => console.error("Erreur lors de la création:", err));
  };

  const handleEdit = (application) => {
    setEditApplication(application); // Remplit le formulaire avec les données de l'application sélectionnée pour modification
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:3001/api/application/applications/${editApplication.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editApplication),
      }
    )
      .then((res) => res.json())
      .then(() => {
        setApplications(
          applications.map((app) =>
            app.id === editApplication.id ? editApplication : app
          )
        );
        setEditApplication(null);
      })
      .catch((err) => console.error("Erreur lors de la mise à jour:", err));
  };

  return (
    <div>
      <h2>Applications management</h2>
      <ul>
        {applications.map((application, i) => (
          <li key={i}>
            {application.name} {application.lastName} - {application.adTitle} -{" "}
            {application.motivation}
            <button onClick={() => handleDelete(application.id)}>
              Supprimer
            </button>
            <button onClick={() => handleEdit(application)}>Modifier</button>
          </li>
        ))}
      </ul>

      {editApplication && (
        <form onSubmit={handleUpdate}>
          <h3>Modifier la candidature</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={editApplication.name}
              onChange={(e) =>
                setEditApplication({ ...editApplication, name: e.target.value })
              }
            />
          </div>
          <div>
            <label>LastName:</label>
            <input
              type="text"
              value={editApplication.lastName}
              onChange={(e) =>
                setEditApplication({
                  ...editApplication,
                  lastName: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={editApplication.email}
              onChange={(e) =>
                setEditApplication({
                  ...editApplication,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>PhoneNumber:</label>
            <input
              type="text"
              value={editApplication.phoneNumber}
              onChange={(e) =>
                setEditApplication({
                  ...editApplication,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              value={editApplication.location}
              onChange={(e) =>
                setEditApplication({
                  ...editApplication,
                  location: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Motivation:</label>
            <textarea
              value={editApplication.motivation}
              onChange={(e) =>
                setEditApplication({
                  ...editApplication,
                  motivation: e.target.value,
                })
              }
            />
          </div>
          <button type="submit">Sauvegarder les modifications</button>
        </form>
      )}

      <h3>Add an new application</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={newApplication.name}
            onChange={(e) =>
              setNewApplication({ ...newApplication, name: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>LastName:</label>
          <input
            type="text"
            value={newApplication.lastName}
            onChange={(e) =>
              setNewApplication({ ...newApplication, lastName: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={newApplication.email}
            onChange={(e) =>
              setNewApplication({ ...newApplication, email: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>PhoneNumber:</label>
          <input
            type="text"
            value={newApplication.phoneNumber}
            onChange={(e) =>
              setNewApplication({
                ...newApplication,
                phoneNumber: e.target.value,
              })
            }
            required
          />
        </div>

        <div>
          <label>Location:</label>
          <input
            type="text"
            value={newApplication.location}
            onChange={(e) =>
              setNewApplication({ ...newApplication, location: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Advertisement title:</label>
          <select
            value={newApplication.advertisementId}
            onChange={(e) =>
              setNewApplication({
                ...newApplication,
                advertisementId: e.target.value,
              })
            }
          >
            <option value="">Select an ad</option>
            {advertisements.map((ad) => (
              <option key={ad.id} value={ad.id}>
                {ad.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Motivation:</label>
          <textarea
            value={newApplication.motivation}
            onChange={(e) =>
              setNewApplication({
                ...newApplication,
                motivation: e.target.value,
              })
            }
            rows="5"
            required
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default AdminApplication;
