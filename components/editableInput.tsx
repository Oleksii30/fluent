import { useState, useEffect } from 'react';
import { Edit2, X, Save, Delete } from 'react-feather';
import IconButton from 'components/buttons/icon';
import styles from 'styles/components/EditableInput.module.css';

export enum FieldTypes {
  WORD = 'word',
  ADDITIONAL = 'additional'
}

type Props = {
  register: any,
  fieldName: string,
  placeholder?: string,
  setFocus:any,
  submitForm: (data:any) => void,
  getValues: () => any,
  onRemove?: () => void,
  index?: number,
  type?: FieldTypes
}

export default function EditableInput({
  register,
  fieldName,
  setFocus,
  submitForm,
  getValues,
  onRemove,
  index,
  type
}:Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const toggleEditMode = () => {
    setIsEditMode((prevState) => !prevState);
  };

  const handleSave = () => {
    const values = getValues();
    submitForm(values);
    toggleEditMode();
  }

  const handleRemove = () => {
    if(!onRemove){
      return
    }
    onRemove();
    const values = getValues();
    submitForm(values);
  }

  const calculateFieldType = () => {
    switch(type){
      case FieldTypes.WORD:
        return styles.word_input
      case FieldTypes.ADDITIONAL:
        return styles.additional_input
      default:
        return styles.word_input
    }
  }

  useEffect(()=>{
    const values = getValues();
    if(index && !Boolean(values.list[index].word)){
      setIsEditMode(true);
    }
  }, [])

  useEffect(()=>{
    if(isEditMode){
      setFocus(fieldName)
    }
  }, [isEditMode, fieldName, setFocus])

  return (
    <div className={styles.input_container}>
      <input
        className={calculateFieldType()}
        {...register(fieldName)}
        disabled={!isEditMode}
      />
      {!isEditMode &&
        <div className={styles.edit_icons_container}>
          <IconButton onClick={toggleEditMode}><Edit2 size={20}/></IconButton>
          {onRemove && <IconButton onClick={handleRemove}><Delete size={20}/></IconButton>}
        </div>
      }
      {isEditMode &&
        <div className={styles.save_icons_container}>
          <IconButton onClick={handleSave}><Save size={20}/></IconButton>
          <IconButton onClick={toggleEditMode}><X size={20}/></IconButton>
        </div>
      }
    </div>
  )
}
