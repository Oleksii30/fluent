import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/header';
import useStore from 'store/lists';
import { useAuthState } from 'context/auth';
import { WordInput } from 'interfaces/list.interface';

import styles from 'styles/pages/Lists.module.css';

export default function Learn() {
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
      {currentList &&
        <div className={styles.list_container}>
          <div className={styles.list_header}>{currentList.header}</div>
          {currentList.list.map((el:WordInput) =>
            <div key={el.id}>
              <div className={styles.list_word}>{el.word}</div>
              <>
                {el.translations[0] &&
                  <div>
                    <span className={styles.list_word_additional_label}>Translations:</span>
                    {el.translations.map((translation, index) =>
                      <span key={translation} className={styles.list_word_additional_content}>
                        {translation}
                        {index < el.translations.length - 1 &&<span>, </span>}
                      </span>)
                    }
                  </div>
                }
              </>
              <>
                {el.associations[0] &&
                  <div>
                    <span className={styles.list_word_additional_label}>Associations:</span>
                    {el.associations.map((association, index) =>
                      <span key={association} className={styles.list_word_additional_content}>
                        {association}
                        {index < el.associations.length - 1 &&<span>, </span>}
                      </span>)
                    }
                  </div>
                }
              </>
            </div>
          )}
        </div>
      }
    </div>
  )
}
