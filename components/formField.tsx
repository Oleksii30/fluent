import styles from 'styles/components/FormField.module.css'

type Props = {
    label: string,
    type: string
}

export default function FormField({label, type}:Props) {

    return (
        <>
            <label htmlFor={label} className={styles.label}>{label}</label>
            <input id={label} className={styles.field} type={type}/>
        </>
    )
}
