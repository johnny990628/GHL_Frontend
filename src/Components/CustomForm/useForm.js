import useDepartmentForm from './useDepartmentForm'
import useEventForm from './useEventForm'
import usePatientForm from './usePatientForm'

const useForm = type => {
    const patientForm = usePatientForm()
    const departmeForm = useDepartmentForm()
    const eventForm = useEventForm()

    if (type === 'patient') return patientForm
    if (type === 'department') return departmeForm
    if (type === 'event') return eventForm
}

export default useForm
