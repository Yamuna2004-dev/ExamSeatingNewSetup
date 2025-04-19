import { SetStateAction,useRef, useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Select, MenuItem, FormControl, InputLabel, Typography, Button,
  IconButton, TextField, 
} from "@mui/material";
import {
  SaveAlt, Edit, Delete, Save
} from "@mui/icons-material";
import PublishIcon from '@mui/icons-material/Publish';
import DownloadIcon from '@mui/icons-material/Download';
import { SelectChangeEvent } from "@mui/material";
import * as XLSX from 'xlsx';
import axios from 'axios';
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

export default function ExamSchedule() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [rows, setRows] = useState<ExamRow[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<ErrorType[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [examSchedules, setexamSchedules] = useState<{ dep_id: number; depname: string;
       subname:string; semester:number; date:string; session:string;
        subcode:string;year:string }[]>();



      
      // const [publishStatus, setPublishStatus] = useState("");
  
      useEffect(() => {
        axios.get("http://localhost:3000/schedule/get").then((res: { data: { dep_id: number; depname: string;
                  subname:string; semester:number; date:string; session:string;
                   subcode:string;year:string }[] }) => {
                    debugger;
          setexamSchedules(res.data)
          console.log("res.data",res.data)
        }).catch((err: { message: unknown; }) => {
          console.log("Error",err.message)
        })
      }, [])

   

      const validateRow = (row: ExamRow): ErrorType => {
        const err: ErrorType = {};
        if (!row.year) err.year = "Year is required";
        if (!row.department) err.department = "Department is required";
        if (!row.date || isNaN(Date.parse(row.date))) err.date = "Valid date required";
        if (!row.subjectTitle) err.subjectTitle = "Subject title is required";
        if (!row.subjectCode) err.subjectCode = "Subject code is required";
        if (!row.session) err.session = "Session is required";
        return err;
      };

      const saveStatus = () => {
        debugger;
        const allErrors = rows.map(validateRow);
        setErrors(allErrors);
        const hasErrors = allErrors.some(err => Object.keys(err).length > 0);
        if (!hasErrors) {
          if (editIndex === null) {
            const updatedRows = [...rows];
            axios.post("http://localhost:3000/schedule/insert",{exm:updatedRows}).then(() => {
              setRows([]);
              axios.get("http://localhost:3000/schedule/get")
              .then((res: {  data: SetStateAction<{ dep_id: number;
          depname:string; subname:string; semester:number; date:string; session:string;
           subcode:string;year:string }[] | undefined>; }) =>setexamSchedules(res.data) );
            })
           .catch((err: { message: unknown; }) => {
            console.log("Error",err.message)
          })
         } };
        }

  const handleChangeYear = (event: SelectChangeEvent<string>) => {
    setSelectedYear(event.target.value);
  };

  const handleChangeDepartment = (event: SelectChangeEvent<string>) => {
    setSelectedDepartment(event.target.value);
  };

  // const handleDownload = () => {
  //   if (rows.length === 0) {
  //     alert("No data available to download.");
  //     return;
  //   }

  //   const worksheetData = rows.map(row => ({
  //     "Year": row.year,
  //     "Department": row.department,
  //     "Date": row.date,
  //     "Subject Title": row.subjectTitle,
  //     "Subject Code": row.subjectCode,
  //     "Session": row.session
  //   }));

  //   const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Exam Schedule");
  //   XLSX.writeFile(workbook, "exam_schedule.xlsx");
  // };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (fileExtension !== "xlsx" && fileExtension !== "xls") {
      alert("Invalid file format. Please upload an Excel file.");
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
      const missingHeaders = requiredHeaders.filter(header => !(header in json[0]));
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

  const handleEditRow = (index: number) =>{ setEditIndex(index);
  }

  const handleDeleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    setEditIndex(null);

    (dep_id: number) => {
      axios.delete(`http://localhost:3000/schedule/delete/${dep_id}`)
        .then(() => {
          // Refresh the list after delete
          axios.get("http://localhost:3000/schedule/get")
            .then((res: { data: { dep_id: number; dep_name: string; depname: string; subname: string; semester: number; date: string; session: string; subcode: string; year: string }[] }) => {
              setexamSchedules(res.data);
            })
            .catch((err: { message: string }) => {
              console.error("Delete Error:", err.message);
            });
        });
    };
  
  };

  const handleInputChange = (index: number, field: keyof ExamRow, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

    const filteredRows = rows.filter(row =>
    (!selectedYear || row.year === selectedYear) &&
    (!selectedDepartment || row.department === selectedDepartment)
  );

  return (
    <div className="exam-schedule-container">
      <div className="title-section">
        <Typography variant="h4">Perunthalaivar Kamarajar Arts College</Typography>
        <Typography variant="h6">Chief Examiner - Exam Schedule Management</Typography>
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Subject Title</TableCell>
              <TableCell>Subject Code</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{examSchedules?.map((exam) => (
              <TableRow key={exam.dep_id}>
                <TableCell>{exam.year}</TableCell>
                <TableCell>{exam.depname}</TableCell>
                <TableCell>{exam.date}</TableCell>
                {/* <TableCell>{exam.semester}</TableCell> */}
                <TableCell>{exam.subname}</TableCell>
                <TableCell>{exam.subcode}</TableCell>
                <TableCell>{exam.session}</TableCell>
              </TableRow>
            ))}
            {filteredRows.map((row, index) => (
              <TableRow key={index}>
                {(["year", "department", "date", "subjectTitle", "subjectCode", "session"] as (keyof ExamRow)[]).map(field => (
                  <TableCell key={field}>
                    {editIndex === index ? (
                      <TextField
                        value={row[field]}
                        onChange={(e) => handleInputChange(index, field, e.target.value)}
                        error={!!errors[index]?.[field]}
                        helperText={errors[index]?.[field]}
                        size="small"
                      />
                    ) : (
                      row[field]
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  {editIndex === index ? (
                    <Button color="success" onClick={saveStatus}>Save</Button>
                  ) : (
                    <>
                      <IconButton color="primary" onClick={() => handleEditRow(index)}><Edit /></IconButton>
                      <IconButton color="error" onClick={() => handleDeleteRow(index)}><Delete /></IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="a">
        {/* <Button variant="contained" color="warning" onClick={handleDownload} startIcon={<DownloadIcon />}>Download </Button> */}
        <Button variant="contained"  onClick={saveStatus} color="success" startIcon={<Save />}>Save</Button>
       <Button variant="contained" color="secondary" startIcon={<PublishIcon />}>Publish</Button>
        </div>
    </div>
  );  
}
// export default ExamSchedule;