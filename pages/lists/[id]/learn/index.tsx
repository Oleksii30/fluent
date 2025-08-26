import Header from 'components/header';
import { LearningGames } from 'enums/learningGames';
import LearningGameCard from 'components/cards/learningGameCard';
import { AnswerStates } from 'enums/answerStates';
import { useIsServerSideMobile } from 'context/serverSideMobile';
import { getIsSsrMobile } from 'helpers/serverSideMobile';
import { GetServerSidePropsContext } from "next";

import styles from 'styles/pages/Lists.module.css';

export type AnswerState = AnswerStates.RIGHT | AnswerStates.WRONG | AnswerStates.IDLE;

export const shuffle = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      isSsrMobile: getIsSsrMobile(context)
    }
  };
}

export default function Learn() {

    const isTabletOrMobile = useIsServerSideMobile();

    return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.list_container}>
            <div className={styles.list_header} style={{marginLeft:20}}>Learning section</div>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {LearningGames.map(game => <div key={game.ID}><LearningGameCard game={game} /></div>)}
            </div>
        </div>
    </div>
  )
}
