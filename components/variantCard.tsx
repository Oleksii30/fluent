import { Draggable } from '@hello-pangea/dnd';
import styles from 'styles/components/VariantCard.module.css';

type Props = {
  variant: string;
  index: number
}

export default function VariantCard({ variant, index }:Props) {

  return (
    <Draggable
      key={variant}
      draggableId={variant}
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
