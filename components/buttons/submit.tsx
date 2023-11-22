import styles from 'styles/components/Button.module.css'

type Props = {
  label: string,
	disabled?: boolean
}

export default function SubmitButton({ label, disabled=false }:Props) {
	return (
		<button className={disabled ? styles.submit_button_disabled : styles.submit_button} type='submit' disabled={disabled}>
			{label}
		</button>
	)
}
