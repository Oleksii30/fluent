import Link from 'next/link';
import { IList } from 'interfaces/list.interface';
import { format } from "date-fns";
import { DateFormats } from 'enums/dateFormats';
import { Routes } from 'enums/routes';
import { Delete } from 'react-feather';
import IconButton from 'components/buttons/icon';

import styles from 'styles/components/ListCard.module.css';

type Props = {
  list: IList,
  key: number,
  onDeleteList: (listCreatedAt:number) => void
}

export default function ListCard({ list, onDeleteList }:Props) {
  return (
    <div style={{position:'relative', width: 'fit-content', height: 'fit-content'}}>
      <Link href={`${Routes.LISTS}/${list.createdAt}`}>
        <div className={styles.cardContainer}>
          <div className={styles.language}>{list.language}</div>
          <div className={styles.date}>{format(new Date(list.createdAt), DateFormats.YYYY_MM_DD)}</div>
          <div className={styles.title}>{list.header}</div>
        </div>
      </Link>
      <div className={styles.deleteButton}>
        <IconButton size={30} onClick={() => onDeleteList(list.createdAt)}>
          <Delete size={30}/>
        </IconButton>
      </div>
    </div>
  )
}
