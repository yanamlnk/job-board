import React, { useState, useEffect } from "react";
import "../styles/Application.css";

function Application({ userData, adID }) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    motivation: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        location: userData.location || "",
        motivation: ""
      });
    }

    if (userData.id && adID) {
        fetch("http://localhost:3001/api/application/check-application", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userData.id,
                advertisementId: adID,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.alreadyApplied) {
                setAlreadyApplied(true);
            }
        })
        .catch((error) => {
            console.error("Error checking application:", error);
        });
    }
  }, [userData, adID]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.motivation || !userData.id) {
      console.error("User data or motivation is missing.");
      return;
    }
  
    const applicationData = {
      userId: userData.id,    
      advertisementId: adID,  
      motivation: formData.motivation
    };
  
    fetch("http://localhost:3001/api/application/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(applicationData)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
            setSubmitted(true);
        }
      })
      .catch((error) => {
        console.error("Error submitting application:", error);
      });
  };
  
  if (submitted) {
    return <h3>Thank you for your application!</h3>;
  }

  return (
    <div>
      {alreadyApplied && <p>You have already applied for this offer.</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="motivation">Motivation:</label>
          <textarea
            id="motivation"
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>
        <div>
          <button type="submit">Submit Application</button>
        </div>
      </form>
    </div>
  );
}

export default Application;
