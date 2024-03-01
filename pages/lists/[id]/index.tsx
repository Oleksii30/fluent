import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/header';
import ListForm from 'components/listForm';
import useStore from 'store/lists';
import { useAuthState } from 'context/auth';
import Link from 'next/link';
import { Routes } from 'enums/routes';
import MainButton from 'components/buttons/main';

import styles from 'styles/pages/Lists.module.css';

export default function List() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuthState()

  const getListById = useStore((state: any) => state.getById);
  const currentList = useStore((state: any) => state.currentList);

  useEffect(() => {
    if(!user || !id){
      return
    }
    getListById(user.username, id)
  }, [id, user, getListById])

  return (
    <div className={styles.container}>
      <Header/>
      <div style={{margin: 15}}>
        <Link href={`${Routes.LISTS}/${id}/learn`}>
          <MainButton label='Learn this list' type='button'/>
        </Link>
      </div>
      {
        currentList && <ListForm item={currentList}/>
      }
    </div>
  )
}
