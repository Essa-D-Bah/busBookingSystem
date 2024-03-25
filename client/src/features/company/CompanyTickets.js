import React from "react";
import {
  Box,
  Paper,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableHead,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useGetCompanyTicketsQuery } from "../../services/queries";

export default function CompanyTickets() {
  const user = useSelector((state) => state.auth.user);
  const { data, error, isLoading } = useGetCompanyTicketsQuery(user.userId);
  return (
    <Paper sx={{ px: 2 }}>
      <Box>
        <Typography
          variant="h5"
          color={"primary"}
          fontWeight={550}
          paddingY={2}
        >
          Tickets
        </Typography>
      </Box>
    
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bus ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.busNumberPlate}</TableCell>
                <TableCell>{ticket.userName}</TableCell>
                <TableCell>{ticket.price}</TableCell>
                <TableCell>{ticket.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
