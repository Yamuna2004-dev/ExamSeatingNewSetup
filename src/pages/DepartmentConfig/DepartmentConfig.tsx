import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Button, Typography, Stack, IconButton, Alert
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import "./DepartmentConfig.css";
import axios from "axios";

function Page3() {
  const [departments, setDepartments] = useState<{ dep_id: number; dep_name: string }[]>();
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [newDepartmentId, setNewDepartmentId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/dept/get").then((res) => {
      setDepartments(res.data)
      console.log("res.data",res.data)
      debugger;
    }).catch((err) => {
      console.log("Error",err.message)
    })
  }, [])

  const handleAddDepartment = () => {
    const trimmedId = newDepartmentId.trim();
    const trimmedName = newDepartmentName.trim();

    // Validation 1: Empty Fields
    if (!trimmedId || !trimmedName) {
      setError("Both Department ID and Name are required.");
      return;
    }

    // Validation 2: ID must be a number
    const parsedId = parseInt(trimmedId);
    if (isNaN(parsedId)) {
      setError("Department ID must be a valid number.");
      return;
    }

    if (parsedId <= 0) {
      setError("Department ID must be greater than 0.");
      return;
    }

    // Validation 3: Duplicate ID
    const idExists = departments?.some((dept) => dept.dep_id === parsedId);
    if (idExists) {
      setError("This Department ID already exists.");
      return;
    }

    // Validation 4: Duplicate Name
    const nameExists = departments?.some(
      (dept) => dept.dep_name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (nameExists) {
      setError("This Department Name already exists.");
      return;
    }

    // If all checks pass
    const newDept = { dep_id: parsedId, dep_name: trimmedName };
    axios.post("http://localhost:3000/dept/insert",newDept).then(() => {
      setNewDepartmentId("");
      setNewDepartmentName("");
      setError("");
    })

  };

  const handleDeleteDepartment = (dep_id: number) => {
    const updatedDepartments = departments?.filter(dept => dept.dep_id !== dep_id);
    setDepartments(updatedDepartments);
  };

  return (
    <div className="department-management">
      <Typography variant="h4" className="college-title">
        Perunthalaivar Kamarajar Arts College
      </Typography>
      <Typography variant="h6" className="section-title">
        Department Configuration
      </Typography>

      {error && <Alert severity="error" className="error-message">{error}</Alert>}

      <TableContainer component={Paper} className="department-table-container">
        <Table stickyHeader>
          <TableHead>
            <TableRow className="table-header">
              <TableCell><b>Department ID</b></TableCell>
              <TableCell><b>Department Name</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments?.map((dept) => (
              <TableRow key={dept.dep_id} className="table-row">
                <TableCell>{dept.dep_id}</TableCell>
                <TableCell>{dept.dep_name}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteDepartment(dept.dep_id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" className="section-title">
        Add New Department
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center" className="add-department-form">
        <TextField
          label="Department ID"
          type="number"
          value={newDepartmentId}
          onChange={(e) => setNewDepartmentId(e.target.value)}
          variant="outlined"
          className="input-field"
        />
        <TextField
          label="Department Name"
          value={newDepartmentName}
          onChange={(e) => setNewDepartmentName(e.target.value)}
          variant="outlined"
          className="input-field"
        />
        <Button variant="contained" color="success" onClick={handleAddDepartment} className="add-department-button">
          Add Department
        </Button>
      </Stack>
    </div>
  );
}

export default Page3;
