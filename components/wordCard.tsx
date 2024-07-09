import { useState } from 'react';
import { Droppable } from "@hello-pangea/dnd";
import { WordInput } from 'interfaces/list.interface';
import styles from 'styles/components/WordCard.module.css';

type Props = {
  listItem: WordInput
}

export default function WordCard({ listItem }:Props) {
  return (
    <Droppable droppableId={listItem.word}>
      {(provided, snapshot) => (
        <div className={styles.word_container} ref={provided.innerRef} {...provided.droppableProps}>
          <span className={styles.word_text}>{listItem.word}</span>
        </div>
      )}
    </Droppable>
  )
}
