import { Box } from '@mui/material'
import React from 'react'
import NavBar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Layout({children}) {
  const user = useSelector(state=>state.auth.user)
  if(user.role ==="client"){
 
    return(
      <Box>
        <Navigate to={'/tickets'}></Navigate>
        {children}
      </Box>
    )
  }
  return (
    <Box>
        <NavBar/>
        <Box sx={{p:3,pt:9}}>
        {children}
        </Box>

    </Box>
  )
}
