import React, {useState, useEffect} from 'react'
export default function useForm (callback, validate) {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    useEffect(() => {
        if(Object.keys(errors).length === 0 && isSubmitting) {
            callback()
        }
    }, [errors])
    function handleSubmit (event) {
        if(event) {
            event.preventDefault();
        }
        setErrors(validate(values))
        setIsSubmitting(true)
    }
    function handleChange(event) {
        setValues(values => {
            return {
                ...values, [event.target.name]:(event.target.type == "checkbox") ? event.target.checked : event.target.value
            }
        })
    }
    return {values, errors, handleSubmit, handleChange}

}