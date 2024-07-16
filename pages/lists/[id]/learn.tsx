import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Header from 'components/header';
import useStore, { State } from 'store/lists';
import { useAuthState } from 'context/auth';
import VariantCard from 'components/variantCard';
import WordCard from 'components/wordCard';

import styles from 'styles/pages/Lists.module.css';

export type ResultItem = {
  word: string,
  answers: Array<string>
}

export default function Learn() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuthState();
  const [resultList, setResultList] = useState<Array<ResultItem>>([]);
  const [bankOfVariants, setBankOfVariants] = useState<Array<string>>([]);

  const getListById = useStore((state: State) => state.getById);
  const currentList = useStore((state: State) => state.currentList);

  const handleDragEnd = (result:any) => {
    const destinationBoxName = result.destination.droppableId;
    const sourceBoxName = result.source.droppableId;
    const answer = result.draggableId;
    if(sourceBoxName === destinationBoxName){
      return
    }
    setResultList(prevList => {
      const  resultList = prevList.map(item => {
        if(item.word === destinationBoxName){
          item.answers = [...item.answers, answer]
        }
        if(item.word === sourceBoxName){
          item.answers = item.answers.filter(item => item !== answer)
        }
        return item
      });

      return resultList
    })

    setBankOfVariants(prevList => {
      let resultList = prevList;
      if(destinationBoxName === 'variants_container'){
        resultList = [...prevList, answer]
      }

      if(sourceBoxName === 'variants_container'){
        resultList = prevList.filter(item => item !== answer)
      }

      return resultList
    })
  }

  useEffect(()=>{
    if(!currentList){
        return
    }
    let variants:Array<string> = [];
    let words:Array<string> = [];
    for(const item of currentList.list){
        variants = [...variants, ...item.translations, ...item.associations];
        words = [...words, item.word];
    }
    setBankOfVariants(variants);
    const resultList = words.map(word => ({word: word, answers: []}));
    setResultList(resultList);

  }, [currentList])

  useEffect(() => {
    if(!user || !id){
      return
    }
    getListById(user.username, id as string)
  }, [id, user, getListById])

  return (
    <div className={styles.container}>
      <Header/>
      {currentList &&
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={styles.list_container}>
              <div className={styles.list_header}>{currentList.header}</div>
              <Droppable droppableId="variants_container" direction='horizontal'>
                {(provided, snapshot) => (
                  <div className={styles.list_variants_container} ref={provided.innerRef} {...provided.droppableProps}>
                    {bankOfVariants.map((variant, index) => <VariantCard variant={variant} index={index}/>)}
                  </div>
                )}
              </Droppable>
              <div className={styles.list_words_container}>
                {resultList.map(resultItem => <WordCard resultItem={resultItem}/>)}
              </div>
          </div>
        </DragDropContext>
      }
    </div>
  )
}
