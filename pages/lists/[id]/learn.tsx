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
import { Check } from 'react-feather';

import styles from 'styles/pages/Lists.module.css';
import { IList } from 'interfaces/list.interface';

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

const checkResultList = (resultList:Array<ResultItem>) => {
  if(resultList.length === 0){
    return false;
  }
  return !resultList.some(item => item.state === AnswerStates.WRONG || item.state === AnswerStates.IDLE);
}

export default function Learn() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuthState();
  const [resultList, setResultList] = useState<Array<ResultItem>>([]);
  const [bankOfVariants, setBankOfVariants] = useState<Array<string>>([]);

  const changeListStatus = useStore((state: State) => state.changeListStatus);
  const getListById = useStore((state: State) => state.getById);
  const currentList = useStore((state: State) => state.currentList);

  const [isListLearned, setIsListLearned] = useState(false);

  const handleDragEnd = (result:any) => {
    const destinationBoxName = result.destination.droppableId;
    const sourceBoxName = result.source.droppableId;
    const answer = result.draggableId.split('$')[0];
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
        const idexOfAnswer = prevList.indexOf(answer);
        resultList = [...prevList.slice(0, idexOfAnswer), ...prevList.slice(idexOfAnswer+1, prevList.length)];
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
    const isListChecked = checkResultList(resultList);
    if(!isListChecked || currentList?.isLearned){
      return
    }
    const body = {...currentList, isLearned: true};
    setIsListLearned(true);
    changeListStatus(body as IList);
  }, [resultList])

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

    setIsListLearned(currentList.isLearned);

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
              <div className={styles.list_header}>
                {currentList.header}
                {isListLearned && <div style={{marginLeft: 10, paddingTop: 10}}><Check color='green'/></div>}
              </div>
              <MainButton type='button' label='Check' onClick={handleCheck}/>
              <div style={{padding: '20px 0px', width: 350}}>
                In this game simply drag variants to appropriate boxes. Check your result when finished.
              </div>
              <Droppable droppableId={VARIANTS_CONTAINER} direction='horizontal'>
                {(provided, snapshot) => (
                  <div className={styles.list_variants_container} ref={provided.innerRef} {...provided.droppableProps}>
                    {bankOfVariants.map((variant, index) => <div key={index}><VariantCard variant={variant} index={index}/></div>)}
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
