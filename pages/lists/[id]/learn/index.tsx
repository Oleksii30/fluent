import Header from 'components/header';
import { LearningGames } from 'enums/learningGames';
import LearningGameCard from 'components/learningGameCard';

import styles from 'styles/pages/Lists.module.css';



export default function Learn() {

    return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.list_container}>
            <div className={styles.list_header}>Learning section</div>
            <div style={{display: 'flex'}}>
                {LearningGames.map(game => <LearningGameCard game={game} />)}
            </div>
        </div>
    </div>
  )
}
