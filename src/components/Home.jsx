import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HOSPITAL_API =
  "https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=place:5112ba4be22ca25340592c6ba1be0aad3340f00103f9019decadde000000009203084164696c61626164&limit=20&apiKey=ef4b203eb5884b6d9fcddd1354992b6b";

const Home = () => {
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(HOSPITAL_API).then((response) => {
      setHospitals(response.data.features);
      console.log(response.data.features);
    });
  }, []);

  const handleClick = (hospital) => {
    navigate(`/hospitalDetails/${hospital.properties.place_id}`, {
      state: { hospital },
    });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
      {hospitals.map((hospital) => {
        return (
          <div key={hospital.properties.details.place_id}>
            <Card
              onClick={() => handleClick(hospital)}
              style={{
                width: "35rem",
                height: "12rem",
                padding: 3,
                border: "1px solid black",
                borderRadius: "12px",
                marginTop: "2rem",
                marginLeft: "5rem",
                cursor: "pointer",
                position: "relative",
                backgroundColor: "rgba(255, 255, 25, 0.1)",
                boxShadow: "0 5px 15px rgba(21, 12, 214, 0.3)",
              }}
            >
              <div
                className="gradient"
                style={{
                  position: "absolute",
                  background: "linear-gradient(0deg, #e98306, transparent)",
                  height: "100%",
                  width: "100%",
                  opacity: 0,
                  transition: "opacity 0.5s",
                  borderRadius: "12px",
                }}
              />
              <div
                className="info"
                style={{
                  position: "relative",
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: "2rem",
                }}
              >
                <h1 style={{ borderBottom: "1px solid black" }}>
                  {hospital.properties.name}
                </h1>
                <p>{hospital.properties.address_line2}</p>
                <p>{hospital.properties.formatted}</p>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
