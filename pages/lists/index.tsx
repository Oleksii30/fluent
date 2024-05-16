import { useEffect } from 'react';
import Header from 'components/header';
import ListCard from 'components/listCard';
import useStore from 'store/lists';
import { useAuthState } from 'context/auth'
import { IList } from 'interfaces/list.interface';

import styles from 'styles/pages/Lists.module.css';

export default function Home() {

  const getLists = useStore((state: any) => state.all);
  const deleteList = useStore((state: any) => state.delete);
  const lists = useStore((state: any) => state.lists);
  const { isLoggedIn, user } = useAuthState()

  useEffect(() => {
    if(isLoggedIn){
      getLists(user.username);
    }
  }, [getLists, isLoggedIn, user])

  const handleDeleteList = (listCreatedAt:number) => {
    deleteList(user.username, listCreatedAt);
  }

  return (
    <div className={styles.container}>
      <Header/>
      <main className={styles.main}>
        <div className={styles.lists_container}>
          {lists.map((list:IList) =>
            <ListCard key={list.createdAt} list={list} onDeleteList={handleDeleteList}/>
          )}
        </div>
      </main>
    </div>
  )
}