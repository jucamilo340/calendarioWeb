
import FormProfesor from './profesor';
import FormMateria from './Materia';
import FormSalon from './Salon';
const CrudPanel = (props :any) => {
    return (
           props.entidad === 'profesor' ?
           <FormProfesor/>
           :
           props.entidad === 'materia' ?
           <FormMateria/>
           :
           props.entidad === 'salon' ?
           <FormSalon/>
           :
           <></>
    )
}

export default CrudPanel;
