import Link from 'next/link'
import { useRouter } from 'next/router'

import { Routes } from 'enums/routes'

import styles from 'styles/components/Header.module.css'

export default function Header() {
    const router = useRouter()

    return (
        <div className={styles.container}>
            {router.asPath != Routes.SIGNUP &&
                <h4>
                    <Link className={styles.link} href={Routes.SIGNUP}>
                        Sign Un
                    </Link>
                </h4>}
            {router.asPath != Routes.LOGIN &&
                <h4>
                    <Link className={styles.link} href={Routes.LOGIN}>
                        Log In
                    </Link>
                </h4>}
        </div>
    )
}
