import Link from 'next/link';
import { IList } from 'interfaces/list.interface';
import { format } from "date-fns";
import { DateFormats } from 'enums/dateFormats';
import { Routes } from 'enums/routes';
import { Check, XSquare } from 'react-feather';
import IconButton from 'components/buttons/icon';
import { useIsServerSideMobile } from 'context/serverSideMobile';

import styles from 'styles/components/ListCard.module.css';

type Props = {
  list: IList,
  key: number,
  onDeleteList: (listCreatedAt:number) => void
}

export default function ListCard({ list, onDeleteList }:Props) {
  const isTabletOrMobile = useIsServerSideMobile();

  return (
    <div style={{position:'relative', width: 'fit-content', height: 'fit-content'}}>
      <Link href={`${Routes.LISTS}/${list.createdAt}`}>
        <div className={styles.cardContainer}>
          <div className={styles.cardHeader}>
            <div>{list.language}</div>
            <div>{format(new Date(list.createdAt), DateFormats.YYYY_MM_DD)}</div>
          </div>
          <div className={styles.title}>
            {list.header}
            {list.isLearned && <div style={{marginLeft: 10, paddingTop: isTabletOrMobile ? 0 : 3}}><Check color='green'/></div>}
          </div>
        </div>
      </Link>
      <div className={styles.deleteButton}>
        <IconButton size={30} onClick={() => onDeleteList(list.createdAt)}>
          <XSquare size={30}/>
        </IconButton>
      </div>
    </div>
  )
}
