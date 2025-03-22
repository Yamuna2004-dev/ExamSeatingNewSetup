
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import "./SeatAllocation.css";

function Page2() {
  // Define department options
  const departments = ["BBA", "BCA", "BCom", "B.Sc", "BA"];

  return (
    <div className="SeatAllocation">
      <h3 className="Heading">SEAT ALLOCATION</h3>
      <div className="UserInputArea">
        <div className="Flex">
          <div className="Option">
            <div className="SubTopic"><p className="LabelArea">Department</p></div>
            <div className="UserArea">
              <Autocomplete
                disablePortal
           
                options={departments}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select Department" variant="filled" />}
              />
            </div>
          </div>
          <div className="Option">
            <div className="SubTopic"><p className="LabelArea">Bench Capacity</p></div>
            <div className="UserArea">
              <TextField id="filled-basic" type="number" variant="filled" />
            </div>
          </div>
        </div>
        <div className="Flex">
          <div className="Option">
            <div className="SubTopic"><p className="LabelArea">No. of Benches</p></div>
            <div className="UserArea">
              <TextField id="filled-basic" type="number" variant="filled" />
            </div>
          </div>
          <div className="Option">
            <div className="SubTopic"><p className="LabelArea">No. of Halls</p></div>
            <div className="UserArea">
              <TextField id="filled-basic" type="number" variant="filled" />
            </div>
          </div>
        </div>
        <div className="Action"><Button variant="contained">Contained</Button></div>
      </div>
    </div>
  );
}

export default Page2; 