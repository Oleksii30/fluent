import styles from 'styles/components/Button.module.css'

type Props = {
    label: string
}

export default function SubmitButton({ label }:Props) {

    return (
        <div className={styles.submit_container}>
            {label}
        </div>
    )
}
