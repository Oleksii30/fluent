import styles from 'styles/components/TranslationCard.module.css';
import { AnswerStates } from "enums/answerStates";
import MainButton from 'components/buttons/main';
import { useState, Dispatch, SetStateAction, KeyboardEvent } from 'react';

type Props = {
  translation: {translation:string, word:string};
  setNumberOfCorrectAnswers: Dispatch<SetStateAction<number>>
}

const borderColores = {
  [AnswerStates.WRONG]: '#ffcbd1',
  [AnswerStates.RIGHT]: '#D3D3FF',
  [AnswerStates.IDLE]: 'black'
}

export default function TranslationCard({ translation, setNumberOfCorrectAnswers }:Props) {
  const [inputValue, setInputVavue] = useState('');
  const [answerState, setAnswerState] = useState(AnswerStates.IDLE);

  const handleCheckAnswer = () => {
    const isCorrectAnswer = inputValue === translation.word;
    const isPrevAnswerCorrect = answerState === AnswerStates.RIGHT;
    setAnswerState(isCorrectAnswer ? AnswerStates.RIGHT : AnswerStates.WRONG);
    setNumberOfCorrectAnswers(
      prevState => isCorrectAnswer ?
        (isPrevAnswerCorrect ? prevState : prevState+1) :
        (isPrevAnswerCorrect ? prevState-1 : prevState)
    );
  }

  const handlePressEnter = (event:KeyboardEvent) => {
    if(event.key !== 'Enter'){
      return
    }
    (event.target as HTMLInputElement).blur();

    handleCheckAnswer();
  }


  return (
    <div
        className={styles.word_container}
        style={{borderColor: borderColores[answerState]}}
    >
        <span className={styles.word_text}>{translation.translation}</span>
        <div>
          <input className={styles.word_input} value={inputValue} onChange={(event) => setInputVavue(event.target.value)} onKeyDown={handlePressEnter}></input>
        </div>
        <MainButton label='Check' styles={{background: '#D3D3FF'}} onClick={handleCheckAnswer} type='button'/>
    </div>
  )
}
