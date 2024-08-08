import { useState } from 'react';
import { useAuthState } from 'context/auth';
import useSettingsStore, { State as SettingsState } from 'store/settings';
import Select from 'react-select';
import { options } from "./languageOptions";
import IconButton from 'components/buttons/icon';
import { Plus } from 'react-feather';
import { calculateLanguageOptions } from 'helpers/language';
import LanguageCard from './languageCard';
import styles from 'styles/components/Language.module.css';

export default function Language() {
	const [selectValue, setSelectValue] = useState();
	const { isLoggedIn, user } = useAuthState();
    const languages = useSettingsStore((state: SettingsState) => state.languages);
	const addLanguage = useSettingsStore((state: SettingsState) => state.addLanguage);

	const handleChange = (option:any) => {
		setSelectValue(option.value)
	}

	const handleSubmit = () => {
		if(!selectValue) {
			return
		}
		addLanguage(user.username, selectValue)
	}

	return (
		<div className={styles.language_container}>
            {calculateLanguageOptions(languages, options).map(language => <LanguageCard language={language}/>)}
            <div style={{width: 200}}><Select options={options} onChange={handleChange}/></div>
			<IconButton size={30} onClick={handleSubmit}>
				<Plus size={30}/>
			</IconButton>
		</div>
	)
}
