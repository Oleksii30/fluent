import useSettingsStore, { State as SettingsState } from 'store/settings';
import Select from 'react-select';
import { options } from "components/settings/languageOptions";
import { calculateLanguageOptions } from 'helpers/language';

type Props = {
	onChangeLanguage: (value:string) => void
}

export default function Language({ onChangeLanguage }:Props) {

  const languages = useSettingsStore((state: SettingsState) => state.languages);

	const handleChange = (option:any) => {
		onChangeLanguage(option.value)
	}

	return (
    <div style={{width: 200}}>
			<Select options={calculateLanguageOptions(languages, options)} onChange={handleChange} instanceId="language-filter"/>
		</div>
	)
}
