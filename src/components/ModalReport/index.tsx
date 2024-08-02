import * as React from 'react';
import { Modal, Box, Typography} from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const ModalReport = ({ open, onClose }: Props) => {

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
        <Box display="flex" alignItems="center" mr={4}>
              <Box
                  sx={{
                      width: 24,
                      height: 24,
                      backgroundColor: '#039be5',
                      marginRight: 2,
                  }}
              />
              <Typography variant="body1">Clases completas</Typography>
          </Box>
          <Box display="flex" alignItems="center">
              <Box
                  sx={{
                      width: 24,
                      height: 24,
                      backgroundColor: '#f6bf26',
                      marginRight: 2,
                  }}
              />
              <Typography variant="body1">Clases sin profesor</Typography>
          </Box>
      </Box>
          <h1>Reporte</h1>
        </Box>
    </Modal>
  );
};
