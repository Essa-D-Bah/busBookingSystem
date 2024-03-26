import { Box, Button, Typography, Modal } from "@mui/material";
import React, { useState } from "react";
import AddTrip from "./components/AddTrip";
import TripList from "./components/TripList";

export default function TripPage() {
  const [isTrip, setisTrip] = useState(false);

  const toggleTrip = () => {
    setisTrip(!isTrip);
  };
  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} padding={2}>
        <Typography variant="h5" color={"primary"}>
          Trips
        </Typography>
        <Box gap={2} display={"flex"}>
          <Button variant="contained" onClick={toggleTrip}>
            Add Trip
          </Button>
        </Box>
      </Box>
      <Modal
        open={isTrip}
        onClose={toggleTrip}
        aria-labelledby="add-company-modal"
        aria-describedby="modal-to-add-new-company"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "4px",
            p: 4,
            width: 700,
            maxWidth: "90%",
          }}
        >
          <AddTrip toggleModal={toggleTrip} />
        </Box>
      </Modal>
      <TripList />
    </Box>
  );
}
