import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useGetCompanyTripsQuery } from "../../../services/queries";
import { useSelector } from "react-redux";
export default function TripList() {
  const user = useSelector((state) => state.auth.user);
  const { isLoading, data, error } = useGetCompanyTripsQuery(user.userId);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="bus table">
        <TableHead>
          <TableRow>
            <TableCell>Bus</TableCell>
            <TableCell>Start City</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Seats Availability</TableCell>
          </TableRow>
        </TableHead>
        {isLoading ? (
          "Loading"
        ) : (
          <TableBody>
            {data?.allTrips?.map((trip) => (
              <TableRow key={trip._id}>
                <TableCell>{trip.busPlate}</TableCell>
                <TableCell>{trip.startCity}</TableCell>
                <TableCell>{trip.destination}</TableCell>
                <TableCell>{trip.price}</TableCell>
                <TableCell>{trip.departureDate.split("T")[0]}</TableCell>
                <TableCell>
                  {trip.availableSeats} out of {trip.busSeat}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
