import * as React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CrudPanel from './CrudEntity';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const Options = ({ open, onClose }: Props) => {
  const [panel, setPanel] = useState('');

  useEffect(() => {
    // Se ejecutará cuando el componente se monte
    return () => {
      // Se ejecutará cuando el componente se desmonte
      setPanel('');
    };
  }, []);

  const handleClose = () => {
    setPanel('');
    onClose(); // Cerramos el modal
  };

  return (
    <Modal
      open={open}
      onClose={handleClose} // Utilizamos nuestra función que también reinicia el panel
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {panel === '' ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Selecciona una Entidad
          </Typography>
          <IconButton
            sx={{ display: 'flex', alignItems: 'center', my: 2 }}
            onClick={() => setPanel('profesor')}
          >
            <AssignmentIndIcon sx={{ fontSize: 48 }} color="secondary" />
            <Typography variant="h6" sx={{ ml: 2 }}>
              Profesor
            </Typography>
          </IconButton>
          <IconButton
            sx={{ display: 'flex', alignItems: 'center', my: 2 }}
            onClick={() => setPanel('materia')}
          >
            <SchoolIcon sx={{ fontSize: 48, color: 'success.main' }} />
            <Typography variant="h6" sx={{ ml: 2 }}>
              Asignatura
            </Typography>
          </IconButton>
          <IconButton
            sx={{ display: 'flex', alignItems: 'center', my: 2 }}
            onClick={() => setPanel('salon')}
          >
            <AccountBalanceIcon sx={{ fontSize: 48 }} />
            <Typography variant="h6" sx={{ ml: 2 }}>
              Salon
            </Typography>
          </IconButton>
        </Box>
      ) : (
        <CrudPanel entidad={panel} />
      )}
    </Modal>
  );
};
