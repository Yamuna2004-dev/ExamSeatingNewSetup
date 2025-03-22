"use client";
import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import "./SeatingView.css";


 export default function StudentView() {

  return (
    <div className="cig">
      <h1 className="title1">
      perunthalaivar kamarajar arts college
      </h1>
      <h1 className="title2">
      Kalitheerthalkuppam, Puducherry - 605 017. Region: Puducherry
      </h1>
    <div className="container">
      <h1 className="heading">SEARCH SEATING</h1>
      <div className="UserInputArea">
        {/* Enter Your Register Number Label  with search button for searching the register number in the sql databse*/}
        <div className="register-container">
          <label className="form-label">Enter Your Register Number</label>

          <TextField id="filled-basic" type="text" className="text" />
          <Button 
            variant="contained" 
            color="primary" 
            
            startIcon={<SearchIcon />}  //  this line for Add Search Icon inside the button
          >Search
          </Button>
        </div>

        <div className="form-container">
          {/* Searching result display with student Register Number,hall,seat,dep   */}
          <div className="form-group">
            <label className="form-label">Register Number</label>
            <TextField variant="outlined" size="small" className="text" />
          </div>


          <div className="form-group">
            <label className="form-label">Exam Hall Number</label>
            <TextField variant="outlined" size="small" className="text" />
          </div>

          <div className="form-group">
            <label className="form-label">Seat Number</label>
            <TextField variant="outlined" size="small" className="text" />
          </div>

          <div className="form-group">
            <label className="form-label">Department Name</label>
            <TextField variant="outlined" size="small" className="text" />
          </div>

          <div className="form-group">
            <label className="form-label">Floor Number</label>
            <TextField variant="outlined" size="small" className="text" />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
