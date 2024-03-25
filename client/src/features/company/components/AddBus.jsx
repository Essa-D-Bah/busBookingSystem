import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Form from "../../../components/Form";
import { useAddBusMutation } from "../../../services/mutations";
import { useSelector } from "react-redux";

export default function AddBus({toggleModal}) {
    const [addBus, {isLoading, error}] = useAddBusMutation()
    
    const user = useSelector((state)=>state.auth.user)
    const [data, setData] = useState({companyId:user.userId})
    const handleChange= (e)=>{
       const {name, value} = e.target;
      setData(prev=>({
        ...prev,
        [name]:value
      }))
    }
    const handleSubmit= async()=>{
        try {
            const busData = await addBus(data).unwrap()
            toggleModal()
        } catch (error) {
            console.log(error);
        }
       
    }
  return (
    <Box>
      <Typography textAlign={"center"} variant="h5" color={"primary"}>
        Add a Bus
      </Typography>
      <Form>
        <Box width={"90%"} margin={"0 auto"} paddingTop={4}>
          <TextField name="numberPlate" fullWidth placeholder="Number Plate" onChange={handleChange} sx={{py:1}}/>
          <TextField name="driver" fullWidth placeholder="Driver" onChange={handleChange} sx={{py:1}}/>
          <TextField name="numberOfSeats" fullWidth placeholder="Number of seats" onChange={handleChange} sx={{py:1}}/>
          <Button fullWidth variant="contained" sx={{my:2}} onClick={handleSubmit}>Add Bus</Button>
        </Box>
      </Form>
    </Box>
  );
}
