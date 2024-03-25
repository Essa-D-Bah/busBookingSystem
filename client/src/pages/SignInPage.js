import React, { useState } from "react";
import { Box, Button, TextField, Typography, Checkbox } from "@mui/material";
import Form from "../components/Form";
import { useDispatch } from "react-redux";
import { useLoginMutation, useRegisterMutation } from "../services/auth/authApiSlice";
import { setCredentials } from "../services/auth/authSlice";
import { json, useNavigate } from "react-router-dom";
export default function SignInPage() {
  const [isRegiter, setIsRegister] = useState(false);
  const [registerData, setRegisterData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [successMessage, setSuccessMessage] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const  [register] = useRegisterMutation();
  const [login, ] = useLoginMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegiter) {
        try {
            const userData = await register(registerData).unwrap();
            const { name } = registerData;
            const { message } = userData;
            setSuccessMessage(name + " " + message);
            setRegisterData({});
        } catch (error) {
            console.log("Error registering:", error);
        }
    } else {
        try {
            const userData = await login(loginData).unwrap();
            const user = userData.user;
            const { token} = userData;
            console.log(user);

            if (token) {
                localStorage.setItem("token", token);
                const localUser = JSON.stringify(user);
                localStorage.setItem('user', localUser)
                dispatch(setCredentials({ token, user }));
            }
            setLoginData({});
            navigate("/");
        } catch (error) {
            console.log("Error logging in:", error);
        }
    }
};

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    if (isRegiter) {
      setRegisterData((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setLoginData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFormType = () => {
    setIsRegister((prevState) => !prevState);
  };
  return (
    <Box
      sx={{
        w: "100%",
        height: `100vh`,
        bgcolor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "40%",
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
        >
          {isRegiter ? "Register" : "Sign In"}
        </Typography>
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
            {isRegiter && (
              <Box>
                <TextField
              placeholder=" Confirm Password"
              type="password"
              name="confirmPassword"
              onChange={handleChangeData}
              fullWidth
              sx={{ py: 1 }}
            />
                <TextField placeholder="Name" name="name" fullWidth onChange={handleChangeData} sx={{ py: 1 }} />
                <TextField placeholder="Telephone" type="Number" name="telephone" fullWidth onChange={handleChangeData} sx={{ py: 1 }} />
                <TextField placeholder="Address" name="address" onChange={handleChangeData} fullWidth sx={{ py: 1 }} />
                <Box display={"flex"} alignItems={"center"}>
                  <Checkbox
                    value={"company"}
                    name="role"
                    onChange={handleChangeData}
                  />
                  <Typography color={"primary"} style={{ display: "inline" }}>
                    Select If you are opening for a company
                  </Typography>
                </Box>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 3,
              }}
            >
              <Button variant="contained" onClick={handleSubmit}>
                {isRegiter ? "Register" : "Sign In"}
              </Button>
            </Box>
            <Typography variant="p" color={'success'}>{successMessage}</Typography>
            <Typography
              color={"primary"}
              sx={{ cursor: "pointer" }}
              textAlign={"center"}
              marginTop={4}
              onClick={handleFormType}
            >
              {isRegiter
                ? "Already have an account login here"
                : "Don't have an account register here"}
            </Typography>
          </Box>
        </Form>
      </Box>
    </Box>
  );
}
