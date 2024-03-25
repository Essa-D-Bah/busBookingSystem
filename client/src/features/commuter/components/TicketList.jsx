import { Box } from '@mui/material'
import React from 'react'
import TicketPDF from './TicketPDF';

export default function TicketList({tickets}) {
   
  return (
    <Box display={'flex'} flexWrap={'wrap'} gap={4} sx={{py:2}}>
        {tickets.map(ticket=><TicketPDF ticket={ticket}/>)}
    </Box>
  )
}
