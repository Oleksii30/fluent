// import { Path, UseFormRegister, FieldErrorsImpl} from "react-hook-form"

// import { ISignup } from "interfaces/signup"
// import { ILogin } from "interfaces/login"

import styles from 'styles/components/FormField.module.css'

type Props = {
    label: string,
    type: string,
    name: any,
    register: any,
    errors: any
}

export default function FormField({label, type, name, errors, register}:Props) {
    return (
        <div className={styles.field}>
            <label htmlFor={name} className={styles.label}>{label}</label>
            <input className={styles.input} type={type} {...register(name)}/>
            <span className={styles.error_message}>{errors[name]?.message}</span>
        </div>
    )
}
