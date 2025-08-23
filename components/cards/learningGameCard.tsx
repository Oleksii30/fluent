import Link from 'next/link';
import { Routes } from 'enums/routes';
import { useRouter } from 'next/router';

import styles from 'styles/components/LearningGameCard.module.css';
import { LearningGameType } from 'enums/learningGames';

type Props = {
  game: LearningGameType,
}

export default function LearningGameCard({ game }:Props) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div style={{position:'relative', width: 'fit-content', height: 'fit-content'}}>
      <Link href={`${Routes.LISTS}/${id}/learn/${game.ROUTE}`}>
        <div className={styles.cardContainer}>
          <div className={styles.cardHeader}>
            <b>{game.NAME}</b>
          </div>
          <div className={styles.cardDescription}>
            {game.DESCRIPTION}
          </div>
        </div>
      </Link>
    </div>
  )
}
