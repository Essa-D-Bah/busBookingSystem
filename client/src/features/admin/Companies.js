import { Box, Button, Typography, Modal, Paper,  } from '@mui/material'
import React, { useState } from 'react'
import AddCompany from './components/AddCompany'
// import BusTable from './components/BusTable'
import CompanyTable from './components/CompanyTable';

export default function Companies() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
        <Typography variant="h4">Companies</Typography>
        <Button variant="contained" onClick={toggleModal}>Add Company</Button>
      </Box>

      {/* Modal for adding a company */}
      <Modal
        open={isModalOpen}
        onClose={toggleModal}
        aria-labelledby="add-company-modal"
        aria-describedby="modal-to-add-new-company"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius:'4px',
            p: 4,
            width: 700,
            maxWidth: '90%',
          }}
        >
          <AddCompany />
        </Box>
      </Modal>

      {/* Table to display buses */}
      <Paper>
        <CompanyTable/>
      </Paper>
    

    </Box>
  )
}
