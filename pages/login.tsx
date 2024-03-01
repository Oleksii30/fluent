import { useEffect } from 'react'
import Header from 'components/header'
import FormField from 'components/formField'
import MainButton from 'components/buttons/main'
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { ILogin } from 'interfaces/login.interface'
import { useAuthDispatch, useAuthState, login } from 'context/auth'
import { useRouter } from 'next/navigation'

import styles from 'styles/pages/Form.module.css'

const schema = yup.object({
  email: yup.string().email('Email should be well formatted').required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

export default function LogIn() {
  const authDispatch = useAuthDispatch()
  const { isLoggedIn } = useAuthState()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>({
    resolver: yupResolver(schema)
  })
  const onSubmit: SubmitHandler<ILogin> = data => {
    login(authDispatch, data)
  }

  useEffect(() => {
    if(isLoggedIn) {
      router.replace('/create')
    }
  }, [isLoggedIn, router])

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
            <div style={{marginTop: 20}}>
              <MainButton label='Submit'/>
            </div>
        </form>
      </main>
    </div>
  )
}
