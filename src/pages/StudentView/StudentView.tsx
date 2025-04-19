"use client";
import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import "./StudentView.css";

function StudentView() {
  const [registerNumber, setRegisterNumber] = useState("");

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Logic to fetch student data from database using registerNumber
    console.log("Searching for register number:", registerNumber);
  };

  return (
    <div className="student-container">
      <h1 className="college-title">
        Perunthalaivar Kamarajar Arts College
      </h1>
      <h2 className="college-subtitle">
        Kalitheerthalkuppam, Puducherry - 605 017. Region: Puducherry
      </h2>

      <div className="seating-search-container">
        <h2 className="section-title">Search Seating</h2>

        <div className="input-section">
          <label className="form-label">Enter Your Register Number</label>
          <div className="search-bar">
            <TextField
              variant="outlined"
              value={registerNumber}
              onChange={(e) => setRegisterNumber(e.target.value)}
              size="small"
              className="text-input"
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>

        <div className="result-section">
          <div className="form-group">
            <label className="form-label">Register Number</label>
            <TextField variant="outlined" size="small" className="text-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Exam Hall Number</label>
            <TextField variant="outlined" size="small" className="text-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Seat Number</label>
            <TextField variant="outlined" size="small" className="text-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Department Name</label>
            <TextField variant="outlined" size="small" className="text-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Floor Number</label>
            <TextField variant="outlined" size="small" className="text-input" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentView;