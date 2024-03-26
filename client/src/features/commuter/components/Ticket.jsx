import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useUpdateTicketMutation } from "../../../services/mutations";
import { useSelector } from "react-redux";

export default function Ticket({ ticket }) {
  const [updateTicket, { isLoading }] = useUpdateTicketMutation();

  const handleCancel = async () => {
    try {
      const cancelData = await updateTicket({
        status: "cancel",
        id: ticket._id,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      width={"400px"}
      marginY={4}
      padding={2}
      border={"solid 1px grey"}
      borderRadius={2}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography>Bus number</Typography>
        <Typography>{ticket.busNumberPlate}</Typography>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography>Price</Typography>
        <Typography>{ticket.price}</Typography>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography>Trip</Typography>
        <Typography>{ticket.road}</Typography>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography>Status</Typography>
        <Typography>{ticket.status}</Typography>
      </Box>
      <Box marginTop={2}>
        <Button
          color="error"
          fullWidth
          variant="contained"
          disabled={ticket?.status === "booked" ? false : true}
          onClick={handleCancel}
        >
          Cancel Boooking
        </Button>
      </Box>
    </Box>
  );
}
