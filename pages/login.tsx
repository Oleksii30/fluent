import Header from 'components/header'
import FormField from 'components/formField'
import SubmitButton from 'components/buttons/submit'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { ILogin } from 'interfaces/login.interface'

import styles from 'styles/pages/Form.module.css'

const schema = yup.object({
  email: yup.string().email('Email should be well formated').required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

export default function LogIn() {
  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>({
    resolver: yupResolver(schema)
  })
  const onSubmit: SubmitHandler<ILogin> = data => console.log(data)

  return (
    <div className={styles.container}>
      <Header/>
      <main className={styles.main}>
        <h4>
          Log In form
        </h4>
        <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
          <FormField
              label='Email'
              type='text'
              register={register}
              name='email'
              error={errors.email}
            />
            <FormField
              label='Password'
              type='password'
              register={register}
              name='password'
              error={errors.password}
            />
          <SubmitButton label='Submit'/>
        </form>
      </main>
    </div>
  )
}