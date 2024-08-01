import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Header from 'components/header';
import useStore, { State } from 'store/lists';
import { useAuthState } from 'context/auth';
import VariantCard from 'components/variantCard';
import WordCard from 'components/wordCard';
import MainButton from 'components/buttons/main';
import { AnswerStates } from 'enums/answerStates';

import styles from 'styles/pages/Lists.module.css';

type AnswerState = AnswerStates.RIGHT | AnswerStates.WRONG | AnswerStates.IDLE;

export type ResultItem = {
  word: string,
  answers: Array<string>,
  state: AnswerState
}

const VARIANTS_CONTAINER = 'variants_container';

const shuffle = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

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
      if(destinationBoxName === VARIANTS_CONTAINER){
        resultList = [...prevList, answer]
      }

      if(sourceBoxName === VARIANTS_CONTAINER){
        resultList = prevList.filter(item => item !== answer)
      }

      return resultList
    })
  }

  const handleCheck = () => {
    if(!currentList) {
      return
    }
    setResultList(prevList => {
      const  checkList = prevList.map(resultListItem => {
        const rightExample = currentList.list.find(currentListItem => currentListItem.word === resultListItem.word);

        if(!rightExample) {
          return resultListItem
        }
        const rightExampleAnswers = [...rightExample.translations, ...rightExample.associations];
        resultListItem.state = AnswerStates.RIGHT;

        if(rightExampleAnswers.length !== resultListItem.answers.length) {
          resultListItem.state = AnswerStates.WRONG;
        }

        for(let answer of resultListItem.answers) {
          if(!rightExampleAnswers.includes(answer)) {
            resultListItem.state = AnswerStates.WRONG;
          }
        }

        return resultListItem
      });
      return checkList
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
    setBankOfVariants(shuffle(variants));
    const resultList = words.map(word => ({word: word, answers: [], state:(AnswerStates.IDLE as AnswerState)}));
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
              <MainButton type='button' label='Check' onClick={handleCheck}/>
              <Droppable droppableId={VARIANTS_CONTAINER} direction='horizontal'>
                {(provided, snapshot) => (
                  <div className={styles.list_variants_container} ref={provided.innerRef} {...provided.droppableProps}>
                    {bankOfVariants.map((variant, index) => <div key={variant}><VariantCard variant={variant} index={index}/></div>)}
                  </div>
                )}
              </Droppable>
              <div className={styles.list_words_container}>
                {resultList.map(resultItem => <div key={resultItem.word}><WordCard resultItem={resultItem}/></div>)}
              </div>
          </div>
        </DragDropContext>
      }
    </div>
  )
}
