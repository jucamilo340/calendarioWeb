import * as React from 'react';
import { useState } from 'react';
import { Modal, Box, MenuItem, InputLabel, FormControl, TextField, Select, Button, FormControlLabel, Checkbox} from '@mui/material';
import { createSubject } from '../../services/RoutesApi';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ClassIcon from '@mui/icons-material/Class';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from 'formik';
import FormCreate from './CrudEntity';
import CrudPanel from './CrudEntity';


type Props = {
    open: boolean;
    onClose: () => void;
  };
  
  export const Options = ({ open, onClose }: Props) => {

    const [panel, setpanel] = useState('');

    React.useEffect(() => {
      return () => {
        setpanel('');
      }
    }, []);
    
  
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {panel === '' ? 
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <h2 id="modal-title">Entidades</h2>
          <Box sx={{ display: 'flex', alignItems:'center', marginY: '10px' , cursor:'pointer'}} onClick={()=> setpanel('profesor')}><AssignmentIndIcon color="secondary" sx={{ fontSize: 40 }} /> <h4>Profesor</h4></Box>
          <Box sx={{ display: 'flex', alignItems:'center', marginY: '10px', cursor:'pointer'}} onClick={()=> setpanel('materia')}> <ClassIcon color="success" sx={{ fontSize: 40 }} /> <h4>Asignatura</h4></Box>
          <Box sx={{ display: 'flex', alignItems:'center', marginY: '10px', cursor:'pointer'}} onClick={()=> setpanel('salon')}><AccountBalanceIcon sx={{ fontSize: 40 }} /> <h4>Salon</h4> </Box>
        </Box>
         :
         <CrudPanel entidad ={panel} />
        }
      </Modal>
    );
  };