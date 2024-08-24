import styles from 'styles/components/Button.module.css';

type Props = {
  label: string,
  disabled?: boolean,
  type?: 'submit' | 'button',
  onClick?: () => void,
	styles?: any
}

const submitButton = {
	position : 'relative',
	border: '2px solid black',
	color: 'black',
	borderRadius: 20,
	width: 'fit-content',
	padding: '10px 25px',
	fontWeight: 700,
	cursor: 'pointer',
	background: '#ff5252',
	fontSize: 14,
}

const submitButtonDisabled = {
	background: 'lightgrey',
	cursor: 'unset'
}

export default function MainButton({ label, disabled=false, type='submit', onClick, styles={} }:Props) {
	const disabledStyles = disabled ? submitButtonDisabled : {};
	return (
		<button
			onClick={type==='submit' ? ()=>{} : onClick}
			style={{...submitButton, ...styles, ...disabledStyles}}
			type={type}
			disabled={disabled}
		>
			{label}
		</button>
	)
}
