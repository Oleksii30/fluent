import { useState, useEffect } from 'react';
import { Edit2, X, Save, Delete } from 'react-feather';
import IconButton from 'components/buttons/icon';
import styles from 'styles/components/EditableInput.module.css';

export enum FieldTypes {
  WORD = 'word',
  ADDITIONAL = 'additional'
}

const minCharsInField = 8;
const iconColor = 'grey';

type Props = {
  register: any,
  fieldName: string,
  placeholder?: string,
  setFocus:any,
  submitForm: (data:any) => void,
  getValues: () => any,
  onRemove?: () => void,
  revertFieldValue: (field:any, value:string) => void,
  index?: number,
  type?: FieldTypes,
}

export default function EditableInput({
  register,
  fieldName,
  setFocus,
  submitForm,
  getValues,
  onRemove,
  revertFieldValue,
  index,
  type,
  placeholder=''
}:Props) {
  const [initValue, setInitValue] = useState(getInitialValue());
  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldWidth, setFieldWidth] = useState(calculateFieldWidth(initValue || placeholder));
  const toggleEditMode = () => {
    setIsEditMode((prevState) => !prevState);
  };

  function getInitialValue() {
    if (fieldName.includes('.')){
      let fieldValue = getValues();
      const crumbs = fieldName.split('.');
      for (let crumb of crumbs) {
        fieldValue = fieldValue[crumb];
      }

      return fieldValue;
    }

    return getValues()[fieldName];
  }

  const handleSave = () => {
    const values = getValues();
    submitForm(values);
    toggleEditMode();
    setInitValue(getInitialValue());
  }

  const handlePressEnter = (event:any) => {
    if(event.key !== 'Enter'){
      return
    }
    (event.target as HTMLInputElement).blur();

    handleSave();
  }

  function calculateFieldWidth(input:string) {
    const fieldLength = input.length > 8 ? input.length : minCharsInField;
    return `${fieldLength+1}ch`
  }

  const handleRemove = () => {
    if(!onRemove){
      return
    }
    onRemove();
    const values = getValues();
    submitForm(values);
  }

  const handleCancel = () => {
    toggleEditMode();
    revertFieldValue(fieldName, initValue);
    setNewFieldWidth(initValue || placeholder);
  }

  const setNewFieldWidth = (input: string) => {
    const newFieldWidth = calculateFieldWidth(input);
    setFieldWidth(newFieldWidth);
  }

  const handleChange = (event:any) => {
    setNewFieldWidth(event.target.value);
  };

  const handleInputClick = () => {
    setIsEditMode(true);
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
    if(isEditMode){
      setFocus(fieldName)
    }
  }, [isEditMode, fieldName, setFocus])

  return (
    <div className={styles.input_container}>
        <input
          className={calculateFieldType()}
          {...register(fieldName)}
          readOnly={!isEditMode}
          onChange={handleChange}
          style={{width: fieldWidth}}
          placeholder={placeholder}
          onKeyDown={handlePressEnter}
          onClick={handleInputClick}
        />
      {!isEditMode &&
        <div className={styles.edit_icons_container}>
          <IconButton size={20} onClick={toggleEditMode}><Edit2 size={20} color={iconColor}/></IconButton>
          {onRemove && <IconButton size={20} onClick={handleRemove}><Delete size={20} color={iconColor}/></IconButton>}
        </div>
      }
      {isEditMode &&
        <div className={styles.save_icons_container}>
          <IconButton size={20} onClick={handleSave}><Save size={20} color={iconColor}/></IconButton>
          <IconButton size={20} onClick={handleCancel}><X size={20} color={iconColor}/></IconButton>
        </div>
      }
    </div>
  )
}
