import { Box, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import Form from "../../../components/Form";
import { useRegisterMutation } from "../../../services/auth/authApiSlice";

export default function AddCompany() {
  const [companyData, setCompanyData] = useState({role:'company'});
  const [register,{isLoading}] = useRegisterMutation();
  const [passwordCheck, setPasswordCheck]=useState('');

  const handleChangeData = (e) => {
    const { value, name } = e.target;
    setCompanyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if(companyData.password !==companyData.confirmPassword){
        setPasswordCheck("Password did not match enter the same password")
        return
    }
    try {
        const userData = await register(companyData).unwrap();
        const { name } = companyData;
        const { message } = userData;
      } catch (error) {
        console.log("Error");
      }
  };
  return (
    <Box>
      <Box
        sx={{
        
          bgcolor: "white",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h4"
          color={"primary"}
          paddingTop={1}
        >Add Company </Typography>
        <Form>
          <Box sx={{ pt: 4 }} width={"80%"} margin={"0 auto"}>
            <TextField
              placeholder="Email Address"
              type="email"
              name="email"
              fullWidth
              onChange={handleChangeData}
              sx={{ py: 1 }}
            />
            <TextField
              placeholder="Password"
              type="password"
              name="password"
              fullWidth
              onChange={handleChangeData}
              sx={{ py: 1 }}
            />
            <Box>
              <TextField
                placeholder=" Confirm Password"
                type="password"
                name="confirmPassword"
                onChange={handleChangeData}
                fullWidth
                sx={{ py: 1 }}
              />
              <Typography color={'error'}>{passwordCheck}</Typography>
              <TextField
                placeholder="Name"
                name="name"
                fullWidth
                onChange={handleChangeData}
                sx={{ py: 1 }}
              />
              <TextField
                placeholder="Telephone"
                type="Number"
                name="telephone"
                fullWidth
                onChange={handleChangeData}
                sx={{ py: 1 }}
              />
              <TextField
                placeholder="Address"
                name="address"
                onChange={handleChangeData}
                fullWidth
                sx={{ py: 1 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 3,
              }}
            >
              <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
                {isLoading?"Registering":'Register'}
              </Button>
            </Box>
          </Box>
        </Form>
      </Box>
    </Box>
  );
}
