
import React, { useState } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Select, MenuItem, 
  FormControl, InputLabel, Typography, Box 
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

import "./StudentSchedule.css";

export default function StudentSchedule() {
  const [selectedYear, setSelectedYear] = useState("");

 
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value);
  };
  

  return (
    <div className="exam-schedule-container">
      <Box sx={{ p: 3, textAlign: "center" }}>
        
        <Typography variant="h4" className="college-title" gutterBottom>
          Perunthalaivar Kamarajar Arts College
        </Typography>
        <Typography variant="h6" className="h2title" gutterBottom>
          Kalitheerthalkuppam, Puducherry - 605 017. Region: Puducherry
        </Typography>
        <Typography variant="h6" className="exam-title" gutterBottom>
          Exam Schedule
        </Typography>

        {/* Dropdown for filtering by year */}
        <FormControl sx={{ minWidth: 200, mb: 2 }}>
          <InputLabel>Filter by Year</InputLabel>
          <Select value={selectedYear} onChange={handleChange}>
            <MenuItem value="All Years">All Years</MenuItem>
            <MenuItem value="I Year">I Year</MenuItem>
            <MenuItem value="II Year">II Year</MenuItem>
            <MenuItem value="III Year">III Year</MenuItem>
          </Select>
        </FormControl>

        {/* Table Structure */}
        <TableContainer sx={{ maxHeight: 440 }} component={Paper} className="exam-table">
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell><b>Year</b></TableCell>
                <TableCell><b>Department</b></TableCell>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Subject Title</b></TableCell>
                <TableCell><b>Subject Code</b></TableCell>
                <TableCell><b>Session (FN/AN)</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Creating 26 empty rows */}
              {Array.from({ length: 26 }).map((_, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
