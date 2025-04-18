import { useRef, useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Select, MenuItem, FormControl, InputLabel, Typography, Button,
  IconButton, Stack, TextField
} from "@mui/material";
import { SaveAlt, Add, Edit, Delete, Publish, Save, Download } from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material";
import * as XLSX from 'xlsx';
import "./ExamSchedule.css";
import axios from 'axios';

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
  
const ExamSchedule = () => {
  const [examSchedules, setExamSchedules] = useState<unknown[]>([]);
  // const [newExamYear, setNewExamYear] = useState("");
  // const [newExamDepartment, setNewExamDepartment] = useState("");
  // const [newExamSubject, setNewExamSubject] = useState("");
  // const [newExamDate, setNewExamDate] = useState("");
  // const [newExamSession, setNewExamSession] = useState("");
  // const [newExamCode, setNewExamCode] = useState("");
  // const [error, setError] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [rows, setRows] = useState<ExamRow[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<ErrorType[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  useEffect(() => {
    axios.get("http://localhost:3000/exam-schedule/get")
      .then((res) => {
        setExamSchedules(res.data);
      })
      .catch((err) => {
        console.log("Error fetching schedules:", err.message);
      });
  }, []);

  // const handleAddExamSchedule = () => {
  //   const trimmedYear = newExamYear.trim();
  //   const trimmedDepartment = newExamDepartment.trim();
  //   const trimmedSubject = newExamSubject.trim();
  //   const trimmedDate = newExamDate.trim();
  //   const trimmedSession = newExamSession.trim();
  //   const trimmedCode = newExamCode.trim();
  
  //   // Validation: Empty Fields
  //   if (!trimmedYear || !trimmedDepartment || !trimmedSubject || !trimmedDate || !trimmedSession || !trimmedCode) {
  //     setError("All fields are required.");
  //     return;
  //   }
  
  //   // Validation: Check if Date is valid
  //   const parsedDate = Date.parse(trimmedDate);
  //   if (isNaN(parsedDate)) {
  //     setError("Invalid date format.");
  //     return;
  //   }
  
  //   // Validation: Duplicate Subject Code
  //   const codeExists = examSchedules.some((schedule) => schedule.subjectCode === trimmedCode);
  //   if (codeExists) {
  //     setError("This Subject Code already exists.");
  //     return;
  //   }
  
  //   // If validation passes, make API call to insert the new schedule
  //   const newSchedule = {
  //     year: trimmedYear,
  //     department: trimmedDepartment,
  //     date: trimmedDate,
  //     subjectTitle: trimmedSubject,
  //     subjectCode: trimmedCode,
  //     session: trimmedSession
  //   };
  
  //   axios.post("http://localhost:3000/exam-schedule/insert", newSchedule) // API to insert exam schedule
  //     .then(() => {
  //       setNewExamYear("");
  //       setNewExamDepartment("");
  //       setNewExamSubject("");
  //       setNewExamDate("");
  //       setNewExamSession("");
  //       setNewExamCode("");
  //       setError("");
  
  //       // Refresh the schedule list
  //       axios.get("http://localhost:3000/exam-schedule/get")
  //         .then((res) => setExamSchedules(res.data));
  //     })
  //     .catch((err) => {
  //       console.log("Error adding schedule", err.message);
  //     });
  // };

  // const handleEditExamSchedule = (examCode: string, updatedSchedule: any) => {
  //   axios.put(`http://localhost:3000/exam-schedule/update/${examCode}`, updatedSchedule)
  //     .then(() => {
  //       alert("Exam Schedule updated successfully!");
  //       // Refresh the schedule list
  //       axios.get("http://localhost:3000/exam-schedule/get")
  //         .then((res) => setExamSchedules(res.data));
  //     })
  //     .catch((err) => {
  //       console.log("Error updating schedule", err.message);
  //     });
  // };
  
  // const handleDeleteExamSchedule = (examCode: string) => {
  //   axios.delete(`http://localhost:3000/exam-schedule/delete/${examCode}`) // API to delete the schedule by subject code
  //     .then(() => {
  //       // Refresh the schedule list after delete
  //       axios.get("http://localhost:3000/exam-schedule/get")
  //         .then((res) => setExamSchedules(res.data));
  //     })
  //     .catch((err) => {
  //       console.error("Error deleting schedule", err.message);
  //     });
  // };
  

  const handleChangeYear = (event: SelectChangeEvent<string>) => {
    setSelectedYear(event.target.value);
  };

  const handleChangeDepartment = (event: SelectChangeEvent<string>) => {
    setSelectedDepartment(event.target.value);
  };

  const handleDownload = () => {
    if (rows.length === 0) {
      alert("No data available to download.");
      return;
    }

    const worksheetData = rows.map(row => ({
      "Year": row.year,
      "Department": row.department,
      "Date": row.date,
      "Subject Title": row.subjectTitle,
      "Subject Code": row.subjectCode,
      "Session": row.session
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exam Schedule");
    XLSX.writeFile(workbook, "exam_schedule.xlsx");
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
          <Select value={selectedYear} onChange={handleChangeYear}>
            <MenuItem value="">All Years</MenuItem>
            <MenuItem value="I Year">I Year</MenuItem>
            <MenuItem value="II Year">II Year</MenuItem>
            <MenuItem value="III Year">III Year</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="dept-filter">
          <InputLabel>Filter by Department</InputLabel>
          <Select value={selectedDepartment} onChange={handleChangeDepartment}>
            <MenuItem value="">All Departments</MenuItem>
            <MenuItem value="BCA">BCA</MenuItem>
            <MenuItem value="BCom">BCom</MenuItem>
            <MenuItem value="BA">BA</MenuItem>
            <MenuItem value="BSc">BSc</MenuItem>
            <MenuItem value="BBA">BBA</MenuItem>
          </Select>
        </FormControl>

        <IconButton color="primary" onClick={handleImportClick}><SaveAlt /></IconButton>
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
              {rows
                .filter(row =>
                  (selectedYear === "" || row.year === selectedYear) &&
                  (selectedDepartment === "" || row.department === selectedDepartment)
                )
                .map((row, index) => (
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
          <Button variant="contained" color="warning" startIcon={<Download />} onClick={handleDownload}>Download</Button>
        </Stack>
      </div>
    </div>
  );
}

export default ExamSchedule;
