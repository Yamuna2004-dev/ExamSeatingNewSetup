import React, { useState } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  TextField, Button, Box, Typography, Stack, IconButton, Alert 
} from "@mui/material";
import { Download, Delete } from "@mui/icons-material";
import "./RoomManagement.css";

const defaultRooms = Array.from({ length: 15 }, (_, index) => ({
  roomNumber: index + 1,
  floorNumber: index < 5 ? "Ground Floor" : index < 10 ? "First Floor" : "Second Floor",
  seats: 30,
}));

function RoomManagement() {
  const [rooms, setRooms] = useState(defaultRooms);
  const [roomData, setRoomData] = useState({ roomNumber: "", floorNumber: "", seats: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleAddRoom = () => {
    const roomExists = rooms.some((room) => room.roomNumber === parseInt(roomData.roomNumber));

    if (!roomData.roomNumber || !roomData.floorNumber || !roomData.seats) {
      setError("All fields are required.");
      return;
    }

    if (roomExists) {
      setError(`Room ${roomData.roomNumber} on ${roomData.floorNumber} already exists.`);
      return;
    }

    const newRooms = [...rooms, { 
      ...roomData, 
      roomNumber: parseInt(roomData.roomNumber), 
      seats: parseInt(roomData.seats) 
    }];
    newRooms.sort((a, b) => a.roomNumber - b.roomNumber);
    
    setRooms(newRooms);
    setRoomData({ roomNumber: "", floorNumber: "", seats: "" });
    setError("");
  };

  const handleDeleteRoom = (roomNumber: number) => {
    const updatedRooms = rooms.filter((room) => room.roomNumber !== roomNumber);
    setRooms(updatedRooms);
  };

  const handleDownload = () => {
    const csvContent = "Room Number,Floor Number,Seats\n" + 
      rooms.map((r) => `${r.roomNumber},${r.floorNumber},${r.seats}`).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "available_rooms.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="room-management">
      <Typography variant="h4" className="college-title">
        Perunthalaivar Kamarajar Arts College
      </Typography>
      <Typography variant="h6" className="section-title">
        Room Management - Available Rooms
      </Typography>

      <Box className="action-buttons">
        <Button variant="contained" color="primary" onClick={handleDownload} startIcon={<Download />}>
          Download List
        </Button>
      </Box>

      {error && <Alert severity="error" className="error-message">{error}</Alert>}

      <TableContainer component={Paper} className="room-table-container">
        <Table stickyHeader>
          <TableHead>
            <TableRow className="table-header">
              <TableCell><b>Room Number</b></TableCell>
              <TableCell><b>Floor Number</b></TableCell>
              <TableCell><b>Seats</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room, index) => (
              <TableRow key={index} className="table-row">
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>{room.floorNumber}</TableCell>
                <TableCell>{room.seats}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteRoom(room.roomNumber)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" className="section-title">
        Add New Room
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center" className="add-room-form">
        <TextField 
          label="Room Number" 
          name="roomNumber" 
          value={roomData.roomNumber} 
          onChange={handleChange} 
          variant="outlined" 
          className="input-field" 
        />
        <TextField 
          label="Floor Number" 
          name="floorNumber" 
          value={roomData.floorNumber} 
          onChange={handleChange} 
          variant="outlined" 
          className="input-field" 
        />
        <TextField 
          label="Seats" 
          name="seats" 
          value={roomData.seats} 
          onChange={handleChange} 
          variant="outlined" 
          className="input-field" 
        />
        <Button 
          variant="contained" 
          color="success" 
          onClick={handleAddRoom} 
          className="add-room-button"
        >
          Add Room
        </Button>
      </Stack>
    </div>
  );
}

export default RoomManagement;
