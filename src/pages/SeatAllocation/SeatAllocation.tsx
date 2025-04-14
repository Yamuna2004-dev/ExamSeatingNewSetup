import { useState } from "react";
import {
  TextField,
  Button,
  Autocomplete,
  Typography,
  Pagination,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import * as XLSX from 'xlsx';

import "./SeatAllocation.css";

type Student = {
  regNo: string;
  dept: string;
};

type Seat = {
  seat: string;
  regNo: string;
  dept: string;
};

const deptCodeMap: Record<string, string> = {
  BCA: "CA",
  BBA: "TS",
  BCom: "CO",
  BA: "TA",
  "B.Sc": "MS"
};

function Page2() {
  const departments = ["BBA", "BCA", "BCom", "B.Sc", "BA"];
  const SEATS_PER_HALL = 30;
  const SEATS_PER_BENCH = 2;
  const BENCHES_PER_HALL = SEATS_PER_HALL / SEATS_PER_BENCH;

  const [roomNumber, setRoomNumber] = useState(1);
  const [animationClass, setAnimationClass] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [seatData, setSeatData] = useState<Seat[][][][]>([]);
  const [totalRooms, setTotalRooms] = useState(1);
  const [useInterval, setUseInterval] = useState(false);
  const [useOrderWise, setUseOrderWise] = useState(false);
  const [useRandomWise, setUseRandomWise] = useState(false);
  


  const handleRoomChange = (newRoom: number) => {
    setAnimationClass(newRoom > roomNumber ? "swipe-right" : "swipe-left");
    setTimeout(() => {
      setRoomNumber(newRoom);
      setAnimationClass("");
    }, 300);
  };
  const generateAttendanceReport = () => {
    const wb = XLSX.utils.book_new();
  
    seatData.forEach((room, roomIndex) => {
      const sheetData: (string | undefined)[][] = [];
  
      // Title Row: Room Heading
      sheetData.push([`Room ${roomIndex + 1}`]);
      sheetData.push([]); // Empty row after heading
  
      //  Define type for deptGroupMap
      const deptGroupMap: Record<string, string[][]> = {};
  
      room.forEach((row) => {
        row.forEach((bench) => {
          bench.forEach((seat) => {
            if (!seat.regNo || !seat.dept) return;
  
            if (!deptGroupMap[seat.dept]) {
              deptGroupMap[seat.dept] = [];
            }
  
            deptGroupMap[seat.dept].push([
              seat.dept,
              seat.seat,
              seat.regNo,
              "" // Empty signature column
            ]);
          });
        });
      });
  
      // Table Headers
      sheetData.push(["Department", "Seat", "Reg No", "Signature"]);
  
      // Group students department-wise
      Object.keys(deptGroupMap).forEach((dept) => {
        deptGroupMap[dept].forEach((row) => {
          sheetData.push(row);
        });
        sheetData.push([]); // Blank line after each department
      });
  
      const ws = XLSX.utils.aoa_to_sheet(sheetData);
  
      // Merge Room heading cells (A1 to D1)
      if (!ws["!merges"]) ws["!merges"] = [];
      ws["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } });
  
      XLSX.utils.book_append_sheet(wb, ws, `Room ${roomIndex + 1}`);
    });
  
    XLSX.writeFile(wb, "Attendance_Report.xlsx");
  };
  
  const generateStudents = (): Student[] => {

    const all: Student[] = [];
    selectedDepartments.forEach((dept) => {
      
      const prefix = deptCodeMap[dept];
      for (let i = 1; i <= 20; i++) {
        const regNo = `${prefix}02${String(i).padStart(2, "0")}`;
        all.push({ regNo, dept });
      }
    });

    if (useOrderWise) {
      return all.sort((a, b) => a.regNo.localeCompare(b.regNo));
    }

    if (useRandomWise) {
      for (let i = all.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [all[i], all[j]] = [all[j], all[i]];
      }
    }

    return all;
  };

  const hybridSeating = (students: Student[]): [Student, Student][] => {
    const pairs: [Student, Student][] = [];
    const used = new Array(students.length).fill(false);
  
    const backtrack = (index: number): boolean => {
      if (index >= students.length) return true;
  
      if (used[index]) return backtrack(index + 1);
  
      for (let j = index + 1; j < students.length; j++) {
        if (!used[j] && students[index].dept !== students[j].dept) {
          // Try pairing students[index] and students[j]
          used[index] = true;
          used[j] = true;
          pairs.push([students[index], students[j]]);
  
          if (backtrack(index + 1)) return true;
  
          // Backtrack if it fails
          used[index] = false;
          used[j] = false;
          pairs.pop();
        }
      }
  
      // If no partner found, seat student alone
      used[index] = true;
      pairs.push([students[index], { regNo: "", dept: "" }]);
  
      if (backtrack(index + 1)) return true;
  
      // Backtrack solo seat too
      used[index] = false;
      pairs.pop();
  
      return false;
    };
  
    backtrack(0);
    return pairs;
  };
  

  const allocateSeats = () => {
    const students = generateStudents();
    const resultPairs = hybridSeating(students);

    let benchesNeeded = resultPairs.length;
    if (useInterval) benchesNeeded *= 2;

    const hallsNeeded = Math.ceil(benchesNeeded / BENCHES_PER_HALL);
    setTotalRooms(hallsNeeded);

    const benchesPerHall: ([Student, Student] | null)[][] = Array.from({ length: hallsNeeded }, () => []);
    let index = 0;

    for (let r = 0; r < hallsNeeded; r++) {
      for (let b = 0; b < BENCHES_PER_HALL; b++) {
        if (useInterval && b % 2 === 1) {
          benchesPerHall[r].push(null);
        } else {
          benchesPerHall[r].push(resultPairs[index++] || null);
        }
      }
    }

    const seatLabels = ["A", "B", "C", "D", "E", "F"];
    const finalSeats: Seat[][][][] = benchesPerHall.map((hall) => {
      const room: Seat[][][] = [];

      for (let i = 0; i < hall.length; i++) {
        const pair = hall[i];
        const row = Math.floor(i / 3);
        const col = i % 3;

        const seat1: Seat = {
          seat: `${seatLabels[col * 2]}${row + 1}`,
          regNo: pair?.[0].regNo || "",
          dept: pair?.[0].dept || ""
        };
        const seat2: Seat = {
          seat: `${seatLabels[col * 2 + 1]}${row + 1}`,
          regNo: pair?.[1].regNo || "",
          dept: pair?.[1].dept || ""
        };

        if (!room[row]) room[row] = [];
        room[row].push([seat1, seat2]);
      }

      return room;
    });

    setSeatData(finalSeats);
  };

  const getDeptColor = (dept: string) => {
    switch (dept) {
      case "BCA": return "#C2F0C2";
      case "BBA": return "#FEEBC8";
      case "BCom": return "#D6E4FF";
      case "BA": return "#FFD6E7";
      case "B.Sc": return "#E3D6FF";
      default: return "#EEE";
    }
  };
  

  return (
    <div className="SeatAllocation">
      <h3 className="Heading">SEAT ALLOCATION</h3>
      <div className="UserInputArea">
        <div className="Flex">
          <div className="Option">
            <p className="LabelArea">Department</p>
            <Autocomplete
              multiple
              options={departments}
              value={selectedDepartments}
              onChange={(_, value) => setSelectedDepartments(value)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Select Departments" variant="filled"  required 
              helperText={ "Please select at least one department" }/>}
            />
          </div>
          <div className="Option">
            <p className="LabelArea">Bench Capacity</p>
            <TextField value="2" disabled variant="filled" />
          </div>
        </div>

        <div className="Flex">
          <FormControlLabel control={<Checkbox checked={useInterval} onChange={(e) => setUseInterval(e.target.checked)} />} label="Interval (Empty Bench)" />
          <FormControlLabel control={<Checkbox checked={useOrderWise} onChange={(e) => { setUseOrderWise(e.target.checked); setUseRandomWise(false); }} />} label="Order-wise Seating" />
          <FormControlLabel control={<Checkbox checked={useRandomWise} onChange={(e) => { setUseRandomWise(e.target.checked); setUseOrderWise(false); }} />} label="Random-wise Seating" />
        </div>

        <div className="Flex">
          <div className="Option">
            <p className="LabelArea">No. of Benches</p>
            <TextField value={seatData.length > 0 ? seatData[0].length * 3 : 0} disabled variant="filled" />
          </div>
          <div className="Option">
            <p className="LabelArea">No. of Halls</p>
            <TextField value={totalRooms} disabled variant="filled" />
          </div>
        </div>

        <div className="Action">
          <Button variant="contained" onClick={allocateSeats}>Generate Seating</Button>
        </div>
      </div>

      <div className="report-container">
        <Typography className="report-heading">Room {roomNumber} - Seating Report</Typography>
        <div className={`seat-grid ${animationClass}`}>
          {seatData[roomNumber - 1]?.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.map((bench, colIndex) => (
                <div className="seat-pair" key={colIndex}>
                  {bench.map((seat, idx) => (
                    <div className="seat-card" key={idx} style={{ backgroundColor: getDeptColor(seat.dept) }}>
                      <Typography className="seat-number">{seat.seat}</Typography>
                      <Typography className="register-number">{seat.regNo}</Typography>
                      <Typography className="dept-code">{seat.dept}</Typography>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="pagination-container">
          <Pagination count={totalRooms} page={roomNumber} onChange={(_, value) => handleRoomChange(value)} color="primary" size="large" />
        </div>
        <div className="Action">
        <Button variant="outlined" onClick={generateAttendanceReport} style={{ marginLeft: '10px' }}>
            Download Attendance Report
        </Button>
        </div>
      </div>
    </div>
  );
}

export default Page2;
