import Header from 'components/header'

import styles from 'styles/pages/SignUp.module.css'

export default function SignUp() {
  return (
    <div className={styles.container}>
      <Header/>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Sign up
        </h1>
      </main>
    </div>
  )
}