import { Droppable } from "@hello-pangea/dnd";
import styles from 'styles/components/WordCard.module.css';
import VariantCard from 'components/variantCard';
import { ResultItem } from 'pages/lists/[id]/learn';
import { AnswerStates } from "enums/answerStates";

type Props = {
  resultItem: ResultItem
}

export default function WordCard({ resultItem }:Props) {
  return (
    <Droppable droppableId={resultItem.word}>
      {(provided, snapshot) => (
        <div
          className={styles.word_container}
          ref={provided.innerRef}
          style={resultItem.state === AnswerStates.WRONG ? {borderColor: 'red'} : {}}
          {...provided.droppableProps}
        >
          <span className={styles.word_text}>{resultItem.word}</span>
          <div>
            {resultItem.answers.map((answer, index) => <VariantCard variant={answer} index={index} />)}
          </div>
        </div>
      )}
    </Droppable>
  )
}
