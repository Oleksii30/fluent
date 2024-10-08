import useSettingsStore, { State as SettingsState } from 'store/settings';
import Select from 'react-select';
import { options } from "constants/languageOptions";
import { calculateLanguageOptions } from 'helpers/language';

type Props = {
	lang: string;
	onChangeLanguage: (value:string) => void;
}

export default function Language({ onChangeLanguage, lang }:Props) {

  const languages = useSettingsStore((state: SettingsState) => state.languages);

	const selectedLang = options.find(item => item.value === lang);

	const handleChange = (option:any) => {
		onChangeLanguage(option.value)
	}

	return (
    <div style={{width: 200}}>
			<Select options={calculateLanguageOptions(languages, options)} onChange={handleChange} instanceId="language-filter" value={selectedLang}/>
		</div>
	)
}
