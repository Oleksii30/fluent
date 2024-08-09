import Link from 'next/link';
import Logo from './logo';
import { useRouter } from 'next/router';
import { useAuthDispatch, useAuthState, logOut } from 'context/auth';
import useStore, { State }  from 'store/lists';
import { Routes } from 'enums/routes';

import styles from 'styles/components/Header.module.css';

export default function Header() {
	const router = useRouter()
	const { isLoggedIn, user } = useAuthState()
	const authDispatch = useAuthDispatch()

	const nullCurrentList = useStore((state: State) => state.nullCurrentList);

	const handleLogoutLink = () => {
		nullCurrentList();
		logOut(authDispatch);
		router.replace('/');
	}

	const handleCreateLink = () => {
		nullCurrentList();
		router.replace(Routes.CREATE);
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
							<Link className={styles.link} href={Routes.SETTINGS}>
								Settings
							</Link>
						</h4>
						<h4 className={styles.link} onClick={handleCreateLink}>
							Create
						</h4>
						<h4>
							<Link className={styles.link} href={`${Routes.LISTS}?userId=${user.username}`}>
								Lists
							</Link>
						</h4>
						<h4 className={styles.link} onClick={handleLogoutLink}>
							Log Out
						</h4>
					</>
				}
			</div>
		</div>
	)
}
