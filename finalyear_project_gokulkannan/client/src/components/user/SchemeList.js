// SchemeList.js
import React from "react";
import schemes from "./schemes";
import VoluntierNavbar from "./navbarvoluntier";

const SchemeList = () => {
  // Group schemes by category
  const schemesByCategory = schemes.reduce((acc, scheme) => {
    if (!acc[scheme.category]) {
      acc[scheme.category] = [];
    }
    acc[scheme.category].push(scheme);
    return acc;
  }, {});

  return (
    <>
      <VoluntierNavbar />
      <div style={{ padding: "20px",backgroundColor:"white" }}>
        <h1 style={{ marginBottom: "20px" }}>List of Schemes</h1>
        {Object.keys(schemesByCategory).map((category) => (
          <div key={category} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.5rem", marginTop: "0", marginBottom: "10px" }}>{category}</h2>
            <ul>
              {schemesByCategory[category].map((scheme) => (
                <li key={scheme.id} style={{ marginBottom: "10px" }}>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "5px" }}>{scheme.name}</h3>
                  <p style={{ marginBottom: "5px" }}>{scheme.description}</p>
                  <a href={scheme.link} style={{ color: "green" }} target="_blank" rel="noopener noreferrer">
                    Apply Here
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default SchemeList;
