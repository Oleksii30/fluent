import { Path, UseFormRegister, FieldError, FieldPath, FieldValues} from "react-hook-form";
import type { FormValues } from "./listForm";
import { ILogin } from 'interfaces/login.interface';

import styles from 'styles/components/FormField.module.css';

type Props<T extends FieldValues> = {
	label: string,
	type: string,
	name: FieldPath<T>,
	register: UseFormRegister<T>,
	error?: FieldError,
}

export default function FormField<T extends FieldValues>({label, type, name, error, register}:Props<T>) {
	return (
		<div className={styles.field}>
			<label htmlFor={name} className={styles.label}>{label}</label>
			<input className={styles.input} type={type} {...register(name)}/>
			<span className={styles.error_message}>{error?.message}</span>
		</div>
	)
}
