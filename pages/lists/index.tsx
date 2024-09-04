import { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from "next";
import Header from 'components/header';
import ListCard from 'components/listCard';
import useStore, { URL, State } from 'store/lists';
import { useAuthState } from 'context/auth'
import { IList } from 'interfaces/list.interface';
import Filter from 'components/filter';
import ConfirmDelete from 'components/modals/confirmDelete';
import HumburgerButton from 'components/humburger';
import { useIsServerSideMobile } from 'context/serverSideMobile';
import { getIsSsrMobile } from 'helpers/serverSideMobile';

import styles from 'styles/pages/Lists.module.css';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      isSsrMobile: getIsSsrMobile(context)
    }
  };
}

export default function Home() {

  const getLists = useStore((state: State) => state.all);
  const deleteList = useStore((state: State) => state.delete);
  const { isLoggedIn, user } = useAuthState();
  const lists = useStore((state: any) => state.lists);
  const [filteredLists, setFilteredLists] = useState(lists);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteListId, setDeleteListId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isTabletOrMobile = useIsServerSideMobile();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  }

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
        {isTabletOrMobile &&
          <>
            <div style={{padding: 20, display: 'flex', alignItems:'center', width: '100%'}}>
              <HumburgerButton isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu}/>
              <h3 style={{marginLeft: 10}}>Filters</h3>
            </div>
            {isMobileMenuOpen &&
              <div className={styles.filters_mobile_container}>
                <Filter items={lists} setItems={setFilteredLists}/>
              </div>
            }
          </>
        }
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
