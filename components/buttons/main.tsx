import styles from 'styles/components/Button.module.css';

type Props = {
  label: string,
  disabled?: boolean,
  type?: 'submit' | 'button',
  onClick?: () => void
}

export default function MainButton({ label, disabled=false, type='submit', onClick }:Props) {
	return (
		<button
			onClick={type==='submit' ? ()=>{} : onClick}
			className={disabled ? styles.submit_button_disabled : styles.submit_button}
			type={type} disabled={disabled}
		>
			{label}
		</button>
	)
}
