import React from "react";
import { useGetTicketForClientQuery } from "../../../services/queries";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import Ticket from "./Ticket";
export default function AllTickets() {
  const user = useSelector((state) => state.auth.user);
  const { data, error, isLoading } = useGetTicketForClientQuery(user.userId);
  console.log("Data", data);
  return (
    <Box>
      <Typography
        paddingTop={10}
        textAlign={"center"}
        variant="h4"
        color="primary"
      >
        All Tickets
      </Typography>
      <Box
        padding={4}
        display={"flex"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
      >
        {isLoading
          ? "loading..."
          : data?.allTicket.map((ticket) => (
              <Box>
                <Ticket ticket={ticket} />
              </Box>
            ))}
      </Box>
    </Box>
  );
}
