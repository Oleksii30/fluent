import { useEffect } from 'react';
import Header from 'components/header';
import ListCard from 'components/listCard';
import useStore, { URL, State } from 'store/lists';
import { useAuthState } from 'context/auth'
import { IList } from 'interfaces/list.interface';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

import styles from 'styles/pages/Lists.module.css';

type Repo = {
  items: Array<IList>
}

export const getServerSideProps = async (req: any) => {
  const { userId } = req.query;
  const res = await fetch(`${URL}?userId=${userId}`);
  const data = await res.json();
  const repo: Repo = {items: data};

  return { props: { repo } }
}

export default function Home({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const setLists = useStore((state: State) => state.all);
  const deleteList = useStore((state: State) => state.delete);
  const { isLoggedIn, user } = useAuthState();
  const storedLists = useStore((state: State) => state.lists);
  const repoLists = repo.items;
  const lists = storedLists || repoLists;

  useEffect(() => {
    if(isLoggedIn){
      setLists(repoLists);
    }
  }, [setLists, isLoggedIn, user])

  const handleDeleteList = (listCreatedAt:number) => {
    deleteList(user.username, listCreatedAt);
  }

  const renderLists = () => {
    if(lists.length === 0){
      return <div>No lists were created yet</div>
    }

    return(
      <div className={styles.lists_container}>
        {lists.map((list:IList) =>
          <ListCard key={list.createdAt} list={list} onDeleteList={handleDeleteList}/>
        )}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Header/>
      <main className={styles.main}>
        {renderLists()}
      </main>
    </div>
  )
}
