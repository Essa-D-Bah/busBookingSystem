import React from 'react';
import { Box } from '@mui/material';
import BookTicket from './components/BookTicket';
import AllTickets from './components/AllTickets';
export default function CommuterTicketPage() {
  return (
    <Box
    sx={
      {
        display:"flex",
        justifyContent:'center',
      }
    }>
      <BookTicket/>
    </Box>
  );
}
