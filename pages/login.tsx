import Header from 'components/header'
import FormField from 'components/formField'
import SubmitButton from 'components/buttons/submit'

import styles from 'styles/pages/Form.module.css'

export default function LogIn() {
  return (
    <div className={styles.container}>
      <Header/>
      <main className={styles.main}>
        <h4>
          Log In form
        </h4>
        <div className={styles.form_container}>
          <FormField label='Email' type='text'/>
          <FormField label='Password' type='password'/>
          <SubmitButton label='Submit'/>
        </div>
      </main>
    </div>
  )
}