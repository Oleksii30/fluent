import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Draggable } from '@hello-pangea/dnd';
import styles from 'styles/components/VariantCard.module.css';

type Props = {
  variant: string;
  index: number;
}

export default function VariantCard({ variant, index }:Props) {
  const id = useMemo(uuidv4, []);

  return (
    <Draggable
      key={index}
      draggableId={variant + '$' + id}
      index={index}
    >
      {(provided, snapshot) => (
        <div className={styles.variant_container} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {variant}
        </div>
      )}
    </Draggable>
  )
}
