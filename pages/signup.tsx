import Header from 'components/header'
import FormField from 'components/formField'
import SubmitButton from 'components/buttons/submit'
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { ISignup } from 'interfaces/signup.interface'

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
  const { register, handleSubmit, formState: { errors } } = useForm<ISignup>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<ISignup> = data => console.log(data)

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
            errors={errors}
          />
          <FormField
            label='Password'
            type='password'
            register={register}
            name='password'
            errors={errors}
          />
          <FormField
            label='Confirm password'
            type='password'
            register={register}
            name='confirmPassword'
            errors={errors}
          />
          <SubmitButton label='Submit'/>
        </form>
      </main>
    </div>
  )
}
