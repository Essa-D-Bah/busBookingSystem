import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Form from "../../../components/Form";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import {
  useBookBusMutation,
  useBookTicketMutation,
} from "../../../services/mutations";
import { useSelector } from "react-redux";
import TicketPDF from "./TicketPDF";
import { useDispatch } from "react-redux";
import { logOut } from "../../../services/auth/authSlice";
import { Link } from "react-router-dom";
import AllTickets from "./AllTickets";

export default function BookTicket() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    startCity: "",
    destination: "",
  });
  const [bookBus, { isLoading }] = useBookBusMutation();
  const [bookTicket, { isLoading: loading }] = useBookTicketMutation();
  const [buses, setBuses] = useState([]);
  const [message, setMessage] = useState("");
  const [ticket, setTicket] = useState();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [openAllTickets, setTicketsAll] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const buses = await bookBus(bookingData).unwrap();
      if (buses) {
        setBuses(buses);
        setCurrentStep(2); // Move to the next step
      } else {
        setMessage("No Buses To this Destination");
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const handleShowAllTickets = () => {
    setTicketsAll((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleBook = async (busData) => {
    const { userId } = user;
    const dataT = {
      ...busData,
      userId,
    };
    try {
      const data = await bookTicket(dataT).unwrap();

      if (data) {
        setTicket(data);
        setCurrentStep(3); // Move to the next step
      }
    } catch (error) {
      console.log("Ticket Error", error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form>
            <TextField
              placeholder="Start City"
              name="startCity"
              fullWidth
              sx={{ py: 1 }}
              onChange={(v) =>
                setBookingData((prev) => ({
                  ...prev,
                  startCity: v.target.value,
                }))
              }
            />
            <TextField
              placeholder="Destination"
              name="destination"
              fullWidth
              sx={{ py: 1 }}
              onChange={(v) =>
                setBookingData((prev) => ({
                  ...prev,
                  destination: v.target.value,
                }))
              }
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Get Buses
            </Button>
          </Form>
        );
      case 2:
        return (
          <Box>
            {message && <Typography>{message}</Typography>}
            <Box sx={{ mt: 3 }}>
              {isLoading ? (
                <Typography textAlign={"center"}>Loading....</Typography>
              ) : (
                buses &&
                buses.map((b) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid",
                      py: 0.5,
                      px: 1,
                      borderRadius: 2,
                      my: 2,
                    }}
                  >
                    <Typography color={"primary"} sx={{ fontWeight: "550" }}>
                      {b.startCity +
                        "--" +
                        b.destination +
                        "  ----/ D" +
                        b.price}
                    </Typography>
                    <Button
                      onClick={() => {
                        const { _id, price, startCity, destination, bus } = b;
                        handleBook({
                          tripId: _id,
                          price,
                          startCity,
                          destination,
                          busId: bus,
                        });
                      }}
                    >
                      Book
                    </Button>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography
              textAlign={"center"}
              sx={{ mb: 4 }}
              color={"primary"}
              variant="h5"
            >
              Your ticket has been booked.
            </Typography>
            <TicketPDF ticket={ticket.ticket} user={ticket.userName} />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box width={"100%"}>
      {openAllTickets ? (
        <Box width={'100%'} margin={'0 auto'}>
           <Paper width="70%">
           <Box
            display={"flex"}
            justifyContent={"space-around"}
            alignItems={"center"}
            paddingY={2}
            width={'100%'}
            margin={'0 auto'}
            paddingTop={2}
            position={'fixed'}
            bgcolor={'grey'}
            zIndex={'100'}
          >
            <Button onClick={handleLogout} variant="contained">Logout</Button>
            <Button onClick={()=>window.location.reload()} variant="contained">{!openAllTickets?"Tickets":"Book Ticket"}</Button>
          </Box>
          <AllTickets />
          
        </Paper>
        </Box>
        
      ) : (
        <Paper
          sx={{
            width: "40%",
            height: "100vh",
            margin:'0 auto',
            px: 4,
          }}
        >
          {renderStepContent()}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            marginTop={4}
          >
            <Button onClick={handleLogout}>Logout</Button>
            <Button onClick={handleShowAllTickets}>Tickets</Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
