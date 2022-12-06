import styles from 'styles/components/Button.module.css'

type Props = {
    label: string
}

export default function SubmitButton({ label }:Props) {

    return (
        <button className={styles.submit_container} type='submit'>
            {label}
        </button>
    )
}
