import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/header';
import { useAuthState } from 'context/auth';
import { Routes } from 'enums/routes';
import MainButton from 'components/buttons/main';

import styles from 'styles/pages/Home.module.css';

export default function Home() {
  const { isLoggedIn, user } = useAuthState();
  const router = useRouter()

  const handleCickAction = () => {
    const route = isLoggedIn ? Routes.SIGNUP : Routes.CREATE;
    router.replace(route);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Fluently</title>
        <meta name="description" content="Create, learn, grow with fluently" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className={styles.main}>
        <div style={{display: 'flex'}}>
          <Image
            style={{borderTopLeftRadius: 50, borderBottomRightRadius: 50}}
            src='/images/f_1.png' alt='f_1'
            width={502}
            height={381}
          />
          <div className={styles.section}>
            <div style={{width:'60%', textAlign:'center'}}>
              <span className={styles.big_text}>
                Fluently is your helper in
                learning languages
              </span>
              <div style={{marginTop: 20}}>
                <MainButton label={isLoggedIn ? 'Create List' : 'Sign Up'} type='button' onClick={handleCickAction}/>
              </div>
            </div>
          </div>
        </div>
        <div style={{padding: 70}}>
          <span className={styles.semi_big_text}>
            It works by creating lists of words
          </span>
        </div>
        <div className={styles.section}>
          <div style={{width:'40%', textAlign:'center'}}>
            <span className={styles.semi_big_text}>
              Watching a video or a film
              and found  something that will
              enrich your language
            </span>
            <div style={{marginTop:40}}>
              <span className={styles.big_text_red}>
                Add it to your List
              </span>
            </div>
          </div>
          <Image
            style={{borderRadius: 50}}
            src='/images/f_2.png' alt='f_2'
            width={503}
            height={250}
          />
        </div>
        <div className={styles.section}>
          <Image
            style={{borderTopRightRadius: 50, borderBottomLeftRadius: 50}}
            src='/images/f_3.png' alt='f_3'
            width={489}
            height={331}
          />
          <div style={{width:'45%', textAlign:'center', paddingTop:20}}>
            <span className={styles.semi_big_text}>
              Reading a book and
              encountered a word that
              sounds really sophisticating
            </span>
            <div style={{marginTop:40}}>
              <span className={styles.big_text_red}>
                Add it to your List
              </span>
            </div>
          </div>
        </div>
        <div style={{padding:30}}>
          <span className={styles.semi_big_text}>
            You are struggling to understand what`s your favourite song is about
          </span>
        </div>
        <Image
          style={{borderRadius: '50%'}}
          src='/images/f_4.png' alt='f_4'
          width={406}
          height={390}
        />
        <div style={{padding:30}}>
          <span className={styles.semi_big_text}>
            You know what to do
          </span>
        </div>
      </main>
    </div>
  )
}
