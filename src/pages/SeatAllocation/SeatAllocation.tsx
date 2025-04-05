import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { Typography, Pagination } from "@mui/material";
import "./SeatAllocation.css";

function Page2() {
  const departments = ["BBA", "BCA", "BCom", "B.Sc", "BA"];

  const sampleSeats = [
    [
      { seat: "A1", regNo: "Reg:22CA0259" }, { seat: "B1", regNo: "Reg:22CA0259" },
      { seat: "C1", regNo: "Reg:22CA0259" }, { seat: "D1", regNo: "Reg:22CA0259" },
      { seat: "E1", regNo: "Reg:22CA0259" }, { seat: "F1", regNo: "Reg:22CA0259" }
    ],
    [
      { seat: "A2", regNo: "Reg:22CA02599" }, { seat: "B2", regNo: "Reg:22CA02590" },
      { seat: "C2", regNo: "" }, { seat: "D2", regNo: "Reg:22CA0259" },
      { seat: "E2", regNo: "Reg133" }, { seat: "F2", regNo: "Reg:22CA0259" }
    ],
    [
      { seat: "A3", regNo: "Reg:22CA0259" }, { seat: "B3", regNo: "Reg:22CA0259" },
      { seat: "C3", regNo: "Reg137" }, { seat: "D3", regNo: "Reg:22CA0259" },
      { seat: "E3", regNo: "Reg139" }, { seat: "F3", regNo: "Reg:22CA0259" }
    ],
    [
      { seat: "A4", regNo: "Reg141" }, { seat: "B4", regNo: "Reg142" },
      { seat: "C4", regNo: "Reg143" }, { seat: "D4", regNo: "Reg144" },
      { seat: "E4", regNo: "Reg145" }, { seat: "F4", regNo: "Reg146" }
    ],
    [
      { seat: "A5", regNo: "Reg147" }, { seat: "B5", regNo: "Reg148" },
      { seat: "C5", regNo: "Reg149" }, { seat: "D5", regNo: "Reg150" },
      { seat: "E5", regNo: "Reg151" }, { seat: "F5", regNo: "Reg152" }
    ]
  ];

  const TOTAL_ROOMS = 15;
  const [roomNumber, setRoomNumber] = useState<number>(1);
  const [animationClass, setAnimationClass] = useState<string>("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [benchCapacity, setBenchCapacity] = useState<string>("");
  const [numBenches, setNumBenches] = useState<string>("");
  const [numHalls, setNumHalls] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleRoomChange = (newRoom: number) => {
    if (newRoom > roomNumber) {
      setAnimationClass("swipe-right");
    } else {
      setAnimationClass("swipe-left");
    }
    setTimeout(() => {
      setRoomNumber(newRoom);
      setAnimationClass("");
    }, 300);
  };

  const handleGenerate = () => {
    const benchCap = parseInt(benchCapacity);
    const benches = parseInt(numBenches);
    const halls = parseInt(numHalls);

    if (isNaN(benchCap) || benchCap !== 2) {
      setError("Bench capacity must be exactly 2.");
      return;
    }
    if (benches < 0 || halls < 0) {
      setError("Benches and halls must be non-negative numbers.");
      return;
    }

    setError("");
    // Additional logic to generate seating can go here
  };

  return (
    <div className="SeatAllocation">
      <h3 className="Heading">SEAT ALLOCATION</h3>
      <div className="UserInputArea">
        <div className="Flex">
          <div className="Option">
            <div className="SubTopic">
              <p className="LabelArea">Department</p>
            </div>
            <div className="UserArea">
              <Autocomplete
                multiple
                options={departments}
                getOptionLabel={(option) => option}
                value={selectedDepartments}
                onChange={(_, newValue) => setSelectedDepartments(newValue)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Departments" variant="filled" />
                )}
              />
            </div>
          </div>
          <div className="Option">
            <div className="SubTopic">
              <p className="LabelArea">Bench Capacity</p>
            </div>
            <div className="UserArea">
              <TextField
                id="bench-capacity"
                type="number"
                variant="filled"
                value={benchCapacity}
                onChange={(e) => setBenchCapacity(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="Flex">
          <div className="Option">
            <div className="SubTopic">
              <p className="LabelArea">No. of Benches</p>
            </div>
            <div className="UserArea">
              <TextField
                id="num-benches"
                type="number"
                variant="filled"
                value={numBenches}
                onChange={(e) => setNumBenches(e.target.value)}
              />
            </div>
          </div>
          <div className="Option">
            <div className="SubTopic">
              <p className="LabelArea">No. of Halls</p>
            </div>
            <div className="UserArea">
              <TextField
                id="num-halls"
                type="number"
                variant="filled"
                value={numHalls}
                onChange={(e) => setNumHalls(e.target.value)}
              />
            </div>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="Action">
          <Button variant="contained" onClick={handleGenerate}>Generate Seating</Button>
        </div>
      </div>

      <div className="report-container">
        <Typography className="report-heading">
          Room {roomNumber} - Seating Arrangement
        </Typography>

        <div className={`seat-grid ${animationClass}`}>
          {sampleSeats.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.reduce<JSX.Element[]>((acc, _, i) => {
                if (i % 2 === 0 && row[i + 1]) {
                  acc.push(
                    <div className="seat-pair" key={`${rowIndex}-${i}`}>
                      <div className="seat-card">
                        <Typography className="seat-number">{row[i].seat}</Typography>
                        <Typography className="register-number">{row[i].regNo}</Typography>
                      </div>
                      <div className="seat-card">
                        <Typography className="seat-number">{row[i + 1].seat}</Typography>
                        <Typography className="register-number">{row[i + 1].regNo}</Typography>
                      </div>
                    </div>
                  );
                }
                return acc;
              }, [])}
            </div>
          ))}
        </div>

        <div className="pagination-container">
          <Pagination
            count={TOTAL_ROOMS}
            page={roomNumber}
            onChange={(_, value) => handleRoomChange(value)}
            color="primary"
            size="large"
          />
        </div>
      </div>
    </div>
  );
}

export default Page2;