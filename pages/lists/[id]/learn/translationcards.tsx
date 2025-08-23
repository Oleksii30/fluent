import Header from 'components/header';
import { AnswerState, shuffle } from './index';
import useStore, { State } from 'store/lists';
import TranslationCard from 'components/cards/translationCard';
import { useAuthState } from 'context/auth';
import { useRouter } from 'next/router';

import styles from 'styles/pages/Lists.module.css';
import { useEffect, useState } from 'react';

export default function TranslationCards() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuthState();
  const getListById = useStore((state: State) => state.getById);
  const currentList = useStore((state: State) => state.currentList);
  const [bankOfVariants, setBankOfVariants] = useState<Array<{translation:string, word:string}>>([]);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);

  useEffect(() => {
    if(!currentList){
      return
    }

    const translations = currentList.list.map(word => word.translations.map(translation => ({translation, word: word.word.trim()}))).flat();
    setBankOfVariants(shuffle(translations))

  }, [currentList])

  useEffect(() => {
    if(!user || !id){
      return
    }
    getListById(user.username, id as string)
  }, [id, user, getListById])

  return (
    <div className={styles.container}>
        <Header/>
        <div style={{padding: 20, position: 'relative'}}>
          <div className={styles.list_header} style={{marginLeft:100, marginBottom: 20}}>
            {currentList?.header}
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {bankOfVariants.map(variant => (
              <div key={variant.translation}>
                <TranslationCard
                  translation={variant}
                  setNumberOfCorrectAnswers={setNumberOfCorrectAnswers}
                />
              </div>
            ))}
          </div>
          <div style={
              {
                position:'fixed',
                top:100,
                right:20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                border: '2px solid black',
                borderRadius: 100,
                width: 70,
                height: 70,
                background: (numberOfCorrectAnswers && bankOfVariants.length === numberOfCorrectAnswers) ? '#D3D3FF' : 'white'
              }
            }>
            <b>{`${bankOfVariants.length}/${numberOfCorrectAnswers}`}</b>
          </div>
        </div>
    </div>
  )
}
