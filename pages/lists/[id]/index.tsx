import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/header';
import ListForm from 'components/listForm';
import useStore, { State } from 'store/lists';
import { useAuthState } from 'context/auth';
import Link from 'next/link';
import { Routes } from 'enums/routes';
import MainButton from 'components/buttons/main';
import SavingScreen from 'components/savingScreen';
import { getIsSsrMobile } from 'helpers/serverSideMobile';
import { GetServerSidePropsContext } from "next";
import { useIsServerSideMobile } from 'context/serverSideMobile';

import styles from 'styles/pages/Lists.module.css';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      isSsrMobile: getIsSsrMobile(context)
    }
  };
}

export default function List() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuthState();

  const isTabletOrMobile = useIsServerSideMobile();

  const getListById = useStore((state: State) => state.getById);
  const currentList = useStore((state: State) => state.currentList);
  const isSaving = useStore((state: State) => state.isSaving);

  useEffect(() => {
    if(!user || !id){
      return
    }
    getListById(user.username, id as string)
  }, [id, user, getListById])

  return (
    <div className={styles.container}>
      <Header/>
      <div style={{margin: 15}}>
        <Link href={`${Routes.LISTS}/${id}/learn`}>
          <MainButton label='Learn this list' type='button'/>
        </Link>
      </div>
      {currentList && <ListForm item={currentList} isTabletOrMobile={isTabletOrMobile}/>}
      {isSaving && <SavingScreen/>}
    </div>
  )
}
