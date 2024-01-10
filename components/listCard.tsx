import Link from 'next/link';
import { IList } from 'interfaces/list.interface';
import { format } from "date-fns";
import { DateFormats } from 'enums/dateFormats';
import { Routes } from 'enums/routes';

import styles from 'styles/components/ListCard.module.css';

type Props = {
  list: IList,
  key: number
}

export default function ListCard({ list }:Props) {
  return (
    <Link href={`${Routes.LISTS}/${list.createdAt}`}>
      <div className={styles.cardContainer}>
        <div className={styles.language}>{list.language}</div>
        <div className={styles.date}>{format(new Date(list.createdAt), DateFormats.YYYY_MM_DD)}</div>
        <div className={styles.title}>{list.header}</div>
      </div>
    </Link>
  )
}
