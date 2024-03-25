import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import React from 'react'
import { useGetCompaniesQuery } from '../../../services/queries'

export default function CompanyTable() {
  const {data, isLoading, error} = useGetCompaniesQuery();
   console.log("Company data: ", data);

  return (
    <Box>
         <TableContainer>
        <Table size='medium'>
            <TableHead> 
               <TableRow>
                <TableCell>
                    Name
                </TableCell>
                <TableCell>
                   Email
                </TableCell>
                <TableCell>
                   Address
                </TableCell>
                <TableCell>
                   Number of Buses
                </TableCell>
                <TableCell>
                   
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {
                    data?.allCompanies.map((item) => (
                     <TableRow>
                        <TableCell>{item.name}</TableCell>
                        <TableCell><a href={`mailto:${item.email}`}>{item.email}</a></TableCell>
                        <TableCell>{item.address}<br/>{item.telephone}</TableCell>
                        <TableCell>{item.numberOfBuses}</TableCell>
                        <TableCell>
                            <Button>
                                Edit
                            </Button>
                        </TableCell>
                     </TableRow>
                    ))
                }
            </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
