import { ReactNode } from 'react'
import styles from 'styles/components/Button.module.css'

type Props = {
  children: ReactNode,
	disabled?: boolean,
  onClick: () => void,
	type?: "button" | "submit" | "reset" | undefined
}

export default function IconButton({ children, disabled=false, onClick, type }: Props) {

	return (
		<button className={styles.icon_button} onClick={onClick} disabled={disabled} type={type ? type : 'button'}>
			{children}
		</button>
	)
}
