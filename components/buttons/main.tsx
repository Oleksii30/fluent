import styles from 'styles/components/Button.module.css'

type Props = {
  label: string,
  disabled?: boolean,
  type?: 'submit' | 'button'
}

export default function MainButton({ label, disabled=false, type='submit' }:Props) {
	return (
		<button className={disabled ? styles.submit_button_disabled : styles.submit_button} type={type} disabled={disabled}>
			{label}
		</button>
	)
}
