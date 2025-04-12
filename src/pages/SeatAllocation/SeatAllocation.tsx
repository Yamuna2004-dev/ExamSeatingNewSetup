import { useState } from "react";
import { TextField, Button, Autocomplete, Typography, Pagination, FormControlLabel, Checkbox } from "@mui/material";
import "./SeatAllocation.css";

type Student = {
  regNo: string;
  dept: string;
};

type Seat = {
  seat: string;
  regNo: string;
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

  const generateStudents = (): Student[] => {
    const all: Student[] = [];
    selectedDepartments.forEach((dept) => {
      for (let i = 1; i <= 20; i++) {
        all.push({ regNo: `${dept.slice(0, 2).toUpperCase()}${String(i).padStart(4, "0")}`, dept });
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

  const greedyPairing = (students: Student[]): [Student, Student][] => {
    const pairs: [Student, Student][] = [];
    const used = new Array(students.length).fill(false);

    if (selectedDepartments.length === 1) {
      students.forEach((s) => pairs.push([s, { regNo: "", dept: "" }]));
      return pairs;
    }

    for (let i = 0; i < students.length; i++) {
      if (used[i]) continue;
      let paired = false;
      for (let j = i + 1; j < students.length; j++) {
        if (!used[j] && students[i].dept !== students[j].dept) {
          pairs.push([students[i], students[j]]);
          used[i] = true;
          used[j] = true;
          paired = true;
          break;
        }
      }
      if (!paired) {
        pairs.push([students[i], { regNo: "", dept: "" }]);
        used[i] = true;
      }
    }

    return pairs;
  };

  const allocateSeats = () => {
    const students = generateStudents();
    const resultPairs = greedyPairing(students);

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

        const seat1: Seat = { seat: `${seatLabels[col * 2]}${row + 1}`, regNo: pair?.[0].regNo || "" };
        const seat2: Seat = { seat: `${seatLabels[col * 2 + 1]}${row + 1}`, regNo: pair?.[1].regNo || "" };

        if (!room[row]) room[row] = [];
        room[row].push([seat1, seat2]);
      }

      return room;
    });

    setSeatData(finalSeats);
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
              renderInput={(params) => <TextField {...params} label="Select Departments" variant="filled" />}
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
        <Typography className="report-heading">Room {roomNumber} - Seating Arrangement</Typography>
        <div className={`seat-grid ${animationClass}`}>
          {seatData[roomNumber - 1]?.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.map((bench, colIndex) => (
                <div className="seat-pair" key={colIndex}>
                  <div className="seat-card">
                    <Typography className="seat-number">{bench[0].seat}</Typography>
                    <Typography className="register-number">{bench[0].regNo}</Typography>
                  </div>
                  <div className="seat-card">
                    <Typography className="seat-number">{bench[1].seat}</Typography>
                    <Typography className="register-number">{bench[1].regNo}</Typography>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="pagination-container">
          <Pagination count={totalRooms} page={roomNumber} onChange={(_, value) => handleRoomChange(value)} color="primary" size="large" />
        </div>
      </div>
    </div>
  );
}

export default Page2; 