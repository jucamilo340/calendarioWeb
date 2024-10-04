
import FormProfesor from './profesor';
import FormMateria from './Materia';
import FormSalon from './Salon';
import FormGrupo from './Grupo';
import FormPlan from './Plan';
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
           props.entidad === 'grupo' ?
           <FormGrupo/>
           :
           props.entidad === 'plan' ?
           <FormPlan/>
           :
           <></>
    )
}

export default CrudPanel;
