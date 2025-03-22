//eslint-disable-next-line
import { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Select, MenuItem, FormControl, InputLabel, Typography, Button,
  IconButton, Stack
} from "@mui/material";
import { SaveAlt, Add, Edit, Delete, Publish, Save, Download } from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material"; // Import SelectChangeEvent for type correction
import "./ExamSchedule.css";

function ExamSchedule() {
  const [selectedYear, setSelectedYear] = useState("");

  // Corrected event type
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedYear(event.target.value);
  };

  return (
    <>
      <div className="exam-schedule-container">
        <div className="title-section">
          <Typography variant="h4" className="title">Perunthalaivar Kamarajar Arts College</Typography>
          <Typography variant="h6" className="subtitle">Chief Examiner - Exam Schedule Management</Typography>
        </div>

        {/* Filter & Export Section */}
        <div className="top-actions">
          <FormControl className="year-filter">
            <InputLabel>Filter by Year</InputLabel>
            <Select value={selectedYear} onChange={handleChange}>
              <MenuItem value="All Years">All Years</MenuItem>
              <MenuItem value="I Year">I Year</MenuItem>
              <MenuItem value="II Year">II Year</MenuItem>
              <MenuItem value="III Year">III Year</MenuItem>
            </Select>
          </FormControl>
          <IconButton color="primary" aria-label="export schedule">
            <SaveAlt />
          </IconButton>
        </div>

        {/* Scrollable Table Section */}
        <div className="table-container">
          <TableContainer sx={{ maxHeight: 440 }} component={Paper} className="table-wrapper">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell><b>Year</b></TableCell>
                  <TableCell><b>Department</b></TableCell>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Subject Title</b></TableCell>
                  <TableCell><b>Subject Code</b></TableCell>
                  <TableCell><b>Session (FN/AN)</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: 20 }).map((_, index) => (
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
        </div>

        {/* Bottom Action Buttons */}
        <div className="button-group">
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" color="primary" startIcon={<Add />}>Add Exam Schedule</Button>
            <Button variant="outlined" color="secondary" startIcon={<Edit />}>Edit</Button>
            <Button variant="contained" color="error" startIcon={<Delete />}>Delete</Button>
            <Button variant="contained" color="info" startIcon={<Save />}>Save</Button>
            <Button variant="contained" color="success" startIcon={<Publish />}>Publish</Button>
            <Button variant="contained" color="warning" startIcon={<Download />}>Download</Button>
          </Stack>
        </div>
      </div>
    </>
  );
}

export default ExamSchedule;
