import Header from 'components/header'

import styles from 'styles/pages/LogIn.module.css'

export default function LogIn() {
  return (
    <div className={styles.container}>
      <Header/>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Log In
        </h1>
      </main>
    </div>
  )
}