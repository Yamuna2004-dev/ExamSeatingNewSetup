import React from "react";
// import HomeIcon from "@mui/icons-material/Home";
import "./WelcomePage.css";
import pkac from './pkac.jpg';
import collegeLogo from "./clg log.jpg";

const WelcomePage: React.FC = () => {
  return (
    <div className="welcome-container" style={{  backgroundImage: `url(${pkac})` }}>
      {/* Home Icon
      <div className="home-icon">
        <HomeIcon fontSize="large" />
      </div> */}

      <div className="logo-container">
      <img src={collegeLogo} alt="College Logo" width={150} height={150} />
      </div>

      {/* College Name */}
      <h1 className="college-name">Perunthalaivar Kamarajar Arts College</h1>
      <h3 className="college-name2"> Kalitheerthalkuppam, Puducherry - 605 017. Region: Puducherry</h3>
      {/* Welcome Message */}
      <p className="welcome-message">
        Welcome, Chief Examiner! Manage exam schedules, seating arrangements, and reports efficiently.
      </p>
    </div>
  );
};

export default WelcomePage;
