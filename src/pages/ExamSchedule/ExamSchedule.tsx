import { useRef, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Select, MenuItem, FormControl, InputLabel, Typography, Button,
  IconButton, Stack, TextField
} from "@mui/material";
import { SaveAlt, Add, Edit, Delete, Publish, Save, Download } from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material";
import * as XLSX from 'xlsx';
import "./ExamSchedule.css";

interface ExamRow {
  year: string;
  department: string;
  date: string;
  subjectTitle: string;
  subjectCode: string;
  session: string;
}

type ErrorType = {
  [key in keyof ExamRow]?: string;
};

function ExamSchedule() {
  const [selectedYear, setSelectedYear] = useState("");
  const [rows, setRows] = useState<ExamRow[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<ErrorType[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedYear(event.target.value);
  };

  const handleAddRow = () => {
    setRows([...rows, { year: "", department: "", date: "", subjectTitle: "", subjectCode: "", session: "" }]);
    setErrors([...errors, {}]);
  };

  const handleEditRow = (index: number) => {
    setEditIndex(index);
  };

  const handleDeleteRow = (index: number) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);

    if (editIndex === index) setEditIndex(null);
  };

  const handleInputChange = (index: number, field: keyof ExamRow, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const validateRow = (row: ExamRow): ErrorType => {
    const err: ErrorType = {};
    if (!row.year) err.year = "Year is required";
    if (!row.department) err.department = "Department is required";
    if (!row.date || isNaN(Date.parse(row.date))) err.date = "Valid date (YYYY-MM-DD) is required";
    if (!row.subjectTitle) err.subjectTitle = "Subject title is required";
    if (!row.subjectCode) err.subjectCode = "Subject code is required";
    if (!row.session) err.session = "Session is required";
    return err;
  };

  const handleSave = () => {
    const allErrors = rows.map(validateRow);
    setErrors(allErrors);
    const hasErrors = allErrors.some(err => Object.keys(err).length > 0);
    if (!hasErrors) {
      alert("Saved successfully!");
      setEditIndex(null);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (fileExtension !== "xlsx" && fileExtension !== "xls") {
      alert("Invalid file format. Please upload an Excel file (.xlsx or .xls)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json: any[] = XLSX.utils.sheet_to_json(sheet);

      const requiredHeaders = ["Year", "Department", "Date", "Subject Title", "Subject Code", "Session"];
      const firstRow = json[0];

      const missingHeaders = requiredHeaders.filter(header => !(header in firstRow));
      if (missingHeaders.length > 0) {
        alert(`Missing required columns: ${missingHeaders.join(", ")}`);
        return;
      }

      const importedRows: ExamRow[] = json.map(row => ({
        year: row["Year"] || "",
        department: row["Department"] || "",
        date: row["Date"] || "",
        subjectTitle: row["Subject Title"] || "",
        subjectCode: row["Subject Code"] || "",
        session: row["Session"] || ""
      }));

      setRows([...rows, ...importedRows]);
      setErrors([...errors, ...Array(importedRows.length).fill({})]);

      alert("File imported successfully!");
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="exam-schedule-container">
      <div className="title-section">
        <Typography variant="h4" className="title">Perunthalaivar Kamarajar Arts College</Typography>
        <Typography variant="h6" className="subtitle">Chief Examiner - Exam Schedule Management</Typography>
      </div>

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
        <IconButton color="primary" aria-label="import schedule" onClick={handleImportClick}>
          <SaveAlt />
        </IconButton>
        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </div>

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
                <TableCell><b>Session</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {Object.keys(row).map((key) => (
                    <TableCell key={key}>
                      {editIndex === index ? (
                        <TextField
                          error={!!errors[index]?.[key as keyof ExamRow]}
                          helperText={errors[index]?.[key as keyof ExamRow] || ""}
                          value={row[key as keyof ExamRow]}
                          onChange={(e) => handleInputChange(index, key as keyof ExamRow, e.target.value)}
                        />
                      ) : (
                        row[key as keyof ExamRow]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton color="secondary" onClick={() => handleEditRow(index)}><Edit /></IconButton>
                    <IconButton color="error" onClick={() => handleDeleteRow(index)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="button-group">
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddRow}>Add Exam Schedule</Button>
          <Button variant="contained" color="info" startIcon={<Save />} onClick={handleSave}>Save</Button>
          <Button variant="contained" color="success" startIcon={<Publish />}>Publish</Button>
          <Button variant="contained" color="warning" startIcon={<Download />}>Download</Button>
        </Stack>
      </div>
    </div>
  );
}

export default ExamSchedule;
