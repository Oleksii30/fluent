import { Path, UseFormRegister, FieldError, FieldPath} from "react-hook-form";
import type { FormValues } from "./listForm";

import styles from 'styles/components/FormField.module.css';

type Props = {
	label: string,
	type: string,
	name: FieldPath<FormValues>,
	register: UseFormRegister<FormValues>,
	error?: FieldError,
}

export default function FormField({label, type, name, error, register}:Props) {
	return (
		<div className={styles.field}>
			<label htmlFor={name} className={styles.label}>{label}</label>
			<input className={styles.input} type={type} {...register(name)}/>
			<span className={styles.error_message}>{error?.message}</span>
		</div>
	)
}
