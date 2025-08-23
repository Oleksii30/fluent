import Header from 'components/header';
import { LearningGames } from 'enums/learningGames';
import LearningGameCard from 'components/cards/learningGameCard';
import { AnswerStates } from 'enums/answerStates';

import styles from 'styles/pages/Lists.module.css';

export type AnswerState = AnswerStates.RIGHT | AnswerStates.WRONG | AnswerStates.IDLE;

export const shuffle = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function Learn() {

    return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.list_container}>
            <div className={styles.list_header}>Learning section</div>
            <div style={{display: 'flex'}}>
                {LearningGames.map(game => <div key={game.ID}><LearningGameCard game={game} /></div>)}
            </div>
        </div>
    </div>
  )
}
