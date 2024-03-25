import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const TicketPDF = ({ ticket, user }) => {
  return (
    <Paper
    sx={{
      p: 2,
      borderRadius: 2,
      boxShadow: 2,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    }}
  >
    <Box display={"flex"} justifyContent={"space-between"} my={2}>
      <Typography>Bus ID:</Typography>{" "}
      <Typography fontWeight={"550"}> {ticket.busNumberPlate}</Typography>
    </Box>
    <Box display={"flex"} justifyContent={"space-between"} my={2}>
      <Typography>Client Name:</Typography>{" "}
      <Typography fontWeight={"550"}> {user}</Typography>
    </Box>
    <Box display={"flex"} justifyContent={"space-between"} my={2}>
      <Typography>Price:</Typography>{" "}
      <Typography fontWeight={"550"}> {ticket.price}</Typography>
    </Box>
    <Box display={"flex"} justifyContent={"space-between"} my={2}>
      <Typography>Ticket Status:</Typography>
      <Typography fontWeight={"550"}> {ticket.status}</Typography>
    </Box>
  </Paper>
  );
};

export default TicketPDF;
