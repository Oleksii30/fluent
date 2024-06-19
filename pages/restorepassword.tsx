import { useRouter } from 'next/router';
import Header from 'components/header';
import FormField from 'components/formField';
import MainButton from 'components/buttons/main';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ILogin } from 'interfaces/login.interface';
import { useAuthDispatch, forgotPassword, useAuthState, confirmPassword } from 'context/auth';

import styles from 'styles/pages/Form.module.css';

const createSchema = (verificationCodeReceived: boolean) => {
  const schema = yup.object({
    email: yup.string().email('Email should be well formatted').required('Email is required'),
    password: verificationCodeReceived ? yup.string().required('Password is required') : yup.string(),
    code: verificationCodeReceived ? yup.string().required('Code is required') : yup.string(),
  }).required();

  return schema
}

export default function restorePassword() {
  const authDispatch = useAuthDispatch();
  const { verificationCodeReceived, isLoggedIn } = useAuthState();
  const router = useRouter();

  if(isLoggedIn){
    router.push('/');
  }

  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>({
    resolver: yupResolver(createSchema(verificationCodeReceived))
  })
  const onSubmit: SubmitHandler<ILogin> = data => {
    if(verificationCodeReceived){
      confirmPassword(authDispatch, data)
      return
    }
    forgotPassword(authDispatch, data.email);
  }

  return (
    <div className={styles.container}>
      <Header/>
      <main className={styles.main}>
        <h4>
          Restore your password
        </h4>
        <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label='Email'
            type='text'
            register={register}
            name='email'
            error={errors.email}
          />
          {verificationCodeReceived &&
            <>
              <FormField
                label='New Password'
                type='password'
                register={register}
                name='password'
                error={errors.password}
              />
              <FormField
                label='Code'
                type='text'
                register={register}
                name='code'
                error={errors.code}
              />
            </>
          }
          <div style={{marginTop: 20}}>
            <MainButton label={verificationCodeReceived ? 'Change Password' : 'Send code'}/>
          </div>
        </form>
      </main>
    </div>
  )
}
