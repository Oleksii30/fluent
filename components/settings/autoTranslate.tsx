import Switch from "react-switch";
import useSettingsStore, { State as SettingsState } from "store/settings";
import { useAuthState } from 'context/auth';
import styles from 'styles/components/Autotranslate.module.css';

export default function AutoTranslate() {
	const { user } = useAuthState();

	const isAutoTranslate = useSettingsStore((state: SettingsState) => state.isAutoTranslate);
	const updateAutoTranslate = useSettingsStore((state: SettingsState) => state.updateAutoTranslate);

	const handleChange = () => {
		updateAutoTranslate(user.username, !isAutoTranslate);
	}

	return (
		<div className={styles.auto_translation_container}>
			<h4 style={{marginRight: 20}}>Auto translation</h4>
			<Switch onChange={handleChange} checked={isAutoTranslate} onColor='#ff5252'/>
		</div>
	)
}
