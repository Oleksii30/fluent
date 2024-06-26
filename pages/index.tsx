import Link from 'next/link';
import Head from 'next/head';
import Header from 'components/header';
import { useAuthState } from 'context/auth';
import { Routes } from 'enums/routes';

import styles from 'styles/pages/Home.module.css';

export default function Home() {
  const { isLoggedIn, user } = useAuthState();

  return (
    <div className={styles.container}>
      <Head>
        <title>Fluently</title>
        <meta name="description" content="Create, learn, grow with fluently" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Fluently
        </h1>
        {isLoggedIn &&
          <Link href={`${Routes.LISTS}?userId=${user.username}`}>Go to lists</Link>
        }
      </main>
    </div>
  )
}
