
import FormProfesor from './profesor/Form';
import FormMateria from './Materia/Form';
const CrudPanel = (props :any) => {
    return (
           props.entidad === 'profesor' ?
           <FormProfesor/>
           :
           props.entidad === 'materia' ?
           <FormMateria/>
           :
           <></>
    )
}

export default CrudPanel;
