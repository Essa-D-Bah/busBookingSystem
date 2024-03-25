import React from 'react'
import CommuterTicketPage from '../features/commuter/CommuterTicketPage'
import { Box, Paper, Typography } from '@mui/material'
import {useSelector} from "react-redux" 
import CompanyTickets from '../features/company/CompanyTickets'

export default function Tickets() {
  const user = useSelector(state=>state.auth.user)
  if(user.role==='company'){
    return(
      
         <CompanyTickets/>
    )
  }

  return (
    <Box>
        <CommuterTicketPage/>
    </Box>
  )
}
