import { useState } from 'react';
import { useAuthState } from 'context/auth';
import useSettingsStore, { State as SettingsState } from 'store/settings';
import Select from 'react-select';
import { options } from "../../constants/languageOptions";
import IconButton from 'components/buttons/icon';
import { Plus } from 'react-feather';
import { calculateLanguageOptions } from 'helpers/language';
import LanguageCard from './languageCard';
import { useIsServerSideMobile } from 'context/serverSideMobile';

import styles from 'styles/components/Language.module.css';

export default function TranslateTo() {
	const { user } = useAuthState();
  const languageToTranslate = useSettingsStore((state: SettingsState) => state.languageToTranslate);
	const changeTranslateTo = useSettingsStore((state: SettingsState) => state.changeTranslateTo);

	const isTabletOrMobile = useIsServerSideMobile();

	const handleChange = (option:any) => {
    changeTranslateTo(user.username, option.value);
	}

	return (
		<div style={{display: 'flex', flexDirection: 'column'}}>
			<h4 style={{marginLeft: 20}}>Translate to</h4>
			<div style={{paddingLeft: 20, width: isTabletOrMobile ? 350 : 600}}>
				Choose your language for translation
			</div>
        <div style={{width: 200, margin: 20}}>
          <Select options={options} onChange={handleChange} value={options.find(el => el.value === languageToTranslate)}/>
        </div>
		</div>
	)
}
