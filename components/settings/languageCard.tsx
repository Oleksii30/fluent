import IconButton from 'components/buttons/icon';
import { useAuthState } from 'context/auth';
import useSettingsStore, { State as SettingsState } from 'store/settings';
import { X } from 'react-feather';
import styles from 'styles/components/Language.module.css';

type Props = {
  language: {
    label:string;
    value:string;
  };
}

export default function LanguageCard({ language }:Props) {
  const { isLoggedIn, user } = useAuthState();
  const deleteLanguage = useSettingsStore((state: SettingsState) => state.deleteLanguage);
  const handleDeleteLanguage = () => {
    deleteLanguage(user.username, language.value);
  }
  return (
    <div className={styles.language_card_container}>
        <span style={{marginRight: 15}}>{language.label}</span>
        <IconButton size={15} onClick={handleDeleteLanguage}><X size={15}/></IconButton>
    </div>
  )
}
