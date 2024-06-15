import Link from 'next/link'
import Logo from './logo'
import { useRouter } from 'next/router'
import { useAuthDispatch, useAuthState, logOut } from 'context/auth'

import { Routes } from 'enums/routes'

import styles from 'styles/components/Header.module.css'


export default function Header() {
	const router = useRouter()
	const { isLoggedIn, user } = useAuthState()
	const authDispatch = useAuthDispatch()

	const handleLogout = () => {
		logOut(authDispatch)
		router.replace('/')
	}

	return (
		<div className={styles.container}>
			<Link href={Routes.ROOT}>
				<Logo/>
			</Link>
			<div className={styles.links}>
				{router.asPath != Routes.SIGNUP && !isLoggedIn &&
					<h4>
						<Link className={styles.link} href={Routes.SIGNUP}>
							Sign Un
						</Link>
					</h4>
				}
				{router.asPath != Routes.LOGIN && !isLoggedIn &&
					<h4>
						<Link className={styles.link} href={Routes.LOGIN}>
							Log In
						</Link>
					</h4>
				}
				{isLoggedIn &&
					<>
						<h4>
							<Link className={styles.link} href={Routes.CREATE}>
								Create
							</Link>
						</h4>
						<h4>
							<Link className={styles.link} href={`${Routes.LISTS}?userId=${user.username}`}>
								Lists
							</Link>
						</h4>
						<h4 className={styles.link} onClick={handleLogout}>
							Log Out
						</h4>
					</>
				}
			</div>
		</div>
	)
}
