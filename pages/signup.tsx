import { useEffect } from 'react'
import Header from 'components/header'
import FormField from 'components/formField'
import SubmitButton from 'components/buttons/submit'
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { ISignup } from 'interfaces/signup.interface'
import { useAuthDispatch, signUpUser, useAuthState } from 'context/auth'
import { useRouter } from 'next/navigation'

import styles from 'styles/pages/Form.module.css'

const schema = yup.object({
  email: yup.string().email('Email should be well formated').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword:
    yup.string()
    .required('Confirm password is required')
    .when("password", {
      is: (val:string) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Both passwords must match"),
    }),
}).required();

export default function SignUp() {
  const authDispatch = useAuthDispatch()
  const { isLoggedIn } = useAuthState()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<ISignup>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<ISignup> = data => {
    signUpUser(authDispatch, data)
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
          Sign up form
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
          <FormField
            label='Confirm password'
            type='password'
            register={register}
            name='confirmPassword'
            error={errors.confirmPassword}
          />
          <div style={{marginTop: 20}}>
            <SubmitButton label='Submit'/>
          </div>
        </form>
      </main>
    </div>
  )
}
