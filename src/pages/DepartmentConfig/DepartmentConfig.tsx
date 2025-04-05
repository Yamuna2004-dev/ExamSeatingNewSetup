import { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Button, Typography, Stack, IconButton, Alert
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import "./DepartmentConfig.css";

const defaultDepartments = [
  { id: 1, name: "BCA" },
  { id: 2, name: "BBA (Tourism)" },
  { id: 3, name: "B.Com (General)" },
  { id: 4, name: "BA (Tamil)" },
  { id: 5, name: "B.Sc (Mathematics)" }
];

function Page3() {
  const [departments, setDepartments] = useState<{ id: number; name: string }[]>(defaultDepartments);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [newDepartmentId, setNewDepartmentId] = useState("");
  const [error, setError] = useState("");

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
    const idExists = departments.some((dept) => dept.id === parsedId);
    if (idExists) {
      setError("This Department ID already exists.");
      return;
    }

    // Validation 4: Duplicate Name
    const nameExists = departments.some(
      (dept) => dept.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (nameExists) {
      setError("This Department Name already exists.");
      return;
    }

    // If all checks pass
    const newDept = { id: parsedId, name: trimmedName };
    setDepartments([...departments, newDept]);
    setNewDepartmentId("");
    setNewDepartmentName("");
    setError("");
  };

  const handleDeleteDepartment = (id: number) => {
    const updatedDepartments = departments.filter(dept => dept.id !== id);
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
            {departments.map((dept) => (
              <TableRow key={dept.id} className="table-row">
                <TableCell>{dept.id}</TableCell>
                <TableCell>{dept.name}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteDepartment(dept.id)}>
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
