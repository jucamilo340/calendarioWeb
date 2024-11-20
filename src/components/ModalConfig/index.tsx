import * as React from 'react';
import { Modal, Box, Typography} from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const ModalConfig = ({ open, onClose }: Props) => {

  return (
    <Modal
      open={open}
      onClose={onClose} // Utilizamos nuestra función que también reinicia el panel
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
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
                <Box display="flex" alignItems="center">
      </Box>
          <h1>Configuracion de la generacion</h1>
        </Box>
    </Modal>
  );
};