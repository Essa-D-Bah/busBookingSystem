import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,} from '@mui/material';
import { useGetCompanyBusQuery } from '../../../services/queries'
import { useSelector } from 'react-redux'
export default function BusList(){
  const user = useSelector(state=>state.auth.user)
  const {isLoading, data, error}=useGetCompanyBusQuery(user.userId)
  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="bus table">
        <TableHead>
          <TableRow>
            <TableCell>Number Plate</TableCell>
            <TableCell>Number of Seats</TableCell>
            <TableCell>Diver</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.buses?.map((bus) => (
            <TableRow key={bus._id}>
              <TableCell>{bus.numberPlate}</TableCell>
              <TableCell>{bus.numberOfSeats}</TableCell>
              <TableCell>{bus.driver}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
