import { Droppable } from "@hello-pangea/dnd";
import styles from 'styles/components/WordCard.module.css';
import VariantCard from 'components/variantCard';
import { ResultItem } from 'pages/lists/[id]/learn';
import { AnswerStates } from "enums/answerStates";

type Props = {
  resultItem: ResultItem
}

const borderColores = {
  [AnswerStates.WRONG]: 'red',
  [AnswerStates.RIGHT]: 'green',
  [AnswerStates.IDLE]: 'black'
}

export default function WordCard({ resultItem }:Props) {
  return (
    <Droppable droppableId={resultItem.word}>
      {(provided, snapshot) => (
        <div
          className={styles.word_container}
          ref={provided.innerRef}
          style={{borderColor: borderColores[resultItem.state]}}
          {...provided.droppableProps}
        >
          <span className={styles.word_text}>{resultItem.word}</span>
          <div>
            {resultItem.answers.map((answer, index) => <div key={answer}><VariantCard variant={answer} index={index} /></div>)}
          </div>
        </div>
      )}
    </Droppable>
  )
}
