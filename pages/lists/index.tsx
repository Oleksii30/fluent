import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from 'components/header';
import ListCard from 'components/listCard';
import useStore, { URL, State } from 'store/lists';
import { useAuthState } from 'context/auth'
import { IList } from 'interfaces/list.interface';
import Filter from 'components/filter';
import ConfirmDelete from 'components/modals/confirmDelete';

import styles from 'styles/pages/Lists.module.css';

export default function Home() {

  const getLists = useStore((state: State) => state.all);
  const deleteList = useStore((state: State) => state.delete);
  const { isLoggedIn, user } = useAuthState();
  const lists = useStore((state: any) => state.lists);
  const [filteredLists, setFilteredLists] = useState(lists);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteListId, setDeleteListId] = useState<number | null>(null);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const showFilters = lists.length > 0 && !isTabletOrMobile;

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  }
  const openDeleteModal = () => {
    setDeleteModalIsOpen(true);
  }

  useEffect(() => {
    if(isLoggedIn){
      getLists(user.username);
    }
  }, [getLists, isLoggedIn, user])

  const handleOpenDeleteModal = (listCreatedAt:number) => {
    openDeleteModal();
    setDeleteListId(listCreatedAt);
  }

  const handleDeleteList = async () => {
    if(!deleteListId){
      return
    }
    await deleteList(user.username, deleteListId);
    closeDeleteModal();
    setDeleteListId(null);
  }

  const renderLists = () => {
    if(lists.length === 0){
      return <div>No lists were created yet</div>
    }

    return(
      <div className={styles.lists_container}>
        {filteredLists.map((list:IList) =>
          <ListCard key={list.createdAt} list={list} onDeleteList={handleOpenDeleteModal}/>
        )}
      </div>
    )
  }

  return (
    <div className={styles.container} id="main">
      <Header/>
      <main className={styles.main}>
        {showFilters && <Filter items={lists} setItems={setFilteredLists}/>}
        {renderLists()}
      </main>
      <ConfirmDelete
        isOpen={deleteModalIsOpen}
        closeModal={closeDeleteModal}
        confirmDelete={handleDeleteList}
      />
    </div>
  )
}
