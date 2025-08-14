import { useState } from 'react';
import { useAuthState } from 'context/auth';
import useSettingsStore, { State as SettingsState } from 'store/settings';
import Select, { SingleValue } from 'react-select';
import { options } from "../../constants/languageOptions";
import IconButton from 'components/buttons/icon';
import { Plus } from 'react-feather';
import { calculateLanguageOptions } from 'helpers/language';
import LanguageCard from './languageCard';
import { useIsServerSideMobile } from 'context/serverSideMobile';

import styles from 'styles/components/Language.module.css';

type Option = {
	label: string;
	value: string;
	nativeName: string;
}

export default function Language() {
	const [selectValue, setSelectValue] = useState<string | undefined>();
	const { user } = useAuthState();
  const languages = useSettingsStore((state: SettingsState) => state.languages);
	const addLanguage = useSettingsStore((state: SettingsState) => state.addLanguage);

	const isTabletOrMobile = useIsServerSideMobile();

	const handleChange = (option:SingleValue<Option>) => {
		if(!option){
			return
		}
		setSelectValue(option.value)
	}

	const handleSubmit = () => {
		if(!selectValue) {
			return
		}
		addLanguage(user.username, selectValue)
	}

	return (
		<div style={{display: 'flex', flexDirection: 'column'}}>
			<h4 style={{marginLeft: 20}}>Languages</h4>
			<div style={{paddingLeft: 20, width: isTabletOrMobile ? 350 : 600}}>
				Here you can set languages which you are learning. Basically they are used for filtering on Lists page.
			</div>
			<div className={styles.language_container}>
				{calculateLanguageOptions(languages, options).map(language => <div key={language.value}><LanguageCard language={language}/></div>)}
				<div style={{width: 200, marginRight: 10}}><Select options={options} onChange={handleChange}/></div>
				<IconButton size={30} onClick={handleSubmit}>
					<Plus size={30}/>
				</IconButton>
			</div>
		</div>
	)
}
