import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import Form from "../../../components/Form";
import { useAddTripMutation } from "../../../services/mutations";
import { useGetCompanyBusQuery } from "../../../services/queries";
import { useSelector } from "react-redux";

export default function AddTrip({ toggleModal }) {
  const [addTrip, { isLoading, error }] = useAddTripMutation();

  const user = useSelector((state) => state.auth.user);
  const { data } = useGetCompanyBusQuery(user.userId);
  const [tData, setData] = useState({ company: user.userId, bus: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const tripData = await addTrip(tData).unwrap();
      console.log("trip", tripData);
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Typography textAlign={"center"} variant="h5" color={"primary"}>
        Add a Trip
      </Typography>
      <Form>
        <Box width={"90%"} margin={"0 auto"} paddingTop={4}>
          <TextField
            name="departureDate"
            type="Date"
            placeholder="Date"
            onChange={handleChange}
            fullWidth
            sx={{ py: 1 }}
          />
          <TextField
            name="startCity"
            fullWidth
            placeholder="Start City"
            onChange={handleChange}
            sx={{ py: 1 }}
          />
          <TextField
            name="destination"
            fullWidth
            placeholder="Destination"
            onChange={handleChange}
            sx={{ py: 1 }}
          />
          <TextField
            name="price"
            fullWidth
            placeholder="Price"
            onChange={handleChange}
            sx={{ py: 1 }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Bus</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="bus"
              label="Bus"
              value={tData.bus || ""}
              onChange={handleChange}
            >
              {data?.buses?.map((bus) => (
                <MenuItem key={bus._id} value={bus._id}>
                  {bus.numberPlate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            sx={{ my: 2 }}
            onClick={handleSubmit}
          >
            Add Bus
          </Button>
        </Box>
      </Form>
    </Box>
  );
}
