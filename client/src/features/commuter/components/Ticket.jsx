import { Box, Button, Typography } from '@mui/material'
import React from 'react'

export default function Ticket({ticket}) {
  return (
    <Box width={'400px'} marginY={4} padding={2} border={'solid 1px grey'} borderRadius={2}>
       <Box display={'flex'} justifyContent={'space-between'}>
         <Typography>Bus number</Typography>
         <Typography>{ticket.busNumberPlate}</Typography>
       </Box>
       <Box display={'flex'} justifyContent={'space-between'}>
         <Typography>Price</Typography>
         <Typography>{ticket.price}</Typography>
       </Box>
       <Box display={'flex'} justifyContent={'space-between'}>
         <Typography>Trip</Typography>
         <Typography>Bnajul - Serr</Typography>
       </Box>
       <Box display={'flex'} justifyContent={'space-between'}>
         <Typography>Status</Typography>
         <Typography>{ticket.status}</Typography>
       </Box>
       <Box marginTop={2}>
        <Button color='error' fullWidth variant='contained' disabled={ticket?.status==="booked"?false:true}>
            Cancel Boooking
        </Button>
       </Box>
    </Box>
  )
}
