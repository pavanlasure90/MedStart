import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { purple } from "@mui/material/colors";

const HospitalDetails = () => {
  const [hospitalDetails, setHospitalDetails] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [latLng, setLatLng] = useState({});
  const [userAddress, setUserAddress] = useState("");
  const [getRoute, setGetRoute] = useState([])

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(latLng).length > 0) {
      const GEO_API = `https://api.geoapify.com/v1/geocode/reverse?lat=${latLng.lat}&lon=${latLng.lng}&apiKey=ef4b203eb5884b6d9fcddd1354992b6b`;
      axios
        .get(GEO_API)
        .then((res) => {
          const address = res.data.features[0].properties.formatted;
          setUserAddress(address);
        })
        .catch((error) => {
          console.error("Error fetching user address", error);
        });
    }
  }, [latLng]);

  useEffect(() => {
    const hospitalAddress = location.state.hospital;
    setHospitalDetails(hospitalAddress);
  }, [location.state]);



  // fourth use

  useEffect(() => {
    if (Object.keys(latLng).length > 0 && hospitalDetails) {

      const userLat = latLng.lat;
      const userLng = latLng.lng;
      const hospitalLat = hospitalDetails.geometry.coordinates[0];
      const hospitalLng = hospitalDetails.geometry.coordinates[1];


      const ROUTE_API = `https://api.geoapify.com/v1/routing?waypoints=19.6807668,78.5360794|19.675584612462387,78.53205926239025&mode=drive&apiKey=ef4b203eb5884b6d9fcddd1354992b6b`;
      axios.get(ROUTE_API).then((res) => {
        const directions = [];
        const points = res.data.features[0].properties.legs[0].steps;
        points.map((step) => {
          directions.push(step.instruction);
        });
        setGetRoute(directions);
      });
    };
  }, [latLng, hospitalDetails])

  return (
    <div
      className="Container"
      style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
    >
      <div
        style={{
          padding: 50,
          width: "35rem",
          height: "100vh",
          padding: 3,
          border: "1px solid black",
          borderRadius: "12px",
          marginTop: "2rem",
          marginLeft: "5rem",
          cursor: "pointer",
          backgroundColor: "rgba(8, 214, 255, 0.1)",
          boxShadow: "0 5px 15px rgba(21, 12, 214, 0.4 )",
        }}
      >
        <h1>Hospital details: {hospitalDetails && hospitalDetails.properties.name}</h1>
        <h4>User Latitude: {latLng.lat}</h4>
        <h4>User Longitude: {latLng.lng}</h4>
        <h4>User Formatted Address: {userAddress}</h4>
        {hospitalDetails && (
          <div>
            <h4>Hospital Latitude: {hospitalDetails.geometry.coordinates[1]}</h4>
            <h4>Hospital Longitude: {hospitalDetails.geometry.coordinates[0]}</h4>
            <h4>Hospital Formatted Address: {hospitalDetails.properties.formatted}</h4>
            <h4>State: {hospitalDetails.properties.state}</h4>
            <h4>City: {hospitalDetails.properties.city}</h4>
          </div>
        )}
      </div>

      <div

        style={{
          padding: 50,
          width: "35rem",
          height: "100vh",
          padding: 3,
          border: "1px solid black",
          borderRadius: "12px",
          marginTop: "2rem",
          marginLeft: "3rem",
          cursor: "pointer",
          backgroundColor: "rgba(8, 214, 255, 0.1)",
          boxShadow: "0 5px 15px rgba(21, 12, 214, 0.4)",
        }}
      >
        <h1>Directions to hospital:</h1>
        <div>
          {getRoute.map((getRoute, text) => {
            return (
              <ul key={text}>
                <li>{getRoute.text}</li>
              </ul>
            );

          })}
        </div>

      </div>
    </div>
  );
};

export default HospitalDetails;


