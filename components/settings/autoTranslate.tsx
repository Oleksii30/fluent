import Switch from "react-switch";
import useSettingsStore, { State as SettingsState } from "store/settings";
import { useAuthState } from 'context/auth';
import { useIsServerSideMobile } from 'context/serverSideMobile';
import styles from 'styles/components/Autotranslate.module.css';

export default function AutoTranslate() {
	const { user } = useAuthState();

	const isAutoTranslate = useSettingsStore((state: SettingsState) => state.isAutoTranslate);
	const updateAutoTranslate = useSettingsStore((state: SettingsState) => state.updateAutoTranslate);

	const isTabletOrMobile = useIsServerSideMobile();

	const handleChange = () => {
		updateAutoTranslate(user.username, !isAutoTranslate);
	}

	return (
		<div>
			<div className={styles.auto_translation_container}>
				<h4 style={{marginRight: 20}}>Auto translation</h4>
				<Switch onChange={handleChange} checked={isAutoTranslate} onColor='#ff5252'/>
			</div>
			<div style={{paddingLeft: 20, width: isTabletOrMobile ? 400 : 600}}>
				Auto translation allows you to automatically translate a word when adding it to your list.
				It`s very helpful because you don`t have to use external apps for translation, but it takes few seconds to save a word when it`s on.
			</div>
		</div>
	)
}
