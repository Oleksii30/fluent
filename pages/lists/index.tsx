import { useEffect, useState } from 'react';
import Header from 'components/header';
import ListCard from 'components/listCard';
import useStore, { URL, State } from 'store/lists';
import { useAuthState } from 'context/auth'
import { IList } from 'interfaces/list.interface';
import Filter from 'components/filter';

import styles from 'styles/pages/Lists.module.css';

export default function Home() {

  const getLists = useStore((state: State) => state.all);
  const deleteList = useStore((state: State) => state.delete);
  const { isLoggedIn, user } = useAuthState();
  const lists = useStore((state: any) => state.lists);
  const [filteredLists, setFilteredLists] = useState(lists);

  useEffect(() => {
    if(isLoggedIn){
      getLists(user.username);
    }
  }, [getLists, isLoggedIn, user])

  const handleDeleteList = (listCreatedAt:number) => {
    deleteList(user.username, listCreatedAt);
  }

  const renderLists = () => {
    if(lists.length === 0){
      return <div>No lists were created yet</div>
    }

    return(
      <div className={styles.lists_container}>
        {filteredLists.map((list:IList) =>
          <ListCard key={list.createdAt} list={list} onDeleteList={handleDeleteList}/>
        )}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Header/>
      <main className={styles.main}>
        <Filter items={lists} setItems={setFilteredLists}/>
        {renderLists()}
      </main>
    </div>
  )
}
