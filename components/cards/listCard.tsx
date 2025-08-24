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

  const numberOfLearnedWords = list.list.filter(el => el.isLearned).length;

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
            {list.list.length}
          </div>
        </div>
      </Link>
        <div style={
          {
            position:'absolute',
            bottom:30,
            left:30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            border: '2px solid black',
            borderRadius: 100,
            width: 40,
            height: 40,
            background: (numberOfLearnedWords && list.list.length === numberOfLearnedWords) ? '#D3D3FF' : 'white'
          }
        }>
        <b>{`${list.list.length}/${numberOfLearnedWords}`}</b>
      </div>
      <div className={styles.deleteButton}>
        <IconButton size={30} onClick={() => onDeleteList(list.createdAt)}>
          <XSquare size={30}/>
        </IconButton>
      </div>
    </div>
  )
}
