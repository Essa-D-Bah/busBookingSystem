import { Box, Button, Typography, Modal } from '@mui/material'
import React, {useState} from 'react'
import BusList from './components/BusList';
import AddBus from './components/AddBus'

export default function BusesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'} padding={2}>

         <Typography variant='h5' color={'primary'}>Buses</Typography>
         <Button variant='contained' onClick={toggleModal}>Add Bus</Button>
      </Box>
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
          <AddBus toggleModal={toggleModal}/>
        </Box>
      </Modal>
      <BusList/>
    </Box>
  )
}
