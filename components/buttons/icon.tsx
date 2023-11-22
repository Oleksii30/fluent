import { ReactNode } from 'react'
import styles from 'styles/components/Button.module.css'

type Props = {
  children: ReactNode,
	disabled?: boolean,
  onClick: () => void
}

export default function IconButton({ children, disabled=false, onClick }: Props) {

	return (
		<button className={styles.icon_button} onClick={onClick} disabled={disabled} type='button'>
			{children}
		</button>
	)
}
