import { Triangle } from 'react-loader-spinner';
import styles from 'styles/components/SavingScreen.module.css';

export default function SavingScreen() {

	return (
		<div className={styles.screen_container}>
			<Triangle
				visible={true}
				height="70"
				width="70"
				color="black"
				ariaLabel="triangle-loading"
				wrapperStyle={{}}
				wrapperClass=""
			/>
		</div>
	)
}
